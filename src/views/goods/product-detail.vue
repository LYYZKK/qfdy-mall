<template>
  <div class="mainContent">
    <NavBar :title="title" />
    <div class="img-text">
      <van-image :src="picture" />
    </div>
    <van-button
      class="fixed"
      size="large"
      @click="purchase"
      color="linear-gradient(to right,
    rgba(255, 66, 0, 0.5),
    rgba(255, 66, 0, 1))"
    >购买</van-button>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goods.id"
      :show-add-cart-btn="false"
      @buy-clicked="onBuyClicked"
      safe-area-inset-bottom
    />
  </div>
</template>

<script>
import { Sku, Image, Button, Lazyload } from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
import mixin from "@/utils/mixin.js";
export default {
  name: "ProductDetail",
  mixins: [mixin],
  data() {
    return {
      show: false,
      title: "商品详情",
      sku: {
        tree: [],
        list: [],
        price: "", // 默认价格（单位元）
        stock_num: "", // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      picture: "",
      goods: {
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
      console.log(typeof isLogin);
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
      if (this.$route.params.id) {
        request({
          ...this.api.getProductById,
          urlReplacements: [
            { substr: "{id}", replacement: this.$route.params.id }
          ]
        }).then(res => {
          this.picture = res.data.data.img;
          this.goods.picture = res.data.data.img;
          this.goods.id = res.data.data.id;
          this.goods.title = res.data.data.name;
          this.sku.price = res.data.data.price;
          this.sku.stock_num = res.data.data.count;
        });
      }
    },
    initPage() {
      let cmbcParam = this.$route.query.param;
      console.log(cmbcParam);
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
</style>>

