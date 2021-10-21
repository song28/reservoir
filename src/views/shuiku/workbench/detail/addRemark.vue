<!--
 * @Author: dang
 * @Date: 2021-05-16 18:46:44
 * @LastEditTime: 2021-05-16 20:20:59
 * @LastEditors: Do not edit
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\workbench\detail\addRemark.vue
-->

<template>
  <el-dialog :title="data.title"
             :visible.sync="dialogReVisible"
             :before-close="handleClose"
             :close-on-click-modal="false"
             width="60%">
    <div class="spection-wrapper">
      <el-row>
        <el-col :span="2"
                style="padding-top:0.05rem">
          <label for="批注">
            批注
          </label>
        </el-col>
        <el-col :span="20">
          <el-input label="批注"
                    size="small"
                    clearable
                    v-model="formData.bz"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 6}"
                    placeholder="请填写备注"></el-input>
        </el-col>
      </el-row>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogReVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="handlerSaveRemark">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addRemark, updateRemark } from '../api.js'
import { formatDate } from '@/utils/time.js'
export default {
  props: {
    dialogReVisible: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    data: {
      type: Object,
    },
  },
  watch: {
    data: {
      handler: function (newV, oldV) {
        if (newV.gid) {
          this.formData = JSON.parse(JSON.stringify(this.data))
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return { formData: { bz: '' } }
  },
  methods: {
    //   添加  修改备注
    async handlerSaveRemark() {
      let type = this.data.type
      let params = {
        gid: this.formData.gid,
        remark: this.formData.bz,
        tm: formatDate(this.formData.dayOrMonthValue, '{y}-{m}-{d}'),
        creator: this.$store.state.user.userId,
      }
      let res
      try {
        if (type == 'add') {
          res = await addRemark(params)
        } else if (type == 'update') {
          res = await updateRemark(params)
        }
        if (res.status) {
          console.log(res, 'res')
          this.$emit('update:dialogReVisible', false)
          this.$emit('updateWork')
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    //关闭弹框
    handleClose() {
      this.data.data = {}
      this.handlerpicFlag = false
      this.$emit('update:dialogReVisible', false) //触发 input 事件，并传入新值
    },
  },
}
</script>
<style scoped lang='scss'>
.spection-wrapper {
  padding: 0.2rem;
}
</style>