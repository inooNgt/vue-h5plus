<template>
  <div class="page-content" :class="!isPlus?'broswer-content':''">
    <div class="my-header">
      <nav class="bar-setting">
        <van-icon class="icon-setting" v-tap="{ methods:goSetting }" name="setting" />
      </nav>
      <div class="row-msg">
        <div class="msg-name">{{username}}</div>
        <div class="msg-phone">
          <van-icon name="phone" />{{phone}}</div>
      </div>
      <div class="row-img">
        <img class="header-img" v-if="avatar" :src="avatar" />
        <img class="header-img" v-if="!avatar" src="~assets/img/head.png" />
      </div>
    </div>
    <ul class="my-list">
      <li class="list-item">
        <div class="item-left">实名认证</div>
        <div class="item-right">
          认证中
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">我的资产</div>
        <div class="item-right">
          100 DIC
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">我的课程</div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">我的活动</div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">帮助中心</div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">关于我们</div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
    <div class="box-btn">
      <van-button slot="button" class="btn" size="large" v-if="logined" @click="logout">退出</van-button>
      <van-button slot="button" class="btn" size="large" v-if="!logined" @click="login">登录</van-button>
    </div>
  </div>
</template>             

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";
import { Cell, CellGroup, Icon, Toast } from "vant";
import config from "utils/config";
import API from "utils/api";
import vueTap from "v-tap";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(vueTap);

// 使用缓存初始化
const cachedUser = JSON.parse(MTOOL.storage.getItem(config.keys.user));

console.log("cachedUser", cachedUser);

export default {
  name: "Index",
  data() {
    return {
      logined: MTOOL.logined(),
      isPlus: MTOOL.isPlus,
      username: cachedUser.username || "--",
      phone: cachedUser.mobile_phone || "--",
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
      this.$get(API.auth.user).then(res => {
        console.log("user:", res);
      });
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
    logout() {
      // test
      MTOOL.storage.setItem(config.keys.token, "");
      console.log("logout: " + MTOOL.storage.getItem(config.keys.token));
      this.update();

      this.$post(API.del).then(res => {
        let data = res.data;
        if (data.status !== 200) {
          Toast(data.message);
          return;
        }
        MTOOL.storage.setItem(config.keys.token, "");

        Toast("退出成功");
        this.update();

        // 回到首页
        // setTimeout(() => {
        //   if (MTOOL.isPlus) {
        //     MTOOL.switchNav({
        //       from: "my.html",
        //       to: "home.html"
        //     });
        //     MTOOL.invoke("HBuilder", "index_update_tab", { to: "home.html" });
        //   } else {
        //     location.href = "home.html";
        //   }
        // }, 200);
      });
    }
  }
};
</script>

<style lang="scss">
.mui-pull-top-pocket {
  display: none !important;
  // &.mui-visibility {
  //   display: block !important;
  // }
}
</style>


<style lang="scss" scoped>
@import "~assets/scss/var";
.broswer-content {
  padding-bottom: 50px;
}
.my-header {
  padding: 0 18px;
}
.row-img {
  text-align: right;
  padding: 38px 0 18px;
}

.header-img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
}

.row-msg {
  margin-left: 20px;
  line-height: 30px;
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
.box-btn {
  text-align: center;
  padding: 36px 0;
}
</style>
