<template>
  <div ref="line" :style="{height: height}"></div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: ['data', 'height', 'name'],
    methods: {
      loadChart() {
        const line = echarts.init(this.$refs.line)
        let legendData = []
        let xData = []
        let seriesArr = []
        let self = this
        this.data.forEach((item, index) => {
          xData.push(item['日期'])
          for (let key in item) {
            if (key != '日期') {
              if (index == 0) {
                legendData.push(key)
              }
              let seriesItem = {
                name: null,
                type: 'line',
                data: []
              }

              if (self.name) {
                if (item[self.name] != undefined || item[self.name] !== null) {
                  let seriesObj = seriesArr.find(res => {
                    return res.name == self.name
                  })
                  if (seriesObj) {
                    seriesObj.data.push(item[self.name])
                  } else {
                    seriesItem.name = self.name
                    seriesItem.data.push(item[self.name])
                    seriesArr.push(seriesItem)
                  }
                }
              } else {
                let seriesObj = seriesArr.find(res => {
                  return res.name == key
                })
                if (seriesObj) {
                  seriesObj.data.push(item[key])
                } else {
                  seriesItem.name = key
                  seriesItem.data.push(item[key])
                  seriesArr.push(seriesItem)
                }
              }
            }
          }
        })
        legendData = legendData.length ? legendData : ['电池电压', '信号强度']
        let colors = ['#1ADA6F', '#F74747', '#F1BF25', '#1493FF']
        const option = {
          color: colors,
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            bottom: '0%',
            itemGap: 30,
            data: legendData
          },
          noDataLoadingOption: {
            text: '暂无数据',
            effect: 'bubble',
            effectOption: {
              effect: {
                n: 0
              }
            }
          },
          grid: {
            top: '10%',
            right: '5%',
            left: '5%',
            bottom: '20%'
          },
          dataZoom: [
            {
              show: true,
              height: 16,
              bottom: "8%",
              xAxisIndex: [0],
              start: 10,
              end: 90,
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
          xAxis: {
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
                color: '#313131'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#313131'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#C1C1C1'
              }
            },
            data: xData
          },
          yAxis: [
            {
              type: 'value',
              nameTextStyle: {
                color: '#313131'
              },
              axisLabel: {
                formatter: '{value}',
                color: '#999999'
              },
              axisLine: {
                lineStyle: {
                  color: '#C1C1C1'
                }
              },
              axisTick: {
                show:false
              },
              splitLine: {
                lineStyle: {
                  color: '#E6E6E6',
                  type: 'dashed'
                }
              },
              min: xData.length ? null : 1,
              max: xData.length ? null : 30
            }
          ],
          series: seriesArr
        }
        line.setOption(option)
      }

    },
    mounted() {
      this.data = this.data ? this.data : []
      this.$nextTick(function () {
        this.loadChart()
      })
    }
  }
</script>
