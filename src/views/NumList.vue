<template>
  <div>
    <van-nav-bar title="找回伯乐号" fixed left-arrow @click-left="$router.push('/findNum')" />
    <div class="num-list">
      <div class="logo-box">
        <div class="mgkc-logo"></div>
        <div>藏宝天下</div>
      </div>
      <div class="list">
        <div class="mobile-num">{{mobile}}下所有伯乐号</div>
        <div class="border">
          <div class="item-title">
            <div>姓名</div>
            <div>伯乐号</div>
            <div>注册时间</div>
          </div>
          <div  class="my-list">
            <van-pull-refresh class="my-list" v-model="isLoading" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" finished-text="" @load="getMemberNo">
                <div class="item" v-for="item in list" :key="item.id">
                  <div>{{item.fullname }}</div>
                  <div>{{item.username}}</div>
                  <div>{{item.createtime | formateTime}}</div>
                </div>
              </van-list>
              <div v-if="total==0" class="empty">该手机号码未注册伯乐号</div>
            </van-pull-refresh>
          </div>
        </div>
      </div>
      <div class="download-box">
        <div v-if="total==0" @click="$router.push('/cbtxRegister')">前往注册</div>
        <div v-else @click="$router.push('/cbtxLogin')">前往登录</div>
        <a v-if="type=='android'" :href="url1" download="" @click="downloadApp">下载App</a>
        <a v-else-if="type=='ios'" :href="url2" @click="downloadApp">下载APP</a>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import { setStore, getStore, isPhone } from "../assets/js/utils.js"
  export default {
    data() {
      return {
        type: '',//手机类型
        url1: '',//android下载地址
        url2: '',//ios下载地址
        pageNum: 0,
        pageSize: 4,
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        list: [],
        smsCode: this.$route.query.smsCode,
        mobile: this.$route.query.mobile,
        total: 0,
      }
    },
    filters: {
      formateTime(value) {
        return value.split(' ')[0]
      }
    },

    created() {
      let ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        this.type = "ios";
      } else if (/android/.test(ua)) {
        this.type = "android";
      }
    },
    methods: {
      downloadApp() {
        if (this.type == 'ios') {
          this.url2 = 'https://apps.apple.com/cn/app/id1481780101?l=zh&amp;ls=1'
        } else {
          this.url1 = 'http://app.mi.com/details?id=com.txcbapp&amp;ref=search'
        }
      },
      getMemberNo() {
        this.loading = true;
        let smsCode = this.smsCode.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, '')
        this.$http('/orderlist/getMemberNo', {
          mobile: this.mobile,
          smsCode,
          pageNum: ++this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.total = res.data.total;
          
            this.list = [...this.list, ...res.data.data];
            if (res.data.data.length == 0) {
              this.finished = true;
            }
          } else {
            this.loading = false;
            this.finished = true
            this.$toast.fail(res.msg)
          }
        })

      },
      //下拉刷新
      onRefresh() {
        this.pageNum = 0;
        this.isLoading = false;
        this.finished = false;
        this.list = []
        this.getMemberNo()
      }
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .van-nav-bar .van-icon {
    color: #000;
  }

  .img-box {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }

  .mgkc-logo {
    width: 89px;
    height: 89px;
    background-image: url(../assets/img/cbtx-logo.png);
    background-size: contain;

  }

  .border {
    border: 1px dotted #D4AD6A;
    margin-top: 16px;
    border-radius: 8px;
    height: 240px;
  }

  .empty {
    line-height: 160px;
    height: 200px;
    text-align: center;

    font-size: 14px;

    color: rgba(0, 0, 0, .4);

  }

  .list {
    padding: 0 43px;
  }


  .logo-box {
    padding-top: 66px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .num-list {

    .mobile-num {
      margin-top: 50px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }

    .item-title {
      font-size: 14px;
      display: flex;
      /* padding: 0 43px; */
      color: #000;

      >div {
        text-align: center;
        line-height: 40px;
        width: 33.33%;
      }
    }

    .item {
      display: flex;
      font-size: 14px;
      /* padding: 0 43px; */
      color: rgba(0, 0, 0, .4);

      >div {
        width: 33.33%;
        text-align: center;
        line-height: 40px;

      }
    }

  }

  .download-box {

    display: flex;
    justify-content: space-between;
    padding: 0 43px;

    div,
    a {
      font-size: 14px;
      color: #D4AD6A;
      margin-top: 50px;
    }
  }

  .my-list {
    height: 200px;
    overflow-y: scroll;
    
  }

</style>