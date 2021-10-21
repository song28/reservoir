<template>
  <div class="dialogRignt">
    <el-dialog
      :title="data.title"
      :modal-append-to-body="false"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="60%"
    >
      <FormNotice
        v-if="data.pageType == 'notice' && data.type == 'add'"
        :data.sync="data.data"
        ref="noticeComponent"
      ></FormNotice>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addMessage } from "../../api";
import FormNotice from "./formNotice";
export default {
  components: { FormNotice },
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
    return {};
  },
  mounted() {},
  methods: {
    sureSave() {
      switch (this.data.pageType) {
        case "notice":
          this.$refs.noticeComponent.$refs.formData.validate(async valid => {
            if (valid) {
              if (this.data.type == "add") {
                let { status, msg, data } = await addMessage(this.data.data);
                if (status) {
                  this.$notify.success({
                    title: "成功",
                    message: msg
                  });
                  this.$emit("update:dialogVisible", false);
                  this.$emit("backDialogData", true );
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: msg
                  });
                }
              }
            } else {
              console.log("error submit!!");
              return false;
            }
          });
          break;
      }
    },
    //关闭弹框
    handleClose() {
      this.data.data = {};
      this.$emit("update:dialogVisible", false); 
    }
  }
};
</script>

<style  lang='scss' scoped>
.dialogRignt {
  >>> .el-form {
    padding-top: 0.2rem !important;
  }
  >>> .el-icon-close:before {
    color: white !important;
  }
  .detail {
    margin: 20px 0px;
  }
}
</style>