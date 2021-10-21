<template>
  <div class="containerMap">
    <!-- 视频连线 -->
    <div
      v-if="showOpenVideoWebApp"
      style="z-index:999999;position:absolute;height:80%;top:10%;width:80%;left:10%;background-color:#cfe5e1"
    >
      <el-button
        icon="el-icon-close"
        type="primary"
        style="margin:10px;text-align:right"
        @click="closePop"
      >关闭</el-button>
      <!-- <iframe
        frameborder="no"
        border="0"
        style="z-index:999999;position:absolute;height:calc(100% - 60px);top:60px;width:100%;left:0px;background-color:white"
        src="https://192.168.1.110:8080/#/"
        ref="iframe1"
        name="iframe1"
   ></iframe>-->
      <!-- <iframe
        frameborder="no"
        border="0"
        style="z-index:999999;position:absolute;height:calc(100% - 60px);top:60px;width:100%;left:0px;background-color:white"
        :src="
          'https://192.168.1.110:8080/?token=' +
            JSON.stringify(showOpenVideoWebAppData)
        "
        ref="iframe"
   ></iframe>-->
    </div>

    <!-- 地图容器 -->
    <div v-if="showpop" id="popup" class="ol-popup">
      <a id="popup-closer" href="#" class="ol-popup-closer" />
      <div id="popup-title" class="title" />
      <div id="popup-content">
        <pop
          v-if="showPopUser"
          :point-data="currentPopPointData"
          :point="markert"
          @showVideoWebApp="showVideoWebApp"
        />
        <skpop v-if="!showPopUser" :point-data="currentPopPointData" @backskData="backskData" />
      </div>
    </div>

    <div id="map" class="map" />
    <!-- 左侧tool -->
    <div class="map-btn-box">
      <map-control
        :right-type="rightType"
        :close-dialog-map="closeDialogMapData"
        @tool="mapToolClick"
        @map-change="mapChange"
      />
    </div>

    <div class="more">
      <map-dialog
        v-if="dialogData"
        :tab-name="tabName"
        :common-data="commonData"
        @updateMarket="updateMarket"
        @closeDialogMap="closeDialogMap"
      />
    </div>
    <!-- 雷达、云图 -->
    <div v-if="!clickWeatherBtn" class="radar">
      <div class="timeBar">
        <div class="changeDateType dis">
          <div class="result">实况</div>
          <p>更改时间</p>
          <ul>
            <li class="cur">实况</li>
            <li>预报</li>
            <div class="bottomSj" />
          </ul>
        </div>
        <div class="playBar">
          <div
            :class="playBtn == true ? 'playBtn stopBtn' : 'playBtn'"
            style="visibility: visible"
            @click="playBar"
          />
          <div class="timeLine">
            <span :style="{ width: lineWidth + '%' }" />
          </div>
          <ul id="timeSpan" class="night">
            <li
              v-for="(item, index) in radarList"
              :key="index"
              style="width: 4.166666666666667%"
              :class="curIndex == index ? 'cur' : ''"
            >
              <div class="cursor" />
              <span :class="curIndex == index ? '' : 'dis'">
                {{
                  item.detailTime
                }}
              </span>
              <div class="eachTime">{{ item.time }}</div>
            </li>
          </ul>
        </div>
      </div>
      <ul class="btnList">
        <li :class="cur == 1 ? 'cur' : ''" data-type="radar" @click="radarCloud(1)">
          <i class="caseBtn_radar" />
          <span>雷达</span>
        </li>
        <li :class="cur == 2 ? 'cur' : ''" data-type="cloudy" class @click="radarCloud(2)">
          <i class="caseBtn_cloudy" />
          <span>云图</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {videoCall, openVideoWin, generatePanoToken} from '@/api/base'
import mapDialog from '../../../views/shuiku/components/Dialog'
// 映入css文件、
// import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
// 引入图例
import mapControl from './control'
// 引入弹框组件popHiddenPoint
import pop from './pop'
import skpop from './skpop'

import 'ol/ol.css'
import {Map, View, ol} from 'ol'
import TileLayer from 'ol/layer/Tile'
import {Image as ImageLayer} from 'ol/layer'
// 网页端
import XYZSource from 'ol/source/XYZ'
// 移动端
import OSMSource from 'ol/source/OSM'
import {fromLonLat} from 'ol/proj'
// 添加标记物
import Vectors from 'ol/layer/Vector.js'
import Cluster from 'ol/source/Cluster'
import {WMTS, Vector, ImageArcGISRest} from 'ol/source.js'
import Feature from 'ol/Feature'
import OlGeomPoint from 'ol/geom/Point'
import OlStyleStyle from 'ol/style/Style'
import Circle from 'ol/style/Circle'

import OlStyleIcon from 'ol/style/Icon'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import {toSize} from 'ol/size'
import GeoJSON from 'ol/format/GeoJSON'
import WebGLPointsLayer from 'ol/layer/WebGLPoints'
// 线段
import {Point, Polygon, LineString, MultiPolygon} from 'ol/geom'
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'

// 添加标记物的点击事件
import Overlay from 'ol/Overlay.js'
// 删除点
// 自适应点
import SimpleGeometry from 'ol/geom/SimpleGeometry'
import extent from 'ol/extent'
// 边界数据
import {defaults as defaultControls, OverviewMap} from 'ol/control'
import MousePosition from 'ol/control/MousePosition'
// ---------------------------------------------------------------------
// 添加雷达图片
import Static from 'ol/source/ImageStatic'
import proj4 from 'proj4'
import {register} from 'ol/proj/proj4'
import {transform} from 'ol/proj'
import {getCenter} from 'ol/extent'
// 隐患点定位弹框
import 'ol-ext/control/Permalink.css'
import 'ol-ext/control/Search.css'
import 'ol-ext/control/Swipe.css'
import 'ol-ext/control/Permalink.css'
import 'ol-ext/control/Search.css'
import 'ol-ext/control/LayerSwitcherImage.css'
import 'ol-ext/control/Bar.css'

import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage'
import Bar from 'ol-ext/control/Bar'
import Button from 'ol-ext/control/Button'
import Toggle from 'ol-ext/control/Toggle'
import Select from 'ol/interaction/Select'
import OverlayPopup from 'ol-ext/overlay/Popup'

// import VectorSource from 'ol/source/Vector';
// import {Vector as VectorLayer} from 'ol/layer';
import areaGeo from '../../../../public/浏阳市.json'
import PanoRtc from '@pano.video/panortc'
// 初始化 panortc
const rtcEngine = new PanoRtc.RtcEngine()
// 全局单例
window.rtcEngine = rtcEngine
export default {
  components: {
    mapControl,
    pop,
    skpop,
    mapDialog
  },
  props: [
    'marketlistData',
    'userList',
    'rightFlag',
    'weatherRadarData',
    'weatherCloudData',
    'hpPositin',
    'rightType', // 标签
    'detailNoPositin'
  ],
  data() {
    return {
      layerRouter: null,
      showOpenVideoWebApp: false,
      showOpenVideoWebAppData: {},
      showpop: false,
      showPopUser: false,
      currentPopPointData: {},
      tabName: 'first',
      lineWidth: 2.08333,
      curIndex: 0,
      closeDialogMapData: '',
      radarList: [
        // {
        //   detailTime: "10-22 09:10",
        //   time: "09:10"
        // },
      ],
      playBtn: false,
      cur: 1,
      dialogData: false,
      content: '',
      closer: '', // 地图关闭id
      container: '', // 弹框id
      overlay: '', // 关闭弹框id
      titlecloser: '', // 标题
      layer: null,
      features: [],
      map: null,
      mapChangeData: {},
      markert: [],
      imageExtent: null,
      imageLayer: null,
      imageSmoothing: null,
      imgStaticFirst: '',
      time: '',
      weatherRadarCloudData: [],
      commonData: {},
      mPopup: null,
      clickWeatherBtn: true,
      showUserPoint: true, // 显示巡查员的点
      showSkPoint: true, // 显示水库的点
      showName: false,
      vector_line: {},
      iframeWin: null
    }
  },
  computed: {
    ShengShiXXLevel() {
      return this.$store.state.mapZoom
    },
    DistrictLng() {
      return this.$store.state.districtLng
    },
    geoJSONarea() {
      console.log('json数据')
      return this.$store.state.geoJSON
    }
  },
  watch: {
    ShengShiXXLevel: {
      handler(newV, oldV) {
        // this.map.getView().animate({
        //   // 只设置需要的属性即可
        //   zoom: this.ShengShiXXLevel, // 缩放级别
        //   center: [this.DistrictLng[0], this.DistrictLng[1]], // 中心点
        //   rotation: undefined, // 缩放完成view视图旋转弧度
        //   duration: 2000 // 缩放持续时间，默认不需要设置
        // })
      },
      deep: true
    },
    DistrictLng: {
      handler(newV, oldV) {
        this.map.getView().animate({
          // 只设置需要的属性即可
          zoom: 8, // 缩放级别
          center: [this.DistrictLng[0], this.DistrictLng[1]], // 中心点
          rotation: undefined, // 缩放完成view视图旋转弧度
          duration: 2000 // 缩放持续时间，默认不需要设置
        })
      // const view = this.map.getView()
      //   view.setZoom(8)
      //   this.map.getView().setCenter([this.DistrictLng[0], this.DistrictLng[1]])
      },
      deep: true
    },
    geoJSONarea: {
      handler(newV, oldV) {
        console.log(newV, '行政区')
        this.addArea(newV)
      },
      deep: true
    },
    marketlistData: {
      handler(newV, oldV) {
        const u = []
        this.markert.forEach(e => {
          if (e.pointRole == 'user') {
            u.push(e)
          }
        })
        this.markert = u
        newV.forEach(e => {
          e.pointRole = 'skPoint'
          this.markert.push(e)
        })
      },
      deep: true,
      immediate: true
    },
    userList: {
      handler(newV, oldV) {
        const arr = []
        // 清楚之前的数据
        this.markert.forEach((e, i, a) => {
          if (e.pointRole === 'user') {
          } else {
            arr.push(e)
          }
        })
        this.markert = arr
        newV.forEach(e => {
          this.markert.push(e)
        })
      },
      deep: true,
      immediate: true
    },
    markert: {
      handler(newV, oldV) {
        this.$nextTick(() => {
          if (newV.length) {
            this.createMarket(newV)
          }
        })
      },
      deep: true,
      immediate: true
    },
    // 侧边栏放大与缩小
    rightFlag: {
      handler(newV, oldV) {
        if (newV == false) {
          $('.tuli').css({right: '10px'})
          $('.container .timeBar .playBar ul').css({width: '94%'})
        } else {
          $('.tuli').css({right: '420px'})
          $('.container .timeBar .playBar ul').css({
            width: 'calc( 94% - 4.1rem)'
          })
        }
      }
    },
    hpPositin: {
      handler(newV, oldV) {
        newV.lat = Number(newV.nrlt)
        newV.lng = Number(newV.eslg)
        this.handleRenderOverlay(newV)
      }
    },
    detailNoPositin: {
      handler(newV, oldV) {
        this.tabName = 'third'
        this.commonData = {data: newV, type: newV.type}
        this.dialogData = true
      }
    }
  },
  mounted() {
    this.loadMap()
    this.addArea(this.geoJSONarea)
  },
  methods: {
    handleMessage(event) {
      const data = event.data.data
      if (data.code === 'success') {
        window.rtcEngine.startVideo('HD720P')
      }
    },
    // 关闭视频连线
    closePop() {
      this.showOpenVideoWebApp = false
    },
    async getToken(userid) {
      const pam = {userid: userid}
      const {status, msg, data} = await generatePanoToken(pam)
      if (status) {
        return data
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 打开视频连线
    async showVideoWebApp(item) {
      this.showOpenVideoWebAppData = item.data
      this.showOpenVideoWebAppData.token = await this.getToken(item.data.userId)
      window.open(
        openVideoWin +
        encodeURIComponent(JSON.stringify(this.showOpenVideoWebAppData))
      )
      const pam = {
        uids: [item.data.channelId], // 邀请对方视频人编码
        title: '视频通话', // 固定
        body: item.data.userName + '邀请您视频通话，点击进入', // 固定
        channelid: item.data.channelId, // 房间号
        username: item.data.userName, // 当前发起视频人姓名
        userid: item.data.userId // 放当前发起视频人编码
      }

      const {status, msg, data} = await videoCall(pam)
      if (status) {
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 水库弹框
    backskData(data) {
      this.tabName = 'second'
      this.commonData = {data: this.currentPopPointData, point: this.markert}
      this.dialogData = true
    },
    // 关闭弹框
    closeDialogMap(data) {
      this.dialogData = false
    },
    // 加载图层
    loadMap() {
      var self = this
      var satelliteLabelLayer = new TileLayer({
        // 天地图影像 http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        visible: true,
        source: new XYZSource({
          url:
      'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=2e089c2bb3c79e23cb1038ca8112cb37',
          crossOrigin: 'anonymous'
        }),
        name: 'tianmap',
        zIndex: 1
      })

      var streetLayer = new TileLayer({
        // arcgis街道图
        visible: false,
        source: new XYZSource({
          url:
      'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
          crossOrigin: 'anonymous'
        }),
        name: 'tianStreetmap',
        zIndex: 1

      })
      proj4.defs(
        'EPSG:27700',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
     '+x_0=400000 +y_0=-100000 +ellps=airy ' +
     '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
     '+units=m +no_defs'
      )
      register(proj4)
      const imageExtent = [
        65.9796331669,
        10.7451916711,
        140.1812559169,
        58.4673388687
      ]
      const imageLayer = new ImageLayer()
      this.imageExtent = imageExtent
      this.imageLayer = imageLayer
      // let Three = new ImageLayer({
      //   source: new ImageArcGISRest({
      //     ratio: 1,
      //     params: {},
      //     url:
      //       "http://hsfx.bjdclw.com:8060/arcgis/rest/services/YNDongChuan/SlopFlow/MapServer"
      //   })
      // });
      var layers = [streetLayer, satelliteLabelLayer, imageLayer]

      self.map = new Map({
        target: 'map',
        layers: layers,
        view: new View({
          center: [self.DistrictLng[0], self.DistrictLng[1]], // 地图中心点坐标
          // center: transform(getCenter(imageExtent), "EPSG:27700", "EPSG:3857"),
          zoom: this.ShengShiXXLevel,
          maxZoom: 18,
          projection: 'EPSG:4326'
          // projection: "EPSG:3857"
        })
      })
    },
    // 设置区域
    addArea(geo) {
      debugger
      const that = this
      // if (geo.length == 0) {
      //   return false
      // }
      geo.forEach((e) => {
        const features = []
        let routeFeature = ''
        // var geom = new GeoJSON().readGeometry(geo, {
        //   dataProjection: "EPSG:4326",
        //   featureProjection: "EPSG:3857"
        // });
        routeFeature = new Feature({
          geometry: new MultiPolygon([[e]])
        })
        //  else if (lineData.geometry.type == "Polygon") {
        //   routeFeature = new Feature({
        //     geometry: new Polygon(lineData.geometry.coordinates)
        //   });
        // }
        routeFeature.setStyle(
          new OlStyleStyle({
            fill: new Fill({
              color: 'transparent' // 填充颜色
            }),
            stroke: new Stroke({
              width: 3, // 边界宽度
              color: '#337fe5' // 边界颜色
            })
          })
        )
        features.push(routeFeature)
        // 设置图层
        const routeLayer = new Vectors({
          source: new Vector({
            features: features
          }),
          name: 'areaName',
          zIndex: 6

        })
        this.layerRouter = routeLayer
        // 添加图层
        that.map.addLayer(routeLayer)
      })
    },
    // 设置区域
    // addArea(geo = []) {
    //   const that = this
    //   if (geo.length == 0) {
    //     return false
    //   }
    //   const features = []
    //   geo.forEach(g => {
    //     const lineData = g.features[0]
    //     let routeFeature = ''
    //     if (lineData.geometry.type == 'MultiPolygon') {
    //       // var geom = new GeoJSON().readGeometry(geo, {
    //       //   dataProjection: "EPSG:4326",
    //       //   featureProjection: "EPSG:3857"
    //       // });
    //       routeFeature = new Feature({
    //         geometry: new MultiPolygon(lineData.geometry.coordinates)
    //       })
    //     }
    //     //  else if (lineData.geometry.type == "Polygon") {
    //     //   routeFeature = new Feature({
    //     //     geometry: new Polygon(lineData.geometry.coordinates)
    //     //   });
    //     // }
    //     routeFeature.setStyle(
    //       new OlStyleStyle({
    //         fill: new Fill({
    //           color: 'transparent' // 填充颜色
    //         }),
    //         stroke: new Stroke({
    //           width: 3, // 边界宽度
    //           color: '#337fe5' // 边界颜色
    //         })
    //       })
    //     )
    //     features.push(routeFeature)
    //   })
    //   // 设置图层
    //   const routeLayer = new Vectors({
    //     source: new Vector({
    //       features: features
    //     })
    //   })
    //   // 添加图层
    //   //   setTimeout(() => {
    //   that.map.addLayer(routeLayer)
    //   //   }, 200);
    // },
    // 地图切换
    mapChange(item) {
      this.mapChangeData = item
      this.loadSwitcherMap(item)
    },
    // 删除图层
    dellayerRouter() {

    },
    loadSwitcherMap(val) {
      var layerNames = ['tianmap', 'tianStreetmap']
      var self = this
      self.map.getLayers()
      for (var i = 0; i < self.map.getLayers().getArray().length; i++) {
        for (let z = 0; z < layerNames.length; z++) {
          if (
            layerNames.indexOf(
              self.map
                .getLayers()
                .getArray()
                [i].get('name')
            ) != -1
          ) {
            self.map
              .getLayers()
              .getArray()
              [i].setVisible(
                self.map
                  .getLayers()
                  .getArray()
                  [i].get('name') == val.layer_id
              )
          }
        }
      }
    },
    // 左侧工具
    mapToolClick(data) {
      const view = this.map.getView()
      const zoom = view.getZoom()
      switch (data.type) {
        case 'weather':
          this.clickWeatherBtn = !this.clickWeatherBtn
          if (this.clickWeatherBtn) {
            this.delImage()
          } else {
            this.radarCloud('1')
            this.map
              .getLayers()
              .getArray()[2]
              .setVisible(true)
          }
          break
        case 'sw':
          // 显示名字与没名字
          this.showName = data.status
          this.createMarket(this.markert)
          break
        case 'sk':
          this.showSkPoint = data.status
          this.createMarket(this.markert)
          break
        case 'user':
          this.showUserPoint = data.status
          this.createMarket(this.markert)
          break
        case 'mapReset':
          view.setZoom(6)
          this.map.getView().setCenter([this.DistrictLng[0], this.DistrictLng[1]])
          break
        case 'zoomIn':
          view.setZoom(zoom + 1)
          break
        case 'zoomOut':
          view.setZoom(zoom - 1)
          break
      }
    },
    // 创建点
    createMarket(data) {
      if (!data) {
        return
      }
      this.delPoints() // 清空点
      const that = this
      that.features = []
      // 初始化标签要素
      let feature = {}
      data.forEach((val, index, arr) => {
        if (val.pointRole == 'user' && this.showUserPoint && val.userId != '' && val.userId != null) {
          let icon = ''
          if (val.todayStatus == '1') {
            icon = require('../../../assets/images/sk/user-green.png')
          } else if (val.todayStatus == '2') {
            icon = require('../../../assets/images/sk/user-yellow.png')
          } else if (val.todayStatus == '3') {
            icon = require('../../../assets/images/sk/user-gray.png')
          } else if (val.todayStatus == '4' && val.bz != null) {
            // 多日未巡查
            icon = require('../../../assets/images/sk/user-orange.png')
          } else if (val.todayStatus == '4' && val.bz == null) {
            icon = require('../../../assets/images/sk/user-red.png')
          }
          //      if (val.todayStatus == '今日已巡') {
          //   icon = require('../../../assets/images/sk/user-green.png')
          // } else if (val.todayStatus == '今日未巡') {
          //   icon = require('../../../assets/images/sk/user-yellow.png')
          // } else {
          //   icon = require('../../../assets/images/sk/user-green.png')
          // }
          feature = new Feature({
            geometry: new OlGeomPoint([Number(val.lng), Number(val.lat)]), // 标签位置
            icon: icon, // 标注显示的logo图片
            id: val.userId,
            type: 'user',
            data: val,
            name:
       val.userName +
       '（' +
       val.userPhone +
       '）' +
       val.reservoirName.substring(0, val.reservoirName.length - 2)
          })
          feature.setId(Number(val.userId)) // 设置ID
          that.features.push(feature)
        } else if (
          val.pointRole == 'skPoint' &&
     this.showSkPoint &&
     val.rscd != ''
        ) {
          let icon1 = ''
          if (val.wl_status == '1') {
            icon1 = require('../../../assets/images/sk/map/icon-normal.png')
          } else if (val.wl_status == '2') {
            icon1 = require('../../../assets/images/sk/map/icon-super limited.png')
          } else if (val.wl_status == '3') {
            icon1 = require('../../../assets/images/sk/map/icon-elevation of superbarrier crest.png')
          } else if (val.wl_status == '4') {
            icon1 = require('../../../assets/images/sk/map/icon-super design.png')
          } else {
            icon1 = require('../../../assets/images/sk/map/icon-normal.png')
          }
          const sw = val.todaywl == null ? '' : val.todaywl + 'm'
          // 隐患点
          feature = new Feature({
            // geometry: new OlGeomPoint([123.3, 36.3]), // 标签位置
            geometry: new OlGeomPoint([Number(val.eslg), Number(val.nrlt)]), // 标签位置
            icon: icon1, // 标注显示的logo图片
            id: val.rscd,
            type: 'skPoint',
            data: val,
            name: sw + val.rsnm.substring(0, val.rsnm.length - 2)
            // name: val.chLev + "m" + val.name
          })
          feature.setId(Number(val.rscd)) // 设置ID
          that.features.push(feature)
        }
      })

      that.layer = new Vectors({
        // 创建矢量图层
        source: new Cluster({
          // 创建聚合标注对象
          distance: 0, // 设置聚合标注的距离
          source: new Vector({
            features: that.features
          }) // 初始化矢量数据源

        }),
        name: 'markert',
        zIndex: 10,
        style: function(feature, resolutions) {
          var zoom = that.map.getView().getZoom() // 获取当前地图的缩放级别
          const data = feature.values_.features[0].values_
          let text = ''
          if (that.showName) {
            text = data.name
          }
          return new OlStyleStyle({
            image: new OlStyleIcon({
              src: feature.values_.features[0].values_.icon // 图片路径
            }),
            text: new Text({

              // 位置
              textAlign: 'center',
              // 基准线
              textBaseline: 'middle',
              // 文字样式
              font: 'normal 12px 微软雅黑',
              // 文本内容
              text: text,
              // 文本填充样式（即文字颜色）
              fill: new Fill({color: '#fff'}),
              backgroundStroke: new Stroke({
                // color: data.color,
                color: '#fff',
                width: 1,
                opacity: 0.5
              }),
              // 标签的背景填充
              backgroundFill: new Fill({
                // color: "#2B2D3B"
                color: '#29958b'
              }),
              offsetX: 0,
              offsetY: -20,
              rotation: 0,
              padding: [2, 3, 0, 3]
            })
          })
        }
      })
      that.map.addLayer(that.layer) // 将聚合标注添加至地图
      that.addClickDialog() // 添加弹出对话框事件
    },
    // 给覆盖物添加弹框
    async addPop(data, type) {
      this.showpop = true
      await this.$nextTick()
      this.currentPopPointData = data
      const container = document.getElementById('popup')
      const content = document.getElementById('popup-content')
      const closer = document.getElementById('popup-closer')
      const titlecloser = document.getElementById('popup-title')
      this.content = content
      this.closer = closer
      this.titlecloser = titlecloser
      this.container = container
      const overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      this.overlay = overlay
      this.map.addOverlay(overlay)
      if (type === 'user') {
        this.showPopUser = true
        const address = data.currentLoc == null ? '' : '(' + data.currentLoc + ')'
        const userName = data.userName == null ? '' : data.userName
        const lng = data.lng == null ? '' : data.lng
        const lat = data.lat == null ? '' : data.lat
        // 点击覆盖物,弹出自定义弹框singleclick
        titlecloser.innerHTML = `<div>${userName}${address}</div>`
        this.overlay.setPosition([lng, lat])
        // 将覆盖物添加到map上
        this.map.addOverlay(overlay)
        // 关闭点击事件
        closer.onclick = function() {
          overlay.setPosition(undefined)
          closer.blur()
          return false
        }
      } else {
        this.showPopUser = false
        const address = data.addvnm == null ? '' : '(' + data.addvnm + ')'
        const name = data.rsnm == null ? '' : data.rsnm
        const lng = data.eslg == null ? '' : data.eslg
        const lat = data.nrlt == null ? '' : data.nrlt
        // 点击覆盖物,弹出自定义弹框singleclick
        titlecloser.innerHTML = `<div>${name}${address}</div>`
        this.overlay.setPosition([Number(lng), Number(lat)])
        // 将覆盖物添加到map上
        this.map.addOverlay(overlay)
        // 关闭点击事件
        closer.onclick = function() {
          overlay.setPosition(undefined)
          closer.blur()
          return false
        }
      }
    },
    // 点击事件
    addClickDialog() {
      const that = this
      // 点击覆盖物,弹出自定义弹框singleclick
      that.map.on('singleclick', function(evt) {
        // 1.地图放大,出现多个站点设备，点击直接到详情
        const pixel = that.map.getEventPixel(evt.originalEvent)
        const features = that.map.forEachFeatureAtPixel(pixel, function(
          feature,
          layerVetor
        ) {
          let lat = ''
          let lng = ''
          const data = feature.values_.features[0].values_.data
          const type = feature.values_.features[0].values_.type
          if (type == 'skPoint') {
            lat = data.nrlt
            lng = data.eslg
          } else {
            lat = data.lat
            lng = data.lng
          }

          const zoom = that.map.getView().getZoom() // 获取当前地图的缩放级别
          debugger
          if (zoom < 17) {
            that.map.getView().animate({
              // 只设置需要的属性即可
              zoom: 18, // 缩放级别
              center: [lng, lat], // 中心点
              rotation: undefined, // 缩放完成view视图旋转弧度
              duration: 2000 // 缩放持续时间，默认不需要设置
            })
            if (type == 'skPoint') {
              setTimeout(() => {
                // 弹框在跳转
                that.addPop(data, 'sk')
              }, 2000)
            } else if (type == 'user') {
              setTimeout(() => {
                that.addPop(data, 'user')
              }, 2000)
              const lngLatArr = []
              lngLatArr[0] = [Number(data.lngSk), Number(data.latSk)]
              lngLatArr[1] = [Number(data.lng), Number(data.lat)]
              that.makeLine(lngLatArr)
            }
          } else {
            if (type == 'skPoint') {
              that.addPop(data, 'sk')
              // that.commonData = {data: data, point: that.markert}
              // that.dialogData = true
            } else if (type == 'user') {
              that.addPop(data, 'user')
              const lngLatArr = []
              lngLatArr[0] = [data.lngSk, data.latSk]
              lngLatArr[1] = [data.lng, data.lat]
              that.makeLine(lngLatArr)
            }
          }
          return feature
        })
      })
    },

    // 点之间连线
    makeLine(data) {
      this.delLine()
      // var coordinates = [
      //   [166.2, 34.5],
      //   [118.5, 38.5]
      // ];
      var coordinates = data
      var source = new Vector()
      // 矢量图层
      var vector_line = new Vectors({
        source: source,
        style: new OlStyleStyle({
          fill: new Fill({
            color: '#55caba'
          }),

          stroke: new Stroke({
            lineDash: [1, 6],
            // 地图连线的样式
            color: '#55caba', // 颜色
            width: 2 // 宽度
          }),
          image: new Circle({
            radius: 2,
            fill: new Fill({
              color: '#55caba'
            })
          })
        })
      })
      var feature = new Feature({
        geometry: new LineString(coordinates)
      })
      this.vector_line = vector_line
      source.addFeature(feature)
      this.map.addLayer(vector_line)
      // 多边形此处注意一定要是[坐标数组]
      // var plygon = new Polygon([coordinates]);
      // 多边形要素类
      // var feature = new Feature({
      //   geometry: plygon
      // });
      // source.addFeature(feature);
      // this.map.addLayer(vector_line);
    },
    // 添加图片
    getImage(img) {
      var imageSmoothing = document.getElementById('map')
      imageSmoothing.addEventListener('change', this.setSource())
      this.setSource(img)
    },
    // 云图
    setSource(imgurl) {
      var source = new Static({
        url: imgurl,
        // url:
        //   "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/" +
        //   "British_National_Grid.svg/2000px-British_National_Grid.svg.png",
        // crossOrigin: "*",
        projection: 'EPSG:4326',
        imageExtent: this.imageExtent
      })
      this.imageLayer.setSource(source)
    },
    // 删除点
    delPoints() {
      if (this.layer == null) {
        return
      }
      this.map.removeLayer(this.layer)
    },
    // 设置staticImage图层为false
    delImage() {
      this.map
        .getLayers()
        .getArray()[2]
        .setVisible(false)

      // this.map
      // .getLayers()
      // .getArray()[13]
      // .setVisible(false);
    },
    // 删除线的图层
    delLine() {
      if (Object.keys(this.vector_line).length > 0) {
        this.vector_line.getSource().clear()
      }
    },
    updateMarket(data) {
      this.createMarket(data)
    },
    handleRenderOverlay(val) {
      // 定位
      var self = this
      // var center = fromLonLat([val.lng, val.lat]);
      const pam = {}
      pam.lat = val.lat
      pam.lng = val.lng
      self.map.getView().animate({
        // 只设置需要的属性即可
        center: [pam.lng, pam.lat], // 中心点
        rotation: undefined, // 缩放完成view视图旋转弧度
        duration: 2000, // 缩放持续时间，默认不需要设置
        zoom: 10
      })
      setTimeout(() => {
        self.map.getView().animate({
          // 只设置需要的属性即可
          center: [pam.lng, pam.lat], // 中心点
          rotation: undefined, // 缩放完成view视图旋转弧度
          duration: 2000, // 缩放持续时间，默认不需要设置
          zoom: 16
        })
      }, 2500)
      setTimeout(() => {
        this.addPop(val)
      }, 5000)
    },
    // 云图雷达图切换
    radarCloud(cur) {
      this.cur = cur
      // this.delPoints();
      this.radarList = []
      this.weatherRadarCloudData = []
      this.playBtn = true
      this.playBar()
      clearInterval(this.time)
      if (cur == 1) {
        this.weatherRadarCloudData = this.weatherRadarData.slice(0, 20)
        if (this.weatherRadarCloudData) {
          this.weatherRadarCloudData.forEach((val, index) => {
            if (index == 0) {
              this.imgStaticFirst = val.imgbase
              this.getImage(this.imgStaticFirst)
            }
            this.radarList.push({
              time: val.time.substring(10, val.time.length - 3),
              detailTime: val.time.substring(5, val.time.length - 3)
            })
          })
        }
      } else if (cur == 2) {
        if (this.cur == 2) {
          this.weatherRadarCloudData = this.weatherCloudData
          if (this.weatherCloudData) {
            this.weatherCloudData.forEach((val, index) => {
              if (index == 0) {
                this.imgStaticFirst = val.imgbase
                this.getImage(this.imgStaticFirst)
              }
              this.radarList.push({
                time: val.time.substring(10, val.time.length - 3),
                detailTime: val.time.substring(5, val.time.length - 3)
              })
            })
          }
        }
      }
    },
    // 云图雷达图播放
    playBar() {
      this.playBtn = !this.playBtn
      this.curIndex = 0
      this.lineWidth = 2.08333
      if (this.playBtn == true) {
        const that = this
        const time = setInterval(function() {
          this.curIndex = 0
          this.lineWidth = 2.08333
          that.curIndex = that.curIndex + 1
          let w = 4.16667
          if (that.rightFlag == true) {
            w = 3
          }
          that.lineWidth = (w * 100000 + that.lineWidth * 100000) / 100000

          that.weatherRadarCloudData.forEach((val, index, arr) => {
            if (index == that.curIndex) {
              that.getImage(val.imgbase)
            }
          })
          if (that.curIndex == that.weatherRadarCloudData.length) {
            that.curIndex = 0
            that.lineWidth = 2.08333
            that.playBtn = false
            clearInterval(time)
          }
        }, 1000)
        this.time = time
      } else if (this.playBtn == false) {
        // 暂停播放
        clearInterval(this.time)
      }
    }
  }
}
</script>
<style  lang="scss" rel="stylesheet/scss" type="text/scss" >
.containerMap {
 z-index: 0;
 >>> .breadcrumb-wrapper {
  display: none !important;
 }
 width: 100%;
 height: 100%;

 .map {
  width: 100%;
  height: 100%;
 }
 .map-btn-box {
  border-radius: 3px;
  margin-bottom: 10px;
  position: relative;
  top: -99%;
  left: 10px;
  width: 28px;
 }

 .map-btn {
  height: 25px;
  width: 25px;
  line-height: 25px;
  background: white;
  text-align: center;
  border-radius: 5px;
  border-bottom: 1px solid #e9e9e9;
  color: black;
 }
 .map-btn:hover {
  color: #409eff;
  cursor: pointer;
 }
 #popup {
  border: 0px solid rgba(0, 0, 0, 0.26);
  padding: 0px;
 }
 .ol-popup {
  min-height: 180px;
  width: 4.35rem;
  font-size: 0.12rem;
  color: #333333;
  position: absolute;
  background-color: rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  bottom: 25px;
  left: -3.75rem;
  text-align: left;
  box-shadow: 0px 0px 0.06rem 0px rgba(0, 0, 0, 0.26);
  .title {
   width: 100%;
   height: 30px;
   line-height: 30px;
   color: #ffffff;
   background: #29958b;
   margin: 0;
   padding: 0;
   padding-left: 10px;
   div {
    margin: 0;
    padding-left: 10px;
    line-height: 30px;
    height: 30px;
   }
  }
  border-radius: 2px;
  div {
   padding: 0px 0px;
   //   div {
   //     height: 25px;
   //     line-height: 25px;
   //   }
  }
 }
 .ol-popup:after,
 .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
 }
 .ol-popup:after {
  border-top-color: #ffffff;
  border-width: 11px;
  right: 48px;
  margin-left: -11px;
  margin-top: 0px;
 }
 .ol-popup:before {
  margin-top: 0px;
  border-top-color: #ffffff;
  border-width: 11px;
  right: 48px;
  margin-left: -11px;
 }
 .ol-popup-closer {
  text-decoration: none;
  position: absolute;
  right: 8px;
  top: 6px;
  color: #ffffff;
 }
 .ol-popup-closer:after {
  content: "✖";
 }
 .btnList {
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 180px;
 }
 ul {
  list-style: none;
 }
 .btnList li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  float: left;
  color: #303133;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
 }
 li {
  list-style: none;
 }
 .btnList li span {
  display: block;
  width: 110px;
  height: 100%;
  float: left;
  font-size: 18px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 35px;
 }
 .btnList li i {
  background-size: 100% 100% !important;
  display: block;
  float: left;
  height: 40px;
  left: -3px;
  position: relative;
  top: -3px;
  width: 40px;
 }
 .btnList li.cur i.caseBtn_radar {
  background: url("../../../assets/weather/ladarYunTu/cloud2.png") no-repeat
   center center;
 }
 .btnList li i.caseBtn_radar {
  background: url("../../../assets/weather/ladarYunTu/cloud1.png") no-repeat
   center center;
 }
 .btnList li.cur span {
  background: #29958b;
 }
 .btnList li.cur i.caseBtn_cloudy {
  background: url("../../../assets/weather/ladarYunTu/radar2.png") no-repeat
   center center;
 }

 .btnList li i.caseBtn_cloudy {
  background: url("../../../assets/weather/ladarYunTu/radar1.png") no-repeat
   center center;
 }
 .btnList li i.caseBtn_rain {
  background: url(https://i.tq121.com.cn/i/weatherMap/caseBtn_rain.png)
   no-repeat center center;
 }
 .btnList li.cur i.caseBtn_rain {
  background: url(https://i.tq121.com.cn/i/weatherMap/caseBtn_rain_cur.png)
   no-repeat center center;
 }
 .timeBar {
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0;
  background: url(https://i.tq121.com.cn/i/weatherMap/bottomBg.png) repeat-x
   scroll center top;
 }
 .timeBar .changeDateType {
  width: 7%;
  float: left;
  height: 60px;
  position: absolute;
  left: 8%;
  bottom: 10px;
 }
 .timeBar .changeDateType .result {
  width: 90px;
  height: 32px;
  line-height: 32px;
  border-radius: 20px;
  background: #fff;
  float: left;
  text-align: center;
  font-size: 16px;
  color: #29958b;
  position: absolute;
  right: 0;
 }
 .timeBar .changeDateType p {
  width: 90px;
  float: left;
  text-align: center;
  font-size: 14px;
  color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
 }
 .timeBar .changeDateType ul {
  position: absolute;
  width: 90px;
  height: 64px;
  overflow: hidden;
  top: -70px;
  right: 0;
  padding-bottom: 15px;
  display: none;
  cursor: pointer;
 }
 .timeBar .changeDateType:hover ul {
  display: block;
 }
 .timeBar .changeDateType ul .bottomSj {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 8px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
  right: 35px;
  bottom: 0;
 }
 .timeBar .changeDateType ul li {
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #fff;
  border-radius: 2px;
 }
 .timeBar .changeDateType ul li.cur {
  background: #29958b;
  color: #fff;
 }
 .timeBar .changeDateType ul li:hover {
  background: #29958b;
  color: #fff;
 }
 .timeBar .playBar {
  position: fixed;
  width: 80%;
  margin-top: 30px;
  bottom: 0px;
  /* position: relative; */
  margin-left: 15%;
  padding-bottom: 10px;
  float: left;
 }
 .timeBar .playBar .playBtn {
  width: 6%;
  height: 56px;
  position: relative;
  top: -12px;

  background: url("../../../assets/weather/ladarYunTu/playBtn.png") no-repeat
   right bottom;
  // background: url(https://i.tq121.com.cn/i/radarMap/playBtn.png) no-repeat
  //   right bottom;
  float: left;
  cursor: pointer;
 }
 .timeBar .playBar .stopBtn {
  background: url("../../../assets/weather/ladarYunTu/stopBtn.png") no-repeat
   right bottom;
 }
 .timeBar .playBar ul {
  width: calc(94% - 4.1rem);
  height: 26px;
  float: left;
  position: relative;
  top: 5px;
 }
 .timeBar .playBar .timeLine {
  position: absolute;
  width: 94%;
  height: 6px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.5);
  background-color: #000;
  _background: #000;
  *background: #000;
  top: 15px;
  left: 6%;
 }
 .timeBar .playBar .timeLine span {
  background: #29958b;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 6px;
 }
 .timeBar .playBar ul i {
  position: absolute;
  display: none;
  font-style: normal;
  right: 0;
  width: 30px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  color: #666;
  font-size: 14px;
  bottom: 0;
  font-weight: bold;
 }
 .timeBar .playBar ul li {
  width: 4%;
  height: 100%;
  float: left;
  position: relative;
  cursor: pointer;
 }
 .timeBar .playBar ul li .cursor {
  display: none;
  height: 25px;
  left: 50%;
  margin-left: -12.5px;
  position: absolute;
  width: 25px;
  z-index: 9;
  background: url("../../../assets/weather/ladarYunTu/curPoint.png") no-repeat
   center bottom/25px auto;
 }
 .dis {
  display: none !important;
 }
 .timeBar .playBar ul li.cur .cursor {
  display: block;
 }
 .timeBar .playBar ul li span {
  font-size: 16px;
  color: #fff;
  position: absolute;
  top: -30px;
  left: -12px;
  display: block;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-weight: bold;
  background: #29958b;
  border-radius: 11px;
  width: 120px;
 }
 .timeBar .playBar ul li .eachTime {
  color: #29958b;
  display: block;
  font-size: 14px;
  height: 30px;
  line-height: 40px;
  position: relative;
  text-align: center;
  top: 17px;
  width: 100%;
  background: url(https://i.tq121.com.cn/i/weatherMap/shuxian.png) no-repeat
   center top;
 }
 .timeBar .playBar ul.night li .eachTime {
  color: #29958b;
 }
 /** Green tips popup */
 .ol-popup.tips .closeBox {
  // background-color: #f00;
  background-color: #fff;
  border-radius: 50%;
  // color: #fff;
  color: #999;
  width: 1.2em;
  height: 1.2em;
 }
 .ol-popup.tips .closeBox:hover {
  // background-color: #f40;
  color: #547fe6;
 }

 .ol-popup.tips {
  margin: -20px 0;
  -webkit-transform: translate(0, -40px);
  transform: translate(0, -40px);
 }
 .ol-popup.tips > div {
  background-color: #fff;
  border: 5px solid #007cfa;
  border-radius: 5px;
  color: #333;
 }
 .ol-popup-top.ol-popup.tips {
  margin: 20px 0;
  -webkit-transform: none;
  transform: none;
 }
 .ol-popup-left.tips {
  margin: -20px -22px;
  -webkit-transform: translate(0, -40px);
  transform: translate(0, -40px);
 }
 .ol-popup-top.ol-popup-left.tips {
  margin: 20px -22px;
  -webkit-transform: none;
  transform: none;
 }
 .ol-popup-right.tips {
  margin: -20px 22px;
  -webkit-transform: translate(44px, -40px);
  transform: translate(44px, -40px);
 }
 .ol-popup-top.ol-popup-right.tips {
  margin: 20px 22px;
  -webkit-transform: translate(44px, 0);
  transform: translate(44px, 0);
 }
 .ol-popup-middle.tips {
  margin: 0;
  -webkit-transform: none;
  transform: none;
 }
 .ol-popup-left.ol-popup-middle.tips {
  margin: 0 22px;
  -webkit-transform: none;
  transform: none;
 }
 .ol-popup-right.ol-popup-middle.tips {
  margin: 0 -22px;
  -webkit-transform: translate(-44px, 0);
  transform: translate(-44px, 0);
 }

 .ol-popup.tips .anchor {
  margin: -18px 22px;
  // color: #ad7;
  color: #007cfa;
 }
 .ol-popup.tips .anchor:before {
  content: "";
  border-color: currentColor transparent;
  border-style: solid;
  border-width: 20px 11px;
 }

 .ol-popup-top.tips .anchor:before {
  border-top: 0;
  top: 0;
 }
 .ol-popup-bottom.tips .anchor:before {
  border-bottom: 0;
  bottom: 0;
 }
 .ol-popup-center.tips .anchor:before {
  border-width: 20px 6px;
  margin: 0 -6px;
 }
 .ol-popup-left.tips .anchor:before {
  border-left: 0;
  margin-left: 0;
 }
 .ol-popup-right.tips .anchor:before {
  border-right: 0;
  margin-right: 0;
 }

 .ol-popup-middle.tips .anchor:before {
  margin: -6px -41px;
  border-color: transparent currentColor;
  border-width: 6px 20px;
 }
 .ol-popup-middle.ol-popup-left.tips .anchor:before {
  border-left: 0;
 }
 .ol-popup-middle.ol-popup-right.tips .anchor:before {
  border-right: 0;
 }
}
.overlayC1 {
 height: 30px;
 width: 30px;
 border-radius: 25px;
 background: #1493ff;

 transform: scale(0);
 animation: myfirst 3s;
 animation-iteration-count: infinite;

 @keyframes myfirst {
  to {
   transform: scale(2);
   background: rgba(0, 0, 0, 0);
  }
 }
}
.overlayC3 {
 height: 30px;
 width: 30px;
 border-radius: 25px;
 background: orange;

 transform: scale(0);
 animation: myfirst 3s;
 animation-iteration-count: infinite;

 @keyframes myfirst {
  to {
   transform: scale(2);
   background: rgba(0, 0, 0, 0);
  }
 }
}
.overlayC4 {
 height: 30px;
 width: 30px;
 border-radius: 25px;
 background: red;

 transform: scale(0);
 animation: myfirst 3s;
 animation-iteration-count: infinite;

 @keyframes myfirst {
  to {
   transform: scale(2);
   background: rgba(0, 0, 0, 0);
  }
 }
}
.overlayC2 {
 height: 30px;
 width: 30px;
 border-radius: 25px;
 background: yellow;

 transform: scale(0);
 animation: myfirst 3s;
 animation-iteration-count: infinite;

 @keyframes myfirst {
  to {
   transform: scale(2);
   background: rgba(0, 0, 0, 0);
  }
 }
}
</style>
