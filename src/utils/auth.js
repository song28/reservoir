/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-23 10:28:49
 * @LastEditTime: 2021-09-22 11:38:12
 */
/**
 * Created by chenli on 22/7/19.
 */

import defaultSettings from '@/settings'

const { pageLayout } = defaultSettings

let TokenKey = 'admin'

let userInfo = {
  // addvcd: '360000000000',
  // addvnm: '江西省',
  // id: '1',
  // name: '管理员'
}
const brainFormUrl = {
  ip: '127.0.0.1',
  port: '8982'
}
let page = pageLayout

export function getToken() {
  TokenKey = sessionStorage.getItem('xtoken')
  return TokenKey
}
export function getVerifyCode() {
  return sessionStorage.getItem('verifyCode')
}
export function setToken(token) {
  sessionStorage.setItem('xtoken', token)
}

export function setVerifyCode(code) {
  sessionStorage.setItem('verifyCode', code)
}
export function setTitle(code) {
  sessionStorage.setItem('title', code)
}
export function getTitle(code) {
  sessionStorage.getItem('title', code)
}
export function removeToken() {
  sessionStorage.clear()
  localStorage.clear()

}

export function getUserInfo() {
  const userInfos = JSON.parse(sessionStorage.getItem('userInfo'))
  if (userInfos) {
    userInfo = userInfos
  }
  return userInfo
}

export function setUserInfo(data) {
  debugger
  if (data) {
    console.log(data, 'data===')
    Object.assign(userInfo, data)
  }
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export function removeSessionStorage() {
  sessionStorage.clear()
}

export function setBrainFormUrl(ip, port) {
  sessionStorage.setItem('iot_brainFormUrl', ip)
  sessionStorage.setItem('iot_brainFormPort', port)
}

export function getBrainFormUrl() {
  const ips = sessionStorage.getItem('iot_brainFormUrl')
  const ports = sessionStorage.getItem('iot_brainFormPort')
  if (ips) {
    brainFormUrl.ip = ips
    brainFormUrl.port = ports
  }
  return brainFormUrl
}

export function getPageLayout() {
  page = sessionStorage.getItem('page')
  return page == null ? pageLayout : page
}

export function setPageLayout(page) {
  sessionStorage.setItem('page', page)
}

export function getUserPower() {
  const userInfos = JSON.parse(sessionStorage.getItem('UserPower'))
  console.log(userInfos, '第一集菜单===')
  if (userInfos) {
    return userInfos
  }
  return null
}

export function setUserPower(data) {
  if (data) {
    sessionStorage.setItem('UserPower', JSON.stringify(data))
  } else {
    sessionStorage.setItem('UserPower', JSON.stringify([]))
  }
}
// 获取子系统水库info
export function getRscdInfo() {
  return sessionStorage.getItem("rsInfo")
}
// 获取水库编码rscd
export function getRscd() {

  return JSON.parse(sessionStorage.getItem("rsInfo")).rscd
}