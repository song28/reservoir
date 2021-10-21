<template>
  <div class="detail" v-if="data.type == 'detail'">
    <div class="tbd">
      <div
        v-for="(val, key, index) in tbDailyMaintenanceListHeader"
        :key="index"
        class="tbDetail"
      >
        <span style="font-weight:bold;padding:10px;"> {{ val.label }}:</span>
        {{ detailData[val.prop] }}
      </div>
      <div class="tbDetail">
        <span style="font-weight:bold;padding:10px;">上报水库</span>
        {{ data.data.reservoirName }}
      </div>
    </div>
    <div class="pic">
      <el-timeline>
        <el-timeline-item
          v-for="(activity2, index2) in activities2"
          :key="index2"
        >
          {{ activity2.content }}
          {{ (image5.length > 0 && image5[0].time) || "未上传" }}
          <div
            v-if="image5.length > 0"
            class="demo-image"
            style="display: flex;margin:20px 10px; flex-wrap: wrap;height:400px;overflow:auto"
          >
            <div class="block" v-for="(fit5, i5) in image5" :key="i5">
              <el-image
                :z-index="9999"
                fit="cover"
                style="width: 210px; height:300px;margin:20px;"
                :src="fit5.url"
                :preview-src-list="[fit5.url]"
              ></el-image>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import { getMaintainDetail, saveRecord } from "../api";
import { previewUrl, videoUrl, audioUrl } from "@/api/base.js";
import {
  tbReportRecordsDetailHeader,
  optionsReportFive,
  optionsReportFour
} from "../apiConfig";

export default {
  components: {},
  props: {
    data: {
      type: Object
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      fits: [],
      videoImg: "",
      muteStatus: false,
      tbDailyMaintenanceListHeader: [],
      activities2: [
        {
          content: "上报图片",
          timestamp: ""
        }
      ],
      image5: [],
      detailData: {}
    };
  },
  mounted() {},
  methods: {
    activeStep2() {
      console.log(this.detailData.imgs, "图片===");
      if (this.detailData.imgs.length > 0) {
        let image5 = [];
        this.detailData.imgs.forEach((e, i, a) => {
          image5.push({ url: previewUrl + e.imageurl, time: e.creattime });
        });
        this.image5 = image5;
        if (this.image5.length > 0) {
          this.activities2[0].timestamp =
            this.image5[0].time == null ? "暂无时间" : this.image5[0].time;
        }
      }
    },

    async getReportRecordsDetail() {
      let data  = await getMaintainDetail({
        inspectRecordId: this.data.data.inspectRecordId
      });
      if (data.status == 200) {
        console.log(data, "======");

        if (data.obj.record_type == 4) {
          optionsReportFour.forEach(a => {
            if (data.obj.implement_type == a.value) {
              data.obj.implement_type = a.label;
            }
          });
        } else if (data.obj.record_type == 5) {
          optionsReportFive.forEach(a => {
            if (data.obj.implement_type == a.value) {
              data.obj.implement_type = a.label;
            }
          });
        }
        this.tbDailyMaintenanceListHeader = tbReportRecordsDetailHeader;
        this.detailData = data.obj;
        this.activeStep2();
      }
    }
  },
  watch: {
    "data.data": {
      handler: function(newV, oldV) {
        if (this.data.type == "detail" && JSON.stringify(newV) != "{}") {
          console.log(newV,"88888888888");
          this.getReportRecordsDetail();
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
