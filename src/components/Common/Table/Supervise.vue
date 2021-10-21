<template>
  <el-dialog
    title="督办消息列表"
    :modal="false"
    width="70%"
    :visible.sync="dialogVisible"
    custom-class="dialog-spareTable"
    @closed="onClose"
    append-to-body>
    <div class="app-container">
      <el-table :data="tableData" highlight-current-row @selection-change="handleSelectionTable" v-loading="tableLoading" border
                :height="tableHeight">
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
          label="行政区"
          align="center"
          prop="toAddvnm"
          width="150"
          >
        </el-table-column>
        <el-table-column
          label="督办消息内容"
          align="center"
          prop="content"
          >
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" size="small">取 消</el-button>
      <el-button type="primary" @click="handleSave" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {pushMsg} from '../api'

  export default {
    props: ['item'],
    data() {
      return {
        tableHeight: window.innerHeight - (window.innerWidth / 1920 * 100 * 6),
        tableData: [
        ],
        tableLoading: false,
        listQuery: {
          pageNo: 1,
          pageSize: 15,
          name: null,
        },
        total: 1,
        dialogVisible: true,
        multipleTable: [],
        msg: []
      }
    },
    methods: {
      //获取表格列表
      getList() {
        this.tableData = this.item
        this.msg = this.item
        this.tableLoading = true
        let self = this;
        self.tableLoading = false
      },
      //选择表格
      handleSelectionTable(val) {
        this.multipleTable = val;
      },

      handleSave() {
        if (this.multipleTable.length > 0) {
            let len = this.multipleTable.length;
            let len_j = this.tableData.length;
            let productionMsgData = [];
            for(let i=0;i<len;i++){
                for(let j=0;j<len_j;j++){
                    if(this.multipleTable[i].id == this.tableData[j].id){
                        productionMsgData.push(this.tableData[j]);
                    }
                }
            }
            pushMsg(productionMsgData).then(res => {
                if (res.status) {
                    this.$GXprompt.notify.success('督办通知发送成功！')
                }
            });
          this.onClose(this.multipleTable)
        } else {
          this.$GXprompt.notify.error('至少选择一条数据...')
        }
      },

      onClose(data) {
        this.dialogVisible = false

          this.$emit('on-close', this.item)
      },
    },
    created() {
      this.getList()
    },
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
