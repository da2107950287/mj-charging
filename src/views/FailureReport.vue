<template>
  <div class="failure-report">
    <van-nav-bar title="故障上报" left-arrow @click-left="$router.push('/fault')" />
    <div class="content">
      <div class="top common">
        <div class="title">米京充电线小程序申请获得：</div>
        <div class="text">设备SN：{{deviceId}}</div>
        <div class="mobile">
          <div class="text">手机号：</div>
          <van-field class="my-field" v-model="mobile" maxlength=11 type="number" placeholder="请输入手机号" />
        </div>
      </div>
      <div class="center common">
        <div class="title">故障内容：</div>
        <van-field class="my-field" v-model="content" rows="2" type="textarea" maxlength="50" placeholder="请输入留言"
          show-word-limit />
      </div>
      <div class="bottom common">
        <div style="display: flex;">
          <div class="title">图片上传：</div>
          <div style="color: red;">图片大小不超过10M</div>
        </div>
        <van-uploader :after-read="uploadImg">
          <img v-if="picture && status==2" :src="picture" class="upload-img">
          <img v-else-if="status==0" class="upload-img" src="../assets/img/add-picture.png" alt="">
          <div v-else-if="status==1" class="my-loading">
            <van-loading />
            <div>上传中...</div>
          </div>
        </van-uploader>
      </div>
      <van-button class="btn" block color="#D4AD6A" @click="submit">提交</van-button>
    </div>
  </div>
</template>
<script>
  import { getStore, isPhone } from '../assets/js/utils.js'
  import { uploadPost } from '../assets/js/http.js'
  export default {
    data() {
      return {
        mobile: '',
        deviceId: getStore('deviceId'),
        olId: getStore('olId'),
        content: '',
        picture: '',
        status: 0
      }
    },
    watch:{
      mobile(){
        this.mobile=this.mobile.replace(/[\W]/g,'');
      }
    },
    created() {

    },
    methods: {
      uploadImg(file) {
        let formData = new FormData();
        formData.append('myfiles', file.file)
        if (file.file.size < 10 * 1024 * 1024) {
          this.status = 1;
          uploadPost('/upload/pictureOrVideo', formData).then(res => {
            if (res.code == 200) {
              this.status = 2;
              this.picture = res.data;
            } else {
              this.$toast.fail(res.msg)
            }
          })
        } else {
          this.$toast.fail('图片大小超过10M')
        }

      },
      submit() {
        if (this.mobile == '') {
          this.$toast.fail('手机号不能为空')
          return false;
        } else if (!isPhone(this.mobile)) {
          this.$toast.fail('手机号不正确')
          return false;
        }
        let content = this.content.trim()
        if (content == '') {
          this.$toast.fail('故障内容不能为空')
          return false;
        } else if (this.status == 1) {
          return false
        }
        this.$http('/device/insertFault', {
          mobile: this.mobile,
          deviceId: this.deviceId,
          content: this.content,
          picture: this.picture,
          olId: this.olId
        }).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg)
            this.$router.push('/ChargeDetails')
          } else {
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

  .my-loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f7f8fa;
    text-align: center;
    width: 85px;
    height: 85px;
    color: rgba(69, 90, 100, 0.6);
  }

  .failure-report {
    position: relative;
    min-height: 100%;
    width: 100%;

    .content {
      height: 100%;
      width: 100%;
      background-color: #F8F7F7;
      padding: 15px;

    }

    .common {
      padding: 0 15px 15px;
      color: #000;
      font-size: 14px;
      background-color: #fff;
      margin-bottom: 15px;

      >div {
        line-height: 40px;
      }

      .my-field {
        background-color: #f5f5f5;
        border-radius: 5px;
      }
    }

    .top {
      .title {
        font-weight: 500;
        font-family: PingFangSC-Medium, PingFang SC;
      }

      .mobile {
        display: flex;


        .my-field {
          width: 250px;
          height: 40px;
          line-height: 24px;

        }


      }

    }

    .bottom {

      .upload-img {
        width: 85px;
        height: 85px;




      }

    }


    .btn {
      margin-top: 50px;
      border-radius: 9px;
      margin-bottom: 10px;
    }


  }
</style>