<!--
 * @Descripttion: 预警信息
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-24 14:04:26
 * @LastEditTime: 2021-10-15 21:57:04
-->
<template>
  <div class="warning">
    <el-container v-if="!showInfo && !showDetail" class="con">
      <el-container class="right">
        <el-main>
          <div class="tb">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="预警列表" name="first" />
              <el-tab-pane label="发布记录" name="second" />
              <el-tab-pane label="短信发布" name="third" />
            </el-tabs>
            <template v-if="activeName=='first'">
              <WainList :data="warndata" :ifdump-detail="ifdumpDetail" />
            </template>
            <template v-if="activeName=='second'">
              <div class="record">
                <Record :data="warndata" />
              </div>
            </template>
            <template v-if="activeName=='third'">
              <div class="sendInfo">
                <div class="left">
                  <Publish :data="warndata" />
                </div>
              </div>
            </template>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <div v-if="showInfo" class="sendInfo">
      <div class="left">
        <AlertSendInfo :data-method="{method:'clickdetail'}" @backAlertData="backAlertData" />
      </div>
      <div class="right" />
    </div>
    <AlertDetail v-if="showDetail" @backDetailData="backDetailData" />
  </div>
</template>
<script>
import WainList from './subComponments/wainList.vue'
import Publish from '@/views/shuiku/warningManagement/warnInfo/components/publish.vue'
import Record from '@/views/shuiku/warningManagement/warnInfo/components/record' // 发布记录

import {
  getPatrolListByUid,
  getInscoptorByReservoirId
} from '../operationManagement/api'
import {
  tbReportRecordsHeader,
  optionsReportFive,
  optionsReportFour,
  BASE_API_6
} from './apiConfig'

export default {
  components: {WainList, Record, Publish},
  props: ['commonData'],
  data() {
    return {
      ifdumpDetail: false,
      warndata: {},
      showInfo: false,
      showDetail: false,
      activities: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: require('@/assets/images/video/icon/mov_r_x@2x.png')
        },
        {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        },
        {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        },
        {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }
      ],

      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      patrolTime: [this.getTimes(1 * 24), this.getTimes(0)],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      alertValue: '',
      activeName: 'first',
      dialogVisible: false,
      tableLoading: false,
      tableHeight: '5.5rem',
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
        pageType: 'reportRecords' // 页面类型
      },
      query: {
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1,
      input: '',
      data: {
        type: 2,
        title: '水库列表',
        ifShowCheckBox: false
      },

      gid: '',
      addvcd: '',
      backTreeData: {}
    }
  },
  watch: {
    commonData: {
      handler: async function(newV, oldV) {
        console.log('预警列表newVnewVnewV===', newV)
        this.warndata.rscd = newV.data.rscd
        this.warndata.warnLevel = null
        this.warndata.addvcd = newV.data.addvcd
        if (newV.type == 'detail') {
          this.ifdumpDetail = true
          this.warndata.data = newV.data
        }
        console.log('预警列表===', this.warndata)
      },
      immediate: true
    },
    activeName: {
      handler: function(newV, oldV) {
        this.getPatrollist()
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.tableHeader = tbReportRecordsHeader
    this.addvcd = this.$store.state.user.addvcd
    this.getPatrollist()
  },
  methods: {
    backAlertData(data) {
      this.showInfo = false
      console.log(data, '返回的数据')
    },
    backDetailData() {
      this.showDetail = false
    },
    queryTime() {
      this.currentPage = 1
      this.getPatrollist()
    },
    //   时间快捷按钮
    handlerTime(time) {
      this.patrolTime = [this.getTimes(time), this.getTimes(0)]
      this.getPatrollist()
    },
    getTimes(n) {
      const start = new Date()
      const cont = start.setTime(start.getTime() - 3600 * 1000 * n)
      const cont2 = this.formateDate(new Date(cont))
      return cont2
    },
    // 格式化时间
    formateDate(time) {
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let h = time.getHours()
      let min = time.getMinutes()
      let s = time.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (h < 10) {
        h = '0' + h
      }
      if (min < 10) {
        min = '0' + min
      }
      if (s < 10) {
        s = '0' + s
      }
      return year + '-' + month + '-' + day + ' ' // + h + ':' + min + ':' + s
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 获得表格数据
    async getPatrollist() {
      const tow = []
      this.tableLoading = true
      this.tableData = []
      let a = ''
      if (this.activeName == 'first') {
        a = ''
      } else if (this.activeName == 'second') {
        a = ''
      }
      const params = {
        recordType: a,
        pageNo: this.currentPage,
        pageSize: this.query.size,
        gid: this.gid, // 水库id
        addvcd: this.addvcd, // 行政区id
        desc: '',
        stm: this.patrolTime ? this.patrolTime[0] + ' 00:00:00' : '',
        etm: this.patrolTime ? this.patrolTime[1] + ' 23:59:59' : '',
        imgs: []
      }
      try {
        const {msg, data, status, total} = await getPatrolListByUid(params)
        if (status) {
          this.total = total
          data.forEach((e, i, a) => {
            if (e.recordType == 4) {
              optionsReportFour.forEach(a => {
                if (e.implementType == a.value) {
                  data[i].implementType = a.label
                }
              })
            } else if (e.recordType == 5) {
              optionsReportFive.forEach(a => {
                if (e.implementType == a.value) {
                  data[i].implementType = a.label
                }
              })
            }
          })
          //   时间处理 展示月 日 时 分
          data.map((item, index, arr) => {
            arr[index]['FstartTime'] = this.formatTime(item.createTime)
          })
          this.tableData = data
          this.tableLoading = false
        } else {
          this.$message({
            message: msg,
            type: 'success'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    formatTime(time) {
      const idxOf = time.indexOf('-')
      const stm = time.slice(idxOf + 1)
      const lastIdxOf = stm.lastIndexOf(':')
      const lastStm = stm.slice(0, lastIdxOf)
      return lastStm
    },
    // 操作-发短信和详情
    handleRow(row, type) {
      console.log(type, row, '操作')
      if (type === 'sendInfo') {
        this.showInfo = true
      } else if (type === 'detail') {
        this.showDetail = true
      }
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.query.size = val
      this.getPatrollist()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPatrollist()
      // console.log(`当前页: ${val}`);
    },
    // 对话框返回数据 - 添加，修改成功之后刷新树列表以及表格数据并且置空弹框数据
    backDialogData(data) {
      this.data.ifUpdateData = data
      this.dialogData.data = {}
      this.currentPage = 1
      this.getPatrollist()
    },
    // 点击表格行
    handleRowClick(row, column, cell, event) {},
    // 点击表格列
    handleCellClick(row, column, cell, event) {},
    handleSelectionChange(val) {
      console.log(val, '复选框----')
    },

    backData(data) {
      this.backTreeData = {}
      this.backTreeData = data
      console.log(data, '树列表返回的值')
      if (data.nodeData.children) {
        this.addvcd = data.nodeData.addvcd
        this.gid = ''
      } else {
        this.addvcd = ''
        this.gid = data.nodeData.gid
      }
      this.currentPage = 1
      this.getPatrollist()
    },
    async backClickBtnType(data) {
      const skidArr = []
      if (this.backTreeData.nodeData) {
        if (!this.backTreeData.nodeData.children) {
          skidArr.push({
            gid: this.backTreeData.nodeData.gid,
            name: this.backTreeData.nodeData.name
          })
        }
      }
      switch (data.type) {
        case 'add': // 添加
          if (skidArr.length > 0) {
            const {data, status} = await getInscoptorByReservoirId({
              reservoirId: skidArr[0].gid
            })
            if (status) {
              console.log(data, '--')
              this.dialogVisible = true
              this.dialogData.title = '添加上报记录'
              this.dialogData.type = 'add'
              this.dialogData.data = {
                createTm: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                gid: skidArr[0],
                reportType: this.activeName,
                skPersonOpions: data
                // person: name,
                // personID: id
              }
            }
          } else {
            this.$notify({
              title: '警告',
              message: '请选择至少一个水库进行数据上报',
              type: 'warning'
            })
          }
          break
        case 'importExcelDemo': // 下载模板
          console.log('模板')
          window.location.href = BASE_API_6 + '/web/rsvr/downloadTemplate'
          // let params = {};
          // model(params).then(res => {
          //   if (res.status) {
          //     window.location = res.data;
          //   }
          // });
          break
        case 'query': // 搜索
          break
      }
      console.log(data, '点击操作按钮')
    } // 树列表--被选中的水库id
  }
}
</script>
<style lang='scss' scoped>
.warning {
 position: absolute;
 width: 100%;
 height: 100%;
 //  border: 1px solid red;
 font-size: 0.14rem;
 >>> .el-tabs__header {
  margin: 0 0 6px !important;
 }
 >>> .el_tab_content {
  height: 7rem !important;
 }
 >>> .el-tabs__item {
  padding: 0 0px;
  text-align: center;
  height: 0.35rem;
  line-height: 0.35rem;
 }
 >>> .el-date-editor.el-input,
 .el-date-editor.el-input__inner {
  width: 336px !important;
 }
 >>> .el-date-editor--datetimerange.el-input,
 .el-date-editor--datetimerange.el-input__inner {
  width: 366px !important;
 }
 >>> .el-container {
  height: calc(100% - 0.2rem);
  //   margin: 0.1rem;
 }
 >>> .el-main {
  padding: 0rem;
 }
 .right {
  width: 100%;
  height: 100%;
  >>> .el-header {
   height: 0.3rem !important;
  }
  .tb {
   width: 100%;
   >>> .el-tabs__item:hover {
    color: #29958b;
    cursor: pointer;
   }
   >>> .el-tabs__item.is-active {
    color: #29958b;
   }
   >>> .el-tabs__active-bar {
    background-color: #29958b;
   }
  }
 }
 .record {
  display: flex;
  width: 100%;
  height: 6.4rem;
  overflow: hidden;
  >>> .xuncha {
   height: 6.2rem !important;
   overflow: auto;
    .el-table{
       height: 5rem !important;
     }
    //      .el-table__body-wrapper .is-scrolling-none{
    //    height:5rem !important;
    //   //  background: red;
    //  }
  }

 }
 .sendInfo {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
   width: 100%;
   height: 100%;
  }
  >>> .el-dialog {
   height: 4rem !important;
  }
  >>> .el-dialog .el-dialog__body {
   height: 3rem !important;
  }
  // .left {
  //  width: calc(100% - 3.2rem);
  //  height: 100%;
  // }
  // .right {
  //  width: 3.2rem;
  //  height: 6.2rem;
  //  overflow: hidden;
  // }
 }
}
</style>
