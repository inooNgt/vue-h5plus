<template>
  <div class="page-content nav-content">
    <van-nav-bar title="关于我们" fixed left-arrow @click-left="goBack" />
    <div class="about-content">
      <div class="qr-wrap">
        <img class="qr-img" src="~assets/img/icon_empty.png" />
      </div>
      <div class="msg">
        <div class="msg-row">渠道合作：sddd@biilian.com</div>
        <div class="msg-row">业务合作：sddd@biilian.com</div>
        <div class="msg-wx">微信公众号</div>
      </div>
    </div>
    <div class="version">
      DIC V{{version}}
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";

Vue.use(NavBar);

export default {
  name: "Index",
  data() {
    return {
      title: "",
      article: "",
      version: config.version
    };
  },
  methods: {
    goBack() {
      mui.back();
    },
    getArtical() {
      this.$get(API.about)
        .then(res => {
          let data = res.data && res.data.data;
          console.log(data);
          if (res.status === 200) {
            if (data.title) this.title = data.title;
            if (data.body) this.article = data.body;
          } else {
            data.message && Toast(data.message);
          }
        })
        .catch(e => {
          console.log(e);
          Toast(e);
        });
    }
  }
};
</script>

<style lang="scss" >
html,
body {
  min-height: 100%;
  background: #fff;
}

// html {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -20px;
// }

// body {
//   background: none;
// }
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
.about-content {
  padding: 36px 0 86px;
}
.msg-wx {
  padding-top: 10px;
  font-size: 12px;
}
.msg-row {
  line-height: 20px;
}
.qr-img {
  display: block;
  border: none;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
.msg {
  font-size: 14px;
  text-align: center;
  margin-top: 36px;
  color: rgba(0, 0, 0, 0.6);
}
.version {
  text-align: center;
  position: fixed;
  bottom: 35px;
  width: 100%;
  color: rgba(1, 0, 1, 0.6);
  font-size: 12px;
}
</style>
