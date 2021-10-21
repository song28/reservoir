import request from '@/utils/request'
const BASE_API_6 = process.env.VUE_APP_BASE_API_6 // yunw
const BASE_API_3 = process.env.VUE_APP_BASE_API_3 // wuming
const BASE_API_4 = process.env.VUE_APP_BASE_API_4 // wuming

import {previewUrlFile} from '@/api/base'
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
// userPatrolTJ
export function userPatrolTJ(params) {
  return request({
    url: '/map/userPatrolTJ',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}

// 根据水库编码查询库容曲线
export function getCapacityCurveByReservoirCode(params) {
  return request({
    url: '/web/rsvr/getCapacityCurveByReservoirCode',
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
// 修改水库人员
export function updateUserDetailInfo(params) {
  return request({
    url: '/web/inscptor/updateUserDetailInfo',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 根据水库人员ID查询用户详细信息
export function getUserDetailInfoById(params) {
  return request({
    url: '/web/inscptor/getUserDetailInfoById',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
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
// 根据角色ID和用户ID分页查询水库人员列表明细
export function findByInscptorPage(params) {
  return request({
    url: '/web/inscptor/findByInscptorPage',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 根据用户ID和角色ID批量删除水库关系人
export function deleteTotalBetch(params) {
  return request({
    url: '/web/inscptor/deleteTotalBetch',
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
// export function getAllRoles(params) {
//   return request({
//     url: "/role/getAllRoles",
//     baseURL: BASE_API_6,
//     method: "GET",
//     params: params
//   });
// }
// 获得所有角色role/getAllRoles
export function getAllRoles(params) {
  return request({
    url: '/sys/getAllRoles',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}

// 获得当前用户的所有角色
export function getCurrentUserAllRoles(params) {
  return request({
    url: '/sys/getRolesFromUsers ',
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
// 月报自定义下载 /download/skPatrolRecordFile4ZipByMonth
export function skPatrolRecordFile4ZipByMonth(params) {
  return request({
    url: '/download/skPatrolRecordFile4ZipByMonth',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}

// 水库列表开始----------------------

// 水库基础信息开始-----------------------------------
// 添加水库基础信息
export function addRsvrInfo(params) {
  return request({
    url: '/addRsvrInfo',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 修改水库基础信息
export function updateRsvrInfo(params) {
  return request({
    url: '/updateRsvrInfo',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 查询单个水库基础信息
export function loadRsvrInfo(params) {
  return request({
    url: '/loadRsvrInfo',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 基础信息结束-----------------------------------

// 大坝信息开始-----------------------------------
// 新增/编辑水库大坝信息
export function saveRsrDm(params, type) {
  return request({
    url: '/saveRsrDm',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 查询大坝详细信息
export function getRsrDmInfoByRscd(params) {
  return request({
    url: '/getRsrDmInfoByRscd',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 大坝信息开始-----------------------------------

// 溢洪道开始-----------------------------------
// 保存溢洪道基础信息
export function saveSw(params) {
  return request({
    url: '/saveSw',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 修改溢洪道基础信息
export function updateSw(params) {
  return request({
    url: '/updateSw',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 查询溢洪道详情
export function loadSwDetail(params) {
  return request({
    url: '/loadSwDetail',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 溢洪道结束-----------------------------------

// 水库效益开始-----------------------------------
// 保存水库工程效益信息
export function saveWrpRsrBn(params) {
  return request({
    url: '/saveWrpRsrBn',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 修改水库效益信息
export function updateWrpRsrBn(params) {
  return request({
    url: '/updateWrpRsrBn',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 查看水库效益信息详情
export function loadWrpRsrBnDetail(params) {
  return request({
    url: '/loadWrpRsrBnDetail',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 水库效益结束-----------------------------------

// 水位特征开始-----------------------------------
// 新增/编辑特征水位信息
export function saveRsrHych(params, type) {
  return request({
    url: '/saveRsrHych',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 查询水位特征详细信息
export function getRsrHychInfoByRscd(params) {
  return request({
    url: '/getRsrHychInfoByRscd',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 水位特征结束-----------------------------------

// 库容曲线开始-----------------------------------

// 根据水库编码查询水库水位库容曲线数据
export function loadWlstcparrl(params) {
  return request({
    url: '/loadWlstcparrl',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 库容曲线开始-----------------------------------

// 档案资料开始-----------------------------------
// 查询水库相关资料
export function fileTree(params) {
  return request({
    url: '/file/tree',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 保存档案资料
export function fileSave(params) {
  return request({
    url: '/file/save',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 删除档案资料
export function fileDel(params) {
  return request({
    url: '/file/del',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}

// 在线预览
export function getViewUrlWebPath(params) {
  return request({
    url: '/v1/api/file/getViewUrlWebPath', // "https://www.ljserver.cn/wps/v1/api/file/getViewUrlWebPath",
    baseURL: previewUrlFile, // 'http://221.222.251.177:8088',//BASE_API_6,//'http://221.222.253.220:8008/',//BASE_API_6,
    method: 'get',
    params: params
  })
}
// 档案资料结束-----------------------------------

// 分页查询水库基本信息
export function findRsrByPage(params) {
  return request({
    url: '/findRsrByPage',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}
// 水库列表结束----------------------
// 人员列表结束----------------------

// 分页查询水库基本信息
export function loadPersonlist4Page(params) {
  return request({
    url: '/personnel/loadPersonlist4Page',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}

// 添加水库责任人信息
export function personnelAdd(params) {
  return request({
    url: '/personnel/add',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}

// 修改水库责任人信息
export function personnelUpdate(params) {
  return request({
    url: '/personnel/update',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}

// 删除水库责任人信息
export function personnelDel(params) {
  return request({
    url: '/personnel/del',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}

// 查看人员详情
export function loadDetail(params) {
  return request({
    url: '/personnel/loadDetail',
    baseURL: BASE_API_6,
    method: 'get',
    params: params
  })
}

// 人员列表结束----------------------

// 监测项目开始============================================
// 查询监测项目列表
export function findRsrEnmnitByPage(params) {
  return request({
    url: '/enmnit/findRsrEnmnitByPage',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// 查询监测项目列表
export function saveRsrEnmint(params) {
  return request({
    url: '/enmnit/saveRsrEnmint',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}

// 批量删除监测项目列表
export function deleteByEnmnitids(params) {
  return request({
    url: '/enmnit/deleteByEnmnitids',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}

// 监测项目结束----------------------------------------------------

// 工程部位结束----------------------------------------------------
// 查询工程部位列表
export function getRsrPosListByRscd(params) {
  return request({
    url: '/rsrpos/getRsrPosListByRscd',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// 新增/编辑工程部位信息
export function saveRsrPos(params) {
  return request({
    url: '/rsrpos/saveRsrPos',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}

// 批量删除部位信息
export function deleteByIds(params) {
  return request({
    url: '/rsrpos/deleteByIds',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}
// 工程部位结束----------------------------------------------------

// ---------测点列表开始---------------------------
// 查询测点列表
export function getMonitPointList(params) {
  return request({
    url: '/enmnit/getMonitPointList',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}
// 新增/编辑表面垂直位移测点信息 01
export function saveVRPoint(params) {
  return request({
    url: '/enmnit/saveVRPoint',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}
// 新增/编辑表面水平位移测点信息 02
export function saveHMPoint(params) {
  return request({
    url: '/enmnit/saveHMPoint',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}
// 新增/编辑渗流压力测点信息 05
export function savePRPoint(params) {
  return request({
    url: '/enmnit/savePRPoint',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}
// 新增/编辑渗流压力测点信息 05
export function saveSyParameters(params) {
  return request({
    url: '/syParameters/save',
    baseURL: BASE_API_4,
    method: 'post',
    data: params
  })
}
// 新增/编辑渗流压力测点信息 05
export function updateSyParameters(params) {
  return request({
    url: '/syParameters/update',
    baseURL: BASE_API_4,
    method: 'post',
    data: params
  })
}
// 新增/编辑渗流压力测点信息 05
export function deleteSyParameters(params) {
  return request({
    url: '/syParameters/delete',
    baseURL: BASE_API_4,
    method: 'post',
    data: params
  })
}
// 新增/编辑渗流压力测点信息 05
export function selectByPointIdAndChannel(params) {
  return request({
    url: '/syParameters/selectByPointIdAndChannel',
    baseURL: BASE_API_4,
    method: 'get',
    params: params
  })
}
// 新增/编辑环境量测点信息 11
export function saveHLPoint(params) {
  return request({
    url: '/enmnit/saveHLPoint',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}

// 查询测点的详细信息
export function getMonitPointDetail(params) {
  return request({
    url: '/enmnit/getMonitPointDetail',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// 批量删除项目测点
export function deleteMonitPoint(params) {
  return request({
    url: '/enmnit/deleteMonitPoint',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// 批量删除项目测点
export function getRsrEnmnitList(params) {
  return request({
    url: '/enmnit/getRsrEnmnitList',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// 查询断面下测点列表
export function getRsrSectionInfo(params) {
  return request({
    url: '/enmnit/getRsrSectionInfo',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// 保存断面信息
export function saveRsrSection(params, enmnitid) {
  return request({
    url: '/enmnit/saveRsrSection?enmnitid=' + enmnitid,
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}
// 保存测点参数信息
export function savePointDeviceParam(params) {
  return request({
    url: '/enmnit/savePointDeviceParam',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}
// 保存测点附件信息
export function savePointAttch(params) {
  return request({
    url: '/enmnit/savePointAttch',
    baseURL: BASE_API_3,
    method: 'post',
    data: params
  })
}

// 查询测点的参数信息
export function getPointDeviceParam(params) {
  return request({
    url: '/enmnit/getPointDeviceParam',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}

// 查询测点的附件信息
export function getPointAttch(params) {
  return request({
    url: '/enmnit/getPointAttch',
    baseURL: BASE_API_3,
    method: 'get',
    params: params
  })
}
// ---------测点列表结束---------------------------

