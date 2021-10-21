<template>
  <div class="app-container app-container-noHeader">
    <!--<div class="app-container-header">-->
    <!--站点总数：<span class="font-blue">{{query.total}}</span>&nbsp; 个-->
    <!--</div>-->
    <div class="app-container-search">
      <filter-toggler @query="getList"  @reset="resetList" @export="handleExport(0)" :hasMore="false" :hasExport="false" >
      <template slot="first-line">
          <span class="item-label">行政区</span>
          <div class="district_cont">
            <div class="district_input" @click="clickDistrictShow()">{{district_data.ADDVNM}}</div>
            <District @getDistrictDate="getDistrictDate" v-if="districtShow"></District>
          </div>
          <el-form-item label="隐患点名称">
            <el-input v-model="queryData.hiddenPointName" placeholder="请输入名称或编码"></el-input>
          </el-form-item>
          <el-form-item label="监测类型">
            <el-radio-group v-model="queryData.JCCA03A060" size="mini">
              <el-radio-button :label="null">全部</el-radio-button>
              <el-radio-button
                v-for="item in queryConstData.warnLevels"
                :key="item.val"
                :label="item.val"
              >{{item.name}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监测级别">
              <el-radio-group v-model="queryData.JCCA03A060" size="mini">
                <el-radio-button :label="null">全部</el-radio-button>
                <el-radio-button
                  v-for="item in queryConstData.monitorSteps"
                  :key="item.val"
                  :label="item.val"
                >{{item.name}}</el-radio-button>
              </el-radio-group>
          </el-form-item>
        </template>
      </filter-toggler>
    </div>
    <div class="app-container-search">
      <CRUD :showData="showData" @add="add" @del="del" @modification="modification" @exports="Export"></CRUD>
    </div>
    <div class="app-container-body app-container-body-column" ref="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        highlight-current-row
        :height="tableHeight"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{((pageNo - 1) * pageSize) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="隐患点名称" align="center" prop="hiddenPointName" :show-overflow-tooltip="false"></el-table-column>
        <el-table-column label="隐患点编号" align="center" prop="JCCA03A020" :show-overflow-tooltip="false"></el-table-column>
        <el-table-column label="监测点名称" align="center" prop="JCCA03A011" :show-overflow-tooltip="false"></el-table-column>
        <el-table-column label="监测点编号" align="center" prop="JCCA03A010" :show-overflow-tooltip="false"></el-table-column>
        <el-table-column label="监测仪器编号" align="center" prop="JCCA03A030"></el-table-column>
        <el-table-column label="监测方法" width="60" align="center" prop="JCCA03A040"></el-table-column>
        <el-table-column label="监测部位" align="center" prop="JCCA03A050"></el-table-column>
        <el-table-column label="监测内容" width="60" align="center" prop="JCCA03A060"></el-table-column>
        <el-table-column label="建设单位" width="120" align="center" prop="JCCA03A140"></el-table-column>
        <el-table-column label="承建单位" width="120" align="center" prop="JCCA03A150"></el-table-column>
        <el-table-column label="运行维护单位" width="120" align="center" prop="JCCA03A151"></el-table-column>
        <el-table-column label="责任人" width="80" align="center" prop="JCCA03A160"></el-table-column>
        <el-table-column label="备注" width="60" align="center" prop="JCCA03A170"></el-table-column>
        <el-table-column label="监测级别" width="60" align="center" prop="JCCA03A041"></el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page.sync="pageNo"
        :limit.sync="pageSize"
        @pagination="getList"
      />
    </div>

    <site-dialog
      :data="dialogData"
      v-if="dialogData.dialogVisible"
      @on-close="dialogData.dialogVisible = false"
    ></site-dialog>
  </div>
</template>

<script>
import { getIOTSQL, getIOTSQLPage } from "@/utils/sqlAjaxUtil";
import { getitemsbydict } from "@/api/deviceBase";

import { getInstallList } from "../api";
import siteDialog from "../components/dialog";

export default {
  components: {
    siteDialog
  },
  data() {
    return {
      loading: false,
      tableHeight: null,
      queryConstData: { 
        warnLevels: [
          {name:"雨量",val:"YL"},
          {name:"表面位移",val:"GP"},
          {name:"拉线位移",val:"LF"}
        ], 
        monitorSteps: [
          {name:"小型",value:"小型"},
          {name:"中型",value:"中型"},
          {name:"大型",value:"大型"},
        ] },
        
      pageNo: 1,
      pageSize: 20,
      total: 0,
      queryData: { JCCA02A040: null, JCCA02A060: null, hiddenPointName: null ,addvcd:null},

      tableLoading: false,

      tableData: [],
      dialogData: {
        name: "install",
        device: null,
        title: null,
        dialogVisible: false
      },
      
      districtShow: false,
      district_data: {},

      showData:{
        add:true,
        modification:true,
        del:true,
        export:true,
        importData:true
      }
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight =
        this.$refs.tab.clientHeight -
        38 -
        (window.innerWidth / 1920) * 100 * 0.54 +
        "px";

      // this.getDicts("d8e15c08-60c8-44e5-89f9-fa2049e3e24b", "warnLevels");
      // this.getDicts("cf1fcefb-ffa0-4cd8-86f0-501308afea20", "monitorSteps");
      this.getList();
    });
  },
  methods: {
    add(){
      alert("添加")
    },
    del(){
      alert("删除")
    },
    modification(){
      alert("修改")
    },
    Export(){
      alert("导出")
    },
    getList() {
      let params = {
        start: this.pageNo,
        pageSize:this.pageSize,
        data: this.queryData
      };
      let self = this;
      self.tableLoading = true;
      getIOTSQLPage("jcca03a_table_list", params, true, function(res) {
        if (res.status) {
          self.tableData = res.data ? res.data : [];
          self.total = res.total ? res.total : 0;
          self.tableLoading = false;
        }
      });
    },
    // getDicts(id, key) {
    //   //efacb5e2-0f64-4152-a0b8-f108c21596f8 隐患点级别
    //   let params = { pid: id };
    //   let self = this;
    //   self.tableLoading = true;
    //   getitemsbydict(params).then(res => {
    //     // self.$set(self.queryConstData, key, res.data);
    //   });
    // },

    //重置查询条件
    resetList() {
      for (let key in this.queryData) {
        this.queryData[key] = null;
      }
      this.pageNo = 1;
      this.pageSize = 20;
      this.getList();
    },

    //导出
    handleExport(id) {
      if (id) {
        //id 为真导出单个站点
      }
    },
    
  },
  watch:{
    district_data(val){
      if(val){
        this.queryData.addvcd = val.ADDVCD; 
        this.getList();
      }
    }
  }
};
</script>
<style type="text/scss" lang="scss">
.app-container-body{
  .el-table{
    .cell{
        line-height: 	normal;
        white-space: normal;
    }
  }
}
</style>
