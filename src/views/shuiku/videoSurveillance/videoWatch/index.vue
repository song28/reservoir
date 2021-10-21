<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-26 18:27:03
 * @LastEditTime: 2021-09-02 16:20:19
-->
<template>
  <div class="videoWatch">
    <!-- 水库列表 -->
    <el-container class="con">
      <el-aside>
        <damLeftTreeBar :data="dataTree" @backDataChecked="backData" @backDataNode="backDataNode" />
      </el-aside>
      <el-container class="right">
        <VideoImage :video-data="videoData" />
      </el-container>
    </el-container>
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
import VideoImage from '@/views/shuiku/components/videoImage'


export default {
  components: {
    VideoImage,
    damLeftTreeBar,
    siteBarTree,
    LeftTreeBar,
    Btns,
    Dialog
  },
  data() {
    return {
  
      videoData: {data: []},
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
      connected:true,
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
    this.getpointlist(
      {
        addvcd: this.$store.state.user.addvcd,
        rscd: '',
        page: this.query.start,
        size: this.query.size
      },
      1
    )
  },
  methods: {
    
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
      }, 2)

      console.log(data, 'data0987654321')
    },
    // 获得表格数据
    async getpointlist(pam, ifInit) {
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
          this.videoData.data = []
          if (ifInit === 1) {
            // this.videoData.data.push(data[0])
          } else {
            this.videoData.data = data
            console.log(this.videoData.data, '表格数据')
          }
          // 回显测点类别
          this.total = total
          this.tableLoading = false
          //
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
        this.dialogVisible = true
        this.dialogData.title = '修改点位'
        this.dialogData.type = 'update'
        this.dialogData.data = row
      } else if (type == 'delete') {
        this.$confirm('此操作将删除该点位,并删除对应水库关系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            try {
              const {msg, status} = await del({
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
      }, 2)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getpointlist({
        addvcd: this.addvcd,
        deviceType: this.deviceType,
        rscd: this.rscd,
        page: this.currentPage,
        size: this.query.size
      }, 2)
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
      this.cur = true
      this.dialogData.data = {}
      // 添加，修改成功之后刷新表格数据
      this.currentPage = 1
      this.getpointlist({
        addvcd: this.addvcd,
        deviceType: this.deviceType,
        rscd: this.rscd,
        page: this.currentPage,
        size: this.query.size
      }, 2)
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
            this.dialogVisible = true
            this.dialogData.title = '添加视频'
            this.dialogData.type = 'add'
            this.dialogData.data = {
              rscd: this.rscd,
              name: this.nodeTreeData.addvnm,
              eslg: this.nodeTreeData.eslg,
              nrlt: this.nodeTreeData.nrlt
            }
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
          }, 2)
          break
      }
      console.log(data, '点击操作按钮')
    }
  }
}
</script>
<style lang='scss' scoped>
.videoWatch {
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
  margin-left: 0.1rem;
  height: 100%;
  background: #fff;
  >>> .el-header {
   height: 30px !important;
  }
 }
}
</style>
