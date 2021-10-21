<template>
  <div class="skListForm">
    <el-form :model="formData" ref="formData" label-width="160px" :rules="rules">
      <el-row :gutter="20">
        <template v-for="(item, index) in fileHeader">
          <el-col :span="24" :key="index" v-if="item.prop == 'rsov'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-input
                :disabled="disabled"
                v-model="formData[item.prop]"
                :placeholder="'输入' + item.label"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :key="index" v-else>
            <el-form-item v-if="item.prop == 'posid'" label="工程部位" prop="posid">
              <el-select
                :disabled="disabled"
                v-model="formData.posid"
                size="mini"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in engineeringPartsOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="item.prop == 'fltp'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-select
                :disabled="disabled"
                v-model="formData[item.prop]"
                size="mini"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              v-else-if="item.prop == 'dtupdt'"
              :label="item.label"
              prop="dtupdt"
            >
              <el-date-picker
                v-model="formData[item.prop]"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                size="mini"
                :disabled="disabled"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop == 'mpam'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-input
                :disabled="disabled"
                v-model.number="formData[item.prop]"
                :placeholder="'输入' + item.label"
                size="mini"
              ></el-input>
            </el-form-item>

            <el-form-item v-else :label="item.label" :prop="item.prop">
              <el-input
                :disabled="disabled"
                v-model="formData[item.prop]"
                :placeholder="'输入' + item.label"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24">
          <el-form-item :label="'文件上传'">
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
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="text-center">
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getAddvcdTreeList, xcPointUrl, previewUrl } from "@/api/base.js";
import {
  fileHeader, //基础信息列表
  engineeringScaleOptions, //工程规模
  engineeringLevelOptions, //工程等别
  engineeringStateOptions, //工程状态
  isrgOptions, //注册等级与否
  affiliationOptions, //归属部门
  eqmtpkacltOptions, //地震动峰值加速度
  bsssinOptions, //地震基本烈度
  freqinOptions, //设防地震烈度
  mnblgrOptions, //主要建筑物级别
  engineeringPartsOptions,
  monittypOptions,
} from "../apiConfig";
import { getRegion } from "@/utils";
import { getBaseInfoById, saveRsrEnmint, fileTree, fileSave } from "../api";

export default {
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
      fileHeader, //基础信息
      engineeringLevelOptions, //工程等别
      engineeringStateOptions, //工程状态
      engineeringPartsOptions,
      monittypOptions,
      isrgOptions, //注册等级与否
      mnblgrOptions, //主要建筑物级别
      affiliationOptions, //归属部门
      eqmtpkacltOptions, //地震动峰值加速度
      bsssinOptions, //地震基本烈度
      freqinOptions, //设防地震烈度
      typeOptions: [],
      disabled: false,
      imageAllUrl: "",
      fileList: [],
      options: [],
      OptionsSize: engineeringScaleOptions, //工程规模
      optionsOpen: [],
      value: "",
      serveUrl: process.env.VUE_APP_BASE_API_6 + "/upload ",

      formData: {},
      rules: {
        flcd: [{ required: true, message: "请输入文件编码", trigger: "blur" }],
        flnm: [{ required: true, message: "请输入文件名称", trigger: "blur" }],
        fltp: [{ required: true, message: "请选择文件类型 ", trigger: "change" }],
        flpath: [{ required: true, message: "请上传档案资料", trigger: "change" }],
      },
    };
  },

  methods: {
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/;
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    //行政区
    regionChange(val) {
      let obj = getRegion(val);
      // this.$set(this.formData, "patroladdvnm", obj.addvnm);
      // this.$set(this.formData, "patroladdvcd", obj.addvcd);
      console.log("--------", val);
      this.$set(this.formData, "city", val.city == null ? "" : val.city.value);
      this.$set(this.formData, "county", val.province == null ? "" : val.province.value);
      this.$set(this.formData, "addvnm", obj.addvnm);
      this.$set(this.formData, "addvcd", obj.addvcd);
    },
    handleSave() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          let params = this.formData;

          fileSave(params).then((res) => {
            if (res.status) {
              this.$notify.success({
                title: "成功",
                message: res.msg,
              });
              this.$emit("on-back", false);
            } else {
              this.$notify.error({
                title: "失败",
                message: res.msg,
              });
            }
          });
        } else {
          this.$notify.error({
            title: "失败",
            message: "请将必填项填写完整！！！",
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
    async fileTree() {
      let pam = {
        rscd: this.data.data.rscd ? this.data.data.rscd : this.rscd,
      };
      let { msg, status, obj } = await fileTree(pam);
      this.typeOptions = obj;
    },
    beforeUpload(file) {
      //检查是否符合要求
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      const extension3 = testmsg === "docx";
      const extension4 = testmsg === "doc";
      const extension5 = testmsg === "pdf";
      console.log(testmsg, "testmsg");
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
        this.$message.error("只能上传excel、word文件或pdf文件");
        return false;
      }
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList, "导入---");
      if (response.status) {
        this.$emit("clickBtn", { type: "import" });
        this.$GXprompt.notify.success(response.msg);
        this.$set(this.formData, "flpath", response.obj.url);
        // this.formData.flpath = response.obj.url;
      } else {
        this.$GXprompt.notify.error(response.msg);
      }
    },
  },
  created() {
    this.formData.rscd = this.data.data.rscd;
    this.fileTree();
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("xtoken");
      return { "X-Token": token };
    },
  },
  mounted() {},
  watch: {
    formData: {
      handler: function (newV, oldV) {},
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.skListForm {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.2rem 0;
  .title {
    text-align: center;
    color: rgb(255, 187, 0);
    font-weight: bold;
    margin: 0px 0px 10px 0px;
    .titleBar {
      font-weight: bold;
      color: rgb(247, 206, 73);
    }
  }

  >>> .el-dialog__header {
    background: #29958b;
    padding: 0.1rem 0.4rem;
  }
  >>> .el-dialog .el-dialog__title,
  .el-dialog .dialog-title {
    color: #ffffff !important;
  }
  >>> .el-form {
    // padding-top: 0.2rem;
  }
  >>> .el-icon-close:before {
    color: white;
  }
  .pict {
    padding: 20px 40px;
    text-align: center;

    .titleXc {
      margin: 0px 0px 20px 0px;
    }
  }
}
.text-center {
  text-align: center;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
