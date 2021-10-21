<template>
  <div class="skListForm">
    <el-form :model="formData" ref="formData" label-width="160px" :rules="rules">
      <el-row :gutter="20" v-for="(item, index) in triggers" :key="index">
        <template>
          <el-col :span="24" :offset="2" v-if="data.enmnit == '99'">
            <span class="orange" v-if="item.level == 3">橙色预警</span>
            <span class="red" v-if="item.level == 4">红色预警</span>
          </el-col>
          <!-- <el-col :span="24" :offset="2" v-if="data.enmnit == '99'">
            <span class="orange" v-if="item.level == 3">橙色预警</span>
            <span class="red" v-if="item.level == 4">红色预警</span>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="设备类型" prop="triggerTag">
              <!-- collapse-tags
              multiple -->
              <el-select
                v-model="item.triggerTag"
                filterable
                placeholder="请选择"
                size="mini"
                :disabled="disabled"
              >
                <el-option
                  v-for="(item, i) in deviceTypeArr"
                  :key="i"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="触发值" prop="triggerValue">
              <el-input
                :disabled="disabled"
                v-model="item.triggerValue"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="计算方式" prop="calculation">
              <el-select
                :disabled="disabled"
                v-model="item.calculation"
                size="mini"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, i) in calculationOptions"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="往前的天数"
              prop="beforeDays"
              v-if="item.calculation != 2"
            >
              <el-input
                :disabled="disabled"
                v-model="item.beforeDays"
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
  // thresholdHeader, //基础信息列表
  engineeringScaleOptions, //工程规模
  engineeringLevelOptions, //工程等别
  engineeringStateOptions, //工程状态
  isrgOptions, //注册等级与否
  affiliationOptions, //归属部门
  eqmtpkacltOptions, //地震动峰值加速度
  bsssinOptions, //地震基本烈度
  freqinOptions, //设防地震烈度
  mnblgrOptions, //主要建筑物级别
  engineeringPartsOptions, // 工程部位----下拉框----
  deviceTypeArr,
  calculationOptions,
  deviceJsonData,
} from "../apiConfig";
import { getRegion } from "@/utils";
import { getBaseInfoById, saveRsrPos, editWarnConf } from "../api";

export default {
  props: {
    data: {
      type: Object,
    },
    dialogVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      thresholdHeader: [{}], //工程信息
      engineeringLevelOptions, //工程等别
      engineeringStateOptions, //工程状态
      engineeringPartsOptions, //工程部位----下拉框---
      isrgOptions, //注册等级与否
      mnblgrOptions, //主要建筑物级别
      affiliationOptions, //归属部门
      eqmtpkacltOptions, //地震动峰值加速度
      bsssinOptions, //地震基本烈度
      freqinOptions, //设防地震烈度
      deviceTypeArr,
      calculationOptions,
      deviceJsonData,
      imageAllUrl: "",
      disabled: false,
      fileList: [],
      options: [],
      OptionsSize: engineeringScaleOptions, //工程规模
      optionsOpen: [],
      value: "",
      formData: {},
      rules: {
        prsc: [{ required: true, message: "请选择工程规模", trigger: "change" }],
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
        rsnm: [{ required: true, message: "请输入水库名称", trigger: "blur" }],
        alias: [{ required: true, message: "请输入别名/曾用名", trigger: "blur" }],
        prst: [{ required: true, message: "请输入工程状态", trigger: "blur" }],
        prgr: [{ required: true, message: "请输入工程等别", trigger: "change" }],
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
        addvcd: [{ required: true, message: "请选择行政区", trigger: "change" }],
      },
      triggers: [
        {
          level: 3,
          operaCharacter: 4, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
          logicalOperator: 2, //1. and 2. or ，3not
          triggerTag: null, //"long【必须】", 触发设备类型
          triggerValue: null, //"double【必须】", 触发值
          beforeDays: null, //"int", 往前的天数
          calculation: null, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
        },
        {
          level: 4,
          operaCharacter: 4, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
          logicalOperator: 2, //1. and 2. or ，3not
          triggerTag: null, //"long【必须】", 触发设备类型
          triggerValue: null, //"double【必须】", 触发值
          beforeDays: null, //"int", 往前的天数
          calculation: null, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
        },
      ], //
    };
  },

  mounted() {
    if (this.data.type == "detail") {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
    let data = JSON.parse(JSON.stringify(this.data.data));
    console.log(data, "data");
    let triggers = [];
    let arr1 = [];
    let arr0 = [];
    let equipmentTypes0 = [];
    let equipmentTypes1 = [];
    let equipmentTypesVals0 = [];
    let equipmentTypesVals1 = [];
    let tagarr0 = [];
    let tagarr1 = [];

    if (this.data.data.iotBizWarnRules && this.data.data.iotBizWarnRules.length > 0) {
      let iotBizWarnRules = this.data.data.iotBizWarnRules;
      let iotBizWarnRuleLevels = iotBizWarnRules[0].iotBizWarnRuleLevels;
      if (
        iotBizWarnRuleLevels[0] &&
        iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].triggerTag
      ) {
        arr0 = BigInt(iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].triggerTag)
          .toString(2)
          .split("")
          .reverse();
        arr0.forEach((ite, i) => {
          if (ite == 1) {
            equipmentTypes0.push(this.deviceJsonData[i]); //设备标识value list
            equipmentTypesVals0.push(i.toString()); //设备标识name list
          }
        });
      }
      if (
        iotBizWarnRuleLevels[1] &&
        iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[1].triggerTag
      ) {
        arr1 = BigInt(iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[1].triggerTag)
          .toString(2)
          .split("")
          .reverse();
        arr1.forEach((ite, i) => {
          if (ite == 1) {
            equipmentTypes1.push(this.deviceJsonData[i]); //设备标识value list
            equipmentTypesVals1.push(i.toString()); //设备标识name list
          }
        });
      }
      if (this.data.enmnit == "99") {
        triggers[0] = {
          level: iotBizWarnRuleLevels[0].triggerLevel,
          operaCharacter:
            iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].operaCharacter, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
          logicalOperator:
            iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].logicalOperator, //1. and 2. or ，3not
          triggerTag: equipmentTypesVals0[0] ? equipmentTypesVals0[0] : null, //iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].triggerTag, //"long【必须】", 触发设备类型
          triggerValue: iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].triggerValue, //"double【必须】", 触发值
          beforeDays: iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].beforeDays, //"int", 往前的天数
          calculation: iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].calculation, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
        };
        triggers[1] = {
          level: iotBizWarnRuleLevels[1].triggerLevel,
          operaCharacter:
            iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[0].operaCharacter, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
          logicalOperator:
            iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[0].logicalOperator, //1. and 2. or ，3not
          triggerTag: equipmentTypesVals1[0] ? equipmentTypesVals1[0] : null, //iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[0].triggerTag, //"long【必须】", 触发设备类型
          triggerValue: iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[0].triggerValue, //"double【必须】", 触发值
          beforeDays: iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[0].beforeDays, //"int", 往前的天数
          calculation: iotBizWarnRuleLevels[1].iotBizWarnRuleTriggers[0].calculation, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
        };
      } else {
        triggers[0] = {
          level: iotBizWarnRuleLevels[0].triggerLevel,
          operaCharacter:
            iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].operaCharacter, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
          logicalOperator:
            iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].logicalOperator, //1. and 2. or ，3not
          triggerTag: equipmentTypesVals0[0] ? equipmentTypesVals0[0] : null, //iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].triggerTag, //"long【必须】", 触发设备类型
          triggerValue: iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].triggerValue, //"double【必须】", 触发值
          beforeDays: iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].beforeDays, //"int", 往前的天数
          calculation: iotBizWarnRuleLevels[0].iotBizWarnRuleTriggers[0].calculation, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
        };
      }
      data.triggers = triggers;
    } else {
      if (this.data.enmnit == "99") {
        triggers = [
          {
            level: 3,
            operaCharacter: 4, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
            logicalOperator: 2, //1. and 2. or ，3not
            triggerTag: null, //"long【必须】", 触发设备类型
            triggerValue: null, //"double【必须】", 触发值
            beforeDays: null, //"int", 往前的天数
            calculation: null, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
          },
          {
            level: 4,
            operaCharacter: 4, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
            logicalOperator: 2, //1. and 2. or ，3not
            triggerTag: null, //"long【必须】", 触发设备类型
            triggerValue: null, //"double【必须】", 触发值
            beforeDays: null, //"int", 往前的天数
            calculation: null, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
          },
        ];
      } else {
        triggers = [
          {
            level: 4,
            operaCharacter: 4, //运算符标识 1.大于2.小于 3.等于，4大于等于，5小于等于
            logicalOperator: 2, //1. and 2. or ，3not
            triggerTag: null, //"long【必须】", 触发设备类型
            triggerValue: null, //"double【必须】", 触发值
            beforeDays: null, //"int", 往前的天数
            calculation: null, //"int", 计算方式 1.一段时间累计，2瞬时，3当前值减去一段时间前的值
          },
        ];
      }

      data.triggers = triggers;
    }
    this.formData = data;
    console.log(this.formData, "this.formData");
    this.triggers = triggers;
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
          console.log(this.formData, "this.formData---8888");
          let params = this.formData;
          params.triggers = [];
          params.triggers = this.triggers;
          console.log(params, "params");
          editWarnConf(params).then((res) => {
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
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.skListForm {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  // overflow: auto;
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
.yellow {
  color: rgb(226, 226, 33);
  font-weight: bolder;
}
.red {
  color: red;
  font-weight: bolder;
}
.orange {
  color: orange;
  font-weight: bolder;
}
</style>
