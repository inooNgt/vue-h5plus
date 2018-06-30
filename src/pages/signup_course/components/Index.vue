<template>
  <div class="page-content nav-content">
    <van-nav-bar title="报名课程" fixed left-arrow @click-left="goBack" />
    <ul class="my-list">
      <li class="list-item" @click="setMsg('name')">
        <div class="item-left">姓名</div>
        <div class="item-right">
          <input readonly :value="name" placeholder="请输入姓名" />
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="setMsg('phone')">
        <div class="item-left">手机号</div>
        <div class="item-right">
          <input readonly :value="phone" placeholder="请输入手机号" />
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="setMsg('wx')">
        <div class="item-left">微信</div>
        <div class="item-right">
          <input readonly :value="wx" placeholder="请输入微信号" />
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="setMsg('qq')">
        <div class="item-left">QQ</div>
        <div class="item-right">
          <input readonly :value="qq" placeholder="请输入QQ号" />
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
    <div class="box-btn box-btn-fixed">
      <van-button slot="button" class="btn btn-main btn-main-large" size="large" @click="signup">报名</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Button, Toast } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import { getCachedUser, loadUserInfo, getCachedData } from "utils/utils";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon);

// 缓存的用户信息
const cachedUser = getCachedUser();

const courseId = getCachedData(config.keys.signupcourseid);

const cachedname = getCachedData(config.keys.coursesignupname);
const cachedphone = getCachedData(config.keys.coursesignupphone);
const cachedqq = getCachedData(config.keys.coursesignupqq);
const cachedwx = getCachedData(config.keys.coursesignupwx);

const canUseCached = !MTOOL.isPlus;

const SIGN_TYPE = 1;

export default {
  name: "Index",
  data() {
    return {
      logined: MTOOL.logined(),
      name: (canUseCached && cachedname) || "",
      phone: (canUseCached && cachedphone) || "",
      qq: (canUseCached && cachedqq) || "",
      wx: (canUseCached && cachedwx) || "",
      loading: false
    };
  },
  created() {
    console.log("created", this.logined);
    // 更新所有子页面
    window.addEventListener("event_update", event => {
      // 获得事件参数
      let detail = event.detail;
      console.log("course signup event_update");
      console.log("detail.type:");
      console.log(detail.type);
      console.log("detail.value:");
      console.log(detail.value);
      // plus环境更新数据
      this.update(detail);
    });
  },

  methods: {
    goBack() {
      mui.back();
    },
    update(detail) {
      if (detail && detail.type && detail.value !== this[detail.type]) {
        this[detail.type] = detail.value;
      }
    },
    signup() {
      let param = {
        type: SIGN_TYPE,
        id: courseId,
        name: this.name,
        mobile_phone: this.phone,
        wechat: this.wx,
        sns_qq: this.qq
      };

      if (this.name.trim() === "") {
        Toast("姓名不能为空");
        return;
      }

      if (this.phone.trim() === "") {
        Toast("姓名不能为空");
        return;
      }

      this.loading = true;
      this.$post(API.auth.signup, param)
        .then(res => {
          res = res && res.data;
          let data = res.data;
          if (res.status === 200 && data) {
            Toast("报名成功");
            setTimeout(() => {
              mui.back();
            }, 400);
          } else {
            res.message && Toast(res.message);
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
          e.message && Toast(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    setMsg(msg) {
      MTOOL.storage.setItem(config.keys.coursesignupmsg, msg);
      MTOOL.storage.setItem(config.keys.signupmsgtype, "course");
      MTOOL.openWindow("signup_msg.html");
    },

    login() {
      MTOOL.openWindow("login.html");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.page-content {
  padding-bottom: 50px;
}
.item-left {
  width: 170px;
  .item-title {
    width: 170px;
  }
}
.item-right {
  input {
    width: 100%;
    border: none;
    text-align: right;
    color: $color-gray;
    @extend %text-over;
  }
}
</style>
