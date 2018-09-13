<template>
  <div class="page-content nav-content" :class="active==0?'content-no-pull':''">
    <van-nav-bar title="江湖" fixed/>
    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll" id="homeScroller" ref="scrollContent" :class="isPlus?'':'broswer-content'">

        <ul class="list" v-if="dataList.length">
          <ArticleItem v-for="(item,index) in dataList" :data="item" :key="index" />
        </ul>
        <div class="empty-wrap" v-else>
          <div class="empty-cell">
            <div class="empty-tip">空空如也</div>
          </div>
        </div>

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
import {
  loadUserInfo,
  stopPropagation,
  redirect,
  preload,
  getCachedData,
  getCachedObject
} from "utils/utils";
import API from "utils/api";
import ArticleItem from "components/ArticleItem";

Vue.use(Toast)
  .use(Button)
  .use(Icon)
  .use(NavBar);

const refreshId = "#pullrefresh";

const cachedMenpaiList = getCachedObject(config.keys.menpailist);
const cachedArticleList = getCachedObject(config.keys.articlelist);
const cachedBannerList = getCachedObject(config.keys.bannerist);

const preloadPages = [];

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
        if (!this.preloaded) {
          preload(preloadPages);
          this.preloaded = true;
        }
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
      active: 0,
      isPlus: MTOOL.isPlus,
      showPopup: false,
      imagelist: cachedBannerList || [],
      articleList: cachedArticleList || [],
      menpaiList: cachedMenpaiList || [],
      groupCount: 0,
      menPaiReady: false,
      dataList: [],
      preloaded: false
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
      return this.$get(API.ifanr)
        .then(res => {
          let data = res.data;
          if (res.status === 200 && data) {
            let temp = [];
            if (data.results) {
              for (let key in data.results) {
                temp = temp.concat(data.results[key]);
              }
              this.dataList = temp;
            }
          } else {
            res.message && Toast(res.message);
          }
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        });
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

