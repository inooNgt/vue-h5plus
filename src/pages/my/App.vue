<template>
  <div id="app">
    <router-view/>
    <!-- <MFooter /> -->
    <MFooter v-show="showFooter" />
  </div>
</template>

<script>
import Footer from "../../components/Footer";
import MTOOL from "mtool";

import "vant/lib/vant-css/icon-local.css";

export default {
  name: "App",
  components: {
    MFooter: Footer
  },
  data() {
    return {
      showFooter: !MTOOL.isPlus
    };
  },
  mounted() {
    MTOOL.cwcs.expose("tabbarUpdate", function() { 
      console.log("my tabbarUpdate");
      location.reload();
    });
  }
};
</script>

<style lang="scss">
@import "~assets/scss/base.scss";
</style>
