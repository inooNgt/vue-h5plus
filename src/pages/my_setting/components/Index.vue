<template>
  <div class="page-content">
    <div class="cell-header" @click="goSetting">
      <div class="cell-img"></div>
      <div class="cell-msg">
        <div class="msg-name">This is setting </div>
        <div class="msg-phone">177****5485</div>
      </div>
      <div class="cell-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <van-cell-group>
      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="单元格" is-link value="内容" />
      <van-cell title="单元格" is-link value="内容" />
    </van-cell-group>
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
.cell-header {
  display: flex;
  padding: 20px;
}
.cell-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: $color-main;
}
.cell-msg {
  margin-left: 20px;
  line-height: 30px;
}
.cell-icon {
  align-self: center;
  flex: 1 0 auto;
  text-align: right;
  height: 60px;
  line-height: 60px;
}
</style>
