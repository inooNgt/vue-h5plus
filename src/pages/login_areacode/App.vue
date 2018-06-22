<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script>
import MTOOL from "mtool";
import Index from "./components/Index";

import "vant/lib/vant-css/icon-local.css";

export default {
  name: "App",
  components: {
    Index
  },
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