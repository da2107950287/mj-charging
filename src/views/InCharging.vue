<template>
  <div>
    <van-nav-bar title="充电详情" left-arrow @click-left="$router.push('/home')" />
    <div class="in-charging">
      <div class="in-charging-title">正在充电</div>
      <div class="item-title">消费详情</div>
      <div class="item">
        <span class="title">已充电：</span>
        <span class="text">{{usertime}}</span>
      </div>
      <div class="item">
        <span class="title">已付费用：</span>
        <span class="text">￥{{olPrice}}</span>
      </div>
      <div class="btns">
        <van-button class="btn" block color="#D4AD6A" @click="$router.push('/ChargeDetails')">继续使用</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getStore } from '../assets/js/utils.js'
  import myMixin from '../assets/js/mixin.js'
  export default {
    mixins: [myMixin],
    data() {
     
      return {
        usertime: '',
        olPrice: '',
        olId: getStore('olId')
      }
    },
    created() {
      this.showOrderlist()
    },
    methods: {
     showOrderlist() {
        this.$http('/orderlist/showOrderlist', {
          olId: this.olId,
        }).then(res => {
          if (res.code == 200) {
            this.usertime = res.data.usertime;
            this.olPrice = res.data.olPrice;
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

  .in-charging {
    padding: 0 30px;
  }

  .in-charging-title {
    text-align: center;
    font-size: 21px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    margin-top: 70px;
  }

  .item-title {

    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 48px;
    border-bottom: 1px solid #E3E3E3;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    line-height: 40px;

    .record-title {

      font-size: 14px;
      font-weight: 500;
      font-family: PingFangSC-Medium, PingFang SC;

    }

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