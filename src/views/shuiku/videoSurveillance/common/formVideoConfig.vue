<template>
  <div class="skList">
    <el-form ref="formData" :model="formData" label-width="140px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="站点名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入站点名称" size="mini" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="IP地址" prop="deviceIp">
            <el-input v-model="formData.deviceIp" placeholder="请输入IP地址" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="端口" prop="devicePort">
            <el-input v-model="formData.devicePort" placeholder="请输入端口" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- <el-col :span="8">
          <el-form-item label="站点类别" prop="deviceType">
            <el-select v-model="formData.deviceType" size="mini" filterable placeholder="请选择站点类别">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="用户名" prop="deviceUsername">
            <el-input v-model="formData.deviceUsername" placeholder="请输入用户名" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="devicePassword">
            <el-input v-model="formData.devicePassword" placeholder="请输入密码" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
      <p class="tips">注意：配置外网播放地址后，配置流转服务地址不生效</p>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="外网播放地址" prop="extranetPath">
            <el-input v-model="formData.extranetPath" placeholder="请输入外网播放地址" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转流服务地址" prop="servicePath">
            <el-input v-model="formData.servicePath" placeholder="请输入转流服务地址" size="mini" />
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
         <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="设备国标编号" prop="devicegbno">
            <el-input v-model="formData.devicegbno" placeholder="请输入设备国标编号" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通道国标编号" prop="channelgbno">
            <el-input v-model="formData.channelgbno" placeholder="请输入通道国标编号" size="mini" />
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
        deviceIp: [{required: true, message: '请输入IP地址', trigger: 'blur'}],
        devicePort: [{required: true, message: '请输入端口号', trigger: 'blur'}],
        deviceType: [{required: true, message: '请选择站点类别', trigger: 'blur'}],
        deviceUsername: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        devicePassword: [{required: true, message: '请输入密码', trigger: 'blur'}]

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
    this.formData.deviceType = '1'
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
