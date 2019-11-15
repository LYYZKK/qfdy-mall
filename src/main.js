import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VConsole from "vconsole";
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  const vConsole = new VConsole();
  Vue.use(vConsole);
}
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
