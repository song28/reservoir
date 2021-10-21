/*
 * @Author: dang
 * @Date: 2021-04-08 16:16:04
 * @LastEditTime: 2021-05-13 13:41:07
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\operationManagement\apiConfig.js
 */

//任务列表->reportRecords
export const tbReportTaskListHeader = [
  {
    prop: "inspectorName",
    label: "执行人"
  },
  {
    prop: "mobile",
    label: "联系方式"
  },
  {
    prop: "FtaskExecTime",
    label: "执行时间"
  },
  {
    prop: "taskContent",
    label: "任务内容"
  },
  {
    prop: "FissueTime",
    label: "下发时间"
  },
  {
    prop: "execStateLabel",
    label: "任务状态"
  },
  {
    prop: "FstartTime",
    label: "开始时间"
  },
  {
    prop: "FendTime",
    label: "结束时间"
  }
];
//巡视检查->inspectionTour
export const tbInspectionTourHeader = [
  //   {
  //     prop: "FstartTime",
  //     label: "开始时间",
  //     width: 110
  //   },
  //   {
  //     prop: "FendTime",
  //     label: "结束时间",
  //     width: 110
  //   },
  {
    prop: "inspectionTime",
    label: "巡查时间",
    width: 150
  },
  {
    prop: "inspectionWhen",
    label: "巡查用时"
  },
  {
    prop: "name",
    label: "巡检人"
  },
  {
    prop: "sw",
    label: "水位值(m)"
  },
  {
    prop: "phone",
    label: "联系方式",
    width: "160"
  },
  {
    prop: "reservoirName",
    label: "巡视水库"
  },
  {
    prop: "addvnm",
    label: "所属街道"
  }
  //   {
  //     prop: "lng",
  //     label: "操作任务"
  //   }
];
//日常养护->dailyMaintenance
export const tbDailyMaintenanceListHeader = [
  //   {
  //     prop: "FstartTime",
  //     label: "开始时间"
  //   },
  //   {
  //     prop: "FendTime",
  //     label: "结束时间"
  //   },
  {
    prop: "inspectionTime",
    label: "巡查时间",
    width: 150
  },
  {
    prop: "inspectionWhen",
    label: "巡查用时"
  },
  {
    prop: "name",
    label: "养护人信息"
  },
  {
    prop: "implementType",
    label: "养护类型"
  },
  {
    prop: "reservoirName",
    label: "养护水库"
  },
  {
    prop: "addvnm",
    label: "所属街道"
  }
];
//日常养护->tbDetailDaily
//日常养护详情
export const tbDailyMaintenanceListDetailHeader = [
  {
    prop: "stm",
    label: "养护开始时间"
  },
  {
    prop: "createTm",
    label: "养护结束时间"
  },
  {
    prop: "name",
    label: "养护人信息"
  },
  {
    prop: "desc",
    label: "描述"
  },
  {
    prop: "record_type",
    label: "操作类型"
  },
  {
    prop: "implement_type",
    label: "养护类型"
  }
];
//上报记录->reportRecords
export const tbReportRecordsHeader = [
  {
    prop: "FstartTime",
    label: "上报时间"
  },
  {
    prop: "name",
    label: "上报人信息"
  },
  {
    prop: "implementType",
    label: "事件类型"
  },
  {
    prop: "reservoirName",
    label: "上报水库"
  },
  {
    prop: "desc",
    label: "事件说明"
  }
];
export const tbReportRecordsDetailHeader = [
  {
    prop: "createTm",
    label: "上报时间"
  },
  {
    prop: "name",
    label: "上报人信息"
  },
  {
    prop: "implement_type",
    label: "事件类型"
  },

  {
    prop: "desc",
    label: "事件说明"
  }
];

//任务下发->taskDistribution
export const tbsTaskDistributionHeader = [
  {
    prop: "name",
    label: "人员名称"
  },
  {
    prop: "mobile",
    label: "联系方式"
  },
  {
    prop: "roleNames",
    label: "水库关系人"
  },
  {
    prop: "reservoirNames",
    label: "管理水库"
  }
];

export const optionsReportFour = [
  {
    value: "9",
    label: "污染"
  },
  {
    value: "10",
    label: "裂缝"
  },
  {
    value: "11",
    label: "坡面损坏"
  },
  {
    value: "12",
    label: "植物滋生"
  },
  {
    value: "13",
    label: "渗漏水"
  },
  {
    value: "14",
    label: "兽洞、蚁穴"
  },
  {
    value: "15",
    label: "淤堵"
  },
  {
    value: "16",
    label: "闸门变形锈蚀"
  },
  {
    value: "17",
    label: "牌匾破坏"
  },
  {
    value: "8",
    label: "水面无垃圾"
  },
  {
    value: "18",
    label: "其他"
  }
];
export const optionsReportFive = [
  {
    value: "19",
    label: "护面或护坡损坏"
  },
  {
    value: "20",
    label: "裂缝、剥落"
  },
  {
    value: "21",
    label: "滑动、隆起、塌坑、冲刷"
  },
  {
    value: "22",
    label: "植物滋生"
  },
  {
    value: "23",
    label: "集中渗漏"
  },
  {
    value: "18",
    label: "其他"
  }
];
