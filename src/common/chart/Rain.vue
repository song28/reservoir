<template>
  <!--雨量-->
  <div class="rain-chart" ref="line"></div>
</template>

<script>
  import echarts from 'echarts'
  import {hexToRGBA} from '@/utils'
  import {chartSetting} from './setting'
 
 
  // sessionStorage.setItem('chartUnit', 'mm,mm')
  export default {
    props: ['data', 'config', 'radio'],
    data () {
      return {
        W: ""
      }
    },
    methods: {
      loadChart() {
        let line = echarts.init(this.$refs.line)
        let chartData = this.formatterChartData()
        let grid = chartSetting.grid
        grid.top = '15%'
       
        const option = {
          color: chartSetting.colors,
          noDataLoadingOption: chartSetting.noDataLoadingOption,
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              let str = params[0].name + '<br/>'
              params.forEach((item, index) => {
              
                str += item.seriesName + '：' + Number(item.value).toFixed(1)  + '<br/>'
              })
              return str
            }
          },
          toolbox: chartSetting.toolbox,
          grid: grid,
          dataZoom: chartSetting.dataZoom,
          legend: Object.assign({data: chartData.legend}, chartSetting.legend),
          xAxis: Object.assign({data: chartData.x}, chartSetting.xAxis),
          yAxis: this.formatterYaxis(chartData),
          series: chartData.series
        }
        console.log(JSON.stringify(option));
        line.setOption(option)
        this.W.onresize =  () => {
          echarts.init(this.$refs.line).resize()
        }
      },
      calculate(data){
        
        var sum = 0,contArr = [];
        data[0].data.forEach(e=>{
          sum+=e;
          contArr.push(sum);
        });
        data[1].data = contArr;
        return data;
      },
      // 格式化图表数据
      formatterChartData() {
       
        let legendArr = ['雨量', '累计雨量']
        // if (this.radio == 1) {
        //   legendArr = ['日雨量']
        // } else
        
        {
          this.config.forEach(item => {
            if (item.name != '日雨量') {
              if (item.name.indexOf("累计") != -1) {
                legendArr[1] = item.name
              } else {
                legendArr[0] = item.name
              }
            }
          })
        }
       var a = [];
       var b = [];
       var c = [];
       let xData = []
       var maxYAxis1 =0 ; //Y轴第1个坐标轴的最大值
       var maxYAxis2 = 0 ;// Y轴第2个坐标轴的最大值
       var sumRain = 0 ;
        this.data.forEach(item => {
          xData.push(item['日期'])
          //seriesArr.forEach(series => {
            var valRain = null;
            if(item["雨量"] == undefined){
              valRain = item["日雨量"];
             
            }else{
              valRain = item["雨量"]
             
            }
            a.push(valRain)
            if( valRain>maxYAxis1){
              maxYAxis1 = valRain;
            }
            

           
            if(item["sumrain"])
            {
              sumRain = item["sumrain"];
              
            }else if(valRain){
              sumRain+=valRain;
            }
            b.push(sumRain)
            if(sumRain>maxYAxis2)
            {
              maxYAxis2 = sumRain;
            }
            //新接口对应字段
          // xData.push(item['event_time'])
          // //seriesArr.forEach(series => {
          //     a.push(item["event_val"])
          //   b.push(item["sum"])
            // c.push(item["日雨量"])
          //})
        })
    let seriesArr = [
              {
                name: legendArr[0],
                type: 'bar',
               
                barMaxWidth: '20px',
                 data: a,
                itemStyle: {
                  normal: {
                  
                    color: chartSetting.colors[1]  //设置雨量柱状图颜色
                    // color:'#f00'
                    //  color:'#1860e3'
                  }
                }
              }
            ]
            
      if (legendArr.length > 1) {
          let seriesItem = Object.assign({name: legendArr[1], yAxisIndex: 1, data: b}, chartSetting.line);
          seriesArr.push(seriesItem)
       }

        return {
        maxYAxis2:maxYAxis2,
        maxYAxis1:maxYAxis1,
          "legend": legendArr,
          "x": xData,
          "series": seriesArr,
        }
      },
      // 格式化Y轴刻度
      formatYAxisStep(maxData){
          //☑人工设定的刻度区间
          // 5|10|20|50|100|200
          // 0.5|1|2|5|10|20
          if(maxData<=5){
            return {
              max:5,
              interval:0.5
            }
          }else if(maxData>5&& maxData<=10)
          {
             return {
              max:10,
              interval:1
            }
          }
          else if(maxData>10&& maxData<=20)
          {
             return {
              max:20,
              interval:2
            }
          }
           else if(maxData>20&& maxData<=50)
          {
             return {
              max:50,
              interval:5
            }
          }
            else if(maxData>50&& maxData<=100)
          {
             return {
              max:100,
              interval:10
            }
          }else{
            return {
              max: Math.ceil(maxData/100)*100,
              interval:20
            }
          }

      }
      ,
      
      // 格式化Y轴数据
      formatterYaxis(chartData) {
        let yAxis = []
        let self = this
        let YMAX = 0;
        // this.data.forEach(e=>{
        //   YMAX+=e['雨量'];
        // });
       // console.log("wwwww")
       // console.log(self.config)
       
        chartData.legend.forEach((items,itemIndex) => {
          let params = self.config.find(i => {
            return i.name == items
          })
          let unit = 'mm'
          let min = null
          let max = null
          if (params && params.config) {
            // unit = params.config.y.unit ? params.config.y.unit : "mm"
            min = params.config.y.min ? params.config.y.min : null
            max = params.config.y.max ? params.config.y.max : null
          }else{
            // unit = "mm";
            min =null ;
            max = null;
          }
          let yName = items + '(' + unit + ')'
          if (chartData.legend.length == 1) {
            yName = '单位（mm）'
          }
          //让刻度跟着数据走
          var intervalData = itemIndex ==0 ? self.formatYAxisStep(chartData.maxYAxis1) : self.formatYAxisStep(chartData.maxYAxis2);
          let item = Object.assign({
            name: yName,
            interval:intervalData.interval,
            min:  0 ,//chartData.x.length ? min : 1,
            max: intervalData.max //chartData.x.length ? max : 30

          }, chartSetting.yAxis)
          yAxis.push(item)
        })
        return yAxis
      },
    },
    mounted() {
      this.$nextTick(function () {
       // console.log("图表",window)
        // console.log(this.config)
        // console.log(this.radio)
        this.W = window
        this.loadChart();
        
      
      })
    }
  }
</script>

<style>

</style>
