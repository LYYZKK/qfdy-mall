<template>
  <div style="width:100%;height:100%;">
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
            @click="changeSort"
          >
            <van-tab title="全部">
              <template v-if="orderList.length === 0 && !loadingShow" class="text-center">
                <div class="round bg-color mt">
                  <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                </div>
                <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>
                <div class="text-color-999 font-size-14 text-center">可以去看看有哪些想买的</div>
              </template>
              <template v-else>
                <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh">
                  <van-list
                    ref="list"
                    v-model="isUploading"
                    :finished="isUpfinished"
                    finished-text="没有更多了"
                    :check="checkStatus"
                    @load="onLoadList"
                    :immediate-check="check"
                    :offset="60"
                  >
                    <order-list-component :orderList="orderList" @changeSort="changeSort"></order-list-component>
                  </van-list>
                </van-pull-refresh>
              </template>
            </van-tab>
            <van-tab title="待付款">
              <template v-if="orderList.length < 1 && !loadingShow" class="text-center">
                <div class="round bg-color mt">
                  <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                </div>
                <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>
                <div class="text-color-999 font-size-14 text-center">可以去看看有哪些想买的</div>
              </template>
              <template v-else>
                <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh">
                  <van-list
                    v-model="isUploading"
                    :finished="isUpfinished"
                    finished-text="没有更多了"
                    :offset="60"
                    @load="onLoadList"
                    :immediate-check="check"
                  >
                    <order-list-component :orderList="orderList" @changeSort="changeSort"></order-list-component>
                  </van-list>
                </van-pull-refresh>
              </template>
            </van-tab>
            <van-tab title="已付款">
              <template v-if="orderList.length < 1 && !loadingShow" class="text-center">
                <div class="round bg-color mt">
                  <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                </div>
                <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>
                <div class="text-color-999 font-size-14 text-center">可以去看看有哪些想买的</div>
              </template>
              <template v-else>
                <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh">
                  <van-list
                    v-model="isUploading"
                    :finished="isUpfinished"
                    finished-text="没有更多了"
                    :offset="60"
                    @load="onLoadList"
                    :immediate-check="check"
                  >
                    <order-list-component :orderList="orderList" @changeSort="changeSort"></order-list-component>
                  </van-list>
                </van-pull-refresh>
              </template>
            </van-tab>
            <van-tab title="已取消">
              <template v-if="orderList.length < 1 && !loadingShow" class="text-center">
                <div class="round bg-color mt">
                  <van-icon name="shopping-cart" size="40" color="#fff" class="icon-cart" />
                </div>
                <div class="text-color-999 font-size-14 text-center">您还没有相关的订单</div>
              </template>
              <template v-else>
                <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh">
                  <van-list
                    v-model="isUploading"
                    :finished="isUpfinished"
                    finished-text="没有更多了"
                    :offset="60"
                    @load="onLoadList"
                    :immediate-check="check"
                  >
                    <order-list-component :orderList="orderList"></order-list-component>
                  </van-list>
                </van-pull-refresh>
              </template>
            </van-tab>
          </van-tabs>
        </van-col>
      </van-row>
    </template>
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
      isDownLoading: false, // 是否上拉刷新
      isUploading: false, // 是否下拉加载
      isUpfinished: false, // 是否加载结束
      loadingShow: false, // 是否无数据
      offset: 10,
      check: false,
      orderList: [],
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
    checkStatus(val) {
      console.log('checkStatus', val)
    },
    changeSort(item, index) {
      console.log('点击切换数据', item, index)
      this.isUploading = false
      this.isUpfinished = false
      this.orderList = []
      this.param.pageNo = 1
      if (item === 0) {
        this.$router.go(0)
        console.log('全部')
      } else if (item === 1) {
        this.param.orderStatus = 0
        this.getOrder(this.param)
      } else if (item === 2) {
        this.param.orderStatus = 2
        this.getOrder(this.param)
      } else if (item === 3) {
        this.param.orderStatus = 3
        this.getOrder(this.param)
      }
    },
    // 上拉刷新
    onRefresh() {
      console.log('走到A')
      this.param.pageNo = 1
      this.isUpfinished = false
      this.getOrder(this.param)
    },
    // 下拉加载
    onLoadList() {
      console.log('走到B')
      this.param.pageNo++
      this.getOrder(this.param)
    },
    getOrder(param) {
      this.loadingShow = true
      request({ ...this.api.getOrders, params: param }).then(res => {
        if (res.success) {
          if (this.param.pageNo === res.page.totalPage) {
            this.isUpfinished = true
          }
          if (this.param.pageNo === 1) {
            this.orderList = res.data
          } else {
            this.orderList = this.orderList.concat(res.data)
          }
          this.loadingShow = false
          this.isDownLoading = false
          this.isUploading = false
        }
      })
    },
    initPage() {
      let cmbcParam = this.$route.query.param
      if (cmbcParam !== undefined) {
        this.cmbcDescrypt()
        this.getOrder(this.param)
      }
      const isLogin = localStorage.getItem('isLogin')
      console.log('orderList isLogin', typeof isLogin)
      if (isLogin === '1') {
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
