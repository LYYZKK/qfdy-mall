import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VConsole from "vconsole";
// 视频播放器
import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);
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
