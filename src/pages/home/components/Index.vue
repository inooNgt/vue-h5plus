<template>
  <div class="page-content nav-content" :class="active==0?'content-no-pull':''">
    <div ref="fastclickWrapper1">
      <div class="tab-home-wrap">
        <van-tabs class="van-tabs-home" v-model="active" @click="onTabsClick">
          <van-tab title="江湖"></van-tab>
          <van-tab title="百家"></van-tab>
        </van-tabs>
      </div>
    </div>
    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll" id="homeScroller" ref="scrollContent" :class="isPlus?'':'broswer-content'">
        <div class="md-tab-content" v-show="active==0">
          <section class="section-swipe">
            <van-swipe class="swipe-wrap" :autoplay="10000">
              <van-swipe-item class="swipe-item" v-for="(item, index) in imagelist" :key="index">
                <div class="swipe-img-wrap">
                  <img class="swipe-img" :src="item.src" />
                </div>
              </van-swipe-item>
            </van-swipe>
          </section>

          <div ref="fastclickWrapper2">
            <section class="section section-menpai" ref="menpaiSection">
              <div class="sec-head">
                <div class="sec-title">力荐门派</div>
                <div class="sec-tip">
                  <span>查看全部</span>
                  <van-icon name="arrow" />
                </div>
              </div>
              <div class="sec-body">
                <ul class="list-recommend" v-if="menpaiList.length">
                  <MenpaiItem v-for="(item,index) in menpaiList" :data="item" :key="index" />
                </ul>
                <div class="empty-wrap empty-wrap-list" v-else>
                  <div class="empty-cell">
                    <i class="iconfont icon-empty"></i>
                    <div class="empty-tip">空空如也</div>
                  </div>
                </div>
              </div>
            </section>
            <section class="section" ref="articleSection">
              <div class="sec-head">
                <div class="sec-title">深度好文</div>
                <div class="sec-tip">
                  <span>查看全部</span>
                  <van-icon name="arrow" />
                </div>
              </div>
              <div class="sec-body">
                <ul class="list-article" v-if="articleList.length">
                  <ArticleItem v-for="(item,index) in articleList" :data="item" :key="index" />
                </ul>
                <div class="empty-wrap empty-wrap-list" v-else>
                  <div class="empty-cell">
                    <i class="iconfont icon-empty"></i>
                    <div class="empty-tip">空空如也</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="md-tab-content" v-show="active==1" ref="fastclickWrapper3">
          <ul class="lsit-speech" v-if="eventList.length">
            <SpeechItem v-for="(item,index) in eventList" :data="item" :key="index" />
          </ul>
          <div class="empty-wrap" v-else>
            <div class="empty-cell">
              <i class="iconfont icon-empty"></i>
              <div class="empty-tip">空空如也</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Button, Toast, Tab, Tabs, Swipe, SwipeItem } from "vant";
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
import MenpaiItem from "components/MenpaiItem";
import ArticleItem from "components/ArticleItem";
import SpeechItem from "components/SpeechItem";

import FastClick from "fastclick";

let cachedSahde = getCachedData(config.keys.shade);

Vue.use(Toast)
  .use(Button)
  .use(Icon)
  .use(SwipeItem)
  .use(Swipe)
  .use(Tab)
  .use(Tabs);

const refreshId = "#pullrefresh";

const cachedMenpaiList = getCachedObject(config.keys.menpailist);
const cachedArticleList = getCachedObject(config.keys.articlelist);
const cachedBannerList = getCachedObject(config.keys.bannerist);

const preloadPages = [
  "common_article.html",
  "home_list_article.html",
  "home_list_menpai.html",
  "menpai_create.html"
];

export default {
  name: "Index",
  components: {
    MenpaiItem,
    ArticleItem,
    SpeechItem
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
      eventList: [],
      eventpage: 0,
      totalpage: 999,
      preloaded: false
    };
  },
  methods: {
    init() {
      FastClick.attach(this.$refs["fastclickWrapper1"]);
      FastClick.attach(this.$refs["fastclickWrapper2"]);
      FastClick.attach(this.$refs["fastclickWrapper3"]);

      mui.init({
        pullRefresh: {
          container: refreshId,
          down: {
            style: "circle",
            offset: "44px", // 可选 默认0px,下拉刷新控件的起始位置
            color: config.pullRefreshColor,
            callback: this.pulldownRefresh
          },
          up: {
            auto: false,
            contentrefresh: "正在加载更多数据...",
            callback: this.pullupRefresh
          }
        }
      });
      this.loadBanner();
      this.loadHotGroup();
      this.loadHotArticle();
      this.loadEventList();
      this.loadGroupCount();

      // 先禁用上拉
      this.$nextTick(() => {
        setTimeout(() => {
          let pullRefreshApi = mui(refreshId).pullRefresh();
          if (this.active === 0 && pullRefreshApi) {
            pullRefreshApi.disablePullupToRefresh();
          }
        }, 0);
      });
    },

    goBack() {
      mui.back();
    },
    update() {
      this.$refs["popup"].show = false;
      this.loadBanner();
      this.loadHotGroup();
      this.loadHotArticle();
      this.loadGroupCount();
      this.updateEventList();
    },
    pulldownRefresh() {
      let pullRefreshApi = mui(refreshId).pullRefresh();

      this.loadHotGroup();
      this.loadHotArticle();
      this.loadGroupCount();

      if (this.active === 1) {
        this.loadBanner();
        this.updateEventList(true);
      } else {
        this.updateEventList();
        this.loadBanner().finally(() => {
          pullRefreshApi.endPulldownToRefresh();
        });
      }
    },

    updateEventList(isPullDown) {
      this.eventpage = 0;
      return this.loadEventList().finally(() => {
        let pullRefreshApi = mui(refreshId).pullRefresh();
        if (isPullDown) pullRefreshApi.endPulldownToRefresh();

        if (this.eventList.length && this.eventpage < this.totalpage) {
          pullRefreshApi.enablePullupToRefresh();
        }
      });
    },

    pullupRefresh() {
      let pullRefreshApi = mui(refreshId).pullRefresh();
      if (this.active === 1) {
        let page = this.eventpage + 1;
        this.loadEventList(page).finally(() => {
          pullRefreshApi.endPullupToRefresh(page >= this.totalpage);
        });
      } else {
        pullRefreshApi.endPullupToRefresh();
      }
    },

    loadBanner() {
      return this.$get(API.auth.banner)
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            this.imagelist = data;
            MTOOL.storage.setItem(config.keys.bannerist, JSON.stringify(data));
          } else {
            if (res.status !== 429) {
              res.message && Toast(res.message);
            }
          }
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        });
    },
    loadHotGroup() {
      return this.$get(API.auth.hotgroup)
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            this.menpaiList = data;
            MTOOL.storage.setItem(config.keys.menpailist, JSON.stringify(data));
          } else {
            if (res.status !== 429) {
              res.message && Toast(res.message);
            }
          }
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        });
    },
    loadHotArticle() {
      return this.$get(API.auth.hotarticle)
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            this.articleList = data;
            MTOOL.storage.setItem(
              config.keys.articlelist,
              JSON.stringify(data)
            );
          } else {
            if (res.status !== 429) {
              res.message && Toast(res.message);
            }
          }
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        });
    },
    loadGroupCount() {
      this.$get(API.auth.groupcost)
        .then(res => {
          let data = res.data;
          if (data.status === 200) {
            if (data && data.data) this.groupCount = data.data.group_count * 1;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    loadEventList(page) {
      if (!page) page = 1;

      if (page > this.totalpage) {
        console.log("没有数据了");
        let pullRefreshApi = mui(refreshId).pullRefresh();
        return Promise.resolve();
      }

      return this.$get(API.auth.communityevent, {
        params: {
          page
        }
      })
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            if (data.limit) {
              this.totalpage = Math.ceil(data.total * 1 / data.limit) || 1;
            }

            if (data.page !== this.eventpage) {
              this.eventpage = data.page;
              if (data.page <= 1) {
                this.eventList = data.list;
              } else {
                this.eventList = this.eventList.concat(data.list);
              }
            }
          } else {
            if (res.status !== 429) {
              res.message && Toast(res.message);
            }
          }
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        });
    },

    onTabsClick(index, title) {
      setTimeout(() => {
        let pullRefreshApi = mui(refreshId).pullRefresh();
        if (!pullRefreshApi) return;
        if (index === 0) {
          pullRefreshApi.disablePullupToRefresh();
        } else if (this.eventList.length) {
          pullRefreshApi.enablePullupToRefresh();
        }

        // 重置滚动条
        pullRefreshApi.scrollTo(0, 0, 1);
      }, 0);
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/scss/var";
@import "~assets/scss/common";
html,
body {
  background: none;
}

.mui-content {
  background: #fff;
}

.mui-scroll-wrapper.mui-scroll-wrapper {
  top: 44px;
  // .mui-pull {
  //   display: none;
  // }
}
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

// .mui-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -475px;
// }

.broswer-content {
  padding-bottom: 49px;
}

.section-swipe,
.swipe-img-wrap {
  position: relative;
  height: 0 !important;
  padding-top: $ratio-banner;
}

.swipe-wrap,
.swipe-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sec-body {
  padding: $padding-main 0 0 $padding-main;
}

.section-menpai {
}

.sec-head {
  display: flex;
  height: 36px;
  line-height: 36px;
  justify-content: space-between;
  position: relative;
  padding: 0 12px;
  color: #000;
  .sec-title {
    width: 60%;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 600;
    @extend %text-over;
  }
  .sec-tip {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #000;
    font-size: 12px;
  }
  @extend %border-bottom;
}

.list-recommend {
}

.lsit-speech {
  padding: $padding-main 0 $padding-main $padding-main;
}
</style>

