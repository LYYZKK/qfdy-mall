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
        cid: 1,
        cuserId: "",
        phone: ""
      },

      // api
      api: {
        checkCustomer: {
          url: "/customers/check",
          method: "post"
        },
        // 获取签名
        getSignature: {
          url: "/system/signature",
          method: "post"
        },
        // 访问次数增加
        linkAdd: {
          url: "/system/view-logs",
          method: "post"
        }
      }
    };
  },
  methods: {
    // 预约购买
    prePurchase() {
      this.linkAdd(3);
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
        this.linkAdd(2);
        this.getSig();
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
        // console.log(res);
      });
    },
    linkAdd(type) {
      let data = {
        type,
        cid: this.customerInfo.cid,
        cuserId: this.customerInfo.cuserId
      };
      request({ ...this.api.linkAdd, data }).then(res => {
        console.log(res);
      });
    },
    getSig() {
      let baseUrl = "https://pages.tmall.com/wow/wt/act/lm-partner-login?";
      let extJson = {
        bizId: "LMALL201910180001",
        bizUid: "17004044917089927",
        timestamp: new Date().getTime()
      };
      let gotoUrl = "https://pages.tmall.com/wow/wt/act/im-pages";
      const encodeURIData = {
        extJson: encodeURIComponent(JSON.stringify(extJson)),
        gotoUrl: encodeURIComponent(gotoUrl)
      };
      // .replace(/%7B/g, "{")
      // .replace(/%7D/g, "}")
      // .replace(/%3A/g, ":")
      // .replace(/%2C/g, ","),
      request({ ...this.api.getSignature, data: extJson }).then(res => {
        let signature = res.data.data;
        console.log("signature =" + signature);

        let openUrl =
          baseUrl +
          "extJson=" +
          encodeURIData.extJson +
          "&signature=" +
          signature +
          "&gotoUrl=" +
          encodeURIData.gotoUrl;
        console.log("openUrl =", openUrl);

        window.open(openUrl);
      });
    }
  },
  mounted() {
    this.checkLink();
    this.linkAdd(1);
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
