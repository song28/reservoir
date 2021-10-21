<template>
  <div class="skListForm" v-if="isShow">
    <div class="tips" v-if="data.type == 'add'">温馨提示：当前处于添加状态！！！</div>
    <el-form :model="formData" ref="formData" label-width="170px" :rules="rules">
      <el-row :gutter="20" v-if="!noPam">
        <template v-for="(item, index) in accessoryHeader">
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
          <el-col :span="12" :key="index" v-else>
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
                  v-for="item in monittypOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 下拉选择------------- -->
            <el-form-item
              v-else-if="item.prop == 'workstatus'"
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
                  v-for="item in workstatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop == 'devicetype'"
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
                  v-for="item in devicetypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop == 'sttp'"
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
                  v-for="item in sttpOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 日期-------------------------------------------- -->
            <el-form-item
              v-else-if="item.prop == 'dmdt'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-date-picker
                v-model="formData[item.prop]"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="mini"
                :disabled="disabled"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop == 'wudt'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-date-picker
                v-model="formData[item.prop]"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="mini"
                :disabled="disabled"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop == 'bddt'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-date-picker
                v-model="formData[item.prop]"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                size="mini"
                :disabled="disabled"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              v-else-if="item.prop == 'devicesno'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-input
                :disabled="data.type != 'add'"
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
      <el-row v-if="!this.disabled">
        <el-col :span="24" class="text-center">
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button
            type="primary"
            v-if="data.nodeTreeData.enmnit != '99'"
            @click="handleCancel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getAddvcdTreeList, xcPointUrl, previewUrl } from "@/api/base.js";
import {
  engineeringScaleOptions, //工程规模
  siteBasciHeader01, //01=表面垂直位移
  siteBasciHeader02, //02=表面水平位移
  siteBasciHeader05, //05=渗流压力
  siteBasciHeader11, //11=环境量
  accessoryHeader,
  monittypOptions, //监测类型
  workstatusOptions, //工作状态
  sttpOptions, //测站类型
  monitorProjecOptions,
  skListBarTypeOptions,
  devicetypeOptions,
} from "../../apiConfig";
import { getRegion } from "@/utils";
import {
  getBaseInfoById,
  saveRsrDm,
  getRsrDmInfoByRscd,
  saveVRPoint, //01
  saveHMPoint, //02
  savePRPoint, //03
  saveHLPoint, //04
  getPointAttch,
  getRsrEnmnitList,
  saveRsrSection,
  savePointAttch,
} from "../../api";
import bus from "@/utils/bus";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      siteBasciHeader: siteBasciHeader01,
      siteBasciHeader01, //01=表面垂直位移
      siteBasciHeader02, //02=表面水平位移
      siteBasciHeader05, //05=渗流压力
      siteBasciHeader11, //11=环境量
      skListBarTypeOptions, //大坝类型
      monittypOptions, //监测类型
      workstatusOptions, //workstatusOptions
      sttpOptions, //测站类型
      devicetypeOptions,
      accessoryHeader,
      imageAllUrl: "",
      disabled: false,
      fileList: [],
      options: [],
      projectList: [], //项目列表
      OptionsSize: engineeringScaleOptions, //工程规模
      optionsOpen: [],
      value: "",
      formData: {},
      enmnit: "",
      noPam: false,
      isShow: true,
      rules: {
        monittyp: [{ required: true, message: "请选择监测类别", trigger: "change" }],
        enmnit: [{ required: true, message: "请选择监测项目", trigger: "change" }],
        devicesno: [
          { required: true, message: "请输入设备编码", trigger: "blur" },
          { max: 15, message: "最大11个字符", trigger: "blur" },
        ],
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
            required: false,
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
            required: false,
            trigger: "blur",
          },
        ],
        addvcd: [{ required: false, message: "请选择行政区", trigger: "change" }],
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
      this.$set(this.formData, "city", val.city == null ? "" : val.city.value);
      this.$set(this.formData, "county", val.province == null ? "" : val.province.value);
      this.$set(this.formData, "addvnm", obj.addvnm);
      this.$set(this.formData, "addvcd", obj.addvcd);
    },
    // 保存
    handleSave() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          this.savePointAttch();
        } else {
          this.$notify.warning({
            title: "温馨提示",
            message: "请将必填项填写完整",
          });
          return false;
        }
      });
    },
    async savePointAttch() {
      let subData = this.data.subData;
      let type = this.data.type;
      let params = this.formData;
      if (type == "add") {
        params.pointid = subData.id;
        params.enmnit = subData.enmnit;
        params.posid = subData.posid;
        params.monittyp = subData.monittyp;
        params.enmnitid = subData.enmnitid;
        params.devicesno = subData.devicesno;
      }

      let { status, data, msg } = await savePointAttch(params);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 取消
    handleCancel() {
      let obj = this.data;
      obj.type = "detail";
      this.$emit("update:data", obj);
      this.disabled = true;
    },
    async getRsrDmInfoByRscd() {
      let params = {
        rscd: "1",
      };
      let { status, data, msg } = await getRsrDmInfoByRscd(params);
      if (status) {
        this.formData = data;
        this.enmnit = data.enmnit;
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 保存调用api
    getSaveApi() {
      debugger;
      if (this.noPam) {
        this.saveRsrSection();
      } else {
        switch (this.enmnit) {
          case "01":
            this.saveVRPoint();
            break;
          case "02":
            this.saveHMPoint();
            break;
          case "05":
            this.savePRPoint();

            break;
          case "11":
            this.saveHLPoint();
            break;
          default:
            this.siteBasciHeader = this.siteBasciHeader01;
        }
      }
    },
    // saveRsrSection
    // 保存断面信息
    async saveRsrSection() {
      let params = [];
      let enmnitid = this.data.nodeTreeData.enmnitid;
      let multipleSelection = this.data.data.multipleSelection;
      multipleSelection.forEach((d) => {
        params.push(d.id);
      });

      let { status, data, msg } = await saveRsrSection(params, enmnitid);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", "成功");
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 新增/编辑表面垂直位移测点信息 01
    async saveVRPoint() {
      let params = this.formData;
      let { status, data, msg } = await saveVRPoint(params);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", "成功");
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 新增/编辑表面水平位移测点信息 02
    async saveHMPoint() {
      let params = this.formData;
      let { status, data, msg } = await saveHMPoint(params);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", "成功");
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 新增/编辑渗流压力测点信息 05
    async savePRPoint() {
      let params = this.formData;
      let { status, data, msg } = await savePRPoint(params);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", "成功");
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    // 新增/编辑环境量测点信息 11
    async saveHLPoint() {
      let params = this.formData;
      let { status, data, msg } = await saveHLPoint(params);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", "成功");
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },

    // 获取表格header
    getTableHeader(enmnit) {
      switch (enmnit) {
        case "01":
          this.siteBasciHeader = this.siteBasciHeader01;
          break;
        case "02":
          this.siteBasciHeader = this.siteBasciHeader02;
          break;
        case "05":
          this.siteBasciHeader = this.siteBasciHeader05;

          Object.assign(this.formData, this.data.nodeTreeData);
          break;
        case "11":
          this.siteBasciHeader = this.siteBasciHeader11;
          break;
        default:
          this.siteBasciHeader = this.siteBasciHeader01;
      }
    },
    handleChange(val) {
      this.monittyp = val;
      this.formData.enmnit = "";
      this.getRsrEnmnitList();
    },
    handleChangeEnmnit(val) {
      this.enmnit = val;
      this.getTableHeader(val);
    },
    async getRsrEnmnitList() {
      let params = {
        rscd: this.formData.rscd, //this.formData.rscd,//00000000061
        poscode: this.data.nodeTreeData.posid
          ? this.data.nodeTreeData.posid
          : this.formData.posid, //this.data.nodeTreeData.posid,  "01"
        monittyp: this.monittyp, //this.monittyp, "1"
      };
      let { status, obj, msg } = await getRsrEnmnitList(params);
      if (status) {
        obj.forEach((item) => {
          monitorProjecOptions.forEach((ite) => {
            if (item.enmnit == ite.value) {
              item.label = ite.label;
            }
          });
        });
        this.projectList = obj ? obj : [];
      }
    },
    // 查询测点的详细信息
    async getPointAttch() {
      let params = {
        enmnitcode: this.data.data.enmnit,
        pointid: this.data.data.id,
      };
      let { status, obj, msg } = await getPointAttch(params);
      if (status) {
        if (!obj) {
          this.isShow = true;
        } else {
          this.isShow = true;
          this.formData = obj;
          this.enmnit = this.formData.enmnit;
        }
        // this.formData = obj ? obj : {};
      } else {
      }
    },
    // 获取增删改查
    getType(type) {
      switch (type) {
        case "detail":
          this.getPointAttch();

          this.disabled = true;
          break;

        case "del":
          break;
        default:
          this.getPointAttch();
          this.disabled = true;
      }
    },
  },
  mounted() {},
  watch: {
    data: {
      handler(val) {
        if (val.nodeTreeData.enmnit == "99") {
          this.noPam = true;
          this.isShow = true;
          this.disabled = false;
        } else {
          this.noPam = false;
          this.getType(val.type);
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.skListForm {
  height: 100%;
  overflow: auto;
  padding: 0.2rem;
  .tips {
    color: rgb(255, 187, 0);
    text-align: center;
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
}
.text-center {
  text-align: center;
}
>>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

// 表单disabled情况下----背景色是白色，颜色是#333，鼠标滑过  箭头
>>> .el-select .el-input.is-disabled .el-input__inner {
  cursor: auto;
}
>>> .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #dfe4ed;
  color: #333;
  cursor: auto;
}
</style>
