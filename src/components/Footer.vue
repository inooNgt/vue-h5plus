<template>
  <div class="footer">
    <div class="footer-link" v-bind:class="{ active: activePath === 'home.html' }" @click="handleNavTap('home.html',$event)">
      <van-icon class="footer-icon" name="wap-home" />
      <span>Home</span>
    </div>
    <div class="footer-link" v-bind:class="{ active: activePath === 'vigour.html' }" @click="handleNavTap('vigour.html',$event)">
      <van-icon class="footer-icon" name="shop" />
      <span>Vigour</span>
    </div>
    <div class="footer-link" v-bind:class="{ active: activePath === 'my.html' }" @click="handleNavTap('my.html',$event)">
      <van-icon class="footer-icon" name="contact" />
      <span>My</span>
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

  display: flex;
  text-align: center;

  border: solid 1px #dddddd;
  background-color: #ffffff;

  .footer-icon {
    display: block;
    font-size: 18px;
    margin: 0 auto;
  }
  .footer-link {
    display: block;
    font-size: 10px;
    padding: px2rem(5px) 0;
    flex: 1 0 auto;
    border-radius: 0;
    transition: 0.2s ease;
    &:active {
      box-shadow: 0 0 100px inset #ddd;
    }
    &.active {
      color: $color-main;
    }
  }
  .router-link-active {
    color: #1296db;
  }
}
</style>
 
