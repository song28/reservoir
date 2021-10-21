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
        const self = this
        let legendData = [this.name ? this.name : '水位']
        let data = {
          'x': [],
          '0': [],
        }
        this.data.forEach(item => {
          data['x'].push(item['日期'])
          let val = Number(item[this.name]).toFixed(2)
          data['0'].push(val)
        })
        const option = {
          color: ['#89C997', '#1493FF'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              let time = params[0].name
              return time + '<br/>' + self.name + '：' + Number(params[0].data).toFixed(2) + 'm'
            }
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
          legend: {
            bottom: '0%',
            itemGap: 30,
            data: legendData,
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
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#E6E6E6'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#E6E6E6',
              }
            },
            axisLine: {
              lineStyle: {
                color: '#E6E6E6'
              }
            },
            data: data.x,
          },
          yAxis: [
            {
              type: "value",
              name: this.name,
              nameTextStyle: {
                color: '#313131',
              },
              axisLabel: {
                formatter: '{value}',
                color: '#999999',
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#313131'
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#E6E6E6',
                  type: 'dashed'
                }
              },
              min: data.x.length ? null : 0,
              max: data.x.length ? null : 10
            }
          ],
          series: [
            {
              name: this.name,
              type: 'line',
              data: data['0'],
              itemStyle: {
                normal: {
                  color: '#1493FF'
                }
              }
            }
          ]
        }
        line.setOption(option)

      },

    },
    mounted() {
      this.data = this.data ? this.data : []
      this.$nextTick(function () {
        this.loadChart()
      })
    },
  }
</script>
