<template>
  <div>
    <van-nav-bar title="藏宝天下" left-arrow @click-left="$router.push('/home')" />

    <div class="login">
      <div class="img-box">
        <div class="mgkc-logo"></div>
        <div>藏宝天下</div>
      </div>
      <div class="center">
        <van-form @submit="onSubmit">
          <van-field class="my-input" v-model="loginName" maxlength="11" type="tel" placeholder="请输入伯乐号"
            :rules="rulesMobile">
            <template #left-icon>
              <span class="iconfont  icon-yonghu"></span>
            </template>
          </van-field>
          <van-field type="password" class="my-input mt20" mixlength="1" maxlength="16" v-model="passWord" placeholder="请输入密码" :rules="rulesVerify">
            <template #left-icon>
              <span class="iconfont  icon-mima1"></span>
            </template>
          </van-field>
          <div class="btns">
            <van-button class="btn" block color="#D4AD6A" native-type="submit">开始充电</van-button>
          </div>
          <div class="download-box">
            <div @click="$router.push('/cbtxRegister')">前往注册</div>
            <div @click="$router.push('/findNum')">找回伯乐号</div>
            <a v-if="type=='android'" :href="url1" download="" @click="downloadApp">下载App</a>
            <a v-else-if="type=='ios'" :href="url2" @click="downloadApp">下载APP</a>
          </div>
        </van-form>
      </div>

    </div>
  </div>
</template>
<script>
  import { setStore, getStore, isPhone } from "../assets/js/utils.js"
import myMixin from '../assets/js/mixin.js'
  export default {
    mixins:[myMixin],
    data() {
      return {
        loginName: '',
        passWord: '',
        type: '',
        url1: '',
        url2: '',
        rulesMobile: [{ required: true, message: '伯乐号不能为空' }],
        rulesVerify: [{ required: true, message: '密码不能为空' }]
      }
    },
    watch:{
      passWord(){
        this.passWord=this.passWord.replace(/[\W]/g,'');
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
      onSubmit() {
        let passWord = this.passWord.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, '')
        this.$http('/orderlist/treasureWorldLogin', {
          deviceId: getStore('deviceId'),
          loginName: this.loginName,
          passWord
        }).then(res => {
          if (res.code == 200) {
            setStore('olId', res.data.olId)
            this.$router.push({ path: '/chargeDetails', query: { olId: res.data.olId } })
          } else if (res.code == 500) {
            this.$toast.fail(res.msg)
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

  .img-box {
    padding-top: 70px;
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

  .center {
    padding: 0 30px;

    .my-input {

      height: 40px;
      background: #F7F3F3;
      border-radius: 9px;
    }

    .my-input:first-child {
      margin-top: 83px;

    }

    .mt20 {
      margin-top: 20px;

      .code {

        font-size: 12px;
        color: #D4AD6A;
      }

    }

    .btns {
      margin-top: 54px;

      .btn {
        border-radius: 9px;
      }

     
    }

    .download-box {
      display: flex;
      justify-content: space-between;

      div,
      a {
        font-size: 14px;
        color: #D4AD6A;
        margin-top: 15px;
      }
    }
  }
</style>