<template>
  <div class="skPerson">
    <!-- 水库列表 -->
    <el-container class="con">
      <el-aside>
        <LeftTreeBar
          :data="data"
          @backData="backData"
          @backDataChecked="backDataChecked"
        ></LeftTreeBar>
      </el-aside>
      <el-container class="right">
        <el-header>
          <el-row :gutter="2" class="search">
            <!-- 没有的暂时屏蔽 -->
            <el-col :span="1" style="width: 80px">
              <p style="line-height: 30px">水库关系人</p></el-col
            >
            <el-col :span="2">
              <el-select
                clearable
                v-model="valuePerson"
                size="mini"
                filterable
                placeholder="请选择"
                @change="currentSel"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="1">
              <p style="line-height:30px">
                水库名称
              </p></el-col
            >
            <el-col :span="3"
              ><el-input
                placeholder="请输入查询内容"
                v-model="input"
                clearable
                size="mini"
              >
              </el-input>
            </el-col> -->
            <el-col :span="15" style="margin-left: 10px">
              <Btns :data="dataBtn" @clickBtn="backClickBtnType"></Btns>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteBatch"
                >批量解绑</el-button
              >
            </el-col>
          </el-row>
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
                <template scope="scope">
                  <div
                    v-if="item.prop == 'reservoirNames'"
                    @click="showDetail(scope.row)"
                  >
                    {{ scope.row[item.prop] }}
                  </div>
                  <div v-else>
                    {{ scope.row[item.prop] }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="240" align="center">
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
                    class="btn-table-border red"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'delete')"
                    >解绑</el-button
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
    <Dialog
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      @backDialogData="backDialogData"
      @backDialogDataPop="backDialogDataPop"
    ></Dialog>
  </div>
</template>
<script>
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";

import {
  getReservoirInspctorByPage,
  deleteByInscptorId,
  imporData,
  deleteBatchReservoirInscptor,
  getAllRoles,
  getCurrentUserAllRoles,
  deleteTotalBetch,
  getUserDetailInfoById,
} from "../api";
import { tbskPersonListHeader } from "../apiConfig";
import table2excel from "js-table2excel";

export default {
  components: { LeftTreeBar, Btns, Dialog },
  data() {
    return {
      options: [
        // {
        //   value: "-1",
        //   label: "全部"
        // },
        // {
        //   label: "巡查员",
        //   value: "0"
        // },
        // {
        //   label: "技术专员",
        //   value: "1"
        // },
        // {
        //   label: "巡查责任人",
        //   value: "2"
        // },
        // {
        //   label: "技术责任人",
        //   value: "3"
        // },
        // {
        //   label: "行政责任人",
        //   value: "4"
        // }
      ],
      valuePerson: "",
      dialogVisible: false,
      tableLoading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      tableData: [],
      dialogData: {
        title: null, //弹框标题
        type: null, //操作添加，修改
        data: {}, //数据
        pageType: "skPersonList", //页面类型
      },
      query: {
        keys: "",
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
        ifShowCheckBox: true,
        ifclickNodeCheck: true,
      },
      backTreeData: {},
      dataBtn: {
        //功能按钮配置
        pageType: "skPersonList",
        model: 2,
        config: true,
        titleInput: "人员名称",
        width: "200px",
        conInput: "请输入人员名称查询",
        add: true,
        query: true,
        import: false,
        importExcel: true,
        importExcelDemo: false,
      },
      addvcd: "",
      gid: "",
      selectedTbData: [],
    };
  },
  mounted() {
    let tbh = [];
    tbskPersonListHeader.forEach((e) => {
      if (e.show) {
        tbh.push(e);
      }
    });
    this.tableHeader = tbh;
    // this.tableHeader = tbskPersonListHeader;
    this.addvcd = this.$store.state.user.addvcd || "430181000000";
    this.getskPersonlist();
    this.getRoles({});
  },
  methods: {
    showDetail(data) {
      console.log(data, "列表===");
      this.dialogData.type = "delete";
      this.dialogData.title = "解绑水库";
      this.dialogData.data = data;
      this.dialogVisible = true;
    },
    deleteBatch() {
      if (this.selectedTbData.length > 0) {
        let inscptorIds = [];
        let roleIds = [];
        this.selectedTbData.forEach((e) => {
          inscptorIds.push(e.inscptorId);
          roleIds.push(e.roleId);
        });
        this.$confirm("是否执行批量解绑命令?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            try {
              let { msg, data, status, total } = await deleteTotalBetch({
                inscptorIds: inscptorIds.toString(),
                roleIds: roleIds.toString(),
              });
              if (status) {
                this.$notify.success({
                  title: "成功",
                  message: msg,
                });
                this.currentPage = 1;
                this.getskPersonlist();
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
              message: "已取消解绑",
              type: "warning",
            });
          });
      } else {
        this.$notify.info({
          title: "消息",
          message: "无可解绑数据",
        });
      }

      // deleteBatchReservoirInscptor()
    },
    //获得表格数据
    async getskPersonlist() {
      this.tableData = [];
      let pam = {
        roleId: this.valuePerson,
        name: this.query.keys,
        pac: this.addvcd,
        reservoirIds: this.gid,
        pageNum: this.currentPage,
        pageSize: this.query.size,
      };
      this.tableLoading = true;
      try {
        let { msg, data, status, total } = await getReservoirInspctorByPage(pam);
        if (status) {
          data.forEach((e) => {
            let arr = e.reservoirNames.split(",");
            if (arr.length > 1) {
              e.reservoirNames = "（共" + arr.length + "个水库）" + arr[0] + "...";
            } else {
              e.reservoirNames = arr[0];
            }
          });
          this.tableData = data;
          this.total = total;
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
    //获取管理水库
    async getRoles(pam) {
      this.options = [];
      let { msg, data, status, total } = await getCurrentUserAllRoles(pam);
      if (status) {
        data.forEach((e) => {
          this.options.push({ label: e.name, value: e.id });
        });
      }
    },
    //人员列表详情
    async getDetail(id, uid) {
      let { msg, data, status, total } = await getUserDetailInfoById({
        inscptorId: id,
        roleId: uid,
      });
      if (status) {
        return data;
      }
    },
    async handleRow(row, type) {
      this.dialogData.type = type;
      if (type == "update") {
        let a = await this.getDetail(row.inscptorId, row.roleId);
        this.dialogVisible = true;
        this.dialogData.title = "修改人员";
        this.dialogData.type = "update";
        this.dialogData.data = a;
      } else if (type == "detail") {
        this.dialogData.title = "水库人员配置详情";
        let a = await this.getDetail(row.inscptorId, row.roleId);
        a.reservoirNames = row.reservoirNames;
        this.dialogData.data = a;
        this.dialogVisible = true;
      } else if (type == "delete") {
        //弹框
        this.dialogData.title = "解绑水库";
        this.dialogData.data = row;
        this.dialogVisible = true;
      }
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.size = val;
      this.getskPersonlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getskPersonlist();
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.selectedTbData = [];
      console.log(val, "====dett打发打发");
      this.selectedTbData = val;
    },
    //点击高亮返回的值
    backDataChecked(data) {
      console.log("2222222222", data);
      let arr = [];
      data.forEach((e) => {
        if (!e.children) {
          arr.push(e.gid);
        }
      });
      if (arr.length > 0) {
        this.addvcd = "";
      }
      this.gid = arr.toString();
      this.currentPage = 1;
      this.getskPersonlist();
    },
    backData(data) {
      // console.log(data, "树列表返回的值===");
      // this.backTreeData = {};
      this.backTreeData = data;

      console.log("1111111111111");
      // console.log(this.addvcd, "===", arr);
    },
    //功能按钮
    backClickBtnType(data) {
      let skidArr = [];
      if (this.backTreeData.checkData) {
        if (this.backTreeData.checkData.checkedNodes) {
          skidArr = this.getSelSkId(this.backTreeData.checkData.checkedNodes);
        }
      }
      switch (data.type) {
        case "add": //添加
          if (skidArr.length > 0) {
            this.dialogVisible = true;
            this.dialogData.title = "添加人员并配置所管理水库";
            this.dialogData.type = "add";
            this.dialogData.data = {
              sk: skidArr,
            };
          } else {
            this.$notify({
              title: "警告",
              message: "请选择至少一个水库进行关联",
              type: "warning",
            });
          }

          break;
        case "import": //导入
          console.log(data);
          //更新表格列表即可
          break;
        case "importExcelDemo": //下载模板
          window.location.href = "url";
          // this.download("demo");
          break;
        case "importExcel": //导出
          this.download("");
          break;
        case "query": //搜索
          this.query.keys = data.data;
          this.currentPage = 1;
          this.getskPersonlist();
          break;
        case "config": //配置
          if (skidArr.length > 0) {
            this.dialogData.data = {
              sk: skidArr,
            };
            this.dialogVisible = true;
            this.dialogData.title = "配置水库";
            this.dialogData.type = "config";
          } else {
            this.$notify({
              title: "警告",
              message: "请选择至少一个水库进行配置",
              type: "warning",
            });
          }
          break;
      }
      console.log(data, "点击操作按钮");
    },
    //对话框返回数据并且保留页面数据，保留【解绑】
    backDialogDataPop(data) {
      this.dialogData.title = "解绑水库";
      this.dialogData.data = data;
      this.dialogVisible = true;
    },
    //对话框返回数据
    backDialogData(data) {
      this.dialogData.data = {};
      this.currentPage = 1;
      this.getskPersonlist({
        pageNum: this.currentPage,
        pageSize: this.query.size,
      });
    },
    //模板下载  type=demo
    download(type) {
      if (type == "demo") {
        let column = [];
        tbskPersonListHeader.forEach((e) => {
          column.push({ title: e.label, key: e.prop, type: "text" });
        });
        const excelName = "水库人员列表配置模板";
        table2excel(column, [], excelName);
      } else {
        let column = [];
        tbskPersonListHeader.forEach((e) => {
          column.push({ title: e.label, key: e.prop, type: "text" });
        });
        this.tableData.forEach((e, i) => {
          tbskPersonListHeader.forEach((b) => {
            if (e[b.prop] == null) {
              e[b.prop] = "";
            }
          });
        });
        //图片显示
        const excelName = "水库人员列表配置模板";
        table2excel(column, this.tableData, excelName);
      }
    },
    //树列表--被选中的水库id
    getSelSkId(arr) {
      let newArr = [];
      arr.forEach((e, i, a) => {
        if (!e.children) {
          newArr.push({ label: e.addvnm, value: e.addvcd });
        }
      });
      return newArr;
    },
    currentSel(data) {
      this.getskPersonlist();
    },
  },

  watch: {},
};
</script>
<style lang="scss" scoped>
.skPerson {
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
    width: 2.4rem !important;
    background: #fff;
  }
}
</style>
