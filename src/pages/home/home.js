// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue";
import App from "./App";
import { http, get, post } from "utils/utils";

<<<<<<< HEAD
import FastClick from "fastclick";

FastClick.attach(document.body);

=======
>>>>>>> fc685a0410f5b22f7430a4d88d94b94db6228fbd
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
