<template>
  <div class="page-content nav-content">
    <van-nav-bar title="修改手机" fixed left-arrow @click-left="goBack" />
    <ul class="step-list">
      <li class="step-item step-item1 step-active">
        <span class="step-num">1</span>
        <div class="step-text">身份验证</div>
      </li>
      <li class="step-item step-item2 step-active">
        <span class="step-num">2</span>
        <div class="step-text">绑定手机</div>
      </li>
      <li class="step-item step-item3 step-active">
        <span class="step-num">3</span>
        <div class="step-text">设置密码</div>
      </li>
    </ul>
    <div class="box">
      <div class="box-msg">
        <p>请为绑定的新手机号设置登录密码</p>
      </div>
      <van-cell-group class="box-field">
        <van-field v-model="password1" type="password" label="设置密码" placeholder="请设置8-16位字母+数字的密码组合" />
        <van-field v-model="password2" type="password" label="重复密码" placeholder="请再次输入密码" />
      </van-cell-group>
    </div>
    <div class="btn-box box-btn-fixed">
      <van-button class="btn btn-sub" slot="button" v-show="!loading" @click="save">确定</van-button>
      <van-button class="btn btn-sub" slot="button" v-show="loading">设置中...</van-button>
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
      password1: "131****0000",
      password2: "131****0000",
      loading: false,
      phone: cachedUser.mobile_phone || "- -"
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
      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
      }
      let smskey = MTOOL.storage.getItem(config.keys.smskey) || "";

      this.loading = true;
      this.$post(API.auth.alterphone, {
        sms_key: smskey,
        password: this.password2
      })
        .then(res => {
          if (res.status === 200) {
            // 第二步中已经更新信息，此处无需更新，直接返回
            if (MTOOL.isPlus) {
              let phonewv = plus.webview.getWebviewById(
                "my_setting_phone.html"
              );
              let phonewv2 = plus.webview.getWebviewById(
                "my_setting_phone_two.html"
              );
              if (phonewv) {
                plus.webview.close(phonewv, "none");
                console.log("colsed" + "my_setting_phone");
              }
              if (phonewv2) {
                plus.webview.close(phonewv2, "none");
                console.log("colsed" + "my_setting_phone_two");
              }
              plus.webview.close(phonewv, "none");
              setTimeout(() => {
                mui.back();
              }, 400);
            } else {
              location.href = "my_setting.html";
            }
            Toast("设置成功");
          } else {
            Toast(res.message);
          }
        })
        .catch(e => {
          console.log(e);
          Toast(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>


<style lang="scss">
body,
html {
  background: #fff;
}
.van-cell-group {
  &:after {
    display: none;
  }
  .van-cell {
    padding: 10px 0 0;
    .van-cell__title {
      font-size: 14px;
      color: #000;
      height: 30px;
      line-height: 30px;
      max-width: 66px;
    }
    .van-field__control {
      height: 30px;
      line-height: 30px;
      border: solid 1px #dddddd;
      padding: 0 10px;
    }
    &::after {
      display: none;
    }
  }
}
// .page-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -20px;
// }
</style>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.btn-box {
  padding-top: 18px;
  text-align: center;
}

.box-msg {
  line-height: 22px;
  text-align: center;
  color: #000;
}

.box {
  padding: 0 $padding-main;
}
.box-field {
  margin-top: 47px;
}
.btn-getsms.btn-getsms.btn-getsms {
  font-size: 12px;
  @extend %text-over;
}
</style>
