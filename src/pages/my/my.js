// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

import { http, get, post, del } from "utils/utils";

Vue.prototype.$http = http;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$del = del;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
