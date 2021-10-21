<template>
  <div class="detail">
    <div style="width:100%;text-align:center">
      <el-image
        :z-index="Number(3333)"
        :src="src"
        style="width:200px;height:auto;text-align:center"
        fit="fill"
        :preview-src-list="[src]"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <div class="tbd">
      <!-- <p style="font-weight:bold;padding:10px 10px 0px 10px;">
        个人照片(点我放大)
      </p> -->
      <div
        v-for="(val, key, index) in tbskPersonListHeader1"
        :key="index"
        class="tbDetail"
      >
        <span style="font-weight:bold;padding:10px;"> {{ val.label }}:</span>
        {{ detailData[val.prop] }}
      </div>
    </div>
    <el-row>
      <el-col :span="12" v-if="this.detailData.trainCertPath != null">
        <p
          style="font-weight:bold;padding:10px 10px 0px 10px;color:green"
          @click="down(1)"
        >
          证书下载
        </p>
      </el-col>
      <el-col :span="12" v-if="this.detailData.elecContractPath != null">
        <p
          style="font-weight:bold;padding:10px 10px 0px 10px;color:green"
          @click="down(2)"
        >
          合同下载
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getReservoirInspctorByPage } from "../api";
import { previewUrl, videoUrl, audioUrl, previewFileUrl } from "@/api/base.js";
import { tbskPersonListHeader, pxResultsOptions } from "../apiConfig";
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
      src: "",
      tbskPersonListHeader1: [],
      detailData: {}
    };
  },
  mounted() {},
  methods: {
    down(data) {
      if (data == 1) {
        console.log(this.detailData.trainCertPath, "====");
        window.open(this.detailData.trainCertPath);
      } else {
        window.open(this.detailData.elecContractPath);
      }
    },
    getDetail() {
      this.tbskPersonListHeader1 = tbskPersonListHeader;
      this.detailData = this.data.data;
      this.src = this.detailData.selfPic;
      pxResultsOptions.forEach(e => {
        if (this.detailData.trainResult == e.value) {
          this.detailData.trainResult = e.label;
        }
      });
    }
  },
  watch: {
    "data.data": {
      handler: function(newV, oldV) {
        if (this.data.type == "detail" && JSON.stringify(newV) != "{}") {
          console.log(newV, "88888888888");
          this.getDetail();
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped lang='scss'>
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
}
</style>
