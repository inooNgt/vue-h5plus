<template>
  <div class="page-content nav-content">
    <van-nav-bar title="个人头像" fixed left-arrow @click-left="goBack" />
    <div class="crop-content">
      <div id="cropView" ref="cropView" class="crop-view"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast } from "vant";
import mAlloyCrop from "mAlloyCrop";
import { dataURLtoBlob } from "utils/utils";
import API from "utils/api";

Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast)
  .use(Field)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      phone: "xxx",
      imgurl: ""
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      if (MTOOL.isPlus) {
        MTOOL.plusReady(() => {
          let wv = plus.webview.currentWebview();
          console.log("localurl: " + wv.localurl);
          console.log("imgpath: " + wv.imgpath);
          this.imgurl = wv.localurl;
          this.imgpath = wv.imgpath;
          this.initCrop();
        });
      } else {
        // test
        this.initCrop("http://p42jcfxfo.bkt.clouddn.com/images/thinkin/bg.jpg");
      }
    });
  },
  methods: {
    goBack: function() {
      mui.back();
    },
    initCrop(path) {
      let cropView = this.$refs.cropView;
      let mAlloyCrop = new AlloyCrop({
        image_src: this.imgpath || path,
        width: 241,
        height: 241,
        output: 1,
        className: "m-clip-box",
        ok: (dataurl, canvas) => {
          cropView.appendChild(canvas);
          cropView.querySelector("canvas").style.borderRadius = "0%";
          // mAlloyCrop.destroy();
          this.imgurl = dataurl;
          let file = dataURLtoBlob(dataurl);

          console.log(file);
          this.upload(file);
        },
        ok_text: "设置头像"
      });
    },
    upload(file) {
      this.$post(API.auth.avatar, file, {
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
          console.log(data);
        })
        .catch(e => {
          console.log(e);
          Toast("上传失败");
        });
    },
    save() {
      console.log("save");
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/scss/var";
body,
html {
  background-color: rgba(0, 0, 0, 0.64);
}
.crop-view {
  display: flex;
  opacity: 0;
  justify-content: center;
  overflow: hidden;
  height: 0;
  canvas {
  }
}
.m-clip-box {
  img {
  }
  .crop-btn-cancel {
    display: none !important;
  }
  .crop-btn-ok {
    background: $color-blue !important;
    width: 100% !important;
    bottom: 0 !important;
    left: 0 !important;
    height: 49px !important;
    line-height: 49px !important;
    font-size: 17px !important;
  }
}
</style>
