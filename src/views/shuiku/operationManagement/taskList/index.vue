<!--
 * @Author: dang
 * @Date: 2021-04-09 09:16:28
 * @LastEditTime: 2021-09-09 20:49:03
 * @LastEditors: --
 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\operationManagement\taskList\index.vue
-->
<template>
  <div class="skList">
    <!-- 任务列表 -->
    <el-container class="con">
      <el-aside>
        <!-- <LeftTreeBar :data="data"
                     @backData="backData"></LeftTreeBar> -->
        <damLeftTreeBar ref="tree" :data="data" @backData="backData"></damLeftTreeBar>
      </el-aside>
      <el-container class="right">
        <el-main>
          <el-header>
            <el-row>
              <el-col :span="1" style="width: 70px">
                <el-button
                  size="mini"
                  class="btn-table-border blue"
                  style="cursor: pointer"
                  type="primary"
                  @click.stop="handlerTime(7 * 24)"
                  >近一周</el-button
                >
              </el-col>
              <el-col :span="1">
                <el-button
                  size="mini"
                  class="btn-table-border blue"
                  style="cursor: pointer"
                  type="primary"
                  @click.stop="handlerTime(30 * 24)"
                  >近一月</el-button
                >
              </el-col>
              <el-col :span="1" style="width: 80px">
                <p style="line-height: 30px; text-align: right">执行时间&nbsp;&nbsp;</p>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  size="mini"
                  v-model="operattionTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="1" style="width: 80px">
                <p style="line-height: 30px; text-align: right">下发时间&nbsp;&nbsp;</p>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  size="mini"
                  v-model="departureTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期时间"
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
            <el-table-column label="操作" width="240" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  class="btn-table-border blue"
                  style="cursor: pointer"
                  type="primary"
                  @click.stop="handleRow(scope.row)"
                  >查看详情</el-button
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
        </el-main>
      </el-container>
    </el-container>
    <!-- 任务详情 -->
    <el-dialog
      title="任务详情"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-form :model="dialogData" ref="formData" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="执行人" prop="user">
              <el-input
                v-model="dialogData.inspectorName"
                placeholder="执行人"
                readonly
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <el-input
                v-model="dialogData.mobile"
                placeholder="联系方式"
                readonly
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行时间" prop="s">
              <el-input
                v-model="dialogData.taskExecTime"
                placeholder="执行时间"
                readonly
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务内容" prop="content">
              <el-input
                v-model="dialogData.taskContent"
                placeholder="任务内容"
                readonly
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下发时间" prop="departureTime">
              <el-input
                v-model="dialogData.issueTime"
                placeholder="下发时间"
                readonly
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务状态" prop="status">
              <el-input
                v-model="dialogData.execStateLabel"
                placeholder="任务状态"
                readonly
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";

import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";

import { patrollist, getTaskDetailListByPage } from "./api";
import { tbReportTaskListHeader } from "../apiConfig";

export default {
  components: { LeftTreeBar, Btns, Dialog, damLeftTreeBar },
  data() {
    return {
      operattionTime: [],
      departureTime: "",
      height: "100%",
      width: "100%",
      activeName: "first",
      dialogVisible: false,
      tableLoading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 60,
      tableHeader: [],
      tableData: [],
      dialogData: {},
      query: {
        data: {},
        start: 1,
        size: 20,
      },
      total: 0,
      currentPage: 1,
      input: "",
      treeId: "",
      addvcd: "",
      data: {
        type: 2,
        title: "水库列表",
        ifShowCheckBox: false,
        ifUpdateData: true,
        ifclickNodeCheck: false,
      },
    };
  },
  mounted() {
    // let that = this;
    this.tableHeader = tbReportTaskListHeader;
    this.addvcd = this.$store.state.user.addvcd;
    this.getPatrollist();
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    //   时间快捷按钮
    handlerTime(time) {
      this.operattionTime = [this.getTimes(time), this.getTimes(0)];
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    //获得表格数据
    async getPatrollist() {
      //   this.tableLoading = true
      this.tableData = [];
      try {
        let params = {
          pageNum: this.currentPage,
          pageSize: this.query.size,
          reservoirId: this.treeId,
          addvcd: this.addvcd,
          taskExecTimeBegin: this.operattionTime ? this.operattionTime[0] : "",
          taskExecTimeEnd: this.operattionTime ? this.operattionTime[1] : "",
          isssueTime: this.departureTime,
          weekOrMonth: "",
        };
        let { msg, data, status, total } = await getTaskDetailListByPage(params);
        if (status) {
          let list = data;
          this.total = Number(total);
          this.tableData = list;
          let conArr = [
            "待执行",
            "执行中",
            "已执行",
            "超时执行中",
            "超时已执行",
            "未执行",
          ];
          this.tableData.forEach((item, index, arr) => {
            arr[index].execStateLabel = conArr[parseInt(item.execState)];
            arr[index]["FstartTime"] = this.formatTime(item.execBeginTime);
            arr[index]["FendTime"] = this.formatTime(item.execEndTime);
            arr[index]["FtaskExecTime"] = this.formatTime(item.taskExecTime);
            arr[index]["FissueTime"] = this.formatTime(item.issueTime);
          });
          this.tableLoading = false;
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (error) {
        console.log(error);
        this.$GXprompt.notify.error("网络连接错误");
      }
    },
    formatTime(time) {
      if (!time) return;
      let idxOf = time.indexOf("-");
      let stm = time.slice(idxOf + 1);
      let lastIdxOf = stm.lastIndexOf(":");
      let lastStm = stm.slice(0, lastIdxOf);
      return lastStm;
    },
    // 查看详情
    handleRow(row) {
      this.dialogVisible = true;
      this.dialogData = row;
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
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
      console.log(`当前页: ${val}`);
    },
    //点击表格行
    handleRowClick(row, column, cell, event) {},
    //点击表格列
    handleCellClick(row, column, cell, event) {},
    handleSelectionChange(val) {
      console.log(val, "复选框----");
    },
    backData(data) {
      console.log(data, "树列表返回的值");
      if (
        data.nodeData.children &&
        data.nodeData.addvcd === this.$store.state.user.addvcd
      ) {
        this.treeId = "";
        this.addvcd = data.nodeData.addvcd;
      } else if (data.nodeData.children) {
        this.treeId = "";
        this.addvcd = data.nodeData.addvcd;
      } else {
        this.addvcd = "";
        this.treeId = data.nodeData.addvcd;
      }
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
      return year + "-" + month + "-" + day + " " + h + ":" + min + ":" + s;
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
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  >>> .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 3.6rem !important;
  }
  >>> .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 3.6rem !important;
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
