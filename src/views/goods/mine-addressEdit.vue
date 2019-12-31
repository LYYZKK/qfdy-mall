<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      :show-delete="showDetele"
      @save="onSave"
      :address-info="orginAddress"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast } from 'vant'
import areaList from '@/utils/area.js'
import mixin from '@/utils/mixin.js'
import request from '@/utils/request.js'
export default {
  mixins: [mixin],
  data() {
    return {
      areaList,
      showDetele: this.$route.params.id !== undefined ? true : false,
      saveParam: {
        customerId: parseInt(localStorage.getItem('id')),
        address: '',
        isDefault: 0,
        name: '',
        phone: '',
        zipCode: ''
      },
      orginAddress: {
        isDefault: 0,
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        areaCode: '',
        postalCode: '',
        addressDetail: ''
      },
      api: {
        addAddress: {
          url: 'customer-addressees',
          method: 'post'
        },
        updateAddress: {
          url: 'customer-addressees',
          method: 'patch'
        },
        deleteAddress: {
          url: 'customer-addressees/{ids}',
          method: 'delete'
        },
        searchAddress: {
          url: 'customer-addressees/{id}',
          method: 'get'
        }
      }
    }
  },
  methods: {
    addAddress(val) {
      request({ ...this.api.addAddress, params: val }).then(res => {
        if (res.success) {
          Toast.success('保存成功')
          this.$router.push({ name: 'AddressList' })
        } else {
          Toast.success(res.message)
        }
      })
    },
    updateAddress(val) {
      request({ ...this.api.updateAddress, params: val }).then(res => {
        if (res.success) {
          Toast.success('修改成功')
          this.$router.push({ name: 'AddressList' })
        } else {
          Toast.success(res.message)
        }
      })
    },
    searchAddress() {
      let id = this.$route.params.id
      request({ ...this.api.searchAddress, urlReplacements: [{ substr: '{id}', replacement: id }] }).then(res => {
        if (res.success) {
          let address = JSON.parse(res.data.address)
          this.orginAddress.name = res.data.name
          this.orginAddress.tel = res.data.phone
          this.orginAddress.province = address.province
          this.orginAddress.city = address.city
          this.orginAddress.county = address.county
          this.orginAddress.areaCode = address.areaCode
          this.orginAddress.isDefault = res.data.isDefault === 1 ? true : false
          this.orginAddress.postalCode = res.data.zipCode
          this.orginAddress.addressDetail = address.addressDetail
        }
      })
    },
    onSave(val) {
      let address = {
        addressDetail: val.addressDetail,
        areaCode: val.areaCode,
        province: val.province,
        city: val.city,
        county: val.county
      }
      this.saveParam.address = JSON.stringify(address)
      this.saveParam.name = val.name
      this.saveParam.isDefault = val.isDefault ? 1 : 0
      this.saveParam.phone = val.tel
      this.saveParam.zipCode = val.postalCode
      if (this.showDetele) {
        this.saveParam.id = this.$route.params.id
        this.updateAddress(this.saveParam)
      } else {
        this.addAddress(this.saveParam)
      }
    },
    onDelete() {
      let id = this.$route.params.id
      request({ ...this.api.deleteAddress, urlReplacements: [{ substr: '{ids}', replacement: id }] }).then(res => {
        if (res.success) {
          Toast.success('删除成功')
          this.$router.push({ name: 'AddressList' })
        } else {
          Toast.success(res.message)
        }
      })
    }
  },

  beforeMount() {
    this.setTitleBar('编辑收货地址')
  },
  mounted() {
    if (this.showDetele) {
      this.searchAddress()
    }
  },
  components: {
    [AddressEdit.name]: AddressEdit,
    [Toast.name]: Toast
  }
}
</script>

<style>
</style>
