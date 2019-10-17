<template>
  <div>
    <NavBar :title="title" />
    <van-goods-action></van-goods-action>
    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" safe-area-inset-bottom>
      <span slot="default" class="ml">
        共计
        <span>1</span>件
      </span>
    </van-submit-bar>
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
  Button
} from "vant";
import NavBar from "@/components/nav-bar.vue";
export default {
  data() {
    return {
      checked: true,
      title: "提交订单",
      price: 3000
    };
  },
  methods: {
    onSubmit() {
      Dialog({ message: "支付中。。。" });
    },
    onClickButton() {
      Dialog({ message: "提交中。。。" });
    }
  },
  components: {
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [Dialog.Component.name]: Dialog.Component,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Button.name]: Button,
    NavBar
  }
};
</script>

<style>
</style>
