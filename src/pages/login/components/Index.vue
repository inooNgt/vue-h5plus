<template>
  <div class="page-content">
    <div class="logo">
      <img class="logo-img" src="~assets/img/empty.png" alt="">
    </div>
    <div>
      <van-tabs v-model="active">
        <van-tab title="密码登录">
          <van-cell-group>
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" />

            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required @click-icon="password = ''" />
          </van-cell-group>
        </van-tab>
        <van-tab title="验证码登录">
          <van-cell-group>
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''" />
            <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''">
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
          </van-cell-group>
        </van-tab>
      </van-tabs>
      <van-button slot="button" size="large" >登录</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup, Tab, Tabs } from "vant";
import mui from "mui";
import MTOOL from "mtool";

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
      msg: "Welcome to Your Vue.js App",
      username: "username",
      password: "password",
      sms: ""
    };
  },
  methods: {
    speedUp: function() {
      MTOOL.openWindow("speed_up.html");
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
