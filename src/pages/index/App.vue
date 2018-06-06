<template>
  <div id="app">
    <router-view/>
    <Navbar />
  </div>
</template>

<script>
import Nav from "../../components/Nav";
export default {
  name: "App",
  components: {
    Navbar: Nav
  }
};
</script>



<style >
@import "../../assets/css/base.css";
</style>
