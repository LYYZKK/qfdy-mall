<template>
  <div class="mainContent">
    <van-cell title="我的订单" is-link @click="goMyOrders" />
    <van-cell title="收货地址" is-link @click="goMyaddress" />
  </div>
</template>
<script>
import NavBar from '@/components/nav-bar.vue'
// import request from '@/utils/request.js'
import {
  Card,
  Icon,
  CellGroup,
  Cell,
  Button,
  ContactCard,
  ContactList,
  ContactEdit,
  Field,
  Notify,
  AddressEdit,
  Area,
  Popup
} from 'vant'
import areaList from '@/utils/area.js'
import mixin from '@/utils/mixin.js'
export default {
  name: 'Mine',
  mixins: [mixin],
  data() {
    return {
      areaList,
      addressShow: false,
      title: '个人中心',
      disabled: true,
      customerInfo: {
        name: '',
        tel: '',
        address: {
          province: '',
          city: '',
          county: '',
          addressDetail: ''
        },
        id: parseInt(localStorage.getItem('id'))
      },
      threeAddress: '',
      api: {
        getCustomerInfo: {
          url: '/customers/{id}',
          method: 'get'
        },
        modifyCustomerInfo: {
          url: '/customers',
          method: 'patch'
        }
      }
    }
  },
  methods: {
    goMyOrders() {
      this.$router.push({
        name: 'OrderList'
      })
    },
    goMyaddress() {
      localStorage.setItem('addressListFromPath', 'Mine')
      this.$router.push({
        name: 'AddressList'
      })
    },
    // getCustomerInfo() {
    //   let id = localStorage.getItem('id')
    //   if (id !== null) {
    //     request({
    //       ...this.api.getCustomerInfo,
    //       urlReplacements: [{ substr: '{id}', replacement: id }]
    //     }).then(res => {
    //       if (res.success) {
    //         this.customerInfo.name = res.data.name
    //         if (res.data.address !== '') {
    //           let address = JSON.parse(res.data.address)
    //           this.customerInfo.address.province = address.province
    //           this.customerInfo.address.city = address.city
    //           this.customerInfo.address.county = address.county
    //           this.customerInfo.address.addressDetail = address.addressDetail
    //           this.threeAddress =
    //             address.province === ''
    //               ? ''
    //               : address.province + '/' + address.city === ''
    //               ? ''
    //               : address.city + '/' + address.county === ''
    //               ? ''
    //               : address.county
    //         }
    //       }
    //     })
    //   }
    // },
    // saveAddress(val) {
    //   this.customerInfo.address.province = val[0].name
    //   this.customerInfo.address.city = val[1].name
    //   this.customerInfo.address.county = val[2].name
    //   this.threeAddress = val[0].name + '/' + val[1].name + '/' + val[2].name
    //   this.addressShow = false
    // },
    // cancelAddress() {
    //   this.addressShow = false
    // },
    // save() {
    //   let params = {
    //     id: this.customerInfo.id,
    //     name: this.customerInfo.name,
    //     phone: this.customerInfo.tel,
    //     address: JSON.stringify(this.customerInfo.address)
    //   }
    //   console.log(params)
    //   request({ ...this.api.modifyCustomerInfo, params }).then(res => {
    //     if (res.success) {
    //       this.disabled = !this.disabled
    //       Notify({
    //         message: '保存成功',
    //         type: 'success'
    //       })
    //     } else {
    //       Notify(res.message)
    //     }
    //   })
    // },
    // initPage
    initPage() {
      console.log(window.location.protocol + '//' + window.location.host + this.$route.path)
      let cmbcParam = this.$route.query.param
      let isLogin = localStorage.getItem('isLogin')
      if (!cmbcParam) {
        if (isLogin === '1') {
          // this.getCustomerInfo()
        } else {
          loginForComm(
            window.location.protocol + '//' + window.location.host + '/booking',
            window.location.protocol + '//' + window.location.host + this.$route.path
          )
        }
      } else {
        this.cmbcDescrypt()
        // this.getCustomerInfo()
      }
    }
  },
  computed: {
    // addressInfo() {
    //   console.log(this.customerInfo.address)
    //   return {
    //     name: this.customerInfo.name,
    //     tel: this.customerInfo.tel,
    //     province: this.customerInfo.address.province,
    //     city: this.customerInfo.address.city,
    //     county: this.customerInfo.address.county,
    //     addressDetail: this.customerInfo.address.addressDetail,
    //     areaCode: this.customerInfo.address.areaCode
    //   }
    // }
  },
  beforeMount() {
    this.setTitleBar('个人中心')
  },
  mounted() {
    this.initPage()
  },
  components: {
    NavBar,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [ContactCard.name]: ContactCard,
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Notify.name]: Notify,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [AddressEdit.name]: AddressEdit
  }
}
</script>

<style></style>
