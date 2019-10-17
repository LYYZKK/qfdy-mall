<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background: #fff;
}
/* 通用样式 */
.border-radius {
  border-radius: 7px;
  overflow: hidden;
}
.text-center {
  text-align: center;
}
.img-text {
  font-size: 0;
}
img {
  vertical-align: middle;
}
.mt {
  margin-top: 10px;
}
.mb {
  margin-bottom: 10px;
}
.ml {
  margin-left: 20px;
}
.bg-color {
  background-image: linear-gradient(
    to right,
    rgba(255, 66, 0, 0.5),
    rgba(255, 66, 0, 1)
  );
}
.text-color {
  color: rgba(255, 66, 0, 1);
}
.text-color-white {
  color: #fff;
}
.pb {
  padding-bottom: 50px;
}
</style>
