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
      <!-- <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 100, 200, 300, 400]"
        :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
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
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      query: {
        keys: "",
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1
    };
  },
  created() {},

  mounted() {
    this.tableHeader = tbskPersonListHeader;
  },
  methods: {
    async getDetail() {
      let { msg, data, status, total } = await findByInscptorPage({
        id: row.id
      });
      if (status) {
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
            console.log("aaa");
            this.$emit("updateDataRow", this.data);
            // let { msg, data, status, total } = await deleteByInscptorId({
            //   id: row.id
            // });
            // if (status) {
            //   // this.currentPage = 1;
            //   //刷新列表
            //   // this.getskPersonlist();
            // } else {
            //   this.$notify.error({
            //     title: "失败",
            //     message: msg
            //   });
            // }
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
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    //   this.query.size = val;
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   console.log(`当前页: ${val}`);
    // },
    handleSelectionChange(val) {
      console.log(val, "====111");
      this.$emit("updateDataRows", val);
    }
  },
  watch: {
    data: {
      handler: function(newV, oldV) {
        this.tableLoading = false;
        this.tableDataMore = [];
        let arr = newV.reservoirId.split(",");
        let arrName = newV.reservoirNames.split(",");
        arr.forEach((b, i, a) => {
          this.tableDataMore.push({
            inscptorId: newV.inscptorId,
            id: newV.id,
            reservoirId: b,
            name: newV.name,
            roleNames: newV.roleNames,
            mobile: newV.mobile,
            reservoirNames: arrName[i]
          });
        });
        // this.total = arr.length;
        //根据选择人员名称回显其联系方式
        console.log(this.tableDataMore, "data-------------");
      },
      deep: true,
      immediate: true
    },
    tableDataMore: {
      handler: function(newV, oldV) {
        this.$emit("update:data", this.data);
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