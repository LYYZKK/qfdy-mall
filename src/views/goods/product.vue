<template>
  <div>
    <NavBar :title="title" />
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in list" :key="index">
        <van-image :src="imgBaseUrl+item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- <div class="img-text">
      <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>-->
    <van-card
      v-for="(item,index) in list"
      :key="index"
      :centered="centered"
      :thumb="imgBaseUrl+item.img"
      :title="item.name"
      tag="预售"
      :price="item.price"
      :desc="item.description"
      @click="getProductById(item.id)"
    >
      <div slot="footer">库存：{{ item.totalCount }}</div>
    </van-card>
  </div>
</template>

<script>
import mixin from "@/utils/mixin.js";
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
  mixins: [mixin],
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
      this.$router.push({ name: "ProductDetail", params: { id: id } });
    },
    getProducts() {
      request({ ...this.api.getProducts }).then(res => {
        this.list = res.data;
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
