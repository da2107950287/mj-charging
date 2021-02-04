<template>
  <div>
    <van-nav-bar title="设备注册" left-arrow @click-left="$router.push('/home')" />
    <div class="register">
      <div class="title">{{msg}}</div>
      <div class="item">
        <span class="titel">所属项目：</span>
        <span class="text">{{info.hotName}}</span>
      </div>
      <div class="item">
        <span class="titel">SN码：</span>
        <span class="text">{{info.deviceId}}</span>
      </div>
      <div class="item">
        <span class="titel">房间号：</span>
        <span class="text">{{info.roomId}}</span>
      </div>
      <div class="item">
        <span class="titel">今日新注册：</span>
        <span class="text">{{info.registerNumber1}}</span>
      </div>
      <div class="item">
        <span class="titel">累计注册：</span>
        <span class="text">{{info.registerNumber2}}</span>
      </div>
      <div class="btns">
        <van-button class="btn" block color="#D4AD6A" @click="$router.push('/home')">完成</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getStore } from "../assets/js/utils.js"
  import myMixin from '../assets/js/mixin.js'
  export default {
    mixins: [myMixin],
    data() {
      return {
        info: this.$route.query,
        msg: '',
        isRegistered: getStore('isRegistered')
      }
    },
    created() {
      if (this.isRegistered == 1) {
        this.msg = '设备信息更新成功';
      } else if (this.isRegistered == 2) {
        this.msg = '设备注册成功';
      }
    },
  }
</script>

<style lang="scss" scoped>
  /deep/ .van-nav-bar .van-icon {
    color: #000;
  }

  .register {
    padding: 20px 30px;
  }

  .title {
    font-size: 18px;
    color: #000;
    line-height: 50px;
  }

  .item {
    font-size: 16px;
    line-height: 46px;

    .title {
      color: #000;
    }

    .text {

      color: #898989;
    }
  }

  .btns {
    margin-top: 135px;

    .btn {
      border-radius: 9px;
    }

  }
</style>