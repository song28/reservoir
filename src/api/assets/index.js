import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2

/**
 * 养护计划
 * 列表
 */
export function getPlanList(params) {
  return request({
    url: '/patrolplan/getPatrolPlansByPars',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划
 * 新增
 */
export function savePlan(params) {
  return request({
    url: '/patrolplan/savePatrolPlan',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划
 * 删除
 */
export function delectPlan(params) {
  return request({
    url: '/patrolplan/deletePatrolPlanByIds',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划 分配
 * 获取人员
 */
export function getPlanAssigUser(params) {
  return request({
    url: 'iotComProj/getUserByRoleName',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划 分配
 * 保存
 */
export function savePlanAssign(params) {
  return request({
    url: '/patrolplan/distributionPlanByPlanId',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划 巡检任务
 * 列表
 */
export function getPlanTaskList(params) {
  return request({
    url: 'patrolplan//getPatrolTasksByPars',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划 获取站点列表
 * 列表
 */
export function getSiteList(params) {
  return request({
    url: '/patrolplan/getDeviceToPatrolTask',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划 巡检任务
 * 新增
 */
export function savePlanTask(params) {
  return request({
    url: '/patrolplan/savePatrolTaskByPlanId',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}

/**
 * 养护计划 巡检任务
 * 删除
 */
export function delectPlanTask(params) {
  return request({
    url: 'patrolplan/deletePatrolTaskByIds',
    baseURL: baseAPI,
    method: 'POST',
    data: params
  })
}
