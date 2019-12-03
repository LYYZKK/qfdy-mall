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
    <van-notice-bar
      color="#1989fa"
      background="#fff"
      :wrapable="true"
      :scrollable="true"
    >
      温馨提示：七天无理由退订，客户已收现货需在认购金额中扣除{{ goods.id===1?'（2kg/199）':goods.id===2?'（3kg/299）':'' }}费用
    </van-notice-bar>
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
            <van-button
              size="large"
              @click="purchase"
              color="rgba(255, 66, 0, 1)"
              :disabled="sku.stock_num===0"
            >{{ sku.stock_num===0?'已售罄':'立即预定' }}</van-button>
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
      hide-selected-text
      :buy-text="'立即预定'"
      disable-stepper-input
      @buy-clicked="onBuyClicked"
      @stepper-change="totalNumber"
      safe-area-inset-bottom="true"
    >
      <div slot="sku-header-origin-price">{{ goods.title }}</div>
      <div slot="sku-messages">
        <van-row type="flex" justify="space-between" align="center" style="width:100%;padding:0 12px;">
          <van-col>总价</van-col>
          <van-col class="van-sku__goods-price van-sku__price-num">￥{{ sku.price*PayNumber }}</van-col>
        </van-row>
      </div>
    </van-sku>
    <van-dialog
      v-model="dialogShow"
      title="温馨提示"
      :message="message"
      confirmButtonText="知道了"
      @confirm="dialogClose"
    >
    </van-dialog>
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
  Loading,
  Toast,
  NoticeBar,
  Dialog
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
      // 点击提交按钮时候自动获取的参数
      getValue:{},
      show: false,
      dialogShow:false,
      PayNumber:1,
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
    totalNumber(val){
      this.PayNumber = val
    },
    onBuyClicked(value) {
      this.getValue = value
      this.dialogShow = true
    },
    dialogClose(){
      this.$router.push({
        name: "ProductSubmit",
        params: { sku: this.sku, goods: this.getValue }
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
  beforeMount() {
    this.setTitleBarName("商品详情");
  },
  computed:{
    message(){
      let msg = '七天无理由退订，客户已收现货需在认购金额中扣除'
      return this.goods.id===1?msg+'（2kg/199）费用':this.goods.id===2?msg+'（3kg/299）费用':''
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
    [Toast.name]: Toast,
    [Divider.name]: Divider,
    [Tabbar.name]: Tabbar,
    [Loading.name]: Loading,
    [TabbarItem.name]: TabbarItem,
    [NoticeBar.name]: NoticeBar,
    [Dialog.Component.name]: Dialog.Component,
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
.text-color-ccc{
  color: #ccc;
  font-size: 11px;
}
</style>>

