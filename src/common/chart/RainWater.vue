<template>
  <!--雨水-->
  <div ref="line"></div>
</template>

<script>
  import echarts from 'echarts'
  import {chartSetting} from './setting'

  export default {
    props: ['data', 'config'],
    methods: {
      loadChart() {
        const line = echarts.init(this.$refs.line)
        let chartData = this.formatterChartData()
        const option = {
          color: chartSetting.colors,
          noDataLoadingOption: chartSetting.noDataLoadingOption,
          toolbox: chartSetting.toolbox,
          grid: chartSetting.grid,
          dataZoom: chartSetting.dataZoom,
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              let time = params[0].name
              return time + '<br/>雨量：' + Number(params[1].data).toFixed(1) + 'mm<br/>水位：' + Number(params[0].data).toFixed(2) + 'm'
            }
          },
          legend: Object.assign({data: chartData.legend}, chartSetting.legend),
          xAxis: Object.assign({data: chartData.x}, chartSetting.xAxis),
          yAxis: this.formatterYaxis(chartData),
          series: chartData.series
        }
        line.setOption(option)
      },

      // 格式化图表数据
      formatterChartData() {
        let legendArr = ['水位', '雨量']
        let xData = []
        let seriesArr = [
          {
            name: legendArr[0],
            type: 'line',
            data: [],
            smooth: true, //平滑曲线显示
            itemStyle: {
              normal: {
                color: chartSetting.colors[0]
              }
            }
          },
          {
            name: legendArr[1],
            type: 'bar',
            yAxisIndex: 1,
            barWidth: '10%',
            data: [],
            itemStyle: {
              normal: {
                color: chartSetting.colors[1]
              }
            }
          },
        ]
        this.data.forEach(item => {
          xData.push(item['日期'])
          seriesArr.forEach(series => {
            series.data.push(item[series.name])
          })
        })
        return {
          "legend": legendArr,
          "x": xData,
          "series": seriesArr,
        }
      },

      // 格式化Y轴数据
      formatterYaxis(chartData) {
        let yAxis = []
        let self = this
        chartData.legend.forEach((items, index) => {
          let params = self.config.find(i => {
            return i.name == items
          })
          let unit = 'm'
          let min = null
          let max = null
          if (params && params.config) {
            unit = params.config.y.unit ? params.config.y.unit : "m"
            min = params.config.y.min ? params.config.y.min : null
            max = params.config.y.max ? params.config.y.max : null
          }
          let item = Object.assign({
            name: "水位（m）",
            min: chartData.x.length ? min : 1,
            max: chartData.x.length ? max : 10,
          }, chartSetting.yAxis)
          if (index) {
            item = Object.assign({
              name: "雨量（mm）",
              min: chartData.x.length ? min : 1,
              max: chartData.x.length ? max : 10,
              position: 'right',
              nameLocation: 'start',
              inverse: true,
            }, chartSetting.yAxis)
          }
          yAxis.push(item)
        })
        return yAxis
      },

    },
    mounted() {
      this.$nextTick(function () {
        this.loadChart()
      })
    }
  }
</script>
