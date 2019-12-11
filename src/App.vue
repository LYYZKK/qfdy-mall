<template>
  <div id="app" ref="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      height: {
        height: ''
      }
    }
  },
  methods: {
    appHeight() {
      let appHeight = document.documentElement.clientHeight + 'px'
      this.$nextTick(() => {
        this.$refs.app.style.height = appHeight
      })
    }
  },
  mounted() {
    this.appHeight()
  }
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 500px;
  margin: 0 auto;
  background-color: #eee;
}
* {
  box-sizing: border-box;
}
/* 通用样式 */
.border-radius {
  border-radius: 7px;
  overflow: hidden;
}
.van-stepper__input[disabled] {
  color: rgba(0, 0, 0, 1) !important;
}
.text-center {
  text-align: center;
}
.img-text {
  font-size: 0;
  text-align: center;
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
  background-image: linear-gradient(to right, rgba(255, 66, 0, 0.5), rgba(255, 66, 0, 1));
}
.text-color {
  color: rgba(255, 66, 0, 1);
}
.text-color-999 {
  color: #999;
}
.text-color-ccc {
  color: #ccc;
}
.text-color-white {
  color: #fff;
}
.pb {
  padding-bottom: 50px;
}
.mainContent {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 0 50px 0;
}
.border {
  margin: 10px;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  background: #fff;
}
.round {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 35px;
}
.van-card {
  background-color: #fff !important;
}
.text-color-yellow {
  color: #ee0a24;
  font-size: 13px;
}
.font-size-10 {
  font-size: 10px;
}
.text-color-ccc {
  color: #ccc;
}
</style>
