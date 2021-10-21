<template>
  <div class="deletePerson">
    <div class="tb">
      <el-table
        stripe
        :data="tableDataMore"
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
        </el-table-column>
        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="scope">
            <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'update')"
                    >修改</el-button
                  > -->
            <el-button
              size="mini"
              class="btn-table-border red"
              style="cursor: pointer"
              type="primary"
              @click.stop="handleRow(scope.row, 'delete')"
              >解绑</el-button
            >
            <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'detail')"
                    >详情</el-button
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
  </div>
</template>
<script>
import { getRegion } from "@/utils";
import {
  getAllRoles,
  getAllUserList,
  getUserRoleByUserId,
  deleteByInscptorId,
  findByInscptorPage,
  deleteBatchReservoirInscptor
} from "../api";
import { tbskPersonListHeader } from "../apiConfig";

export default {
  props: {
    dialogVisible: {
      type: Boolean
    },
    data: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      tableLoading: true,
      tableDataMore: [],
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 120,
      tableHeader: [],
      query: {
        keys: "",
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1,
      inscptorId: "",
      roleId: ""
    };
  },
  created() {},

  mounted() {
    let tbh = [];
    tbskPersonListHeader.forEach(e => {
      if (e.show) {
        tbh.push(e);
      }
    });
    this.tableHeader = tbh;
  },
  methods: {
    async getDetail() {
      this.tableDataMore = [];
      let pam = {
        pageNum: this.currentPage,
        pageSize: this.query.size,
        inscptorId: this.inscptorId,
        roleId: this.roleId
      };
      let { msg, data, status, total } = await findByInscptorPage(pam);
      if (status) {
        this.tableLoading = false;
        this.tableDataMore = data;
        this.total = total;
        // this.currentPage = 1;
        //刷新列表
        // this.getskPersonlist();
      } else {
        this.$notify.error({
          title: "失败",
          message: msg
        });
      }
    },
    async handleRow(row, type) {
      if (type == "delete") {
        //弹框
        this.$confirm("是否执行解绑命令?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let {
              msg,
              data,
              status,
              total
            } = await deleteBatchReservoirInscptor({
              ids: row.id
            });
            if (status) {
              this.$notify.success({
                title: "成功",
                message: msg
              });
              this.currentPage = 1;
              //刷新列表
              this.getDetail();
            } else {
              this.$notify.error({
                title: "失败",
                message: msg
              });
            }
          })
          .catch(() => {
            this.$notify({
              title: "警告",
              message: "已取消解绑",
              type: "warning"
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
      this.query.size = val;
      this.getDetail();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDetail();
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      console.log(val, "====111");
      this.$emit("updateDataRows", val);
    }
  },
  watch: {
    data: {
      handler: function(newV, oldV) {
        this.inscptorId = newV.inscptorId;
        this.roleId = newV.roleId;
        this.getDetail();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style  lang='scss' scoped>
.deletePerson {
}
</style>