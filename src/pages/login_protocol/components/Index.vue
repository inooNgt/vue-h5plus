<template>
  <div class="page-content nav-content">
    <van-nav-bar :title="title" fixed left-arrow @click-left="goBack" />
    <article class="detail-content">
      <div v-html="article"></div>
      <div v-if="!article" class="text-center">暂无内容</div>
    </article>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Button, Toast } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import API from "utils/api";
import { getCachedObject } from "utils/utils";

Vue.use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      title: "用户协议",
      article: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getArtical();
    });
  },
  methods: {
    getArtical() {
      this.$get(API.agreement)
        .then(res => {
          let data = res.data && res.data.data;
          console.log("data:", data);
          if (res.status === 200) {
            if (data.title) this.title = data.title;
            if (data.body) this.article = data.body;
          } else {
            data.message && Toast(data.message);
          }
        })
        .catch(e => {
          console.log("异常:", e);
          e.message && Toast(e.message);
        });
    },
    goBack() {
      mui.back();
    }
  }
};
</script>

<style lang="scss">
body,
html {
  background: #fff;
}
</style>


<style lang="scss" scoped>
@import "~assets/scss/var";
.detail-content {
  padding: 35px 36px;
  font-size: 12px;
  color: $color-gray;
  line-height: 22px;
}
</style>
