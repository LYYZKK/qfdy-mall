<template>
  <div class="main">
    <div class="top">
      <!-- <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" /> -->
      <div class="banner">
        <div class="text">专属私家定制稻田</div>
        <!-- <van-image :src="banner" class="banner-image" /> -->
      </div>
      <div class="bg">
        <div class="rice-text">五常大米</div>
        <div class="text-right text-color-white text-bg">民生银行客户尊享</div>
        <div class="text-center blue-text">核/心/产/区/稻/田</div>
        <div>
          <van-button round color="rgba(177, 136, 75, .8)" class="btn-buy">大米现货</van-button>
          <van-button round color="rgba(177, 136, 75, .8)" class="btn-buy">稻田预购</van-button>
        </div>
        <!-- <van-image :src="topBg" class="banner-image" /> -->
      </div>
      <!-- ="../assets/images/index/banner.png -->
    </div>
    <!-- <van-row type="flex" justify="space-around" class="mt">
      <van-col span="10" class="border-radius bg-color" @click="spotBuy">
        <div>
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="text-center text-color-white mb mt">现货购买</div>
      </van-col>
      <van-col span="10" class="border-radius bg-color" @click="prePurchase">
        <div>
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="text-center text-color-white mt mb">预约购买</div>
      </van-col>
    </van-row>-->
  </div>
</template>
<script>
import { Image, Row, Col, Dialog, Button } from "vant";
// import request from "@/utils/request.js";
import banner from "@/assets/images/index/banner.png";
import topBg from "@/assets/images/index/top-BG.png";
export default {
  name: "Index",
  data() {
    return {
      show: true,
      active: 0,
      banner,
      topBg,
      customerInfo: {
        cid: 1,
        cuserId: "",
        phone: ""
      },
      isVip: 0,
      // api
      api: {
        checkCustomer: {
          url: "/customers/check",
          method: "post"
        },
        // 获取签名
        getSignature: {
          url: "/linked-mall/signature",
          method: "post"
        },
        // 访问次数增加
        linkAdd: {
          url: "/system/view-logs",
          method: "post"
        },
        // 民生银行参数解密
        cmbcDescrypt: {
          url: "/cmbc/descrypt",
          method: "get"
        }
      }
    };
  },
  methods: {
    // 预约购买
    // prePurchase() {
    //   this.linkAdd(3);
    //   this.$router.push({ path: "/home" });
    // },
    // 期货购买
    // spotBuy() {
    //   if (
    //     this.customerInfo.cuserId === "" ||
    //     this.customerInfo.cuserId === null
    //   ) {
    //     Dialog({ message: "请在银行系统中登录后进行现货购买" });
    //   } else {
    //     this.linkAdd(2);
    //     this.getSig();
    //   }
    // },
    // // 解密从民生银行跳转的连接参数
    // cmbcDescrypt() {
    //   let params = {
    //     param: this.$route.query.param
    //   };
    //   console.log(params);
    //   request({ ...this.api.cmbcDescrypt, params }).then(res => {
    //     console.log(res);
    //   });
    // },
    // 1.用户是否登录
    // checkLink() {
    //   this.customerInfo.cid = this.$route.query.cid;
    //   this.customerInfo.cuserId = this.$route.query.bankUserId;
    //   localStorage.setItem("cid", this.customerInfo.cid);
    //   localStorage.setItem("bankUserId", this.customerInfo.cuserId);
    // },
    // 验证客户身份
    // checkCustomer() {
    //   let data = this.customerInfo;
    //   request({ ...this.api.checkCustomer, data }).then(res => {
    //     this.isVip = res.data.isVip;
    //   });
    // },
    // 访问次数增加(首页)type:1,(现货购买)type:2,(期货购买)type:3
    // linkAdd(type) {
    //   let data = {
    //     type,
    //     cid: this.customerInfo.cid,
    //     cuserId: this.customerInfo.cuserId
    //   };
    //   request({ ...this.api.linkAdd, data }).then(res => {
    //     console.log(res);
    //   });
    // }
    // 获取签名
    // getSig() {
    //   let baseUrl = "https://pages.tmall.com/wow/wt/act/lm-partner-login?";
    //   let extJson = {
    //     bizId: "LMALL201910180001",
    //     bizUid: "17004044917089927",
    //     isVip: this.isVip,
    //     timestamp: new Date().getTime()
    //   };
    //   let gotoUrl = "https://pages.tmall.com/wow/wt/act/qiaofudayuan?wh_biz=tm";
    //   const encodeURIData = {
    //     extJson: encodeURIComponent(JSON.stringify(extJson)),
    //     gotoUrl: encodeURIComponent(gotoUrl)
    //   };
    //   request({ ...this.api.getSignature, data: extJson }).then(res => {
    //     let signature = res.data.data;
    //     console.log("signature =" + signature);
    //     let openUrl =
    //       baseUrl +
    //       "extJson=" +
    //       encodeURIData.extJson +
    //       "&signature=" +
    //       signature +
    //       "&gotoUrl=" +
    //       encodeURIData.gotoUrl;
    //     console.log("openUrl =", openUrl);
    //     window.open(openUrl);
    //   });
    // }
  },
  mounted() {
    // this.cmbcDescrypt();
    // this.checkLink();
    // this.linkAdd(1);
    // this.checkCustomer();
  },
  components: {
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>
<style scoped>
.main {
  height: 100%;
  background-color: pink;
  overflow: auto;
}
.top {
  height: 100%;
  position: relative;
}

.top .banner {
  position: relative;
  height: 50%;
  background: url(../assets/images/index/banner.png) no-repeat;
  background-size: cover;
}
/* .banner-image {
  display: block;
  height: 100%;
  width: auto;
} */
.top .bg {
  position: absolute;
  bottom: 0;
  height: 60%;
  width: 100%;
  background: url(../assets/images/index/top-BG.png) no-repeat;
  background-size: 100% 100%;
}
.text {
  position: absolute;
  width: 30px;
  text-align: center;
  left: 0;
  top: 0;
  transform: translate(50%, 10%);
  font-size: 16px;
  padding: 10px 0 5px 0;
  line-height: 20px;
  color: rgba(254, 254, 254, 1);
  background: url(../assets/images/index/text-bg.png) no-repeat;
}
.rice-text {
  color: rgba(24, 62, 2, 1);
  font-weight: bolder;
  text-align: center;
  margin-top: 15%;
  font-size: 60px;
  font-family: "ZhenyanGB-Regular";
}
.text-bg {
  width: 70%;
  margin: 0 auto;
  background: url(../assets/images/index/text.png) no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.text-right {
  padding-left: 25%;
}
.blue-text {
  color: rgba(18, 60, 3, 1);
  font-size: 18px;
  letter-spacing: 10px;
  font-weight: 800;
}
.btn-buy {
  /* border-image: url(../assets/images/index/btn-border.png); */
  background: url(../assets/images/index/btn-border.png) no-repeat;
}
</style>
