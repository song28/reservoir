<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-27 09:08:52
 * @LastEditTime: 2021-08-27 09:08:52
-->
<template>
  <div class="skList">
    <el-form
      :model="formData"
      ref="formData"
      label-width="140px"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="维护点位" prop="pointName">
            <el-input
              v-model="formData.pointName"
              placeholder="请输入维护点位"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="标准说明" prop="normExplain">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="输入标准说明"
              v-model="formData.normExplain"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      formData: {},
      rules: {
        pointName:[{ required: true, message: "请输入维护点位", trigger: "blur" }],
      }
    };
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.data));
  },
  methods: {},
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