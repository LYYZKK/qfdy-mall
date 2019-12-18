<template>
  <div class="mainContent bg-color">
    <!-- <NavBar :title="title" /> -->
    <div class="banner">
      <div class="title1">五常大米40万亩核心产区其中20万亩为</div>
      <van-row type="flex" align="center" justify="center" class="mt">
        <van-col class="text-center">
          <img :src="left" alt width="50%" />
        </van-col>
        <van-col>
          <span class="title2">民生银行客户专属订制稻田</span>
        </van-col>
        <van-col class="text-center">
          <img :src="right" alt width="50%" />
        </van-col>
      </van-row>
      <img :src="banner" alt width="100%" />
    </div>
    <div class="goods">
      <div class="text-center title">2020年新米预订</div>
      <div class="line"></div>
      <van-row type="flex" align="center" justify="space-between" class="ad_tip">
        <van-col>
          <div class="tip">
            <van-icon name="friends-o" />
            <span style="margin-left:5px;">{{ peopleNum }}人{{ appointBuyText }}</span>
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
      </van-row>
      <van-row type="flex" align="center">
        <van-col span="4" class="leftText bg2 pd-10-0">套餐名称</van-col>
        <van-col
          span="5"
          class="topText pd-10-0"
          :class="index%2===0?'bg1':'bg2'"
          v-for="(item,index) in list.specifications"
          :key="index"
        >{{ item.name }}</van-col>
      </van-row>
      <van-row type="flex" align="center" class="mt-5">
        <van-col span="4" class="leftText bg2 pd-10-0">套餐规格</van-col>
        <van-col
          span="5"
          class="pd-10-0"
          :class="index%2===0?'bg1':'bg2'"
          v-for="(item,index) in list.specifications"
          :key="index"
        >{{ item.specification }}</van-col>
      </van-row>
      <van-row type="flex" align="center" class="mt-5">
        <van-col span="4" class="pd-10-0 leftText bg2">市场价格</van-col>
        <van-col
          span="5"
          class="pd-10-0 line-through"
          :class="index%2===0?'bg1':'bg2'"
          v-for="(item,index) in list.specifications"
          :key="index"
        >￥{{ item.originalPrice }}</van-col>
      </van-row>
      <van-row type="flex" align="center" class="mt-5">
        <van-col span="4" class="pd-10-0 leftText bg2">专属价格</van-col>
        <van-col
          span="5"
          class="pd-10-0 sp-text2"
          :class="index%2===0?'bg1':'bg2'"
          v-for="(item,index) in list.specifications"
          :key="index"
        >￥{{ item.price }}</van-col>
      </van-row>
      <van-row type="flex" align="center" class="mt-5">
        <van-col span="4" class="leftText bg2 pd-10-0 sp-text">立即购买</van-col>
        <van-col
          class="pd-10-0"
          :class="index%2===0?'bg1':'bg2'"
          span="5"
          v-for="(item,index) in list.specifications"
          :key="index"
          @click="buySubmit(item,index)"
        >
          <span class="buy-btn">立即抢订</span>
        </van-col>
      </van-row>
      <div class="text-center btn" @click="getProductById(1)">详情介绍 >></div>
    </div>
    <div class="mt">
      <img :src="bar" alt width="100%" />
    </div>
    <div class="mt">
      <img :src="bottom" alt width="100%" />
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
import bottom from '@/assets/images/home/4.png'
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
      this.linkAdd(3)
      this.getProducts()
      this.getOrderReport()
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
  background: #fdf8e8;
}

.banner {
  margin: 20px 0;
  .title1 {
    text-align: center;
    background: #943003;
    color: #fff;
    width: 80%;
    padding: 5px 10px;
    margin: 0 auto;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .title2 {
    color: #943003;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 3px;
    &::before {
      content: '';
    }
  }
}
.goods {
  font-size: 14px;
  text-align: center;
  border: 1px solid rgba(233, 174, 66, 0.658);
  padding: 10px;
  background: #fff;
  color: #482d00;
  .title {
    color: #943003;
    font-weight: 800;
  }
  .line {
    background: #cf8767;
    width: 80px;
    height: 3px;
    margin: 5px auto 10px;
  }
}
.leftText {
  color: #724c0c;
  font-size: 14px;
  font-weight: 800;
}
.topText {
  color: #452d00;
  font-weight: 800;
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
  padding: 3px 10px;
  border-radius: 10px;
  background: #b95325;
  width: 60%;
  margin: 10px auto;
  color: #fff;
  font-size: 13px;
}
.buy-btn {
  display: inline-block;
  color: #fff;
  background: url(../../assets/images/home/buy-btn.png) no-repeat;
  background-size: 100% 100%;
  padding: 2px 10px;
  font-size: 12px;
}
</style>
