<template>
  <!-- 视频站 -->
  <div class="hzz-video mt-2">
    <div class="video-fl">
      <video controls="controls" autoplay="autoplay" loop="loop" height="100%" width="100%" v-if="videoSrc"
             id="videojs" class="video-js vjs-default-skin">
        <source :src="videoSrc" type="application/x-mpegURL"/>
      </video>
    </div>
    <div class="video-console">
      <div class="console-header">控制台</div>
      <div class="console-content">
        <p>焦距</p>
        <div class="content-bar bar-button-group">
          <el-button icon="el-icon-minus" circle size="mini" @click="decrease"></el-button>
          <el-progress :percentage="percentageFocus" :format="formatFocus" class="progress_fous"></el-progress>
          <el-button icon="el-icon-plus" circle size="mini" @click="increase"></el-button>
        </div>
        <p>回放
          <i class="el-icon-video-play" v-if="!percentagePlayback" @click="stratPlayback"></i>
          <i class="el-icon-video-pause" v-else @click="stopPlayback"></i>
        </p>
        <div class="content-bar">
          <el-progress :percentage="percentagePlayback" :format="format"></el-progress>
        </div>
        <p>录制
          <i class="el-icon-video-play" v-if="!percentageRecord" @click="stratRecord"></i>
          <i class="el-icon-video-pause" v-else @click="stopRecord"></i>
        </p>
        <div class="content-bar">
          <el-progress :percentage="percentageRecord" :format="format"></el-progress>
        </div>
        <div class="console-control">
          <img :src="active != 1 ? require('@/assets/images/video/t.png') : require('@/assets/images/video/t-1.png')"
               alt="上" class="img-t" @click="handleControl('up')">
          <img :src="active != 2 ? require('@/assets/images/video/b.png') : require('@/assets/images/video/b-1.png')"
               alt="下" class="img-b" @click="handleControl('down')">
          <img :src="active != 3 ? require('@/assets/images/video/l.png') : require('@/assets/images/video/l-1.png')"
               alt="左" class="img-l" @click="handleControl('left')">
          <img :src="active != 4 ? require('@/assets/images/video/r.png') : require('@/assets/images/video/r-1.png')"
               alt="右" class="img-r" @click="handleControl('right')">
          <img :src="active != 5 ? require('@/assets/images/video/a.png') : require('@/assets/images/video/a-1.png')"
               alt="大" class="img-a" @click="handleControl('da')">
          <img :src="active != 6 ? require('@/assets/images/video/d.png') : require('@/assets/images/video/d-1.png')"
               alt="小" class="img-d" @click="handleControl('xiao')">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {shallowClone, hexToRGBA} from "@/utils/index"
  import {chartSetting} from './setting'
    import {deviceBase,getVueThingGatherDeviceInfoSingle,SendCallCmd} from "@/api/deviceBase"
  // sessionStorage.setItem('chartUnit', 'mm')
  export default {
    props: ['data', 'config','contData','device'],
    components:{
    },
    computed: {
    },
    data() {
      return {       
        videoSrc:"",      
      }
    },
    methods: {
      startVideo(){

        var data={"spcsjh":["kqtl"]}; //开启推流
        var pid="ce1b6486-ba55-43eb-a051-db3d107a13ec";
        var devID = this.device.id;
          this.sendDeviceCmd(
            devID,pid,data

          );
      },
      stopVideo(){
        var data={"spcsjh":["gbtl"]}; //关闭推流
        var pid="ce1b6486-ba55-43eb-a051-db3d107a13ec";
        var devID = this.device.id;
          this.sendDeviceCmd(
            devID,pid,data

          );

      },
      sendDeviceCmd(devID,protocolID,data){
          
        //发起设备控制命令
        this.tableLoading = true
      
        let params = {
          id:devID,
          msg:protocolID,
          data: data
        };
        let self = this;
       

        SendCallCmd(params).then(res => {
           if(res.status)
           {
              self.$message.success("命令已发送!");
           }else{
              self.$message.error("命令发送失败:"+res.msg);
           }
          
        })
        self.tableLoading = false;
    },

    },
    created(){
      this.videoSrc= this.device  ? "rtmp://120.77.219.179/springmvc/"+this.device.cusno+"_admin_abc12345" :"rtmp://"
    },
    mounted() {
      
     this.videoSrc= this.device  ? "rtmp://120.77.219.179/springmvc/"+this.device.cusno+"_admin_abc12345" :"rtmp://"
    },
    watch: {
      device:{
        handler(val){
          this.videoSrc= this.device  ? "rtmp://120.77.219.179/springmvc/"+this.device.cusno+"_admin_abc12345" :"rtmp://"
  
        },
        deep:true
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">

.posRightBtnPanel{
  position:absolute;
  right:10px;
  top:10px;
  z-index:100;
}
</style>
