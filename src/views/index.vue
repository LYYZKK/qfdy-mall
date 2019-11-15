<template>
  <div class="bg-color">
    <!-- 顶部 -->
    <van-row type="flex" justify="space-between" align="center" class="top">
      <van-image :src="images.logo" width="50%"></van-image>
      <van-col class="font-size-12">
        <span class="nav">首页</span>
        <span class="nav">定制稻田</span>
        <span class="nav" @click="spotBuy">现货抢购</span>
      </van-col>
    </van-row>
    <!-- 视频 -->
    <van-row>
      <!-- <video
        id="video"
        width="100%"
        height="100%"
        x5-video-player-fullscreen="true"
        x5-playsinline
        playsinline
        webkit-playsinline
        preload="auto"
        :poster="images.video"
        :src="images.movie"
      ></video> -->
      <img :src="images.video" alt width="100%" />
      <img :src="images.text_img" alt width="100%" />
    </van-row>
    <!-- main -->
    <!-- 定制专属稻田 -->
    <van-row class="pd">
      <van-col class="pd1">
        <img :src="images.title1" alt width="100%" />
      </van-col>
      <van-col>
        <img :src="images.img1" alt width="100%" />
      </van-col>
    </van-row>
    <van-row class="text-color-yellow pd">
      <van-col class="margin-top-20 pd">
        <img :src="images.text1" alt width="50%" />
      </van-col>
      <van-col :span="24" class="pd">
        <img :src="images.poter" alt="" />
        <span class="margin-top-5">&nbsp;私享管家</span>
      </van-col>
      <van-col :span="24" class="pd">
        <img :src="images.poter" alt="" />
        <span class="margin-top-5">&nbsp;仓储保险</span>
      </van-col>
      <van-col :span="24" class="pd">
        <img :src="images.poter" alt="" />
        <span class="margin-top-5">&nbsp;每月一次鲜米免费配送服务</span>
      </van-col>
      <van-col :span="24" class="pd">
        <img :src="images.poter" alt="" />
        <span class="margin-top-5">&nbsp;七天无理由退订</span>
      </van-col>
    </van-row>
    <van-row class="buy_btn">
      <van-col class="left">
        <div>点击预约</div>
      </van-col>
      <van-col class="right">
        <img :src="images.buy" alt="" />
      </van-col>
    </van-row>
    <!-- 现货抢购 -->
    <van-row class="pd">
      <van-col class="pd1">
        <img :src="images.title2" alt width="100%" />
      </van-col>
      <van-col>
        <img :src="images.img2" alt width="100%" />
      </van-col>
    </van-row>
    <van-row class="text-color-yellow pd">
      <van-col class="margin-top-bottom pd">
        <img :src="images.text2" alt width="50%" />
      </van-col>
      <van-col :span="24" class="pd">
        <img :src="images.poter" />
        <span>&nbsp;采用世界领先恒温仓储技术</span>
      </van-col>
      <van-col :span="24" class="pd">
        <img :src="images.poter" alt="" />
        <span class="margin-top-5">&nbsp;保持水分&nbsp;留住营养</span>
      </van-col>
    </van-row>
    <van-row class="buy_btn" @click="spotBuy">
      <van-col class="left">
        <div>点击尝鲜</div>
      </van-col>
      <van-col class="right">
        <img :src="images.buy" alt="" />
      </van-col>
    </van-row>
    <!-- 官方出品 -->
    <van-row>
      <van-col class="pd1">
        <img :src="images.title4" alt width="100%" />
      </van-col>
      <van-col class="margin-bottom-20">
        <img :src="images.img4" alt width="100%" />
      </van-col>
      <van-row class="text-align-center text-color-yellow pd2 margin-bottom-20">
        <img :src="images.text4" width="50px;" />
        <div>
          民生银行联合五常市政府、阿里云推出了“五常大米专属定制稻田”项目。
        </div>
      </van-row>
      <van-row gutter="10" class="pd">
        <van-col span="12">
          <img :src="images.img4_1" alt width="100%" />
        </van-col>
        <van-col span="12">
          <img :src="images.img4_2" alt width="100%" />
        </van-col>
      </van-row>
      <van-row gutter="10" class="pd margin-top-5">
        <van-col span="12">
          <img :src="images.img4_3" alt width="100%" />
        </van-col>
        <van-col span="12">
          <img :src="images.img4_4" alt width="100%" />
        </van-col>
      </van-row>
    </van-row>
    <van-row class="text-align-center text-color-yellow pd2 margin-top-20">
      <img :src="images.text5" alt width="50px;" />
      <div>
        “第二届国际大米节金奖”、“中国国家地理标志产品”、“中国十大好吃米饭”、被《舌尖上的中国》评为“中国最好的稻米”。
      </div>
    </van-row>
    <!-- 尊贵礼遇 -->
    <van-row>
      <van-col class="pd1">
        <img :src="images.title5" alt width="100%" />
      </van-col>
      <van-col>
        <img :src="images.img5" alt width="100%" />
      </van-col>
    </van-row>
    <van-row class="text-align-center pd1">
      <img :src="images.icon" alt />
    </van-row>
  </div>
</template>

<script>
import { Image, Row, Col, Dialog, Button, Icon } from "vant";
import request from "@/utils/request.js";
import mixin from "@/utils/mixin.js";
import logo from "@/assets/images/new/LOGO.png";
import video from "@/assets/images/new/video.png";
import text_img from "@/assets/images/new/text-img.png";
import text1 from "@/assets/images/new/text-1.png";
import text2 from "@/assets/images/new/text-2.png";
import text3_1 from "@/assets/images/new/text-3-1.png";
import text3_2 from "@/assets/images/new/text-3-2.png";
import text3_3 from "@/assets/images/new/text-3-3.png";
import text3_4 from "@/assets/images/new/text-3-4.png";
import text4 from "@/assets/images/new/text-4.png";
import text5 from "@/assets/images/new/text-5.png";
import title1 from "@/assets/images/new/title-1.png";
import title2 from "@/assets/images/new/title-2.png";
import title3 from "@/assets/images/new/title-3.png";
import title4 from "@/assets/images/new/title-4.png";
import title5 from "@/assets/images/new/title-5.png";
import img1 from "@/assets/images/new/img-1.png";
import img2 from "@/assets/images/new/img-2.png";
import img3_1 from "@/assets/images/new/img-3-1.png";
import img3_2 from "@/assets/images/new/img-3-2.png";
import img3_3 from "@/assets/images/new/img-3-3.png";
import img3_4 from "@/assets/images/new/img-3-4.png";
import img4 from "@/assets/images/new/img-4.png";
import img4_1 from "@/assets/images/new/img-4-1.png";
import img4_2 from "@/assets/images/new/img-4-2.png";
import img4_3 from "@/assets/images/new/img-4-3.png";
import img4_4 from "@/assets/images/new/img-4-4.png";
import img5 from "@/assets/images/new/img-5.png";
import icon from "@/assets/images/new/bot-icon.png";
import movie from "@/assets/images/new/movie.mp4";
import poter from "@/assets/images/new/poter.png";
import buy from "@/assets/images/new/buy.png";
export default {
  name: "Index",
  mixins: [mixin],
  data() {
    return {
      images: {
        logo,
        video,
        text_img,
        text1,
        text2,
        text3_1,
        text3_2,
        text3_3,
        text3_4,
        text4,
        text5,
        title1,
        title2,
        title3,
        title4,
        title5,
        img1,
        img2,
        img3_1,
        img3_2,
        img3_3,
        img3_4,
        img4,
        img4_1,
        img4_2,
        img4_3,
        img4_4,
        img5,
        icon,
        movie,
        poter,
        buy
      },
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
    // 跳转到linmall的公共方法
    goToLinkMall() {
      let baseUrl = process.env.LINKED_MALL_BASE_URL;
      let extJson = {
        bizId: process.env.LINKED_MALL_bizId,
        bizUid: process.env.LINKED_MALL_bizUid,
        bankUserId: parseInt(localStorage.getItem("cuserId")),
        userId: parseInt(localStorage.getItem("id")),
        isVip: parseInt(localStorage.getItem("isVip")),
        cid: 1,
        timestamp: new Date().getTime()
      };
      const encodeURIData = {
        extJson: encodeURIComponent(JSON.stringify(extJson)),
        gotoUrl: process.env.LINKED_MALL_GOTO_URL
      };
      request({
        ...this.api.getSignature,
        params: { extJson: JSON.stringify(extJson) }
      }).then(res => {
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
          // gotoShopUrl(openUrl);
          window.open(openUrl);
        } else {
          console.log("获取签名失败");
        }
      });
    },
    // 获取签名
    getSign() {
      let isLogin = localStorage.getItem("isLogin");
      if (isLogin === "1") {
        this.goToLinkMall();
      } else {
        // 点击过现货购买的标志
        localStorage.setItem("linkStatus", 1);
        // eslint-disable-next-line no-undef
        // 未登录跳转到银行登录页面
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
    let isLogin = localStorage.getItem("isLogin");
    let linkStatus = localStorage.getItem("linkStatus");
    if (isLogin === "1" && linkStatus === "1") {
      localStorage.removeItem("linkStatus");
      this.goToLinkMall();
    }
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

<style scoped lang="less">
.bg-color {
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  background: url(../assets/images/new/bg.png) no-repeat;
}
.bg-long {
  margin: 20px 0;
  background: url(../assets/images/new/bg-2.png) no-repeat;
  background-size: 100% auto;
}
.top {
  padding: 20px 15px;
}
.font-size-12 {
  font-size: 14px;
}
.nav {
  display: inline-block;
  margin: 0 0 0 5px;
}
.pd {
  padding: 0 15px;
}
.pd1 {
  padding: 50px 0 30px 0;
}
.pd2 {
  width: 80%;
  margin: 0 auto;
}
.pd3 {
  padding: 80px 0;
}
.margin-top-5 {
  display: inline-block;
  margin-top: 10px;
}
.img-flex {
  display: flex;
  justify-content: space-between;
}
.text-color-yellow {
  color: #ffdd95;
  font-size: 14px;
}
.text-align-center {
  text-align: center;
}
.margin-top-bottom {
  margin: 15px 0;
}
.margin-top-20 {
  margin-top: 20px;
}
.text-color-eee {
  color: #666;
}
.buy_btn {
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  align-items: center;
  .left {
    background-color: red;
    padding: 5px;
    border-radius: 8px 0 0 8px;
  }
  .right {
    background-color: yellow;
    padding: 5px;
    border-radius: 0px 8px 8px 0px;
  }
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
</style>
