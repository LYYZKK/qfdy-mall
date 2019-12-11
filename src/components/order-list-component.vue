<template>
  <div>
    <van-row class="border font-size-12" v-for="(item, index) in orderList" :key="index">
      <van-col span="24" align="right" class="text-color">
        {{
          item.orderStatus === 0 ? '预约成功' : item.orderStatus === 3 ? '已取消' : ''
        }}
      </van-col>
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
      <van-col
        span="24"
        align="right"
        @click="clickBtn(item)"
        v-if="
          item.orderStatus === 0 && (new Date().getTime() - (new Date(item.orderTime.replace(/\-/g, '/'))).getTime() < cancelTime)
        "
      >
        <span class="border-box">取消订单</span>
      </van-col>
    </van-row>
    <van-dialog
      v-model="dialogShow"
      title="确认付款"
      show-cancel-button
      @confirm="submit(goodId)"
      @cancel="cancel"
    >
      <h1 class="text-center">￥{{ totalAmount }}</h1>
    </van-dialog>
    <van-dialog
      v-model="dialogCancelShow"
      title="是否确认取消订单？"
      show-cancel-button
      @cancel="dialogCancelShow = false"
      @confirm="cancelOrder(goodId)"
    >
      <div class="text-center"></div>
    </van-dialog>
    <van-dialog v-model="dialogTipShow" title="温馨提示" @confirm="dialogTipShow = false">
      <div class="text-center">正在加速开发中</div>
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
      type: Number
    }
  },
  data() {
    return {
      dialogShow: false,
      dialogCancelShow: false,
      dialogTipShow: false,
      centered: true,
      totalAmount: '',
      cancelTime: 1000 * 7 * 24 * 60 * 60,
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
      this.goodId = val.id
      this.totalAmount = val.totalAmount
      this.dialogCancelShow = true
      // if (process.env.APPOINT_BUY) {
      //   if (val.orderStatus === 0) {
      //     this.dialogShow = true
      //   }
      // } else if (val.orderStatus === 1) {
      //   this.dialogCancelShow = true
      // } else {
      //   this.dialogTipShow = true
      // }
    },
    submit(id) {
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: '{id}', replacement: id }]
      }).then(res => {
        if (res.success) {
          Toast({
            message: '恭喜您预约成功',
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
          Toast({
            message: '取消成功，稍候将为您退款',
            icon: 'like-o'
          })
          this.$emit('changeSort')
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
