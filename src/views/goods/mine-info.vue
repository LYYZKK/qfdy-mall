<template>
  <div>
    <NavBar :title="title" />

    <van-contact-card type="edit" name="张三" tel="13000000000" />
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
export default {
  name: "MineInfo",
  data() {
    return {
      title: "新增客户信息"
    };
  },
  components: {
    NavBar
  }
};
</script>

<style>
</style>
