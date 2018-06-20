<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" />
    <ul class="my-list">
      <li class="list-item" @click="setHead">
        <div class="item-left">头像</div>
        <div class="item-right">
          <img class="head-img" v-if="avatar" :src="avatar" />
          <img class="head-img" v-if="!avatar" src="~assets/img/head.png" />
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="setNickname">
        <div class="item-left">昵称</div>
        <div class="item-right">
          {{username}}
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="setPhone">
        <div class="item-left">手机号</div>
        <div class="item-right">
          {{phone}}
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">语言</div>
        <div class="item-right">
          简体中文
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
import { Cell, CellGroup, NavBar, Icon, Button, Toast } from "vant";
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
  .use(Button)
  .use(Icon);

// 缓存的用户信息
const cachedUser = getCachedUser();

export default {
  name: "Index",
  data() {
    return {
      logined: MTOOL.logined(),
      username: cachedUser.username || "- -",
      phone: cachedUser.mobile_phone || "- -",
      avatar: cachedUser.avatar_base_url || ""
    };
  },
  methods: {
    goBack() {
      mui.back();
    },
    setHead() {
      MTOOL.openWindow("my_setting_head.html");
    },
    setNickname() {
      MTOOL.openWindow("my_setting_name.html");
    },
    setPhone() {
      MTOOL.openWindow("my_setting_phone.html");
    },
    login() {
      MTOOL.openWindow("login.html");
    },
    logout() {
      // test
      // MTOOL.storage.setItem(config.keys.token, "");
      // console.log("logout: " + MTOOL.storage.getItem(config.keys.token));
      // mui.back();

      this.$post(API.auth.del).then(res => {
        let data = res.data;
        if (data.status !== 200) {
          Toast(data.message);
          return;
        }
        MTOOL.storage.setItem(config.keys.token, "");
        MTOOL.storage.setItem(config.keys.user, "");

        Toast("退出成功");
        // mui.back();

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
.item-left {
  width: 170px;
  .item-title {
    width: 170px;
  }
}
.box-btn {
  text-align: center;
  padding: 36px 0;
}
</style>
