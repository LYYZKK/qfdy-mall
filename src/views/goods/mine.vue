<template>
  <div>
    <NavBar :title="title" />
    <div>
      <van-cell-group>
        <van-field v-model="customerInfo.name" label="姓名" left-icon="contact" />
        <van-field v-model="customerInfo.tel" label="手机号" left-icon="phone-o" disabled />
        <van-field v-model="threeAddress" label="省市区选择" left-icon="location-o" @click="addressShow=true" disabled/>
        <van-popup v-model="addressShow" position="bottom">
          <van-area :area-list="areaList" @confirm="saveAddress" @cancel="cancelAddress"/>
        </van-popup>
        <van-field
          v-model="customerInfo.address.addressDetail"
          label="详细地址"
          left-icon="location-o"
        />
      </van-cell-group>
    </div>
    <div class="mt">
      <van-button @click="save" size="large" color="red" text="保存"></van-button>
    </div>
    <!-- <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="save"
    /> -->
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
  AddressEdit,
  Area,
  Popup
} from "vant";
import areaList from '@/utils/area.js'
import mixin from "@/utils/mixin.js";
export default {
  name: "Mine",
  mixins: [mixin],
  data() {
    return {
      areaList,
      addressShow:false,
      title: "个人中心",
      disabled: true,
      customerInfo: {
        name: "",
        tel: "",
        address: {
          province:'',
          city:'',
          county:'',
          addressDetail:'',
        },
        id: parseInt(localStorage.getItem("id"))
      },
      threeAddress:'',
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
              this.threeAddress=address.province+'/'+address.city+'/'+address.county
              this.customerInfo.name = res.data.name;
              this.customerInfo.address.province = address.province;
              this.customerInfo.address.city = address.city;
              this.customerInfo.address.county = address.county;
              this.customerInfo.address.addressDetail = address.addressDetail;
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
    saveAddress(val){
      this.customerInfo.address.province = val[0].name
      this.customerInfo.address.city = val[1].name
      this.customerInfo.address.county = val[2].name
      this.threeAddress = val[0].name+'/'+val[1].name+'/'+val[2].name
      this.addressShow = false
    },
    cancelAddress(){
      this.addressShow = false
    },
    save() {
        let params = {
          id:this.customerInfo.id,
          name:this.customerInfo.name,
          phone:this.customerInfo.tel,
          address:JSON.stringify(this.customerInfo.address)
        }
        console.log(params)
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
    this.setTitleBarName();
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
    [Area.name]: Area,
    [Popup.name]: Popup,
    [AddressEdit.name]: AddressEdit,
  }
};
</script>

<style>
</style>
