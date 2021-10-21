import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2


export function pushMsg(query) {
  return request({
    baseURL: baseAPI,
    url: '/sysMsg/pushMsg',
    method: 'post',
    data: query
  })
}


/**
 * 养护计划 分配
 * 获取人员
 */
export function getPlanAssigUser(params) {
  return request({
    url: 'iotComProj/getUserByRoleName',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}


// 保存报修单
export function saveServiceForm(params) {
  return request({
    url: '/workOrderProcess/startEvent',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}
