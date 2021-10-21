<template>
  <div class="skListForm">
    <el-form :model="formData" ref="formData" label-width="160px" :rules="rules">
      <p class="title">
        <span class="titleBar">—————————</span>&nbsp;&nbsp;特征数据&nbsp;&nbsp;
        <span class="titleBar">—————————</span>
      </p>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="正常蓄水位(m)" prop="watLev">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.watLev"
              placeholder="输入主要正常蓄水位(m)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设计洪水位(m)" prop="deLev">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.deLev"
              placeholder="输入设计洪水位(m)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="校核洪水位(m)" prop="chLev">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.chLev"
              placeholder="输入校核洪水位(m)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="总库容(万m³)" prop="vol">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.vol"
              placeholder="输入总库容(万m³)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="死库容(万m³)" prop="deadCap">
            <el-input
              :disabled="ifdis"
              v-model="formData.deadCap"
              placeholder="死库容(万m³)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="正常库容(万m³)" prop="normPoolStagCap">
            <el-input
              :disabled="ifdis"
              v-model="formData.normPoolStagCap"
              placeholder="输入主要正常库容(万m³)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="设计库容(万m³)" prop="deCap">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.deCap"
              placeholder="输入设计库容(万m³)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="校核库容(万m³)" prop="chCap">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.chCap"
              placeholder="输入校核库容(万m³)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="死水位(m)" prop="elev">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.elev"
              placeholder="输入死水位"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="title">
        <span class="titleBar">—————————</span>&nbsp;&nbsp;责任人员&nbsp;&nbsp;
        <span class="titleBar">—————————</span>
      </p>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="管理单位责任人" prop="danwei">
            <el-input
              :disabled="ifdis"
              v-model="formData.danwei"
              placeholder="输入管理单位责任人"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="管理单位责任人电话" prop="dwmobile">
            <el-input
              :disabled="ifdis"
              v-model="formData.dwmobile"
              placeholder="输入管理单位责任人电话"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="管理单位责任人职务" prop="dwduty">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.dwduty"
              placeholder="输入管理单位责任人职务"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="管理单位责任人单位" prop="dwunit">
            <el-input
              :disabled="ifdis"
              v-model="formData.dwunit"
              placeholder="输入管理单位责任人单位"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技术责任人" prop="jishu">
            <el-input
              :disabled="ifdis"
              v-model="formData.jishu"
              placeholder="输入技术责任人"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技术责任人电话" prop="jsmobile">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.jsmobile"
              placeholder="输入技术责任人电话"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="技术责任人职务" prop="jsduty">
            <el-input
              :disabled="ifdis"
              v-model="formData.jsduty"
              placeholder="输入技术责任人职务"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技术责任人单位" prop="jsunit">
            <el-input
              :disabled="ifdis"
              v-model="formData.jsunit"
              placeholder="输入技术责任人单位"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政责任人" prop="xingzheng">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.xingzheng"
              placeholder="输入行政责任人"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="行政责任人电话" prop="xzmobile">
            <el-input
              :disabled="ifdis"
              v-model="formData.xzmobile"
              placeholder="输入行政责任人电话"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政责任人职务" prop="xzduty">
            <el-input
              :disabled="ifdis"
              v-model="formData.xzduty"
              placeholder="输入行政责任人职务"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政责任人单位" prop="xzunit">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.xzunit"
              placeholder="输入行政责任人单位"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="巡查责任人" prop="xuncha">
            <el-input
              :disabled="ifdis"
              v-model="formData.xuncha"
              placeholder="输入巡查责任人"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="巡查电话" prop="xcmobile">
            <el-input
              :disabled="ifdis"
              v-model="formData.xcmobile"
              placeholder="输入巡查电话"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="title">
        <span class="titleBar">—————————</span>&nbsp;&nbsp;基本信息&nbsp;&nbsp;
        <span class="titleBar">—————————</span>
      </p>
      <el-row :gutter="20">
        <el-col :span="8" v-if="!ifdis">
          <el-form-item label="水库编码" prop="code">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.code"
              placeholder="输入水库编码"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <template v-if="ifdis">
          <el-col :span="12">
            <el-form-item label="水库名称" prop="name">
              <el-input
                :disabled="ifdis"
                v-model="formData.name"
                placeholder="输入水库名称"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="坝型" prop="matrl">
              <el-select
                :disabled="ifdis"
                v-model="formData.matrl"
                size="mini"
                filterable
                placeholder="请选择坝型"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="8">
            <el-form-item label="水库名称" prop="name">
              <el-input
                :disabled="ifdis"
                v-model="formData.name"
                placeholder="输入水库名称"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="坝型" prop="matrl">
              <el-select
                :disabled="ifdis"
                v-model="formData.matrl"
                size="mini"
                filterable
                placeholder="请选择坝型"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="最大坝高(m)" prop="height">
            <el-input
              :disabled="ifdis"
              style="margin-left: 0px"
              v-model="formData.height"
              placeholder="最大坝高(m)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经度" prop="lng">
            <el-input
              :disabled="ifdis"
              v-model="formData.lng"
              placeholder="输入经度"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纬度" prop="lat">
            <el-input
              :disabled="ifdis"
              v-model="formData.lat"
              placeholder="输入纬度"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="水库规模" prop="tegr">
            <el-select
              :disabled="ifdis"
              v-model="formData.tegr"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in OptionsSize"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="管理单位" prop="adag">
            <el-input
              :disabled="ifdis"
              v-model="formData.adag"
              placeholder="输入管理单位"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="osid">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.osid"
              placeholder="输入联系电话"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="控制集雨面积(km²)" prop="watShedArea">
            <el-input
              :disabled="ifdis"
              v-model="formData.watShedArea"
              placeholder="输入控制集雨面积(km²)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="坝顶宽(m)" prop="kdLength">
            <el-input
              :disabled="ifdis"
              v-model="formData.kdLength"
              placeholder="请输入坝顶宽(m)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保护耕地(万亩)" prop="deIrar">
            <el-input
              :disabled="ifdis"
              v-model.number="formData.deIrar"
              placeholder="输入保护耕地(万亩)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="保护人口(人)" prop="mpob">
            <el-input
              :disabled="ifdis"
              v-model="formData.mpob"
              placeholder="请输入保护人口(人)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="溢洪道型式(m)" prop="nsType">
            <el-select
              :disabled="ifdis"
              v-model="formData.nsType"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsOpen"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

            <!-- <el-input
              v-model="formData.nsType"
              placeholder="输入溢洪道型式(m)"
              size="mini"
      ></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="坝顶轴长(m)" prop="benResCap">
            <el-input
              :disabled="ifdis"
              v-model="formData.benResCap"
              placeholder="请输入坝顶轴长(m)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="坝顶高程(m)" prop="dacrElev">
            <el-input
              :disabled="ifdis"
              v-model="formData.dacrElev"
              placeholder="输入坝顶高程(m)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="行政区" class="el-form-item-region" prop="town">
            <v-region @values="regionChange" type="group" :blank="false" :town="true">
              <el-input
                :disabled="ifdis"
                v-model="formData.town"
                size="small"
                placeholder="请选择行政区"
              ></el-input>
            </v-region>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- <el-col :span="8">
          <el-form-item label="挡水主坝类型" prop="kdStrType">
            <el-input
              v-model="formData.kdStrType"
              placeholder="输入挡水主坝类型"
              size="mini"
            ></el-input>
          </el-form-item>
    </el-col>-->
      </el-row>
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="行政区" class="el-form-item-region" prop="town">
            <v-region
              @values="regionChange"
              type="group"
              :blank="false"
              :town="true"
            >
              <el-input
                v-model="formData.town"
                size="small"
                placeholder="请选择行政区"
              ></el-input>
            </v-region>
          </el-form-item>
        </el-col>
   </el-row>-->
      <div class="pict" v-if="!ifdis">
        <p class="titleXc">
          上传巡查点位示意图（只能上传1张）。再次上传，之前一张图片将被替换
        </p>
        <el-upload
          :disabled="ifdis"
          :action="imageAllUrl"
          :file-list="fileList"
          list-type="picture-card"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getAddvcdTreeList, xcPointUrl, previewUrl } from "@/api/base.js";
import {
  skListBarTypeOptions,
  skListOpenTypeOptions,
  skListSizeTypeOptions,
} from "../apiConfig";
import { getRegion } from "@/utils";

import { getBaseInfoById } from "../api";

export default {
  props: {
    ifdis: {
      type: Boolean,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      imageAllUrl: "",
      fileList: [],
      options: [],
      OptionsSize: [],
      optionsOpen: [],
      value: "",
      formData: {},
      rules: {
        tegr: [{ required: true, message: "请选择水库规模", trigger: "blur" }],
        code: [
          {
            validator(rule, value, callback) {
              //校验关联用户名
              var reg = /^[0-9a-zA-Z]{12}$/;
              if (!reg.test(value)) {
                callback(new Error("输入字母或数字且长度为12位"));
              } else {
                callback();
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
        name: [{ required: true, message: "请输入水库名称", trigger: "blur" }],
        matrl: [{ required: true, message: "请选择类型", trigger: "blur" }],
        height: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入坝高"));
              } else {
                if (!this.isNumber(value)) {
                  callback(new Error("请输入数字值"));
                } else {
                  callback();
                }
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
        lat: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入经度"));
              } else {
                if (!this.isNumber(value)) {
                  callback(new Error("请输入数字值"));
                } else {
                  callback();
                }
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
        lng: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入纬度"));
              } else {
                if (!this.isNumber(value)) {
                  callback(new Error("请输入数字值"));
                } else {
                  callback();
                }
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
        town: [{ required: true, message: "请选择行政区", trigger: "blur" }],
      },
    };
  },

  mounted() {
    //调用查看详情接口
    this.fileList = [];
    this.imageAllUrl = xcPointUrl;
    this.options = skListBarTypeOptions;
    this.optionsOpen = skListOpenTypeOptions;
    this.OptionsSize = skListSizeTypeOptions;
    this.formData = JSON.parse(JSON.stringify(this.data));
    if (this.formData.imagePath != null) {
      this.fileList.push({ url: previewUrl + this.formData.imagePath });
    }
    this.showSelct();
  },
  methods: {
    //回显下拉框数据
    showSelct() {
      skListBarTypeOptions.forEach((e) => {
        if (this.formData.matrl == e.value) {
          this.formData.matrl = e.label;
        }
      });
      skListOpenTypeOptions.forEach((e) => {
        if (this.formData.nsType == e.value) {
          this.formData.nsType = e.label;
        }
      });
      skListSizeTypeOptions.forEach((e) => {
        if (this.formData.tegr == e.value) {
          this.formData.tegr = e.label;
        }
      });
    },
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/;
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    beforeUpload(file) {
      console.log(file, "上传前");
    },
    onSuccess(response, file, fileList) {
      this.fileList = [];
      this.fileList.push({ url: previewUrl + response.data });
      this.formData.imagePath = response.data;
    },
    handleRemove(file, fileList) {
      this.formData.imagePath = "";
      console.log(file, fileList);
    },

    //行政区
    regionChange(val) {
      let obj = getRegion(val);
      // this.$set(this.formData, "patroladdvnm", obj.addvnm);
      // this.$set(this.formData, "patroladdvcd", obj.addvcd);
      console.log("--------", val);
      this.$set(this.formData, "city", val.city == null ? "" : val.city.value);
      this.$set(this.formData, "county", val.province == null ? "" : val.province.value);
      this.$set(this.formData, "town", obj.addvnm);
      this.$set(this.formData, "pac", obj.addvcd);
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
</style>
