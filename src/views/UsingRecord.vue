<template>
  <div class="record">
    <van-nav-bar title="订单详情" left-arrow @click-left="$router.go(-1)" />
    <div class="content">
      <div class="record-item">
        <div class="record-num common">
          <span class="record-title">订单号：</span>
          <span class="text">{{info.olId}}</span>
        </div>
        <div class="common">
          <span class="title">使用时长：</span>
          <span class="text">{{info.usertime}}</span>
        </div>
        <div class="common">
          <span class="title">创建时间：</span>
          <span class="text">{{info.olTime}}</span>
        </div>
        <div class="common">
          <span class="title">产生资费：</span>
          <span class="text">{{info.olPrice}}元</span>
        </div>
        <div class="common">
          <span class="title">订单状态：</span>
          <span class="text" v-if="info.olState==1">未支付</span>
          <span class="text" v-else-if="info.olState==2">使用中</span>
          <span class="text" v-else-if="info.olState==3">已完成</span>
          <span class="text" v-else-if="info.olState==4">已退款</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        olId: this.$route.query.olId,
        info: {}
      }
    },
    created() {
      this.showOrderlist()
    },
    methods: {
      //获取订单详情
      showOrderlist() {
        this.$http('/orderlist/showOrderlist', {
          olId: this.olId
        }).then(res => {
          if (res.code == 200) {
            this.info = {
              deviceId: res.data.deviceId,
              usertime: res.data.usertime,
              olTime: res.data.olTime,
              olPrice: res.data.olPrice,
              olState: res.data.olState,
              olId:res.data.olId
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .van-nav-bar .van-icon {
    color: #000;
  }

  .record {
    min-height: 100%;
    background: #F8F7F7;
  }

  .content {
    padding: 0 15px;

  }

  .record-item {
    padding: 0 15px 2px;
    margin-top: 15px;
    background: #fff;

    border-radius: 13px;
    margin-bottom: 15px;

    .common {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      line-height: 34px;

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

    .record-num {
      border-bottom: 1px solid #E3E3E3;
      line-height: 40px;

    }



  }
</style>