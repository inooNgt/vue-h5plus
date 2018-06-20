<template>
  <div class="page-content" :class="!isPlus?'broswer-content':''">
    <div class="my-header">
      <nav class="bar-setting">
        <van-icon class="icon-setting" v-tap="{ methods:goSetting }" name="setting" />
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
      <li class="list-item">
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
      <li class="list-item">
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
      <li class="list-item">
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
      <li class="list-item">
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
      <li class="list-item">
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
      <li class="list-item">
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
import vueTap from "v-tap";
import { Cell, CellGroup, Icon, Toast } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(vueTap);

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

    mui.init({
      pullRefresh: {
        container: "#pullrefresh", // 下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down: {
          style: "circle", // 必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
          callback: () => {
            this.update();
            setTimeout(() => {
              console.log("endPulldown");
              mui("#pullrefresh")
                .pullRefresh()
                .endPulldown();
            }, 1000);
          } // 必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
      }
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
  height: 88px;
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
    height: 44px;
    padding-top: 15px;
    font-family: San-Francisco-Text-Medium;
    font-size: 20px;
  }
  .info-value {
    font-family: San-Francisco-Text-Regular;
    font-size: 18px;
    padding-top: 5px;
    color: rgba(255, 255, 255, 0.6);
    @extend %text-over;
  }
}
.my-header {
  height: 250px;
  padding: 0 $padding-main;
  background: $color-main;
  color: #fff;
}
.row-img {
  text-align: center;
  padding: 25px 0 8px;
}
.header-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.row-msg {
  line-height: 30px;
  text-align: center;
  .msg-name {
    @extend %text-over;
    font-size: 16px;
    font-weight: 600;
  }
}
.bar-setting {
  height: 44px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.icon-setting {
  font-size: 20px;
}
</style>
