<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow @click-left="goBack" />
    <div>
      <van-button size="large" @click="shareSystem">系统分享</van-button>
      <van-button size="large" @click="getAddress">获取通信录好友</van-button>
      <ul>
        <li v-for="item in list" v-bind:key="item.id">
          <div>id:{{item.id}}</div>
          <div>displayName:{{item.displayName}}</div>
          <div v-for="phone in item.phoneNumbers" v-bind:key="phone.id">phoneNumbers:{{phone.value}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MTOOL from "mtool";
import mui from "mui";
import { Button, NavBar } from "vant";

Vue.use(Button).use(NavBar);

export default {
  name: "Index",
  data() {
    return {
      list: [
        {
          id: "",
          displayName: "",
          phoneNumbers: [{ id: "", value: "" }]
        }
      ],
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    goBack: function() {
      console.log("back");
      mui.back();
    },
    shareSystem: function() {
      let msg = {
        content: "我是xxx，邀请你来领取DIC，http://www.xxx.com/sharw/ARXYX"
      };
      MTOOL.shareSystem({
        msg,
        success: () => {
          console.log("share success");
        },
        fail: e => {
          console.log("share error", e);
        }
      });
    },
    getAddress: function() {
      let list = [];
      if (typeof plus !== "undefined") {
        plus.contacts.getAddressBook(
          plus.contacts.ADDRESSBOOK_PHONE,
          addressbook => {
            // 可通过addressbook进行通讯录操作
            console.log("Get address book success!");
            console.log(addressbook);

            addressbook.find(
              null,
              contacts => {
                console.log("address find success");
                contacts.forEach(item => {
                  let temp = {};
                  console.log(`contacts item displayName:${item.displayName}`);
                  console.log(`contacts item id:${item.id}`);
                  if (item.phoneNumbers && item.phoneNumbers.length) {
                    item.phoneNumbers.forEach((v, k) => {
                      console.log(`phoneNumbers ${k} value :${v.value}`);
                    });
                  }

                  temp.id = item.id;
                  temp.displayName = item.displayName;
                  temp.phoneNumbers = item.phoneNumbers;

                  list.push(temp);
                });

                this.list = list;
              },
              () => {
                console.log("address find error");
              },
              { multiple: true }
            );
          },
          e => {
            console.log("Get address book failed: " + e.message);
          }
        );
      }
    }
  }
};
</script>





<style lang="scss" scoped>
@import "~assets/scss/var";
</style>
