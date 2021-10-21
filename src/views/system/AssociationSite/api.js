import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2

// 用户关联站点

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
 * 站点列表
 */
export function getSiteList(params) {
  return request({
    url: '/reservoirData/getIotBizSiteList',
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
    url: '/rele/saveDeviceUserRele',
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
    url: '/rele/deleteDeviceUserRele',
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
    url: '/rele/getDeviceUserReleList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}
