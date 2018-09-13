<template>
  <div class="article-item md-item-border " :class="data.cover?'item-cover':''" @click="onitemclick && onitemclick(data.id)||null">
    <h4 class="article-title">{{data.title}}</h4>
    <article class="article-body">
    </article>
    <aside class="aside">{{data.who}}
      <span> {{data.site && data.site.name}}</span>
    </aside>
    <div class="cover-wrap">
      <img class="cover-img" v-if="data.cover" :src="data.cover" alt="">
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "ArticleItem",
  props: {
    data: Object,
    onitemclick: Function
  },
  data() {
    return {};
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";

.article-item {
  position: relative;
  padding-bottom: 7px;
  margin-bottom: $padding-main;
  padding-right: $padding-main;
  .cover-wrap {
    display: none;
  }
  &.item-cover {
    padding-right: 115px;
    .cover-wrap {
      display: block;
      width: 100px;
      height: 78px;
      position: absolute;
      right: 0;
      top: 0;
      overflow: hidden;
      border-radius: 5px;
      .cover-img {
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        width: auto;
        height: 100%;
      }
    }
  }
  &:last-child {
    border-bottom: 0 !important;
  }
}
.article-title {
  font-weight: normal;
  color: #000;
  font-size: 16px;
  line-height: 18px;
  @include clamp(2);
}
.article-body {
  color: $color-tip;
  height: 38px;
  overflow: hidden;
  font-size: 12px;
  @include clamp(2);
}
.aside {
  margin-top: 4px;
  font-size: 12px;
  color: $color-border;
}
</style>
 
