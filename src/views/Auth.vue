<template>
  <div>
    <div class="img-box">
      <div class="mgkc-logo"></div>
      <div class="text">米京快充</div>
    </div>
    <div class="center">
      <div class="title">-需要获取如下权限-</div>
      <div class="text">昵称.头像</div>
    </div>
    <div class="btns">
      <van-button class="btn" block color="#D4AD6A" @click="submit">登录</van-button>
    </div>
  </div>
</template>
<script>
  import { setStore, getStore, isEmpty } from "../assets/js/utils.js"
  export default {
    data() {
      return {
        code: '',
        deviceId: '',//设备ID
      }
    },
    created() {

      const w = window.location.href.indexOf('?');
      const j = window.location.href.indexOf('#');
      let href = window.location.href;
      // 处理微信回调url
      if (w !== -1 && j > w) {
        href = window.location.href.substr(0, w) + window.location.href.substr(j, window.location.href.length) + window.location.search;
        window.location.href = href;
      }

      this.code = this.$route.query.code;
      if (!isEmpty(this.code)) {
        this.login()
      }
      this.deviceId = this.$route.query.device;
      if (!isEmpty(this.deviceId)) {
        setStore('deviceId', this.deviceId)
      }
      if (!isEmpty(getStore("token"))) {
        this.$http('/userinfo/showUserinfo', {
          deviceId: getStore('deviceId')
        }).then(res => {
          if (res.code == 202) {
            this.$cookies.config('30d')
            this.$cookies.set("token2", res.data.token) 
            setStore('mobile', res.data.mobile);
            setStore('role', res.data.role);
            setStore('token', res.data.token);
            setStore('olId', res.data.olId);
            this.$router.push('/inCharging')
          }
        })
      }
    },
    methods: {
      //通过code拿到相关数据
      login() {
        this.$http('/userinfo/login', {
          code: this.code,
          deviceId: getStore('deviceId')
        }).then(res => {
          if (res.code == 200) {//未充电
            this.$router.push('/home')
          } else if (res.code == 202) {//正在充电
            this.$router.push('/inCharging')
          } else {
            this.$toast.fail(res.msg);
          }
          this.$cookies.config('30d')
          this.$cookies.set("token2", res.data.token) 
          setStore('token1', res.data.token);

          setStore('role', res.data.role);
          setStore('token', res.data.token);
          setStore('olId', res.data.olId);
          setStore('mobile', res.data.mobile);
        })
      },
      //用户同意授权，获取code
      submit() {
        // let url = 'http://charge.linkzl.com/mjcharging/index.html?device=9541002'
        let url = encodeURIComponent(`${window.location.href.split('#')[0]}#/auth`);
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe839e59a50cd2ce4&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
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

    .mgkc-logo {
      width: 89px;
      height: 89px;
      background-image: url(../assets/img/mj_logo.png);
      background-size: contain;

    }

    .text {
      font-size: 16px;
      color: #000;
      line-height: 23px;
    }
  }


  .center {
    text-align: center;
    margin-top: 115px;

    .title {
      font-size: 16px;

    }

    .text {
      margin-top: 6px;
      font-size: 12px;
      color: #A8A8A8;
    }
  }

  .btns {
    margin-top: 30px;
    padding: 0 30px;

    .btn {
      border-radius: 9px;
    }

  }
</style>