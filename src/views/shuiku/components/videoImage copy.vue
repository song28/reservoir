<!--
 * @Descripttion: 视频图像
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-24 09:47:20
 * @LastEditTime: 2021-10-19 10:44:50
-->
<template>
  <div class="videoImage">
    <div class="left">
      <div class="leftTopbar">
        <span style="padding-left:0.3rem">{{ addvnm }}{{ skName }}</span>
        <span class="videoFont">{{ siteListVideo.length }}</span>个视频站，
        <span class="imageFont">{{ siteListImage.length }}</span>个图像站，当前入侵报警
        <span class="alertFont">{{ innerAlert }}</span>个
      </div>
      <div v-if="activeName=='two' && showZc==true" style="height:0.4rem;width:100%">
        <p
          style="text-align:center;font-size:0.2rem;color:#ffb500f0;font-weight:bold;"
        >图像站【{{ siteName }}】正在召测中...</p>
        <div style="height:0.2rem;width:100%;">
          <el-progress :percentage="percentage" />
        </div>
      </div>
      <div class="leftCon">
        <div v-if="activeName=='one'" class="videoItem">
          <template v-if="!videoList.length">
            <div
              style="
                width: 100%;
                text-align: center;
                vertical-align: middle;
                padding-top: 2rem;
              "
            >
              <img :src="require('@/assets/images/sk/noNR.png')" style="height: 200px; text-align: center">
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) in videoList" :key="index" class="item">
              <template v-if="item.extranetPath">
                <iframe :src="item.extranetPath" width="100%" height="100%" />
              </template>
              <template v-else>
                <video
                  :id="'videoElement' + index"
                  class="centeredVideo"
                  controls
                  autoplay
                  width="100%"
                  height="100%"
                >Your browser is too old which doesn't support HTML5 video.</video>
              </template>
            </div>
          </template>
        </div>
        <div v-if="activeName=='two'" v-infinite-scroll="load" class="videoItem">
          <template v-if="!imageList.length">
            <div
              style="
                width: 100%;
                text-align: center;
                vertical-align: middle;
                padding-top: 2rem;
              "
            >
              <img :src="require('@/assets/images/sk/noNR.png')" style="height: 200px; text-align: center">
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) in imageList" :key="index" class="itemImage">
              <div class="timeText">
                <p class="text">{{ curentName }}</p>
                <p class="text">{{ item.creattime }}</p>
              </div>
              <el-image
                class="timeImg"
                :src="item.imageurl"
                style="height:100%; width:100%"
                :preview-src-list="[item.imageurl]"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="first">
        <div class="top">
          <div class="vid" :class="[activeName == 'one' ? 'active' : '']" @click="activeTab('one')">视频站</div>
          <div class="imag" :class="[activeName == 'two' ? 'active' : '']" @click="activeTab('two')">图像站</div>
        </div>
        <div v-if="activeName == 'one' " class="contral">
          <div class="title">视频控制</div>
          <div class="con">
            <el-row :gutter="4" style="text-align: center">
              <el-col :span="6" style="cursor:pointer">
                <el-image
                  :src="require('@/assets/images/video/icon/one_frames@2x.png')"
                  style="height: 0.2rem; width: 0.2rem"
                />
                <p>单画面</p>
              </el-col>
              <!-- <el-col :span="6">
                <el-image
                  :src="require('@/assets/images/video/icon/four_frames@2x.png')"
                  style="height:0.3rem;width:0.3rem"
                />
                <p>四画面</p>
              </el-col>
              <el-col :span="6">
                <el-image
                  :src="require('@/assets/images/video/icon/nine_frames@2x.png')"
                  style="height:0.3rem;width:0.3rem"
                />
                <p>九画面</p>
                </el-col>-->
              <el-col :span="6" style="cursor:pointer">
                <el-image
                  :src="require('@/assets/images/video/icon/Full_screen@2x.png')"
                  style="height: 0.2rem; width: 0.2rem"
                  @click="clickVideofullScreen"
                />
                <p>全屏</p>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="activeName == 'one'" class="contralBtn">
          <div class="title">云台控制</div>
          <div style="text-align:center;margin-top:0.05rem">
            速度：
            <el-input-number v-model="num4" :step="25" :min="1" :max="255" size="mini" />
          </div>

          <div class="con">
            <el-row
              v-for="(item, index) in videoBtnList"
              :key="index"
              :gutter="4"
              style="text-align: center;cursor:pointer;height:0.6rem"
            >
              <el-col :span="8">
                <el-image
                  :class="'controlImage' + videoBtnList[index][0].type"
                  style="height: 0.45rem; width: 0.45rem"
                  :src="videoBtnList[index][0].image"
                  @click="activeYunTai(videoBtnList[index][0].type,'click')"
                  @mouseup="
                    activeYunTai(videoBtnList[index][0].type, 'up')
                  "
                  @mousedown="
                    activeYunTai(videoBtnList[index][0].type, 'down')
                  "
                />
              </el-col>
              <el-col :span="8">
                <el-image
                  :class="'controlImage' + videoBtnList[index][1].type"
                  style="height: 0.45rem; width: 0.45rem"
                  :src="videoBtnList[index][1].image"
                  @click="activeYunTai(videoBtnList[index][1].type,'click')"
                  @mouseup="
                    activeYunTai(videoBtnList[index][1].type, 'up')
                  "
                  @mousedown="
                    activeYunTai(videoBtnList[index][1].type, 'down')
                  "
                />
              </el-col>
              <el-col :span="8">
                <el-image
                  :class="'controlImage' + videoBtnList[index][2].type"
                  style="height: 0.45rem; width: 0.45rem"
                  :src="videoBtnList[index][2].image"
                  @click="activeYunTai(videoBtnList[index][2].type,'click')"
                  @mouseup="
                    activeYunTai(videoBtnList[index][2].type, 'up')
                  "
                  @mousedown="
                    activeYunTai(videoBtnList[index][2].type, 'down')
                  "
                />
              </el-col>
            </el-row>
          </div>
          <div class="bottom">
            <div class="item">
              <el-image
                :src="require('@/assets/images/video/icon/on@2x.png')"
                style="height: 0.2rem; width: 0.2rem;"
                @click="activeYunTai(100,'click')"
                @mouseup="
                  activeYunTai(100, 'up')
                "
                @mousedown="
                  activeYunTai(100, 'down')
                "
              />开关
              <el-image
                :src="require('@/assets/images/video/icon/off@2x.png')"
                style="height: 0.2rem; width: 0.2rem"
              />
            </div>
            <div class="item">
              <el-image
                :src="require('@/assets/images/video/icon/start@2x.png')"
                style="height: 0.2rem; width: 0.2rem"
              />录制
              <el-image
                :src="require('@/assets/images/video/icon/stop@2x.png')"
                style="height: 0.2rem; width: 0.2rem"
              />
            </div>
            <div class="item">
              <el-image
                :src="require('@/assets/images/video/icon/add@2x.png')"
                style="height: 0.2rem; width: 0.2rem"
                @click="activeYunTai('irisin','click')"
                @mouseup="
                  activeYunTai('irisin', 'up')
                "
                @mousedown="
                  activeYunTai('irisin', 'down')
                "
              />光圈
              <el-image
                :src="require('@/assets/images/video/icon/sub@2x.png')"
                style="height: 0.2rem; width: 0.2rem"
                @click="activeYunTai('irisout','click')"
                @mouseup="
                  activeYunTai('irisout', 'up')
                "
                @mousedown="
                  activeYunTai('irisout', 'down')
                "
              />
            </div>
            <div class="item">
              <el-image
                :src="require('@/assets/images/video/icon/add@2x.png')"
                style="height: 0.2rem; width: 0.2rem"
                @click="activeYunTai('focusnear','click')"
                @mouseup="
                  activeYunTai('focusnear', 'up')
                "
                @mousedown="
                  activeYunTai('focusnear', 'down')
                "
              />焦距
              <el-image
                :src="require('@/assets/images/video/icon/sub@2x.png')"
                style="height: 0.2rem; width: 0.2rem"
                @click="activeYunTai('focusfar','click')"
                @mouseup="
                  activeYunTai('focusfar', 'up')
                "
                @mousedown="
                  activeYunTai('focusfar', 'down')
                "
              />
            </div>
          </div>
        </div>
        <div :class="[activeName == 'one' ? 'contralSite' : 'contralSiteImage']">
          <div class="title">站点选择</div>
          <div class="con">
            <el-row
              v-for="(item, index) in siteListVideo"
              v-if="activeName=='one'"
              :key="index"
              :gutter="4"
              style="text-align: left"
            >
              <el-col :span="18">
                <p>{{ item.name }}</p>
              </el-col>
            </el-row>
            <el-row
              v-for="(item, index) in siteListImage"
              v-if="activeName=='two'"
              :key="index"
              :gutter="4"
              style="text-align: left"
            >
              <el-col :span="14">
                <p>{{ item.name }}</p>
              </el-col>
              <el-col :span="10" style="text-align:right">
                <el-button type="primary" size="mini" @click="callImageClick(item,index)">召测</el-button>
              </el-col>
              <em />
            </el-row>
          </div>
        </div>
      </div>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="视频" name="first">
          <div class="first">
            <div class="title">
              视频控制
            </div>
            <div>
              <el-row>
                <el-col :span="6" />  <el-col :span="6" />  <el-col :span="6" />  <el-col :span="6" />
              </el-row>
            </div>
            <div />
          </div>
        </el-tab-pane>
        <el-tab-pane label="图像站" name="second">2</el-tab-pane>
   </el-tabs>-->
    </div>
  </div>
</template>
<script>
import flvjs from 'flv.js/dist/flv.min.js'
import {callImage, getImageList, group, ptz, ptzStop, preset, fi, fetchpreset} from './api'
import {WebSocketURL} from '@/api/websockets.js'
import Stomp from 'stompjs'
import {engineeringPartsOptions} from '../reservoirManagement/apiConfig'
export default {
  props: {
  // eslint-disable-next-line vue/require-default-prop
    videoData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      num4: 129,
      videoId: '',
      pageNo: 1,
      pageSize: 4,
      showZc: false,
      siteName: '',
      curentCusno: '',
      curentName: '',
      loading: false,
      addvnm: '',
      siteListVideo: [],
      siteListImage: [],
      imageList: [],
      bigImg: '',
      closeFlag: false,
      socket: {},
      socketUrl: WebSocketURL,
      devid: 'd433623ddd8e4e3182c4115ab297d595', // 设备编码
      percentage: 0, // 召测图片100%
      // imageList: [
      //   {
      //     url:
      //   'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      //     name: '1fdfasdfsdfsdfsdfsdfasdfasd'
      //   }, {
      //     url:
      //   'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      //     name: '1fdfasdfsdfsdfsdfsdfasdfasd'
      //   },
      //   {
      //     url:
      //   'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      //     name: '1fdfasdfsdfsdfsdfsdfasdfasd'
      //   }, {
      //     url:
      //   'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      //     name: '1fdfasdfsdfsdfsdfsdfasdfasd'
      //   },
      //   {
      //     url:
      //   'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      //     name: '1fdfasdfsdfsdfsdfsdfasdfasd'
      //   }, {
      //     url:
      //   'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      //     name: '1fdfasdfsdfsdfsdfsdfasdfasd'
      //   }
      // ],
      rscd: '',
      count: 0,
      flvPlayer: [],
      videoList: [],
      addvcd: '0',
      skName: '0',
      videonum: '0',
      imagenum: '0',
      innerAlert: '0',
      activeName: 'one',
      siteList: [
        //   {
        //     url:
        // 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        //     name: '1fdfasdfsdfsdfsdfsdfasdfasd'
        //   },
      ],
      videoBtnList: [
        [
          {
            image: require('@/assets/images/video/icon/mov_l_s@2x.png'),
            type: 4
          },
          {
            image: require('@/assets/images/video/icon/mov_mid_s@2x.png'),
            type: 0
          },
          {
            image: require('@/assets/images/video/icon/mov_ri_s@2x.png'),
            type: 6
          }
        ],
        [
          {
            image: require('@/assets/images/video/icon/mov_mid_l@2x.png'),
            type: 2
          },
          {
            image: require('@/assets/images/video/icon/mov_mid@2x.png'),
            type: 'reset'
          },
          {
            image: require('@/assets/images/video/icon/mov_mid_r@2x.png'),
            type: 3
          }
        ],
        [
          {
            image: require('@/assets/images/video/icon/mov_l_x@2x.png'),
            type: 5
          },
          {
            image: require('@/assets/images/video/icon/mov_mid_x@2x.png'),
            type: 1
          },
          {
            image: require('@/assets/images/video/icon/mov_r_x@2x.png'),
            type: 7
          }
        ]
      ]
    }
  },
  watch: {
    'videoData.data': {
      handler: function(newV, oldV) {
        console.log(newV, '传递过去的data')
        this.imageList = [] // 图像站图片列表
        this.videoList = [] // 视频播放列表
        this.siteListImage = [] // 图像站站点
        this.siteListVideo = [] // 视频站点
        this.rscd = '' // 获取水库id
        this.skName = '' // 获取水库id
        if (newV.length) {
          this.videonum = 0
          this.imagenum = 0
          newV.forEach((e, i) => {
            if (this.rscd == '') {
              this.skName = e.name
              this.rscd = e.rscd
              this.alertNum()
            }
            if (e.deviceType === '1') {
              this.videonum = this.videonum + 1
              this.videoList.push(e)
              this.siteListVideo.push(e)
            } else {
              this.imagenum = this.imagenum + 1
              this.curentCusno = e.servicePath // 设备
              this.curentName = e.name
              this.siteListImage.push(e)
            }
          })
          if (this.activeName == 'one') {
            this.$nextTick(() => {
              this.playVideo()
            })
            if (this.videoList.length > 0) {
              this.videoId = this.videoList[0].id
            }
          } else {
            this.pageNo = 1
            this.getHistory()
          }
        }
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {
    this.addvnm = this.$store.state.user.addvnm
  },
  destroyed() {
    this.flvPlayer.forEach(e => {
      e.pause()
      e.destroy()
      e = null
    })
  },
  methods: {
  // 预警统计数量
    async alertNum() {
      const pam = {
        data: {
          rscd: this.rscd,
          addvcd: this.$store.state.user.addvcd
        }
      }
      const {data, status} = await group(pam)
      if (status) {
        console.log(data, '统计数量')
        data.forEach((item, i, a) => {
          if (item.warn_type == 4096) {
            this.innerAlert = item.count
          }
        })
      } else {
        this.options = []
      }
    },
    load() {
      this.pageNo++
      this.getHistory()
    },
    // 获取召测图片历史数据
    getHistory() {
      this.showZc = false
      if (this.pageNo == 1) {
        this.imageList = []
      }
      const params = {
        rscd: this.rscd,
        sn: this.curentCusno,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      getImageList(params).then(res => {
        if (res.status) {
          this.imageList = [...this.imageList, ...res.data]
        } else {
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 召测图片
    callImageClick(data, i) {
      this.showZc = true
      this.siteName = data.name
      this.curentCusno = data.servicePath
      this.percentage = 0
      const params = data.servicePath
      callImage(params).then(res => {
        if (res.status) {
          this.$notify({
            title: '成功',
            message: '指令下发成功',
            type: 'success'
          })
          this.devid = res.data
          this.initWebSocket()
        } else {
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 初始化weosocket
    initWebSocket() {
      console.log(Stomp, 'Stomp=======', this.socketUrl)
      this.socket = Stomp.client(this.socketUrl)
      const headers = {}
      this.socket.connect(headers, this.onConnectedTensor, this.onFailed)
    },
    onConnectedTensor() {
      this.connected = true
      this.subAll()
    },
    // 订阅全部
    subAll() {
      var topicDevice = '/topic/iotdevice/' + this.devid
      this.socket.subscribe(
        topicDevice,
        this.responseDeviceStatusCallback,
        this.onFailedSubAll
      )
    },
    responseDeviceStatusCallback(frame) {
      var self = this
      var content = JSON.parse(frame.body)
      const paramsData = content.data
      const [nowProcess, allProcess, cameraType, imgUrl] = paramsData.split(',')
      if (Number(allProcess) < 0) return
      console.log(content, 'content------websocket------')
      if (content == null) {
        return
      } else {
        if (content.data == '设备不在线') {
          self.$notify({
            title: '失败',
            message: '设备不在线',
            type: 'error'
          })
          return
        }
        if (content.ntype == 96) {
          if (nowProcess == allProcess && imgUrl != undefined) {
            self.bigImg = imgUrl
            this.pageNo = 1
            self.getHistory()
            // self.imageList.unshift(
            //   {
            //     imageurl: imgUrl,
            //     creattime: content.createtime
            //   }
            // )
            console.log(
              imgUrl,
              'bigImg',
              self.bigImg,
              'self.bigImg',
              self.imgList,
              'self.imgList'
            )
          }
          if (nowProcess >= allProcess && imgUrl != undefined) {
            self.percentage = 100
            self.showZc = false
          } else {
            const aa = (Number(nowProcess) / Number(allProcess)) * 100
            self.percentage = Number(aa.toString().substring(0, 2))
            console.log(self.percentage, 'self.percentage')
          }
        }
      }
    },
    onFailedSubAll() {
      if (this.connected) {
        this.subAll()
      }
    },
    onFailed(frame) {
      if (!this.closeFlag) {
        this.initWebSocket()
      }
    },
    // 站点选择
    // async getList() {
    //   this.siteList = [];
    //   const pam = { rscd: this.rscd };
    //   try {
    //     const { msg, data, status, total } = await getRsrPosListByRscd(pam);
    //     if (status) {
    //       data.forEach((e, i, a) => {
    //         engineeringPartsOptions.forEach((e2) => {
    //           if (e.poscode == e2.value) {
    //             e.posName = e2.label;
    //           }
    //         });
    //       });
    //       this.siteList = data;
    //     } else {
    //       this.$notify.error({
    //         title: "失败",
    //         message: msg,
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    clickVideofullScreen() {},
    playVideo() {
      if (flvjs.isSupported()) {
        this.videoList.forEach(async(e, i, a) => {
          console.log(e.extranetPath, '000000000111111')
          if (!e.extranetPath) {
            console.log(111111)
            const str =
       'rtsp://' +
       e.deviceUsername +
       ':' +
       e.devicePassword +
       '@' +
       e.deviceIp +
       '/' +
       e.devicePort
            const url = e.servicePath + '/' + window.btoa(str) + '/live.flv'
            this.startPlay('videoElement' + i, url)
          }
        })
      }
    },
    startPlay(id, url) {
      const videoElement = document.getElementById(id)
      const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: url
      })
      flvPlayer.attachMediaElement(videoElement)
      flvPlayer.load()
      flvPlayer.play()
      this.flvPlayer.push(flvPlayer)
    },
    // 接收修改水库信息
    activeTab(data) {
      this.activeName = data
      if (data == 'one') {
        this.socket &&
     this.socket.disconnect(() => {
       window.socket = null
     })
      } else if (data == 'two') {
        this.pageNo = 1
        this.getHistory()
      }
      console.log(data)
    },
    // 获取下级通道预设位置

    // 预设位置控制
    // 云台页面
    async activeYunTai(data, mouseType) {
      console.log(data, '云台')

      if (mouseType == 'down') {
        $('.controlImage' + data).animate(
          {height: '0.55rem', width: '0.55rem'},
          300
        )
      } else if (mouseType == 'up') {
        $('.controlImage' + data).animate(
          {height: '0.45rem', width: '0.45rem'},
          600
        )
      }
      // this.videoPtzStart(
      //     { videoId: this.videoOnlyID, direction: type },
      //     mouseType
      //   );
      console.log(typeof (data), 'dddddddd')
      if (typeof (data) === 'number') {
        const pam = {
          videoId: this.videoId,
          direction: data,
          speed: this.num4
        }
        const {data: startvideoData, status} = await ptz(pam)
        if (status) {
          console.log(startvideoData, '开始播放')
          if (mouseType == 'click' || mouseType == 'up') {
            const stopPam = {
              videoId: this.videoId
            }
            const {data: stopvideoData, status: statusData} = await ptzStop(stopPam)
            if (statusData) {
              console.log('停止播放', stopvideoData)
            }
          }
        }
      } else if (data == 'reset') {
        // 预设点
        const pam = {
          videoId: this.videoId
        }
        const {data: resetvideoDataGq, status: statusReset} = await fetchpreset(pam)
        if (statusReset) {
          console.log('预设点', JSON.parse(resetvideoDataGq))
        }
      } else {
        // 光圈放大缩小
        const pam = {
          videoId: this.videoId,
          command: data,
          speed: this.num4
        }
        const {data: startvideoDataGq, status: statusGq} = await fi(pam)
        if (statusGq) {
          console.log(startvideoDataGq, '开始光圈控制')
          if (mouseType == 'click' || mouseType == 'up') {
            const stopPam = {
              videoId: this.videoId,
              command: 'stop',
              speed: this.num4
            }
            const {data: stopvideoDataGq, status: statusDataGq} = await fi(stopPam)
            if (statusDataGq) {
              console.log('停止光圈控制', stopvideoDataGq)
            }
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.videoImage {
 display: flex;
 width: 100%;
 height: 90%;
 .left {
  height: 100%;
  width: calc(100% - 2.4rem);
  .leftTopbar {
   margin-top: 0.1rem;
   background: #c8faf5;
   border: 1px solid #c3ff00;
   width: 100%;
   height: 0.6rem;
   font-size: 0.16rem;
   line-height: 0.4rem;
   font-weight: bold;

   .videoFont,
   .imageFont {
    font-size: 0.18rem;
    color: #29958b;
   }
   .alertFont {
    font-size: 0.18rem;
    color: red;
   }
  }
  .leftCon {
   overflow: auto;
   width: 100%;
   height: calc(100% - 0.7rem);
   .videoItem {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    justify-items: center;
    overflow: auto;
    .item {
     pointer-events: none;
     margin: 1% 0%;
     width: 99%;
     height: 98%;
    }
    .itemImage {
     position: relative;
     margin: 0.25% 0%;
     width: 49.5%;
     height: 50%;
     .timeText {
      font-size: 0.1rem;
      text-align: left;
      position: absolute;
      /* top: .05rem; */
      width: 1.4rem;
      color: #000;
      padding: 0.04rem;
      z-index: 10;
      background: rgba(255, 255, 255, 0.6);
      // opacity: 0.6;
      .text {
       font-size: 0.1rem;
       color: rgb(19, 18, 18);

       font-weight: bold;
      }
     }
     .timeImg {
      z-index: 8;
      height: 100%;
      width: 100%;
     }
    }
   }
  }
 }
 .right {
  border: 1px solid #cfe5e1;
  height: 100%;
  margin-left: 0.1rem;
  width: 2.3rem;
  .first {
   width: 100%;
   height: 100%;
   // border:1px solid red;
   overflow: hidden;
   .top {
    display: flex;
    height: 0.4rem;
    width: 100%;
    background: #c8faf5;
    .vid {
     text-align: center;
     line-height: 0.4rem;
     width: 50%;
     height: 0.4rem;
     cursor: pointer;
    }
    .imag {
     width: 50%;
     height: 0.4rem;
     text-align: center;
     line-height: 0.4rem;
     cursor: pointer;
    }
    .active {
     color: #29958b;
     border-bottom: 2px solid #29958b;
    }
   }
   .contral {
    width: 100%;
    margin-top: 0.05rem;
    border: 1px solid #29958b;
    .title {
     height: 0.3rem;
     line-height: 0.3rem;
     text-align: center;
     background: #29958b;
     color: #fff;
    }
    .con {
     margin: 0.05rem;
    }
   }

   .contralBtn {
    height: 3.1rem;
    margin-top: 0.05rem;
    border: 1px solid #29958b;
    .title {
     height: 0.3rem;
     line-height: 0.3rem;
     text-align: center;
     background: #29958b;
     color: #fff;
    }
    .con {
     height: 1.75rem;
     margin: 0.05rem 0.1rem;
    }
    .bottom {
     height: 0.58rem;
     background: #c8faf5;
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
     justify-items: center;
     .item {
      width: 50%;
      margin-top: 0.05rem;
      display: flex;
      justify-content: center;
      justify-items: center;
      cursor: pointer;
     }
    }
   }
   .contralSite,
   .contralSiteImage {
    cursor: pointer;
    height: calc(100% - 4.5rem);
    width: 100%;
    margin-top: 0.01rem;
    overflow: hidden;
    border: 1px solid #29958b;
    .title {
     height: 0.3rem;
     line-height: 0.3rem;
     text-align: center;
     background: #29958b;
     color: #fff;
    }
    .con {
     height: calc(100% - 0.35rem);
     width: 100%;
     padding: 0.1rem;
     overflow-y: scroll;
    }
   }
   .contralSiteImage {
    height: calc(100% - 0.5rem);
   }
  }
 }
}
</style>
