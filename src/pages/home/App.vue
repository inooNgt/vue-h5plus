<template>
  <div id="app">
    <router-view/>
    <!-- <MFooter /> -->
  </div>
</template>

<script>
// import Footer from "../../components/Footer";

// import mui from "mui";

export default {
  name: "App",
  // components: {
  //   MFooter: Footer
  // }
  mounted() {
    console.log("home mounted");
  }
};
</script>

<style >
@import "../../assets/css/base.css";
</style>
