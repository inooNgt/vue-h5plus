<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" right-text="保存" @click-right="save" />
    <van-cell-group>
      <van-field v-model="phone" label="头像" placeholder="请输入头像" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      phone: "xxx"
    };
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      console.log("save");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
</style>
