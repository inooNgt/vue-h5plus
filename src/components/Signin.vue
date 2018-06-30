<template>
  <div class="signin-content">
    <div class="box-btn box-btn-fixed">
      <van-button slot="button" class="btn btn-main btn-main-large" size="large" @click="signup">签到</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Icon, Toast } from "vant";
import MTOOL from "mtool";
import config from "utils/config";
import API from "utils/api";

Vue.use(Icon)
  .use(Toast)
  .use(Button);

export default {
  name: "Sign",
  props: ["selected"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {},
  methods: {
    goBack() {
      mui.back();
    },
    update(detail) {},
    signup() {
      let param = {};

      this.loading = true;
      this.$post(API.auth.signup)
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            Toast("报名成功");
            setTimeout(() => {
              mui.back();
            }, 400);
          } else {
            res.message && Toast(res.message);
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    setMsg(msg) {
      MTOOL.storage.setItem(config.keys.coursesignupmsg, msg);
      MTOOL.openWindow("signup_course_msg.html");
    },

    login() {
      MTOOL.openWindow("login.html");
    }
  }
};
</script> 


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.box-btn-fixed {
  left: 0;
  bottom: 0;
  .btn-main {
    color: #000 !important;
    background-color: #ffd100 !important;
  }
}
.signin-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
}
</style>
 
