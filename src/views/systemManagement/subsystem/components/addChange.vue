<!--
 * @Author: dang
 * @Date: 2021-08-10 11:32:10
 * @LastEditTime: 2021-09-01 17:25:03
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_gxcloud\src\views\systemManagement\subsystem\components\addChange.vue
-->
<template>
  <el-dialog
    :title="title"
    :modal="false"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="taskForm"
      :model="formData"
      :rules="rules"
      style="display: inline-block;"
      label-width="120px"
      label-position="left"
    >
      <el-col :span="20">
        <el-form-item label="系统名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入系统名称"
            size="mini"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="系统访问地址" prop="url">
          <el-input
            v-model="formData.url"
            placeholder="请输入系统访问地址"
            size="mini"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="系统标题" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="系统标题"
            size="mini"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="20">
        <el-form-item label="系统logo" prop="logo">
          <upload-file
            :limit="limitNum"
            @upload-sucess="uploadSucess"
            :list="formData.images"
          ></upload-file>
        </el-form-item>
      </el-col>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addSystem, updateSystem } from '../api'
import uploadFile from '@/components/Upload'
export default {
  props: {
    // dialogVisible: { type: Boolean, default: () => false }
  },
  components: {
    uploadFile
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入系统访问地址', trigger: 'blur' }]
      },
      limitNum: 1,
      type: '',
      title: '',
      dialogVisible: false,
      formData: { name: '', title: '', url: '', logo: '', images: [] }
    }
  },
  methods: {
    // 图片上传成功
    uploadSucess(type, id) {
      if (type) {
        var temp = { id: id } //11：设备故障
        this.formData.images.push(temp)
      } else {
        for (var i = 0; i < this.formData.images.length; i++) {
          if (this.formData.images[i] == id) this.formData.images.splice(i, 1)
        }
      }
    },
    handleSave() {
      this.$refs['taskForm'].validate(async valid => {
        if (valid) {
          let data, status, msg
          if (this.formData.images.length > 0) {
            this.formData.logo = this.formData.images[0].id
          }
          if (this.type == 'add') {
            data = await addSystem(this.formData)
          } else if (this.type == 'edit') {
            data = await updateSystem(this.formData)
          }
          if (data.status == 200) {
            this.$GXprompt.notify.success(data.msg)
            this.$refs['taskForm'].resetFields()
            this.handleClose()
            this.handlerEmit()
          } else {
            this.$GXprompt.notify.error(data.msg)
          }
        } else {
          return false
        }
      })
    },
    showEdit(row) {
      if (!row) {
        this.title = '添加子系统'
        this.type = 'add'
      } else {
        this.type = 'edit'
        this.title = '编辑子系统'
        this.formData = Object.assign({}, row)
        this.formData.images = []
        if (row.logo) {
          let obj = { id: row.logo }
          this.formData.images.push(obj)
        }
      }
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
      this.formData = this.$options.data().formData
    },
    handlerEmit() {
      this.$emit('backDialogData')
    }
  }
}
</script>
