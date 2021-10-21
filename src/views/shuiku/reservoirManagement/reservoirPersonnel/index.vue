<template>
  <div class="skList">
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
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'del')"
                    >删除</el-button
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
  personnelDel,
} from "../api";
import {
  tbskListHeader,
  skListSizeTypeOptions,
  skListOpenTypeOptions,
  skListBarTypeOptions,
  personnelHeader, //监测项目列表
  engineeringPartsOptions,
  monitorProjecOptions,
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
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      tableData: [],
      dialogData: {
        //弹框配置
        activeName: "fromPersonnel", //", //添加、修改、详情表单页面名称
        title: "添加人员信息", //弹框标题
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
        titleInput: "人员名称",
        width: "200px",
        conInput: "请输入人员名称查询",
        add: true,
        query: true,
        import: true,
        importExcel: true,
        importExcelDemo: false,
        uploadUrl:
          process.env.VUE_APP_BASE_API_6 + "/personnel/importPersonnel", //上传地址
      },
      currentAddvcd: "",
      nodeTreeData: {},
      arrToStr: "",
      rscd: "", //水库编码
      multipleSelection: [], //选中数据
    };
  },
  mounted() {
    this.currentAddvcd = this.$store.state.user.addvcd;
    let tbh = [];
    personnelHeader.forEach((e) => {
      if (e.show) {
        tbh.push(e);
      }
    });
    this.tableHeader = tbh;
    //默认显示浏阳市下面的所有水库
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
        name: this.query.keys,
        rscd: this.rscd,
        addvcd: this.currentAddvcd,
        page: this.currentPage,
        size: this.query.size,
      };
      this.tableLoading = true;
      this.tableData = [];
      try {
        let { msg, data, status, total } = await loadPersonlist4Page(pam);
        if (status) {
          let list = data;
          this.total = Number(total);

          this.tableData = data;
          this.tableLoading = false;
        } else {
          this.$notify.error({
            title: "失败",
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
        let { msg, data, status, total } = await skPatrolRecordFile4ZipByMonth(
          params
        );
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

    //表格操作
    async handleRow(row, type) {
      this.dialogData.type = type;
      if (type == "update") {
        this.dialogData.title = "修改水库人员";
        this.dialogData.data = row;
        this.$set(this.dialogData, "data", row);
        this.dialogVisible = true;
      } else if (type == "detail") {
        this.dialogData.title = "水库人员详情";
        this.dialogData.data = row;
        this.dialogVisible = true;
      } else if (type == "del") {
        this.multipleSelection = [];
        this.multipleSelection.push(row);
        this.personnelDel();
      }
    },
    // 批量删除
    personnelDel() {
      let params = [];
      if (this.multipleSelection.length < 1) {
        this.$notify.error({
          title: "失败",
          message: "请选择要删除的人员",
        });
        return;
      }
      this.multipleSelection.forEach((d) => {
        params.push(d.enmnitid);
      });
      // 单个删除;
      let pam = {
        id: this.multipleSelection[0].id,
      };

      personnelDel(pam).then((res) => {
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
      this.query.size = val;
      this.getsklist();
    },
    //当前属于第几页面
    handleCurrentChange(val) {
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
    },
    //点击高亮返回的值
    backDataNode(data) {
      this.nodeTreeData = data;
      // this.dialogData.data = data;
      this.currentAddvcd = data.addvcd;
      this.dialogData.data = this.nodeTreeData;
      this.rscd = data.rscd;
      this.getsklist();
    },
    //功能按钮返回数据 add,添加,import 导入,importExcelDemo下载模板,importExcel导出,query搜索
    backClickBtnType(data) {
      switch (data.type) {
        case "add": //添加
          if (!this.rscd) {
            this.$notify.warning({
              title: "",
              message: "请选择一个水库进行关联",
            });
            return;
          }
          this.dialogData.data = this.nodeTreeData;
          this.dialogVisible = true;
          this.dialogData.title = "添加水库人员";
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
          this.personnelDel();
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
      personnelHeader.forEach((e) => {
        column.push({ title: e.label, key: e.prop, type: "text" });
      });
      // column.push({ title: "巡检示意图", key: "imagePath", type: "image" });
      const excelName = "人员列表";
      //导出表格值null处理‘’,特殊字符处理
      this.tableData.forEach((e, i) => {
        // if (e.imagePath) {
        //   e.imagePath = previewUrl + e.imagePath;
        // }
        personnelHeader.forEach((a) => {
          if (Number(e.matrl) == a.value) {
            e.matrl = a.label;
          }
        });
        personnelHeader.forEach((a) => {
          if (Number(e.nsType) == a.value) {
            e.nsType = a.label;
          }
        });
        personnelHeader.forEach((a) => {
          if (Number(e.tegr) == a.value) {
            e.tegr = a.label;
          }
        });

        personnelHeader.forEach((b) => {
          if (e[b.prop] == null) {
            e[b.prop] = "";
          }
        });
      });

      table2excel(column, this.tableData, excelName);
    },
  },
  watch: {
    dialogVisible: {
      handler(val) {
        if (!val) {
          // this.dialogData.data = this.nodeTreeData;
          // this.dialogData.data = this.nodeTreeData;

          this.getsklist();
        } else {
          // this.dialogData.data = {};
          // // this.dialogData.data = this.nodeTreeData;
          // this.dialogData.data.rscd = this.rscd;
          // this.dialogData.data.rsnm = this.nodeTreeData.rsnm;
        }
      },
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
