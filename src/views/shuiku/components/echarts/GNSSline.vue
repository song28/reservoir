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
  components: {

  },
  data() {
    return {
      tableDataShowV: {},
      KindsechartsName: [],
      chartinfo: [],
      count: 0,
      move: [],
      pastTime: "",
      currentTime: ""
    };
  },

  mounted() {
    //根据后台穿过来的值，查询接口获得数据
    // chartData
    let infoTest = {

      move: [
        {
          GNSS: 30.0068,
          cusno: "3248103",
          title: "龙凤场镇石婆山村1组唐家坡滑坡GNSS自动化监测02"
        }
      ]
    };

    this.move = infoTest.move;
    //泥水位和断线
  

    if (this.move.length > 0) {
      this.move.forEach(val => {
        let pam = {
          cusno: val.cusno,
          type: 1,
          date: this.queryTime(1),
          stm: this.pastTime,
          etm: this.currentTime,
          timeUnit: "hours",
          timeVal: 1,
          displayColumns: ["X", "Y", "Z"]
        };
        this.getdetailGNSS(pam, val.title, val.cusno);
      });
    }
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

  
    getdetailGNSS(pam, title, cusno) {
      var that = this;
      postMove(pam)
        .then(res => {
          if (res.code) {
            if (res.data.length) {
              this.count = this.count + 1;
              let chartID = this.count - 1;
              let X = [];
              let Y = [];
              let Z = [];
              let twod = [];
              let threed = [];
              let time = []; //时间
              res.data.forEach((val, index, arr) => {
                let xx =
                  (Math.floor(val["X"] * 100) - Math.floor(arr[0].X * 100)) /
                  100;
                let yy =
                  (Math.floor(val["Y"] * 100) - Math.floor(arr[0].Y * 100)) /
                  100;
                let zz =
                  (Math.floor(val["Z"] * 100) - Math.floor(arr[0].Z * 100)) /
                  100;
                let twoDD =
                  (Math.floor(val["2D"] * 100) -
                    Math.floor(arr[0]["2D"] * 100)) /
                  100;
                let threeDD =
                  (Math.floor(val["3D"] * 100) -
                    Math.floor(arr[0]["3D"] * 100)) /
                  100;
                // let xx = val["X"] - arr[0].X;
                // let yy = val["Y"] - arr[0].Y;
                // let zz = val["Z"] - arr[0].Z;
                // let twoDD = val["2D"] - arr[0]["2D"];
                // let threeDD = val["3D"] - arr[0]["3D"];

                // console.log(arr[0]['2D'],'----')
                // console.log(val["X"],'+++++')
                X.push(xx);
                Y.push(yy);
                Z.push(zz);
                twod.push(twoDD);
                threed.push(threeDD);
                time.push(val["日期"].substring(5));
              });
              this.chartinfo.push(
                //GNSS图表参数配置
                {
                  Ykind: "single", //Y轴单坐标
                  idname: "chart" + that.chartData.id + cusno + chartID,
                  type: ["line", "line", "line", "line", "line"],
                  lineColor: [
                    "#57f49b",
                    "#f5a161",
                    "#867ee0",
                    "#5775f4",
                    "#ff4c85"
                  ],
                  lineLegend: ["XΔ", "YΔ", "HΔ", "2D", "3D"], //图例
                  Yname: ["单位(mm)"], //Y轴纵坐标单位
                  dataX: time,
                  dataY0: X,
                  dataY1: Y,
                  dataY2: Z,
                  dataY3: twod,
                  dataY4: threed
                }
              );
              let start = that.queryTime(1)["0"];
              let end = that.queryTime(1)["1"];

              this.KindsechartsName.push({
                name: title,
                type: "GNSS",
                cusno: cusno
              });
              that.$nextTick(function() {
                that.draw(this.chartinfo[chartID]);
              });
              // console.log(this.KindsechartsName, "图表的div循环个数333");
              // console.log(this.dateV, "日期-333");
              // console.log(this.tableDataShowV, "表格-333");
              // console.log(this.chartinfo, "图表参数配置333");
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


      