<template>
  <div class="list-comment" ref="commentWrapperRef">
    <div v-if="list.length">
      <div>
        <CommentItem v-for="(item) in list" :data="item" :type="3" :typeid="id" :key="item.id" />
      </div>
      <van-button slot="button" class="btn btn-comment btn-sub-small" v-if="!end && !loading" @click="onMore">查看更多评论</van-button>
      <van-button slot="button" class="btn btn-comment btn-sub-small" v-if="!end && loading">加载评论中..</van-button>
      <div class="text-nomore" v-if="end">没有更多评论了</div>
    </div>
    <div v-else class="text-empty">暂无评论</div>
  </div>
</template>

<script>
import Vue from "vue";
import API from "utils/api";
import CommentItem from "./CommentItem";

export default {
  name: "CommentList",
  components: {
    CommentItem
  },
  props: {
    type: Number,
    id: [Number, String]
  },
  data() {
    return {
      list: [],
      loading: false,
      page: 0,
      totalpage: 9999,
      end: false
    };
  },
  watch: {
    id(val, oldVal) {
      this.update(true);
    }
  },
  mounted() {
    this.clear();
    this.$nextTick(() => {
      this.getCommentList();
    });
  },
  beforeUpdate() {},
  methods: {
    onMore() {
      this.getCommentList(this.page + 1);
    },
    update(fromWatch) {
      this.clear();
      this.$nextTick(() => {
        this.getCommentList().then(() => {
          let y = MTOOL.elementPosition(this.$refs["commentWrapperRef"]).y;
          if (!fromWatch) window.scrollTo(0, y - 85);
        });
      });
    },
    clear() {
      this.list = [];
      this.loading = false;
      this.page = 0;
      this.totalpage = 9999;
      this.end = false;
    },
    getCommentList(page) {
      if (this.commnetLoading) {
        return Promise.resolve();
      }

      if (!page) {
        page = 1;
      }

      if (page > this.totalpage) {
        console.log("没有数据了...");
        return Promise.resolve();
      }
      // console.log("getCommentList id:" + this.id);

      if (!this.id) return Promise.resolve();

      this.commnetLoading = true;
      return this.$get(API.auth.review, {
        params: {
          type: this.type,
          id: this.id,
          page
        }
      })
        .then(res => {
          let data = res.data && res.data.data;
          if (res.status === 200 && data) {
            if (data.limit) {
              this.totalpage = Math.ceil(data.total * 1 / data.limit) || 1;
            }

            if (data.page !== this.page) {
              this.page = data.page;
              if (data.page <= 1) {
                this.list = data.list;
              } else {
                this.list = this.list.concat(data.list);
              }
            }

            this.end = this.page >= this.totalpage;
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.commnetLoading = false;
        });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.list-comment {
  padding-left: $padding-main;
  margin-bottom: 20px;
  padding-bottom: 24px;
  @extend %border-bottom;
  .text-nomore {
    padding: 20px $padding-main 8px 0;
    text-align: center;
    color: $color-tip;
    font-size: 12px;
  }
  .text-empty {
    padding-bottom: 0;
    padding-left: 0;
  }
}
.btn-comment {
  display: block;
  margin: 10px auto 0;
}
</style>
 
