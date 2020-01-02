<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      :default-tag-text="defaultText"
      @add="onAdd"
      @edit="onEdit"
      @select="selectDefault"
    ></van-address-list>
  </div>
</template>

<script>
import { AddressList, Toast } from 'vant'
import mixin from '@/utils/mixin.js'
import request from '@/utils/request.js'
export default {
  mixins: [mixin],
  data() {
    return {
      chosenAddressId: '',
      addressListFromPath: '',
      defaultText: '默认',
      api: {
        getAddressList: {
          url: 'customer-addressees',
          method: 'get'
        },
        updateAddress: {
          url: 'customer-addressees',
          method: 'patch'
        },
        searchAddress: {
          url: 'customer-addressees/{id}',
          method: 'get'
        }
      },
      addressList: []
    }
  },
  methods: {
    // 获取用户的地址列表
    getAddressList() {
      let params = {
        customerId: parseInt(localStorage.getItem('id'))
      }
      request({ ...this.api.getAddressList, params }).then(res => {
        res.data.forEach(element => {
          let address = JSON.parse(element.address)
          element.address = address.province + address.city + address.county + address.addressDetail
          element.province = address.province
          element.city = address.city
          element.county = address.county
          element.addressDetail = address.addressDetail
          element.areaCode = address.areaCode
          element.tel = element.phone
          if (element.isDefault === 1) {
            this.chosenAddressId = element.id
          }
        })
        this.addressList = res.data
      })
    },
    selectDefault(val) {
      let addressListFromPath = localStorage.getItem('addressListFromPath')
      if (addressListFromPath === 'ProductSubmit') {
        let goodParam = localStorage.getItem('goodParam')

        if (goodParam) {
          goodParam = JSON.parse(goodParam)
          let paramInfo = {
            good: goodParam.good,
            order: goodParam.order,
            orderInvoice: goodParam.orderInvoice,
            addressId: val.id
          }
          localStorage.removeItem('goodParam')
          this.$router.push({
            name: 'ProductSubmit',
            params: paramInfo
          })
        }
      } else if (addressListFromPath === 'Mine') {
        val.isDefault = 1
        let params = {
          isDefault: val.isDefault,
          customerId: parseInt(localStorage.getItem('id')),
          id: val.id
        }
        request({ ...this.api.updateAddress, params }).then(res => {
          if (res.success) {
            Toast.success('设置默认收货人成功')
            this.getAddressList()
          } else {
            Toast.success(res.message)
          }
        })
      }
    },
    onAdd() {
      this.$router.push({
        name: 'AddressEdit'
      })
    },

    onEdit(item) {
      this.$router.push({
        name: 'AddressEdit',
        params: { id: item.id }
      })
    }
  },
  beforeMount() {
    this.setTitleBar('地址管理')
  },
  mounted() {
    this.getAddressList()
  },
  components: {
    [AddressList.name]: AddressList,
    [Toast.name]: Toast
  }
}
</script>

<style>
</style>
