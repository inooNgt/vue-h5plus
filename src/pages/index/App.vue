<template>
  <div id="app">
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
    console.log("index created");
  },
  mounted() {
    console.log("index mounted");
  }
};
</script>



<style >
@import "../../assets/css/base.css";
</style>
