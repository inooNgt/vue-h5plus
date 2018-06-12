<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" />
    <van-tabs v-model="active">
      <van-tab v-for="item in tablist" :title="item.title" v-bind:key="item.id">
        item.title内容
      </van-tab>
    </van-tabs>
    <div>
      <van-button size="large" @click="shareSystem">系统分享</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";
import { Button, NavBar, Tab, Tabs } from "vant";

Vue.use(Button)
  .use(NavBar)
  .use(Tab)
  .use(Tabs);

export default {
  name: "Index",
  data() {
    return {
      tablist: [
        {
          id: 0,
          title: "专属地址"
        },
        {
          id: 1,
          title: "专属海报"
        }
      ],
      active: 0,
      list: [
        {
          id: "1",
          displayName: "name",
          phoneNumbers: [{ id: "1", value: "10086" }]
        }
      ],
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    shareSystem: function() {
      let msg = {
        content: "我是xxx，邀请你来领取DIC，http://www.xxx.com/sharw/ARXYX"
      };
      MTOOL.shareSystem({
        msg,
        success: () => {
          console.log("share success");
        },
        fail: e => {
          console.log("share error", e);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
.list {
  padding-top: 20px;
  font-size: 16px;
}
.list-item {
  padding: 0 20px;
  line-height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
</style>
