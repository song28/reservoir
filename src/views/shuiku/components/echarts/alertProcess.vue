<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-25 10:54:43
 * @LastEditTime: 2021-08-25 11:08:35
-->
<template>
  <div class="chart">
    <div  class="rainC">
      <div class="rainChart">
        <div
          :id="chartId"
          ref="chart"
          autosize
          :style="'height:' + chartData.height + ';width:' + chartData.width"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {generateUUID} from '@/utils'

export default {
  components: {},
  props: {
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chartId: 'chart' + generateUUID(),
      myChart: {}
    }
  },
  watch: {
    'chartData.data': {
      handler: function(newV, oldV) {
        console.log(111)
        console.log(this.chartData, 'chart=============')
        this.chartId = 'chart' + generateUUID()
        // if (this.chartData.type == "cap") {
        const info = {
          icon: 'dc-dblf',
          Ykind: 'single', // Y轴单坐标
          idname: this.chartId,
          type: ['line'],
          lineColor: ['#499E83'],
          lineLegend: ['水位-库容'], // 图例
          Yname: ['库容m³'], // Y轴纵坐标单位
          Xname: ['水位m'],
          dataX: this.chartData.data.x,
          dataY0: this.chartData.data.y
        }
        this.$nextTick(() => {
          this.draw(info)
        })
        // }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    draw(infoConfig) {
      // 为了解决dom还未渲染完成，就开始执行代码而报的hook错误
      const getDIV = document.getElementById(infoConfig.idname)
      if (getDIV == null) {
        return
      }
      const myChart = this.$echarts.init(
        document.getElementById(infoConfig.idname)
      )
      const this_ = this
      let option = {}
      if (infoConfig.Ykind == 'single') {
        option = {
          xAxis: {
            type: 'category',
            name: infoConfig.Xname[0],
            data: infoConfig.dataX,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.2,
              lineStyle: {
                type: 'dashed',
                color: '#dadbdc' // 网格颜色
              }
            },
            axisLine: {
              lineStyle: {
                color: '#666666',
                width: 0
              }
            }
          },
          yAxis: {
            type: 'value',
            name: infoConfig.Yname[0],
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.2,
              lineStyle: {
                type: 'dashed',
                color: '#dadbdc' // 网格颜色
              }
            },
            axisLine: {
              lineStyle: {
                color: '#666666',
                width: 0
              }
            }
          }
        }
        option.series = []
        if (infoConfig.type.length > 0) {
          infoConfig.type.forEach((val, index, arr) => {
            option.series.push({
              smooth: true,
              name: infoConfig.lineLegend[index], // 与图例必须保持一致
              type: infoConfig.type[index],
              barWidth: 16,
              color: infoConfig.lineColor[index],
              data: infoConfig['dataY' + index],
              symbol: 'circle' // 不添加空心点,添加后为实心点，拐点样式
            })
          })
        }
      }

      // 共有样式
      option.tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      }
      option.grid = {
        show: true,
        top: '12%',
        left: '10%', // 图表距边框的距离
        right: '14%',
        bottom: '10%',
        containLabel: true,
        backgroundColor: '#F5F9FC'
      }
      option.toolbox = {
        show: true, // 是否显示工具栏组件
        orient: 'horizontal', // 工具栏 icon 的布局朝向'horizontal' 'vertical'
        itemSize: 15, // 工具栏 icon 的大小
        itemGap: 10, // 工具栏 icon 每项之间的间隔
        showTitle: true, // 是否在鼠标 hover 的时候显示每个工具 icon 的标题
        feature: {
          mark: {
            // '辅助线开关'
            show: true
          },
          dataView: {
            show: true,
            title: '数据视图',
            // lang: ['数据视图', '关闭', '导出Excel'],
            readOnly: true,
            iconStyle: {
              borderColor: '#333',
              borderWidth: 1,
              borderType: 'solid'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#1493FF'
              }
            },
            width: '80%',
            buttonColor: '#1493FF',
            buttonRight: '20',
            optionToContent: function(opt) {
              var axisData = opt.xAxis[0].data
              var series = opt.series
              console.log(axisData, '数据视图===', series)

              var tdHeads =
                '<td  style="padding:0 10px">' + infoConfig.Xname + '</td>'
              series.forEach(function(item) {
                tdHeads +=
                  '<td style="padding: 0 10px">' + infoConfig.Yname + '</td>'
              })
              var table =
                '<table border="1" style="width:calc(100% - 60px);margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>' +
                tdHeads +
                '</tr>'
              var tdBodys = ''
              for (var i = 0, l = axisData.length; i < l; i++) {
                for (var j = 0; j < series.length; j++) {
                  if (typeof series[j].data[i] === 'object') {
                    tdBodys += '<td>' + series[j].data[i].value + '</td>'
                  } else {
                    tdBodys += '<td>' + series[j].data[i] + '</td>'
                  }
                }
                table +=
                  '<tr><td style="padding: 0 10px">' +
                  axisData[i] +
                  '</td>' +
                  tdBodys +
                  '</tr>'
                tdBodys = ''
              }
              table += '</tbody></table>'
              return table
            }
          },
          mark: {show: true},
          restore: {show: true},
          magicType: {type: ['line', 'bar', 'pie']},
          saveAsImage: {show: true},
          magicType: {
            // 动态类型切换
            show: true,
            title: '切换', // 各个类型的标题文本，可以分别配置。
            type: ['line', 'bar'] // 启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）
          },
          restore: {
            // 配置项还原。
            show: true, // 是否显示该工具。
            title: '还原'
          },
          saveAsImage: {
            // 保存为图片。
            show: true, // 是否显示该工具。
            type: 'png', // 保存的图片格式。支持 'png' 和 'jpeg'。
            name: 'pic1', // 保存的文件名称，默认使用 title.text 作为名称
            backgroundColor: '#ffffff', // 保存的图片背景色，默认使用 backgroundColor，如果backgroundColor不存在的话会取白色
            title: '保存为图片',
            pixelRatio: 1 // 保存图片的分辨率比例，默认跟容器相同大小，如果需要保存更高分辨率的，可以设置为大于 1 的值，例如 2
          }
        },
        zlevel: 0, // 所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
        z: 2, // 所属组件的z分层，z值小的图形会被z值大的图形覆盖
        left: 'center', // 组件离容器左侧的距离,'left', 'center', 'right','20%'
        top: '0', // 组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
        right: 'auto', // 组件离容器右侧的距离,'20%'
        bottom: 'auto', // 组件离容器下侧的距离,'20%'
        width: 'auto', // 图例宽度
        height: 'auto'
      }
      option.legend = {
        data: infoConfig.lineLegend,
        orient: 'horizontal',
        bottom: '0px',
        textStyle: {
          // 图例文字的样式
          color: '#666666',
          fontSize: 14
        },
        itemWidth: 15,
        itemHeight: 10,
        selected: {
          XΔ: true,
          YΔ: true,
          HΔ: true,
          '2D': false,
          '3D': true,
          位移值: true,
          监测值: true,
          初始值: true
        }
      }
      myChart.setOption(option, true)
      this.myChart = myChart
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  .rainChart {
    width: 100%;
    height: 100%;
    p {
      font-size: 0.12rem;
      text-align: left;
    }
  }
}
</style>

