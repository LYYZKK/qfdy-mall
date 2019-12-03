<template>
  <div class="mainContent">
    <NavBar :title="title" />
    <div>
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
              <div class="text-color-999 font-size-10">{{ customerInfo.address.province }}{{ customerInfo.address.city }}{{ customerInfo.address.county }}{{ customerInfo.address.addressDetail }}</div>
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
              <van-stepper v-model="order.count" :disable-input="true" />
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
      <div slot="default" class="ml text-color-ccc">
        共计&nbsp;<span style="color:#000;">{{ order.count }}</span>&nbsp;件</div>
    </van-submit-bar>
    <van-dialog v-model="show" title="确认付款" show-cancel-button @confirm="submit" @cancel="cancel">
      <h1 class="text-center">￥{{ totalPrice/100 }}</h1>
    </van-dialog>
    <!-- 再次确认取消 -->
    <van-dialog v-model="cancelShow" title="您确认取消吗？" show-cancel-button @confirm="canselSure" @cancel="cancelShow=false">
      <h1 class="text-center">￥{{ totalPrice/100 }}</h1>
    </van-dialog>
    <!-- 修改当前订单的客户信息 -->
    <van-action-sheet v-model="userShow" >
      <van-cell-group>
        <van-field v-model="customerInfo.name" label="收货人姓名" left-icon="contact" />
        <van-field v-model="customerInfo.phone" label="手机号" left-icon="phone-o" disabled>
        </van-field>
        <van-field v-model="threeAddress" label="省市区选择" left-icon="location-o" @click="addressShow=true" disabled/>
        <van-field v-model="customerInfo.address.addressDetail" label="收货人地址" left-icon="location-o" />
      </van-cell-group>
      <van-button @click="save" @cancel="cancelAddress" size="large" color="red" text="保存"></van-button>
    </van-action-sheet>
    <van-popup v-model="addressShow" position="bottom" :overlay="true" round>
      <van-area :area-list="areaList" @confirm="saveAddress" @cancel="cancelAddress"/>
    </van-popup>
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
  Toast,
  AddressEdit,
   Area,
  Popup
} from "vant";
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
import mixin from "@/utils/mixin.js";
import areaList from '@/utils/area.js'
export default {
  mixins: [mixin],
  data() {
    return {
      areaList,
      threeAddress:'',
      cancelShow:false,
      addressShow:false,
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
        phone: localStorage.getItem('phone'),
        address: {
          province:'',
          city:'',
          county:'',
          addressDetail:'',
        }
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
    // 获取用户详细信息
    getCustomerInfo() {
      this.customerInfo.phone = localStorage.getItem("phone");
      let id = localStorage.getItem("id");
      if (id) {
        request({
          ...this.api.getCustomerInfo,
          urlReplacements: [{ substr: "{id}", replacement: id }]
        }).then(res => {
          if (res.success) {
            let address = JSON.parse(res.data.address)
            this.customerInfo.name = res.data.name;
            this.customerInfo.address.province = address.province;
            this.customerInfo.address.city = address.city;
            this.customerInfo.address.county = address.county;
            this.customerInfo.address.addressDetail = address.addressDetail;
            this.threeAddress=address.province+'/'+address.city+'/'+address.county
          }
        });
      }
    },
    // 获取商品详情
    getGoodById() {
      console.log(this.$route.params)
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
    saveAddress(val){
      this.customerInfo.address.province = val[0].name
      this.customerInfo.address.city = val[1].name
      this.customerInfo.address.county = val[2].name
      this.threeAddress = val[0].name+'/'+val[1].name+'/'+val[2].name
      this.addressShow = false
    },
    cancelAddress(){
      this.addressShow = false
    },
    // 提交生成订单
    onSubmit() {
      if (
        this.customerInfo.phone !== "" &&
        this.customerInfo.name !== "" &&
        this.customerInfo.address.province !== ""&&
        this.customerInfo.address.city !== ""&&
        this.customerInfo.address.county !== ""&&
        this.customerInfo.address.addressDetail !== ""
      ) {
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
          orderAddressee: {
            address:JSON.stringify(this.customerInfo.address),
            name:this.customerInfo.name,
            phone:this.customerInfo.phone
          }
        };
        request({ ...this.api.addOrder, params }).then(res => {
          if (res.success) {
            this.orderId = res.data.id;
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
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: "{id}", replacement: this.orderId }]
      }).then(res => {
        if (res.success) {
          Toast({
            message: "恭喜您预定成功!",
            icon: "like-o"
          });
          this.$router.push({
            name: "OrderDetail",
            query: { id: this.orderId }
          });
        }
      });
    },
    // 取消支付
    cancel() {
      this.cancelShow = true
    },
    // 再次确认取消支付
    canselSure(){
      this.$router.push({
        name: "OrderDetail",
        query: { id: this.orderId }
      });
    },
    //
    getOrder() {
      let info = this.$route.params;
      this.order.price = info.sku.price;
      this.order.count = info.goods.selectedNum;
      this.getGoodById();
    },
    // 保存当前订单客户信息不一定是默认信息
    save() {
      this.userShow = false;
    },
  },
  computed: {
    totalPrice() {
      return this.order.price * this.order.count * 100;
    },
  },
  beforeMount() {
    this.setTitleBarName();
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
    [Area.name]: Area,
    [Popup.name]: Popup,
    [AddressEdit.name]: AddressEdit,
    NavBar
  }
};
</script>

<style scoped>
.text-color-yellow {
  color: #ee0a24;
  font-size: 13px;
}
.font-size-10{
  font-size:10px;
}
.text-color-ccc{
  color: #ccc
}
</style>
