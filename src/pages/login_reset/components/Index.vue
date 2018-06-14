<template>
  <div class="page-content">
    <div class="logo">
      <img class="logo-img" src="~assets/img/empty.png" alt="">
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="password1" type="password" placeholder="密码" />
        <van-field v-model="password2" type="password" placeholder="确认密码" />
      </van-cell-group>
      <van-button slot="button" size="large">重设密码</van-button>
    </div>
  </div>
</template>  

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup } from "vant";
import mui from "mui";
import MTOOL from "mtool";

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(CellGroup);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      password1: "",
      password2: ""
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
.logo {
  padding: 54px 0;
}
.logo-img {
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
</style>
