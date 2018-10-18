<template>
  <div class="page-content nav-content" :class="isPlus?'':'broswer-content'">
    <van-nav-bar title="Vant组件演示" fixed />
    <section class="cell-wrap">
      <div class="item-cell" @click="showDialog">
        <div class="cell-padding">
          <img src="~assets/img/demo_1.png" class="cell-img" alt="">
          <div class="cell-content">
            <div class="cell-text">Dialog</div>
          </div>
        </div>
      </div>
      <div class="item-cell" @click="showToast">
        <div class="cell-padding">
          <img src="~assets/img/demo_2.png" class="cell-img" alt="">
          <div class="cell-content">
            <div class="cell-text">Toast</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import mui from 'mui'
import MTOOL from 'mtool'
import { Button, NavBar, Toast, Dialog } from 'vant'

Vue.use(Button).use(NavBar)

export default {
  name: 'Index',
  data() {
    return {
      topRange: 0,
      isPlus: MTOOL.isPlus
    }
  },
  computed: {},
  created() {
    // 更新所有子页面
    window.addEventListener('event_update', event => {
      // 获得事件参数
      let detail = event.detail
      this.update()
    })

    if (MTOOL.isPlus) {
      MTOOL.plusReady(() => {
        let self = plus.webview.currentWebview()

        self.addEventListener('hide', () => {
          this.clear()
        })
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    goBack() {
      mui.back()
    },
    showToast() {
      Toast('泥融飞燕子，沙暖睡鸳鸯。')
    },
    showDialog() {
      Dialog.alert({
        title: '标题',
        message: '迟日江山丽，春风花草香。'
      }).then(() => {
        // on close
      })
    },
    clear() {},
    init() {},
    update() {
      // 首次显示没有触发hide事件
      this.clear()
    }
  }
}
</script>

<style lang="scss">
body,
html {
  background: #ddd;
}
</style>


<style lang="scss" scoped>
@import '~assets/scss/var';
@import '~assets/scss/common';
.page-content {
  padding-bottom: 20px;
  position: relative;
}

.broswer-content {
  padding-bottom: 49px;
}

.cell-wrap {
  display: flex;
  align-items: center;
  padding: $padding-main;
}

.item-cell {
  flex: 1;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  .cell-padding {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  &:first-child {
    margin-right: $padding-main;
  }
  .cell-content,
  .cell-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  .cell-content {
    box-shadow: 0px 1px 9px 0px rgba(0, 0, 0, 0.21);
    z-index: 1;
    padding: $padding-main;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    font-size: 22px;
    line-height: 22px;
    font-weight: 600;
  }
  .cell-img {
  }
}
</style>
