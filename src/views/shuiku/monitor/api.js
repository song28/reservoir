import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2
const baseAPI6 = process.env.VUE_APP_BASE_API_6
const baseAPI4 = process.env.VUE_APP_BASE_API_4;

//一库一码
export function getQrCodeByRscd(params) {
  return request({
    url: '/oneRsvrOneQrCode/getQrCodeByRscd',
    baseURL: baseAPI4,
    method: 'GET',
    params: params
  })
}

//统计数量
export function getPointBsinWarnByAddvcd(params) {
  return request({
    url: '/enmnit/getPointBsinWarnByAddvcd',
    baseURL: baseAPI4,
    method: 'GET',
    params: params
  })
}
//关注接口
export function focusRsvr(params) {
  return request({
    url: '/focusRsvr',
    baseURL: baseAPI6,
    method: 'GET',
    params: params
  })
}
//取消接口
export function unfocusRsvr(params) {
  return request({
    url: '/unFocusRsvr',
    baseURL: baseAPI6,
    method: 'GET',
    params: params
  })
}
 
//根据名称选择行政区划
export function districtNameLngLat(name) {
  return request({
    url: 'https://restapi.amap.com/v3/config/district?key=6013cc390e75fadb2d295d0b0b22fa1e&keywords=' + name + '&subdistrict=1&extensions=all',
    method: 'GET'
  })
}
// 根据行政区编码获取地图json文件和经纬度
export function queryLocationByPac(params) {
  return request({
    url: '/queryLocationByPac',
    baseURL: baseAPI6,
    method: 'GET',
    params: params
  })
}
//预警列表
export function warnList(params) {
  return request({
    url: "/warn/list",
    baseURL: baseAPI4,
    method: "POST",
    data: params
  });
}
//预警统计
export function group(params) {
  return request({
    url: "/warn/group",
    baseURL: baseAPI4,
    method: "POST",
    data: params
  });
}
// 2 大坝
// 2.水库总览接口
export function allMonitor(query) {
  return request({
    url: '/complex/allMonitor',
    baseURL: baseAPI6,
    method: 'post',
    data: query
  })
}
// 2.行政区树
export function addvnmTree(query) {
  return request({
    url: '/addvnmTree',
    baseURL: baseAPI6,
    method: 'post',
    data: query
  })
}
// 2.水库水位状态统计
export function monitorStatusCount(query) {
  return request({
    url: '/complex/monitorStatusCount',
    baseURL: baseAPI6,
    method: 'post',
    data: query
  })
}
// 2.根据名称返回水库编码
export function vagueWordFindRsnmList(query) {
  return request({
    url: '/complex/vagueWordFindRsnmList',
    baseURL: baseAPI6,
    method: 'get',
    params: query
  })
}



// 水库点
export function getReservoirListByPage(params) {
  return request({
    url: '/web/rsvr/getReservoirListByPage',
    baseURL: baseAPI,
    method: 'GET',
    params: params
  })
}
export function getAllSk4Map(query) {
  return request({
    url: '/map/getSkAll4Map',
    baseURL: baseAPI,
    method: 'post',
    data: query
  })
}

// 人员列表
export function getPerson(params) {
  return request({
    baseURL: baseAPI,
    url: '/app/queryUsersLocation',
    method: 'GET',
    params: params
  })
}
// 消息提醒
export function pushInfo(query) {
  return request({
    baseURL: baseAPI,
    url: '/push/patrolInfo',
    method: 'post',
    data: query
  })
}
// 地图统计各种数量接口
export function getMapTj(params) {
  return request({
    baseURL: baseAPI,
    url: '/map/getMapTj',
    method: 'get',
    params: params
  })
}
// 行政区查询

// 消息通知添加
export function addMessage(query) {
  return request({
    baseURL: baseAPI,
    url: '/push/addMessage',
    method: 'post',
    data: query
  })
}
// 消息通知查询
export function queryMessage(query) {
  return request({
    baseURL: baseAPI,
    url: '/push/queryMessage',
    method: 'post',
    data: query
  })
}
// 消息通知删除
export function delMessage(query) {
  return request({
    baseURL: baseAPI,
    url: '/push/delMessage',
    method: 'post',
    data: query
  })
}

const weather = 'http://116.52.166.246:9920/'
// 图像站--设备列表
export function devicelist(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZYWXC/devops/devicelist',
    method: 'post',
    data: query
  })
}
export function piclist(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZYWXC/devops/piclist',
    method: 'post',
    data: query
  })
}
// ghn隐患点接口
// 地图设备列表
export function postGetdevicelist(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/map/getdevicelist',
    method: 'post',
    data: query
  })
}
// 地图天气接口
export function getWeatherinfo(query) {
  return request({
    baseURL: 'http://47.112.159.173:18088',
    url: '/map/getWeatherinfo',
    method: 'post',
    data: query
  })
}
// 地图云图和雷达
export function cloudList(query) {
  return request({
    baseURL: weather,
    url: '/weather/cloud/list',
    method: 'get',
    params: query
  })
}
// 云图图片
export function cloudListImg(query, id) {
  return request({
    baseURL: weather,
    url: '/weather/cloud/image/' + id,
    method: 'get',
    params: query
  })
}
// ghn
// 隐患点查询接口：DZZHJS/hdp/gethdpinfo
// 隐患点关注、取关接口：DZZHJS/hdp/attention
// 隐患点下设备列表接口：DZZHJS/hdp/getDeviceListbyhdp
// 设备监测数据查询接口：DZZHJS/hdp/getMonitorDataByDevice
export function postGethdpinfo(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/hdp/gethdpinfo',
    method: 'post',
    data: query
  })
}
export function postAttention(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/hdp/attention',
    method: 'post',
    data: query
  })
}
export function postGetDeviceListbyhdp(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/hdp/getDeviceListbyhdp',
    method: 'post',
    data: query
  })
}
export function postGetMonitorDataByDevice(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/hdp/getMonitorDataByDevice',
    method: 'post',
    data: query
  })
}
// 设备基本信息接口
export function deviceInfo(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZXXMB/device/info',
    method: 'post',
    data: query
  })
}
// 设备基本信息修改接口
export function deviceUpdate(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZXXMB/device/update',
    method: 'post',
    data: query
  })
}
// 承建单位
export function contractunit(query) {
  return request({
    baseURL: baseAPI,
    url: '/statistical/contractunit',
    method: 'get',
    params: query
  })
}

// 建设单位
export function buildunit(query) {
  return request({
    baseURL: baseAPI,
    url: '/statistical/buildunit',
    method: 'get',
    params: query
  })
}

// 预警参数地表裂缝
export function queryAlertConfByPageLF(query) {
  return request({
    baseURL: baseAPI,
    url: '/yj/queryAlertConfByPage/LF',
    method: 'post',
    data: query
  })
}
// 预警参数泥水位
export function getNswConf(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZYJCZ/post/getNswConf',
    method: 'post',
    data: query
  })
}
// 巡查接口
export function getXunClist(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZYWXC/patrol/list',
    method: 'post',
    data: query
  })
}
// 更改后的巡查图片接口
export function getXunChalist(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZYWXC/devops/insperctionpiclist',
    method: 'post',
    data: query
  })
}
// 工程管理

export function getstationpiclist(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZYWXC/devops/stationpiclist',
    method: 'post',
    data: query
  })
}
// 视频接口
export function videoList(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/video/list',
    method: 'get',
    params: query
  })
}

// 开始云台控制
export function videoPtzStart(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/video/ptz/start',
    method: 'post',
    data: query
  })
}
// 停止云台控制
export function videoPtzStop(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/video/ptz/stop',
    method: 'post',
    data: query
  })
}
// 录制视频列表
export function recordList(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/video/record/list',
    method: 'get',
    params: query
  })
}
// 开始录制
export function recordStart(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/video/record/start',
    method: 'get',
    params: query
  })
}
// 停止录制
export function recordStop(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/video/record/stop',
    method: 'get',
    params: query
  })
}
// 裂缝LF
export function postChark(query) {
  return request({
    baseURL: baseAPI,
    url: '/yh/deviceMonitValues/LF',
    method: 'post',
    data: query
  })
}
// 拉线
export function postMove(query) {
  return request({
    baseURL: baseAPI,
    url: '/yh/deviceMonitValues/GNSS',
    method: 'post',
    data: query
  })
}
// 综合监测

/**
 * 获取统计信息
 */
export function getSiteTotalData(data) {
  return request({
    baseURL: baseAPI,
    url: '/reservoirData/countReservoirAndDevice',
    method: 'post',
    data: data
  })
}

/**
 * 获取站点列表
 */
export function getAllSite(params) {
  return request({
    // url: '/reservoirData/getIotBizSiteList',
    url: '/ledCenter/getDeviceInfos',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

/**
 * 获取预警信息
 */
export function getWarningData(data) {
  return request({
    baseURL: baseAPI,
    url: '/warn/getWarnsOfUsers',
    method: 'post',
    data: {}
  })
}

/**
 * 获取水情统计信息
 */
export function getWaterTotalData(data) {
  return request({
    baseURL: baseAPI,
    url: '',
    method: 'post',
    data: data
  })
}

/**
 * 获取雨情统计信息
 */
export function getRainTotalData(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/statisticsDeviceLfData',
    method: 'post',
    data: data
  })
}

/**
 * 获取雨量统计信息
 */
export function statisticsDeviceRain(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/statisticsDeviceRain',
    method: 'post',
    data: data
  })
}

/**
 * 获取雨量统计信息
 */
export function getGNSSList(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/queryDeviceMonit/GNSS',
    method: 'post',
    data: data
  })
}
/**
 * 根据隐患点ID和设备类型的NodeKey获取设备列表
 */
export function queryDeviceInfos(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/queryDeviceInfos',
    method: 'post',
    data: data
  })
}

export function queryUsersNodeKey(data) {
  return request({
    baseURL: baseAPI,
    url: '/largerScreen/queryUsersNodeKey',
    method: 'post',
    data: data
  })
}

/**
 * 获取水库业务相关的预警信息
 */
export function getIotBizSiteWarnList(data) {
  return request({
    baseURL: baseAPI,
    url: '/reservoirData/getIotBizSiteWarnList',
    method: 'post',
    data: data
  })
}

/**
 * 获取站点基本信息
 */
export function getBasicData(data) {
  return request({
    baseURL: baseAPI,
    url: '/oneMap/getDeviceData',
    method: 'post',
    data: data
  })
}
/**
 * 隐患点获取监测设备
 */
export function queryDictInfo(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/queryDictInfo',
    method: 'get',
    params: data
  })
}
/**
 * 雨量获取监测设备
 */
export function queryDictInfoByStation(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/queryDictInfoByStation',
    method: 'get',
    params: data
  })
}
/**
 * 雨量列表
 */
export function queryDeviceRain(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/queryDeviceRain',
    method: 'post',
    data: data
  })
}

/**
 * 获取危险区信息
 */
export function getDangerData(data) {
  return request({
    baseURL: baseAPI,
    url: '',
    method: 'post',
    data: data
  })
}

/**
 * 获取气象信息
 */
export function getWeaterData(data) {
  return request({
    baseURL: baseAPI,
    url: '',
    method: 'post',
    data: data
  })
}

/**
 * 获取设备的实时监测数据
 * deviceIds: []
 * deviceIds: 1 或 0
 * indicatorId: 指标ID
 *
 */
export function getDeviceRealData(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/queryDeviceMonit/LF',
    method: 'post',
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
    url: '/neilaw/queryDeviceCateInfos',
    method: 'post',
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
// export function queryDeviceInfos(data) {
//   return request({
//     baseURL: baseAPI,
//     url: '/yh/queryDeviceInfos',
//     method: 'post',
//     data: data
//   })
// }
// 隐患点、地表位移、地表裂缝实时数据新接口
export function loadNew(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/loadNewData', // /yh/loadNew
    method: 'post',
    data: data
  })
}
// yh/loadRunCount统计雨量接口
export function loadRunCount(data) {
  return request({
    baseURL: baseAPI,
    url: '/yh/loadRunCount', // yh/loadRunCount
    method: 'post',
    data: data
  })
}

// 接口tq
export function getTq(data) {
  return request({
    url: '/yh/tq',
    method: 'POST',
    data: data,
    baseURL: baseAPI
  })
}

// ###设备编码找隐患id
export function getPointID(data) {
  return request({
    url: '/IotDsSql/listAll/cusno_get_pointId',
    method: 'POST',
    data: data,
    baseURL: baseAPI
  })
}
// ###获取一表两卡的详情
export function preventionPlan(query) {
  return request({
    baseURL: baseAPI,
    url: '/yblk/preventionplan',
    method: 'get',
    params: query
  })
}
// 明白卡
export function preventionanalyze(query) {
  return request({
    baseURL: baseAPI,
    url: '/yblk/preventionanalyze',
    method: 'get',
    params: query
  })
}
// 避险明白卡
export function avoidanalyze(query) {
  return request({
    baseURL: baseAPI,
    url: '/yblk/avoidanalyze',
    method: 'get',
    params: query
  })
}

// 预警查询
export function getYjInfo(query) {
  return request({
    baseURL: baseAPI,
    url: '/DZZHJS/yj/getYjInfo',
    method: 'post',
    data: query
  })
}

