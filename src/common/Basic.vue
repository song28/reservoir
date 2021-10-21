<template>
  <div class="site-basic">
    <el-row :gutter="60">
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">站点编码：</span>
          <span class="item-input">{{deviceData.cusno | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">站点名称：</span>
          <span class="item-input">{{deviceData.name | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">站点类型：</span>
          <span class="item-input">{{deviceData.typename | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">行政区：</span>
          <span class="item-input">{{deviceData.addvcdname | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">经度：</span>
          <span class="item-input">{{deviceData.lng | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">纬度：</span>
          <span class="item-input">{{deviceData.lat | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">建站地址：</span>
          <span class="item-input">{{deviceData.adress | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">建站时间：</span>
          <span class="item-input">{{deviceData.createtime | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">管护人：</span>
          <span class="item-input">{{deviceData.managerusername | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">管护人电话：</span>
          <span class="item-input">{{deviceData.managerphone | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">厂商：</span>
          <span class="item-input">{{deviceData.productfactoryname | fromatNull}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="basic-item">
          <span class="item-label">承建单位：</span>
          <span class="item-input">{{deviceData.buildCompanyName | fromatNull}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getDeviceBasicInfo} from '@/api/deviceBase.js'

  export default {
    props: ['device'],
    data() {
      return {
        deviceData: {
          id: null,
          name: null,
          relType: null,
          addvnm: null,
          addvcd: null,
          adress: null,
          lgtd: null,
          lttd: null,
          managername: null,
          managerphone: null,
          createtime: null,
          productfactoryname: null,
          buildCompanyName: null,
        }
      }
    },
    methods: {
      queryData() {
        let params = {
          id: this.device.id
        }
        getDeviceBasicInfo(params).then(res => {
          Object.assign(this.deviceData, res.data)
        })
      }
    },
    mounted() {
      this.queryData()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .site-basic {
    padding: 0.2rem 0.3rem 0;
    .el-row {
      margin: 0;
    }
    .basic-item {
      height: 0.62rem;
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
  }
</style>
