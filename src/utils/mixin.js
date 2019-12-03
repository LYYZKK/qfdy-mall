import request from "@/utils/request.js";
export default {
  data() {
    return {
      webBaseUrl: "https://mall.wuchangdami.qiaofudayuan.net:8001",
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
    // 跳转到linkmall的公共方法
    goToLinkMall() {
      let baseUrl = process.env.LINKED_MALL_BASE_URL;
      let extJson = {
        bizId: process.env.LINKED_MALL_bizId,
        bizUid: localStorage.getItem("cuserId"),
        subBizPage:this.webBaseUrl+'/index?bankUserId='+localStorage.getItem('cuserId')+'&cid=1',
        bankUserId: localStorage.getItem("cuserId"),
        userId: localStorage.getItem("userCode"),
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
        if (res.success) {
          let signature = res.data;
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
      let purchaseStatus = localStorage.getItem("purchaseStatus");
      let mineStatus = localStorage.getItem("mineStatus");
      if (linkStatus !== null) {
        localStorage.setItem("linkStatus", linkStatus);
      } else {
        if (purchaseStatus !== null) {
          localStorage.setItem("purchaseStatus", purchaseStatus);
        } else {
          if(mineStatus!==null){
            localStorage.setItem("mineStatus", mineStatus);
          }
        }
      }
      if (params.param !== undefined) {
        request({ ...this.api.cmbcDescrypt, params }).then(res => {
          if (res.success) {
            localStorage.setItem("isLogin", 1);
            let info = res.data.split("|");
            localStorage.setItem("phone", info[0]);
            localStorage.setItem("cuserId", info[1]); // 银行客户id
          }
          this.checkCustomer().then(()=>{
            let isLogin = localStorage.getItem('isLogin')
            // 登录成功后自动跳转到linkMall
            if (isLogin === "1" && linkStatus === "1") {
              console.log('登录成功即将跳转到linkMall')
              localStorage.removeItem("linkStatus");
              this.goToLinkMall();
            }
            // 登录成功后自动跳转到商品详情页
            if (isLogin === "1" && purchaseStatus !== null) {
              console.log('登录成功即将跳转到商品详情页')
              let purchaseId = parseInt(localStorage.getItem("purchaseStatus"));
              localStorage.removeItem("purchaseStatus");
              gotoShopUrl(this.webBaseUrl +'/product-detail/'+ purchaseId);
            }
            // 登录后自动跳转到当前客户信息页面
            if (isLogin === "1" && mineStatus === '1') {
              console.log('登录成功即将跳转到客户信息详情页')
              localStorage.removeItem("mineStatus");
              gotoShopUrl(this.webBaseUrl+'/mine');
            }
          });

        });
      } else if (this.$route.query.bankUserId && this.$route.query.cid) {
        localStorage.setItem("isLogin", 1);
        this.checkCustomer();
      } else {
        localStorage.setItem("isLogin", 0);
        this.linkAdd(1)
      }
    },
    // 验证客户身份
    checkCustomer() {
      console.log(localStorage.getItem("cuserId"));
      let params = {
        cid: 1,
        cuserId: localStorage.getItem("cuserId") || null,
        phone: localStorage.getItem("phone") || null
      };
      const p = new Promise(resolve => {
        request({ ...this.api.checkCustomer, params }).then(res => {
          if (res.success) {
            console.log('checkCustomer success with res =' + JSON.stringify(res.data))

            localStorage.setItem('isVip', res.data.isVip)
            localStorage.setItem('id', res.data.id) // 商城用户ID
            localStorage.setItem('userCode', res.data.code)

            resolve()
          }
        })
      })
      this.linkAdd(1);
      return p
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
        if (res.success) {
          console.log("访问次数加一成功");
        }
      });
    },
  }
};
