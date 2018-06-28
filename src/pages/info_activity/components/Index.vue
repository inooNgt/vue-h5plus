<template>
  <div class="page-content nav-content">
    <van-nav-bar title="课程详情" fixed left-arrow @click-left="goBack" />
    <van-tabs class="van-tabs-fixed" v-model="active" :line-width="75" @click="onTabsClick">
      <van-tab title="基本信息"></van-tab>
      <van-tab title="课程介绍"></van-tab>
      <van-tab title="课程大纲"></van-tab>
      <van-tab title="讲师资源"></van-tab>
    </van-tabs>
    <article class="course-content">
      <section class="part part-cover">
        <div class="cover">
          <img class="cover-img" :src="data.picture" alt="">
          <h4 class="row-prize">{{data.price_text}}</h4>
        </div>
        <h5 class="row-msg">
          <div class="col-left">
            {{data.title}}
          </div>
        </h5>

      </section>
      <section class="part part-1">
        <h4 class="part-title" ref="hook-0">
          基本信息
        </h4>
        <div class="part-content">
          <dl class="info-dl">
            <dt>课程名称：</dt>
            <dd>{{data.title}}</dd>
          </dl>
          <dl class="info-dl">
            <dt> 课程费用：</dt>
            <dd>{{data.price_text}}</dd>
          </dl>
          <dl class="info-dl">
            <dt> 主办方：</dt>
            <dd>{{data.organizer}}</dd>
          </dl>
          <dl class="info-dl">
            <dt> 授课地点：</dt>
            <dd>{{data.address}}</dd>
          </dl>
          <dl class="info-dl">
            <dt> 授课时间：</dt>
            <dd>{{data.time_text}}</dd>
          </dl>
          <dl class="info-dl">
            <dt> 报名须知：</dt>
            <dd v-html="data.notice"></dd>
          </dl>
        </div>
      </section>
      <section class="part part-2">
        <h4 class="part-title" ref="hook-1">
          课程介绍
        </h4>
        <div class="part-content">
          <div class="part-rich" v-html="data.short_desc"></div>
        </div>
      </section>
      <section class="part part-3">
        <h4 class="part-title" ref="hook-2">
          课程大纲
        </h4>
        <div class="part-content">
          <div class="part-rich" v-html="data.structure"></div>
        </div>
      </section>
      <section class="part part-4">
        <h4 class="part-title" ref="hook-3">
          讲师资源
        </h4>
        <div class="part-content">
          <div class="part-rich" v-html="data.resource"></div>
        </div>
      </section>

    </article>

  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Button, Toast, Tab, Tabs } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { loadUserInfo, getCachedData } from "utils/utils";
import API from "utils/api";

Vue.use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon)
  .use(Tab)
  .use(Tabs);

const refreshId = "#pullrefresh";

const courseId = getCachedData(config.keys.mycourseid);

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
      courseJoinedList: [],
      courseOwnedList: [],
      msg: "Welcome to Your Vue.js App",
      loading: false,
      data: {
        picture: "",
        title: "",
        status_text: "",
        price_text: "",
        organizer: "",
        address: "",
        time_text: "",
        notice: "",
        location_city: ""
      },
      starttime: "",
      endtime: ""
    };
  },
  methods: {
    init() {
      this.loadCourseInfo(courseId);
    },
    loadCourseInfo(id) {
      this.loading = true;
      this.$get(API.auth.courseinfo, {
        params: {
          id
        }
      })
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            this.data = data;
          } else {
            res.message && Toast(res.message);
          }
          console.log(data);
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goBack() {
      mui.back();
    },

    onTabsClick(index, title) {
      this.toHook(index);
    },
    toHook: function(index) {
      let element = this.$refs["hook-" + index];
      let y = Math.max(0, MTOOL.elementPosition(element).y - 84);
      console.log(element, y);
      if (element) {
        window.scrollTo(0, y);
        // console.log(
        //   "scrollToP: " + document.body.scrollTop ||
        //     document.documentElement.scrollTop
        // );
      }
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/scss/var";
@import "~assets/scss/common";
html,
body {
  background: #fff;
}
.van-tabs {
  .van-tab {
    &::after {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
// .page-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -80px;
// }

.part {
  padding: $padding-main;
  &.part-cover {
    padding: $padding-main 35px 7px;
  }
  .part-title {
    font-size: 14px;
    color: $color-main;
    margin: 0 0 16px;
  }
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
}
.cover {
  height: 0;
  width: 100%;
  padding-top: 49%;
  border: solid 1px #dddddd;
  position: relative;
  .cover-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.row-msg {
  margin: 10px 0;
  line-height: 20px;
  height: 40px;
  color: $color-main;
  font-size: 14px;
  .col-left {
    width: 100%;
    @include clamp(2);
  }
}
.row-prize {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.info-dl {
  display: flex;
  line-height: 20px;
  dt {
    color: #000;
    width: 80px;
    font-size: 14px;
    flex: 0 0 auto;
  }
  dd {
    font-size: 12px;
    color: $color-border;
  }
}
.part-desc {
  font-size: 12px;
  line-height: 21px;
  color: $color-gray;
  padding: 0 17px;
}
.part-rich {
  font-size: 12px;
  color: $color-border;
}
</style>

  