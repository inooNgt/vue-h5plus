<template>
  <div class="page-content nav-content">
    <van-nav-bar title="数字资产" fixed left-arrow @click-left="goBack" />
    <van-tabs class="van-tabs-fixed" v-model="active" :line-width="75" @click="onTabsClick">
      <van-tab title="DIC明细" v-bind:key="1"></van-tab>
      <van-tab title="活力记录" v-bind:key="2"></van-tab>
    </van-tabs>
    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <section class="md-tab-content" v-show="active==0">
          <ul class="fund-list">
            <li class="fund-item" v-for="index in 10" :key="index">
              <div class="row-title">
                <div class="col-left">登录</div>
                <div class="col-right">
                  <time>2018-05-23（01:30:43）</time>
                </div>
              </div>
              <div class="row-msg">
                <div class="col-left">当前活力值：1000</div>
                <div class="col-right">+10</div>
              </div>
            </li>
          </ul>
        </section>
        <section class="md-tab-content" v-show="active==1">
          <ul class="fund-list">
            <li class="fund-item">
              <div class="row-title">
                <div class="col-left">注册</div>
                <div class="col-right">
                  <time>2018-05-23（01:30:43）</time>
                </div>
              </div>
              <div class="row-msg">
                <div class="col-left">当前活力值：1000</div>
                <div class="col-right">+10</div>
              </div>
            </li>
          </ul>
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

Vue.use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon)
  .use(Tab)
  .use(Tabs);

const refreshId = "#pullrefresh";

export default {
  name: "Index",
  created() {
    // 更新所有子页面
    window.addEventListener("event_update", event => {
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
      list: [{ title: "学知识" }, { title: "看路演" }],
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
            color: "#305085",
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
      console.log(index, title);
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

body,
html {
  background: #fff;
}

.mui-scroll-wrapper.mui-scroll-wrapper {
  top: 84px;
}
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
// .page-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -20px;
// }

.fund-list {
  padding: 0 $padding-main;
}
.fund-item {
  height: 82px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
        90deg,
        #ffffff -10%,
        #dddddd 50%,
        #ffffff 111%
      ),
      linear-gradient(#311455, #311455);
    background-blend-mode: normal, normal;
  }
  &:last-child:after {
    display: none;
  }
}
.row-title,
.row-msg {
  display: flex;
}
.col-right,
.col-left {
  width: 50%;
}
.col-right {
  text-align: right;
}
.row-title {
  height: 45px;
  line-height: 45px;
  .col-left {
    font-size: 16px;
    color: #000;
  }
  .col-right {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.5);
  }
}
.row-msg {
  .col-left {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }
  .col-right {
    font-size: 18px;
    color: $color-main;
  }
}
</style>

