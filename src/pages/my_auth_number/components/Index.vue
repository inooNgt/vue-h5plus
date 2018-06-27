<template>
  <div class="page-content nav-content">
    <van-nav-bar title="填写证件号码" fixed left-arrow @click-left="goBack" right-text="确定" @click-right="save" />
    <van-cell-group>
      <van-field v-model="number" placeholder="请输入证件号码" @click-icon="name = ''" />
    </van-cell-group>
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
      number: ""
    };
  },
  mounted() {
    MTOOL.plusReady(() => {
      let wv = plus.webview.currentWebview();
      console.log("wv.number:");
      console.log(wv.number);
      if (wv && wv.number !== undefined) this.number = wv.number;
    });
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      if (this.number.trim() === "") {
        Toast("证件号码不能为空");
      }

      MTOOL.storage.setItem(config.keys.authnumber, this.number);

      if (MTOOL.isPlus) {
        MTOOL.invoke("my_auth.html", "event_edit_number", {
          number: this.number
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
</style>
