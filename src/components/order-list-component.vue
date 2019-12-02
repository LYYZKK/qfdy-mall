<template>
  <div>
    <van-row
      class="border font-size-12"
      v-for="(item,index) in orderList"
      :key="index"
      @click="getOrderById(item.id)"
    >
      <van-col span="12" class="">
        <!-- <van-icon name="shop-collect" />&nbsp;乔府商城 -->
      </van-col>
      <van-col
        span="12"
        align="right"
        class="text-color"
      >{{ item.orderStatus===0?'待支付':item.orderStatus===1?'支付成功':item.orderStatus===3?'已取消':'' }}</van-col>
      <van-col span="24">
        <van-card
          v-for="(a,i) in item.orderProducts"
          :key="i"
          :centered="centered"
          :thumb="webBaseUrl+a.product.img"
          :title="a.product.mark"
          :num="a.productNum"
          :tag="a.product.payResult"
          :price="a.product.price"
        >
          <div slot="desc">{{ a.product.description }}</div>
        </van-card>
      </van-col>
      <van-col span="24" align="right" >
        <span class="font-size-14 ">总金额:</span>
        <span class="van-card__price">￥{{ item.totalAmount }}</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {
  Card,
  Icon,
  Button,
  Row,
  Col,
  Cell,
  CellGroup,
  loading,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs
} from "vant";
import mixin from "@/utils/mixin.js";
export default {
  name: "OrderListComponent",
  mixins: [mixin],
  props: {
    orderList: {
      type: Array,
      default() {
        return [];
      }
    },
    orderStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      centered: true
    };
  },
  methods: {
    getOrderById(id) {
      this.$router.push({ path: "/order-detail", query: { id: id } });
    }
  },
  components: {
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [loading.name]: loading,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style sloped>
.font-size-12{
  font-size:12px
}
</style>
