/*
 * @Author: dang
 * @Date: 2021-04-08 16:16:02
 * @LastEditTime: 2021-04-15 22:11:15
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\api\base.js
 */
import request from "@/utils/request";
// 获取行政区
export const BASE_API_6 = process.env.VUE_APP_BASE_API_6; //yunw
export const previewUrl = "http://118.190.154.40:8826/GxwlSk/img/"; //预览图片
export const videoUrl = 'http://118.190.154.40:8826/GxwlSk/video/'; //视频
export const audioUrl = 'http://118.190.154.40:8826/GxwlSk/audio/'; //音频


export const xcPointUrl = 'http://118.190.154.40:18088/app/uploadFile'; //巡查点位图片上传地址
export const demo = 'http://118.190.154.40:8826/GxwlSk/file/sk_info_template.xls'; //下载模板地址



//行政区管理
export function getAdcdbByAccvd(params) {
  return request({
    url: "/web/rsvr/getAdcdbByAccvd",
    baseURL: BASE_API_6,
    method: "GET",
    params: params
  });
}

//行政区管理
export function getAddvcdTreeList(params) {
  return request({
    url: "/advcd/childs",
    baseURL: BASE_API_6,
    method: "GET",
    params: params
  });
}
//根据行政区编码查询水库
export function getReservoirInfoByPc(params) {
  return request({
    url: "/web/rsvr/getReservoirInfoByPc",
    baseURL: BASE_API_6,
    method: "GET",
    params: params
  });
}
