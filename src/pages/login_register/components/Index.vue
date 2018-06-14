<template>
  <div class="page-content">
    <div class="logo">
      <img class="logo-img" src="~assets/img/empty.png" alt="">
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="phone" placeholder="请输入手机号" />
        <van-field v-model="name" placeholder="昵称" />
        <van-field v-model="password" type="password" placeholder="密码" />
        <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''" />
        <van-field v-model="code" placeholder="邀请码" />
      </van-cell-group>
      <van-button slot="button" size="large">注册</van-button>
      <van-button slot="button" size="large" @click="goLogin">去登录</van-button>
    </div>
  </div>
</template>  

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup } from "vant";
import mui from "mui";
import MTOOL from "mtool";

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(CellGroup);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      msg: "",
      name: "",
      phone: "",
      password: "",
      sms: "",
      code: ""
    };
  },
  methods: {
    goLogin: function() {
      MTOOL.openWindow("login.html");
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
