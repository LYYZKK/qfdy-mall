<template>
  <div>
    <NavBar :title="title" />
    <div class="mainContent">
      <van-row type="flex" justify="space-around" align="center" class="border">
        <van-col span="2">
          <div class="round bg-color">
            <van-icon name="phone" color="#fff" />
          </div>
        </van-col>
        <van-col span="20">
          <div>
            {{ customerInfo.name }}
            <span class="text-color-999">{{ customerInfo.phone }}</span>
            <div>{{ customerInfo.address }}</div>
          </div>
        </van-col>
      </van-row>
      <van-row class="border">
        <van-col span="24">
          <van-icon name="shop-collect" />&nbsp;乔府商城
        </van-col>
        <van-col span="24">
          <van-card
            :centered="centered"
            :thumb="good.img"
            :title="good.name"
            :num="good.count"
            tag="预购"
            :price="good.price"
            :desc="good.description"
          ></van-card>
        </van-col>
        <van-col span="24">
          <van-cell-group>
            <van-cell title="购买数量" value="内容">
              <van-stepper v-model="order.count" />
            </van-cell>
            <van-col span="24">
              <van-field
                v-model="good.mark"
                rows="1"
                autosize
                label="备注"
                type="textarea"
                placeholder="请输入备注"
              />
            </van-col>
          </van-cell-group>
        </van-col>
      </van-row>
    </div>
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
      safe-area-inset-bottom
    >
      <span slot="default" class="ml">
        共计
        <span>{{ order.count }}</span>件
      </span>
    </van-submit-bar>
    <van-dialog v-model="show" title="确认付款" show-cancel-button @confirm="submit" @cancel="cancel">
      <h1 class="text-center">￥{{ totalPrice/100 }}</h1>
    </van-dialog>
  </div>
</template>

<script>
import {
  SubmitBar,
  Checkbox,
  Dialog,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Button,
  ActionSheet,
  Row,
  Col,
  Icon,
  Card,
  Stepper,
  Field,
  Cell,
  CellGroup
} from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
export default {
  data() {
    return {
      show: false,
      checked: true,
      title: "确认订单",

      good: {
        img: "",
        name: "",
        price: "",
        description: "",
        mark: ""
      },
      centered: true,
      order: {
        price: 0,
        count: 0
      },
      orderId: "",
      customerInfo: {
        name: "",
        phone: "",
        address: "",
        id: ""
      },
      api: {
        getGoodById: {
          url: "/products/{id}",
          method: "get"
        },
        addOrder: {
          url: "/orders",
          method: "post"
        },

        // 获取客户信息
        getCustomerInfo: {
          url: "/customers/{id}",
          method: "get"
        },
        cancelOrder: {
          url: "/orders/{id}/cancel",
          method: "patch"
        },
        payOrder: {
          url: "/orders/{id}/pay",
          method: "patch"
        }
      }
    };
  },
  methods: {
    getCustomerInfo() {
      this.customerInfo.phone = localStorage.getItem("phone");
      this.customerInfo.id = localStorage.getItem("id");
      let id = localStorage.getItem("id");
      if (id) {
        request({
          ...this.api.getCustomerInfo,
          urlReplacements: [{ substr: "{id}", replacement: id }]
        }).then(res => {
          if (res.data.success) {
            this.customerInfo.name = res.data.data.name;
            this.customerInfo.address = res.data.data.address;
          }
        });
      }
    },
    getGoodById() {
      console.log(2222222);
      if (this.$route.params.goods.goodsId) {
        request({
          ...this.api.getGoodById,
          urlReplacements: [
            { substr: "{id}", replacement: this.$route.params.goods.goodsId }
          ]
        }).then(res => {
          this.good.img = res.data.data.img;
          this.good.name = res.data.data.name;
          this.good.price = res.data.data.price;
          this.good.description = res.data.data.description;
        });
      }
    },
    // 提交生成订单
    onSubmit() {
      let params = {
        customerId: parseInt(localStorage.getItem("id")),
        totalAmount: this.totalPrice / 100,
        orderProducts: [{ productId: 1, productNum: this.order.count }]
      };

      request({ ...this.api.addOrder, params }).then(res => {
        if (res.data.success) {
          this.show = true;
          this.orderId = res.data.data.id;
        }
      });
    },
    // 确定支付
    submit() {
      console.log("提交支付");
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: "{id}", replacement: this.orderId }]
      }).then(res => {
        if (res.data.success) {
          this.$router.push({
            name: "OrderDetail",
            query: { id: this.orderId }
          });
        }
      });
    },
    // 取消支付
    cancel() {
      request({
        ...this.api.cancelOrder,
        urlReplacements: [{ substr: "{id}", replacement: this.orderId }]
      }).then(res => {
        if (res.data.success) {
          this.$router.push({
            name: "OrderDetail",
            query: { id: this.orderId }
          });
        }
      });
    },
    onClickButton() {
      Dialog({ message: "提交中。。。" });
    },
    getOrder() {
      let info = this.$route.params;
      console.log(info);
      this.order.price = info.sku.price;
      this.order.count = info.goods.selectedNum;
      this.getGoodById();
    }
  },
  computed: {
    totalPrice() {
      return this.order.price * this.order.count * 100;
    }
  },
  mounted() {
    this.getCustomerInfo();
    this.getOrder();
  },
  components: {
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [Dialog.Component.name]: Dialog.Component,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Stepper.name]: Stepper,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    NavBar
  }
};
</script>

<style scoped>
</style>
