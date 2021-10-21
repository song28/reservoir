<template>
  <div class="dialogCz">
    <el-dialog
      v-if="dialogVisible"
      :title="data.title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="60%"
    >
      <FormVideoConfig
        v-if="data.pageType == 'skVideo' && data.type != 'detail'"
        ref="skStandardsComponent"
        :data.sync="data.data"
      />
      <FormImageConfig
        v-if="data.pageType == 'skImage' && data.type != 'detail'"
        ref="skStandardsComponent"
        :data.sync="data.data"
      />
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if=" data.type != 'delete'"
          type="primary"
          @click="sureSave"
        >确 定</el-button>
        <el-button
          v-if="data.pageType == 'skPersonList' && data.type == 'delete'"
          type="primary"
          @click="jieban"
        >批量解绑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import FormVideoConfig from './formVideoConfig'
import FormImageConfig from './formImageConfig'

import {addPointLocation, update, addVideo} from '../api'
import {
  tbskListHeader,
  tbskPersonListHeader,
  tbskStandards,
  skListBarTypeOptions,
  skListOpenTypeOptions,
  skListSizeTypeOptions
} from '../apiConfig'
import {generateUUID} from '@/utils'

export default {
  components: {
    FormVideoConfig,
    FormImageConfig
  },
  props: {
    data: {
      type: Object
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rows: [],
      src: '',
      detailData: {},
      tbListHeader: {}
    }
  },
  created() {},
  methods: {
    sureSave() {
      switch (this.data.pageType) {
        case 'skVideo': case 'skImage':
          this.$refs.skStandardsComponent.$refs.formData.validate(async valid => {
            if (valid) {
              if (this.data.type == 'add') {
                const {msg, status, data} = await addVideo(this.data.data)
                if (status) {
                  this.$notify.success({
                    title: '成功',
                    message: msg
                  })
                  this.$emit('update:dialogVisible', false)
                  this.$emit('backDialogData', {ifUpdateData: true})
                } else {
                  this.$notify.error({
                    title: '失败',
                    message: msg
                  })
                }
              } else if (this.data.type == 'update') {
                console.log(this.data.data, '修改--')
                const {msg, status, data} = await update(this.data.data)
                if (status) {
                  this.$notify.success({
                    title: '成功',
                    message: msg
                  })
                  this.$emit('update:dialogVisible', false)
                  this.$emit('backDialogData', {ifUpdateData: true})
                } else {
                  this.$notify.error({
                    title: '失败',
                    message: msg
                  })
                }
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
      }
    },
    // 关闭弹框
    handleClose() {
      this.data.data = {}
      this.$emit('update:dialogVisible', false) // 触发 input 事件，并传入新值
    }
  }
  // watch: {
  //   "data.data": {
  //     handler: function(newV, oldV) {
  //       if (this.data.type == "detail") {
  //         this.getDetail(newV.gid);
  //       }
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.dialogCz {
 >>> .el-dialog .el-dialog__body {
  max-height: 7rem !important;
  overflow-y: auto;
 }
 >>> .el-form {
  padding: 0.2rem !important;
 }
 >>> .el-icon-close:before {
  color: white !important;
 }
 >>> .el-form-item__label {
  background: #f4fbf5;
  border-right: 1px solid #dedede;
 }

 >>> .el-form-item {
  margin-bottom: 22px;
  border: 1px solid #dedede;
 }
 >>> .el-input__inner {
  border: 1px solid #fff;
 }
}
</style>
