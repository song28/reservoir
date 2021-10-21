<template>
  <div class="app-container app-container-noHeader">
      <!--<div class="app-container-header">-->
        <!--站点总数：<span class="font-blue">{{query.total}}</span>&nbsp; 个-->
      <!--</div>-->
      <div class="app-container-search">
        <filter-toggler @query="queryList" @reset="resetList" @export="handleExport(0)" :hasMore="false" :hasAdd="false">
          <template slot="first-line">
             <div class="map-query">
         <el-form-item label="名称、电话">
            <el-input v-model="queryData.name" placeholder="请输入名称或电话"></el-input>
          </el-form-item>
            

            
    </div>
          </template>
        </filter-toggler>
      </div>

      <div class="app-container-body app-container-body-column" ref="tab">
        <el-table :data="tableData" v-loading="loading" border highlight-current-row
                  :height="tableHeight">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="序号"
            align="center"
            width="60">
            <template slot-scope="scope">
              <span>{{((query.pageNo - 1) * query.pageSize) + (scope.$index + 1)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="编码"
            align="center"
            width="160"
            prop="JCCA08A010"
          >
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            prop="JCCA08A030"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="型号"
            align="center"
            width="160"
            prop="JCCA08A040"
          >
          </el-table-column>
          <el-table-column
            label="生产单位"
            align="center"
            prop="JCCA08A050">
          </el-table-column>
          <el-table-column
            label="厂家率定系数"
            align="center"
            prop="JCCA08A070"
            show-overflow-tooltip>
          </el-table-column> 
          <el-table-column
            label="厂家率定系数"
            align="center"
            prop="JCCA08A070"
            show-overflow-tooltip>
          </el-table-column> 
          <el-table-column
            label="温度修正系数"
            align="center"
            prop="JCCA08A080"
            show-overflow-tooltip>
          </el-table-column> 
          <el-table-column
            label="初始值"
            align="center"
            prop="JCCA08A100"
            show-overflow-tooltip>
          </el-table-column> 
        </el-table>
        <pagination :total="query.total" :page.sync="query.pageNo" :limit.sync="query.pageSize"
                    @pagination="queryList"/>
      </div>

    <site-dialog :data="dialogData" v-if="dialogData.dialogVisible"
                 @on-close="dialogData.dialogVisible = false"></site-dialog>
  </div>
</template>

<script>

import {getIOTSQL, getIOTSQLPage} from '@/utils/sqlAjaxUtil'
import { getitemsbydict} from '@/api/deviceBase'

  import {getInstallList} from '../api'
  import siteDialog from '../components/dialog'

  export default {
    components: {
      siteDialog
    },
    data() {
      return {
        loading: false,
        tableHeight: null,
        query: {
          name: null,
          deviceType: null,
          pageNo: 1,
          pageSize: 20,
          total: 0,
          addvnm: null,
          addvcd: null,
        },
        queryConstData:{warnLevels:[],monitorSteps:[]},
        queryData:{JCCA02A040:null,JCCA02A060:null,name:null},
       
       
        listQuery:{},
        list: [
          
        ],
        tableLoading:false,
        
        total:0,

        tableData: [],
        dialogData: {
          name: 'install',
          device: null,
          title: null,
          dialogVisible: false,
        },
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.tableHeight = this.$refs.tab.clientHeight - 38 - (window.innerWidth / 1920 * 100 * 0.54) + 'px'
      
        // this.getDicts('d8e15c08-60c8-44e5-89f9-fa2049e3e24b','warnLevels');
        // this.getDicts('cf1fcefb-ffa0-4cd8-86f0-501308afea20','monitorSteps');
        this.getList();
      })
    },
    methods: {
      handleQuery(){
        this.getList();
    },
    getList() {
      let params = {start: this.listQuery.pageNo, pageSize:20, data:this.queryData}
      let self = this
      self.tableLoading = true
      getIOTSQLPage("JCCA08A", params, true, function (res) {
        if (res.status) {
          self.tableData = res.data ? res.data : [];
          self.total = res.total ? res.total : 0;
          self.tableLoading = false
        }
      });
    },
    getDicts(id,key){
      //efacb5e2-0f64-4152-a0b8-f108c21596f8 隐患点级别
         let params = {pid: id }
      let self = this
      self.tableLoading = true
      getitemsbydict(params).then(res => {
        self.$set(self.queryConstData,key,res.data)  
      })

    },
      // 查询列表
      queryList() {
         this.getList();
      },

      //重置查询条件
      resetList() {
        for (let key in this.query) {
          this.query[key] = null
        }
        this.query.pageNo = 1
        this.query.pageSize = 20
        this.queryList();
      },

      //导出
      handleExport(id) {
        if (id) { //id 为真导出单个站点

        }
      },

      //行政区
      regionChange(val) {
        let obj = this.$getRegion(val)
        this.query.addvcd = obj.addvcd
        this.query.addvnm = obj.addvnm
      },

      //点击表格行
      handlePicture(row) {
        this.dialogData.device = row
        this.dialogData.title = row.name
        this.dialogData.dialogVisible = true
      }
    },
  }
</script>
<style type="text/scss" lang="scss">
  .query-custom-dialog {

  }
</style>
