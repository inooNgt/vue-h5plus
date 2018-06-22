`<template>
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
        <van-field class="row-phone" v-model="phone" label="+86" placeholder="请输入手机号" />
        <van-field class="row-sms" center v-model="sms" placeholder="请输入短信验证码">
          <van-button slot="button" size="large">发送验证码</van-button>
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
import { checkPhone } from "utils/utils";
import API from "utils/api";

Vue.component("v-select", VueSelect);

Vue.use(Button)
  .use(Field)
  .use(Cell)
  .use(Icon)
  .use(NavBar)
  .use(CellGroup);

export default {
  name: "Index",
  data() {
    return {
      active: 0,
      username: "",
      inviteCode: "",
      password: "000000",
      phone: "13100004001",
      sms: "000000",
      inputFocus: false,
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
    back: function() {
      mui.back();
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
        calling_code: this.selectedAreacode.label,
        mobile_phone: this.phone,
        sms_code: this.sms.trim()
      };

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
      MTOOL.storage.setItem(
        config.keys.token,
        JSON.stringify(data.access_token)
      );
      MTOOL.storage.setItem(config.keys.user, JSON.stringify(data.user));

      console.log("登录成功 :" + MTOOL.logined());

      // 跳转 plus环境
      if (MTOOL.isPlus) {
        MTOOL.plusReady(function() {
          var wv = plus.webview.currentWebview();
          var origin = wv.from;
          // 来自tabbar子页面的登录，返回tabbar子页面,然后再更新tabbar子页
          console.log("origin: " + origin);
          setTimeout(() => {
            // 关闭当前页
            mui.back();
            // 更新页面
            MTOOL.invoke("HBuilder", "index_update_subpages", { to: origin });
          }, 400);

          // 带参处理
          // if (origin && MTOOL.config.subpages.indexOf(origin)) {
          //   MTOOL.switchNav({
          //     from: "login.html",
          //     to: origin
          //   });
          //   MTOOL.invoke("HBuilder", "index_update_tab", { to: origin });
          // }
        });
      } else {
        location.href = "home.html";
      }
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
  padding: 69px 0 120px;
}
.logo-img {
  display: block;
  width: 150px;
  height: 84px;
  margin: 0 auto;
}
.btn-box {
  text-align: center;
  padding: 27px 0 50px;
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
    border: 1px solid $color-main;
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