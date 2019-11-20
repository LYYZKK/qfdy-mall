<template>
  <div class>
    <NavBar :title="title" />
    <div class="mainContent text-center" v-if="orderList.length===0">
      <div class="round bg-color">
        <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
      </div>
      <div class="text-color-999 font-size-14">您还没有相关的订单</div>
      <div class="text-color-999 font-size-14">可以去看看有哪些想买的</div>
      <van-button
        round
        color="linear-gradient(to right,rgba(255, 66, 0, 0.5),rgba(255, 66, 0, 1))"
        to="Home"
        class="mt"
      >快去预定</van-button>
    </div>
    <template v-else>
      <van-row
        class="border"
        v-for="(item,index) in orderList"
        :key="index"
        @click="getOrderById(item.id)"
      >
        <van-col span="12">
          <van-icon name="shop-collect" />&nbsp;乔府商城
        </van-col>
        <van-col
          span="12"
          align="right"
          class="text-color"
        >{{ item.orderStatus===0?'待支付':item.orderStatus===1?'支付成功':item.orderStatus===2?'取消中':item.orderStatus===3?'已取消':'' }}</van-col>
        <van-col span="24">
          <van-card
            v-for="(a,i) in item.orderProducts"
            :key="i"
            :centered="centered"
            :thumb="imgBaseUrl+a.product.img"
            :title="a.product.mark"
            :num="a.productNum"
            :tag="a.product.payResult"
            :price="a.product.price"
            :desc="a.product.description"
          ></van-card>
        </van-col>
        <van-col span="24" align="right">
          <span class="font-size-14">总金额:</span>
          <span>￥{{ item.totalAmount }}</span>
        </van-col>
      </van-row>
    </template>
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
import { Card, Icon, Button, Row, Col, Cell, CellGroup } from "vant";
import mixin from "@/utils/mixin.js";
export default {
  name: "OrderList",
  mixins: [mixin],
  data() {
    return {
      title: "预购订单",
      orderList: [],

      centered: true,
      tag: "",
      api: {
        getOrders: {
          url: "/orders",
          method: "get"
        }
      }
    };
  },
  methods: {
    getOrderById(id) {
      this.$router.push({ path: "/order-detail", query: { id: id } });
    },
    getOrders() {
      let cuserId = parseInt(localStorage.getItem("id"));
      let params = {
        customerId: cuserId
      };
      request({ ...this.api.getOrders, params }).then(res => {
        if (res.success) {
          this.orderList = res.data;
        }
      });
    }
  },
  mounted() {
    this.getOrders();
  },
  components: {
    NavBar,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style scoped>
.round {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  text-align: center;
  margin: 0 auto 20px;
}
.icon-cart {
  line-height: 70px;
}
.font-size-14 {
  font-size: 14px;
}
.mt {
  margin-top: 30px;
}
</style>
