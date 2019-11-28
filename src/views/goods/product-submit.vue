<template>
  <div>
    <NavBar :title="title" />
    <div class="mainContent">
      <div class="border">
        <van-row type="flex" justify="space-around" align="center">
          <van-col span="2">
            <div class="round bg-color">
              <van-icon name="location-o" color="#fff" />
            </div>
          </van-col>
          <!-- 默认用户信息 -->
          <van-col span="18">
            <div>
              <van-row>
                <van-col>
                  <span>{{ customerInfo.name }}</span>
                  <span class="text-color-999">{{ customerInfo.phone }}</span>
                </van-col>
              </van-row>
              <div>{{ customerInfo.address }}</div>
              <div class="text-color-yellow">完善的信息方便后期接收快递</div>
            </div>
          </van-col>
          <van-col @click="userShow=true">
            <van-icon name="edit" color="rgba(255, 66, 0, 1)" />
          </van-col>
        </van-row>
      </div>
      <van-row class="border">
        <van-col span="24">
          <van-icon name="shop-collect" />&nbsp;乔府商城
        </van-col>
        <van-col span="24">
          <van-card
            :centered="centered"
            :thumb="webBaseUrl+good.img"
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
              <van-stepper v-model="order.count" disable-input="true" />
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
    <van-submit-bar :price="totalPrice" button-text="提交" @submit="onSubmit" safe-area-inset-bottom>
      <span slot="default" class="ml">
        共计
        <span>{{ order.count }}</span>件
      </span>
    </van-submit-bar>
    <van-dialog v-model="show" title="确认付款" show-cancel-button @confirm="submit" @cancel="cancel">
      <h1 class="text-center">￥{{ totalPrice/100 }}</h1>
    </van-dialog>
    <!-- 修改当前订单的客户信息 -->
    <van-action-sheet v-model="userShow" safe-area-inset-bottom @closed="refresh">
      <van-cell-group>
        <van-field v-model="customerInfo.name" label="姓名" left-icon="contact" />
        <van-field v-model="customerInfo.phone" label="手机号" left-icon="phone-o" disabled>
          <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->
        </van-field>
        <!-- <van-field v-model="customerInfo.code" label="验证码" left-icon="phone-o" /> -->
        <van-field v-model="customerInfo.address" label="地址" left-icon="location-o" />
      </van-cell-group>
      <van-button @click="save" size="large" color="red" text="保存"></van-button>
    </van-action-sheet>
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
  CellGroup,
  Toast
} from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
import mixin from "@/utils/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      userShow: false,
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
        address: ""
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
      let id = localStorage.getItem("id");
      if (id) {
        request({
          ...this.api.getCustomerInfo,
          urlReplacements: [{ substr: "{id}", replacement: id }]
        }).then(res => {
          if (res.success) {
            this.customerInfo.name = res.data.name;
            this.customerInfo.address = res.data.address;
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
          this.good.img = res.data.img;
          this.good.name = res.data.name;
          this.good.price = res.data.price;
          this.good.description = res.data.description;
        });
      }
    },
    // 提交生成订单
    onSubmit() {
      if (this.customerInfo.phone !== "") {
        let params = {
          customerId: parseInt(localStorage.getItem("id")),
          totalAmount: this.totalPrice / 100,
          orderProducts: [
            {
              productId: this.$route.params.goods.goodsId,
              productNum: this.order.count
            }
          ],
          mark: this.good.mark,
          orderAddressee: this.customerInfo
        };
        request({ ...this.api.addOrder, params }).then(res => {
          if (res.success) {
            this.orderId = res.data.id;
            // Toast({
            //   message: "恭喜您预定成功!请等待联系付款。",
            //   icon: "like-o"
            // });
            // 生成订单跳转到订单详情页
            // this.$router.push({
            //   name: "OrderDetail",
            //   query: { id: this.orderId }
            // });
            // 打开支付
            this.show = true;
          } else {
            Toast({
              message: "库存不足",
              icon: "warning-o"
            });
          }
        });
      } else {
        alert("请完善用户信息");
      }
    },
    // 确定支付
    submit() {
      console.log("提交支付");
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: "{id}", replacement: this.orderId }]
      }).then(res => {
        if (res.success) {
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
        if (res.success) {
          Toast({
            message: "恭喜您预定成功!请等待联系付款。",
            icon: "like-o"
          });
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
    },
    // 保存当前订单客户信息不一定是默认信息
    save() {
      this.userShow = false;
    },
    refresh() {}
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
    [Toast.name]: Toast,
    NavBar
  }
};
</script>

<style scoped>
.text-color-yellow {
  color: #ee0a24;
  font-size: 13px;
}
</style>
