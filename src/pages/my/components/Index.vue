<template>
  <div class="page-content" :class="!isPlus?'broswer-content':''">
    <div class="my-header">
      <img src="~assets/img/my_bg.png" class="my-bg-img" alt="">
      <div class="my-header-content">
        <nav class="bar-setting">
          <van-icon class="icon-setting" name="setting" />
        </nav>
        <div class="row-img">
          <div class="img-wrap">
            <img class="header-img" v-if="avatar" :src="avatar" />
            <img class="header-img" v-if="!avatar" src="~assets/img/head.png" />
          </div>
        </div>
        <div class="row-msg">
          <div class="msg-name" v-if="logined">{{username}}</div>
          <div class="msg-login" v-if="!logined">登录有惊喜哟</div>
        </div>
      </div>
    </div>
    <ul class="my-list ">
      <li class="list-item">
        <div class="item-left">
          <div class="item-title">我的文章</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">
          <div class="item-title">关于我们</div>
        </div>
        <div class="item-right">
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { preload } from "utils/utils";
import API from "utils/api";
import { Cell, CellGroup, Icon, Toast } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      logined: false,
      isPlus: MTOOL.isPlus,
      username: "",
      energyTotal: "--",
      tokenTotal: "--",
      authstatus: "",
      checkinlist: "",
      signed: false,
      avatar: "",
      preloaded: false
    };
  },
  computed: {},
  created() {
    // 更新所有子页面
    window.addEventListener("event_update", event => {
      // 获得事件参数
      let detail = event.detail;
      this.update();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {},
    update() {},
    goAbout() {
      MTOOL.openWindowWithTitle("my_about.html");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Index";
</style>
