<template>
  <div class="page-content nav-content">
    <van-nav-bar title="江湖" fixed/>
    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll" id="homeScroller" ref="scrollContent" :class="isPlus?'':'broswer-content'">
        <ul class="list" v-if="dataList.length">
          <ArticleItem v-for="(item,index) in dataList" :data="item" :key="index" :onitemclick="goInfo" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Button, Toast, NavBar } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { loadUserInfo, stopPropagation, redirect, preload } from "utils/utils";
import API from "utils/api";
import ArticleItem from "components/ArticleItem";

Vue.use(Toast)
  .use(Button)
  .use(Icon)
  .use(NavBar);

const refreshId = "#pullrefresh";

const preloadPages = ["article.html"];

export default {
  name: "Index",
  components: {
    ArticleItem
  },
  created() {
    // 订阅更新事件
    window.addEventListener("event_update", event => {
      // 获得事件参数
      let detail = event.detail;
      this.update();
    });

    MTOOL.plusReady(() => {
      if (MTOOL.isPlus) {
        preload(preloadPages);
      }
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  data() {
    return {
      isPlus: MTOOL.isPlus,
      dataList: [],
      loading: false
    };
  },
  methods: {
    init() {
      mui.init({
        pullRefresh: {
          container: refreshId,
          down: {
            style: "circle",
            offset: "44px", // 可选 默认0px,下拉刷新控件的起始位置
            color: config.pullRefreshColor,
            callback: this.pulldownRefresh
          }
        }
      });
      this.loadData();
    },

    goBack() {
      mui.back();
    },
    update() {
      this.loadData();
    },
    pulldownRefresh() {
      let pullRefreshApi = mui(refreshId).pullRefresh();

      this.loadData().finally(() => {
        let pullRefreshApi = mui(refreshId).pullRefresh();
        pullRefreshApi.endPulldownToRefresh();
      });
    },

    loadData() {
      if (this.loading) return Promise.resolve();

      this.loading = true;

      return this.$get(API.ifanr)
        .then(res => {
          let data = res.data;
          if (res.status === 200 && data) {
            if (data.results) {
              this.dataList = data.results;
            }
          } else {
            res.message && Toast(res.message);
          }
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goInfo(id) {
      if (id === undefined) {
        return;
      }

      console.log("goInfo: " + id);
      // 两种传参方式用于非plus/plus环境
      MTOOL.invoke("article.html", "event_update", { id });
      setTimeout(() => {
        MTOOL.openWindow(`article.html?id=${id}`);
      }, 150);
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/scss/var";
@import "~assets/scss/common";

.mui-scroll-wrapper.mui-scroll-wrapper {
  top: 44px;
}
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.broswer-content {
  padding-bottom: 49px;
}

.list {
  padding: $padding-main;
}
</style>

