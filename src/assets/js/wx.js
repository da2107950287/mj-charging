import { setStore } from '../js/utils.js'
//注入权限验证配置
export function initConfig(config) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config.appid, // 必填，公众号的唯一标识
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature,// 必填，签名
    jsApiList: [
      "chooseWXPay",
    ] // 必填，需要使用的JS接口列表
  });
}
/* 微信支付 */
export function wxpay(config, signData, _this) {
  let that = _this;
  return new Promise((reslove, reject) => {
    initConfig(config)
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: [
          'chooseWXPay',
        ],
        success: function (res) {
          if (res.checkResult.getLocation == false) {
            alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
            return;
          } else {
            wx.chooseWXPay({
              timestamp: signData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: signData.nonceStr, // 支付签名随机串，不长于 32 位
              package: signData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: signData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: signData.paySign, // 支付签名
              success: function (res) {
                setStore('olId', signData.olId)
                that.$router.push({ path: '/chargeDetails' })
                reslove(res)
              },
              fail: function (error) {
                that.$router.push({path:'/home'})
                console.log('check api fail:', err)
              }
            });
          }
        },
        error: function (err) {
          console.log(err)
        }
      });
    });
  })

}

