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
  created() {
    // 更新tab
    window.addEventListener("index_update_tab", function(event) {
      // 获得事件参数
      let detail = event.detail;
      console.log("detail.to" + detail.to);
      if (data.to) this.$refs.footer.activePath = data.to;
    });

    // 更新所有子页面
    window.addEventListener("index_update_subpages", function(event) {
      // 获得事件参数
      let detail = event.detail;
      console.log("index_update_subpages");
      console.log("detail.to" + detail.to);

      // 更新
      MTOOL.config.subpages.forEach(path => {
        MTOOL.invoke(path, "event_update", { to: path });
      });
    });
  },
  mounted() {
    console.log(
      "this.$refs.footer.activePath: " + this.$refs.footer.activePath
    );
  }
};
</script>

<style lang="scss">
@import "~assets/scss/base.scss";
</style>
