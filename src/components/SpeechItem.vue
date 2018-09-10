<template>
  <div class="speech-item md-line-bottom">
    <h4 class="speech-head">
      <div class="speech-img-wrap" @tap="goMmember(data.user_id)">
        <img :src="data.avatar" class="head-img" alt="">
      </div>
      <div class="head-title">
        <div class="title">
          <span class="text-black">{{data.username}}</span>
          <span class="text-main" @tap="goMenpai(data.group_id)">@{{data.group_name}}</span>
        </div>
        <div class="speech-desc">{{data.summary}}</div>
      </div>
      <time v-if="!deltime" class="time ">{{data.time}}</time>
    </h4>
    <div class="speech-body">
      <div class="speech-content" :class="data.thumb?'speech-content-img':'speech-content-text'" @tap="goDetail()">
        <div class="content-wrap">
          <div class="content-img-wrap " v-if="data.thumb">
            <img :src="data.thumb" class="content-img" alt="">
          </div>
          <div class="title">{{data.title}}
          </div>
          <div class="content" v-html="data.body"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { redirect } from "utils/utils";

export default {
  name: "MenpaiItem",
  props: {
    data: Object,
    hidetime: Boolean,
    onitemclick: Function,
    bangroup: Boolean,
    banmember: Boolean
  },
  data() {
    return {
      deltime: this.$props.hidetime,
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    goDetail() {
      let data = this.$props.data || {};

      const REDIRECT_GROUP_DETAIL = 21; // 跳转到⻔派详情
      const REDIRECT_USER_DETAIL = 22; // 跳转到⽤户详情

      if (data.redirect === REDIRECT_GROUP_DETAIL) {
        return;
      }

      if (data.redirect === REDIRECT_USER_DETAIL) {
        return;
      }

      redirect(data.redirect, data.data.id);
    },
    goMenpai(id) {
      if (this.bangroup) {
        return;
      }

      if (id !== undefined) {
        // MTOOL.invoke("home_info_menpai.html", "event_update", {
        //   id
        // });
        MTOOL.openWindow(`home_info_menpai.html#/${id}`);
      }
    },
    goMmember(id) {
      if (this.banmember) {
        console.log("banmember!!");
        return;
      }

      if (id !== undefined) {
        MTOOL.openWindow(`menpai_member.html#/${id}`);
        MTOOL.invoke("menpai_member.html", "event_update", { id });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.speech-head {
  display: flex;
  .speech-img-wrap {
    position: relative;
    overflow: hidden;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 9px;
    flex: 0 0 auto;
    border: 0.5px solid rgba(150, 150, 150, 0.25);
    .head-img {
      // @extend %img-border;
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
    }
  }
  .head-title {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 4px 0;
    max-width: px2rem(220px);
    .title {
      padding: 2px 0 0;
      line-height: 18px;
      font-size: 16px;
      font-weight: 600;
      color: $color-main;
      @extend %text-over;
    }
  }
  .time {
    color: $color-border;
    font-size: 12px;
    font-weight: normal;
    flex: 1 0 auto;
    padding: 4px 0;
    text-align: right;
  }
}

.speech-item {
  padding-bottom: 19px;
  margin-bottom: 19px;
  padding-right: $padding-main;
  &:last-child {
    margin-bottom: 0;
  }
}
.speech-body {
  padding-left: 39px;
}

.speech-content {
  position: relative;
  background-color: #f6f6f6;
  border-radius: 5px;
  margin-top: 12px;
  padding: 10px;

  display: flex;
  align-items: center;

  .content-wrap {
    position: relative;
    width: 100%;
    flex: 0 0 auto;
  }

  &.speech-content-img {
    .content-wrap {
      padding-left: 60px;
    }
  }

  .content-img-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 54px;
    height: 54px;
    margin-right: 6px;
    flex: 0 0 auto;
    border: 0.5px solid rgba(150, 150, 150, 0.25);

    border-radius: 5px;
    overflow: hidden;

    .content-img {
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      @include clamp(2);
    }
  }

  .title {
    font-size: 16px;
    font-weight: normal;
    color: #000;
    line-height: 19px;
    // max-width: 220px;
    @extend %text-over;
  }
  .content {
    margin-top: 4px;
    font-size: 12px;
    color: $color-tip;
    line-height: 16px;
    height: 32px;
    overflow: hidden;
    @include clamp(2);
  }
}

.speech-desc {
  color: $color-border;
  font-size: 12px;
  font-weight: normal;
}
</style>

