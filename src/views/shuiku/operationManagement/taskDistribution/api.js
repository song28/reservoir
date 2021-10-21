/*
 * @Author: dang
 * @Date: 2021-04-14 09:37:24
 * @LastEditTime: 2021-05-07 14:57:38
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\operationManagement\taskDistribution\api.js
 */
import request from "@/utils/request";

const BASE_API_6 = process.env.VUE_APP_BASE_API_6; //yunw

//定时任务  /web/task/getOperTaskListByPage
export function getOTaskListByPage(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/task/getOperTaskListByPage",
    method: "get",
    params: query
  });
}
//保存操作任务  /web/task/addTaskOper
export function addTaskOperation(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/task/addTaskOper",
    method: "post",
    data: query
  });
}
//  修改任务  /web/task/updateTaskOper
export function updateTaskOper(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/task/updateTaskOper",
    method: "post",
    data: query
  });
}
//获得所有角色 /sys/getRolesFromUsers /role/getAllRoles
export function getAllRoles(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/getRolesFromUsers",
    method: "get",
    params: query
  });
}
//根据水库ID数组和角色ID数组查询人员列表  /web/inscptor/getInscptorByReservoirIdAndRoleId
export function getReservoirIdAndRoleId(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/inscptor/getInscptorByReservoirIdAndRoleId",
    method: "get",
    params: query
  });
}
// 根据任务操作ID查询详情 /web/task/getTaskOperDetailById
export function getTaskOperDetailById(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/task/getTaskOperDetailById",
    method: "get",
    params: query
  });
}
