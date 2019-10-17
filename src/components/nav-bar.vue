<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "NavBar",
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
</style>
