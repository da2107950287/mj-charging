<template>
  <div class="order">
    <van-nav-bar title="我的订单" fixed left-arrow @click-left="$router.push('/home')" />
    <div class="content">
      <van-pull-refresh class="list" v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="暂无更多数据" @load="getOrderlist">
          <div class="order-item" v-for="item in list" :key="item.olId">
            <div class="order-num common">
              <span class="order-title">订单号：</span>
              <span class="text">{{item.olId}}</span>
            </div>
            <div class="common">
              <span class="title">使用时长：</span>
              <span class="text">{{item.usertime}}</span>
            </div>
            <div class="common">
              <span class="title">创建时间：</span>
              <span class="text">{{item.olTime}}</span>
            </div>
            <div class="status float-right">
              <span class="using" v-if="item.olState==1">未付款</span>
              <span class="using" v-else-if="item.olState==2">使用中</span>
              <span class="used" v-else-if="item.olState==3">已完成</span>
              <span class="used" v-else="item.olState==4">已退款</span>
            </div>
            <div class="info float-right" @click="$router.push({path:'/usingRecord',query:{olId:item.olId}})">查看详情</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
  import myMixin from '../assets/js/mixin.js'
  export default {
    mixins:[myMixin],
    data() {
      return {
        PageNumber: 1,
        PageSize: 10,
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        list: []
      }
    },
    methods: {
      getOrderlist() {
        this.loading = true;
        this.$http('/orderlist/getOrderlist', {
          PageNumber: this.PageNumber++,
          PageSize: this.PageSize
        }).then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.list = [...this.list, ...res.data];
            if (res.data.length == 0) {
              this.finished = true;
            }
          }
        })
      },
      onRefresh() {
        this.PageNumber = 1;
        this.isLoading = false;
        this.finished = false;
        this.list = []
        this.getOrderlist()
      }
    },
  }
</script>
<style lang="scss" scoped>
  /deep/ .van-nav-bar .van-icon {
    color: #000;
  }

  .order {
    min-height: 100%;
    background: #F8F7F7;




  }

  .content {
    min-height: 100%;
    padding: 46px 15px 0;
  }

  .list {
    min-height: 100%;

  }

  .order-item {
    padding: 0 15px;
    margin-top: 15px;
    background: #fff;

    border-radius: 13px;
    margin-bottom: 15px;

    .common {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      line-height: 32px;

      .order-title {
        color: #000;
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

    .order-num {
      border-bottom: 1px solid #E3E3E3;
      line-height: 40px;

    }

    .float-right {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      line-height: 32px;

      .using {
        color: #00C25F;
      }

      .used {

        color: #898989;
      }
    }

    .status {
      border-bottom: 1px solid #E3E3E3;
    }

    .info {

      color: #D4AD6A;
      line-height: 40px;
    }
  }
</style>