<template>
  <div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="外卖">
        <img slot="icon"> 外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon"> 订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon"> 发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon"> 我的
      </mt-tab-item>
    </mt-tabbar>

    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-container1">
        1111111
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        22222
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        333333
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabItem, TabContainer, TabContainerItem } from "mint-ui";

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

export default {
  name: "HelloWorld",
  props: ["selected", "active"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

