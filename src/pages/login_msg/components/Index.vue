<template>
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
          <div class="col-left">国家代码</div>
          <div class="col-right" @click="goAreaCode">
            <span>{{areacode}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <van-field class="row-phone" v-model="phone" :label="phonecode" placeholder="请输入手机号" />
        <van-field class="row-sms" center v-model="sms" placeholder="请输入短信验证码">
          <van-button slot="button" @click="getSmscode" v-if="cansendsms" size="large">发送验证码</van-button>
          <van-button slot="button" @click="getSmscode" v-if="!cansendsms" size="large">{{timing}}s</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn-box">
        <van-button slot="button" class="btn-main" v-if="!loading" size="large" @click="login">登录</van-button>
        <van-button slot="button" class="btn-main" v-if="loading" size="large" @click="login">
          登录中...</van-button>
      </div>
    </section>

  </div>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Field,
  Cell,
  CellGroup,
  Toast,
  NavBar,
  Icon,
  Loading
} from "vant";
import { VueSelect } from "vue-select";
import mui from "mui";
import MTOOL from "mtool";
import config from "utils/config";
import {
  checkPhone,
  loadUserInfo,
  getCachedData,
  getCachedObject,
  getPhoneCode
} from "utils/utils";
import API from "utils/api";

Vue.component("v-select", VueSelect);

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(Icon)
  .use(Loading)
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
      password: "",
      phone: "",
      sms: "",
      loading: false,
      cansendsms: true,
      timing: "",
      areacode: cachedPhonecode && cachedCountrycode.code,
      phonecode: cachedPhonecode,
      phonecodekey: cachedPhonecodekey
    };
  },
  created() {
    this.listen();
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
    listen() {
      // 更新页面
      window.addEventListener("event_update", event => {
        // 获得事件参数
        let detail = event.detail;

        let countrycode = {};

        if (detail && detail.id) {
          countrycode = detail;
        } else {
          countrycode = getCachedObject(config.keys.countrycode) || {
            id: "",
            code: ""
          };
        }

        console.log("event_update width countrycode1:" + countrycode.id);
        console.log("this.update" + this.update);

        this.update(countrycode);
      });
    },
    update(countrycode) {
      this.setAreaInfo(countrycode);
    },
    setAreaInfo: async function(countrycode) {
      countrycode = countrycode || cachedCountrycode;
      console.log(countrycode);
      let phonecode;
      let phonecodekey;
      let areacode;

      // 有countrycode缓存
      if (countrycode && countrycode.id) {
        // areacode
        let areacodelistRes = await this.$get(API.areacodelist);
        let areacodelist = areacodelistRes.data.data;
        let phonecodeObj = getPhoneCode(areacodelist, countrycode.id);
        phonecode = phonecodeObj.code;
        phonecodekey = phonecodeObj.key;
        areacode = `${countrycode.id} ${countrycode.code}`;

        console.log("phonecodeObj", phonecodeObj);
      } else {
        // env
        let envRes = await this.$get(API.env);
        let env = envRes.data.data;

        let countriesRes = await this.$get(API.countries);
        let countries = countriesRes.data.data;

        phonecodekey = env.calling_code;
        phonecode = (env.calling_code || "").replace(/[A-Z]/gi, "");

        areacode = `${env.country_code} ${countries[env.country_code]}`;

        if (envRes.data.status !== 200) {
          Toast("获取环境信息失败");
        }
      }
      if (phonecode) this.phonecode = phonecode;
      if (phonecodekey) this.phonecodekey = phonecodekey;
      if (areacode) this.areacode = areacode;

      console.log("phonecode" + phonecode);
      // 缓存
      MTOOL.storage.setItem(config.keys.phonecode, phonecode);
      MTOOL.storage.setItem(config.keys.phonecodekey, phonecodekey);
    },

    login: function() {
      let param = {};
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
        calling_code: this.phonecodekey,
        mobile_phone: this.phone,
        sms_code: this.sms.trim()
      };

      this.loading = true;
      this.$post(API.login, param)
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.status !== 200) {
            Toast(data.message);
            return;
          }

          Toast("登录成功");
          this.loginSucceed(data.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loginSucceed: function(data) {
      // 存储信息
      MTOOL.storage.setItem(
        config.keys.token,
        JSON.stringify(data.access_token)
      );
      MTOOL.storage.setItem(config.keys.user, JSON.stringify(data.user));

      console.log("登录成功 :" + MTOOL.logined());

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
    },
    getSmscode() {
      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
        return;
      }
      this.$post(API.smscode, {
        mobile_phone: `${this.phonecodekey}${this.phone}`
      })
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
          e.message && Toast(e.message);
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
  padding: px2rem(69px) 0 px2rem(145px);
}
.logo-img {
  display: block;
  width: 150px;
  height: 84px;
  margin: 0 auto;
}
.btn-box {
  text-align: center;
  padding: px2rem(27px) 0 0;
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
  padding-bottom: 8px;
  .col-left {
    width: 50%;
  }
  .col-right {
    width: 50%;
    text-align: right;
  }
}
</style>
