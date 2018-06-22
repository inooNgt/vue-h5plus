<template>
  <div class="page-content nav-content">
    <van-nav-bar title="" class="login-nav" fixed left-text="注册" @click-left="goRegister" right-text="zh" />
    <div class="logo">
      <img class="logo-img" src="~assets/img/logo.png" alt="">
    </div>

    <div class="btn-box">
      <van-button slot="button" class="btn-main" size="large" @click="msgLogin">
        <span class="md-icon md-icon-msg"></span>短信快捷登录</van-button>
      <van-button slot="button" class="btn-main" size="large" @click="accountLogin">
        <span class="md-icon md-icon-lock"></span>账号密码登录</van-button>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup, Tab, Tabs, Toast, NavBar } from "vant";
// import mui from "mui";
// import MTOOL from "mtool";
// import config from "utils/config";
// import API from "utils/api";

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(CellGroup);

export default {
  name: "Index",
  data() {
    return {
      areacodeOptions: [{ code: "CN", label: "CN 0086" }],
      selectedAreacode: { code: "CN", label: "CN 0086" }
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    accountLogin() {
      MTOOL.openWindow("login_account.html");
    },
    msgLogin() {
      console.log("msg login");
      MTOOL.openWindow("login_msg.html");
    },
    goRegister: function() {
      MTOOL.openWindow("login_register.html");
    }
  }
};
</script>

<style lang="scss">
body,
html {
  background: #fff;
}
.dropdown-toggle {
  .clear {
    display: none !important;
  }
}

.page-content {
  // background-image: url(~assets/img/1.png);
  // background-repeat: no-repeat;
  // background-size: 100%;
  // background-position: 0 -20px;
}
</style>



<style lang="scss" scoped>
@import "~assets/scss/var";
.header {
  padding: 20px;
}
.head-img {
  display: block;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: $color-main;
}
.head-name {
  padding-top: 10px;
  text-align: center;
}
.logo {
  padding: 69px 0 226px;
}
.logo-img {
  display: block;
  width: 150px;
  height: 84px;
  margin: 0 auto;
}
.btn-box {
  text-align: center;
  padding: 0 20px 50px;
  .btn-main {
    margin-bottom: 10px;
  }
  .md-icon {
    margin-right: 10px;
    position: relative;
    top: -2px;
  }
}
</style>
