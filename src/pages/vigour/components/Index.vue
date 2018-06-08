<template>
  <div class="page-content">
    <header class="header">
      <div class="head-img"></div>
      <div class="head-name">Name</div>
    </header>
    <div>
      <van-button size="large" @click="speedUp">speed up</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
import mui from "mui";

Vue.use(Button);

export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    speedUp: function() {
      mui.openWindow({
        url: "speed_up.html",
        extras: {
          name: "speed_up.html"
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
</style>
