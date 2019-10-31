<template>
  <div>
    <NavBar :title="title" />
    <div>
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
    </div>
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
  Notify
} from "vant";
export default {
  name: "Mine",
  data() {
    return {
      title: "我的",
      disabled: true,
      customerInfo: {
        name: "",
        phone: "",
        address: "",
        id: ""
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
      this.customerInfo.phone = localStorage.getItem("phone");
      this.customerInfo.id = localStorage.getItem("id");
      let id = localStorage.getItem("id");
      if (id) {
        request({
          ...this.api.getCustomerInfo,
          urlReplacements: [{ substr: "{id}", replacement: id }]
        }).then(res => {
          if (res.data.success) {
            this.customerInfo.name = res.data.data.name;
            this.customerInfo.address = res.data.data.address;
          }
        });
      }
    },
    save() {
      if (this.disabled) {
        this.disabled = !this.disabled;
      } else {
        let params = this.customerInfo;
        request({ ...this.api.modifyCustomerInfo, params }).then(res => {
          if (res.data.success) {
            this.disabled = !this.disabled;
            Notify("修改成功");
            localStorage.removeItem("phone");
            localStorage.setItem("phone", res.data.data.phone);
          } else {
            Notify(res.data.message);
          }
        });
      }
    }
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
    [Notify.name]: Notify
  }
};
</script>

<style>
</style>
