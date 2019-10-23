<template>
  <div id="app" ref="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      height: {
        height: ""
      }
    };
  },
  methods: {
    appHeight() {
      let appHeight = document.documentElement.clientHeight + "px";
      this.$nextTick(() => {
        this.$refs.app.style.height = appHeight;
      });
    }
  },

  mounted() {
    this.appHeight();
  }
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
  overflow: auto;
  max-width: 500px;
  margin: 0 auto;
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
