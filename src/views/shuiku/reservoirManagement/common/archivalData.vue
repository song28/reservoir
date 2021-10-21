<!--
 * @Author: song
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-23 13:36:49
 * @LastEditTime: 2021-09-13 18:28:34
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\reservoirManagement\common\archivalData.vue
 * @Description: 暂无
-->
<template>
  <div class="archivalData">
    <el-header>
      <Btns :data="dataBtn" @clickBtn="backClickBtnType" />
    </el-header>
    <div class="archivalData-main">
      <div class="aside">
        <fileLeftTreeBar
          ref="tree"
          :data="leftBardata"
          @backDataChecked="backData"
          @backDataNode="backDataNode"
        />
      </div>
      <div id="right" class="right">
        <div v-if="!isEmpty" class="title">资料文件名称：{{ flnm }}</div>

        <div class="img" v-if="fltp == 'img'">
          <el-image :src="rowData.flpath" :fit="'cover'"></el-image>
        </div>
        <div class="video" v-else-if="fltp == 'video'">
          <video
            width="100%"
            height="500"
            :src="rowData.flpath"
            controls="controls"
          ></video>
        </div>
        <div v-else>
          <viewFile :wps-url="jwpsUrl" :token="jtoken" />
        </div>

        <div v-if="isEmpty" class="capacityCurve-main">
          <el-empty description="暂无内容" />
        </div>
      </div>
    </div>
    <fileDialog
      v-if="filedialogVisible"
      :filedialog-visible.sync="filedialogVisible"
      :data="dialogData"
      :rscd="rscd"
      @backDialogData="backDialogData"
    />
  </div>
</template>
<script>
import { fileTree, fileSave, fileDel, getViewUrlWebPath } from "../api";
import Btns from "../../components/tree/btns.vue";
import fileLeftTreeBar from "../../components/tree/fileLeftTreeBar.vue";
import fileDialog from "./fileDialog";
import viewFile from "./viewFile";
export default {
  components: { Btns, fileLeftTreeBar, fileDialog, viewFile },
  props: {
    data: {
      type: Object,
    },
    rscd: {
      type: String,
    },
  },
  data() {
    return {
      filedialogVisible: false,
      dataBtn: {
        // 功能按钮配置
        pageType: "skListNew",
        model: 2,
        titleInput: "",
        conInput: "",
        width: "200px",
        add: true,
        query: false,
        import: false,
        importType: false, // true代表单个，false代表多个
        importExcel: false,
        importExcelDemo: false,
        uploadUrl: process.env.VUE_APP_BASE_API_6 + "/upload", // 上传地址
        del: true, // 删除按钮
      },
      isEmpty: true,
      leftBardata: {
        // 树列表配置
        type: 1,
        title: "",
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false,

        rscd: "", //水库编码
        isRefresh: "",
      },
      dialogData: {
        // 弹框配置
        activeName: "addFile", // 添加、修改、详情表单页面名称
        title: null, // 弹框标题
        type: null, // 操作add添加，update修改,detail查看
        data: {}, // 数据
        pageType: "skList", // 页面类型
      },
      rowData: {},
      wpsUrl:
        "http://221.222.253.220:19001/file/2021/08/25/20210825164133409.pdf",
      jwpsUrl:
        "http://221.222.253.220:19001/file/2021/08/25/20210825164133409.pdf",
      jtoken: "",
      flcd: "",
      flnm: "",
      fltp: "",
    };
  },
  watch: {
    data: {
      handler(val) {
        console.log(val, "data档案资料===");
      },
      deep: true,
      immediate: true,
    },

    filedialogVisible: {
      handler(val) {
        console.log(val, "档案资料===");
        if (!val) {
          this.getTime();
        }
      },
    },
  },
  created() {
    this.leftBardata.rscd = this.data.data.rscd
      ? this.data.data.rscd
      : this.rscd;
    console.log(
      this.leftBardata.rscd,
      "this.leftBardata.rscd",
      this.data,
      "this.data"
    );
  },
  methods: {
    // fltp  img video file
    // 视频相关
    toPlay() {
      this.$refs.videoPlayer.paused === true
        ? this.$refs.videoPlayer.play()
        : this.$refs.videoPlayer.pause();
    },
    toForward() {
      var time = 10; //单位秒，每次增减10秒
      this.$refs.videoPlayer.volume !== this.$refs.videoPlayer.duration
        ? (this.$refs.videoPlayer.currentTime += time)
        : 1;
    },
    toBack() {
      var time = 10;
      console.log("后退");
      this.$refs.videoPlayer.currentTime !== 0
        ? (this.$refs.videoPlayer.currentTime -= time)
        : 1;
    },
    addVoice() {
      var vol = 0.1;
      console.log("增加音量");
      this.$refs.videoPlayer.volume !== 1
        ? (this.$refs.videoPlayer.volume += vol)
        : 1;
    },
    decrease() {
      var vol = 0.1;
      console.log("减小音量");
      this.$refs.videoPlayer.volume !== 0
        ? (this.$refs.videoPlayer.volume -= vol)
        : 1;
    },
    // 树列表返回数据
    backData(data) {
      const arr = [];
      data.forEach((e, i, a) => {
        arr.push(e.addvcd);
      });
      if (arr.length > 0) {
        this.currentAddvcd = arr.toString();
      } else {
        this.currentAddvcd = this.$store.state.user.addvcd;
      }
      this.getsklist();
      console.log(data, "树列表返回数据");
    },
    // 点击高亮返回的值
    backDataNode(data) {
      this.rowData = data;
      this.flcd = data.flcd;
      this.fltp = data.fltp;
      if (this.fltp == "file") {
        document.getElementById("wps-iframe").style.display = "show";
        if (data.flpath) {
          this.flnm = data.flnm;
          this.getViewUrlWebPath();
        }
      } else {
        document.getElementById("wps-iframe").style.display = "none";
        // if (data.flpath) {
        //   this.flnm = data.flnm;
        //   this.isEmpty = false;
        // }
      }

      console.log(
        data,
        "点击高亮返回的值",
        this.flcd,
        "this.flcd",
        this.fltp,
        "this.fltp"
      );
    },
    getViewUrlWebPath() {
      const params = {
        fileUrl: this.rowData.flpath,
      };
      getViewUrlWebPath(params).then((res) => {
        if (res.status) {
          sessionStorage.wpsUrl = res.data.wpsUrl;
          sessionStorage.token = res.data.token;
          this.wpsUrl = res.data.wpsUrl;
          this.jwpsUrl = res.data.wpsUrl;
          this.jtoken = res.data.token;
          // this.fltp = res.data.fltp;
          this.isEmpty = false;
          console.log(this.wpsUrl, "this.wpsUrl", this.jtoken, ", this.jtoken");
          this.openWps(this.wpsUrl, this.jtoken);
        }
      });
    },
    openWps(url, token) {
      const _this = this;
      const wps = _this.wps.config({
        mode: _this.simpleMode ? "simple" : "normal",
        mount: document.querySelector("#right"),
        wpsUrl: url,
      });
      wps.setToken({ token });
      console.log(url, "url, token", token, "url, token");
      const app = wps.Application;
      // this.console.log(JSON.stringify(app));
    },
    // 对话框返回数据 - 添加，修改成功之后刷新树列表以及表格数据并且置空弹框数据
    backDialogData(data) {
      this.data.ifUpdateData = data;
      this.dialogData.data = {};
      this.currentPage = 1;
      this.getsklist();
    },
    // 功能按钮返回数据 add,添加,import 导入,importExcelDemo下载模板,importExcel导出,query搜索
    backClickBtnType(data) {
      switch (data.type) {
        case "add": // 添加
          this.filedialogVisible = true;
          this.dialogData.title = "添加文档";
          this.dialogData.type = "add";
          this.dialogData.data = this.data.data;
          break;
        case "import":
          // 更新表格列表即可
          this.currentPage = 1;
          this.getsklist();
          break;
        case "importExcelDemo":
          window.location.href = demo;
          break;
        case "importExcel":
          this.download("");
          break;
        case "query":
          this.currentPage = 1;
          this.query.keys = data.data;
          // 行政区或水库+搜索内容 调用接口
          this.getsklist();

          break;
        case "del":
          if (!this.flcd) {
            this.$notify.error({
              title: "失败",
              message: "请选择要删除的档案资料",
            });
            return;
          }
          // 删除档案资料
          this.fileDelFun();

          break;
      }
    },
    // 删除档案资料
    fileDelFun() {
      const params = {
        flcd: this.flcd,
      };
      fileDel(params).then((res) => {
        if (res.status == 200) {
          this.$notify.success({
            title: "成功",
            message: res.msg,
          });
          this.getTime();
        } else {
          this.$notify.error({
            title: "失败",
            message: res.msg,
          });
        }
      });
    },
    // 获取当前时间戳
    getTime() {
      this.$set(this.leftBardata, "isRefresh", new Date().getTime());

      console.log(this.leftBardata.isRefresh, "this.leftBardata.isRefresh");
    },
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
.archivalData {
  width: 100%;
  height: 100%;
  .archivalData-main {
    border-top: 1px solid #edf1f8;
    display: flex;
    height: calc(100% - 60px);
    justify-content: space-between;
    .right {
      padding: 6px 0;
      width: calc(100% - 220px);
      height: 500px;
      .title {
        line-height: 35px;
        font-weight: bolder;
        color: #29958b;
      }
    }
  }
}
.aside {
  width: 200px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #edf1f8;
}
.img {
  .el-image {
    width: 100%;
    height: 500px;
  }
}
</style>
