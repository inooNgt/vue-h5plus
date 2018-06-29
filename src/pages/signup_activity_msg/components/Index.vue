<template>
  <div class="page-content nav-content">
    <van-nav-bar title="报名课程" fixed left-arrow @click-left="goBack" right-text="保存" @click-right="save" />
    <van-cell-group>
      <van-field ref="input" autofocus="autofocus" v-model="msg" :placeholder="placeholder" @click-icon="msg = ''" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast } from "vant";

import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { loadUserInfo, getCachedData } from "utils/utils";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Icon);

// 缓存的用户信息

const signupmsg = getCachedData(config.keys.coursesignupmsg);
let msgText = "";
if (signupmsg === "name") msgText = "姓名";
if (signupmsg === "phone") msgText = "手机号";
if (signupmsg === "qq") msgText = "QQ";
if (signupmsg === "wx") msgText = "微信";

console.log("signupmsg:", signupmsg);

export default {
  name: "Index",
  data() {
    return {
      msg: "",
      msgText: msgText,
      placeholder: signupmsg && "请输入" + msgText
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs["input"]);
      // this.$refs["input"] && this.$refs["input"].focus();
    });
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      if (signupmsg === "name" && this.msg.trim() === "") {
        Toast(`${msgText}不能为空`);
      }

      // 通过缓存传递参数
      MTOOL.storage.setItem(config.keys[`coursesignup${signupmsg}`], this.msg);

      if (MTOOL.isPlus) {
        MTOOL.invoke("signup_course.html", "event_update", {
          type: signupmsg,
          value: this.msg
        });
      }
      setTimeout(() => {
        mui.back();
      }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
</style>
