<template>
  <div class="page-content">
    <div class="logo">
      <img class="logo-img" src="~assets/img/empty.png" alt="">
    </div>
    <div>
      <van-tabs v-model="active">
        <van-tab title="密码登录">
          <van-cell-group>
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" />

            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" @click-icon="password = ''" />
          </van-cell-group>
        </van-tab>
        <van-tab title="验证码登录">
          <van-cell-group>
            <van-field v-model="username" label="手机号" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" />
            <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''">
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
          </van-cell-group>
        </van-tab>
      </van-tabs>
      <van-button slot="button" size="large" @click="login">登录</van-button>
      <van-button slot="button" size="large" @click="goRegister">去注册</van-button>
      <van-button slot="button" size="large" @click="goFindPS">忘记密码</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup, Tab, Tabs, Toast } from "vant";
import mui from "mui";
import MTOOL from "mtool";
import config from "utils/config";

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(CellGroup);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      msg: "",
      username: "",
      password: "",
      phone: "",
      sms: ""
    };
  },
  mounted: function() {},
  methods: {
    login: function() {
      let param = {};
      if (this.active === 0) {
        // if (this.username.trim() === "") {
        //   Toast("用户名不能为空");
        //   return;
        // }
        // if (this.password.trim() === "") {
        //   Toast("密码不能为空");
        //   return;
        // }

        param = {
          type: "psd",
          username: this.username.trim(),
          password: this.password.trim()
        };
      } else {
        param = {
          type: "codde",
          phone: this.phone.trim(),
          code: this.code.trim()
        };
      }

      console.log("Login param:", param);
      this.loginSucceed();
    },
    loginSucceed: function() {
      console.log("loginSucceed");
      // 存储信息
      let data = { username: this.username, sessionkey: new Date().getTime() };
      MTOOL.storage.setItem(config.keys.loginstatus, true);
      MTOOL.storage.setItem(config.keys.session, JSON.stringify(data));
      // 跳转

      console.log("session info:", MTOOL.storage.getItem(config.keys.session));

      // plus环境
      if (MTOOL.isPlus) {
        MTOOL.plusReady(function() {
          var wv = plus.webview.currentWebview();
          var origin = wv.from;
          // 来自tabbar子页面的登录，返回tabbar子页面,然后再更新tabbar子页
          console.log("origin: " + origin);
          if (origin && MTOOL.config.subpages.indexOf(origin)) {
            mui.back();
            MTOOL.switchNav({
              from: "login.html",
              to: origin
            });
            MTOOL.cwcs.invoke(origin, "tabbarUpdate");
            MTOOL.cwcs.invoke("HBuilder", "updateTab", { to: origin });
          }
        });
      } else {
        history.back();
      }
    },
    goFindPS: function() {
      MTOOL.openWindow("login_findps.html");
    },
    goRegister: function() {
      MTOOL.openWindow("login_register.html");
    }
  }
};
</script>





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
  padding: 54px 0;
}
.logo-img {
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
</style>
