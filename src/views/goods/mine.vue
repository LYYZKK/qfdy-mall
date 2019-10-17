<template>
  <div>
    <NavBar :title="title" />
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
export default {
  name: "Mine",
  data() {
    return {
      title: "我的"
    };
  },
  components: {
    NavBar
  }
};
</script>

<style>
</style>
