<template>
  <div class="skListForm" v-if="isShow">
    <!-- <div class="tips" v-if="data.type == 'add'">温馨提示：当前处于添加状态！！！</div> -->
    <el-form
      :model="formData"
      ref="formData"
      label-width="200px"
      :rules="rules"
    >
      <el-row :gutter="20" v-if="!noPam">
        <el-col :span="24">
          <el-form-item :label="'工程部位'" prop="posid">
            <el-select
              :disabled="data.type != 'add'"
              v-model="formData.posid"
              size="mini"
              filterable
              placeholder="请选择"
              @change="handleChangePosid"
            >
              <el-option
                v-for="(item, posidindex) in engineeringPartsList"
                :key="posidindex"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="'监测类别'" prop="monittyp">
            <el-select
              :disabled="data.type != 'add'"
              v-model="formData.monittyp"
              size="mini"
              filterable
              placeholder="请选择"
              @change="handleChange"
            >
              <el-option
                v-for="(item, monittypIndex) in monittypOptions"
                :key="monittypIndex"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="'监测项目'" prop="enmnit">
            <el-select
              :disabled="data.type != 'add'"
              v-model="formData.enmnit"
              size="mini"
              filterable
              placeholder="请选择"
              @change="handleChangeEnmnit"
            >
              <el-option
                v-for="(item, i) in projectList"
                :key="i"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <template v-for="(item, index) in siteBasciHeader">
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
            <!-- ststdt 设站日期 -->
            <el-form-item
              v-else-if="item.prop == 'ststdt'"
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
              v-else-if="item.prop == 'mmdt'"
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
      <el-row v-if="!this.disabled">
        <el-col :span="24" class="text-center">
          <el-button type="primary" @click="handleSave" :disabled="btnDisabled"
            >保存</el-button
          >
          <!-- <el-button type="primary" v-if="enmnit != '99'" @click="handleCancel"
            >取消</el-button
          > -->
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
  siteBasciHeader05, //05=渗流压力   监测类别：渗压
  siteBasciHeader0501, //05=渗流压力  监测类别：渗流
  siteBasciHeader11, //11=环境量
  monittypOptions, //监测类型
  workstatusOptions, //工作状态
  sttpOptions, //测站类型
  monitorProjecOptions,
  skListBarTypeOptions,
  devicetypeOptions,
  engineeringPartsOptions,
} from "../apiConfig";
import { getRegion } from "@/utils";
import {
  getBaseInfoById,
  saveRsrDm,
  getRsrDmInfoByRscd,
  saveVRPoint, //01
  saveHMPoint, //02
  savePRPoint, //03
  saveHLPoint, //04
  saveSyParameters,
  getMonitPointDetail,
  getRsrEnmnitList,
  saveRsrSection,
  getRsrPosListByRscd,
  selectByPointIdAndChannel,
  updateSyParameters,
} from "../api";
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
      siteBasciHeader05, //05=渗流压力  监测类别：渗压
      siteBasciHeader0501, //05=渗流压力  监测类别：渗流
      siteBasciHeader11, //11=环境量
      skListBarTypeOptions, //大坝类型
      monittypOptions, //监测类型
      workstatusOptions, //workstatusOptions
      sttpOptions, //测站类型
      devicetypeOptions,
      imageAllUrl: "",
      disabled: false,
      fileList: [],
      options: [],
      projectList: [], //项目列表
      OptionsSize: engineeringScaleOptions, //工程规模
      optionsOpen: [],
      engineeringPartsList: [], //工程部位list
      value: "",
      formData: {
        posid: "",
      },
      enmnit: "",
      noPam: false,
      isShow: true,
      btnDisabled: false,
      rules: {
        posid: [
          { required: true, message: "请选择工程部位", trigger: "change" },
        ],
        monittyp: [
          { required: true, message: "请选择监测类别", trigger: "change" },
        ],
        enmnit: [
          { required: true, message: "请选择监测项目", trigger: "change" },
        ],
        devicesno: [
          { required: true, message: "请输入设备编码", trigger: "blur" },
          { max: 15, message: "最大11个字符", trigger: "blur" },
        ],
        stcd: [{ required: true, message: "请输入测站代码", trigger: "blur" }],
        stnm: [{ required: true, message: "请输入测站名称", trigger: "blur" }],
        mpcd: [{ required: true, message: "请输入测点编码", trigger: "blur" }],
        channel: [{ required: true, message: "请输入通道号", trigger: "blur" }],
        mpname: [
          { required: true, message: "请输入测站名称", trigger: "blur" },
        ],
        devicetype: [
          { required: true, message: "请选择设备类型", trigger: "change" },
        ],
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
        channelType: "",
      },
    };
  },

  methods: {
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/;
      var regNeg =
        /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    // 查询工程部位
    async getRsrPosListByRscd() {
      let pam = {
        rscd: this.data.data.rscd,
      };

      try {
        let { msg, data, status, total } = await getRsrPosListByRscd(pam);
        if (status) {
          data.forEach((d) => {
            engineeringPartsOptions.forEach((ite) => {
              if (d.poscode == ite.value) {
                d.posname = ite.label;
                d.label = ite.label;
                d.value = d.poscode;
              }
            });
          });

          this.engineeringPartsList = data;
        } else {
          this.$notify.success({
            title: "失败",
            message: "网络开小差了！！！",
          });
        }
      } catch (error) {}
    },
    // 保存
    handleSave() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          if (this.formData.monittyp == "3") {
            let a = this.formData.devicesno;
            let b = this.formData.devicesno;
            this.formData.devicesno =
              a.substr(0, a.lastIndexOf("_")) + "_" + this.formData.channel;
            console.log(this.formData.devicesno, "this.formData.devicesno");
          }
          this.formData.rscd = this.data.data.rscd;
          this.btnDisabled = true;
          this.getSaveApi();
          this.btnDisabled = false;
          // this.disabled = true;
          // this.saveVRPoint();
        } else {
          this.$notify.warning({
            title: "温馨提示",
            message: "请将必填项填写完整",
          });
          return false;
        }
      });
    },
    // 取消
    handleCancel() {
      let obj = this.data;
      obj.type = "detail";
      // this.$emit("update:data", obj);
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
        switch (this.formData.enmnit) {
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
      let enmnitid = this.enmnitid;
      let multipleSelection = this.data.data.multipleSelection;
      multipleSelection.forEach((d) => {
        params.push(d.id);
      });

      let { status, obj, msg } = await saveRsrSection(params, enmnitid);
      if (status) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", obj);
        // bus.$emit("form", this.formData);
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
      let { status, obj, msg } = await saveVRPoint(params);
      if (status == 200) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", obj);
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
      let { status, obj, msg } = await saveHMPoint(params);
      if (status == 200) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", obj);
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
      let { status, obj, msg } = await savePRPoint(params);
      if (status == 200) {
        // this.siteBasciHeader05  /syParameters/save   66666
        if (this.formData.monittyp == "3") {
          this.saveSyParameters(obj.id);
        }

        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", obj);
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    async saveSyParameters(id) {
      let params = {
        pId: id,
        tempBenchmark: this.formData.tempBenchmark,
        rsf: this.formData.rsf,
        seepageforceBenchmark: this.formData.seepageforceBenchmark,
        pressureBenchmark: this.formData.pressureBenchmark,
        tempRevise: this.formData.tempRevise,
        channel: this.formData.channel,
        elevation: this.formData.elevation,
      };
      if (this.channelType == "edit") {
        this.updateSyParameters(params);
        return;
      }
      let { status, data, msg } = await saveSyParameters(params);
      if (status) {
      }
    },
    async updateSyParameters(params) {
      let { status, data, msg } = await updateSyParameters(params);
    },
    // 新增/编辑环境量测点信息 11
    async saveHLPoint() {
      let params = this.formData;
      let { status, obj, msg } = await saveHLPoint(params);
      if (status == 200) {
        this.$notify.success({
          title: "成功",
          message: msg,
        });
        this.$emit("on-back", obj);
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
          if (this.formData.monittyp == "2") {
            this.siteBasciHeader = this.siteBasciHeader0501;
          } else {
            this.siteBasciHeader = this.siteBasciHeader05;
          }

          Object.assign(this.formData, this.data.nodeTreeData);
          break;
        case "11":
          this.siteBasciHeader = this.siteBasciHeader11;
          break;
        default:
          this.siteBasciHeader = this.siteBasciHeader01;
      }
    },
    // 监听工程部位变化
    handleChangePosid(val) {
      let self = this;
      // this.formData.posid = val;
      this.$set(this.formData, "monittyp", ""); //监测类别
      this.$set(this.formData, "enmnit", ""); //监测项目
      // this.formData.monittyp = ""; //监测类别
      // this.formData.enmnit = ""; //监测项目
    },
    // 监听监测类别
    handleChange(val) {
      this.monittyp = val;
      this.formData.enmnit = "";
      this.getRsrEnmnitList();
    },
    // 监听监测项目
    handleChangeEnmnit(val) {
      this.projectList.forEach((d) => {
        if (d.enmnit == val) {
          this.$set(this.formData, "enmnitid", d.enmnitid);
        }
      });
      this.enmnit = val;
      this.getTableHeader(val);
    },
    // 查询监测项目
    async getRsrEnmnitList() {
      let params = {
        rscd: this.data.data.rscd, //this.formData.rscd,//00000000061
        poscode: this.formData.posid, //this.data.nodeTreeData.posid,  "01"
        monittyp: this.formData.monittyp, //this.monittyp, "1"
      };
      let list = [];
      let { status, obj, msg } = await getRsrEnmnitList(params);
      if (status) {
        obj.forEach((item) => {
          monitorProjecOptions.forEach((ite) => {
            if (item.enmnit == ite.value && item.enmnit != "99") {
              item.label = ite.label;
              item.value = item.enmnit;
              list.push(item);
            }
          });
        });
        this.projectList = list;
      }
    },
    // 查询测点的详细信息
    async getMonitPointDetail() {
      let params = {
        enmnitcode: this.data.data.enmnit,
        id: this.data.data.id,
      };
      let { status, obj, msg } = await getMonitPointDetail(params);
      if (obj.enmnit == "05") {
        let channel = obj.devicesno.substr(obj.devicesno.lastIndexOf("_") + 1);
        if (obj.monittyp == "3") {
          this.selectByPointIdAndChannel(obj.id, channel);
        }
      }
      console.log(obj.enmnit, "obj.enmnit----000000");
      if (status == 200) {
        if (!obj) {
          this.isShow = false;
        } else {
          this.isShow = true;
          this.formData = obj;
          this.enmnit = this.formData.enmnit;
          this.handleChangeEnmnit(this.enmnit);
        }
        this.formData = obj ? obj : {};
      } else {
      }
    },
    // 查询通道号
    async selectByPointIdAndChannel(id, channel) {
      let params = {
        pId: id,
        channel: channel,
      };
      let { status, data, msg } = await selectByPointIdAndChannel(params);
      if (status) {
        if (!data) {
          this.channelType = "add";
        } else {
          this.channelType = "edit";
          this.$set(this.formData, "tempBenchmark", data.tempBenchmark);
          this.$set(this.formData, "rsf", data.rsf);
          this.$set(
            this.formData,
            "seepageforceBenchmark",
            data.seepageforceBenchmark
          );
          this.$set(this.formData, "pressureBenchmark", data.pressureBenchmark);
          this.$set(this.formData, "tempRevise", data.tempRevise);
          this.$set(this.formData, "channel", data.channel);
          this.$set(this.formData, "elevation", data.elevation);
          // this.formData.tempBenchmark = data.tempBenchmark;
          // this.formData.rsf = data.rsf;
          // this.formData.seepageforceBenchmark = data.seepageforceBenchmark;
          // this.formData.pressureBenchmark = data.pressureBenchmark;
          // this.formData.tempRevise = data.tempRevise;
          // this.formData.channel = data.channel;
          // this.formData.elevation = data.elevation;
          console.log(this.formData, "6666666666666666666666666666666666666");
        }
      }
    },
    // 获取增删改查
    getType(type) {
      console.log(type, "basic909 86t6y756yh");
      switch (type) {
        case "add":
          this.isShow = true;
          this.formData = this.data.nodeTreeData;
          if (!this.formData.posid) {
            this.$notify.warning({
              title: "温馨提示",
              message: "请选择工程部位",
            });
            this.disabled = true;
            return;
          }
          console.log(this.disabled, "this.disabled----add ");
          this.disabled = false;
          break;
        case "update":
          this.isShow = true;
          this.getMonitPointDetail();

          this.disabled = false;
          break;
        case "detail":
          this.getMonitPointDetail();

          this.disabled = true;
          break;

        case "del":
          break;
        default:
          this.getMonitPointDetail();
          this.disabled = true;
      }
    },
  },
  mounted() {
    // this.selectByPointIdAndChannel("44ec9e762d6211ec988c13286256367f", "0");
  },
  watch: {
    data: {
      handler(val) {
        console.log(val, "form-basic");

        if (val.type == "add") {
          this.getRsrPosListByRscd();
        } else {
          this.getMonitPointDetail(); // 查询详细信息;
          this.getRsrPosListByRscd(); // 查询工程部位;

          this.getRsrEnmnitList(); //查询监测项目
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
</style>
