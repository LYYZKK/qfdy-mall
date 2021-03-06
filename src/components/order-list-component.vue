<template>
  <div>
    <van-row class="border font-size-12" v-for="(item, index) in orderList" :key="index">
      <van-col span="24" align="right" class="text-color">
        {{
        item.orderStatus === 0 ? '待付款' : item.orderStatus === 2 ? '已付款':item.orderStatus === 3 ? '已取消' : item.orderStatus===5?'已退款':item.orderStatus===6?'已关闭':''
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
        v-if="
          (item.orderStatus === 0 || item.orderStatus ===2)&&item.orderStatus!==6
        "
      >
        <span class="border-box" v-if="item.orderStatus === 0" @click="clickBtn(item,0)">取消订单</span>
        <span class="border-box" v-if="item.orderStatus === 0" @click="clickBtn(item,2)">立即付款</span>
        <span
          class="border-box"
          @click="clickBtn(item,3)"
          v-if="item.orderStatus === 2 && (new Date().getTime() - (item.payTime===null?new Date():new Date(item.payTime.replace(/-/g, '/'))).getTime() < cancelTime)"
        >退款</span>
      </van-col>
    </van-row>
    <!-- 确认付款 -->
    <van-dialog
      v-model="dialogShow"
      title="确认付款"
      show-cancel-button
      @confirm="submit(goodId)"
      @cancel="dialogShow = false"
    >
      <h1 class="text-center">￥{{ totalAmount }}</h1>
    </van-dialog>
    <!-- 退款 -->
    <van-dialog
      v-model="dialogCancelShow"
      title="是否确认退款？"
      show-cancel-button
      @cancel="dialogCancelShow = false"
      @confirm="refund(goodId)"
    >
      <div class="text-center">可退款金额￥{{ refundAmount }}</div>
    </van-dialog>
    <!-- 未支付状态下取消订单 -->
    <van-dialog
      v-model="cancelOrderShow"
      title="再次确认"
      show-cancel-button
      @cancel="cancelOrderShow = false"
      @confirm="cancelOrder(goodId)"
    >
      <div class="text-center">您将取消订单？</div>
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
    }
  },
  data() {
    return {
      dialogShow: false,
      dialogCancelShow: false,
      dialogTipShow: false,
      centered: true,
      cancelOrderShow: false,
      totalAmount: '',
      refundAmount: '',
      cancelTime: 1000 * 7 * 24 * 60 * 60,
      goodId: '',
      api: {
        // 取消支付
        cancelOrder: {
          url: '/orders/{id}/cancel',
          method: 'post'
        },
        // 支付圈存
        payOrder: {
          url: '/orders/{id}/pay',
          method: 'post'
        },
        // 取消圈存(退款）
        refund: {
          url: '/orders/{id}/refund',
          method: 'post'
        }
      }
    }
  },
  methods: {
    getOrderById(id) {
      this.$router.push({ path: '/order-detail', query: { id: id } })
    },
    clickBtn(val, index) {
      console.log(val, index)
      this.goodId = val.id
      this.totalAmount = val.totalAmount
      this.refundAmount = val.refundAmount || ''
      console.log(val)
      if (val.orderStatus === 0) {
        if (index === 0) {
          // 未支付取消订单
          this.cancelOrderShow = true
        } else {
          this.dialogShow = true
        }
      } else if (val.orderStatus === 2) {
        this.dialogCancelShow = true
      }
    },
    // 支付即调起圈存
    submit(id) {
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: '{id}', replacement: id }]
      }).then(res => {
        console.log(res)
        if (res.data !== '') {
          let info = res.data
          submitOrderForCashNew(info, 'wuchang')
        }
      })
    },
    // 解圈存
    refund(id) {
      request({ ...this.api.refund, urlReplacements: [{ substr: '{id}', replacement: id }] }).then(res => {
        if (res.success) {
          console.log('退款成功')
          this.$router.push({
            name: 'OrderDetail',
            query: {
              id
            }
          })
        } else {
          console.log(res.message)
        }
      })
    },
    // 取消支付
    cancelOrder(id) {
      request({
        ...this.api.cancelOrder,
        urlReplacements: [{ substr: '{id}', replacement: id }]
      }).then(res => {
        if (res.success) {
          this.$router.push({
            name: 'OrderDetail',
            query: {
              id
            }
          })
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
  margin-left: 10px;
}
</style>
