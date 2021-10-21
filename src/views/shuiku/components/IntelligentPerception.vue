<!--
 * @Descripttion: 智能感知
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-25 11:37:14
 * @LastEditTime: 2021-10-18 14:57:07
-->
<template>
  <div class="content">
    <div v-if="openVal" class="leftbar">
      <template v-if="showTree">
        <siteBarTree
          ref="barTree"
          :data="siteTreedata"
          @backDataChecked="backDataFun"
          @backDataNode="backDataNodeFun"
        />
      </template>

    </div>
    <div class="stretch">
      <img :src="require('@/assets/images/zzjs/收起.png')" @click="open">
    </div>
    <div class="right">
      <div class="right-content">
        <el-tabs v-model="activeNameZhin" @tab-click="handleClick">
          <el-tab-pane label="感知监测曲线" name="first">
            <div class="btns">
              <el-row :gutter="20">
                <el-col :span="2" style="width:80px;">
                  <el-button
                    :class="activeNameZhinBtn == '1' ? 'btnactive' : 'btn'"
                    type="skbtn"
                    plain
                    size="mini"
                    @click="query('24h')"
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
                      @blur="handleTimestamp"
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
                    @click="query('query')"
                  >查询</el-button>
                </el-col>
                <el-col :span="2" style="width:60px;">
                  <el-button
                    type="skbtn"
                    plain
                    size="mini"
                    @click="query('reset')"
                  >重置</el-button>
                </el-col>
              </el-row>
            </div>
            <div v-if="activeNameZhin=='first'" class="chartC">
              <template v-if="waterChartData.data.x[0].length">
                <WaterEchart v-if="enmnit=='11'" :chart-data="waterChartData" />
                <SeepagePressure v-if="enmnit=='05' && monittyp==2" :chart-data="waterChartData" />
                <FractureSurface v-if="enmnit=='05' && monittyp==3" :chart-data="waterChartData" />
                <HorizontalDisplacement v-if="enmnit=='02' " :chart-data="waterChartData" />
                <VerticalDisplacement v-if="enmnit=='01'" :chart-data="waterChartData" />
              </template>
              <template v-else>
                <div style="display:flex;width:100%;justify-content: center;">
                  <img
                    :src="require('@/assets/images/sk/noNR.png')"
                    style="height:200px;text-align:center;margin-top:1.5rem"
                  >          </div>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史监测数据" name="second">
            <HistoryData v-if="activeNameZhin=='second'" :data-tree="dataTree" />
          </el-tab-pane>
          <el-tab-pane label="感知设备信息" name="third">
            <div v-if="activeNameZhin=='third'">
              <PerceptionDeviceInfofrom :data="DataDeviseInfo" />

              <!-- <template v-if="enmnitid!=null">
                <PerceptionDeviceInfofrom :data="DataDeviseInfo" />
              </template> -->
              <!-- <template v-else>
                <div style="display:flex;width:100%;justify-content: center;">
                  <img
                    :src="require('@/assets/images/sk/noNR.png')"
                    style="height:200px;text-align:center;margin-top:1.5rem"
                  >          </div>
              </template> -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import siteBarTree from '@/views/shuiku/components/tree/siteBarTree'

import {
  getMonitorCurveData
} from './api'
import {
  getMonitPointList
} from '../reservoirManagement/api'
import PerceptionDeviceInfofrom from './subComponments/PerceptionDeviceInfo'// 智能感知
import HistoryData from './subComponments/historyData'// 监测曲线
import WaterEchart from '../components/echarts/water'
import SeepagePressure from '../components/echarts/SeepagePressure'
import HorizontalDisplacement from '../components/echarts/HorizontalDisplacement'
import FractureSurface from '../components/echarts/FractureSurface'
import VerticalDisplacement from '../components/echarts/verticalDisplacement'

export default {
  components: {siteBarTree, PerceptionDeviceInfofrom, WaterEchart, HistoryData, SeepagePressure, HorizontalDisplacement, FractureSurface, VerticalDisplacement},
  props: ['commonData', 'isfullscreen', 'editorType'],
  data() {
    return {
      monittyp: '',
      dataTree: {time: new Date().getTime()},
      enmnit: '', //
      enmnitid: '', //
      showTree: false,
      DataDeviseInfo: {
        time: new Date().getTime(),
        nodeTreeData: {},
        query: {},
        type: 'detail', // add添加  update修改  detail 查看
        isRefresh: new Date().getTime() // 时间戳
      },
      // --------树列表开始-------------------------------------
      siteTreedata: null,
      comonData: {},
      // -----------树列表结束----------------------------------
      waterChartData: {
        data: {
          x: {0: []},
          y: {}
        },
        width: '100%',
        height: '5.6rem',
        type: 'water'
      },
      select: '1',
      isShowExtremum: false,
      devid: '',
      restaurants: [],
      restaurants2: [],
      markLineObject: {},
      state: '',
      ifFull: '',
      editor: true,
      activeNameZhinBtn: '1',
      openVal: true,
      list: [],
      value1: [this.getTimes(1 * 24), this.getTimes(0)],
      activeNameZhin: 'first',
      pastTime: '',
      currentTime: '',
      icon: null
    }
  },
  watch: {
    commonData: {
      handler: async function(newV, oldV) {
        console.log('智能感知', newV)
        this.dataTree.rscd = newV.data.rscd
        this.siteTreedata = {
          ifSetCurrent: true,
          type: 1,
          rscd: newV.data.rscd,
          title: '',
          ifShowCheckBox: false,
          ifUpdateData: false,
          ifclickNodeCheck: false,
          isRefresh: '00'
        }
        this.showTree = true
      },
      immediate: true
    },
    DataDeviseInfo: {
      handler(newV, oldV) {
        console.log(newV, '信息树')
      },
      immediate: true,
      deep: true
    }
  },
  created() {

  },
  async mounted() {
  },
  methods: {
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
    // 工情项目编码 01=表面垂直位移，02=表面水平位移，05=渗流压力，11=环境量
    async getCharts() {
      console.log(this.enmnit, 'this.enmnit-----')

      if (this.enmnitid) {
        this.waterChartData = {
          data: {
            x: {0: []},
            y: {}
          },
          width: '100%',
          height: '5.6rem',
          type: 'water'
        }
        const pam = {
          enmnit: this.enmnit,
          enmnitid: this.enmnitid,
          beginDate: this.value1[0],
          endDate: this.value1[1]
        }
        const {msg, obj, status} = await getMonitorCurveData(pam)
        if (status == 200) {
          const arr = {}
          const x = []
          const legends = []

          if (this.enmnit == '11') { // 环境量 根据deviceied确定
            const waterAxis = []
            const storageAxis = []
            const waterAxislegends = []
            const storageAxislegends = []
            obj.forEach((e, i, a) => {
            // x轴
              if (e.devicetype == 1) { // 水位
                const arrtem = []
                waterAxislegends.push(e.pointname)
                e.monitorDataList.forEach((e2, i2, a2) => {
                  x.push(e2.monitortime)
                  arrtem.push(e2.monitorvalue)
                })
                waterAxis.push(arrtem)
              } else if (e.devicetype == 2) { // 累计量
                const arrtem = []
                storageAxislegends.push(e.pointname)
                e.monitorDataList.forEach((e2, i2, a2) => {
                  arrtem.push(e2.monitorvalue)
                })
                storageAxis.push(arrtem)
              }
            })
            arr.leftY = waterAxis
            arr.rightY = storageAxis
            legends.push({leftY: waterAxislegends, rightY: storageAxislegends})
          } else if (this.enmnit == '01' || this.enmnit == '02') {
            obj.forEach((e, i, a) => {
              const key = 'dataY' + i
              arr[key] = {}
              arr[key].x = []
              arr[key].y = []
              arr[key].z = []
              legends.push(e.pointname)
              console.log(arr[key], 'eeee')
              // x轴时间计算
              if (x.length == 0) {
                e.monitorDataList.forEach((e2, i2, a2) => {
                  x.push(e2.monitortime)
                })
              }
              e.monitorDataList.forEach((e2, i2, a2) => {
                arr[key].x.push(e2.xvalue)
                arr[key].y.push(e2.yvalue)
                arr[key].z.push(e2.hvalue)
              })
            })
          } else {
            obj.forEach((e, i, a) => {
              const key = 'dataY' + i
              arr[key] = []
              legends.push(e.pointname)
              console.log(arr[key], 'eeee')
              // x轴时间计算
              if (x.length == 0) {
                e.monitorDataList.forEach((e2, i2, a2) => {
                  x.push(e2.monitortime)
                })
              }
              e.monitorDataList.forEach((e2, i2, a2) => {
                arr[key].push(e2.monitorvalue)
              })
            })
          }
          this.waterChartData.type = this.enmnit
          this.waterChartData.data.y = arr
          this.waterChartData.data.x[0] = x
          this.waterChartData.legends = legends
          console.log(this.waterChartData, '工程曲线数据')
        } else {
          this.$notify.error({
            title: '失败',
            message: msg
          })
        }
      }
    },
    handleClick(data) {
      console.log('guohuina====')
      this.dataTree.time = new Date().getTime()
      this.DataDeviseInfo.time = new Date().getTime()
      this.DataDeviseInfo.isRefresh = new Date().getTime()
    },
    // 树列表返回数据
    backDataFun(data) {},
    // 点击高亮返回的值
    backDataNodeFun(data) {
      this.dataTree = {time: new Date().getTime()}
      this.enmnitid = data.enmnitid
      this.enmnit = data.enmnit
      this.monittyp = data.monittyp // 2渗流 3渗压
      this.dataTree.enmnitid = data.enmnitid
      this.dataTree.enmnit = data.enmnit
      console.log(data, '点击高亮返回的值智能曲线')
      // 感知设备信息
      if (!data.rscd) {
        data.rscd = this.commonData.data.rscd
      }
      // if (data.enmnitid != null) {
      this.DataDeviseInfo.nodeTreeData = data
      this.DataDeviseInfo.isRefresh = new Date().getTime()
      this.DataDeviseInfo.time = new Date().getTime()

      // }

      if (this.activeNameZhin == 'first') {
        if (data.enmnit != '99') {
          this.getCharts()
        }
      }
    },
    // 查询测点列表
    getMonitPointList() {
      const params = {
        enmnitcode: this.comonData.data.code,
        enmnitid: this.comonData.data.enmnitid
      }
      getMonitPointList(params).then(res => {
        if (res.status) {
          console.log(res.obj, '树列表返回的值')
        }
      })
    },
    handleTimestamp() {
      Object.assign({}, this.value1)
    },
    // 按日-按月 更改时间，并调用接口返回值
    async changeTM(data) {
      await this.$nextTick()
      this.activeNameZhinBtn = 2
      if (data == '1') {
        this.value1 = [this.getTimes(1 * 24), this.getTimes(0)]
      } else if (data == '2') {
        this.value1 = [this.getTimes(30 * 24), this.getTimes(0)]
      }
    },
    // 收缩框
    open() {
      this.openVal = !this.openVal
      const w = $('.echarts').width()
      if (this.openVal == true) {
        this.width = parseInt(w) - 200
      } else {
        this.width = parseInt(w) + 200
      }
      // $('.echarts, .rainChart ').css({width: this.width + 'px'})
      // // this.myChart.clear(); 加上是先空白后重绘，不加图标展开显示
      // const myChart = this.$echarts.init(document.getElementById('chart'))
      // myChart.resize() // echarts得重绘方法
      // this.draw(this.echartInfoConfig)
    },
    // 时间查询
    query(time) {
      if (time == 'reset' || time == '24h') {
        this.activeNameZhinBtn = 1
        this.select = '1'
        this.value1 = [this.getTimes(1 * 24), this.getTimes(0)]
      }
      this.getCharts()
    },
    queryTime(day) {
      // 过去-今天
      const pastTime = this.$moment()
        .subtract(day, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      const currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      this.pastTime = pastTime
      this.currentTime = currentTime
      return [pastTime, currentTime]
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.el-tree {
 width: 200px;
}
.el-popover--plain {
 padding: 10px 18px !important;
 text-align: center !important;
 background: #fff !important;
 color: #000 !important;
}
.btnactive {
 background: #29958b !important;
 color: #fff !important;
}
.btn {
 background: #fff;
 color: #29958b;
}
.el-range-editor--small.el-input__inner {
 height: 27px;
 vertical-align: middle;
 /* line-height: 28px; */
 width: 380px !important;
}
.el-range-editor--small .el-range-separator {
 line-height: 20px !important;
 font-size: 13px !important;
}
.el-range-editor--small .el-range__icon,
.el-range-editor--small .el-range__close-icon {
 line-height: 20px !important;
}
.custom-tree-node img {
 height: 20px;
 width: auto;
}
>>> .right .el-tabs__item {
 height:0.35rem !important;
 line-height: 0.35rem !important;
}
// >>>.el-tabs__active-bar{
//  width:1.2rem !important
// }
>>> .el-tabs__content-zz {
 height: calc(100% - 70px);
 overflow: auto;
 margin: 0 auto;
 width: 96%;
}
>>>.el-tabs__nav{
text-align: center;
}
//监测数据-设备曲线-时间选择器
>>> .el-icon-collection-tag,
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
 color: #337fe5;
 font-weight: bold !important;
}
.el-range-editor--small .el-range-input {
 background: #f6f6f6 !important;
}
//左侧面板距离设备树的距离
.el-tabs--left .el-tabs__header.is-left {
 margin-right: 0px !important;
}

.content {
 height: 100%;
 width: 100%;
 display: flex;
 .stretch {
  position: relative;
  width: 30px;
  height: 100%;
  top: calc(50% - 27px);
 }
 .leftbar {
  height:auto;
  overflow-x: hidden;
  overflow-y: auto;
  width: 200px;
  padding: 5px 5px 5px 0px;
  border-right: 1px solid #eff5fb;
  .custom-tree-node .img {
   width: 24px;
   display: inline-block;
  }
 }
 .right {
  height: 7.38rem;
  overflow: hidden;
  width: 100%;
  .btns{
  }
  // width: calc(100% - 230px);
  .right-header {
   width: 100%;
   padding: 5px 10px;
   background: #edf3f9;
  }
  .right-content {
   height: 100%;
   display: flex;
  }
  .editor {
   position: absolute;
   z-index: 99999;
   top: 13px;
   right: 48px;
   text-align: right;

   .edit {
   }
  }
 }
 .el-tree-node__content {
  span {
   // padding-left: 40px !important;
  }
 }
}

.tb {
 position: relative;
 width: 100%;
 height: 600px;
 // border: 1px solid red;
 padding-top: 10px;
 .el-table {
  height: 600px;
  overflow: auto;
 }
 .el-table th,
 .el-table td {
  padding: 2px 0px !important;
 }
}

.data-type {
 margin-top: 10px;
 span {
  display: inline-block;
  margin-right: 10px;
 }
 .active {
  color: #f19e1a;
 }
}
.chartC {
 margin-top: 0.2rem;
 width: 100%;
 height: 5.6rem;
 overflow: hidden;
}
.el-tree-node__content {
 height: 36px;
 line-height: 36px;
 img {
  vertical-align: middle;
 }
}
>>> .el-icon-circle-close {
 font-size: inherit !important;
}
>>> .el-icon-circle-close:before {
 color: #fff !important;
}
</style>
