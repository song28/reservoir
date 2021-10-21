<!--
 * @Author: dang
 * @Date: 2021-08-10 11:32:10
 * @LastEditTime: 2021-09-30 16:30:15
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_gxcloud\src\views\systemManagement\organization\components\addChange.vue
-->
<template>
  <el-dialog
    :title="title"
    :modal="false"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="120px"
      label-position="left"
      style="display: inline-block;margin-top:20px"
    >
      <el-col :span="20">
        <el-form-item label="机构名称" prop="orgname">
          <el-input
            v-model="formData.orgname"
            placeholder="请输入机构名称"
            clearable
            size="mini"
          />
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="组织编码" prop="orgcode">
          <el-input
            v-model="formData.orgcode"
            placeholder="请输入组织编码"
            clearable
            size="mini"
          />
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="机构简称" prop="abbreviation">
          <el-input
            v-model="formData.abbreviation"
            placeholder="请输入机构简称"
            clearable
            size="mini"
          />
        </el-form-item>
      </el-col>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handlerSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {addOrg, updateOrg} from '../api'
export default {
  props: {
    title: {type: String, default: () => '查看详情'},
    type: {type: String, required: true},
    dataPar: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogVisible: {type: Boolean, default: () => false}
  },

  data() {
    return {
      rules: {
        orgname: [
          {required: true, message: '请输入机构名称', trigger: 'blur'}
        ],
        orgcode: [
          {required: true, message: '请输入机构名称', trigger: 'blur'}
        ]
      },
      formData: {
        orgname: '',
        orgcode: '',
        pid: '',
        abbreviation: ''
      }
    }
  },
  watch: {
    dataPar: {
      handler(newV, oldV) {
        if (this.type == 'change') {
          this.formData = JSON.parse(JSON.stringify(newV))
        } else if (this.type == 'addNext') {
          this.formData.pid = newV.pid
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlerSure() {
      if (this.type == 'add' || this.type == 'addNext') {
        this.addOrg()
      } else if (this.type == 'change') {
        this.updateOrg()
      }
    },
    async updateOrg() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          const {data, status, msg} = await updateOrg(this.formData)
          if (status == 200) {
            this.$GXprompt.notify.success(msg)
            this.handleClose()
            this.handlerEmit('sure')
          } else {
            this.$GXprompt.notify.error(msg)
          }
        }
      })
    },
    //   添加
    async addOrg() {
      this.$refs.formData.validate(async valid => {
        if (valid) {
          const {data, status, msg} = await addOrg(this.formData)
          if (status == 200) {
            this.$GXprompt.notify.success(msg)
            this.handleClose()
            this.handlerEmit('sure')
          } else {
            this.$GXprompt.notify.error(msg)
          }
        }
      })
    },
    handleClose() {
      this.formData = {
        orgname: '',
        orgcode: '',
        pid: '',
        abbreviation: ''
      }

      this.$emit('update:dialogVisible', false)
    },
    handlerEmit(type) {
      this.$emit('backDialogData', type)
    }
  }
}
</script>
<style scoped lang='scss'>
.el-icon-close:before {
    content: "\E6DB";
    color: #fff;
}
</style>
