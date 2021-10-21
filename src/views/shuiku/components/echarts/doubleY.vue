<template>
  <div class="chart">
    <div class="rainC" v-for="(item, index) in KindsechartsName" :key="index">
      <div class="rainChart">
        <div
          :chartData="chartData"
          :id="'chart' + chartData.id + item.cusno + index"
          :class="'container' + index"
          autoresize
          :style="'height:' + height + ';width:' + width"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { postRain, postChark, postMove } from "../../monitor/api";

export default {
  props: ["chartData", "width", "height"],

  data() {
    return {
      tableDataShowV: {},
      KindsechartsName: [],
      chartinfo: [],
      count: 0,
      rain: [],
      crack: [],
      move: [],
      pastTime: "",
      currentTime: ""
    };
  },

  mounted() {
    //根据后台穿过来的值，查询接口获得数据
    // chartData
    let infoTest = {
      rain: {
        cusno: "0000003181",
        name: "雨量(YL01)",
        rain: 0,
        title: "龙凤场镇石婆山村1组唐家坡滑坡自动雨量计"
      }
    };
    this.rain = infoTest.rain;
    //泥水位和断线
    //
    let pam = {
      cusno: infoTest.rain.cusno,
      type: 1,
      date: this.queryTime(1),
      stm: this.pastTime,
      etm: this.currentTime,
      timeUnit: "hours",
      timeVal: 1,
      displayColumns: ["雨量"]
    };
    this.getdetailRain(pam, this.rain.title, this.rain.cusno);
  },
  methods: {
    queryTime(day) {
      //过去-今天
      let pastTime = this.$moment()
        .subtract(day, "days")
        .format("YYYY-MM-DD HH:mm:ss");
      let currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      this.pastTime = pastTime;
      this.currentTime = currentTime;
      return [pastTime, currentTime];
    },

    getdetailRain(pam, title, cusno) {
      var that = this;
      postRain(pam).then(res => {
        if (res.code) {
          if (res.data.length) {
            this.count = 0;
            this.count = this.count + 1;
            let chartID = this.count - 1;
            let rain = [10, 0, 0, 30, 10, 30, 6, 7]; //降雨量
            let sumrain = []; //累计雨量
            let time = []; //时间

            res.data.forEach((val, index, arr) => {
              //   rain.push(val["雨量"]);
              sumrain.push(val["sumrain"]);
              time.push(val["日期"].substring(5));
            });

            that.chartinfo.push({
              Ykind: "double", //Y轴双坐标
              idname: "chart" + that.chartData.id + cusno + chartID,
              type: ["bar", "line"],
              lineColor: ["#007CFA", "#0020F5"],
              lineLegend: ["时段降水量", "累计降雨量"], //图例
              Yname: ["时段降水量(mm)", "累计降雨量(mm)"], //Y轴纵坐标单位
              dataX: time,
              dataY0: rain,
              dataY1: sumrain
            });
            that.KindsechartsName.push({
              name: title,
              type: "rain",
              cusno: cusno
            });
            that.$nextTick(function() {
              that.draw(that.chartinfo[chartID]);
            });
          }
        } else {
          this.$message.error(msg);
        }
      });
    },
    draw(infoConfig) {
      let myChart = this.$echarts.init(
        document.getElementById(infoConfig.idname)
      );
      let this_ = this;
      let option = {};
      if (infoConfig.Ykind == "double") {
        option = {
          xAxis: [
            {
              type: "category",
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0.1,
                lineStyle: {
                  type: "solid",
                  color: "#E9ECEE" //网格颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#666666", //xy字体颜色
                  width: 0
                }
              },
              data: infoConfig.dataX
            }
          ],
          yAxis: [
            {
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0,
                lineStyle: {
                  type: "solid",
                  color: "#E9ECEE" //网格颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#666666", //y 0 刻度样式
                  width: 0
                }
              },
              type: "value",
              name: "降雨量(mm)",
              min: 0,
              max: 50,
              interval: 10
            },
            {
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0,
                lineStyle: {
                  type: "solid",
                  color: "#E9ECEE"
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#666666",
                  width: 0
                }
              },
              type: "value",
              name: "累计降雨量(mm)",
              min: 0,
              max: 500,
              interval: 100
            }
          ],
          series: [
            {
              name: infoConfig.lineLegend[0], //与图例必须保持一致
              type: infoConfig.type[0],
              barWidth: 3,
              color: infoConfig.lineColor[0],
              data: infoConfig.dataY0
            },
            {
              symbol: "circle", //不添加空心点,添加后为实心点，拐点样式
              name: infoConfig.lineLegend[1],
              type: infoConfig.type[1],
              yAxisIndex: 1, // //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              color: infoConfig.lineColor[1],
              data: infoConfig.dataY1
            }
          ]
        };
      }
      //共有样式
      option.tooltip = {};
      option.grid = {
        show: true,
       top: "22%",
        left: "3%", //图表距边框的距离
        right: "3%",
        bottom: "10%",
        containLabel: true,
        backgroundColor: "#F5F9FC"
      };

      option.legend = {
        data: infoConfig.lineLegend,
        orient: "horizontal",
        x: "center",
        y: "top",
        textStyle: {
          //图例文字的样式
          color: "#666666",
          fontSize: 10
        },
        itemWidth: 15,
        itemHeight: 10,
        selected: {
          XΔ: true,
          YΔ: true,
          HΔ: true,
          "2D": false,
          "3D": true,
          位移值: true,
          监测值: true,
          初始值: true
        }
      };
      myChart.setOption(option, true);
      myChart.resize();
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  .rainChart {
    position: relative;
    top: 0.1rem;
    width: 94%;
    margin: 0 auto;
    p {
      font-size: 0.12rem;
      text-align: left;
    }
    .container0,
    .container2,
    .container1 {
      width: 100%;
      height: 1.8rem;
    }
  }
}
</style>


      