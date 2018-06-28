`<template>
  <div class="page-content nav-content">
    <van-nav-bar title="" class="login-nav" fixed left-arrow @click-left="back">
      <!-- <van-icon name="search"  /> -->
      <!-- <span class="md-icon md-icon-closenav" slot="right"></span> -->
    </van-nav-bar>
    <div class="logo">
      <img class="logo-img" src="~assets/img/logo.png" alt="">
    </div>

    <section class="login-box">
      <van-cell-group>
        <div class="row-country">
          <div class="col-left">邀请码(必填)</div>
          <div class="col-right" @click="setFocus">
            <div class="invite-mark"></div>
            <input type="text" class="invite-input-hide" v-model="inviteCode" @focus="onFocus" @blur="onBlur" @input="inputChange()" ref="inviteInput" />
            <span class="invite-input" :class="inputFocus && inviteCode.length===0?'invite-input-focus':''" :ref="'inviteInput0'">{{inviteCode[0]}}</span>
            <span class="invite-input" :class="inputFocus && inviteCode.length===1?'invite-input-focus':''" :ref="'inviteInput1'">{{inviteCode[1]}}</span>
            <span class="invite-input" :class="inputFocus && inviteCode.length===2?'invite-input-focus':''" :ref="'inviteInput2'">{{inviteCode[2]}}</span>
            <span class="invite-input" :class="inputFocus && inviteCode.length>=3?'invite-input-focus':''" :ref="'inviteInput3'">{{inviteCode[3]}}</span>
          </div>
        </div>
        <div class="row-country">
          <div class="col-left">国家代码</div>
          <div class="col-right" @click="goAreaCode">
            <span>{{areacode}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <van-field class="row-phone" v-model="phone" :label="phonecode" placeholder="请输入手机号" />
        <van-field class="row-sms" center v-model="sms" placeholder="请输入短信验证码">
          <van-button slot="button" size="large" @click="getSmscode">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn-box">
        <van-button slot="button" class="btn-main" size="large" @click="login">登录</van-button>
      </div>
    </section>

  </div>
</template>

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup, Toast, NavBar, Icon } from "vant";
import { VueSelect } from "vue-select";
import mui from "mui";
import MTOOL from "mtool";
import config from "utils/config";
import API from "utils/api";
import {
  checkPhone,
  loadUserInfo,
  getCachedData,
  getCachedObject,
  getPhoneCode
} from "utils/utils";

Vue.component("v-select", VueSelect);

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(Icon)
  .use(NavBar)
  .use(CellGroup);

// 获取缓存
const cachedCountrycode = getCachedObject(config.keys.countrycode) || {
  id: "",
  code: ""
};
const cachedPhonecode = getCachedData(config.keys.phonecode);
const cachedPhonecodekey = getCachedData(config.keys.phonecodekey);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      username: "",
      inviteCode: "",
      password: "000000",
      phone: "1310002010",
      sms: "000000",
      inputFocus: false,
      areacode: cachedPhonecode && cachedCountrycode.code,
      phonecode: cachedPhonecode,
      phonecodekey: cachedPhonecodekey
    };
  },
  created() {
    // 更新页面
    window.addEventListener("event_update", function(event) {
      console.log("event_update");
      this.init();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    back: function() {
      mui.back();
    },
    init() {
      this.setAreaInfo();
    },
    onBlur() {
      this.inputFocus = false;
    },
    setFocus() {
      this.$refs.inviteInput.focus();
      this.inputFocus = true;
    },
    onFocus() {
      this.inputFocus = true;
    },
    inputChange() {
      let value = (this.inviteCode || "").trim();
      const len = 4;

      if (value.length > len) {
        value = value.substr(0, len);
      }

      for (let i = 0; i < len; i++) {
        this[`inviteCode${i}`] = value[i] || "";
      }

      console.log("inviteCode:", value, value.length);

      this.inviteCode = value;
    },
    setAreaInfo: async function() {
      console.log(cachedCountrycode);
      let phonecode;
      let phonecodekey;

      // 有cachedCountrycode缓存
      if (cachedCountrycode && cachedCountrycode.id) {
        // areacode
        let areacodelistRes = await this.$get(API.areacodelist);
        let areacodelist = areacodelistRes.data.data;
        let phonecodeObj = getPhoneCode(areacodelist, cachedCountrycode.id);
        phonecode = phonecodeObj.code;
        phonecodekey = phonecodeObj.key;

        console.log("phonecodeObj", phonecodeObj);
      } else {
        // env
        let envRes = await this.$get(API.env);
        let env = envRes.data.data;

        let countriesRes = await this.$get(API.countries);
        let countries = countriesRes.data.data;

        phonecodekey = env.calling_code;
        phonecode = (env.calling_code || "").replace(/[A-Z]/gi, "");

        this.areacode = `${env.country_code} ${countries[env.country_code]}`;

        if (envRes.data.status !== 200) {
          Toast("获取环境信息失败");
        }
      }
      if (phonecode) this.phonecode = phonecode;
      if (phonecodekey) this.phonecodekey = phonecodekey;

      console.log("phonecode", phonecode);
      // 缓存
      MTOOL.storage.setItem(config.keys.phonecode, phonecode);
      MTOOL.storage.setItem(config.keys.phonecodekey, phonecodekey);
    },

    getSmscode() {
      this.$post(API.smscode, {
        mobile_phone: this.phone
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            Toast("短信验证码发送成功");
          } else {
            Toast(res.message);
          }
        })
        .catch(e => {
          Toast(e.message);
        });
    },

    login: function() {
      let param = {};
      if (this.inviteCode.trim() === "") {
        Toast("邀请码不能为空");
        return;
      }

      if (this.inviteCode.length !== 4) {
        Toast("邀请码格式不正确");
        return;
      }

      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
        return;
      }

      if (!checkPhone(this.phone)) {
        Toast("请输入正确格式的手机号");
        return;
      }

      if (this.sms.trim() === "") {
        Toast("验证码不能为空");
        return;
      }

      param = {
        invite_code: this.inviteCode
      };

      this.$post(API.auth.settings, param).then(res => {
        let data = res.data;
        console.log(data);
        if (data.status !== 200) {
          Toast(data.message);
          return;
        }

        Toast("激活成功");
        this.loginSucceed();
      });
    },
    loginSucceed: function(data) {
      // 获取用户信息并缓存
      loadUserInfo().then(res => {
        console.log(res);
        // 跳转 plus环境
        if (MTOOL.isPlus) {
          MTOOL.plusReady(function() {
            let loginwv = plus.webview.getWebviewById("login.html");
            if (loginwv) plus.webview.close(loginwv, "none");
            setTimeout(() => {
              mui.back();
            }, 400);
          });
        } else {
          location.href = "home.html";
        }
      });
    },
    goFindPS() {
      MTOOL.openWindow("login_findps.html");
    },
    goAreaCode() {
      MTOOL.openWindow("login_areacode.html");
    }
  }
};
</script>   

<style lang="scss">
@import "~assets/scss/var";
@import "~assets/scss/common";
body,
html {
  background: #fff;
}
.dropdown-toggle {
  .clear {
    display: none !important;
  }
}

.page-content {
  // background-image: url(~assets/img/1.png);
  // background-repeat: no-repeat;
  // background-size: 100%;
  // background-position: 0 -20px;
}

.van-cell-group.van-cell-group {
  background: none;
  &::after {
    border: none;
  }
  .van-cell {
    height: 30px;
    line-height: 30px;
    padding: 0;
    border: solid 1px #dddddd;
    margin-bottom: 10px;
  }
  .van-cell__title {
    min-width: 42px;
    max-width: 80px;
    padding: 0 10px;
    flex: 0 1 auto;
    text-align: center;
    color: #000;
    @extend %text-over;
  }
  .van-field__control {
    padding: 0 15px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
  }
  .row-phone {
    .van-cell__title {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        right: -0.5px;
        top: 50%;
        z-index: 1;
        margin-top: -15px;
        width: 1px;
        height: 30px;
        background: linear-gradient(0deg, #ffffff 7%, #dddddd 50%, #ffffff 93%);
      }
    }
  }
  .row-sms {
    border: none;
    height: 32px;
    padding-top: 1px;
    padding-bottom: 1px;
    .van-field__control {
      height: 30px;
      border: solid 1px #dddddd;
    }
    .van-field__button {
      padding-left: 12px;
    }
    .van-button {
      height: 30px;
      line-height: 30px;
      width: 77px;
      font-size: 12px;
      border-radius: 0;
      color: $color-main;
      border: solid 1px $color-main;
    }
  }
}
</style>



<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.header {
  padding: 20px;
}
.head-img {
  display: block;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: $color-main;
}
.head-name {
  padding-top: 10px;
  text-align: center;
}
.logo {
  padding: px2rem(69px) 0 px2rem(120px);
}
.logo-img {
  display: block;
  width: 150px;
  height: 84px;
  margin: 0 auto;
}
.btn-box {
  text-align: center;
  padding: px2rem(27px) 0;
  .btn-main {
    margin-bottom: 10px;
  }
}

.login-box {
  width: 255px;
  margin: 0 auto;
}

.row-country {
  display: flex;
  font-size: 12px;
  color: #000;
  margin-bottom: 12px;
  height: 36px;
  line-height: 36px;
  .col-left {
    flex: 1 0 auto;
    color: #000;
    font-family: PingFang-SC-Medium;
  }
  .col-right {
    width: 190px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
  .invite-input {
    display: inline-block;
    width: 38px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    margin-left: 6px;
    background-color: #dddddd;

    font-family: San-Francisco-Text-Bold;
    font-size: 30px;
    color: rgba(0, 0, 0, 0.6);
  }
  .invite-input-focus {
    // border: 1px solid $color-main;
  }
  .invite-input-hide,
  .invite-mark {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: none;
    padding-left: 6px;
    letter-spacing: 0px;
    // color: #fff;
    // opacity: 0;
  }
  .invite-mark {
    z-index: -1;
  }
}
</style>
`