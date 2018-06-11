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
import MTOOL from "mtool";

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
      MTOOL.openWindow("speed_up.html");
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
