<template>
  <div>
    <NavBar :title="title" />
    <div class="mainContent">
      <van-row type="flex" justify="space-around" align="center" class="border">
        <van-col span="2">
          <div class="round bg-color">
            <van-icon name="phone" color="#fff" />
            <!-- <van-icon name="location"  /> -->
          </div>
        </van-col>
        <van-col span="20">
          <div>
            {{ customerName }}
            <span class="text-color-999">{{ this.phone }}</span>
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
      good: {
        img: "",
        name: "",
        price: "",
        description: "",
        mark: ""
      },
      title: "确认订单",
      customerName: "嘿嘿嘿",
      phone: "1101101010101010",
      centered: true,
      order: {
        price: 0,
        count: 0
      },
      api: {
        getGoodById: {
          url: "/products/{id}",
          method: "get"
        }
      }
    };
  },
  methods: {
    getGoodById() {
      console.log(2222222);
      if (this.$route.params.goods.goodsId) {
        request({
          ...this.api.getGoodById,
          urlReplacements: [
            { substr: "{id}", replacement: this.$route.params.goods.goodsId }
          ]
        }).then(res => {
          console.log(res.data.data);
          this.good.img = res.data.data.img;
          this.good.name = res.data.data.name;
          this.good.price = res.data.data.price;
          this.good.description = res.data.data.description;
          console.log(this.good);
        });
      }
    },

    onSubmit() {
      this.show = true;
      // Dialog({ message: "支付中。。。" });
    },
    submit() {
      console.log("提交支付");
      this.$router.push({ name: "OrderDetail" });
    },
    cancel() {
      console.log("取消支付");
      this.$router.push({
        name: "OrderDetail",
        query: { id: this.$route.params.goods.goodsId }
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
