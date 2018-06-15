<template>
  <div class="page-content">
    <div class="logo">
      <img class="logo-img" src="~assets/img/empty.png" alt="">
    </div>
    <div>
      <van-tabs v-model="active">
        <van-tab title="密码登录">
          <van-cell-group>
            <v-select v-model="selectedAreacode" label="label" :options="areacodeOptions"></v-select>
            <van-field v-model="phone1" label="手机号" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" />

            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" @click-icon="password = ''" />
          </van-cell-group>
        </van-tab>
        <van-tab title="验证码登录">
          <van-cell-group>
            <van-field v-model="phone2" label="手机号" icon="clear" placeholder="请输入用户名" @click-icon="username = ''" />
            <van-field center v-model="sms" label="短信验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''">
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
          </van-cell-group>
        </van-tab>
      </van-tabs>
      <van-button slot="button" size="large" @click="login">登录</van-button>
      <van-button slot="button" size="large" @click="goRegister">去注册</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Field, Cell, CellGroup, Tab, Tabs, Toast } from "vant";
import { VueSelect } from "vue-select";
import mui from "mui";
import MTOOL from "mtool";
import config from "utils/config";
import API from "utils/api";

Vue.component("v-select", VueSelect);

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(CellGroup);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      username: "",
      password: "000000",
      phone1: "13163704201",
      phone2: "13163704201",
      sms: "0000",
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
    setAreaInfo: async function() {
      // countries code
      let areacodelistRes = await this.$get(API.areacodelist);
      let envRes = await this.$get(API.env);

      // areacode
      let areacodelist = areacodelistRes.data.data;
      this.areacodeOptions = this.formatOptions(areacodelist, 0);

      // env
      let env = envRes.data.data;

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
    login: function() {
      let param = {};
      if (this.active === 0) {
        if (this.phone1.trim() === "") {
          Toast("手机号不能为空");
          return;
        }
        if (this.password.trim() === "") {
          Toast("密码不能为空");
          return;
        }

        param = {
          calling_code: this.selectedAreacode.label,
          mobile_phone: this.phone1,
          password: this.password.trim(),
          sms_code: ""
        };
      } else {
        param = {
          calling_code: this.selectedAreacode.label,
          mobile_phone: this.phone2,
          password: "",
          sms_code: this.sms.trim()
        };
      }

      this.$post(API.login, param).then(res => {
        let data = res.data;
        console.log(data);
        if (data.status !== 200) {
          Toast(data.message);
          return;
        }

        Toast("登录成功");
        this.loginSucceed(data.data);
      });
    },
    loginSucceed: function(data) {
      // 存储信息
      MTOOL.storage.setItem(config.keys.token, JSON.stringify(data));

      // 跳转 plus环境
      if (MTOOL.isPlus) {
        MTOOL.plusReady(function() {
          var wv = plus.webview.currentWebview();
          var origin = wv.from;
          // 来自tabbar子页面的登录，返回tabbar子页面,然后再更新tabbar子页
          console.log("origin: " + origin);
          if (origin && MTOOL.config.subpages.indexOf(origin)) {
            mui.back();
            MTOOL.switchNav({
              from: "login.html",
              to: origin
            });
            MTOOL.cwcs.invoke(origin, "tabbarUpdate");
            MTOOL.cwcs.invoke("HBuilder", "updateTab", { to: origin });
          }
        });
      } else {
        location.href = "home.html";
      }
    },
    goFindPS: function() {
      MTOOL.openWindow("login_findps.html");
    },
    goRegister: function() {
      MTOOL.openWindow("login_register.html");
    }
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
