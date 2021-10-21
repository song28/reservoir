<template>
  <el-dialog
    :title="dialogTitle + '站点详情'"
    :modal="false"
    :visible.sync="dialogVisible"
    custom-class="device-realtime"
    :before-close="handleClose"
    width="76%">

    <div class="realtime-title">
      <span class="font-blue">
            设备连续工作时间：  <i>{{workTime.day}}</i>天<i>{{workTime.hour}}</i>时 <i>{{workTime.minutes}}</i>分 <i>{{workTime.second}}</i>秒
          </span>
      <span class="font-green">设备到报率：{{workTime.reportRate}}</span>
    </div>
    <div class="card-item">
      <div class="card-item-title">
        <div>
          <span>基础信息</span>
        </div>
      </div>
      <div class="card-item-body mt-2" ref="basicImg">

        <img src="@/assets/images/nophoto.png" alt="" v-if="!siteData.imgList.length"
             style="height: 200px;width: 150px">
        <el-carousel height="200px" class="basicImg" indicator-position="none" v-else>
          <el-carousel-item v-for="(item, index) in siteData.imgList" :key="index">
            <img :src="item" alt="">
          </el-carousel-item>
        </el-carousel>
        <el-form :model="siteData" label-width="80px" class="basicForm">
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item label="设备名称">
                <el-input v-model="siteData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="设备类型">
                <el-input v-model="siteData.relType"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item label="站点编码">
                <el-input v-model="siteData.cusno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="厂商">
                <el-input v-model="siteData.productfactoryname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item label="承建单位">
                <el-input v-model="siteData.buildCompanyName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系电话">
                <el-input v-model="siteData.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item label="建站地址">
                <el-input v-model="siteData.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="建站时间">
                <el-input v-model="siteData.createtime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item label="管护人">
                <el-input v-model="siteData.managername"></el-input>
                <span class="el-form-item-span">{{siteData.duty}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="管护人电话">
                <el-input v-model="siteData.managerphone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="card-item width-50 mr-2">
      <div class="card-item-title">
        <div>
          <span>动态信息</span>
        </div>
      </div>
      <div class="card-item-body">
        <el-form label-width="80px" class="workForm defaultForm" label-position="left">
          <el-row :gutter="10" v-for="item in workData.condition">
            <el-col :span="24">
              <el-form-item :label="item.n">
                <div class="div-bar">
                  {{item.vals['最小值'].val}}{{item.vals['单位'].val}} &nbsp;
                  <div class="div-bar-item bg-red"></div>
                  <div class="div-bar-item bg-orange"></div>
                  <div class="div-bar-item bg-green"></div>
                  <span class="bar-span"
                        :style="{'left': item.y / item.vals['最大值'].val * 100 + '%'}">{{item.y}}</span>
                  &nbsp; {{item.vals['最大值'].val}}{{item.vals['单位'].val}}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12" v-for="item in workData.monitor">
              <el-form-item :label="item.n">
                <span class="item-span"> {{item.y}}{{item.vals['单位'].val}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10" v-if="warnData.warnval">
            <el-col :span="12">
              <el-form-item label="最近报警值">
                <span class="item-span"> {{warnData.warnval}}<span v-if="warnData.warnval">mm</span>
                  <i class="bg-warn" style="margin-left: 5px"
                     :class="{'bg-red':warnData.warnlev == '04','bg-orange':warnData.warnlev == '03','bg-yellow':warnData.warnlev == '02'}">{{warnData.warnlev | getWarnLev}}</i>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报警时间">
                <span class="item-span"><i class="font-blue el-icon-time" style="margin-right: 5px"></i>{{warnData.warntime}}</span>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>
    <div class="card-item width-50">
      <div class="card-item-title">
        <div>
          <span>健康评估</span>
        </div>
      </div>
      <div class="card-item-body body-flex-column">
        <span class="font-red" style="margin: 0.1rem 0"> 评估结果：<span
          :style="{'color': workTime.status == true? 'green':'red'}">{{workTime.status == true? '正常': '异常'}}</span></span>
        <device-work-chart :data="chartData" v-if="chartData.length"
                           :height="window.innerWidth / 1920 * 100 * 1.5 + 'px'"></device-work-chart>
      </div>
    </div>
    <div class="card-item">
      <div class="card-item-title">
        <div>
          <span>维护信息</span>
        </div>
      </div>
      <div class="card-item-body" v-if="!maintainData">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂无</div>
      <div class="card-item-body" v-if="maintainData">
        <el-form label-width="120px" class="maintainForm defaultForm" label-position="left">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="当前设备状态：">
                <span class="item-span">{{workTime.status == true? '正常': '异常'}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="最近维修信息">
              </el-form-item>
            </el-col>
          </el-row>
          <div class="div-tab-bar">
            <div class="tab-bar-item" v-if="maintainData.repairstatus >= 0">
              <img src="@/assets/images/map/bar_1.png" alt="报修">
              <span>{{maintainData.repaircreatetime}} &nbsp;&nbsp; 报修</span>
            </div>
            <div class="tab-bar-item">
              <img src="@/assets/images/map/bar_2.png" alt="维修中" v-if="maintainData.repairstatus >= 1">
              <span v-if="maintainData.repairstatus >= 1">维修中</span>
            </div>
            <div class="tab-bar-item">
              <img src="@/assets/images/map/bar_3.png" alt="结单" v-if="maintainData.repairstatus >= 2">
              <span v-if="maintainData.repairstatus >= 2">{{maintainData.repairendtime}} &nbsp;&nbsp; 结单</span>
            </div>
          </div>
          <el-row :gutter="10" class="bg-row">
            <el-col :span="6">
              <el-form-item label="报修人：">
                <span class="item-span">{{maintainData.createrepairusername}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="维修单位：">
                <span class="item-span">{{maintainData.companyName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="故障原因：">
                <span class="item-span">{{maintainData.faulttype}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="故障描述：">
                <span class="item-span">{{maintainData.faultdescribe}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <img :src="item" alt="" v-for="(item,index) in maintainData.faultImgList" :key="index"
                   class="el-form-img">

              <el-image
                class="el-form-img"
                :src="item" alt="" v-for="(item,index) in maintainData.faultImgList" :key="index"
                :preview-src-list="maintainData.faultImgList">
              </el-image>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import deviceWorkChart from './Chart/Work'
  import {
    getDeviceData,
    getLastRealTimeDataByDeviceID,
    getWarnList,
    getReportRateByDeviceID,
    getNewRepair
  } from '@/api/deviceBase.js'

  export default {
    props: ['data'],
    data() {
      return {
        dialogVisible: true,
        dialogTitle: null,
        siteData: {
          imgList: []
        },
        workData: {},
        monitorData: {},
        maintainData: {},
        warnData: {},
        chartData: [],
        workTime: {
          day: 0,
          hour: 0,
          minutes: 0,
          second: 0,
          status: false,
          reportRate: null,
        }
      }
    },
    methods: {
      handleClose() {
        this.dialogVisible = false
        this.$emit('on-close')
      },

      // 查询站点信息
      queryDeviceInfo() {
        let params = {
          id: this.data.ID || this.data.id
        }

        // var params = { id: '00003cc8-02a7-4771-8dd7-8828531fe9b9' }
        getDeviceData(params).then(res => {
          if (res.data != null) {
            this.siteData = res.data
            var diff = (new Date().getTime() - new Date(res.data.moditime).getTime()) / (1000 * 60);
            if (diff < 0) {
              this.workTime.status = false
            } else if (diff >= 0 && diff <= 6) {
              this.workTime.status = true
            } else {
              this.workTime.status = false
            }
            if (res.data.createtime != null) {
              this.keepWork()
            }
          }
        })
      },

      keepWork() {
        var _this = this
        setTimeout(function () {
          var diff = new Date().getTime() - new Date(_this.siteData.createtime).getTime()
          _this.workTime.day = Math.floor(diff / (1000 * 60 * 60 * 24))
          _this.workTime.hour = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
          _this.workTime.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          _this.workTime.second = Math.floor(((diff % (1000 * 60 * 60)) % (1000 * 60)) / 1000)
          _this.keepWork();
        }, 1000)
      },

      //加载设备到报率
      loadReportRate() {
        // var params = { id: '00003cc8-02a7-4771-8dd7-8828531fe9b9' }
        var params = {id: this.data.cusNo || this.data.cusno}
        getReportRateByDeviceID(params).then(res => {
          var rate = '0%';
          if (res.data != null) {
            rate = Math.round(res.data / 24) * 100 + '%'
          }
          this.workTime.reportRate = rate;
        })
      },

      //加载动态信息
      loadLastRealTimeDataByDeviceID() {
        // var params = { deviceID: '40b09c43-364b-435b-bcfb-5198203065da' }
        var params = {deviceID: this.data.ID || this.data.id}
        getLastRealTimeDataByDeviceID(params).then(res => {
          if (res.data != null) {
            this.workData = res.data
          }
        })
      },
      //加载最新预警
      loadWarn() {
        // var params = { deviceid: '40b09c43-364b-435b-bcfb-5198203065da' }
        var params = {deviceid: this.data.ID || this.data.id}
        getWarnList(params).then(res => {
          if (res.data != null) {
            this.warnData = res.data
          }
        })
      },
      //加载设备到报率
      loadReportRate() {
        // var params = { id: '00003cc8-02a7-4771-8dd7-8828531fe9b9' }
        var params = {id: this.data.cusNo || this.data.cusno}
        getReportRateByDeviceID(params).then(res => {
          var rate = '0%';
          if (res.data != null) {
            rate = Math.round(res.data / 24) * 100 + '%'
          }
          this.workTime.reportRate = rate;
        })
      },
      loadRepairInfo() {
        var _this = this
        var params = {'deviceid': this.data.ID || this.data.id}
        // var params = {'deviceid': 'b538ca6d-e010-4142-878c-36f2d37bf090'}
        _this.maintainData = null
        getNewRepair(params).then(res => {
          if (res.data != null) {
            _this.maintainData = res.data
          }
        })
      },
    },
    created() {
      this.dialogTitle = this.data.deviceName
      console.log(this.data)
      this.queryDeviceInfo()
      this.loadReportRate()
      this.loadLastRealTimeDataByDeviceID()
      this.loadWarn()
      this.loadReportRate()
      this.loadRepairInfo()
    },
    components: {
      deviceWorkChart
    }
  }
</script>

<style scope lang="scss" rel="stylesheet/scss" type="text/scss">
  .device-realtime {
    overflow: hidden;
    padding: 0;
    .realtime-title {
      font-weight: 700;
      margin: 0.15rem 0;
      span:nth-child(2) {
        margin-left: 0.68rem;
      }
      i {
        background-color: #E5E5E5;
        border-radius: 2px;
        padding: 0 4px;
        margin-right: 2px;
      }
    }
    .card-item {
      float: left;
      width: 100%;
      .card-item-title {
        height: 0.3rem;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
        justify-content: space-between;
        background: rgba(236, 242, 255, 1);
        div:nth-child(1) {
          span:nth-child(1) {
            font-size: 0.15rem;
            font-weight: 700;
            margin-right: 0.32rem;
          }
          .span-describe {
            font-size: 0.14rem;
            font-weight: 500;
            i {
              border-radius: 2px;
              background-color: #fff;
              display: inline-block;
              padding: 0.02rem 0.06rem;
              min-width: 0.36rem;
              text-align: center;
              margin-right: 3px;
            }
          }
        }
        div:nth-child(2) {
          color: #606266;
          i {
            width: 0.18rem;
            height: 0.18rem;
            border-radius: 50%;
            background-color: #1CA3FF;
            text-align: center;
            line-height: 0.18rem;
            color: #fff;
          }
        }
      }
      .card-item-body {
        padding: 0 0 0.2rem 0.1rem;
        display: flex;
        .basicImg {
          width: 1.22rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .basicForm {
          flex: 1;
          margin-left: 0.2rem;
          .el-form-item-span {
            padding: 0px 5px;
            background: rgba(246, 168, 45, 1);
            border-radius: 0.08rem;
            line-height: normal;
            position: absolute;
            left: 4.5em;
            color: #fff;
          }
        }

        .bg-row {
          background-color: #F0F0F0;
          margin: 0 0 0 1em !important;
          .el-col {
            padding: 0 !important;
          }
        }

        .bg-row.row-margin-5 {
          margin: 0 0 0 5em !important;
        }

        .el-form-img {
          width: 1.2rem;
          height: 1.4rem;
          margin-right: 0.1rem;
        }
        .el-form-img:first-child {
          margin-left: 2em;
        }
        .bg-warn {
          color: #fff;
          padding: 2px 4px;
          border-radius: 7px;
          margin-right: 5px;
        }

        .div-bar {
          width: 80%;
          display: flex;
          align-items: center;
          position: relative;
          height: 0.4rem;
          .div-bar-item {
            flex: 1;
            height: 0.2rem;
          }

          .div-bar-item.h-1 {
            height: 0.1rem;
          }
          .bar-span {
            position: absolute;
            bottom: -0.2rem;
            left: 50%;
            text-indent: 1em;
          }
          .bar-span:before {
            content: '';
            position: absolute;
            left: 20px;
            top: -6px;
            width: 0;
            height: 0;
            border-width: 8px;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
            transform: rotate(90deg); /*顺时针旋转90°*/
          }

          //倒三角
          .bar-span.river:before {
            content: '';
            position: absolute;
            left: 20px;
            top: 4px;
            width: 0;
            height: 0;
            border-width: 8px;
            border-style: solid;
            transform: rotate(90deg); /*顺时针旋转90°*/
          }
          .bar-span.river.red:before {
            border-color: transparent transparent transparent #F62D2D;
          }
          .bar-span.river.orange:before {
            border-color: transparent transparent transparent #F6A82D;
          }
          .bar-span.river.green:before {
            border-color: transparent transparent transparent #2DF636;
          }

        }

        .div-tab-bar {
          display: flex;
          align-items: center;
          margin: 0 0 0.15rem 0.15rem;
          padding-left: 0.1rem;
          .tab-bar-item {
            flex: 1;
            margin-right: 0.1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              height: 16px;
              width: 100%;
            }
            span {
              text-align: center;
              margin-top: 5px;
            }
          }
          .tab-bar-item:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .card-item.width-50 {
      width: calc(50% - 0.1rem);
    }

    .item-span {
      white-space: nowrap;
    }

    .body-flex-column {
      display: flex;
      flex-direction: column;
      & > div {
        width: 100%;
        height: 1.4rem;
      }
    }
    .maintainForm {
      width: 100%;
    }

  }
</style>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .device-realtime {
    .basicForm {
      .el-form-item {
        display: flex;
        align-items: center;
        margin-bottom: 0;
        .el-form-item__label {
          text-align: center;
          background: #ececec;
          border-radius: 0.1rem;
          height: max-content;
          line-height: normal;
          padding: 2px 0;
          text-indent: inherit;
          margin-right: 9px;
          color: #606266;
        }
        .el-form-item__content {
          margin-left: 0 !important;
          flex: 1;
          display: flex;
          align-items: center;
          .el-input__inner {
            border: none;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #303133;
          }
        }
      }
    }

    .defaultForm {
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          width: max-content !important;
          min-width: 80px !important;
        }
      }
      .bg-row {
        .el-form-item {
          display: flex;
          align-items: center;
          .el-form-item__content {
            margin-left: 0 !important;
            span.item-span {
              display: inline-block;
              width: max-content;
              white-space: nowrap;
            }
          }
          .el-form-item__label {
            padding-right: 0;
            min-width: max-content !important;
          }
        }
        .el-image-viewer__close {
          background: #fff;
          opacity: 1;
          i {
            font-size: 0.36rem;
          }
        }

      }

    }
  }
</style>
