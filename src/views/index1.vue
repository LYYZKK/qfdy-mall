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
          <van-col
            span="10"
            class="btn-buy text-center text-color-white"
            @click="spotBuy"
          >
            <van-row class="buy" type="flex" justify="center" align="center">
              <van-image :src="left" class="btn-left-right icon-width" />
              <van-col class="font-size" style="letter-spacing:2px;"
                >大米现货</van-col
              >
              <van-icon name="arrow" class="icon-width" />
            </van-row>
          </van-col>
          <van-col span="10" class="btn-buy text-center text-color-white">
            <van-row class="buy" type="flex" justify="center" align="center">
              <van-image :src="right" class="btn-left-right icon-width" />
              <van-col class="font-size" style="letter-spacing:2px;"
                >稻田预购</van-col
              >
              <van-icon name="arrow" class="icon-width" />
            </van-row>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="4" class="text-center text-color-blue"></van-col>
          <van-col span="4" class="text-center text-color-blue font-size"
            >天然</van-col
          >
          <van-col span="4" class="text-center text-color-blue font-size"
            >绿色</van-col
          >
          <van-col span="4" class="text-center text-color-blue font-size"
            >原生态</van-col
          >
          <van-col span="4" class="text-center text-color-blue"></van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col
            span="4"
            class="text-center text-color-blue font-size"
          ></van-col>
          <van-col span="4" class="text-center text-color-blue font-size"
            >新鲜</van-col
          >
          <van-col span="4" class="text-center text-color-blue font-size"
            >活米</van-col
          >
          <van-col span="4" class="text-center text-color-blue font-size"
            >人人爱</van-col
          >
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
        <div class="small-text yellow-text-color">
          从种子到餐桌8个环节99道工序
        </div>
        <div class="title text-color-blue">全程可溯源</div>
        <div class="small-text yellow-text-color">专属管家服务</div>
        <div class="small-text yellow-text-color">每月一次鲜米配送</div>
      </div>
      <div class="mt">
        <div class="title text-color-blue">咱家</div>
        <div class="small-title text-color-blue">在东北那旮沓有块地</div>
        <div class="small-text yellow-text-color">2分地产100斤</div>
        <div class="small-text yellow-text-color">
          2分地为1单元 可成倍数认购
        </div>
      </div>
      <div class="mt">
        <div class="small-title yellow-text-color">高端大气上档次</div>
        <div class="title text-color-blue">送礼相当有面</div>
      </div>
      <div class="small-text text-color-blue mb mt">
        全国统一服务热线：400-1002753
      </div>
    </div>
  </div>
</template>
<script>
import { Image, Row, Col, Dialog, Button, Icon } from "vant";
import request from "@/utils/request.js";
import map from "@/assets/images/index/map.png";
import riceText from "@/assets/images/index/rice-text.png";
import left from "@/assets/images/index/btn-buy1.png";
import right from "@/assets/images/index/btn-buy2.png";
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
          bankUserId: parseInt(localStorage.getItem("cuserId")),
          userId: parseInt(localStorage.getItem("id")),
          isVip: parseInt(localStorage.getItem("isVip")),
          cid: this.customerInfo.cid,
          timestamp: new Date().getTime()
        };
        let gotoUrl =
          "https%3a%2f%2fpages.tmall.com%2fwow%2fwt%2fact%2fqiaofudayuan%3fwh_biz%3dtm%26env%3dwapa";
        const encodeURIData = {
          extJson: encodeURIComponent(JSON.stringify(extJson)),
          gotoUrl: gotoUrl
        };
        request({
          ...this.api.getSignature,
          params: { extJson: JSON.stringify(extJson) }
        }).then(res => {
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
            console.log(openUrl);
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
      this.linkAdd(2);
      this.$router.push({ path: "/home" });
    },
    // 现货购买
    spotBuy() {
      this.linkAdd(3);
      this.getSign();
    },

    initPage() {
      this.cmbcDescrypt();
    }
  },
  mounted() {
    this.initPage();
  },
  components: {
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
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
  background-size: 100% 100%;
  overflow: hidden;
  padding: 5px 3px;
}
.btn-buy .buy {
  border-radius: 8px;
  line-height: 40px;
  background-color: #c71419;
}
.btn-left-right {
  vertical-align: middle;
  /* margin-right: 10px; */
}
.icon-width {
  width: 20px;
  margin: 0 5px;
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

<!-- 不是所有的五常大米 -->
<!-- <van-row class="bg-long pd3">
      <van-col class="pd1 text-align-center">
        <img :src="images.title3" alt width="80%" />
      </van-col> -->
<!-- <van-col class="img-flex pd">
        <img :src="images.img3_1" alt width="25%" />
        <img :src="images.img3_2" alt width="25%" />
        <img :src="images.img3_3" alt width="25%" />
        <img :src="images.img3_4" alt width="25%" />
      </van-col> -->
<!-- <van-row class="pd">
        <van-col class="margin-top-20">
          <img :src="images.poter" alt="" />&nbsp;
          <img :src="images.text3_1" alt width="60%" />
        </van-col>
        <van-col class="margin-top-5 text-color-eee">
          <div>
            每一粒米都有身份象征，从种子到餐桌8个环节99道工序全程可溯源。
          </div>
        </van-col>
        <van-col class="margin-top-20">
          <img :src="images.poter" alt="" />&nbsp;
          <img :src="images.text3_2" alt width="60%" />
        </van-col>
        <van-col class="margin-top-5 text-color-eee">
          <div>
            黑土地，山泉水，原生态及留胚鲜米技术造就五常核心产区大米独一无二的品质。
          </div>
        </van-col>
        <van-col class="margin-top-20">
          <img :src="images.poter" alt="" />&nbsp;
          <img :src="images.text3_3" alt width="60%" />
        </van-col>
        <van-col class="margin-top-5 text-color-eee">
          <div>
            世界先进恒温仓储技术；保留大米活性营养；富含多种人体所需要微量元素。
          </div>
        </van-col>
        <van-col class="margin-top-20">
          <img :src="images.poter" alt="" />&nbsp;
          <img :src="images.text3_4" alt width="60%" />
        </van-col>
        <van-col class="margin-top-5 text-color-eee">
          <div>
            私享管家；仓储保鲜；每月一次鲜米免费配送服务。
          </div>
        </van-col>
      </van-row> -->
<!-- </van-row> -->
