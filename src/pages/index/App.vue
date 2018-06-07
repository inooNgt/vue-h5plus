<template>
  <div id="app">
    <router-view/>
    <MFooter />
  </div>
</template>

<script>
import Footer from "../../components/Footer";
export default {
  name: "App",
  components: {
    MFooter: Footer
  },
  created() {
    console.log("app created");
  }
};
</script>



<style >
@import "../../assets/css/base.css";
</style>
