<template>
  <div class="main">
    <div class="top">
      <div class="banner">
        <van-image :src="banner" class="btn-left-right" />
        <div class="text">专属私家定制稻田</div>
      </div>
      <div class="bottom">
        <div class="rice-text">
          <van-image :src="riceText" />
        </div>
        <div class="text-right text-color-white text-bg">民生银行客户尊享</div>
        <div class="text-center blue-text mt mb">核/心/产/区/稻/田</div>
        <van-row type="flex" justify="space-around" class="btn-margin">
          <van-col span="10" class="btn-buy text-center text-color-white" @click="spotBuy">
            <van-row class="buy" type="flex" justify="space-around" align="center">
              <van-col span="3">
                <van-image :src="left" class="btn-left-right" />
              </van-col>
              <van-col class="font-size" style="letter-spacing:2px;">大米现货</van-col>
              <van-col span="3">
                <van-image :src="right" class="btn-left-right" />
              </van-col>
            </van-row>
          </van-col>
          <van-col span="10" class="btn-buy text-center text-color-white">
            <van-row class="buy" type="flex" justify="space-around" align="center">
              <van-col span="3">
                <van-image :src="left" class="btn-left-right" />
              </van-col>
              <van-col class="font-size" style="letter-spacing:2px;">稻田预购</van-col>
              <van-col span="3">
                <van-image :src="right" class="btn-left-right" />
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="4" class="text-center text-color-blue"></van-col>
          <van-col span="4" class="text-center text-color-blue font-size">天然</van-col>
          <van-col span="4" class="text-center text-color-blue font-size">绿色</van-col>
          <van-col span="4" class="text-center text-color-blue font-size">原生态</van-col>
          <van-col span="4" class="text-center text-color-blue"></van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="4" class="text-center text-color-blue font-size"></van-col>
          <van-col span="4" class="text-center text-color-blue font-size">新鲜</van-col>
          <van-col span="4" class="text-center text-color-blue font-size">活米</van-col>
          <van-col span="4" class="text-center text-color-blue font-size">人人爱</van-col>
          <van-col span="4" class="text-center text-color-blue"></van-col>
        </van-row>
      </div>
    </div>
    <div class="footer">
      <div class="text-center red-color">北纬45º世界黄金水稻带</div>
      <van-image :src="map" class="map" />
      <div class="mt">
        <div class="title text-color-blue">稀缺资源</div>
        <div class="small-text yellow-text-color">五常稻田235万亩</div>
        <div class="small-text yellow-text-color">核心产区仅40万亩</div>
      </div>
      <div class="mt">
        <div class="small-text yellow-text-color">阿里科技 手机可视</div>
        <div class="small-text yellow-text-color">从种子到餐桌8个环节99道工序</div>
        <div class="title text-color-blue">全程可溯源</div>
        <div class="small-text yellow-text-color">专属管家服务</div>
        <div class="small-text yellow-text-color">每月一次鲜米配送</div>
      </div>
      <div class="mt">
        <div class="title text-color-blue">咱家</div>
        <div class="small-title text-color-blue">在东北那旮沓有块地</div>
        <div class="small-text yellow-text-color">2分地产100斤</div>
        <div class="small-text yellow-text-color">2分地为1单元 可成倍数认购</div>
      </div>
      <div class="mt">
        <div class="small-title yellow-text-color">高端大气上档次</div>
        <div class="title text-color-blue">送礼相当有面</div>
      </div>
      <div class="small-text text-color-blue mb mt">全国统一服务热线：400-1002753</div>
    </div>
  </div>
</template>
<script>
import { Image, Row, Col, Dialog, Button } from "vant";
import request from "@/utils/request.js";
import map from "@/assets/images/index/map.png";
import riceText from "@/assets/images/index/rice-text.png";
import left from "@/assets/images/index/btn-L.png";
import right from "@/assets/images/index/btn-R.png";
import banner from "@/assets/images/index/banner.png";
import mixin from "@/utils/mixin.js";
export default {
  name: "Index",
  mixins: [mixin],
  data() {
    return {
      show: true,
      active: 0,
      map,
      riceText,
      left,
      right,
      banner,
      customerInfo: {
        cid: 1,
        cuserId: "",
        phone: ""
      },
      // api
      api: {
        // 获取签名
        getSignature: {
          url: "/linked-mall/signature",
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
    // 获取签名
    getSign() {
      let isLogin = localStorage.getItem("isLogin");
      console.log("isLogin===", isLogin);

      if (isLogin === "1") {
        let baseUrl = "https://pages.tmall.com/wow/wt/act/lm-partner-login?";
        let extJson = {
          bizId: "LMALL201910180001",
          bizUid: "17004044917089927",
          isVip: localStorage.getItem("isVip"),
          timestamp: new Date().getTime()
        };
        let gotoUrl =
          "https://pages.tmall.com/wow/wt/act/qiaofudayuan?wh_biz=tm&env=wapa";
        const encodeURIData = {
          extJson: encodeURIComponent(JSON.stringify(extJson)),
          gotoUrl: encodeURIComponent(gotoUrl)
        };
        request({ ...this.api.getSignature, params: extJson }).then(res => {
          console.log("getSignature request with res =", res);

          if (res.data.success) {
            let signature = res.data.data;
            let openUrl =
              baseUrl +
              "extJson=" +
              encodeURIData.extJson +
              "&signature=" +
              signature +
              "&gotoUrl=" +
              encodeURIData.gotoUrl;
            gotoShopUrl(openUrl);
          } else {
            console.log("获取签名失败");
          }
        });
      } else {
        // eslint-disable-next-line no-undef
        loginForComm(
          window.location.protocol +
            "//" +
            window.location.host +
            this.$route.path,
          window.location.protocol +
            "//" +
            window.location.host +
            this.$route.path
        );
      }
    },
    // 预约购买
    prePurchase() {
      this.linkAdd(3);
      this.$router.push({ path: "/home" });
    },
    // 现货购买
    spotBuy() {
      this.linkAdd(2);
      this.getSign();
    },
    // 访问次数增加(首页)type:1,(现货购买)type:2,(期货购买)type:3
    linkAdd(type) {
      let params = {
        type,
        cid: this.customerInfo.cid
      };
      request({ ...this.api.linkAdd, params }).then(res => {
        if (res.data.success) {
          console.log("访问次数加一成功");
        }
      });
    },
    initPage() {
      let cmbcParam = this.$route.query.param;
      console.log(cmbcParam);
      // let baseUrl =
      //   "https%3a%2f%2fpages.tmall.com%2fwow%2fwt%2fact%2fqiaofudayuan%3fwh_biz%3dtm%26env%3dwapa";
      // console.log(decodeURIComponent(baseUrl));
      if (cmbcParam !== undefined) {
        this.cmbcDescrypt();
      }
    }
  },
  mounted() {
    this.linkAdd(1);
    this.initPage();
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
  overflow: auto;
  box-sizing: border-box;
}
.top {
  height: 100%;
  position: relative;
}

.top .banner {
  position: relative;
  width: 100%;
  height: auto;
}
.top .bottom {
  position: absolute;
  bottom: -100%;
  left: 0;
  padding: 20% 0;
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
  font-size: 50px;
  font-family: "ZhenyanGB-Regular";
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.text-bg {
  width: 80%;
  margin: 0 auto;
  background: url(../assets/images/index/text.png) no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.text-right {
  padding-left: 30%;
}
.blue-text {
  color: rgba(18, 60, 3, 1);
  font-size: 18px;
  letter-spacing: 10px;
  font-weight: 800;
}
.btn-margin {
  margin-bottom: 10px;
}
.btn-buy {
  background: url(../assets/images/index/btn-border.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  padding: 5px 3px;
}
.btn-buy .buy {
  border-radius: 20px;
  line-height: 40px;
  background-color: rgba(177, 136, 75, 1);
}
.btn-left-right {
  vertical-align: middle;
}
.text-color-blue {
  color: rgba(18, 60, 3, 1);
}
.font-size {
  font-weight: 800;
  font-size: 14px;
}
.footer {
  padding-top: 90%;
  background: url(../assets/images/index/bot-BG.png) no-repeat center;
  background-size: 100% 100%;
  text-align: center;
}
.footer .red-color {
  color: rgba(199, 20, 25, 1);
  margin-top: 20px;
  font-weight: 800;
}
.map {
  width: 90%;
}
.title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 2px;
}
.small-title {
  font-size: 16px;
  font-weight: 800;
}
.small-text {
  font-size: 12px;
}
.yellow-text-color {
  color: rgba(177, 136, 75, 1);
}
</style>
