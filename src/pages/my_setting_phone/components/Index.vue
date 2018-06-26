<template>
  <div class="page-content nav-content">
    <van-nav-bar title="修改手机号" fixed left-arrow @click-left="goBack" />
    <van-cell-group>
      <van-field v-model="phone" label="手机号" readonly placeholder="请输入手机号" />
    </van-cell-group>
    <div class="btn-box box-btn-fixed">
      <van-button class="btn btn-sub" slot="button" @click="alter">下一步</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast, Button } from "vant";

import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { getCachedUser, loadUserInfo } from "utils/utils";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Field)
  .use(Icon);

// 缓存的用户信息
const cachedUser = getCachedUser();

export default {
  name: "Index",
  data() {
    return {
      sms: "000",
      phone: cachedUser.mobile_phone || "- -"
    };
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
      }
    },
    alter() {
      MTOOL.openWindow("my_setting_phone_one.html");
    },
    async updateUserInfo() {
      try {
        let user = await loadUserInfo();
        if (user.username) this.username = user.username;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~assets/scss/var";
.btn-box {
  padding-top: 18px;
  text-align: center;
}
.van-cell__value {
  input.van-field__control {
    text-align: right;
  }
}
</style>
