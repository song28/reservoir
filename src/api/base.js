/*
 * @Author: dang
 * @Date: 2021-04-08 16:16:02
 * @LastEditTime: 2021-10-19 15:26:22
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\api\base.js
 */
import request from '@/utils/request'
// 获取行政区
export const BASE_API_6 = process.env.VUE_APP_BASE_API_6 // yunw
export const BASE_API_2 = process.env.VUE_APP_BASE_API_2 // yunw

// let outNet = "http://221.222.252.224:18882"; //外网地址
const outNet = 'http://47.112.159.173:8826' // 线上地址
// let outNet = "http://192.168.1.103:18882"; //本地

export const outNetUrl = `${outNet}/GxwlSk/file/` // 在线预览
export const outNetZip = `${outNet}/GxwlSk/zip/` // zip下载
// 本地
// export const previewUrl = 'http://192.168.1.103:19001/img/' // 龙哥本地预览, 预览视频
// export const videoUrl = 'http://192.168.1.103:19001/video/' // 视频
// export const audioUrl = 'http://192.168.1.103:19001/audio/' // 音频
// // export const xcPointUrl = "http://192.168.1.103:18088/app/uploadFile"; //巡查点位图片上传地址
// export const xcPointUrl = 'http://192.168.1.103:8008/upload' // 巡查点位图片上传地址
// export const demo =
//   'http://192.168.1.103:8826/GxwlSk/file/sk_info_template.xlspreviewFileUrl' // 下载模板地址

// export const locationUrl =
//   'http://47.107.44.149:8009' // 子系统跳转地址

export const locationUrl =
  'http://192.168.1.110:8008' // 子系统跳转地址
// 线上
// svg 图片
export const svgUrl = 'http://221.222.247.142/:19001/file/dam.svg' // 预览图片
export const previewUrl = 'http://47.107.44.149:19001/img/' // 预览图片
export const previewFileUrl = 'http://47.107.44.149:19001/file/' // 预览文件
export const videoUrl = 'http://47.107.44.149:19001/video/' // 视频
export const audioUrl = 'http://47.107.44.149:19001/audio/' // 音频
export const xcPointUrl = 'http://47.107.44.149:8008/upload' // 巡查点位图片上传地址
export const demo =
  'http://47.107.44.149:19001/file/sk_info_template.xls' // 下载模板地址
export const previewUrlFile = 'http://47.112.159.173:8009/' // 水库资料wps预览文件地址

// export const previewUrl = 'http://192.168.1.103:19001/img/' // 预览图片
// export const previewFileUrl = 'http://192.168.1.103:19001/file/' // 预览文件
// export const videoUrl = 'http://192.168.1.103:19001/video/' // 视频
// export const audioUrl = 'http://192.168.1.103:19001/audio/' // 音频
// export const xcPointUrl = 'http://192.168.1.103:8008/upload' // 巡查点位图片上传地址
// export const demo =
//   'http://47.107.44.149:19001/file/sk_info_template.xls' // 下载模板地址
// export const previewUrlFile = 'http://47.112.159.173:8009/' // 水库资料wps预览文件地址

// 1.199
// export const previewUrl = "http://192.168.1.199:18882/GxwlSk/img/"; //龙哥本地预览, 预览视频
// export const videoUrl = 'http://192.168.1.199:18882/GxwlSk/video/'; //视频
// export const audioUrl = 'http://192.168.1.199:18882/GxwlSk/audio/'; //音频
// export const xcPointUrl = 'http://192.168.1.199:18088/app/uploadFile'; //巡查点位图片上传地址
// export const demo = 'http://192.168.1.199:18882/GxwlSk/file/sk_info_template.xls'; //下载模板地址

// 行政区管理
export function getAdcdbByAccvd(params) {
  return request({
    url: '/web/rsvr/getAdcdbByAccvd',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 行政区管理
export function getAddvcdTreeList(params) {
  return request({
    url: '/advcd/childs',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 根据行政区编码查询水库
export function getReservoirInfoByPc(params) {
  return request({
    url: '/web/rsvr/getReservoirInfoByPc',
    baseURL: BASE_API_2,
    method: 'GET',
    params: params
  })
}
// 行政区划树
export function addvnmTree(params) {
  return request({
    url: '/addvnmTree',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
// 行政区划+水库tree
export function addvnmAndRsvrTree(params) {
  return request({
    url: '/addvnmAndRsvrTree',
    baseURL: BASE_API_6,
    method: 'post',
    data: params
  })
}
