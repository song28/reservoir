<template>

  <div v-if="chartData.type" class="rainChart">
    <div
      :id="chartId"
      ref="chart"
      autosize
      :style="'height:' + chartData.height + ';width:' + chartData.width"
    />
  </div>
</template>
<script>
import {generateUUID} from '@/utils'

export default {
  components: {},
  props: ['chartData'],
  data() {
    return {
      chartId: 'chart' + generateUUID(),
      myChart: {}
    }
  },
  watch: {
    'chartData.data': {
      handler: function(newV, oldV) {
        console.log(111)
        console.log(this.chartData, 'chart=============')
        const arr = []
        const arrLen = []
        this.chartData.legends[0].leftY.forEach((e) => {
          arr.push('line')
          arrLen.push(e)
        })
        this.chartData.legends[0].rightY.forEach((e) => {
          arr.push('line')
          arrLen.push(e)
        })
        this.chartId = 'chart' + generateUUID()
        // if (this.chartData.type == "cap") {  legends
        const info = {
          icon: 'dc-dblf',
          Ykind: 'double', // Y轴单坐标
          idname: this.chartId,
          type: arr,
          lineColor: ['#14AFCB', '#FF10E7', '#14AFCB', '#FF10E7', '#14AFCB', '#FF10E7'],
          lineLegend: arrLen, // 图例
          Yname: ['m'], // Y轴纵坐标单位
          Xname: ['万m'],
          dataX: this.chartData.data.x[0]
        }
        this.$nextTick(() => {
          this.draw(info)
        })
        // }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.chartData1 = {
    //   data: {
    //     x: [1, 2, 3, 4, 5],
    //     y: [1, 2, 3, 4, 5],
    //     y1: [1, 2, 3, 4, 5, 6]
    //   },
    //   width: '100%',
    //   height: '7rem'
    // }
    // const info = {
    //   icon: 'dc-dblf',
    //   Ykind: 'single', // Y轴单坐标
    //   idname: this.chartId,
    //   type: ['line', 'line'],
    //   lineColor: ['#499E83', '#499E83'],
    //   lineLegend: ['水位', '蓄水位'], // 图例
    //   Yname: ['m'], // Y轴纵坐标单位
    //   Xname: ['万m'],
    //   dataX: this.chartData1.data.x,
    //   dataY0: this.chartData1.data.y,
    //   dataY1: this.chartData1.data.y1
    // }
    // this.$nextTick(() => {
    //   this.draw(info)
    // })
  },
  methods: {
    draw(infoConfig) {
      debugger
      // 为了解决dom还未渲染完成，就开始执行代码而报的hook错误
      const getDIV = document.getElementById(infoConfig.idname)
      if (getDIV == null) {
        return
      }
      const myChart = this.$echarts.init(
        document.getElementById(infoConfig.idname)
      )
      let option = {}
      const yAxis = []
      const series = []
      yAxis.push({
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          width: 0.2,
          lineStyle: {
            type: 'dashed',
            color: '#dadbdc' // 网格颜色
          }
        },
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#666666', // y 0 刻度样式
            width: 0
          }
        },
        type: 'value',
        name: '水位(m)',
        // nameLocation:'10px',
        nameTextStyle: {
          padding: [0, 0, 0, 0]
        },
        min: 0,
        minInterval: 1
      }, {
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          width: 0,
          lineStyle: {
            type: 'dashed',
            color: '#dadbdc'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#666666',
            width: 0
          }
        },
        type: 'value',
        name: '雨量(mm)',
        min: 0,
        minInterval: 1
      })

      this.chartData.data.y.rightY.forEach((e, i, a) => {
        const color = ['#16AFCB', '#0d5aa9', '#C4433E', '#2F4455', '#60A1A7']
        series.push({
          name: this.chartData.legends[0].rightY[i], // 与图例必须保持一致
          type: 'line',
          barMaxWidth: 50,
          color: color[i],
          data: e,
          connectNulls: true})
      })
      this.chartData.data.y.leftY.forEach((e, i, a) => {
        const color = ['#1000CB', '#FF11E7', '#C0233E', '#3F4455', '#90A1A7']
        series.push({
          name: this.chartData.legends[0].leftY[i], // 与图例必须保持一致
          type: 'bar',
          yAxisIndex: 1,
          barMaxWidth: 50,
          color: color[i],
          data: e,
          connectNulls: true})
      })
      option = {
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 'auto'
            },
            splitLine: {
              show: true,
              width: 0.2,
              lineStyle: {
                type: 'dashed',
                color: '#dadbdc' // 网格颜色
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
        yAxis: yAxis,
        series: series
      }

      // 共有样式
      option.tooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      }
      option.grid = {
        show: true,
        top: '12%',
        left: '2%', // 图表距边框的距离
        right: '4%',
        bottom: '6%',
        containLabel: true,
        backgroundColor: '#F4FBF5'
      }
      option.toolbox = {
      }
      option.legend = {
        data: infoConfig.lineLegend,
        orient: 'horizontal',
        x: 'center',
        y: ' top',
        textStyle: {
          // 图例文字的样式
          color: '#666666',
          fontSize: 14
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
      this.myChart = myChart
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>

  .rainChart {
    position: relative;
    width: 100%;
    height: 100%;
    p {
      font-size: 0.12rem;
      text-align: left;
    }
  }

</style>

