<template>
  <div class="page-content" :class="!isPlus?'broswer-content':''">
    <div class="my-header">
      <nav class="bar-setting">
        <van-icon class="icon-setting" @click="goSetting" name="setting" />
      </nav>
      <div class="row-img">
        <img class="header-img" v-if="avatar" :src="avatar" />
        <img class="header-img" v-if="!avatar" src="~assets/img/head.png" />
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
          <span class="my-icon"></span>
          <span class="item-title">实名认证</span>
        </div>
        <div class="item-right">
          认证中
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="goFund">
        <div class="item-left">
          <span class="my-icon"></span>
          <div class="item-title">我的资产</div>
        </div>
        <div class="item-right">
          100 DIC
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="goCourse">
        <div class="item-left">
          <span class="my-icon"></span>
          <div class="item-title">我的课程</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="goActivity">
        <div class="item-left">
          <span class="my-icon"></span>
          <div class="item-title">我的活动</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="goHelp">   
        <div class="item-left">
          <span class="my-icon"></span>
          <div class="item-title">帮助中心</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="goAbout">
        <div class="item-left">
          <span class="my-icon"></span>
          <div class="item-title">关于我们</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
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

export default {
  name: "Index",
  data() {
    return {
      logined: MTOOL.logined(),
      isPlus: MTOOL.isPlus,
      username: cachedUser.username || "- -",
      avatar: cachedUser.avatar_base_url || ""
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
    async updateUserInfo() {
      try {
        let user = await loadUserInfo();
        if (user.username) this.username = user.username;
        if (user.avatar_base_url) this.avatar = user.avatar_base_url;
      } catch (error) {
        console.log(error);
        Toast("Network error");
      }
    },
    login() {
      MTOOL.openWindow("login.html");
    },
    update() {
      this.logined = MTOOL.logined();
      console.log("update logined:" + this.logined);
    },
    goSetting() {
      MTOOL.openWindow("my_setting.html");
    },
    goFund() {
      MTOOL.openWindow("my_fund.html");
    },
    goCourse() {
      MTOOL.openWindow("my_course.html");
    },
    goHelp() {
      MTOOL.openWindow("my_help.html");
    },
    goActivity() {
      MTOOL.openWindow("my_activity.html");
    },
    goAbout() {
      MTOOL.openWindow("my_about.html");
    },
    goAuth() {
      MTOOL.openWindow("my_auth.html");
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
.my-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 16px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url(~assets/img/icon_empty.png);
}

.my-info {
  height: px2rem(88px);
  overflow: hidden;
  color: #fff;
  display: flex;
  margin-bottom: 18px;
  background-color: #335b4e;
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
      background: linear-gradient(0deg, #335b4e 0%, #1f4438 50%, #335b4e 100%);
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
.header-img {
  width: px2rem(120px);
  height: px2rem(120px);
  border-radius: 50%;
  border: 2px solid #fff;
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
