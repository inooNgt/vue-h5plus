<template>
  <div class="page-content">
    <div class="my-header">
      <nav class="bar-setting">
        <van-icon class="icon-setting" @click="goSetting" name="setting" />
      </nav>
      <div class="row-msg">
        <div class="msg-name">This space for name</div>
        <div class="msg-phone">
          <van-icon name="phone" />177****5485</div>
      </div>
      <div class="row-img">
        <img class="header-img" src="" />
      </div>
    </div>
    <ul class="my-list">
      <li class="list-item">
        <div class="item-left">item</div>
        <div class="item-right">
          name111
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">item</div>
        <div class="item-right">
          name111
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

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      logined: MTOOL.logined()
    };
  },
  created() {
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

<style lang="scss" scoped>
@import "~assets/scss/var";
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
  padding-top: 36px;
}
</style>
