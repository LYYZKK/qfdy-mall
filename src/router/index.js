import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index.vue'
import Product from '@/views/goods/product.vue'
import ProductDetail from '@/views/goods/product-detail.vue'
import ProductSubmit from '@/views/goods/product-submit.vue'
import OrderList from '@/views/goods/order-list.vue'
import Mine from '@/views/goods/mine.vue'
import Home from '@/views/home.vue'
import AddressList from '@/views/goods/mine-addressList.vue'
import OrderDetail from '@/views/goods/order-detail.vue'
import AddressEdit from '@/views/goods/mine-addressEdit.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      meta: {
        title: '乔府商城'
      },
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/booking'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home',
          redirect: '/booking'
        },
        {
          path: '/booking',
          name: 'Product',
          component: Product
        },
        {
          path: '/order-list',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: '/mine',
          name: 'Mine',
          component: Mine
        }
      ]
    },

    {
      path: '/product-detail/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/product-submit',
      name: 'ProductSubmit',
      component: ProductSubmit
    },
    {
      path: '/address-list',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/order-detail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/address-edit',
      name: 'AddressEdit',
      component: AddressEdit
    }
  ]
})
