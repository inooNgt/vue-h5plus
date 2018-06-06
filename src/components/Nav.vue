<template>
    <div class="navbar">
        <router-link class="nav-link" to="/index">
            <img class="nav-icon" src="../assets/img/index.png" />
            <span>首页</span>
        </router-link>
        <router-link class="nav-link" to="/my">
            <img class="nav-icon" src="../assets/img/my.png" />
            <span>我的</span>
        </router-link>
    </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";

Vue.use(Button);

export default {
  name: "Nav",
  props: ["selected"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
<style>
.navbar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  display: flex;
  text-align: center;

  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #fafafa;
}
.nav-icon {
  display: block;
  width: 24px;
  height: 24px;
  margin: 0 auto;
}
.nav-link {
  display: block;
  line-height: 20px;
  flex: 1 0 auto;
  border-radius: 0;
  transition: 0.2s;
}
.router-link-active {
  color: #007aff;
}
.nav-link:active {
  background: #ddd;
}
</style>

