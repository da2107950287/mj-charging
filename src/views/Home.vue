<template>
  <div v-cloak class="home">
    <div class="home-bgc">
      <div class="top">
        <div class="name">米京全类型快速充电</div>
        <div class="my-order" @click="$router.push('/order')">我的订单</div>
      </div>
    </div>
    <div class="bottom">
      <div class="select-box">
        <div class="title">请选择充电时长：</div>
        <van-radio-group v-model="id" class="my-radio-group">
          <van-radio v-for="item in list" :key="item.id" class="my-radio" :name="item.id" checked-color="#D4AD6A">
            支付费用<span class="red"> {{item.price}} </span>元，充电<span class="yellow"> {{item.hours}} </span>小时
          </van-radio>
        </van-radio-group>
      </div>
      <div class="vip">
        <div class="vip-img" @click="cbtxLogin">
          <div class="cbtx-vip">藏宝天下会员</div>
          <div class="free">免费充电</div>
        </div>
      </div>
      <van-button v-if="state==1" class="btn" color="#D4AD6A" block @click="submit">开始充电</van-button>
      <van-button v-else-if="state==2" class="btn" color="#D4AD6A" block @click="$router.push('/ChargeDetails')">充电中
      </van-button>
      <div class="tips">注：登录或注册会员即可享受会员免费充电服务</div>
    </div>
  </div>
</template>
<script>
  import { getStore, setStore } from "../assets/js/utils.js"
  import { wxpay } from '../assets/js/wx.js'
  export default {
    data() {
      return {
        id: '',//费用ID
        state: '',//充电状态
        mobile: getStore('mobile'),//用户手机号
        role: getStore('role'),//用户身份
        deviceId: getStore('deviceId'),//设备ID
        list: [],//费用列表
        isRegistered: '',//设备是否注册
        obj: {},//
        signData: {}
      }
    },
    watch: {
      list() {
        this.id = this.list[0].id
      }
    },
    created() {
      this.getCost();
      this.showDevice();
    },
    methods: {
      cbtxLogin() {
        setStore('id', this.id)
        setStore('isCbtx', 1)
        console.log(!this.mobile )
        if (!this.mobile && this.role == 1) {
          this.$router.push('/bindPhone')
        } else if (this.mobile && this.role == 1) {
          this.$router.push('/cbtxLogin')
        }
      },
      getCost() {
        this.$http('/orderlist/getCost').then(res => {
          if (res.code == 200) {
            this.list = res.data;
          }
        })
      },
      showDevice() {
        this.$http('/device/showDevice', {
          deviceId: this.deviceId
        }).then(res => {
          if (res.code == 200) {
            this.state = res.data.state;
            if (res.data.registerUid != '') {
              this.isRegistered = 1;//设备已注册
            } else {
              this.isRegistered = 2;
            }
            setStore('isRegistered', this.isRegistered)
          }
        })
      },
      //获取签名
      getConfig() {
        this.$http('/userinfo/getConfig', {
          url: window.location.href.split('#')[0]

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
      submit() {
        setStore('id', this.id)
        setStore('isCbtx', 2)
        if (!this.mobile) {
          this.$router.push('/bindPhone')
        } else if (this.isRegistered == 1 && this.role == 2) {
          this.$router.push('/registered')
        } else if (this.isRegistered == 2 && this.role == 2) {
          this.$router.push('/equipmentRegister')
        } else if (this.role == 1) {
          this.getConfig()
        }
      }

    }
  }
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none
  }

  .home-bgc {
    width: 100%;
    height: 240px;

    background-image: url(../assets/img/home.png);
    background-size: cover;

    .top {
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 14.5px 20px 0 30px;

      .name {
        font-size: 18px;
        font-weight: 500;
      }

      .my-order {
        font-size: 12px;
      }
    }



  }

  .bottom {
    padding: 0 30px;

    .select-box {

      padding-top: 22px;

      .title {
        font-size: 12px;
        font-weight: 500;
        color: #000;
      }

      .my-radio-group {
        margin-left: 60px;

        .my-radio {
          margin-top: 10px;
          font-size: 13px;
          color: #000;

          .red {
            color: #DE2703
          }

          .yellow {
            coloe: #D4AD6A
          }
        }
      }
    }

    .vip {
      margin-top: 55px;
      display: flex;
      justify-content: space-between;

      .vip-img {
        width: 100%;
        height: 125px;
        background-size: 100% 100%;
        background-image: url('../assets/img/cbtx.png');

        .cbtx-vip {
          margin: 10px 0 10px 10px;
          font-size: 17px;
          color: #D4AD6A;

        }

        .free {
          text-align: center;
          font-size: 23px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #D4AD6A;
        }


      }
    }

    .btn {
      margin-top: 15px;

      border-radius: 9px;
    }

    .tips {
      margin: 45px 0 35px;
      text-align: center;
      font-size: 13px;
      color: #D4AD6A;

    }
  }

</style>