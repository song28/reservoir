import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2

// 数据查询
/**
 * 雨水查询 - 站点类型统计
 */
export function getSiteTypeTotal(params) {
  return request({
    url: '',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 雨水查询 - 列表
 */
export function getRainWaterList(params) {
  return request({
    url: '/reservoirData/getIotBizSiteList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

//

export function getTjHdpList(params) {
  return request({
    url: '/DZZHJS/hdp/getTjHdpList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}


/**
 * 工况查询 - 站点状态统计
 */
export function getSiteStatusTotal(params) {
  return request({
    url: '',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 工况查询 - 列表
 */
export function getWorkList(params) {
  return request({
    url: '/reservoirData/getIotBizSiteList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 安装建站数据 - 列表
 */
export function getInstallList(params) {
  return request({
    url: '/reservoirData/getIotBizSiteList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}


/**
 * 修改隐患点
 */
export function jcca02aUpdate(params) {
  return request({
    url: '/jcca/jcca02a/update',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}
/**
 * 雨情数据查询
 */
export function queryRainRealDataFromPg(params) {
  return request({
    url: '/largerScreen/queryRainRealDataFromPg',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 水情数据
 */
export function queryWaterRealDataFromPg(params) {
  return request({
    url: '/largerScreen/queryWaterRealDataFromPg',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// yh/queryDeviceHealth

/**
 * 水情数据
 */
export function queryDeviceHealth(params) {
  return request({
    url: '/yh/queryDeviceHealth',
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