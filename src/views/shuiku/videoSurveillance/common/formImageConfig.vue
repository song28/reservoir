<template>
  <div class="skList">
    <el-form ref="formData" :model="formData" label-width="140px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="站点名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入站点名称" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备编码" prop="servicePath">
            <el-input v-model="formData.servicePath" placeholder="请输入设备编码" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="设备下发地址" prop="extranetPath">
            <el-input v-model="formData.extranetPath" placeholder="请输入设备下发地址" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="经度" prop="eslg">
            <el-input v-model="formData.eslg" placeholder="请输入经度" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度" prop="nrlt">
            <el-input v-model="formData.nrlt" placeholder="请输入纬度" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {siteTypeOptions} from '../apiConfig'
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      options: [],
      formData: {},
      rules: {
        name: [{required: true, message: '请输入站点名称', trigger: 'blur'}],
        servicePath: [{required: true, message: '请输入设备编码', trigger: 'blur'}],
        extranetPath: [{required: true, message: '请输入设备下发地址', trigger: 'blur'}],
        eslg: [{required: true, message: '请输入经度', trigger: 'blur'}],
        nrlt: [{required: true, message: '请输入纬度', trigger: 'blur'}]

      }
    }
  },
  watch: {
    data: {
      handler: function(newV, oldV) {
        console.log(newV, '传递过去的data')
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler: function(newV, oldV) {
        this.$emit('update:data', newV)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.options = siteTypeOptions
    this.formData = JSON.parse(JSON.stringify(this.data))
    this.formData.deviceType = '2'
    this.formData.deviceIp = '--'
    this.formData.devicePort = '--'
    this.formData.deviceUsername = '--'
    this.formData.devicePassword = '--'
  },
  methods: {}
}
</script>

<style  lang='scss' scoped>
.dialogCz {
  .tips{
    font-size: 0.16rem;
    text-align: center;
   margin: 0.1rem 0rem;
   color:rgb(255, 173, 20)
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
  padding-top: 0.2rem;
 }
 >>> .el-icon-close:before {
  color: white;
 }
}
</style>
