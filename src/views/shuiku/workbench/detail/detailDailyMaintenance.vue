<!--
 * @Author: dang
 * @Date: 2021-04-13 09:59:15
 * @LastEditTime: 2021-09-04 17:17:13
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\workbench\detail\detailDailyMaintenance.vue
-->
<template>
  <el-dialog :title="data.title"
             :visible.sync="dialogDailyVisible"
             :before-close="handleClose"
             :close-on-click-modal="false"
             width="60%">
    <div class="spection-wrapper">
      <!-- 左侧时间 -->
      <div class="time-wrapper"
           v-if="isMonth">
        <div class="timeline-wrapper">
          <el-timeline>
            <el-timeline-item v-for='(item,index) in spectionData'
                              :key="index"
                              :timestamp="item.tm"
                              placement="top">
              <el-card :style="{background: index == activeIndex ? '#31ccbd':''}">
                <p @click="handlerCar(item,index)"><span v-if="item.pbkq>=1">坝坡砍青 {{item.pbkq}}</span>
                  <span v-if="item.gdqy>=1">沟道清淤 {{item.gdqy}}</span>
                  <span v-if="item.tbqs>=1">踏步清扫 {{item.tbqs}}</span>
                  <span v-if="item.scwh>=1">水尺维护 {{item.scwh}}</span>
                  <span v-if="item.yhdql>=1">溢洪道清理
                    {{item.yhdql}}</span>
                  <span v-if="item.qbjfws>=1">启闭机房卫生 {{item.qbjfws}}</span>
                  <span v-if="item.qbjsq>=1">启闭机刷漆 {{item.qbjsq}}</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="detail-wrapper">
        <div class="detail-content">
          <!-- 示意图 -->
          <div class="block">
            <!-- <el-image style="width: 60px; height: 35px"
                      :previewSrcList='handlerpic'
                      :z-index="99999"
                      :src="previewSrcList"
                      fit="fit"> </el-image>
            <span class="demonstration">点击查看示意图</span> -->
          </div>
          <!-- 内容tab -->
          <el-tabs v-model="activeName"
                   @tab-click="handleTabClick">
            <el-tab-pane :label="item.label"
                         v-for="(item,index) in tableList"
                         :key="index"
                         :name="item.name">
              <div class="info-wrapper">
                <div class="info-content">
                  <div class="info">
                    <span> 开始时间： {{ item.stm}}</span>
                    <span> 结束时间： {{item.createTime}}</span>
                  </div>
                  <div class="info">
                    <span> 巡查人： {{ item.person}}</span>
                    <span> 联系方式 ：{{item.phone}}</span>
                  </div>
                  <div class="info">
                    <span> 描述： {{ item.desc}}</span>
                    <span> 养护类型：{{ item.implementTypeLab}}</span>
                  </div>
                  <div class="info">
                    <div class="yuyin"
                         v-if="item.audios && item.audios.length>0 ">
                      <span style="font-weight:bold;padding:10px;paddingLeft:0"> 语音描述:</span>
                      <el-image style="width:auto;height:28px;"
                                :src="yuyinImg"
                                @click="playAudeo(item.audios[0])">
                      </el-image>
                      <!-- {{ playLength }}s -->
                      <span style="margin-left:0px;"
                            @click="playAudeo(item.audios[0])">点击播放</span>

                    </div>
                  </div>
                </div>
                <!-- 按钮群 -->
                <div class="info-btn">
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="!remarkFlag"
                             @click="remarkFlag = !remarkFlag"
                             size="mini">批注</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="handlerSaveInfo(item,'1')"
                             size="mini">生成交付单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="handlerSaveInfo(item,'2')"
                             size="mini">生成表扬单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="remarkFlag = !remarkFlag"
                             size="mini">取消</el-button>
                  <a :href=" outNetUrl+ item.delivery[0]"
                     v-if="item.delivery && item.delivery.length>0"
                     target="_blank"
                     rel="nofollow">
                    <el-button type="skbtn"
                               plain
                               round
                               size="mini">查看交付单</el-button>
                  </a>
                  <a :href=" outNetUrl+ item.praise[0]"
                     v-if="item.praise && item.praise.length>0"
                     target="_blank"
                     rel="nofollow">

                    <el-button type="skbtn"
                               plain
                               round
                               size="mini">查看表扬单</el-button>
                  </a>
                </div>
              </div>
              <div class="time-wrapper">
                <div class="timeline-wrapper">
                  <el-timeline>

                    <el-timeline-item v-for='(ite,idx) in item.imgs'
                                      :key="idx"
                                      :timestamp="ite.label   "
                                      placement="top">
                      <!-- previewUrl+-->
                      <template v-if="idx == 0 || idx == 1">
                        <el-image :z-index="99999"
                                  v-for='(it,idex) in ite.imgurl'
                                  :key="idex"
                                  :preview-src-list="previewSrcLists"
                                  style="width: 210px; height:300px;margin:20px;"
                                  :src="it ? previewUrl+ it  :NoPicture "
                                  fit="fit"></el-image>
                      </template>
                      <template v-if="idx == 2 || idx == 3 ">
                        <div>
                          <video v-for="(it,idex) in ite.imgurl"
                                 :key="idex"
                                 style="margin:20px;"
                                 id="myvideo"
                                 :src=" videoUrl+ it"
                                 controls="controls"
                                 :poster="videoImg"
                                 :muted="muteStatus"
                                 height="280"
                                 width="450">
                            your browser does not support the video tag
                          </video>
                        </div>
                      </template>
                      <!-- 视频 -->
                      <!-- 批注 -->
                      <el-row v-if="remarkFlag&& ite.imgurl.length>0">
                        <el-col :span="1"
                                style="padding-top:0.05rem">
                          <label for="批注">
                            批注
                          </label>
                        </el-col>
                        <el-col :span="18">
                          <el-input label="批注"
                                    size="small"
                                    clearable
                                    v-model="ite.remark"
                                    placeholder="请填写批注"></el-input>
                        </el-col>
                      </el-row>

                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </el-tab-pane>

          </el-tabs>
        </div>

      </div>
      <audio controls="controls"
             preload
             id="music"
             hidden>
        <source src=""
                type="audio/ogg" />
        <source src=""
                type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </el-dialog>
</template>
<script>
import { getRegion } from '@/utils'
import { formatDate } from '@/utils/time.js'
import { previewUrl, videoUrl, audioUrl, outNetUrl } from '@/api/base.js'
import {
  getPatrolDetailById,
  getReservoirImage,
  monthStatisticsList,
  monthStatisticsYHListDetail,
  generateAssignedOrder,
} from '../api'
export default {
  props: {
    dialogDailyVisible: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    data: {
      type: Object,
    },
  },
  computed: {
    previewSrcLists() {
      let arr = []
      this.tableList.forEach((item) => {
        if (item.label === this.labelName) {
          item.imgs.map((ite) => {
            if (ite.label == '养护前图片' || ite.label == '养护后图片') {
              ite.imgurl.map((it) => {
                arr.push(previewUrl + it)
              })
            }
          })
        }
      })
      return arr
    },
  },
  data() {
    return {
      videoUrl,
      audioUrl,
      outNetUrl,
      yhType: [
        { label: '坝坡砍青', value: '0' },
        { label: '沟道清淤', value: '1' },
        { label: '踏步清扫', value: '2' },
        { label: '水尺维护', value: '3' },
        { label: '溢洪道清理', value: '4' },
        { label: '启闭机房卫生', value: '5' },
        { label: '启闭机刷漆', value: '6' },
      ],
      audio: null,
      previewUrl,
      playLength: 0,
      activeIndex: '0',
      showGif: false,
      yuyinImg: require('@/assets/images/语音.png'),
      muteStatus: false,
      playStatus: 'false',
      videoImg: '',
      firstEntryFlag: true,
      isMonth: false,
      remarkFlag: false,
      dayOrMonthValue: '',
      tabType: '',
      labelName: '养护记录一',
      activeName: '1',
      tableList: [],
      imgData: [],
      handlerpic: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ],
      previewSrcList:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //    [
      //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //   ],
      timeVal: '',
      formData: {},
      spectionData: [],
      NoPicture: require('@/assets/images/NoPicture.png'),
      rules: {},
    }
  },
  methods: {
    async getMonthList() {
      try {
        let params = {
          gid: this.formData.gid,
          type: 2, //1、巡查 2、养护
          tmType: 2, //1、日 2、月
        }
        let { msg, data, status, total } = await monthStatisticsList(params)
        if (status) {
          //   this.handlerpic = [previewUrl + data.imageurl]
          //   if (this.firstEntryFlag) {
          //     this.firstEntryFlag = false
          //     // todo 需要放开  this.handlerCar()
          //   }
          this.handlerCar(data[0], 0)
          this.spectionData = data
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    transFormData() {
      console.log(this.formData, 'this.formData')
      this.isMonth = this.formData.isMonth
      this.tabType = this.formData.tabType
      this.dayOrMonthValue = this.formData.dayOrMonthValue
      this.formData.tm = formatDate(
        this.formData.dayOrMonthValue,
        '{y}-{m}-{d}'
      )
      // todo 需要放开   this.getHanderPic(this.formData.gid)
      if (this.isMonth) {
        //是否是月
        this.getMonthList()
      } else {
        //日否是日
        this.handlerCar(this.formData)
      }
      // this.handlerCar(this.formData.inspectRecordId)
    },
    //   保存批注单
    async handlerSaveInfo(item, type) {
      this.remarkFlag = !this.remarkFlag
      try {
        let params = {
          type,
          gid: this.formData.gid,
          inspectRecordId: item.inspectRecordId,
          imgs: [],
        }
        if (item.imgs.length > 0) {
          item.imgs.forEach((ite) => {
            if (ite.remark != null && ite.remark != '') {
              ite.imgurl.forEach((it) => {
                let obj = {}
                if (ite.label == '养护前图片' || ite.label == '养护后图片') {
                  obj = {
                    imageurl: it,
                    imagename: ite.label,
                    remark: ite.remark,
                  }
                }
                params.imgs.push(obj)
              })
            }
          })
        }
        let { status, data, msg } = await generateAssignedOrder(params)
        if (status) {
          console.log(data, 'data')
          this.handlerCar(this.formData, this.activeIndex)
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleTabClick(val) {
      removeEventListener('ended', this.changePng)
      this.audio = null
      this.labelName = val.label
      this.yuyinImg = require('@/assets/images/语音.png')
      this.remarkFlag = false
    },
    //关闭弹框
    handleClose() {
      this.data.data = {}
      this.$emit('update:dialogDailyVisible', false) //触发 input 事件，并传入新值
    },
    //   示意图接口
    async getHanderPic(val) {
      try {
        let { msg, data, status, total } = await getReservoirImage({
          reservoirId: val || 'c0658b437d7e499c86c8438ce5e0cda6',
        })
        if (status) {
          this.handlerpic = [previewUrl + data.imageurl]
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    changePng() {
      console.log('1')
      this.yuyinImg = require('@/assets/images/语音.png')
    },
    //播放录音文件
    playAudeo(val) {
      console.log(val, 'audioUrl')
      if (!this.showGif) {
        if (!this.audio) {
          this.audio = document.getElementById('music') //必须用原生js获取id，jquery无效
          this.audio.src = audioUrl + val
          this.audio.addEventListener('ended', this.changePng, false)
        }

        if (this.audio.paused) {
          this.audio.play()
          this.yuyinImg = require('@/assets/images/语音gif.gif')
        } else {
          this.audio.pause()
          this.yuyinImg = require('@/assets/images/语音.png')
        }
      } else {
        this.audio.pause()
        this.yuyinImg = require('@/assets/images/语音.png')
      }
      //   this.showGif = !this.showGif
      //   //切换图片
      //   audio.src = audioUrl + val
      //   this.showGif = !this.showGif
      //   if (this.showGif) {
      //     audio.play()
      //     this.yuyinImg = require('@/assets/images/语音gif.gif')
      //   } else {
      //     this.yuyinImg = require('@/assets/images/语音.png')
      //   }
      //   if (audio.paused) {
      //     audio.play()
      //   } else {
      //     audio.pause()
      //   }
    },
    //   点击卡片获取详情内容
    async handlerCar(val, index) {
      //   if (this.activeIndex == index) return
      this.remarkFlag = false
      this.tableList = []
      try {
        this.activeName = '1'
        this.activeIndex = index
        let params = {
          gid: this.formData.gid,
          type: 2, //1、巡查 2、养护
          //   tmType: 1, //1、日 2、月
          tm: val.tm,
        }
        let { msg, data, status, total } = await monthStatisticsYHListDetail(
          params
        )
        if (status) {
          this.yhType.forEach((ite) => {
            data.map((item, index, arr) => {
              if (ite.value == item.implementType) {
                arr[index]['implementTypeLab'] = ite.label
              }
            })
          })

          this.tableList = data
          //   if (this.tableList.audios && this.tableList.audios.length > 0) {
          //     let strArr = this.detailData.audios[0].imagename.split('_')
          //     this.playLength = strArr[strArr.length - 1]
          //     this.autoVideo = audioUrl + this.tableList.audios[0].imageurl
          //   }
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
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
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
  },
  watch: {
    data: {
      handler: function (newV, oldV) {
        if (newV.gid && newV.tabType == 'yh') {
          this.formData = JSON.parse(JSON.stringify(this.data))
          this.transFormData()
        }
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
      height: 6.1rem;
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
    height: 6.1rem;
    // overflow-y: scroll;
    padding: 0 0.1rem 0;
    .detail-content {
      width: 100%;
      position: relative;
      .block {
        position: absolute;
        right: 0;
        z-index: 99998;
      }
      .title {
        font-size: 0.16rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        line-height: 0.3rem;
      }
      >>> .el-tabs__nav-wrap {
        width: 77%;
      }
      .info-wrapper {
        width: 100%;
        display: flex;
        .info-content {
          width: 60%;
          margin-bottom: 0.1rem;
          .info {
            width: 90%;
            height: 0.25rem;
            display: flex;
            justify-content: space-between;
            color: #000000;
            font-size: 0.16rem;
            .yuyin {
              height: 40px;
              // line-height: 40px;
              >>> .el-image {
                vertical-align: middle;
              }
            }
          }
        }
        .info-btn {
          width: 35%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: flex-start;
        }
      }
      .time-wrapper {
        .timeline-wrapper {
          height: 5rem;
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
>>> .el-dialog__close {
  color: #fff !important;
}
</style>