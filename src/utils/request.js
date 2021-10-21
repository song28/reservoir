/*
 * @Author: dang
 * @Date: 2021-08-27 09:40:48
 * @LastEditTime: 2021-09-15 13:32:19
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\utils\request.js
 */
/**
 * Created by chenli on 22/7/19.
 */

import axios from 'axios'
import {Message, Notification} from 'element-ui'
import store from '@/store'
import {getToken, getVerifyCode, setVerifyCode, removeToken} from '@/utils/auth'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求地址
  changeOrigin: true,
  withCredentials: false,
  crossDomain: true,
  timeout: 50000 // 请求超时时间
})
service.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// request 拦截器
service.interceptors.request.use(
  config => {
    config.headers['verify_code'] = getVerifyCode()
    config.headers['X-Token'] = getToken()
    config.headers['Authorization'] =
      'APPCODE f4d0734edc5940ee8ec7bf21d9a90459'
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    
    if (store.getters.token) {

      // config.headers['token'] = getToken()
      // config.headers['Authorization'] =
      //   'APPCODE f4d0734edc5940ee8ec7bf21d9a90459'
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    console.log(response, 'response===')
    if (
      response.config.url.indexOf('/verifyCode') >= 0 &&
      response.headers.key
    ) {
      setVerifyCode(response.headers.key)
      response.data.key = response.headers.key
    }
    if ((response.code && response.code == 0) || !response.data) {
      this.$router.push({
        path: '/'
      })
    } else {
      return response.data
    }
  },
  error => {
    console.log(error.response, 'error111')

    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 500:
          if (error.response.data.message == 'X-Token无效') {
            Notification({
              message: '该账号在其他地方登录，3s后自动跳转到登录页面',
              type: 'error',
              duration: 3 * 1000
            })
            removeToken()
            setTimeout(() => {
              router.push({
                path: '/'
              })
            }, 3000)
          }else{
            // Notification({
            //   message: '服务器繁忙',
            //   type: 'error',
            //   duration: 1 * 1000
            // })
            // removeToken()
            // setTimeout(() => {
            //   router.push({
            //     path: '/'
            //   })
            // }, 3000)
          }
          break
        case 404:
          break
        default:
          break
      }
      return Promise.reject(error)
    }
  }
)

export default service
