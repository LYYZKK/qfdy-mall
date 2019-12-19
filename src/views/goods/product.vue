<template>
  <div class="mainContent bg-color">
    <!-- <NavBar :title="title" /> -->
    <div class="banner mt-40">
      <!-- <div class="title1">五常大米40万亩核心产区其中20万亩为</div> -->
      <van-row type="flex" align="center" justify="center" class="mt">
        <van-col>
          <div class="text-center title">民生银行客户&nbsp;·&nbsp;专属订制稻田</div>
          <div class="line"></div>
          <span class="text-center title2">五常大米40万核心产区中20万亩为民生银行专属订制</span>
        </van-col>
      </van-row>
      <img :src="banner" alt width="100%" class="mt-40" />
    </div>
    <div align="right">
      <div class="text-center btn" @click="getProductById(1)">详情介绍 >></div>
      <div class="text-center btn" @click="spotBuy" v-if="isVip===1">现货尝鲜 >>{{ isVip }}</div>
    </div>
    <div class="goods">
      <div class="text-center title">2020年&nbsp;·&nbsp;新米预订</div>
      <div class="line"></div>
      <div class="goodCards mt-40">
        <div
          v-for="(item,index) in list.specifications"
          :key="index"
          class="singleGood"
          @click="buySubmit(item,index)"
        >
          <div class="topText">{{ item.specification }}</div>
          <div class="bottomText sx1">
            <div class="color1 text1">订制价</div>
            <div class="color1">
              <span>￥</span>
              <span class="text2">{{ item.price }}</span>
            </div>
            <div class="buy-btn">立即抢订</div>
          </div>
          <img :src="goodRice[index]" alt width="100%" />
          <div class="goodText">
            <div class="text-color">{{ item.name }}</div>
            <div class="text-color2">市场价格:￥{{ item.originalPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-row>
        <van-col span="24">
          <div class="text-center title">中国民生银行&nbsp;·&nbsp;五常市政府&nbsp;·&nbsp;阿里云联合打造</div>
          <div class="line"></div>
          <div class="text-center">
            <span class="title2">留胚工艺&nbsp;|&nbsp;</span>
            <span class="title2">全程溯源&nbsp;|&nbsp;</span>
            <span class="title2">恒温仓储&nbsp;|&nbsp;</span>
            <span class="title2">按月配送</span>
          </div>
          <div class="mt-40">
            <img :src="bottom" alt width="100%" />
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin.js'
import { Image, Row, Col, Card, Tag, Button, List, Swipe, SwipeItem, Loading, Toast, Icon, NoticeBar } from 'vant'
import NavBar from '@/components/nav-bar.vue'
import request from '@/utils/request.js'
import banner from '@/assets/images/home/banner.png'
import left from '@/assets/images/home/left.png'
import right from '@/assets/images/home/right.png'
import bar from '@/assets/images/home/bar.png'
import rice1 from '@/assets/images/home/rice1.png'
import rice2 from '@/assets/images/home/rice2.png'
import rice3 from '@/assets/images/home/rice3.png'
import rice4 from '@/assets/images/home/rice4.png'
import bottom from '@/assets/images/home/bottom.png'
export default {
  name: 'Product',
  mixins: [mixin],
  data() {
    return {
      banner,
      left,
      right,
      bar,
      bottom,
      loadingShow: true,
      copyText: '今天天气真好呀!',
      list: [],
      title: '预购商品',
      centered: true,
      peopleNum: 0,
      goodRice: [rice1, rice2, rice3, rice4],
      api: {
        getProducts: {
          url: '/products',
          method: 'get'
        },
        getOrderReport: {
          url: 'product/order/reports',
          method: 'get'
        }
      }
    }
  },
  //
  methods: {
    // 点击商品查看详情
    getProductById(id) {
      localStorage.setItem('productId', id)
      this.$router.push({ name: 'ProductDetail', params: { id } })
    },
    buySubmit(val, i) {
      console.log(val)
      let isLogin = localStorage.getItem('isLogin')
      if (isLogin === '1') {
        console.log(val, i)
        this.$router.push({
          name: 'ProductSubmit',
          params: {
            good: {
              name: val.name,
              selectedNum: 1,
              price: val.price * 100,
              id: val.id,
              productId: val.productId,
              specification: val.specification
            }
          }
        })
      } else {
        // eslint-disable-next-line no-undef
        loginForComm(
          window.location.protocol + '//' + window.location.host + this.$route.fullPath,
          window.location.protocol + '//' + window.location.host + this.$route.fullPath
        )
      }
    },
    // 获取订单所有商品
    getProducts() {
      request({ ...this.api.getProducts }).then(res => {
        if (res.success) {
          this.list = res.data[0]
          this.loadingShow = false
        } else {
          Toast('即将上架，敬请期待！')
        }
      })
    },
    // 获取预约人数
    getOrderReport() {
      let params = {
        productId: 1,
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
    initPage() {
      this.cmbcDescrypt()
      this.getProducts()
      // this.getOrderReport()
    },
    setIndexTitleBar() {
      const jsonParam = {
        title: '商品列表',
        leftButton: {
          // 左按钮
          exist: 'true', // true:显示左按钮,false:也显示左按钮,客户端不调用左按钮的返回事件
          name: '返回', //  按钮的说明
          func: 'goBack()' // 点击左按钮时,客户端回调服务器的方法
        },
        rightButton: {
          exist: 'false' // 不显示右按钮
        }
      }
      let timer = setInterval(() => {
        try {
          console.log('into try')
          setTitleBar(jsonParam)
          clearInterval(timer)
        } catch (error) {
          console.log('set title bar failed.')
        }
      }, 300)
    }
  },
  beforeMount() {
    this.setIndexTitleBar()
  },
  mounted() {
    this.initPage()
  },
  components: {
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Loading.name]: Loading,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    NavBar
  }
}
</script>

<style scoped lang="less">
.ad_tip {
  background: #b95325;
  height: 30px;
  width: 100%;
  color: #fff;
  font-size: 12px;
  padding: 0 10px;
}
.bg-color {
  background: url(../../assets/images/home/mainBg.png) no-repeat;
  background-size: cover;
}

.banner {
  margin: 20px 0;
}
.title {
  color: #413f40;
  font-size: 18px;
  font-weight: 800;
}
.title2 {
  color: #76736e;
  font-size: 14px;
}
.line {
  background: #000;
  width: 20px;
  height: 1px;
  margin: 5px auto 10px;
}
.mt-40 {
  margin-top: 40px;
}
.goods {
  font-size: 14px;
  text-align: center;
  margin: 20px 10px 40px 10px;
  .goodCards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .singleGood {
      box-sizing: border-box;
      position: relative;
      margin-bottom: 10px;
      width: 49%;
      overflow: hidden;
      border: 5px solid transparent;
      border-image: linear-gradient(to right bottom, #fec27a, #fdf3e4, #fec27a) 5 5;
      .topText {
        width: 80%;
        padding: 5px 0 5px 0;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        background: url(../../assets/images/home/topText.png) no-repeat;
        background-size: cover;
        color: #fdc179;
        font-weight: 800;
        z-index: 9;
      }
      .goodText {
        padding: 5px 2px;
        background: linear-gradient(to right, #feba6f 20%, #fcefdc 100%);
        .text-color {
          color: #a62218;
          text-align: left;
          font-weight: 800;
          font-size: 12px;
        }
        .text-color2 {
          color: #b44033;
          text-align: left;
          font-size: 10px;
        }
      }

      .bottomText {
        width: 100px;
        height: 100px;
        font-size: 12px;
        position: absolute;
        right: -12%;
        bottom: -12%;
        padding: 10px 10px 0px 5px;
        border-radius: 50px;
        border: 3px solid transparent;
        // border-radius: 16px;
        // border: 5px solid transparent;
        // border-image: linear-gradient(to right bottom, #fec27a, #fdf3e4, #fec27a) 5 5;
        border: 3px solid #f7cc97;
        background: #ce2c1e;
        display: flex;
        flex-direction: column;
        .text1 {
          font-size: 10px;
          color: #f8ca94;
        }
        .text2 {
          font-size: 18px;
          color: #f1dfc6;
        }
        .buy-btn {
          width: 80%;
          margin: 0 auto;
          display: inline-block;
          color: #e93f36;
          background-color: #f7cc97;
          font-size: 10px;
          border-radius: 10px;
          padding: 3px;
        }
        .color1 {
          color: #f1ddc4;
        }
      }
    }
  }
}

.sp-text {
  color: #fff9cc;
  font-weight: 800;
}
.sp-text2 {
  color: #913202;
  font-weight: 800;
}
.bg1 {
  background: #fbf8dd;
}
.bg2 {
  background: #fff9cc;
}
.line-through {
  text-decoration: line-through;
}
.btn {
  padding: 5px 10px;
  border-radius: 15px 0 0 15px;
  background: linear-gradient(to right, #a27142, #fed3a0);
  width: 100px;
  color: #fff;
  font-size: 13px;
}
</style>
