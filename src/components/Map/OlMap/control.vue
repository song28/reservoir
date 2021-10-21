<template>
  <div class="map-control">
    <!-- 气象 -->
    <!-- <div
      :class="
        !clickWeatherBtn
          ? 'commonIcon weatherbtn'
          : 'commonIcon weatherbtn unchoose'
      "
      title="气象"
    >
      <a @click="handleClickMap('weather')">
        <i class="iconfont iconqixiangzhan"></i>
      </a>
  </div>-->
    <!-- 全屏 -->
    <div
      v-if="mapType=='sub'"
      :class="!clickmapFulllBtn ? 'commonIcon' : 'commonIcon  unchooseC'"
      title="全屏"
      @click="handleClickMap('mapfull')"
    >
      <a>
        <i class="iconfont icon-icon_list_zhankai" />
      </a>
    </div>

    <!-- 水库点 -->
    <div
      :class="!clickReservoirBtn ? 'commonIcon' : 'commonIcon  unchooseC'"
      title="水库"
      @click="handleClickMap('reservoir')"
    >
      <a>
        <i class="iconfont iconxiaoxingshuiku" />
      </a>
    </div>
    <!-- 运维人员 -->
    <div
      :class="!clickAppUserBtn ? 'commonIcon' : 'commonIcon  unchooseC'"
      title="巡查人员"
      @click="handleClickMap('appUser')"
    >
      <a>
        <i class="iconfont iconzerenren" />
      </a>
    </div>
    <!-- 雨位值 -->
    <div
      :class="!clickwaterLevelBtn ? 'commonIcon' : 'commonIcon  unchooseC'"
      title="显示名称"
      @click="handleClickMap('waterLevel')"
    >
      <a>
        <i class="iconfont iconshuiweizhan" />
      </a>
    </div>

    <el-popover placement="right" width="260" trigger="click">
      <div class="map-change">
        <div v-for="(item, index) in mapList" :key="index" class="content">
          <p :class="{ selItem: currentSelMap == item.name }">
            <a @click="mapChange(item)">
              <img :src="getIconUrl(item.icon)" :alt="item.name">
              <br>
              {{ item.name }}
            </a>
          </p>
          <p />
        </div>
      </div>
      <el-button slot="reference">
        <img :src="getIconUrl(iconChange)">
      </el-button>
    </el-popover>

    <!-- 复位 -->
    <div class="commonIcon" title="复位">
      <a @click="handleClickMap(mapReset)">
        <img :src="getIconUrl(iconFw)">
      </a>
    </div>
    <!-- 放大一级 -->
    <div class="commonIcon" title="放大一级">
      <a @click="handleClickMap(zoomIn)">
        <img :src="getIconUrl(iconFd)">
      </a>
    </div>
    <!-- 缩小一级 -->
    <div class="commonIcon" title="缩小一级">
      <a @click="handleClickMap(zoomOut)">
        <img :src="getIconUrl(iconSx)">
      </a>
    </div>
  <!-- 图例 -->
  <!-- <el-popover placement="right" width="440" trigger="click">
      <div class="tab-bodyw">
        <div class="body-i" v-for="(item, index) in lengends" :key="index">
          <img
            v-if="item.val"
            :src="require('@/assets/images/map/layer/' + item.val + '.png')"
            :alt="item.name"
          />
          <img v-else src="@/assets/images/map/layer/pp.png" alt />
          <a @click="handleClickFilter(item)">{{ item.name }}</a>
        </div>
      </div>
      <el-button slot="reference">
        <img :src="getIconUrl(iconTl)" />
      </el-button>
  </el-popover>-->
  </div>
</template>

<script>
import {getIconUrl} from '@/utils/getIcons'
import '@/assets/css/skdb-iconfont.css'

const nowTime = new Date().getTime()
// let nowTime = new Date().getMilliseconds();
// let nowTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
export default {
  props: ['rightType', 'closeDialogMap',"mapType"],
  data() {
    return {
      clickName: true,
      clickWeatherBtn: false,
      clickCameraBtn: false,
      clickmapFulllBtn: true,
      clickReservoirBtn: true,
      clickwaterLevelBtn: false,
      clickAppUserBtn: true,
      deviceTypes: [],
      show: 1,
      currentSelMap: '天地图卫星',
      getIconUrl: getIconUrl,
      iconChange: 'map-change',
      iconFw: 'map-fw',
      iconFd: 'map-fd',
      iconSx: 'map-sx',
      iconTl: 'map-tl',
      iconNm: 'map-nm',
      iconNm1: 'map-nm1',
      mapReset: {
        name: '复位',
        icon: 'map-fw',
        type: 'mapReset',
        stm: nowTime
      },
      zoomIn: {
        name: 'zoomIn',
        icon: 'map-fw',
        type: 'zoomIn',
        stm: nowTime
      },
      zoomOut: {
        name: 'zoomOut',
        icon: 'map-fw',
        type: 'zoomOut',
        stm: nowTime
      },
      mapName: {
        name: 'mapPointName',
        icon: 'map-nm',
        type: 'mapPointName',
        stm: nowTime
      },
      mapControl: [
        {
          name: '复位',
          icon: 'map-fw',
          type: '',
          stm: nowTime
        },
        {
          name: '放大一级',
          icon: 'map-fd'
        },
        {
          name: '缩小一级',
          icon: 'map-sx'
        },
        {
          name: '图例',
          icon: 'map-tl'
        }
      ],

      lengends: [
        // 新增的东川图标
        {
          name: '雨量',
          val: 'dc-yl'
        },
        {
          name: '广播',
          val: 'dc-gb'
        },
        {
          name: '微芯桩',
          val: 'dc-wxz'
        },
        {
          name: '断线报警器',
          val: 'dc-dxbjq'
        },
        {
          name: '土壤含水率',
          val: 'dc-trhsl'
        },
        {
          name: '隐患点',
          val: 'dc-yhd'
        },
        {
          name: '次声',
          val: 'dc-cs'
        },
        {
          name: '地声',
          val: 'dc-ds'
        },
        {
          name: '视频',
          val: 'dc-sp'
        },
        {
          name: '泥水位',
          val: 'dc-nsw'
        },
        {
          name: '地表裂缝',
          val: 'dc-dblf'
        },

        {
          name: 'GNSS',
          val: 'dc-gnss'
        }
        // {
        //   name:"无降雨",
        //   icon:"rain0"
        // },{
        //   name:"0.1~5(mm)",
        //   icon:"rain1"
        // },{
        //   name:"5~10(mm)",
        //   icon:"rain2"
        // },{
        //   name:"10~25(mm)",
        //   icon:"rain3"
        // },{
        //   name:"25~50(mm)",
        //   icon:"rain4"
        // },{
        //   name:"50~100(mm)",
        //   icon:"rain5"
        // },{
        //   name:"100~250(mm)",
        //   icon:"rain6"
        // },{
        //   name:">250(mm)",
        //   icon:"rain7"
        // }
      ],
      colors: [
        {
          name: '无降雨',
          class: 'rain0'
        },
        {
          name: '0.1~5(mm)',
          class: 'rain1'
        },
        {
          name: '5~10(mm)',
          class: 'rain2'
        },
        {
          name: '10~25(mm)',
          class: 'rain3'
        },
        {
          name: '25~50(mm)',
          class: 'rain4'
        },
        {
          name: '50~100(mm)',
          class: 'rain5'
        },
        {
          name: '100~250(mm)',
          class: 'rain6'
        },
        {
          name: '>250(mm)',
          class: 'rain7'
        }
      ],
      mapList: [
        {
          name: '天地图卫星',
          icon: 'tianMap',
          layer_id: 'tianmap'
        },
        {
          name: '街道',
          icon: 'iconMap',
          layer_id: 'tianStreetmap'
        }
      ],
      disabled: false
    }
  },
  watch: {},
  created() {},
  methods: {
    handleClickFilter(item) {
      this.$emit('filter-lengend', item)
    },
    handleClickMap(val) {
      if (val == 'weather') {
        this.clickWeatherBtn = !this.clickWeatherBtn
        this.$emit('tool', {type: 'weather', status: this.clickWeatherBtn})
      } else if (val == 'reservoir') {
        this.clickReservoirBtn = !this.clickReservoirBtn
        this.$emit('tool', {type: 'sk', status: this.clickReservoirBtn})
      } else if (val == 'appUser') {
        this.clickAppUserBtn = !this.clickAppUserBtn
        this.$emit('tool', {type: 'user', status: this.clickAppUserBtn})
      } else if (val == 'mapfull') {
        this.clickmapFulllBtn = !this.clickmapFulllBtn
        this.$emit('tool', {type: 'menuOpen', status: this.clickmapFulllBtn})
      } else if (val == 'waterLevel') {
        this.clickwaterLevelBtn = !this.clickwaterLevelBtn
        this.$emit('tool', {type: 'sw', status: this.clickwaterLevelBtn})
      } else {
        this.$emit('tool', {type: val.type})
      }
    },
    mapChange(item) {
      this.currentSelMap = item.name
      this.$emit('map-change', item)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss" scope>
.weatherbtn {
 background: #29958b !important;
}
.iconshexiangtoubtn {
 background: #fff !important;
}
.unchooseC {
 background: #29958b !important;
 color: #fff !important;
}
.unchoose {
 background: #fff !important;
}
.unchoose .iconqixiangzhan {
 color: #000;
}
.iconqixiangzhan {
 color: #fff;
}
p.selItem {
 border: 2px solid #29958b;
}
.ol-zoom {
 display: none;
}
.map-control {
 // .body-i{
 //   background: rgba(204,204,204,0.9);
 //   width: 26px;
 //   height: 26px;
 //   margin-top: 3px;
 //   text-align: center;
 //   vertical-align: middle;
 //   padding-top: 4px;
 // }

 .el-button {
  display: block;
  margin-bottom: 3px;
  margin-left: 10px;
  padding: 10px 12px;
 }
}
.tab-bodyw {
 padding: 15px 0.2rem 0;
 display: flex;
 flex-wrap: wrap;
 background-color: #fff;
 .body-i {
  flex: 33.33% 0 0;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  // background: #ccc;

  img {
   width: auto;
   height: 24px;
   margin-right: 10px;
  }
  span {
   font-size: 14px;
   font-family: SourceHanSansCN-Regular;
   font-weight: 400;
   color: #303133;
  }
 }
 .body-i.body-i-mini {
  img {
   width: 16px;
   height: 16px;
  }
 }
}
.map-change {
 padding: 15px 0.2rem 0;
 display: flex;
 flex-wrap: wrap;
 background-color: #fff;
 .content {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  flex: 50% 0 0;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #29958b;
  float: left;
  // background: #ccc;

  img {
   // width: 20px;
   // height: 24px;
   // margin-right: 10px;
  }
  span {
   font-size: 14px;
   font-family: SourceHanSansCN-Regular;
   font-weight: 400;
   color: #303133;
  }
 }
}
.rain0 {
 background: #ffffb4;
}
.rain1 {
 background: #b5ffb4;
}
.rain2 {
 background: #64ff64;
}
.rain3 {
 background: #0ff;
}
.rain4 {
 background: #0096ff;
}
.rain5 {
 background: #0064ff;
}
.rain6 {
 background: #00f;
}
.rain7 {
 background: #f0f;
}
.styleCommon {
 padding: 5px 10px;
 margin-right: 10px;
 border-radius: 5px;
 // border-radius: 50%;
}
.commonIcon {
 background: #fff;
 // min-width: 150px;
 border-radius: 4px;
 border: 1px solid #e6ebf5;
 padding: 12px;
 z-index: 2000;
 color: #606266;
 line-height: 1.4;
 text-align: justify;
 font-size: 14px;
 -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
 box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
 word-break: break-all;
 margin-bottom: 3px;
 margin-left: 10px;
 padding: 8px 12px;
 /* display: inline-block; */
 width: 40px;
}
.commonIcon:hover {
 background: #ebf2fc;
}

.zhandianbtn {
 background: #29958b !important;
}
.zhandianbtnNo {
 background: #fff !important;
}
</style>
