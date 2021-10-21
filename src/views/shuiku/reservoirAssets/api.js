/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-23 10:28:49
 * @LastEditTime: 2021-08-23 19:48:24
 */
import request from '@/utils/request'

const BASE_API_6 = process.env.VUE_APP_BASE_API_2//yunw
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
