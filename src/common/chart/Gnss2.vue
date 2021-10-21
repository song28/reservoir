<template>
  <!--GNSS-->
  <div class="chart-box">
    <div ref="line" class="chart-box-div"></div>
    <div ref="polar" class="chart-box-div"></div>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import {shallowClone, hexToRGBA} from "@/utils/index"
  import {chartSetting} from './setting'

  // sessionStorage.setItem('chartUnit', 'mm,mm,mm,mm,mm')
  export default {
    props: ['data', 'config'],
    methods: {
      loadChart() {
        const line = echarts.init(this.$refs.line)
        let chartData = this.formatterChartData()
        let grid = chartSetting.grid
        grid.left = '8%'
        const option = {
          color: chartSetting.colors,
          noDataLoadingOption: chartSetting.noDataLoadingOption,
          tooltip: chartSetting.tooltip,
          toolbox: chartSetting.toolbox,
          grid: grid,
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
        let xData = []
        let legendArr = [];
        let seriesArr = [];
        let addLegend = ['2D累积变化', '3D累积变化']
        this.config.forEach((item, index) => {
          legendArr.push(item.name + "轴累积变化")
          var seriesItem = shallowClone(chartSetting.line)
          seriesItem.name = item.name + "轴累积变化"
          seriesItem.data = []
          seriesItem.itemStyle.normal.color = chartSetting.colors[index]
          seriesItem.itemStyle.emphasis.color = chartSetting.colors[index]
          seriesItem.itemStyle.emphasis.borderColor = hexToRGBA(chartSetting.colors[index], 0.2)
          seriesArr.push(seriesItem)
        })
        addLegend.forEach((item, index) => {
          legendArr.push(item)
          var seriesItem = shallowClone(chartSetting.line)
          seriesItem.name = item
          seriesItem.data = []
          seriesItem.itemStyle.normal.color = chartSetting.colors[index]
          seriesItem.itemStyle.emphasis.color = chartSetting.colors[index]
          seriesItem.itemStyle.emphasis.borderColor = hexToRGBA(chartSetting.colors[index], 0.2)
          seriesArr.push(seriesItem)
        })

        let data = [
          {"日期": '2019-10-12 08:08', 'X': 13.11, 'Y': -0.828, 'Z': -2.067},
          {"日期": '2019-10-12 08:09', 'X': 13.12, 'Y': -0.88, 'Z': -2.07},
          {"日期": '2019-10-12 08:10', 'X': 13.13, 'Y': -0.82, 'Z': -2.06},
          {"日期": '2019-10-12 08:11', 'X': 13.14, 'Y': -0.822, 'Z': -2.062},
        ]
        let polarData = {
          X: [],
          Y: []
        }
        let self = this
        data.forEach(item => {
          xData.push(item['日期'])
          polarData.X.push(item.X)
          polarData.Y.push(item.Y)
          seriesArr.forEach(series => {
            let keys = series.name.substring(0, 1)
            series.data.push(item[keys])
            if (series.name == '2D累积变化') {
              series.data.push(self.getMathSqrt(item.X, item.Y).toFixed(2))
            }
            if (series.name == '3D累积变化') {
              series.data.push(self.getMathSqrt(item.X, item.Y, item.Z).toFixed(2))
            }
          })
        });
        this.loadPolarChart(polarData)
        return {
          legend: legendArr,
          series: seriesArr,
          x: xData
        }
      },

      // 格式化Y轴数据
      formatterYaxis(chartData) {
        let yAxis = []
        let params = null
        if(this.config.length){
          params = this.config[0]
        }
        let unit = 'mm'
        let min = null
        let max = null
        if (params && params.config) {
          unit = params.config.y.unit ? params.config.y.unit : "mm"
          min = params.config.y.min ? params.config.y.min : null
          max = params.config.y.max ? params.config.y.max : null
        }
        let item = Object.assign({
          name: '单位(' + unit + ')',
          nameLocation: 'center',
          nameGap: 30,
          min: chartData.x.length ? min : 1,
          max: chartData.x.length ? max : 30
        }, chartSetting.yAxis)
        yAxis.push(item)
        return yAxis
      },


      // 极坐标
      loadPolarChart(polarData) {
        const polar = echarts.init(this.$refs.polar)
        let seriesData = []
        for (var i = 0; i <= polarData.X.length; i++) {
          var r = Math.sqrt(polarData.X[i] * polarData.X[i] + polarData.Y[i] * polarData.Y[i])
          var theta = polarData.X[i] == 0 ? 0 : Math.atan(polarData.Y[i] / polarData.X[i])
          theta = theta * 180 / Math.PI
          seriesData.push([r, theta]);
        }

        for (var i = 0; i <= polarData.X.length; i++) {
          var theta = i / 100 * 360;
          var r = 50 * (1 + Math.sin(theta / 180 * Math.PI));
        }

        const option = {
          polar: {},
          angleAxis: {
            type: 'value',
            min: 0,
            max: 360,
            interval: 30,
            startAngle: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
          },
          radiusAxis: {},
          series: [{
            coordinateSystem: 'polar',
            name: '极坐标',
            type: 'line',
            data: seriesData
          }]
        };
        polar.setOption(option)
      },

      //获取GNSS 2D 3D数据
      getMathSqrt(x, y, z) {
        if (z) {
          return Math.sqrt((x * x) + (y * y) + (z * z))
        } else {
          return Math.sqrt((x * x) + (y * y))
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.loadChart()
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .chart-box {
    display: flex;
    .chart-box-div:nth-child(1) {
      width: 70%;
      height: 100%;
    }
    .chart-box-div:nth-child(2) {
      width: 30%;
      height: 100%;
    }
  }

</style>
