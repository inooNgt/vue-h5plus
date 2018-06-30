<template>
  <div class="page-content nav-content">
    <van-nav-bar title="修改手机  " fixed left-arrow @click-left="goBack" />
    <ul class="step-list">
      <li class="step-item step-item1 step-active">
        <span class="step-num">1</span>
        <div class="step-text">身份验证</div>
      </li>
      <li class="step-item step-item2">
        <span class="step-num">2</span>
        <div class="step-text">绑定手机</div>
      </li>
      <li class="step-item step-item3">
        <span class="step-num">3</span>
        <div class="step-text">设置密码</div>
      </li>
    </ul>
    <div class="box">
      <div class="box-sms">
        <p>验证已绑定的手机号可进行下一步</p>
        <p>向{{alteringPhone}}的手机号发送验证码</p>
      </div>
      <div class="box-sms-btn">
        <van-button slot="button" class="btn btn-sub-small" v-if="cansendsms" @click="getSmscode">发送验证码</van-button>
        <van-button slot="button" class="btn btn-sub-small" v-if="!cansendsms">{{timing}}s</van-button>
      </div>
      <van-cell-group class="box-field">
        <van-field v-model="sms" label="验证码：" placeholder="请输入验证码" />
      </van-cell-group>
      <div class="box-appeal text-right">
        <span>手机号无法使用，人工申诉></span>
      </div>
    </div>
    <div class="btn-box box-btn-fixed">

      <van-button class="btn btn-sub" slot="button" v-show="!loading" @click="next">验证身份</van-button>
      <van-button class="btn btn-sub" slot="button" v-show="loading">验证中...</van-button>
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
      sms: "",
      alteringPhone: "",
      loading: false,
      cansendsms: true,
      timing: "",
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
    next() {
      if (this.sms.trim() === "") {
        Toast("验证码不能为空");
        return;
      }
      this.loading = true;
      this.$post(API.auth.smskey, { sms_code: this.sms })
        .then(res => {
          this.loading = false;
          console.log(res);
          if (res.status === 200) {
            console.log("smskey:", res.data.data);
            MTOOL.storage.setItem(config.keys.smskey, res.data.data);
            Toast("验证成功");
            setTimeout(() => {
              MTOOL.openWindow("my_setting_phone_two.html");
            }, 400);
          } else {
            this.loading = false;
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
            this.cansendsms = false;
            this.startCountDown().then(() => {
              this.cansendsms = true;
            });
          } else {
            res.message && Toast(res.message);
          }
        })
        .catch(e => {
          console.log(e);
          res.message && Toast(res.message);
        });
    },

    startCountDown(s) {
      return new Promise((resolve, reject) => {
        this.timing = s || 60;
        let timmer = null;
        timmer = setInterval(() => {
          if (this.timing-- <= 0) {
            clearInterval(timmer);
            resolve();
          }
        }, 1000);
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
    .van-cell__title {
      font-size: 14px;
      color: #000;
      height: 30px;
      line-height: 30px;
      max-width: 68px;
    }
    .van-field__control {
      height: 30px;
      line-height: 30px;
      border: solid 1px #dddddd;
      padding: 0 10px;
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
.btn-box {
  padding-top: 18px;
  text-align: center;
}

.box-sms {
  line-height: 22px;
  text-align: center;
}
.box-sms-btn {
  padding-top: 14px;
  text-align: center;
}
.box {
  padding: 0 $padding-main;
}
.box-field {
  margin-top: 61px;
}
.box-appeal {
  padding: 0 15px;
  font-size: 11px;
  color: $color-border;
}
</style>
