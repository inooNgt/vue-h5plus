<template>
  <div class="page-content " :class="isPlus?'':'nav-content'">
    <van-nav-bar v-if="!isPlus" :title="title" fixed left-arrow @click-left="goBack" />
    <div class="content">
      <p>君子于役，不知其期，曷至哉？
        鸡栖于埘，日之夕矣，羊牛下来。
        君子于役，如之何勿思！

        君子于役，不日不月，曷其有佸[1]？
        鸡栖于桀，日之夕矣，羊牛下括。
        君子于役，苟无饥渴！</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar } from 'vant'
import MTOOL from 'mtool'
import mui from 'mui'
import config from 'utils/config'
import API from 'utils/api'

Vue.use(NavBar)

export default {
  name: 'Index',
  data() {
    return {
      title: '关于我们',
      isPlus: MTOOL.isPlus
    }
  },
  mounted() {},
  methods: {
    goBack() {
      mui.back()
    }
  }
}
</script>

<style lang="scss" >
html,
body {
  min-height: 100%;
  background: #fff;
}
</style>

<style lang="scss" scoped>
@import '~assets/scss/var';
.content {
  padding: $padding-main;
}
</style>
