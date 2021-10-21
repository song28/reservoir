/*
 * @Author: dang
 * @Date: 2021-08-11 09:36:00
 * @LastEditTime: 2021-09-09 21:39:05
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\systemManagement\user\api.js
 */
import request from "@/utils/request";
const prod = process.env.VUE_APP_BASE_API_6;
//更新用户基本信息
export function updateUser(query) {
  return request({
    url: "/updateUser",
    baseURL: prod,
    method: "post",
    data: query
  });
}
export function getList() {
  return request({
    url: "role/getAllRoles",
    baseURL: prod,
    method: "get"
  });
}
export function seachByName(query) {
  return request({
    url: "role/getAllRolesByName",
    baseURL: prod,
    method: "post",
    data: query
  });
}

export function submitForm(query) {
  return request({
    url: "role/save",
    baseURL: prod,
    method: "post",
    data: query
  });
}

export function doDelete(query) {
  return request({
    url: "role/delete",
    baseURL: prod,
    method: "post",
    data: query
  });
}
export function doDeleteMultiple(query) {
  return request({
    url: "role/doDeleteMultiple",
    baseURL: prod,
    method: "post",
    data: query
  });
}
export function getRightTreeList(query) {
  return request({
    url: "menu/getRightTree",
    baseURL: prod,
    method: "get",
    params: query
  });
}
export function saveRight(query) {
  return request({
    url: "role/saveRight",
    baseURL: prod,
    method: "post",
    data: query
  });
}
export function getRolePermissions(id) {
  return request({
    url: "role/getRolePermissions/" + id,
    baseURL: prod,
    method: "get"
  });
}
export function getAllRoles(query) {
  return request({
    url: "role/getAllRoles",
    baseURL: prod,
    method: "get"
  });
}
// /addSystem添加子系统信息
export function addSystem(params) {
  return request({
    url: "/addSystem",
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
    method: "POST",
    data: params
  });
}
// roleSet

export function roleSet(params) {
  return request({
    url: "/roleSet",
    baseURL: prod,
    method: "GET",
    params: params
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

export function orgListByCurrentUserOrgId(params){
  return request({
    url: "/orgList",
    baseURL: prod,
    method: "POST",
    data: params
  });
}

// 用户列表userList
export function userList(params) {
  return request({
    url: "/userList",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// register
export function register(params) {
  return request({
    url: "/register",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// 用户账号角色绑定 bindUserRole
export function bindUserRole(params) {
  return request({
    url: "/bindUserRole",
    baseURL: prod,
    method: "POST",
    data: params
  });
}

// lockAccount  锁定账号
export function lockAccount(params) {
  return request({
    url: "/lockAccount",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// 解锁账号  unlockAccount
export function unlockAccount(params) {
  return request({
    url: "/unlockAccount",
    baseURL: prod,
    method: "POST",
    data: params
  });
}
// verifyCode
export function verifyCode(params) {
  return request({
    url: "/verifyCode",
    baseURL: prod,
    method: "GET",
    responseType: "blob",
    params: params
  });
}
