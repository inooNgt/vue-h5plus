<template>
  <div class="page-content">
    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <header class="header">
          <div class="bg-img"></div>
          <div class="header-content"></div>
        </header>
        <section class="section">
          <div class="sec-head">
            <div class="sec-title">最新动态</div>
            <div class="sec-time">更新于2018.6.21 15:00</div>
          </div>
          <div class="sec-body">
            <ul class="news-list">
              <li class="news-item">
                <div class="news-name">小白🐇子</div>
                <div class="news-msg">完成了实名认证，活力
                  <span class="text-black">+200</span>
                </div>
                <div class="news-time">5分钟前</div>
              </li>
              <li class="news-item">
                <div class="news-name">小白🐇子</div>
                <div class="news-msg">完成了实名认证，活力
                  <span class="text-black">+200</span>
                </div>
                <div class="news-time">5分钟前</div>
              </li>
            </ul>
          </div>
        </section>
        <section class="section">
          <div class="sec-head">
            <div class="sec-title">活力排行</div>
            <div class="sec-time">更新于2018.6.21 15:00</div>
          </div>
          <div class="sec-body">
            <ul class="rank-list">
              <li class="rank-item item-head">
                <div class="cell-left">排名</div>
                <div class="cell-center">用户名
                </div>
                <div class="cell-right">活力</div>
              </li>
              <li class="rank-item" v-for="index in 10" :key="index">
                <div class="cell-left">{{index}}</div>
                <div class="cell-center">完成了实名认证，活力
                </div>
                <div class="cell-right">5分钟前</div>
              </li>
              <li class="rank-item item-my">
                <div class="cell-left">我</div>
                <div class="cell-center">完成了实名认证，活力
                </div>
                <div class="cell-right">5分钟前</div>
              </li>
            </ul>
          </div>
        </section>
        <section class="section">
          <div class="sec-head">
            <div class="sec-title text-black">邀请好友立即加速</div>
            <div class="sec-more">更多</div>
          </div>
          <ul class="sec-share">
            <li class="share-cell">
              <div class="md-icon"></div>
              <div class="cell-text">发短信</div>
            </li>
            <li class="share-cell">
              <div class="md-icon"></div>
              <div class="cell-text">发微信</div>
            </li>
            <li class="share-cell">
              <div class="md-icon"></div>
              <div class="cell-text">二维码</div>
            </li>
          </ul>
        </section>
        <van-button size="large" @click="speedUp">speed up</van-button>

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
            callback: this.pulldownRefresh
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

    onTabsClick(index, title) {
      console.log(index, title);
      let pullRefreshApi = mui(refreshId).pullRefresh();
      setTimeout(() => {
        pullRefreshApi.refresh(true);
      });
    },
    speedUp() {
      MTOOL.openWindow("speed_up.html");
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/scss/var";
@import "~assets/scss/common";
body,
.mui-content.mui-content {
  background: #fff;
}
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
// .mui-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -104px;
// }

.header {
  width: 100%;
  height: 0;
  padding-top: 103.5%;
  position: relative;
}
.bg-img,
.header-content {
  position: absolute;
  border: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bg-img {
  background-image: url("~assets/img/bg.png");  
  background-size: 100%;
  background-repeat: no-repeat;       
}
.header-content {
  z-index: 1;
  background: none;
}

.section {
  padding: 0 $padding-main;
}

.sec-head {
  display: flex;
  height: 51px;
  line-height: 51px;
  justify-content: space-between;
  position: relative;
  .sec-title {
    width: 60%;
    padding-right: 10px;
    font-family: PingFang-SC-Bold;
    font-size: 16px;
    color: $color-main;
    @extend %text-over;
  }
  .sec-time {
    width: 40%;
    text-align: right;
    color: #8d8d8d;
    font-size: 10px;
  }
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
}
.news-list,
.rank-list {
  padding: $padding-main 0;
}
.news-item {
  display: flex;
  .news-name {
    width: 62px;
    font-size: 14px;
    color: #000;
    @extend %text-over;
  }
  .news-msg {
    flex: 1 0 auto;
    font-size: 12px;
    color: #8d8d8d;
    padding: 0 10px;
    @extend %text-over;
  }
  .news-time {
    flex: 1 0 auto;
    width: 60px;
    text-align: right;
    font-size: 10px;
    color: #8d8d8d;
    @extend %text-over;
  }
}
.rank-item {
  display: flex;
  font-size: 12px;
  color: #8d8d8d;
  height: 30px;
  line-height: 30px;
  &.item-head {
    color: #000;
    font-size: 14px;
  }
  &.item-top {
    color: $color-main;
  }
  &.item-my {
    color: #000;
  }
  .cell-left,
  .cell-center,
  .cell-right {
    flex: 1;
    @extend %text-over;
  }
  .cell-center {
    text-align: center;
  }
  .cell-right {
    text-align: right;
  }
}
.card-list {
  padding: $padding-main;
}
.sec-more {
  color: $color-main;
  font-size: 12px;
}
</style>