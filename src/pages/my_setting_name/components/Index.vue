<template>
  <div class="page-content nav-content">
    <van-nav-bar title="标题" fixed left-arrow @click-left="goBack" right-text="保存" @click-right="save" />
    <van-cell-group>
      <van-field v-model="username" placeholder="请输入昵称" @click-icon="username = ''" />
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
      username: cachedUser.username || "- -"
    };
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      if (this.username.trim() === "") {
        Toast("用户名不能为空");
      }

      this.$post(API.auth.settings, {
        username: this.username
      })
        .then(res => {
          if (res.status === 200) {
            Toast("修改成功");
            this.updateUserInfo();
            MTOOL.invoke("my_setting.html", "event_update");
            MTOOL.invoke("my.html", "event_update");
            setTimeout(() => {
              mui.back();
            }, 400);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async updateUserInfo() {
      try {
        let user = await loadUserInfo();
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
