<template>
  <div class="mainContent">
    <NavBar :title="title" />
    <div class="img-text">
      <van-image :src="goods.picture">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <van-row class="pd-left-right">
      <van-col span="24" class="font-style margin-bottom-20">￥{{ sku.price }}</van-col>
      <van-col span="24">{{ goods.description }}</van-col>
    </van-row>
    <van-divider :style="{ color: 'rgba(0,0,0,1)',padding: '0px 20px',margin:'5px 0'}">产品详情</van-divider>
    <div v-for="(item,index) in productImages" :key="index" class="img-text">
      <van-image :src="item">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <van-tabbar safe-area-inset-bottom>
      <van-tabbar-item>
        <van-row class="fixed">
          <van-col span="12" v-if="sku.stock_num!==0">
            <van-button
              size="large"
              @click="purchase"
              color="rgba(255, 66, 0, 1)"
            >库存状态：剩余{{ sku.stock_num }}份</van-button>
          </van-col>
          <van-col :span="sku.stock_num===0?24:12">
            <van-button size="large" @click="purchase" color="rgba(255, 66, 0, 1)" :disabled="sku.stock_num===0">{{ sku.stock_num===0?'已售罄':'立即预定' }}</van-button>
          </van-col>
        </van-row>
      </van-tabbar-item>
    </van-tabbar>

    <van-sku
      :close-on-click-overlay="true"
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
import {
  Sku,
  Image,
  Button,
  Lazyload,
  Row,
  Col,
  Divider,
  Tabbar,
  TabbarItem,
  Loading
} from "vant";
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
        localStorage.setItem("purchaseStatus", this.$route.params.id);
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
    fun() {
      request({
        ...this.api.getProductById,
        urlReplacements: [
          { substr: "{id}", replacement: this.$route.params.id }
        ]
      }).then(res => {
        this.goods.picture = this.webBaseUrl + res.data.img;
        this.goods.description = res.data.description;
        this.goods.id = res.data.id;
        this.goods.title = res.data.name;
        this.sku.price = res.data.price;
        this.sku.stock_num = res.data.totalCount;
        this.productImages = ProductDetailConfig[this.productId].images;
      });
    },
    getProductById() {
      console.log(this.$route.params.id);
      this.productId = this.$route.params.id;
      if (this.$route.params.id) {
        this.fun();
        const timer = setInterval(() => {
          this.fun();
        }, 5000);
        this.$once("hook:beforeDestroy", () => {
          clearInterval(timer);
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
    [Divider.name]: Divider,
    [Tabbar.name]: Tabbar,
    [Loading.name]: Loading,
    [TabbarItem.name]: TabbarItem,
    NavBar
  }
};
</script>

<style scoped lang="less">
.fixed {
  width: 100%;
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
.bg-block {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
}
.text-align-center {
  text-align: center;
}
.van-divider {
  &::before {
    border: 1px dashed rgb(207, 204, 204);
  }
  &::after {
    border: 1px dashed rgb(207, 204, 204);
  }
}
</style>>

