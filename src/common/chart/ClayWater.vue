<template>
  <!-- 裂缝 -->
 
  <div ref="line"></div>
 
</template>

<script>
  import echarts from 'echarts'
  import {shallowClone, hexToRGBA} from "@/utils/index"
  import {chartSetting} from './setting'

  // sessionStorage.setItem('chartUnit', 'mm')
  export default {
    props: ['data', 'config','contData'],
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
         
         let xOffset = this.contData && this.contData.referV ? this.contData.referV :  0;
      
        let legendArr = ["初始值","检测值","变化值"]
        let xData = []
        let seriesArr = []
        // let seriesI = Object.assign({
        //   name: legendArr[0],
        //   data: [],
        // }, chartSetting.line)
        // seriesArr.push(seriesI)
        legendArr.forEach((e,index)=>{
          var seriesItem = shallowClone(chartSetting.line)
          seriesItem.name = e
          seriesItem.data = []
          seriesItem.itemStyle.normal.color = chartSetting.colors[index]
          seriesItem.itemStyle.emphasis.color = chartSetting.colors[index]
          seriesItem.itemStyle.emphasis.borderColor = hexToRGBA(chartSetting.colors[index], 0.2)
          if(e == "变化值"){
            seriesItem.yAxisIndex=1
          }
          seriesArr.push(seriesItem)
        });
        this.data.forEach(item => {
          xData.push(item['日期'])
          seriesArr.forEach(series => {
            if(series.name == "变化值"){
              series.data.push(item["泥位"]-xOffset);
            }
            if(series.name == "初始值"){
              series.data.push(xOffset);
            }
            if(series.name == "检测值"){
              series.data.push(item["泥位"]);
            }
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
          let unit = "mm"
          let min = null
          let max = null
          if (params && params.config) {
            unit = params.config.y.unit ? params.config.y.unit : "mm"
            min = params.config.y.min ? params.config.y.min : null
            max = params.config.y.max ? params.config.y.max : null
          }
          let item = Object.assign({
            name: '单位(' + unit + ')',
            min: chartData.x.length ? min : 1,
            max: chartData.x.length ? max : 30
          }, chartSetting.yAxis)
          if(items == "初始值"){
            yAxis.push(item)
          }
          if(items == "变化值"){
            yAxis.push(item)
          }
        })
        return yAxis
      },

    },
    mounted() {
      console.log(this.data)
      this.$nextTick(function () {
       
        this.loadChart()
      })
    },
  }
</script>
