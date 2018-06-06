<template>
  <div>
    My
    <Navbar />
  </div>
</template>

<script>
import Nav from "../../../components/Nav";

export default {
  name: "Index",
  components: {
    Navbar: Nav
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

