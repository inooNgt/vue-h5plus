<template>
    <div class="card-item">
        <div class="card-cover">
            <img class="cover-img" src="" alt="">
        </div>
        <div class="row-msg">
            <div class="col-left">{{card.title}}</div>
            <div class="col-right">{{card.status}}</div>
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
  name: "Card",
  props: ["data"],
  data() {
    return {
      card: this.$props.data,
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.card-item {
  width: 100%;
  padding: $padding-main;
  margin-bottom: $padding-main;
  position: relative;
  border: solid 1px #dddddd;
  background: #fff;   
}
.card-cover {
  height: 148px;
  border: solid 1px #dddddd;
}
.row-msg {
  display: flex;
  padding: 10px 0 12px;
  .col-left {
    width: 50%;
    line-height: 25px;
    color: $color-main;
    font-size: 16px;
  }
  .col-right {
    width: 50%;
    font-size: 12px;
    line-height: 22px;
    color: #000;
    text-align: right;
    padding-left: 20px;

    &.finished {
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
 
