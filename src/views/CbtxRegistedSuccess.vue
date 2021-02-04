<template>
  <div class="success">
    <div class="success-top">
      <img src="../assets/img/confirm.png" alt="">
      <div>注册成功</div>
    </div>
    <div class="num">您的伯乐号：{{memberNo}}</div>
    <div>
      <div class="tip">提示：伯乐号将作为登录唯一号，请牢记</div>
      <div class="btns">
        <van-button class="btn" block color="#D4AD6A" @click="$router.push('/ChargeDetails')">完成</van-button>
      </div>
      <a v-if="type=='android'" :href="url1"  class="download-app"  download="" @click="downloadApp">下载App</a>
      <a v-else-if="type=='ios'" :href="url2"  class="download-app"  @click="downloadApp">下载APP</a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        memberNo: '',
        type:'',
        url1:'',
        url2:''
      }
    },
    created() {
      this.memberNo = this.$route.query.memberNo;
      let ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        this.type = "ios";
      } else if (/android/.test(ua)) {
        this.type = "android";
      }
    },
    methods:{
      downloadApp() {
        if (this.type == 'ios') {
          this.url2 = 'https://apps.apple.com/cn/app/id1481780101?l=zh&amp;ls=1'
        } else {
          this.url1 = 'http://app.mi.com/details?id=com.txcbapp&amp;ref=search'
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .success {
    text-align: center;

    .success-top {
      margin-top: 90px;


      img {
        width: 72px;
        height: 72px;
      }

      div {
        margin-top: 15px;
        font-size: 16px;
        color: #000;
      }
    }

    .num {
      margin-top: 60px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }

    .tip {
      margin-top: 60px;

      font-size: 11px;

      color: #8F8F8F;
    }

    .btns {
      margin-top: 15px;
      padding: 0 30px;

      .btn {
        border-radius: 9px;
      }
   
    }

    .download-app {
      display: inline-block;
      margin-top: 15px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #D4AD6A;
    }
  }
</style>