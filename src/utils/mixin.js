import request from "@/utils/request.js";
export default {
  data() {
    return {
      api: {
        // 民生银行参数解密
        cmbcDescrypt: {
          url: "/cmbc/descrypt",
          method: "post"
        },
        checkCustomer: {
          url: "/customers/check",
          method: "post"
        }
      }
    };
  },
  methods: {
    // 解密从民生银行跳转的连接参数
    cmbcDescrypt() {
      localStorage.clear();
      console.log("民生银行param===", this.$route.query.param);
      let params = {
        param: this.$route.query.param
      };
      if (params.param !== undefined) {
        localStorage.setItem("isLogin", 1);
        request({ ...this.api.cmbcDescrypt, params }).then(res => {
          if (res.data.success) {
            let info = res.data.data.split("|");
            localStorage.setItem("phone", info[0]);
            localStorage.setItem("cuserId", info[1]); // 银行客户id
            this.checkCustomer();
          }
        });
      } else {
        localStorage.setItem("isLogin", 0);
      }
    },
    // 验证客户身份
    checkCustomer() {
      let params = {
        cid: 1,
        cuserId: parseInt(localStorage.getItem("cuserId")),
        phone: localStorage.getItem("phone")
      };
      request({ ...this.api.checkCustomer, params }).then(res => {
        if (res.data.success) {
          console.log(res.data.data);
          localStorage.setItem("isVip", res.data.data.isVip);
          localStorage.setItem("id", res.data.data.code); // 商城用户ID
        }
      });
    }
  }
};
