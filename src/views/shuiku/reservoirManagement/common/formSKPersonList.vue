<template>
  <div class="skListPerForm">
    <div style="width:100%;" v-if="ifdis">
      <el-row :gutter="20" style="height:1.6rem">
        <el-col :span="12" style="">
          <el-image
            :z-index="Number(3333)"
            :src="src"
            style="width:auto;height:1.3rem;margin:0.15rem 0 0 2rem"
            fit="contain"
            :preview-src-list="[src]"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <template v-if="formData.trainCertPath != null">
            <span
              style="font-size:20px;font-weight:bold;padding:10px;color:orange;cursor:pointer"
              @click="down(1)"
            >
              证书下载
            </span>
          </template>
          <template v-if="formData.elecContractPath != null">
            <span
              style="font-size:20px;font-weight:bold;padding:10px;color:orange;cursor:pointer"
              @click="down(2)"
            >
              合同下载
            </span>
          </template>
          <div style="text-align:left">
            <p
              style="
              margin:10px
              padding:5px;font-size:16px"
            >
              <template v-if="startValue <= 3">
                星级评定：<span
                  style="
              padding:5px;font-size:22px:color:gray"
                  >{{ startValue }}颗星
                </span>
              </template>
              <template v-else-if="startValue < 4">
                星级评定：<span
                  style="
              padding:5px;font-size:22px;color:orange"
                  >{{ startValue }}颗星
                </span>
              </template>
              <template v-else-if="startValue >= 4">
                星级评定：<span
                  style="
              padding:5px;font-size:22px;color:red"
                  >{{ startValue }} 颗星</span
                >
              </template>
            </p>
            <p
              style="
             padding:5px;"
            >
              <el-rate
                v-model="startValue"
                disabled
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </p>
            <!-- <p
              style="
             padding:5px"
            >
              评价结果：{{ evaluateResults }}
            </p> -->
          </div>
        </el-col>
        <el-col :span="4" style="text-align:right"> </el-col>
      </el-row>
    </div>
    <div class="tb" v-if="ifdis">
      <p style="text-align:center;margin:20px 0px;font-weight:bold">
        巡查次数统计
      </p>

      <div class="tb" style="margin:20px 0px ">
        <el-table
          stripe
          :data="tableData"
          v-loading="tableLoading"
          border
          style="width: 100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
          :max-height="tableHeight"
        >
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <!-- <el-table-column
            label="序号"
            type="index"
            :index="table_index"
            width="50"
            align="center"
            sortable
          ></el-table-column> -->
          <el-table-column
            v-for="(item, index) in tableHeader"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          >
            <template scope="scope">
              <div
                v-if="item.prop == 'reservoirNames'"
                @click="showDetail(scope.row)"
              >
                {{ scope.row[item.prop] }}
              </div>
              <div v-else>
                {{ scope.row[item.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 100, 200, 300, 400]"
          :page-size="query.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination> -->
      </div>
    </div>
    <p style="text-align:center;margin:20px 0px;font-weight:bold" v-if='ifdis'>
      人员基本信息
    </p>
    <el-form
      :model="formData"
      ref="formData"
      label-width="120px"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="人员名称" prop="name">
            <el-select
              v-if="type == 'config'"
              v-model="formData.name"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsperson"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.role }}&nbsp;{{ item.phone }}</span
                >
              </el-option>
            </el-select>
            <el-select
              v-if="type == 'update'"
              :disabled="ifshow"
              v-model="formData.name"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsperson"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.role }}&nbsp;{{ item.phone }}</span
                >
              </el-option>
            </el-select>
            <el-input
              v-if="type == 'add'"
              v-model="formData.name"
              placeholder="人员名称"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="mobile">
            <el-input
              :disabled="ifshow"
              style="margin-left:0px"
              v-model="formData.mobile"
              placeholder="输入联系方式"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="水库关系人" prop="roleNames">
            <el-select
              v-if="type == 'add' || type == 'config'"
              v-model="formData.roleNames"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-if="type == 'update'"
              :disabled="ifshow"
              v-model="formData.roleNames"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            v-if="type == 'config' || type == 'add' || type == 'update'"
            label="行政区"
            class="el-form-item-region"
            prop="addvcd"
          >
            <v-region
              @values="regionChange"
              type="group"
              :blank="false"
              :town="true"
            >
              <el-input
                :disabled="ifdis"
                v-model="formData.addvnm"
                size="small"
                placeholder="请选择行政区"
              ></el-input>
            </v-region>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="type == 'add' || type == 'update'">
        <el-col :span="24">
          <el-form-item label="具体位置" prop="address">
            <el-input
              :disabled="ifdis"
              v-model="formData.address"
              placeholder="请输入具体位置"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="type != 'update'">
        <el-col :span="24">
          <el-form-item label="管理水库" prop="glsk">
            <el-select
              :disabled="true"
              v-model="formData.glsk"
              multiple
              filterable
              allow-create
              default-first-option
              @change="$forceUpdate()"
              placeholder="管理水库"
            >
              <el-option
                v-for="item in skoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <!-- <el-input
              multiple
              v-model="formData.valuesk"
              placeholder="管理水库"
              size="mini"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ------------------------- -->
      <el-row :gutter="20" v-if="type == 'add' || type == 'update'">
        <el-col :span="8">
          <el-form-item label="年龄" prop="age">
            <el-input
              :disabled="ifdis"
              v-model="formData.age"
              placeholder="请输入年龄"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家庭人口数量" prop="familySize">
            <el-input
              :disabled="ifdis"
              style="margin-left:0px"
              v-model="formData.familySize"
              placeholder="输入家庭人口数量"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培训结果" prop="trainResult">
            <el-select
              :disabled="ifdis"
              v-model="formData.trainResult"
              size="mini"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in OptionsPxResults"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="type == 'add' || type == 'update'">
        <el-col :span="12">
          <el-form-item label="紧急联系人" prop="emergencyContact">
            <el-input
              :disabled="ifdis"
              v-model="formData.emergencyContact"
              placeholder="请输入紧急联系人"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急联系人电话" prop="emergencyContactPhone">
            <el-input
              :disabled="ifdis"
              style="margin-left:0px"
              v-model="formData.emergencyContactPhone"
              placeholder="输入紧急联系人电话"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ------------------------- -->

      <el-row :gutter="20" v-if="type == 'add'">
        <el-col :span="24">
          <el-form-item label="备注" prop="userRemark">
            <el-input
              :disabled="ifdis"
              type="textarea"
              :rows="2"
              v-model="formData.userRemark"
              placeholder="请填写备注"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="type == 'update'">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              :disabled="ifdis"
              type="textarea"
              :rows="2"
              v-model="formData.remark"
              placeholder="请填写备注"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- trainCertPath -->
      <el-row
        :gutter="20"
        style="text-align:center"
        v-if="type == 'add' || type == 'update'"
      >
        <el-col :span="10" v-if="!ifdis">
          <div class="pict">
            <p class="titleXc">
              上传本人图片,之前照片将被替换
            </p>
            <el-upload
              :disabled="ifdis"
              :action="imageAllUrl"
              :file-list="fileList0"
              list-type="picture-card"
              :headers="header"
              :on-remove="
                (file, fileList) => {
                  handleRemove(file, fileList0, 0);
                }
              "
              :before-upload="beforeUpload"
              :on-success="onSuccess0"
              accept=".png,.jpeg,.jpg,.JPG,.JPEG"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="7" v-if="!ifdis">
          <div class="pict">
            <p class="titleXc">
              上传培训证书,前证书将被替换
            </p>
            <el-upload
              :disabled="ifdis"
              :action="imageAllUrl"
              :headers="header"
              :file-list="fileList1"
              list-type="picture"
              :on-remove="
                (file, fileList) => {
                  handleRemove(file, fileList1, 1);
                }
              "
              :before-upload="beforeUpload"
              :on-success="onSuccess1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>
        <!-- elecContractPath -->
        <el-col :span="7" v-if="!ifdis">
          <div class="pict">
            <p class="titleXc">
              上传电子合同,前合同将被替换
            </p>
            <el-upload
              :disabled="ifdis"
              :action="imageAllUrl"
              :headers="header"
              :file-list="fileList2"
              list-type="picture"
              :on-remove="
                (file, fileList) => {
                  handleRemove(file, fileList2, 2);
                }
              "
              :before-upload="beforeUpload"
              :on-success="onSuccess2"
              :close="closeD1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getRegion } from "@/utils";
import {
  getAllRoles,
  getAllUserList,
  getUserRoleByUserId,
  getReservoirInspctorByPage,
  userPatrolTJ
} from "../api";

import { pxResultsOptions, tbskPersonListHeaderTJ } from "../apiConfig";
import { xcPointUrl, previewUrl, previewFileUrl } from "@/api/base.js";

export default {
  props: {
    data: {
      type: Object
    },
    type: {
      type: String
    },
    ifdis: {
      type: Boolean
    }
  },
  data() {
    return {
      tableHeight: "300px",
      tableData: [],
      tableHeader: [],
      src: "",
      dialogImageUrl: "",
      dialogVisible1: false,
      fileList0: [],
      fileList1: [],
      fileList2: [],
      imageAllUrl: "",
      ifshow: false,
      value: "",
      OptionsPxResults: [],
      optionsperson: [],
      skoptions: [],
      options: [
        // {
        //   label: "巡查员",
        //   value: "0"
        // },
        // {
        //   label: "技术专员",
        //   value: "1"
        // },
        // {
        //   label: "巡查责任人",
        //   value: "2"
        // },
        // {
        //   label: "技术责任人",
        //   value: "3"
        // },
        // {
        //   label: "行政责任人",
        //   value: "4"
        // }
      ],
      formData: {},
      rules: {
        name: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        roleNames: [
          { required: true, message: "请选择水库关系人", trigger: "blur" }
        ],
        reservoirNames: [
          {
            required: true,
            message: "请在水库列表选择管理水库",
            trigger: "blur"
          }
        ]
      },
      startValue: 5,
      evaluate: "良好",
      evaluateResults: "良好",
      tableLoading: true,
      query: {
        keys: "",
        data: {},
        start: 1,
        size: 20
      },
      currentPage: 1,
      total: 0
    };
  },
  created() {
    this.getPerson({});
    this.getRoles({});
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("xtoken");
      return { "X-Token": token };
    },
  },
  mounted() {
    this.OptionsPxResults = pxResultsOptions;
    //获取水库关系人的角色
    this.formData = JSON.parse(JSON.stringify(this.data));
    if (this.formData.start == null) {
      this.startValue = 5;
    } else {
      this.startValue = this.formData.start;
    }
    this.getskPersonlist();
    this.tableHeader = tbskPersonListHeaderTJ;
    this.imageAllUrl = xcPointUrl;
    this.src = this.formData.selfPic;

    pxResultsOptions.forEach(e => {
      if (this.formData.trainResult == e.value) {
        this.formData.trainResult = e.label;
      }
    });
    if (this.formData.selfPic != null) {
      this.fileList0.push({
        url: this.formData.selfPic
      });
    }
    if (this.formData.trainCertPath != null) {
      let arr = this.formData.trainCertPath.split("/");
      this.fileList1.push({
        name: arr[arr.length - 1],
        url: require("@/assets/images/sk/person-zhengshu.png")
      });
    }
    if (this.formData.elecContractPath != null) {
      let arr = this.formData.elecContractPath.split("/");
      this.fileList2.push({
        name: arr[arr.length - 1],
        url: require("@/assets/images/sk/person-hetong.png")
      });
    }
    this.$nextTick(() => {
      if (this.type == "config" || this.type == "update") {
        this.ifshow = true;
      }
    });
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.query.size = val;
      // this.getskPersonlist();
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
      // this.getskPersonlist();
      // console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      // this.selectedTbData = [];
      // console.log(val, "====dett打发打发");
      // this.selectedTbData = val;
    },
    // table_index(index) {
    //   return (this.currentPage - 1) * this.query.size + index + 1;
    // },
    //获得表格数据
    async getskPersonlist() {
      this.tableData = [];
      let pam = { userid: this.formData.inscptorId };
      this.tableLoading = true;
      try {
        let { msg, data, status, total } = await userPatrolTJ(pam);
        if (status) {
          this.tableData = data;
          this.tableLoading = false;
        } else {
          this.$notify.error({
            title: "失败",
            message: msg
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    down(data) {
      if (data == 1) {
        console.log(this.formData.trainCertPath, "====");
        window.open(this.formData.trainCertPath);
      } else {
        window.open(this.formData.elecContractPath);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible1 = true;
    },
    closeD1() {
      this.dialogVisible1 = false;
    },
    beforeUpload(file) {
      console.log(file, "上传前");
    },
    onSuccess0(response, file, fileList) {
      this.fileList0 = [];
      this.fileList0.push({
        url: previewUrl + response.data
      });
      this.formData.selfPic = previewUrl + response.data;
    },
    onSuccess1(response, file, fileList) {
      this.fileList1 = [];
      this.fileList1.push({
        name: file.name,
        url: require("@/assets/images/sk/person-zhengshu.png")
      });
      if (file.raw.type == "image/png") {
        this.formData.trainCertPath = previewUrl + response.data;
      } else {
        this.formData.trainCertPath = previewFileUrl + response.data;
      }
    },
    onSuccess2(response, file, fileList) {
      this.fileList2 = [];
      this.fileList2.push({
        name: file.name,
        url: require("@/assets/images/sk/person-hetong.png")
      });
      if (file.raw.type == "image/png") {
        this.formData.elecContractPath = previewUrl + response.data;
      } else {
        this.formData.elecContractPath = previewFileUrl + response.data;
      }
    },
    handleRemove(file, fileList, index) {
      switch (index) {
        case 0:
          this.formData.selfPic = "";
          this.fileList0 = [];
          break;
        case 1:
          this.formData.trainCertPath = "";
          this.fileList1 = [];
          break;
        case 2:
          this.formData.elecContractPath = "";
          this.fileList2 = [];
          break;
      }
    },
    //获取人员列表
    async getPerson(pam) {
      let { msg, data, status, total } = await getUserRoleByUserId(pam);
      if (status) {
        data.forEach(e => {
          this.optionsperson.push({
            label: e.name,
            value: e.user_id,
            username: e.username,
            phone: e.phone,
            role: e.role_name,
            roleId: e.role_id
          });
        });
        this.formData.rolesOptionsPerson = this.optionsperson;
        console.log(data, "用户列表---");
      } else {
        this.$message({
          message: msg,
          type: "success"
        });
      }
    },
    //获取管理水库
    async getRoles(pam) {
      this.options = [];
      let { msg, data, status, total } = await getAllRoles(pam);
      if (status) {
        data.forEach(e => {
          this.options.push({ label: e.name, value: e.value, id: e.id });
        });
        this.formData.rolesOptions = this.options;
        console.log(data, "角色列表---");
      }
    },
    //行政区
    regionChange(val) {
      let obj = getRegion(val);
      this.$set(this.formData, "addvnm", obj.addvnm);
      this.$set(this.formData, "addvcd", obj.addvcd);
    }
  },
  watch: {
    formData: {
      handler: function(newV, oldV) {
        //获取水库列表获得的水库
        if (newV.sk) {
          this.formData.glsk = [];
          this.skoptions = newV.sk;
          newV.sk.forEach(e => {
            this.formData.glsk.push(e.value);
          });
        }
        //根据选择人员名称回显其联系方式
        if (newV.name) {
          this.optionsperson.forEach(e => {
            if (e.value == newV.name) {
              this.formData.mobile = e.phone;
            }
          });
        }
        this.$emit("update:data", newV);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style  lang='scss' scoped>
.skListPerForm {
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

  .pict {
    padding: 10px 40px;
    text-align: center;

    .titleXc {
      margin: 0px 0px 20px 0px;
    }
  }
  >>> .el-icon-star-on:before {
    content: "\E797";
    font-size: 35px;
  }
  >>> .el-icon-picture-outline:before {
    font-size: 1.3rem;
  }
  // >>> .el-dialog__header {
  //   background: #29958b;
  //   padding: 0.1rem 0.4rem;
  // }
  // >>> .el-dialog .el-dialog__title,
  // .el-dialog .dialog-title {
  //   color: #ffffff !important;
  // }
  // >>> .el-form {
  //   padding-top: 0.2rem;
  // }
  // >>> .el-icon-close:before {
  //   color: white;
  // }
}
</style>
