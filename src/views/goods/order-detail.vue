<template>
  <div class="mainContent">
    <!-- <NavBar :title="title" :left="false" :text="''" /> -->
    <div>
      <van-row>
        <van-col span="24" v-for="(item,index) in order.orderProducts" :key="index">
          <van-card
            :centered="centered"
            :thumb="webBaseUrl+item.product.img"
            :title="item.product.name"
            :num="item.productNum"
            tag="预购"
            :price="item.product.price"
            :desc="item.product.description"
          ></van-card>
        </van-col>
      </van-row>
      <van-cell-group>
        <van-cell title="订单编号" :value="order.orderNo"></van-cell>
        <van-cell title="下单时间" :value="order.orderTime"></van-cell>
        <van-cell title="付款时间" :value="order.payTime"></van-cell>
        <van-cell title="备注" :value="order.mark"></van-cell>
      </van-cell-group>
      <!-- <div class="mt">
        <van-row gutter="20">
          <van-col :span="order.orderStatus===3?24:12">
            <van-button size="large" color @click="gotoList">我的订单</van-button>
          </van-col>
          <van-col v-if="order.orderStatus===1" span="12">
            <van-button size="large" @click="cancelOrder" color="red" type="default">取消订单</van-button>
          </van-col>
          <van-col span="12" v-if="order.orderStatus===0">
            <van-button size="large" color="red" @click="show=true">立即付款</van-button>
          </van-col>
        </van-row>
      </div>-->
    </div>
    <!-- <van-dialog v-model="show" title="确认付款" show-cancel-button @confirm="submit" @cancel="cancel">
      <h1 class="text-center">￥{{ order.totalAmount }}</h1>
    </van-dialog>-->
  </div>
</template>

<script>
import {
  Sku,
  Image,
  Button,
  Lazyload,
  Card,
  Row,
  Col,
  Cell,
  CellGroup,
  Dialog
} from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
import mixin from "@/utils/mixin.js";
export default {
  name: "ProductDetail",
  mixins: [mixin],
  data() {
    return {
      show: false,
      centered: true,
      title: "订单详情",
      order: {},
      customerId: "",
      api: {
        getProductById: {
          url: "/orders/{id}",
          method: "get"
        }
      }
    };
  },
  methods: {
    gotoList() {
      this.$router.push({ name: "OrderList" });
    },

    getProductById() {
      if (this.$route.query.id) {
        request({
          ...this.api.getProductById,
          urlReplacements: [
            { substr: "{id}", replacement: this.$route.query.id }
          ]
        }).then(res => {
          this.order = res.data;
          this.customerId = parseInt(localStorage.getItem("id"));
          console.log(res.data);
        });
      }
    }
  },
  beforeMount() {
    this.setTitleBar("订单详情");
  },
  mounted() {
    this.getProductById();
  },
  components: {
    [Sku.name]: Sku,
    [Image.name]: Image,
    [Button.name]: Button,
    [Lazyload.name]: Lazyload,
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.Component.name]: Dialog.Component,
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
.mt {
  margin-top: 30px;
}
</style>>

