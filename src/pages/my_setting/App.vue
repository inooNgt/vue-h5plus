<template>
  <div id="app">
    <router-view/>
    <!-- <MFooter /> -->
  </div>
</template>

<script>
import "vant/lib/vant-css/icon-local.css";

export default {
  name: "App",

  data() {
    return {
      showFooter: false
    };
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "../../assets/scss/base.scss";
</style>
