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
          <el-form-item label="水库信息：">
            <el-input v-model="query.reservoirName" placeholder="请输入名称或编码"></el-input>
          </el-form-item>
          <el-form-item label="用户信息：">
            <el-input v-model="query.userName" placeholder="请输入编码或姓名"></el-input>
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
        <el-table-column
          label="角色"
          align="center"
          prop="duty">
        </el-table-column>
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
        <el-table-column
          label="职务"
          align="center"
          prop="duty">
        </el-table-column>
        <el-table-column
          label="职责"
          align="center"
          prop="responsibility">
        </el-table-column>
        <el-table-column
          label="关联水库"
          align="center"
          prop="reservoirName">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="140">
          <template slot-scope="scope">
            <span class="font-blue font-weight cursor-p" @click.stop="handleSelect(scope.row)">关联水库</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="query.total" :page.sync="query.pageNo" :limit.sync="query.pageSize"
                  @pagination="queryList"/>
    </div>

    <app-transfer v-if="dialogVisible" :list="formData.list" @on-close="onClose" @on-select="onSelect"></app-transfer>
  </div>
</template>

<script>
  import { getUserList, submitAssociation } from './api'
  import { shallowClone } from '@/utils'
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
          userName: null,
          reservoirName: null
        },
        tableHeight: null,
        tableData: [
        ],
        formData: {
          list: []
        },
        dialogVisible: false
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.tableHeight = this.$refs.tab.clientHeight - 15 - (window.innerWidth / 1920 * 100 * 0.74) + 'px'
        this.queryList()
      })
    },

    methods: {
      //获取表格列表
      queryList() {
        this.tableLoading = true
        let self = this
        let params = {
          data: this.query,
          start: this.query.pageNo,
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
        this.queryList()
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
        this.formData.list = []
        this.formData.list.push({
          reservoirId: row.reservoirId,
          reservoirName: row.reservoirName
        })
        this.dialogVisible = true
      },

      // 已选择
      onSelect(list) {
        let params = {
          userID: this.formData.id,
          userName: this.formData.name,
          reservoirID: list.code,
          reservoirName: list.name
        }
        submitAssociation(params).then(res => {
          if (res.status) {
            this.$GXprompt.notify.success('保存成功')
          } else {
            this.$GXprompt.notify.success('保存失败')
          }
          this.onClose()
          this.queryList()
        })
      },

      //关闭选择
      onClose() {
        this.dialogVisible = false
      }

    }
  }
</script>

<style scoped type="text/scss" lang="scss">
  .app-container-body {
    height: calc(100% - 0.8rem);
  }
</style>
