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
          <siteMain
            :data="mainData"
            @on-siteBack="siteBack"
            @on-updateType="updateType"
          ></siteMain>
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
import siteMain from "./components/siteMain";
import skDialog from "../common/skDialog";

import { formatDate } from "@/utils/time";
import {
  getReservoirListByPage,
  model,
  getBaseInfoById,
  skPatrolRecordFile4ZipByMonth,
} from "../api";
import {
  tbskListHeader,
  skListSizeTypeOptions,
  skListOpenTypeOptions,
  skListBarTypeOptions,
  monitorProjectHeader, //监测项目列表
} from "../apiConfig";
import table2excel from "js-table2excel";
import { demo, previewUrl, outNetZip } from "@/api/base.js";

export default {
  components: { damLeftTreeBar, Btns, siteMain, skDialog },
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      tableData: [],
      dialogData: {
        //弹框配置
        activeName: "fromSite", //", //添加、修改、详情表单页面名称
        title: "111", //弹框标题
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
        ifSetCurrent: true,
      },
      dataBtn: {
        //功能按钮配置
        pageType: "skList",
        model: 2,
        titleInput: "测点名称",
        conInput: "请输入测点名称查询",
        width: "200px",
        add: true,
        update: true,
        query: true,
        import: false,
        importType: true, //true代表单个，false代表多个
        importExcel: true,
        importExcelDemo: false,
        del: true,
      },
      currentAddvcd: "",
      nodeTreeData: {},
      arrToStr: "",
      mainData: {
        nodeTreeData: {},
        query: {},
        type: "", //add添加  update修改  detail 查看
        isRefresh: "66", //时间戳
        mpname: "",
      },
      siteRowData: {},
      rscd: "",
    };
  },
  mounted() {
    this.currentAddvcd = this.$store.state.user.addvcd;
    let tbh = [];
    monitorProjectHeader.forEach((e) => {
      if (e.show) {
        tbh.push(e);
      }
    });
    this.tableHeader = tbh;
  },
  methods: {
    //表格操作
    async handleRow(row, type) {
      this.dialogData.type = type;
      if (type == "update") {
        let { msg, status, data } = await getBaseInfoById({
          gid: row.gid,
        });
        if (status) {
          this.dialogData.title = "修改测点";
          this.dialogData.data = data;
          this.dialogVisible = true;
        }
      } else if (type == "detail") {
        this.dialogData.title = "测点详情";
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
    },
    //当前属于第几页面
    handleCurrentChange(val) {
      this.currentPage = val;
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
    },
    //点击高亮返回的值
    backDataNode(data) {
      this.nodeTreeData = data;
      this.mainData.nodeTreeData = data;
      this.rscd = data.rscd;
      console.log(data, "点击高亮返回的值");
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
          this.dialogVisible = true;
          this.dialogData.title = "添加测点";
          this.dialogData.type = "add";
          this.dialogData.data.rscd = this.rscd;

          break;
        case "import":
          //更新表格列表即可
          this.currentPage = 1;
        case "importExcelDemo":
          window.location.href = demo;
          break;
        case "importExcel":
          this.mainData.type = "importExcel";
          this.mainData.isRefresh = new Date().getTime();
          break;
        case "query":
          this.currentPage = 1;
          this.query.keys = data.data;
          this.mainData.mpname = data.data;
          this.mainData.isRefresh = new Date().getTime();
          //行政区或水库+搜索内容 调用接口

          break;
        case "update":
          if (this.siteRowData.id) {
            this.dialogVisible = true;
            this.dialogData.title = "修改测点";
            this.dialogData.type = "update";
            this.dialogData.data = this.siteRowData;
            this.dialogData.data.rscd = this.rscd;
          } else {
            this.$notify.warning({
              title: "",
              message: "请选择一个测点",
            });
            return;
          }
          // this.mainData.isRefresh = new Date().getTime();
          // this.mainData.type = "update";
          break;
        case "del":
          this.mainData.isRefresh = new Date().getTime();
          this.mainData.type = "del";
          break;
      }
    },
    // 监听测点点击返回的数据
    siteBack(val) {
      this.siteRowData = val;
    },

    //对话框返回数据 - 添加，修改成功之后刷新树列表以及表格数据并且置空弹框数据
    backDialogData(data) {
      this.data.ifUpdateData = data;
      this.dialogData.data = {};
      this.currentPage = 1;
    },
    //模板下载  type=demo
    download(type) {
      let column = [];
      tbskListHeader.forEach((e) => {
        column.push({ title: e.label, key: e.prop, type: "text" });
      });
      // column.push({ title: "巡检示意图", key: "imagePath", type: "image" });
      const excelName = "水库列表";
      //导出表格值null处理‘’,特殊字符处理
      this.tableData.forEach((e, i) => {
        // if (e.imagePath) {
        //   e.imagePath = previewUrl + e.imagePath;
        // }
        skListBarTypeOptions.forEach((a) => {
          if (Number(e.matrl) == a.value) {
            e.matrl = a.label;
          }
        });
        skListOpenTypeOptions.forEach((a) => {
          if (Number(e.nsType) == a.value) {
            e.nsType = a.label;
          }
        });
        skListSizeTypeOptions.forEach((a) => {
          if (Number(e.tegr) == a.value) {
            e.tegr = a.label;
          }
        });

        tbskListHeader.forEach((b) => {
          if (e[b.prop] == null) {
            e[b.prop] = "";
          }
        });
      });

      table2excel(column, this.tableData, excelName);
    },
    updateType(val) {
      this.mainData.type = val;
    },
  },
  watch: {},
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
