<template>
  <div class="page-content nav-content">
    <van-nav-bar title="国家代码" fixed left-arrow @click-left="goBack" />

    <div class="list-content">
      <Contacts :groups="groups" :letters="letters" ref="contacts" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";

import Contacts from "./Contacts";
import { Button, NavBar, Checkbox, CheckboxGroup } from "vant";

const pinyin = require("pinyin");

Vue.use(Button)
  .use(NavBar)
  .use(Checkbox)
  .use(CheckboxGroup);

export default {
  name: "Index",
  components: { Contacts },
  data() {
    return {
      list: [
        {
          id: "1",
          displayName: "aname",
          displayName_py: "",
          phoneNumbers: [
            { id: "1", value: "10086" },
            { id: "2", value: "10010" }
          ],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "2",
          displayName: "吃吃",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008601" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "3",
          displayName: "安安1",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008602" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "4",
          displayName: "宝宝",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008603" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "5",
          displayName: "ename5",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "6",
          displayName: "fname6",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "7",
          displayName: "name7",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "8",
          displayName: "name8",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "9",
          displayName: "name9",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "10",
          displayName: "name10",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "11",
          displayName: "name11",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "12",
          displayName: "name12",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "13",
          displayName: "44name13",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "14",
          displayName: "44name13",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "15",
          displayName: "44name13",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "16",
          displayName: "44name13",
          displayName_py: "",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        }
      ],
      groups: [],
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
      // 非plus下测试数据
      this.groups = this.pySegSort(this.list, this.letters);

      console.log("pinyin:" + this.pinyin("123"));
    },

    // 拼音分组排序
    pySegSort: function(list, letters) {
      let temp = {};
      let result = [];

      if (!letters.length || !list.length) {
        return result;
      }

      letters.forEach(c => {
        temp = { letter: c, data: [] };

        // 按需分组
        list.forEach(item => {
          // 首字母
          var han = item.displayName_py[0] || this.pinyin(item.displayName)[0];

          // 非字母组
          if (!/^[A-Za-z]$/.test(han) && c === "#") {
            temp.data.push(item);
          }
          // 字母组
          if (han.toUpperCase() === c) {
            temp.data.push(item);
          }
        });

        // 组内排序
        if (temp.data.length) {
          temp.data.sort((a, b) => {
            let apy = a.displayName_py || this.pinyin(a.displayName);
            let bpy = b.displayName_py || this.pinyin(a.displayName);
            return apy.localeCompare(bpy);
          });
        }

        result.push(temp);
      });

      console.log("pySegSort result", result);

      return result;
    },

    pinyin: function(str) {
      return (
        pinyin(str, {
          style: pinyin.STYLE_NORMAL
        })[0][0][0] || ""
      );
    },

    generateChars: function() {
      var str = [];
      for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i));
      }
      str.push("#");
      return str;
    },

    getPhoneNumbersById(ids) {
      let result = [];
      if (!ids.length) {
        return result;
      }
      this.list.forEach((item, k) => {
        if (ids.indexOf(item.id) !== -1) {
          if (item.phoneNumbers.length) {
            item.phoneNumbers.forEach((v, k) => {
              result.push(v.value);
            });
          }
        }
      }); 

      result = [...new Set(result)];

      // console.log("getPhoneNumbersById", result);

      return result;
    }
  }   
};
</script>

<style lang="scss">
body {
  overflow-x: initial;
}
</style>
<style lang="scss" scoped>
@import "~assets/scss/common";
.list-content {
  width: 100%;
  padding: 79px 37px 50px 35px;
  .van-checkbox__label {
    display: flex;
  }
}
</style>  
