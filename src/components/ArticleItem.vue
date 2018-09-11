<template>
  <div class="article-item md-item-border " :class="data.cover?'item-cover':''" @click="onitemclick && onitemclick(data.id)||null">
    <h4 class="article-title">{{data.title}}</h4>
    <article class="article-body">
      {{data.content}}
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
    padding-right: 134px;
    .cover-wrap {
      display: block;
      @extend %img-wrap;
      width: 105px;
      height: 79px;
      position: absolute;
      right: $padding-main;
      top: 0;
      .cover-img {
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
      }
    }
  }
  &:last-child {
    border-bottom: 0 !important;
  }
}
.article-title {
  font-weight: 600;
  color: #000;
  font-size: 16px;
  line-height: 18px;
  padding-top: 2px;
  margin-bottom: 3px;
  @include clamp(2);
}
.article-body {
  color: $color-tip;
  height: 38px;
  line-height: 19px;
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
 
