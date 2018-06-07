<template>
  <div class="page-content">
    <div class="cell-header">
      <div class="cell-img">header</div>
      <div class="cell-msg">
        <div class="msg-name">name</div>
        <div class="msg-phone">phone</div>
      </div>

    </div>
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style scoped>
.cell-header {
  display: flex;
}
</style>
