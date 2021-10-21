<template>
  <div class="dialogCz">
    <el-dialog
      :title="data.title"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="60%"
    >
      <FormInspectionTour
        v-if="data.pageType == 'inspectionTour'"
        :data="data.data"
        ref="inspectionTourComponent"
      ></FormInspectionTour>
      <FormReportRecords
        v-if="data.pageType == 'reportRecords' && data.type == 'add'"
        :data.sync="data.data"
        ref="reportRecordsComponent"
      ></FormReportRecords>
      <FormDailyMaintenance
        v-if="data.pageType == 'dailyMaintenance' && data.type == 'add'"
        :data="data.data"
        ref="dailyMaintenanceComponent"
      ></FormDailyMaintenance>

      <FormInspectionDetail
        v-if="data.pageType == 'inspectionDetail'"
        :data="data.data"
        ref="inspectionDetailComponent"
      ></FormInspectionDetail>
      <preview v-if="data.pageType == 'preview'" :data="data.data" />

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureSave">确 定</el-button>
      </span>
      <div class="detail" v-if="data.type == 'detail'">
        <DetailDailyMaintenance
          v-if="data.pageType == 'dailyMaintenance'"
          :data="data"
        ></DetailDailyMaintenance>
        <DetailReportRecords
          v-if="data.pageType == 'reportRecords'"
          :data="data"
        ></DetailReportRecords>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FormInspectionTour from "./formInspectionTour";
import FormReportRecords from "./formReportRecords";
import FormDailyMaintenance from "./formDailyMaintenance";
import FormInspectionDetail from "./inspectionDetail";
import preview from "./preview";

//详情
import DetailDailyMaintenance from "./detailDailyMaintenance";
import DetailReportRecords from "./detailReportRecords";
import { getMaintainDetail, saveRecord } from "../api";
import { previewUrl, videoUrl, audioUrl } from "@/api/base.js";
import {
  tbDailyMaintenanceListDetailHeader,
  tbReportRecordsHeader,
  tbReportRecordsDetailHeader,
  optionsReportFive,
  optionsReportFour,
} from "../apiConfig";

export default {
  components: {
    FormInspectionTour,
    FormReportRecords,
    FormDailyMaintenance,
    FormInspectionDetail,
    DetailDailyMaintenance,
    DetailReportRecords,
    preview,
  },
  props: {
    data: {
      type: Object,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    sureSave() {
      switch (this.data.pageType) {
        case "inspectionTour":
          //巡视检查
          this.$refs.inspectionTourComponent.$refs.formData.validate((valid) => {
            if (valid) {
              if (this.data.type == "add") {
                //调用添加接口
                console.log("1---巡视检查添加验证通过");
              } else if (this.data.type == "update") {
                //调用修改接口
                console.log("2---巡视检查修改验证通过");
              }
            } else {
              console.log("error submit!!");
              return false;
            }
          });
          break;
        case "reportRecords":
          //上报记录
          if (this.data.type == "detail") {
            this.$emit("update:dialogVisible", false); //触发 input 事件，并传入新值
            return;
          }
          this.$refs.reportRecordsComponent.$refs.formData.validate(async (valid) => {
            if (valid) {
              if (this.data.type == "add") {
                let record_type = "";
                if (this.data.data.reportType == "second") {
                  record_type = 5;
                } else if (this.data.data.reportType == "first") {
                  record_type = 4;
                }
                let pam = {
                  record_type: record_type,
                  id: this.data.data.person,
                  implement_type: this.data.data.implementTypeDetail,
                  desc: this.data.data.desc,
                  gid: this.data.data.gid.gid,
                  imgs: this.data.data.imags,
                  createTm: this.data.data.createTm,
                };
                let { status, msg, data } = await saveRecord(pam);
                if (status) {
                  this.$notify.success({
                    title: "成功",
                    message: msg,
                  });
                  this.$emit("update:dialogVisible", false);
                  this.$emit("backDialogData", { ifUpdateData: true });
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: msg,
                  });
                }
              }
            } else {
              console.log("error submit!!");
              return false;
            }
          });
          break;
        case "dailyMaintenance":
          break;
        case "inspectionDetail":
          this.handleClose();
          break;
      }
    },
    //关闭弹框
    handleClose() {
      this.data.data = {};
      this.$emit("update:dialogVisible", false); //触发 input 事件，并传入新值
    },
  },
};
</script>

<style lang="scss" scoped>
.dialogCz {
  >>> .el-form {
    padding-top: 0.2rem !important;
  }
  >>> .el-icon-close:before {
    color: white !important;
  }
  .detail {
    margin: 20px 0px;
  }
}
</style>
