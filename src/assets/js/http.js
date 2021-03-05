import originAxios from 'axios'
import qs from 'qs'
import { getStore, setStore } from '../js/utils.js'

export function http(url, data = {}, method = 'post') {
  let option = {
    url,
    data,
    method,
    transformRequest
  }
  function transformRequest(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] == "object") {
          data[key] = JSON.stringify(data[key])
        }
      }
    }
    // 对 data 进行任意转换处理,将对象序列化成URL的形式，以&进行拼接
    return qs.stringify(data)
  }
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({});
    // 配置请求和响应拦截
    instance.interceptors.request.use(config => {
      console.log(getStore("token"), 200)
      if (getStore("token")) {
        config.headers.token = getStore("token");
      }
      return config;
    }, err => {
      return err;
    })
    instance.interceptors.response.use(response => {
      if (response.data.code == 501) {
        window.location.href = `${window.location.href.split('#')[0]}#/auth`
      }
      return response.data;
    }, err => {
      if (err && err.response) {
        switch (err.response.status) {
          case 501:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权的访问'
            break
        }
      }
      return err
    })
    // 2.传入对象进行网络请求
    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function uploadPost(url, data) {
  console.log(data)
  let option = {
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = originAxios.create({
      method: 'post',
    });
    // 配置请求和响应拦截
    instance.interceptors.request.use(config => {
      if (getStore("token")) {
        config.headers.token = getStore("token");
      }
      return config
    }, err => {
      return err
    })
    instance.interceptors.response.use(response => {
      if (response.data.code == 501) {
        window.location.href = `${window.location.href.split('#')[0]}#/auth`
      }
      return response.data
    }, err => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权的访问'
            break
        }
      }
      return err
    })
    // 2.传入对象进行网络请求
    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

