<!--
 * @Author: song
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-26 15:44:01
 * @LastEditTime: 2021-10-18 14:28:47
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\reservoirManagement\siteManagement\components\siteTable.vue
 * @Description: 暂无
-->
<template>
  <div class="">
    <el-table
      stripe
      ref="siteTable"
      :data="tableData"
      v-loading="tableLoading"
      border
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      :height="tableHeight"
    >
      <el-table-column v-if="isSelection" type="selection" width="55">
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        :index="table_index"
        width="50"
        align="center"
      ></el-table-column>
      <template v-for="(item, index) in tableHeader">
        <el-table-column
          v-if="item.prop == 'workstatus'"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.workstatus"
                active-color="#13ce66"
                active-value="1"
                inactive-color="#ff4949"
                disabled
              >
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import { siteListHeader, monitorProjecOptions } from "../../apiConfig";
import {
  getMonitPointList,
  getMonitPointDetail,
  deleteMonitPoint,
  getRsrSectionInfo,
  deleteSyParameters,
} from "../../api";
import bus from "@/utils/bus";
import table2excel from "js-table2excel";

export default {
  props: ["data"],
  components: {},
  data() {
    return {
      tableLoading: false,
      tableData: [],
      isSelection: false,
      tableHeader: [],
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      query: {
        size: 20,
      },
      currentPage: 1,
      rowData: {},
    };
  },

  methods: {
    // 查询测点列表   测站---表格列表
    getMonitPointList() {
      let params = {
        rscd: this.data.nodeTreeData.rscd
          ? this.data.nodeTreeData.rscd
          : this.data.rscd, //"00000000061",
        posid: this.data.nodeTreeData.posid,
        enmnit: this.data.nodeTreeData.enmnit,
        monittyp: this.data.nodeTreeData.monittyp,
        mpname: this.data.mpname,
      };
      getMonitPointList(params).then((res) => {
        if (res.status) {
          this.tableData = res.obj;
          if (res.obj.length > 0) {
            res.obj.forEach((item) => {
              monitorProjecOptions.forEach((ite) => {
                if (item.enmnit == ite.value) {
                  item.enmnitName = ite.label;
                }
              });
            });
            this.$refs.siteTable.setCurrentRow(this.tableData[0]);
            this.$emit("on-siteClickBack", this.tableData[0]);
            this.rowData = this.tableData[0];
            bus.$emit("rowData", this.tableData[0]);
          } else {
            this.$emit("on-siteClickBack", {});
          }
        }
      });
    },
    // 查询断面下测点列表
    getRsrSectionInfo() {
      let self = this;
      let params = {
        // rscd: this.data.nodeTreeData.rscd ? this.data.nodeTreeData.rscd : this.data.rscd, //"00000000061",
        // posid: this.data.nodeTreeData.posid,
        // enmnit: this.data.nodeTreeData.enmnit,
        enmnitid: self.data.nodeTreeData.enmnitid,
        // monittyp: this.data.nodeTreeData.monittyp,
      };
      getRsrSectionInfo(params).then((res) => {
        if (res.status) {
          self.tableData = res.obj;
          self.$nextTick(() => {
            res.obj.forEach((d) => {
              if (d.selected) {
                self.$refs.siteTable.toggleRowSelection(d);
              }
            });
          });
          let obj = {
            noPam: true,
          };
          bus.$emit("rowData", obj);

          // if (res.obj.length > 0) {
          //   this.$refs.siteTable.setCurrentRow(this.tableData[0]);
          //   bus.$emit("rowData", this.tableData[0]);
          // }
        }
      });
    },

    //树列表的复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let obj = {
        noPam: true,
        multipleSelection: val,
      };
      bus.$emit("rowData", obj);
    },
    //表格序号
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    // 表格点击触发事件
    handleRowClick(row) {
      this.rowData = row;
      this.$emit("on-siteClickBack", row);
      bus.$emit("rowData", row);
      // this.getMonitPointDetail();
    },
    //模板下载  type=demo
    download(type) {
      let column = [];
      this.tableHeader.forEach((e) => {
        column.push({ title: e.label, key: e.prop, type: "text" });
      });
      // column.push({ title: "巡检示意图", key: "imagePath", type: "image" });
      const excelName = "测点列表";
      //导出表格值null处理‘’,特殊字符处理

      table2excel(column, this.tableData, excelName);
      this.$emit("on-updateType", "detail");
    },
    // 获取增删改查
    getType(type) {
      switch (type) {
        case "del":
          if (!this.rowData.id) {
            this.$notify.error({
              title: "失败",
              message: "请选中测点",
            });
          }
          this.deleteMonitPoint();

          break;
        case "update":
          if (!this.rowData.id) {
            this.$notify.error({
              title: "失败",
              message: "请选中测点",
            });
          } else {
            this.$emit("on-siteClickBack", this.rowData);
          }
          break;
        case "importExcel":
          this.download();
          break;
        default:
      }
    },
    // 批量删除项目测点
    async deleteMonitPoint() {
      let params = {
        enmnitcode: this.rowData.enmnit,
        ids: this.rowData.id,
      };
      let { status, data, msg } = await deleteMonitPoint(params);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        console.log(
          this.rowData.monittyp,
          "this.rowData.monittyp",
          this.rowData,
          "this.rowData"
        );
        if (this.rowData.monittyp == "3") {
          this.deleteSyParameters();
        }
        this.$emit("on-updateType", "detail");
        this.getMonitPointList();
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 删除
    async deleteSyParameters() {
      let params = {
        pId: this.rowData.id,
      };
      let { status, obj, msg } = await deleteSyParameters(params);
    },
  },
  created() {
    siteListHeader.forEach((d) => {
      if (d.show) {
        this.tableHeader.push(d);
      }
    });
  },
  mounted() {},
  watch: {
    data: {
      handler(val) {
        console.log(val,'dataTrie====')
        if (val.nodeTreeData.enmnit == "99") {
          this.isSelection = true;
          this.getRsrSectionInfo();
        } else {
          this.isSelection = false;
          this.getMonitPointList();
        }
        this.getType(val.type);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.siteMain {
  width: 100%;
  display: flex;
}
</style>
