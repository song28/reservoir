<template>
  <div class="app-container">
    <div class="app-container-search">
      <filter-toggler @query="queryList" @reset="resetList" :hasExport="false" :hasMore="false">
        <template slot="first-line">
          <el-form-item label="行政区：" class="el-form-item-region">
            <v-region @values="regionChange" type="group" :blank="false">
              <el-input v-model="query.addvnm" placeholder="请选择行政区"></el-input>
            </v-region>
          </el-form-item>
          <el-form-item label="用户信息：">
            <el-input v-model="query.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </template>
      </filter-toggler>
    </div>
    <div class="app-container-body app-container-body-column" ref="tab">
      <el-table :data="tableData" v-loading="loading" border highlight-current-row>
        <el-table-column
          label="序号"
          align="center"
          width="60">
          <template slot-scope="scope">
            <span>{{((query.pageNo - 1) * query.pageSize) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          align="center"
          prop="name">
        </el-table-column>
        
        <!-- <el-table-column
          label="角色"
          align="center"
          prop="duty">
        </el-table-column> -->
        <el-table-column
          label="行政区"
          align="center"
          prop="addvcd">
        </el-table-column>
        <el-table-column
          label="电话号码"
          align="center"
          prop="phone">
        </el-table-column>
        <!-- <el-table-column
          label="职务"
          align="center"
          prop="duty">
        </el-table-column>
        <el-table-column
          label="职责"
          align="center"
          prop="responsibility">
        </el-table-column> -->
        <!--<el-table-column-->
        <!--label="关联站点"-->
        <!--align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<div class="table-column">-->
        <!--<div class="column-item font-blue" v-for="(item,index) in scope.row.list" :key="index"-->
        <!--v-if="index <= 2">{{item.name}}-->
        <!--</div>-->
        <!--<div class="column-item font-blue font-weight" v-if="scope.row.list.length > 2">...</div>-->
        <!--</div>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="操作"
          align="center"
          width="140">
          <template slot-scope="scope">
            <span class="font-blue font-weight cursor-p" @click.stop="handleSelect(scope.row)">关联站点</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="query.total" :page.sync="query.pageNo" :limit.sync="query.pageSize"
                  @pagination="queryList"/>
    </div>
    <app-transfer v-if="dialogVisible" :data="formData" @on-close="onClose"
                  @on-select="onSelect"></app-transfer>
  </div>
</template>

<script>
  import {getUserList, submitAssociation} from './api'
  import {shallowClone} from '@/utils'
  import appTransfer from './components/Transfer'

  export default {
    components: {
      appTransfer
    },
    data() {
      return {
        loading: false,
        query: {
          pageNo: 1,
          pageSize: 20,
          total: 0,
          addvnm: null,
          addvcd: null,
          name: null,
        },
        tableHeight: null,
        tableData: [
          {
            userId: '551516',
            userName: '张三',
            list: [
              {
                id: 'qwsqsfsdgwdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqerwertewdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqwdsdfgersadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqfsdfwdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqsdgwdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqerwdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqgersadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqfwdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
            ],
          },
          {
            userId: '55151sad6',
            userName: '李四',
            list: [
              {
                id: 'qwsqsfsdgwdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
              {
                id: 'qwsqfwdsadf',
                name: 'xxxxxx站点xxxxxx站点'
              },
            ],
          },
        ],
        formData: {},
        queryData:{
          deviceIDs: [],
          userID: null
        },
        dialogVisible: false
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.tableHeight = this.$refs.tab.clientHeight - 15 - (window.innerWidth / 1920 * 100 * 0.74) + 'px'
        this.queryList();
      })
    },

    methods: {
      //获取表格列表
      queryList() {
        this.tableLoading = true
        let self = this;
        let params = {
          data: this.query,
          pageNo: this.query.pageNo,
          pageSize: this.query.pageSize
        }
        getUserList(params).then(res => {
          self.tableData = res.data.data
          self.query.total = res.data.recCount
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

      //行政区
      regionChange(val) {
        let obj = this.$getRegion(val)
        this.query.addvcd = obj.addvcd
        this.query.addvnm = obj.addvnm
      },

      // 处理选择
      handleSelect(row) {
        this.formData = shallowClone(row)
        this.dialogVisible = true
      },

      // 已选择
      onSelect(list) {
        this.queryData.userID = this.formData.id
        this.queryData.deviceIDs = list
        submitAssociation(this.queryData).then(res => {
          if (res.status) {
            this.$GXprompt.notify.success("保存成功")
          } else {
            this.$GXprompt.notify.success("保存失败")
          }
          this.onClose()
          this.queryList()
        })

      },

      //关闭选择
      onClose() {
        this.dialogVisible = false
      }
    },
  }
</script>
<style scoped type="text/scss" lang="scss">
  .app-container-body {
    height: calc(100% - 0.8rem);
    .table-column {
      display: flex;
      flex-direction: column;
      max-height: 80px;
      overflow: hidden;
      .column-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        min-height: 20px;
        line-height: 20px;
        text-align: left;
      }
    }
  }
</style>
