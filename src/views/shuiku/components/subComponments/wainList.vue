<!--
 * @Author: song
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-28 20:03:36
 * @LastEditTime: 2021-10-15 21:31:07
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\warningManagement\warnInfo\components\warnList.vue
 * @Description: 暂无
-->
<template>
  <div class="yj">
    <template v-if="!showDetail">
      <el-header>
        <el-row style="width: 100%">
          <el-col :span="3">
            <el-row>
              <el-col :span="12">
                <p style="line-height: 30px; text-align: right">预警等级&nbsp;&nbsp;</p>
              </el-col>
              <el-col :span="12">
                <el-select
                  v-model="query.data.warnLevel"
                  filterable
                  placeholder="请选择"
                  size="mini"
                  clearable
                >
                  <el-option
                    v-for="item in warnLevelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col :span="12">
                <p style="line-height: 30px; text-align: right">预警类型&nbsp;&nbsp;</p>
              </el-col>
              <el-col :span="12">
                <el-select
                  v-model="query.data.warnType"
                  filterable
                  placeholder="请选择"
                  size="mini"
                  clearable
                >
                  <el-option
                    v-for="item in warnTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-col :span="12">
                <p style="line-height: 30px; text-align: right">预警来源&nbsp;&nbsp;</p>
              </el-col>
              <el-col :span="12">
                <el-select
                  v-model="query.data.warnSource"
                  filterable
                  clearable
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in warnSourceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" style="width: 80px">
            <p style="line-height: 30px; text-align: right">上报时间&nbsp;&nbsp;</p>
          </el-col>
          <el-col :span="8">
            <el-date-picker
              v-model="patrolTime"
              size="mini"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-col>
          <el-col :span="2">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="queryTime()"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-table
        v-loading="tableLoading"
        stripe
        :data="tableData"
        border
        style="width: 100%"
        highlight-current-row
        :height="tableHeight"
        @selection-change="handleSelectionChange"
        @cell-click="handleCellClick"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="55" />
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
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <!-- <el-button
            size="mini"
            class="btn-table-border blue"
            style="cursor: pointer"
            type="primary"
            @click.stop="handleRow(scope.row, 'sendInfo')"
            >发短信</el-button
          > -->
            <el-button
              size="mini"
              class="btn-table-border blue"
              style="cursor: pointer"
              type="primary"
              @click.stop="handleRow(scope.row, 'detail')"
            >详情</el-button>
            <el-button
              v-if="scope.row.warnStatus != '2'"
              size="mini"
              class="btn-table-border blue"
              type="primary"
              @click.stop="handleEnd(scope.row, 'detail')"
            >结束预警</el-button>
            <el-button
              v-if="scope.row.warnStatus == '2'"
              size="mini"
              class="btn-table-border blue"
              type="info"
              :disabled="scope.row.warnStatus == '2'"
              @click.stop="handleEnd(scope.row, 'detail')"
            >结束预警</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="query.pageNo"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getlist"
        @current-change="handleCurrentChange"
      />
      <Dialog
        v-if="dialogVisible"
        :common-data="commonData"
        :tab-name="tabName"
        @closeDialogMap="closeDialog"
      />
    </template>
    <AlertDetail v-if="showDetail" :data="rowData" @backDetailData="backDetailData" />
  </div>
</template>
<script>
import {
  warnListHeader,
  warnLevelOptions,
  warnTypeOptions,
  warnSourceOptions,
  deviceTypeArr,
  deviceJsonData
} from '@/views/shuiku/warningManagement/apiConfig'
import AlertDetail from './alertDetail.vue'
import {warnList, finishWarnById} from '@/views/shuiku/warningManagement/api'
import Dialog from '@/views/shuiku/components/Dialog'
import {parseTime} from '@/utils'

export default {
  components: {
    Dialog, AlertDetail
  },
  props: ['data', 'ifdumpDetail'],
  data() {
    return {
      rowData: {},
      showDetail: false,
      commonData: {
        data: {},
        type: 'xc', //               xc/yh 巡查养护
        title: '详情'
      },
      tabName: 'four',
      dialogVisible: false,
      tableHeader: warnListHeader,
      warnLevelOptions,
      warnTypeOptions,
      deviceTypeArr,
      warnSourceOptions,
      deviceJsonData,
      tableData: [{name: '666'}],
      tableLoading: false,
      tableHeight: '5.5rem',
      alertValue: '',
      patrolTime: [
        parseTime(new Date().getTime() - 3600 * 1000 * 24 * 7),
        parseTime(new Date())
      ],
      options: [],
      currentPage: 1,
      query: {
        pageNo: 1,
        pageSize: 20,
        data: {
          warnType: '',
          warnReason: '',
          // createtime: "date",
          warnStatus: '',
          warnLevel: '',
          rscd: '',
          mpcd: '',
          deviceId: '',
          cusno: '',
          warnSource: '',
          rsname: '',
          mpname: '',
          warnValue: '',
          startTime: '',
          endTime: ''
        }
      },
      total: 0
    }
  },
  watch: {
    ifdumpDetail: {
      handler: async function(val) {
        if (val == true) {
          this.handleRow(this.data.data, 'detail')
        }
      },
      immediate: true,
      deep: true
    },
    data: {
      handler(val) {
        this.getlist()
      },
      immediate: true,
      deep: true
    }
  },

  created() {},
  methods: {
    backDetailData() {
      this.showDetail = false
    },
    //   commonData {
    // *       data:  {gid:'',name:'',userid:'',roleid:'',code:''}, 水库id,水库编码(库容曲线)，水库名称name,人员角色rid，人员uid，
    // *       point:[{},{},{}]      水库数据,
    // *       type:'xc'               xc/yh 巡查养护
    // * }
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false
    },
    // 获取列表
    getlist() {
      if (this.patrolTime) {
        this.query.data.startTime = this.patrolTime[0]
        this.query.data.endTime = this.patrolTime[1]
      } else {
        this.query.data.startTime = ''
        this.query.data.endTime = ''
      }
      const params = this.query
      params.data.rscd = this.data.rscd
      this.tableData = []
      warnList(params).then((res) => {
        if (res.status) {
          this.total = res.total

          if (res.data.length > 0) {
            res.data.forEach((item) => {
              item.warnTypeName = '--'
              item.warnLevelName = '--'
              item.warnSourceName = '--'
              item.arr = []
              item.equipmentTypesVals = []
              item.equipmentTypes = []
              item.warnStatusName = item.warnStatus == '2' ? '结束预警' : '预警中'

              // 预警类型name
              // deviceTypeArr.forEach((ite) => {
              //   if (item.warnType == ite.value) {
              //     // item.warnTypeName = ite.label;
              //     item.warnTypeName = ite.typeName;
              //     return;
              //   }
              // });
              // 预警等级Name
              warnLevelOptions.forEach((ite) => {
                if (item.warnLevel == ite.value) {
                  item.warnLevelName = ite.label
                }
              })
              if (item.warnType) {
                item.arr = BigInt(item.warnType).toString(2).split('').reverse()
                item.arr.forEach((ite, i) => {
                  if (ite == 1) {
                    item.equipmentTypes.push(this.deviceJsonData[i]) // 设备标识value list
                    item.equipmentTypesVals.push(i.toString()) // 设备标识name list
                  }
                })
                item.tagarr = item.equipmentTypesVals
                console.log(
                  item.tagarr,
                  'item.tagarr',
                  item.equipmentTypes,
                  'item.equipmentTypes'
                )
                item.warnTypeName = item.equipmentTypes
              }
              // 预警来源Name
              warnSourceOptions.forEach((ite) => {
                if (item.warnSource == ite.value) {
                  item.warnSourceName = ite.label
                }
              })
            })
          }

          this.tableData = res.data ? res.data : []
          console.log(this.tableData, 'this.tableData')
        }
      })
    },
    handleCurrentChange(val) {
      console.log(val, 'val')
      this.query.pageNo = val
      this.getlist()
    },
    // 预警类型
    getWarnType(val) {
      deviceTypeArr.forEach((d) => {
        if (val == d.value) {
          return d.label
        }
      })
    },
    // 获取水库人员信息列表
    table_index(index) {
      return (this.query.pageNo - 1) * this.query.pageSize + index + 1
    },
    // 操作-发短信和详情
    handleRow(row, type) {
      console.log(type, row, '操作')
      if (type === 'sendInfo') {
        // this.showInfo = true
      } else if (type === 'detail') {
        this.rowData = row

        this.showDetail = true
        // this.showDetail = true
        // this.commonData.data = row
        // this.commonData.type = type
      }
    },
    // 结束预警
    handleEnd(row) {
      this.$confirm('确定结束预警吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          finishWarnById(params).then((res) => {
            if (res.status) {
              this.$GXprompt.notify.success('成功结束预警')
              this.queryTime()
            }
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '已取消结束预警'
          })
        })
    },
    // 点击表格行
    handleRowClick(row, column, cell, event) {},
    // 点击表格列
    handleCellClick(row, column, cell, event) {},
    handleSelectionChange(val) {
      console.log(val, '复选框----')
    },

    queryTime() {
      this.getlist()
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
    }
  }
}
</script>
<style scoped lang="scss"></style>
