/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-26 18:26:12
 * @LastEditTime: 2021-08-27 11:52:38
 */

// 标准maintenanceStandards
export const tbskStandards = [
  {
    prop: 'rsnm',
    label: '水库名称'
  },
  {
    prop: 'name',
    label: '测站名称'
  },
  {
    prop: "deviceTypeName",
    label: "测站类别",
    show: true
  },
  {
    prop: 'deviceIp',
    label: 'IP地址'
  },
  {
    prop: 'devicePort',
    label: '端口'
  },
  {
    prop: 'deviceUsername',
    label: '用户名'
  },
  {
    prop: 'devicePassword',
    label: '密码'
  },
  {
    prop: 'eslg',
    label: '经度'
  },
  {
    prop: 'nrlt',
    label: '纬度'
  }
]
//站点类别
export const siteTypeOptions = [
  {
    value: '1',
    label: "视频站"
  },
  {
    value: '2',
    label: "图像站"
  }
];
//站点类别
export const siteTypeOptionsAll = [
  {
    value: '',
    label: "全部"
  },
  {
    value: '1',
    label: "视频站"
  },
  {
    value: '2',
    label: "图像站"
  }
];
