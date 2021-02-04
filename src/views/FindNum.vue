<template>
  <div>
    <van-nav-bar title="找回伯乐号" fixed left-arrow @click-left="$router.go(-1)" />
    <div class="login">
      <div class="img-box">
        <div class="mgkc-logo"></div>
        <div>藏宝天下</div>
      </div>
      <div class="center">
        <van-form>
          <van-field class="my-input mt80" v-model="mobile" maxlength="11" type="tel" placeholder="请输入手机号"
            :rules="rulesMobile" @blur="getImgCode">
            <template #left-icon>
              <span class="iconfont  icon-yonghu"></span>
            </template>
          </van-field>
          <div class="picture-code-box">
            <van-field class="my-input picture-code  mt20" v-model="imgCode" minlength="1" maxlength="8"
              placeholder="验证码" :rules="[{ required: true, message: '请填写图片验证码' }]">
              <template #left-icon>
                <span class="iconfont  icon-yanzhengma"></span>
              </template>
            </van-field>
            <img v-if="imgcode" class="img-code" :src="imgcode" @click="getImgCode" alt="">
            <div v-else class="img-code" style="background: #F7F3F3;"></div>
            <div class="code img-code" @click="getSmsCode">{{codeMsg}}</div>
          </div>
          <van-field v-if="showSmsCode" class="my-input mt20" type="tel" minlength="1" maxlength="8" v-model="smsCode"
            placeholder="请输入手机验证码" :rules="rulesSmsCode">
            <template #left-icon>
              <span class="iconfont  icon-yanzhengma"></span>
            </template>
          </van-field>
          <div class="error-msg mt20">{{errorMsg}}</div>
          <div class="btns">
            <van-button class="btn" block color="#D4AD6A" @click="onSubmit">下一步</van-button>
          </div>
          <div class="download-box">
            <div @click="$router.push('/cbtxLogin')">前往登录</div>
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

  export default {
    data() {
      return {
        mobile: '',//手机号
        smsCode: '',//手机验证码
        imgCode: '',//图片验证码
        codeMsg: '获取验证码',
        canClick: true,
        totalTime: 60,
        showSmsCode: false,
        errorMsg: '',
        imgcode: '',
        type: '',
        url1: '',
        url2: '',
        rulesMobile: [{ required: true, message: '手机号不能为空' }],
        rulesSmsCode: [{ required: true, message: '手机验证码不能为空' }],
      }
    },
    watch: {
      imgCode() {
        this.imgCode = this.imgCode.replace(/[\W]/g, '');
      },
      smsCode() {
        this.smsCode = this.smsCode.replace(/[\W]/g, '');
      },

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
      onSubmit() {

        if (this.mobile == '') {
          this.$toast.fail('手机号不能为空')
          return false;
        } else if (!isPhone(this.mobile)) {
          this.$toast.fail('手机号不正确')
          return false;
        } if (this.showSmsCode == false) {
          this.$toast.fail('请先获取手机验证码')
          return false;
        }

        let smsCode = this.smsCode.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, '')
        if (this.smsCode == '' && this.showSmsCode == true) {
          this.$toast.fail('手机验证码不能为空')
          return false;
        }

        this.$http('/orderlist/getMemberNo', {
          mobile: this.mobile,
          smsCode,
          pageNum: 1,
          pageSize: 4
        }).then(res => {
          if (res.code == 200) {
            this.$router.push({ path: '/numList', query: { smsCode: smsCode, mobile: this.mobile } })
          } else {
            this.$toast.fail(res.msg)
          }
        })
      },
      downloadApp() {
        if (this.type == 'ios') {
          this.url2 = 'https://apps.apple.com/cn/app/id1481780101?l=zh&amp;ls=1'
        } else {
          this.url1 = 'http://app.mi.com/details?id=com.txcbapp&amp;ref=search'
        }
      },
      getImgCode() {

        if (this.mobile == '') {
          this.$toast.fail('手机号不能为空')
          return false;
        } else if (!isPhone(this.mobile)) {
          this.$toast.fail('手机号不正确')
          return false;
        } else {
          this.$http('/orderlist/getImgCode', {
            mobile: this.mobile,
            businessType: 'queryMemberNo'
          }).then(res => {
            if (res.code == 200) {
              this.imgcode = `data:image/png;base64,${res.data}`
            } else if (res.code == 500) {
              this.getImgCode()
            }
          })
        }
      },
      getSmsCode() {
        if (this.mobile == '') {
          this.$toast.fail('手机号不能为空');
          return false;
        } else if (!isPhone(this.mobile)) {
          this.$toast.fail('手机号不正确');
          return false;
        }
        let imgCode = this.imgCode.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, '')
        if (imgCode == '') {
          this.$toast.fail('图片验证码不能为空')
          return false;
        }
        if (!this.canClick) return;
        this.canClick = false;
        this.$http('/orderlist/getSmsCode', {
          mobile: this.mobile,
          imgCode,
          businessType: 'queryMemberNo'
        }).then(res => {
          if (res.code == 200) {
            this.errorMsg = '';
            this.showSmsCode = true;
            this.$toast.success(res.msg)
            this.codeMsg = this.totalTime + "s";
            //60秒倒计时
            let clock = window.setInterval(() => {
              this.totalTime--;
              this.codeMsg = this.totalTime + "s";
              if (this.totalTime < 0) {
                window.clearInterval(clock);
                this.codeMsg = "重新发送验证码";
                this.totalTime = 60;
                this.canClick = true; //这里重新开启
              }
            }, 1000);
          } else {
        
            this.canClick = true;
            this.errorMsg = res.msg;
          }
        })
      },
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

  .center {
    padding: 0 30px 30px;

    .my-input {

      height: 40px;
      background: #F7F3F3;
      border-radius: 9px;
    }



    .mt80 {
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

  .picture-code-box {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .picture-code {
      width: 35%;
    }

    .img-code {
      width: 30%;
      height: 40px;
      margin-top: 20px;

      border-radius: 9px;
    }

    .code {
      line-height: 40px;

      text-align: center;
      font-size: 12px;
      background: #D4AD6A;
      color: #fff;
    }
  }

  .error-msg {
    font-size: 12px;
    color: red;
  }

  .logo-box {
    padding-top: 66px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>