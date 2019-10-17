<template>
  <div>
    <div class="img-text">
      <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <van-row type="flex" justify="space-around" class="mt">
      <van-col span="10" class="border-radius bg-color" @click="spotBuy">
        <div class="img-text">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="text-center text-color-white mb mt">现货购买</div>
      </van-col>
      <van-col span="10" class="border-radius bg-color" @click="prePurchase">
        <div class="img-text">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="text-center text-color-white mt mb">预约购买</div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Image, Row, Col, Dialog } from "vant";
import request from "@/utils/request.js";

export default {
  name: "Index",
  data() {
    return {
      show: true,
      active: 0,
      customerInfo: {
        cid: "",
        cuserId: "",
        phone: ""
      },
      // 推广渠道Id
      cid: "",
      // 银行用户是否登录标志
      bankUserId: "",
      // api
      api: {
        checkCustomer: {
          url: "/customers/check",
          method: "post"
        }
      }
    };
  },
  methods: {
    // 预约购买
    prePurchase() {
      this.$router.push({ path: "/home" });
    },
    // 期货购买
    spotBuy() {
      if (
        this.customerInfo.cuserId === "" ||
        this.customerInfo.cuserId === null
      ) {
        Dialog({ message: "请在银行系统中登录后进行现货购买" });
      } else {
        Dialog({ message: "正在全力开发中" });
      }
    },
    // 接收从民生银行跳转的连接参数
    // 1.用户是否登录
    //
    checkLink() {
      this.customerInfo.cid = this.$route.query.cid;
      this.customerInfo.cuserId = this.$route.query.bankUserId;
      localStorage.setItem("cid", this.customerInfo.cid);
      localStorage.setItem("bankUserId", this.customerInfo.cuserId);
    },
    checkCustomer() {
      let data = this.customerInfo;
      request({ ...this.api.checkCustomer, data }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.checkLink();
    this.checkCustomer();
  },
  components: {
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>
<style scoped>
</style>
