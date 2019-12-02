<template>
  <div>
    <NavBar :title="title" />
    <!-- <div>
      <van-cell-group>
        <van-field v-model="customerInfo.name" label="姓名" left-icon="contact" :disabled="disabled" />
        <van-field v-model="customerInfo.phone" label="手机号" left-icon="phone-o" disabled />
        <van-field
          v-model="customerInfo.address"
          label="地址"
          left-icon="location-o"
          :disabled="disabled"
        />
      </van-cell-group>
    </div>
    <div class="mt">
      <van-button @click="save" size="large" color="red" :text="disabled?'编辑':'保存'"></van-button>
    </div> -->
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="save"
    />
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
import request from "@/utils/request.js";
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
  AddressEdit
} from "vant";
import areaList from '@/utils/area.js'
import mixin from "@/utils/mixin.js";
export default {
  name: "Mine",
  mixins: [mixin],
  data() {
    return {
      areaList,
      title: "我的",
      disabled: true,
      customerInfo: {
        name: "",
        tel: "",
        address: {
          province:'',
          city:'',
          country:'',
          addressDetail:'',
          areaCode:'',
        },
        id: parseInt(localStorage.getItem("id"))
      },
      api: {
        getCustomerInfo: {
          url: "/customers/{id}",
          method: "get"
        },
        modifyCustomerInfo: {
          url: "/customers",
          method: "patch"
        }
      }
    };
  },
  methods: {
    getCustomerInfo() {
      let isLogin = localStorage.getItem("isLogin");
      if (isLogin === "1") {
        this.customerInfo.tel = localStorage.getItem("phone");
        let id = localStorage.getItem("id");
        if (id !== null) {
          request({
            ...this.api.getCustomerInfo,
            urlReplacements: [{ substr: "{id}", replacement: id }]
          }).then(res => {
            if (res.success) {
              let address = JSON.parse(res.data.address)
              console.log(address)
              this.customerInfo.name = res.data.name;
              this.customerInfo.address.province = address.province;
              this.customerInfo.address.city = address.city;
              this.customerInfo.address.county = address.county;
              this.customerInfo.address.addressDetail = address.addressDetail;
              this.customerInfo.address.areaCode = address.areaCode;
            }
          });
        }
      } else {
        // 查看我的
        localStorage.setItem("mineStatus", 1);
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
    save(val) {
      // if (this.disabled) {
      //   this.disabled = !this.disabled;
      // } else {
        console.log(val)
        let params = {
          id:this.customerInfo.id,
          name:this.customerInfo.name,
          phone:this.customerInfo.tel,
          address:JSON.stringify({
            province:val.province,
            city:val.city,
            county:val.county,
            addressDetail:val.addressDetail,
            areaCode:val.areaCode
          })
        }
        request({ ...this.api.modifyCustomerInfo, params }).then(res => {
          if (res.success) {
            this.disabled = !this.disabled;
            Notify({
              message: "修改成功",
              type: "success"
            });
          } else {
            Notify(res.message);
          }
        });
      }
    // }
  },
  computed:{
    addressInfo(){
      console.log(this.customerInfo.address)
      return {
        name:this.customerInfo.name,
        tel:this.customerInfo.tel,
        province:this.customerInfo.address.province,
        city:this.customerInfo.address.city,
        county:this.customerInfo.address.county,
        addressDetail:this.customerInfo.address.addressDetail,
        areaCode:this.customerInfo.address.areaCode,
      }
    }
  },
  beforeMount() {
    this.setTitleBarName("个人中心");
  },
  mounted() {
    this.getCustomerInfo();
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
    [AddressEdit.name]: AddressEdit,
  }
};
</script>

<style>
</style>
