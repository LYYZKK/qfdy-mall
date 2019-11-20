<template>
  <div class="bar">
    <van-nav-bar :title="title" left-text="返回" :left-arrow="left" @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "NavBar",
  components: {
    [NavBar.name]: NavBar
  },
  data() {
    return {};
  },

  methods: {
    onClickLeft() {
      if (this.$route.name === "Product") {
        this.$router.push({ path: "/index" });
      } else if (this.$route.name === "OrderDetail") {
        this.$router.push({ name: "OrderList" });
      } else if (this.$route.name === "OrderList") {
        this.$router.push({ name: "Product" });
      } else {
        this.$router.go(-1);
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    left: {
      type: Boolean,
      default() {
        return true;
      }
    }
  }
};
</script>

<style>
.bar {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
