<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" right-text="保存" @click-right="save" />
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast } from "vant";

import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { getCachedUser, loadUserInfo } from "utils/utils";
import API from "utils/api";
import vueTap from "v-tap";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Icon);

// 缓存的用户信息
const cachedUser = getCachedUser();

export default {
  name: "Index",
  data() {
    return {
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

<style lang="scss" scoped>
@import "~assets/scss/var";
</style>
