<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" />
    <div>
      <van-button size="large">实名认证 +100</van-button>
      <van-button size="large" @click="shareToWX">分享朋友圈 +100</van-button>
      <van-button size="large">分享给通讯录好友 +100</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import mui from "mui";
import MTOOL from "mtool";
import { Button, NavBar } from "vant";

Vue.use(Button).use(NavBar);

export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    goBack: function() {
      console.log("back");
      mui.back();
    },
    shareToWX: function() {
      mui.openWindow({
        url: "vigour_share.html",
        extras: {
          name: "vigour_share.html"
        },
        waiting: {
          autoShow: false
        }
      });
    }
  }
};
</script>





<style lang="scss" scoped>
@import "~assets/scss/var";
</style>
