<template>
  <div class="mainContent">
    <!-- <NavBar :title="title" /> -->
    <div class="bigContent" ref="bigContent">
      <div ref="scrollBox">
        <!-- <div class="img-text min-height">
          <van-image :src="goods.picture" width="100%" height="auto">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>-->
        <!-- <van-row class="pd-left-right">
          <van-col span="24">{{ goods.description }}</van-col>
        </van-row>-->
        <!-- <van-row type="flex" align="center" justify="space-between" class="ad_tip">
          <van-col>
            <div class="tip">
              <van-icon name="friends-o" />
              <span style="margin-left:5px;">{{ peopleNum||0 }}人{{ appointBuyText }}</span>
            </div>
          </van-col>
          <van-col>
            <van-notice-bar
              color="#Fff"
              background="transparent"
              :wrapable="true"
              :scrollable="true"
              left-icon="volume-o"
            >首期{{ appointBuyText }}1000份，先约先得</van-notice-bar>
          </van-col>
        </van-row>-->
        <van-divider :style="{ color: 'rgba(0,0,0,1)', padding: '0px 20px', margin: '5px 0' }">产品详情</van-divider>
        <div v-for="(item, index) in productImages" :key="index" class="img-text">
          <van-image :src="item">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </div>
      <img :src="icon" alt width="40px" class="icon_top" v-if="iconShow" />
    </div>
    <van-sku
      :close-on-click-overlay="true"
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :show-add-cart-btn="false"
      :buy-text="'立即' + appointBuyText"
      :stepper-title="appointBuyText + '数量'"
      :initial-sku="initialSku"
      @buy-clicked="onBuyClicked"
      @stepper-change="totalNumber"
      :safe-area-inset-bottom="true"
    >
      <div slot="sku-header-origin-price">{{ goods.title }}</div>
      <!-- <div slot="sku-messages">
        <van-row
          type="flex"
          justify="space-between"
          align="center"
          style="width:100%;padding:0 12px;"
        >
          <van-col>总价</van-col>
          <van-col class="van-sku__goods-price van-sku__price-num">￥{{ sku.price * PayNumber }}</van-col>
        </van-row>
      </div>-->
    </van-sku>
    <van-dialog
      v-model="dialogShow"
      title="温馨提示"
      :message="message"
      confirmButtonText="知道了"
      @confirm="dialogClose"
    ></van-dialog>
    <van-row class="fixed">
      <van-col span="24">
        <van-button
          size="large"
          @click="purchase"
          color="rgba(255, 66, 0, 1)"
          :disabled="sku.stock_num === 0"
        >
          {{
          sku.stock_num === 0 ? '已售罄' : '立即' + appointBuyText
          }}
        </van-button>
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
  Row,
  Col,
  Divider,
  Tabbar,
  TabbarItem,
  Loading,
  Toast,
  NoticeBar,
  Dialog,
  Icon
} from 'vant'
import NavBar from '@/components/nav-bar.vue'
import request from '@/utils/request.js'
import mixin from '@/utils/mixin.js'
import ProductDetailConfig from '@/config/product-detail.config'
import icon from '@/assets/images/new/bot-icon.png'
export default {
  name: 'ProductDetail',
  mixins: [mixin],
  data() {
    return {
      icon,
      iconShow: false,
      downTime: '',
      people: '',
      goodsId: '',
      // 点击提交按钮时候自动获取的参数
      getValue: {},
      show: false,
      dialogShow: false,
      PayNumber: 1,
      title: '商品详情',
      productId: '',
      productImages: [],
      peopleNum: '',
      time: {
        day: '',
        hour: '',
        min: '',
        sec: ''
      },
      initialSku: {
        s1: '1',
        selectedNum: 1
      },
      sku: {
        tree: [],
        list: [],
        price: '', // 默认价格（单位元）
        stock_num: '', // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: true, // 是否隐藏剩余库存
        collection_id: 1
      },
      goods: {
        description: '',
        // 商品标题
        title: '',
        // 默认商品 sku 缩略图
        picture: '',
        id: ''
      },
      api: {
        getProductById: {
          url: '/products/{id}',
          method: 'get'
        },
        // 根据产品Id获取销售情况
        getOrderReport: {
          url: 'product/order/reports',
          method: 'get'
        },
        getProducts: {
          url: '/products',
          method: 'get'
        }
      }
    }
  },
  methods: {
    // 倒计时
    countDown() {
      let currentTime = new Date().getTime()
      const timerDown = setInterval(() => {
        currentTime = new Date().getTime()
        let endTime = new Date('2020/1/9 00:00:00').getTime()
        let timeDiff = (endTime - currentTime) / 1000
        let day = parseInt(timeDiff / 86400)
        let hour = parseInt((timeDiff % 86400) / 3600)
        let min = parseInt(((timeDiff % 86400) % 3600) / 60)
        let sec = parseInt(((timeDiff % 86400) % 3600) % 60)
        this.downTime =
          (day < 10 ? '0' + day : day) +
          '天' +
          (hour < 10 ? '0' + hour : hour) +
          '小时' +
          (min < 10 ? '0' + min : min) +
          '分' +
          (sec < 10 ? '0' + sec : sec) +
          '秒'
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timerDown)
      })
    },
    // 点击购买判断用户是否登录
    purchase() {
      let isLogin = parseInt(localStorage.getItem('isLogin'))
      if (isLogin === 1) {
        this.show = true
      } else {
        // eslint-disable-next-line no-undef
        loginForComm(
          window.location.protocol + '//' + window.location.host + this.$route.fullPath,
          window.location.protocol + '//' + window.location.host + this.$route.fullPath
        )
      }
    },
    totalNumber(val) {
      if (val > this.sku.stock_num) {
        Toast.fail('数量超出库存')
      }
      this.PayNumber = val
    },
    onBuyClicked(value) {
      console.log(value)
      localStorage.setItem('buyStatus', 2)
      let param = {
        name: value.selectedSkuComb.name,
        selectedNum: value.selectedNum,
        price: value.selectedSkuComb.price,
        id: value.selectedSkuComb.id,
        productId: value.selectedSkuComb.productId,
        specification: value.selectedSkuComb.specification
      }
      this.$router.push({
        name: 'ProductSubmit',
        params: { sku: this.sku, good: param }
      })
      // this.dialogShow = true
    },
    dialogClose() {
      this.$router.push({
        name: 'ProductSubmit',
        params: { sku: this.sku, goods: this.getValue }
      })
    },
    fun() {
      request({
        ...this.api.getProducts
      }).then(res => {
        this.goods.picture = this.webBaseUrl + res.data[0].img
        this.goods.description = res.data[0].description
        this.goods.id = res.data[0].id
        this.goods.title = res.data[0].name
        this.sku.stock_num = res.data[0].totalCount
        // this.goodsId = 2259
        let tree = res.data[0].specifications
        tree.forEach(item => {
          item.name = item.name + '(' + item.specification + ')'
        })
        let list = res.data[0].specifications
        list.forEach(item => {
          item.stock_num = res.data[0].totalCount
          item.price = item.price * 100
          item.s1 = String(item.id)
        })
        this.sku.list = list

        this.sku.tree = [
          {
            k: '规格', // skuKeyName：规格类目名称
            v: tree,
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ]
        this.productImages = ProductDetailConfig[1].images
      })
    },
    // 获取{{appointBuyText}}人数
    getOrderReport() {
      let params = {
        productId: this.$route.params.id,
        orderStatus: 0
      }
      request({ ...this.api.getOrderReport, params }).then(res => {
        this.peopleNum = res.data[0].orderNum
      })
      const timerPeople = setInterval(() => {
        request({ ...this.api.getOrderReport, params }).then(res => {
          this.peopleNum = res.data[0].orderNum
        })
      }, 3000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timerPeople)
      })
    },
    getProductById() {
      this.fun()
    },
    initPage() {
      let cmbcParam = this.$route.query.param
      if (cmbcParam !== undefined) {
        this.cmbcDescrypt()
        this.getProductById()
        // this.getOrderReport()
        this.countDown()
      } else {
        this.getProductById()
        // this.getOrderReport()
        this.countDown()
      }
    }
  },
  beforeMount() {
    this.setTitleBar('商品详情')
  },
  computed: {
    message() {
      let msg = '七天无理由退订，客户已收现货需在认购金额中扣除'
      return this.goods.id === 1 ? msg + '（2kg/199）费用' : this.goods.id === 2 ? msg + '（3kg/299）费用' : ''
    }
  },

  mounted() {
    this.initPage()
  },

  components: {
    [Sku.name]: Sku,
    [Image.name]: Image,
    [Button.name]: Button,
    [Lazyload.name]: Lazyload,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    [Divider.name]: Divider,
    [Tabbar.name]: Tabbar,
    [Loading.name]: Loading,
    [TabbarItem.name]: TabbarItem,
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
    NavBar
  }
}
</script>

<style scoped lang="less">
.fixed {
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
}
.bigContent {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.pd-left-right {
  background-color: #fff;
  padding: 10px 10px 0 10px;
}
.font-style {
  font-size: 18px;
  color: rgb(255, 66, 0);
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.bg-block {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
}
.text-align-center {
  text-align: center;
}
.van-divider {
  &::before {
    border: 1px dashed rgb(207, 204, 204);
  }
  &::after {
    border: 1px dashed rgb(207, 204, 204);
  }
}
.text-color-ccc {
  color: #ccc;
  font-size: 11px;
}
.text-color-eee {
  margin-left: 20px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
}
.line-through {
  text-decoration: line-through;
}
.min-height {
  min-height: 100px;
  position: relative;
}
.ad_tip {
  background: linear-gradient(to bottom, rgba(255, 44, 11, 0.5), rgba(256, 44, 11, 1));
  height: 30px;
  width: 100%;
  color: #fff;
  font-size: 12px;
  padding: 0 10px;
}
.tip {
  display: flex;
  align-items: center;
}
.icon_top {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(-50%, -50%);
}
.van-notice-bar--wrapable {
  padding: 8px 10px !important;
}
</style>
