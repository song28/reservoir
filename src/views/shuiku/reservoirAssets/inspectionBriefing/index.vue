<template>
  <div class="skList">
    <!-- 巡查简报 -->
    <el-container class="con">
      <el-aside>
        <LeftTreeBar :data="data" @backData="backData"></LeftTreeBar>
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
              <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'download')"
                    >下载</el-button
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
      backDialogData="backDialogData"
    ></Dialog>
  </div>
</template>
<script>
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";
import { patrollist, eventBasicInfo, basicInfo, model } from "../api";
import { tbskListHeader } from "../apiConfig";
export default {
  components: { LeftTreeBar, Btns, Dialog },
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      tableData: [
        {
          code: "泉塘水库巡查简报",
          name: "张三",
          lng: "15321525010",
          lat: "--",
          type: "2021/03/21 "
        },
        {
          code: "泉塘水库巡查简报",
          name: "张三",
          lng: "15321525010",
          lat: "--",
          type: "2021/03/21 "
        },
        {
          code: "泉塘水库巡查简报",
          name: "张三",
          lng: "15321525010",
          lat: "--",
          type: "2021/03/21 "
        },
        {
          code: "泉塘水库巡查简报",
          name: "张三",
          lng: "15321525010",
          lat: "--",
          type: "2021/03/21 "
        }
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
        pageType: "skList" //页面类型
      },
      query: {
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1,
      input: "",
      data: {
        type: 2,
        title: "水库列表",
        ifShowCheckBox: false
      },
      dataBtn: {
        model: 1,
        titleInput: "简报名称",
        add: false,
        query: true,
        import: false,
        importExcel: false,
        importExcelDemo: false
      }
    };
  },
  mounted() {
    // let that = this;
    // that.getPatrollist({
    //   page: 1,
    //   size: 10,
    //   type: 0
    // });
    this.tableHeader = tbskListHeader;
  },
  methods: {
    //获得表格数据
    async getPatrollist(pam) {
      this.tableLoading = true;
      this.tableData = [];
      try {
        let { msg, data, status, total } = await patrollist(pam);
        if (status) {
          let list = data;
          this.total = total;
          // Object.keys(list[0]).forEach((e, i) => {
          //   that.tableHeader.push({ label: "aa", prop: e });
          //   return true;
          // });
          this.tableData = list;
          this.tableLoading = false;
        } else {
          this.$message({
            message: msg,
            type: "success"
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleRow(row, type) {
      if (type == "update") {
        this.dialogVisible = true;
        this.dialogData.title = "修改水库";
        this.dialogData.type = "update";
        this.dialogData.data = row;
      } else if (type == "detail") {
      }

      console.log(type, row, "操作");
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
        type: this.type
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
    },
    backClickBtnType(data) {
      switch (data.type) {
        case "add": //添加
          this.dialogVisible = true;
          this.dialogData.title = "添加水库";
          this.dialogData.type = "add";
          break;
        case "importExcelDemo": //下载模板
          let params = {};
          model(params).then(res => {
            if (res.status) {
              window.location = res.data;
            }
          });
          break;
        case "query": //搜索
          break;
      }
      console.log(data, "点击操作按钮");
    }
  }
};
</script>
<style lang='scss' scoped>
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
  }
  .el-aside {
    width: 2.8rem;
    background: #fff;
  }
}
</style>