<template>
  <div class="tour">
    <el-form
      :model="formData"
      ref="formData"
      label-width="120px"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="巡查时间" prop="code">
            <el-input
              v-model="formData.code"
              placeholder="选择巡查时间"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="巡检人信息" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="输入巡检人信息(姓名和手机号)"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="操作，上报数量" prop="lng">
            <el-input
              style="margin-left:0px"
              v-model="formData.lng"
              placeholder="输入操作，上报数量"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import { getRegion } from "@/utils";

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      formData: {},
      rules: {}
    };
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.data));
  },
  methods: {},
  watch: {
    data: {
      handler: function(newV, oldV) {
        // console.log(newV, "tb----------");
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style  lang='scss' scoped>
.dialogCz {
  >>> .el-dialog__header {
    background: #29958b;
    padding: 0.1rem 0.4rem;
  }
  >>> .el-dialog .el-dialog__title,
  .el-dialog .dialog-title {
    color: #ffffff !important;
  }
  >>> .el-form {
    padding-top: 0.2rem;
  }
  >>> .el-icon-close:before {
    color: white;
  }
}
</style>