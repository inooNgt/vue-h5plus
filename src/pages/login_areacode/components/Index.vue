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
import { groupSort, getCachedObject, getCachedData } from "utils/utils";
import Areacodes from "components/Areacodes";
import { Button, NavBar, Checkbox, CheckboxGroup } from "vant";

Vue.use(Button)
  .use(NavBar)
  .use(Checkbox)
  .use(CheckboxGroup);

// 获取缓存
const cachedAreacodes = getCachedObject(config.keys.codelist);

const MAX_OFTENUSE_LENGTH = 5;

console.log("cachedAreacodes", cachedAreacodes);

export default {
  name: "Index",
  components: { Areacodes },
  data() {
    return {
      list: cachedAreacodes,
      oftenuse: {
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

      let oftenusedlist = this.getOftenusedList();

      console.log("getOftenusedList", oftenusedlist);

      if (!oftenusedlist.length) {
        oftenusedlist = [
          {
            id: "CN",
            value: "CN 中国"
          }
        ];
      }
      // 常用areacodes
      groups.unshift({
        label: "oftenused",
        data: oftenusedlist
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

      // 通知各父级页面更新
      MTOOL.invoke("my_auth.html", "event_update");
      MTOOL.invoke("login_msg.html", "event_update");
      MTOOL.invoke("login_register.html", "event_update");
      MTOOL.invoke("login_account.html", "event_update");

      // 缓存
      MTOOL.storage.setItem(config.keys.countrycode, JSON.stringify(areacode));
      // 更新常用
      this.setOftenusedList({
        id,
        value: id + " " + code
      });
      setTimeout(() => {
        mui.back();
      }, 0);
    },
    getOftenusedList() {
      let oftenuselist = getCachedObject(config.keys.oftenuselist) || [];
      return oftenuselist;
    },

    setOftenusedList(areacode) {
      let oftenuselist = getCachedObject(config.keys.oftenuselist) || [];
      console.log("oftenuselist--", oftenuselist, oftenuselist.length);

      // 去重
      if (!this.hasRepeat(oftenuselist, areacode.id)) {
        oftenuselist.push(areacode);
        if (oftenuselist.length > MAX_OFTENUSE_LENGTH) {
          oftenuselist.shift();
        }
      }

      MTOOL.storage.setItem(
        config.keys.oftenuselist,
        JSON.stringify(oftenuselist)
      );
    },

    hasRepeat(list, id) {
      let result = false;
      if (list.length) {
        list.forEach(element => {
          if (element.id === id) {
            result = true;
          }
        });
      }
      return result;
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
