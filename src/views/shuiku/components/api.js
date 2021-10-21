import request from '@/utils/request'

const BASE_API_6 = process.env.VUE_APP_BASE_API_6// yunw
const BASE_API_3 = process.env.VUE_APP_BASE_API_3// wuming
const BASE_API_4 = process.env.VUE_APP_BASE_API_4 // lixianzhao

// 云台控制
export function ptz(params) {
  return request({
    url: '/video/ptz/ptz',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}
// 停止控制
export function ptzStop(params) {
  return request({
    url: '/video/ptz/ptzStop',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}
// 焦点光圈控制
export function fi(params) {
  return request({
    url: '/video/ptz/fi',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}
// 预置位控制
export function preset(params) {
  return request({
    url: '/video/ptz/preset',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}
// 获取下级通道预置位
export function fetchpreset(params) {
  return request({
    url: '/video/ptz/fetchpreset',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}

// 查询召测历史
export function getImageList(params) {
  return request({
    url: '/cmd/getImageList',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}
// 获取发送预警信息集合
export function getSendList(params) {
  return request({
    url: '/warn/getSendList',
    baseURL: BASE_API_4,
    method: 'post',
    data: params
  })
}

// 获取水库关联责任人人员
export function getRsUserInfo(params) {
  return request({
    url: '/warn/getRsUserInfo',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}
// 查询单个测点监测数据列表
export function getMonitorDataByPointId(params) {
  return request({
    url: '/monitordata/getMonitorDataByPointId',
    baseURL: BASE_API_3,
    method: 'GET',
    params: params
  })
}
// 上报数据
export function getPatrolListByRscd(params) {
  return request({
    url: '/app/getPatrolListByRscd',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 预警统计
export function group(params) {
  return request({
    url: '/warn/group',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 查询智能感知曲线
export function getMonitorCurveData(params) {
  return request({
    url: '/monitordata/getMonitorCurveData',
    baseURL: BASE_API_3,
    method: 'GET',
    params: params
  })
}
export function callImage(query) {
  return request({
    baseURL: BASE_API_4,
    url: '/cmd/callImage?cusno=' + query,
    method: 'post',
    data: query
  })
}
// 查询水库基础信息
export function rsvrBaseInfoBy(params) {
  return request({
    url: '/rsvrBaseInfoBy',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 查询视频列表
export function list4Page(params) {
  return request({
    url: '/video/list4Page',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 开流
export function openVideo(url) {
  return request({
    url: '',
    baseURL: url,
    method: 'GET',
    params: ''
  })
}
// 查询工程部位列表
export function getRsrPosListByRscd(params) {
  return request({
    url: '/rsrpos/getRsrPosListByRscd',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// 查看图片接口
export function getReservoirImage(params) {
  return request({
    url: '/web/point/getReservoirImage',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 水库基本信息列表
export function getReservoirListByPage(params) {
  return request({
    url: '/web/rsvr/getReservoirListByPage',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 添加水库
export function addReservoirBaseInfo(params) {
  return request({
    url: '/web/rsvr/addReservoirBaseInfo',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 修改水库基本信息
export function updateReservoirBaseInfo(params) {
  return request({
    url: '/web/rsvr/updateReservoirBaseInfo',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}

// 水库详情
export function getBaseInfoById(params) {
  return request({
    url: '/web/rsvr/getBaseInfoById',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 新增水库管理人员
export function addReservoirInscptor(params) {
  return request({
    url: '/web/inscptor/addReservoirInscptor',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 配置水库人员
export function configReservoirInscptor(params) {
  return request({
    url: '/web/inscptor/configReservoirInscptor',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 根据人员ID删除人员与水库关系
export function deleteByInscptorId(params) {
  return request({
    url: '/web/inscptor/deleteByInscptorId',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 根据水库ID数组和角色ID数组查询人员列表
export function getInscptorByReservoirIdAndRoleId(params) {
  return request({
    url: '/web/inscptor/getInscptorByReservoirIdAndRoleId',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 分页查询水库人员列表
export function getReservoirInspctorByPage(params) {
  return request({
    url: '/web/inscptor/getReservoirInspctorByPage',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 查询所有点位列表
export function getAllPointLocationList(params) {
  return request({
    url: '/web/point/getAllPointLocationList',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 查询可配置项
export function getReservoirNotExistPointByReservoirId(params) {
  return request({
    url: '/web/point/getReservoirNotExistPointByReservoirId',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 根据已配置项
export function getReservoirPointByReservoirId(params) {
  return request({
    url: '/web/point/getReservoirPointByReservoirId',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 移除水库点位
export function removeAllotPointBatch(params) {
  return request({
    url: '/web/point/removeAllotPointBatch',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 添加水库点位
export function reservoirAllotPoint(params) {
  return request({
    url: '/web/point/reservoirAllotPoint',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 批量删除水库
export function deleteBatchReservoirInscptor(params) {
  return request({
    url: '/web/inscptor/deleteBatchReservoirInscptor',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 根据点位ID查询点位信息
export function getPointLocationById(params) {
  return request({
    url: '/web/point/getPointLocationById',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 分页查询水库点位信息列表
export function getPointLocationListByPage(params) {
  return request({
    url: '/web/point/getPointLocationListByPage',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 添加点位
export function addPointLocation(params) {
  return request({
    url: '/web/point/addPointLocation',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 修改点位
export function updatePointLocation(params) {
  return request({
    url: '/web/point/updatePointLocation',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 删除点位信息
export function deletePointLocationById(params) {
  return request({
    url: '/web/point/deletePointLocationById',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 获得所有用户
export function getAllUserList(params) {
  return request({
    url: '/user/getAllUserList',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 获得所有角色
export function getAllRoles(params) {
  return request({
    url: '/role/getAllRoles',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 导入excel水库李彪接口
export function imporData(params) {
  return request({
    url: '/web/rsvr/imporData',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 下载链接
export function model(params) {
  return request({
    url: '/web/rsvr/downloadTemplate',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 用户列表+角色类型
export function getUserRoleByUserId(params) {
  return request({
    url: '/web/inscptor/getUserRoleByUserId',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 查询水库相关资料
export function fileTree(params) {
  return request({
    url: '/file/tree',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 查询工情监测项目树
export function getRsrEnmnitTree(params) {
  return request({
    url: '/enmnit/getRsrEnmnitTree',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
