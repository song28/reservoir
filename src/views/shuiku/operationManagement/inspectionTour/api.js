/*
 * @Author: dang
 * @Date: 2021-04-14 09:37:24
 * @LastEditTime: 2021-08-24 14:03:01
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\operationManagement\inspectionTour\api.js
 */
import request from "@/utils/request";

const BASE_API_2 = process.env.VUE_APP_BASE_API_2; //yunw
const BASE_API_6 = process.env.VUE_APP_BASE_API_6; //yunw

//巡视检查列表  /app/getPatrolListByUid
export function getPatrolListByUid(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/app/getPatrolListByUid",
    method: "post",
    data: query
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
// getPatrolTaskChart   chart
export function getPatrolTaskChart(query) {
  return request({
    baseURL: BASE_API_6,
    url: "/app/getPatrolTaskChart",
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
