<template>
  <el-dialog
    :title="item.data.name + '预警记录'"
    :modal="false"
    width="70%"
    :visible.sync="dialogVisible"
    custom-class="dialog-warn"
    @closed="onClose"
    append-to-body>
    <div class="app-container">
      <div class="app-container-header-search">
        <filter-toggler @query="getList" @reset="resetList" @export="handleExport" :hasMore="false">
          <template slot="first-line">
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="listQuery.data.stm"
                type="datetime"
                placeholder="请选择开始时间"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker
                v-model="listQuery.data.etm"
                type="datetime"
                placeholder="请选择结束时间"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </template>
        </filter-toggler>
      </div>
      <el-table :data="tableData" v-loading="tableLoading" border style="width: 100%"
                :height="total < 1 ? tableHeight + 45 : tableHeight">
        <el-table-column
          label="序号"
          align="center"
          width="60">
          <template slot-scope="scope">
            <span>{{((listQuery.pageNo - 1) * listQuery.pageSize) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="站点名称"
          align="center"
          show-overflow-tooltip
          sortable>{{item.data.name}}
        </el-table-column>
        <el-table-column
          label="所在地"
          align="center"
          show-overflow-tooltip>{{item.data.address}}
        </el-table-column>
        <el-table-column
          label="预警类型"
          align="center"
          sortable
          prop="warnType">
        </el-table-column>
        <el-table-column
          label="预警等级"
          align="center"
          sortable
          prop="warnLev">
        </el-table-column>
        <el-table-column
          label="预警原因"
          align="center"
          sortable
          prop="warnVal">
        </el-table-column>
        <el-table-column
          label="预警时间"
          align="center"
          sortable
          prop="warnTime">
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize"
                  @pagination="getList"/>
    </div>
  </el-dialog>


</template>

<script>
  import {formatDate} from '@/utils/time'
  import {getIOTSQL,getIOTSQLPage} from '@/utils/sqlAjaxUtil'

  let nowTime = formatDate(new Date()) //当前时间
  let lastTime = formatDate(new Date().getTime() - 24 * 60 * 60 * 1000)
  export default {
    props: ['item'],
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        tableHeight: window.innerHeight - (window.innerWidth / 1920 * 100 * 4),
        tableData: [ ],
        tableLoading: false,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          data: {
            deviceId:'',
            stm:'',
            etm:''
          }
        },
        total: 1,
        dialogVisible: true
      }
    },
    methods: {
      //获取表格列表
      getList() {
        let self = this;
        let params = self.listQuery;
        params.start = self.listQuery.pageNo;
        if(self.listQuery.data.stm == null || self.listQuery.data.stm == ''){
          params.data.stm = lastTime;
        }
        if(self.listQuery.data.etm == null || self.listQuery.data.etm == ''){
          params.data.etm = nowTime;
        }
        params.data.deviceId = this.item.data.ID;
        getIOTSQLPage("hj89g5-shd89b-hfsfg89-j8fds9-sdfbh89", params, true, function (res) {
          if (res.status) {
            self.tableData = res.data ? res.data : [];
            self.total = res.total ? res.total : 0;
            self.tableLoading = false
          }
        });

      },

      //重置查询条件
      resetList() {
        for (let key in this.listQuery) {
          this.listQuery[key] = null
        }
        this.listQuery.pageNo = 1
        this.listQuery.pageSize = 20
        this.getList();
      },

      //导出
      handleExport() {

      },

      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      },

    },
    created() {
      this.tableLoading = true
      this.listQuery.data.deviceID = this.item.data.ID || this.item.data.id;
      this.getList()
    },
  }
</script>
