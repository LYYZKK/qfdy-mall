<template>
  <div class="mainContent">
    <NavBar :title="title" />
    <div class="img-text">
      <van-image :src="goods.picture" />
    </div>
    <van-row class="pd-left-right">
      <van-col span="24" class="font-style margin-bottom-20">￥{{ sku.price }}</van-col>
      <van-col span="24">{{ goods.description }}</van-col>
    </van-row>
    <div v-for="(item,index) in productImages" :key="index" class="img-text">
      <van-image :src="item"></van-image>
    </div>
    <van-button
      class="fixed"
      size="large"
      @click="purchase"
      color="linear-gradient(to right,
    rgba(255, 66, 0, 0.5),
    rgba(255, 66, 0, 1))"
    >预定</van-button>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goods.id"
      :show-add-cart-btn="false"
      :buy-text="'立即预定'"
      @buy-clicked="onBuyClicked"
      safe-area-inset-bottom
    />
  </div>
</template>

<script>
import { Sku, Image, Button, Lazyload, Row, Col } from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
import mixin from "@/utils/mixin.js";
import ProductDetailConfig from "@/config/product-detail.config";
export default {
  name: "ProductDetail",
  mixins: [mixin],
  data() {
    return {
      show: false,
      title: "商品详情",
      productId: "",
      productImages: [],
      sku: {
        tree: [],
        list: [],
        price: "", // 默认价格（单位元）
        stock_num: "", // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: true // 是否隐藏剩余库存
      },
      goods: {
        description: "",
        // 商品标题
        title: "",
        // 默认商品 sku 缩略图
        picture: "",
        id: ""
      },
      api: {
        getProductById: {
          url: "/products/{id}",
          method: "get"
        }
      }
    };
  },
  methods: {
    // 点击购买判断用户是否登录
    purchase() {
      let isLogin = parseInt(localStorage.getItem("isLogin"));
      if (isLogin === 1) {
        this.show = true;
      } else {
        console.log(
          "未登录将跳转银行登录页面传输路径为",
          window.location.protocol +
            "//" +
            window.location.host +
            this.$route.fullPath
        );
        // eslint-disable-next-line no-undef
        loginForComm(
          window.location.protocol +
            "//" +
            window.location.host +
            this.$route.fullPath,
          window.location.protocol +
            "//" +
            window.location.host +
            this.$route.fullPath
        );
      }
    },
    onBuyClicked(value) {
      this.$router.push({
        name: "ProductSubmit",
        params: { sku: this.sku, goods: value }
      });
    },
    getProductById() {
      this.productId = this.$route.params.id;
      if (this.$route.params.id) {
        request({
          ...this.api.getProductById,
          urlReplacements: [
            { substr: "{id}", replacement: this.$route.params.id }
          ]
        }).then(res => {
          // let url = "https://mall.wuchangdami.qiaofudayuan.net:8001";
          // let url = window.location.host;
          this.goods.picture = this.imgBaseUrl + res.data.data.img;
          this.goods.description = res.data.data.description;
          this.goods.id = res.data.data.id;
          this.goods.title = res.data.data.name;
          this.sku.price = res.data.data.price;
          this.sku.stock_num = res.data.data.totalCount;
          this.productImages = ProductDetailConfig[this.productId].images;
          console.log(this.productImages);
        });
      }
    },
    initPage() {
      let cmbcParam = this.$route.query.param;
      if (cmbcParam !== undefined) {
        this.cmbcDescrypt();
      }
    }
  },
  mounted() {
    this.initPage();
    this.getProductById();
  },

  components: {
    [Sku.name]: Sku,
    [Image.name]: Image,
    [Button.name]: Button,
    [Lazyload.name]: Lazyload,
    [Row.name]: Row,
    [Col.name]: Col,
    NavBar
  }
};
</script>

<style scoped>
.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
}
.pd-left-right {
  background-color: #fff;
  padding: 10px;
}
.font-style {
  font-size: 18px;
  color: rgb(255, 66, 0);
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
</style>>

