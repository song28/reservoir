<template>
  <div class="skListForm">
    <el-form :model="formData" ref="formData" label-width="180px" :rules="rules">
      <el-row :gutter="20">
        <template v-for="(item, index) in characteristicHeader">
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
            <el-form-item v-else-if="item.prop == 'blsys'" label="归属部门" prop="blsys">
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
            <el-form-item v-else-if="item.prop == 'cpyr'" label="建成年份" prop="cpyr">
              <el-date-picker
                v-model="formData[item.prop]"
                type="date"
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
  characteristicHeader,
} from "../apiConfig";
import { getRegion } from "@/utils";
import { getBaseInfoById, saveRsrHych, getRsrHychInfoByRscd } from "../api";

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
      characteristicHeader, //基础信息
      engineeringLevelOptions, //工程等别
      engineeringStateOptions, //工程状态
      isrgOptions, //注册等级与否
      mnblgrOptions, //主要建筑物级别
      affiliationOptions, //归属部门
      eqmtpkacltOptions, //地震动峰值加速度
      bsssinOptions, //地震基本烈度
      freqinOptions, //设防地震烈度
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
          let type = this.data.type == "add" ? "add" : "upd";
          saveRsrHych(params, type).then((res) => {
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 查询
    async getRsrHychInfoByRscd() {
      let params = {
        rscd: this.data.data.rscd ? this.data.data.rscd : this.rscd,
      };
      let { status, data, msg } = await getRsrHychInfoByRscd(params);
      if (status) {
        this.formData = JSON.parse(JSON.stringify(data));
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
  },
  mounted() {
    if (this.data.type != "add" || this.rscd) {
      this.getRsrHychInfoByRscd();
    }
    if (this.data.type == "detail") {
      this.disabled = true;
    }
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
  overflow-x: hidden;
  overflow-y: auto;
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
}
.text-center {
  text-align: center;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
