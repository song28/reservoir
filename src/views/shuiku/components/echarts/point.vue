<template>
  <div class="chart">
    <div v-for="(item, index) in KindsechartsName" :key="index" class="rainC">
      <div class="rainChart">
        <div
          :id="nameChart"
          :class="'container' + index"
          autoresize
          :style="'height:' + height + ';width:' + width"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: ['chartData', 'width', 'height'],
  data() {
    return {
      tableDataShowV: {},
      KindsechartsName: [],
      chartinfo: [],
      count: 0,
      rain: [],
      crack: [],
      move: [],
      pastTime: '',
      currentTime: '',
      nameChart: ''
    }
  },

  mounted() {
    this.nameChart = 'echarts' + Math.random() * 100000
    console.log(this.nameChart, 'dddddddd')
    this.getdetailRain()
  },
  methods: {
    queryTime(day) {
      // 过去-今天
      const pastTime = this.$moment()
        .subtract(day, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      const currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      this.pastTime = pastTime
      this.currentTime = currentTime
      return [pastTime, currentTime]
    },

    getdetailRain() {
      const data = [
        ['2000-06-05', 10],
        ['2000-06-06', 10],
        ['2000-06-07', 10],
        ['2000-06-08', 86],
        ['2000-06-09', 73],
        ['2000-06-10', 85]
      ]
      const that = this
      that.chartinfo.push({
        Ykind: 'point', // Y轴双坐标
        // idname: "chart" + that.chartData.id + cusno + chartID,
        idname: this.nameChart,
        type: ['scatter', 'effectScatter'],
        lineColor: ['#1CD030', '#D01C1C'],
        lineLegend: ['正常', '断线'], // 图例
        Yname: ['状态'], // Y轴纵坐标单位
        dataX: [
          '2020-06-06',
          '2020-06-07',
          '2020-06-08',
          '2020-06-09',
          '2020-07-05',
          '2020-07-06',
          '2020-06-09'
        ],
        dataXY: data,
        dataY0: [10, 10, 10, 10, 9.999, 9.999, 9.999, 9.999, 9.999, 9.999]
      })
      that.KindsechartsName.push({
        type: 'rain',
        cusno: '5555555555'
      })
      that.$nextTick(function() {
        that.draw(that.chartinfo[0])
      })
    },

    draw(infoConfig) {
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
              splitLine: {
                show: true,
                width: 0.1,
                lineStyle: {
                  type: 'solid',
                  color: '#E9ECEE' // 网格颜色
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
                width: 0,
                lineStyle: {
                  type: 'solid',
                  color: '#E9ECEE' // 网格颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#666666', // y 0 刻度样式
                  width: 0
                }
              },
              type: 'value',
              name: '降雨量(mm)',
              min: 0,
              max: 50,
              interval: 10
            },
            {
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0,
                lineStyle: {
                  type: 'solid',
                  color: '#E9ECEE'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#666666',
                  width: 0
                }
              },
              type: 'value',
              name: '累计降雨量(mm)',
              min: 0,
              max: 500,
              interval: 100
            }
          ],
          series: [
            {
              name: infoConfig.lineLegend[0], // 与图例必须保持一致
              type: infoConfig.type[0],
              barWidth: 3,
              color: infoConfig.lineColor[0],
              data: infoConfig.dataY0
            },
            {
              symbol: 'circle', // 不添加空心点,添加后为实心点，拐点样式
              name: infoConfig.lineLegend[1],
              type: infoConfig.type[1],
              yAxisIndex: 1, // //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              color: infoConfig.lineColor[1],
              data: infoConfig.dataY1
            }
          ]
        }
      } else if (infoConfig.Ykind == 'single') {
        option = {
          xAxis: {
            type: 'category',
            data: infoConfig.dataX,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: 'solid',
                color: '#E9ECEE'
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
              width: 0.5,
              lineStyle: {
                type: 'solid',
                color: '#E9ECEE'
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
              name: infoConfig.lineLegend[index], // 与图例必须保持一致
              type: infoConfig.type[index],
              barWidth: 16,
              color: infoConfig.lineColor[index],
              data: infoConfig['dataY' + index],
              symbol: 'circle' // 不添加空心点,添加后为实心点，拐点样式
            })
          })
        }
      } else if (infoConfig.Ykind == 'point') {
        option = {
          xAxis: {
            type: 'category',
            //  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: infoConfig.dataX,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: 'solid',
                color: 'rgba(255,255,255,0.2)'
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
            min: 0,
            max: 20,
            name: infoConfig.Yname[0],
            axisTick: {
              show: false
            },

            axisLabel: {
              formatter: function() {
                return ''
              }
            },

            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: 'solid',
                color: '#EEEEEE'
              }
            },
            axisLine: {
              show: false,

              lineStyle: {
                color: '#666666',
                width: 0
              }
            }
          }
        }
      }
      option.series = []
      if (infoConfig.type.length > 0) {
        infoConfig.type.forEach((val, index, arr) => {
          option.series.push({
            symbolSize: 10,
            name: infoConfig.lineLegend[index], // 与图例必须保持一致
            type: infoConfig.type[index],
            //   barWidth: 16,
            color: infoConfig.lineColor[index],
            data: infoConfig['dataY' + index],
            itemStyle: {
              normal: {
                // shadowBlur: 10,
                // // shadowColor: "rgba(120, 36, 50, 0.5)",
                // shadowOffsetY: 5,
                color: function(e) {
                  if (e.data == 10) {
                    return infoConfig.lineColor[0]
                  } else {
                    return infoConfig.lineColor[1]
                  }
                }
              }
            },
            symbol: 'circle' // 不添加空心点,添加后为实心点，拐点样式
          })
        })
      }
      // 共有样式
      option.tooltip = {
        // trigger: "axis",
        // axisPointer: {
        //   type: "cross",
        //   crossStyle: {
        //     color: "#999"
        //   }
        // }
      }
      option.grid = {
        show: true,
        top: '22%',
        left: '3%', // 图表距边框的距离
        right: '3%',
        bottom: '10%',
        containLabel: true,
        backgroundColor: '#F5F9FC'
      }

      option.legend = {
        data: infoConfig.lineLegend,
        orient: 'horizontal',
        x: 'center',
        y: 'top',
        textStyle: {
          // 图例文字的样式
          color: '#666666',
          fontSize: 10
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
      myChart.resize()
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  .rainChart {
    position: relative;
    // top: 0.1rem;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    p {
      font-size: 0.12rem;
      text-align: left;
    }
    .container0,
    .container2,
    .container1 {
      width: 100%;
      // height: 1.8rem;
    }
  }
}
</style>

