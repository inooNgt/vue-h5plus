<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" />
    <ul class="my-list">
      <li class="list-item" @click="setHead">
        <div class="item-left">头像</div>
        <div class="item-right">
          <img class="head-img" src="~assets/img/head.png" alt="">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="setNickname">
        <div class="item-left">昵称</div>
        <div class="item-right">
          name111
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="setPhone">
        <div class="item-left">手机号</div>
        <div class="item-right">
          131****1234
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
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
</style>
