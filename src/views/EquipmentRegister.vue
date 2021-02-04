<template>
  <div>
    <van-nav-bar title="设备注册" left-arrow @click-left="$router.push('/home')" />
    <div class="register">
      <div class="item">
        <span class="title">所属项目：</span>
        <MySelect placeholder="请选择" v-model="hotId" :selectValue="hotId" :columns="list"
          :option="{label:'hotName',value:'hotId'}" @confirm="onConfirm">
        </MySelect>
      </div>
      <div class="item">
        <span class="title">SN码：</span>
        <span>{{deviceId}}</span>
      </div>
      <div class="item">
        <span class="title">房间号：</span>
        <van-field class="my-field" v-model="roomId" maxlength=20 size="small" placeholder="请输入房间号"
          @change="validateRoomID" />
      </div>
      <div class="err-msg">{{errorMsg}}</div>
      <div class="btns">
        <van-button class="btn" block color="#D4AD6A" @click="submit">注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import MySelect from '../components/MySelect.vue'
  import { getStore } from '../assets/js/utils.js'
  import myMixin from '../assets/js/mixin.js'
  export default {
    mixins: [myMixin],
    data() {
      return {
        hotId: '',
        roomId: '',
        show: false,
        errorMsg: '',
        list: [],
        deviceId: getStore('deviceId'),
      }
    },
    watch: {
      roomId() {
        this.roomId = this.roomId.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '')
      }
    },
    created() {
      this.getHotel();
      this.showDevice()
    },

    methods: {


      validateRoomID() {
        if (this.roomId == '') {
          this.errorMsg = '房间号不能为空';
          return false;
        } else {
          this.errorMsg = ''
          return true
        }
      },
      showDevice() {
        this.$http('/device/showDevice', {
          deviceId: this.deviceId
        }).then(res => {
          if (res.code == 200) {
            this.roomId = res.data.roomId;
            this.hotId = res.data.hotId
          }
        })
      },
      onConfirm(value) {
        this.hotId = value.hotId;
      },
      getHotel() {
        this.$http('/device/getHotel').then(res => {
          if (res.code == 200) {
            this.list = res.data;
          }
        })
      },
      submit() {
        if (this.hotId == '') {
          this.$toast.fail('所属项目不能为空')
          return false;
        }
        if (this.validateRoomID()) {
          let roomId = this.roomId.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, '')
          this.$http('/device/updateDevice', {
            deviceId: this.deviceId,
            roomId,
            hotId: this.hotId
          }).then(res => {
            if (res.code == 200) {
              this.$toast.success(res.msg);
              let info = {
                deviceId: getStore('deviceId'),
                registerNumber1: res.data.registerNumber1,
                registerNumber2: res.data.registerNumber2,
                roomId: res.data.roomId,
                hotName: res.data.hotName,
              }
              this.$router.push({ path: '/registerSuccess', query: info })
            } else {
              this.$toast.fail(res.msg)
            }
          })
        }



      }
    },

    components: {
      MySelect
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .van-nav-bar .van-icon {
    color: #000;
  }

  /deep/ .van-cell {
    padding: 0 16px;
  }

  .register {
    padding: 0 30px;
    margin-top: 10px;

  }

  .item {
    display: flex;
    align-items: center;
    line-height: 50px;

    .title {
      width: 86px;
      font-size: 16px;
      color: #000;
    }

    .my-field {
      width: 250px;
      height: 30px;
      line-height: 30px;
      background-color: #f5f5f5;
      border-radius: 5px;

    }
  }

  .err-msg {
    margin-left: 86px;
    font-size: 14px;
    color: red;
  }

  /* .my-select {

    width: 235px;
    height: 30px;

    border-radius: 5px;
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
    outline: none;
  } */

  .btns {
    margin-top: 68px;

    .btn {

      border-radius: 9px;
    }
  }
</style>