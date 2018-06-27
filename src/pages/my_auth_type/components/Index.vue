<template>
  <div class="page-content nav-content">
    <van-nav-bar title="选择证件类型" fixed left-arrow @click-left="goBack" />
    <ul class="my-list">
      <li class="list-item" @click="save(1)">
        <div class="item-left">身份证</div>
      </li>
      <li class="list-item" @click="save(2)">
        <div class="item-left">护照</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast } from "vant";

import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { getCachedData, loadUserInfo } from "utils/utils";
import API from "utils/api";

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
      type: ""
    };
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save(type) {
      if (MTOOL.isPlus) {
        MTOOL.invoke("my_auth.html", "event_edit_authtype", {
          authtype: type
        });
      }
      setTimeout(() => {
        mui.back();
      }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.my-list.my-list {
  background: #fff;
  padding: 0 $padding-main;
  .list-item {
    display: flex;
    height: px2rem(52px);
    line-height: px2rem(52px);
  }
}
</style>
