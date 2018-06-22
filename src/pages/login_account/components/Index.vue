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
            <span>中国CN</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <van-field class="row-phone" v-model="phone" label="+86" placeholder="请输入手机号" />
        <van-field class="row-psd" center v-model="password" placeholder="请输入密码">
        </van-field>
        <div class="row-msg">
          <div class="col-left" @click="goMsgLogin">快捷登录</div>
          <div class="col-right">
          </div>
        </div>
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
      password: "000000",
      phone: "13100004001",
      sms: "000000",
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

      if (this.password.trim() === "") {
        Toast("密码不能为空");
        return;
      }

      param = {
        calling_code: this.selectedAreacode.label,
        mobile_phone: this.phone,
        password: this.password.trim()
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
    goAreaCode() {
      MTOOL.openWindow("login_areacode.html");
    },
    goMsgLogin() {
      location.href = "login_msg.html";
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
    margin-bottom: 12px;
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
  .row-psd {
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
  padding: 69px 0 145px;
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

.row-country,
.row-msg {
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
