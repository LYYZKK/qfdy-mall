<template>
  <div class="mainContent">
    <!-- <NavBar :title="title" /> -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item style="min-height: 100px">
        <van-image :src="webBaseUrl + '/common/img/c_01.jpg'">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
      <van-swipe-item style="min-height: 100px">
        <van-image :src="webBaseUrl + '/common/img/p_1.jpg'">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
      <van-swipe-item style="min-height: 100px">
        <van-image :src="webBaseUrl + '/common/img/p_2.jpg'">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <div style="text-align:center">
      <van-loading type="spinner" color="#ee0a24" v-if="loadingShow" />
    </div>
    <template v-if="!loadingShow">
      <van-row
        class="productCard"
        v-for="(item, index) in list"
        :key="index"
        @click="getProductById(item.id)"
      >
        <van-col span="12" style="font-size:0;">
          <van-image :src="webBaseUrl+item.img" width="100%"></van-image>
        </van-col>
        <van-col span="12" class="right">
          <div class="title">{{ item.name }}</div>
          <div class="description">{{ item.description }}</div>
          <div>
            <span class="van-card__price">￥{{ item.price }}</span>
            <span class="orgin-price">￥{{ item.id === 2 ? 8999 : 5999 }}</span>
          </div>
          <div class="rest">库存：{{ item.totalCount }}</div>
        </van-col>
      </van-row>

      <!-- <van-card
        v-for="(item, index) in list"
        :key="index"
        :centered="centered"
        :title="item.name"
        tag="预售"
        :price="item.price"
        :desc="item.description"
        @click="getProductById(item.id)"
        :origin-price="item.id === 2 ? 8999 : 5999"
      >
        <div slot="thumb"></div>
        <div slot="footer">{{ item.totalCount }}</div>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-card>-->
    </template>
  </div>
</template>

<script>
import mixin from '@/utils/mixin.js'
import { Image, Row, Col, Card, Tag, Button, List, Swipe, SwipeItem, Loading, Toast, Locale } from 'vant'
import NavBar from '@/components/nav-bar.vue'
import request from '@/utils/request.js'
export default {
  name: 'Product',
  mixins: [mixin],
  data() {
    return {
      loadingShow: true,
      copyText: '今天天气真好呀!',
      list: [],
      title: '预购商品',
      centered: true,
      api: {
        getProducts: {
          url: '/products',
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
    // 获取订单所有商品
    getProducts() {
      request({ ...this.api.getProducts }).then(res => {
        if (res.success) {
          this.list = res.data
          this.loadingShow = false
        } else {
          Toast('即将上架，敬请期待！')
        }
      })
    },
    initPage() {
      let cmbcParam = this.$route.query.param
      if (cmbcParam !== undefined) {
        this.cmbcDescrypt()
        this.getProducts()
      } else {
        this.getProducts()
      }
    }
  },
  beforeMount() {
    this.setTitleBar('商品列表')
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
    NavBar
  }
}
</script>

<style scoped lang="less">
.productCard {
  margin-top: 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  .right {
    margin: 0 10px;
    .title {
      font-size: 16px;
      font-weight: 800;
    }
    .description {
      font-size: 14px;
    }
    .rest {
      text-align: right;
      color: #7d7e80;
      font-size: 13px;
    }
    .orgin-price {
      text-decoration: line-through;
      font-size: 13px;
      color: #7d7e80;
      margin-left: 5px;
    }
  }
}
</style>
