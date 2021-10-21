<template>
  <div class="site-warning">
    <div class="header-search">
      <el-date-picker
        v-model="query.date"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        format="yyyy-MM-dd HH:mm:ss"
        size="mini"
        align="right">
      </el-date-picker>
      <el-button type="primary" @click="queryList" size="mini" class="ml-2">查询</el-button>
    </div>
    <el-table :data="tableData" v-loading="tableLoading" border style="width: 100%" highlight-current-row>
      <el-table-column
        label="序号"
        align="center"
        width="60">
        <template slot-scope="scope">
          <span>{{((query.pageNo - 1) * query.pageSize) + (scope.$index + 1)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预警类型"
        align="center"
        sortable
        prop="flag">
      </el-table-column>
      <el-table-column
        label="预警等级"
        align="center"
        sortable
        prop="warnLev">
        <template slot-scope="scope">
          <span :class="getClass(scope.row.warnLev)">{{scope.row.warnLev | getWarnLev}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预警原因"
        align="center"
        sortable
        prop="warnSource">
      </el-table-column>
      <el-table-column
        label="预警时间"
        align="center"
        sortable
        prop="warnTime">
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="query.pageNo" :limit.sync="query.pageSize"
                @pagination="queryList"/>
  </div>
</template>

<script>
  import {getIOTSQL, getIOTSQLPage} from '@/utils/sqlAjaxUtil'
  import {parseTime} from '@/utils'

  let nowTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
  let lastTime = parseTime(new Date().getTime() - 24 * 60 * 60 * 1000, '{y}-{m}-{d} {h}:{i}:{s}') //近24小时
  export default {
    props: ['device'],
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '实时',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },
            {
              text: '最近半年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        tableData: [],
        tableLoading: false,
        query: {
          pageNo: 1,
          pageSize: 20,
          deviceId: '',
          date: [lastTime, nowTime],
        },
        total: 1,
        dialogVisible: true
      }
    },
    methods: {
      //获取表格列表
      queryList() {
        let self = this;
        this.tableLoading = true
        let params = {
          data: {
            deviceId: this.device.id,
            stm: this.query.date[0],
            etm: this.query.date[1],
          },
          start: this.query.pageNo,
          pageSize: this.query.pageSize
        };
        if (params.data.stm == null || params.data.stm == '') {
          params.data.stm = lastTime;
        }
        if (params.data.etm == null || params.data.etm == '') {
          params.data.etm = nowTime;
        }
        getIOTSQLPage("hj89g5-shd89b-hfsfg89-j8fds9-sdfbh89", params, true, function (res) {
          if (res.status) {
            self.tableData = res.data ? res.data : [];
            self.total = res.total ? res.total : 0;
            self.tableLoading = false
          }
        });
      },
      getClass(warnLev) {
        switch (warnLev) {
          case '01':
            return 'font-blue'
            break
          case '02':
            return 'font-yellow'
            break
          case '03':
            return 'font-orange'
            break
          case '04':
            return 'font-red'
            break
          case 'FF':
            return 'font-red'
            break
          case '0':
            return 'font-gray'
            break
          default:
            return 'font-gray'
        }
      }
    },
    mounted() {
      this.query.deviceID = this.device.id;
      this.queryList()
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "~@/styles/variables.scss";

  .site-warning {
    height: 100%;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    .header-search {
      margin-bottom: 0.2rem;
    }
  }
</style>
