<template>
  <div class="page-content" :class="!isPlus?'broswer-content':''">
    <div class="my-header">
      <nav class="bar-setting">
        <van-icon class="icon-setting" @click="goSetting" name="setting" />
      </nav>
      <div class="row-img">
        <div class="img-wrap">
          <img class="header-img" v-if="avatar" :src="avatar" />
          <img class="header-img" v-if="!avatar" src="~assets/img/head.png" />
        </div>
      </div>
      <div class="row-msg">
        <div class="msg-name">{{username}}</div>
      </div>
    </div>
    <div class="my-info">
      <div class="info-left">
        <div class="info-title">DIC</div>
        <div class="info-value">1000</div>
      </div>
      <div class="info-right">
        <div class="info-title">活力值</div>
        <div class="info-value">1000</div>
      </div>
    </div>
    <ul class="my-list">
      <li class="list-item" @click="goAuth">
        <div class="item-left">
          <span class="md-icon md-icon-auth"></span>
          <span class="item-title">实名认证</span>
        </div>
        <div class="item-right">
          认证中
        </div>
        <div class="item-arrow">
          <span class="md-icon md-icon-arrow-right"></span>
        </div>
      </li>
      <li class="list-item" @click="goFund">
        <div class="item-left">
          <span class="md-icon md-icon-fund"></span>
          <div class="item-title">我的资产</div>
        </div>
        <div class="item-right">
          100 DIC
        </div>
        <div class="item-arrow">
          <span class="md-icon md-icon-arrow-right"></span>
        </div>
      </li>
      <li class="list-item" @click="goCourse">
        <div class="item-left">
          <span class="md-icon md-icon-mycourse"></span>
          <div class="item-title">我的课程</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <span class="md-icon md-icon-arrow-right"></span>
        </div>
      </li>
      <li class="list-item" @click="goActivity">
        <div class="item-left">
          <span class="md-icon md-icon-myactivity"></span>
          <div class="item-title">我的活动</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <span class="md-icon md-icon-arrow-right"></span>
        </div>
      </li>
      <li class="list-item" @click="goHelp">
        <div class="item-left">
          <span class="md-icon md-icon-help"></span>
          <div class="item-title">帮助中心</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <span class="md-icon md-icon-arrow-right"></span>
        </div>
      </li>
      <li class="list-item" @click="goAbout">
        <div class="item-left">
          <span class="md-icon md-icon-about"></span>
          <div class="item-title">关于我们</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <span class="md-icon md-icon-arrow-right"></span>
        </div>
      </li>
    </ul>

  </div>
</template>             

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { getCachedUser, loadUserInfo } from "utils/utils";
import API from "utils/api";
import { Cell, CellGroup, Icon, Toast } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon);

// 缓存的用户信息
const cachedUser = getCachedUser();

const STATUS_NOT_ACTIVE = 1; // 未激活
const STATUS_ACTIVE = 2; // 正常状态
const STATUS_DELETED = 3; // 被禁止的用户

export default {
  name: "Index",
  data() {
    return {
      logined: MTOOL.logined(),
      isPlus: MTOOL.isPlus,
      username: cachedUser.username || "- -",
      avatar:
        cachedUser.avatar_base_url &&
        cachedUser.avatar_path &&
        cachedUser.avatar_base_url + "/" + cachedUser.avatar_path
    };
  },
  created() {
    console.log("created", this.logined);
    // 更新所有子页面
    window.addEventListener("event_update", event => {
      // 获得事件参数
      let detail = event.detail;
      console.log("my event_update");
      this.update();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.updateUserInfo();
    },
    update() {
      this.logined = MTOOL.logined();
      this.updateByCached();
      this.updateUserInfo();
    },
    // 先用缓存更新
    updateByCached() {
      let user = getCachedUser();
      this.logined = MTOOL.logined();
      if (user.username && user.username !== this.username) {
        this.username = user.username;
      }
      let avatar =
        user.avatar_base_url &&
        user.avatar_path &&
        user.avatar_base_url + "/" + user.avatar_path;
      if (avatar && avatar !== this.avatar) {
        this.avatar = avatar;
      }
    },
    // 再从服务器拉取数据
    async updateUserInfo() {
      try {
        let user = await loadUserInfo();
        if (user.username) this.username = user.username;
        if (user.avatar_base_url && user.avatar_path)
          this.avatar = user.avatar_base_url + "/" + user.avatar_path;

        console.log("user:", user);
        this.checkUserStatus(user);
      } catch (error) {
        console.log(error);
        if (error && error.status * 1 === 401) {
          error.message && Toast(error.message);
          setTimeout(() => {
            this.login();
          }, 500);
        } else {
          error.message && Toast(error.message);
        }
      }
    },
    checkUserStatus(user) {
      user = user || getCachedUser();
      return new Promise((resolve, reject) => {
        // 已激活
        if (user && user.status * 1 === STATUS_ACTIVE) {
          // 跳转 plus环境
          console.log("用户已激活");
          resolve();
        }
        // 未激活
        if (user && user.status * 1 === STATUS_NOT_ACTIVE) {
          Toast("该账户未激活");
          setTimeout(() => {
            MTOOL.openWindow("login_invite.html");
          }, 500);
        }
        // 已禁止
        if (user && user.status * 1 === STATUS_DELETED) {
          Toast("该账户已被禁止");
        }
        reject(new Error());
      });
    },

    login() {
      MTOOL.openWindow("login.html");
    },

    isLogin() {
      this.logined = MTOOL.logined();
      if (!this.logined) {
        Toast("未登录");
        setTimeout(() => {
          this.login();
        }, 400);
      }
      return this.logined;
    },

    openAuthPage(url) {
      if (!this.isLogin()) return;
      this.checkUserStatus().then(() => {
        MTOOL.openWindow(url);
      });
    },

    goSetting() {
      this.openAuthPage("my_setting.html");
    },
    goFund() {
      this.openAuthPage("my_fund.html");
    },
    goCourse() {
      this.openAuthPage("my_course.html");
    },
    goHelp() {
      MTOOL.openWindow("my_help.html");
    },
    goActivity() {
      this.openAuthPage("my_activity.html");
    },
    goAbout() {
      MTOOL.openWindow("my_about.html");
    },
    goAuth() {
      this.openAuthPage("my_auth.html");
    }
  }
};
</script>

<style lang="scss">
.mui-pull-top-pocket {
  display: none !important;
}
// .page-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -20px;
// }
</style>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.page-content {
  padding-bottom: 18px;
  overflow-x: hidden;
}
.page-content.broswer-content {
  padding-bottom: 68px;
}
.item-left {
  .md-icon {
    position: relative;
    top: -1px;
  }
}
.md-icon {
  margin-right: 16px;
}

.my-info {
  height: px2rem(88px);
  overflow: hidden;
  color: #fff;
  display: flex;
  margin-bottom: 18px;
  background-color: #2c3648;
  .info-left,
  .info-right {
    padding: 0 $padding-main;
    // flex: 1;
    width: 50%;
    text-align: center;
  }
  .info-left {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: -1px;
      top: 50%;
      margin-top: -20px;
      width: 1px;
      height: 40px;
      background: linear-gradient(
        0deg,
        #2c3648 0%,
        $color-main 50%,
        #2c3648 100%
      );
      border-image-slice: 1;
    }
  }
  .info-title {
    height: px2rem(44px);
    padding-top: px2rem(15px);
    font-family: San-Francisco-Text-Medium;
    font-size: 20px;
  }
  .info-value {
    font-family: San-Francisco-Text-Regular;
    font-size: 18px;
    padding-top: px2rem(5px);
    color: rgba(255, 255, 255, 0.6);
    @extend %text-over;
  }
}
.my-header {
  height: px2rem(250px);
  padding: 0 $padding-main;
  background: $color-main;
  color: #fff;
}
.row-img {
  text-align: center;
  padding: px2rem(25px) 0 px2rem(8px);
}
.img-wrap {
  position: relative;
  width: px2rem(120px);
  height: px2rem(120px);
  border-radius: 50%;
  border: 2px solid #fff;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
}
.header-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.row-msg {
  line-height: px2rem(30px);
  text-align: center;
  .msg-name {
    @extend %text-over;
    font-size: 16px;
    font-weight: 600;
  }
}
.bar-setting {
  height: px2rem(44px);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.icon-setting {
  font-size: 20px;
}
</style>
