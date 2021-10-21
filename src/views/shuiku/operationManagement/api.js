/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-23 10:28:49
 * @LastEditTime: 2021-08-24 14:03:13
 */
import request from '@/utils/request'
const BASE_API_2 = process.env.VUE_APP_BASE_API_2//yunw
const BASE_API_6 = process.env.VUE_APP_BASE_API_6//yunw
//导入模板
export function model(params) {
  return request({
    url: "/asset/download/model",
    baseURL: BASE_API_6,
    method: "POST",
    data: params
  });
}
//维护巡查-日常巡查查询接口
export function patrollist(query) {
  return request({
    baseURL: BASE_API_6,
    url: '/DZYWXC/patrol/list',
    method: 'post',
    data: query
  })
}
//日常养护
export function getPatrolListByUid(query) {
  return request({
    baseURL: BASE_API_6,
    url: '/app/getPatrolListByUid',
    method: 'post',
    data: query
  })
}
//日常养护详情
export function getMaintainDetail(query) {
  return request({
    baseURL: BASE_API_6,
    url: '/app/getMaintainDetail',
    method: 'post',
    data: query
  })
}
//根据水库id查询配置的人员
export function getInscoptorByReservoirId(params) {
  return request({
    url: "/web/inscptor/getInscoptorByReservoirId",
    baseURL: BASE_API_6,
    method: "GET",
    params: params
  });
}
//上报接口
export function saveRecord(params) {
  return request({
    url: "/app/saveRecord",
    baseURL: BASE_API_6,
    method: "POST",
    data: params
  });
}
