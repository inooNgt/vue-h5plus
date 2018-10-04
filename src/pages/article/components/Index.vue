<template>
  <div class="page-content nav-content">
    <van-nav-bar title="文章" fixed left-arrow @click-left="goBack" />
    <article class="content">
      <h2 class="title">{{title}}</h2>
      <div v-html="content" class="content-html"></div>
    </article>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Button, Toast } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import API from "utils/api";
import config from "utils/config";
import { getQuery, getCachedObject } from "utils/utils";

Vue.use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      id: "",
      title: "",
      content: ""
    };
  },
  created() {
    window.addEventListener("event_update", event => {
      // 获得事件参数
      let detail = event.detail;
      // 触发子组件更新
      console.log("event_update with:" + detail.id);
      this.loadData(detail.id);
    });
    if (MTOOL.isPlus) {
      MTOOL.plusReady(() => {
        let self = plus.webview.currentWebview();
        self.addEventListener("hide", () => {
          this.clear();
        });
      });
    }
  },
  mounted() {
    let query = getQuery();
    if (query && query.id) {
      this.id = query.id;
      this.loadData(this.id);
    }
  },
  methods: {
    goBack() {
      mui.back();
    },
    clear() {
      this.title = "";
      this.content = "";
    },
    loadData(id) {
      if (!id) {
        return;
      }

      // 由于gank.io 没有新闻的详情接口，这里缓存读取数据
      let dataList = getCachedObject(config.keys.newslist);

      if (dataList.length) {
        dataList.forEach(item => {
          if (item._id === id) {
            this.title = item.title || "";
            this.content = item.content || "";
            console.log("item.title: " + this.title);
          }
        });
      }
    }
  }
};
</script>




<style lang="scss" >
@import "~assets/scss/var";
.content-html {
  word-break: break-all;
  min-height: 100px;
  line-height: 24px;
  font-size: 16px;
  p {
    margin-bottom: 10px;
  }
  pre {
    overflow-x: auto;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.17em;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
  }
}
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.content {
  padding: 0 $padding-main 40px;
  font-size: 14px;
  color: $color-gray;
  line-height: 22px;
}

.title {
  font-size: 20px;
  color: #000;
  margin: 10px 0;
  line-height: 24px;
}
</style>