<template>
  <div class="bg-color">
    <!-- 顶部 -->
    <van-row type="flex" justify="space-between" align="center" class="top">
      <van-image :src="images.logo" width="40%"></van-image>
      <van-col class="font-size-12 bg-blue" @click="prePurchase">
        <img :src="images.fresh_icon" alt width="12px;" />
        <span class="nav">定制稻田</span>
      </van-col>
      <van-col class="font-size-12 bg-blue" @click="spotBuy">
        <img :src="images.fresh_icon" alt width="12px;" />
        <span class="nav">现货抢购</span>
      </van-col>
    </van-row>
    <van-row>
      <!-- 视频 -->
      <div class="videoDemo">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          :events="events"
          @fullscreenchange="onPlayerFullScreenchange($event)"
        ></video-player>
      </div>
      <!-- <img :src="images.video" alt width="100%" /> -->
      <img :src="images.text_img" alt width="100%" />
    </van-row>
    <!-- main -->
    <!-- 专属定制稻田 -->
    <van-row class="pd">
      <van-col class="pd1">
        <img :src="images.title" alt width="100%" />
      </van-col>
      <van-col>
        <img :src="images.img1" alt width="100%" />
      </van-col>
    </van-row>
    <van-row class="text-color-yellow pd">
      <van-col class="margin-top-20">
        <img :src="images.dream" alt width="50%" />
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" alt width="10px" />
        <span class="margin-top-5">&nbsp;私享管家</span>
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" alt width="10px" />
        <span class="margin-top-5">&nbsp;仓储保鲜</span>
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" alt width="10px" />
        <span class="margin-top-5">&nbsp;每月一次鲜米免费配送服务</span>
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" alt width="10px" />
        <span class="margin-top-5">&nbsp;七天无理由退订</span>
      </van-col>
    </van-row>
    <van-row class="buy_btn" @click="prePurchase">
      <van-col class="left">点击预约 >></van-col>
      <van-col class="right">
        <img :src="images.buy" alt />
      </van-col>
    </van-row>
    <!-- 尝鲜价限购 -->
    <van-row class="pd">
      <van-col class="pd1">
        <img :src="images.title1" alt width="100%" />
      </van-col>
    </van-row>
    <van-col></van-col>
    <van-row gutter="10" class="pd">
      <van-col span="12">
        <img :src="images.img1_1" alt width="100%" />
      </van-col>
      <van-col span="12">
        <img :src="images.img1_2" alt width="100%" />
      </van-col>
    </van-row>
    <van-row class="text-color-yellow pd">
      <van-col class="margin-top-20">
        <img :src="images.text1" alt width="50%" />
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" alt width="10px" />
        <span class="margin-top-5">&nbsp;为让您第一时间吃到五常核心产区鲜米，现开通现货购买渠道</span>
      </van-col>
    </van-row>
    <van-row class="text-align-center margin-bottom-20 margin-top-20">
      <img :src="images.fresh" alt width="80%" />
    </van-row>
    <van-row class="buy_btn" @click="spotBuy">
      <van-col class="left">点击尝鲜 >></van-col>
      <van-col class="right">
        <img :src="images.buy" alt />
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
      <van-col class="margin-top-bottom">
        <img :src="images.text2" alt width="50%" />
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" width="10px" />
        <span>&nbsp;采用世界领先恒温仓储技术</span>
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" alt width="10px" />
        <span class="margin-top-5">&nbsp;保持水分&nbsp;留住营养</span>
      </van-col>
      <van-col :span="24" class="font-size-12">
        <img :src="images.poter" alt width="10px" />
        <span class="margin-top-5">&nbsp;一年一季稻</span>
      </van-col>
    </van-row>
    <van-row class="buy_btn" @click="spotBuy">
      <van-col class="left">现货购买 >></van-col>
      <van-col class="right">
        <img :src="images.buy" alt />
      </van-col>
    </van-row>
    <!-- 官方出品 -->
    <van-row>
      <van-col class="pd1 text-align-center">
        <img :src="images.title4" alt width="70%" class />
      </van-col>
      <van-col class="margin-bottom-20">
        <img :src="images.img4" alt width="100%" />
      </van-col>
      <van-row class="text-align-center text-color-yellow pd2 margin-bottom-20">
        <img :src="images.text4" width="40px" class="margin-bottom-10" />
        <div>民生银行联合五常市政府、阿里云推出了“五常大米专属定制稻田”项目。</div>
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
      <img :src="images.text5" alt width="40px;" class="margin-bottom-10" />
      <div>“第二届国际大米节金奖”、“中国国家地理标志产品”、“中国十大好吃米饭”、被《舌尖上的中国》评为“中国最好的稻米”。</div>
    </van-row>
    <!-- 尊贵礼遇 -->
    <van-row>
      <van-col class="pd1 text-align-center">
        <img :src="images.title5" alt width="80%" />
      </van-col>
      <van-col>
        <img :src="images.img5" alt width="100%" />
      </van-col>
    </van-row>
    <van-row class="buy_btn" @click="spotBuy">
      <van-col class="left">现货购买 >></van-col>
      <van-col class="right">
        <img :src="images.buy" alt />
      </van-col>
    </van-row>
    <van-row class="text-align-center margin-bottom-20">
      <img :src="images.icon" alt style="width:30px" />
    </van-row>
  </div>
</template>

<script>
import { Image, Row, Col, Dialog, Button, Icon, Toast } from "vant";
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
import title from "@/assets/images/new/title.png";
import dream from "@/assets/images/new/dream.png";
import title1 from "@/assets/images/new/title-1.png";
import title2 from "@/assets/images/new/title-2.png";
import title3 from "@/assets/images/new/title-3.png";
import title4 from "@/assets/images/new/title-4.png";
import title5 from "@/assets/images/new/title-5.png";
import img1 from "@/assets/images/new/img-1.png";
import img1_1 from "@/assets/images/new/img-1-1.png";
import img1_2 from "@/assets/images/new/img-1-2.png";
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
import fresh from "@/assets/images/new/fresh.png";
import fresh_icon from "@/assets/images/new/fresh-icon.png";
export default {
  name: "Index",
  mixins: [mixin],
  data() {
    return {
      videoDialogVisible: false,
      events: ["fullscreenchange"],
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
        title,
        dream,
        title1,
        title2,
        title3,
        title4,
        title5,
        img1,
        img1_1,
        img1_2,
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
        poter,
        buy,
        fresh,
        fresh_icon
      },
      customerInfo: {
        cid: 1,
        cuserId: "",
        phone: ""
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: "auto",
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        sources: [
          {
            type: "video/mp4",
            src: movie
          }
        ],
        width: document.documentElement.clientWidth,
        poster: video,
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: false
        }
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
    // 视频处理
    onPlayerFullScreenchange(player) {
      // 强制退出全屏，恢复正常大小
      player.exitFullscreen();
      this.videoDialogVisible = true;
    },
    // 预约购买
    prePurchase() {
      let param = this.$route.query.param;
      if (param !== null) {
        localStorage.setItem("param", param);
      }
      console.log(param);
      this.linkAdd(2);
      this.$router.push({ path: "/home" });
    },
    // 现货购买
    spotBuy() {
      this.linkAdd(3);
      // 点击过现货购买的标志
      let isLogin = localStorage.getItem("isLogin");
      if (isLogin === "1") {
        this.getSign();
      } else {
        localStorage.setItem("linkStatus", "1");
        this.getSign();
      }
    },
    setTitle() {
      const jsonParam = {
        title: "五常大米现货",
        leftButton: {
          // 左按钮
          exist: "true", // true:显示左按钮,false:也显示左按钮,客户端不调用左按钮的返回事件
          name: "返回", //  按钮的说明
          func: "goBack()" // 点击左按钮时,客户端回调服务器的方法
        },
        rightButton: {
          exist: "false" // 不显示右按钮
        }
      };
      let timer = setInterval(() => {
        console.log('into')
        try {
          console.log('into try')
          setTitleBar(jsonParam);
          clearInterval(timer);
        } catch (error) {
          console.log("set title bar failed.");
        }
      }, 300);
    },
    initPage() {
      this.cmbcDescrypt();
    }
  },
  beforeMount() {
    console.log('into setTitle')
    // this.setTitle();
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
    [Toast.name]: Toast,
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
  .vjs-custom-skin > .video-js .vjs-big-play-button {
    font-size: 2em !important;
  }
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
  font-size: 12px;
}
.nav {
  display: inline-block;
  margin: 0 0 0 5px;
}
.pd {
  padding: 0 10px;
}
.pd1 {
  padding: 50px 0 30px 0;
}
.pd2 {
  width: 90%;
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
  img {
    width: 50%;
    height: auto;
  }
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
  width: 40%;
  margin: 20px auto;
  color: #fff;
  font-size: 13px;
  position: relative;
  background-color: red;
  border-radius: 6px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  box-sizing: border-box;
  .left {
    width: 100%;
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #dbab57;
    border-radius: 0px 6px 6px 0px;
    line-height: 30px;
    padding: 0 5px;
    & > img {
      width: 15px;
    }
  }
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.videoDemo {
  display: block;
  width: 100%;
  height: auto;
  text-align: center;
}
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}
.vjs-custom-skin > .video-js .vjs-big-play-button {
  font-size: 20px;
  line-break: 20px;
}
.font-size-30 {
  font-size: 30px;
  color: #ffdd95;
}
.letter-sapce-2 {
  letter-spacing: 2px;
  font-size: 12px;
}
.letter-sapce-15 {
  letter-spacing: 11px;
  font-size: 12px;
}
.bg-blue {
  padding: 2px 8px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  background-color: rgba(0, 104, 183, 1);
  color: #fff;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
</style>
