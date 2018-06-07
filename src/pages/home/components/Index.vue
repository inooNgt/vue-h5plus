<template>
  <van-tabs v-model="active">
    <van-tab v-for="(item, index)  in list" :title="item.title" v-bind:key="index">
      内容 {{ index }}
    </van-tab>
  </van-tabs>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";

Vue.use(Tab).use(Tabs);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      list: [{ title: "学知识" }, { title: "看路演" }],
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style scoped>
body {
  background: #000;
  color: #fff;
}
</style>
