<template>
  <div class="skListForm">
    <el-form :model="formData" ref="formData" label-width="160px" :rules="rules">
      <el-row :gutter="20">
        <template v-for="(item, index) in monitorProjectHeader">
          <!-- <el-col :span="24" :key="index" v-if="item.prop == 'rsov'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-input
                :disabled="disabled"
                v-model="formData[item.prop]"
                :placeholder="'输入' + item.label"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col
            :span="24"
            :key="index"
            v-if="item.prop != 'posname' && item.prop != 'enmnitName'"
          >
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
              v-else-if="item.prop == 'enmnit'"
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
                  v-for="(item, index) in monitorProjecOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop == 'monittyp'"
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
                  v-for="(item, index) in monittypOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              v-else-if="item.prop == 'dtupdt'"
              label="数据更新日期"
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
      </el-row>
      <el-row v-if="data.type != 'detail'">
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
  monitorProjectHeader, //基础信息列表
  engineeringScaleOptions, //工程规模
  engineeringLevelOptions, //工程等别
  engineeringStateOptions, //工程状态
  isrgOptions, //注册等级与否
  affiliationOptions, //归属部门
  eqmtpkacltOptions, //地震动峰值加速度
  bsssinOptions, //地震基本烈度
  freqinOptions, //设防地震烈度
  mnblgrOptions, //主要建筑物级别
  monitorProjecOptions,
  engineeringPartsOptions,
  monittypOptions,
} from "../apiConfig";
import { getRegion } from "@/utils";
import { getBaseInfoById, saveRsrEnmint } from "../api";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      monitorProjectHeader, //基础信息
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
      monitorProjecOptions,
      disabled: false,
      imageAllUrl: "",
      fileList: [],
      options: [],
      OptionsSize: engineeringScaleOptions, //工程规模
      optionsOpen: [],
      value: "",
      formData: {},
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
        enmnit: [
          { required: true, message: "请选择工情监测项目名称", trigger: "change" },
        ],
        crsc: [{ required: true, message: "请输入监测断面桩号", trigger: "blur" }],
        mpam: [
          { required: true, message: "请输入监测数量 ", trigger: "blur" },
          { type: "number", message: "监测数量必须为数字值", trigger: "blur" },
        ],
        posid: [{ required: true, message: "请选择工程部位", trigger: "change" }],
        monittyp: [{ required: true, message: "请选择监测类型", trigger: "change" }],
      },
    };
  },

  mounted() {
    if (this.data.type == "detail") {
      this.disabled = true;
    }
    this.formData = JSON.parse(JSON.stringify(this.data.data));
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

          saveRsrEnmint(params).then((res) => {
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
          this.$notify.success({
            title: "失败",
            message: "请将必填项填写完整！！！",
          });
          console.log("error submit!!");
          return false;
        }
      });
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
