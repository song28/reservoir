/*
 * @Author: dang
 * @Date: 2021-08-04 10:47:19
 * @LastEditTime: 2021-08-13 09:36:35
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_gxcloud\src\views\systemManagement\menu\api.js
 */
import request from '@/utils/request'

const prod = process.env.VUE_APP_BASE_API_6
export function doDelete(query) {
  return request({
    url: 'menu/deleteMenu',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function getTreeData(query) {
  return request({
    url: 'menu/listTreeById',
    method: 'post',
    data: query,
    baseURL: prod
  })
}

export function changeTableData(query) {
  return request({
    url: 'menu/getTableDataByPId',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function submitForm_tree(query) {
  return request({
    url: 'menu/saveFunction',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function submitForm_edit(query) {
  return request({
    url: 'menu/updateFunction',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function editForm_tree(query) {
  return request({
    url: 'menu/updateTreeNodeDataById',
    method: 'post',
    data: query,
    baseURL: 'prod'
  })
}
export function updateTreeNodeDataById(query) {
  return request({
    url: 'menu/updateTreeNodeDataById',
    method: 'post',
    data: query,
    baseURL: 'prod'
  })
}
export function edit(query) {
  return request({
    url: 'menu/getTreeNodeDataById',
    method: 'post',
    data: query,
    baseURL: prod
  })
}

// 系统菜单树/menuTree
export function menuTree(query) {
  return request({
    url: '/menuTree',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
// /addMenu 添加菜单
export function addMenu(query) {
  return request({
    url: '/addMenu',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
// updateMenu 修改菜单
export function updateMenu(query) {
  return request({
    url: '/updateMenu',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
// /delMenu 删除菜单
export function delMenu(query) {
  return request({
    url: '/delMenu',
    method: 'get',
    params: query,
    baseURL: prod
  })
}
// /btnList 根据菜单ID查询菜单内按钮
export function btnList(query) {
  return request({
    url: '/btnList',
    method: 'get',
    params: query,
    baseURL: prod
  })
}
