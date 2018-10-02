<template>
  <div class="footer">
    <div class="footer-link" v-bind:class="{ active: activePath === 'home.html' }" @click="handleNavTap('home.html',$event)">
      <span class="md-icon icon-home-tab1"></span>
    </div>
    <div class="footer-link" v-bind:class="{ active: activePath === 'energy.html' }" @click="handleNavTap('energy.html',$event)">
      <span class="md-icon icon-home-tab2"></span>
    </div>
    <div class="footer-link" v-bind:class="{ active: activePath === 'my.html' }" @click="handleNavTap('my.html',$event)">
      <span class="md-icon icon-home-tab3"></span>
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
  name: "Footer",
  data() {
    return {
      activePath: "home.html"
    };
  },
  mounted() {
    this.$nextTick(() => {});
    let pathname = window.location.pathname || "";
    pathname = pathname.substr(pathname.lastIndexOf("/") + 1);
    this.activePath = pathname === "index.html" ? "home.html" : pathname;
  },
  methods: {
    handleNavTap: function(path, event) {
      if (this.activePath === path && MTOOL.isPlus) {
        return;
      }

      MTOOL.switchNav(path, this.activePath);
      this.activePath = path;

      // 更新
      MTOOL.invoke(path, "event_update");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.md-icon {
  display: inline-block;
  background-size: cover;
}

.icon-home-tab1 {
  width: 32px;
  height: 32px;
  background-image: url(~assets/img/home_tab1.png);
}
.icon-home-tab2 {
  width: 32px;
  height: 32px;
  background-image: url(~assets/img/home_tab2.png);
}

.icon-home-tab3 {
  width: 36px;
  height: 36px;
  background-image: url(~assets/img/home_tab3.png);
}
.footer-link.active {
  .icon-home-tab1 {
    background-image: url(~assets/img/home_tab1_h.png);
  }
  .icon-home-tab2 {
    background-image: url(~assets/img/home_tab2_h.png);
  }

  .icon-home-tab3 {
    background-image: url(~assets/img/home_tab3_h.png);
  }
}

.footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  height: 49px;

  display: flex;
  text-align: center;

  background-color: #ffffff;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);

  .footer-icon-wrap {
    display: block;
    height: 22px;
    margin: 0 auto;
  }
  .footer-link {
    display: flex;
    font-size: 10px;
    padding: 0;
    flex: 1 0 auto;
    border-radius: 0;
    transition: 0.2s ease;
    color: $color-gray;

    justify-content: center;
    align-items: center;

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

