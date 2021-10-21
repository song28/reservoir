<template>
  <div class="app-container app-container-noHeader">
    <div class="app-container-search">
      <filter-toggler @query="queryList" @reset="resetList" @export="handleExport" :hasMore="false">
        <template slot="first-line">
          <el-form-item label="站点信息：">
            <el-input v-model="query.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </template>
      </filter-toggler>
    </div>
    <div class="app-container-body app-container-body-column" ref="tab">
      <el-table :data="tableData" border style="width: 100%" highlight-current-row>
        <el-table-column
          label="序号"
          align="center"
          width="60">
          <template slot-scope="scope">
            <span>{{((query.page - 1) * query.limit) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cusno"
          align='center'
          label="设备编码">
        </el-table-column>
        <el-table-column
          prop="name"
          align='center'
          label="站点名称">
        </el-table-column>
        <el-table-column
          prop="addvnm"
          align='center'
          label="行政区">
        </el-table-column>
        <el-table-column
          prop="address"
          align='center'
          label="所在地">
        </el-table-column>
        <el-table-column
          prop="cellVoltage"
          align='center'
          label="电池电压(V)">
        </el-table-column>
        <el-table-column
          prop="chargingVoltage"
          align='center'
          label="充电电压(V)">
        </el-table-column>
        <el-table-column
          prop="signalStrength"
          align='center'
          label="信号强度(dB)">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          align='center'
          label="最近在线时间">
        </el-table-column>
        <el-table-column
          prop="blOnline"
          align='center'
          label="是否在线">
          <template slot-scope="scope">
            <span v-if="scope.row.blOnline == '1'" class="font-green font-weight">在线</span>
            <span v-else class="font-gray font-weight">离线</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120">
          <template slot-scope="scope">
            <span class="font-blue cursor-p" @click.stop="rowClick(scope.row)">历史数据</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="query.total" :page.sync="query.page" :limit.sync="query.limit"
                  @pagination="queryList"/>
    </div>

    <site-dialog :data="dialogData" v-if="dialogData.dialogVisible" @on-close="dialogData.dialogVisible = false"></site-dialog>
  </div>
</template>

<script>
  import {getSiteStatusTotal, getWorkList,queryDeviceHealth,getSiteList} from '../api'
  import {parseTime} from '@/utils'
  import siteDialog from '../components/dialog'

  let nowTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
  let lastTime = parseTime(new Date().getTime() - 24 * 60 * 60 * 1000, '{y}-{m}-{d} {h}:{i}:{s}') //近24小时
  export default {
    components: {
      siteDialog
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
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
          }]
        },
        loading: false,
        tableHeight: null,
        query: {
          page: 1,
          limit: 20,
          total: 0,
          addvcd: null,
          addvnm: null,
          name: null,
          stm: lastTime,
          etm: nowTime,
          date: null
        },
        totalData: {
          total: 0,
          online: 0,
          offline: 0
        },
        tableData: [],
        siteData:[],
        dialogData: {
          name: 'work',
          device: null,
          title: null,
          dialogVisible: false,
        },
      }
    },
    watch: {
      'query.date': {
        handler: function (newV, oldV) {
          if (newV) {
            this.query.stm = newV[0];
            this.query.etm = newV[1];
          } else {
            this.query.stm = lastTime;
            this.query.etm = nowTime;
          }
        },
        deep: true
      }
    },
    created() {
      this.query.addvcd = this.$store.state.user.addvcd
      this.query.addvnm = this.$store.state.user.addvnm
    },
    mounted() {
      this.$nextTick(function () {
        this.tableHeight = this.$refs.tab.clientHeight - 38 - (window.innerWidth / 1920 * 100 * 0.54) + 'px'
        // this.queryTotal()
        this.queryList()
      })
      // this.querySiteList()
    },
    methods: {
      //行政区
      regionChange(val) {
        let obj = this.$getRegion(val)
        this.query.addvcd = obj.addvcd
        this.query.addvnm = obj.addvnm
      },

      //获取表格列表
      queryList() {
         let params = {
             pageNo: this.query.page,
             pageSize: this.query.limit
           }
           let self = this;
           getSiteList(params).then(res => {
              self.tableData = res.data;
              self.totalData.total = res.total;
              self.query.total = res.total;
           })

      },
      //查询站点数据列表开始
      querySiteList() {
        // this.tableLoading = true
        let self = this
        let params = {
          // data: this.query,
          pageNo: this.query.page,
          pageSize: this.query.limit
        }
        getSiteList(params).then(res => {
          self.siteData = res.data
        })
      },
      //查询站点数据列表结束
      //查询统计
      queryTotal() {
        let params = {
          addvcd: this.query.addvcd
        };
        getSiteStatusTotal(params).then(res => {
          this.totalData.total = res.data.total
          this.totalData.online = res.data.online
          this.totalData.offline = res.data.offline
        })
      },

      //重置查询条件
      resetList() {
        for (let key in this.query) {
          this.query[key] = null;
        }
        this.query.page = 1;
        this.query.limit = 20;
        this.queryList();
      },

      //导出
      handleExport() {

      },

      //点击表格行
      rowClick(row, column, event) {
        this.dialogData.device = row
        this.dialogData.title = row.name
        this.dialogData.dialogVisible = true
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  .query-custom-dialog {

  }
</style>
