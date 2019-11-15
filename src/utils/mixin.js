import request from "@/utils/request.js";
export default {
  data() {
    return {
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
    // 解密从民生银行跳转的连接参数
    cmbcDescrypt() {
      console.log("民生银行param===", this.$route.query.param);
      let params = {
        param: this.$route.query.param
      };
      if (params.param !== undefined) {
        request({ ...this.api.cmbcDescrypt, params }).then(res => {
          if (res.data.success) {
            // 移除除现货购买的其他参数
            if (
              localStorage.getItem("isLogin") ||
              localStorage.getItem("cuserId") ||
              localStorage.getItem("isVip") ||
              localStorage.getItem("id") ||
              localStorage.getItem("phone")
            ) {
              localStorage.removeItem("isLogin");
              localStorage.removeItem("cuserId");
              localStorage.removeItem("isVip");
              localStorage.removeItem("id");
              localStorage.removeItem("phone");
            }
            localStorage.setItem("isLogin", 1);
            let info = res.data.data.split("|");
            localStorage.setItem("phone", info[0]);
            localStorage.setItem("cuserId", info[1]); // 银行客户id
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
          localStorage.setItem("id", res.data.data.code); // 商城用户ID
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
