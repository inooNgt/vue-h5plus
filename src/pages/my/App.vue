<template>
  <div id="app">
    <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
      <div class="mui-scroll">
        <Index />    
        <!-- <MFooter /> -->
      </div>
    </div>
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

<style lang="scss">
@import "~assets/scss/base.scss";
.mui-scroll-wrapper {
}
</style>
