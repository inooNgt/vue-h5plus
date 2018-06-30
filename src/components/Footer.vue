<template>
  <div class="footer">
    <div class="footer-link" v-bind:class="{ active: activePath === 'home.html' }" @click="handleNavTap('home.html',$event)">
      <div class="footer-icon-wrap">
        <span class="md-icon icon-home-star"></span>
      </div>
      <span class="link-text">首页</span>
    </div>
    <div class="footer-link" v-bind:class="{ active: activePath === 'course.html' }" @click="handleNavTap('course.html',$event)">
      <div class="footer-icon-wrap">
        <span class="md-icon icon-home-course"></span>
      </div>
      <span class="link-text">课程</span>
    </div>
    <div class="footer-link" v-bind:class="{ active: activePath === 'activity.html' }" @click="handleNavTap('activity.html',$event)">
      <div class="footer-icon-wrap">
        <span class="md-icon icon-home-activity"></span>
      </div>
      <span class="link-text">活动</span>
    </div>
    <div class="footer-link" v-bind:class="{ active: activePath === 'my.html' }" @click="handleNavTap('my.html',$event)">
      <div class="footer-icon-wrap">
        <span class="md-icon icon-home-my"></span>
      </div>
      <span class="link-text">我的</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Icon } from "vant";
import MTOOL from "mtool";
import config from "utils/config";

Vue.use(Icon);
Vue.use(Button);

export default {
  name: "Nav",
  props: ["selected"],
  data() {
    return {
      activePath: "home.html",
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.$nextTick(() => {});
    let pathname = window.location.pathname || "";
    pathname = pathname.substr(pathname.lastIndexOf("/") + 1);
    // console.log("infooter pathname:");
    // console.log(pathname);
    this.activePath = pathname === "index.html" ? "home.html" : pathname;
  },
  methods: {
    handleNavTap: function(path, event) {
      if (this.activePath === path && MTOOL.isPlus) {
        return;
      }

      MTOOL.switchNav({
        from: this.activePath,
        to: path
      });
      this.activePath = path;

      // 更新
      MTOOL.invoke(path, "event_update", { to: path });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  height: 49px;

  display: flex;
  text-align: center;

  border: solid 1px #dddddd;
  background-color: #ffffff;

  .footer-icon-wrap {
    display: block;
    height: 20px;
    margin: 0 auto;
  }
  .footer-link {
    display: block;
    font-size: 10px;
    padding: 7px 0 3px;
    flex: 1 0 auto;
    border-radius: 0;
    transition: 0.2s ease;
    &:active {
      // box-shadow: 0 0 100px inset #ddd;
    }
    &.active {
      color: $color-main;
    }
  }
  .link-text {
    height: 20px;
    line-height: 20px;
    display: block;
    padding-top: 1px;
  }
  .router-link-active {
    color: #1296db;
  }
}
</style>
 
