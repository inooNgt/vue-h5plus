<template>
  <div class="page-content">
    <van-tabs v-model="active">
      <van-tab v-for="(item, index)  in list" :title="item.title" v-bind:key="index">
        test {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, Icon } from "vant";

Vue.use(Tab)
  .use(Tabs)
  .use(Icon);

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

<style lang="scss" >
.van-tabs__content {
  padding: 0 20px;
}
</style>

