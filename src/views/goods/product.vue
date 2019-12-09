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
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <van-image :src="webBaseUrl + item.img" />
      </van-swipe-item>
    </van-swipe>
    <div style="text-align:center">
      <van-loading type="spinner" color="#ee0a24" v-if="loadingShow" />
    </div>
    <template v-if="!loadingShow">
      <van-card
        v-for="(item, index) in list"
        :key="index"
        :centered="centered"
        :thumb="webBaseUrl + item.img"
        :title="item.name"
        tag="预售"
        :price="item.price"
        :desc="item.description"
        @click="getProductById(item.id)"
        :origin-price="item.id === 2 ? 8999 : 5999"
      >
        <div slot="footer">库存：{{ item.totalCount }}</div>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-card>
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

<style></style>
