<template>
    <div class="load-wrapp">
        <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Card",
  props: {
    data: Object,
    onsignupclick: Function,
    oncardclick: Function
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.load-3 {
  text-align: center;
}

.line {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: $color-main;
}

.load-3 .line:nth-last-child(1) {
  animation: loadingC 0.6s 0.1s linear infinite;
}
.load-3 .line:nth-last-child(2) {
  animation: loadingC 0.6s 0.2s linear infinite;
}
.load-3 .line:nth-last-child(3) {
  animation: loadingC 0.6s 0.3s linear infinite;
}

@keyframes loadingC {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
 
