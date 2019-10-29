<template>
  <div class="mainContent">
    <NavBar :title="title" />
    <van-cell-group>
      <van-field v-model="customerInfo.name" label="姓名" left-icon="contact" />
      <van-field
        v-model="customerInfo.tel"
        label="手机号"
        left-icon="phone-o"
        type="tel"
        maxlength="11"
        placeholder="请输入您的收货号码"
        disabled
      />
      <van-field v-model="customerInfo.address" label="地址" left-icon="location-o" />
    </van-cell-group>
    <div class="mt">
      <van-button @click="save" size="large" color="red">保存</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar.vue";
import { Icon, CellGroup, Cell, Button, Field } from "vant";
export default {
  name: "Modify",
  data() {
    return {
      title: "修改个人信息",
      customerInfo: {
        name: "",
        tel: "",
        address: ""
      }
    };
  },
  components: {
    NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field
  }
};
</script>

<style>
</style>
