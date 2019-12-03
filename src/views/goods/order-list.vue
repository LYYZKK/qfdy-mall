<template>
  <div>
    <NavBar :title="title" />
    <div class="mainContent box-sort" >
      <van-loading type="spinner" v-show="show" color="#1989fa" class="loading" />
      <template v-if="orderList.length===0&&!show" class="text-center">
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
      </template>
      <template v-if="!show" class="box-sort-content">
        <van-row>
          <van-col span="24">
            <van-tabs v-model="active" title-active-color="#ee0a24" :border="false" :offset-top="70" sticky>
              <van-tab title="待支付">
                <order-list-component :orderList="orderList.wait" :orderStatus="0"></order-list-component>
              </van-tab>
              <van-tab title="已付款">
                <order-list-component :orderList="orderList.payed" :orderStatus="1"></order-list-component>
              </van-tab>
              <van-tab title="已取消">
                <order-list-component :orderList="orderList.cancel" :orderStatus="3"></order-list-component>
              </van-tab>
            </van-tabs>
          </van-col>
        </van-row>
      </template>
    </div>

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
      orderList: {
        wait: [],
        payed: [],
        cancel: []
      },
      show: false,
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
    getOrders() {
      let cuserId = localStorage.getItem("id");
      if (cuserId !== null) {
        let params = {
          customerId: cuserId
        };
        this.show = true;
        request({ ...this.api.getOrders, params }).then(res => {
          this.orderList = {
            wait: [],
            payed: [],
            cancel: []
          };
          if (res.success) {
            if (res.data.length === 0) {
              this.show = false;
            } else {
              this.show = false;
              console.log(res.data);
              res.data.forEach(element => {
                if (element.orderStatus === 0) {
                  this.orderList.wait.push(element);
                } else if (element.orderStatus === 1) {
                  this.orderList.payed.push(element);
                } else if (element.orderStatus === 3) {
                  this.orderList.cancel.push(element);
                }
              });
              console.log(this.orderList);
            }
          }
        });
      }
    }
  },
  beforeMount() {
    this.setTitleBarName();
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

<style scoped lang="less">
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
.box-sort{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left: 0;
  .box-sort-content{
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
