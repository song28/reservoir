//水库列表->listReservoirs
export const tbskListHeader = [
  {
    prop: "code",
    label: "水库编码",
    show: false
  },
  {
    prop: "name",
    label: "水库名称",
    show: true
  },
  {
    prop: "tegr",
    label: "水库规模",
    show: true
  },
  {
    prop: "matrl",
    label: "坝型",
    show: false
  },
  {
    prop: "xingzheng",
    label: "行政责任人",
    show: true
  },
  {
    prop: "xzmobile",
    label: "行政责任人电话",
    show: false
  },
  {
    prop: "xzduty",
    label: "行政责任人职务",
    show: false
  },
  {
    prop: "xzunit",
    label: "行政责任人单位",
    show: false
  },
  {
    prop: "jishu",
    label: "技术责任人",
    show: true
  },

  {
    prop: "jsmobile",
    label: "技术责任人电话",
    show: false
  },
  {
    prop: "jsduty",
    label: "技术责任人职务",
    show: false
  },
  {
    prop: "jsduty",
    label: "技术责任人职务",
    show: false
  },
  {
    prop: "danwei",
    label: "单位责任人",
    show: true
  },
  {
    prop: "dwmobile",
    label: "管理单位责任人电话",
    show: false
  },
  {
    prop: "dwduty",
    label: "管理单位责任人职务",
    show: false
  },
  {
    prop: "dwunit",
    label: "管理单位责任人单位",
    show: false
  },
  {
    prop: "chLev",
    label: "校核洪水位(m)",
    show: false
  },
  {
    prop: "chCap",
    label: "校核库容(万m³)",
    show: false
  },
  {
    prop: "deLev",
    label: "设计洪水位(m)",
    show: false
  },
  {
    prop: "deCap",
    label: "设计库容(万m³)",
    show: false
  },
  {
    prop: "xuncha",
    label: "巡查责任人",
    show: true
  },
  {
    prop: "xcmobile",
    label: "巡查电话",
    show: false
  },

  {
    prop: "pac",
    label: "行政区划代码 ",
    show: false
  },
  {
    prop: "town",
    label: "乡镇（街道）名称",
    show: false
  },
  {
    prop: "lng",
    label: "经度",
    show: false
  },
  {
    prop: "lat",
    label: "纬度",
    show: false
  },
  {
    prop: "adag",
    label: "管理单位",
    show: false
  },
  // {
  //   prop: "rercode",
  //   label: "主要负责人",
  //   show: false
  // },

  {
    prop: "osid",
    label: "联系电话",
    show: false
  },
  {
    prop: "watShedArea",
    label: "控制集雨面积(km²)",
    show: false
  },
  {
    prop: "watLev",
    label: "正常蓄水位(m)",
    show: false
  },
  {
    prop: "vol",
    label: "总库容(万m³)",
    show: false
  },
  {
    prop: "deadCap",
    label: "死库容(万m³)",
    show: false
  },
  {
    prop: "normPoolStagCap",
    label: "正常库容(万m³)",
    show: false
  },
  {
    prop: "deIrar",
    label: "保护耕地(万亩)",
    show: false
  },
  {
    prop: "mpob",
    label: "保护人口(人)",
    show: false
  },
  {
    prop: "nsType",
    label: "溢洪道型式(m)",
    show: false
  },
  {
    prop: "elev",
    label: "死水位",
    show: false
  },
  {
    prop: "benResCap",
    label: "坝顶轴长(m)",
    show: false
  },
  {
    prop: "dacrElev",
    label: "坝顶高程(m)",
    show: false
  },

  {
    prop: "height",
    label: "最大坝高(m)",
    show: false
  },
  {
    prop: "kdLength",
    label: "坝顶宽(m)",
    show: false
  },
  // {
  //     prop: "kdStrType",
  //     label: "挡水主坝类型"
  // },

];
//人员列表reservoirPersonnel
export const tbskPersonListHeader = [
  {
    prop: "name",
    label: "人员名称",
    show: true
  },
  {
    prop: "roleNames",
    label: "水库关系人",
    show: true
  },
  {
    prop: "mobile",
    label: "联系方式",
    show: true
  },
  {
    prop: "address",
    label: "家庭地址",
    show: false
  },
  {
    prop: "reservoirNames",
    label: "管理水库",
    show: true
  },
  {
    prop: "age",
    label: "年龄",
    show: false
  },
  {
    prop: "familySize",
    label: "家庭人口数量",
    show: false
  },
  {
    prop: "trainResult",
    label: "培训结果",
    show: false
  },
  {
    prop: "emergencyContact",
    label: "紧急联系人",
    show: false
  },
  {
    prop: "emergencyContactPhone",
    label: "紧急联系人电话",
    show: false
  },
  {
    prop: "remark",
    label: "备注",
    show: false
  }
];
//人员统计
export const tbskPersonListHeaderTJ = [
  {
    prop: "tm",
    label: "统计月份",
    show: true
  },
  {
    prop: "xc",
    label: "巡查次数",
    show: true
  },
  {
    prop: "sj",
    label: "上报事件次数",
    show: true
  },
  {
    prop: "xq",
    label: "上报险情次数",
    show: false
  },
  {
    prop: "bj",
    label: "保洁次数",
    show: true
  },
  {
    prop: "byd",
    label: "表扬单次数",
    show: false
  },
  {
    prop: "jbd",
    label: "交办单次数",
    show: false
  }
];
//标准maintenanceStandards
export const tbskStandards = [
  {
    prop: "pointName",
    label: "维护点位名称"
  },
  {
    prop: "normExplain",
    label: "标准说明"
  }
];
//水库列表的坝型----大坝类型
export const skListBarTypeOptions = [
  {
    value: '0',
    label: "土坝"
  },
  {
    value: '1',
    label: "浆砌石坝"
  },
  {
    value: '2',
    label: "混凝土坝"
  },
  {
    value: '3',
    label: "其他"
  },
  {
    value: '4',
    label: "挡水坝"
  },
  {
    value: '5',
    label: "挡水闸"
  },
  {
    value: '6',
    label: "心墙坝"
  },
  {
    value: '7',
    label: "斜墙坝"
  },
  {
    value: '8',
    label: "均质坝"
  },
  {
    value: '9',
    label: "支墩坝"
  },
  {
    value: '10',
    label: "重力坝"
  }
];
//溢洪道形式
export const skListOpenTypeOptions = [
  {
    value: 1,
    label: "开敞式溢洪道"
  },
  {
    value: 2,
    label: "宽浅式溢洪道"
  },
  {
    value: 3,
    label: "正槽开敞式溢洪道"
  },
  {
    value: 4,
    label: "竖井式溢洪堰"
  },
  {
    value: 5,
    label: "开槽式溢洪道"
  }
];
//水库规模
export const skListSizeTypeOptions = [
  {
    value: 1,
    label: "小1"
  },
  {
    value: 2,
    label: "小2"
  }
];
// 工程规模
export const engineeringScaleOptions = [
  {
    value: '1',
    label: "大(1)型"
  },
  {
    value: '2',
    label: "大(2)型"
  },
  {
    value: '3',
    label: "中型"
  },
  {
    value: '4',
    label: "小(1)型"
  },
  {
    value: '5',
    label: "小(2)型"
  },
];
// 工程等别==================
export const engineeringLevelOptions = [
  {
    value: '1',
    label: "Ⅰ"
  },
  {
    value: '2',
    label: "Ⅱ"
  },
  {
    value: '3',
    label: "Ⅲ"
  },
  {
    value: '4',
    label: "Ⅳ"
  },
  {
    value: '5',
    label: "Ⅴ"
  },
];
// 工程状态==================
export const engineeringStateOptions = [
  {
    value: '1',
    label: "在建"
  },
  {
    value: '2',
    label: "已建"
  },
  {
    value: '9',
    label: "其他"
  },

];
//   注册等级与否
export const isrgOptions = [
  {
    value: '1',
    label: "已注册"
  },
  {
    value: '0',
    label: "未注册"
  },


];
// 归属部门==================

export const affiliationOptions = [
  {
    value: '1',
    label: "水利"
  },
  {
    value: '2',
    label: "能源"
  },
  {
    value: '3',
    label: "交通"
  },
  {
    value: '4',
    label: "农业"
  },
  {
    value: '5',
    label: "建设"
  },
  {
    value: '6',
    label: "国企"
  },
  {
    value: '9',
    label: "其他"
  },


];
// 地震动峰值加速度==================

export const eqmtpkacltOptions = [
  {
    value: '1',
    label: "<0.05g"
  },
  {
    value: '2',
    label: "0.05g"
  },
  {
    value: '3',
    label: "0.10g"
  },
  {
    value: '4',
    label: "0.15g"
  },
  {
    value: '5',
    label: "0.20g"
  },
  {
    value: '6',
    label: "0.30g"
  },
  {
    value: '7',
    label: "≥0.4g"
  },


];
// 地震基本烈度==================

export const bsssinOptions = [
  {
    value: '5',
    label: "<Ⅵ"
  },
  {
    value: '6',
    label: "Ⅵ"
  },
  {
    value: '7',
    label: "Ⅶ"
  },
  {
    value: '8',
    label: "Ⅷ"
  },
  {
    value: '9',
    label: "≥Ⅸ"
  },



];
// 设防地震烈度==================

export const freqinOptions = [
  {
    value: '0',
    label: "未设防"
  },
  {
    value: '6',
    label: "Ⅵ"
  },
  {
    value: '7',
    label: "Ⅶ"
  },
  {
    value: '8',
    label: "Ⅷ"
  },
  {
    value: '9',
    label: "≥Ⅸ"
  },



];
// 主要建筑物级别==================
export const mnblgrOptions = [
  {
    value: '1',
    label: "1"
  },
  {
    value: '2',
    label: "2"
  },
  {
    value: '3',
    label: "3"
  },
  {
    value: '4',
    label: "4"
  },
  {
    value: '5',
    label: "5"
  },



];
// 监测类型==================
export const monittypOptions = [
  {
    value: '1',
    label: "位移"
  },
  {
    value: '2',
    label: "渗流"
  },
  {
    value: '3',
    label: "渗压"
  },
  {
    value: '4',
    label: "环境量"
  },
];
// 监测项目options==================
export const monitorProjecOptions = [
  {
    value: '01',
    label: "表面垂直位移"
  },
  {
    value: '02',
    label: "表面水平位移"
  },
  // {
  //   value: '03',
  //   label: "内部位移"
  // },
  // {
  //   value: '04',
  //   label: "接缝位移"
  // },
  {
    value: '05',
    label: "渗流压力"
  },
  // {
  //   value: '06',
  //   label: "渗流水位"
  // },
  // {
  //   value: '07',
  //   label: "渗流量"
  // },
  // {
  //   value: '08',
  //   label: "应力应变"
  // },
  // {
  //   value: '09',
  //   label: "地震"
  // },
  // {
  //   value: '10',
  //   label: "水力学"
  // },
  {
    value: '11',
    label: "环境量"
  },
  {
    value: '99',
    label: "断面",//"其他监测项目"
  },
];
// 控制方式options==================
export const crmtOptions = [
  {
    value: '0',
    label: "无闸控制"
  },
  {
    value: '1',
    label: "有闸控制"
  },

];
//培训结果
export const pxResultsOptions = [
  {
    value: 1,
    label: "未培训"
  },
  {
    value: 2,
    label: "培训通过"
  }
];
// 水准基面
export const dtplOptions = [
  {
    value: '01',
    label: "1985国家高程基准"
  },
  {
    value: '02',
    label: "1956黄海高程基准"
  },
  {
    value: '03',
    label: "波罗的海高程基面"
  },
  {
    value: '04',
    label: "广州高程基面"
  },
  {
    value: '05',
    label: "珠江高程基面"
  },
  {
    value: '06',
    label: "大连零点"
  },
  {
    value: '07',
    label: "废黄河零点"
  },
  {
    value: '08',
    label: "坎门零点"
  },
  {
    value: '09',
    label: "吴淞（口）高程基面"
  },
  {
    value: '10',
    label: "其他绝对基面"
  },
  {
    value: '11',
    label: "假定基面"
  },
  {
    value: '12',
    label: "测站基面"
  },
  {
    value: '13',
    label: "冻结基面"
  },

];
// ctcd 流域options================ 
export const ctcdOptions = [
  {
    value: 'A1',
    label: "松江流域"
  },
  {
    value: 'A2',
    label: "海河流域"
  },
  {
    value: 'A3',
    label: "黄河流域"
  },
  {
    value: 'A4',
    label: "淮河流域"
  },
  {
    value: 'A5',
    label: "长江流域"
  },
  {
    value: 'A6',
    label: "东南沿海流域"
  },
  {
    value: 'A7',
    label: "珠江流域"
  },



];

// workstatus 工作状态options================
export const workstatusOptions = [
  {
    value: '0',
    label: "未启用"
  },
  {
    value: '1',
    label: "启用"
  },
];
// sttp   测站类型 ===========
export const sttpOptions = [
  {
    value: '1',
    label: "水文站"
  },
  {
    value: '2',
    label: "水位站"
  },
  {
    value: '3',
    label: "降水量站"
  },
  {
    value: '4',
    label: "水面蒸发站"
  },
  {
    value: '5',
    label: "地下水站（井）"
  },
  {
    value: '6',
    label: "水质站"
  },
  {
    value: '7',
    label: "土壤墒情站"
  },
  {
    value: '9',
    label: "其他"
  },
];
// dutyPerson 责任人类型============
export const dutyPersonOptions = [
  {
    value: '技术责任人',
    label: "技术责任人"
  },
  {
    value: '行政责任人',
    label: "行政责任人"
  },
  {
    value: '巡查责任人',
    label: "巡查责任人"
  },
  {
    value: '管理单位责任人',
    label: "管理单位责任人"
  },

];
//设备类型
export const devicetypeOptions = [
  {
    value: '1',
    label: "雨量"
  },
  {
    value: '2',
    label: "水位"
  },


];
//仪器类型
export const apparatustypeOptions = [
  {
    value: '1',
    label: "人工采集"
  },
  {
    value: '2',
    label: "振弦式仪器"
  },
  {
    value: '3',
    label: "差阻式仪器"
  },
  {
    value: '4',
    label: "电容式仪器"
  },
  {
    value: '5',
    label: "数字式仪器"
  },
  {
    value: '6',
    label: "铜电阻式"
  },
  {
    value: '7',
    label: "电磁式仪器"
  },
  {
    value: '8',
    label: "压力式仪器"
  },



];
//采集单元
export const CJMKOptions = [
  {
    value: '1',
    label: "人工作业"
  },
  {
    value: '2',
    label: "南京葛南MCU32"
  },
  {
    value: '3',
    label: "南京葛南单点"
  },
  {
    value: '4',
    label: "南京南瑞"
  },
  {
    value: '5',
    label: "南自所"
  },
  {
    value: '6',
    label: "南京水科院"
  },
  {
    value: '7',
    label: "水文数据"
  },
  {
    value: '8',
    label: "远程终端单元"
  },



];

//监测方式
export const monitoringWayOptions = [
  {
    value: '1',
    label: "人工监测"
  },
  {
    value: '2',
    label: "自动化监测"
  },




];
//水库列表---new-----
export const skListNewHeader = [
  {
    prop: "rscd",
    label: "水库代码",
    show: false
  },
  {
    prop: "rsnm",
    label: "水库名称",
    show: true
  },
  // {
  //   prop: "prsc",
  //   label: "工程规模",
  //   show: true
  // },
  {
    prop: "prscName",
    label: "工程规模",
    show: true
  },
  {
    // prop: "dmtp",
    prop: "dmtpName",
    label: "大坝类型",
    show: false
  },
  {
    prop: "mnun",
    label: "管理单位",
    show: true
  },
  {
    prop: "addvnm",
    label: "行政区名称",
    show: false
  },
  // {
  //   prop: "addvcd",
  //   label: "行政区编码",
  //   show: false
  // },
  {
    prop: "maxdmhg",
    label: "最大坝高（m）",
    show: false
  },
  {
    prop: "mjflsscnwl",
    label: "汛限水位（m）",
    show: true
  },



];
// 基础信息----
export const basicDataHeader = [
  {
    prop: "rscd",
    label: "水库编码",
    show: false
  },
  {
    prop: "rsnm",
    label: "水库名称",
    show: true
  },
  {
    prop: "alias",
    label: "别名/曾用名",
    show: true
  },
  {
    prop: "prst",
    label: "工程状态",
    show: true
  },
  {
    prop: "prsc",
    label: "工程规模",
    show: false
  },
  {
    prop: "prgr",
    label: "工程等别",
    show: true
  },
  {
    prop: "mnblgr",
    label: "主要建筑物级别",
    show: false
  },
  {
    prop: "mnun",
    label: "管理单位",
    show: false
  },
  {
    prop: "cmun",
    label: "主管单位",
    show: false
  },
  {
    prop: "blsys",
    label: "归属部门",
    show: true
  },

  {
    prop: "addvcd",
    label: "行政区",
    show: false
  },
  {
    prop: "ctcd",
    label: "所在流域",
    show: false
  },
  {
    prop: "rvcd",
    label: "所在河流",
    show: false
  },
  {
    prop: "eslg",
    label: "经度",
    show: true
  },
  {
    prop: "nrlt",
    label: "纬度",
    show: false
  },
  {
    prop: "eqmtpkaclt",
    label: "地震动峰值加速度",
    show: false
  },
  {
    prop: "bsssin",
    label: "地震基本烈度",
    show: false
  },
  {
    prop: "freqin",
    label: "设防地震烈度",
    show: false
  },
  {
    prop: "dtpl",
    label: "水准基面",
    show: false
  },
  {
    prop: "cpyr",
    label: "建成年份",
    show: false
  },
  {
    prop: "isrg",
    label: "注册等级与否",
    show: false
  },
  {
    prop: "rsov",
    label: "水库概况",
    show: true
  },
  {
    prop: "focus",
    label: "是否重点",
    show: true
  },
  {
    prop: "sickness",
    label: "是否病险",
    show: true
  },


];

// 大坝信息----
export const damDataHeader = [
  {
    prop: "rscd",
    label: "水库编码",
    show: false
  },
  {
    prop: "dmcd",
    label: "坝编码",
    show: true
  },
  {
    prop: "dmnm",
    label: "大坝名称",
    show: true
  },
  {
    prop: "dmbsglcn",
    label: "坝基地质条件",
    show: true
  },
  {
    prop: "dmtp",
    label: "坝型",
    show: false
  },
  {
    prop: "maxdmhg",
    label: "最大坝高",
    show: true
  },
  {
    prop: "dmcrel",
    label: "坝顶高程(m)",
    show: false
  },
  {
    prop: "wvwltpel",
    label: "防浪墙顶高程",
    show: false
  },
  {
    prop: "dmcrlen",
    label: "坝顶长度(m)",
    show: false
  },
  {
    prop: "dmcrwd",
    label: "坝顶宽度(m)",
    show: true
  },

  {
    prop: "aselst",
    label: "防渗体形式",
    show: false
  },
  {
    prop: "aseltpel",
    label: "防渗体顶高程(m)",
    show: false
  },
  {
    prop: "dmbsasms",
    label: "坝基防渗措施",
    show: false
  },
  {
    prop: "drelst",
    label: "排水体型式",
    show: true
  },
  // {
  //   prop: "dtupdt",
  //   label: "数据更新日期",
  //   show: false
  // },


];
// 溢洪道基础信息----
export const spillWayHeader = [
  {
    prop: "rscd",
    label: "水库编码",
    show: false
  },
  {
    prop: "swcd",
    label: "溢洪道编号",
    show: true
  },
  {
    prop: "swnm",
    label: "溢洪道名称",
    show: true
  },
  {
    prop: "lyps",
    label: "布置位置",
    show: true
  },
  {
    prop: "crmt",
    label: "控制方式",
    show: false
  },
  {
    prop: "wrcrel",
    label: "堰顶高程(m)",
    show: true
  },
  {
    prop: "wrcrntwd",
    label: "堰顶净宽(m)",
    show: false
  },
  {
    prop: "ofwrst",
    label: "溢流堰型式",
    show: false
  },
  {
    prop: "gtst",
    label: "闸门型式",
    show: false
  },
  {
    prop: "gtsz",
    label: "闸门尺寸",
    show: true
  },

  {
    prop: "gtam",
    label: "闸门数量",
    show: false
  },
  {
    prop: "maxds",
    label: "最大泄量",
    show: false
  },
  {
    prop: "endsst",
    label: "消能型式",
    show: false
  },
  {
    prop: "hseq",
    label: "启闭设备",
    show: true
  },
  {
    prop: "hsgram",
    label: "启闭机数量",
    show: false
  },
  {
    prop: "pwspcn",
    label: "电源条件",
    show: false
  },
  // {
  //   prop: "dtupdt",
  //   label: "数据更新时间",
  //   show: false
  // },
];
// 水库工程效益信息----
export const benefitHeader = [
  {
    prop: "rscd",
    label: "水库编码",
    show: false
  },
  {
    prop: "rvcrsfds",
    label: "河道安全泄量(m³/s)",
    show: true
  },
  {
    prop: "fkcborar",
    label: "防洪保护面积(km²)",
    show: true
  },
  {
    prop: "flcnprpp",
    label: "防洪保护人口(人)",
    show: true
  },
  {
    prop: "flcnprcn",
    label: "防洪保护县以上城镇",
    show: false
  },
  {
    prop: "flcnprtw",
    label: "防洪保护乡镇",
    show: true
  },
  {
    prop: "flcnprfl",
    label: "防洪保护耕地(万亩)",
    show: false
  },
  {
    prop: "flcnprrw",
    label: "防洪保护铁路",
    show: false
  },
  {
    prop: "flcnprrd",
    label: "防洪保护公路",
    show: false
  },
  {
    prop: "dsirar",
    label: "设计灌溉面积(亩)",
    show: true
  },

  {
    prop: "efirar",
    label: "有效灌溉面积(亩)",
    show: false
  },
  {
    prop: "maxirar",
    label: "最大实灌面积(亩)",
    show: false
  },
  {
    prop: "dsanwtsp",
    label: "设计年供水量(万m³)",
    show: false
  },
  {
    prop: "avanwtsp",
    label: "多年平均供水量(万m³)",
    show: true
  },
  {
    prop: "uravanwtsp",
    label: "城镇多年平均供水量(万m³)",
    show: false
  },
  {
    prop: "inavanwtsp",
    label: "工业多年平均供水量(万m³)",
    show: false
  },
  {
    prop: "plavanstsp",
    label: "人畜多年平均供水量(万m³)",
    show: false
  },
  {
    prop: "ttincp",
    label: "总装机容量(万kW)",
    show: false
  },
  {
    prop: "avanenot",
    label: "多年平均发电量(GW·h)",
    show: false
  },
  {
    prop: "nvim",
    label: "航运条件改善",
    show: false
  },
  {
    prop: "wtprgr",
    label: "水利风景区级别",
    show: false
  },
  {
    prop: "enbn",
    label: "环境效益",
    show: false
  },

];
// 特征信息----
export const characteristicHeader = [
  {
    prop: "rscd",
    label: "水库编码",
    show: false
  },
  {
    prop: "cnctar",
    label: "控制流域面积(km²)",
    show: true
  },
  {
    prop: "rvcrlen",
    label: "河道长度(km)",
    show: true
  },
  {
    prop: "rvcrgr",
    label: "河道降比(‰)",
    show: true
  },
  {
    prop: "avanpram",
    label: "多年平均降水量(mm)",
    show: true
  },
  {
    prop: "avanrnam",
    label: "多年平均径流量(万m³)",
    show: true
  },
  {
    prop: "avansdam",
    label: "多年平均输沙量(万t)",
    show: true
  },
  {
    prop: "myavgmintp",
    label: "多年平均最低气温(℃)",
    show: true
  },
  {
    prop: "dsrcin",
    label: "设计重现期(年一遇)",
    show: true
  },
  {
    prop: "dspkfl",
    label: "合计洪峰流量(m³/s)",
    show: true
  },
  {
    prop: "dsflvlondy",
    label: "设计一日洪水总量(万m³)",
    show: true
  },
  {
    prop: "dsflvlthdy",
    label: "设计三日洪水总理(万m³)",
    show: true
  },
  {
    prop: "chrcin",
    label: "校核重现期(年一遇)",
    show: true
  },
  {
    prop: "chpkfl",
    label: "校核洪峰流量(m³/s)",
    show: true
  },
  {
    prop: "chfldr",
    label: "校核洪水历时(d)",
    show: true
  },
  {
    prop: "chflvl",
    label: "校核洪水总量(万m³)",
    show: true
  },
  {
    prop: "rsrrgtpfm",
    label: "水库调节性能",
    show: true
  },
  {
    prop: "chfllv",
    label: "校核洪水位(m)",
    show: true
  },
  {
    prop: "dsfllv",
    label: "设计洪水位(m)",
    show: true
  },
  {
    prop: "flcnhgwl",
    label: "防洪高水位(m)",
    show: true
  },
  {
    prop: "mjflsscnwl",
    label: "主汛期限制水位(m)",
    show: true
  },
  {
    prop: "nrstlv",
    label: "正常蓄水位(m)",
    show: true
  },
  {
    prop: "ddwl",
    label: "死水位(m)",
    show: true
  },
  {
    prop: "ttstcp",
    label: "总库容(万m³)",
    show: true
  },
  {
    prop: "flstcp",
    label: "调洪库容(万m³)",
    show: true
  },
  {
    prop: "flcnstcp",
    label: "防洪库容(万m³)",
    show: true
  },
  {
    prop: "acstcp",
    label: "兴利库容(万m³)",
    show: true
  },
  {
    prop: "ddstcp",
    label: "死库容(万m³)",
    show: true
  },
  // {
  //   prop: "dtupdt",
  //   label: "数据更新日期",
  //   show: true
  // },



];
// 添加档案信息----
export const fileHeader = [
  // {
  //   prop: "rscd",
  //   label: "水库编码",
  //   show: false
  // },
  // {
  //   prop: "flcd",
  //   label: "文件编码",
  //   show: true
  // },
  {
    prop: "flnm",
    label: "文件名称",
    show: true
  },
  {
    prop: "fltp",
    label: "文件类型",
    show: true
  },
  {
    prop: "flpath",
    label: "文件路径",
    show: true
  },
  // {
  //   prop: "dtupdt",
  //   label: "上传日期",
  //   show: true
  // },




];

// 人员列表----
export const personnelHeader = [
  {
    prop: "rscd",
    label: "水库编码",
    show: false
  },
  {
    prop: "rsnm",
    label: "水库名称",
    show: true
  },

  {
    prop: "name",
    label: "姓名",
    show: true
  },
  {
    prop: "mobile",
    label: "手机号",
    show: true
  },


  {
    prop: "unit",
    label: "单位",
    show: true
  },
  {
    prop: "dutyPerson",
    label: "责任人类型",
    show: true
  },
  {
    prop: "duty",
    label: "职务",
    show: false
  },





];

// 监测项目----
export const monitorProjectHeader = [
  // {
  //   prop: "rscd",
  //   label: "水库编码",
  //   show: false
  // },
  {
    prop: "posid",
    label: "工程部位",
    show: false
  },
  {
    prop: "posname",
    label: "工程部位",
    show: true
  },
  {
    prop: "monittyp",
    label: "监测类别",
    show: false
  },
  {
    prop: "monittypName",
    label: "监测类别",
    show: true
  },
  {
    prop: "enmnit",
    label: "工情监测项目",
    show: false
  },
  {
    prop: "enmnitName",
    label: "工情监测项目",
    show: true
  },
  {
    prop: "crsc",
    label: "监测断面桩号",
    show: true
  },
  {
    prop: "mpam",
    label: "监测数量",
    show: true
  },

  {
    prop: "mneq",
    label: "监测设备",
    show: true
  },

  // {
  //   prop: "dtupdt",
  //   label: "数据更新日期",
  //   show: true
  // },




];
// 工程部位----
export const engineeringPartsHeader = [
  {
    prop: "poscode",
    label: "工程部位编码",
    show: false
  },
  {
    prop: "posname",
    label: "工程部位名称",
    show: true
  },
  // {
  //   prop: "rscd",
  //   label: "所属水库编码",
  //   show: false
  // },
  {
    prop: "rsnm",
    label: "所属水库名称",
    show: true
  },
  {
    prop: "explain",
    label: "说明描述",
    show: false
  },

];
// 工程部位----下拉框----
export const engineeringPartsOptions = [
  {
    value: '1',
    label: "坝顶"
  },
  {
    value: '2',
    label: "背水坡"
  },
  {
    value: '3',
    label: "迎水坡"
  },
  {
    value: '4',
    label: "坝脚"
  },
  {
    value: '5',
    label: "溢洪道"
  },
  {
    value: '6',
    label: "泄洪洞"
  },
  {
    value: '7',
    label: "输水涵"
  },
  {
    value: '8',
    label: "闸门"
  },
  {
    value: '9',
    label: "排水沟"
  },



];

// 测点列表
export const siteListHeader = [
  {
    prop: "mpname", //11==stnm;   其他===mpname
    label: "测点名称",
    show: true
  },
  {
    prop: "enmnitName",//"enmnit",
    label: "项目名称",
    show: true
  },

  {
    prop: "workstatus",
    label: "工作状态",
    show: true
  },


];
// 测站基础信息  工情监测项目 ：01=表面垂直位移
export const siteBasciHeader01 = [
  // {
  //   prop: "rscd",
  //   label: "水库代码",
  //   show: true
  // },
  {
    prop: "mpcd",
    label: "测点编码",
    show: true
  },
  {
    prop: "mpname",
    label: "测点名称",
    show: true
  },
  {
    prop: "devicesno",
    label: "设备编码",
    show: true
  },
  {
    prop: "mpaddress",
    label: "位置",
    show: true
  },
  {
    prop: "melv",
    label: "接测高程",
    show: true
  },

  {
    prop: "type",
    label: "型式",
    show: true
  },
  {
    prop: "bddt",
    label: "埋设日期",
    show: true
  },
  {
    prop: "bstn",
    label: "基础情况",
    show: true
  },
  {
    prop: "dmdt",
    label: "测定日期",
    show: true
  },
  {
    prop: "mpno",
    label: "桩号（m）",
    show: true
  },
  {
    prop: "damb",
    label: "坝轴距（m）",
    show: true
  },


  {
    prop: "lv",
    label: "测点高程",
    show: true
  },
  {
    prop: "scdm",
    label: "示意图",
    show: true
  },
  {
    prop: "scdmdec",
    label: "示意图说明",
    show: true
  },
  {
    prop: "director",
    label: "主管",
    show: true
  },
  {
    prop: "bdu",
    label: "埋设者",
    show: true
  },
  {
    prop: "wu",
    label: "填表者",
    show: true
  },
  {
    prop: "verifier",
    label: "校核者",
    show: true
  },
  {
    prop: "mru",
    label: "监测者",
    show: true
  },
  {
    prop: "wudt",
    label: "填表日期",
    show: true
  },
  // {
  //   prop: "enmnit",
  //   label: "工情监测项目",
  //   show: true
  // },
  // {
  //   prop: "posid",
  //   label: "工程部位编码",
  //   show: true
  // },
  // {
  //   prop: "monittyp",
  //   label: "监测类型",
  //   show: true
  // },
  // {
  //   prop: "enmnitid",
  //   label: "监测项目ID",
  //   show: true
  // },

  {
    prop: "workstatus",
    label: "工作状态",
    show: true
  },


];
// 测站基础信息   02=表面水平位移========================	
export const siteBasciHeader02 = [
  // {
  //   prop: "rscd",
  //   label: "水库代码",
  //   show: true
  // },
  {
    prop: "mpcd",
    label: "测点编码",
    show: true
  },
  {
    prop: "mpname",
    label: "测点名称",
    show: true
  },
  {
    prop: "devicesno",
    label: "设备编码",
    show: true
  },
  {
    prop: "mmd",
    label: "监测方法",
    show: true
  },
  {
    prop: "useismt",
    label: "使用仪器",
    show: true
  },

  {
    prop: "type",
    label: "型式",
    show: true
  },
  {
    prop: "bddt",
    label: "埋设日期",
    show: true
  },
  {
    prop: "mmdt",
    label: "监测日期",
    show: true
  },
  {
    prop: "bdx",
    label: "埋设位置: X",
    show: true
  },
  {
    prop: "bdy",
    label: "埋设位置：Y",
    show: true
  },
  {
    prop: "bdh",
    label: "埋设位置：H",
    show: true
  },
  {
    prop: "scdm",
    label: "示意图",
    show: true
  },
  {
    prop: "scdmdec",
    label: "示意图说明",
    show: true
  },
  {
    prop: "director",
    label: "主管",
    show: true
  },
  {
    prop: "bdu",
    label: "埋设者",
    show: true
  },
  {
    prop: "wu",
    label: "填表者",
    show: true
  },
  {
    prop: "verifier",
    label: "校核者",
    show: true
  },
  {
    prop: "mru",
    label: "监测者",
    show: true
  },
  {
    prop: "wudt",
    label: "填表日期",
    show: true
  },
  {
    prop: "mpad",
    label: "测点位置",
    show: true
  },
  {
    prop: "srnum",
    label: "始测读书",
    show: true
  },
  {
    prop: "bz",
    label: "备注",
    show: true
  },
  // {
  //   prop: "enmnit",
  //   label: "工情监测项目",
  //   show: true
  // },
  // {
  //   prop: "posid",
  //   label: "工程部位编码",
  //   show: true
  // },
  // {
  //   prop: "monittyp",
  //   label: "监测类型",
  //   show: true
  // },
  // {
  //   prop: "enmnitid",
  //   label: "监测项目ID",
  //   show: true
  // },

  {
    prop: "workstatus",
    label: "工作状态",
    show: true
  },


];
// 测站基础信息   05=渗流压力    监测类别渗压========================	
export const siteBasciHeader05 = [
  // {
  //   prop: "rscd",
  //   label: "水库代码",
  //   show: true
  // },
  // {
  //   prop: "place",
  //   label: "工程部位",
  //   show: true
  // },
  {
    prop: "mpcd",
    label: "测点编码",
    show: true
  },
  {
    prop: "mpname",
    label: "测点名称",
    show: true
  },
  {
    prop: "devicesno",
    label: "设备编码",
    show: true
  },
  {
    prop: "mpno",
    label: "桩号",
    show: true
  },
  {
    prop: "damb",
    label: "坝轴距（m）",
    show: true
  },

  {
    prop: "mparea",
    label: "埋设区域",
    show: true
  },
  {
    prop: "drd",
    label: "钻孔直径（mm）",
    show: true
  },
  {
    prop: "drdp",
    label: "钻孔深度（mm）",
    show: true
  },
  {
    prop: "dropel",
    label: "孔口高程（m）",
    show: true
  },
  {
    prop: "drgrel",
    label: "孔底高程（m）",
    show: true
  },

  {
    prop: "bdlayer",
    label: "钻入基岩或界层",
    show: true
  },
  {
    prop: "depth",
    label: "深度（m）",
    show: true
  },
  {
    prop: "backfill",
    label: "回填透水材料",
    show: true
  },
  {
    prop: "pmbfopel",
    label: "透水材料顶高程（m）",
    show: true
  },
  {
    prop: "pmbfgrel",
    label: "透水材料底高程（m）",
    show: true
  },
  {
    prop: "seal",
    label: "回填封孔材料",
    show: true
  },
  {
    prop: "sealopel",
    label: "封孔顶高程（m）",
    show: true
  },
  {
    prop: "sealgrel",
    label: "封孔底高程（m）",
    show: true
  },
  {
    prop: "material",
    label: "测压管材质",
    show: true
  },
  {
    prop: "inside",
    label: "管内径",
    show: true
  },
  {
    prop: "outside",
    label: "管外径",
    show: true
  },
  {
    prop: "extent",
    label: "管长度",
    show: true
  },
  {
    prop: "inletlen",
    label: "进水段长度",
    show: true
  },
  {
    prop: "bdmd",
    label: "埋设方式",
    show: true
  },
  {
    prop: "tubeopel",
    label: "测压管管口高程",
    show: true
  },
  {
    prop: "tubegrel",
    label: "测验管管底高程",
    show: true
  },
  {
    prop: "bemdwl",
    label: "埋设前水位",
    show: true
  },
  {
    prop: "afmdwl",
    label: "埋设后水位",
    show: true
  },
  {
    prop: "upstream",
    label: "上有水位",
    show: true
  },
  {
    prop: "downstream",
    label: "下游水位",
    show: true
  },
  {
    prop: "weather",
    label: "天气",
    show: true
  },
  {
    prop: "lv",
    label: "测点高程",
    show: true
  },
  {
    prop: "scdm",
    label: "示意图",
    show: true
  },
  {
    prop: "scdmdec",
    label: "示意图说明",
    show: true
  },
  {
    prop: "director",
    label: "主管",
    show: true
  },
  {
    prop: "bdu",
    label: "埋设者",
    show: true
  },
  {
    prop: "wu",
    label: "填表者",
    show: true
  },
  {
    prop: "verifier",
    label: "校核者",
    show: true
  },
  {
    prop: "mru",
    label: "监测者",
    show: true
  },
  {
    prop: "wudt",
    label: "填表日期",
    show: true
  },
  {
    prop: "period",
    label: "埋设时段",
    show: true
  },
  // {
  //   prop: "enmnit",
  //   label: "工情监测项目",
  //   show: true
  // },
  // {
  //   prop: "posid",
  //   label: "工程部位编码",
  //   show: true
  // },
  // {
  //   prop: "monittyp",
  //   label: "监测类型",
  //   show: true
  // },
  // {
  //   prop: "enmnitid",
  //   label: "监测项目ID",
  //   show: true
  // },

  {
    prop: "workstatus",
    label: "工作状态",
    show: true
  },

  // 新接口
  {
    prop: "tempBenchmark",
    label: "温度基准值",
    show: true
  },
  {
    prop: "rsf",
    label: "灵敏度系数",
    show: true
  },
  {
    prop: "seepageforceBenchmark",
    label: "渗压基准值",
    show: true
  },
  {
    prop: "pressureBenchmark",
    label: "压力基准值",
    show: true
  },
  {
    prop: "tempRevise",
    label: "温度修正系数",
    show: true
  },
  {
    prop: "channel",
    label: "通道",
    show: true
  },
  {
    prop: "elevation",
    label: "设备安装高程",
    show: true
  },
  


];
// 测站基础信息   05=渗流压力    监测类别渗流========================	
export const siteBasciHeader0501 = [
  // {
  //   prop: "rscd",
  //   label: "水库代码",
  //   show: true
  // },
  // {
  //   prop: "place",
  //   label: "工程部位",
  //   show: true
  // },
  {
    prop: "mpcd",
    label: "测点编码",
    show: true
  },
  {
    prop: "mpname",
    label: "测点名称",
    show: true
  },
  {
    prop: "devicesno",
    label: "设备编码",
    show: true
  },
  {
    prop: "mpno",
    label: "桩号",
    show: true
  },
  {
    prop: "damb",
    label: "坝轴距（m）",
    show: true
  },

  {
    prop: "mparea",
    label: "埋设区域",
    show: true
  },
  {
    prop: "drd",
    label: "钻孔直径（mm）",
    show: true
  },
  {
    prop: "drdp",
    label: "钻孔深度（mm）",
    show: true
  },
  {
    prop: "dropel",
    label: "孔口高程（m）",
    show: true
  },
  {
    prop: "drgrel",
    label: "孔底高程（m）",
    show: true
  },

  {
    prop: "bdlayer",
    label: "钻入基岩或界层",
    show: true
  },
  {
    prop: "depth",
    label: "深度（m）",
    show: true
  },
  {
    prop: "backfill",
    label: "回填透水材料",
    show: true
  },
  {
    prop: "pmbfopel",
    label: "透水材料顶高程（m）",
    show: true
  },
  {
    prop: "pmbfgrel",
    label: "透水材料底高程（m）",
    show: true
  },
  {
    prop: "seal",
    label: "回填封孔材料",
    show: true
  },
  {
    prop: "sealopel",
    label: "封孔顶高程（m）",
    show: true
  },
  {
    prop: "sealgrel",
    label: "封孔底高程（m）",
    show: true
  },
  {
    prop: "material",
    label: "测压管材质",
    show: true
  },
  {
    prop: "inside",
    label: "管内径",
    show: true
  },
  {
    prop: "outside",
    label: "管外径",
    show: true
  },
  {
    prop: "extent",
    label: "管长度",
    show: true
  },
  {
    prop: "inletlen",
    label: "进水段长度",
    show: true
  },
  {
    prop: "bdmd",
    label: "埋设方式",
    show: true
  },
  {
    prop: "tubeopel",
    label: "测压管管口高程",
    show: true
  },
  {
    prop: "tubegrel",
    label: "测验管管底高程",
    show: true
  },
  {
    prop: "bemdwl",
    label: "埋设前水位",
    show: true
  },
  {
    prop: "afmdwl",
    label: "埋设后水位",
    show: true
  },
  {
    prop: "upstream",
    label: "上有水位",
    show: true
  },
  {
    prop: "downstream",
    label: "下游水位",
    show: true
  },
  {
    prop: "weather",
    label: "天气",
    show: true
  },
  {
    prop: "lv",
    label: "测点高程",
    show: true
  },
  {
    prop: "scdm",
    label: "示意图",
    show: true
  },
  {
    prop: "scdmdec",
    label: "示意图说明",
    show: true
  },
  {
    prop: "director",
    label: "主管",
    show: true
  },
  {
    prop: "bdu",
    label: "埋设者",
    show: true
  },
  {
    prop: "wu",
    label: "填表者",
    show: true
  },
  {
    prop: "verifier",
    label: "校核者",
    show: true
  },
  {
    prop: "mru",
    label: "监测者",
    show: true
  },
  {
    prop: "wudt",
    label: "填表日期",
    show: true
  },
  {
    prop: "period",
    label: "埋设时段",
    show: true
  },
  // {
  //   prop: "enmnit",
  //   label: "工情监测项目",
  //   show: true
  // },
  // {
  //   prop: "posid",
  //   label: "工程部位编码",
  //   show: true
  // },
  // {
  //   prop: "monittyp",
  //   label: "监测类型",
  //   show: true
  // },
  // {
  //   prop: "enmnitid",
  //   label: "监测项目ID",
  //   show: true
  // },

  {
    prop: "workstatus",
    label: "工作状态",
    show: true
  },

  
  


];
// 测站基础信息   11=环境量========================	
export const siteBasciHeader11 = [
  // {
  //   prop: "rscd",
  //   label: "水库代码",
  //   show: true
  // },
  {
    prop: "stcd",
    label: "测站代码",
    show: true
  },

  // {
  //   prop: "mpname",

  //   // prop: "stnm",
  //   label: "测站名称",
  //   show: true
  // },
  {
    prop: "stnm",
    label: "测站名称",
    show: true
  },
  {
    prop: "devicesno",
    label: "设备编码",
    show: true
  },
  {
    prop: "devicetype",
    label: "设备类型 ",
    show: true
  },
  {
    prop: "sttp",
    label: "测站类型",
    show: true
  },



  {
    prop: "mnun",
    label: "管理单位",
    show: true
  },
  {
    prop: "cmun",
    label: "主管单位",
    show: true
  },
  {
    prop: "addvcd",
    label: "所在地行政区划代码",
    show: true
  },
  {
    prop: "vltw",
    label: "所在乡镇",
    show: true
  },
  {
    prop: "ctcd",
    label: "所在流域代码",
    show: true
  },
  {
    prop: "rvcd",
    label: "所在河流代码",
    show: true
  },
  {
    prop: "eslg",
    label: "东经",
    show: true
  },
  {
    prop: "nrlt",
    label: "北纬",
    show: true
  },
  {
    prop: "hshgfl",
    label: "历史最大洪峰流量(立方/秒)",
    show: true
  },
  {
    prop: "bdu",
    label: "历史最小枯水流量(立方/秒)",
    show: true
  },
  {
    prop: "dtpl",
    label: "水准基面",
    show: true
  },
  {
    prop: "ststdt",
    label: "设站日期",
    show: true
  },
  {
    prop: "hmstov",
    label: "水文测站概况",
    show: true
  },
  // {
  //   prop: "dtupdt",
  //   label: "数据更新日期",
  //   show: true
  // },

  // {
  //   prop: "enmnit",
  //   label: "工情监测项目",
  //   show: true
  // },
  // {
  //   prop: "posid",
  //   label: "工程部位编码",
  //   show: true
  // },
  // {
  //   prop: "monittyp",
  //   label: "监测类型",
  //   show: true
  // },
  // {
  //   prop: "enmnitid",
  //   label: "监测项目ID",
  //   show: true
  // },
  {
    prop: "workstatus",
    label: "工作状态",
    show: true
  },


];

// 参数信息========================	
export const parameterHeader = [

  {
    prop: "instrtype",
    label: "仪器类型",
    show: true
  },
  {
    prop: "monitormode",
    label: "监测方式",
    show: true
  },
  {
    prop: "collectunit",
    label: "采集单元",
    show: true
  },
];
// 附件信息========================	
export const accessoryHeader = [

  {
    prop: "planeX",
    label: "平面位置X",
    show: true
  },
  {
    prop: "planeY",
    label: "平面位置Y",
    show: true
  },
  {
    prop: "aggre",
    label: "聚合",
    show: true
  },
  {
    prop: "mappPoint",
    label: "映射测点",
    show: true
  },
  {
    prop: "revised",
    label: "修正值",
    show: true
  },
];
export const focusOptions = [
  {
    value: '0',
    label: "否"
  },
  {
    value: '1',
    label: "是"
  }
];
export const sicknessOptions = [
  {
    value: '0',
    label: "否"
  },
  {
    value: '1',
    label: "是"
  }
];
