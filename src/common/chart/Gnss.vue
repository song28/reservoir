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
    props: ['data', 'config','contData'],
    data() {
      return {
        chartData: []
      }
    },
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
          legend: Object.assign({data: chartData.legend,selected:{"3D":true,"Y轴":true, "H轴":true,"X轴":true,"2D":false}}, chartSetting.legend),
          xAxis: Object.assign({data: chartData.x}, chartSetting.xAxis),
          yAxis: this.formatterYaxis(chartData),
          series: chartData.series
        }
        line.setOption(option)
      },

      // 格式化图表数据
      formatterChartData() {

        let xOffset =0;// this.contData && this.contData.referXAxis ? this.contData.referXAxis :  0;
        let yOffset = 0;//this.contData && this.contData.referYAxis ? this.contData.referYAxis :  0;
        let zOffset = 0;//this.contData && this.contData.referZAxis ? this.contData.referZAxis :  0;

        let self = this;
        let xData = []
        let legendArr = [];
        let seriesArr = [];
        let addLegend = ['2D', '3D']
        this.config.forEach((item, index) => {
          legendArr.push(item.name + "轴")
          var seriesItem = shallowClone(chartSetting.line)
          seriesItem.name = item.name + "轴"
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
        let polarData = {
          X: [],
          Y: []
        }
       
        this.data.forEach((item,index) => {
            var needAdd= true;
          if(index>0 )
          {
             if( ( self.data[index-1].X!=0 || self.data[index-1].Y!=0 || self.data[index-1].Z!=0  ) 
              &&
               ( item.X==0 && item.Y==0 && item.Z==0))
              {
                needAdd=false;
              }
          }
          if(needAdd)
          {
            xData.push(item['日期'])
            polarData.X.push(item.X-xOffset)
            polarData.Y.push(item.Y-yOffset)
            let dd = self.getMathSqrt(item.X-xOffset, item.Y-yOffset)
            let ddd = self.getMathSqrt(item.X-xOffset, item.Y-yOffset, item.Z-zOffset)
            item['2'] = dd.toFixed(3)
            item['3'] = ddd.toFixed(3)
          
            seriesArr.forEach(series => {
              
              if(series.name.substring(0, 1)=='X'){
                series.data.push(item[series.name.substring(0, 1)]-xOffset)
              } else if(series.name.substring(0, 1)=='Y'){
                series.data.push(item[series.name.substring(0, 1)]-yOffset)
              }
              else if(series.name.substring(0, 1)=='Z'){
                series.data.push(item[series.name.substring(0, 1)]-zOffset)
              }else{
              series.data.push(item[series.name.substring(0, 1)])
              }
            })
         }
        });
        this.loadPolarChart(polarData)
        return {
          legend: legendArr,
          series: seriesArr,
          x: xData
        }
      },
      DeepCopy(object) {
          let resultObject = {};
          for (let obj in object) {
              if (typeof (object[obj]) == "object" && !Array.isArray(object[obj])) {
                  let x = {}
                  x[obj] = DeepCopy(object[obj])
                  Object.assign(resultObject, x);
              } else {
                  let x = {};
                  x[obj] = object[obj];
                  Object.assign(resultObject, x);
              }
          }
          return resultObject;
      } ,
      RectToPolar(  x,   y) {
     
        var B;// 极坐标夹角
      
        if (y >= 0) {
         if (x == 0) {
          B = Math.PI / 2;// 90°
         } else {
          B = Math.asin(x / y);
         }
        } else if (y < 0) {
         if (x == 0) {
          B = 3 * Math.PI / 2;// 270°
         } else {
          B = Math.asin(x / y);
         }
        }
        return B;
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
          // nameLocation: 'center',
          // nameGap: 30,
        
          axisLabel: {
             
            
           },
         
          min: chartData.x.length ? min : 1,
          max: chartData.x.length ? max : 30
        }, chartSetting.yAxis)
       
        yAxis.push(item)
        return yAxis
      },


      // 极坐标
      loadPolarChart(polarData) {
        let self = this;
        const polar = echarts.init(this.$refs.polar)
        let seriesData= [];
        // let seriesData = [[3166318922.2032657, 8.149654964831364],
        //                   [3266328921.043096, 8.249654970712425],
        //                   [3366338920.206983, 8.349654990460066],
        //                   [3466348920.021964, 8.94965500386076],
        //                   [3566358920.276006, 8.749655009773723],
        //                   [3566368919.7509403, 8.649655030437185],
        //                   [3566378920.515052, 8.049655025455996]]
        for (var i = 0; i <= polarData.X.length; i++) {
         
         var  r = Math.hypot(polarData.X[i], polarData.Y[i]);
          var theta = polarData.X[i] == 0 ? 0 : Math.atan(polarData.Y[i] / polarData.X[i])
          theta = theta * 180 / Math.PI
         
          seriesData.push([r, theta]);
        }

        const option = {
          polar: {},
          angleAxis: {
            type: 'value',
            min: 0,
            max: 360,
            interval: 30,
            startAngle:90,
            axisLine: {
              show: seriesData.length,
              lineStyle: {
                color: "#1493FF",
                width: 1,
                type: "solid"
              },
            },
            axisLabel: {
              interval: 0,
              show: seriesData.length,
              color: "#999999",
              margin: 8,
              fontSize: 12
            },
            axisTick: {
              show: seriesData.length,
              lineStyle: {
                color: '#E6E6E6'
              }
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            formatter: function (params) {
              return ''
            }
          },
          radiusAxis: {
            axisLine: {
              show: seriesData.length,
              lineStyle: {
                color: "#1493FF",
                width: 1,
                type: "solid"
              },
            },
            axisLabel: {
              show: seriesData.length,
              padding: [0, 0, 20, 0],
              color: "#999999",
              fontSize: 16
            },
          },
          series: [{
            coordinateSystem: 'polar',
            name: '极坐标',
            type: 'line',
            itemStyle: {
              color: '#1493FF',
              borderColor: '#1493FF',
            },
           
            data: seriesData,
            markPoint: {
              symbol:"pin",
               data: [
                   { name: '东',x:"100%",y:"50%",symbolSize:1,value:"东",label:{ fontSize:"14",  position: [-24, -10]}},
                   {  name: '西',x:"0%",y:"50%",symbolSize:1,value:"西",label:{ fontSize:"14",  position: [0, -10]}},
                   { name: '北',x:"50%",y:"0%",symbolSize:1,value:"北",label:{ fontSize:"14",  position: [-12, 80]}},
                   {  name: '南',x:"50%",y:"100%",symbolSize:1,value:"南",label:{ fontSize:"14",  position: [-12, -100]}}
               ],
                itemStyle: {
              fontSize: '10px',
            },
           },
          }]
        };
        polar.setOption(option)
      },

      //获取GNSS 2D累积变化 3D累积变化数据
      getMathSqrt(x, y, z) {
        if (z) {
          return Math.sqrt((x * x) + (y * y) + (z * z))
        } else {
          return Math.sqrt((x * x) + (y * y))
        }
      }
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
