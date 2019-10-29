<template>
  <div>
    <NavBar :title="title" />
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in 4" :key="index">
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-swipe-item>
    </van-swipe>
    <!-- <div class="img-text">
      <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>-->
    <van-card
      v-for="(item,index) in list"
      :key="index"
      :centered="centered"
      :thumb="item.img"
      :title="item.name"
      :num="item.count"
      tag="预购"
      :price="item.price"
      :desc="item.description"
      @click="getProductById(item.id)"
    ></van-card>
  </div>
</template>

<script>
import {
  Image,
  Row,
  Col,
  Card,
  Tag,
  Button,
  List,
  Swipe,
  SwipeItem
} from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
export default {
  name: "Product",
  data() {
    return {
      list: [],
      title: "商品列表",
      centered: true,
      api: {
        getProducts: {
          url: "/products",
          method: "get"
        }
      }
    };
  },
  methods: {
    getProductById(id) {
      this.$router.push({ path: "/product-detail", query: { id: id } });
    },
    getProducts() {
      request({ ...this.api.getProducts }).then(res => {
        this.list = res.data.data;
        console.log(this.list);
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
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    NavBar
  }
};
</script>

<style>
</style>
