<template>
  <el-dialog
    title="报修单"
    :modal="false"
    :visible.sync="dialogVisible"
    custom-class="dialog-maintenanceForm"
    @closed="onClose"
    append-to-body>
    <el-form label-width="100px" :model="formData" label-position="left" class="maintenance-form"
             ref="ruleForm">
      <el-col :span="11">
        <el-form-item label="设备编号" prop="id">
          <el-input v-model="formData.repair.devicecusno" size="small" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item label="设备名称" prop="devicename">
          <el-input v-model="formData.repair.devicename" size="small" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="所属行政区" prop="addvnm">
          <el-input v-model="formData.repair.addvnm" size="small" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item label="报修类型" prop="repairtype">
          <el-select v-model="formData.repair.repairtype" size="small">
            <el-option label="系统预警" value="0"></el-option>
            <el-option label="人工点检" value="1"></el-option>
            <el-option label="人工巡查" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="故障类型" prop="faulttype">
          <el-select v-model="formData.fault.faulttype" size="small">
            <el-option label="工况异常" value="0"></el-option>
            <el-option label="采集信息异常" value="1"></el-option>
            <el-option label="网络数据异常（sim卡到期）" value="2"></el-option>
            <el-option label="部件损坏故障" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item label="故障时间" prop="faultcreatetime">
          <el-date-picker type="datetime" placeholder="选择时间" v-model="formData.fault.faultcreatetime"
                          style="width: 100%;"
                          size="small" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="11">
         <el-form-item label="维修负责人" prop="mendmanagername">
           <el-input v-model="formData.repair.mendmanagername" size="small"></el-input>
         </el-form-item>
       </el-col>-->
      <el-col :span="11">
        <el-form-item label="维修负责人">
          <el-select v-model="formData.repair.mendmanagername" size="small" placeholder="请选择" @change="selectChange">
            <el-option v-for="(k,i) in optionsUser"
                       :key="i"
                       :label="k.name"
                       :value="k.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item label="负责人电话" prop="mendmanagerphone">
          <el-input v-model="formData.repair.mendmanagerphone" size="small"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="故障描述">
          <el-input v-model="formData.fault.faultdescribe" size="small" :rows="2" type="textarea"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="故障照片">
          <upload-file @upload-sucess="uploadSucess" :list="formData.images"></upload-file>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="mb-2">
        <el-button type="primary" size="small" @click="handleSave">保存</el-button>
        <el-button type="primary" size="small" @click="onClose">取消</el-button>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
  import uploadFile from '@/components/Upload'
  import {getPlanAssigUser, saveServiceForm} from '../api'

  export default {
    props: ['item'],
    components: {
      uploadFile
    },
    data() {
      return {
        optionsUser: [],
        dialogVisible: true,
        formData: {
          repair: {
            deviceid: null,
            devicename: null,
            addvnm: null,
            repairtype: null,
            mendmanagername: null,
            mendmanagerphone: null,
            mendmanagerid: null,
            addvcd: null,
            devicecusno: null
          },
          fault: {
            faulttype: null,
            faultcreatetime: null,
            faultdescribe: null,
          },
          images: []
        },
      }
    },
    methods: {
      //获取人员
      getUserList() {
        let self = this
        var params = {
          'data': '维修负责人'
        }
        getPlanAssigUser(params).then(res => {

          self.optionsUser = res.data
        })
      },
      //选择人员
      selectChange(item) {
        let self = this;
        let finedUser = this.optionsUser ? this.optionsUser.filter(d => {
          return d.id == item;

        }) : null;
        if (finedUser && finedUser.length > 0) {

          self.formData.repair.mendmanagername = finedUser[0].name
          self.formData.repair.mendmanagerphone = finedUser[0].phone
          self.formData.repair.mendmanagerid = finedUser[0].id
        }

      },
      onClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      },

      handleSave() {
        saveServiceForm({'data': this.formData}).then(res => {
          if (res.status) {
            this.onClose()
            this.$GXprompt.notify.success('保存成功')
          } else {
            this.$GXprompt.notify.error('保存失败,' + res.msg)
          }
        }).catch(err => {
          this.$GXprompt.notify.error('保存失败')
        })
      },

      // 图片上传成功
      uploadSucess(type, id) {
        if (type) {
          var temp = {'id': id, 'imagetype': '11'}//11：设备故障
          this.formData.images.push(temp)
        } else {
          for (var i = 0; i < this.formData.images.length; i++) {
            if (this.formData.images[i] == id) this.formData.images.splice(i, 1)
          }
        }
      }
    },
    created() {
      let self = this
      self.formData.repair.deviceid = self.item.data.ID || self.item.data.id
      self.formData.repair.devicename = self.item.data.name
      self.formData.repair.addvnm = self.item.data.addvcdName || self.item.data.addvcdname
      self.formData.repair.addvcd = self.item.data.addvcd
      self.formData.repair.devicecusno = self.item.data.cusNo || self.item.data.cusno

      this.getUserList()
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  .el-dialog.dialog-maintenanceForm {
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.3);
    width: 12rem;
    .service-form {
      overflow-y: auto;
      height: 6rem;
      padding: 0.2rem 0.2rem 0.2rem 0;
      .el-form-item__label {
        line-height: 32px;
        font-size: 0.13rem;
        color: #333333;
      }
      .el-form-item__content {
        line-height: 32px;
      }
      .el-input__inner {
        color: #333333;
        border: 1px solid #E5E5E5;
        font-size: 0.13rem;
      }
    }
  }
</style>
