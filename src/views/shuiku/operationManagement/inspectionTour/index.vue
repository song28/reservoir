<template>
  <div class="inspectionTour">
    <!-- 巡视检查 -->
    <el-container class="con">
      <el-aside>
        <damLeftTreeBar ref="tree" :data="data" @backData="backData"></damLeftTreeBar>
        <!-- <LeftTreeBar :data="data" @backData="backData"></LeftTreeBar> -->
      </el-aside>
      <el-container class="right">
        <el-main>
          <div class="con">
            <div class="tb1">
              <el-header>
                <el-row>
                  <el-col :span="2">
                    <el-button
                      size="mini"
                      class="btn-table-border blue"
                      style="cursor: pointer"
                      type="primary"
                      @click.stop="handlerTime(7 * 24)"
                      >近一周</el-button
                    >
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      size="mini"
                      class="btn-table-border blue"
                      style="cursor: pointer"
                      type="primary"
                      @click.stop="handlerTime(30 * 24)"
                      >近一月</el-button
                    >
                  </el-col>
                  <el-col :span="2" style="width: 80px">
                    <p style="line-height: 30px; text-align: right">
                      巡查时间&nbsp;&nbsp;
                    </p>
                  </el-col>
                  <el-col :span="10">
                    <el-date-picker
                      size="mini"
                      v-model="patrolTime"
                      type="daterange"
                      :clearable="false"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-search"
                      @click="getPatrollist"
                      >查询</el-button
                    >
                  </el-col>
                  <el-col :span="4">
                    <Btns :data="dataBtn" @clickBtn="backClickBtnType"></Btns>
                  </el-col>
                </el-row>
              </el-header>
              <el-table
                stripe
                :data="tableData"
                v-loading="tableLoading"
                border
                style="width: 100%"
                highlight-current-row
                @selection-change="handleSelectionChange"
                @cell-click="handleCellClick"
                @row-click="handleRowClick"
                :height="tableHeight"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column
                  label="序号"
                  type="index"
                  :index="table_index"
                  width="50"
                  align="center"
                  sortable
                ></el-table-column>
                <el-table-column
                  v-for="(item, index) in tableHeader"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  align="center"
                  :width="item.width"
                  sortable
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column label="操作" width="270" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button size="mini"
                               class="btn-table-border blue"
                               style="cursor: pointer"
                               type="primary"
                               @click.stop="handleRow(scope.row, 'update')">预览简报</el-button> -->

                    <el-button
                      class="btn-table-border blue"
                      v-if="scope.row.patrolWordPath"
                      style="cursor: pointer"
                      type="primary"
                      @click.stop="handlerPatrolWordPath(scope.row, 'update')"
                      size="mini"
                      >预览</el-button
                    >
                    <!-- :href="scope.row.patrolWordPath" -->
                    <a
                      download="scope.row.patrolWordPath"
                      target="_blank"
                      v-if="scope.row.patrolWordPath"
                      rel="nofollow"
                    >
                      <el-button
                        class="btn-table-border blue"
                        style="cursor: pointer"
                        type="primary"
                        size="mini"
                        >下载</el-button
                      >
                    </a>

                    <!-- <el-button size="mini"
                               class="btn-table-border blue"
                               style="cursor: pointer"
                               type="primary"
                               @click.stop="handleRow(scope.row, 'delete')">删除</el-button> -->
                    <el-button
                      size="mini"
                      class="btn-table-border blue"
                      style="cursor: pointer"
                      type="primary"
                      @click.stop="handleRow(scope.row, 'detail')"
                      >详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[query.size, 100, 200, 300, 400]"
                :page-size="query.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
            <div class="tb2">
              <el-row>
                <el-col :span="12">
                  <p style="margin-left: 15px; font-size: 16px; font-weight: bold">
                    巡查数据统计
                  </p>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <p>
                    <img
                      style="height: 18px; vertical-align: middle"
                      src="@/assets/images/tips.png"
                      alt=""
                    />
                    <span style="vertical-align: middle"> 查看巡查标准 </span>
                  </p>
                </el-col>
              </el-row>
              <p
                style="
                  margin-left: 25px;
                  margin-top: 20px;
                  color: #041f1d;
                  font-size: 15px;
                  font-weight: 500;
                "
              >
                巡查数据
              </p>
              <p style="margin-left: 25px; font-size: 14px; color: #041f1d">
                从 {{ this.patrolTime ? this.patrolTime[0] : "" }} 至
                {{ this.patrolTime ? this.patrolTime[1] : "" }}统计
              </p>
              <p
                style="
                  margin-left: 25px;
                  margin-top: 10px;
                  font-size: 22px;
                  color: #29958b;
                  font-weight: bold;
                "
              >
                {{ total }}<span style="color: #29958b">次</span>
              </p>
              <p style="margin-left: 25px; font-size: 14px; color: #666666">
                <!-- 当月巡查 -->
                <span style="margin-left: 25px; color: #666666">巡查任务</span>
                <span style="font-size: 18px; color: #041f1d; font-weight: bold">
                  {{ total }}<span style="color: #041f1d">次</span>
                </span>
              </p>
              <el-row>
                <span
                  style="
                    margin-left: 25px;
                    margin-top: 20px;
                    color: #041f1d;
                    font-size: 15px;
                    font-weight: bold;
                  "
                >
                  巡查次数统计
                </span>
                <!-- <span style="margin-left:25px">
                  <el-button size="mini"
                             autofocus
                             round>按月</el-button>
                  <el-button size="mini"
                             round>按季度</el-button>
                  <el-button size="mini"
                             round>按年</el-button>
                </span> -->
              </el-row>
              <div class="rainchart">
                <div
                  id="chart"
                  class="echarts"
                  :style="'height:' + height + ';width:' + width"
                  autoresize
                ></div>
              </div>

              <!-- <p>
                <span style="margin-left:25px;margin-top:0px;color:#041F1D;font-size:15px;font-weight:bold">
                  操作、上报统计
                </span>
              </p>
              <div class="num">
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-card>
                      <el-row>
                        <el-col :span="8"
                                style="background:#CFE5E1">
                          <div style="margin:16px;">
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              操
                            </p>
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              作
                            </p>
                          </div>
                        </el-col>
                        <el-col :span="16"
                                style="background:#F4FBF5;color:#29958B;">
                          <div style="margin:20px;border-bottom:1px solid #29958B">
                            <span style="font-size:30px">24</span>次
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                  <el-col :span="12">
                    <el-card>
                      <el-row>
                        <el-col :span="8"
                                style="background:#CFE5E1">
                          <div style="margin:16px;">
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              事
                            </p>
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              件
                            </p>
                          </div>
                        </el-col>
                        <el-col :span="16"
                                style="background:#F4FBF5;color:#29958B;">
                          <div style="margin:20px;border-bottom:1px solid #29958B">
                            <span style="font-size:30px">24</span>次
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                </el-row>
                <el-row :gutter="12"
                        style="margin-top:10px;">
                  <el-col :span="12">
                    <el-card>
                      <el-row>
                        <el-col :span="8"
                                style="background:#CFE5E1">
                          <div style="margin:16px;">
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              险
                            </p>
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              清
                            </p>
                          </div>
                        </el-col>
                        <el-col :span="16"
                                style="background:#F4FBF5;color:#29958B;">
                          <div style="margin:20px;border-bottom:1px solid #29958B">
                            <span style="font-size:30px">24</span>次
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                  <el-col :span="12">
                    <el-card>
                      <el-row>
                        <el-col :span="8"
                                style="background:#CFE5E1">
                          <div style="margin:16px;">
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              险
                            </p>
                            <p style="font-size:16px;font-weight:bold;color:#29958B">
                              清
                            </p>
                          </div>
                        </el-col>
                        <el-col :span="16"
                                style="background:#F4FBF5;color:#29958B;">
                          <div style="margin:20px;border-bottom:1px solid #29958B">
                            <span style="font-size:30px">24</span>次
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                  </el-col>
                </el-row>
              </div> -->
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加-修改 -->
    <Dialog
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      backDialogData="backDialogData"
    ></Dialog>
  </div>
</template>
<script>
import table2excel from "js-table2excel";
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";

import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";
import { DateDiff } from "@/utils/time.js";
import { outNetUrl } from "@/api/base.js";
import {
  patrollist,
  getPatrolListByUid,
  basicInfo,
  model,
  getPatrolTaskChart,
  getDocToHtml,
} from "./api";
import { tbInspectionTourHeader } from "../apiConfig";

export default {
  components: { LeftTreeBar, Btns, Dialog, damLeftTreeBar },
  data() {
    return {
      outNetUrl,
      treeId: "",
      gid: "",
      addvcd: "",
      chartData: [],
      patrolTime: [this.$moment(new Date()).format("YYYY-MM-DD "), this.getTimes(0)],
      height: "100%",
      width: "100%",
      activeName: "first",
      dialogVisible: false,
      tableLoading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 60,
      tableHeader: [],
      tableData: [],
      dialogData: {
        title: null, //弹框标题
        type: null, //操作添加，修改
        data: {
          // patroladdvcd: "",
          // patroladdvnm: "",
          // code: "",
          // name: "",
          // lng: "",
          // lat: "",
          // barh: "",
          // do: ""
        }, //数据
        pageType: "inspectionTour", //页面类型
      },
      query: {
        data: {},
        start: 1,
        size: 20,
      },
      total: 0,
      currentPage: 1,
      input: "",
      data: {
        type: 2,
        title: "水库列表",
        ifShowCheckBox: false,
        ifUpdateData: true,
        ifclickNodeCheck: false,
      },
      dataBtn: {
        model: 1,
        titleInput: "水库名称",
        add: false,
        query: false,
        import: false,
        importExcel: true,
        importExcelDemo: false,
      },
    };
  },
  mounted() {
    //   this.$route.query  1  今天    2  本月
    this.tableHeader = tbInspectionTourHeader;
    let flag = this.$route.query.hasOwnProperty("data");
    if (flag) {
      let gid = this.$route.query.data.data.gid;
      let select = this.$route.query.data.select;
      let time = this.$route.query.data.time;
      if (select == 1) {
        this.gid = gid;
        this.patrolTime = [time + " " + "00:00:00", time + " " + "23:59:59"];
      } else {
        this.gid = gid;
        this.patrolTime = [time + "-" + "01" + " " + "00:00:00", this.getTimes(0)];
      }
    } else {
      this.addvcd = this.$store.state.user.addvcd;
    }

    this.getPatrollist();
  },
  methods: {
    async handlerPatrolWordPath(row) {
      this.dialogVisible = true;
      this.dialogData.title = "预览";
      this.dialogData.type = "preview";
      this.dialogData.pageType = "preview";
      this.dialogData.data = row;
    },
    //   预览简报
    lookOnline(val) {
      //   let url = val.patrolWordPath
      //   let encodeUel = encodeURIComponent(url)
      //   let lookUrl = `${previewUrl}/onlinePreview?url=${encodeUel}`
      //   let lookUrl = `${previewUrl}/onlinePreview?url=${encodeUel}`
      //   return  lookUrl
    },
    //   时间快捷按钮
    handlerTime(time) {
      this.patrolTime = [this.getTimes(time), this.getTimes(0)];
      this.getPatrollist();
    },
    // drawChart() {
    //   let info = {
    //     Ykind: 'single', //Y轴单坐标
    //     idname: 'chart',
    //     type: ['bar'],
    //     lineColor: ['#29958B', '#1020F5'],
    //     lineLegend: ['实际巡查', '巡查任务'], //图例
    //     Yname: ['人员（个）'], //Y轴纵坐标单位
    //     dataX: [2020 / 10, 2020 / 11, 2020 / 12, 2021 / 1],
    //     dataY0: [2, 2, 4, 4],
    //   }
    //   this.draw(info)
    // },
    async drawChart() {
      let myChart = this.$echarts.init(document.getElementById("chart"));
      let this_ = this;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        color: ["#29958B", "#A1D2CD"],
        legend: {
          data: ["实际巡查", "巡查任务"],
        },
        grid: {
          left: "8%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [],
        },

        yAxis: {
          type: "value",
          name: "人员（个）",
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            width: 0.5,
            lineStyle: {
              type: "solid",
              color: "#EEEEEE",
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
            name: "实际巡查",
            type: "bar",
            silent: true,
            barWidth: 8,
            barMaxWidth: 15,
            z: 15,
            // barGap: '100%', // Make series be overlap
            // color: '#29958B',
            data: [],
          },
          {
            name: "巡查任务",
            type: "bar",
            silent: true,
            barWidth: 8,
            barMaxWidth: 15,
            z: 10,
            barGap: "-100%", // Make series be overlap
            // color: '#A1D2CD',
            data: [],
          },
        ],
      };
      let params = {
        // id: this.$store.state.user.userId, //用户id
        gid: this.gid, //水库id
        addvcd: this.addvcd, //行政区id
        stm: this.patrolTime ? this.patrolTime[0] : "",
        etm: this.patrolTime ? this.patrolTime[1] : "",
      };
      try {
        let { status, msg, data } = await getPatrolTaskChart(params);

        if (status) {
          data.sort((a, b) => {
            return new Date(a.tm).getTime() - new Date(b.tm).getTime();
          });
          data.forEach((item) => {
            option.xAxis.data.push(item.tm);
            option.series[0].data.push(item.doneTask);
            option.series[1].data.push(item.taskAll);
          });

          myChart.setOption(option, true);
          window.addEventListener("resize", function () {
            myChart.resize();
          });
        } else {
          this.$message({
            message: msg,
            type: "success",
          });
        }
      } catch (error) {}

      //   //   this.draw(info)
    },
    handleClick(tab, event) {},
    formatTime(time) {
      let idxOf = time.indexOf("-");
      let stm = time.slice(idxOf + 1);
      let lastIdxOf = stm.lastIndexOf(":");
      let lastStm = stm.slice(0, lastIdxOf);
      return lastStm;
    },
    //获得表格数据
    async getPatrollist(pam) {
      this.tableLoading = true;
      this.tableData = [];
      let params = {
        page: this.currentPage,
        size: this.query.size,
        // id: this.$store.state.user.userId, //用户id
        rscd: this.gid, //水库id
        addvcd: this.addvcd, //行政区id
        recordtype: "1",
        stm: this.patrolTime ? this.patrolTime[0] + " 00:00:00" : "",
        etm: this.patrolTime ? this.patrolTime[1] + " 23:59:59" : "",
      };

      try {
        this.drawChart();
        let { msg, data, status, total } = await getPatrolListByUid(params);
        if (status) {
          let list = data;
          this.total = Number(total);
          //   时间处理 展示月 日 时 分  时间合并 求用时
          list.map((item, index, arr) => {
            arr[index]["FstartTime"] = this.formatTime(item.stm);
            arr[index]["FendTime"] = this.formatTime(item.createTime);
            arr[index]["inspectionTime"] =
              this.formatTime(item.stm) +
              "-" +
              this.formatTime(item.createTime).split(" ")[1];
            let stm = new Date(item.stm);
            let etm = new Date(item.createTime);
            let timer = etm - stm;
            arr[index]["inspectionWhen"] =
              (DateDiff("n", stm, etm) <= 0 ? "1" : DateDiff("n", stm, etm)) + "min";
            if (item.sw) {
              if (!item.sw) return;
              let sw = item.sw;
              sw = sw.replace(/^[0]+/, "").replace(/^\./, "0.");
              item.sw = sw;
            }
          });

          this.tableData = list;
          this.tableLoading = false;
        } else {
          this.$message({
            message: msg,
            type: "success",
          });
        }
      } catch (error) {}
    },
    handleRow(row, type) {
      if (type == "update") {
        this.dialogVisible = true;
        this.dialogData.title = "修改水库";
        this.dialogData.type = "update";
        this.dialogData.data = row;
      } else if (type == "detail") {
        this.dialogVisible = true;
        this.dialogData.title = row.reservoirName + "巡查记录详情";
        this.dialogData.type = "detail";
        this.dialogData.pageType = "inspectionDetail";
        this.dialogData.data = row;
      }
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getPatrollist({ page: this.currentPage, size: val });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPatrollist({
        page: this.currentPage,
        size: this.query.size,
        type: this.type,
      });
    },
    //点击表格行
    handleRowClick(row, column, cell, event) {},
    //点击表格列
    handleCellClick(row, column, cell, event) {},
    handleSelectionChange(val) {},
    backData(data) {
      this.treeId = data.nodeData.id;
      if (data.nodeData.children) {
        this.addvcd = data.nodeData.addvcd;
        this.gid = "";
      } else {
        this.addvcd = "";
        this.gid = data.nodeData.rscd;
      }
      this.getPatrollist();
    },
    backClickBtnType(data) {
      switch (data.type) {
        case "add": //添加
          this.dialogData.pageType = "inspectionTour";
          this.dialogVisible = true;
          this.dialogData.title = "添加巡检记录";
          this.dialogData.type = "add";
          break;
        case "importExcelDemo": //下载模板
          let params = {};
          model(params).then((res) => {
            if (res.status) {
              window.location = res.data;
            }
          });
          break;
        case "importExcel": //导出
          this.download("");
          break;
      }
    },
    //模板下载  type=demo
    download(type) {
      if (type == "demo") {
        let column = [];
        tbInspectionTourHeader.forEach((e) => {
          column.push({ title: e.label, key: e.prop, type: "text" });
        });
        const excelName = "巡查记录模板";
        table2excel(column, [], excelName);
      } else {
        let column = [];
        tbInspectionTourHeader.forEach((e) => {
          column.push({ title: e.label, key: e.prop, type: "text" });
        });
        // column = [
        //   { title: "时间", key: "monitortime", type: "text" },
        //   { title: "5分钟雨量(mm)", key: "rainfall", type: "text" },
        //   { title: "小时雨量(mm)", key: "hours", type: "text" },
        //   { title: "日降雨量(mm)", key: "dyp", type: "text" }
        // ];
        const excelName = "巡查记录";
        table2excel(column, this.tableData, excelName);
      }
    },
    draw(infoConfig) {
      let myChart = this.$echarts.init(document.getElementById(infoConfig.idname));
      let this_ = this;
      let option = {};
      if (infoConfig.Ykind == "double") {
        option = {
          xAxis: [
            {
              type: "category",
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                width: 0.1,
                lineStyle: {
                  type: "solid",
                  color: "#E9ECEE", //网格颜色
                },
              },
              axisLine: {
                lineStyle: {
                  color: "#666666", //xy字体颜色
                  width: 0,
                },
              },
              data: infoConfig.dataX,
            },
          ],
          yAxis: [
            {
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                width: 0,
                lineStyle: {
                  type: "solid",
                  color: "#E9ECEE", //网格颜色
                },
              },
              axisLine: {
                lineStyle: {
                  color: "#666666", //y 0 刻度样式
                  width: 0,
                },
              },
              type: "value",
              name: "时段降雨量(mm)",
              min: 0,
              max: 50,
              interval: 10,
            },
            {
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                width: 0,
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
              type: "value",
              name: "累计雨量(mm)",
              min: 0,
              max: 500,
              interval: 50,
            },
          ],
          series: [
            // {
            //   name: "时段降水量",
            //   type: "bar",
            //   barWidth: 16,
            //   color: "#2486FF",
            //   data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2]
            // },
            {
              name: infoConfig.lineLegend[0], //与图例必须保持一致
              type: infoConfig.type[0],
              barWidth: 3,
              color: infoConfig.lineColor[0],
              data: infoConfig.dataY0,
            },
            {
              symbol: "circle", //不添加空心点,添加后为实心点，拐点样式
              name: infoConfig.lineLegend[1],
              type: infoConfig.type[1],
              yAxisIndex: 1, // //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              color: infoConfig.lineColor[1],
              data: infoConfig.dataY1,
            },
          ],
        };
      } else if (infoConfig.Ykind == "single") {
        option = {
          xAxis: {
            type: "category",
            data: infoConfig.dataX,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: "solid",
                color: "rgba(255,255,255,0.2)",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#666666",
                width: 0,
              },
            },
          },
          yAxis: {
            type: "value",
            name: infoConfig.Yname[0],
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: "solid",
                color: "#EEEEEE",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#666666",
                width: 0,
              },
            },
          },
        };
        option.series = [];
        if (infoConfig.type.length > 0) {
          infoConfig.type.forEach((val, index, arr) => {
            option.series.push({
              name: infoConfig.lineLegend[index], //与图例必须保持一致
              type: infoConfig.type[index],
              barWidth: 16,
              stack: "1",
              color: infoConfig.lineColor[index],
              data: infoConfig["dataY" + index],

              symbol: "circle", //不添加空心点,添加后为实心点，拐点样式
            });
          });
        }
      } else if (infoConfig.Ykind == "point") {
        option = {
          xAxis: {
            type: "category",
            //  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            data: infoConfig.dataX,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: "solid",
                color: "rgba(255,255,255,0.2)",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#666666",
                width: 0,
              },
            },
          },
          yAxis: {
            type: "value",
            min: 0,
            max: 20,
            name: infoConfig.Yname[0],
            axisTick: {
              show: false,
            },

            axisLabel: {
              formatter: function () {
                return "";
              },
            },

            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: "solid",
                color: "#EEEEEE",
              },
            },
            axisLine: {
              show: false,

              lineStyle: {
                color: "#666666",
                width: 0,
              },
            },
          },
        };
        option.series = [];
        if (infoConfig.type.length > 0) {
          infoConfig.type.forEach((val, index, arr) => {
            option.series.push({
              symbolSize: 10,
              name: infoConfig.lineLegend[index], //与图例必须保持一致
              type: infoConfig.type[index],
              //   barWidth: 16,
              color: infoConfig.lineColor[index],
              data: infoConfig["dataY" + index],
              itemStyle: {
                normal: {
                  // shadowBlur: 10,
                  // // shadowColor: "rgba(120, 36, 50, 0.5)",
                  // shadowOffsetY: 5,
                  color: function (e) {
                    if (e.data == 10) {
                      return infoConfig.lineColor[0];
                    } else {
                      return infoConfig.lineColor[1];
                    }
                  },
                },
              },
              symbol: "circle", //不添加空心点,添加后为实心点，拐点样式
            });
          });
        }
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
        top: "20%",
        left: "6%", //图表距边框的距离
        right: "0%",
        bottom: "10%",
        containLabel: true,
        backgroundColor: "#F5F9FC",
      };

      option.legend = {
        data: infoConfig.lineLegend,
        // orient: "horizontal",
        // x: "center",
        // y: "bottom",
        // textStyle: {
        //   //图例文字的样式
        //   color: "#666666",
        //   fontSize: 10
        // },
        // itemWidth: 15,
        // itemHeight: 10,
        selected: {
          XΔ: true,
          YΔ: true,
          HΔ: true,
          "2D": false,
          "3D": true,
          位移值: true,
          监测值: true,
          初始值: true,
        },
      };
      myChart.setOption(option, true);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getTimes(n) {
      const start = new Date();
      let cont = start.setTime(start.getTime() - 3600 * 1000 * n);
      let cont2 = this.formateDate(new Date(cont));
      return cont2;
    },
    // 格式化时间
    formateDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let h = time.getHours();
      let min = time.getMinutes();
      let s = time.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return year + "-" + month + "-" + day + " "; // + h + ':' + min + ':' + s
    },
  },
};
</script>
<style lang="scss" scoped>
.inspectionTour {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  >>> .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 3.36rem !important;
  }
  >>> .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 3.36rem !important;
  }
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  // >>> .el-button--primary {
  //   color: #fff;
  //   background-color: #29958b;
  //   border-color: #ffffff;
  // }
  .right {
    margin: 0rem;
    // margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    >>> .el-header {
      height: 30px !important;
    }

    .con {
      display: flex;
      flex-flow: row;
      width: 98%;
      height: 98%;
      margin: auto;
      align-items: center;
      justify-content: center;
      .tb1 {
        height: 100%;
        margin-right: 0.1rem;
        width: 73%;
        // border: 1px solid #29958b;
        >>> .el-tabs__item:hover {
          color: #29958b;
          cursor: pointer;
        }
        >>> .el-tabs__item.is-active {
          color: #29958b;
        }
        >>> .el-tabs__active-bar {
          background-color: #29958b;
        }

        >>> .el-table--group::after,
        .el-table--border::after,
        .el-table::before {
          content: "";
          position: absolute;
          background-color: transparent;
          z-index: 1;
        }
      }
      .tb2 {
        height: 100%;
        flex: 1;
        // width: calc(50% - 10px);
        border-left: 1px solid #cfe5e1;
        >>> .el-button--mini.is-round {
          padding: 2px 10px;
        }
        >>> .el-card__body {
          padding: 0px;
        }
        .rainchart {
          padding-top: 20px;
          //   border: 1px solid red;
          display: flex;
          width: 88%;
          margin: auto;
          height: 300px;
        }
        .num {
          position: relative;
          top: 20px;
          text-align: center;
          width: 90%;
          margin: auto;
        }
      }
    }
  }
  .el-aside {
    width: 2.4rem !important;
    background: #fff;
  }
}
</style>
