export const colors = ['#1860e3', '#1493FF', '#89C997',  '#9c27b0', '#ff5722', '#009688', '#3f51b5', '#239DFF', '#038cc4', '#75abd0', '#afd6dd']

import {hexToRGBA} from "@/utils/index"
 
import table2excel from 'js-table2excel'
import icon  from '@/assets/images/excel.png'
 
// 图表默认配置
export const chartSetting = {
  xAxis: {
    // type: 'category',
    axisLabel: {
      show: true,
      splitNumber: 15,
      textStyle: {
        fontSize: 12,
        color: '#999999'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#666'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#666'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#666'
      }
    }
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
      color: '#313131'
    },
    
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#666'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#E6E6E6',
        type: 'dashed'
      }
    }
  },
  legend: {
    bottom: '2%',
    itemWidth: 30,
    itemHeight: 10
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      let str = params[0].name + '<br/>'
      params.forEach((item, index) => {
      
        str += item.seriesName + '：' + Number(item.value).toFixed(2)  + '<br/>'
      })
      return str
    }
  },
  grid: {
    top: '12%',
    right: '5%',
    left: '5%',
    bottom: '20%'
  },
  toolbox: {
    top: '0%',
    right: '2%',
    itemGap: 16,
    itemSize: 16,
    feature: {
      dataView: {
        show: true,
        // lang: ['数据视图', '关闭', '导出Excel'],
        readOnly: true,
        iconStyle: {
          borderColor: '#333',
          borderWidth: 1,
          borderType: 'solid',
        },
        emphasis: {
          iconStyle: {
            borderColor: '#1493FF'
          },
        },
        buttonColor: '#1493FF',
        optionToContent: function (opt) {
          var axisData = opt.xAxis[0].data
          var series = opt.series
          var legendArr = opt.legend[0].data
          let headerHtml = ''
          let bodyHtml = ''
          // 头部
          legendArr.forEach(item => {
            headerHtml += `<span>${item}</span>`
          })
          // 内容
          axisData.forEach((item, index) => {
            let iHtml = ''
            iHtml += `<span>${item}</span>`
            series.forEach(s => {
              iHtml += `<span>${s.data[index]}</span>`
            })
            bodyHtml += `<div class="chart-body-i">${iHtml}</div>`
          })
          let head = `<div class="chart-table-head"><span>时间</span>${headerHtml}</div>`
          let content = `<div class="chart-table-body">${bodyHtml}</div>`
          return `<div class="chart-box-table">${head}${content}</div>`
        }
      },
      magicType: {
        show: true,
        type: ['line', 'bar'],
        emphasis: {
          iconStyle: {
            borderColor: '#1493FF'
          },
        },
      },
      restore: {
        show: true,
        emphasis: {
          iconStyle: {
            borderColor: '#1493FF',
            borderWidth: 1,
            borderType: 'solid',
          },
        },
      },
      saveAsImage: {
        show: true,
        emphasis: {
          iconStyle: {
            borderColor: '#1493FF'
          },
        },
      },
      myTool1: {  
        show: true,  
        title: '导出',  
        // icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnUlEQVRYR9WXgU3DMBBFXyeAEWADmACYAJgA2AA2YAQ2ACYAJoANoBMAE8AI6Ek2stw4cVQnVU+KKqXJ+fnu3/myYMO22PD6DAEcADsjIL+BrxHP9wK8AUdjnIVnr4CH2vdKEbgE7gGdPQO/FQ6PgdexECWAO0CHpqDWIoDQEX4wEiUAw6/ptNYigD7TCPZCTAUgdBXElABVEC0BdoEf4CMTrTryvxMgpvY/rS0BomYM/V4mHCHUwnUuqNYAJcEWRb2VADYm83ybbfcsKN8U5I2raQRivZ+HLimHOX8HbgptuCmAC9opL4D9sFsj4uXuu6w5gIu4oGW3DB3TyJTOjEkALK3UsUCzVkHMu03mMERkVgB37PAhgEOLnW62FCjCtOMJ0tnpQkiaasB6f8p6e7yXlmaajmYAhvsTeOzo60bgNCnNSQAUntfKqRa0YGWYjnwwbRaB2ukof277AFS5I7n13cJMiYdY9TwQ5zl/XyrH8i5QReuZ4YY6vxf6vowkVtUtzE1YqitW82nmLtYxu2PxnBgCWGfhqnc3DvAHJFpwIRxjlV8AAAAASUVORK5CYII=',
        icon:'image://'+icon,  //可以用
        // icon:'image://http://img0.bdstatic.com/static/searchdetail/img/logo-2X_0c4ef02.png',  //可以用
        emphasis: {
          iconStyle: {
            fontSize: 100,
          },
        },
        onclick: function (opts,a,b,c,d,e,f){
          var opt = opts.option;
          var axisData = opt.xAxis[0].data  //坐标数据
          var series = opt.series //折线图数据
          var legendArr = opt.legend[0].data
          
          const column = [
            {
              title: '时间',
              key: 'createTime',
              type: 'text'
            },
           
          ]
          column.push(...series.map((d,i)=>{
              return {
                 
                  title: d.name,
                  key:"data"+i ,
                  type: 'text'
                
              };
          
          }));
          const data = [
            
          ]
          axisData.forEach((d,i)=>{
                  var  a=
                  {
                    createTime: axisData[i],
                     
                  }   
                  series.forEach((dd,ii)=>{
                    a['data'+ii]= dd.data[i]
                  });
                  data.push(a);
                }

          );
           
          const excelName = '数据下载'
          
          table2excel(column, data, excelName)
        }  
      },
       

    }
  },
  dataZoom: [
    {
      show: true,
      height: 16,
      bottom: "10%",
      xAxisIndex: [0],
      start: 0,
      end: 100,
      handleStyle: {
        color: "rgb(67, 169, 255)"
      },
      textStyle: {
        color: "rgb(67, 169, 255)"
      },
      borderColor: "rgb(67, 169, 255, .3)"
    },
    {
      type: "inside",
      show: true,
      height: 15,
      start: 1,
      end: 35
    }
  ],
  noDataLoadingOption: {
    text: '暂无数据',
    effect: 'bubble',
    effectOption: {
      effect: {
        n: 0
      }
    }
  },
  colors: colors,
  line: {
    type: 'line',
    smooth: false,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 2
      }
    },
    itemStyle: {
      normal: {
        color: colors[0]
      },
      emphasis: {
        color: colors[0],
        borderColor: hexToRGBA(colors[0], .2),
        extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
        borderWidth: 10
      }
    },
  },
  bar: {
    type: 'bar',
    
    itemStyle: {
      normal: {
        color: colors[0]
      }
    }
  }
}

let settings = {
  "chartName": "雨量",
  "chartType": "bar",
  "chartColor": [],
  "lines": [
    {
      "type": null,
      "color": null,
      "describe": null,
      "val": null,
      "unit": null
    }
  ],
  "x": {
    "name": null,
    "unit": null,
    "color": null,
    "max": null,
    "min": null,
    "scale": null
  },
  "y": {
    "name": "单位",
    "unit": "mm",
    "color": null,
    "max": null,
    "min": null,
    "scale": null
  }
}

let chartComponents = [
  {
    vuename: '雨量',
    vuetype: 'rain'
  },
  {
    vuename: '水位',
    vuetype: 'water'
  },
  {
    vuename: '工况',
    vuetype: 'work'
  },
  {
    vuename: '裂缝',
    vuetype: 'crack'
  },
  {
    vuename: 'GNSS',
    vuetype: 'gnss'
  },
  {
    vuename: '位移',
    vuetype: 'offset'
  },
  {
    vuename: '渗压',
    vuetype: 'waterdown'
  },
  {
    vuename: '雨水',
    vuetype: 'rainwater'
  }
]

// 获取图表单位
function getChartUnit(index) {
  let unitArr = sessionStorage.getItem('chartUnit') ? sessionStorage.getItem('chartUnit').split(',') :[]
  let unit = unitArr[index] && unitArr[index] !== 'undefined' ? unitArr[index] : ''
  return unit
}
