import request from '@/utils/request'

const BASE_API = process.env.VUE_APP_BASE_API_2
const baseAPI = process.env.VUE_APP_BASE_API_2
// 获取设备要素
export function getDeviceElement(query) {
  return request({
    baseURL: BASE_API,
    url: '/iotdev/getElementByDeviceId',
    method: 'POST',
    data: query
  })
}

// 获取设备类型
export function queryDeviceTypeList(query) {
  return request({
    baseURL: BASE_API,
    url: '/neilaw/queryDeviceTypeList',
    method: 'POST',
    data: query
  })
}

//获取图表数据
export function getDeviceChartData(query) {
  return request({
    baseURL: BASE_API,
    url: 'yh/deviceMonitValues/RAIN', //'/realTimeData/getRealTimeDataByDeviceID',
    method: 'post',
    data: query
  })
}
//获取图表数据(包括累积雨量)
export function getDeviceSumChartData(query) {
  return request({
    baseURL: BASE_API,
    url: '/yh/deviceMonitValues/RAIN',
    method: 'post',
    data: query
  })
}
// 获取工况charts数据
export function queryRealDataByCusno(query) {
  return request({
    baseURL: BASE_API,
    url: '/yh/queryRealDataByCusno',
    method: 'post',
    data: query
  })
}

//获取图表GNSS基准值数据
export function getChartGNSSStandardData(query) {
  return request({
    baseURL: BASE_API,
    url: '/yj/queryAlertConfByCusno/GNSS',
    method: 'post',
    data: query
  })
}

//获取图表拉线基准值数据
export function getChartLFStandardData(query) {
  return request({
    baseURL: BASE_API,
    url: '/yj/queryAlertConfByCusno/LF',
    method: 'post',
    data: query
  })
}

//获取站点基本信息
export function getDeviceBasicInfo(query) {
  return request({
    baseURL: BASE_API,
    url: '/iotdev/getIotBizDeviceDetail',
    method: 'post',
    data: query
  })
}

//获取站点预警日志
export function getDeviceWarnData(query) {
  return request({
    baseURL: BASE_API,
    url: '/reservoirData/getIotBizSiteWarnList',
    method: 'post',
    data: query
  })
}

//获取站点历史图像
export function getDeviceImageData(query) {
  return request({
    baseURL: BASE_API,
    url: '/image/getDeviceCalledPicture',
    method: 'post',
    data: query
  })
}

//获取站点安装建站数据 -- 图像
export function getDeviceInstallImgae(query) {
  return request({
    baseURL: BASE_API,
    url: '/reservoirData/getBuildImageListByCusno',
    method: 'post',
    data: query
  })
}


//获取站点安装建站 -- 视频
export function getDeviceInstallVideo(query) {
  return request({
    baseURL: BASE_API,
    url: '/iotTaskInfo/findVideoListById',
    method: 'post',
    data: query
  })
}

// 根据设备ID 查找各种实时数据
export function getRealTimeDataByDeviceID(query) {
  return request({
    baseURL: BASE_API,
    url: '/realTimeData/getRealTimeDataByDeviceID',
    method: 'POST',
    data: query
  })
}

// 根据设备ID 查找各种最新数据
export function getLastRealTimeDataByDeviceID(query) {
  return request({
    baseURL: BASE_API,
    url: '/realTimeData/getLastRealTimeDataByDeviceID',
    method: 'POST',
    data: query
  })
}

// 根据设备ID 查找其报警记录
export function getWarnList(query) {
  return request({
    baseURL: BASE_API,
    url: '/iotBizWarn/getLastWarnByDeviceID',
    method: 'POST',
    data: query
  })
}

// 查询单个设备近一天到报数
export function getReportRateByDeviceID(query) {
  return request({
    baseURL: BASE_API,
    url: '/realTimeData/getReportRateByDeviceID',
    method: 'POST',
    data: query
  })
}
// 查询单个设备近一天到报数
export function getNewRepair(query) {
  return request({
    baseURL: BASE_API,
    url: '/repairForm/getNewRepair',
    method: 'POST',
    data: query
  })
}

// 获取设备数据
export function getDeviceData(query) {
  return request({
    baseURL: BASE_API,
    url: 'oneMap/getDeviceData',
    method: 'post',
    data: query
  })
}

// 所有的设备类型
export function querySttps(query) {
  return request({
    baseURL: BASE_API,
    url: '/statistics/querySttps',
    method: 'get'
  })
}

// 操作视频设备
export function controlVideo(data) {
  return request({
    url: '/video/control',
    method: 'post',
    baseURL: prod,
    data: data
  })
}

/**
 * 获取设备的实时属性的信息
 * deviceIds: []
 * deviceIds: 1 或 0 
 * indicatorId: 指标ID
 *  
 */
export function queryDeviceCateInfos(data) {
  return request({
    baseURL: baseAPI,
    url: '/oper/queryDeviceCateInfos',
    method: 'post',
    data: data
  })
}

/**
 * 获取字典值列表
 */
export function getitemsbydict(data) {
  return request({
    baseURL: baseAPI,
    url: '/dv/list',
    method: 'post',
    data: data
  })
}
/**
 * 获取字典值列表
 */
export function queryNeilaoRelaDevice(data) {
  return request({
    baseURL: baseAPI,
    url: '/largerScreen/queryNeilaoRelaDevice',
    method: 'post',
    data: data
  })
}
/**
 * 获取Gnss数据
 */
export function getGnssData(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/deviceMonitValues/GNSS',
    method: 'post',
    data: data
  })
}

/**
 * 获取地表裂缝数据
 */
export function getLFData(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/deviceMonitValues/LF',
    method: 'post',
    data: data
  })
}
// 查询设备的属性
export function getVueThingGatherDeviceInfoSingle(params) {
  return request({
    url: '/thingTag/getVueThingGatherDeviceInfoSingle',
    baseURL: baseAPI,
    method: 'get',
    params: params
  })
}

// 单个设备控制
export function SendCallCmd(params) {
  return request({
    url: '/thingTag/sendCallCmd',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}
/**
 * 获取设备过程数据
 */
export function loadHis(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/loadHis',
    method: 'post',
    data: data
  })
}

