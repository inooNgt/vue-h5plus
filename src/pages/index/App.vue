<template>
  <div id="app">
    <router-view/>
    <MFooter ref="footer" />
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
    console.log("this.$refs.footer.activePath", this.$refs.footer.activePath);
    MTOOL.cwcs.expose("updateTab", data => {
      console.log("updateTab:" + data.to);
      if (data.to) this.$refs.footer.activePath = data.to;
    });
  }
};
</script>

<style lang="scss">
@import "~assets/scss/base.scss";
</style>
