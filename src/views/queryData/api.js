import request from '@/utils/request'

// const baseAPI = process.env.VUE_APP_BASE_API_2
const baseAPI = "http://192.168.1.105:18082/"

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

const BASE_API_6 = process.env.VUE_APP_BASE_API_6

/**
 * 1.0. 统计查询------查询列表
 */
export function RainWaterList(params) {
  return request({
    url: '/reservoirData/getIotBizSiteList',
    method: 'POST',
    data: params,
    baseURL: BASE_API_6
  })
}
//1.1. 统计查询---监测隐患点---查询列表
export function hiddendangers(params) {
  return request({
    url: '/statistical/hiddendangers',
    method: 'get',
    params: params,
    baseURL: BASE_API_6
  })
}
//1.2.统计查询---监测隐患点---新增数据
export function add(params) {
  return request({
    url: '/statistical/hiddendanger/add',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//1.3.统计查询---监测隐患点---修改数据
export function update(params) {
  return request({
    url: '/statistical/hiddendanger/update',
    method: 'patch',
    data: params,
    baseURL: BASE_API_6
  })
};
//1.4.统计查询---监测隐患点---删除
export function delInfo(params) {
  return request({
    url: '/statistical/hiddendanger/delete',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//2.1.统计查询---监测站点---查询
export function monitorstation(params) {
  return request({
    url: '/statistical/monitorstation',
    method: 'get',
    params: params,
    baseURL: BASE_API_6
  })
}
//2.2  统计查询---监测站点---新增  
export function monitorstationAdd(params) {
  return request({
    url: '/statistical/monitorstation/add',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//2.3 统计查询---监测站点--- 修改
export function monitorstationUpdate(params) {
  return request({
    url: '/statistical/monitorstation/update',
    method: 'patch',
    data: params,
    baseURL: BASE_API_6
  })
}
//2.3统计查询---监测站点---  删除  
export function monitorstationDel(params) {
  return request({
    url: '/statistical/monitorstation/delete',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//3.1统计查询---监测责任人---查询
export function dutyperson(params) {
  return request({
    url: '/statistical/dutyperson',
    method: 'get',
    params: params,
    baseURL: BASE_API_6
  })
}
//4.1建设单位--查询
export function buildunit(params) {
  return request({
    url: '/statistical/buildunit',
    method: 'get',
    params: params,
    baseURL: BASE_API_6
  })
}
//4.2建设单位--增加
export function buildunitAdd(params) {
  return request({
    url: '/statistical/buildunit/add',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//4.3建设单位--修改
export function buildunitUpdate(params) {
  return request({
    url: '/statistical/buildunit/update',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//4.3建设单位--删除
export function buildunitDelete(params) {
  return request({
    url: '/statistical/buildunit/delete',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//5.1  承建单位
export function contractunit(params) {
  return request({
    url: '/statistical/contractunit',
    method: 'get',
    params: params,
    baseURL: BASE_API_6
  })
}
//5.2 承建单位--增加
export function contractunitAdd(params) {
  return request({
    url: '/statistical/contractunit/add',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//5.3 承建单位 --修改
export function contractunitUpdate(params) {
  return request({
    url: '/statistical/contractunit/update',
    method: 'patch',
    data: params,
    baseURL: BASE_API_6
  })
}
//5.4 承建单位--删除
export function contractunitDelete(params) {
  return request({
    url: '/statistical/contractunit/delete',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//6.1 运维单位--
export function operationunit(params) {
  return request({
    url: '/statistical/operationunit',
    method: 'get',
    params: params,
    baseURL: BASE_API_6
  })
}
//6.1 运维单位--增加
export function operationunitAdd(params) {
  return request({
    url: '/statistical/operationunit/add',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//6.2 运维单位--修改
export function operationunitUpdate(params) {
  return request({
    url: '/statistical/operationunit/update',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}
//6.3 运维单位--删除
export function operationunitDelete(params) {
  return request({
    url: '/statistical/operationunit/delete',
    method: 'post',
    data: params,
    baseURL: BASE_API_6
  })
}

export function queryRealDataByDataType(params) {
  return request({
    url: '/largerScreen/queryRealDataByDataType',
    method: 'post',
    data: params,
    baseURL: baseAPI
  })
}
/**
 * 批量保存库容曲线
 * @param params
 * @constructor
 */
export function IotNlWaterstagecubageBatchSave(params) {
  return request({
    url: '/IotNlWaterstagecubage/batchSave',
    method: 'post',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * led屏列表
 */
export function getLedList(params) {
  return request({
    url:'/ledCenter/getDeviceInfos',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}



/**
 * 根据站点名称获取数据点数据
 * @param params
 * @constructor
 */
export function IotNlWaterstagecubageGetDataPoints(params) {
  return request({
    url: '/IotNlWaterstagecubage/getDataPoints',
    method: 'get',
    params: params,
    baseURL: BASE_API_6
  })
}


// 查询有雨量统计信息
export function loadJJRunCount(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/loadJJRunCount',
    method: 'post',
    data: data
  })
}
