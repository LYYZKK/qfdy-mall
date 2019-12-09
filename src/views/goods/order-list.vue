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
              <van-tab title="全部">
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
                    >快去预定</van-button>
                  </div>
                </template>
                <template v-else>
                  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                    >
                      <order-list-component :orderList="orderList"></order-list-component>
                    </van-list>
                  </van-pull-refresh>
                </template>
              </van-tab>
              <van-tab title="预约成功">
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
                    >快去预定</van-button>
                  </div>console.log(this.active)
                </template>
                <template v-else>
                  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <van-list
                      v-model="loading"
                      :finished="finished"
                      finished-text="没有更多了"
                      @load="onLoad"
                    >
                      <order-list-component :orderList="orderList" :orderStatus="0"></order-list-component>
                    </van-list>
                  </van-pull-refresh>
                </template>
              </van-tab>
              <van-tab title="已取消">
                <template v-if="orderList.length === 0 && !loadingShow" class="text-center">
                  <div class="round bg-color mt">
                    <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                  </div>
                  <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>console.log(this.active)
                </template>
                <template v-else>
                  <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                  >
                    <order-list-component :orderList="orderList" :orderStatus="3"></order-list-component>
                  </van-list>
                </template>
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
  List,
  PullRefresh
} from 'vant'
import mixin from '@/utils/mixin.js'
export default {
  name: 'OrderList',
  mixins: [mixin],
  data() {
    return {
      title: '预购订单',
      isLoading: false,
      loading: false,
      finished: true,
      orderList: [],
      sort: 0,
      loadingShow: true,
      tag: '',
      active: 0,
      param: {
        cuserId: localStorage.getItem('id'),
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
    changeSort() {
      // console.log('活跃 active status', this.active)
      this.orderList = []
      this.param.pageNo = 1
      if (this.active === 1) {
        this.param.orderStatus = 0
      } else if (this.active === 2) {
        this.param.orderStatus = 3
      } else if (this.active === 0) {
        this.param = {
          cuserId: localStorage.getItem('id'),
          pageNo: 1
        }
      }
      // console.log('活跃OrderStatus', this.param.orderStatus)
      this.getOrder(this.param)
    },
    // 上拉加载
    onRefresh() {
      this.finished = false
      this.isLoading = false
      this.param.pageNo = this.pageNo + 1
      if (this.active === 0) {
        this.param = {
          cuserId: localStorage.getItem('id'),
          pageNo: 1
        }
      } else if (this.active === 1) {
        this.param.orderStatus = 0
      } else if (this.active === 2) {
        this.param.orderStatus = 3
      }
      console.log('this.active 是', this.active)
      this.getOrder(this.param)
    },
    getOrder(param) {
      this.loadingShow = true
      this.finished = false
      request({ ...this.api.getOrders, params: param }).then(res => {
        if (res.success) {
          this.orderList = this.orderList.concat(res.data)
          this.loading = false
          if (this.orderList.length >= res.page.totalCount) {
            this.finished = true
          }
          this.loadingShow = false
          console.log(this.orderList)
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
      console.log(this.param)
      let cmbcParam = this.$route.query.param
      if (cmbcParam !== undefined) {
        this.cmbcDescrypt()
        this.param = {
          cuserId: localStorage.getItem('id'),
          pageNo: 1
        }
        this.getOrder(this.param)
      }
      const isLogin = localStorage.getItem('isLogin')
      console.log('orderList isLogin', typeof isLogin)
      if (isLogin === '1') {
        this.param = {
          cuserId: localStorage.getItem('id'),
          pageNo: 1
        }
        this.getOrder(this.param)
      } else {
        console.log('未登录')
        loginForComm(
          window.location.protocol + '//' + window.location.host + '/booking',
          window.location.protocol + '//' + window.location.host + this.$route.path
        )
      }
    }
  },
  beforeMount() {
    this.setTitleBar('预购订单')
  },
  mounted() {
    console.log('active', this.active)
    console.log('this.param.orderStatus', this.active)
    this.initPage()
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
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
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
