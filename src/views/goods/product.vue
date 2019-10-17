<template>
  <div>
    <NavBar :title="title" />
    <div class="img-text">
      <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>

    <van-card v-for="(item,index) in list" :key="index" :thumb="item.img" @click="goGoodById">
      <div slot="title">van-</div>
    </van-card>
  </div>
</template>

<script>
import { Image, Row, Col, Card, Tag, Button, List } from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
export default {
  name: "Product",
  data() {
    return {
      list: [],
      title: "商品列表",
      api: {
        getProducts: {
          url: "/products",
          method: "get"
        }
      }
    };
  },
  methods: {
    goGoodById() {
      this.$router.push({ path: "/product-detail" });
    },
    getProducts() {
      request({ ...this.api.getProducts }).then(res => {
        this.list = res.data;
      });
    }
  },
  mounted() {
    this.getProducts();
  },
  components: {
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [List.name]: List,
    NavBar
  }
};
</script>

<style>
</style>
