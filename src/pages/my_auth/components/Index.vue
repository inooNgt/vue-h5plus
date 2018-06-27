<template>
  <div class="page-content nav-content">
    <van-nav-bar title="实名认证" fixed left-arrow @click-left="goBack" />
    <div class="auth-status" v-if="status*1 === 2">
      <img class="status-img" src="~assets/img/icon_empty.png" alt="">
      <div class="status-text">正在审核中…</div>
    </div>
    <div class="auth-status" v-if="status*1 === 3">
      <img class="status-img" src="~assets/img/icon_empty.png" alt="">
      <div class="status-text">已审核…</div>
    </div>
    <div class="auth-status" v-if="status*1 === 4">
      <img class="status-img" src="~assets/img/icon_empty.png" alt="">
      <div class="status-text">认证失败…</div>
    </div>
    <ul class="my-list">
      <li class="list-item" @click="getName">
        <div class="item-left">姓名</div>
        <div class="item-right">
          <span class="placeholder" v-if="!name">请输入姓名</span>
          <span class="right-text">{{name}}</span>
        </div>
        <div class="item-arrow" v-if="status*1 === 1">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="getCountry">
        <div class="item-left">国家</div>
        <div class="item-right">
          <span class="placeholder" v-if="!country">请选择国家</span>
          <span class="right-text">{{country}}</span>
        </div>
        <div class="item-arrow" v-if="status*1 === 1">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="getType">
        <div class="item-left">证件类型</div>
        <div class="item-right">
          <span class="placeholder" v-if="!authtype">请选择证件类型</span>
          <span class="right-text">{{expressedtype}}</span>
        </div>
        <div class="item-arrow" v-if="status*1 === 1">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="list-item" @click="getNumber">
        <div class="item-left">证件号码</div>
        <div class="item-right">
          <span class="placeholder" v-if="!number">请选择证件号码</span>
          <span class="right-text">{{number}}</span>
        </div>
        <div class="item-arrow" v-if="status*1 === 1">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
    <div class="uploader">
      <div class="upload-row">
        <div class="row-title">
          <span class="text-title">证件正面照</span>
          <div class="edit" v-if="status*1 ===1">
            <span class="text-del" v-if="showView0" @click="deleteUpload(0)">删除</span>
            <span class="text-edit" @click="addImg(0)" v-if="showView0">编辑</span>
          </div>
        </div>
        <div class="upload-box">
          <div class="box-img">
            <img class="view-img" v-if="showView0" :src="imgsrc0" alt="">
            <div class="box-add" @click="addImg(0)" v-if="!showView0 && !loading0">
              <span class="md-icon md-icon-add"></span>
            </div>
            <div class="box-loading" v-if="loading0">
              <van-loading color="black" />
            </div>
          </div>
        </div>
      </div>
      <div class="upload-row">
        <div class="row-title">
          <span class="text-title">证件反面照</span>
          <div class="edit" v-if="status*1 ===1">
            <span class="text-del" v-if="showView1" @click="deleteUpload(1)">删除</span>
            <span class="text-edit" @click="addImg(1)" v-if="showView1">编辑</span>
          </div>
        </div>
        <div class="upload-box">
          <div class="box-img">
            <img class="view-img" v-if="showView1" :src="imgsrc1" alt="">
            <div class="box-add" @click="addImg(1)" v-if="!showView1  && !loading1">
              <span class="md-icon md-icon-add"></span>
            </div>
            <div class="box-loading" v-if="loading1">
              <van-loading color="black" />
            </div>
          </div>
        </div>
      </div>
      <div class="upload-row">
        <div class="row-title">
          <span class="text-title">手持证件照</span>
          <div class="edit" v-if="status*1 ===1">
            <span class="text-del" v-if="showView2" @click="deleteUpload(2)">删除</span>
            <span class="text-edit" @click="addImg(2)" v-if="showView2">编辑</span>
          </div>
        </div>
        <div class="row-title-sub" v-if="status*1 ===1">
          <span>提供手持证件和写着dic.club的白纸的照片，并标明日期</span>
        </div>
        <div class="upload-box">
          <div class="box-img">
            <img class="view-img" v-if="showView2" :src="imgsrc2" alt="">
            <div class="box-add" @click="addImg(2)" v-if="!showView2 && !loading2">
              <span class="md-icon md-icon-add"></span>
            </div>
            <div class="box-loading" v-if="loading2">
              <van-loading color="black" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-btn box-btn-fixed" v-if="status*1 ===1">
      <van-button slot="button" class="btn btn-sub" v-if="!loading" @click="save" size="large">提交实名认证</van-button>
      <van-button slot="button" class="btn btn-sub" v-if="loading" size="large">提交实名认证中...</van-button>
    </div>
    <div class="box-btn box-btn-fixed" v-if="status*1 ===4">
      <van-button slot="button" class="btn btn-sub" @click="retry" size="large">重新认证</van-button>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Button, Toast, Loading } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import {
  getCachedData,
  getCachedObject,
  loadUserInfo,
  dataURLtoBlob,
  readAsDataURL
} from "utils/utils";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Loading)
  .use(Icon);

// 缓存的用户信息

const cachedRealname = getCachedData(config.keys.realname);

const cachedNumber = getCachedData(config.keys.authnumber);

const cachedType = getCachedData(config.keys.authtype);

let cachedCountrycode = getCachedObject(config.keys.authcountrycode);

const testdata =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADxElEQVR4Xu2aS8hNURTHf593UkoZGCgSMiAx8UqKEgoDJUpGjJgxI68hM0aMpJQyoFDklTwHEhNFeWRAKaUkyat/rVPH4XbvOmevc7/bOWtyu/fusx7/s9drrz1Ew2mo4fbTAtDugIYj0LpAwzdAGwRbF2hdwIfAEmAscMv3WPjq0cBi4AXwwSPN4wJzgWfGfDdwwiMocO044CqwHHgJzPLI8gAwH3iSY74TOOURFrB2DHAZWGW8XwEzPHI8AIjvHuCoCfgNbAfOeAQmXDsKuAisNZ5fgBXAY48MLwDifRjYb0J+AVuBcx6hCdaOBM4DG43XV2Al8NDLuwwAkqFdoN0g+glsAi54hZdcPwI4C2y2578Bq4E7ZfiVBUCyTgI7TOgPYANwpYwSjmek72lgmz3zHVgHXHfw+GtpFQCSK9ODEceBXSlBrwKA9Ei6HbsAEOJ2VQGQzv8LSMrJrmjcxfiwwJsCAOleTEmfrTDJCqcednfHJaGpNxUA0r5YlHwClgHPK1gvf5ffZ5S8+EoJgJTMl6X6/hFYaiWqFwdlGGWajELK79QASNnxwA1gkWn+3kB47UBAaU7pLtNvL3DM8XzPSyMAkPAJwG1goWnyzkDQZzdSgaNCRxlGpAB4oNtDZf+PAkD6TLTqbJ4p9wZQO60d0YlU2qrEVWYR6a3r7YdRJABSehJwF5hjFqhdVUxQbCiSmho1N8ooIrXb8vtQigZAyk8G7gEzzRJlBWUHZYmM1M6qrVUmEanNVsQPpzoAkBFTgPvANLNI9YGKpaxe0IGGMohI7bXabLXb4VQXADJkKvDIwNB3VYry70uWOfSbOkp1luowa6E6AZBBcgO5g9xCpPOELNqrk1RHqc6yNqobABmmgPjAskRm6E1gDaD2tlYaTgDoUKPWty+k6wZgurmAgmLRBWr3/7oBUBCU/+uzUxDU2aLOGBUbaqG6dkCj02CjC6FGl8KNboZStsMHgUNRETEiCDb6QKTRR2KNPhSNPBbfBxyxGJB8Ip0iBhQHI6XG1F2CXH4qlHQiXRWAOkdj+bmgzgvWpxjGVgGgH8PR/ES68mS4ajM0HMbjle4GVAGguB37eUGi9O2QsgAoIisyZ/38cLgiUzrwemNA6KTWWe4mSb0eABYUZv7JJ7VOALS8WHy9zR2998TOA4BGXE+Na8iktieN/12UL791U3S2h48HAPHVbVHl/gwIj6zItboquwW4FnlVNtKAvvH27oC+KRoluAUgCtlB4dvugEF5U1F6tjsgCtlB4dvugEF5U1F6/gHAIOBBomZ+cQAAAABJRU5ErkJggg==";

export default {
  name: "Index",
  data() {
    return {
      name: "",
      country: "",
      countryId: "",
      authtype: "",
      number: "",
      logined: MTOOL.logined(),
      showView0: false,
      showView1: false,
      showView2: false,
      loading: false,
      loading0: false,
      loading1: false,
      loading2: false,
      imgsrc0: "",
      imgsrc1: "",
      imgsrc2: "",
      picturedata0: null,
      picturedata1: null,
      picturedata2: null,
      status: null // 1待认证，2认证中，3认证成功，4认证失败
    };
  },
  computed: {
    // 计算属性的 getter
    expressedtype: function() {
      if (this.authtype * 1 === 1) return "身份证";
      if (this.authtype * 1 === 2) return "护照";
    }
  },
  created() {
    console.log("created", this.logined);

    window.addEventListener("event_edit_name", event => {
      let detail = event.detail;
      console.log("my auth event_edit_name " + detail.name);
      this.editName(detail.name);
    });

    window.addEventListener("event_edit_number", event => {
      let detail = event.detail;
      console.log("my auth event_edit_number" + detail.number);
      this.editNumber(detail.number);
    });
    window.addEventListener("event_edit_authtype", event => {
      let detail = event.detail;
      console.log("my auth event_edit_authtype " + detail.authtype);
      this.editAuthtype(detail.authtype);
    });
    window.addEventListener("event_edit_country", event => {
      let detail = event.detail;
      console.log("my auth event_edit_country" + detail.code);
      this.editCountry(detail);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  methods: {
    goBack() {
      mui.back();
    },
    init() {
      // this.update();
      this.getIdentity();
    },
    editName(name) {
      if (name !== this.name) this.name = name;
    },
    editNumber(number) {
      if (number !== this.number) this.number = number;
    },
    editAuthtype(authtype) {
      if (authtype !== this.authtype) this.authtype = authtype;
    },
    editCountry(detail) {
      if (!detail) return;

      let country = detail.country;
      let countryId = detail.countryId;

      if (countryId !== this.countryId) {
        this.country = country;
        this.countryId = countryId;
      }
    },

    // 获取认证状态
    getIdentity() {
      this.$get(API.auth.identity)
        .then(res => {
          let data = res.data && res.data.data;
          if (res.status === 200) {
            this.name = data.real_name;
            this.authtype = data.id_type;
            this.number = data.id_number;
            this.countryId = data.country_code;
            this.picturedata0 = data.picture1;
            this.picturedata1 = data.picture2;
            this.picturedata2 = data.picture3;
            this.imgsrc0 =
              data.picture1 &&
              data.picture1.base_url + "/" + data.picture1.path;
            this.imgsrc1 =
              data.picture2 &&
              data.picture2.base_url + "/" + data.picture2.path;
            this.imgsrc2 =
              data.picture3 &&
              data.picture3.base_url + "/" + data.picture3.path;

            this.getCountryById(this.countryId).then(res => {
              this.country = res || "";
            });

            this.showView0 = !!this.imgsrc0;
            this.showView1 = !!this.imgsrc1;
            this.showView2 = !!this.imgsrc2;

            this.status = data.status;
          } else {
            data.message && Toast(data.message);
          }
          console.log("identity", data);
        })
        .catch(e => {
          console.log(e);
          Toast(e);
        });
    },
    async getCountryById(id) {
      let countriesRes = await this.$get(API.countries);
      let list = countriesRes.data.data;

      return list[id];
    },

    addImg(uploadIndex) {
      if (!MTOOL.isPlus) {
        Toast("请在app中修改头像");

        // test
        this.uploadFile(
          {
            localurl: "",
            fileblob: dataURLtoBlob(testdata)
          },
          uploadIndex
        );
        return;
      }
      MTOOL.plusReady(() => {
        plus.nativeUI.actionSheet(
          {
            cancel: "取消",
            buttons: [{ title: "相册" }, { title: "拍照" }]
          },
          e => {
            console.log("User pressed: " + e.index);
            if (e.index === 1) {
              plus.gallery.pick(
                path => {
                  console.log("gallerySuccess");
                  console.log(path);
                  this.pathToDataUrl(path, uploadIndex);
                },
                this.galleryFail,
                {}
              );
            }
            if (e.index === 2) {
              this.captureImage(uploadIndex);
            }
          }
        );
      });
    },
    galleryFail(error) {
      console.log("galleryFail");
      Toast(error);
    },
    captureImage(uploadIndex) {
      let cmr = plus.camera.getCamera();
      let res = cmr.supportedImageResolutions[0];
      let fmt = cmr.supportedImageFormats[0];
      console.log("Resolution: " + res + ", Format: " + fmt);
      cmr.captureImage(
        path => {
          console.log("Capture image success: " + path);
          this.pathToDataUrl(path, uploadIndex);
        },
        error => {
          console.log("Capture image failed: " + error.message);
        },
        { resolution: res, format: fmt }
      );
    },
    pathToDataUrl(path, uploadIndex) {
      plus.io.resolveLocalFileSystemURL(path, entry => {
        console.log("entry.toLocalURL:");
        console.log(entry.toLocalURL());
        readAsDataURL(entry, {
          onloadend: e => {
            console.log("readAsDataURL:");
            console.log(e.target.result);
            let fileblob = dataURLtoBlob(e.target.result);
            this.uploadFile(
              {
                localurl: entry.toLocalURL(),
                fileblob: fileblob
              },
              uploadIndex
            );
          }
        });
      });
    },

    uploadFile(file, index) {
      console.log("fileblob:");
      console.log(file.fileblob);

      this[`loading${index}`] = true;
      this.$post(API.auth.userfile, file.fileblob, {
        headers: {
          "Content-Type": "image/png"
        }
      })
        .then(res => {
          let data = res.data;
          if (data.status === 200) {
            Toast("上传成功");
          } else {
            data.message && Toast(data.message);
          }
          console.log("data.data.url");
          console.log(data.data.url);
          this.uploadSuccess(data.data, index);
        })
        .catch(e => {
          console.log(e);
          Toast("上传失败");
        })
        .finally(() => {
          this[`loading${index}`] = false;
        });
    },
    uploadSuccess(data, index) {
      this[`showView${index}`] = true;
      this[`picturedata${index}`] = data;
      this[`imgsrc${index}`] = data && data.base_url + "/" + data.path;
    },
    deleteUpload(index) {
      this[`showView${index}`] = false;
      this[`picturedata${index}`] = null;
      this[`imgsrc${index}`] = null;
    },
    getName() {
      if (this.status * 1 !== 1) return;
      MTOOL.openWindow("my_auth_name.html", {
        extras: {
          realname: this.name
        }
      });
    },
    getCountry() {
      if (this.status * 1 !== 1) return;
      MTOOL.openWindow("my_auth_areacode.html", {
        extras: {
          country: this.country
        }
      });
    },
    getType() {
      if (this.status * 1 !== 1) return;
      MTOOL.openWindow("my_auth_type.html", {
        extras: {
          authtype: this.authtype
        }
      });
    },
    getNumber() {
      if (this.status * 1 !== 1) return;
      MTOOL.openWindow("my_auth_number.html", {
        extras: {
          number: this.number
        }
      });
    },

    login() {
      MTOOL.openWindow("login.html");
    },

    retry() {
      this.status = 1;
    },

    save() {
      if (this.loading0 || this.loading1 || this.loading2) {
        Toast("请等待图片上传完成");
        return;
      }

      console.log("save");
      let param = {
        country_code: this.countryId,
        real_name: this.name,
        id_type: this.authtype,
        id_number: this.number,
        "picture1[base_url]":
          (this.picturedata0 && this.picturedata0.base_url) || "",
        "picture1[path]": (this.picturedata0 && this.picturedata0.path) || "",
        "picture2[base_url]":
          (this.picturedata1 && this.picturedata1.base_url) || "",
        "picture2[path]": (this.picturedata1 && this.picturedata1.path) || "",
        "picture3[base_url]":
          (this.picturedata2 && this.picturedata2.base_url) || "",
        "picture3[path]": (this.picturedata2 && this.picturedata2.path) || ""
      };

      console.log("param", param);

      this.loading = true;
      this.$post(API.auth.identity, param)
        .then(res => {
          let data = res.data;
          if (data.status === 200) {
            Toast("提交成功");
            MTOOL.invoke("my.html", "event_update");
            setTimeout(() => {
              // mui.back();
            }, 400);
          } else {
            data.message && Toast(data.message);
          }
          console.log(data);
        })
        .catch(e => {
          console.log(e);
          Toast("提交失败");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  background: #fff;
}
</style>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
// .page-content {
//   background-image: url(~assets/img/3.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -20px;
// }

.page-content {
  padding-bottom: 79px;
}

.my-list {
  .item-right {
    padding-right: 0;
  }
  .item-arrow {
    padding-left: 5px;
  }
}

.uploader {
  background: #fff;
  padding: px2rem(15px) $padding-main 0;
}
.row-title {
  display: flex;
  justify-content: space-between;
  .text-title {
    font-size: 16px;
    font-family: PingFang-SC-Bold;
  }
}
.edit {
  .text-del {
    padding: 3px 5px 0;
    color: $color1;
  }
  .text-edit {
    padding: 3px 5px 0;
    color: $color-main;
  }
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
  .box-edit {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    display: flex;
    justify-content: center;
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
    border: solid 1px #dddddd;
  }
  .box-add,
  .box-loading {
    width: 100%;
    height: 100%;
    border-radius: px2rem(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: dashed 1px rgba(221, 221, 221, 0.5);
  }
  .box-loading {
    position: absolute;
    top: 0;
    left: 0;
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
