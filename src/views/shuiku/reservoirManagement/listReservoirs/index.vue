<template>
  <div class="skList">
    <!-- <div id="iframe-container">
      <iframe :src="'http://ops.slhzt.com:16081/#/home/screen?token=13255357c7fa28633e575c134302dc0e22e855a130cdab728fd92ec35328609087bdc5b4d01caf0be9a68bc78965ca74cc83c605424c09c48fcbcc4b73a9dbc7'" scrolling="auto" frameborder="0" id="iframe" width="1000" height="1000"></iframe>
  </div> -->
    
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
        <el-header>
          <Btns :data="dataBtn" @clickBtn="backClickBtnType"></Btns>
        </el-header>
        <el-main>
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
              <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
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
                  <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handlerDownload(scope.row)"
                    >下载月报</el-button
                  > -->
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
      v-if="dialogVisible"
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      @backDialogData="backDialogData"
    ></skDialog>
    <!-- <Dialog
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      @backDialogData="backDialogData"
    ></Dialog> -->
    <el-dialog
      title="月报下载"
      :visible.sync="dialogVisibleFlag"
      width="30%"
      :before-close="handleClose"
    >
      <span>请选择下载月报时间 :</span>
      <el-date-picker
        v-model="monthValue"
        type="month"
        size="small"
        :picker-options="pickerOptions"
        value-format="yyyy-MM"
        :clearable="false"
        placeholder="选择月"
      >
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisibleFlag = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handlerSave">下 载</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";
import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";
import skDialog from "../common/skDialog";

import { formatDate } from "@/utils/time";
import {
  getReservoirListByPage,
  model,
  getBaseInfoById,
  skPatrolRecordFile4ZipByMonth,
  findRsrByPage,
} from "../api";
import {
  tbskListHeader,
  skListSizeTypeOptions,
  skListOpenTypeOptions,
  skListBarTypeOptions,
  skListNewHeader,
  engineeringScaleOptions, // 工程规模
} from "../apiConfig";
import table2excel from "js-table2excel";
import { demo, previewUrl, outNetZip } from "@/api/base.js";

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
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: skListNewHeader,
      tableData: [],
      dialogData: {
        //弹框配置
        activeName: "formSk", //添加、修改、详情表单页面名称
        title: null, //弹框标题
        type: null, //操作add添加，update修改,detail查看
        data: {}, //数据
        pageType: "skList", //页面类型
      },
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
        type: 1,
        title: "行政区",
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false,
      },
      dataBtn: {
        //功能按钮配置
        pageType: "skListNew",
        model: 2,
        titleInput: "水库信息",
        conInput: "请输入水库名称查询",
        width: "200px",
        add: true,
        query: true,
        import: true,
        importType: false, //true代表单个，false代表多个
        importExcel: true,
        importExcelDemo: false,
        uploadUrl: process.env.VUE_APP_BASE_API_6 + "/importSurveyBsin", //上传地址
      },
      currentAddvcd: "",
      nodeTreeData: {},
      arrToStr: "",
    };
  },
  created() {
    // this.currentAddvcd = this.$store.state.user.addvcd;
  },
  mounted() {
    this.currentAddvcd = this.$store.state.user.addvcd;
    console.log(
      this.$store.state,
      "this.$store.state",
      this.currentAddvcd,
      "this.currentAddvcd"
    );
    // 默认显示浏阳市下面的所有水库;
    this.getsklist();
  },
  methods: {
    //   时间
    dealDisabledDate(time) {
      let times = Date.now();
      return time.getTime() > times;
    },
    //获得表格数据
    async getsklist() {
      let pam = {
        codeOrName: this.query.keys,
        addvcd: this.currentAddvcd,
        pageNo: this.currentPage,
        pageSize: this.query.size,
      };
      this.tableLoading = true;
      this.tableData = [];
      try {
        let { msg, data, status, total } = await findRsrByPage(pam);
        if (status) {
          this.tableLoading = false;
          let list = data;
          this.total = total;
          data.forEach((e, i, a) => {
            engineeringScaleOptions.forEach((ite) => {
              if (e.prsc == ite.value) {
                e.prscName = ite.label;
              }
            });
            skListBarTypeOptions.forEach((it) => {
              if (e.dmtp == it.value) {
                e.dmtpName = it.label;
              }
            });
          });
          this.tableData = data;
        } else {
          this.$notify.success({
            title: "成功",
            message: msg,
          });
        }
      } catch (error) {
        console.log(error);
      }
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
    // xiazai月报
    handlerDownload(row) {
      this.dialogVisibleFlag = true;
      this.gid = row.gid;
    },
    //表格操作
    async handleRow(row, type) {
      this.dialogData.type = type;
      if (type == "update") {
        this.dialogData.title = "修改水库";
        this.dialogData.data = row;
        this.dialogVisible = true;
      } else if (type == "detail") {
        this.dialogData.title = "水库详情";
        this.dialogData.data = row;
        this.dialogVisible = true;
      }
    },
    //表格序号
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    //每页显示条数
    handleSizeChange(val) {
      this.query.size = val;
      this.getsklist();
    },
    //当前属于第几页面
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getsklist();
    },
    //树列表的复选框
    handleSelectionChange(val) {},
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
      console.log(data, "树列表返回数据");
    },
    //点击高亮返回的值
    backDataNode(data) {
      this.nodeTreeData = data;
      this.currentAddvcd = data.addvcd;
      this.getsklist();
      console.log(data, "点击高亮返回的值");
    },
    //功能按钮返回数据 add,添加,import 导入,importExcelDemo下载模板,importExcel导出,query搜索
    backClickBtnType(data) {
      switch (data.type) {
        case "add": //添加
          if (this.nodeTreeData.addvnm) {
            this.dialogData.data.town = this.nodeTreeData.addvnm;
            this.dialogData.data.pac = this.nodeTreeData.addvcd;
          }
          this.dialogVisible = true;
          this.dialogData.title = "添加水库";
          this.dialogData.type = "add";
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
      }
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
      skListNewHeader.forEach((e) => {
        column.push({ title: e.label, key: e.prop, type: "text" });
      });
      // column.push({ title: "巡检示意图", key: "imagePath", type: "image" });
      const excelName = "水库列表";
      //导出表格值null处理‘’,特殊字符处理
      this.tableData.forEach((e, i) => {
        skListNewHeader.forEach((b) => {
          if (e[b.prop] == null) {
            e[b.prop] = "";
          }
        });
      });

      table2excel(column, this.tableData, excelName);
      // column = [
      //   { title: "时间", key: "monitortime", type: "text" },
      //   { title: "5分钟雨量(mm)", key: "rainfall", type: "text" },
      //   { title: "小时雨量(mm)", key: "hours", type: "text" },
      //   { title: "日降雨量(mm)", key: "dyp", type: "text" }
      // ];
    },
  },
  watch: {
    dialogVisible: {
      handler(val) {
        if (!val) {
          this.getsklist();
        }
      },
      // immediate: true,
      deep: true,
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
}
</style>
