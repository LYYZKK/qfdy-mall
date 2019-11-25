<template>
  <div class>
    <NavBar :title="title" />
    <div class="mainContent text-center" v-if="orderList.length===0&&!show">
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
    <van-loading type="spinner" v-show="show" color="#1989fa" class="loading" />
    <template v-if="orderList.length>0">
      <van-row>
        <van-col span="24"></van-col>
        <van-col span="24">
          <!-- <van-tabbar v-model="active" :fixed="false" active-color="#ee0a24" :border="false">
            <van-tabbar-item info="3" icon="balance-list">待支付</van-tabbar-item>
            <van-tabbar-item icon="send-gift" >已付款</van-tabbar-item>
            <van-tabbar-item icon="setting-o">已取消</van-tabbar-item>
          </van-tabbar>-->
          <van-tabs v-model="active" title-active-color="#ee0a24" :border="false" :sticky="true">
            <van-tab title="待支付">
              <order-list-component :orderList="orderList" :orderStatus="0"></order-list-component>
            </van-tab>
            <van-tab title="已付款">
              <order-list-component :orderList="orderList" :orderStatus="1"></order-list-component>
            </van-tab>
            <van-tab title="已取消">
              <order-list-component :orderList="orderList" :orderStatus="3"></order-list-component>
            </van-tab>
          </van-tabs>
        </van-col>
      </van-row>
    </template>
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
import OrderListComponent from "@/components/order-list-component.vue";
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
  name: "OrderList",
  mixins: [mixin],
  data() {
    return {
      title: "预购订单",
      orderList: [],
      show: false,
      centered: true,
      tag: "",
      active: 0,
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
      let cuserId = localStorage.getItem("id");
      if (cuserId !== null) {
        let params = {
          customerId: cuserId
        };
        this.show = true;
        request({ ...this.api.getOrders, params }).then(res => {
          if (res.success) {
            if (res.data.length === 0) {
              this.show = false;
            } else {
              this.show = false;
              this.orderList = res.data;
            }
          }
        });
      }
    }
  },
  mounted() {
    this.getOrders();
  },
  components: {
    NavBar,
    OrderListComponent,
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
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
