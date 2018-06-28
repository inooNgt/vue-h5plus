<template>
  <div class="page-content nav-content">
    <van-nav-bar title="关于我们" fixed left-arrow @click-left="goBack" @click-right="contactus" right-text="联系客服" />
    <ul class="my-list">
      <li class="list-item" v-for="(item,index) in list" :key="item.id" @click="goDetail(item.id,index)">
        <div class="item-left text-main">{{item.title}}</div>
        <div class="item-arrow">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Button, Toast } from "vant";
import MTOOL from "mtool";
import mui from "mui";
import config from "utils/config";
import API from "utils/api";

Vue.use(NavBar)
  .use(Toast)
  .use(Button)
  .use(Icon);

export default {
  name: "Index",
  data() {
    return {
      list: [
        {
          id: "",
          title: "",
          body: ""
        }
      ]
    };
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
      this.$get(API.help)
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.status === 200) {
            if (data.data) this.list = data.data;
          } else {
            data.message && Toast(data.message);
          }
        })
        .catch(e => {
          console.log(e);
          Toast("发生错误" + e);
        });
    },
    contactus() {
      MTOOL.openWindow("my_contactus.html");
    },
    goDetail(id, index) {
      console.log(id, index);

      if (!MTOOL.isPlus) {
        let detail = this.list[index];
        if (detail)
          MTOOL.storage.setItem(config.keys.helpdetail, JSON.stringify(detail));
      }
      if (id) {
        MTOOL.openWindow("my_help_question.html", {
          extras: {
            questionId: id
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.item-left {
  flex: 1 0 auto;
  @extend %text-over;
  .item-title {
  }
}
</style>
