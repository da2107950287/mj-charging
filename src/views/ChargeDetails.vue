|<template>
  <div>
    <van-nav-bar title="充电详情" left-arrow @click-left="$router.push('/home')" />
    <div class="charge-detail">
      <div class="top-img"></div>
      <div class="detail-center">
        <div class="title">充电器解锁密码</div>
        <div class="tips">请在充电器键盘中依次输入以下密码即可充电</div>
        <div class="password">
          <div v-for="item in pwdArr">{{item}}</div>
        </div>
      </div>
      <div class="btns">
        <van-button class="btn" color="#D4AD6A" @click="updatePassword">更新密码</van-button>
        <van-button class="btn" color="#D4AD6A" @click="$router.push('/fault')">故障上报</van-button>
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
        olId: getStore('olId'),
        pwdArr: [],
        beforeUrl: '',
        clock: 0,
      }
    },

    created() {
      this.showOrderlist()
    },
    mounted() {
      if (this.$route.query.updatePassword == 1) {
        this.updatePassword()
      }
    },
    methods: {
      updatePassword() {
        if (this.clock == 0) {
          this.clock = 1;
          this.$http('/orderlist/updatePassword', {
            olId: this.olId
          }).then(res => {
            this.clock = 0;
            if (res.code == 200) {
              this.pwdArr = res.data.password.toString().split('')
              this.$toast.success(res.msg)
            } else {
              this.$toast.fail(res.msg)
            }
          })
        }

      },
      showOrderlist() {
        this.$http('/orderlist/showOrderlist', {
          olId: this.olId
        }).then(res => {
          if (res.code == 200) {
            this.pwdArr = res.data.password.toString().split('')
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

  .top-img {
    width: 100%;
    height: 220px;
    background-color: #fff;
    background-image: url(../assets/img/charge-details.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .detail-center {
    padding: 20px 30px 30px;
    text-align: center;

    .title {
      font-size: 20px;
      font-weight: 500;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #000;
    }

    .tips {
      margin-top: 12px;
      font-size: 14px;
      color: #959595;
    }

    .password {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 26px;

      >div {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 36px;
        border-radius: 50%;
        color: #D4AD6A;
        background: #FFFFFF;
        border: 1px solid #D4AD6A;
      }
    }
  }

  .btns {
    position: absolute;
    display: flex;
    justify-content: space-between;
    bottom: 50px;
    width: 100%;
    padding: 0 30px;


    .btn {

      width: 46.03%;
      border-radius: 9px;
    }



  }
</style>