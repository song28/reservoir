<template>
  <div class="skList">
    <!-- 上报记录 -->
    <el-container class="con">
      <el-aside>
        <!-- <LeftTreeBar :data="data"
                     @backData="backData"></LeftTreeBar> -->
        <damLeftTreeBar ref="tree" :data="data" @backData="backData"></damLeftTreeBar>
      </el-aside>
      <el-container class="right">
        <el-main>
          <div class="tb">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="上报事件记录" name="first"></el-tab-pane>
              <el-tab-pane label="上报险情记录" name="second"></el-tab-pane>
              <!-- <el-tab-pane label="上报汛情记录" name="third"></el-tab-pane> -->
            </el-tabs>
            <el-header>
              <el-row style="width: 1000px">
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
                  <p style="line-height: 30px; text-align: right">上报时间&nbsp;&nbsp;</p>
                </el-col>
                <el-col :span="10">
                  <el-date-picker
                    size="mini"
                    :clearable="false"
                    v-model="patrolTime"
                    type="daterange"
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
                    @click="queryTime()"
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
                sortable
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column label="操作" width="220" align="center">
                <template slot-scope="scope">
                  <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'update')"
                    >修改</el-button
                  > -->
                  <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'delete')"
                    >删除</el-button
                  > -->
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
              :page-sizes="[20, 100, 200, 300, 400]"
              :page-size="query.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加-修改 -->
    <Dialog
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      @backDialogData="backDialogData"
    ></Dialog>
  </div>
</template>
<script>
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";

import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";

import { getPatrolListByUid, getInscoptorByReservoirId, model } from "../api";
import {
  tbReportRecordsHeader,
  optionsReportFive,
  optionsReportFour,
  BASE_API_6,
} from "../apiConfig";

export default {
  components: { LeftTreeBar, Btns, Dialog, damLeftTreeBar },
  data() {
    return {
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      patrolTime: [this.getTimes(1 * 24), this.getTimes(0)],

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
        pageType: "reportRecords", //页面类型
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
        add: true,
        query: false,
        import: false,
        importExcel: false,
        importExcelDemo: false,
      },
      gid: "",
      addvcd: "",
      backTreeData: {},
    };
  },
  mounted() {
    // let that = this;
    // that.getPatrollist({
    //   page: 1,
    //   size: 10,
    //   type: 0
    // });
    this.tableHeader = tbReportRecordsHeader;
    this.addvcd = this.$store.state.user.addvcd;
    this.getPatrollist();
  },
  methods: {
    queryTime() {
      this.currentPage = 1;
      this.getPatrollist();
    },
    //   时间快捷按钮
    handlerTime(time) {
      this.patrolTime = [this.getTimes(time), this.getTimes(0)];
      this.getPatrollist();
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //获得表格数据
    async getPatrollist() {
      let tow = [];
      this.tableLoading = true;
      this.tableData = [];
      let a = "";
      if (this.activeName == "first") {
        a = 4;
      } else if (this.activeName == "second") {
        a = 5;
      }
      let params = {
        recordtype: a,
        page: this.currentPage,
        size: this.query.size,
        rscd: this.gid, //水库id
        addvcd: this.addvcd, //行政区id
        desc: "",
        stm: this.patrolTime ? this.patrolTime[0] + " 00:00:00" : "",
        etm: this.patrolTime ? this.patrolTime[1] + " 23:59:59" : "",
        imgs: [],
      };
      try {
        let { msg, data, status, total } = await getPatrolListByUid(params);
        if (status) {
          this.total = Number(total);
          data.forEach((e, i, a) => {
            if (e.recordType == 4) {
              optionsReportFour.forEach((a) => {
                if (e.implementType == a.value) {
                  data[i].implementType = a.label;
                }
              });
            } else if (e.recordType == 5) {
              optionsReportFive.forEach((a) => {
                if (e.implementType == a.value) {
                  data[i].implementType = a.label;
                }
              });
            }
          });
          //   时间处理 展示月 日 时 分
          data.map((item, index, arr) => {
            arr[index]["FstartTime"] = this.formatTime(item.createTime);
          });
          this.tableData = data;
          this.tableLoading = false;
        } else {
          this.$message({
            message: msg,
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    formatTime(time) {
      let idxOf = time.indexOf("-");
      let stm = time.slice(idxOf + 1);
      let lastIdxOf = stm.lastIndexOf(":");
      let lastStm = stm.slice(0, lastIdxOf);
      return lastStm;
    },
    handleRow(row, type) {
      this.dialogData.type = type;
      if (type == "update") {
        this.dialogVisible = true;
        this.dialogData.title = "修改上报记录";
        this.dialogData.data = row;
      } else if (type == "detail") {
        this.dialogData.title = "上报记录详情";
        this.dialogData.data = row;
        this.dialogVisible = true;
      }

      console.log(type, row, "操作");
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.query.size = val;
      this.getPatrollist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPatrollist();
      // console.log(`当前页: ${val}`);
    },
    //对话框返回数据 - 添加，修改成功之后刷新树列表以及表格数据并且置空弹框数据
    backDialogData(data) {
      this.data.ifUpdateData = data;
      this.dialogData.data = {};
      this.currentPage = 1;
      this.getPatrollist();
    },
    //点击表格行
    handleRowClick(row, column, cell, event) {},
    //点击表格列
    handleCellClick(row, column, cell, event) {},
    handleSelectionChange(val) {
      console.log(val, "复选框----");
    },

    backData(data) {
      this.backTreeData = {};
      this.backTreeData = data;
      console.log(data, "树列表返回的值");
      if (data.nodeData.children) {
        this.addvcd = data.nodeData.addvcd;
        this.gid = "";
      } else {
        this.addvcd = "";
        this.gid = data.nodeData.rscd;
      }
      this.currentPage = 1;
      this.getPatrollist();
    },
    async backClickBtnType(data) {
      let skidArr = [];
      if (this.backTreeData.nodeData) {
        if (!this.backTreeData.nodeData.children) {
          skidArr.push({
            gid: this.backTreeData.nodeData.rscd,
            name: this.backTreeData.nodeData.name,
          });
        }
      }
      switch (data.type) {
        case "add": //添加
          if (skidArr.length > 0) {
            let data = await getInscoptorByReservoirId({
              reservoirId: skidArr[0].gid,
            });
            if (data.status == 200) {
              console.log(data.obj, "--");
              this.dialogVisible = true;
              this.dialogData.title = "添加上报记录";
              this.dialogData.type = "add";
              this.dialogData.data = {
                createTm: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                gid: skidArr[0],
                reportType: this.activeName,
                skPersonOpions: data.obj,
                // person: name,
                // personID: id
              };
            }
          } else {
            this.$notify({
              title: "警告",
              message: "请选择至少一个水库进行数据上报",
              type: "warning",
            });
          }
          break;
        case "importExcelDemo": //下载模板
          console.log("模板");
          window.location.href = BASE_API_6 + "/web/rsvr/downloadTemplate";
          // let params = {};
          // model(params).then(res => {
          //   if (res.status) {
          //     window.location = res.data;
          //   }
          // });
          break;
        case "query": //搜索
          break;
      }
      console.log(data, "点击操作按钮");
    }, //树列表--被选中的水库id
  },
  watch: {
    activeName: {
      handler: function (newV, oldV) {
        this.currentPage = 1;
        this.getPatrollist();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.skList {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  >>> .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 336px !important;
  }
  >>> .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 366px !important;
  }
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  >>> .el-main {
    padding: 0px 20px;
  }
  // >>> .el-button--primary {
  //   color: #fff;
  //   background-color: #29958b;
  //   border-color: #ffffff;
  // }
  .right {
    margin: 0rem;
    margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    >>> .el-header {
      height: 30px !important;
    }
    .tb {
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
    }
  }
  .el-aside {
    width: 2.4rem !important;
    background: #fff;
  }
}
</style>
