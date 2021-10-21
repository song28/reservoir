/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-23 10:28:47
 * @LastEditTime: 2021-09-13 12:26:40
 */
import request from '@/utils/request'

const BASE_API2 = process.env.VUE_APP_BASE_API_2
const BASE_API6 = process.env.VUE_APP_BASE_API_6
const BASE_API = process.env.VUE_APP_BASE_API

// 新的登录账号密码
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    baseURL: BASE_API6,
    data
  })
}
// 图形验证码
// verifyCode
export function verifyCode(params) {
  return request({
    url: "/verifyCode",
    baseURL: BASE_API6,
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
    baseURL: BASE_API2,
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/tokenInfo',
    method: 'post',
    baseURL: BASE_API2,
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

// export function logout() {
//   return request({
//     baseURL: BASE_API2,
//     url: '/doLogout',
//     method: 'post',
//     data: {}
//   })
// }

// 新的退出登录
export function logout(token) {
  return request({
    baseURL: BASE_API2,
    url: '/logout',
    method: 'get',
    params: token
  })
}
export function getcaptchasUrl() {
  return BASE_API2 + "/captimg?";
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
    baseURL: BASE_API2
  })
}
