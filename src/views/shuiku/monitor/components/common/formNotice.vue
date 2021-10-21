<template>
  <div class="skList">
    <el-form
      :model="formData"
      ref="formData"
      label-width="120px"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="发布标题" prop="title">
            <el-input
              v-model="formData.title"
              placeholder="输入发布标题"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发布内容" prop="content">
            <el-input
              type="textarea"
              style="margin-left:0px"
              v-model="formData.content"
              placeholder="输事件说明"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="是否公开" prop="isopen">
            <el-radio-group v-model="formData.isopen">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="0">不公开</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 添加照片 -->
    <div class="pict">
      <p class="titleXc">
        上传附件
      </p>
      <el-upload
        :action="imageAllUrl"
        :headers="header"
        :file-list="fileList2"
        list-type="picture"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { getRegion } from "@/utils";
import { xcPointUrl, previewUrl, previewFileUrlNotice } from "@/api/base.js";
import { generateUUID } from "@/utils";
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ifdis: false,
      imageAllUrl: "",
      options: [],
      fileList2: [],
      value: "",
      formData: {},
      rules: {
        title: [{ required: true, message: "请输入发布标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入发布内容", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    header() {
      let token = sessionStorage.getItem("xtoken");
      return { "X-Token": token };
    },
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.data));
    let obj = { isopen: 1 };
    this.formData = obj;
    this.imageAllUrl = xcPointUrl;
    if (this.formData.filepath != null) {
      let arr = this.formData.filepath.split("/");
      this.fileList.push({
        name: arr[arr.length - 1],
        url: require("@/assets/images/sk/person-zhengshu.png")
      });
    }
  },
  methods: {
    beforeUpload(file) {
      console.log(file, "上传前");
    },
    onSuccess(response, file, fileList) {
      this.fileList2 = [];
      this.fileList2.push({
        name: file.name,
        url: require("@/assets/images/sk/person-hetong.png")
      });
      if (file.raw.type == "image/png") {
        this.formData.filepath = previewUrl + response.data;
      } else {
        this.formData.filepath = previewFileUrlNotice + response.data;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    }
  },
  watch: {
    formData: {
      handler: function(newV, oldV) {
        this.$emit("update:data", newV);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style  lang='scss' scoped>
.pict {
  padding: 10px 40px;
  text-align: center;
  .titleXc {
    margin: 0px 0px 20px 0px;
  }
}
</style>
