<template>
  <div>
    <NavBar :title="title" />
    <div class="img-text pb">
      <van-image
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        v-for="(item,index) in 4"
        :key="index"
        v-lazy="img"
      />
    </div>
    <van-button
      class="fixed"
      size="large"
      @click="show=true"
      color="linear-gradient(to right,
    rgba(255, 66, 0, 0.5),
    rgba(255, 66, 0, 1))"
    >购买</van-button>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :show-add-cart-btn="false"
      @buy-clicked="onBuyClicked"
      safe-area-inset-bottom
    />
  </div>
</template>

<script>
import { Sku, Image, Button, Lazyload } from "vant";
import NavBar from "@/components/nav-bar.vue";
export default {
  name: "ProductDetail",
  data() {
    return {
      show: false,
      title: "商品详情",
      sku: {
        tree: [],
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      }
    };
  },
  methods: {
    onBuyClicked() {
      this.$router.push({ path: "/product-submit" });
    }
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

