<template>
  <el-dialog
    title="备件列表"
    :modal="false"
    width="70%"
    :visible.sync="dialogVisible"
    custom-class="dialog-spareTable"
    @closed="onClose"
    append-to-body>
    <div class="app-container">
      <div class="app-container-search">
        <filter-toggler @query="getList" @reset="resetList" :hasMore="false" :hasExport="false">
          <template slot="first-line">
            <el-form-item label="备件信息：">
              <el-input v-model="listQuery.name" placeholder="请输入编号或名称"></el-input>
            </el-form-item>
          </template>
        </filter-toggler>
      </div>
      <div class="app-container-body app-container-body-column" ref="tab">
      <el-table :data="tableData" @selection-change="handleSelectionTable" v-loading="tableLoading" border
                highlight-current-row>
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          label="id"
          align="center"
          prop="id"
          v-if="false"
          >
        </el-table-column>
        <el-table-column
          label="存放地址"
          align="center"
          prop="address"
          sortable>
        </el-table-column>
        <el-table-column
          label="备件名称"
          align="center"
          prop="name"
          sortable>
        </el-table-column>
<!--        <el-table-column-->
<!--          label="备件类型"-->
<!--          align="center"-->
<!--          prop="type">-->
<!--        </el-table-column>-->
        <el-table-column
          label="备件编码"
          align="center"
          sortable
          prop="code">
        </el-table-column>
        <el-table-column
          label="库存数量"
          align="center"
          sortable
          prop="num">
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize"
                  @pagination="getList"/>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" size="small">取 消</el-button>
      <el-button type="primary" @click="handleSave" size="small">确 定</el-button>
    </div>
  </el-dialog>


</template>

<script>

  export default {
    props: ['item'],
    data() {
      return {
        tableHeight: window.innerHeight - (window.innerWidth / 1920 * 100 * 6),
        tableData: [
          // {
          //   type: '备件类型',
          //   name: '备件名称',
          //   code: '备件编码',
          //   num: 1
          // }
        ],
        tableLoading: false,
        listQuery: {
          pageNo: 1,
          pageSize: 15,
          name: null,
        },
        total: 1,
        dialogVisible: true,
        multipleTable: []
      }
    },
    methods: {
      //获取表格列表
      getList() {
        this.tableData = this.item.data
        this.listQuery.name = this.item.data.id
        this.tableLoading = true
        let params = {
          data: this.listQuery,
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize
        };
        let self = this;
        // getWorkData({"data": params}).then(res => {
        //   self.tableData = res.data
        //   self.total = res.total
        // })
        self.tableLoading = false
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

      //选择表格
      handleSelectionTable(val) {
        this.multipleTable = val;
      },

      handleSave() {
        if (this.multipleTable.length > 0) {
          this.onClose(this.multipleTable)
        } else {
          this.$GXprompt.notify.error('至少选择一条数据...')
        }
      },

      onClose(data) {
        this.dialogVisible = false
        this.item.data = data ? data : []
        this.$emit('on-close', this.item)
      },
    },
    created() {
      console.log(this.tableHeight)
      this.getList()
    }
  }
</script>
<style type="text/scss" lang="scss">
  .dialog-spareTable {
    .el-dialog__body {
      padding-bottom: 0;
    }
    .el-dialog__footer {
      padding-top: 0;
    }
  }
</style>
