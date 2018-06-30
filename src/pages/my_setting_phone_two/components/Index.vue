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
        <div class="row-country">
          <div class="col-left">国家代码</div>
          <div class="col-right" @click="goAreaCode">
            <span>{{areacode}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <van-field v-model="phone" :label="phonecode" center clearable placeholder="请输入新手机号">
          <van-button slot="button" class="btn-sub btn-getsms" v-if="cansendsms" @click="getSmscode" size="small">获取验证码</van-button>
          <van-button slot="button" class="btn-sub btn-getsms" v-if="!cansendsms" size="small">{{timing}}s</van-button>
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
import {
  getCachedUser,
  getCachedObject,
  getCachedData,
  getPhoneCode,
  loadUserInfo
} from "utils/utils";
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
      sms: "",
      alteringPhone: "",
      loading: false,
      phone: "",
      areacode: cachedPhonecode && cachedCountrycode.code,
      phonecode: cachedPhonecode,
      phonecodekey: cachedPhonecodekey,
      cansendsms: true,
      timing: ""
    };
  },
  created() {
    // 更新页面
    window.addEventListener("event_update", event => {
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
    goBack: function() {
      mui.back();
    },
    init() {
      this.setAreaInfo();
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
    save() {
      if (this.phone.trim() === "") {
        Toast("手机号不能为空");
        return;
      }
      if (this.sms.trim() === "") {
        Toast("验证码不能为空");
        return;
      }

      let callingcode = MTOOL.storage.getItem(config.keys.phonecodekey) || "";
      let smskey = MTOOL.storage.getItem(config.keys.smskey) || "";
      this.loading = true;
      this.$post(API.auth.alterphone, {
        sms_key: smskey,
        mobile_phone: this.phone,
        calling_code: callingcode,
        sms_code: this.sms
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            // 更新信息
            loadUserInfo();

            MTOOL.invoke("my_setting.html", "event_update");
            MTOOL.invoke("my.html", "event_update");

            if (MTOOL.isPlus) {
              let phonewv = plus.webview.getWebviewById(
                "my_setting_phone_one.html"
              );
              console.log("phonewv_one");
              console.log(phonewv);
              if (phonewv) {
                plus.webview.close(phonewv, "none");
                console.log("closed" + "my_setting_phone_one");
              }
            }
            setTimeout(() => {
              MTOOL.openWindow("my_setting_phone_three.html");
            }, 500);
            Toast("修改成功");
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
    goAreaCode() {
      MTOOL.openWindow("login_areacode.html");
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
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  @extend %text-over;
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
