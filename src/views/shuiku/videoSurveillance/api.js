import request from '@/utils/request'
const BASE_API_2 = process.env.VUE_APP_BASE_API_2 // yunw
const BASE_API_6 = process.env.VUE_APP_BASE_API_6 // yunw

// 图片召测接口


// 添加视频
export function addVideo(params) {
  return request({
    url: '/video/add',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
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
// 修改视频列表
export function update(params) {
  return request({
    url: '/video/update',
    baseURL: BASE_API_6,
    method: 'POST',
    data: params
  })
}
// 删除视频列表
export function del(params) {
  return request({
    url: '/video/del',
    baseURL: BASE_API_6,
    method: 'GET',
    params: params
  })
}
// 查看图片接口
export function getReservoirImage(params) {
  return request({
    url: '/web/point/getReservoirImage',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 水库基本信息列表
export function getReservoirListByPage(params) {
  return request({
    url: '/web/rsvr/getReservoirListByPage',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 添加水库
export function addReservoirBaseInfo(params) {
  return request({
    url: '/web/rsvr/addReservoirBaseInfo',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 修改水库基本信息
export function updateReservoirBaseInfo(params) {
  return request({
    url: '/web/rsvr/updateReservoirBaseInfo',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 水库详情
export function getBaseInfoById(params) {
  return request({
    url: '/web/rsvr/getBaseInfoById',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// userPatrolTJ
export function userPatrolTJ(params) {
  return request({
    url: '/map/userPatrolTJ',
    baseURL: BASE_API_2,
    method: 'post',
    data: params
  })
}

// 根据水库编码查询库容曲线
export function getCapacityCurveByReservoirCode(params) {
  return request({
    url: '/web/rsvr/getCapacityCurveByReservoirCode',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 新增水库管理人员
export function addReservoirInscptor(params) {
  return request({
    url: '/web/inscptor/addReservoirInscptor',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 修改水库人员
export function updateUserDetailInfo(params) {
  return request({
    url: '/web/inscptor/updateUserDetailInfo',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 根据水库人员ID查询用户详细信息
export function getUserDetailInfoById(params) {
  return request({
    url: '/web/inscptor/getUserDetailInfoById',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 配置水库人员
export function configReservoirInscptor(params) {
  return request({
    url: '/web/inscptor/configReservoirInscptor',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 根据人员ID删除人员与水库关系
export function deleteByInscptorId(params) {
  return request({
    url: '/web/inscptor/deleteByInscptorId',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 根据水库ID数组和角色ID数组查询人员列表
export function getInscptorByReservoirIdAndRoleId(params) {
  return request({
    url: '/web/inscptor/getInscptorByReservoirIdAndRoleId',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 分页查询水库人员列表
export function getReservoirInspctorByPage(params) {
  return request({
    url: '/web/inscptor/getReservoirInspctorByPage',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 查询所有点位列表
export function getAllPointLocationList(params) {
  return request({
    url: '/web/point/getAllPointLocationList',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 查询可配置项
export function getReservoirNotExistPointByReservoirId(params) {
  return request({
    url: '/web/point/getReservoirNotExistPointByReservoirId',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 根据已配置项
export function getReservoirPointByReservoirId(params) {
  return request({
    url: '/web/point/getReservoirPointByReservoirId',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 移除水库点位
export function removeAllotPointBatch(params) {
  return request({
    url: '/web/point/removeAllotPointBatch',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 添加水库点位
export function reservoirAllotPoint(params) {
  return request({
    url: '/web/point/reservoirAllotPoint',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 批量删除水库
export function deleteBatchReservoirInscptor(params) {
  return request({
    url: '/web/inscptor/deleteBatchReservoirInscptor',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 根据点位ID查询点位信息
export function getPointLocationById(params) {
  return request({
    url: '/web/point/getPointLocationById',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 分页查询水库点位信息列表
export function getPointLocationListByPage(params) {
  return request({
    url: '/web/point/getPointLocationListByPage',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 根据角色ID和用户ID分页查询水库人员列表明细
export function findByInscptorPage(params) {
  return request({
    url: '/web/inscptor/findByInscptorPage',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 根据用户ID和角色ID批量删除水库关系人
export function deleteTotalBetch(params) {
  return request({
    url: '/web/inscptor/deleteTotalBetch',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 添加点位
export function addPointLocation(params) {
  return request({
    url: '/web/point/addPointLocation',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 修改点位
export function updatePointLocation(params) {
  return request({
    url: '/web/point/updatePointLocation',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 删除点位信息
export function deletePointLocationById(params) {
  return request({
    url: '/web/point/deletePointLocationById',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 获得所有用户
export function getAllUserList(params) {
  return request({
    url: '/user/getAllUserList',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 获得所有角色
// export function getAllRoles(params) {
//   return request({
//     url: "/role/getAllRoles",
//     baseURL: BASE_API_2,
//     method: "GET",
//     params: params
//   });
// }
// 获得所有角色role/getAllRoles
export function getAllRoles(params) {
  return request({
    url: '/sys/getAllRoles',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}

// 获得当前用户的所有角色
export function getCurrentUserAllRoles(params) {
  return request({
    url: '/sys/getRolesFromUsers ',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 导入excel水库李彪接口
export function imporData(params) {
  return request({
    url: '/web/rsvr/imporData',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 下载链接
export function model(params) {
  return request({
    url: '/web/rsvr/downloadTemplate',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 用户列表+角色类型
export function getUserRoleByUserId(params) {
  return request({
    url: '/web/inscptor/getUserRoleByUserId',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 月报自定义下载 /download/skPatrolRecordFile4ZipByMonth
export function skPatrolRecordFile4ZipByMonth(params) {
  return request({
    url: '/download/skPatrolRecordFile4ZipByMonth',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}

// ======kaishi---ssss==================================
// 添加水库基础信息
export function addRsvrInfo(params) {
  return request({
    url: '/addRsvrInfo',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
// 添加大坝信息
export function addRsvrInfo222(params) {
  return request({
    url: '/addRsvrInfo222',
    baseURL: BASE_API_2,
    method: 'POST',
    data: params
  })
}
