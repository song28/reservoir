<template>
  <div class="inspectionTour">
    <!--  日常养护 -->
    <el-container class="con">
      <el-aside>
        <!-- <LeftTreeBar :data="data"
                     @backData="backData"></LeftTreeBar> -->
        <damLeftTreeBar ref="tree" :data="data" @backData="backData"></damLeftTreeBar>
      </el-aside>
      <el-container class="right">
        <el-main>
          <div class="con">
            <div class="tb1">
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
                  <el-col :span="1" :offset="1">
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
                    <p style="line-height: 30px; text-align: right">时间&nbsp;&nbsp;</p>
                  </el-col>
                  <el-col :span="9">
                    <el-date-picker
                      size="mini"
                      v-model="patrolTime"
                      type="daterange"
                      :clearable="false"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-search"
                      @click="clickBtnQuery()"
                      >查询</el-button
                    >
                  </el-col>
                  <el-col :span="6" style="margin-left: 10px">
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
                  :width="item.width"
                  align="center"
                  sortable
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column label="操作" width="220" align="center">
                  <template slot-scope="scope">
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
            <div class="tb2">
              <el-row>
                <el-col :span="8">
                  <p style="margin-left: 15px; font-size: 16px; font-weight: bold">
                    养护数据统计
                  </p>
                </el-col>
                <el-col :span="16" style="text-align: right">
                  <!-- <span style="margin-left:5px">
                    <el-button size="mini" autofocus round>按月</el-button>
                    <el-button size="mini" round>按季度</el-button>
                    <el-button size="mini" round>按年</el-button>
                  </span> -->
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <p
                    style="
                      margin-left: 25px;
                      margin-top: 20px;
                      color: #041f1d;
                      font-size: 15px;
                      font-weight: 500;
                    "
                  >
                    养护数据
                  </p>
                  <p style="margin-left: 25px; font-size: 14px; color: #9ba2b0">
                    最近一个月统计
                  </p>
                </el-col>
                <el-col :span="16">
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
                    当月养护
                  </p>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <p style="margin-left: 15px; font-size: 16px; font-weight: bold">
                  养护标准说明
                </p>
              </el-row>
              <div class="stantands">
                <div
                  v-for="(item, index) in tips"
                  :key="index"
                  style="margin-bottom: 10px"
                >
                  <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px">
                    {{ item.title }}
                  </div>
                  <div>{{ item.con }}</div>
                </div>
              </div>
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
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";

import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";
import { DateDiff } from "@/utils/time.js";
import { patrollist, getPatrolListByUid } from "../api";
import {
  tbDailyMaintenanceListHeader,
  tbDailyMaintenanceListDetailHeader,
} from "../apiConfig";
import table2excel from "js-table2excel";

export default {
  components: { LeftTreeBar, Btns, Dialog, damLeftTreeBar },
  data() {
    return {
      patrolTime: [this.$moment(new Date()).format("YYYY-MM-DD "), this.getTimes(0)],
      tips: [
        {
          title: "坝顶维护",
          con: "坝顶平顺，无断裂、坑洼，无杂草、杂物及其他垃圾，无违建物。",
        },
        {
          title: "坝坡砼、溢洪道及排水沟养护",
          con:
            "坝坡完整，坡面平顺，无危害性裂缝，塌陷，无违建物；溢洪道内无裂缝、渗漏，无杂物垃圾，无拦污栅等阻洪建筑物；排水沟无破损、断裂，无淤泥、杂物。",
        },
        {
          title: "坝坡草皮维护",
          con: "草皮高度适中，完整成片，无大的沉陷和凸起，无杂草、杂物、枯枝及其他垃圾",
        },
        {
          title: "启闭设施维护",
          con:
            "表面清洁、无污垢、杂物，无锈斑、鼓泡、龟裂、掉漆，所有运转部位润滑完好，启闭机机房整洁干净，屋顶无漏雨，门窗无破损。",
        },
        {
          title: "导滤体维护",
          con: "导滤体完好、平整，无松动、塌陷和脱落，无杂草、杂物、枯枝等。",
        },
        {
          title: "水质维护",
          con: "水库周边无污水直排，无倾倒废弃物、无围栏养鸡鸭等污染水质的行为。",
        },
        {
          title: "库面及周边保洁",
          con:
            "水库库面清洁，无塑料瓶、垃圾袋等漂浮物，无水葫芦、绿藻等水生植物，库区周边视线可及范围内无垃圾、枯枝等其他杂物等。",
        },
        {
          title: "其他",
          con: "水尺刻度清晰，标志牌完好醒目，水库巡查记录完整。",
        },
      ],
      chartData: [],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      height: "100%",
      width: "100%",
      activeName: "first",
      dialogVisible: false,
      tableLoading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 60,
      tableHeader: [],
      tableData: [
        {
          code: "2020/12/08",
          name: "张华天 13254265220 ",
          lng: "坝顶维护",
          lat: "--",
        },
      ],
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
        pageType: "dailyMaintenance", //页面类型
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
      uid: "",
      gid: "",
      currentAddvcd: "",
      backTreeData: {},
      addvcd: "",
    };
  },
  mounted() {
    this.uid = this.$store.state.user.userId;
    this.tableHeader = tbDailyMaintenanceListHeader;
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
    clickBtnQuery() {
      console.log("gdafsdfsfs===");
      this.getPatrollist();
    },
    //时间快捷按钮
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
      return year + "-" + month + "-" + day + " "; //+ h + ":" + min + ":" + s;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    formatTime(time) {
      let idxOf = time.indexOf("-");
      let stm = time.slice(idxOf + 1);
      let lastIdxOf = stm.lastIndexOf(":");
      let lastStm = stm.slice(0, lastIdxOf);
      return lastStm;
    },
    //获得表格数据
    async getPatrollist() {
      this.tableLoading = true;
      this.tableData = [];
      let params = {
        page: this.currentPage,
        size: this.query.size,
        // id: this.$store.state.user.userId, //用户id
        rscd: this.gid, //水库id
        addvcd: this.addvcd, //行政区id
        recordtype: "2",
        stm: this.patrolTime ? this.patrolTime[0] + " 00:00:00" : "",
        etm: this.patrolTime ? this.patrolTime[1] + " 23:59:59" : "",
      };

      try {
        let { msg, data, status, total } = await getPatrolListByUid(params);
        if (status) {
          let list = data;
          this.total = Number(total);
          list.forEach((e, i, a) => {
            if (0 == e.implementType) {
              list[i].implementType = "坝坡砍青";
            } else if (1 == e.implementType) {
              list[i].implementType = "沟道清淤";
            } else if (2 == e.implementType) {
              list[i].implementType = "踏步清扫";
            } else if (3 == e.implementType) {
              list[i].implementType = "水尺维护";
            } else if (4 == e.implementType) {
              list[i].implementType = "溢洪道清理";
            } else if (5 == e.implementType) {
              list[i].implementType = "启闭机房卫生";
            } else if (6 == e.implementType) {
              list[i].implementType = "启闭机刷漆";
            }
          });
          //   时间处理 展示月 日 时 分
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
      } catch (error) {
        console.log(error);
      }
    },
    handleRow(row, type) {
      this.dialogData.type = type;
      if (type == "update") {
        this.dialogVisible = true;
        this.dialogData.title = "修改养护记录";
        this.dialogData.data = row;
      } else if (type == "detail") {
        this.dialogData.title = row.reservoirName + "养护记录详情";
        this.dialogData.data = row;
        this.dialogVisible = true;
      }
      console.log(type, row, "操作");
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.size = val;
      this.getPatrollist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPatrollist();
      console.log(`当前页: ${val}`);
    },
    //点击表格行
    handleRowClick(row, column, cell, event) {},
    //点击表格列
    handleCellClick(row, column, cell, event) {},
    handleSelectionChange(val) {
      console.log(val, "复选框----");
    },
    //树列表返回数据
    backData(data) {
      this.backTreeData = {};
      this.backTreeData = data;
      if (data.nodeData.children) {
        this.addvcd = data.nodeData.addvcd;
        this.gid = "";
      } else {
        this.addvcd = "";
        this.gid = data.nodeData.rscd;
      }
      this.getPatrollist();
      console.log(data, "树列表返回的值");
    },
    backClickBtnType(data) {
      switch (data.type) {
        case "add": //添加
          this.dialogVisible = true;
          this.dialogData.title = "添加养护记录";
          this.dialogData.type = "add";
          break;
        case "import":
          //更新表格列表即可
          break;
        case "importExcelDemo":
          this.download("demo");
          break;
        case "importExcel":
          this.download("");
          break;
        case "query":
          //行政区或水库+搜索内容 调用接口
          break;
      }
      console.log("dddddd", data);
    },
    //模板下载  type=demo
    download(type) {
      if (type == "demo") {
        let column = [];
        tbDailyMaintenanceListHeader.forEach((e) => {
          column.push({ title: e.label, key: e.prop, type: "text" });
        });
        const excelName = "养护记录模板";
        table2excel(column, [], excelName);
      } else {
        let column = [];
        tbDailyMaintenanceListHeader.forEach((e) => {
          column.push({ title: e.label, key: e.prop, type: "text" });
        });
        // column = [
        //   { title: "时间", key: "monitortime", type: "text" },
        //   { title: "5分钟雨量(mm)", key: "rainfall", type: "text" },
        //   { title: "小时雨量(mm)", key: "hours", type: "text" },
        //   { title: "日降雨量(mm)", key: "dyp", type: "text" }
        // ];
        const excelName = "养护记录";
        table2excel(column, this.tableData, excelName);
      }
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
      >>> .el-date-editor--datetimerange.el-input,
      .el-date-editor--datetimerange.el-input__inner {
        width: 366px !important;
      }
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
        .stantands {
          position: relative;
          padding-top: 20px;
          //   border: 1px solid red;
          //   display: flex;
          width: 88%;
          margin: auto;
          overflow: auto;
          height: calc(100% - 140px);
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
