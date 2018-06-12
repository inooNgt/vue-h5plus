<template>
    <div class="cts-content">
        <van-checkbox-group v-model="result">
            <ul v-for="(group,index) in groups" :class="'group-'+index" v-bind:key="group.letter">
                <li v-for="item in group.data" class="list-item" v-bind:key="item.id">
                    <van-checkbox :key="item.id" shape="square" :name="item.id">
                        <div class="item-img"><img :src="item.photos && item.photos[0] && item.photos[0].value" alt=""></div>
                        <div class="item-name">{{item.displayName}}</div>
                    </van-checkbox>
                </li>
            </ul>

        </van-checkbox-group>
        <div class="contacts-hook">
            <span class="hook-item" v-for="char in letters" :key="char" @click="toHook(char)">
                {{char}}
            </span>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";

import { Button, NavBar, Checkbox, CheckboxGroup } from "vant";

Vue.use(Button)
  .use(NavBar)
  .use(Checkbox)
  .use(CheckboxGroup);

export default {
  name: "Contacts",
  props: {
    groups: Array,
    letters: Array
  },
  data() {
    return {
      result: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log("groups:", this.groups);
    });
  },
  updated() {
    console.log("groups---:", this.groups);
  },
  methods: {
    toHook: function(char) {
      console.log("to hook: ", char);
    },

    send: function() {
      if (MTOOL.isPlus) {
        let msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
        msg.to = this.getPhoneNumbersById(this.result);
        msg.body = "This is DIC test message.";
        plus.messaging.sendMessage(msg);
      }
      console.log("send to:", this.getPhoneNumbersById(this.result));
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
.cts-content {
  .van-checkbox {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 18px;
  }
  .van-checkbox__label {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
    margin: 0;
    height: 48px;
  }
  .van-checkbox__icon {
    width: 20px;
  }
}
</style>
  

<style lang="scss" scoped>
@import "~assets/scss/common";
.list-item {
  margin-bottom: 18px;
}
.item-name {
  @extend %text-over;
  flex: 1 0 auto;
  padding: 0 9px;
  color: #210248;
  font-size: 14px;
  max-width: 200px;
}
.item-img {
  // width: 45px;
  // height: 45px;
  background-color: #fff;
  border-radius: 5px;

  & > img {
    display: block;
    width: 45px;
    height: 45px;
    border-radius: 5px;
    border: none;
  }
}
.item-check {
  width: 30px;
}
.contacts-hook {
  position: fixed;
  right: 19px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}
.hook-item {
  width: 20px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 10px;
}
</style>  
