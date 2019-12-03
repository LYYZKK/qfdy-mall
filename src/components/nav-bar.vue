<template>
  <div class="bar" v-if="show">
    <van-nav-bar :title="title" :left-arrow="left" @click-left="onClickLeft" class="nav-bar" :border="false"/>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "NavBar",
  components: {
    [NavBar.name]: NavBar
  },
  data() {
    return {};
  },

  methods: {
    onClickLeft() {
      if (this.$route.name === "Product") {
        let param = localStorage.getItem("param");
        if (param) {
          this.$router.push({ path: "/index", query: { param } });
        } else {
          this.$router.push({ path: "/index" });
        }
      } else if (this.$route.name === "OrderDetail") {
        this.$router.push({ name: "OrderList" });
      } else if (this.$route.name === "OrderList") {
        this.$router.push({ name: "Product" });
      } else {
        this.$router.go(-1);
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return true;
      }
    },
    title: {
      type: String,
      default: ""
    },
    left: {
      type: Boolean,
      default() {
        return true;
      }
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
.bar {
  width: 100%;
  height: 70px;
  background-color:#313c5c;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .nav-bar{
    height: 50px;
    margin-top:20px;
    line-height: 50px;
    background-color:#313c5c;
    color: #fff;
  }
  .van-nav-bar__title{
    color: rgba(255,255,255,.8);
  }
  .van-nav-bar {
    .van-icon{
      color: rgba(255,255,255,.8);
    }
  }
}
</style>
