<template>
  <div class="rec-item md-item-border" @click="onitemclick && onitemclick(data.id) || null">
    <div class="item-left">
      <div class="rec-img-wrap">
        <img class="rec-img" v-if="data.thumb" :src="data.thumb" alt="">
      </div>
    </div>
    <div class="item-center">
      <h4 class="rec-title">{{data.name}}
        <span class="md-icon md-icon-yuanbao" v-if="data.price*1"></span>
        <!-- <span class="md-icon-price" v-if="data.price*1">付费</span> -->
      </h4>
      <h6 class="rec-sub-title">{{data.description}} </h6>
      <div class="rec-name">{{data.username}}</div>
      <div class="rec-msg">
        <span class="msg-cell">
          <i class="iconfont icon-ren"></i>
          <span class="text-tip">{{data.user_count || 0}}</span>
        </span>
        <span class="msg-cell">
          <i class="iconfont icon-huo"></i>
          <span class="text-tip">{{data.energy_count || 0}}</span>
        </span>
        <span class="msg-cell">
          <i class="iconfont icon-chanpin"></i>
          <span class="text-tip">{{data.event_count || 0}}</span>
        </span>
      </div>
    </div>
    <div class="item-right">
      <div class="md-silver">
        <div class="silver-head">银响值</div>
        <div class="silver-value">{{data.token_ability}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "MenpaiItem",
  props: {
    data: Object,
    onitemclick: Function
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

$width: 72px;
$height: 72px;

.md-silver {
  width: 44px;
  border-radius: 5px;
  .silver-head {
    // height: 18px;
    line-height: 18px;
    background: $color-main;
    color: #fff;
    font-size: 10px;
    font-weight: normal;
    border-radius: 5px 5px 0 0;
    @extend %text-over;
  }
  .silver-value {
    max-height: 36px;
    overflow: hidden;
    line-height: 18px;
    font-size: 12px;
    font-weight: normal;
    color: $color-main;
    border: solid 1px #f6f6f6;
    border-top: none;
    border-radius: 0 0 5px 5px;
  }
}

.md-icon-yuanbao {
  width: 22px;
  height: 11px;
  position: relative;
  top: -2px;
  background-image: url(~assets/img/icon_yuanbao.png);
}

.rec-item {
  display: flex;
  margin-bottom: $padding-main;
  padding-bottom: $padding-main;
  &:last-child {
    margin-bottom: px2rem(11px);
    border-bottom: none !important;
  }
  .item-left {
    width: $width;
    display: flex;
  }
  .item-right {
    width: 65px;
    padding-right: 6px;
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
  }
  .item-center {
    height: $height;
    padding: 0 10px;
    flex: 1 1 auto;
    color: $color-tip;
  }
  .rec-img-wrap {
    width: $width;
    height: $height;
    @extend %img-wrap;

    .rec-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      // @extend %img-border;
    }
  }
  .rec-title {
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    color: #000;
    max-width: px2rem(180px);
    padding: 2px 0 0;
    @extend %text-over;
  }
  .rec-sub-title {
    padding-top: 2px;
    height: 17px;
    color: $color-tip;
    max-width: px2rem(180px);
    @extend %text-over;
  }
  .rec-name {
    line-height: 18px;
  }
  .rec-msg {
    line-height: 18px;
    max-width: px2rem(180px);
    @extend %text-over;
    .iconfont {
      font-size: 12px;
      color: $color-tip;
    }
  }
  .msg-cell {
    margin-right: 8px;
  }
}

.md-icon-price {
  display: inline-block;
  width: 44px;
  height: 22px;
  line-height: 22px;
  background: $color-main;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  transform: scale(0.6);
}
</style>
 
