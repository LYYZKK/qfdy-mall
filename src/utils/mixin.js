import request from '@/utils/request.js'
export default {
  data() {
    return {
      webBaseUrl: process.env.HOME_PAGE_URL,
      appointBuyText: process.env.APPOINT_BUY ? '预购' : '预约',
      appointBuy: process.env.APPOINT_BUY,
      flag: false,
      isVip: parseInt(localStorage.getItem('isVip')),
      api: {
        // 民生银行参数解密
        cmbcDescrypt: {
          url: '/cmbc/descrypt',
          method: 'post'
        },
        checkCustomer: {
          url: '/customers/check',
          method: 'post'
        },

        // 访问次数增加
        linkAdd: {
          url: '/system/view-logs',
          method: 'post'
        }
      }
    }
  },
  methods: {
    // 跳转到linkmall的公共方法
    goToLinkMall() {
      let baseUrl = process.env.LINKED_MALL_BASE_URL
      let extJson = {
        bizId: process.env.LINKED_MALL_bizId,
        bizUid: localStorage.getItem('cuserId'),
        subBizPage: this.webBaseUrl + '/index?bankUserId=' + localStorage.getItem('cuserId') + '&cid=1',
        bankUserId: localStorage.getItem('cuserId'),
        userId: localStorage.getItem('userCode'),
        isVip: parseInt(localStorage.getItem('isVip')),
        cid: 1,
        timestamp: new Date().getTime()
      }
      const encodeURIData = {
        extJson: encodeURIComponent(JSON.stringify(extJson)),
        gotoUrl: process.env.LINKED_MALL_GOTO_URL
      }
      request({
        ...this.api.getSignature,
        params: { extJson: JSON.stringify(extJson) }
      }).then(res => {
        if (res.success) {
          let signature = res.data
          let openUrl =
            baseUrl +
            'extJson=' +
            encodeURIData.extJson +
            '&signature=' +
            signature +
            '&gotoUrl=' +
            encodeURIData.gotoUrl
          gotoShopUrl(openUrl)
        } else {
          console.log('获取签名失败')
        }
      })
    },
    // 获取签名
    getSign() {
      this.linkAdd(3)
      let isLogin = localStorage.getItem('isLogin')
      if (isLogin === '1') {
        this.goToLinkMall()
      } else {
        // eslint-disable-next-line no-undef
        // 未登录跳转到银行登录页面
        loginForComm(
          window.location.protocol + '//' + window.location.host + this.$route.path,
          window.location.protocol + '//' + window.location.host + this.$route.path
        )
      }
    },
    // 现货购买
    spotBuy() {
      // 点击过现货购买的标志
      let isLogin = localStorage.getItem('isLogin')
      if (isLogin === '1') {
        this.getSign()
      } else {
        localStorage.setItem('linkStatus', '1')
        this.getSign()
      }
    },
    // 解密从民生银行跳转的连接参数
    cmbcDescrypt() {
      let linkStatus = localStorage.getItem('linkStatus')
      if (linkStatus !== null) {
        localStorage.setItem('linkStatus', linkStatus)
      }

      let params = {}

      // 从 linkedmall 跳转过来时携带参数.
      if (this.$route.query.bankUserId && this.$route.query.cid) {
        localStorage.setItem('isLogin', 1)
        this.checkCustomer()
      } else if (this.$route.query.param === undefined || this.$route.query.param === null) {
        // 从银行 APP 直接进入, 未登录.
        localStorage.clear()
        localStorage.setItem('isLogin', 0)
      } else {
        // 已登录.
        params.param = this.$route.query.param
        localStorage.setItem('param', params.param)
        request({ ...this.api.cmbcDescrypt, params }).then(res => {
          if (res.success) {
            localStorage.setItem('isLogin', 1)
            let info = res.data.split('|')
            localStorage.setItem('phone', info[0])
            localStorage.setItem('cuserId', info[1]) // 银行客户id
            this.checkCustomer().then(() => {
              let isLogin = localStorage.getItem('isLogin')
              // 登录成功后自动跳转到linkMall
              if (isLogin === '1' && linkStatus === '1') {
                console.log('登录成功即将跳转到linkMall')
                localStorage.removeItem('linkStatus')
                this.goToLinkMall()
              }
            })
          }
        })
      }

      this.linkAdd(2)
    },
    // 验证客户身份
    checkCustomer() {
      let params = {
        cid: 1,
        cuserId: localStorage.getItem('cuserId') || null,
        phone: localStorage.getItem('phone') || null
      }
      return new Promise(resolve => {
        request({ ...this.api.checkCustomer, params }).then(res => {
          if (res.success) {
            localStorage.setItem('isVip', res.data.isVip)
            localStorage.setItem('id', res.data.id) // 商城用户ID
            localStorage.setItem('userCode', res.data.code)
            resolve(res.data)
          }
        })
      })
    },
    // 访问次数增加(首页)type:1,(现货购买)type:3,(期货购买)type:2
    linkAdd(type) {
      let params = {
        type,
        cid: 1,
        cuserId: localStorage.getItem('cuserId') || null,
        customerCode: localStorage.getItem('id') || null
      }
      request({ ...this.api.linkAdd, params }).then(res => {
        if (res.success) {
          console.log('访问次数加一成功')
        }
      })
    },
    // 修改银行标题的通用方法
    setTitleBar(titleName) {
      const jsonParam = {
        title: titleName,
        leftButton: {
          // 左按钮
          exist: 'true', // true:显示左按钮,false:也显示左按钮,客户端不调用左按钮的返回事件
          name: '返回', //  按钮的说明
          func: 'diyGoBack()' // 点击左按钮时,客户端回调服务器的方法
        },
        rightButton: {
          exist: 'false' // 不显示右按钮
        }
      }
      let timer = setInterval(() => {
        try {
          console.log('into try')
          setTitleBar(jsonParam)
          clearInterval(timer)
        } catch (error) {
          console.log('set title bar failed.')
        }
      }, 300)
    }
  }
}
