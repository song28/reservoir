


//水库列表->listReservoirs 
export const tbskListHeader = [
    {
        prop: "code",
        label: "水库编码"
    },
    {
        prop: "name",
        label: "水库名称"
    },
    {
        prop: "lng",
        label: "经度"
    },
    {
        prop: "lat",
        label: "纬度"
    },

    {
        prop: "adag",
        label: "管理单位"
    },
    {
        prop: "benResCap",
        label: "坝顶轴长"
    },
    {
        prop: "dacrElev",
        label: "坝顶高程"
    },
    {
        prop: "deadCap",
        label: "死库容"
    },

    {
        prop: "deirar",
        label: "保护耕地"
    }, {
        prop: "elev",
        label: "死水位"
    },

    {
        prop: "height",
        label: "最大坝高（m）"
    },
    {
        prop: "kdLength",
        label: "坝顶宽"
    },
    {
        prop: "kdStrType",
        label: "挡水主坝类型"
    },

    {
        prop: "matrl",
        label: "坝型"
    },


    {
        prop: "mpob",
        label: "保护人口"
    },


    {
        prop: "normPoolStagCap",
        label: "正常库容"
    }, {
        prop: "nsType",
        label: "溢洪道型式"
    },

    {
        prop: "osid",
        label: "联系电话"
    },
    {
        prop: "pac",
        label: "行政区划代码（必填） "
    },
    {
        prop: "rercode",
        label: "主要负责人"
    },
    {
        prop: "tegr",
        label: "水库规模（必填）"
    },
    {
        prop: "town",
        label: "乡镇（街道）名称（必填)"
    },
    {
        prop: "vol",
        label: "总库容"
    },
    {
        prop: "watLev",
        label: "正常蓄水位"
    },
    {
        prop: "watShedArea",
        label: "控制集雨面积"
    },
]


//人员列表reservoirPersonnel
export const tbskPersonListHeader = [
    {
        prop: "name",
        label: "人员名称"
    },
    {
        prop: "roleNames",
        label: "水库关系人"
    },
    {
        prop: "mobile",
        label: "联系方式"
    },
    {
        prop: "reservoirNames",
        label: "管理水库"
    },

]
//标准maintenanceStandards
export const tbskStandards = [
    {
        prop: "pointName",
        label: "维护点位名称"
    },
    {
        prop: "normExplain",
        label: "标准说明"
    },

]
//水库列表的坝型
export const skListBarTypeOptions = [
    {
        value: 0,
        label: "土坝"
    },
    {
        value: 1,
        label: "浆砌石坝"
    },
    {
        value: 2,
        label: "混凝土坝"
    },
    {
        value: 3,
        label: "其他"
    }
];