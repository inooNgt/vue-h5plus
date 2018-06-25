<template>
  <div class="page-content nav-content">
    <van-nav-bar title="国家代码" fixed left-arrow @click-left="goBack" />

    <div class="list-content">
      <Areacodes :groups="groups" :radio-change="handleRadioChange" :letters="letters" ref="contacts" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";
import API from "utils/api";
import config from "utils/config";
import { groupSort, getCachedObject } from "utils/utils";
import Areacodes from "./Areacodes";
import { Button, NavBar, Checkbox, CheckboxGroup } from "vant";

Vue.use(Button)
  .use(NavBar)
  .use(Checkbox)
  .use(CheckboxGroup);

// 获取缓存
const cachedAreacodes = getCachedObject(config.keys.codelist);

console.log("cachedAreacodes", cachedAreacodes);

export default {
  name: "Index",
  components: { Areacodes },
  data() {
    return {
      list: cachedAreacodes,
      commonuse: {
        label: "常用",
        data: []
      },
      groups: [
        {
          label: "",
          data: []
        }
      ],
      letters: this.generateChars(),
      msg: "This is DIC test message."
    };
  },
  mounted() {
    this.$nextTick(() => {
      MTOOL.plusReady(() => {
        this.init();
      });
    });
  },
  methods: {
    goBack: function() {
      mui.back();
    },

    // 初始化列表数据
    init: async function() {
      // 先使用缓存
      if (typeof cachedAreacodes === "object") {
        this.setGroups(this.list);
      }
      this.updateList();
    },

    // 更新列表数据
    updateList: async function() {
      let countriesRes = await this.$get(API.countries);
      let list = countriesRes.data.data;

      // 更新缓存
      MTOOL.storage.setItem(config.keys.codelist, JSON.stringify(list));

      this.list = list;
      this.setGroups(list);
    },

    setGroups(list) {
      let groups = groupSort(list);

      // 常用areacodes
      groups.unshift({
        label: "oftenused",
        data: [
          {
            id: "CN",
            value: "CN 中国"
          }
        ]
      });
      this.groups = groups;

      console.log("groups", groups);
    },

    handleRadioChange(id) {
      console.log(this.getAreaCodeById(id));
      const code = this.getAreaCodeById(id);
      const areacode = {
        id,
        code
      };
      // 缓存
      MTOOL.storage.setItem(config.keys.countrycode, JSON.stringify(areacode));

      mui.back()

      if(MTOOL.isPlus){
        
      }
    },

    generateChars: function() {
      var str = [];
      for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i));
      }
      str.unshift("oftenused");
      return str;
    },

    getAreaCodeById(id) {
      return this.list[id];
    }
  }
};
</script>

<style lang="scss">
body,
html {
  background: #fff;
}
body {
  overflow-x: initial;
}

// .page-content {
//   background-image: url(~assets/img/1.png);
//   background-repeat: no-repeat;
//   background-size: 100%;
//   background-position: 0 -20px;
// }
</style>
<style lang="scss" scoped>
@import "~assets/scss/var";
@import "~assets/scss/common";
.list-content {
  width: 100%;
  padding: 0 $padding-main 50px $padding-main;
  .van-checkbox__label {
    display: flex;
  }
}
</style>  
