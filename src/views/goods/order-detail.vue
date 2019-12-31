<template>
  <div class="mainContent">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="mainBox">
      <div
        class="text-center text-style"
      >{{ order.payStatus===0?'待付款':order.payStatus===1?'付款中':order.payStatus===2?'已付款':order.payStatus===3?'支付失败':order.payStatus===4?'取消支付中':order.payStatus===5?'取消支付成功':order.payStatus===6?'取消支付失败':order.payStatus===7?'退款中':order.payStatus===8?'已退款':order.payStatus===9?'退款失败':'' }}</div>
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
        <van-cell title="备注" :value="order.mark"></van-cell>
        <van-cell title="服务码" :value="order.serviceCode"></van-cell>
      </van-cell-group>
      <van-cell-group v-if="order.orderInvoice!==null">
        <van-cell title="发票抬头" :value="order.orderInvoice.type===1?'个人':'单位'"></van-cell>
        <van-cell
          title="单位名称"
          :value="order.orderInvoice.name===1"
          v-if="order.orderInvoice.type===2"
        ></van-cell>
        <van-cell
          title="纳税人识别号"
          :value="order.orderInvoice.taxId"
          v-if="order.orderInvoice.type===2"
        ></van-cell>
        <van-cell title="收票人手机号" :value="order.orderInvoice.phone"></van-cell>
        <van-cell title="收票人邮箱" :value="order.orderInvoice.email"></van-cell>
      </van-cell-group>
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
      isVip: parseInt(localStorage.getItem('isVip')),
      isLoading: false,
      show: false,
      centered: true,
      title: '订单详情',
      order: {},
      customerId: '',
      customerInfo: {},
      api: {
        getProductById: {
          url: '/orders/{id}',
          method: 'get'
        }
      }
    }
  },
  methods: {
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
          this.isLoading = false
          this.order = res.data
          let address = JSON.parse(res.data.orderAddressee.address)
          this.customerInfo.address = address.province + address.city + address.county + address.addressDetail
          this.customerInfo.name = res.data.orderAddressee.name
          this.customerInfo.phone = res.data.orderAddressee.phone
          this.customerId = parseInt(localStorage.getItem('id'))
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
</style>
