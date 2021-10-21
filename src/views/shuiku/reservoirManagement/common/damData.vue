<template>
  <div class="skListForm">
    <el-form :model="formData" ref="formData" label-width="130px" :rules="rules">
      <el-row :gutter="20">
        <template v-for="(item, index) in damDataHeader">
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
            <el-form-item v-if="item.prop == 'dmtp'" label="坝型" prop="dmtp">
              <el-select
                :disabled="disabled"
                v-model="formData.dmtp"
                size="mini"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in skListBarTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
  damDataHeader, //大坝信息
  skListBarTypeOptions, //大坝类型
} from "../apiConfig";
import { getRegion } from "@/utils";
import { getBaseInfoById, saveRsrDm, getRsrDmInfoByRscd } from "../api";

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
      damDataHeader, //大坝信息
      engineeringLevelOptions, //工程等别
      engineeringStateOptions, //工程状态
      isrgOptions, //注册等级与否
      mnblgrOptions, //主要建筑物级别
      affiliationOptions, //归属部门
      eqmtpkacltOptions, //地震动峰值加速度
      bsssinOptions, //地震基本烈度
      freqinOptions, //设防地震烈度
      skListBarTypeOptions, //大坝类型
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

  mounted() {
    if (this.data.type != "add" || this.rscd) {
      this.getRsrDmInfoByRscd();
    }
    if (this.data.type == "detail") {
      this.disabled = true;
    }

    // this.formData = JSON.parse(JSON.stringify(this.data));
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

          saveRsrDm(params, type).then((res) => {
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
    async getRsrDmInfoByRscd() {
      let params = {
        rscd: this.data.data.rscd ? this.data.data.rscd : this.rscd,
      };
      let { status, obj, msg } = await getRsrDmInfoByRscd(params);
      if (status == 200) {
        this.formData = JSON.parse(JSON.stringify(obj));
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
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
  overflow: hidden;
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
