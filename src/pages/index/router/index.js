import Vue from "vue";
import Router from "vue-router";

const Index = resolve => {
  import("../components/Index").then(module => {
    resolve(module);
  });
};

const My = resolve => {
  import("../components/My").then(module => {
    resolve(module);
  });
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "/index",
      component: Index
    },
    {
      path: "/index",
      name: "Index",
      component: Index
    },

    {
      path: "/my",
      name: "My",
      component: My
    }
  ]
});
