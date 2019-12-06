<template>
  <div class="mainContent">
    <!-- <NavBar :title="title" /> -->
    <div class>
      <div style="text-align:center">
        <van-loading type="spinner" color="#ee0a24" v-if="loadingShow" class="loading" />
      </div>
      <template>
        <van-row>
          <van-col span="24">
            <van-tabs
              v-model="active"
              title-active-color="#ee0a24"
              :border="false"
              :sticky="true"
              :offset-top="0"
              :swipeable="true"
              @change="changeSort"
            >
              <van-tab title="待付款">
                <template v-if="orderList.length === 0 && !loadingShow" class="text-center">
                  <div class="round bg-color mt">
                    <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                  </div>
                  <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>
                  <div class="text-color-999 font-size-14 text-center">可以去看看有哪些想买的</div>
                  <div class="text-center">
                    <van-button
                      round
                      color="linear-gradient(to right,rgba(255, 66, 0, 0.5),rgba(255, 66, 0, 1))"
                      to="Home"
                      class="mt"
                    >
                      快去预定
                    </van-button>
                  </div>
                </template>
                <van-list v-model="isLoading" finished-text="没有更多了" @load="onLoad" :finished="finished" v-else>
                  <order-list-component
                    :orderList="orderList"
                    :orderStatus="0"
                    @changeSort="changeSort(0)"
                  ></order-list-component>
                </van-list>
              </van-tab>
              <van-tab title="已付款">
                <template v-if="orderList.length === 0 && !loadingShow" class="text-center">
                  <div class="round bg-color mt">
                    <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                  </div>
                  <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>
                  <div class="text-color-999 font-size-14 text-center">可以去看看有哪些想买的</div>
                  <div class="text-center">
                    <van-button
                      round
                      color="linear-gradient(to right,rgba(255, 66, 0, 0.5),rgba(255, 66, 0, 1))"
                      to="Home"
                      class="mt"
                    >
                      快去预定
                    </van-button>
                  </div>
                </template>
                <van-list v-model="isLoading" finished-text="没有更多了" @load="onLoad" :finished="finished" v-else>
                  <order-list-component
                    :orderList="orderList"
                    :orderStatus="1"
                    @changeSort="changeSort(1)"
                  ></order-list-component>
                </van-list>
              </van-tab>
              <van-tab title="已取消">
                <template v-if="orderList.length === 0 && !loadingShow" class="text-center">
                  <div class="round bg-color mt">
                    <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                  </div>
                  <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>
                </template>
                <van-list v-model="isLoading" finished-text="没有更多了" @load="onLoad" :finished="finished" v-else>
                  <order-list-component
                    :orderList="orderList"
                    :orderStatus="3"
                    @changeSort="changeSort(3)"
                  ></order-list-component>
                </van-list>
              </van-tab>
            </van-tabs>
          </van-col>
        </van-row>
      </template>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav-bar.vue'
import request from '@/utils/request.js'
import OrderListComponent from '@/components/order-list-component.vue'
import { Card, Icon, Button, Row, Col, Cell, CellGroup, loading, Tabbar, TabbarItem, Tab, Tabs, List } from 'vant'
import mixin from '@/utils/mixin.js'
export default {
  name: 'OrderList',
  mixins: [mixin],
  data() {
    return {
      title: '预购订单',
      isLoading: false,
      finished: true,
      orderList: [],
      sort: 0,
      loadingShow: true,
      tag: '',
      active: 0,
      param: {
        cuserId: localStorage.getItem('id'),
        orderStatus: 0,
        pageNo: 1
      },
      api: {
        getOrders: {
          url: '/orders',
          method: 'get'
        }
      }
    }
  },
  methods: {
    changeSort(val) {
      this.param.pageNo = 0
      if (val === 2) {
        this.sort = 3
      } else {
        this.sort = val
      }
      console.log('触发了吗')
      this.param.orderStatus = this.sort
      this.getOrder(this.param)
    },
    getOrder(params) {
      request({ ...this.api.getOrders, params }).then(res => {
        if (res.success) {
          this.finished = true
          this.orderList = res.data
          this.loadingShow = false
        }
      })
    },
    onLoad() {
      this.finished = false
      this.param.pageNo = this.param.pageNo + 1
      this.param.orderStatus = this.sort
      this.getOrder(this.param)
    },
    initPage() {
      const isLogin = localStorage.getItem('isLogin')
      if (isLogin === '1') {
        console.log('已经登录')
        this.getOrder(this.param)
      } else {
        console.log('未登录')
        localStorage.setItem('orderStatus', 1)
        loginForComm(
          window.location.protocol + '//' + window.location.host + this.$route.path,
          window.location.protocol + '//' + window.location.host + this.$route.path
        )
      }
    }
  },
  beforeMount() {
    this.setTitleBar('预购订单')
  },
  mounted() {
    this.initPage()
    // this.getOrders(this.paramWait)
    // this.getOrders(this.paramPayed)
    // this.getOrders(this.paramCancel)
  },
  components: {
    NavBar,
    OrderListComponent,
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
    [CellGroup.name]: CellGroup,
    [List.name]: List
  }
}
</script>

<style scoped lang="less">
.round {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  text-align: center;
  margin: 0 auto 20px;
}
.icon-cart {
  line-height: 70px;
}
.font-size-14 {
  font-size: 14px;
}
.mt {
  margin-top: 30px;
}
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
