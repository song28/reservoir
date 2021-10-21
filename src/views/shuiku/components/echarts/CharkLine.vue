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
  components: {},
  data() {
    return {
      tableDataShowV: {},
      KindsechartsName: [],
      chartinfo: [],
      count: 0,
      crack: []
    };
  },

  mounted() {
    //根据后台穿过来的值，查询接口获得数据
    // chartData
    let infoTest = {
      crack: [
        {
          LX: 0,
          cusno: "2300001025",
          title: "龙凤场镇石婆山村1组唐家坡滑坡拉线位移计01"
        }
      ]
    };
    this.crack = infoTest.crack;
    //泥水位和断线

    this.crack.forEach(val => {
      let pam = {
        cusno: val.cusno,
        type: 1,
        date: this.queryTime(1),
        stm: this.pastTime,
        etm: this.currentTime,
        timeUnit: "hours",
        timeVal: 1,
        displayColumns: ["位移值"]
      };
      this.getdetailLF(pam, val.title, val.cusno);
    });
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

    getdetailLF(pam, title, cusno) {
      var that = this;
      postChark(pam)
        .then(res => {
          if (res.code) {
            if (res.data.length) {
              this.count = this.count + 1;
              let chartID = this.count - 1;

              let one = []; //初始值
              let two = []; //位移值
              let three = []; // 监测值
              let time = []; //时间
              res.data.forEach((val, index, arr) => {
                one.push(val["初始值"]);
                two.push(val["位移值"]);
                three.push(val["监测值"]);
                time.push(val["日期"].substring(5));
              });
              this.chartinfo.push(
                //位移图表配置
                {
                  Ykind: "single", //Y轴单坐标
                  idname: "chart" + that.chartData.id + cusno + chartID,
                  type: ["line", "line", "line"],
                  lineColor: ["#97d0a4", "#31a0ff", "#3473e6"],
                  lineLegend: ["位移值", "监测值", "初始值"], //图例
                  Yname: ["单位(mm)"], //Y轴纵坐标单位
                  dataX: time,
                  dataY0: two,
                  dataY1: three,
                  dataY2: one
                }
              );

              let start = that.queryTime(1)["0"];
              let end = that.queryTime(1)["1"];
              this.KindsechartsName.push({
                name: title,
                type: "LF",
                cusno: cusno
              });
              that.$nextTick(function() {
                that.draw(this.chartinfo[chartID]);
              });
            }
          } else {
            this.$message.error(msg);
          }
        })
        .catch(function(error) {
          that.$message.error("网络错误");
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
                type: "solid",
                color: "rgba(255,255,255,0.2)"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#666666",
                width: 0
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
                color: "#EEEEEE"
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


      