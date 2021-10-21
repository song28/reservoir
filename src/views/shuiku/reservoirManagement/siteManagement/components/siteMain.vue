<!--
 * @Author: song
 * @LastEditors: --
 * @Date: 2021-08-26 15:44:01
 * @LastEditTime: 2021-09-22 16:43:48
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
      <siteTable
        :data="tablechildData"
        @on-siteClickBack="siteClickBack"
        @on-updateType="updateType"
      ></siteTable>
    </div>
    <div class="tabmain">
      <tabmain :data.sync="comonData"></tabmain>
    </div>
  </div>
</template>
<script>
import siteBarTree from "@/views/shuiku/components/tree/siteBarTree";

import siteTable from "./siteTable"; //表格信息
import tabmain from "./tabmain"; //表格信息

export default {
  props: ["data"],
  components: { siteBarTree, siteTable, tabmain },
  data() {
    return {
      siteTreedata: {
        //树列表配置
        type: 1,
        title: "",
        ifSetCurrent: true, //是否默认高亮
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false,
        rscd: "",
        isRefresh: "00",
      },
      comonData: {
        type: "", //add添加  update修改  detail 查看
        rscd: "",
        data: {},
        nodeTreeData: {},
        isRefresh: "",
      },
      tablechildData: {
        type: "", //add添加  update修改  detail 查看
        rscd: "",
        data: {},
        nodeTreeData: {},
        isRefresh: "",
      },
      multipleSelection: [],
    };
  },

  methods: {
    //树列表返回数据
    backDataFun(data) {},
    //点击高亮返回的值
    backDataNodeFun(data) {
      this.comonData.nodeTreeData = JSON.parse(JSON.stringify(data));
      this.comonData.data = JSON.parse(JSON.stringify(data));
      this.tablechildData.nodeTreeData = JSON.parse(JSON.stringify(data));
      this.tablechildData.data = JSON.parse(JSON.stringify(data));
      this.tablechildData.mpname = this.data.mpname;
    },
    // 点击测点返回的数据
    siteClickBack(val) {
      this.$emit("on-siteBack", val);
    },
    // 修改类型
    updateType(val) {
      this.$emit("on-updateType", val);
    },
  },
  created() {},
  mounted() {},
  watch: {
    data: {
      handler(val) {
        debugger;
        this.siteTreedata.rscd = val.nodeTreeData.rscd;
        this.comonData.rscd = val.nodeTreeData.rscd;
        this.comonData.type = val.type;
        this.comonData.isRefresh = val.isRefresh;
        this.tablechildData.rscd = val.nodeTreeData.rscd;
        this.tablechildData.type = val.type;
        this.tablechildData.isRefresh = val.isRefresh;
        this.tablechildData.mpname = val.mpname;
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
