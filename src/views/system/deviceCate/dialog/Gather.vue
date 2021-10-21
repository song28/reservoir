<template>
  <el-dialog
    :title="item.data.name + '采集信息'"
    :modal="false"
    width="70%"
    :visible.sync="dialogVisible"
    custom-class="dialog-gather"
    @closed="onClose"
    append-to-body>
    <div class="dialog-content">
      <div class="dialog-content-header">
        <div class="header-search">
          <search-radio @change="queryChart"></search-radio>
          <div style="width: 0.15rem"></div>
          <el-date-picker
            v-model="listQuery.stm"
            class="mr-15"
            size="small"
            prefix-icon="el-icon-date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间">
          </el-date-picker>
          <div style="width: 0.15rem"></div>
          <el-date-picker
            v-model="listQuery.etm"
            size="small"
            prefix-icon="el-icon-date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间">
          </el-date-picker>
          <el-button type="primary" @click="queryChart" size="mini" class="ml-2">查询</el-button>
        </div>
      </div>
      <div class="dialog-content-content flex-column">
        <el-radio-group v-model="radio" class="radio_bg_none" size="small">
          <el-radio-button :label="item.id" v-for="item in deviceElements">{{item.name}}</el-radio-button>
          <!--<el-radio-button label="water">水情信息</el-radio-button>-->
        </el-radio-group>
        <div class="content-chart" style="min-height: 4rem">

          <component :is="'device-' + clickIndex" :data="chartData" :height="height"
                     v-if="clickIndex && clickName"
                     :name="clickName" :key="componentKey"></component>

        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {
    getRealTimeDataByDeviceID,
    getDeviceElement
  } from '@/api/deviceBase.js'

  import SearchRadio from '@/components/SearchRadio'
  import {formatDate, getWeekStartDate, getMonthStartDate} from '@/utils/time'
  import {parseTime, generateUUID} from '@/utils'

  let nowTime = formatDate(new Date()) //当前时间
  let lastTime = formatDate(new Date().getTime() - 24 * 60 * 60 * 1000)
  let weekStartDate = getWeekStartDate() //本周
  let monthStartDate = getMonthStartDate() //本月
  export default {
    props: ['item'],
    data() {
      return {
        listQuery: {
          stm: lastTime,
          etm: nowTime,
          deviceID: this.item.data.ID || this.item.data.id,
          // deviceID: '40b09c43-364b-435b-bcfb-5198203065da',
          displayColumns: [],
          timeUnit: 'minutes',
          timeVal: '5',
          eleType: '1'
        },
        radio: null,
        dialogVisible: true,
        clickIndex: 'rain',
        height: window.innerHeight - (window.innerWidth / 1920 * 100 * 4) + 'px',
        chartData: null,
        clickName: null,
        componentKey: generateUUID(),
        deviceElements: []
      }
    },
    methods: {
      //加载设备要素
      loadDeviceElements() { //
        var params = {'deviceid': this.item.data.ID || this.item.data.id, eleType: "1"}
        // var params = { 'deviceid': '40b09c43-364b-435b-bcfb-5198203065da','eleType':'1'}  //这个设备ID有关联指标
        getDeviceElement(params).then(res => {
          if (res.data != null) {
            this.deviceElements = res.data
            this.radio = res.data[0].id
          }
        })
      },

      queryChart(val) {
        if (typeof val === 'number' && !isNaN(val)) {
          if (val == 0) {
            this.listQuery.stm = lastTime
          } else if (val == 1) {
            this.listQuery.stm = weekStartDate
          } else if (val == 2) {
            this.listQuery.stm = monthStartDate
          }
          this.listQuery.etm = nowTime
        }
        this.listQuery.displayColumns = [this.clickName]
        this.getChartData()
      },

      getChartData() {
        let self = this
        getRealTimeDataByDeviceID(this.listQuery).then(res => {
          this.chartData = res.data ? res.data : []
          self.componentKey = generateUUID()
        })
      },

      //关闭弹窗
      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      }
    },
    created() {
      this.listQuery.deviceID = this.item.data.ID || this.item.data.id;
      this.loadDeviceElements()
    },
    watch: {
      radio(id) {
        let objItem = this.deviceElements.find(item => {
          return item.id == id
        })
        if (objItem) {
          this.clickName = objItem.name
          this.clickIndex = objItem.vuetype || 'rain'
        }

      },
      clickName(newV, oldV) {
        this.queryChart()
      }
    },
    components: {
      SearchRadio
    }
  }
</script>
<style scoped type="text/scss" lang="scss">
  .dialog-gather {
    .dialog-content {
      display: flex;
      flex-direction: column;

      .dialog-content-header {
        margin: 0.12rem 0 0.2rem;
        height: 0.32rem;
        line-height: 0.32rem;
        padding: 0 0.22rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-region {
          width: 1.56rem;
        }

        .header-search {
          flex: 1;
          display: flex;
        }
      }

      .dialog-content-content {
        flex: 1;
        padding: 0 0.22rem;
        display: flex;
        align-items: center;

        & > div {
          flex: 1;
        }

        .content-chart {
          position: relative;

          .content-chart-title {
            position: absolute;
            display: flex;
            left: 0;
            right: 0;
            top: 0.15rem;
            margin: auto;
            justify-content: space-between;
          }
        }
      }

      .flex-column {
        flex-direction: column;
        align-items: normal;
      }
    }
  }
</style>
