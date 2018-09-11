<template>
  <div class="popup amt-popUp" v-show="show" @touchstart="stop">
    <ul class="popup-list">
      <li class="popup-item" @touchstart="goCreate">
        <i class="iconfont icon-add"></i>
        <span>创建门派</span>
      </li>
      <li class="popup-item" @touchstart="goEditor">
        <i class="iconfont icon-edit"></i>
        <span>发布文章</span>
      </li>
      <li class="popup-item" @touchstart="sweep">
        <i class="iconfont icon-sweep"></i>
        <span>扫一扫</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
import { stopPropagation } from "utils/utils";

Vue.use(Toast);

export default {
  name: "Popup",
  props: {
    menpailenth: Number
  },
  created() {},
  data() {
    return {
      show: false
    };
  },
  methods: {
    stop(e) {
      stopPropagation(e);
    },
    hide() {
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
    goCreate() {
      this.hide();
      MTOOL.openWindow("menpai_create.html");
    },
    goEditor() {
      if (!this.menpailenth) {
        Toast("加入门派后才可以发布文章，快去加入门派吧");
        return;
      }
      this.hide();
      MTOOL.openWindow("menpai_editor.html");
    },
    sweep() {
      this.hide();
      MTOOL.openWindow("sweepcode.html", {
        styles: {
          background: "#000000"
        },
        aniShow: "fade-in"
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.popup {
  position: fixed;
  top: 48px;
  right: px2rem(6px);
  padding: 0 14px;
  background: #000;
  color: #fff;
  z-index: 10000;
  border-radius: 4px;
  min-width: 110px;
  .popup-item {
    display: flex;
    height: 42px;
    align-items: center;
    font-size: 16px;
    @extend %border-bottom-light;
    .iconfont {
      font-size: 15px;
      color: #fff;
      margin-right: 12px;
    }
  }
  &:after {
    content: "";
    position: absolute;
    top: -15px;
    right: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent transparent #000 transparent;
  }
}
</style>
 
