<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import "vant/lib/vant-css/icon-local.css";
import Index from "./components/Index";

export default {
  name: "App",
  components: {
    Index
  },
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
