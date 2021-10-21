
<template>
  <!--位移-->
  <div ref="line"></div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts-gl'


  import {chartSetting} from './setting'

  export default {
    props: ['data', 'config'],
    data() {
      return {
        chartData: []
      }
    },
    methods: {
      loadChart() {
        const line = echarts.init(this.$refs.line)
        let chartData = this.formatterChartData()
        const option = {
          noDataLoadingOption: chartSetting.noDataLoadingOption,
          toolbox: chartSetting.toolbox,
          visualMap: {
            show: false,
            dimension: 2,
            min: 0,
            max: 30,
            inRange: {
              color: chartSetting.colors
            }
          },
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value'
          },
          grid3D: {
            viewControl: {
              projection: 'orthographic'
            }
          },
          series: chartData.series
        }
        line.setOption(option)
      },

      formatterChartData() {
        let xData = [], seriesArr = [], legendAll = [];
        var len = 50;
        var offsetX = 0;
        var offsetY = 0;
        for (var i = 0; i < len; i++) {
          var data = [];
          var rndx = (Math.random() - Math.random() > 0 ? 1 : -1) * Math.random()
          var rndy = (Math.random() - Math.random() > 0 ? 1 : -1) * Math.random()
          var maxOffsetX = 30;
          var maxOffsetY = 20;
          for (var t = (0 - i) * 100; t >= (0 - i - 1) * 100; t -= 1) {
            var x = 10 + (Math.sin(rndx * maxOffsetX * 3.14 / 180.0));
            var y = 10 + (Math.sin(rndy * maxOffsetY * 3.14 / 180.0))
            var z = t
            data.push([x + offsetX, y + offsetX, z]);
            if (t == (0 - i - 1) * 100) {
              offsetX = x - 10
              offsetY = y - 10
            }
          }
          seriesArr.push({
            type: 'line3D',
            data: data,
            lineStyle: {
              width: 4
            }
          });
        }

        return {
          legend: legendAll,
          series: seriesArr,
          x: xData
        }
      },
    },
    mounted() {
      if (this.data) {
        this.chartData = this.data
      }
      this.$nextTick(function () {
        this.loadChart()
      })
    }
  }
</script>
