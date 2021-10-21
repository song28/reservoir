<template>
  <!--工况-->
  <div ref="line" style="flex:1"></div>
</template>

<script>
  import echarts from 'echarts'
  import {shallowClone, hexToRGBA} from '@/utils'
  import {chartSetting} from './setting'

  sessionStorage.setItem('chartUnit', "")
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
        let cont = this.data;
        if(!cont){
          cont=[];
        }
       
        let signalStrength =cont;// cont.realData['信号强度']?cont.realData['信号强度']:null;
        let cellVoltage =cont;// cont.realData['电池电压']?cont.realData['电池电压']:null;
        let chargingVoltage =cont;// cont.realData['供电电压']?cont.realData['供电电压']:null;
        var contData = {
          '信号强度':[],
          '电池电压':[],
          '供电电压':[],
        };
       cont.forEach(item=>{
          contData['信号强度'].push({
            "日期":item['日期'],
            "value":item['信号强度'],
          });
          contData['电池电压'].push({
            "日期":item['日期'],
            "value":item['电池电压'],
          });
          contData['供电电压'].push({
            "日期":item['日期'],
            "value":item['供电电压'],
          });
       }) 
        
        let sign = 0;
        for(var key in contData){
          if(contData[key] != 0){
            legendArr.push(key);
            sign += 1;
            var seriesItem = shallowClone(chartSetting.line)
            seriesItem.name = key
            seriesItem.data = [];
            seriesItem.itemStyle.normal.color = chartSetting.colors[sign]
            seriesItem.itemStyle.emphasis.color = chartSetting.colors[sign]
            seriesItem.itemStyle.emphasis.borderColor = hexToRGBA(chartSetting.colors[sign], 0.2)
            if (key == '信号强度') {
              seriesItem.yAxisIndex = 1
            }
            contData[key].forEach((ele,index)=>{
              seriesItem.data.push(ele.value)
            });
            seriesArr.push(seriesItem)
          }
        }
        cont.forEach(item => {
          xData.push(item['日期'])
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
        if (this.config&& this.config.length) {
          params = this.config[0]
        }

        // let unit = 'aaaaa'
        let min = null
        let max = null
        if (params && params.config) {
          // unit = params.config.y.unit ? params.config.y.unit : ""
          min = params.config.y.min ? params.config.y.min : null
          max = params.config.y.max ? params.config.y.max : null
        }
        let item = Object.assign({
          name: "单位（V）",
          min: chartData.x.length ? min : 1,
          max: chartData.x.length ? max : 30
        }, chartSetting.yAxis)
        let items = Object.assign({
          name: "", //去掉单位db 单位（dB）
          position: 'right',
          nameLocation: 'end',
          min: chartData.x.length ? null : 1,
          max: chartData.x.length ? null : 30
        }, chartSetting.yAxis)
        yAxis.push(item)
        yAxis.push(items)
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
