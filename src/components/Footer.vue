<template>
  <div class="footer">
    <router-link class="footer-link" to="/index">
      <van-icon class="footer-icon" name="wap-home" />
      <span>首页</span>
    </router-link>
    <router-link class="footer-link" to="/my">
      <van-icon class="footer-icon" name="contact" />
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Icon } from "vant";

Vue.use(Icon);
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
<style lang="scss" scoped>
.footer {
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
  .footer-icon {
    display: block;
    font-size: 18px;
    margin: 0 auto;
  }
  .footer-link {
    display: block;
    padding: 5px 0;
    flex: 1 0 auto;
    border-radius: 0;
    transition: 0.2s ease;
    &:active {
      box-shadow: 0 0 100px inset #ddd;
    }
  }
  .router-link-active {
    color: #1296db;
  }
}
</style>

