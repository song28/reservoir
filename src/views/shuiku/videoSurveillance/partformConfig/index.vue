<template>
  <div class="maintenanceStandards">
    <!-- 水库列表 -->
    <el-container class="con">
      <el-aside>
        <damLeftTreeBar :data="dataTree" @backDataChecked="backData" @backDataNode="backDataNode" />
      </el-aside>
      <el-container class="right">
        <el-header>
          <el-row>
            <el-col :span="3">
              <el-select v-model="deviceType" size="mini" filterable placeholder="请选择站点类别">
                <el-option
                  v-for="item1 in options"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                />
              </el-select>
            </el-col>
            <el-col :span="18">
              <Btns :data="dataBtn" @clickBtn="backClickBtnType" />
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="tb">
            <el-table
              v-loading="tableLoading"
              stripe
              :data="tableData"
              border
              style="width: 100%"
              highlight-current-row
              :height="tableHeight"
              @selection-change="handleSelectionChange"
            >
              <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
              <el-table-column
                label="序号"
                type="index"
                :index="table_index"
                width="50"
                align="center"
                sortable
              />
              <el-table-column
                v-for="(item, index) in tableHeader"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                align="center"
                sortable
                :show-overflow-tooltip="true"
              />
              <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'update')"
                  >修改</el-button>
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'delete')"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              :current-page="currentPage"
              :page-sizes="[query.size, 100, 200, 300, 400]"
              :page-size="query.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="请选择添加类型" :visible.sync="dialogTableVisible" @close="closeDialog">
      <div style="margin:40px 20px 0px 40px ">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-card
              :class="cur == true ? 'choose' : 'nochoose'"
              shadow="hover"
              @click.native="clickBtnSkImportType('视频站', 1)"
            >视频站</el-card>
          </el-col>
          <el-col :span="12">
            <el-card
              :class="cur == false ? 'choose' : 'nochoose'"
              shadow="hover"
              @click.native="clickBtnSkImportType('图像站', 2)"
            >图像站</el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="24" style="margin-top:40px;text-align:right">
            <el-button
              class="btn-table-border blue"
              style="cursor: pointer"
              type="primary"
              @click.stop="handleSure"
            >确定</el-button>
          </el-col>
        </el-row>

      </div>
    </el-dialog>
    <!-- 添加-修改 -->
    <Dialog :dialog-visible.sync="dialogVisible" :data="dialogData" @backDialogData="backDialogData" />
  </div>
</template>
<script>
import LeftTreeBar from '../../components/tree/leftTreeBar.vue'
import Btns from '../../components/tree/btns.vue'
import Dialog from '../common/dialog'
import damLeftTreeBar from '../../components/tree/damLeftTreeBar.vue'

import {list4Page, update, del, deletePointLocationById} from '../api'
import {tbskStandards, siteTypeOptionsAll} from '../apiConfig'
import siteBarTree from '@/views/shuiku/components/tree/siteBarTree'

export default {
  components: {damLeftTreeBar, siteBarTree, LeftTreeBar, Btns, Dialog},
  data() {
    return {
      cur: true,
      cur1: false,
      dialogTableVisible: false,
      deviceType: '',
      addvcd: '',
      options: [],
      row: '', // 选中的每行数据
      rscd: '', // 当前水库id
      dataTree: {
        type: 2,
        title: '水库列表',
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false
      },
      dialogVisible: false,
      tableLoading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      tableData: [],
      dialogData: {
        title: null, // 弹框标题
        type: null, // 操作添加，修改

        data: {
          // patroladdvcd: "",
          // patroladdvnm: "",
          // code: "",
          // name: "",
          // lng: "",
          // lat: "",
          // barh: "",
          // do: ""
        }, // 数据
        pageType: 'skVideo' // 页面类型
      },
      query: {
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1,
      input: '',
      dataBtn: {
        model: 2,
        titleInput: '测站名称',
        width: '120px',
        add: true,
        query: true,
        import: false,
        importExcel: false,
        importExcelDemo: false
      }
    }
  },
  mounted() {
    this.options = siteTypeOptionsAll
    this.tableHeader = tbskStandards
    this.addvcd = this.$store.state.user.addvcd
    console.log(this.addvcd, 'addvcd====')
    this.getpointlist({
      addvcd: this.addvcd,
      rscd: '',
      page: this.query.start,
      size: this.query.size
    })
  },
  methods: {

    closeDialog() {
      console.log('关闭弹框')
    },
    clickBtnSkImportType(type, value) {
      this.cur = !this.cur
      console.log(type, '类型===', this.cur, '==')
    },
    // 添加图像站
    handleSure() {
      let type = ''
      if (this.cur) {
        type = 'skVideo'
      } else {
        type = 'skImage'
      }
      this.dialogData.pageType = type
      this.dialogVisible = true
      this.dialogData.title = '添加'
      this.dialogData.data = {
        rscd: this.rscd
      }
    },
    // 点击高亮返回的值
    backDataNode(data) {
      this.nodeTreeData = data
      this.addvcd = data.addvcd
      this.rscd = data.rscd
      this.currentPage = 1
      this.getpointlist({
        addvcd: this.addvcd,
        deviceType: this.deviceType,
        rscd: this.rscd,
        page: this.query.start,
        size: this.query.size
      })
      console.log(data, 'data0987654321')
    },
    // 获得表格数据
    async getpointlist(pam) {
      this.tableLoading = true
      this.tableData = []
      try {
        const {msg, data, status, total} = await list4Page(pam)
        if (status == 200) {
          data.forEach((e, i, a) => {
            siteTypeOptionsAll.forEach(ite => {
              if (e.deviceType == ite.value) {
                e.deviceTypeName = ite.label
              }
            })
          })
          this.tableData = data
          // 回显测点类别
          this.total = Number(total)
          this.tableLoading = false
        } else {
          this.$notify.error({
            title: '失败',
            message: msg
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async handleRow(row, type) {
      this.row = row
      console.log(row, '每行数据')
      if (type == 'update') {
        let type = ''
        if (row.deviceType == 1) {
          type = 'skVideo'
        } else {
          type = 'skImage'
        }
        this.dialogData.pageType = type
        this.dialogVisible = true
        this.dialogData.title = '修改'
        this.dialogData.type = 'update'
        this.dialogData.data = row
      } else if (type == 'delete') {
        this.$confirm('此操作将删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            try {
              const {msg, data, status, total} = await del({
                id: row.id
              })
              if (status == 200) {
                this.getpointlist({
                  addvcd: this.addvcd,
                  rscd: this.rscd,
                  deviceType: this.deviceType,
                  page: this.query.start,
                  size: this.query.size
                })
              } else {
                this.$notify.error({
                  title: '失败',
                  message: msg
                })
              }
            } catch (error) {
              console.log(error)
            }
          })
          .catch(() => {
            this.$notify({
              title: '警告',
              message: '已取消删除',
              type: 'warning'
            })
          })
      }

      console.log(type, row, '操作')
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.getpointlist({
        addvcd: this.addvcd,
        deviceType: this.deviceType,
        rscd: this.rscd,
        page: this.currentPage,
        size: this.size
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getpointlist({
        addvcd: this.addvcd,
        deviceType: this.deviceType,
        rscd: this.rscd,
        page: this.currentPage,
        size: this.query.size
      })
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      console.log(val, '复选框----')
    },
    backData(data) {
      console.log(data, '树列表返回的值')
    },
    // 对话框返回数据
    backDialogData(data) {
      this.dialogTableVisible = false
      this.dialogData.data = {}
      // 添加，修改成功之后刷新表格数据
      this.currentPage = 1
      this.getpointlist({
        addvcd: this.addvcd,
        deviceType: this.deviceType,
        rscd: this.rscd,
        page: this.currentPage,
        size: this.query.size
      })
    },
    backClickBtnType(data) {
      switch (data.type) {
        case 'add': // 添加
          if (this.rscd == '') {
            this.$notify.info({
              title: '警告',
              message: '请选择水库列表'
            })
          } else {
            this.dialogTableVisible = true
            this.dialogData.type = 'add'
          }

          break
        case 'query': // 搜索
          this.getpointlist({
            addvcd: this.addvcd,
            name: data.data,
            deviceType: this.deviceType,
            rscd: '',
            page: this.query.start,
            size: this.query.size
          })
          break
      }
      console.log(data, '点击操作按钮')
    }
  }
}
</script>
<style lang='scss' scoped>
.maintenanceStandards {
 position: absolute;
 width: 100%;
 height: calc(100% - 0.32rem);
 background: #f4fbf5;
 font-size: 0.14rem;
 >>> .el-container {
  height: calc(100% - 0.2rem);
  margin: 0.1rem;
 }
 // >>> .el-button--primary {
 //   color: #fff;
 //   background-color: #29958b;
 //   border-color: #ffffff;
 // }
 .el-aside {
  width: 2.4rem !important;
  background: rgb(255, 255, 255);
 }
 .right {
  margin: 0rem;
  // margin-left: 0.1rem;
  height: 100%;
  background: #fff;
  >>> .el-header {
   height: 30px !important;
  }
 }
 >>> .el-card__body {
  font-size: 0.26rem;
  text-align: center;
 }
 .choose {
  padding: 20px;
  text-align: center;
  color: #29958bcf;
  border: 1px solid #29958bcf;
 }
 .nochoose {
  padding: 20px;
  text-align: center;
  color: #2f3a3996;
  border: 1px solid #e6ebf5;
 }
}
</style>
