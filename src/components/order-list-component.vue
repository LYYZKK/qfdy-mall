<template>
  <div>
    <van-row class="border font-size-12" v-for="(item, index) in orderList" :key="index">
      <van-col span="24" align="right" class="text-color">{{
        item.orderStatus === 0 ? '待支付' : item.orderStatus === 1 ? '支付成功' : item.orderStatus === 3 ? '已取消' : ''
      }}</van-col>
      <van-col span="24">
        <van-card
          v-for="(a, i) in item.orderProducts"
          :key="i"
          :centered="centered"
          :thumb="webBaseUrl + a.product.img"
          :title="a.product.mark"
          :num="a.productNum"
          :tag="a.product.payResult"
          :price="a.product.price"
          @click="getOrderById(item.id)"
        >
          <div slot="desc">{{ a.product.description }}</div>
        </van-card>
      </van-col>

      <van-col span="24" align="right">
        <span class="font-size-14">总金额:</span>
        <span class="van-card__price">￥{{ item.totalAmount }}</span>
      </van-col>
      <van-col span="24" align="right" @click="clickBtn(item)" v-if="item.orderStatus === 0">
        <span class="border-box">{{
          item.orderStatus === 0
            ? '立即付款'
            : item.orderStatus === 1
              ? '取消订单'
              : item.orderStatus === 3
                ? '重新下单'
                : ''
        }}</span>
      </van-col>
    </van-row>
    <van-dialog
      v-model="dialogShow"
      title="确认付款"
      show-cancel-button
      @confirm="submit(goodId)"
      @cancel="cancel(goodId)"
    >
      <h1 class="text-center">￥{{ totalAmount }}</h1>
    </van-dialog>
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
  Tabs,
  Dialog,
  Toast
} from 'vant'
import mixin from '@/utils/mixin.js'
import request from '@/utils/request.js'
export default {
  name: 'OrderListComponent',
  mixins: [mixin],
  props: {
    orderList: {
      type: Array,
      default() {
        return []
      }
    },
    orderStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogShow: false,
      centered: true,
      totalAmount: '',
      goodId: '',
      api: {
        cancelOrder: {
          url: '/orders/{id}/cancel',
          method: 'patch'
        },
        payOrder: {
          url: '/orders/{id}/pay',
          method: 'patch'
        }
      }
    }
  },
  methods: {
    getOrderById(id) {
      this.$router.push({ path: '/order-detail', query: { id: id } })
    },
    clickBtn(val) {
      console.log(val)
      this.dialogShow = true
      this.goodId = val.id
      this.totalAmount = val.totalAmount
    },
    submit(id) {
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: '{id}', replacement: id }]
      }).then(res => {
        if (res.success) {
          Toast({
            message: '恭喜您支付成功',
            icon: 'like-o'
          })
          this.$router.go(0)
        }
      })
    },
    cancel() {
      this.dialogShow = false
    },
    cancelOrder(id) {
      request({
        ...this.api.cancelOrder,
        urlReplacements: [{ substr: '{id}', replacement: id }]
      }).then(res => {
        if (res.success) {
          // this.$router.push({
          //   name: "OrderList",
          //   params: { customerId: this.customerId }
          // });

          console.log('订单取消成功')
        }
      })
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
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component,
    [CellGroup.name]: CellGroup
  }
}
</script>

<style sloped>
.font-size-12 {
  font-size: 12px;
}
.font-weight {
  font-size: 14px;
  font-weight: 800;
}
.border-box {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ee0a24;
  border-radius: 10px;
  margin-top: 10px;
  color: #ee0a24;
}
</style>
