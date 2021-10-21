<template>
  <div class="app-container app-container-noHeader" style="flex-direction: column;">
    <div class="app-container-search">
      <filter-toggler @query="queryList" @reset="resetList"  :hasMore="false" :hasExport="false">
      <template slot="first-line">
        <el-form-item label="单位信息：">
          <el-input v-model="query.name" placeholder="请输入名称"></el-input>
        </el-form-item>
      </template>
    </filter-toggler>
      <div class="app-container-handle">
        <el-button type="primary" @click="handleCreate(1)" size="mini">新增</el-button>
       <!-- <el-button type="primary" @click="handleDelete" size="mini">删除</el-button>-->
      </div>
    </div>
    <div class="app-container-body app-container-body-column">
      <el-table :data="tableData" v-loading="tableLoading" border style="width: 100%" highlight-current-row
                @selection-change="handleSelectionTable">
        <el-table-column
          label="序号"
          align="center"
          width="60">
          <template slot-scope="scope">
            <span>{{((query.pageNo - 1) * query.pageSize) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          prop="wiunName">
        </el-table-column>
        <el-table-column
          label="建立时间"
          align="center"
          prop="fromDate">
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          prop="other">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <span class="font-blue cursor-p" @click.stop="handleCreate(2,scope.row)">修改</span>
            <span>|</span>
            <span class="font-red cursor-p" @click.stop="handleDelete(1,scope.row.wiunCode)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="query.total" :page.sync="query.pageNo" :limit.sync="query.pageSize"
                  @pagination="queryList"/>
    </div>

    <el-dialog
      title="单位信息"
      :visible.sync="dialogVisible"
      :modal="false"
      width="640px">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" label-position="left" class="mt-2 dialog-form"
               :rules="rules" size="small">
        <el-row :gutter="40">
          <el-col :span="24">
            <el-form-item label="单位名称" prop="wiunName">
              <el-input v-model="ruleForm.wiunName" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.other" placeholder="请输入内容" type="textarea" rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { saveInfo, savePeople, deleteInfo} from './api'
  import {getIOTSQL, getIOTSQLPage, deleteByIOTSQL} from '@/utils/sqlAjaxUtil'
  import {shallowClone} from '@/utils'

  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        tableLoading: false,
        query: {
          pageNo: 1,
          pageSize: 20,
          total: 0,
          name: '',
        },
        multipleTable: [],
        ruleForm: {
          wiunName: null,
          other: null
        },
        rules: {
          wiunName: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ]
        },
        deleteData:{
          tableName: null,
          params: {}
        },
      }
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
        getIOTSQLPage("slhydw2b9d-a15e-49e0-b57e-2c61sm", params, true, function (res) {
          if (res.status) {
            self.tableData = res.data
            self.query.total = res.total
            self.tableLoading = false
          }
        });
      },

      //重置查询条件
      resetList() {
        for (let key in this.query) {
          this.query[key] = ''
        }
        this.query.pageNo = 1
        this.query.pageSize = 20
        this.queryList();
      },

      //导出
      handleExport() {

      },

      //选择表格
      handleSelectionTable(val) {
        this.multipleTable = val;
      },

      //新增 修改  详情
      handleCreate(type, row) {
        for (let key in this.ruleForm) {
          this.ruleForm[key] = null
        }
        if (row) {
          this.ruleForm = shallowClone(row)
        }
        this.dialogVisible = true
      },

      //删除
      handleDelete(type, id) {
        var self = this;
        this.$confirm('确定删除数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = null
          if (type === 1) {//一条
            params = {"ids": id}
          } else {//全部
            params = {
              "ids": self.multipleTable.map(d => {
                return d.id
              }).join(',')
            }
          }
          deleteInfo(params).then(res => {
            if (res.status) {
              self.queryList();
              this.$GXprompt.notify.success("删除成功！");
            } else {
              this.$GXprompt.notify.error("删除失败！");
            }
          })
        })
      },

      //保存信息
      submitForm() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            saveInfo(this.ruleForm).then(res => {
              if (res.status) {
                this.$GXprompt.notify.success("保存成功")
                this.dialogVisible = false
                this.resetList()
              } else {
                this.$GXprompt.notify.error(res.msg)
              }
            })
          } else {
            return false
          }
        })
      }
    },
    mounted() {
      this.$nextTick(function () {
        // this.tableHeight = this.$refs.tab.clientHeight - 38 - (window.innerWidth / 1920 * 100 * 0.54) + 'px'
        // this.queryList()
      })
    },
    created() {
      this.queryList()
    },
  }
</script>


