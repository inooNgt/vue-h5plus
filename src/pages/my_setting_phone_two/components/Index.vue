<template>
  <div class="page-content nav-content">
    <van-nav-bar title="修改手机" fixed left-arrow @click-left="goBack" />
    <ul class="step-list">
      <li class="step-item step-item1 ">
        <span class="step-num">1</span>
        <div class="step-text">身份验证</div>
      </li>
      <li class="step-item step-item2 step-active">
        <span class="step-num">2</span>
        <div class="step-text">绑定手机</div>
      </li>
      <li class="step-item step-item3">
        <span class="step-num">3</span>
        <div class="step-text">设置密码</div>
      </li>
    </ul>
    <div class="box">
      <div class="box-msg">
        <p>请输入要绑定的新手机号码</p>
      </div>
      <van-cell-group class="box-field">
        <van-field v-model="phone" center clearable placeholder="请输入新手机号">
          <van-button slot="button" class="btn-sub btn-getsms" @click="getSmscode" size="small">获取验证码</van-button>
        </van-field>
        <van-field v-model="sms" label="验证码：" placeholder="请输入验证码" />
      </van-cell-group>
    </div>
    <div class="btn-box box-btn-fixed">
      <van-button class="btn btn-sub" slot="button" v-show="!loading" @click="save">立即绑定</van-button>
      <van-button class="btn btn-sub" slot="button" v-show="loading">绑定中...</van-button>
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
      alteringPhone: "131****0000",
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
    closePrev() {
      MTOOL.plusReady(() => {
        let prevwv = plus.webview.getWebviewById("my_setting_phone.html");

        console.log("close prevwv:");
        console.log(prevwv);
        if (prevwv) {
          console.log("prevwv closed");
          plus.webview.hide(prevwv, null, 1);
          setTimeout(() => {
            plus.webview.close(prevwv, null, 1);
          }, 50);
        }
      });
    },
    save() {
      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
      }
      let callingcode = MTOOL.storage.getItem(config.keys.phonecodekey) || "";
      let smskey = MTOOL.storage.getItem(config.keys.smskey) || "";
      this.$post(API.auth.alterphone, {
        sms_key: smskey,
        mobile_phone: this.phone,
        calling_code: callingcode,
        sms_code: this.sms
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            Toast("修改成功");
            // 更新信息
            loadUserInfo();
            setTimeout(() => {
              MTOOL.openWindow("my_setting_phone_three.html");
            }, 400);
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
