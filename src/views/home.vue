<template>
  <div class="mainContent">
    <router-view :to="{path:'/booking',query:{param}}" />
    <van-tabbar v-model="active" route active-color="#ee0a24">
      <van-tabbar-item icon="home-o" :to="{path:'/booking',query:{param}}">产品列表</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/mine">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      param: localStorage.getItem('param'),
      orderListTitleName: process.env.APPOINT_BUY ? '预购订单' : '预约订单'
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style></style>
