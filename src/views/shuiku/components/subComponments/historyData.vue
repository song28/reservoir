<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-09-01 15:39:29
 * @LastEditTime: 2021-10-15 21:30:14
-->
<template>
  <div class="history">
    <div class="btns">
      <el-row :gutter="20">
        <el-col :span="2" style="width:80px;">
          <el-button
            :class="activeNameBtn == '1' ? 'btnactive' : 'btn'"
            type="skbtn"
            plain
            size="mini"
            @click="queryTimeBtn('24h')"
          >近24h</el-button>
        </el-col>
        <el-col :span="2" style="width:100px;">
          <el-select v-model="select" placeholder="请选择" size="mini" @change="changeTM">
            <el-option label="按日" value="1" />
            <el-option label="按月" value="2" />
            <!-- <el-option label="按年" value="3" /> -->
          </el-select>
        </el-col>
        <el-col :span="10" style="width:420px;">
          <template v-if="select=='1'">
            <el-date-picker
              v-model="value1"
              size="mini"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </template>
          <template v-if="select=='2'">
            <el-date-picker
              v-model="value1"
              size="mini"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </template>
          <!-- <div class="block">
                    <template v-if="select=='3'">
                      <el-date-picker
                        v-model="value1"
                        size="mini"
                        type="year"
                        value-format="yyyy"
                      />
                    </template>
                    </div> -->
        </el-col>
        <el-col :span="2" style="width:60px;margin-right:0.1rem">
          <el-button
            type="skbtn"
            plain
            size="mini"
            @click="queryTimeBtn('query')"
          >查询</el-button>
        </el-col>
        <el-col :span="2" style="width:60px;">
          <el-button
            type="skbtn"
            plain
            size="mini"
            @click="queryTimeBtn('reset')"
          >重置</el-button>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-if="show" v-model="activeName" @tab-click="handleClick">
      <template v-for="(item,index) in cePoint">
        <el-tab-pane :id="item.id" :label="item.name" :name="''+index" />
      </template>
      <!-- <el-tab-pane label="上报险情记录" name="second" /> -->
    </el-tabs>
    <div v-if="tableHeader.length" class="tb">
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
    <div v-else class="tb">
      <div style="display:flex;width:100%;justify-content: center;">
        <img
          :src="require('@/assets/images/sk/noNR.png')"
          style="height:200px;text-align:center;margin-top:1.5rem"
        >         
         </div>
    </div>
  </div>
</template>
<script>
import {list4Page, getMonitorCurveData, update, del, getMonitorDataByPointId, deletePointLocationById} from '../api'
import {tbskStandards, siteTypeOptionsAll, tb01, tb02, tb99, tb11, tb05} from '../apiConfig'
export default {
  props: ['dataTree'],
  data() {
    return {
      show: false,
      cePoint: [],
      query: {
        data: {},
        start: 1,
        size: 20
      },
      names: [],
      activeName: '0',
      activeNameBtn: '1',
      select: '1',
      value1: [this.getTimes(1 * 24), this.getTimes(0)],
      tableLoading: true,
      tableHeight: '4.8rem',
      tableHeader: [],
      tableData: [],
      page: 1,
      size: 20,
      total: 0,
      currentPage: 1,
      addvcd: false
    }
  },
  watch: {
    dataTree: {
      handler: async function(newV, oldV) {
        this.activeName = '0'
        this.cePoint = []
        this.tableHeader = []
        this.tableData = []
        this.total = 0
        // console.log('历史监测数据2222', newV)
        await this.$nextTick()
        await this.getCharts()
        if (this.cePoint.length) {
          this.codeName = this.cePoint[0].id
        }
        this.getChartsTables()
      },
      immediate: true,
      deep: true
    },
    editorType: {
      handler(newV, oldV) {},
      immediate: true
    }
  },
  mounted() {
    this.addvcd = this.$store.state.user.addvcd
    // this.getpointlist({
    //   addvcd: this.addvcd,
    //   deviceType: this.deviceType,
    //   rscd: this.rscd,
    //   page: this.query.start,
    //   size: this.query.size
    // })
  },
  methods: {

    // 时间查询
    queryTimeBtn(time) {
      if (time == 'reset' || time == '24h') {
        this.activeNameBtn = 1
        this.select = '1'
        this.value1 = [this.getTimes(30 * 24), this.getTimes(0)]
      }
      this.currentPage = 1
      this.getChartsTables()
    },
    handleClick(data) {
      console.log(data, '切换列表')
      // UP1,UP2,UP3
      this.codeName = data.$attrs.id
      this.currentPage = 1
      this.getChartsTables()
    },
    // 格式化时间
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
      return year + '-' + month + '-' + day + ' ' + h + ':' + min + ':' + s
    },
    // 按日-按月 更改时间，并调用接口返回值
    async changeTM(data) {
      await this.$nextTick()
      this.activeNameBtn = 2
      if (data == '1') {
        this.value1 = [this.getTimes(10 * 24), this.getTimes(0)]
      } else if (data == '2') {
        this.value1 = [this.getTimes(30 * 24), this.getTimes(0)]
      }
    },
    async getCharts() {
      console.log(this.dataTree.enmnitid, 'this.dataTree.enmnitid---')
      if (this.dataTree.enmnitid != null && this.dataTree.enmnitid != undefined) {
        this.cePoint = []
        const pam = {
          enmnit: this.dataTree.enmnit,
          enmnitid: this.dataTree.enmnitid,
          beginDate: this.value1[0],
          endDate: this.value1[1]
        }
        const {msg, obj, status} = await getMonitorCurveData(pam)
        if (status == 200) {
          if (this.dataTree.enmnit == '11') {
            obj.forEach((e, i, a) => {
              this.cePoint.push({name: e.pointname, enmnit: this.dataTree.enmnit, type: e.devicetype, id: e.pointid})
            })
          } else if (this.dataTree.enmnit == '01' || this.dataTree.enmnit == '02') {
            obj.forEach((e, i, a) => {
              this.cePoint.push({name: e.pointname, enmnit: this.dataTree.enmnit, type: '', id: e.pointid})
            })
          } else {
            obj.forEach((e, i, a) => {
              this.cePoint.push({name: e.pointname, enmnit: this.dataTree.enmnit, type: '', id: e.pointid})
            })
          }
          this.show = true
          console.log(this.cePoint, '工程曲线数据')
        } else {
          this.$notify.error({
            title: '失败',
            message: msg
          })
        }
      }
    },
    // 工情项目编码 01=表面垂直位移，02=表面水平位移，05=渗流压力，11=环境量
    async getChartsTables() {
      let type = null
      this.tableData = []
      if (this.dataTree.enmnit == '01') { // 水平
        this.tableHeader = tb01
      } else if (this.dataTree.enmnit == '02') { // 垂直
        this.tableHeader = tb02
      } else if (this.dataTree.enmnit == '05') { // 渗流
        this.tableHeader = tb05
      } else if (this.dataTree.enmnit == '99') { // 断面
        this.tableHeader = tb99
      } else if (this.dataTree.enmnit == '11') { // 环境量
        this.tableHeader = tb11
        this.cePoint.forEach((e, i, a) => {
          if (this.codeName == e.id) {
            type = e.type
          }
        })
      }
      if (this.dataTree.enmnitid != null && this.dataTree.enmnitid != undefined) {
        try {
          const pam = {
            enmnit: this.dataTree.enmnit,
            enmnitid: this.dataTree.enmnitid,
            pointid: this.codeName, // 测点ID
            devicetype: type, // 设备类型 1=雨量，2=水位，当 enmnit参数为11时传入
            beginDate: this.value1[0],
            endDate: this.value1[1],
            pageNo: this.currentPage,
            pageSize: this.size
          }
          const {msg, data, status, total} = await getMonitorDataByPointId(pam)
          if (status == 200) {
            console.log(data, '返回的数据===')
            this.total = Number(total)
            this.tableData = data
            this.tableLoading = false
            console.log(data, '工程曲线数据')
          } else {
            this.tableLoading = false
            this.$notify.error({
              title: '失败',
              message: msg
            })
          }
        } catch (e) {
          this.tableLoading = false
          this.tableData = []
          this.total = 0
        }
      } else {
        this.tableLoading = false
      }
    },
    // 获得表格数据
    async getpointlist(pam) {
      this.tableLoading = true
      this.tableData = []
      try {
        const {msg, data, status, total} = await list4Page(pam)
        if (status == 200) {
          this.tableData = data
          // 回显测点类别
          this.total = total
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
    handleSelectionChange(data) {
      console.log(data, '数据展示')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.getChartsTables()
    },
    handleCurrentChange(val) {
      this.page = val
      this.currentPage = val
      this.getChartsTables()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.history{
  .btns{
    height:0.5rem;
    width:100%;
  }
  >>> .el-tabs__item {
  padding: 0 0px;
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
 }
}
</style>
