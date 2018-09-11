<template>
  <div id="app">
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
  created() {
    // 更新tab
    window.addEventListener("index_update_tab", event => {
      // 获得事件参数

      let detail = event.detail;
      if (detail.path) this.$refs["footer"].activePath = detail.path;
    });
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "~assets/scss/base.scss";
</style>
