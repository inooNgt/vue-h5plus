<template>
  <div class="page-content">
    <div class="logo">
      <img class="logo-img" src="~assets/img/empty.png" alt="">
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="phone" placeholder="请输入手机号" />
        <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''" />
      </van-cell-group>
      <van-button slot="button" size="large" @click="goReset">找回密码</van-button>
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
    goReset: function() {
      MTOOL.openWindow("login_reset.html");
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
