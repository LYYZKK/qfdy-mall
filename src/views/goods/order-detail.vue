<template>
  <div class="mainContent">
    <NavBar :title="title" />
    <div>
      <van-row>
        <van-col span="24" v-for="(item,index) in order.orderProducts" :key="index">
          <van-card
            :centered="centered"
            :thumb="item.product.img"
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
        <van-cell title="付款时间" :value="order.payTime===''?order.payTime:'未付款，请立即付款'"></van-cell>
        <van-cell title="备注" :value="order.mark"></van-cell>
      </van-cell-group>
      <div class="mt" v-if="order.payStatus!==2">
        <van-button size="large" color="red" @click="show=true">立即付款</van-button>
      </div>
    </div>
    <van-dialog v-model="show" title="确认付款" show-cancel-button @confirm="submit" @cancel="cancel">
      <h1 class="text-center">￥{{ order.totalAmount }}</h1>
    </van-dialog>
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
export default {
  name: "ProductDetail",
  data() {
    return {
      show: false,
      centered: true,
      title: "订单详情",
      order: {},
      api: {
        getProductById: {
          url: "/orders/{id}",
          method: "get"
        }
      }
    };
  },
  props: {
    // productId: {
    //   type: Number,
    //   required: true
    // }
  },
  methods: {
    submit() {},
    cancel() {},
    onBuyClicked(value) {
      this.$router.push({
        name: "ProductSubmit",
        params: { sku: this.sku, order: value }
      });
    },
    getProductById() {
      if (this.$route.query.id) {
        request({
          ...this.api.getProductById,
          urlReplacements: [
            { substr: "{id}", replacement: this.$route.query.id }
          ]
        }).then(res => {
          this.order = res.data.data;
          console.log(res.data.data);
        });
      }
    }
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
</style>>

