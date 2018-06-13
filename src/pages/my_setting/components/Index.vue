<template>
  <div class="page-content">
    <ul class="list">
      <li class="list-item">
        <div class="item-left">头像</div>
        <div class="item-right">
          <img class="head-img" src="~assets/img/head.png" alt="">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">昵称</div>
        <div class="item-right">
          name111     
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
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
import { Cell, CellGroup, Icon } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    goSetting: function() {
      console.log("goSetting", this);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
.list-item {
  display: flex;
  height: 60px;
  line-height: 60px;
  background: #fff;
  padding: 0 20px;
  margin-bottom: 18px;
}
.item-left {
  width: 100px;
}
.item-right {
  flex: 1 0 auto;
  text-align: right;
  padding: 0 10px;
}
.item-arrow {
  width: 20px;
  text-align: right;
}
.head-img {
  margin: 10px 0;
  width: 40px;
  height: 40px;
}
</style>
