/*
 * @Author: dang
 * @Date: 2021-04-14 23:37:30
 * @LastEditTime: 2021-09-04 17:34:19
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\workbench\api.js
 */
import request from "@/utils/request";
const BASE_API_2 = process.env.VUE_APP_BASE_API_2; //yunw
const BASE_API_6 = process.env.VUE_APP_BASE_API_6; //yunw

export const previewUrl = BASE_API_6;
//台账
export function standing(params) {
  return request({
    url: "/brief/standing",
    baseURL: BASE_API_6,
    method: "GET",
    params: params
  });
}
// getPatrolDetailById   详情
export function getPatrolDetailById(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/app/getPatrolDetailById",
    method: "post",
    data: query
  });
}
// /web/point/getReservoirImage  根据水库ID查询图潘信息
export function getReservoirImage(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/web/point/getReservoirImage",
    method: "get",
    params: query
  });
}
// 巡查简报 /order/generateAssignedOrder  获取地址
export function generateAssignedOrder(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/order/generateAssignedOrder",
    method: "post",
    data: query
  });
}
// 预览地址  html /app/docToHtml?docPath
export function getDocToHtml(query) {
  return request({
    baseURL: BASE_API_6,
    url: `/app/docToHtml?docPath=${query}`,
    method: "get"
  });
}
// 巡查养护  月左侧列表   /ledger/monthStatisticsList
export function monthStatisticsList(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/ledger/monthStatisticsList",
    method: "post",
    data: query
  });
}
// 巡查详情 /ledger/monthStatisticsListDetail
export function monthStatisticsListDetail(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/ledger/monthStatisticsListDetail",
    method: "post",
    data: query
  });
}
//养护详情 monthStatisticsYHListDetail
export function monthStatisticsYHListDetail(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/ledger/monthStatisticsYHListDetail",
    method: "post",
    data: query
  });
}
//巡视检查列表  /app/getPatrolListByUid
export function getPatrolListByUid(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/app/getPatrolListByUid",
    method: "post",
    data: query
  });
}
//台账统计
export function getStatisticsList(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/app/getPatrolListByUid",
    method: "post",
    data: query
  });
}
//获取巡查员路径
export function queryUserPatrolByTmAndUserId(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/app/queryUserPatrolByTmAndUserId",
    method: "get",
    params: query
  });
}

// 添加备注
export function addRemark(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/ledger/addRemark",
    method: "post",
    data: query
  });
}
// 添加备注
export function updateRemark(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/ledger/updateRemark",
    method: "post",
    data: query
  });
}
