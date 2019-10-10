<template>
  <div>
    乔府大院首页
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item icon="search">分类</van-tabbar-item>
      <van-tabbar-item icon="setting-o">社区</van-tabbar-item>
      <van-tabbar-item icon="friends">我的</van-tabbar-item>
    </van-tabbar>
    <!-- <van-number-keyboard safe-area-inset-bottom :show="show" /> -->
  </div>
</template>

<script>
import { NumberKeyboard, Tabbar, TabbarItem } from "vant";
export default {
  name: "Home",
  data() {
    return {
      show: true,
      active: 0
    };
  },
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>

<style>
</style>
