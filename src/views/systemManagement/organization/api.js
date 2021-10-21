/*
 * @Author: dang
 * @Date: 2021-08-04 10:47:19
 * @LastEditTime: 2021-08-27 10:07:22
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\systemManagement\organization\api.js
 */
import request from "@/utils/request";
const prod = process.env.VUE_APP_BASE_API_6;

//用户列表+角色类型
export function getUserRoleByUserId(params) {
  return request({
    url: "/web/inscptor/getUserRoleByUserId",
    baseURL: prod,
    method: "GET",
    params: params
  });
}
// 月报自定义下载 /download/skPatrolRecordFile4ZipByMonth
export function skPatrolRecordFile4ZipByMonth(params) {
  return request({
    url: "/download/skPatrolRecordFile4ZipByMonth",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// 添加组织机构
export function addOrg(params) {
  return request({
    url: "/addOrg",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// 加载组织机构树
export function orgTree(params) {
  return request({
    url: "/orgTree",
    baseURL: prod,
    method: "GET",
    params: params
  });
}
//修改机构信息 /updateOrg
export function updateOrg(params) {
  return request({
    url: "/updateOrg",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// /delOrg  删除机构及下级机构信息
export function delOrg(params) {
  return request({
    url: "/delOrg",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
