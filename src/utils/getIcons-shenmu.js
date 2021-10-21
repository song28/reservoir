var __const_icons = [
  
  //原有的
  {
    name: "水位",
    val: "zz"
  },
  {
    name: "广播",
    val: "gb"
  },
  {
    name: "LED",
    val: "led"
  },
  {
    name: "视频",
    val: "sp"
  },
    {
    name: "图像",
    val: "tp"
  },
  {
    name: "地图",
    val: "dt"
  },
  {
    name: "位移",
    val: "wy"
  },
  {
    name: "深部位移",
    val: "sbwy"
  },
  {
    name: "地面塌陷",
    val: "dmtx"
  },
  {
    name: "倾斜",
    val: "qx"
  },
  {
    name: "裂缝",
    val: "lf"
  },
  {
    name: "滑坡",
    val: "hp"
  },
  {
    name: "GPS",
    val: "gps"
  },
  {
    name: "GNSS",
    val: "gnss"
  },
  {
    name: "地下水位",
    val: "dxsw"
  },
  {
    name: "地声",
    val: "ds"
  },

  {
    name: "次声",
    val: "cs"
  },
  {
    name: "崩塌",
    val: "bt"
  },
  {
    name: "地裂缝",
    val: "dblf"
  },
  {
    name: "泥石流",
    val: "nsl"
  },
  {
    name: "崩塌",
    val: "bt-x-c"
  },
  {
    name: "崩塌",
    val: "bt-x-jc"
  },
  {
    name: "崩塌",
    val: "bt-z-c"
  },
  {
    name: "崩塌",
    val: "bt-z-jc"
  },
  {
    name: "地裂缝",
    val: "dlf-x-c"
  },
  {
    name: "地裂缝",
    val: "dlf-z-c"
  },
  {
    name: "地裂缝",
    val: "dlf-z-jc"
  },
  {
    name: "泥石流",
    val: "nsl-x-c"
  },
  {
    name: "泥石流",
    val: "nsl-x-jc"
  },

  
  {
    name: "泥石流",
    val: "nsl-z-c"
  },
  //新增的东川图标
  {
    name: "雨量",
    val: "dc-yl"
  },
  {
    name: "广播",
    val: "dc-gb"
  },
  {
    name: "微芯桩",
    val: "dc-wxz"
  },
  {
    name: "断线报警器",
    val: "dc-dxbjq"
  },
  {
    name: "土壤含水率",
    val: "dc-trhsl"
  },
  {
    name: "隐患点",
    val: "dc-yhd"
  },
   {
    name: "次声",
    val: "dc-cs"
  },
  {
    name: "地声",
    val: "dc-ds"
  },
   {
    name: "视频",
    val: "dc-sp"
  },
  {
    name: "泥水位",
    val: "dc-nsw"
  },
   {
    name: "地表裂缝",
    val: "dc-dblf"
  },
  
   {
    name: "GNSS",
    val: "dc-gnss"
  },
];
// 截取前边的非0数据，
export function getIcons( ) {
   return __const_icons;
}
export function getIconUrl(val) {
  return require('@/assets/images/map/layer/' + val + '.png');
}
export function getIconsByVal(val ) 
{
    if(val)
    {
    let item = __const_icons.filter(a=>{return a.val==val});
    return item.length>0 ?item[0].name : null;
    }else{
      return null;
    }
}