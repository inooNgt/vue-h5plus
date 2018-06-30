<template>
  <div class="page-content nav-content">
    <van-nav-bar title="填写姓名" fixed left-arrow @click-left="goBack" right-text="确定" @click-right="save" />
    <van-cell-group>
      <van-field v-model="name" autofocus="autofocus" placeholder="请输入姓名" @click-icon="name = ''" />
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

try {
  MTOOL.plusReady(() => {
    if (MTOOL.isPlus) plus.key.showSoftKeybord();
  });
} catch (error) {
  console.log(error);
}

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
      name: ""
    };
  },
  mounted() {
    MTOOL.plusReady(() => {
      let wv = plus.webview.currentWebview();
      console.log("wv.realname:");
      console.log(wv.realname);
      if (wv && wv.realname !== undefined) this.name = wv.realname;
    });
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      if (this.name.trim() === "") {
        Toast("姓名不能为空");
      }

      if (MTOOL.isPlus) {
        MTOOL.invoke("my_auth.html", "event_edit_name", {
          name: this.name
        });
      } else {
        // 浏览器中传值
        MTOOL.storage.setItem(config.keys.realname, this.name);
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
