/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-23 10:28:47
 * @LastEditTime: 2021-09-01 18:08:23
 */
import request from '@/utils/request'

const BASE_API = process.env.VUE_APP_BASE_API_2

// 新的登录账号密码
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    baseURL: BASE_API,
    data
  })
}
// 图形验证码
// verifyCode
export function verifyCode(params) {
  return request({
    url: "/verifyCode",
    baseURL: BASE_API,
    method: "GET",
    responseType: "blob",
    params: params
  });
}

// export function login(data) {
//   return request({
//     url: '/postLogin',
//     method: 'post',
//     baseURL: BASE_API,
//     data
//   })
// }

export function loginOAM(data) {
  return request({
    url: '/postLoginOAM',
    method: 'post',
    baseURL: BASE_API,
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/tokenInfo',
    method: 'post',
    baseURL: BASE_API,
    data: token
  })
}

export function getMenus(token) {
  return request({
    url: '/user/getMenus',
    method: 'get',
   
    params: token
  })
}

export function logout() {
  return request({
    baseURL: BASE_API,
    url: '/doLogout',
    method: 'post',
    data: {}
  })
}

export function getcaptchasUrl() {
  return BASE_API + "/captimg?";
}

/**
 *
 * @param {*} query
 */
export function getUserMenus(query) {
  return request({
    url: '/menu/getMenus',
    method: 'get',
    params: query,
    baseURL: BASE_API
  })
}
