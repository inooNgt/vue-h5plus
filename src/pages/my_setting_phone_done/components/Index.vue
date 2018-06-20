<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" />
    <van-cell-group>
      <van-field v-model="phone" label="新手机号" placeholder="请输入手机号" />
      <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" type="primary" @click="getSmscode">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-box">
      <van-button class="btn" slot="button" @click="save">修改</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast, Button } from "vant";

import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { getCachedUser, loadUserInfo } from "utils/utils";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Field)
  .use(Icon);

// 缓存的用户信息
const cachedUser = getCachedUser();

export default {
  name: "Index",
  data() {
    return {
      sms: "000",
      phone: cachedUser.mobile_phone || "- -"
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
      }
      let smskey = MTOOL.storage.getItem(config.keys.smskey);
      this.$post(API.auth.alterphone, {
        sms_key: smskey,
        sms_code: this.sms
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            Toast("修改成功");

            // 更新信息
            loadUserInfo();
          } else {
            Toast(res.message);
          }
        })
        .catch(e => {
          console.log(e);
          Toast(e.message);
        });
    },
    getSmscode() {
      this.$post(API.auth.usersmscode)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            Toast("短信验证码发送成功");
          } else {
            Toast(res.message);
          }
        })
        .catch(e => {
          console.log(e);
          Toast(e.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
.btn-box {
  padding-top: 18px;
  text-align: center;
}
</style>
