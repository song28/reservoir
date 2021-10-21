/*
 * @Author: dang
 * @Date: 2021-08-11 09:36:00
 * @LastEditTime: 2021-08-27 10:07:35
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\systemManagement\subsystem\api.js
 */
import request from "@/utils/request";
const prod = process.env.VUE_APP_BASE_API_6;
// /addSystem添加子系统信息
export function addSystem(params) {
  return request({
    url: "/addSystem",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
//  子系统信息列表
export function systemList4Page(params) {
  return request({
    url: "/systemList4Page",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// /修改子系统信息
export function updateSystem(params) {
  return request({
    url: "/updateSystem",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
//   删除系统
export function delSystem(params) {
  return request({
    url: "/delSystem",
    baseURL: prod,
    method: "GET",
    params: params
  });
}
