webpackJsonp([3],{"9lyQ":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o=n("NtCe"),i=n.n(o),s=(n("MJyj"),{render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]});var c=n("VU/8")({name:"App",data:function(){return{}},mounted:function(){}},s,!1,function(t){n("NfMv")},null,null).exports,r=n("/ocq"),u=(n("3Lne"),n("SSsa")),l=(n("FO5P"),n("woHG")),f=(n("yIEv"),n("OIh9")),v=(n("jAcA"),n("86U2")),p=n("uKeQ"),d=n.n(p);a.a.use(u.a).use(l.a).use(f.a).use(v.a);var m={name:"Index",data:function(){return{tablist:[{id:0,title:"专属地址"},{id:1,title:"专属海报"}],active:0,list:[{id:"1",displayName:"name",phoneNumbers:[{id:"1",value:"10086"}]}],msg:"Welcome to Your Vue.js App"}},methods:{goBack:function(){d.a.back()},shareSystem:function(){i.a.shareSystem({msg:{content:"我是xxx，邀请你来领取DIC，http://www.xxx.com/sharw/ARXYX"},success:function(){console.log("share success")},fail:function(t){console.log("share error",t)}})}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-content"},[n("van-nav-bar",{attrs:{title:"标题","left-arrow":""},on:{"click-left":t.goBack}}),t._v(" "),n("van-tabs",{model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.tablist,function(e){return n("van-tab",{key:e.id,attrs:{title:e.title}},[t._v("\n      item.title内容\n    ")])})),t._v(" "),n("div",[n("van-button",{attrs:{size:"large"},on:{click:t.shareSystem}},[t._v("系统分享")])],1)],1)},staticRenderFns:[]};var w=n("VU/8")(m,h,!1,function(t){n("L6ro")},"data-v-bb99f184",null).exports;a.a.use(r.a);var x=new r.a({routes:[{path:"/",name:"Index",component:w}]});a.a.config.productionTip=!1,new a.a({el:"#app",router:x,components:{App:c},template:"<App/>"})},L6ro:function(t,e){},MJyj:function(t,e){},NfMv:function(t,e){},NtCe:function(t,e){t.exports=window.MTOOL},f4F5:function(t,e){},mx3f:function(t,e){},uKeQ:function(t,e){t.exports=window.mui},znX2:function(t,e){}},["9lyQ"]);
//# sourceMappingURL=vigour_share.js.map