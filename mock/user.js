// 地灾菜单
const dizaiMenus = [
  {
    path: "/dzMap",
    component: "Layout",
    name: "DzMap",
    title: "综合监视",
    redirect: "/dzMap/dzMap",
    meta: { title: "综合监视", icon: "dc-zhjs" },
    children: [
      {
        path: "dzMap",
        component: "dz/monitor/index",
        name: "DzMapChild",
        title: "综合监视",
        meta: { title: "综合监视", icon: "tp-zhjs" }
      }
    ]
  },






  // 系统管理
  {
    path: "/system",
    component: "Layout",
    redirect: "/system/user",
    name: "UtilSystem",
    alwaysShow: true,
    title: "系统管理",
    meta: {
      title: "系统管理",
      icon: "hzz_xtgl"
    },
    children: [
      {
        path: "user",
        component: "system/user/index",
        name: "SystemUser",
        title: "用户管理",
        meta: { title: "用户管理" }
      },
      {
        path: "role",
        component: "system/role/index",
        name: "SystemRole",
        title: "角色管理",
        meta: { title: "角色管理" }
      },
      {
        path: "menu",
        component: "/system/menu/index",
        name: "SystemMenu",
        title: "菜单管理",
        meta: { title: "菜单管理" }
      },
      {
        path: "dict",
        component: "system/dict/index",
        name: "SystemDict",
        title: "字典管理",
        meta: { title: "字典管理" }
      },
      {
        path: "shp",
        component: "system/shp/index",
        name: "Systemshp",
        title: "图层管理",
        meta: { title: "图层管理" }
      },
      {
        path: "dept",
        component: "system/dept/index",
        name: "SystemDept",
        title: "部门管理",
        meta: { title: "部门管理" }
      },
      {
        path: "associationReservoir",
        component: "system/AssociationReservoir/index",
        name: "AssociationReservoir",
        title: "关联水库",
        meta: { title: "关联水库" }
      },
      {
        path: "associationSite",
        component: "system/AssociationSite/index",
        name: "AssociationSite",
        title: "关联站点",
        meta: { title: "关联站点" }
      }
    ]
  },
  // 大屏
  {
    path: "/dzMap2",
    component: "Layout",
    redirect: "/dzMap2/dzMap",
    name: "DzMapdaping",
    title: "大屏",
    meta: { title: "大屏", icon: "tp-zhjs" },
    children: [
      {
        path: "dzMap",
        component: "DIZAI/monitoring/index",
        name: "DzMapChilddaping",
        title: "大屏",
        meta: { title: "大屏", icon: "tp-zhjs" }
      }
    ]
  }
];
// 水库菜单
const skMenus = [
  //工作台
  {
    path: "/workbench",
    component: "Layout",
    name: "workbench",
    title: "工作台",
    redirect: "/workbench/workbench",
    meta: { title: "工作台", icon: "dc-zhjs" },
    children: [
      {
        path: "workbench",
        component: "shuiku/workbench/index",
        name: "sk-workbench",
        title: "工作台",
        meta: { title: "工作台", icon: "tp-zhjs" }
      }
    ]
  },
  {
    path: "/skMap",
    component: "Layout",
    name: "skMap",
    title: "综合调度",
    redirect: "/skMap/skMap",
    meta: { title: "综合调度", icon: "dc-zhjs" },
    children: [
      {
        path: "skMap",
        component: "shuiku/monitor/index",
        name: "skMapChild",
        title: "水库一张图",
        meta: { title: "水库一张图", icon: "tp-zhjs" }
      }
    ]
  },
  //水库子系统
  // {
  //   path: "/subskMap",
  //   component: "Layout",
  //   name: "subskMap",
  //   title: "实时监控",
  //   redirect: "/subskMap/subskMap",
  //   meta: { title: "实时监控", icon: "dc-zhjs" },
  //   children: [
  //     {
  //       path: "subskMap",
  //       component: "subShuiku/monitor/index",
  //       name: "subskMapChild",
  //       title: "水库一张图",
  //       meta: { title: "水库一张图", icon: "tp-zhjs" }
  //     }
  //   ]
  // },
  {
    path: "/damSafety",
    component: "Layout",
    name: "damSafety",
    title: "大坝",
    redirect: "/subShuiku/damSafety",
    meta: { title: "大坝安全", icon: "dc-zhjs" },
    children: [
      {
        path: "DamMonitoring",
        component: "subShuiku/damSafety/DamMonitoring/index",
        name: "DamMonitoring",
        title: "大坝监测",
        meta: { title: "大坝监测", icon: "dc-tzgg" }
      },
      {
        path: "MeasuringPointManagement",
        component: "subShuiku/damSafety/MeasuringPointManagement/index",
        name: "MeasuringPointManagement",
        title: "测点管理",
        meta: { title: "测点管理", icon: "dc-tzgg" }
      },
      {
        path: "siteReport-sub",
        component: "subShuiku/damSafety/siteReport/index",
        name: "siteReport-sub",
        title: "测点报表",
        meta: { title: "测点管理", icon: "dc-tzgg" }
      },

    ]
  },
  {
    path: "/subvideoSurveillance",
    component: "Layout",
    redirect: "/subvideoSurveillance",
    name: "subvideoSurveillance",
    alwaysShow: true,
    title: "视频监测",
    meta: {
      title: "视频监测",
      icon: "dc-bg"
    },
    children: [

      {
        path: "video",
        component: "subShuiku/subvideoSurveillance/video/index",
        name: "subvideo",
        title: "视频监控",
        meta: { title: "视频监控", icon: "dc-tzgg" }
      },

      {
        path: "platform",
        component: "subShuiku/subvideoSurveillance/platform/index",
        name: "subplatform",
        title: "平台配置",
        meta: { title: "平台配置", icon: "dc-tzgg" }
      },
    ]
  },
  //运行管理
  {
    path: "/operationManagement",
    component: "Layout",
    redirect: "/operationManagement/inspectionTour",
    name: "operationManagement",
    alwaysShow: true,
    title: "运行管理",
    meta: {
      title: "运行管理",
      icon: "dc-bg"
    },
    children: [
      {
        path: "inspectionTour",
        component: "shuiku/operationManagement/inspectionTour/index",
        name: "inspectionTour-sk",
        title: "巡视检查",
        meta: { title: "巡视检查", icon: "dc-tzgg" }
      },
      {
        path: "dailyMaintenance",
        component: "shuiku/operationManagement/dailyMaintenance/index",
        name: "dailyMaintenance-sk",
        title: "日常养护",
        meta: { title: "日常养护", icon: "dc-tzgg" }
      },
      {
        path: "equipmentOperation",
        component: "shuiku/operationManagement/equipmentOperation/index",
        name: "equipmentOperation-sk",
        title: "设备操作",
        meta: { title: "设备操作", icon: "dc-tzgg" }
      },
      {
        path: "dailyInspection",
        component: "shuiku/operationManagement/dailyInspection/index",
        name: "dailyInspection-sk",
        title: "日常检测",
        meta: { title: "日常检测", icon: "dc-tzgg" }
      },
      {
        path: "reportRecords",
        component: "shuiku/operationManagement/reportRecords/index",
        name: "reportRecords-sk",
        title: "上报记录",
        meta: { title: "上报记录", icon: "dc-tzgg" }
      },
      {
        path: "taskDistribution",
        component: "shuiku/operationManagement/taskDistribution/index",
        name: "taskDistribution-sk",
        title: "任务下发",
        meta: { title: "任务下发", icon: "dc-tzgg" }
      },
      {
        path: "taskList",
        component: "shuiku/operationManagement/taskList/index",
        name: "taskList-sk",
        title: "任务列表",
        meta: { title: "任务列表", icon: "dc-tzgg" }
      },
      {
        path: "timedTask",
        component: "shuiku/operationManagement/timedTask/index",
        name: "timedTask-sk",
        title: "定时任务",
        meta: { title: "定时任务", icon: "dc-tzgg" }
      }
    ]
  },
  // //运行管理-子系统
  // {
  //   path: "/operationManagement-sub",
  //   component: "Layout",
  //   redirect: "/operationManagement-sub/inspectionTour-sub",
  //   name: "operationManagement-sub",
  //   alwaysShow: true,
  //   title: "运行管理",
  //   meta: {
  //     title: "运行管理",
  //     icon: "dc-bg"
  //   },
  //   children: [
  //     {
  //       path: "inspectionTour-sub",
  //       component: "subShuiku/operationManagement/inspectionTour/index",
  //       name: "inspectionTour-sub-sk",
  //       title: "巡视检查",
  //       meta: { title: "巡视检查", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "dailyMaintenance",
  //       component: "subShuiku/operationManagement/dailyMaintenance/index",
  //       name: "dailyMaintenance-sub-sk",
  //       title: "日常养护",
  //       meta: { title: "日常养护", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "equipmentOperation",
  //       component: "subShuiku/operationManagement/equipmentOperation/index",
  //       name: "equipmentOperation-sub-sk",
  //       title: "设备操作",
  //       meta: { title: "设备操作", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "dailyInspection",
  //       component: "subShuiku/operationManagement/dailyInspection/index",
  //       name: "dailyInspection-sub-sk",
  //       title: "日常检测",
  //       meta: { title: "日常检测", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "reportRecords",
  //       component: "subShuiku/operationManagement/reportRecords/index",
  //       name: "reportRecords-sub-sk",
  //       title: "上报记录",
  //       meta: { title: "上报记录", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "taskDistribution",
  //       component: "subShuiku/operationManagement/taskDistribution/index",
  //       name: "taskDistribution-sub-sk",
  //       title: "任务下发",
  //       meta: { title: "任务下发", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "taskList",
  //       component: "subShuiku/operationManagement/taskList/index",
  //       name: "taskList-sub-sk",
  //       title: "任务列表",
  //       meta: { title: "任务列表", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "timedTask",
  //       component: "subShuiku/operationManagement/timedTask/index",
  //       name: "timedTask-sub-sk",
  //       title: "定时任务",
  //       meta: { title: "定时任务", icon: "dc-tzgg" }
  //     }
  //   ]
  // },
  //水库管理
  {
    path: "/reservoirManagement",
    component: "Layout",
    redirect: "/reservoirManagement/listReservoirs",
    name: "reservoirManagement",
    alwaysShow: true,
    title: "水库管理",
    meta: {
      title: "水库管理",
      icon: "dc-bg"
    },
    children: [
      {
        path: "listReservoirs",
        component: "shuiku/reservoirManagement/listReservoirs/index",
        name: "listReservoirs-sk",
        title: "水库列表",
        meta: { title: "水库列表", icon: "dc-tzgg" }
      },
      {
        path: "reservoirPersonnel",
        component: "shuiku/reservoirManagement/reservoirPersonnel/index",
        name: "reservoirPersonnel-sk",
        title: "水库人员",
        meta: { title: "水库人员", icon: "dc-tzgg" }
      },
      {
        path: "maintenancePoint",
        component: "shuiku/reservoirManagement/maintenancePoint/index",
        name: "maintenancePoint-sk",
        title: "维护点位",
        meta: { title: "维护点位", icon: "dc-tzgg" }
      },
      {
        path: "maintenanceStandards",
        component: "shuiku/reservoirManagement/maintenanceStandards/index",
        name: "maintenanceStandards-sk",
        title: "维护标准",
        meta: { title: "维护标准", icon: "dc-tzgg" }
      },
      {
        path: "monitorProject",
        component: "shuiku/reservoirManagement/monitorProject/index",
        name: "monitorProject-sk",
        title: "监测项目",
        meta: { title: "监测项目", icon: "dc-tzgg" }
      },
      {
        path: "engineeringParts",
        component: "shuiku/reservoirManagement/engineeringParts/index",
        name: "engineeringParts-sk",
        title: "工程部位",
        meta: { title: "工程部位", icon: "dc-tzgg" }
      },
      {
        path: "siteManagement",
        component: "shuiku/reservoirManagement/siteManagement/index",
        name: "siteManagement-sk",
        title: "站点管理",
        meta: { title: "站点管理", icon: "dc-tzgg" }
      }
    ]
  },
  //视频监控
  {
    path: "/videoSurveillance",
    component: "Layout",
    redirect: "/videoSurveillance/videoWatch",
    name: "videoSurveillance",
    alwaysShow: true,
    title: "视频监控",
    meta: {
      title: "视频监控",
      icon: "dc-bg"
    },
    children: [
      {
        path: "videoWatch",
        component: "shuiku/videoSurveillance/videoWatch/index",
        name: "videoWatch-sk",
        title: "视频监视",
        meta: { title: "视频监视", icon: "dc-tzgg" }
      },
      {
        path: "partformConfig",
        component: "shuiku/videoSurveillance/partformConfig/index",
        name: "partformConfig-sk",
        title: "平台配置",
        meta: { title: "平台配置", icon: "dc-tzgg" }
      }
    ]
  },
  //预警管理
  {
    path: "/warningManagement",
    component: "Layout",
    redirect: "/warningManagement/warnInfo",
    name: "warningManagement-sk",
    alwaysShow: true,
    title: "预警管理-sk",
    meta: {
      title: "预警管理-sk",
      icon: "dc-bg"
    },
    children: [
      {
        path: "warnInfo",
        component: "shuiku/warningManagement/warnInfo/index",
        name: "warnInfo-sk",
        title: "预警信息",
        meta: { title: "预警信息", icon: "dc-tzgg" }
      },
      {
        path: "threshold",
        component: "shuiku/warningManagement/threshold/index",
        name: "threshold-sk",
        title: "预警阈值",
        meta: { title: "预警阈值", icon: "dc-tzgg" }
      }
    ]
  },
  // //预警管理-----子系统
  // {
  //   path: "/warningManagement-sub",
  //   component: "Layout",
  //   redirect: "/warningManagement-sub/warnInfo",
  //   name: "warningManagement-sub-sk",
  //   alwaysShow: true,
  //   title: "预警管理-sk",
  //   meta: {
  //     title: "预警管理-sk",
  //     icon: "dc-bg"
  //   },
  //   children: [
  //     {
  //       path: "warnInfo",
  //       component: "subShuiku/warningManagement/warnInfo/index",
  //       name: "warnInfo-sub-sk",
  //       title: "预警信息",
  //       meta: { title: "预警信息", icon: "dc-tzgg" }
  //     },
  //     {
  //       path: "threshold",
  //       component: "subShuiku/warningManagement/threshold/index",
  //       name: "threshold-sub-sk",
  //       title: "预警阈值",
  //       meta: { title: "预警阈值", icon: "dc-tzgg" }
  //     }
  //   ]
  // },
  //水库资产
  {
    path: "/reservoirAssets",
    component: "Layout",
    redirect: "/reservoirAssets/listReservoirs",
    name: "reservoirAssets",
    alwaysShow: true,
    title: "水库资产",
    meta: {
      title: "水库资产",
      icon: "dc-bg"
    },
    children: [
      {
        path: "reservoirFacilities",
        component: "shuiku/reservoirAssets/reservoirFacilities/index",
        name: "reservoirFacilities-sk",
        title: "感知设备",
        meta: { title: "感知设备", icon: "dc-tzgg" }
      },
      {
        path: "trainingRecords",
        component: "shuiku/reservoirAssets/trainingRecords/index",
        name: "trainingRecords-sk",
        title: "培训记录",
        meta: { title: "培训记录", icon: "dc-tzgg" }
      },
      {
        path: "perceptionDevice",
        component: "shuiku/reservoirAssets/perceptionDevice/index",
        name: "perceptionDevice-sk",
        title: "防汛物资",
        meta: { title: "防汛物资", icon: "dc-tzgg" }
      },
      {
        path: "archives",
        component: "shuiku/reservoirAssets/archives/index",
        name: "archives-sk",
        title: "档案资料",
        meta: { title: "档案资料", icon: "dc-tzgg" }
      },
      {
        path: "inspectionBriefing",
        component: "shuiku/reservoirAssets/inspectionBriefing/index",
        name: "inspectionBriefing-sk",
        title: "巡查简报",
        meta: { title: "巡查简报", icon: "dc-tzgg" }
      }
    ]
  },
  // 系统管理
  {
    path: "/system",
    component: "Layout",
    redirect: "/system/user",
    name: "UtilSystem",
    alwaysShow: true,
    title: "系统管理",
    meta: {
      title: "系统管理",
      icon: "hzz_xtgl"
    },
    children: [
      {
        path: "user",
        component: "system/user/index",
        name: "SystemUser",
        title: "用户管理",
        meta: { title: "用户管理" }
      },
      {
        path: "role",
        component: "system/role/index",
        name: "SystemRole",
        title: "角色管理",
        meta: { title: "角色管理" }
      },
      {
        path: "menu",
        component: "/system/menu/index",
        name: "SystemMenu",
        title: "菜单管理",
        meta: { title: "菜单管理" }
      },
      {
        path: "dict",
        component: "system/dict/index",
        name: "SystemDict",
        title: "字典管理",
        meta: { title: "字典管理" }
      },
      {
        path: "shp",
        component: "system/shp/index",
        name: "Systemshp",
        title: "图层管理",
        meta: { title: "图层管理" }
      },
      {
        path: "dept",
        component: "system/dept/index",
        name: "SystemDept",
        title: "部门管理",
        meta: { title: "部门管理" }
      },
      {
        path: "associationReservoir",
        component: "system/AssociationReservoir/index",
        name: "AssociationReservoir",
        title: "关联水库",
        meta: { title: "关联水库" }
      },
      {
        path: "associationSite",
        component: "system/AssociationSite/index",
        name: "AssociationSite",
        title: "关联站点",
        meta: { title: "关联站点" }
      }
    ]
  },
  // 大屏
  {
    path: "/dzMap2",
    component: "Layout",
    redirect: "/dzMap2/dzMap",
    name: "DzMapdaping",
    title: "大屏",
    meta: { title: "大屏", icon: "tp-zhjs" },
    children: [
      {
        path: "dzMap",
        component: "DIZAI/monitoring/index",
        name: "DzMapChilddaping",
        title: "大屏",
        meta: { title: "大屏", icon: "tp-zhjs" }
      }
    ]
  },
  //新增-组织机构-系统管理
  {
    path: "/systemManagement",
    component: "Layout",
    redirect: "/systemManagement",
    name: "SystemManagement",
    alwaysShow: true,
    title: "系统管理new",
    meta: {
      title: "系统管理new",
      icon: "xtgl"
    },
    children: [
      {
        path: "organization",
        component: "systemManagement/organization/index",
        name: "Organization",
        title: "组织机构",
        meta: { title: "组织机构" }
      },
      {
        path: "userM",
        component: "systemManagement/user/index",
        name: "Userm",
        title: "用户管理new",
        meta: { title: "用户管理new" }
      },
      {
        path: "roleM",
        component: "systemManagement/role/index",
        name: "Rolem",
        title: "角色管理new",
        meta: { title: "角色管理new" }
      },
      {
        path: "subsystem",
        component: "systemManagement/subsystem/index",
        name: "Subsystem",
        title: "子系统管理",
        meta: { title: "子系统管理" }
      },
      {
        path: "menuM",
        component: "/systemManagement/menu/index",
        name: "menuM",
        title: "菜单管理new",
        meta: { title: "菜单管理new" }
      }

      // {
      //   path: "dictM",
      //   component: "systemManagement/dict/index",
      //   name: "dictM",
      //   title: "字典管理",
      //   meta: { title: "字典管理" }
      // },
    ]
  }
];

export default [
  {
    url: "/user/getMenus.*",
    type: "get",
    response: config => {
      return {
        status: true,
        code: 20000,
        autoLogin: true,
        // data: dizaiMenus
        data: [...dizaiMenus, ...skMenus]
        // data: shuikuMenus
        // data: [...shuikuMenus,
        //       ...floodSIM_COMMON]
      };
    }
  }
];
