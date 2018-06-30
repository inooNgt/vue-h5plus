<template>
  <div class="page-content nav-content">
    <van-nav-bar :title="title" fixed left-arrow @click-left="goBack" right-text="保存" @click-right="save" />
    <van-cell-group>
      <van-field ref="input" v-model="msg" autofocus="autofocus" :placeholder="placeholder" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast } from "vant";

import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import {
  loadUserInfo,
  getCachedData,
  getCachedObject,
  getPhoneCode
} from "utils/utils";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Icon);

// 获取缓存

const signtype = getCachedData(config.keys.signupmsgtype);
const signupmsg = getCachedData(config.keys.coursesignupmsg);

let msgText = "";
if (signupmsg === "name") msgText = "姓名";
if (signupmsg === "phone") msgText = "手机号";
if (signupmsg === "qq") msgText = "QQ";
if (signupmsg === "wx") msgText = "微信";

console.log("signupmsg:" + signupmsg);
console.log("signtype:" + signtype);

try {
  MTOOL.plusReady(() => {
    if (MTOOL.isPlus) plus.key.showSoftKeybord();
  });
} catch (error) {
  console.log(error);
}
export default {
  name: "Index",
  data() {
    return {
      title: signtype === "course" ? "报名课程" : "报名活动",
      msg: "",
      msgText: msgText,
      isphone: signupmsg === "phone",
      placeholder: signupmsg && "请输入" + msgText
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    goBack: function() {
      mui.back();
    },

    save() {
      if (signupmsg === "name" && this.msg.trim() === "") {
        Toast(`${msgText}不能为空`);
      }
      let msg = this.msg;
      // 通过缓存传递参数
      MTOOL.storage.setItem(config.keys[`coursesignup${signupmsg}`], msg);

      if (MTOOL.isPlus) {
        MTOOL.invoke(`signup_${signtype}.html`, "event_update", {
          type: signupmsg,
          value: msg
        });
      }
      setTimeout(() => {
        mui.back();
      }, 0);
    }
  }
};
</script>

<style lang="scss">
@import "~assets/scss/var";
</style>


<style lang="scss" scoped>
</style>
