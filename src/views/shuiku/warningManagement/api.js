/*
 * @Author: song
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-28 20:05:29
 * @LastEditTime: 2021-09-28 15:26:18
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\warningManagement\api.js
 * @Description: 暂无
 */
import request from "@/utils/request";
const BASE_API_6 = process.env.VUE_APP_BASE_API_6; //yunw
const BASE_API_3 = process.env.VUE_APP_BASE_API_3; //wuming
const BASE_API_4 = process.env.VUE_APP_BASE_API_6; //lixianzhao
// const lxz = 'http://192.168.1.122:8008/'; //lixianzhao
const lxz = process.env.VUE_APP_BASE_API_4; //lixianzhao


//查看图片接口
export function getReservoirImage(params) {
  return request({
    url: "/web/point/getReservoirImage",
    baseURL: BASE_API_6,
    method: "GET",
    params: params
  });
}
// 阈值配置开始-----------------------------------------

//通过水库编码获取所有的监测项目 
export function getEnmnitsByRSCD(params) {
  return request({
    url: "/rule/getEnmnitsByRSCD",
    baseURL: BASE_API_6,
    method: "GET",
    params: params
  });
}

//查询测站阈值配置列表  /rule/findEarlyWarnConfByPage
export function findEarlyWarnConfByPage(params) {
  return request({
    url: "/rule/findEarlyWarnConfByPage",
    baseURL: BASE_API_4,
    method: "GET",
    params: params
  });
}
//添加预警配置
export function editWarnConf(params) {
  return request({
    url: "/rule/editWarnConf",
    baseURL: BASE_API_4,
    method: "post",
    data: params
  });
}




// 阈值配置结束-----------------------------------------

// 预警列表开始

//添加预警配置
export function warnList(params) {
  return request({
    url: "/warn/list",
    baseURL: BASE_API_4,
    method: "post",
    data: params
  });
}
//获取发送预警信息集合
export function getSendList(params) {
  return request({
    url: "/warn/getSendList",
    baseURL: BASE_API_4,
    method: "post",
    data: params
  });
}

//人工发送预警信息
export function customSend(params) {
  return request({
    url: "/warn/customSend",
    baseURL: lxz,
    method: "post",
    data: params
  });
}
//结束预警  finishWarnById
export function finishWarnById(params) {
  return request({
    url: "warn/finishWarnById",
    baseURL: BASE_API_4,
    method: "GET",
    params: params
  });
}
//添加信息  --模板
export function addSmsTemplate(params) {
  return request({
    url: "warn/addSmsTemplate",
    baseURL: BASE_API_4,
    method: "post",
    data: params
  });
}
//修改信息  --模板
export function updateSmsTemplate(params) {
  return request({
    url: "warn/updateSmsTemplate",
    baseURL: BASE_API_4,
    method: "post",
    data: params
  });
}
//查询信息  --模板
export function selectSmsTemplate(params) {
  return request({
    url: "warn/selectSmsTemplate",
    baseURL: BASE_API_4,
    method: "post",
    data: params
  });
}
//删除信息  --模板
export function deleteSmsTemplate(params) {
  return request({
    url: "warn/deleteSmsTemplate",
    baseURL: BASE_API_4,
    method: "get",
    params: params
  });
}



// 预警列表结束-----------------------------------

let dongchuang = 'http://116.52.166.246:9920/'
//短信发布
export function smspPublish(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZNBBG/sms/publish',
    method: 'post',
    data: query
  })
}
//人员列表
export function getUserTree(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZNBBG/addr/getUserTree',
    method: 'post',
    data: query
  })
}
//LED/广播/入户报警器
export function getWarnPublishDeviceList(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZXXMB/yj/getWarnPublishDeviceList',
    method: 'post',
    data: query
  })
}
//LED/广播/入户报警器发送接口
export function sendWarnDevice(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZZHJS/yj/sendWarnDevice',
    method: 'post',
    data: query
  })
}
//维护巡查-日常巡查基本信息查询接口
export function basicInfo(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZYWXC/patrol/basicInfo',
    method: 'post',
    data: query
  })
}
//短信发布-历史短信查询
export function alllist(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZNBBG/sms/alllist',
    method: 'post',
    data: query
  })
}
//短信详情
// handlerId: "85be2420490a4a89a82ec5db85f2274b"
// size: 20
// start: 1
export function selectSmsRecordById(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZXXMB/yj/selectSmsRecordById',
    method: 'post',
    data: query
  })
}
//补发所有的 handlerId: "c0cfd752ef174de49aa70f9847f7f921"
export function resendSmsByHandlerId(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZXXMB/yj/resendSmsByHandlerId',
    method: 'post',
    data: query
  })
}
//补发单个人的recordIds: ["c0cfd752ef174de49aa70f9847f7f921"]

export function resendSmsByRecordList(query) {
  return request({
    baseURL: dongchuang,
    url: '/DZXXMB/yj/resendSmsByRecordList',
    method: 'post',
    data: query
  })
}

// 公告开始=========================
//添加公告
export function getAddNotice(query) {
  return request({
    baseURL: dongchuang,
    url: '/announcement/add',
    method: 'post',
    data: query
  })
}

//查询公告
export function getPageInfo(query) {
  return request({
    baseURL: dongchuang,
    url: '/announcement/page',
    method: 'get',
    params: query
  })
}
//删除公告
export function deleteNotice(query) {
  return request({
    baseURL: dongchuang,
    url: '/announcement/delete',
    method: 'get',
    params: query
  })
}
//跳转详情
export function detailNotice(query) {
  return request({
    baseURL: dongchuang,
    url: '/announcement/findone',
    method: 'get',
    params: query
  })
}
//附件下载
export function downloadfile(query) {
  return request({
    baseURL: dongchuang,
    url: '/downloadfile',
    method: 'get',
    params: query
  })
}
//预览图片
export function preview(query) {
  return request({
    baseURL: dongchuang,
    url: '/preview',
    method: 'get',
    params: query
  })
}