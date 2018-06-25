<template>
  <div class="cts-content">
    <van-radio-group v-model="radio">
      <div v-for="group in groups" class="group" :class="'group-'+group.label" :ref="'group-'+group.label" v-bind:key="group.label">
        <h5 class="list-label">{{group.label ==="oftenused"?"常用":group.label}}</h5>
        <div v-for="item in group.data" class="list-item" v-bind:key="item.id">
          <van-radio :key="item.id" shape="square" :name="item.id" @click="radioChange(item.id)">
            <div class="item-name">{{item.value}}</div>
          </van-radio>
        </div>
      </div>

    </van-radio-group>
    <div class="contacts-hook">
      <span class="hook-item" v-for="char in letters" :key="char" @click="toHook(char)">
        {{char ==="oftenused"?"常用":char}}
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";

import { Button, NavBar, Radio, RadioGroup } from "vant";

Vue.use(Button)
  .use(NavBar)
  .use(Radio)
  .use(RadioGroup);

export default {
  name: "Areacodes",
  props: {
    groups: Array,
    letters: Array,
    radioChange: Function
  },
  data() {
    return {
      radio: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log("refs:", this.$refs);
    });
  },
  updated() {
    // console.log("groups---:" + this.groups.length);
  },
  methods: {
    toHook: function(char) {
      let element = this.$refs["group-" + char][0];
      let y = Math.max(0, MTOOL.elementPosition(element).y - 44);
      if (element && element.children.length) {
        window.scrollTo(0, y);
        // console.log(
        //   "scrollToP: " + document.body.scrollTop ||
        //     document.documentElement.scrollTop
        // );
      }
    }
  }
};
</script>

 <style lang="scss">
.cts-content {
  .van-radio {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 18px;
  }
  .van-radio__input {
    opacity: 0;
  }
  .van-radio__label {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
    margin: 0;
    height: 31px;
  }
  .van-radio__icon {
    width: 20px;
  }
}
</style>
  

<style lang="scss" scoped>
@import "~assets/scss/common";

.group {
  position: relative;
  padding: $padding-main 0 14px;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
        90deg,
        #ffffff -10%,
        #dddddd 50%,
        #ffffff 111%
      ),
      linear-gradient(#311455, #311455);
    background-blend-mode: normal, normal;
  }
  &:last-child:after {
    display: none;
  }
}
.list-item {
  font-size: 14px;
  color: #000000;
}
.list-label {
  color: $color-main;
  font-size: 14px;
}
.item-name {
  @extend %text-over;
  flex: 1 0 auto;
  max-width: 90%;
}
.item-img {
  // width: 45px;
  // height: 45px;
  background-color: #fff;
  border-radius: 5px;
  & > img {
    display: block;
    width: 45px;
    height: 45px;
    border-radius: 5px;
    border: none;
  }
}
.item-check {
  width: 30px;
}
.contacts-hook {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 99;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}
.hook-item {
  width: 50px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 10px;
  color: $color-main;
  @extend %text-over;
}
</style>  
