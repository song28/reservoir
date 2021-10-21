<!--
 * @Descripttion: 预警详情
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-24 20:23:17
 * @LastEditTime: 2021-09-10 20:35:34
-->
<template>
  <div class="Alertdetail">
    <div class="AlertTop" style="color:#29958b;font-weight: bold;" @click="back">
      <el-row>
        <el-col :span="4" style="text-align:left;line-height:0.4rem">＞＞返回</el-col>
        <el-col :span="20" style="text-align:right">
          <el-button
            type="skbtn"
            icon="el-icon-edit-outline"
            plain
            size="mini"
            style="margin-top:0.05rem"
            @click.stop="edit('edit')"
          >预警发布</el-button>
        </el-col>
      </el-row>
    </div>
    <hr style="border:1px solid #edf3f9;margin:0.1rem">

    <div class="AlertCon">
      <div class="left">
        <div class="yjInfo">
          <p>预警信息</p>
          <div class="yjconTb">
            <el-row v-for="(item,index) in list" :key="index" class="row">
              <el-col :span="8" class="rowLeft">开始时间</el-col>
              <el-col :span="16" class="rowRight">202121222212</el-col>
            </el-row>
          </div>
        </div>
        <div class="yjPosition">
          <p>预警信息</p>
          <el-image
            style="width: 100%; height: 2.9rem"
            fit="cover"
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          />
        </div>
        <div class="yjProcess">
          <p>预警过程</p>
          <div class="AlertEcharts">
            <AlertProcess :chart-data="chartData" />
          </div>
        </div>
      </div>
      <div class="right">
        <AlertManage />
      </div>
    </div>
  </div>
</template>
<script>
// import AlertManage from './alertManage'
// import AlertProcess from '../components/echarts/alertProcess'

export default {
  // components: {AlertManage, AlertProcess},
  data() {
    return {
      showData: false,
      chartData: {
        height: '300px',
        width: '100%',
        data: {
          x: [1, 2, 3, 4, 4, 55],
          y: [2, 3, 4, 4, 5, 6, 7]
        }
      },
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      activities: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: require('@/assets/images/video/icon/mov_r_x@2x.png')
        },
        {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        },
        {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        },
        {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }
      ]
    }
  },

  mounted() {},
  methods: {
    back() {
      console.log('fdffs')
      this.$emit('backDetailData', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.Alertdetail {
 position: absolute;
 top: 0px;
 right: 0;
 width: 100%;
 height: 6.8rem;
 .AlertTop {
  height: 100%;
  height: 0.28rem;
 }
 .AlertCon {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  height: 6.4rem;
  .left {
   width: calc(100% - 3.2rem);
   height: 100%;
   display: flex;
   flex-wrap: wrap;
   p {
    font-size: 0.16rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #000000;
    line-height: 0.22rem;
   }
   .yjInfo {
    width: 50%;
    height: 3.2rem;
    overflow: hidden;
    .yjconTb {
     width: 100%;
     height: 2.9rem;
     overflow: auto;
     .row {
      text-align: center;
      color: #333333;
      .rowLeft {
       background: #f4fbf5;
       border: 1px solid #cfe5e1;
       padding: 0.03rem;
      }
      .rowRight {
       background: #ffffff;
       border: 1px solid #cfe5e1;
       border-radius: 2px;
       padding: 0.03rem;
      }
     }
    }
   }
   .yjPosition {
    width: 48%;
    margin-left: 2%;
    height: 3.2rem;
   }
   .yjProcess {
    height: 3.8rem;
    width: 100%;
    .yjProcess {
     width: 100%;
     height: 2.8rem;
    }
   }
  }
  .right {
   width: 3.2rem;
   height: 100%;
   overflow: hidden;
  }
 }
}
</style>
