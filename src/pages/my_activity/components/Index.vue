<template>
  <div class="page-content nav-content">
    <van-nav-bar title="我的活动" fixed left-arrow @click-left="goBack" />
    <van-tabs class="van-tabs-fixed" v-model="active" :line-width="75" @click="onTabsClick">
      <van-tab title="我参与的活动" v-bind:key="1"></van-tab>
      <van-tab title="我发布的活动" v-bind:key="2"></van-tab>
    </van-tabs>
    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <section class="md-tab-content" v-show="active==0">
          <div class="card-list">
            <Card v-for="(item,index) in list" :key="index" :data="item" />
          </div>
        </section>
        <section class="md-tab-content" v-show="active==1">
          <div class="card-list">
            <Card v-for="(item,index) in list" :key="index" :data="item" />
          </div>
        </section>

      </div>
    </div>
 
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Button, Toast, Tab, Tabs } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { loadUserInfo } from "utils/utils";
import API from "utils/api";
import Card from "components/Card";

Vue.use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon)
  .use(Tab)
  .use(Tabs);

const refreshId = "#pullrefresh";

export default {
  name: "Index",
  components: {
    Card
  },
  created() {
    // 更新所有子页面
    window.addEventListener("event_update", function(event) {
      // 获得事件参数
      let detail = event.detail;
      console.log("event_nav_update");
      console.log("detail.to" + detail.to);
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
      list: [
        {
          title: "我的活动这排名字有这么长",
          cover: "",
          status: "Continued"
        },
        {
          title: "我的活动这排名字有这么长",
          cover: "",
          status: "Finished"
        }
      ],
      msg: "Welcome to Your Vue.js App"
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
            callback: this.pulldownRefresh
          },
          up: {
            auto: false,
            contentrefresh: "正在加载更多数据...",
            callback: this.pullupRefresh
          }
        }
      });
    },
    goBack() {
      mui.back();
    },
    pulldownRefresh() {
      let pullRefreshApi = mui(refreshId).pullRefresh();
      setTimeout(() => {
        // 没有更多内容了,endPulldownToRefresh传入true,不再执行下拉刷新
        pullRefreshApi.endPulldownToRefresh();
      }, 1000);
    },
    pullupRefresh() {
      let pullRefreshApi = mui(refreshId).pullRefresh();
      console.log("pullupRefresh");
      if (this.active === 1 && 1) {
        pullRefreshApi.endPullupToRefresh(false);
      } else {
        pullRefreshApi.refresh(true);
      }

      setTimeout(() => {
        pullRefreshApi.endPullupToRefresh();
      }, 1000);
    },
    onTabsClick(index, title) {
      let pullRefreshApi = mui(refreshId).pullRefresh();
      setTimeout(() => {
        pullRefreshApi.refresh(true);
      });
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/scss/var";
@import "~assets/scss/common";

.mui-scroll-wrapper.mui-scroll-wrapper {
  top: 84px;
}
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.mui-content {
    // background-image: url(~assets/img/1.png);
    // background-repeat: no-repeat;
    // background-size: 100%;
    // background-position: 0 -104px;
}

.card-list {
  padding: $padding-main;
}
</style>

  