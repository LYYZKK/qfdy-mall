import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/index.vue";
import Product from "@/views/goods/product.vue";
import ProductDetail from "@/views/goods/product-detail.vue";
import ProductSubmit from "@/views/goods/product-submit.vue";
import OrderList from "@/views/goods/order-list.vue";
import Mine from "@/views/goods/mine.vue";
import Home from "@/views/home.vue";
import MineInfo from "@/views/goods/mine-info.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      meta: {
        title: "乔府商城"
      },
      redirect: "/index"
    },
    {
      path: "/index",
      component: Index,
      meta: {
        title: "乔府商城"
      }
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "/home",
          redirect: "/booking"
        },
        {
          path: "/booking",
          component: Product
        },
        {
          path: "/order-list",
          component: OrderList
        },
        {
          path: "/mine",
          component: Mine
        },
        {
          path: "/mine-info",
          component: MineInfo
        }
      ]
    },

    {
      path: "/product-detail",
      component: ProductDetail
    },
    {
      path: "/product-submit",
      component: ProductSubmit
    }
  ]
});
