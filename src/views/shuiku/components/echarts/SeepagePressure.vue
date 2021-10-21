<!--
 * @Descripttion: 渗流压力图标
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-24 18:24:12
 * @LastEditTime: 2021-10-17 12:19:32
-->
<template>
  <div v-if="chartData.type" class="rainChart">
    <div
      :id="chartId"
      ref="chart"
      autosize
      :style="'height:' + chartData.height + ';width:' + chartData.width"
    />
  </div>
</template>
<script>
import {generateUUID} from '@/utils'

export default {
  components: {},
  props: ['chartData'],
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
           let typeArr=[]
         this.chartData.legends.forEach((e) => {
          typeArr.push('line')
        });

        // if (this.chartData.type == "cap") {
        const info = {
          icon: 'dc-dblf',
          Ykind: 'single', // Y轴单坐标
          idname: this.chartId,
          type: typeArr,
          lineColor: ['#14AFCB', '#FF10E7', '#C4433E', '#2F4455', '#60A1A7','#14AFCB', '#FF10E7', '#C4433E', '#2F4455', '#60A1A7'],
          lineLegend: this.chartData.legends, // 图例
          Yname: ['渗流（cm³/s）'], // Y轴纵坐标单位
          Xname: ['时间'],
          dataX: this.chartData.data.x[0],
          ...this.chartData.data.y
        }
        console.log(info, 'info====')
        this.$nextTick(() => {
          this.draw(info)
        })
        // }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.chartData1 = {
    //   data: {
    //     x: [1, 2, 3, 4, 5],
    //     y: [1, 2, 3, 4, 5],
    //     y1: [1, 2, 3, 4, 5, 6]
    //   },
    //   width: '100%',
    //   height: '7rem'
    // }
    // const info = {
    //   icon: 'dc-dblf',
    //   Ykind: 'single', // Y轴单坐标
    //   idname: this.chartId,
    //   type: ['line', 'line'],
    //   lineColor: ['#499E83', '#499E83'],
    //   lineLegend: ['水位', '蓄水位'], // 图例
    //   Yname: ['m'], // Y轴纵坐标单位
    //   Xname: ['万m'],
    //   dataX: this.chartData1.data.x,
    //   dataY0: this.chartData1.data.y,
    //   dataY1: this.chartData1.data.y1
    // }
    // this.$nextTick(() => {
    //   this.draw(info)
    // })
  },
  methods: {
    draw(infoConfig) {
      debugger
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
      if (infoConfig.Ykind == 'double') {
        option = {
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 'auto'
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
                  color: '#666666', // xy字体颜色
                  width: 0
                }
              },
              data: infoConfig.dataX
            }
          ],
          yAxis: [
            {
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
                  type: 'solid',
                  color: '#666666', // y 0 刻度样式
                  width: 0
                }
              },
              type: 'value',
              name: '水位(m)',
              // nameLocation:'10px',
              nameTextStyle: {
                padding: [0, 0, 0, 0]
              },
              min: 0,
              minInterval: 1
            },
            {
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0,
                lineStyle: {
                  type: 'dashed',
                  color: '#dadbdc'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#666666',
                  width: 0
                }
              },
              type: 'value',
              name: '蓄水量(m³)',
              min: 0,
              interval: 1,
              minInterval: 1
            }
          ],
          series: [
            // {
            //   name: "时段降水量",
            //   type: "bar",
            //   barWidth: 16,
            //   color: "#2486FF",
            //   data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2]
            // },
            {
              name: infoConfig.lineLegend[0], // 与图例必须保持一致
              type: infoConfig.type[0],
              barMaxWidth: 50,
              color: infoConfig.lineColor[0],
              data: infoConfig.dataY0,
              connectNulls: true
            },
            {
              symbol: 'circle', // 不添加空心点,添加后为实心点，拐点样式
              name: infoConfig.lineLegend[1],
              type: infoConfig.type[1],
              yAxisIndex: 1, // //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              color: infoConfig.lineColor[1],
              data: infoConfig.dataY1,
              connectNulls: true
            }
          ]
        }
      } else if (infoConfig.Ykind == 'single') {
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
        left: '7%', // 图表距边框的距离
        right: '4%',
        bottom: '6%',
        containLabel: true,
        backgroundColor: '#F4FBF5'
      }
      option.toolbox = {
      }
      option.legend = {
        data: infoConfig.lineLegend,
        orient: 'horizontal',
        x: 'center',
        y: ' top',
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

  .rainChart {
    position: relative;
    width: 100%;
    height: 100%;
    p {
      font-size: 0.12rem;
      text-align: left;
    }
  }

</style>

