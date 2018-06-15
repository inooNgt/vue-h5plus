<template>
  <div class="page-content">
    <div class="cell-header" @click="goSetting">
      <div class="cell-img"></div>
      <div class="cell-msg">
        <div class="msg-name">This space for name</div>
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
    <van-button slot="button" size="large" v-if="logined" @click="logout">退出</van-button>
    <van-button slot="button" size="large" v-if="!logined" @click="login">登录</van-button>
  </div>
</template>             

<script>
import Vue from "vue";
import MTOOL from "mtool";
import { Cell, CellGroup, Icon, Toast } from "vant";
import config from "utils/config";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      logined: MTOOL.logined
    };
  },
  mounted() {
    console.log("logined", this.logined);
  },
  methods: {
    login() {
      MTOOL.openWindow("login.html");
    },
    goSetting() {
      MTOOL.openWindow("my_setting.html");
    },
    logout() {
      // test
      MTOOL.storage.setItem(config.keys.token, "");

      this.$del(API.del).then(res => {
        let data = res.data;
        if (data.status !== 200) {
          Toast(data.message);
          return;
        }
        MTOOL.storage.setItem(config.keys.token, "");

        Toast("退出成功");

        // 回到首页
        setTimeout(() => {
          if (MTOOL.isPlus) {
            MTOOL.switchNav({
              from: "my.html",
              to: "home.html"
            });
            MTOOL.cwcs.invoke("HBuilder", "updateTab", { to: "home.html" });
          } else {
            location.href = "home.html";
          }
        }, 200);
      });
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
