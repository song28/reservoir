import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2

// 设备分类设置

/**
 * 获取分页设备信息列表
 */
export function findDeviceInfoListByKeyWord4Pagination(data) {
  return request({
    baseURL: baseAPI,
    url: '/deviceClassificationSettings/findDeviceInfoListByKeyWord4Pagination',
    method: 'post',
    data: data
  })
}
// 所有的设备类型
export function querySttps() {
  return request({
    baseURL: baseAPI,
    url: '/statistics/querySttps',
    method: 'get'
  })
}

// 所以项目
export function queryComprojects(data) {
  return request({
    baseURL: baseAPI,
    url: '/iotComProj/getComProject',
    method: 'post',
    data: data
  })
}


// 所以物模型
export function queryProducts(data) {
  return request({
    baseURL: baseAPI,
    url: '/model/queryDevice',
    method: 'get',
    data: data
  })
}
//查询设备分类节点数据
export function findNodeFun(data) {
  return request({
    baseURL: baseAPI,
    url: '/neilaw/queryDeviceTypeById',
    method: 'post',
    data: data
  })
}
//保存设备分类信息
export function saveFun(data) {
  return request({
    baseURL: baseAPI,
    url: '/oper/saveDeviceCate',
    method: 'post',
    data: data
  })
}

//批量保存设备分类
export function batchSaveDeviceCate(data) {
  return request({
    baseURL: baseAPI,
    url: '/oper/batchSaveDeviceCate',
    method: 'post',
    data: data
  })
}

//根据设备编码查询设备分类字典信息--回显
export function queryDeviceCateInfoByDeviceIdFun(data) {
  return request({
    baseURL: baseAPI,
    url: '/oper/queryDeviceCateInfos',
    method: 'post',
    data: data
  })
}
//获取类型列表
export function getBizDictList(params) {
  return request({
    url: 'iotBizDict/getIotBizDictByPid/0',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}