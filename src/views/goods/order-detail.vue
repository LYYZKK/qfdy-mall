<template>
  <div class="mainContent">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="mainBox">
      <div class="text-center text-style">
        {{ order.orderStatus===6?'交易超时已关闭':order.orderStatus===3?'交易已取消':order.payStatus===0?'请在':order.payStatus===1?'付款中':order.payStatus===2?'已付款':order.payStatus===3?'支付失败':order.payStatus===4?'取消支付中':order.payStatus===5?'取消支付成功':order.payStatus===6?'取消支付失败':order.payStatus===7?'退款中':order.payStatus===8?'已退款':order.payStatus===9?'退款失败':order.payStatus===10?'订单已完成':
        order.payStatus===11?'订单超时已关闭':'' }}
        <template
          v-if="order.orderStatus===0"
        >
          <span class="text-color-style" v-if="order.payStatus===0">{{ restTime }}</span>
          <span v-if="order.payStatus===0">&nbsp;内付款</span>
          <span class="btn-style" @click="dialogShow=true">立即付款</span>
        </template>
      </div>

      <div class="info">
        <van-row type="flex" justify="space-around" align="center">
          <van-col span="2">
            <div class="round bg-color">
              <van-icon name="location-o" color="#fff" />
            </div>
          </van-col>

          <!-- 默认用户信息 -->
          <van-col span="18">
            <div>
              <van-row>
                <van-col>
                  <span>{{ customerInfo.name }}</span>
                  <span class="text-color-999">{{ customerInfo.phone }}</span>
                </van-col>
              </van-row>
              <div class="text-color-999 font-size-10">
                <span>{{ customerInfo.address }}</span>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <van-row>
        <van-col span="24" v-for="(item, index) in order.orderProducts" :key="index">
          <van-card
            :centered="centered"
            :title="item.specification.name"
            :num="item.productNum"
            tag="预购"
            :price="item.specification.price"
          ></van-card>
        </van-col>
      </van-row>
      <van-cell-group>
        <van-cell title="订单金额" :value="'￥'+order.totalAmount"></van-cell>
        <van-cell title="退款金额" :value="'￥'+order.refundAmount" v-if="order.payStatus===8"></van-cell>
        <template v-if="order.simpleStatus===1">
          <van-cell title="尝鲜米（3kg）发货状态" :value="order.simpleStatus===1?'已发货':'未发货'"></van-cell>
          <van-cell title="物流公司" :value="order.orderLogistics[0].courierCompany"></van-cell>
          <van-cell title="快递单号" :value="order.orderLogistics[0].trackingNo"></van-cell>
          <van-cell title="发货时间" :value="order.orderLogistics[0].shippingTime"></van-cell>
        </template>
        <van-cell title="订单编号" :value="order.orderNo"></van-cell>
        <van-cell title="下单时间" :value="order.orderTime"></van-cell>
        <van-cell title="付款时间" :value="order.payTime" v-if="order.orderStatus===2"></van-cell>
        <van-cell title="取消时间" :value="order.orderCancelTime" v-if="order.orderStatus===3"></van-cell>
        <van-cell title="退款时间" :value="order.refundTime" v-if="order.payStatus===8"></van-cell>
        <van-cell title="备注" :value="order.mark"></van-cell>
        <van-cell title="服务码" :value="order.serviceCode"></van-cell>
      </van-cell-group>
      <template v-if="order.orderInvoice!==null">
        <van-cell-group>
          <van-cell title="发票抬头" :value="order.orderInvoice.type===1?'个人':'单位'"></van-cell>
          <van-cell
            v-if="order.orderInvoice.type===2"
            title="单位名称"
            :value="order.orderInvoice.businessName"
          ></van-cell>
          <van-cell
            v-if="order.orderInvoice.type===2"
            title="纳税人识别号"
            :value="order.orderInvoice.taxId"
          ></van-cell>
          <van-cell title="收票人手机号" :value="order.orderInvoice.phone"></van-cell>
          <van-cell title="收票人邮箱" :value="order.orderInvoice.email"></van-cell>
        </van-cell-group>
      </template>
      <van-row class="showCard" v-if="order.orderStatus===2">
        <van-col span="12">
          <div class="line">专属订制稻田证书</div>
          <div class="text-center">
            <img :src="book" alt width="90%" />
          </div>
        </van-col>
        <van-col span="12">
          <div class="line">全程溯源</div>
          <div style="color:rgba(0,0,0,.6)">敬请期待...</div>
        </van-col>
      </van-row>
    </van-pull-refresh>
    <van-row class="fixedBottom">
      <van-col :span="isVip===1?12:24" @click="goBook">
        <van-button size="large" color="rgba(255, 66, 0, 1)">再来一单</van-button>
      </van-col>
      <van-col span="12" @click="spotBuy" v-if="isVip===1">
        <van-button size="large" color="rgba(255, 66, 0, 1)">鲜米现货购买</van-button>
      </van-col>
    </van-row>
    <!-- 确认付款 -->
    <van-dialog
      v-model="dialogShow"
      title="确认付款"
      show-cancel-button
      @confirm="submit"
      @cancel="dialogShow = false"
    >
      <h1 class="text-center">￥{{ totalAmount }}</h1>
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
  Dialog,
  Icon,
  Tabbar,
  TabbarItem,
  PullRefresh
} from 'vant'
import NavBar from '@/components/nav-bar.vue'
import request from '@/utils/request.js'
import mixin from '@/utils/mixin.js'
import book from '@/assets/images/book.png'
export default {
  name: 'ProductDetail',
  mixins: [mixin],
  data() {
    return {
      book,
      dialogShow: false,
      totalAmount: '',
      isVip: parseInt(localStorage.getItem('isVip')),
      isLoading: false,
      show: false,
      centered: true,
      restTime: '', // 剩余付款时间
      title: '订单详情',
      order: {
        orderInvoice: {
          type: '',
          businessName: '',
          phone: '',
          taxId: '',
          email: ''
        }
      },
      customerId: '',
      customerInfo: {},
      api: {
        getProductById: {
          url: '/orders/{id}',
          method: 'get'
        },
        // 支付圈存
        payOrder: {
          url: '/orders/{id}/pay',
          method: 'post'
        },
        // 订单关闭
        closeOrder: {
          url: '/orders/{id}/close',
          method: 'post'
        }
      }
    }
  },
  methods: {
    // 支付即调起圈存
    submit() {
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: '{id}', replacement: this.$route.query.id }]
      }).then(res => {
        if (res.success) {
          if (res.data !== '') {
            let info = res.data
            submitOrderForCashNew(info, 'wuchang')
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 关闭订单
    closeOrder() {
      request({
        ...this.api.closeOrder,
        urlReplacements: [{ substr: '{id}', replacement: this.$route.query.id }]
      }).then(res => {
        if (res.success) {
          this.initPage()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 倒计时
    countDown(val) {
      let currentTime = new Date().getTime()
      let endTime = new Date(val.orderTime.replace(/-/g, '/')).getTime() + 30 * 60 * 1000
      const timerDown = setInterval(() => {
        currentTime = new Date().getTime()
        let timeDiff = (endTime - currentTime) / 1000
        let min = parseInt(((timeDiff % 86400) % 3600) / 60)
        let sec = parseInt(((timeDiff % 86400) % 3600) % 60)
        this.restTime = min + ':' + sec
        if (currentTime === endTime) {
          this.closeOrder()
          clearInterval(timerDown)
        }
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timerDown)
      })
    },

    gotoList() {
      this.$router.push({ name: 'OrderList' })
    },
    onRefresh() {
      this.isLoading = true
      console.log('触发刷新')
      this.getProductById()
      this.searchIsVip()
    },
    goBook() {
      this.$router.push({ name: 'Index' })
    },
    getProductById() {
      if (this.$route.query.id) {
        request({
          ...this.api.getProductById,
          urlReplacements: [{ substr: '{id}', replacement: this.$route.query.id }]
        }).then(res => {
          if (res.success) {
            this.totalAmount = res.data.totalAmount
            this.isLoading = false
            this.order = res.data
            let address = JSON.parse(res.data.orderAddressee.address)
            this.customerInfo.address = address.province + address.city + address.county + address.addressDetail
            this.customerInfo.name = res.data.orderAddressee.name
            this.customerInfo.phone = res.data.orderAddressee.phone
            this.customerId = parseInt(localStorage.getItem('id'))
            // 订单待支付状态
            if (res.data.orderStatus === 0) {
              this.countDown(res.data)
              // 圈存中状态
              const paying = setInterval(() => {
                this.initPage()
              }, 60000)
              this.$once('hook:beforeDestroy', () => {
                clearInterval(paying)
              })
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    // 查询客户是否是vip
    searchIsVip() {
      this.checkCustomer().then(res => {
        console.log(res)
        this.isVip = res.isVip
        localStorage.removeItem('isVip')
        localStorage.setItem('isVip', res.isVip)
      })
    },
    initPage() {
      this.getProductById()
      this.searchIsVip()
    }
  },
  beforeMount() {
    this.setTitleBar('订单详情')
  },

  mounted() {
    this.initPage()
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
    [Icon.name]: Icon,
    [TabbarItem.name]: TabbarItem,
    [Tabbar.name]: Tabbar,
    [PullRefresh.name]: PullRefresh,
    [Dialog.Component.name]: Dialog.Component,
    NavBar
  }
}
</script>

<style scoped>
.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
}
.fixedBottom {
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
}
.mt {
  margin-top: 30px;
}
.info {
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
}
.showCard {
  margin-top: 10px;
  padding: 10px 0;
  background: #fff;
  text-align: center;
}
.text-style {
  background: #fff;
  padding: 10px 0;
  margin-bottom: 10px;
  font-size: 13px;
}
.line {
  font-size: 14px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.mainBox {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.btn-style {
  background: rgb(255, 66, 0);
  border: 1px solid rgb(255, 66, 0);
  border-radius: 7px;
  padding: 2px 10px;
  margin-left: 10px;
  color: #fff;
}
.text-color-style {
  color: #2d8cf8;
  font-size: 16px;
  font-weight: 800;
}
</style>
