<template>
  <div class="app-container app-container-noHeader">
    <!--<div class="app-container-header">-->
    <!--站点总数：<span class="font-blue">{{query.total}}</span>&nbsp; 个-->
    <!--</div>-->
    <div class="app-container-search">
      <filter-toggler
        @query="getList"
        @reset="resetList"
        @export="handleExport(0)"
        :hasMore="false"
        :hasExport="false"
      >
        <template slot="first-line">
          <span class="item-label">行政区</span>
          <div class="district_cont">
            <div class="district_input" @click="clickDistrictShow()">{{district_data.ADDVNM}}</div>
            <District @getDistrictDate="getDistrictDate" v-if="districtShow"></District>
          </div>
          <el-form-item label="隐患点名称">
            <el-input v-model="queryData.hiddenPointName" placeholder="请输入名称或编码"></el-input>
          </el-form-item>
          <el-form-item label="监测阶段">
            <el-radio-group v-model="queryData.JCCA02A040" size="mini">
              <el-radio-button :label="null">全部</el-radio-button>
              <el-radio-button
                v-for="item in monitorSteps"
                :key="item.value"
                :label="item.value"
              >{{item.name}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监测级别">
            <el-radio-group v-model="queryData.JCCA02A060" size="mini">
                <el-radio-button :label="null">全部</el-radio-button>
                <el-radio-button
                  v-for="item in warnLevels"
                  :key="item.value"
                  :label="item.value"
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
        @selection-change="getRow"
        ref="Table"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{((pageNo - 1) * pageSize) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="行政区" align="center" prop="addvnm"></el-table-column>
        <el-table-column label="隐患点名称" width="320" align="center" prop="hiddenPointName"></el-table-column>
        <el-table-column label="隐患点编号" align="center" prop="JCCA02A010"></el-table-column>
        <el-table-column label="群测群防监测点数" align="center" prop="JCCA02A020"></el-table-column>
        <el-table-column label="专业监测点数" align="center" prop="JCCA02A030"></el-table-column>
        <el-table-column label="监测阶段" align="center" prop="JCCA02A040"></el-table-column>
        <el-table-column label="防灾预案编制情况" align="center" prop="JCCA02A050"></el-table-column>
        <el-table-column label="监测级别" width="80" align="center" prop="JCCA02A060"></el-table-column>
        <el-table-column label="责任人姓名" width="80" align="center" prop="JCCA05A020"></el-table-column>
        <el-table-column label="职务" align="center" prop="JCCA05A050"></el-table-column>
        <el-table-column label="备注" align="center" prop="JCCA02A080"></el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page.sync="pageNo"
        :limit.sync="pageSize"
        @pagination="getList"
      />
    </div>
    <el-dialog :title="formData.title?formData.title:'详情'" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="formData"  label-width="80px">
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="行政区" label-width="140px">
              <div class="district_cont">
                <div class="district_input" @click="clickDistrictShow()">{{district_data.ADDVNM}}</div>
                <District @getDistrictDate="getDistrictDate" v-if="districtShow"></District>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" label-width="140px">
              <el-input v-model="formData.JCCA02A020" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="隐患点名称" label-width="140px">
              <el-input v-model="formData.hiddenPointName" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐患点编号" label-width="140px">
              <el-input v-model="formData.JCCA02A010" size="mini" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="群测群防监测点数" label-width="140px">
              <el-input v-model="formData.JCCA02A020" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业检测点数" label-width="140px">
              <el-input v-model="formData.JCCA02A030" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监测阶段" label-width="140px">
              <el-radio-group v-model="formData.JCCA02A040" size="mini">
                <el-radio-button v-for="item in monitorSteps" :key="item.value" :label="item.value">{{item.name}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="防灾预案编制情况" label-width="140px">
              <el-input v-model="formData.JCCA02A050" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="监测等级" label-width="140px">
              <el-radio-group v-model="formData.JCCA02A060" size="mini">
                <el-radio-button
                  v-for="item in warnLevels"
                  :key="item.value"
                  :label="item.value"
                >{{item.name}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="责任人姓名" label-width="140px">
              <el-input v-model="formData.JCCA05A020" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职务" label-width="140px">
              <el-input v-model="formData.JCCA05A050" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" label-width="140px">
              <el-input v-model="formData.JCCA02A080" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <div class="btn_cont">
                <el-button type="primary" size="small" @click="confirm">确 定</el-button>
                <el-button size="small" @click="handleClose">取 消</el-button>
              </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- <site-dialog :data="dialogData" v-if="dialogData.dialogVisible" @on-close="dialogData.dialogVisible = false" ></site-dialog> -->

  </div>
</template>

<script>
import { getIOTSQL, getIOTSQLPage } from "@/utils/sqlAjaxUtil";
import { getitemsbydict } from "@/api/deviceBase";

import { getInstallList,jcca02aUpdate } from "../api";
import siteDialog from "../components/dialog";
import District from "@/common/district";

export default {
  components: {
    siteDialog,
    District
  },
  data() {
    return {
      loading: false,
      tableHeight: null,
      monitorSteps: [
        {name:"前期",value:"前期"},
        {name:"中期",value:"中期"},
        {name:"后期",value:"后期"},
      ],
      warnLevels: [
        {name:"小型",value:"小型"},
        {name:"中型",value:"中型"},
        {name:"大型",value:"大型"},
      ], 
      pageNo: 1,
      pageSize: 20,
      total: 0,
      queryData: {  
        addvcd:null,
        hiddenPointName: null,
        JCCA02A040: null, 
        JCCA02A060: null, 
      },

      listQuery: {},
      list: [],
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
      },
      dialogVisible: false,
      formData:{
        hiddenPointName:null,
        JCCA02A010:null,
        JCCA02A020:null,
        JCCA02A030:null,
        JCCA02A040:null,
        JCCA02A050:null,
        JCCA02A060:null,
        JCCA05A020:null,
        JCCA05A050:null,
        JCCA02A080:null,
      },
      rowData:{}
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
    // 新增
    add(){
      this.$message('新增！');
    },
    // 删除
    del(){
      this.$message('删除！');
    },
    // 修改
    modification(){
      this.dialogVisible = true;
    },
    Export(){
      this.$message('导出！');
    },
    // 编辑确定
    confirm(){
      let page = this;
      page.dialogVisible = false;
      jcca02aUpdate(page.formData).then(res=>{
        page.$message({message: '修改成功！',type: 'success'});
        page.getList();
      });
    },
    // 关闭
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 点击选项获取行数据
    getRow(row){
      if (row.length > 1) {
        this.$message('暂时只能选中一条！');
        this.$refs.Table.toggleRowSelection(row[1],false)
       } 
      if(row.length == 1){
        this.formData = row[0];
      }
      if(row == false){
        this.formData = {
          hiddenPointName:null,
          JCCA02A020:null,
          JCCA02A030:null,
          JCCA02A040:null,
          JCCA02A050:null,
          JCCA02A060:null,
          JCCA05A020:null,
          JCCA05A050:null,
          JCCA02A080:null,
        };
      }
    },
    clickDistrictShow() {
      this.districtShow = true;
    },
    getDistrictDate(data) {
      if (data) {
        this.district_data = data;
      }
      this.districtShow = false;
    },
    // 获取列表
    getList() {
      let params = {
        start: this.pageNo,
        pageSize: this.pageSize,
        data: this.queryData
      };
      let self = this;
      self.tableLoading = true;
      getIOTSQLPage(
        "jcca02a_table_list",
        params,
        true,
        function(res) {
          if (res.status) {
            self.tableData = res.data ? res.data : [];
            self.total = res.total ? res.total : 0;
            self.tableLoading = false;
          }
        }
      );
    },
    // getDicts(id, key) {
    //   //efacb5e2-0f64-4152-a0b8-f108c21596f8 隐患点级别
    //   let params = { pid: id };
    //   let self = this;
    //   self.tableLoading = true;
    //   getitemsbydict(params).then(res => {
    //     self.$set(self.queryConstData, key, res.data);
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

    //点击表格行
    handlePicture(row) {
      this.dialogData.device = row;
      this.dialogData.title = row.name;
      this.dialogData.dialogVisible = true;
    }
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
.district_cont {
  position: relative;
  width: 160px;
  margin: 0 10px;
  .district_input {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: inherit;
    padding: 0 10px;
    // outline: none;
    // pointer-events:none;
  }
}
// .el-dialog{
//   .el-form{
//     padding-top: 10px;
//     .el-form-item{
//       margin: 5px 0;
      
//     }
//   }
// }
.btn_cont{
  margin: 10px 0;
  display: flex;
  justify-content:center;
}
.app-container-body{
  .el-table{
    .cell{
        line-height: 	normal;
        white-space: normal;
    }
  }
}
</style>
