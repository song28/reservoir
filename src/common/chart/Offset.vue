<template>
  <!--位移-->
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
          noDataLoadingOption: chartSetting.noDataLoadingOption,
          toolbox: chartSetting.toolbox,
          grid: {
            left: 50,
            right: 160,
            bottom: 50,
            top: 50,
            containLabel: true
          },
          dataZoom: [{
            type: 'inside',//图表下方的伸缩条
            show: true, //是否显示
          }],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].name + "<br/>" + "深度：" + params[0].value[1] + " m<br/>" + "位移：" + params[0].value[0] + " mm"
            }
          },
          legend: {
            data: chartData.legend,
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 50,
            bottom: 50,
          },
          xAxis: Object.assign({
            type: 'value',
            position: 'top',
            min: -50,
            max: 50,
            interval: 10,
            data: chartData.x
          }, chartSetting.xAxis),
          yAxis: Object.assign({
            name: "钻孔深度(m)",
            nameLocation: 'center',
            nameGap: 40,
            min: 0,
            max: 10,
            scale: null,
            inverse: true,
            interval: 2,
          }, chartSetting.yAxis),
          series: chartData.series
        }
        line.setOption(option)
      },

      formatterChartData() {
        let self = this
        let seriesAll = [], legendAll = [];
        console.log("位移数据", this.data)
        let xData = [1, 2, 3, 4, 5];
        let dataSet = [
          {
            "name": "2019-09-01",
            "data": [0.1, 0.14, 0.2, 0.15, 0.15]
          },
          {
            "name": "2019-09-02",
            "data": [0.21, 0.214, 0.12, 0.215, 0.115]
          },
          {
            "name": "2019-09-03",
            "data": [0.1, 0.14, 0.2, 0.15, 0.15]
          }
        ];

        dataSet.forEach((items, itemsIndex) => {
          let lineData = items.data.map((d, index) => {
            return [d, xData[index]]
          })
          var item = {
            name: items.name,
            lineStyle: {
              'color': chartSetting.colors[itemsIndex],
              'width': 5
            },
            smooth: true,
            data: lineData,
            type: 'line',
          };
          legendAll.push(items.name)
          seriesAll.push(item);
        });

        return {
          legend: legendAll,
          series: seriesAll,
          x: xData
        }
      },
    },
    mounted() {
      this.$nextTick(function () {
        this.loadChart()
      })
    }
  }
</script>
