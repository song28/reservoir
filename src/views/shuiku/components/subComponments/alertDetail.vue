<!--
 * @Descripttion: 预警详情
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-24 20:23:17
 * @LastEditTime: 2021-10-15 20:18:17
-->
<template>
  <div class="Alertdetail">
    <div class="AlertTop" style="margin-top: 0.5rem;color:#29958b;font-weight: bold;">
      <el-row>
        <el-col v-if="sendAlert" :span="4" style="text-align:left;line-height:0.4rem">
          <span @click="backDetail"> ＞＞返回</span>
        </el-col>
        <el-col v-if="!sendAlert" :span="4" style="text-align:left;line-height:0.4rem"><span @click="back"> ＞＞返回</span></el-col>
        <el-col v-if="!sendAlert" :span="20" style="text-align:right">
          <el-button
            type="skbtn"
            icon="el-icon-edit-outline"
            plain
            size="mini"
            style="margin-top:0.05rem"
            @click.stop="publicAlert()"
          >预警发布</el-button>
        </el-col>
      </el-row>
    </div>
    <hr style="border:1px solid #edf3f9;margin:0.1rem">
    <div class="AlertCon">
      <div v-if="!sendAlert" class="left">
        <div class="yjInfo">
          <p>预警信息</p>
          <div class="yjconTb">
            <el-row v-for="(item,index) in list" :key="index" class="row">
              <el-col :span="8" class="rowLeft">{{ item.title }}</el-col>
              <el-col :span="16" class="rowRight">{{ item.con }}</el-col>
            </el-row>
          </div>
        </div>
        <div class="yjPosition">
          <p>预警图片</p>
          <template v-if="rowData.deviceId!=null">
            <el-image
              style="width: 100%; height: 2.32rem"
              fit="cover"
              :src="rowData.deviceId"
            />
          </template>
          <template v-else>
            <div style="display:flex;width:100%;justify-content: center;">
              <img
                :src="require('@/assets/images/sk/noNR.png')"
                style="height:200px;text-align:center;margin-top:0.5rem"
              >          </div>
          </template>
        </div>
        <div class="yjProcess">
          <p>预警过程</p>
          <div v-if="dataLine.length" class="AlertEcharts">
            <!-- <AlertProcess :chart-data="chartData" /> -->
            <!-- <template v-if="chartData.data.x[0].length"> -->
            <WaterEchart v-if="enmnit=='11'" :chart-data="chartData" />
            <SeepagePressure v-if="enmnit=='05'" :chart-data="chartData" />
            <FractureSurface v-if="enmnit=='99'" :chart-data="chartData" />
            <HorizontalDisplacement v-if="enmnit=='02'" :chart-data="chartData" />
            <VerticalDisplacement v-if="enmnit=='01'" :chart-data="chartData" />
            <!-- </template> -->
          </div>
          <div v-else class="AlertEcharts">
            <div style="display:flex;width:100%;justify-content: center;">
              <img
                :src="require('@/assets/images/sk/noNR.png')"
                style="height:200px;text-align:center;margin-top:0.5rem"
              >          </div>
          </div>
        </div>
      </div>
      <div v-if="sendAlert" class="left">
        <Publish :data="warndata" />

      </div>
      <div class="right">
        <AlertManage v-if="showDataProcess" :alert-process="alertProcess" />
      </div>
    </div>
  </div>
</template>
<script>
import AlertManage from './alertManage'
import AlertProcess from '../echarts/alertProcess'
import {getRsUserInfo, getMonitorDataByPointId, getSendList} from '../api'
import WaterEchart from '../echarts/water'
import SeepagePressure from '../echarts/SeepagePressure'
import HorizontalDisplacement from '../echarts/HorizontalDisplacement'
import FractureSurface from '../echarts/FractureSurface'
import VerticalDisplacement from '../echarts/verticalDisplacement'
import Publish from '@/views/shuiku/warningManagement/warnInfo/components/publish.vue'

export default {
  components: {Publish, AlertManage, WaterEchart, SeepagePressure, HorizontalDisplacement, FractureSurface, VerticalDisplacement},
  props: ['data'],
  data() {
    return {
      warndata: {},
      sendAlert: false,
      showDataProcess: false,
      alertProcess: {},
      hours24: '--',
      curwater: '--',
      zzr: '--',
      zzrphone: '--',
      dataLine: [],
      enmnit: '',
      rowData: {},
      showData: false,
      chartData: {
        data: {
          x: {0: []},
          y: {}
        },
        width: '100%',
        height: '2.6rem',
        type: 'water'
      },
      list: [{title: '1', con: '1'}, {title: '2', con: '1'}, {title: '1', con: '1'}, {title: '1', con: '1'}, {title: '1', con: '1'}, {title: '1', con: '1'}],
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
      ]
    }
  },
  watch: {
   
    data: {
      handler: async function(val) {
        this.enmnit = val.enmnit
        console.log(val, '每行数据===')
        this.rowData = val
        // 告警等级
        let warnLevel = '--'
        if (val.warnLevel == 3) {
          warnLevel = '橙色预警'
        } else if (val.warnLevel == 4) {
          warnLevel = '红色预警'
        }
        // 告警状态
        let warnStatus = '--'
        if (val.warnStatus == 1) {
          warnStatus = '预警中'
        } else if (val.warnStatus == 2) {
          warnStatus = '结束预警'
        }
        await this.getZrr(val.rscd)
        this.list = [{title: '报警时间', con: val.createtime == null ? '--' : val.createtime},
          {title: '报警原因', con: val.warnReason == null ? '--' : val.warnReason},
          {title: '24小时降雨', con: this.hours24 + 'mm'},
          {title: '当前水位', con: this.curwater + 'm'},
          {title: '告警等级', con: warnLevel},
          {title: '告警状态', con: warnStatus},
          {title: '行政责任人', con: this.zzr},
          {title: '责任人电话', con: this.zzrphone}]
        this.warnLine(val)
        this.getyjList(val)
      },
      immediate: true,
      deep: true
    }},
  mounted() {
  },
  methods: {
    backDetail() {
      this.sendAlert = false
    },
    publicAlert() {
      this.sendAlert = true
      this.warndata.rscd = this.rowData5.rscd
      this.warndata.warnLevel = this.rowData5.rscd.warnLevel
      // console.log('短信发布===')
    },
    // 获取预警列表
    async getyjList(val) {
      this.alertProcess = new Object()
      const pam = {
        data: {warnId: val.id}
      }
      const {msg, data, status} = await getSendList(pam)
      if (status) {
        this.showDataProcess = true
        this.alertProcess.createtime = this.data.createtime
        this.alertProcess.finishTime = this.data.finishTime
        this.alertProcess.sendinfo = data

        console.log(data, '预警信息', this.alertProcess)
      }
    },
    // 预警过程线
    async warnLine(val) {
      let finishTime
      if (val.finishTime != null) {
        finishTime = val.finishTime
      } else {
        finishTime = this.getTimes(0)
      }
      const pam = {
        enmnit: val.enmnit,
        pointid: val.pointid, // 测点ID
        devicetype: val.devicetype, // 设备类型 1=雨量，2=水位，当 enmnit参数为11时传入
        beginDate: val.createtime,
        endDate: finishTime,
        pageNo: null,
        pageSize: null
      }
      const {msg, data, status} = await getMonitorDataByPointId(pam)
      if (status == 200) {
        this.dataLine = data
        console.log(data, '返回的数据===')
        const arr = {}
        const x = []
        const legends = []
        if (this.enmnit == '11') { // 环境量 根据deviceied确定
          const waterAxis = []
          const storageAxis = []
          const waterAxislegends = []
          const storageAxislegends = []
          // x轴
          if (val.devicetype == 1) { // 水位
            const arrtem = []
            waterAxislegends.push(val.mpname)
            this.dataLine.forEach((e2, i2, a2) => {
              x.push(e2.monitortime)
              arrtem.push(e2.monitorvalue)
            })
            waterAxis.push(arrtem)
          } else if (val.devicetype == 2) { // 累计量
            const arrtem = []
            storageAxislegends.push(val.mpname)
            this.dataLine.forEach((e2, i2, a2) => {
              arrtem.push(e2.monitorvalue)
            })
            storageAxis.push(arrtem)
          }
          arr.leftY = waterAxis
          arr.rightY = storageAxis
          legends.push({leftY: waterAxislegends, rightY: storageAxislegends})
        } else if (this.enmnit == '01' || this.enmnit == '02') {
          const key = 'dataY' + 0
          arr[key] = {}
          arr[key].x = []
          arr[key].y = []
          arr[key].z = []
          legends.push(val.mpname)
          console.log(arr[key], 'eeee')
          this.dataLine.forEach((e2, i2, a2) => {
            x.push(e2.monitortime)
            arr[key].x.push(e2.xvalue)
            arr[key].y.push(e2.yvalue)
            arr[key].z.push(e2.hvalue)
          })
        } else {
          const key = 'dataY' + 0
          arr[key] = []
          legends.push(val.mpname)
          console.log(arr[key], 'eeee')
          this.dataLine.forEach((e2, i2, a2) => {
            if (i == 0) {
              x.push(e2.monitortime)
            }
            arr[key].push(e2.monitorvalue)
          })
        }
        this.chartData.type = this.enmnit
        this.chartData.data.y = arr
        this.chartData.data.x[0] = x
        this.chartData.legends = legends
        console.log(this.chartData, '工程曲线数据')
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 获取责任人信息
    async getZrr(rscd) {
      const pam = {rscd: rscd}
      const {msg, data, status} = await getRsUserInfo(pam)
      if (status) {
        // this.hours24=data.
        // this.hours24=data.
        this.curwater = data.todaywl
        this.hours24 = data.todaydrp
        // this.hours24=data.
        this.zzr = data.xzzrr_name
        this.zzrphone = data.xzzrr_phone

        console.log(data, '责任人信息')

        return data
      }
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
    back() {
      this.$emit('backDetailData', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.Alertdetail {
 position: absolute;
 top: 0px;
 right: 0;
 width: 100%;
 height: 6.8rem;
 .AlertTop {
  height: 100%;
  height: 0.28rem;
 }
 .AlertCon {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  height: 5.8rem;
  .left {
   width: calc(100% - 3.2rem);
   height: 100%;
   display: flex;
   flex-wrap: wrap;
   p {
    font-size: 0.16rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #000000;
    line-height: 0.22rem;
   }
   .yjInfo {
    width: 50%;
    height: 2.8rem;
    overflow: hidden;
    .yjconTb {
     width: 100%;
     height: 2.4rem;
     overflow: auto;
     .row {
      text-align: center;
      color: #333333;
      .rowLeft {
       background: #f4fbf5;
       border: 1px solid #cfe5e1;
       padding: 0.03rem;
      }
      .rowRight {
       background: #ffffff;
       border: 1px solid #cfe5e1;
       border-radius: 2px;
       padding: 0.03rem;
      }
     }
    }
   }
   .yjPosition {
    width: 48%;
    margin-left: 2%;
    height: 2.6rem;
   }
   .yjProcess {
    height: 3.8rem;
    width: 100%;
    .yjProcess {
     width: 100%;
     height: 2.8rem;
    }
   }
  }
  .right {
   width: 3.2rem;
   height: 100%;
   overflow: hidden;
  }
 }
}
</style>
