<!--
 * @Author: song
 * @LastEditors: --
 * @Date: 2021-08-23 13:36:49
 * @LastEditTime: 2021-08-27 21:02:40
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\reservoirManagement\common\capacityCurve.vue
 * @Description: 暂无
-->
<template>
  <div class="capacityCurve">
    <div class="capacityCurve-main" v-if="!isEmpty">
      <div class="capacityCurve-data">
        <div>
          <el-row v-for="(item, index) in groupedArray" :key="index">
            <el-col :span="4">
              <div class="bg-hui">水位（m）</div>
              <div class="rongji">库容(万m³)</div>
            </el-col>
            <el-col :span="2" v-for="(ite, indexWater) in item" :key="indexWater">
              <div class="bg-hui">{{ ite.wl }}</div>
              <div class="rongji">{{ ite.stcp }}</div>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="4">
              <div class="bg-hui">水位（m）</div>
              <div class="rongji">库容(万m³)</div>
            </el-col>
            <el-col :span="2" v-for="(item, indexWater) in waterCon" :key="indexWater">
              <div class="bg-hui">{{ item.water }}</div>
              <div class="rongji">{{ item.kurong }}</div>
            </el-col>
          </el-row> -->
        </div>
      </div>
      <div class="capacityCurve-chart">
        <div class="title">水库库容曲线</div>
        <Echarts :chartData="chartData" v-if="showEchart"></Echarts>
      </div>
    </div>
    <div v-if="isEmpty" class="capacityCurve-main">
      <el-empty description="暂无水库库容曲线"></el-empty>
    </div>
    <div class="right">
      <!-- <el-button type="primary" size="small">导入</el-button> -->
      <el-upload
        class="upload-demo"
        :action="serveUrl"
        :headers="header"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        multiple
        :show-file-list="false"
      >
        <el-button size="small" type="primary">导入</el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
import Echarts from "@/views/shuiku/components/echarts/index";
import { loadWlstcparrl } from "../api";
export default {
  props: {
    data: {
      type: Object,
    },
    rscd: {
      type: String,
    },
  },
  components: {
    Echarts,
  },
  data() {
    return {
      isEmpty: true,
      showEchart: true,
      serveUrl: process.env.VUE_APP_BASE_API_6 + "/importWlstcparrl",
      waterCon: [
        { water: 1, kurong: 1 },
        { water: 2, kurong: 3 },
        { water: 3, kurong: 1 },
        { water: 4, kurong: 1 },
        { water: 5, kurong: 1 },
        { water: 6, kurong: 1 },
        { water: 7, kurong: 1 },
        { water: 8, kurong: 1 },
        { water: 9, kurong: 1 },
        { water: 10, kurong: 1 },
      ],
      listData: [],
      groupedArray: [],
      chartData: {
        data: {
          x: [],
          y: [],
        },
        height: "4rem",
        width: "100%",
        type: "cap",
      },
    };
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("xtoken");
      return { "X-Token": token };
    },
  },
  methods: {
    beforeUpload(file) {
      //检查是否符合要求
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      if (!extension && !extension2) {
        this.$message.error("只能上传excel文件");
        return false;
      }
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList, "导入---");
      if (response.status) {
        this.dialogTableVisible = false;
        this.$emit("clickBtn", { type: "import" });
        this.$GXprompt.notify.success(response.msg);
        this.loadWlstcparrlFun();
      } else {
        this.$GXprompt.notify.error(response.msg);
      }
      this.$refs.upload.clearFiles(); //清空文件
    },
    loadWlstcparrlFun() {
      let params = {
        rscd: this.data.data.rscd ? this.data.data.rscd : this.rscd,
      };
      let x = [];
      let y = [];
      loadWlstcparrl(params).then((res) => {
        if (res.status) {
          // this.$notify.success({
          //   title: "成功",
          //   message: res.msg,
          // });
          if (res.obj.length > 0) {
            this.isEmpty = false;
          }
          res.obj.forEach((d) => {
            x.push(d.wl);
            y.push(d.stcp);
          });
          var groupedArray = this.group(res.obj, 10);
          this.groupedArray = groupedArray;
          console.log(groupedArray, "groupedArray");
          this.chartData.data.x = x;
          this.chartData.data.y = y;

          this.listData = res.obj;
        } else {
          // this.$notify.error({
          //   title: "失败",
          //   message: res.msg,
          // });
        }
      });
    },
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
  },
  watch: {},
  created() {
    if (this.data.type != "add" || this.rscd) {
      this.loadWlstcparrlFun();
    }
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
.capacityCurve {
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  .capacityCurve-main {
    width: calc(100% - 1rem);
    padding-right: 0.2rem;
  }
  .capacityCurve-data {
    margin-bottom: 20px;
    border: 1px solid #f6f6f6;
    height: 2rem;
    overflow: auto;
    >>> .el-col-4 {
      text-align: center;
      border-top: 1px solid #dae3f0;
      border-right: 1px solid #dae3f0;
      border-left: 1px solid #dae3f0;
      text-align: center;
      // border-bottom: 1px solid #f0f;
    }
    >>> .el-col-2 {
      border-right: 1px solid #dae3f0;
      text-align: center;
      border-top: 1px solid #dae3f0;
      text-align: center;
    }
  }
  .capacityCurve-chart {
    // height: 100%;
    .title {
      font-size: 0.16rem;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #29958b;
    }
  }
  .right {
    width: 1rem;
  }
}
.bg-hui {
  background: #f6f6f6;
  border-bottom: 1px solid #dae3f0;
}
.rongji {
  border-bottom: 1px solid #dae3f0;
}
</style>
