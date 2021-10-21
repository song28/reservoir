<template>
  <div id="app">
    <div id="chartTest" style="width: 600px; height: 400px"></div>
  </div>
</template>
<script>
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";
import echarts from "echarts";
import {
  getAllPointLocationList,
  getReservoirPointByReservoirId,
  reservoirAllotPoint,
  getReservoirNotExistPointByReservoirId,
  removeAllotPointBatch,
} from "../api";
export default {
  components: { LeftTreeBar, damLeftTreeBar },
  data() {
    return {
      xAxisData: ["一", "二", "三"],
      //柱形数据数组
      seriesDataMain: [1700, 1200, 300],
      //这里辅助柱形数据数组,相同length的0
      seriesDataFz: [0, 0, 0],
      lineMax: [],
      lineMin: [],
      lineDataAll: [],
    };
  },
  mounted() {
    // this.getPointConfig();
  },
  methods: {
    chartTest() {
      let dom = document.getElementById("chartTest");
      let myChart = echarts.init(dom);
      let yAxisData = this.lineMax;
      let lineMin = this.lineMin;
      let lineDataAll = this.lineDataAll;
      this.chartAction(myChart, yAxisData, lineMin, lineDataAll);
    },
    chartAction(myChart, yAxisData, lineMin, lineDataAll) {
      let option = {
        tooltip: {
          triggerOn: "none",
          formatter: function (params) {
            return "X: " + params.name + "<br>Y最大: " + parseInt(params.data);
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.xAxisData,
        },
        yAxis: {
          type: "value",
          max: 3000,
          min: 0,
          splitLine: {
            lineStyle: {
              color: "#DBDBDB",
              type: "dashed",
            },
          },
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            id: "line1",
            type: "line",
            color: "#188df0",
            smooth: true,
            symbol: "emptyCircle",
            symbolSize: 10,
            data: yAxisData,
            lineStyle: {
              color: "transparent",
            },
          },
          {
            id: "line2",
            type: "line",
            color: "transparent",
            itemStyle: {
              opacity: 0,
            },
            smooth: true,
            symbol: "emptyCircle",
            symbolSize: 10,
            data: lineMin,
            lineStyle: {
              color: "transparent",
            },
          },
          {
            id: "barMain",
            name: "主要",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
              },
            },
            data: this.seriesDataMain,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            barWidth: 20,
          },
        ],
      };
      myChart.setOption(option);
      // 拖拽
      setTimeout(function () {
        myChart.setOption({
          graphic: echarts.util.map(lineDataAll, function (item, dataIndex) {
            let position = myChart.convertToPixel("grid", item);
            return {
              id: dataIndex,
              type: "circle",
              position: position,
              shape: {
                r: 5,
              },
              invisible: true,
              draggable: true,
              ondrag: echarts.util.curry(onPointDragging, dataIndex),
              onmousemove: echarts.util.curry(showTooltip, dataIndex),
              onmouseout: echarts.util.curry(hideTooltip, dataIndex),
              ondragend: echarts.util.curry(onPointDragEnd, dataIndex),
              z: 100,
            };
          }),
        });
      }, 0);
      window.addEventListener("resize", updatePosition);
      let that = this;
      function updatePosition() {
        myChart.setOption({
          graphic: echarts.util.map(lineDataAll, function (item, dataIndex) {
            return {
              position: myChart.convertToPixel("grid", item),
            };
          }),
        });
      }

      function showTooltip(dataIndex) {
        if (dataIndex < that.lineDataAll.length / 2) {
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: dataIndex,
          });
        } else {
          let index = dataIndex - that.lineDataAll.length / 2;
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index,
          });
        }
      }

      function hideTooltip(dataIndex) {
        myChart.dispatchAction({
          type: "hideTip",
        });
      }

      function onPointDragging(dataIndex, dx, dy) {
        if (dataIndex < lineDataAll.length / 2) {
          /*最高点值不能小于最低点的值*/
          if (
            myChart.convertFromPixel("grid", this.position)[1] -
              that.seriesDataFz[dataIndex] >=
            0
          ) {
            lineDataAll[dataIndex][1] = myChart.convertFromPixel(
              "grid",
              this.position
            )[1];
            yAxisData = [];
            for (let i = 0; i < lineDataAll.length / 2; i++) {
              yAxisData.push(lineDataAll[i][1]);
            }
            myChart.setOption({
              series: [
                {
                  id: "line1",
                  data: yAxisData,
                },
                {
                  id: "line2",
                  data: lineMin,
                },
              ],
            });
          }
        }
      }

      function onPointDragEnd(dataIndex, dx, dy) {
        myChart.setOption({
          graphic: echarts.util.map(lineDataAll, function (item, dataIndex) {
            return {
              id: dataIndex,
              position: myChart.convertToPixel("grid", [dataIndex, item]),
            };
          }),
        });
        that.seriesDataFz = lineMin;
        for (let i in yAxisData) {
          for (let j in that.seriesDataFz) {
            if (i == j) {
              that.seriesDataMain[i] =
                parseInt(yAxisData[i]) - parseInt(that.seriesDataFz[i]);
            }
          }
        }
        console.log(
          myChart,
          "myChart",
          yAxisData,
          "yAxisData",
          lineMin,
          "lineMin",
          lineDataAll,
          "lineDataAll"
        );
        that.chartAction(myChart, yAxisData, lineMin, lineDataAll);
      }

      myChart.on("click", function (params) {
        that.inputValue = params.value;
      });
    },
  },

  mounted() {
    for (let i in this.seriesDataFz) {
      this.lineMax.push(this.seriesDataFz[i] + this.seriesDataMain[i]);
    }
    console.log(this.lineMax);
    this.lineMin = this.seriesDataFz;
    // this.initChart();

    this.lineDataAll = [];
    for (let i in this.xAxisData) {
      for (let j in this.lineMax) {
        if (i == j) {
          this.lineDataAll[i] = [this.xAxisData[i], this.lineMax[j]];
        }
      }
    }
    for (let i in this.xAxisData) {
      for (let j in this.lineMin) {
        if (i == j) {
          let index = parseInt(i) + parseInt(this.xAxisData.length);
          this.lineDataAll[index] = [this.xAxisData[i], this.lineMin[j]];
        }
      }
    }
    console.log(this.lineDataAll);
    this.chartTest();
  },

  watch: {
    "backTreeData.nodeData": {
      handler: function (newV, oldV) {
        if (newV) {
          if (!newV.children) {
            // this.getPointConfig({ reservoirId: newV.addvcd });
            // this.getPointConfigured({ reservoirId: newV.addvcd });
            this.getPointConfig({ reservoirId: newV.rscd });
            this.getPointConfigured({ reservoirId: newV.rscd });
          }
        }
      },
      deep: true,
      immediate: true,
    },
    "backTreeData.checkData": {
      handler: function (newV, oldV) {},
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
