<template>
  <div class="chartL">
    <div class="rainC" v-for="(item, index) in KindsechartsName" :key="index">
      <div class="rainChart">
        <div
          :id="nameChart"
          :class="'container' + index"
          autoresize
          :style="'height:' + height + ';width:' + width"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["chartData", "width", "height",'echartsData'],
  components: {},
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
      currentTime: "",
      nameChart:'',
    };
  },

  mounted() {
    this.nameChart='echarts' + Math.random()*100000;
    this.getdetailRain();
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

    getdetailRain() {
      let that = this;
      this.chartinfo.push(
        //位移图表配置
        {
          Ykind: "single", //Y轴单坐标
          idname: this.nameChart,
          type: ["line"],
          lineColor: ["#0020F5"],
          lineLegend: ["泥水位"], //图例
          Yname: ["水位(mm)"], //Y轴纵坐标单位
          dataX: [
            "2020-06-06",
            "2020-06-07",
            "2020-06-08",
            "2020-06-09",
            "2020-07-05",
            "2020-07-06",
            "2020-07-09",
            "2020-08-05",
            "2020-08-06",
            "2020-08-09"
          ],
          dataY0: [3, 10, 10, 10, 5, 6, 7, 8, 5, 5]
        }
      );
      that.KindsechartsName.push({
        type: "rain",
        cusno: "5555555555"
      });
      that.$nextTick(function() {
        that.draw(that.chartinfo[0]);
      });
    },
    draw(infoConfig) {
      let myChart = this.$echarts.init(
        document.getElementById(infoConfig.idname)
      );
      let this_ = this;
      let option = {};
      if (infoConfig.Ykind == "single") {
        option = {
          xAxis: {
            type: "category",
            data: infoConfig.dataX,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: "dotted",
                color: "#E9ECEE"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#666666",
                width: 0.5
              }
            }
          },
          yAxis: {
            type: "value",
            name: infoConfig.Yname[0],
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.5,
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
            }
          }
        };
        option.series = [];
        if (infoConfig.type.length > 0) {
          infoConfig.type.forEach((val, index, arr) => {
            option.series.push({
              name: infoConfig.lineLegend[index], //与图例必须保持一致
              type: infoConfig.type[index],
              barWidth: 16,
              color: infoConfig.lineColor[index],
              data: infoConfig["dataY" + index],

              symbol: "circle" //不添加空心点,添加后为实心点，拐点样式
            });
          });
        }
        // option.series = [
        //   {
        //     name: infoConfig.lineLegend[0], //与图例必须保持一致
        //     type: infoConfig.type[0],
        //     barWidth: 16,
        //     color: infoConfig.lineColor[0],
        //     data: infoConfig.dataY0
        //   },
        //   {
        //     name: infoConfig.lineLegend[1],
        //     type: infoConfig.type[1],
        //     // yAxisIndex: 1, // //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
        //     color: infoConfig.lineColor[1],
        //     data: infoConfig.dataY1
        //   },
        //   {
        //     name: infoConfig.lineLegend[2],
        //     type: infoConfig.type[2],
        //     color: infoConfig.lineColor[2],
        //     data: infoConfig.dataY2
        //   }
        // ];
      }

      //共有样式
      option.tooltip = {
        // trigger: "axis",
        // axisPointer: {
        //   type: "cross",
        //   crossStyle: {
        //     color: "#999"
        //   }
        // }
      };
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
.chartL {
  // background: red;
  width: 100%;
  height: 100%;
  .rainChart {
    position: relative;
    // top: 0.1rem;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    p {
      font-size: 0.12rem;
      text-align: left;
    }
    .container0,
    .container2,
    .container1 {
      width: 100%;
      // height: 1.8rem;
    }
  }
}
</style>


      