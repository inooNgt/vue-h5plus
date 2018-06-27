<template>
  <div class="page-content nav-content">
    <van-nav-bar title="关于我们" fixed left-arrow @click-left="goBack" right-text="联系客服" />
    <ul class="my-list">
      <li class="list-item">
        <div class="item-left text-main">什么是DIC？</div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left text-main">什么是活力值？</div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Button, Toast } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import API from "utils/api";

Vue.use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    goBack() {
      mui.back();
    },
    login() {
      MTOOL.openWindow("login.html");
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
</style>
