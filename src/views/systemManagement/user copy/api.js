import request from '@/utils/request'

const prod = (process.env.VUE_APP_BASE_API_2)

export function getList(query) {
  return request({
    url: '/user/list',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function seachByName(query) {
  return request({
    url: '/user/getUserInfoByName',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function submitForm(query) {
  return request({
    url: '/user/save',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function submitFormPwd(query) {
  return request({
    url: '/user/editPWD',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function doDelete(query) {
  return request({
    url: '/user/delete',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function doDeleteMultiple(query) {
  return request({
    url: '/user/doDeleteMultiple',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function setRole(query) {
  return request({
    url: '/user/setRole',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function getRoleList(query) {
  return request({
    url: '/user/getRoleList',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function getToken(query) {
  query = {
    "grant_type": "password",
    "client_id": "UserManagement",
    "client_secret": "user123",
    "username": "admin",
    "password": "admin"
  };
  return request({
    url: '/oauth/token',
    baseURL: "http://192.168.1.101:8080",
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    params: query
  })
}

//获取类型列表
export function getBizDictList(query) {
  return request({
    url: 'iotBizDict/getIotBizDictByPid/0',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
