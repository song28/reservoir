<template>
  <div class="app-container app-container-noHeader">
    <!--<div class="app-container-header">-->
    <!--雨量站：<span class="font-blue">{{totalData.rain}}</span>个；-->
    <!--水位站：<span class="font-blue">{{totalData.water}}</span>个；-->
    <!--雨水站：<span class="font-blue">{{totalData.rainWater}}</span>个；-->
    <!--</div>-->
    <div class="app-container-search app-container-search-up">
      <filter-toggler @query="queryList" @reset="resetList" @export="handleExport" :hasMore="false">
        <template slot="first-line">
          <!-- <el-form-item label="行政区：" class="el-form-item-region">
            <v-region @values="regionChange" type="column" :blank="false">
              <el-input v-model="query.addvnm" placeholder="请选择行政区"></el-input>
            </v-region>
          </el-form-item> -->
          <el-form-item label="站点信息：">
            <el-input v-model="query.name" placeholder="请输入名称"></el-input>
          </el-form-item>

          <!-- <el-form-item label="时间：">
            <el-date-picker
              v-model="query.date"
              type="date"
              size="small"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </el-form-item> -->
        </template>
      </filter-toggler>
    </div>
    <div class="app-container-body app-container-body-column" ref="tab">
      <el-table :data="tableData" :menuData="menuData" v-loading="loading" border style="width: 100%" highlight-current-row>
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
          prop="substionName"
          align='center'
          label="站点名称">
        </el-table-column>
        <el-table-column
          prop="addvcdName"
          align='center'
          label="行政区">
        </el-table-column>
        <el-table-column
          prop="address"
          align='center'
          label="所在地">
        </el-table-column>

        <el-table-column
          prop="eventVa"
          align='center'
          label="水位(m)">
        </el-table-column>
        <!-- <el-table-column
          prop="moditime"
          align='center'
          label="更新时间">
        </el-table-column> -->
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

    <site-dialog :data="dialogData" :ms="menuData" v-if="dialogData.dialogVisible"
                 @on-close="dialogData.dialogVisible = false"></site-dialog>
  </div>
</template>

<script>
  import {getSiteTypeTotal, getRainWaterList,queryWaterRealDataFromPg} from '../api'
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
          eleType: null,
          vueTypes: ['rain', 'water'],
          stm: lastTime,
          etm: nowTime,
          date: null
        },
        totalData: {
          rain: 0,
          water: 0,
          rainWater: 0
        },
        tableData: [],
        menuData: {'val': 'water'},
        title: null,
        dialogVisible: false,
        dialogData: {
          name: 'monitoring',
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
      },
      'query.eleType': function (newV, oldV) {
        let vueTypes = []
        if (newV) {
          vueTypes.push(newV)
        } else {
          vueTypes = ['rain', 'water']
        }
        this.query.vueTypes = vueTypes
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
        this.loading = true
        let params = {
          pageNo: this.query.page,
          pageSize: this.query.limit,
          dataDate:this.query.stm,
          // endDate:this.query.etm,
          name:this.query.name,
          data: this.query,
          dictIds:['009004001','0090051'],
        };
        let self = this;
        queryWaterRealDataFromPg(params).then(res => {
          self.tableData = res.data;
          self.query.total = res.total;
          self.loading = false;
        })
      },
      //查询统计
      queryTotal() {
        let params = {
          addvcd: this.query.addvcd
        };
        getSiteTypeTotal(params).then(res => {
          this.totalData.rain = res.data.rain
          this.totalData.water = res.data.water
          this.totalData.rainWater = res.data.rainWater
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
        // this.dialogData.title = row.name
        this.dialogData.title = row.substionName
        this.dialogData.dialogVisible = true
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .query-custom-dialog {
    

  }
  .site-monitoring{
      box-shadow: none !important;
    }
    .el-dialog .el-dialog__header {
    background: #29958b;
    color: #fff;
}
.el-dialog .el-dialog__title, .el-dialog .dialog-title {
    color: #fff;
    font-size: 16px;
}
</style>
