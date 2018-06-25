<template>
  <div class="page-content nav-content">
    <van-nav-bar title="个人头像" fixed left-arrow @click-left="goBack" />
    <div class="crop-content">
      <div id="cropView" ref="cropView" class="crop-view"></div>
    </div>
    <img :src="imgurl">
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Icon, Field, Toast } from "vant";
import mAlloyCrop from "mAlloyCrop";

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
        ok: (base64, canvas) => {
          cropView.appendChild(canvas);
          cropView.querySelector("canvas").style.borderRadius = "0%";
          // mAlloyCrop.destroy();
          this.imgurl = base64;
          console.log("base64");
          console.log(base64);
        },
        cancel: () => {
          // mAlloyCrop.destroy();
        }
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
.crop-view {
  canvas {
    display: block;
    margin: 0 auto;
  }
}
</style>
