import Vue from "vue";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
/*第一层if判断生产环境和开发环境*/
console.log(process.env.NODE_ENV);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
