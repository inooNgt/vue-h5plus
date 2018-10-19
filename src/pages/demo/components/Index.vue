<template>
  <div class="page-content nav-content" :class="isPlus?'':'broswer-content'">
    <van-nav-bar title="Vant组件演示" fixed />
    <section class="cell-wrap">
      <ul class="list">
        <li class="item-cell" @click="showShade">
          <div class="cell-padding cell-bg-1">
            <div class="cell-content ">
              <div class="cell-text">原生弹层</div>
            </div>
          </div>
        </li>
        <li class="item-cell" @click="showToast">
          <div class="cell-padding cell-bg-2">
            <div class="cell-content">
              <div class="cell-text">提示</div>
            </div>
          </div>
        </li>
        <li class="item-cell" @click="showToast">
          <div class="cell-padding cell-bg-3">
            <div class="cell-content">
              <div class="cell-text">提示</div>
            </div>
          </div>
        </li>
        <li class="item-cell" @click="showToast">
          <div class="cell-padding cell-bg-4">
            <div class="cell-content">
              <div class="cell-text">提示</div>
            </div>
          </div>
        </li>
        <li class="item-cell" @click="showToast">
          <div class="cell-padding cell-bg-5">
            <div class="cell-content">
              <div class="cell-text">提示</div>
            </div>
          </div>
        </li>
        <li class="item-cell" @click="showToast">
          <div class="cell-padding cell-bg-6">
            <div class="cell-content">
              <div class="cell-text">提示</div>
            </div>
          </div>
        </li>
      </ul>
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
    showShade() {
      MTOOL.floatWebview('shade.html')
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
  padding: $padding-main;
  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.item-cell {
  // flex: 1;
  width: 48%;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 1px 9px 0px rgba(0, 0, 0, 0.21);
  overflow: hidden;
  margin-bottom: $padding-main;

  .cell-padding {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .cell-bg-1 {
    background: url(~assets/img/demo_1.png) center/cover;
  }
  .cell-bg-2 {
    background: url(~assets/img/demo_2.png) center/cover;
  }
  .cell-bg-3 {
    background: url(~assets/img/demo_3.png) center/cover;
  }
  .cell-bg-4 {
    background: url(~assets/img/demo_4.png) center/cover;
  }
  .cell-bg-5 {
    background: url(~assets/img/demo_5.png) center/cover;
  }
  .cell-bg-6 {
    background: url(~assets/img/demo_6.png) center/cover;
  }
  &:nth-child(2n - 1) {
    // margin-right: $padding-main;
  }
  .cell-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    z-index: 1;
    padding: $padding-main;

    font-size: 16px;
    display: flex;
    justify-content: flex-end;
  }
  .cell-text {
    writing-mode: vertical-rl;
  }
}
</style>
