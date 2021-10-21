<template>
  <div class="info">
    <!-- 模板 查询，添加，导入，导出，模板下载 -->
    <el-row :gutter="2" class="search" v-if="data.model == 1">
      <el-col :span="4" v-if="data.query">
        <p style="line-height: 30px">
          {{ data.titleInput }}
        </p></el-col
      >
      <el-col :span="6" v-if="data.query"
        ><el-input placeholder="请输入查询内容" v-model="input" clearable size="mini">
        </el-input>
      </el-col>
      <el-col :span="3" v-if="data.query">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="clickBtn('query')"
          >查询</el-button
        >
      </el-col>
      <el-col :span="3" :offset="1" v-if="data.add">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="clickBtn('add')"
          >添加</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.config">
        <el-button class="table-btn-border green">配置</el-button>
      </el-col>
      <el-col :span="3" v-if="data.import">
        <el-upload
          :with-credentials="true"
          :headers="header"
          ref="upload"
          class="upload-demo"
          :action="uploadUrl"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :show-file-list="false"
        >
          <el-button size="mini" type="primary" icon="el-icon-upload2">导入</el-button>
        </el-upload>
      </el-col>
      <el-col :span="3" v-if="data.importExcel">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-download"
          @click="clickBtn('importExcel')"
          >导出</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.importExcelDemo">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-download"
          @click="clickBtn('importExcelDemo')"
          >模板下载</el-button
        >
      </el-col>
    </el-row>
    <!-- 配置 -->
    <el-row :gutter="2" class="searchConfig" v-if="data.model == 2">
      <el-col :span="2" v-if="data.query">
        <p style="line-height: 30px">
          {{ data.titleInput }}
        </p></el-col
      >
      <el-col :span="4" v-if="data.query" :style="'width:' + data.width"
        ><el-input :placeholder="data.conInput" v-model="input" clearable size="mini">
        </el-input>
      </el-col>
      <el-col :span="3" v-if="data.query">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="clickBtn('query')"
          >查询</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.add" :offset="1">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="clickBtn('add')"
          >添加</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.update" :offset="0">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="clickBtn('update')"
          >编辑</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.config">
        <el-button
          size="mini"
          icon="el-icon-setting"
          class="btn-table-border blue"
          style="cursor: pointer"
          type="primary"
          @click="clickBtn('config')"
          >配置</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.import">
        <template v-if="data.importType">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-upload2"
            @click="clickImport"
            >导入</el-button
          >
        </template>
        <template v-else>
          <el-upload
            :with-credentials="true"
            :headers="header"
            ref="upload"
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
          >
            <el-button size="mini" type="primary" icon="el-icon-upload2">导入</el-button>
          </el-upload>
        </template>
      </el-col>
      <el-col :span="3" v-if="data.importExcel">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-download"
          @click="clickBtn('importExcel')"
          >导出</el-button
        >
      </el-col>
      <el-col :span="2" v-if="data.importExcelDemo">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-download"
          @click="clickBtn('importExcelDemo')"
          >模板下载</el-button
        >
      </el-col>
      <el-col :span="2" v-if="data.del">
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="clickBtn('del')"
          >删除</el-button
        >
      </el-col>
    </el-row>
    <!-- 配置 -->
    <el-row :gutter="2" class="searchConfig" v-if="data.model == 3">
      <el-col :span="3" v-if="data.add" :offset="0">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="clickBtn('add')"
          >添加</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.update" :offset="0">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="clickBtn('update')"
          >编辑</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.config">
        <el-button
          size="mini"
          icon="el-icon-setting"
          class="btn-table-border blue"
          style="cursor: pointer"
          type="primary"
          @click="clickBtn('config')"
          >配置</el-button
        >
      </el-col>
      <el-col :span="3" v-if="data.import">
        <template v-if="data.importType">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-upload2"
            @click="clickImport"
            >导入</el-button
          >
        </template>
        <template v-else>
          <el-upload
            :with-credentials="true"
            :headers="header"
            ref="upload"
            class="upload-demo"
            :action="uploadUrl"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
          >
            <el-button size="mini" type="primary" icon="el-icon-upload2">导入</el-button>
          </el-upload>
        </template>
      </el-col>
      <el-col :span="3" v-if="data.importExcel">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-download"
          @click="clickBtn('importExcel')"
          >导出</el-button
        >
      </el-col>
      <el-col :span="2" v-if="data.importExcelDemo">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-download"
          @click="clickBtn('importExcelDemo')"
          >模板下载</el-button
        >
      </el-col>
      <el-col :span="2" v-if="data.del">
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="clickBtn('del')"
          >删除</el-button
        >
      </el-col>
    </el-row>
    <el-dialog
      title="请选择导入的类型"
      :visible.sync="dialogTableVisible"
      @close="closeDialog"
    >
      <div style="margin: 40px 20px">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card
              :class="cur == true ? 'choose' : 'nochoose'"
              shadow="hover"
              @click.native="clickBtnSkImportType('水库基本信息', 1)"
            >
              基本信息
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card
              :class="cur1 == true ? 'choose' : 'nochoose'"
              shadow="hover"
              @click.native="clickBtnSkImportType('水库责任人', 2)"
            >
              四个责任人
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card
              :class="cur2 == true ? 'choose' : 'nochoose'"
              shadow="hover"
              @click.native="clickBtnSkImportType('库容曲线', 3)"
            >
              库容曲线
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="24" style="margin-top: 20px; text-align: right">
            <el-upload
              :with-credentials="true"
              :headers="header"
              ref="upload"
              class="upload-demo"
              :action="uploadUrl"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :data="{ sheetNames: skImportantType }"
            >
              <el-button size="mini" type="skbtn" icon="el-icon-upload2">导入</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { imporData, BASE_API_6 } from "@/api/base.js";

/**
 * props
 * data={
 *      model: 2,              //1 查询，添加，导入，导出，模板下载 ，2 查询
 *      titleInput: "水库名称",
 *      add: true,             添加
 *      config:true            配置
 *      query: true,           查询
 *      import: true,          导入
 *      importExcel: true,     导出
 *      importExcelDemo: true  模板下载
 *      del:true               删除
 * }
 * emit
 * clickBtn
 * {
 *  type: data,           按钮类型
 *  data: this.input      input查询内容
 *  }
 */
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      cur: false,
      cur1: false,
      cur2: false,
      active: 1,
      skImportantType: [],
      dialogTableVisible: false,
      input: "",
      uploadUrl: "http://192.168.1.119:18080/spare/uploadexcel",
      // config: {
      //   "X-Token": sessionStorage.getItem("xtoken"),
      // },
    };
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("xtoken");
      console.log(token, "token");

      return { "X-Token": token };
    },
  },
  
  mounted() {
    this.getUploadUrl(this.data);
  },
  methods: {
    getUploadUrl(data) {
      switch (data.pageType) {
        case "skList":
          this.uploadUrl = BASE_API_6 + "/web/rsvr/imporData";
          break;
        case "skPersonList":
          // this.uploadUrl = "http://192.168.1.131:18082/channel/migration/task/addByExcel";
          this.uploadUrl = BASE_API_6 + "/personnel/importPersonnel";
          break;
        case "skListNew": //水库大坝---水库列表
          this.uploadUrl = data.uploadUrl;
          break;
      }
    },
    clickImport() {
      this.dialogTableVisible = true;
    },
    clickBtnSkImportType(type, value) {
      let arr = [];
      switch (value) {
        case 1:
          this.cur = !this.cur;
          break;
        case 2:
          this.cur1 = !this.cur1;
          break;
        case 3:
          this.cur2 = !this.cur2;
          break;
      }
      if (this.cur) {
        arr.push(type);
      }
      if (this.cur1) {
        arr.push(type);
      }
      if (this.cur2) {
        arr.push(type);
      }
      this.skImportantType = arr.toString();

      console.log(type, "类型===", this.cur, "==", this.skImportantType);
    },
    closeDialog() {
      this.cur = false;
      this.cur1 = false;
      this.cur2 = false;
    },
    add() {},
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
      } else {
        this.$GXprompt.notify.error(response.msg);
      }
      this.$refs.upload.clearFiles(); //清空文件
    },
    clickBtn(data) {
      if (data == "query") {
        this.$emit("clickBtn", { type: data, data: this.input });
      } else {
        this.$emit("clickBtn", { type: data });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.info {
  // >>> .el-button--primary {
  //   color: #fff;
  //   background-color: #29958b;
  //   border-color: #ffffff;
  // }
  >>> .el-card__body {
    font-weight: bold;
    font-size: 20px !important;
    text-align: center !important;
    padding: 60px 10px !important;
  }
  .search {
    text-align: left;
    width: 700px;
  }
  .choose {
    color: #29958bcf;
    border: 1px solid #29958bcf;
  }
  .nochoose {
    color: #2f3a3996;
    border: 1px solid #e6ebf5;
  }
  .searchConfig {
    text-align: left;
    width: 700px;
  }
  >>> .el-icon-close:before {
    color: white;
  }
}
</style>
