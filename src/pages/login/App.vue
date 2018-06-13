<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import MTOOL from "mtool";

import "vant/lib/vant-css/icon-local.css";

export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    console.log("login mounted");
  }
};
</script>

<style lang="scss">
@import "~assets/scss/base.scss";
</style>