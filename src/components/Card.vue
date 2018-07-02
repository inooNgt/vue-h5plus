<template>
  <div class="card-item" @click="oncardclick(data.id)">
    <div class="card-cover">
      <img class="cover-img" :src="data.picture" alt="">
    </div>
    <h5 class="row-title">{{data.title}}</h5>
    <div class="row-msg">
      <div class="col-left">
        <div class="cell-info">
          <i class="md-icon md-icon-organizer"></i>
          {{data.organizer}}
        </div>
        <div class="cell-info">
          <span class="info-area">
            <i class="md-icon md-icon-adress"></i>
            {{data.location_city}}
          </span>
          <time class="info-time">
            <i class="md-icon md-icon-time"></i>
            {{data.time_text}}
          </time>
        </div>
      </div>
      <div class="col-right">
        <div class="info-prize">{{data.price_text}}</div>
        <van-button slot="button" class="btn btn-sub-mini" @click="onsignupclick($event,data.id)">立即报名</van-button>
      </div>
    </div>
    <div class="row-status" v-show="data.status_text" :class="statusclass">{{data.status_text}}</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Icon } from "vant";
import MTOOL from "mtool";
import config from "utils/config";

Vue.use(Icon);
Vue.use(Button);

const SUCCESS_STATUS_NORMAL = 1; // 一般状态
const SUCCESS_STATUS_SOON = 2; // 即将开始
const SUCCESS_STATUS_PROCESSING = 3; // 进行中
const SUCCESS_STATUS_ENDED = 4; // 已结束

export default {
  name: "Card",
  props: {
    data: Object,
    onsignupclick: Function,
    oncardclick: Function
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      starttime: "",
      endtime: "",
      statusclass: ""
    };
  },
  computed: {},
  beforeUpdate() {
    console.log("beforeUpdate");
    this.statusclass = this.getStatusClass(this.$props.data.status);
  },
  mounted() {
    this.$nextTick(() => {
      this.statusclass = this.getStatusClass(this.$props.data.status);
    });
  },
  methods: {
    formatTime(time) {
      let date = new Date(time);

      console.log(date);
      let m = date.getMonth() + 1;
      let day = date.getDate();
      return m + "/" + day;
    },

    getStatusClass(status) {
      if (status * 1 === SUCCESS_STATUS_SOON) return "soon";
      if (status * 1 === SUCCESS_STATUS_PROCESSING) return "processing";
      if (status * 1 === SUCCESS_STATUS_ENDED) return "ended";
      return "normal";
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.card-item {
  width: 100%;
  padding: $padding-main $padding-main 10px;
  margin-bottom: $padding-main;
  position: relative;
  border: solid 1px #dddddd;
  overflow: hidden;
  background: #fff;
}
.row-status {
  position: absolute;
  text-align: center;
  top: -21px;
  right: -35px;
  width: 90px;
  height: 60px;
  padding-top: 39px;
  background-color: #ffffff;
  box-shadow: 0px 2px 7px 0px rgba(141, 141, 141, 0.6);
  transform: rotate(45deg);
  font-size: 10px;
  color: $color-main;
  &.ended {
    color: $color-gray;
  }
}
.card-cover {
  height: 0;
  width: 100%;
  padding-top: 57.14%;
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
  display: flex;
  .col-left {
    flex: 1 0 auto;
    line-height: 25px;
    color: $color-gray;
    font-size: 12px;
    padding-top: 8px;
    .cell-info {
      width: 200px;
      @extend %text-over;
    }
  }
  .col-right {
    width: 110px;
    font-size: 12px;
    line-height: 22px;
    color: #000;
    text-align: right;
    &.finished {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .info-time {
    margin-left: 3px;
  }
  .md-icon {
    // width: 12px;
    // height: 12px;
    position: relative;
    top: -1px;
  }
}

.info-prize {
  height: 26px;
  font-size: 14px;
  color: #000;
  @extend %text-over;
}
.row-title {
  margin: 10px 0;
  line-height: 20px;
  height: 40px;
  color: $color-main;
  font-size: 14px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.btn-sub-mini {
  margin-top: 3px;
}
</style>
 
