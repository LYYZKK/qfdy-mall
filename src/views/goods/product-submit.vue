<template>
  <div class="mainContent">
    <!-- <NavBar :title="title" /> -->
    <div>
      <div class="border">
        <van-row type="flex" justify="space-around" align="center">
          <van-col span="2">
            <div class="round bg-color">
              <van-icon name="location-o" color="#fff" />
            </div>
          </van-col>
          <!-- 默认用户信息 -->
          <van-col span="18">
            <div>
              <van-row>
                <van-col>
                  <span>{{ customerInfo.name }}</span>
                  <span class="text-color-999">{{ customerInfo.phone }}</span>
                </van-col>
              </van-row>
              <div class="text-color-999 font-size-10">
                <span>{{ customerInfo.address.province }}{{ customerInfo.address.city }}{{ customerInfo.address.county }}{{ customerInfo.address.addressDetail }}</span>
              </div>
              <div class="text-color-yellow">完善的信息方便后期接收快递</div>
            </div>
          </van-col>
          <van-col @click="editeAddress(customerInfo)">
            <van-icon name="edit" color="rgba(255, 66, 0, 1)" />
          </van-col>
        </van-row>
      </div>
      <van-row class="border">
        <van-col span="24">
          <van-card
            :centered="centered"
            :title="good.name+'('+good.specification+')'"
            :price="good.price/100"
          ></van-card>
        </van-col>
        <van-col span="24">
          <van-cell-group>
            <van-cell :title="appointBuyText + '数量'" value="内容">
              <van-stepper v-model="order.count" />
            </van-cell>
            <van-col span="24">
              <van-field v-model="order.mark" placeholder="请输入备注" rows="1" autosize label="备注" />
            </van-col>
            <van-col span="24">
              <van-switch-cell v-model="orderInvoice.isInvoice" title="发票" @change="switchChange" />
            </van-col>
            <van-col span="24" @click="orderInvoiceShow=true" v-if="orderInvoice.isInvoice">
              <van-cell>
                <van-tag round color="rgba(0,0,0,.1)" text-color="#000">查看发票详情</van-tag>
              </van-cell>
            </van-col>
          </van-cell-group>
        </van-col>
      </van-row>
    </div>
    <van-submit-bar :price="totalPrice" button-text="提交" @submit="onSubmit" safe-area-inset-bottom>
      <div slot="default" class="ml text-color-ccc">
        共计
        <span style="color:#000;">{{ order.count }}</span>&nbsp;件
      </div>
    </van-submit-bar>
    <van-dialog v-model="show" title="确认付款" show-cancel-button @confirm="submit" @cancel="cancel">
      <h1 class="text-center">￥{{ totalPrice / 100 }}</h1>
    </van-dialog>
    <!-- 再次确认取消 -->
    <van-dialog
      v-model="cancelShow"
      title="您确认取消吗？"
      show-cancel-button
      @confirm="canselSure"
      @cancel="cancelShow = false"
    >
      <h1 class="text-center">￥{{ totalPrice / 100 }}</h1>
    </van-dialog>
    <!-- 发票信息 -->
    <van-action-sheet v-model="orderInvoiceShow" title="发票" safe-area-inset-bottom>
      <div class="invoiceBody">
        <div class="title">发票抬头</div>
        <div>
          <span
            class="selectBtn"
            :class="orderInvoice.type===1?'btnActive':''"
            @click="orderInvoice.type=1"
          >个人</span>
          <span
            class="selectBtn"
            :class="orderInvoice.type===2?'btnActive':''"
            @click="orderInvoice.type=2"
          >单位</span>
        </div>
        <!-- 企业 -->
        <div v-if="orderInvoice.type===2">
          <div class="title">企业信息</div>
          <van-cell-group>
            <van-field
              v-model="orderInvoice.businessName"
              placeholder="请填写单位名称"
              label="单位名称"
              :clearable="true"
              @clear="clearBusinessName"
              @input="checkBusinessName"
              :error-message="businessNameMessage"
            />
            <van-field
              v-model="orderInvoice.taxId"
              placeholder="请填写纳税人识别号"
              label="纳税人识别号"
              :clearable="true"
              :error-message="taxMessage"
              @clear="clearTax"
              @input="checkTax"
            />
          </van-cell-group>
        </div>
        <div class="title">收票人信息</div>
        <!-- 个人 -->
        <van-cell-group>
          <van-field
            v-model="orderInvoice.phone"
            placeholder="可通过手机号在发票服务平台查询"
            label="收票人手机号"
            :error-message="phoneMessage"
            :clearable="true"
            @clear="clearPhone"
            @input="checkPhone"
          />
          <van-field
            v-model="orderInvoice.email"
            placeholder="用来接收电子发票的邮箱"
            label="收票人邮箱"
            @clear="clearMail"
            @input="checkMail"
            :error-message="emailMessage"
            :clearable="true"
          />
        </van-cell-group>
        <div class="title">发票内容</div>
        <div class="content">本店默认开具增值税普通电子发票，在您提交订单时，请务必核对好发票信息，订单中发票抬头一经确认将不支持修改。</div>
        <van-button
          type="primary"
          size="large"
          color="linear-gradient(to right,#ee0a24,#ff6034)"
          round
          @click="invoiceSure"
        >确定</van-button>
      </div>
    </van-action-sheet>
    <van-popup v-model="addressShow" position="bottom" :overlay="true" round>
      <van-area :area-list="areaList" @confirm="saveAddress" @cancel="cancelAddress" />
    </van-popup>
  </div>
</template>

<script>
import {
  SubmitBar,
  Checkbox,
  Dialog,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Button,
  ActionSheet,
  Row,
  Col,
  Icon,
  Card,
  Stepper,
  Field,
  Cell,
  CellGroup,
  Toast,
  AddressEdit,
  Area,
  Popup,
  Notify,
  SwitchCell,
  Tag
} from 'vant'
import NavBar from '@/components/nav-bar.vue'
import request from '@/utils/request.js'
import mixin from '@/utils/mixin.js'
import areaList from '@/utils/area.js'
export default {
  mixins: [mixin],
  data() {
    return {
      orderInvoiceShow: false,
      phoneMessage: '',
      emailMessage: '',
      businessNameMessage: '',
      taxMessage: '',
      checkMessage: false,
      areaList,
      threeAddress: '',
      cancelShow: false,
      addressShow: false,
      userShow: false,
      show: false,
      checked: true,
      isDefaultAddress: '',
      // 地址列表为空
      isAddressNull: false,
      title: '确认订单',
      good: {
        name: '',
        price: '',
        description: '',
        mark: ''
      },
      centered: true,
      order: {
        price: 0,
        count: 0
      },
      orderId: '',
      customerInfo: {
        name: '',
        phone: '',
        address: {
          province: '',
          city: '',
          county: '',
          areaCode: '',
          addressDetail: ''
        }
      },
      // 发票信息
      orderInvoice: {
        type: 1,
        taxId: '',
        businessName: '',
        email: '',
        isInvoice: false,
        name: '',
        phone: ''
      },
      api: {
        getGoodById: {
          url: '/products/{id}',
          method: 'get'
        },
        // 新增订单
        addOrder: {
          url: '/orders',
          method: 'post'
        },
        // 获取客户的地址列表
        getAddressList: {
          url: 'customer-addressees',
          method: 'get'
        },
        searchAddress: {
          url: 'customer-addressees/{id}',
          method: 'get'
        },
        // 获取客户信息
        getCustomerInfo: {
          url: '/customers/{id}',
          method: 'get'
        },
        cancelOrder: {
          url: '/orders/{id}/cancel',
          method: 'patch'
        },
        payOrder: {
          url: '/orders/{id}/pay',
          method: 'patch'
        },
        // 保存客户地址信息
        modifyCustomerInfo: {
          url: '/customers',
          method: 'patch'
        }
      }
    }
  },
  methods: {
    // 获取客户的地址信息
    getAddressList() {
      let goodParam = localStorage.getItem('goodParam')
      let addressId
      if (goodParam) {
        goodParam = JSON.parse(goodParam)
        addressId = goodParam.addressId
      } else {
        addressId = this.$route.params.addressId
      }

      if (addressId) {
        request({ ...this.api.searchAddress, urlReplacements: [{ substr: '{id}', replacement: addressId }] }).then(
          res => {
            if (res.success) {
              let address = JSON.parse(res.data.address)
              this.customerInfo.name = res.data.name
              this.customerInfo.phone = res.data.phone
              this.customerInfo.address.province = address.province
              this.customerInfo.address.city = address.city
              this.customerInfo.address.county = address.county
              this.customerInfo.address.addressDetail = address.addressDetail
              this.customerInfo.address.areaCode = address.areaCode
            }
          }
        )
      } else {
        let params = {
          customerId: parseInt(localStorage.getItem('id'))
        }
        request({ ...this.api.getAddressList, params }).then(res => {
          if (res.success) {
            if (res.data.length > 0) {
              res.data.forEach((element, index) => {
                element.address = JSON.parse(element.address)
                if (element.isDefault === 1) {
                  this.isDefaultAddress = index
                }
              })
              if (this.isDefaultAddress !== '') {
                this.customerInfo.name = res.data[this.isDefaultAddress].name
                this.customerInfo.phone = res.data[this.isDefaultAddress].phone
                this.customerInfo.address.province = res.data[this.isDefaultAddress].address.province
                this.customerInfo.address.city = res.data[this.isDefaultAddress].address.city
                this.customerInfo.address.county = res.data[this.isDefaultAddress].address.county
                this.customerInfo.address.areaCode = res.data[this.isDefaultAddress].address.areaCode
                this.customerInfo.address.addressDetail = res.data[this.isDefaultAddress].address.addressDetail
                this.customerInfo.id = res.data[this.isDefaultAddress].id
              }
            } else {
              this.isAddressNull = true
            }
          }
        })
      }
    },
    editeAddress(val) {
      let goodParam = localStorage.getItem('goodParam')
      let param
      if (goodParam) {
        goodParam = JSON.parse(goodParam)
        param = {
          good: goodParam.good,
          order: goodParam.order,
          addressId: goodParam.addressId
        }
        localStorage.removeItem('goodParam')
      } else {
        param = {
          good: this.$route.params.good,
          order: this.order,
          addressId: val.id
        }
      }
      localStorage.setItem('addressListFromPath', 'ProductSubmit')
      localStorage.setItem('goodParam', JSON.stringify(param))
      this.$router.push({
        name: 'AddressList'
      })
    },
    // 获取商品详情
    getGoodById() {
      let goodParam = localStorage.getItem('goodParam')
      if (goodParam) {
        this.good = JSON.parse(goodParam).good
        this.order = JSON.parse(goodParam).order
      } else {
        let info = this.$route.params.good
        let order = this.$route.params.good
        this.good = info
        this.order.count = order.selectedNum
        console.log('good===', info)
      }
    },
    saveAddress(val) {
      this.customerInfo.address.province = val[0].name
      this.customerInfo.address.city = val[1].name
      this.customerInfo.address.county = val[2].name
      this.threeAddress = val[0].name + '/' + val[1].name + '/' + val[2].name
      this.addressShow = false
    },
    cancelAddress() {
      this.addressShow = false
    },
    // 提交生成订单
    onSubmit() {
      if (this.orderInvoice.isInvoice) {
        if (!this.checkMessage) {
          Notify('发票信息不完善')
          return
        }
      }
      if (
        this.customerInfo.phone !== '' &&
        this.customerInfo.name !== '' &&
        this.customerInfo.address.province !== '' &&
        this.customerInfo.address.city !== '' &&
        this.customerInfo.address.county !== '' &&
        this.customerInfo.address.addressDetail !== ''
      ) {
        let params = {
          customerId: parseInt(localStorage.getItem('id')),
          totalAmount: this.totalPrice / 100,
          orderProducts: [
            {
              productId: this.good.productId,
              productNum: this.order.count,
              specificationId: this.good.id
            }
          ],
          mark: this.order.mark,
          orderAddressee: {
            address: JSON.stringify(this.customerInfo.address),
            name: this.customerInfo.name,
            phone: this.customerInfo.phone
          },
          orderInvoice: {
            type: this.orderInvoice.type,
            taxId: this.orderInvoice.taxId,
            businessName: this.orderInvoice.businessName,
            email: this.orderInvoice.email,
            isInvoice: this.orderInvoice.isInvoice ? 1 : 0,
            name: this.orderInvoice.name,
            phone: this.orderInvoice.phone
          }
        }
        request({ ...this.api.addOrder, params }).then(res => {
          if (res.success) {
            this.orderId = res.data.id
            this.show = true
          } else {
            Toast({
              message: res.message,
              icon: 'warning-o'
            })
          }
        })
      } else {
        Notify('请完善地址信息')
        return
      }
    },
    // 确定支付
    submit() {
      request({
        ...this.api.payOrder,
        urlReplacements: [{ substr: '{id}', replacement: this.orderId }]
      }).then(res => {
        if (res.success) {
          if (res.data !== '') {
            let info = res.data
            alert('即将调起圈存 info===' + info)
            submitOrderForCashNew(info, 'wuchang')
          }
          // Toast({
          //   message: '恭喜您预定成功!',
          //   icon: 'like-o'
          // })
          // this.$router.push({
          //   name: 'OrderDetail',
          //   query: { id: this.orderId }
          // })
        }
      })
    },
    // 取消支付
    cancel() {
      this.cancelShow = true
    },
    // 再次确认取消支付
    canselSure() {
      request({
        ...this.api.cancelOrder,
        urlReplacements: [{ substr: '{id}', replacement: this.orderId }]
      }).then(res => {
        if (res.success) {
          this.$router.push({
            name: 'OrderDetail',
            query: { id: this.orderId }
          })
        }
      })
    },
    getOrder() {
      console.log(this.$route.params)
      // let info = this.$route.params
      // if (JSON.stringify(this.$route.params) === '{}') {
      //   info = JSON.parse(localStorage.getItem('goodParam'))
      // }
      // this.order.price = info.price
      // this.order.count = info.selectedNum
      this.getGoodById()
    },
    switchChange(val) {
      if (val) {
        this.orderInvoiceShow = true
      }
    },
    // 发票信息
    invoiceSure() {
      this.checkAll()
      if (this.checkMessage) {
        this.orderInvoiceShow = false
        this.checkMessage = true
      } else {
        this.checkMessage = false
      }
    },
    clearPhone() {
      this.phoneMessage = '手机号不能为空'
    },
    clearMail() {
      this.emailMessage = '邮箱不能为空'
    },
    clearTax() {
      this.taxMessage = '纳税人识别号不能为空'
    },
    clearBusinessName() {
      this.businessNameMessage = '单位名称不能为空'
    },
    checkMail() {
      if (this.orderInvoice.email !== '') {
        this.emailMessage = ''
        let MAIL_REGEXP = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!MAIL_REGEXP.test(this.orderInvoice.email)) {
          this.emailMessage = '邮箱格式错误'
          return false
        } else {
          this.emailMessage = ''
          return true
        }
      } else {
        this.emailMessage = '邮箱不能为空'
        return false
      }
    },
    checkPhone() {
      if (this.orderInvoice.phone !== '') {
        this.phoneMessage = ''
        let TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        if (!TEL_REGEXP.test(this.orderInvoice.phone)) {
          this.phoneMessage = '手机号格式错误'
          return false
        } else {
          this.phoneMessage = ''
          return true
        }
      } else {
        this.phoneMessage = '手机号不能为空'
        return false
      }
    },
    checkBusinessName() {
      if (this.orderInvoice.businessName !== '') {
        this.businessNameMessage = ''
        return true
      } else {
        this.businessNameMessage = '单位名称不能为空'
        return false
      }
    },
    checkTax() {
      if (this.orderInvoice.taxId !== '') {
        this.taxMessage = ''
        return true
      } else {
        this.taxMessage = '纳税人识别号不能为空'
        return false
      }
    },
    checkAll() {
      // 如果开发票
      if (this.orderInvoice.isInvoice) {
        this.checkPhone()
        this.checkMail()
        if (this.orderInvoice.type === 2) {
          this.checkBusinessName()
          this.checkTax()
          if (this.checkBusinessName() && this.checkTax() && this.checkMail() && this.checkPhone()) {
            this.checkMessage = true
          } else {
            this.checkMessage = false
          }
        } else if (this.orderInvoice.type === 1) {
          if (this.checkMail() && this.checkPhone()) {
            this.checkMessage = true
          } else {
            this.checkMessage = false
          }
        }
      }
    }
  },
  computed: {
    totalPrice() {
      return this.good.price * this.order.count
    }
  },
  beforeMount() {
    this.setTitleBar('确认订单')
  },
  mounted() {
    this.getOrder()
    this.getAddressList()
  },
  components: {
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [Dialog.Component.name]: Dialog.Component,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Stepper.name]: Stepper,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [AddressEdit.name]: AddressEdit,
    [Notify.name]: Notify,
    [SwitchCell.name]: SwitchCell,
    [Tag.name]: Tag,
    NavBar
  }
}
</script>

<style scoped lang="less">
.invoiceBody {
  padding: 10px;
  .title {
    font-size: 14px;
    font-weight: 800;
    margin: 10px;
  }
  .content {
    color: #323233;
    padding: 0 10px 10px 10px;
    font-size: 12px;
  }
  .selectBtn {
    display: inline-block;
    padding: 5px 30px;
    margin: 0 10px;
    border: 1px solid #eee;
    border-radius: 20px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
  }
  .btnActive {
    color: #ee0a24;
    border-color: #ee0a24;
  }
}
</style>
