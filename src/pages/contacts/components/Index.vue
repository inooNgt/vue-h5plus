<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-text="活力加速" fixed left-arrow @click-left="goBack" />

    <div class="list-content">
      <van-checkbox-group v-model="result">
        <ul class="list">
          <li v-for="item in list" class="list-item" v-bind:key="item.id">
            <!-- <div class="item-img">联系人:{{item.displayName}}</div>
          <div class="item-name">手机号:{{item.phoneNumbers[0].value}}</div>
          <div class="item-check">id:{{item.id}}</div> -->

            <van-checkbox :key="item.id" shape="square" :name="item.id">
              <div class="item-img"><img :src="item.photos && item.photos[0] && item.photos[0].value" alt=""></div>
              <div class="item-name">{{item.displayName}}</div>
            </van-checkbox>
          </li>
        </ul>
      </van-checkbox-group>

      <div class="footer">
        <van-button size="large" @click="send">发送</van-button>
      </div>
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
  name: "Index",
  data() {
    return {
      list: [
        {
          id: "1",
          displayName: "aname1",
          phoneNumbers: [
            { id: "1", value: "10086" },
            { id: "2", value: "10010" }
          ],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "2",
          displayName: "bname2",
          phoneNumbers: [{ id: "1", value: "1008601" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "3",
          displayName: "cnam3",
          phoneNumbers: [{ id: "1", value: "1008602" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "4",
          displayName: "dname4",
          phoneNumbers: [{ id: "1", value: "1008603" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "5",
          displayName: "ename5",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "6",
          displayName: "fname6",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "7",
          displayName: "name7",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "8",
          displayName: "name8",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "9",
          displayName: "name9",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "10",
          displayName: "name10",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "11",
          displayName: "name11",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "12",
          displayName: "name12",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        },
        {
          id: "13",
          displayName: "name13",
          phoneNumbers: [{ id: "1", value: "1008600" }],
          photos: [{ id: "1", value: "" }]
        }
      ],
      result: [],
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.$nextTick(() => {
      mui.plusReady(() => {
        this.list = this.getAddress();
      });
    });
  },
  methods: {
    goBack: function() {
      mui.back();
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
                  console.log(`contacts item photos:${item.photos}`);
                  if (item.photos && item.photos.length) {
                    item.photos.forEach((v, k) => {
                      for (let key in v) {
                        console.log("photos." + key + ": " + v[key]);
                      }
                    });
                  }

                  temp.id = item.id;
                  temp.displayName = item.displayName;
                  temp.phoneNumbers = item.phoneNumbers;
                  temp.photos = item.photos;

                  list.push(temp);
                });
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

      return list;
    }
  }
};
</script>

 <style lang="scss">
.list-content {
  .van-checkbox {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
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
.list-content {
  width: 100%;
  padding: 79px 37px 50px 35px;
  .van-checkbox__label {
    display: flex;
  }
}
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
</style>  
