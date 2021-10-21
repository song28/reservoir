import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2

// 用户关联水库

/**
 * 用户列表
 */
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 水库列表
 */
export function getReservoirList(params) {
  return request({
    url: '/baseRsvr/getRsvrList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 保存关联数据
 */
export function submitAssociation(params) {
  return request({
    url: '/rele/saveReservoirUserRele',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}


/**
 * 删除关联数据
 */
export function deleteAssociation(params) {
  return request({
    url: '/rele/deleteReservoirUserRele',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 查看关联数据
 */
export function queryAssociation(params) {
  return request({
    url: '/rele/getReservoirUserReleList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}
