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
        this.customerInfo.phone = localStorage.getItem("phone");
        let id = localStorage.getItem("id");
        if (id !== null) {
          request({
            ...this.api.getCustomerInfo,
            urlReplacements: [{ substr: "{id}", replacement: id }]
          }).then(res => {
            if (res.success) {
              this.customerInfo.name = res.data.name;
              this.customerInfo.address = res.data.address;
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
    save() {
      if (this.disabled) {
        this.disabled = !this.disabled;
      } else {
        let params = this.customerInfo;
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
