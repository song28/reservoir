<!--
 * @Author: dang
 * @Date: 2021-04-13 09:59:15
 * @LastEditTime: 2021-09-06 15:08:21
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\workbench\detail\detailDailyMaintenanceNODia.vue
-->
<template>
  <!-- <el-dialog :title="data.title"
             :visible.sync="dialogDailyVisible"
             :before-close="handleClose"
             :close-on-click-modal="false"
             width="60%"> -->
  <div class="spection-wrapper">
    <template v-if="NullData">
      <!-- 左侧时间 -->
      <div
        v-if="isMonth"
        class="time-wrapper"
      >
        <div class="timeline-wrapper">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in spectionData"
              :key="index"
              :timestamp="item.tm"
              placement="top"
            >
              <el-card :style="{background: index == activeIndex ? '#31ccbd':''}">
                <p @click="handlerCar(item,index)">
                  <span v-if="item.pbkq>=1">坝坡砍青 {{ item.pbkq }}</span>
                  <span v-if="item.gdqy>=1">沟道清淤 {{ item.gdqy }}</span>
                  <span v-if="item.tbqs>=1">踏步清扫 {{ item.tbqs }}</span>
                  <span v-if="item.scwh>=1">水尺维护 {{ item.scwh }}</span>
                  <span v-if="item.yhdql>=1">溢洪道清理
                    {{ item.yhdql }}</span>
                  <span v-if="item.qbjfws>=1">启闭机房卫生 {{ item.qbjfws }}</span>
                  <span v-if="item.qbjsq>=1">启闭机刷漆 {{ item.qbjsq }}</span>
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
          <el-tabs
            v-model="activeName"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              v-for="(item, index) in tableList"
              :key="index"
              :label="item.label"
              :name="item.name"
            >
              <div class="info-wrapper">
                <div class="info-content">
                  <div class="info">
                    <span> 开始时间： {{ item.stm }}</span>
                    <span> 结束时间： {{ item.createTime }}</span>
                  </div>
                  <div class="info">
                    <span> 巡查人： {{ item.person }}</span>
                    <span> 联系方式 ：{{ item.phone }}</span>
                  </div>
                  <div class="info">
                    <span> 描述： {{ item.desc }}</span>
                    <span> 养护类型：{{ item.implementTypeLab }}</span>
                  </div>
                  <div class="info">
                    <div
                      v-if="item.audios && item.audios.length > 0"
                      class="yuyin"
                    >
                      <span style="font-weight:bold;padding:10px;paddingLeft:0">
                        语音描述:</span>
                      <el-image
                        style="width:auto;height:28px;"
                        :src="yuyinImg"
                        @click="playAudeo(item.audios[0])"
                      />
                      <!-- {{ playLength }}s -->
                      <span
                        style="margin-left:0px;"
                        @click="playAudeo(item.audios[0])"
                      >点击播放</span>
                    </div>
                  </div>
                </div>
                <!-- 按钮群 -->
                <!-- <div class="info-btn">
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
                             @click="handlerSaveInfo(item)"
                             size="mini">生成交付单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="handlerSaveInfo"
                             size="mini">生成表扬单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="remarkFlag = !remarkFlag"
                             size="mini">取消</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="item.delivery"
                             size="mini">查看交付单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="item.praise"
                             size="mini">查看表扬单</el-button>
                </div> -->
              </div>
              <div class="time-wrapper">
                <div class="timeline-wrapper">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(ite, idx) in item.imgs"
                      :key="idx"
                      :timestamp="ite.label"
                      placement="top"
                    >
                      <!-- previewUrl+-->
                      <template v-if="idx == 0 || idx == 1">
                        <el-image
                          v-for="(it, idex) in ite.imgurl"
                          :key="idex"
                          :z-index="99999"
                          style="width: 210px; height:300px;margin:20px;"
                          :src="it ? previewUrl + it : NoPicture"
                          fit="fit"
                        />
                      </template>
                      <template v-if="idx == 2 || idx == 3">
                        <div>
                          <video
                            v-for="(it, idex) in ite.imgurl"
                            id="myvideo"
                            :key="idex"
                            style="margin:20px;"
                            :src="videoUrl + it"
                            controls="controls"
                            :poster="videoImg"
                            :muted="muteStatus"
                            height="280"
                            width="450"
                          >
                            your browser does not support the video tag
                          </video>
                        </div>
                      </template>
                      <!-- 视频 -->
                      <!-- 批注 -->
                      <el-row v-if="remarkFlag">
                        <el-col
                          :span="1"
                          style="padding-top:0.05rem"
                        >
                          <label for="批注">
                            批注
                          </label>
                        </el-col>
                        <el-col :span="18">
                          <el-input
                            v-model="ite.remark"
                            label="批注"
                            size="small"
                            clearable
                            placeholder="请填写批注"
                          />
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
      <audio
        id="music"
        controls="controls"
        preload
        hidden
      >
        <source
          src=""
          type="audio/ogg"
        >
        <source
          src=""
          type="audio/mpeg"
        >
        Your browser does not support the audio element.
      </audio>
    </template>
    <template v-if="!NullData">
      <div style="width: 100%;text-align: center;vertical-align: middle;padding-top:2rem;position: absolute;">
        <img
          :src="require('@/assets/images/sk/noNR.png')"
          style="height:200px;text-align:center"
        >
      </div>
    </template>
  </div>
  <!-- </el-dialog> -->
</template>
<script>
import {getRegion} from '@/utils'
import {formatDate} from '@/utils/time.js'
import {previewUrl, videoUrl, audioUrl} from '@/api/base.js'
import {
  getPatrolDetailById,
  getReservoirImage,
  monthStatisticsList,
  monthStatisticsYHListDetail
} from '../api'
export default {
  props: {
    dialogDailyVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      NullData: true,
      videoUrl,
      audioUrl,
      yhType: [
        {label: '坝坡砍青', value: '0'},
        {label: '沟道清淤', value: '1'},
        {label: '踏步清扫', value: '2'},
        {label: '水尺维护', value: '3'},
        {label: '溢洪道清理', value: '4'},
        {label: '启闭机房卫生', value: '5'},
        {label: '启闭机刷漆', value: '6'}
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
      activeName: '1',
      tableList: [
        // {
        //   label: '巡查记录一',
        //   name: 'first',
        //   person: '党党1',
        //   phone: '15935268521',
        //   stm: '20201865',
        //   createTime: '2035785',
        //   sw: '大把修复',
        //   delivery: '123',
        //   praise: '56',
        //   audios: [],
        //   imgData: [
        //     {
        //       pointName: '党党',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '12',
        //     },
        //     {
        //       pointName: '党党11',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '',
        //     },
        //   ],
        //   imgs: [
        //     {
        //       label: '养护前照片',
        //       imgurl: [
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       ],
        //     },
        //     {
        //       label: '养护前视频',
        //       imgurl: [
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       ],
        //     },
        //     {
        //       label: '养护后照片',
        //       imgurl: [
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       ],
        //     },
        //     {
        //       label: '养护后视频',
        //       imgurl: [
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       ],
        //     },
        //   ],
        // },
        // {
        //   label: '巡查记录二',
        //   name: 'second',
        //   person: '党党2',
        //   phone: '15935268521',
        //   stm: '20201865',
        //   createTime: '2035785',
        //   sw: 152,
        //   imgData: [
        //     {
        //       pointName: '党党2',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '',
        //     },
        //   ],
        // },
        // {
        //   label: '巡查记录三',
        //   name: 'third',
        //   person: '党党3',
        //   phone: '15935268521',
        //   stm: '20201865',
        //   createTime: '2035785',
        //   sw: 152,
        //   imgData: [
        //     {
        //       pointName: '党党3',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '',
        //     },
        //   ],
        // },
      ],
      imgData: [],
      handlerpic: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      previewSrcList:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //    [
      //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //   ],
      timeVal: '',
      formData: {},
      spectionData: [
        // { time: '2018 / 4 / 3', spection: 0, operation: 0, eve: 0, danger: 0 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 14, eve: 5, danger: 6 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 4, eve: 5, danger: 6 },
        // {
        //   time: '2018 / 4 / 3',
        //   spection: 22,
        //   operation: 4,
        //   eve: 5,
        //   danger: 666,
        // },
        // { time: '2018 / 4 / 3', spection: 12, operation: 4, eve: 5, danger: 6 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 14, eve: 5, danger: 6 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 4, eve: 5, danger: 6 },
        // {
        //   time: '2018 / 4 / 3',
        //   spection: 22,
        //   operation: 4,
        //   eve: 5,
        //   danger: 666,
        // },
      ],
      NoPicture: require('@/assets/images/NoPicture.png'),
      rules: {}
    }
  },
  computed: {
    previewSrcLists() {
      const arr = []
      this.imgData.forEach((item) => {
        arr.push(previewUrl + item.pointPicPath)
      })
      return arr
    }
  },
  watch: {
    data: {
      handler: function(newV, oldV) {
        if (newV.rscd && newV.tabType == 'yh') {
          this.formData = JSON.parse(JSON.stringify(this.data))
          this.transFormData()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async getMonthList() {
      try {
        const params = {
          gid: this.formData.rscd,
          type: 2, // 1、巡查 2、养护
          tmType: 2 // 1、日 2、月
        }
        const {msg, obj, status, total} = await monthStatisticsList(params)
        if (status == 200) {
          //   this.handlerpic = [previewUrl + data.imageurl]
          //   if (this.firstEntryFlag) {
          //     this.firstEntryFlag = false
          //     // todo 需要放开  this.handlerCar()
          //   }

          if (obj.length > 0) {
            this.handlerCar(obj[0], 0)
          } else {
            this.NullData = false
          }
          this.spectionData = obj
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
      // todo 需要放开   this.getHanderPic(this.formData.rscd)
      if (this.isMonth) {
        // 是否是月
        this.getMonthList()
      } else {
        // 日否是日
        this.handlerCar(this.formData)
      }
      // this.handlerCar(this.formData.inspectRecordId)
    },
    //   保存批注单
    handlerSaveInfo(item) {
      this.remarkFlag = !this.remarkFlag
      console.log(item)
    },
    handleTabClick(val) {
      removeEventListener('ended', this.changePng)
      this.audio = null

      this.yuyinImg = require('@/assets/images/语音.png')
      this.remarkFlag = false
    },
    // 关闭弹框
    handleClose() {
      this.data.data = {}
      this.$emit('update:dialogDailyVisible', false) // 触发 input 事件，并传入新值
    },
    //   示意图接口
    async getHanderPic(val) {
      try {
        const {msg, obj, status, total} = await getReservoirImage({
          reservoirId: val || 'c0658b437d7e499c86c8438ce5e0cda6'
        })
        if (status == 200) {
          this.handlerpic = [previewUrl + obj.imageurl]
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
    // 播放录音文件
    playAudeo(val) {
      console.log(val, 'audioUrl')
      if (!this.showGif) {
        if (!this.audio) {
          this.audio = document.getElementById('music') // 必须用原生js获取id，jquery无效
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
      this.tableList = []
      try {
        this.activeName = '1'
        this.activeIndex = index
        const params = {
          gid: this.formData.rscd,
          type: 2, // 1、巡查 2、养护
          //   tmType: 1, //1、日 2、月
          tm: val.tm
        }
        const {msg, obj, status, total} = await monthStatisticsYHListDetail(
          params
        )
        if (status == 200) {
          this.yhType.forEach((ite) => {
            obj.map((item, index, arr) => {
              if (ite.value == item.implementType) {
                arr[index]['implementTypeLab'] = ite.label
              }
            })
          })

          this.tableList = obj
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
        const {msg, obj, status, total} = await patrollist(val)
        if (status == 200) {
          const list = obj
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    }
  }
}
</script>

<style  lang='scss' scoped>
.spection-wrapper {
  width: 100%;
  height: calc(7rem - 55px);
  display: flex;
  padding: 0.1rem 0rem;
  .time-wrapper {
    flex: 2;
    .timeline-wrapper {
      padding-top: 0.1rem;
      padding-right: 0.1rem;
      height: 6.1rem;
      overflow-y: auto;
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
    height: 6.2rem;
    overflow-y: hidden;
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
          height: 4.8rem;
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
