/*
 * @Author: dang
 * @Date: 2021-04-14 09:37:24
 * @LastEditTime: 2021-04-14 21:45:44
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\operationManagement\taskList\api.js
 */
import request from "@/utils/request";

const BASE_API_6 = process.env.VUE_APP_BASE_API_6; //yunw

//分页查询任务明细列表  /web/task/getOperTaskListByPage
export function getTaskDetailListByPage(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/task/getTaskDetailListByPage",
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
