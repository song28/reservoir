import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2

// 报修管理-列表
export function getServiceList(params) {
  return request({
    url: '/repairForm/getRepairList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 审核管理-列表
export function getCheckList(params) {
  return request({
    url: 'mendExamin/getExaminList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 维修工单-列表
export function getWorkList(params) {
  return request({
    url: 'repair/findRepairOrderList',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 保存报修单
export function saveServiceForm(params) {
  return request({
    url: '/workOrderProcess/startEvent',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 维修派单保存
export function saveOrders(params) {
  return request({
    // url: '/repair/addMendOrder',
    url: '/workOrderProcess/submitEvent',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 维修派单人员
export function getOrdersUser(params) {
  return request({
    url: '',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 获取工单详情
export function getWorkDetailInfo(params) {
  return request({
    url: 'repair/findRepairOrderDetailById',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 获取设备详情
export function getDeviceInfo(params) {
  return request({
    url: 'repair/getDeviceByID',
    // url: 'oneMap/getDeviceData',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 选择备件
export function getSpartparts(params) {
  return request({
    url: 'spareparts/selectByProductId',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 提交审核
export function saveSubmitAudit(params) {
  return request({
    // url: 'mendExamin/saveMendExamin',
    url: 'workOrderProcess/submitEvent',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 保存工单信息
export function saveWorkInfo(params) {
  return request({
    // url: 'repair/editRepairOrderDetailById',
    url: 'workOrderProcess/submitEvent',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 处理审核（通过不通过）
export function updateWorkExamine(params) {
  return request({
    // url: '/mendExamin/saveMendExamin',
    url: 'workOrderProcess/submitEvent',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 获取工单流程
export function getProcess(params) {
  return request({
    url: '/repair/changeMendProcessStateInfo',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 领取维修工单
export function receivemend(params) {
  return request({
    // url: '/repair/receiveMendByid',
    url: '/workOrderProcess/submitEvent',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 根据工单编码和状态码查询状态相关信息
export function changeMendProcessStateInfo(params) {
  return request({
    url: '/repair/changeMendProcessStateInfo',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

export function statisticsMend(params) {
  return request({
    url: '/repair/statisticsMend',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}
// 根据图片id和类型查询图片
export function getImages(params) {
  return request({
    url: '/repairForm/getImages',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}
