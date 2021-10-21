/*
 * @Author: dang
 * @Date: 2021-04-14 09:37:24
 * @LastEditTime: 2021-04-15 00:49:32
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\operationManagement\timedTask\api.js
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
//是否启用任务  /web/task/getOperTaskListByPage
export function updateTaskSwitch(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/task/updateTaskSwitch",
    method: "get",
    params: query
  });
}
// /web/task/deleteBatchById 根据任务操作ID批量删除任务
export function deleteBatchById(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/task/deleteBatchById",
    method: "get",
    params: query
  });
}
//获取svg文件路径
export function getSvgFilePath(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/test/generateSvg",
    method: "get",
    params: query
  });
}
