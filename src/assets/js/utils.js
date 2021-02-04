import store from 'storejs'
/* 判断是否是微信 */
export function is_wexin() {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }
  return false;
}
/* 验证手机号 */
export function isPhone(phone) {
  let isPhone = /^1[3|4|5|7|8][0-9]{9}$/;//手机号码
  if (!isPhone.test(phone)) {
    return false;
  };
  return true;
}

/* 是否为空 */
export function isEmpty(str) {
  if (typeof (str) != "undefined" && str != null && str != '') {
    return false;
  }
  return true;
}
//判断方法是否为空
function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}
export function isContainChinese(value) {
  var r = /^[^\u4e00-\u9fa5]+$/;
  if (!r.test(value)) {
    return false;
  };
  return true;
}

export function setStore(key, value) {
  try {
    window.localStorage.removeItem(key)
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.log("set", error)
  }
}

export function getStore(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.log("get", error)

  }
}



