<!--
 * @Author: dang
 * @Date: 2021-04-13 09:59:15
 * @LastEditTime: 2021-05-12 14:56:09
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\operationManagement\common\inspectionDetail.vue
-->
<template>
  <div class="spection-wrapper">
    <!-- <div class="time-wrapper">
      <el-date-picker v-model="timeVal"
                      size="mini"
                      type="date"
                      @change="handlerChangeTime"
                      placeholder="巡查日期查询">
      </el-date-picker>
      <div class="timeline-wrapper">
        <el-timeline>
          <el-timeline-item v-for='(item,index) in spectionData'
                            :key="index"
                            :timestamp="item.time"
                            placement="top">
            <el-card>
              <p @click="handlerCar(item)"><span>巡查 {{item.spection}}</span><span>操作 {{item.operation}}</span><span>事件 {{item.eve}}</span><span>险情 {{item.danger}}</span></p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div> -->
    <div class="detail-wrapper">
      <!-- <div class="detail-content"
           v-for="(ite,idx) in contentList"
           :key="idx">
        <div class="title">{{ite.title}}</div>
        <div class="content"><span>{{ite.s}} - {{ite.e}}</span> &nbsp;&nbsp;<span>巡查人： {{ite.person}}</span>&nbsp;&nbsp; <span>联系电话：{{ite.tel}}</span>&nbsp;&nbsp; <span>水位值：{{ite.waterLeave}}</span>
        </div>
        <div class="card-wrapper">
          <div class="card-for"
               v-for="(item,index) in ite.contentData"
               :key="index">
            <el-card :body-style="{ width:'2.7rem',height:'3rem' ,}">
              <div class="card-title">
                <span>{{item.title}}</span>
              </div>
              <div class="img-wrapper">
                <img :src="item.imgUrl ? item.imgUrl  :NoPicture"
                     class="image">
              </div>
            </el-card>
          </div>
        </div>
      </div> -->
      <div class="detail-content">
        <div class="block"
             v-if="handlerpicFlag">
          <!-- -->
          <el-image style="width: 100px; height: 100px"
                    :preview-src-list='previewSrcList'
                    :z-index="99999"
                    :src="handlerpic"
                    fit="fit"></el-image>
          <span class="demonstration">点击查看示意图</span>
        </div>
        <div class="title">巡查记录</div>
        <!-- <div class="content"><span>{{ formData.stm}} - {{ formData.createTime}}</span> &nbsp;&nbsp;<span>巡查人： {{ formData.name}}</span>&nbsp;&nbsp; <span>联系电话：{{formData.phone}}</span>&nbsp;&nbsp;
          &nbsp;&nbsp; <span>水位值：{{formData.sw}} (m)</span>
        </div> -->
        <div class="info-wrapper">
          <div class="info">
            <span> 巡查人： {{ formData.name}}</span>
            <span> 联系电话： {{formData.phone}}</span>
          </div>
          <div class="info">
            <span> 开始时间： {{ formData.stm}}</span>
            <span> 结束时间： {{formData.createTime}}</span>
          </div>
          <div class="info">
            <span> 水位值： {{ formData.sw}}m</span>
            <span> </span>
          </div>
        </div>
        <!-- <div class="card-wrapper">
          <div class="card-for"
               v-for="(item,index) in imgData"
               :key="index">
            <el-card :body-style="{ width:'2.7rem',height:'3rem' ,}">
              <div class="card-title">
                <span>{{item.pointName}}</span>
              </div>
              <div class="img-wrapper">
                <el-image :z-index="99999"
                          :previewSrcList='previewSrcLists'
                          :src="item.pointPicPath ? previewUrl+ item.pointPicPath  :NoPicture"
                          fit="fit"></el-image> -->
        <!-- <img :src="item.pointPicPath ? previewUrl+ item.pointPicPath  :NoPicture"
                     class="image"> -->
        <!-- </div>
            </el-card>
          </div>
        </div> -->
        <div class="time-wrapper">
          <!-- <el-date-picker v-model="timeVal"
                          size="mini"
                          type="date"
                          @change="handlerChangeTime"
                          placeholder="巡查日期查询">
          </el-date-picker> -->
          <div class="timeline-wrapper">
            <el-timeline>
              <el-timeline-item v-for='(item,index) in imgData'
                                :key="index"
                                :timestamp="item.pointName+ '   '+ '提交时间 ：' + item.tm"
                                placement="top">
                <el-image :z-index="99999"
                          :src="item.pointPicPath ? previewUrl+ item.pointPicPath  :NoPicture"
                          fit="fit"></el-image>

              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { getRegion } from '@/utils'
import { previewUrl } from '@/api/base.js'
import { getPatrolDetailById, getReservoirImage } from '../inspectionTour/api'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    previewSrcLists() {
      let arr = []
      this.imgData.forEach((item) => {
        arr.push(previewUrl + item.pointPicPath)
      })
      return arr
    },
  },
  data() {
    return {
      previewUrl,
      imgData: [],
      handlerpic: [],
      handlerpicFlag: false,
      previewSrcList: [],
      timeVal: '',
      formData: {},
      spectionData: [
        { time: '2018 / 4 / 3', spection: 12, operation: 4, eve: 5, danger: 6 },
      ],
      contentList: [],

      NoPicture: require('@/assets/images/NoPicture.png'),
      rules: {},
    }
  },
  mounted() {
    //   获取详情接口
    this.formData = JSON.parse(JSON.stringify(this.data))
    console.log(this.formData, 'this.formData')
    this.handlerCar(this.formData.inspectRecordId)
    this.getHanderPic(this.formData.gid)
  },
  methods: {
    //   示意图接口
    async getHanderPic(val) {
      try {
        let { msg, data, status, total } = await getReservoirImage({
          reservoirId: val || 'c0658b437d7e499c86c8438ce5e0cda6',
        })
        if (status && data) {
          this.handlerpicFlag = true
          this.previewSrcList = [previewUrl + data.imageurl]
          this.handlerpic = previewUrl + data.imageurl
        } else {
          //   this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    //   点击卡片获取详情内容
    async handlerCar(val) {
      console.log(val)
      try {
        let { msg, data, status, total } = await getPatrolDetailById({
          inspectRecordId: val,
        })
        if (status) {
          this.imgData = data
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(error)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    //   修改时间查询时间列表
    async handlerChangeTime(val) {
      console.log(val)
      try {
        return
        let { msg, data, status, total } = await patrollist(val)
        if (status) {
          let list = data
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(error)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
  },
  watch: {
    data: {
      handler: function (newV, oldV) {
        // console.log(newV, "tb----------");
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style  lang='scss' scoped>
.spection-wrapper {
  width: 100%;
  height: 7.4rem;
  display: flex;
  padding: 0.1rem 0rem;
  .time-wrapper {
    flex: 2;
    .timeline-wrapper {
      padding-top: 0.1rem;
      padding-right: 0.1rem;
      height: 6.5rem;
      overflow-y: scroll;
      >>> .el-timeline {
        margin-left: 0.05rem !important;
      }
      >>> .el-card__body {
        padding: 0.02rem !important;
      }
      p {
        padding: 0.18rem;
      }
      span {
        display: inline-block;
        // width: 0.45rem;
        margin: 0 0.05rem;
        text-decoration: underline;
      }
    }
  }
  .detail-wrapper {
    flex: 9;
    height: 7.6rem;
    overflow-y: scroll;
    padding: 0 0.1rem 0;
    .detail-content {
      width: 100%;
      .title {
        font-size: 0.16rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        line-height: 0.3rem;
      }
      .info-wrapper {
        width: 80%;
        .info {
          width: 90%;
          height: 0.25rem;
          display: flex;
          justify-content: space-between;
          color: #000000;
          font-size: 0.16rem;
        }
      }
      .content {
        height: 0.25rem;
        span {
          font-size: 0.12rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000000;
          line-height: 0.23rem;
        }
      }

      .card-wrapper {
        display: flex;
        flex-wrap: wrap;
        >>> .el-card__body {
          padding: 0px !important;
        }
        .card-for {
          margin: 0.02rem;
        }
        .card-title {
          width: 100%;
          height: 0.38rem;
          text-align: center;
          line-height: 0.38rem;
          background: #f4fbf5;
          font-size: 0.16rem;
          color: #000000;
          border-bottom: 1px solid #999999;
        }
        .img-wrapper {
          padding: 0.1rem;
          img {
            width: 100%;
            height: 95%;
          }
        }
      }
    }
  }
}
.dialogCz {
  >>> .el-dialog__header {
    background: #29958b;
    padding: 0.1rem 0.4rem;
  }
  >>> .el-dialog .el-dialog__title,
  .el-dialog .dialog-title {
    color: #ffffff !important;
  }
  >>> .el-form {
    padding-top: 0.2rem;
  }
  >>> .el-icon-close:before {
    color: white;
  }
}
</style>