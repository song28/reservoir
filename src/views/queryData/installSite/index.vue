<template>
  <div class="app-container app-container-noHeader">
      <!--<div class="app-container-header">-->
        <!--站点总数：<span class="font-blue">{{query.total}}</span>&nbsp; 个-->
      <!--</div>-->
      <div class="app-container-search">
        <filter-toggler @query="queryList" @reset="resetList" @export="handleExport(0)" :hasMore="false">
          <template slot="first-line">
            <el-form-item label="行政区：" class="el-form-item-region">
              <v-region @values="regionChange" type="group" :blank="false">
                <el-input v-model="query.addvnm" placeholder="请选择行政区"></el-input>
              </v-region>
            </el-form-item>
            <el-form-item label="站点名称：">
              <el-input v-model="query.name" placeholder="请输入名称"></el-input>
            </el-form-item>
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
            label="站点编码"
            align="center"
            width="160"
            prop="cusno"
          >
          </el-table-column>
          <el-table-column
            label="站点名称"
            align="center"
            prop="name"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="站点类型"
            align="center"
            width="160"
            prop="deviceType"
          >
          </el-table-column>
          <el-table-column
            label="行政区"
            align="center"
            prop="addvnm">
          </el-table-column>
          <el-table-column
            label="所在地"
            align="center"
            prop="address"
            show-overflow-tooltip>
          </el-table-column>
          <!--<el-table-column-->
            <!--label="承建单位"-->
            <!--align="center"-->
            <!--width="180"-->
            <!--prop="address">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--label="建站年月"-->
            <!--align="center"-->
            <!--width="140"-->
            <!--prop="address">-->
          <!--</el-table-column>-->
          <el-table-column
            label="操作"
            align="center"
            width="140">
            <template slot-scope="scope">
              <span class="font-blue cursor-p" @click.stop="handlePicture(scope.row)">站点图片</span>
              <span>|</span>
              <span class="font-red cursor-p" @click.stop="handleExport(scope.row.id)">导出</span>
            </template>
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
        this.queryList()
      })
    },
    methods: {
      // 查询列表
      queryList() {
        this.loading = true
        let self = this;
        let params = {
          data: this.query,
          pageNo: this.query.pageNo,
          pageSize: this.query.pageSize
        }
        getInstallList(params).then(res => {
          self.tableData = res.data
          self.query.total = res.total
          self.loading = false
        })

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
