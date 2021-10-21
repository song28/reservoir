<template>
  <div class="mapcontainer">
    <!-- v-if="marketlist" -->
    <Olmap
      :gj="gj"
      :marketlist-data="marketlist"
      :user-list="userList"
      :weather-data="weatherData"
      :right-flag="rightFlag"
      :weather-radar-data="weatherRadarData"
      :weather-cloud-data="weatherCloudData"
      :warning-list="warningList"
      :warn-list="warnList"
      :right-type="rightType"
      :hp-positin="hpPositin"
      :video-list-data="videoListData"
      :gk-list="gkList"
      :detail-no-positin="detailNoPositin"
      @close-diaolog="closeDialogMap"
    />
    <div class="tuli">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="测站" name="3">
          <!-- <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-Osmotic pressure.png" alt="">
              坝基杨监测站
            </span>
          </div>       -->
          <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-rainfall.png" alt="">
              雨量
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/sk-blue.png" alt="">
              水位
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/map/image.png" alt="">
              图像
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-video.png" alt="">
              视频
            </span>
          </div>
          <!-- <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-wazter level.png" alt="">
              位移
            </span>
          </div> -->
        </el-collapse-item>

        <el-collapse-item title="水库巡查情况" name="1">
          <div>
            <span>
              <img src="../../../assets/images/sk/user-green.png" alt="">
              绿色代表今日已巡查
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/user-yellow.png" alt="">
              黄色代表今日未巡查</span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/user-gray.png" alt="">
              灰色代表今日未上线
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/user-orange.png" alt="">
              橙色未在本市巡查范围内
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/user-red.png" alt="">
              红色代表多日未巡查
            </span>
          </div>
        </el-collapse-item>

        <el-collapse-item title="水库水位情况" name="2">
          <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-normal.png" alt="">
              蓝色代表正常水位
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-super limited.png" alt="">
              黄色超堰顶高程</span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-elevation of superbarrier crest.png" alt="">
              橙色超汛限水位
            </span>
          </div>
          <div>
            <span>
              <img src="../../../assets/images/sk/map/icon-super design.png" alt="">
              红色代表超设计洪水位
            </span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import Olmap from './map'

export default {
  components: {
    Olmap
  },
  /**
   *  rightType   预警、隐患点、气象、视频、图像右侧类型
   *  marketlist  地图隐患点
   *  weatherData 地图触摸弹框
   *  rightFlag   地图右侧面板是否收起 true 展开 false 收起
   *  weatherRadarData 气象传过来的雷达以及云图数据
   */

  props: [
    'mapNum',
    'gj',
    'userList',
    'marketlist',
    'weatherData',
    'rightFlag',
    'weatherRadarData',
    'weatherCloudData',
    'rightType',
    'warningList',
    'warnList',
    'hpPositin',
    'videoListData',
    'gkList',
    'detailNoPositin'
  ],
  data() {
    return {
      mapNumData: {},
      activeNames: ['1', '2']
    }
  },
  watch: {
    mapNum: {
      handler(newV, oldV) {
        this.mapNumData = newV
        console.log(newV, '地图统计数量')
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    handleChange(val) {
      console.log(val)
    },
    closeDialogMap(data) {
      this.$emit('close-diaolog', data)
    }
  }
}
</script>
<style  lang="scss" rel="stylesheet/scss" type="text/scss">
.mapcontainer {
  position: absolute;
  width: 100%;
  height: 100%;
  .tuli {
    position: absolute;
    right: 4.2rem;
    bottom: 0.4rem;
    width: 2.4rem;

    .el-collapse {
      border-top: 1px solid #2b2b2b;
      border-bottom: 1px solid #2b2b2b;
    }
    .el-collapse-item__header {
      background-color: rgba(21, 70, 65, 0.45);
      height: 34px;
      font-size: 12px;
      padding-left: 10px;
      color: #fff;
      border-bottom: 1px solid #2b2b2b;
      border-top: 1px solid #2b2b2b;
    }
    .el-collapse-item__wrap {
      padding-left: 10px;

      background-color: rgba(21, 70, 65, 0.45);
    }
    .el-collapse-item__content {
      color: #fff;
      padding-bottom: 5px;
      img {
        position: relative;
        top: 6px;
        height: 20px;
      }
    }
  }
}
</style>

