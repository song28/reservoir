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
      <SkList
        v-if="data.pageType == 'skList' && data.type != 'detail'"
        :data.sync="data.data"
        :ifdis="false"
        ref="skListComponent"
      ></SkList>

      <FormSKPersonList
        v-if="
          data.pageType == 'skPersonList' &&
          (data.type == 'add' || data.type == 'config' || data.type == 'update')
        "
        :data.sync="data.data"
        :ifdis="false"
        :type="data.type"
        ref="skPersonListComponent"
      ></FormSKPersonList>

      <FormSKStandards
        v-if="data.pageType == 'skStandards' && data.type != 'detail'"
        :data.sync="data.data"
        ref="skStandardsComponent"
      ></FormSKStandards>
      <DeleteSkPerson
        ref="skPersonListComponent"
        v-if="data.pageType == 'skPersonList' && data.type == 'delete'"
        :data.sync="data.data"
        @updateDataRows="updateDataRows"
      >
      </DeleteSkPerson>
      <DetaiSKPersonList
        v-if="data.pageType == 'skPersonList' && data.type == 'detail'"
        :data="data"
      ></DetaiSKPersonList>
      <DetailSkList
        v-if="data.pageType == 'skList' && data.type == 'detail'"
        :data="data"
      ></DetailSkList>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="sureSave"
          v-if="data.type != 'detail' && data.type != 'delete'"
          >确 定</el-button
        >
        <el-button
          @click="jieban"
          type="primary"
          v-if="data.pageType == 'skPersonList' && data.type == 'delete'"
          >批量解绑</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SkList from "./formSkList";
import FormSKPersonList from "./formSKPersonList";
import FormSKStandards from "./formSKStandards";
import DeleteSkPerson from "./deleteSkPerson";
import DetaiSKPersonList from "./detaiSKPersonList";
import DetailSkList from "./detailSkList";

import {
  addReservoirBaseInfo,
  updateReservoirBaseInfo,
  getBaseInfoById,
  addPointLocation,
  updatePointLocation,
  addReservoirInscptor,
  configReservoirInscptor,
  getReservoirImage,
  deleteBatchReservoirInscptor,
  getUserDetailInfoById,
  updateUserDetailInfo,
} from "../api";

import { previewUrl, previewFileUrl } from "@/api/base.js";
import {
  tbskListHeader,
  tbskPersonListHeader,
  tbskStandards,
  skListBarTypeOptions,
  skListOpenTypeOptions,
  skListSizeTypeOptions,
} from "../apiConfig";
import { generateUUID } from "@/utils";

export default {
  components: {
    SkList,
    FormSKPersonList,
    FormSKStandards,
    DeleteSkPerson,
    DetaiSKPersonList,
    DetailSkList,
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
    return {
      rows: [],
      src: "",
      detailData: {},
      tbListHeader: {},
    };
  },
  created() {},
  methods: {
    async jieban() {
      console.log(this.rows, "解绑的数据");
      let idsArr = [];
      this.rows.forEach((e) => {
        idsArr.push(e.id);
      });
      let { msg, data, status, total } = await deleteBatchReservoirInscptor({
        ids: idsArr.toString(),
      });
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
    },
    updateDataRows(data) {
      console.log(data, "342412");
      this.rows = data;
    },
    // //获得表头与对应数据
    // async getDetail(gid) {
    //   switch (this.data.pageType) {
    //     case "skList":
    //       await this.getImage(gid);
    //       this.tbListHeader = tbskListHeader;
    //       let { msg, status, data } = await getBaseInfoById({
    //         gid: gid
    //       });
    //       if (status) {
    //         skListBarTypeOptions.forEach(a => {
    //           if (Number(data.matrl) == a.value) {
    //             data.matrl = a.label;
    //           }
    //         });
    //         skListOpenTypeOptions.forEach(a => {
    //           if (Number(data.nsType) == a.value) {
    //             data.nsType = a.label;
    //           }
    //         });
    //         skListSizeTypeOptions.forEach(a => {
    //           if (Number(data.tegr) == a.value) {
    //             data.tegr = a.label;
    //           }
    //         });
    //         this.detailData = data;
    //       }
    //       break;
    //     case "skPersonList":
    //       this.tbListHeader = tbskPersonListHeader;
    //       // let { msg, status, data } = await getBaseInfoById({
    //       //   gid: gid
    //       // });
    //       // if (status) {
    //       this.detailData = data;
    //       //}
    //       break;
    //   }
    // },
    // async getImage(pam) {
    //   let { msg, status, data } = await getReservoirImage({
    //     reservoirId: pam
    //   });
    //   if (status) {
    //     console.log(data);
    //     if (data != null) {
    //       this.src = previewUrl + data.imageurl;
    //     }
    //   }
    // },
    sureSave() {
      switch (this.data.pageType) {
        case "skList":
          //水库列表
          this.$refs.skListComponent.$refs.formData.validate(async (valid) => {
            if (valid) {
              console.log("修改成功====");
              if (this.data.type == "add") {
                let { msg, status, data } = await addReservoirBaseInfo(this.data.data);
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
              } else if (this.data.type == "update") {
                skListBarTypeOptions.forEach((d) => {
                  if (this.data.data.matrl == d.label) {
                    this.data.data.matrl = d.value;
                  }
                });
                let { msg, status, data } = await updateReservoirBaseInfo(this.data.data);
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
        case "skPersonList":
          //管理人员
          this.$refs.skPersonListComponent.$refs.formData.validate(async (valid) => {
            if (valid) {
              if (this.data.type == "add") {
                this.data.data.rolesOptions.forEach((d) => {
                  if (d.value == this.data.data.roleNames) {
                    this.data.data.roleNames = d.label;
                    this.data.data.roleId = d.id;
                    this.data.data.roleIds = d.id;
                  }
                });
                this.data.data.username = this.data.data.mobile;
                this.data.data.reservoirIds = this.data.data.glsk.toString();
                let { msg, status, data } = await addReservoirInscptor(this.data.data);
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
              } else if (this.data.type == "config") {
                this.data.data.reservoirIds = this.data.data.glsk.toString(); //必填

                this.data.data.rolesOptionsPerson.forEach((e) => {
                  if (this.data.data.name == e.value) {
                    this.data.data.roleId = e.roleId;
                  }
                });
                let pam = {
                  roleId: this.data.data.roleId,
                  inscptorId: this.data.data.name,
                  reservoirIds: this.data.data.glsk.toString(),
                };
                console.log(pam, "3-----配置人员");

                let { msg, status, data } = await configReservoirInscptor(pam);
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
                //调用修改接口
              } else if (this.data.type == "update") {
                console.log(this.data.data, "修改");
                let { msg, status, data } = await updateUserDetailInfo(this.data.data);
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
        case "skStandards":
          this.$refs.skStandardsComponent.$refs.formData.validate(async (valid) => {
            if (valid) {
              if (this.data.type == "add") {
                let { msg, status, data } = await addPointLocation(this.data.data);
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
              } else if (this.data.type == "update") {
                console.log(this.data.data, "修改--");
                let { msg, status, data } = await updatePointLocation(this.data.data);
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
      }
    },
    //关闭弹框
    handleClose() {
      this.data.data = {};
      this.$emit("update:dialogVisible", false); //触发 input 事件，并传入新值
    },
  },
  // watch: {
  //   "data.data": {
  //     handler: function(newV, oldV) {
  //       if (this.data.type == "detail") {
  //         this.getDetail(newV.gid);
  //       }
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.dialogCz {
  >>> .el-dialog .el-dialog__body {
    max-height: 7rem !important;
    overflow-y: auto;
  }
  >>> .el-form {
    padding: 0.2rem !important;
  }
  >>> .el-icon-close:before {
    color: white !important;
  }
  >>> .el-form-item__label {
    background: #f4fbf5;
    border-right: 1px solid #dedede;
  }

  >>> .el-form-item {
    margin-bottom: 22px;
    border: 1px solid #dedede;
  }
  >>> .el-input__inner {
    border: 1px solid #fff;
  }
}
</style>
