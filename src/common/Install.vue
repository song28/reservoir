<template>
  <div class="site-install">
    <el-row :gutter="60">
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">站点编码：</span>
          <span class="item-input" v-text="device.cusno"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">站点名称：</span>
          <span class="item-input" v-text="device.name"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">站点类型：</span>
          <span class="item-input" v-text="device.deviceType"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">行政区：</span>
          <span class="item-input" v-text="device.addvnm"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">经度：</span>
          <span class="item-input" v-text="device.lng"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">纬度：</span>
          <span class="item-input" v-text="device.lat"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">建站地址：</span>
          <span class="item-input" v-text="device.address"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">建站时间：</span>
          <span class="item-input" v-text="device.createTime"></span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="install-item">
          <span class="item-label">承建单位：</span>
          <span class="item-input" v-text="device.buildCompanyName"></span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="install-item">
          <span class="item-label">安装建站图片</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="install-img">
          <template v-if="imageList.length">
            <div class="img-item" v-for="(item,index) in imageList" :key="index">
              <img :src="item.url" alt="">
              <span>{{item.type}}</span>
            </div>
          </template>
          <div class="img-item" v-else>
            <img src="@/assets/images/eventNoPic.png" alt="">
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="install-item mt-2">
          <span class="item-label">安装建站视频</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="install-img">
          <template v-if="videoList.length">
            <div class="img-item" v-for="(item,index) in videoList" :key="index">
              <video controls="controls" autoplay="autoplay" loop="loop" height="100px" width="240px">
                <source :src="item.imageurl" type="video/webm"/>
              </video>
            </div>
          </template>
          <div class="img-item" v-else>
            <img src="@/assets/images/eventNoVideo.png" alt="">
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getDeviceBasicInfo, getDeviceInstallImgae, getDeviceInstallVideo} from '@/api/deviceBase'

  export default {
    props: ['device'],
    data() {
      return {
        basicData: {},
        imageList: [],
        videoList: []
      }
    },
    methods: {
      queryData() {
        let self = this
        //基础信息
        getDeviceBasicInfo({id: this.device.id}).then(res => {
          self.basicData = res.data
        })

        // 图像
        getDeviceInstallImgae({id: this.device.cusno}).then(res => {
          self.imageList = res.data
        })

        //视频
        getDeviceInstallVideo({id: this.device.thingListId}).then(res => {
          self.videoList = res.data
        })
      },
    },
    mounted() {
      this.queryData()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .site-install {
    padding: 0.2rem 0.3rem 0.3rem;
    .el-row {
      margin: 0;
    }
    .install-item {
      height: 0.48rem;
      min-height: 36px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, .3);
      .item-label {
        font-size: 0.16rem;
        min-width: 80px;
        text-align: right;
      }
      .item-input {
        font-size: 0.16rem;
        font-weight: bold;
      }
    }
    .install-img {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .img-item {
        margin-right: 0.15rem;
        position: relative;
        display: flex;
        flex-direction: column;
        img {
          width: 100px;
          height: 100px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
