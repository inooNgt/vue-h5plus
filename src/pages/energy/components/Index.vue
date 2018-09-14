<template>
  <div class="page-content nav-content" :class="isPlus?'':'broswer-content'">
    <van-nav-bar title="功能" fixed />
    <header class="header">
      <img class="header-bg" src="~assets/img/speedup_bg.png" />
      <div class="header-content">
        <div class="row-beat">已击败{{0}}%的用户</div>
        <div class="row-ball">
          <div class="ball-cell" @click="update">
            <div class="md-icon-speedball "></div>
            <div class="cell-label">当前功力值</div>
            <div class="cell-value">{{0}}</div>
          </div>
        </div>
      </div>
    </header>
    <section class="cell-wrap">
      <div class="item-cell">
        <div class="cell-padding">
          <img src="~assets/img/energy_xiu.png" class="cell-img" alt="">
          <div class="cell-content">
            <div class="cell-text">炼丹师</div>
          </div>
        </div>
      </div>
      <div class="item-cell">
        <div class="cell-padding">
          <img src="~assets/img/energy_invite.png" class="cell-img" alt="">
          <div class="cell-content">
            <div class="cell-text">招募令</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import mui from "mui";
import MTOOL from "mtool";
import { Button, NavBar } from "vant";
import { preload } from "utils/utils";

Vue.use(Button).use(NavBar);

const preloadPages = ["energy_seclusion.html"];

export default {
  name: "Index",
  data() {
    return {
      energyTotal: 0,
      topRange: 0,
      isPlus: MTOOL.isPlus,
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

    if (MTOOL.isPlus) {
      MTOOL.plusReady(() => {
        let self = plus.webview.currentWebview();

        self.addEventListener("hide", () => {
          this.clear();
        });

        if (!this.preloaded) {
          preload(preloadPages);
          this.preloaded = true;
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    goBack() {
      mui.back();
    },

    clear() {
      this.energyTotal = 0;
      this.topRange = 0;
    },
    init() {},
    update() {
      // 首次显示没有触发hide事件
      this.clear();
    },

    goInvite() {
      MTOOL.openWindowWithTitle("my_invite.html");
    },

    goSeclusion() {
      MTOOL.openWindow("energy_seclusion.html");
    },
    goRank() {
      MTOOL.openWindowWithTitle("energy_rank.html");
    }
  }
};
</script>

<style lang="scss">
body,
html {
  background: #ddd;
}
</style>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.page-content {
  // background-image: url(~assets/img/1.png);
  // background-repeat: no-repeat;
  // background-size: 100%;
  // background-position: 0 -20px;
  padding-bottom: 20px;
  position: relative;
}

.broswer-content {
  padding-bottom: 49px;
  .row-tip {
    bottom: 74px;
  }
}

.row-tip {
  position: fixed;
  bottom: px2rem(24px);
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: $color-tip;
}

.header {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 67.9%;
}

.header-content,
.header-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.header-bg {
}

.header-content {
  z-index: 1;
  padding: px2rem(18px) $padding-main px2rem(32px);
  transform-style: preserve-3d;
  perspective: 500px;
}

.row-beat {
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin-bottom: px2rem(17px);
  @extend %text-over;
}

.row-ball {
  text-align: center;
  .ball-cell {
    padding-top: px2rem(30px);
    margin: 0 auto;
    width: px2rem(124px);
    height: px2rem(147px);
    color: #fff;
    position: relative;
    .md-icon-speedball {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-image: url(~assets/img/speedup_ball.png);
    }
  }
  .cell-label {
    font-size: 10px;
    position: absolute;
    width: 100%;
    top: 50%;
    margin-top: px2rem(-20px);
    z-index: 1;
  }
  .cell-value {
    font-size: px2rem(30px);
    font-weight: 600;
    position: absolute;
    height: px2rem(38px);
    line-height: px2rem(38px);
    width: 200px;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -1px;
    z-index: 1;
  }
}

.row-bottom {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  @extend %text-over;
}

.cell-wrap {
  display: flex;
  align-items: center;
  padding: $padding-main;
}

.item-cell {
  flex: 1;
  background: #fff;
  position: relative;
  background: none;
  .cell-padding {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  &:first-child {
    margin-right: $padding-main;
  }
  .cell-content,
  .cell-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  .cell-content {
    box-shadow: 0px 1px 9px 0px rgba(0, 0, 0, 0.21);
    z-index: 1;
    padding: $padding-main;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    font-size: 22px;
    line-height: 22px;
    font-weight: 600;
    color: #fff;
  }
  .cell-img {
  }
}

@media screen and (max-height: 520px) {
  .row-tip {
    position: initial;
    bottom: initial;
    margin-bottom: 20px;
  }
}
</style>
