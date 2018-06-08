<template>
  <div id="app">
    <router-view/>
    <MFooter />
  </div>
</template>

<script>
import Footer from "../../components/Footer";
import MTOOL from "mtool";

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
    console.log("my mounted");
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/base.scss";
</style>
