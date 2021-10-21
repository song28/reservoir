<template>
  <div class="detail">
    <div class="tbd">
      <div
        v-for="(val, key, index) in tbListHeader"
        :key="index"
        class="tbDetail"
      >
        <span style="font-weight:bold;padding:10px;"> {{ val.label }}:</span>
        {{ detailData[val.prop] }}
      </div>
    </div>
    <div class="detailTipc">
      <el-row>
        <el-col :span="24" style="text-align:center">
          <p style="font-weight:bold;padding:10px;">
            查看水库库容曲线
          </p>
          <Echart :chartData="chartData" v-if="show"> </Echart>
          <!-- <div class="chartC">
            <div class="rainChart">
              <div
                id="chart"
                ref="chart"
                class="echarts"
                autosize
                :style="'height:' + height + ';width:' + width + 'px'"
              ></div>
            </div>
          </div> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-if="src != ''">
          <p style="font-weight:bold;padding:10px 10px 0px 10px;">
            查看水库巡查点位示意图(点我放大)
          </p>
          <el-image
            :z-index="Number(3333)"
            :src="src"
            style="width:80%;height:auto;"
            fit="fill"
            :preview-src-list="[src]"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { previewUrl } from "@/api/base.js";
import Echart from "../../components/echarts/index.vue";

import {
  tbskListHeader,
  tbskPersonListHeader,
  tbskStandards,
  skListBarTypeOptions,
  skListOpenTypeOptions,
  skListSizeTypeOptions
} from "../apiConfig";
import {
  getBaseInfoById,
  getReservoirImage,
  getCapacityCurveByReservoirCode
} from "../api";
export default {
  components: {
    Echart
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      chartData: {
        data: {},
        height: "300px",
        width: "8rem",
        type: "cap"
      },
      // height: "300px",
      // width: "400px",
      src: "",
      detailData: {},
      tbListHeader: {}
    };
  },
  mounted() {
    this.chartData.width = $(".el-dialog__body").width() + "px";
  },
  methods: {
    async getKR(gid) {
      let { msg, status, data } = await getCapacityCurveByReservoirCode({
        reservoirCode: gid
      });
      if (status) {
        let x = [];
        let y = [];
        data.forEach(e => {
          x.push(e.waterLevel);
          y.push(e.capacity);
        });
        this.chartData.data.x = x;
        this.chartData.data.y = y;
        this.$set(this.chartData.data, x, x);
        this.$set(this.chartData.data, y, y);
        this.show = true;

        console.log(data, "库容曲线的值", this.chartData);

        // console.log(x, "---", y);
        // let info = {
        //   icon: "dc-dblf",
        //   Ykind: "single", //Y轴单坐标
        //   idname: "chart",
        //   type: ["line", "line", "line"],
        //   lineColor: ["#499E83"],
        //   lineLegend: ["水位-库容"], //图例
        //   Yname: ["库容m³"], //Y轴纵坐标单位
        //   Xname: ["水位m"],
        //   dataX: x,
        //   dataY0: y
        // };
        // this.draw(info);
      }
    },
    draw(infoConfig) {
      //为了解决dom还未渲染完成，就开始执行代码而报的hook错误
      let getDIV = document.getElementById(infoConfig.idname);
      if (getDIV == null) {
        return;
      }
      let myChart = this.$echarts.init(
        document.getElementById(infoConfig.idname)
      );
      let this_ = this;
      let option = {};
      if (infoConfig.Ykind == "single") {
        option = {
          xAxis: {
            type: "category",
            name: infoConfig.Xname[0],
            data: infoConfig.dataX,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.2,
              lineStyle: {
                type: "dashed",
                color: "#dadbdc" //网格颜色
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
              width: 0.2,
              lineStyle: {
                type: "dashed",
                color: "#dadbdc" //网格颜色
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
              smooth: true,
              name: infoConfig.lineLegend[index], //与图例必须保持一致
              type: infoConfig.type[index],
              barWidth: 16,
              color: infoConfig.lineColor[index],
              data: infoConfig["dataY" + index],
              symbol: "circle" //不添加空心点,添加后为实心点，拐点样式
            });
          });
        }
      }

      //共有样式
      option.tooltip = {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        }
      };
      option.grid = {
        show: true,
        top: "10%",
        left: "3%", //图表距边框的距离
        right: "10%",
        bottom: "10%",
        containLabel: true,
        backgroundColor: "#F5F9FC"
      };
      option.toolbox = {
        show: true, //是否显示工具栏组件
        orient: "horizontal", //工具栏 icon 的布局朝向'horizontal' 'vertical'
        itemSize: 15, //工具栏 icon 的大小
        itemGap: 10, //工具栏 icon 每项之间的间隔
        showTitle: true, //是否在鼠标 hover 的时候显示每个工具 icon 的标题
        feature: {
          mark: {
            // '辅助线开关'
            show: true
          },
          dataView: {
            show: true,
            title: "数据视图",
            // lang: ['数据视图', '关闭', '导出Excel'],
            readOnly: true,
            iconStyle: {
              borderColor: "#333",
              borderWidth: 1,
              borderType: "solid"
            },
            emphasis: {
              iconStyle: {
                borderColor: "#1493FF"
              }
            },
            width: "80%",
            buttonColor: "#1493FF",
            buttonRight: "20",
            optionToContent: function(opt) {
              var axisData = opt.xAxis[0].data;
              var series = opt.series;
              var tdHeads = '<td  style="padding:0 10px">时间</td>';
              series.forEach(function(item) {
                tdHeads += '<td style="padding: 0 10px">' + item.name + "</td>";
              });
              var table =
                '<table border="1" style="width:calc(100% - 160px);margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>' +
                tdHeads +
                "</tr>";
              var tdBodys = "";
              for (var i = 0, l = axisData.length; i < l; i++) {
                for (var j = 0; j < series.length; j++) {
                  if (typeof series[j].data[i] == "object") {
                    tdBodys += "<td>" + series[j].data[i].value + "</td>";
                  } else {
                    tdBodys += "<td>" + series[j].data[i] + "</td>";
                  }
                }
                table +=
                  '<tr><td style="padding: 0 10px">' +
                  axisData[i] +
                  "</td>" +
                  tdBodys +
                  "</tr>";
                tdBodys = "";
              }
              table += "</tbody></table>";
              return table;
            }
          },
          mark: { show: true },
          restore: { show: true },
          magicType: { type: ["line", "bar", "pie"] },
          saveAsImage: { show: true },
          magicType: {
            //动态类型切换
            show: true,
            title: "切换", //各个类型的标题文本，可以分别配置。
            type: ["line", "bar"] //启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）
          },
          restore: {
            //配置项还原。
            show: true, //是否显示该工具。
            title: "还原"
          },
          saveAsImage: {
            //保存为图片。
            show: true, //是否显示该工具。
            type: "png", //保存的图片格式。支持 'png' 和 'jpeg'。
            name: "pic1", //保存的文件名称，默认使用 title.text 作为名称
            backgroundColor: "#ffffff", //保存的图片背景色，默认使用 backgroundColor，如果backgroundColor不存在的话会取白色
            title: "保存为图片",
            pixelRatio: 1 //保存图片的分辨率比例，默认跟容器相同大小，如果需要保存更高分辨率的，可以设置为大于 1 的值，例如 2
          }
        },
        zlevel: 0, //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
        z: 2, //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        left: "center", //组件离容器左侧的距离,'left', 'center', 'right','20%'
        top: "0", //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
        right: "auto", //组件离容器右侧的距离,'20%'
        bottom: "auto", //组件离容器下侧的距离,'20%'
        width: "auto", //图例宽度
        height: "auto"
      };
      option.legend = {
        data: infoConfig.lineLegend,
        orient: "horizontal",
        bottom: "0px",
        textStyle: {
          //图例文字的样式
          color: "#666666",
          fontSize: 14
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
      this.myChart = myChart;
    },

    //获得表头与对应数据
    async getDetail(gid) {
      await this.getImage(gid);
      this.tbListHeader = tbskListHeader;
      let { msg, status, data } = await getBaseInfoById({
        gid: gid
      });
      if (status) {
        skListBarTypeOptions.forEach(a => {
          if (Number(data.matrl) == a.value) {
            data.matrl = a.label;
          }
        });
        skListOpenTypeOptions.forEach(a => {
          if (Number(data.nsType) == a.value) {
            data.nsType = a.label;
          }
        });
        skListSizeTypeOptions.forEach(a => {
          if (Number(data.tegr) == a.value) {
            data.tegr = a.label;
          }
        });
        this.detailData = data;
      }
    },
    async getImage(pam) {
      let { msg, status, data } = await getReservoirImage({
        reservoirId: pam
      });
      if (status) {
        console.log(data);
        if (data != null) {
          if (data.imageurl != null) {
            this.src = previewUrl + data.imageurl;
          }
        }
        console.log("src===", this.src);
      }
    }
  },
  watch: {
    data: {
      handler: function(newV, oldV) {
        console.log("000000dafddf--000");
        this.getDetail(newV.data.gid);
        this.getKR(newV.data.gid);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped lang='scss'>
.detail {
  margin: 20px 0px;
  // min-height: 300px;
  .tbd {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .tbDetail {
      margin: 5x 0px;
      width: 25%;
    }
  }
  >>> .el-icon-picture-outline:before {
    font-size: 80px;
    content: "\E75E";
  }
  .detailTipc {
    width: 100%;
    text-align: center;
  }
}
</style>