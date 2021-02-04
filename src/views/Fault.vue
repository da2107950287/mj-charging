<template>
<div>
  <van-nav-bar title="故障选项" left-arrow @click-left="$router.push('/ChargeDetails')" />
  <div class="fault">
    <div class="item">
      <img src="../assets/img/fault1.png" alt="" @click="$router.push({path:'/ChargeDetails',query:{updatePassword:1}})">
      <div>如果输入密码无法开机，请点击此按钮，更换新密码</div>
    </div>
    <div class="item">
      <img src="../assets/img/fault2.png" @click="concatService">
      <div>如果设备出现故障，请联系客房服务，更换新的设备。</div>
    </div>
    <div class="item">
      <img src="../assets/img/fault3.png" @click="$router.push('/FailureReport')">
      <div>如果设备无法使用，请点击此按钮上报故障</div>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    methods: {
      concatService() {
        this.$dialog({ message: '请联系客服,更换新设备。' })
      }
    }
  }
</script>
<style lang="scss" scoped>
    /deep/ .van-nav-bar .van-icon {
    color: #000;
  }

  .fault {
    padding: 0 62px;
  }

  .item {
    text-align: center;
    padding: 40px 0 30px;

    img {
      width: 85px;
      height: 85px;
    }

    div {
      margin-top: 20px;
      font-size: 12px;
      color: #000;
    }
  }
</style>