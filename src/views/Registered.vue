<template>
  <div>
    <van-nav-bar title="设备注册" left-arrow @click-left="$router.push('/home')" />
    <div class="register">
      <div class="title">当前设备已注册，信息如下</div>
      <div class="item">
        <span class="titel">所属项目：</span>
        <span class="text">{{hotName}}</span>
      </div>
      <div class="item">
        <span class="titel">SN码：</span>
        <span class="text">{{deviceId}}</span>
      </div>
      <div class="item">
        <span class="titel">房间号：</span>
        <span class="text">{{roomId}}</span>
      </div>
      <div class="btns">
        <van-button class="btn" block color="#D4AD6A" @click="$router.push('/EquipmentRegister')">更新信息</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getStore } from '../assets/js/utils.js'
  import myMixin from '../assets/js/mixin.js'
  export default {
    mixins:[myMixin],
    data() {
      return {
        hotName: '',
        deviceId: getStore('deviceId'),
        roomId: ''
      }
    },
    created() {
      this.showDevice()
    },
   
    methods: {
      showDevice() {
        this.$http('/device/showDevice', {
          deviceId: this.deviceId
        }).then(res => {
          if (res.code == 200) {
            this.hotName = res.data.hotName;
            this.roomId = res.data.roomId;
          }
        })
      },
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