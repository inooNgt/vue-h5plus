<template>
  <div class="cts-content">
    <van-checkbox-group v-model="result">
      <ul v-for="group in groups" class="group" :class="'group-'+group.letter" :ref="'group-'+group.letter" v-bind:key="group.letter">
        <li v-for="item in group.data" class="list-item" v-bind:key="item.id">
          <van-checkbox :key="item.id" shape="square" :name="item.id">
            <div class="item-img"><img :src="item.photos && item.photos[0] && item.photos[0].value" alt=""></div>
            <div class="item-name">{{item.displayName}}</div>
          </van-checkbox>
        </li>
      </ul>

    </van-checkbox-group>
    <div class="contacts-hook">
      <span class="hook-item" v-for="char in letters" :key="char" @click="toHook(char)">
        {{char}}
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";

import { Button, NavBar, Checkbox, CheckboxGroup } from "vant";

Vue.use(Button)
  .use(NavBar)
  .use(Checkbox)
  .use(CheckboxGroup);

export default {
  name: "Contacts",
  props: {
    groups: Array,
    letters: Array
  },
  data() {
    return {
      result: []
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
      // console.log(element.children.length);
      let y = Math.max(0, MTOOL.elementPosition(element).y - 44);
      if (element && element.children.length) {
        // element.scrollIntoView();
        window.scrollTo(0, y);
        console.log("scrollToP:", document.body.scrollTop);
      }
    }
  }
};
</script>

 <style lang="scss">
.cts-content {
  .van-checkbox {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 18px;
  }
  .van-checkbox__label {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
    margin: 0;
    height: 48px;
  }
  .van-checkbox__icon {
    width: 20px;
  }
}
</style>
  

<style lang="scss" scoped>
@import "~assets/scss/common";
.list-item {
  margin-bottom: 18px;
}
.item-name {
  @extend %text-over;
  flex: 1 0 auto;
  padding: 0 9px;
  color: #210248;
  font-size: 14px;
  max-width: 200px;
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
  right: 19px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}
.hook-item {
  width: 20px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 10px;
}
</style>  
