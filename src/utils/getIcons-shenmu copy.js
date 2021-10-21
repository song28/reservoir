var __const_icons = [
  //神木图片
  

  
  {
    name: "测站",
    val: "CZ"
  },
  {
    name: "湖泊",
    val: "HP"
  },
  {
    name: "梯田工程",
    val: "TTGC"
  },
  {
    name: "泵站工程",
    val: "BZGC"
  },
  {
    name: "水井",
    val: "SJ"
  },
  {
    name: "地表水源",
    val: "DBS"
  },
  {
    name: "河流",
    val: "HL"
  },
  {
    name: "堤防工程",
    val: "DFGC"
  },
  {
    name: "淤地坝",
    val: "YDB"
  },
  {
    name: "取水口",
    val: "QSK"
  },
  {
    name: "塘坝",
    val: "TB"
  },
  {
    name: "公共供水企业",
    val: "GGGS"
  },
  {
    name: "水库",
    val: "SK"
  },
  {
    name: "灌区",
    val: "GQ"
  },
  {
    name: "窖（池）工程",
    val: "JCGC"
  },
  {
    name: "地下水水源地",
    val: "DXS"
  },
  {
    name: "建筑业与第三产业",
    val: "JZY"
  },
  {
    name: "工业企业",
    val: "GYQY"
  },
  {
    name: "渠道",
    val: "QD"
  },

  {
    name: "雨量",
    val: "pp"
  },
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
  }
  
];
// 截取前边的非0数据，
export function getIcons( ) {
   return __const_icons;
}
export function getIconUrl(val) {
  return require('@/assets/images/shenmu/layer/' + val + '.png');
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