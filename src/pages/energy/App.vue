<template>
  <div id="app">
    <Index />
    <MFooter v-show="showFooter" />
  </div>
</template>

<script>
import Footer from "../../components/Footer";
import Index from "./components/Index";
import MTOOL from "mtool";

import "vant/lib/vant-css/icon-local.css";

export default {
  name: "App",
  components: {
    MFooter: Footer,
    Index
  },
  data() {
    return {
      showFooter: !MTOOL.isPlus
    };
  },
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>

<style lang="scss" >
@import "~assets/scss/var";
@import "~assets/scss/common";
@import "../../assets/scss/base.scss";
html,
body {
  background: #dddddd;
  height: 100%;
}

#app,
.page-content {
  background: #dddddd;
  min-height: 100%;
}
</style>
