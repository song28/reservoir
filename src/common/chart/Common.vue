<template>
   
  <div ref="line"></div>
</template>

<script>
  import echarts from 'echarts'
  import {shallowClone, hexToRGBA} from '@/utils'
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
          grid: chartSetting.grid,
          dataZoom: chartSetting.dataZoom,
          tooltip: chartSetting.tooltip,
          toolbox: chartSetting.toolbox,
          legend: Object.assign({itemGap: 30, data: chartData.legend}, chartSetting.legend),
          xAxis: Object.assign({data: chartData.x}, chartSetting.xAxis),
          yAxis: this.formatterYaxis(chartData),
          series: chartData.series
        }
        line.setOption(option)
      },

      formatterChartData() {
        let legendArr = []
        let xData = []
        let seriesArr = []
        this.config.forEach((item, index) => {
          legendArr.push(item.name)
          var seriesItem = shallowClone(chartSetting.line)
          if (item.config.chartType == 'bar') {
            seriesItem = shallowClone(chartSetting.bar)
          } else {
            seriesItem.itemStyle.emphasis.color = chartSetting.colors[index]
            seriesItem.itemStyle.emphasis.borderColor = hexToRGBA(chartSetting.colors[index], 0.2)
          }
          seriesItem.name = item.name
          seriesItem.data = []
          seriesItem.itemStyle.normal.color = chartSetting.colors[index]
          seriesArr.push(seriesItem)
        })
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
        let params = null
        let unit = ''
        let min = null
        let max = null
        if(this.config.length){
          params = this.config[0]
        }

        if (params && params.config) {
          unit = params.config.y.unit ? params.config.y.unit : ""
          min = params.config.y.min ? params.config.y.min : null
          max = params.config.y.max ? params.config.y.max : null
        }
        let item = Object.assign({
          name: unit,
          min: chartData.x.length ? min : 1,
          max: chartData.x.length ? max : 30
        }, chartSetting.yAxis)
        yAxis.push(item)
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
