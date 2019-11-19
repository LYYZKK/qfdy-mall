import request from "@/utils/request.js";
import { link } from "fs";
export default {
  data() {
    return {
      imgBaseUrl: "https://mall.wuchangdami.qiaofudayuan.net:8001",
      flag: false,
      api: {
        // 民生银行参数解密
        cmbcDescrypt: {
          url: "/cmbc/descrypt",
          method: "post"
        },
        checkCustomer: {
          url: "/customers/check",
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
    // 跳转到linmall的公共方法
    goToLinkMall() {
      let baseUrl = process.env.LINKED_MALL_BASE_URL;
      let extJson = {
        bizId: process.env.LINKED_MALL_bizId,
        bizUid: process.env.LINKED_MALL_bizUid,
        bankUserId: parseInt(localStorage.getItem("cuserId")),
        userId: parseInt(localStorage.getItem("userCode")),
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
          gotoShopUrl(openUrl);
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
    // 解密从民生银行跳转的连接参数
    cmbcDescrypt() {
      console.log("民生银行param===", this.$route.query.param);
      let params = {
        param: this.$route.query.param
      };
      let linkStatus = localStorage.getItem("linkStatus");
      console.log(linkStatus);
      if (linkStatus !== null) {
        localStorage.clear();
        localStorage.setItem("linkStatus", linkStatus);
      } else {
        localStorage.clear();
      }
      if (params.param !== undefined) {
        request({ ...this.api.cmbcDescrypt, params }).then(res => {
          if (res.data.success) {
            localStorage.setItem("isLogin", 1);
            let info = res.data.data.split("|");
            localStorage.setItem("phone", info[0]);
            localStorage.setItem("cuserId", info[1]); // 银行客户id
            let isLogin = localStorage.getItem("isLogin");
            let linkStatus = localStorage.getItem("linkStatus");
            if (isLogin === "1" && linkStatus === "1") {
              localStorage.removeItem("linkStatus");
              this.goToLinkMall();
            }
          }
          this.checkCustomer();
        });
      } else if (this.$route.query.bankUserId && this.$route.query.cid) {
        localStorage.removeItem("isLogin");
        localStorage.setItem("isLogin", 1);
        this.checkCustomer();
      } else {
        localStorage.setItem("isLogin", 0);
        this.checkCustomer();
      }
    },
    // 验证客户身份
    checkCustomer() {
      console.log(localStorage.getItem("cuserId"));
      let params = {
        cid: 1,
        cuserId: parseInt(localStorage.getItem("cuserId")) || null,
        phone: localStorage.getItem("phone") || null
      };
      request({ ...this.api.checkCustomer, params }).then(res => {
        if (res.data.success) {
          console.log(res.data.data);
          localStorage.setItem("isVip", res.data.data.isVip);
          localStorage.setItem("id", res.data.data.id); // 商城用户ID
          localStorage.setItem("userCode", res.data.data.code);
        }
      });
      this.linkAdd(1);
    },
    // 访问次数增加(首页)type:1,(现货购买)type:2,(期货购买)type:3
    linkAdd(type) {
      let params = {
        type,
        cid: 1,
        cuserId: localStorage.getItem("cuserId") || null,
        customerCode: localStorage.getItem("id") || null
      };
      request({ ...this.api.linkAdd, params }).then(res => {
        if (res.data.success) {
          console.log("访问次数加一成功");
        }
      });
    }
  }
};
