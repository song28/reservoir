<template>
  <!--渗压  -- 地下水位-->
  <div ref="line"></div>
</template>

<script>
  import echarts from 'echarts'
  import {chartSetting} from './setting'

  sessionStorage.setItem('chartUnit', 'm')
  export default {
    props: ['data', 'config'],
    methods: {
      loadChart() {
        const line = echarts.init(this.$refs.line)
        let chartData = this.formatterChartData()
        const option = {
          color: chartSetting.colors,
          noDataLoadingOption: chartSetting.noDataLoadingOption,
          tooltip: chartSetting.tooltip,
          toolbox: chartSetting.toolbox,
          grid: chartSetting.grid,
          dataZoom: chartSetting.dataZoom,
          legend: Object.assign({data: chartData.legend}, chartSetting.legend),
          xAxis: Object.assign({data: chartData.x}, chartSetting.xAxis),
          yAxis: this.formatterYaxis(chartData),
          series: chartData.series
        }
        line.setOption(option)
      },

      // 格式化图表数据
      formatterChartData() {
        let legendArr = [this.config[0].name]
        let xData = []
        let seriesArr = []
        let seriesI = Object.assign({
          name: legendArr[0],
          data: [],
        }, chartSetting.line)
        seriesArr.push(seriesI)

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
        chartData.legend.forEach(items => {
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
            name: '单位(' + unit + ')',
            nameLocation: 'start',
            inverse: true,
            min: chartData.x.length ? min : 1,
            max: chartData.x.length ? max : 30
          }, chartSetting.yAxis)
          yAxis.push(item)
        })
        return yAxis
      },

    },
    mounted() {
      this.$nextTick(function () {
        this.loadChart()
      })
    },
  }
</script>
