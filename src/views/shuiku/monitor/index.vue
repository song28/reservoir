<template>
  <div class="container">
    <!-- 水库目录 -->
    <div class="sklist">
      <div class="topBar">{{ this.$store.state.user.addvnm }}水库目录
        <el-image
          :src="require('@/assets/images/sk/icon-packup.png')"
          style="position:absolute;top:0.05rem;right:0.06rem;z-index:9;"
          @click="openskList"
        />
      </div>
      <div v-if="openTreeList" class="skCon">
        <DamLeftTreeBar :data="dataTree" @backDataChecked="backData" @backDataNode="backDataNode" />
      </div>
    </div>
    <!-- 地图 -->
    <ol-map
      v-if="show"
      class="z-map"
      :map-num="mapNum"
      :marketlist="marketlist"
      :user-list="userList"
      :weather-radar-data="weatherRadarData"
      :weather-cloud-data="weatherCloudData"
      :right-flag="rightFlag"
      :right-type="rightContent"
      :hp-positin="hpPositin"
      :detail-no-positin="personDetailInfo"
      :video-list-data="videoListData"
      @close-diaolog="closeDialogFun"
    />
    <div class="right-total" :style="{ right: rightWidthBar }">
      <div class="rightBarTotal">
        <p class="skNum">{{ rsrCount }}</p>
        <p>水库总数</p>
      </div>
      <div class="rightBarTotal">
        <p class="ceNum">{{ pointCount }}</p>
        <p>测站总数</p>
      </div>
      <div class="rightBarTotal">
        <p class="yjNum">{{ warnCount }}</p>
        <p>实时预警</p>
      </div>
    </div>
    <!-- 右侧信息框内容 -->
    <div class="right-btn" :style="{ right: rightWidth }" @click="showAndHiddenRightBox">
      <template v-if="rightFlag == true">
        <i class="iconfont icondaohangshouqi-" />
      </template>
      <template v-if="rightFlag == false">
        <span class="hidden">
          <i class="iconfont icondaohangshouqi-" />
        </span>
      </template>
    </div>
    <div v-if="rightFlag" class="map-right">
      <div class="right-header">
        <div :class="activeIndex == 1 ? 'active-header' : ''" @click="changeTab(1)">水库</div>
        <div :class="activeIndex == 2 ? 'active-header' : ''" @click="changeTab(2)">气象</div>
        <div :class="activeIndex == 3 ? 'active-header' : ''" @click="changeTab(3)">人员</div>
        <div :class="activeIndex == 5 ? 'active-header' : ''" @click="changeTab(5)">预警</div>
      </div>
      <div class="right-content">
        <component
          :is="rightContent"
          @weatherRadar="acceptData"
          @weatherCloud="acceptDataCloud"
          @videoPam="acceptDataVideo"
          @hpPositin="acceptDataHpPosion"
          @userHpPositin="useracceptDataHpPosion"

          @PatrolUsers="patrolUsers"
          @detailNoPositin="detailNoPositin"
          @fitterSk="fitterSk"
        />
      </div>
    </div>
    <mapDialog
      v-if="dialogVisible"
      :common-data="commonData"
      :tab-name="tabName"
      @closeDialogMap="closeDialogDD"
    />
  </div>
</template>
<script>
import DamLeftTreeBar from '../components/tree/damLeftTreeBar.vue'
import {mapMutations} from 'vuex'
import olMap from '../../../components/Map/OlMap/index'
// 水库组件
import skList from './components/skList'
// 气象组件
import weather from './components/weather'
// 通知组件
import notice from './components/notice'
// 人员组件
import patrolUser from './components/patrolUser'
// 预警
import alert from './components/alert'
import {WebAlertSocketURL} from '@/api/websockets.js'

// 控制面板
import mapDialog from '../components/Dialog'
import geoChina from '../../../../public/中华人民共和国边界.json'

import {
  getPerson,
  cloudList,
  allMonitor,
  queryLocationByPac,
  getPointBsinWarnByAddvcd
} from './api'
export default {
  components: {

    olMap,
    skList,
    weather,
    mapDialog,
    patrolUser,
    notice,
    DamLeftTreeBar,
    alert
  },
  data() {
    return {
      role: 'some', // some 部分权限 all 所有权限 超级管理员
      tabName: 'four',
      commonData: {data: null},
      dialogVisible: false,
      socket: {},
      socketUrl: WebAlertSocketURL,
      rscd: 'd433623ddd8e4e3182c4115ab297d595', // 设备编码
      userId: '',
      pointCount: null,
      rsrCount: null,
      warnCount: null,
      show: false,
      openTreeList: true, // 打开树列表
      dataTree: {
        type: 2,
        title: '水库列表',
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false
      },
      waterlevelstatus: '', // 1正常，2超汛限，3超高程，超设计
      count: 1,
      rightWidth: '4.1rem', // 隐藏按钮的右侧距离
      rightWidthBar: '4.1rem',
      pastTime: '',
      currentTime: '',
      weatherRadar: [],
      weatherCloud: [],
      marketlist: [],
      userList: [],
      hpPositin: {},
      weatherRadarData: [],
      weatherCloudData: [],
      rightContent: 'weather', // 右侧内容组件名称
      activeIndex: 2, // 右侧当前显示tab下标
      rightFlag: true, // 右侧信息栏的内容
      videoListData: [],
      closeDialog: false,
      timer: null,
      personDetailInfo: null,
      mapNum: {}
    }
  },
  computed: {},
  watch: {
    closeDialog: {
      handler(val) {
        // this.getList()
      }
    }
  },

  async mounted() {
    // 如果是超级管理员，地图定位全中国
    this.getRole()
    this.userId = this.$store.state.user.userId
    this.districtClassification()
    this.getPointBsinWarnByAddvcdNum({addvcd: this.$store.state.user.addvcd, rscd: ''})
    if (this.role == 'some') {
      await this.getJSONAndJWD(this.$store.state.user.addvcd)
    } else {
      this.getDistrictLng(geoChina.features[0].properties.center)
      const chinaArr = []
      geoChina.features.forEach((e) => {
        e.geometry.coordinates.forEach((b) => {
          chinaArr.push(b[0])
        })
      })
      this.getGeoJSON(chinaArr)
      this.show = true
    }
    await this.getSkListAll()
    this.initWebSocket()
    // this.getCloudList();
    this.getUer() // 你的方法
    // this.timer = setInterval(() => {
    // this.getUer() // 你的方法
    // const num = Math.floor(Math.random() * 100) + 1
    // console.log(Math.floor(Math.random() * 100) + 1)
    // this.changeCount(num)
    // }, 5 * 60 * 1000)
    window.dumpInfo = this.dumpInfo
  },
  methods: {
    ...mapMutations(['changeMapLevel', 'changeCount', 'getDistrictLng', 'getGeoJSON', 'getShengShiXXLevel']),
    // 账号权限
    getRole() {
      const {roles} = JSON.parse(sessionStorage.getItem('userInfo'))
      const some = roles.some((e) => {
        return e.rolename == '超级管理员'
      })
      if (some) {
        this.role = 'all'
      } else {
        this.role = 'some'
      }
    },
    dumpInfo(rscd) {
      // alert('dddd')
      this.marketlist.forEach((e, i, a) => {
        if (rscd == e.rscd) {
          this.commonData.data = e
          this.commonData.type = 'detail'

          this.dialogVisible = true
        }
      })
    },
    // 关闭弹窗
    closeDialogDD() {
      this.dialogVisible = false
    },
    // 初始化weosocket
    initWebSocket() {
      this.socket = Stomp.client(this.socketUrl)
      const headers = {}
      this.socket.connect(headers, this.onConnectedTensor, this.onFailed)
    },
    onConnectedTensor() {
      this.connected = true
      this.marketlist.forEach((e) => {
        this.subAll(e.rscd)
      })
    },
    // 订阅全部
    subAll(rscd) {
      var topicDevice = '/topic/warn/' + rscd
      this.socket.subscribe(
        topicDevice,
        this.responseDeviceStatusCallback,
        this.onFailedSubAll
      )
    },
    responseDeviceStatusCallback(frame) {
      var self = this
      var content = JSON.parse(frame.body)
      console.log(content, '.data------websocket------')
      if (content.id) {
        let name = ''
        this.marketlist.forEach((e) => {
          if (e.rscd == content.rscd) {
            name = e.rsnm
          }
        })
        this.$notify({
          title: '警告',
          dangerouslyUseHTMLString: true,
          message: `<p onclick="dumpInfo('${content.rscd}')">${name}发生预警,请注意处理</p>`,
          // message: name + '发生预警,请注意处理',
          type: 'warning',
          duration: '5000',
          position: 'bottom-right'
        })
      }

      // const [nowProcess, allProcess, cameraType, imgUrl] = paramsData.split(',')
      // if (Number(allProcess) < 0) return
      // if (content == null) {
      //   return
      // } else {
      // if (content.data == '设备不在线') {
      //   self.$notify({
      //     title: '失败',
      //     message: '设备不在线',
      //     type: 'error'
      //   })
      //   return
      // }
      // if (content.ntype == 96) {
      //   if (nowProcess == allProcess && imgUrl != undefined) {
      //     self.bigImg = imgUrl
      //     this.pageNo = 1
      //     self.getHistory()
      //     // self.imageList.unshift(
      //     //   {
      //     //     imageurl: imgUrl,
      //     //     creattime: content.createtime
      //     //   }
      //     // )
      //     console.log(
      //       imgUrl,
      //       'bigImg',
      //       self.bigImg,
      //       'self.bigImg',
      //       self.imgList,
      //       'self.imgList'
      //     )
      //   }
      //   if (nowProcess >= allProcess && imgUrl != undefined) {
      //     self.percentage = 100
      //     self.showZc = false
      //   } else {
      //     const aa = (Number(nowProcess) / Number(allProcess)) * 100
      //     self.percentage = Number(aa.toString().substring(0, 2))
      //     console.log(self.percentage, 'self.percentage')
      //   }
      // }
      // }
    },
    onFailedSubAll() {
      if (this.connected) {
        this.marketlist.forEach((e) => {
          this.subAll(e.rscd)
        })
      }
    },
    onFailed(frame) {
      if (!this.closeFlag) {
        this.initWebSocket()
      }
    },
    // 行政区归类, 地图缩放级别
    districtClassification() {
      let zoom = 4
      if (this.role == 'some') {
        // 1 省（23）、2自治区（5）、3直辖市（4）、4特别行政区（2）
      // 直辖市--北京、天津、上海、重庆
      // 自治区--内蒙古自治区、广西壮族自治区、西藏自治区、宁夏回族自治区、新疆维吾尔自治区
        let count = null // 行政区从后往前连续0的个数
        const arr = []
        for (let i = 0; i < 12; i++) {
          arr.push(this.$store.state.user.addvcd.toString().charAt(i))
        }
        arr.reverse()
        if (this.$store.state.user.addvcd) {
          arr.some((e, i, a) => {
            if (e != 0) {
              count = i
              return true
            }
          })
        }
        if (count >= 10) {
          zoom = 7
        // console.log('省', 1) // 5
        } else if (count < 10 && count >= 8) {
          zoom = 8
        // console.log('市', 2) // 8
        } else if (count < 8 && count >= 6) {
          zoom = 10
        // console.log('县', 3)
        } else {
          zoom = 12
        // console.log('乡', 4)
        }
      } else {
        zoom = 4
      }
      this.getShengShiXXLevel(zoom)
    },
    // 根据行政区编码判断省市县乡村级别
    getLevel(addvcd) {
      let count = null // 行政区从后往前连续0的个数
      let level = null // 属于省市县的哪个级别
      const arr = []
      for (let i = 0; i < 12; i++) {
        arr.push(addvcd.toString().charAt(i))
      }
      arr.reverse()
      if (addvcd) {
        arr.some((e, i, a) => {
          if (e != 0) {
            count = i
            return true
          }
        })
      }
      if (count >= 10) {
        level = 1
      } else if (count < 10 && count >= 8) {
        level = 2
      } else if (count < 8 && count >= 6) {
        level = 3 // 12
      } else {
        level = 4 // 13
      }
      return level
    },
    // 获得水库总数，测站总数，实时预警
    async getPointBsinWarnByAddvcdNum(pam) {
      const {msg, obj, status} = await getPointBsinWarnByAddvcd(pam)
      if (status == 200) {
        this.pointCount = obj.pointCount
        this.rsrCount = obj.rsrCount
        this.warnCount = obj.warnCount
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 点击水库目录的展开与缩放
    openskList() {
      this.openTreeList = !this.openTreeList
      if (this.openTreeList == false) {
        $('.sklist').animate({width: '1.4rem'})
      } else {
        $('.sklist').animate({width: '2.3rem'})
      }
    },
    // 获取地图经纬度和地图的json数据
    async getJSONAndJWD(addvcd) {
      const that = this
      // eslint-disable-next-line eqeqeq
      await queryLocationByPac({addvcd: addvcd}).then(function(res) {
        that.getDistrictLng(res.obj.location.split(','))
        that.getGeoJSON(res.obj.polylineList)
        that.show = true
      })
    },
    backData(data) {
      // console.log(data, '树列表返回的值')
    },
    // 点击根据不同的行政区编码高亮返回的值
    backDataNode(data) {
      let rscd = ''
      // console.log(data, '返回的数列表')
      const level = this.getLevel(data.addvcd)
      this.changeMapLevel(level)
      if (data.rscd) {
        rscd = data.rscd
        this.marketlist.forEach((e, i, a) => {
          if (data.rscd == e.rscd) {
            this.hpPositin = e
          }
        })
        this.changeMapLevel(4)
      }
      // 统计数量
      this.getPointBsinWarnByAddvcdNum({addvcd: data.addvcd, rscd: rscd})
      // 经纬度和行政边界
      this.getJSONAndJWD(data.addvcd)
    },
    // 右侧面板显示或者隐藏功能
    showAndHiddenRightBox() {
      this.rightFlag = !this.rightFlag
      if (!this.rightFlag) {
        this.rightWidth = '0rem'
        this.rightWidthBar = '0rem'
      } else {
        this.rightWidth = '4.1rem'
        this.rightWidthBar = '4.1rem'
      }
    },
    // 查询水库列表数据
    async getSkListAll() {
      this.marketlist = []
      const pam = {
        page: null,
        size: null,
        waterlevelstatus: this.waterlevelstatus, // 水位状态
        systemid: '', // 系统唯一ID'
        roleid: '', // 角色唯一ID'
        userid: this.userId, // 用户唯一ID'
        addvcd: this.$store.state.user.addvcd, // 行政区划编码'
        warningstatus: '' // 预警状态'
      }
      // this.options = []
      const {msg, data, status, total} = await allMonitor(pam)
      if (status == 200) {
        this.marketlist = data
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 查询地图人员数据
    getUer() {
      const that = this
      that.userList = []
      getPerson({addvcd: this.$store.state.user.addvcd}).then(function(res) {
        res.data.forEach(e => {
          e.pointRole = 'user'
          that.userList.push(e)
        })
      })
    },

    // 接收雷达图
    acceptData(data) {
      this.weatherRadarData = data
    },
    // 接收云图
    acceptDataCloud(data) {
      this.weatherCloudData = data
    },
    // 接收视频连线
    acceptDataVideo(data) {
      this.videoListData = data
    },
    // 接收过滤水库
    fitterSk(data) {
      this.waterlevelstatus = data
      // this.marketlist = data
      this.getSkListAll()
    },
    // 接收人员定位
    detailNoPositin(data) {
      this.personDetailInfo = data
    },
    // 接收过滤人员
    patrolUsers(data) {
      this.userList = data
    },
    // 人员列表的定位
    useracceptDataHpPosion(data) {
      this.hpPositin = data
      // if (data.clickType == 'sk') {
      //   this.marketlist.forEach((e, i, a) => {
      //     if (data.rscd == e.rscd) {
      //       this.hpPositin = e
      //     }
      //   })
      // } else {
      //   this.hpPositin = data
      // }
    },
    // 接收水库定位
    acceptDataHpPosion(data) {
      this.marketlist.forEach((e, i, a) => {
        if (data.rscd == e.rscd) {
          this.hpPositin = e
        }
      })
    },
    // 右侧点击框tab栏的切换事件
    changeTab(index) {
      this.activeIndex = index
      switch (index) {
        case 1:
          this.rightContent = 'skList'
          break
        case 2:
          this.rightContent = 'weather'
          break
        case 3:
          this.rightContent = 'patrolUser'
          break
        case 4:
          this.rightContent = 'notice'
          break
        case 5:
          this.rightContent = 'alert'
          break
      }
    },
    closeDialogFun(data) {
      this.closeDialog = data
    },
    // 过去-今天
    // queryTime(day) {
    //   const pastTime = this.$moment()
    //     .subtract(day, 'days')
    //     .format('YYYY-MM-DD HH:mm:ss')
    //   const currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
    //   this.pastTime = pastTime
    //   this.currentTime = currentTime
    //   return [pastTime, currentTime]
    // },
    // 1：雷达图 2：水汽云图
    getCloudList() {
      const that = this
      cloudList({
        stm: this.pastTime,
        end: this.currentTime,
        cid: 1
      }).then(function(res) {
        res.data.forEach(element => {
          that.weatherRadar.push({
            time: element.tm,
            imgbase: 'http://116.52.166.246:9920/weather/cloud/image/' + element.id
          })
        })
        that.weatherRadarData = that.weatherRadar
      })
      cloudList({
        stm: this.pastTime,
        end: this.currentTime,
        cid: 2
      }).then(function(res) {
        res.data.forEach(element => {
          that.weatherCloud.push({
            time: element.tm,
            imgbase: 'http://116.52.166.246:9920/weather/cloud/image/' + element.id
          })
        })
        that.weatherCloudData = that.weatherCloud
      })
    }
  },
  beforeDestroy() {
    // clearInterval(this.timer)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
@import "~@/styles/variables.scss";
$rightWidth: 462px;
$rightMaxWidth: 7.96rem;
$headerHeight: 0;
>>>.el-tree-node{
  padding:0px
}
.z-map {
 width: 100%;
 height: 100%;
}
.breadcrumb-wrapper {
 display: none !important;
}
.container {
 width: 100%;
 height: 100%;
 .sklist {
  position: absolute;
  z-index: 9;
  top: 0.4rem;
  left: 0.8rem;
  background: #ffffff;
  max-height: 6rem;
  width: 2.3rem;
  box-shadow: #29958b;
  overflow:hidden;
  .topBar {
   padding-left:0.1rem;
   background: #29958b;
   height: 0.3rem;
   line-height: 0.3rem;
   width: 100%;
   text-align: left;
   color: #fff;
  }
  .skCon{
    overflow:auto;
    max-height: 5.7rem;
  }
  .tree{
    height:100% !important
  }
 }
 // 右侧框内容
 .right-btn {
  position: absolute;
  z-index: 9;
  top: 0;
  right: 4.1rem;
  background: #5cd1c5;
  width: 32px;
  line-height: 28px;
  height: 28x;
  border-radius: 8px 0px 0px 8px;
  text-align: center;
  color: white;
  cursor: pointer;
  .hidden .icondaohangshouqi- {
   display: inline-block;
   transform: rotate(-180deg);
  }
 }
 .right-total{
  position: absolute;
  text-align: center;
  z-index: 9;
  top: 0.5rem;
  .rightBarTotal{
    padding: 0.05rem 0.1rem;
    margin: 0.05rem 0.1rem;
    background: #EDFFFD;
    border-radius:0.08rem;
    border:1px solid #29958B;
    p{
      margin:0px;
      padding:0px
    }
    .skNum{
      font-size: 0.2rem;
      font-weight: bold;
      color:#29958B
    }
    .ceNum{
      font-size: 0.2rem;
      font-weight: bold;
      color:#17D128
    }
    .yjNum{
       font-size: 0.2rem;
      font-weight: bold;
      color:#DD1539
    }
  }
 }
 .map-right {
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  z-index: 9;
  display: flex;
  width: 4.1rem;
  height: 100%;
  flex-direction: column;
  background: #5cd1c5;
  box-shadow: rgba(11, 211, 94, 0.25) -2px 2px 4px 0px;
  // 右侧头部信息
  .right-header {
   height: 28px;
   background-color: #5cd1c5;
   display: flex;
   color: white;
   font-size: 16px;
  }
  .right-header div {
   flex: 1;
   text-align: center;
   line-height: 28px;
   cursor: pointer;
  }
  .right-header .active-header {
   background: rgba(255, 255, 255, 0.25);
   color: #29958b;
   font-weight: bold;
  }
  // 右侧主内容区
  .right-content {
   flex: 1;
   padding: 0px 5px 5px 5px;
   background: #5cd1c5;
  }
 }
}
</style>
