<template>
  <div class="page-content nav-content">
    <van-nav-bar title="实名认证" fixed left-arrow @click-left="goBack" />
    <div class="auth-status" v-if="verifying">
      <img class="status-img" src="~assets/img/icon_empty.png" alt="">
      <div class="status-text">正在审核中，已审核…</div>
    </div>
    <ul class="my-list">
      <li class="list-item" @click="getMsg('name')">
        <div class="item-left">姓名</div>
        <div class="item-right">
          <span class="placeholder">请输入姓名</span>
          <span class="right-text">{{name}}</span>
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">国家</div>
        <div class="item-right">
          <span class="placeholder">请选择国家</span>
          <span class="right-text">{{country}}</span>
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">证件类型</div>
        <div class="item-right">
          <span class="placeholder">请选择证件类型</span>
          <span class="right-text">{{type}}</span>
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item">
        <div class="item-left">证件号码</div>
        <div class="item-right">
          <span class="placeholder">请选择证件号码</span>
          <span class="right-text">{{number}}</span>
        </div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
    <div class="uploader">
      <div class="upload-row">
        <div class="row-title">证件正面照</div>
        <div class="upload-box">
          <div class="box-img">
            <van-uploader :after-read="onFrontRead">
              <img class="view-img" v-if="showView0" :src="view0" alt="">
              <div class="box-add" v-if="!showView0">
                <span class="md-icon md-icon-add"></span>
              </div>
            </van-uploader>
          </div>
          <div class="box-right" v-if="showView0" @click="deleteUpload(0)">
            删除
          </div>
        </div>
      </div>
      <div class="upload-row">
        <div class="row-title">证件反面照</div>
        <div class="upload-box">
          <div class="box-img">
            <van-uploader :after-read="onEndRead">
              <img class="view-img" v-if="showView1" :src="view1" alt="">
              <div class="box-add" v-if="!showView1">
                <span class="md-icon md-icon-add"></span>
              </div>
            </van-uploader>
          </div>
          <div class="box-right" v-if="showView1" @click="deleteUpload(1)">
            删除
          </div>
        </div>
      </div>
      <div class="upload-row">
        <div class="row-title">手持证件照</div>
        <div class="row-title-sub">提供手持证件和写着dic.club的白纸的照片，并标明日期</div>
        <div class="upload-box">
          <div class="box-img">
            <van-uploader :after-read="onHandRead">
              <img class="view-img" v-if="showView2" :src="view2" alt="">
              <div class="box-add" v-if="!showView2">
                <span class="md-icon md-icon-add"></span>
              </div>
            </van-uploader>
          </div>
          <div class="box-right" v-if="showView2" @click="deleteUpload(2)">
            删除
          </div>
        </div>
      </div>
    </div>
    <div class="box-btn">
      <van-button slot="button" class="btn btn-sub" @click="save" size="large">提交修改</van-button>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Button, Toast, Uploader } from "vant";
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
  .use(Uploader)
  .use(Icon);

// 缓存的用户信息
const cachedUser = getCachedUser();

export default {
  name: "Index",
  data() {
    return {
      name: "",
      country: "",
      type: "",
      number: "",
      logined: MTOOL.logined(),
      view0: "",
      showView0: false,
      view1: "",
      showView1: false,
      view2: "",
      showView2: false,
      file0: null,
      file1: null,
      file2: null,
      verifying: false
    };
  },
  methods: {
    goBack() {
      mui.back();
    },
    getMsg(type) {
      MTOOL.openWindow("my_auth_msg.html", {
        extras: {
          param_type: type,
          param_value: this[type]
        }
      });
    },

    login() {
      MTOOL.openWindow("login.html");
    },

    onFrontRead(data) {
      this.handleUploadData(data, 0);
    },
    onEndRead(data) {
      this.handleUploadData(data, 1);
    },
    onHandRead(data) {
      this.handleUploadData(data, 2);
    },
    deleteUpload(index) {
      this[`view${index}`] = "";
      this[`showView${index}`] = false;
      this[`file${index}`] = null;
    },
    handleUploadData(data, index) {
      console.log(data, index);
      this[`view${index}`] = data.content;
      this[`showView${index}`] = true;
      this[`file${index}`] = data.file;
    },
    save() {
      console.log("save");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
// .page-content {
//   background-image: url(~assets/img/3.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -20px;
// }

.uploader {
  background: #fff;
  padding: px2rem(15px) $padding-main 0;
}
.row-title {
  font-size: 16px;
  font-family: PingFang-SC-Bold;
}
.row-title-sub {
  color: rgba(0, 0, 1, 0.6);
  font-size: 10px;
  padding: 2px 0 3px;
}
.upload-row {
  position: relative;
  margin-bottom: px2rem(15px);
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
        90deg,
        #ffffff -10%,
        #dddddd 50%,
        #ffffff 111%
      ),
      linear-gradient($color1, $color1);
    background-blend-mode: normal, normal;
  }
  &:last-child {
    margin-bottom: 0;
    &:after {
      display: none;
    }
  }
}
.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: px2rem(15px) px2rem(12px) px2rem(18px);
  position: relative;
  .box-right {
    position: absolute;
    top: 0;
    right: 0;
    width: px2rem(50px);
    height: px2rem(50px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color1;
  }
  .box-img {
    width: px2rem(161px);
    height: px2rem(93px);
    position: relative;
  }
  .van-uploader {
    width: 100%;
    height: 100%;
  }
  .view-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: px2rem(10px);
  }
  .box-add {
    width: 100%;
    height: 100%;
    border-radius: px2rem(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px rgba(221, 221, 221, 0.5);
  }
}
.my-list {
  background: #fff;
  padding: 0 $padding-main;
  .list-item {
    display: flex;
    height: px2rem(52px);
    line-height: px2rem(52px);
    &:last-child:after {
      display: block;
    }
  }
}
.item-left {
  width: 170px;
  font-size: 16px;
  font-family: PingFang-SC-Bold;
  .item-title {
    width: 170px;
  }
}
.box-btn {
  text-align: center;
  padding: px2rem(18px) 0;
}
.auth-status {
  height: 137px;
  text-align: center;
  padding: 37px $padding-main 0;
  background: #fff;
}
.status-img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}
.status-text {
  margin-top: 11px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
