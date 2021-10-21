import request from '@/utils/request'
import axios from 'axios'
const prod = (process.env.VUE_APP_BASE_API_2)

export function getSmartFormById(query) {
  return request({
    url: '/smartForm/getSmartFormByPageId',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function getSmartDefineInfoFormById(query) {
  return request({
    url: '/SmartFormModel/info',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function SmartFormPageInfo(query) {
  return request({
    url: '/SmartFormPage/info',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function editSmartForm(query) {
  return request({
    url: '/smartForm/editSmartForm',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function saveSmartFormModel(query) {
  return request({
    url: '/SmartFormModel/save',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
