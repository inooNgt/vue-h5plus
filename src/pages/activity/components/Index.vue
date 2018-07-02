<template>
  <div class="page-content nav-content">
    <van-nav-bar title="活动" fixed />

    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <section class="md-tab-content">
          <div class="card-list">
            <Card v-for="(item,index) in dataList" :key="index" :oncardclick="goInfo" :onsignupclick="goSignup" :data="item" />
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
    window.addEventListener("event_update", event => {
      // 获得事件参数
      let detail = event.detail;
      console.log("activity update");
      this.update();
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
      dataList: [],
      courseOwnedList: [],
      msg: "Welcome to Your Vue.js App",
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
            color: "#305085",
            callback: this.pulldownRefresh
          }
          // up: {
          //   auto: false,
          //   contentrefresh: "正在加载更多数据...",
          //   callback: this.pullupRefresh
          // }
        }
      });

      this.loadData();
    },
    update() {
      this.loadData();
    },
    loadData() {
      return this.$post(API.auth.activity)
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            this.dataList = data;
          } else {
            res.message && Toast(res.message);
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        });
    },

    goBack() {
      mui.back();
    },
    pulldownRefresh() {
      let pullRefreshApi = mui(refreshId).pullRefresh();

      this.loadData().finally(() => {
        pullRefreshApi.endPulldownToRefresh();
      });
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
    goInfo(id) {
      if (id === undefined) {
        return;
      }
      MTOOL.storage.setItem(config.keys.myactivityid, id);
      MTOOL.openWindow("info_activity.html");
    },
    goSignup(e) {
      e.cancelBubble = true;
      MTOOL.openWindow("signup_activity.html");
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
// .mui-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -104px;
// }

.card-list {
  padding: $padding-main;
}
</style>

  