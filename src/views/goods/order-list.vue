<template>
  <div>
    <NavBar :title="title" />
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
export default {
  name: "OrderList",
  data() {
    return {
      title: "预购订单",
      api: {
        getOrders: {
          url: "/orders",
          method: "get"
        }
      }
    };
  },
  methods: {
    getOrders() {
      request({ ...this.api.getOrders }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.getOrders();
  },
  components: {
    NavBar
  }
};
</script>

<style>
</style>
