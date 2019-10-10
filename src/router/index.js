import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/home.vue";

Vue.use(Router);
export default new Router({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      component: Home,
      meta: {
        title: "乔府大院"
      }
    }
  ]
});
