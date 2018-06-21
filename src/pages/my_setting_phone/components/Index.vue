<template>
  <div class="page-content nav-content">
    <van-nav-bar title="标题" fixed left-arrow @click-left="goBack" />
    <van-cell-group>
      <van-field v-model="phone" label="手机号" readonly placeholder="请输入手机号" />
      <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" type="primary" @click="getSmscode">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-box">
      <van-button class="btn" slot="button" @click="next">下一步</van-button>
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
  methods: {
    goBack: function() {
      mui.back();
    },
    save() {
      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
      }
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
    },
    next() {
      if (this.sms.trim() === "") {
        Toast("验证码不能为空");
      }

      this.$post(API.auth.smskey)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            console.log("smskey:", res.data.data);
            MTOOL.storage.setItem(config.keys.smskey, res.data.data);
            setTimeout(() => {
              MTOOL.openWindow("my_setting_phone_done.html");
            }, 0);
          } else {
            Toast(res.message);
          }
        })
        .catch(e => {
          console.log(e);
          Toast(e.message);
        });
    }
    // async updateUserInfo() {
    //   try {
    //     let user = await loadUserInfo();
    //     if (user.username) this.username = user.username;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
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
