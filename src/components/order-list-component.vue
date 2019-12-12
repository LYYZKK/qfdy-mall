<template>
  <div>
    <van-row class="border font-size-12" v-for="(item, index) in orderList" :key="index">
      <van-col span="24" align="right" class="text-color">
        {{
        item.orderStatus === 0 ? '待付款' : item.orderStatus === 2 ? '已付款':item.orderStatus === 3 ? '已取消' : ''
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
          item.orderStatus === 0 || item.orderStatus ===2
        "
      >
        <span
          class="border-box"
          v-if="item.orderStatus === 0 && (new Date().getTime() - (new Date(item.orderTime.replace(/\-/g, '/'))).getTime() < cancelTime)"
        >立即付款</span>
        <span
          v-if="item.orderStatus === 2 && (new Date().getTime() - (new Date(item.orderTime.replace(/\-/g, '/'))).getTime() < cancelTime)"
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
      totalAmount: '',
      refundAmount: '',
      cancelTime: 1000 * 7 * 24 * 60 * 60,
      goodId: '',
      api: {
        // 取消支付
        cancelOrder: {
          url: '/orders/{id}/cancel',
          method: 'patch'
        },
        // 支付圈存
        payOrder: {
          url: '/orders/{id}/pay',
          method: 'patch'
        },
        // 取消圈存(退款）
        refund: {
          url: '/orders/{id}/refund',
          method: 'get'
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
      this.refundAmount = val.refundAmount || ''
      console.log(val)
      if (val.orderStatus === 0) {
        this.dialogShow = true
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
          alert('即将调起圈存 info===', info)
          submitOrderForCashNew(info, 'wuchang')
        }

        // if (res.success) {
        //   Toast({
        //     message: '恭喜您预约成功',
        //     icon: 'like-o'
        //   })
        //   this.$router.go(0)
        // }
      })
    },
    // 解圈存
    refund(id) {
      request({ ...this.api.refund, urlReplacements: [{ substr: '{id}', replacement: id }] }).then(res => {
        if (res.success) {
          console.log('退款成功')
          this.$route.go(0)
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
          // this.$router.push({
          //   name: "OrderList",
          //   params: { customerId: this.customerId }
          // });
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
