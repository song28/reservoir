<template>
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
  import { formatDate } from '@/utils/time'
  import { controlVidel } from '@/views/videoMonitor/manage/api'

  window.timerePlayback = null
  window.timereRecord = null
  export default {
    props: ['data'],
    data() {
      return {
        player: null,
        percentagePlayback: 0,
        percentageRecord: 0,
        percentageFocus: 0,
        // videoSrc: 'rtsp://192.168.1.64:1554/Streaming/Channels/102?transportmode=unicast&profile= ',
        videoSrc: 'rtmp://rtmp.open.ys7.com/openlive/a4e31330c9864bfe9bbe0dc9d8efdda4.hd',
        active: 0,
        player2: null
      }
    },
    methods: {
      // 视频控制  1 上 2 下 3 左 4 右 5 大 6小
      handleControl(type) {
        this.active = type
        let self = this
        var params = {
          'videoAddress': '192.168.1.64:80',
          'videoAccount': 'admin',
          'videoPassword': 'abc!@#$A',
          'derection': type
        }
        // var params = {"videoAddress":this.data.extra.videoAddress, "videoAccount":this.data.extra.videoAccount, "videoPassword":this.data.extra.videoPassword, "derection":type}
        controlVidel(params).then(res => {
          console.log(res.status)
        })
        setTimeout(function() {
          self.active = 0
        }, 1000 * 5)
      },
      // 播放视频
      playerVideo() {
        // this.player = window.player = videojs('videojs');
        this.player = window.player = new EZUIPlayer('videojs')
      },

      format(time) {
        let s = '00'
        let m = '00'
        let h = '00'
        if (time) {
          s = this.formatNum(time % 60)
          m = this.formatNum(parseInt(time / 60) % 60)
          h = this.formatNum(parseInt(time / 60 / 60))
        }
        return h + ':' + m + ':' + s
      },

      formatFocus(percentage) {
        let val = '0mm'
        if (percentage) {
          val = percentage + 'mm'
        }
        return val
      },

      formatNum(num) {
        if (num < 10) {
          return '0' + num
        }
        return num
      },

      increase() {
        this.percentage += 1
        if (this.percentage > 100) {
          this.percentage = 100
        }
      },
      decrease() {
        this.percentage -= 1
        if (this.percentage < 0) {
          this.percentage = 0
        }
      },

      // 开始回放
      stratPlayback() {
        let self = this
        timerePlayback = setInterval(function() {
          let nums = self.percentagePlayback++
          console.log('开始回放', self.percentagePlayback)
        }, 1000 * 1)

      },
      // 暂停回放
      stopPlayback() {
        clearInterval(timerePlayback)
        console.log('暂停回放', this.percentagePlayback)
      },
      // 开始录制
      stratRecord() {
        let self = this
        timereRecord = setInterval(function() {
          let nums = self.percentageRecord++
          console.log('开始录制', self.percentageRecord)
        }, 1000 * 1)
      },

      // 暂停录制
      stopRecord() {
        clearInterval(timereRecord)
        console.log('暂停录制', this.percentageRecord)
      }

    },
    mounted() {
      this.$nextTick(function() {
        this.playerVideo()
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss" scope>
  @import "~@/assets/css/video-js.min.css";

  .hzz-video {
    display: flex;
    height: 520px;
    min-height: 500px;

    .video-fl {
      width: 8.4rem;
      height: 100%;
      margin-right: 12px;
    }

    .video-console {
      width: 258px;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 3px 0px rgba(135, 114, 233, 0.16);

      .console-header {
        height: 0.34rem;
        text-align: center;
        line-height: 0.34rem;
        background: rgba(175, 199, 254, 1);
        font-size: 0.16rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(21, 50, 103, 1);
      }

      .console-content {
        padding: 0.2rem;
        display: flex;
        flex-direction: column;

        p {
          font-size: 15px;
          font-family: SourceHanSansCN-Regular;
          color: rgba(110, 133, 151, 1);
          margin-bottom: 0.1rem;
          display: flex;
          align-items: center;

          i {
            font-size: 16px;
            color: #0EB4FF;
            margin-left: 5px;
            font-weight: 600;
            cursor: pointer;
          }
        }

        .console-control {
          position: relative;
          width: 232px;
          height: 232px;

          img {
            position: absolute;
            width: max-content;
            height: max-content;
          }

          .img-t {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }

          .img-b {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }

          .img-l {
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }

          .img-r {
            top: 50%;
            right: 0;
            transform: translateY(-50%);
          }

          .img-a {
            top: 50%;
            left: 60px;
            transform: translateY(-50%);
          }

          .img-d {
            top: 50%;
            right: 60px;
            transform: translateY(-50%);
          }
        }

        .content-bar {
          margin-bottom: 0.2rem;
        }
      }
    }

    .video-js {
      width: 8.4rem;
      height: 100%;
      /*.vjs-tech{*/
      /*width: 100%;*/
      /*height: 100%;*/
      /*}*/
    }

  }
</style>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .hzz-video {
    .el-progress {
      .el-progress-bar {
        padding-right: 0;

        .el-progress-bar__outer {
          width: 100%;
        }
      }

      .el-progress__text {
        position: absolute;
        top: 12px;
        right: 0;
        font-size: 12px;
      }
    }

    .bar-button-group {
      display: flex;
      align-items: center;

      .el-button--mini {
        padding: 2px;
        /*border-color: #0EB4FF;*/
        i {
          font-size: 12px;
          color: #0EB4FF;
        }
      }

      .el-progress {
        flex: 1;
        margin: 0 8px;

      }
    }

    .progress_fous {
      .el-progress__text {
        color: #0EB4FF;
        font-family: SourceHanSansCN-Regular;
      }
    }

    #videoj, #videojsflashId {
      width: 100%;
      height: 520px;
    }
  }
</style>
