<template>
  <div class="mainContent">
    <router-view to="/booking" />
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/booking">商品列表</van-tabbar-item>
      <van-tabbar-item icon="search" to="/order-list">预购订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "Home",
  data() {
    return {
      active: 0
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>

<style>
</style>
