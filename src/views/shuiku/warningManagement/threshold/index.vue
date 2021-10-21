<template>
  <div class="warnInfoList">
    <!-- 水库列表 -->
    <el-container class="con">
      <el-aside>
        <damLeftTreeBar
          ref="tree"
          :data="data"
          @backDataChecked="backData"
          @backDataNode="backDataNode"
        ></damLeftTreeBar>
      </el-aside>
      <el-container class="right">
        <el-main>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="(item, index) in tabList"
              :key="index"
              :label="item.label"
              :name="item.value"
            ></el-tab-pane>
            <!-- <el-tab-pane label="断面" name="first"></el-tab-pane>
            <el-tab-pane label="水库" name="second"></el-tab-pane>
            <el-tab-pane label="水平监测点" name="third"></el-tab-pane>
            <el-tab-pane label="垂直监测点" name="fourth"></el-tab-pane>
            <el-tab-pane label="坝基监测点" name="five"></el-tab-pane>
            <el-tab-pane label="渗流监测点" name="six"></el-tab-pane> -->
          </el-tabs>
          <!-- <el-header>
            <Btns :data="dataBtn" @clickBtn="backClickBtnType"></Btns>
          </el-header> -->
          <div class="tb">
            <el-table
              stripe
              :data="tableData"
              v-loading="tableLoading"
              border
              style="width: 100%"
              highlight-current-row
              @selection-change="handleSelectionChange"
              :height="tableHeight"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                label="序号"
                type="index"
                :index="table_index"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                v-for="(item, index) in tableHeader"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                align="center"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'update')"
                    >修改</el-button
                  >

                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'detail')"
                    >详情</el-button
                  >
                  <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'del')"
                    >删除</el-button
                  > -->
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
    <skDialog
      :dialogVisible.sync="dialogVisible"
      v-if="dialogVisible"
      :data="dialogData"
      @backDialogData="backDialogData"
    ></skDialog>
  </div>
</template>
<script>
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";
import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";
import skDialog from "../common/skDialog";

import { formatDate } from "@/utils/time";
import {
  loadPersonlist4Page,
  model,
  getBaseInfoById,
  skPatrolRecordFile4ZipByMonth,
  deleteByEnmnitids,
  getEnmnitsByRSCD, //通过水库编码获取所有的监测项目
  findEarlyWarnConfByPage, //查询测站阈值配置列表
  editWarnConf, //添加预警配置
} from "../api";
import {
  tbskListHeader,
  skListSizeTypeOptions,
  skListOpenTypeOptions,
  skListBarTypeOptions,
  tabHeader01, //监测项目列表
  tabHeader11,
  tabHeader05,
  tabHeader02,
  engineeringPartsOptions,
} from "../apiConfig";
import {
  monitorProjecOptions, //监测项目options
} from "@/views/shuiku/reservoirManagement/apiConfig";
import table2excel from "js-table2excel";
import { demo, previewUrl, outNetZip } from "@/api/base.js";
import { imporData } from "../../reservoirManagement/api";

export default {
  components: { damLeftTreeBar, Btns, Dialog, skDialog },
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          return this.dealDisabledDate(time);
        },
      },
      dialogVisible: false,
      tableLoading: false,
      dialogVisibleFlag: false,
      monthValue: new Date(),
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 100,
      tableHeader: [],
      tableData: [],
      dialogData: {
        //弹框配置
        activeName: "fromThreshold", //", //添加、修改、详情表单页面名称
        title: null, //弹框标题
        type: null, //操作add添加，update修改,detail查看
        data: {}, //数据
        pageType: "skList", //页面类型
      },
      activeName: "first",
      query: {
        //查询
        data: {},
        start: 1,
        size: 20,
        keys: "",
      },
      total: 0,
      currentPage: 1,
      input: "",
      data: {
        //树列表配置

        type: 2,
        title: "水库列表",
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false,
      },
      dataBtn: {
        //功能按钮配置
        pageType: "skPersonList",
        model: 2,
        config: false,
        titleInput: "断面名称",
        width: "200px",
        conInput: "请输入断面名称查询",
        add: false,
        query: true,
        import: false,
        importExcel: false,
        importExcelDemo: false,
      },
      currentAddvcd: "",
      nodeTreeData: {},
      arrToStr: "",
      rscd: "", //水库编码
      enmnit: "", //监测项目编码
      multipleSelection: [], //选中数据
      tabList: [], //标签页
    };
  },
  mounted() {
    this.currentAddvcd = this.$store.state.user.addvcd;
    let tbh = [];
    tabHeader01.forEach((e) => {
      if (e.show) {
        tbh.push(e);
      }
    });
    this.tableHeader = tbh;
    //默认显示浏阳市下面的所有水库
    // this.getsklist();
  },
  methods: {
    //   时间
    dealDisabledDate(time) {
      let times = Date.now();
      return time.getTime() > times;
    },
    //获得表格数据
    async getsklist() {
      let self = this;
      self.getEnmnitsByRSCD();
    },
    handleClose() {
      this.dialogVisibleFlag = false;
    },
    async handlerSave() {
      let params = {
        gid: this.gid,
        tm: this.$moment(this.monthValue).format("YYYY-MM") + "-01",
      };
      try {
        let { msg, data, status, total } = await skPatrolRecordFile4ZipByMonth(params);
        if (status) {
          this.handleClose();
          let url = outNetZip + data;
          //直接下载
          console.log(url, "url");
          let a = document.createElement("a");
          a.href = url;
          a.style.display = "none";
          // a.setAttribute('target', '_blank')
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //表格操作
    async handleRow(row, type) {
      this.dialogData.type = type;
      if (type == "update") {
        this.dialogData.title = "修改预警阈值";
        this.dialogData.data = row;
        this.dialogData.enmnitid = this.enmnitid;
        this.dialogVisible = true;
        this.dialogData.type = type;
      } else if (type == "detail") {
        this.dialogData.title = "预警阈值详情";
        this.dialogData.data = row;
        this.dialogVisible = true;
        this.dialogData.type = type;
      } else if (type == "del") {
        this.multipleSelection = [];
        this.multipleSelection.push(row);
        this.deleteByEnmnitids();
      }
    },
    // 批量删除
    deleteByEnmnitids() {
      let params = [];
      if (this.multipleSelection.length < 1) {
        this.$notify.error({
          title: "失败",
          message: "请选择要删除的预警阈值",
        });
        return;
      }
      this.multipleSelection.forEach((d) => {
        params.push(d.enmnitid);
      });
      deleteByEnmnitids(params).then((res) => {
        if (res.status) {
          this.$notify.success({
            title: "成功",
            message: res.msg,
          });
          this.multipleSelection = [];
          this.getsklist();
        } else {
          this.$notify.error({
            title: "失败",
            message: res.msg,
          });
        }
      });
    },
    //表格序号
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    //每页显示条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.query.size = val;
      this.getsklist();
    },
    //当前属于第几页面
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getsklist();
    },
    //树列表的复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //树列表返回数据
    backData(data) {
      let arr = [];
      data.forEach((e, i, a) => {
        arr.push(e.addvcd);
      });
      if (arr.length > 0) {
        this.currentAddvcd = arr.toString();
      } else {
        this.currentAddvcd = this.$store.state.user.addvcd;
      }
      this.getsklist();

      console.log(data, "水库列表返回的值===");
    },
    //点击高亮返回的值
    backDataNode(data) {
      this.nodeTreeData = data;
      this.currentAddvcd = data.addvcd;
      this.rscd = data.rscd;
      this.getsklist();
    },
    //功能按钮返回数据 add,添加,import 导入,importExcelDemo下载模板,importExcel导出,query搜索
    backClickBtnType(data) {
      console.log(data, "==btn");
      switch (data.type) {
        case "add": //添加
          if (!this.rscd) {
            this.$notify.warning({
              title: "",
              message: "请选择一个水库进行关联",
            });
            return;
          }
          this.dialogVisible = true;
          this.dialogData.title = "添加预警阈值";
          this.dialogData.type = "add";
          this.dialogData.data.rscd = this.rscd;
          break;
        case "import":
          //更新表格列表即可
          this.currentPage = 1;
          this.getsklist();
          break;
        case "importExcelDemo":
          window.location.href = demo;
          break;
        case "importExcel":
          this.download("");
          break;
        case "query":
          this.currentPage = 1;
          this.query.keys = data.data;
          //行政区或水库+搜索内容 调用接口
          this.getsklist();
          break;
        case "del":
          // 删除
          this.deleteByEnmnitids();
          break;
      }
      console.log(data, "点击操作按钮");
    },
    //对话框返回数据 - 添加，修改成功之后刷新树列表以及表格数据并且置空弹框数据
    backDialogData(data) {
      this.data.ifUpdateData = data;
      this.dialogData.data = {};
      this.currentPage = 1;
      this.getsklist();
    },
    //模板下载  type=demo
    download(type) {
      let column = [];
      tabHeader01.forEach((e) => {
        column.push({ title: e.label, key: e.prop, type: "text" });
      });
      // column.push({ title: "巡检示意图", key: "imagePath", type: "image" });
      const excelName = "预警阈值";
      console.log(this.tableData, "表格0");
      //导出表格值null处理‘’,特殊字符处理
      this.tableData.forEach((e, i) => {
        // if (e.imagePath) {
        //   e.imagePath = previewUrl + e.imagePath;
        // }
        tabHeader01.forEach((a) => {
          if (Number(e.matrl) == a.value) {
            e.matrl = a.label;
          }
        });
        tabHeader01.forEach((a) => {
          if (Number(e.nsType) == a.value) {
            e.nsType = a.label;
          }
        });
        tabHeader01.forEach((a) => {
          if (Number(e.tegr) == a.value) {
            e.tegr = a.label;
          }
        });

        tabHeader01.forEach((b) => {
          if (e[b.prop] == null) {
            e[b.prop] = "";
          }
        });
      });

      console.log(this.tableData, "表格1");
      table2excel(column, this.tableData, excelName);
    },
    handleClick(val) {
      console.log(val, "handleclick---val");
      this.enmnit = val.name;
      this.findEarlyWarnConfByPage();
      switch (val.name) {
        case "first":
          this.dataBtn.titleInput = "断面名称";
          this.dataBtn.conInput = "请输入断面名称查询";
          break;
        case "second":
          this.dataBtn.titleInput = "水库名称";
          this.dataBtn.conInput = "请输入水库名称查询";
          break;
        case "02":
          this.dataBtn.titleInput = "水平监测点";
          this.dataBtn.conInput = "请输入水平监测点查询";
          break;
        case "01":
          this.dataBtn.titleInput = "垂直监测点";
          this.dataBtn.conInput = "请输入垂直监测点查询";
          break;
        case "five":
          this.dataBtn.titleInput = "坝基监测点";
          this.dataBtn.conInput = "请输入坝基监测点查询";
          break;
        case "six":
          this.dataBtn.titleInput = "渗流监测点";
          this.dataBtn.conInput = "请输入渗流监测点查询";
          break;
      }
    },
    // 通过水库编码获取所有的监测项目
    async getEnmnitsByRSCD() {
      let self = this;
      let params = {
        rscd: this.rscd,
      };
      self.tabList = [];
      let { status, data, msg } = await getEnmnitsByRSCD(params);
      if (status) {
        if (data.length > 0) {
          data.forEach((item) => {
            // item.orangeVal = "--";
            // item.redVal = "--";
            monitorProjecOptions.forEach((ite) => {
              if (item == ite.value && item != "99") {
                self.tabList.push(ite);
              }
            });
          });

          self.activeName = data.length > 0 ? data[0] : "01";
          self.enmnit = data.length > 0 ? data[0] : "01";
          switch (self.enmnit) {
            case "01":
              self.tableHeader = tabHeader01;
              break;
            case "04":
              self.tableHeader = tabHeader04;
              break;
            case "05":
              self.tableHeader = tabHeader05;
              break;
            case "11":
              self.tableHeader = tabHeader11;
              break;
          }
          self.findEarlyWarnConfByPage();
          //"tabHeader" + self.enmnit;
          console.log(self.tabList, "this.tabList", self.tableHeader, "self.tableHeader");
        }
      }
    },
    // 查询测站阈值配置列表
    async findEarlyWarnConfByPage() {
      let self = this;
      let params = {
        rscd: this.rscd,
        enmnit: this.enmnit,
        pageNo: this.currentPage,
        pageSize: this.query.size,
      };
      self.tableData = [];
      let { status, data, msg, total } = await findEarlyWarnConfByPage(params);
      if (status == true) {
        debugger;
        data.forEach((item) => {
          if (item.iotBizWarnRules && item.iotBizWarnRules.length > 0) {
            let iotBizWarnRules = item.iotBizWarnRules;
            let iotBizWarnRuleLevels = iotBizWarnRules[0].iotBizWarnRuleLevels;
            if (iotBizWarnRuleLevels.length > 0) {
              iotBizWarnRuleLevels.forEach((ite) => {
                if (ite.triggerLevel == 4) {
                  item.redVal = ite.iotBizWarnRuleTriggers[0].triggerValue;
                } else if (ite.triggerLevel == 3) {
                  item.orangeVal = ite.iotBizWarnRuleTriggers[0].triggerValue;
                } else if (ite.triggerLevel == 2) {
                  item.yellowVal = ite.iotBizWarnRuleTriggers[0].triggerValue;
                } else if (ite.triggerLevel == 1) {
                  item.blueVal = ite.iotBizWarnRuleTriggers[0].triggerValue;
                }
              });
            }
          }
        });
        self.total = total;
        self.tableData = data;
        console.log(self.tableData, "self.tableData--------87654321");
      }
    },
  },
  watch: {
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.findEarlyWarnConfByPage();
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.warnInfoList {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  .right {
    margin: 0rem;
    margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    >>> .el-header {
      height: 30px !important;
    }
  }
  .el-aside {
    width: 2.4rem !important;
    background: rgb(255, 255, 255);
  }
  >>> .el-dialog__body {
    padding-top: 0.15rem !important;
  }
  .el-main {
    overflow: hidden;
  }
  .tb {
    padding: 0.2rem 0;
  }
}
</style>
