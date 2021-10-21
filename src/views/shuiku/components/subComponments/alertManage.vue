<!--
 * @Descripttion: 预警信息
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-24 14:04:26
 * @LastEditTime: 2021-10-15 20:47:37
-->
<template>
  <div class="alertMessage">
    <div class="right">
      <div class="main">
        <div class="header">预警处置流程</div>
        <div>
          <div class="timeLine">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
              >
                <div class="cardcon">
                  <div class="flagIcon">
                    <!-- <el-image
                      style="height:0.35rem;width:0.35rem"
                      :src="require('@/assets/images/warning/new@2x.png')"
          />-->
                  </div>

                  <div class="flage">{{ activity.time }}</div>
                  <div class="flageTime">{{ activity.timeValue }}</div>

                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>{{ activity.title }}</span>
                    </div>
                    <div>
                      <!-- 预计断面流量于2020年03月27日02时30分超过红色预警阈值20立方米每秒,预计于2020年03月27日02时30分达到峰值41立方米每秒。 -->
                      {{ activity.content }}
                    </div>
                  </el-card>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Handler} from 'leaflet'
export default {
  props: ['alertProcess'],

  data() {
    return {
      alertProcessData: '',
      activities: [
      ]
    }
  },
  watch: {
    alertProcess: {
      handler(newV, oldV) {
        // ==={{alertProcessData.createtime.substring(0,11)}}
        // {{alertProcessData.createtime.substring(11,16)}}
        this.alertProcessData = newV
        if (this.alertProcessData.createtime) {
          this.activities.push({title: '新预警发生', content: '开始预警', time: newV.createtime.substring(0, 11), timeValue: newV.createtime.substring(11, 16)})
        }
        if (this.alertProcessData.sendinfo.length) {
          this.activities.push({title: '处置过程', content: '【短信处理】接收者：' + newV.sendinfo[0].receiverName + '(' + newV.sendinfo[0].receiverPhone + ')；短信内容：' + newV.sendinfo[0].sendContext, time: newV.createtime.substring(0, 11), timeValue: newV.createtime.substring(11, 16)})
        }
        if (this.alertProcessData.finishTime) {
          this.activities.push({title: '已关闭', content: '结束预警', time: newV.finishTime.substring(0, 11), timeValue: newV.finishTime.substring(11, 16)})
        }
        console.log(newV, '处置流程')
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.alertMessage {
 display: flex;
 width: 100%;
 height: 100%;
 .right {
  width: 100%;
  height: 6.2rem;
  overflow: hidden;
  //  border: 1px solid red;
  .header {
   height: 0.2rem;
   font-size: 0.16rem;
   font-weight: bold;
   color: #25867d;
   margin-bottom: 0.4rem;
  }
  .main {
   overflow: auto;
   height: 5.8rem;
   // border: 1px solid red;
   height: 100%;
   width: 95%;
   margin-left: 5%;
   .timeLine {
    .cardcon {
     margin-bottom: 0.4rem;
     .flagIcon {
      z-index: 100;
      margin-left: -0.64rem;
      margin-top: -0.05rem;
      position: absolute;
      top: -0.3rem;
      padding: 0.02rem 0.15rem;
     }
     .flage {
      z-index: -10;

      margin-left: -0.24rem;
      margin-top: 0.03rem;
      position: absolute;
      top: -0.3rem;
      padding: 0.02rem 0.15rem;
      color: #fff;
      background-image: url("~@/assets/images/warning/flag@2x.png");
      background-size: 100% 100%;
     }
     .flageTime {
      background: #29958b;
      color: #fff;
      padding: 0.02rem 0.1rem;
      position: absolute;
      top: 0.02rem;
      z-index: 999999;
      left: -0.2rem;
     }
    }
    .el-timeline-item {
     margin: 0.2rem;
    }
    >>> .el-card__header {
     padding: 8px 10px !important;
    }
    >>> .el-timeline-item__node--primary {
     background-color: #f4f4f400;
    }
    >>> .el-card__header {
     background: #e2e3e7;
     color: #000;
     font-weight: bold;
    }
    >>> .el-card__body {
     background: #e9f0ef;
     padding: 20px;
    }
    .text {
     font-size: 0.14rem;
    }
    .item {
     margin-bottom: 0.1rem;
    }
    .clearfix:before,
    .clearfix:after {
     display: table;
     content: "";
    }
    .clearfix:after {
     clear: both;
    }
    .box-card {
     width: 2.3rem;
    }
   }
  }
 }
}
</style>
