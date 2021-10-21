/*
 * @Author: song
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-28 20:05:29
 * @LastEditTime: 2021-10-13 10:08:15
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\warningManagement\apiConfig.js
 * @Description: 暂无
 */
// 计算方式   ----calculationOptions
// 逻辑运算符标识
export const calculationOptions = [
  {
    value: 1,
    label: "一段时间累计"
  },
  {
    value: 2,
    label: "瞬时"
  },
  {
    value: 3,
    label: "当前值减去一段时间前的值"
  },


];
// 预警等级
export const warnLevelOptions = [
  {
    value: '3',
    label: "橙色预警"
  },
  {
    value: '4',
    label: "红色预警"
  },


];
// 预警类型------------------
export const warnTypeOptions = [
  {
    value: '3',
    label: "水位预警"
  },
  {
    value: '0',
    label: "雨量预警"
  },
  {
    value: '12',
    label: "入侵预警"
  },

];
// 预警来源----------------
export const warnSourceOptions = [
  {
    value: 1,
    label: "人工预警"
  },
  {
    value: 2,
    label: "设备预警"
  },
  {
    value: 3,
    label: "平台预警"
  },
];
//->  表面垂直位移 01
export const tabHeader01 = [
  {
    prop: "mpName",
    label: "名称",
    show: false
  },
  {
    prop: "redVal",
    label: "阈值(mm)",
    show: true
  },


];
//->  表面水平位移 02

export const tabHeader02 = [
  {
    prop: "mpName",
    label: "名称",
    show: false
  },
  {
    prop: "redVal",
    label: "阈值(mm)",
    show: true
  },

];
//->  渗流压力 05

export const tabHeader05 = [
  {
    prop: "mpName",
    label: "名称",
    show: false
  },
  {
    prop: "redVal",
    label: "阈值(kpa)",//"阈值(L/s)",
    show: true
  },

];
//->  环境量 11

export const tabHeader11 = [
  {
    prop: "mpName",
    label: "断面名称",
    show: false
  },
  {
    prop: "orangeVal",
    label: "橙色阈值(m³/s)",
    show: true
  },
  {
    prop: "redVal",
    label: "红色阈值(m³/s)",
    show: true
  },

];
// 阈值配置修改列表
export const thresholdHeader = [
  // {
  //   prop: "deviceid",
  //   label: "设备ID",
  //   show: false
  // },
  // {
  //   prop: "cusno",
  //   label: "设备编码",
  //   show: true
  // },
  // {
  //   prop: "mpcd",
  //   label: "测站编码",
  //   show: true
  // },
  {
    prop: "level",
    label: "等级",
    show: true
  },
  // {
  //   prop: "operaCharacter",
  //   label: "运算符标识", // 1.大于2.小于 3.等于，4大于等于，5小于等于
  //   show: true
  // },
  // {
  //   prop: "logicalOperator",
  //   label: "逻辑运算符标识", //1. and 2. or ，3not  现在传2
  //   show: true
  // },
  {
    prop: "triggerTag",
    label: "触发设备类型 ",
    show: true
  },
  {
    prop: "triggerValue",
    label: "触发值",
    show: true
  },
  {
    prop: "beforeDays",
    label: "往前的天数",
    show: true
  },
  {
    prop: "calculation",
    label: "计算方式", //1.一段时间累计，2瞬时，3当前值减去一段时间前的值
    show: true
  },
];

//预警列表->listReservoirs
export const warnListHeader = [
  {
    prop: "mpname",
    label: "预警站点",
    show: false
  },

  {
    prop: "warnTypeName",//"warnType",
    label: "预警类型",
    show: true
  },
  {
    prop: "createtime",//"warnType",
    label: "预警时间",
    show: true
  },
  {
    prop: "warnLevelName",//"warnLevel",
    label: "预警等级",
    show: true
  },
  {
    prop: "warnValue",
    label: "预警值",
    show: true
  },
  {
    prop: "warnSourceName",//"warnSource",
    label: "预警来源",
    show: true
  },
  {
    prop: "warnStatusName",//"warnStatus",
    label: "预警状态 ",
    show: true
  },

];

// 设备标识  设备类型
export var deviceTypeArr = [
  {
    name: '雨量监测站',
    value: '0',
    type: 'rain',
    typeName: '雨量预警',
  },
  {
    name: '断线监测站',
    value: '1',
    type: 'disconnection',
    typeName: '断线预警',
  },
  {
    name: 'GNSS监测站',
    value: '2',
    type: 'gnss',
    typeName: 'GNSS预警',
  },
  {
    name: '水位监测站',
    value: '3',
    type: 'water',
    typeName: '水位预警',
  },
  {
    name: '加速度监测站',
    value: '4',
    type: 'acceleration',
    typeName: '加速度预警',
  },
  {
    name: '裂缝监测站',
    value: '5',
    type: 'crack',
    typeName: '裂缝预警',
  },
  {
    name: '泥水位监测站',
    value: '6',
    type: 'mud',
    typeName: '泥水位预警',
  },
  {
    name: '倾角监测站',
    value: '7',
    type: 'angle',
    typeName: '倾角预警',
  },
  {
    name: '深部位移监测站',
    value: '8',
    type: 'deepDisplacement',
    typeName: '深部位移预警',
  },
  {
    name: '土壤含水率监测站',
    value: '9',
    type: 'soil'
  },
  {
    name: '震动监测站',
    value: '10',
    type: 'shock'
  },
  {
    name: '次声监测站',
    value: '11',
    type: 'infrasound'
  },
  {
    name: '视频站',
    value: '12',
    type: 'video'
  },
  {
    name: '图像站',
    value: '13',
    type: 'image'
  },
  {
    name: 'LED',
    value: '60',
    type: 'led'
  },
  {
    name: '入户报警器',
    value: '61',
    type: 'homeAlarm'
  },
  {
    name: '广播',
    value: '62',
    type: 'broadcast'
  },
];
// 设备标识
export var deviceJsonData = {
  0: "雨量监测站",
  1: "断线监测站",
  2: "GNSS监测站",
  3: "水位监测站",
  4: "加速度监测站",
  5: "裂缝监测站",
  6: "泥水位监测站",
  7: "倾角监测站",
  8: "深部位移监测站",
  9: "土壤含水率监测站",
  10: "震动监测站",
  11: "次声监测站",
  12: "视频站",
  13: "图像站",
  60: "LED",
  61: "入户报警器",
  62: "广播",
};