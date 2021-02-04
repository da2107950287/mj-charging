<template>
  <div class="login">
    <div class="img-box">
      <div class="mgkc-logo"></div>
      <div>米京快充</div>
    </div>
    <div class="center">
      <van-form @submit="onSubmit">
        <van-field class="my-input" v-model="mobile" maxlength="11" type="tel" placeholder="请输入手机号"
          :rules="rulesMobile">
          <template #left-icon>
            <span class="iconfont  icon-yonghu"></span>
          </template>
        </van-field>
        <van-field class="my-input mt20" v-model="verify" minlength="1" maxlength="8" type="tel"  placeholder="请输入验证码" :rules="rulesVerify">
          <template #left-icon>
            <span class="iconfont  icon-mima1"></span>
          </template>
          <template #button>
            <span class="code" @click="getCode">{{codeMsg}}</span>
          </template>
        </van-field>
        <div class="btns">
          <van-button class="btn" block color="#D4AD6A" native-type="submit">绑定手机</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
  import { setStore, getStore, isPhone } from "../assets/js/utils.js"
  import { wxpay } from '../assets/js/wx.js'

  export default {
    data() {
      return {
        mobile: '',//手机号
        verify: '',//验证码
        isCbtx: getStore('isCbtx'),//1藏宝天下登录
        codeMsg: '获取验证码',
        canClick: true,//获取验证码开关
        totalTime: 60,//倒计时
        deviceId: getStore('deviceId'),//设备ID
        id: getStore('id'),//费用ID
        isRegistered: getStore('isRegistered'),//设备是否注册
        rulesMobile: [{ required: true, message: '手机号不能为空' }],
        rulesVerify: [{ required: true, message: '验证码不能为空' }]
      }
    },
    watch:{
      verify(){
        this.verify=this.verify.replace(/[\W]/g,'');
      }
    },
    methods: {
      //获取手机验证码
      getCode() {
        if (this.mobile == '') {
          this.$toast.fail('手机号不能为空')
          return false;
        } else if (!isPhone(this.mobile)) {
          this.$toast.fail('手机号不正确')
          return false;
        }
        if (!this.canClick) return;
        this.canClick = false;
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
        this.$http('/userinfo/send_sms', {
          mobile: this.mobile
        }).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg)
          } else {
            this.canClick = true;//这里重新开启
            this.$toast.fail(res.msg)
          }
        })
      },
      //获取签名，
      getConfig() {
        this.$http('/userinfo/getConfig', {
          url: window.location.href.split('#')[0]
          // url: 'http://charge.linkzl.com/mjcharging/index.html'
        }).then(res => {
          if (res.code == 200) {
            this.obj = res.data;
            this.insertOrderlist()
          }
        })
      },
      //获取支付参数
      insertOrderlist() {
        this.$http('/orderlist/insertOrderlist', {
          deviceId: this.deviceId,
          id: this.id
        }).then(res => {
          if (res.code == 200) {
            this.signData = res.data;
            wxpay(this.obj, this.signData, this)
          }
        })
      },
      onSubmit() {
        if (this.mobile == '') {
          this.$toast.fail('手机号不能为空')
          return false;
        } else if (!isPhone(this.mobile)) {
          this.$toast.fail('手机号不正确')
          return false;
        }
        let verify = this.verify.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, '')
        if (verify == '') {
          this.$toast.fail('验证码不能为空')
          return false;
        }
        this.$http('/userinfo/bindAccount', {
          mobile: this.mobile,
          verify
        }).then(res => {
          if (res.code == 200) {
            this.$cookies.config('30d')
            this.$cookies.set("token2", res.data.token) 
            setStore('role', res.data.role);
            setStore('token', res.data.token);
            setStore('olId', res.data.olId);
            setStore('mobile', res.data.mobile);
            // this.$router.push('/home')
            this.$nextTick(() => {
              if (this.isRegistered == 1 && getStore('role') == 2) {
                this.$router.push('/registered')
              } else if (this.isRegistered == 2 && getStore('role') == 2) {
                this.$router.push('/equipmentRegister')
              } else if (getStore('role') == 1 && this.isCbtx == 1) {
                this.$router.push('/cbtxLogin')
              } else if (getStore('role') == 1 && this.isCbtx == 2) {
                this.getConfig()
              }
            })
          } else if (res.code == 500) {
            this.canClick = true;
            this.$toast.fail(res.msg)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
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
    background-image: url(../assets/img/mj_logo.png);
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
  }
</style>