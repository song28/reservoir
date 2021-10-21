<template>
  <div class="dialogCz">
    <div class="tbd">
      <div
        v-for="(val, key, index) in tbDailyMaintenanceListHeader"
        :key="index"
        class="tbDetail"
      >
        <span style="font-weight:bold;padding:10px;"> {{ val.label }}:</span>
        {{ detailData[val.prop] }}
      </div>
    </div>
    <div class="yuyin" v-if="playLength > 0">
      <span style="font-weight:bold;padding:10px;"> 语音描述:</span>
      <el-image
        style="width:auto;height:28px;"
        :src="yuyinImg"
        @click="playAudeo()"
      >
      </el-image>
      {{ playLength }}s
      <span style="margin-left:0px;" @click="playAudeo()">点击播放</span>
      <audio controls="controls" preload id="music" hidden>
        <source :src="autoVideo" type="audio/ogg" />
        <source :src="autoVideo" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    <div class="pic">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index">
          {{ activity.content }}
          <template v-if="index == 0">
            {{ (image1.length > 0 && image1[0].time) || "未上传" }}
            <div
              v-if="image1.length > 0"
              class="demo-image"
              style="display: flex;margin:20px 10px; flex-wrap: wrap;height:400px;overflow:auto"
            >
              <div class="block" v-for="(fit0, i0) in image1" :key="i0">
                <el-image
                  :z-index="9999"
                  fit="cover"
                  style="width: 210px; height:300px;margin:20px;"
                  :src="fit0.url"
                  :preview-src-list="[fit0.url]"
                ></el-image>
              </div>
            </div>
          </template>
          <template v-if="index == 2">
            {{ (image3.length > 0 && image3[0].time) || "未上传" }}
            <div
              v-if="image3.length > 0"
              class="demo-image"
              style="display: flex;margin:20px 10px; flex-wrap: wrap;height:400px;overflow:auto"
            >
              <div class="block" v-for="(fit1, i1) in image3" :key="i1">
                <el-image
                  :z-index="9999"
                  fit="cover"
                  style="width: 210px; height:300px;margin:20px;"
                  :src="fit1.url"
                  :preview-src-list="[fit1.url]"
                ></el-image>
              </div>
            </div>
          </template>
          <template v-if="index == 1">
            {{ (image2.length > 0 && image2[0].time) || "未上传" }}
            <div style="margin:20px;" v-if="image2.length > 0">
              <video
                v-for="(fit2, i2) in image2"
                :key="i2"
                id="myvideo"
                :src="fit2.url"
                controls="controls"
                :poster="videoImg"
                :muted="muteStatus"
                :autoplay="playStatus"
                height="314"
                width="520"
              >
                your browser does not support the video tag
              </video>
            </div>
          </template>
          <template v-if="index == 3">
            {{ (image4.length > 0 && image4[0].time) || "未上传" }}
            <div style="margin:20px;" v-if="image4.length > 0">
              <video
                v-for="(fit3, i3) in image4"
                :key="i3"
                id="myvideo"
                :src="fit3.url"
                controls="controls"
                :poster="videoImg"
                :muted="muteStatus"
                :autoplay="playStatus"
                height="314"
                width="520"
              >
                your browser does not support the video tag
              </video>
            </div>
          </template>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { getMaintainDetail } from "../api";
import { previewUrl, videoUrl, audioUrl } from "@/api/base.js";
import { tbDailyMaintenanceListDetailHeader } from "../apiConfig";
//详情
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      playLength: "",
      showGif: false,
      yuyinImg: require("@/assets/images/语音.png"),
      autoVideo: "",
      active: 0,
      fits: [],
      videoSrc: "https://www.w3school.com.cn/i/movie.ogg",
      videoImg: "",
      playStatus: "auto",
      muteStatus: false,
      tbDailyMaintenanceListHeader: [],
      activities: [
        {
          content: "养护前照片",
          timestamp: ""
        },
        {
          content: "养护前视频",
          timestamp: ""
        },
        {
          content: "养护后照片",
          timestamp: ""
        },
        {
          content: "养护后视频",
          timestamp: ""
        }
      ],
      activities2: [
        {
          content: "上报图片",
          timestamp: ""
        }
      ],
      image1: [],
      image2: [],
      image3: [],
      image4: [],
      detailData: {}
    };
  },
  mounted() {},
  methods: {
    //播放录音文件
    playAudeo() {
      var audio = document.getElementById("music"); //必须用原生js获取id，jquery无效
      //切换图片
      this.showGif = !this.showGif;
      if (this.showGif) {
        audio.play();
        this.yuyinImg = require("@/assets/images/语音gif.gif");
      } else {
        this.yuyinImg = require("@/assets/images/语音.png");
      }
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },

    activeStep() {
      console.log(this.detailData.imgs.length, "图片类型===");
      if (this.detailData.imgs.length > 0) {
        let image1 = [],
          image2 = [],
          image3 = [],
          image4 = [];
        this.detailData.imgs.forEach((e, i, a) => {
          if (e.imagename == "养护前图片") {
            image1.push({ url: previewUrl + e.imageurl, time: e.creattime });
          }
          if (e.imagename == "养护后图片") {
            image3.push({ url: previewUrl + e.imageurl, time: e.creattime });
          }
        });
        this.detailData.vidoes.forEach((e, i, a) => {
          if (e.imagename == "养护前视频") {
            image2.push({ url: videoUrl + e.imageurl, time: e.creattime });
          }
          if (e.imagename == "养护后视频") {
            image4.push({ url: videoUrl + e.imageurl, time: e.creattime });
          }
        });
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
        if (this.image1.length > 0) {
          this.activities[0].timestamp =
            this.image1[0].time == null ? "暂无时间" : this.image1[0].time;
        }
        if (this.image2.length > 0) {
          this.activities[1].timestamp =
            this.image2[0].time == null ? "暂无时间" : this.image2[0].time;
        }
        if (this.image3.length > 0) {
          this.activities[2].timestamp =
            this.image3[0].time == null ? "暂无时间" : this.image3[0].time;
        }
        if (this.image4.length > 0) {
          this.activities[3].timestamp =
            this.image4[0].time == null ? "暂无时间" : this.image4[0].time;
        }
      }
    },
    //获得表头与对应数据
    async getDetail(gid) {
      this.detailData = {};
      switch (this.data.pageType) {
        case "dailyMaintenance":
          let { msg, status, data } = await getMaintainDetail({
            inspectRecordId: gid
          });
          if (status) {
            data.record_type = "日常养护";
            if (0 == data.implement_type) {
              data.implement_type = "坝坡砍青";
            } else if (1 == data.implement_type) {
              data.implement_type = "沟道清淤";
            } else if (2 == data.implement_type) {
              data.implement_type = "踏步清扫";
            } else if (3 == data.implement_type) {
              data.implement_type = "水尺维护";
            } else if (4 == data.implement_type) {
              data.implement_type = "溢洪道清理";
            } else if (5 == data.implement_type) {
              data.implement_type = "启闭机房卫生";
            } else if (6 == data.implement_type) {
              data.implement_type = "启闭机刷漆";
            }
            this.detailData = data;
            this.activeStep();
            this.tbDailyMaintenanceListHeader = tbDailyMaintenanceListDetailHeader;
            if (this.detailData.audios.length > 0) {
              let strArr = this.detailData.audios[0].imagename.split("_");
              this.playLength = strArr[strArr.length - 1];
              this.autoVideo = audioUrl + this.detailData.audios[0].imageurl;
            }
          }
          break;
      }
    }
  },
  watch: {
    "data.data": {
      handler: function(newV, oldV) {
        console.log(newV, "--------记录详情接口===");
        if (this.data.type == "detail" && JSON.stringify(newV) != "{}") {
          this.getDetail(newV.inspectRecordId);
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style  lang='scss' scoped>
.detail {
  margin: 20px 0px;
  
  // min-height: 300px;
  .tbd {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .tbDetail {
      margin: 2px 0px;
      width: 50%;
    }
  }
  .yuyin {
    height: 40px;
    // line-height: 40px;
    >>> .el-image {
      vertical-align: middle;
    }
  }
  .pic {
    height: 450px;
    margin: 20px 10px;
    >>> .el-step__title.is-success {
      color: #29958b;
    }
    >>> .el-timeline-item__node {
      background-color: #29958b !important;
    }
    >>> .el-timeline {
      margin-left: 0px !important;
    }

  }
}
</style>