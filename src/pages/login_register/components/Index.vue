<template>
  <div class="page-content">
    <div class="logo">
      <img class="logo-img" src="~assets/img/empty.png" alt="">
    </div>
    <div>
      <van-cell-group>
        <v-select v-model="selectedCountry" label="label" :options="countryOptions"></v-select>
        <v-select v-model="selectedAreacode" label="label" :options="areacodeOptions"></v-select>
        <van-field v-model="phone" placeholder="请输入手机号" />
        <van-field v-model="password" type="password" placeholder="密码" />
        <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" @click="getSmscode">发送验证码</van-button>
        </van-field>
        <van-field v-model="invitecode" placeholder="邀请码" />
      </van-cell-group>
      <van-button slot="button" size="large" @click="register">注册</van-button>
      <van-button slot="button" size="large" @click="goLogin">去登录</van-button>
    </div>
  </div>
</template>  

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup, Toast } from "vant";
import { VueSelect } from "vue-select";
import API from "utils/api";
import config from "utils/config";
import Qs from "qs";
import mui from "mui";
import MTOOL from "mtool";

Vue.component("v-select", VueSelect);
Vue.use(Button)
  .use(Field)
  .use(Toast)
  .use(Cell)
  .use(CellGroup);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      msg: "",
      name: "",
      phone: "13163704201",
      password: "000000",
      sms: "0000",
      invitecode: "000",
      countryOptions: [{ code: "CN", label: "CN China" }],
      selectedCountry: { code: "CN", label: "CN China" },
      areacodeOptions: [{ code: "CN", label: "CN 0086" }],
      selectedAreacode: { code: "CN", label: "CN 0086" }
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.setAreaInfo();
    });
  },
  methods: {
    goLogin() {
      MTOOL.openWindow("login.html");
    },
    getSmscode() {
      this.$post(API.smscode, {
        mobile_phone: this.phone
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) Toast("短信验证码发送成功");
        })
        .catch(e => {
          Toast(e.message);
        });
    },
    register() {
      let param = {
        country_code: this.selectedCountry.code,
        calling_code: this.selectedAreacode.code,
        mobile_phone: this.phone,
        password: this.password,
        sms_code: this.sms,
        invite_code: this.invitecode
      };

      if (this.phone.trim() === "") Toast("手机号不能为空");

      if (this.sms.trim() === "") Toast("输入短信验证码");

      if (this.password.trim() === "") Toast("密码不能为空");

      if (this.invitecode.trim() === "") Toast("邀请码不能为空");

      console.log("param", param);

      this.$post(API.register, param, {
        crossDomain: true
      })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.status !== 200) {
            data.message && Toast(data.message);
            return;
          }

          Toast("注册成功");
          // 存储信息
          MTOOL.storage.setItem(config.keys.token, JSON.stringify(data.data));
          if (MTOOL.isPlus) {
            let loginwv = plus.webview.getWebviewById("login.html");
            if (loginwv) {
              plus.webview.close(loginwv);
            }
            mui.back();
            MTOOL.cwcs.invoke("HBuilder", "updateSubpages", { to: "to" });
          } else {
            setTimeout(() => {
              location.href = "home.html";
            }, 200);
          }
        })
        .catch(e => {
          Toast(e.message);
        });
    },
    setAreaInfo: async function() {
      // countries code
      let countriesRes = await this.$get(API.countries);
      let areacodelistRes = await this.$get(API.areacodelist);
      let envRes = await this.$get(API.env);

      let countries = countriesRes.data.data;
      this.countryOptions = this.formatOptions(countries, 1);

      // areacode
      let areacodelist = areacodelistRes.data.data;
      this.areacodeOptions = this.formatOptions(areacodelist, 0);

      // env
      let env = envRes.data.data;

      this.selectedCountry = {
        code: env.country_code,
        label: env.country_code + " " + countries[env.country_code]
      };

      this.selectedAreacode = {
        code: env.calling_code,
        label: areacodelist[env.calling_code]
      };
    },
    formatOptions(data, adorn) {
      let result = [];
      for (let key in data) {
        let label = data[key];
        if (adorn) label = key + " " + data[key];
        result.push({
          code: key,
          label: label
        });
      }
      return result;
    },

    setSelectedCountry() {}
  }
};
</script>



<style lang="scss">
.dropdown-toggle {
  .clear {
    display: none !important;
  }
}
</style>


<style lang="scss" scoped>
@import "~assets/scss/var";
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
  padding: 54px 0;
}
.logo-img {
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
</style>
