<template>
  <div class="skListForm">
    <div class="skListForm-left">
      <el-form :model="formData" ref="formData" label-width="140px" :rules="rules">
        <el-row :gutter="20">
          <template v-for="(item, index) in basicDataHeader">
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
            <el-col :span="8" :key="index" v-else>
              <el-form-item
                v-if="item.prop == 'addvcd'"
                label="行政区"
                class="el-form-item-region"
                prop="addvcd"
              >
                <v-region @values="regionChange" type="group" :blank="false" :town="true">
                  <el-input
                    :disabled="disabled"
                    v-model="formData.addvnm"
                    size="small"
                    placeholder="请选择行政区"
                  ></el-input>
                </v-region>
              </el-form-item>
              <el-form-item v-else-if="item.prop == 'prsc'" label="水库规模" prop="prsc">
                <el-select
                  :disabled="disabled"
                  v-model="formData.prsc"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in OptionsSize"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else-if="item.prop == 'prgr'" label="工程等别" prop="prgr">
                <el-select
                  :disabled="disabled"
                  v-model="formData.prgr"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in engineeringLevelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else-if="item.prop == 'prst'" label="工程状态" prop="prst">
                <el-select
                  :disabled="disabled"
                  v-model="formData.prst"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in engineeringStateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'isrg'"
                label="注册等级与否"
                prop="isrg"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.isrg"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isrgOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'blsys'"
                label="归属部门"
                prop="blsys"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.blsys"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in affiliationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'eqmtpkaclt'"
                label="地震动峰值加速度"
                prop="eqmtpkaclt"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.eqmtpkaclt"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in eqmtpkacltOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'bsssin'"
                label="地震基本烈度"
                prop="bsssin"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.bsssin"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in bsssinOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'freqin'"
                label="设防地震烈度"
                prop="freqin"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.freqin"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in freqinOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'mnblgr'"
                label="主要建筑物级别"
                prop="mnblgr"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.mnblgr"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in mnblgrOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'dtpl'"
                :label="item.label"
                :prop="item.prop"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.dtpl"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in dtplOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'ctcd'"
                :label="item.label"
                :prop="item.prop"
              >
                <el-select
                  :disabled="disabled"
                  v-model="formData.ctcd"
                  size="mini"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ctcdOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else-if="item.prop == 'cpyr'" label="建成年份" prop="cpyr">
                <el-date-picker
                  :disabled="disabled"
                  v-model="formData[item.prop]"
                  type="year"
                  placeholder="选择日期"
                  format="yyyy"
                  value-format="yyyy"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'eslg'"
                :label="item.label"
                :prop="item.prop"
              >
                <el-input
                  :disabled="disabled"
                  v-model="formData[item.prop]"
                  :placeholder="'输入' + item.label"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-else-if="item.prop == 'nrlt'"
                :label="item.label"
                :prop="item.prop"
              >
                <el-input
                  :disabled="disabled"
                  v-model="formData[item.prop]"
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
        </el-row>
        <el-row v-if="this.data.type != 'detail'">
          <el-col :span="24" class="text-center">
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="skListForm-btns" v-if="this.data.type != 'detail'">
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
import { getAddvcdTreeList, xcPointUrl, previewUrl } from "@/api/base.js";
import {
  basicDataHeader, //基础信息列表
  engineeringScaleOptions, //工程规模
  engineeringLevelOptions, //工程等别
  engineeringStateOptions, //工程状态
  isrgOptions, //注册等级与否
  affiliationOptions, //归属部门
  eqmtpkacltOptions, //地震动峰值加速度
  bsssinOptions, //地震基本烈度
  freqinOptions, //设防地震烈度
  mnblgrOptions, //主要建筑物级别
  dtplOptions, //水准基面
  ctcdOptions, //流域options
} from "../apiConfig";
import { getRegion } from "@/utils";
import { getBaseInfoById, addRsvrInfo, loadRsvrInfo, updateRsvrInfo } from "../api";

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
      disabled: false,
      basicDataHeader, //基础信息
      engineeringLevelOptions, //工程等别
      engineeringStateOptions, //工程状态
      isrgOptions, //注册等级与否
      mnblgrOptions, //主要建筑物级别
      affiliationOptions, //归属部门
      eqmtpkacltOptions, //地震动峰值加速度
      bsssinOptions, //地震基本烈度
      freqinOptions, //设防地震烈度
      dtplOptions, //水准基面
      ctcdOptions,
      imageAllUrl: "",
      fileList: [],
      options: [],
      OptionsSize: engineeringScaleOptions, //工程规模
      optionsOpen: [],
      value: "",
      formData: {},
      serveUrl: process.env.VUE_APP_BASE_API_6 + "/importSurveyBsin",
      rules: {
        // rscd: [
        //   {
        //     validator(rule, value, callback) {
        //       //校验关联用户名
        //       var reg = /^[0-9a-zA-Z]{11}$/;
        //       if (!reg.test(value)) {
        //         callback(new Error("输入字母或数字且长度为11位"));
        //       } else {
        //         callback();
        //       }
        //     },
        //     required: true,
        //     trigger: "blur",
        //   },
        // ],
        rscd: [
          { required: true, message: "请输入水库编码", trigger: "blur" },
          { max: 11, message: "最大11个字符", trigger: "blur" },
        ],
        rsnm: [
          { required: true, message: "请输入水库名称", trigger: "blur" },
          { max: 40, message: "最大40个字符", trigger: "blur" },
        ],
        alias: [
          { required: true, message: "请输入别名/曾用名", trigger: "blur" },
          { max: 120, message: "最大120个字符", trigger: "blur" },
        ],
        prst: [
          { required: true, message: "请输入工程状态", trigger: "blur" },
          { max: 1, message: "最大1个字符", trigger: "blur" },
        ],
        prsc: [
          { required: true, message: "请选择工程规模", trigger: "change" },
          { max: 1, message: "最大1个字符", trigger: "blur" },
        ],
        prgr: [
          { required: true, message: "请选择工程等别", trigger: "change" },
          { max: 1, message: "最大1个字符", trigger: "blur" },
        ],
        mnblgr: [
          { required: true, message: "请选择主要建筑物级别", trigger: "change" },
          // { max: 1, message: "最大1个字符", trigger: "change" },
        ],
        mnun: [
          { required: false, message: "请输入管理单位", trigger: "blur" },
          { max: 50, message: "最大50个字符", trigger: "blur" },
        ],
        cmun: [
          { required: false, message: "请输入主管单位", trigger: "blur" },
          { max: 50, message: "最大50个字符", trigger: "blur" },
        ],
        blsys: [
          { required: true, message: "请选择归属部门", trigger: "change" },
          { max: 1, message: "最大1个字符", trigger: "change" },
        ],
        ctcd: [
          { required: true, message: "请输入所在流域代码", trigger: "blur" },
          { max: 2, message: "最大2个字符", trigger: "blur" },
        ],
        rvcd: [
          { required: true, message: "请输入所在河流代码", trigger: "blur" },
          { max: 8, message: "最大8个字符", trigger: "blur" },
        ],
        matrl: [{ required: true, message: "请选择类型", trigger: "blur" }],

        eslg: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入经度"));
              } else {
                if (!this.isNumber(value)) {
                  callback(new Error("请输入数字值"));
                } else if (value.length > 10) {
                  callback(new Error("最大长度是10"));
                } else if (value > 999) {
                  callback(new Error("超过最大数"));
                } else {
                  callback();
                }
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
        nrlt: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入纬度"));
              } else {
                if (!this.isNumber(value)) {
                  callback(new Error("请输入数字值"));
                } else if (value.length > 10) {
                  callback(new Error("最大长度是10"));
                } else {
                  callback();
                }
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
        eqmtpkaclt: [
          { required: true, message: "请选择地震动峰值加速度", trigger: "change" },
          { max: 1, message: "最大1个字符", trigger: "change" },
        ],

        bsssin: [
          { required: true, message: "请选择地震基本烈度", trigger: "change" },
          // { type: "number", message: "地震基本烈度必须为数字值" },
          { max: 1, message: "最大1个字符", trigger: "change" },
        ],
        freqin: [
          { required: true, message: "请选择地震基本烈度", trigger: "change" },
          // { type: "number", message: "地震基本烈度必须为数字值" },
          { max: 1, message: "最大1个字符", trigger: "change" },
        ],
        isrg: [
          { required: true, message: "请选择", trigger: "change" },
          // { type: "number", message: "必须为数字值" },
          { max: 1, message: "最大1个字符", trigger: "change" },
        ],
        cpyr: [{ required: true, message: "请选择", trigger: "change" }],

        dtpl: [
          { required: true, message: "请选择水准基面", trigger: "change" },
          { max: 2, message: "最大2个字符", trigger: "change" },
        ],
        addvcd: [{ required: true, message: "请选择行政区", trigger: "change" }],
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
    // 保存
    handleSave() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          let params = this.formData;
          if (this.data.type == "add") {
            this.addRsvrInfoFun(params);
          } else {
            this.updateRsvrInfoFun(params);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    addRsvrInfoFun(params) {
      addRsvrInfo(params).then((res) => {
        if (res.status) {
          this.$notify.success({
            title: "成功",
            message: res.msg,
          });
          this.$emit("on-back", this.formData.rscd);
        } else {
          this.$notify.error({
            title: "失败",
            message: res.msg,
          });
        }
      });
    },
    // 编辑
    updateRsvrInfoFun(params) {
      updateRsvrInfo(params).then((res) => {
        if (res.status) {
          this.$notify.success({
            title: "成功",
            message: res.msg,
          });
        } else {
          this.$notify.error({
            title: "失败",
            message: res.msg,
          });
        }
      });
    },
    // 查询
    async loadRsvrInfo() {
      let params = {
        rscd: this.data.data.rscd ? this.data.data.rscd : this.rscd,
      };
      let { status, obj, msg } = await loadRsvrInfo(params);
      if (status) {
        this.formData = JSON.parse(JSON.stringify(obj));
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
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
        this.loadRsvrInfo();
      } else {
        this.$GXprompt.notify.error(response.msg);
      }
      this.$refs.upload.clearFiles(); //清空文件
    },
  },
  mounted() {
    if (this.data.type != "add" || this.rscd) {
      this.loadRsvrInfo();
    }
    if (this.data.type == "detail") {
      this.disabled = true;
    }
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("xtoken");
      return { "X-Token": token };
    },
  },
  watch: {
    formData: {
      handler: function (newV, oldV) {
        this.$emit("update:data", newV);
      },
      deep: true,
      immediate: true,
    },
    data: {
      handler(val) {
        if (val.type == "detail") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.skListForm {
  height: 100%;
  overflow: auto;
  display: flex;

  .skListForm-left {
    width: calc(100% - 1rem);
    padding-right: 0.2rem;
  }
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
>>> .el-form .el-date-editor .el-input__icon {
  display: none;
}
</style>
