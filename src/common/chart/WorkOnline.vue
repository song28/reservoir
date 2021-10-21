<template>
  <!--工况在线统计-->
  <div ref="line" style="flex: 1; height: 100%; margin: 0; padding: 0"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["data"],
  methods: {
    loadChart() {
      // alert(1)
      let myChart = echarts.init(this.$refs.line);
      var option = {
        legend: {
          //data: ['在线率'],
          show: true,
          // top:30,
        },
        grid: {
          show: true,
          top: "30",
          left: "3%", //图表距边框的距离
          right: "3%",
          bottom: "10%",
          containLabel: true,
          backgroundColor: "#F5F9FC",
        },
        xAxis: {
          type: "category",
          data: this.data.timeList ? this.data.timeList : [], //['8/15', '8/17', '8/19', '8/21', '8/23', '8/25', '8/27'],
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            width: 0.5,
            lineStyle: {
              type: "solid",
              color: "#E9ECEE",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#666666",
              width: 0.5,
            },
          },
        },
        yAxis: {
          type: "value",
          name: "在线率",
          min: 0,
          max: 100,
          axisLabel: {
            formatter: "{value} %",
          },
          nameTextStyle: {
            align: "right",
            verticalAlign: "middle",
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            width: 0.5,
            lineStyle: {
              type: "solid",
              color: "#E9ECEE",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#666666",
              width: 0,
            },
          },
        },
        series: [
          {
            name: "在线率",
            symbol: "circle", //不添加空心点,添加后为实心点，拐点样式
            //symbol:'emptyCircle', //设定为实心点
            // symbolSize: 20,   //设定实心点的大小
            data: this.data.rateData ? this.data.rateData : [], //[91, 92, 93, 95, 99, 91, 89],
            type: "line",
            itemStyle: {
              //圆圈样式
              // borderWidth: 1,
              color: "#1CD030",
            },

            lineStyle: {
              //线条样式
              // width:1,
              color: "#1CD030",
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.loadChart();
    });
  },
  watch: {
    data(val) {
      
      if (val) {
        this.$nextTick(function () {
          this.loadChart();
        });
        console.log("val", val);
      }else{
        this.$nextTick(function () {
          this.loadChart();
        });
      }
    },
  },
};
</script>
