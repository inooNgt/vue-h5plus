<template>
  <div class="page-content nav-content">
    <van-nav-bar title="" class="login-nav" fixed left-arrow @click-left="back">
      <!-- <van-icon name="search"  /> -->
      <span class="md-icon md-icon-closenav" slot="right"></span>
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
          <van-button slot="button" @click="getSmscode" size="large">发送验证码</van-button>
        </van-field>
        <div class="row-msg">
          <van-checkbox shape="square" v-model="checked">
            我已阅读并同意
            <span class="text-blue">《DIC用户协议》</span>
          </van-checkbox>
        </div>
      </van-cell-group>
      <div class="btn-box">
        <van-button slot="button" class="btn-main" size="large" @click="register">注册</van-button>
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
  Checkbox,
  CheckboxGroup
} from "vant";
import API from "utils/api";
import {
  loadUserInfo,
  getCachedData,
  getCachedObject,
  getPhoneCode
} from "utils/utils";
import config from "utils/config";
import mui from "mui";
import MTOOL from "mtool";

Vue.use(Button)
  .use(Field)
  .use(Toast)
  .use(Icon)
  .use(NavBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Cell)
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
      msg: "",
      name: "",
      phone: "1310002010",
      sms: "000000",
      checked: "false",
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
    back() {
      mui.back();
    },
    init() {
      this.setAreaInfo();
    },
    goLogin() {
      MTOOL.openWindow("login.html");
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
    register() {
      let param = {
        country_code: (this.areacode || "").replace(/[^A-Z]/gi, ""),
        calling_code: this.phonecodekey,
        mobile_phone: this.phone,
        sms_code: this.sms
      };

      if (this.phone.trim() === "") Toast("手机号不能为空");

      if (this.sms.trim() === "") Toast("输入短信验证码");

      console.log("param", param);

      // todo by ngt 需要loading
      this.$post(API.register, param, {
        crossDomain: true
      })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.status !== 200) {
            console.log("not 200", data);
            data.message && Toast(data.message);
            return;
          }

          Toast("注册成功");
          this.registerSuccess(data.data);
        })
        .catch(e => {
          console.log("catch:", e);
          Toast(e.message);
        });
    },
    registerSuccess(token) {
      // 存储信息
      try {
        MTOOL.storage.setItem(config.keys.token, JSON.stringify(token));
        loadUserInfo();
      } catch (e) {
        console.log(e);
      }

      if (MTOOL.isPlus) {
        let loginwv = plus.webview.getWebviewById("login.html");
        if (loginwv) {
          plus.webview.close(loginwv);
        }
        mui.back();
        // 更新页面
        MTOOL.invoke("HBuilder", "index_update_subpages", { to: "" });
      } else {
        // setTimeout(() => {
        //   location.href = "home.html";
        // }, 200);
      }
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
        let phonecodeObj = getPhoneCode(areacodelist, cachedCountrycode.id)
          .code;
        phonecode = phonecodeObj.code;
        phonecodekey = phonecodeObj.key;
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

        if (phonecode) this.phonecode = phonecode;
        if (phonecodekey) this.phonecodekey = phonecodekey;
        // 缓存
        MTOOL.storage.setItem(config.keys.phonecode, phonecode);
        MTOOL.storage.setItem(config.keys.phonecodekey, phonecodekey);
      }
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

.van-checkbox {
  display: inline-block;
  .van-checkbox__icon {
    width: 12px;
    height: 12px;
    line-height: 12px;
    vertical-align: middle;
  }
  .van-checkbox--checked {
    background: $color-main;
    border-color: $color-main;
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
        right: 0;
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
  padding: px2rem(27px) 0 px2rem(50px);
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
.row-msg {
  font-size: 11px;
  color: #000;
}
</style>

