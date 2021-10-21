<template>
  <div class="maintenanceStandards">
    <!-- 水库列表 -->
    <el-container class="con">
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
              <el-table-column label="操作" width="180" align="center">
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
                    @click.stop="handleRow(scope.row, 'delete')"
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
              :page-sizes="[query.size, 100, 200, 300, 400]"
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
import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";

import {
  getPointLocationListByPage,
  getAllPointLocationList,
  addPointLocation,
  deletePointLocationById,
  patrollist,
} from "../api";
import { tbskStandards } from "../apiConfig";

export default {
  components: { LeftTreeBar, Btns, Dialog },
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
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
        pageType: "skStandards", //页面类型
      },
      query: {
        data: {},
        start: 1,
        size: 20,
      },
      total: 0,
      currentPage: 1,
      input: "",
      dataBtn: {
        model: 1,
        titleInput: "维护点位",
        add: true,
        query: true,
        import: false,
        importExcel: false,
        importExcelDemo: false,
      },
    };
  },
  mounted() {
    this.tableHeader = tbskStandards;
    this.getpointlist({
      pageNum: this.query.start,
      pageSize: this.query.size,
    });
  },
  methods: {
    //获得表格数据
    async getpointlist(pam) {
      this.tableLoading = true;
      this.tableData = [];
      try {
        let { msg, data, status, total } = await getPointLocationListByPage(pam);
        if (status) {
          this.tableData = data;
          this.total = Number(total);
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
    async handleRow(row, type) {
      if (type == "update") {
        this.dialogVisible = true;
        this.dialogData.title = "修改点位";
        this.dialogData.type = "update";
        this.dialogData.data = row;
      } else if (type == "delete") {
        this.$confirm("此操作将删除该点位,并删除对应水库关系, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            try {
              let { msg, data, status, total } = await deletePointLocationById({
                id: row.id,
              });
              if (status) {
                this.getpointlist({
                  pageNum: this.query.start,
                  pageSize: this.query.size,
                });
              } else {
                this.$notify.error({
                  title: "失败",
                  message: msg,
                });
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch(() => {
            this.$notify({
              title: "警告",
              message: "已取消删除",
              type: "warning",
            });
          });
      }

      console.log(type, row, "操作");
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getpointlist({
        pageNum: this.currentPage,
        pageSize: this.size,
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getpointlist({
        pageNum: this.currentPage,
        pageSize: this.query.size,
      });
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      console.log(val, "复选框----");
    },
    backData(data) {
      console.log(data, "树列表返回的值");
    },
    //对话框返回数据
    backDialogData(data) {
      this.dialogData.data = {};
      // 添加，修改成功之后刷新表格数据
      this.currentPage = 1;
      this.getpointlist({
        pageNum: this.currentPage,
        pageSize: this.query.size,
      });
    },
    backClickBtnType(data) {
      switch (data.type) {
        case "add": //添加
          this.dialogVisible = true;
          this.dialogData.title = "添加点位";
          this.dialogData.type = "add";
          break;
        case "query": //搜索
          this.getpointlist({
            name: data.data,
            pageNum: this.query.start,
            pageSize: this.query.size,
          });
          break;
      }
      console.log(data, "点击操作按钮");
    },
  },
};
</script>
<style lang="scss" scoped>
.maintenanceStandards {
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
    // margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    >>> .el-header {
      height: 30px !important;
    }
  }
}
</style>
