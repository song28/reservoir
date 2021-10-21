<!--
 * @Author: song
 * @LastEditors: --
 * @Date: 2021-08-26 15:44:01
 * @LastEditTime: 2021-08-31 11:49:22
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\reservoirManagement\siteManagement\components\siteMain.vue
 * @Description: 暂无
-->
<template>
  <div class="siteMain">
    <!-- 水库名称、工程部位、监测类别、监测项目--树 -->
    <div class="barTree">
      <siteBarTree
        ref="barTree"
        :data="siteTreedata"
        @backDataChecked="backDataFun"
        @backDataNode="backDataNodeFun"
      ></siteBarTree>
    </div>

    <div class="siteMain-table">
      <el-table
        stripe
        :data="tableData"
        v-loading="tableLoading"
        border
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
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
                  v-model="scope.row.prop"
                  active-color="#13ce66"
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
    <div class="tabmain">
      <el-tabs v-model="activeName" tab-position="top" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="basic"> </el-tab-pane>
        <el-tab-pane label="参数信息" name="parameter"> </el-tab-pane>
        <el-tab-pane label="附件信息" name="accessory"> </el-tab-pane>
      </el-tabs>
      <div class="tab_content">
        <components :is="activeName" :data="comonData" @on-back="backFun"></components>
      </div>
    </div>
  </div>
</template>
<script>
import siteBarTree from "@/views/shuiku/components/tree/siteBarTree";

import { siteListHeader } from "../../apiConfig";
import { getMonitPointList, getMonitPointDetail, deleteMonitPoint } from "../../api";
import basic from "./basic"; //基础信息
import parameter from "./parameter"; //参数信息
import accessory from "./accessory"; //附件信息
export default {
  props: ["data"],
  components: { siteBarTree, basic, parameter, accessory },
  data() {
    return {
      siteTreedata: {
        //树列表配置
        type: 1,
        title: "",
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false,
        rscd: "",
        isRefresh: "00",
      },
      comonData: {
        type: "add", //add添加  update修改  detail 查看
        rscd: "",
        data: {},
        nodeTreeData: {},
      },
      tableData: [],
      tableHeader: [],
      activeName: "basic",
      tableLoading: false,
      multipleSelection: [],
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      currentPage: 1,
      query: {
        size: 20,
      },
      rowData: {},
    };
  },

  methods: {
    //树列表返回数据
    backDataFun(data) {},
    //点击高亮返回的值
    backDataNodeFun(data) {
      this.comonData.nodeTreeData = JSON.parse(JSON.stringify(data));
      this.comonData.data = JSON.parse(JSON.stringify(data));
      this.comonData.type = "add";

      console.log(this.comonData, "gaoliang");
      this.getMonitPointList();
      // if (data.enmnitid) {

      // }
    },
    handleClick() {},
    backFun() {
      this.getMonitPointList();
      // this.getMonitPointDetail();
      // this.siteTreedata.isRefresh = new Date().getTime();
    },
    //树列表的复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //表格序号
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    // 查询测点列表
    getMonitPointList() {
      let params = {
        rscd: this.comonData.nodeTreeData.rscd
          ? this.comonData.nodeTreeData.rscd
          : this.comonData.rscd, //"00000000061",
        posid: this.comonData.nodeTreeData.posid,
        enmnit: this.comonData.nodeTreeData.enmnit,
        monittyp: this.comonData.nodeTreeData.monittyp,
        // enmnitid: this.comonData.nodeTreeData.enmnitid,
      };
      getMonitPointList(params).then((res) => {
        if (res.status) {
          this.tableData = res.obj;
        }
      });
    },
    // 表格点击触发事件
    handleRowClick(row) {
      this.rowData = row;

      this.getMonitPointDetail();
    },
    // 查询测点的详细信息
    async getMonitPointDetail() {
      let params = {
        enmnitcode: this.rowData.enmnit,
        id: this.rowData.id,
      };
      let { status, obj, msg } = await getMonitPointDetail(params);
      if (status) {
        this.comonData.data = obj;
        this.comonData.type = "detail";
        // this.$notify.success({
        //   title: "成功",
        //   message: msg,
        // });
      } else {
        // this.$notify.error({
        //   title: "失败",
        //   message: msg,
        // });
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
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 获取增删改查
    getType(type) {
      switch (type) {
        case "add":
          this.comonData.type = type;
          break;
        case "update":
          this.comonData.type = type;
          break;
        case "del":
          if (!this.rowData.id) {
            this.$notify.error({
              title: "失败",
              message: "请选中测点",
            });
          }
          this.deleteMonitPoint();
          break;
        default:
          console.log("default");
      }
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
        console.log(val, "val.type----sitemain");
        this.comonData.rscd = val.nodeTreeData.rscd;
        this.siteTreedata.rscd = val.nodeTreeData.rscd;
        this.getType(val.type);
        this.getMonitPointList();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.siteMain {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
  .barTree {
    width: 200px;
    height: 100%;
    overflow: auto;
  }
  .siteMain-table {
    width: 350px;
  }
  .tabmain {
    width: calc(100% - 550px);
    .tab_content {
      height: calc(100% - 40px);
      overflow: auto;
    }
  }
}
</style>
