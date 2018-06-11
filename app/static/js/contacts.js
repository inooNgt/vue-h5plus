webpackJsonp(
  [7],
  {
    MJyj: function(e, n) {},
    NtCe: function(e, n) {
      e.exports = window.MTOOL;
    },
    "PAU+": function(e, n) {},
    aZQy: function(e, n, t) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = t("7+uW"),
        s = (t("NtCe"),
        t("MJyj"),
        {
          render: function() {
            var e = this.$createElement,
              n = this._self._c || e;
            return n("div", { attrs: { id: "app" } }, [n("router-view")], 1);
          },
          staticRenderFns: []
        });
      var a = t("VU/8")(
          {
            name: "App",
            data: function() {
              return {};
            },
            mounted: function() {}
          },
          s,
          !1,
          function(e) {
            t("dagC");
          },
          null,
          null
        ).exports,
        i = t("/ocq"),
        c = (t("3Lne"), t("SSsa")),
        u = (t("FO5P"), t("woHG")),
        l = t("uKeQ"),
        r = t.n(l);
      o.a.use(c.a).use(u.a);
      var d = {
          name: "Index",
          data: function() {
            return {
              list: [
                {
                  id: "1",
                  displayName: "name",
                  phoneNumbers: [{ id: "1", value: "10086" }]
                }
              ],
              msg: "Welcome to Your Vue.js App"
            };
          },
          methods: {
            goBack: function() {
              console.log("back"), r.a.back();
            },
            getAddress: function() {
              var e = this,
                n = [];
              "undefined" != typeof plus &&
                plus.contacts.getAddressBook(
                  plus.contacts.ADDRESSBOOK_PHONE,
                  function(t) {
                    console.log("Get address book success!"),
                      console.log(t),
                      t.find(
                        null,
                        function(t) {
                          console.log("address find success"),
                            t.forEach(function(e) {
                              var t = {};
                              console.log(
                                "contacts item displayName:" + e.displayName
                              ),
                                console.log("contacts item id:" + e.id),
                                e.phoneNumbers &&
                                  e.phoneNumbers.length &&
                                  e.phoneNumbers.forEach(function(e, n) {
                                    console.log(
                                      "phoneNumbers " + n + " value :" + e.value
                                    );
                                  }),
                                (t.id = e.id),
                                (t.displayName = e.displayName),
                                (t.phoneNumbers = e.phoneNumbers),
                                n.push(t);
                            }),
                            (e.list = n);
                        },
                        function() {
                          console.log("address find error");
                        },
                        { multiple: !0 }
                      );
                  },
                  function(e) {
                    console.log("Get address book failed: " + e.message);
                  }
                );
            }
          }
        },
        p = {
          render: function() {
            var e = this,
              n = e.$createElement,
              t = e._self._c || n;
            return t(
              "div",
              { staticClass: "page-content" },
              [
                t("van-nav-bar", {
                  attrs: { title: "标题", "left-arrow": "" },
                  on: { "click-left": e.goBack }
                }),
                e._v(" "),
                t(
                  "div",
                  [
                    t(
                      "van-button",
                      { attrs: { size: "large" }, on: { click: e.getAddress } },
                      [e._v("获取通信录好友")]
                    ),
                    e._v(" "),
                    t(
                      "ul",
                      { staticClass: "list" },
                      e._l(e.list, function(n) {
                        return t(
                          "li",
                          { key: n.id, staticClass: "list-item" },
                          [
                            t("span", [e._v("联系人:" + e._s(n.displayName))]),
                            e._v(" "),
                            t("span", [
                              e._v("手机号:" + e._s(n.phoneNumbers[0].value))
                            ]),
                            e._v(" "),
                            t("span", [e._v("id:" + e._s(n.id))])
                          ]
                        );
                      })
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var f = t("VU/8")(
        d,
        p,
        !1,
        function(e) {
          t("PAU+");
        },
        "data-v-cad3edb6",
        null
      ).exports;
      o.a.use(i.a);
      var m = new i.a({ routes: [{ path: "/", name: "Index", component: f }] });
      (o.a.config.productionTip = !1),
        new o.a({
          el: "#app",
          router: m,
          components: { App: a },
          template: "<App/>"
        });
    },
    dagC: function(e, n) {},
    f4F5: function(e, n) {},
    uKeQ: function(e, n) {
      e.exports = window.mui;
    },
    znX2: function(e, n) {}
  },
  ["aZQy"]
);
//# sourceMappingURL=contacts.js.map
