import Vue from "vue";
import App from "./App";
import { http, get, post } from "utils/utils";

Vue.prototype.$http = http;
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
