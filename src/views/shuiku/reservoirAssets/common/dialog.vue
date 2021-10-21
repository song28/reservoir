<template>
  <div class="dialogCz">
    <el-dialog
      :title="data.title"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="60%"
    >
      <SkList
        v-if="data.pageType == 'skList'"
        :data="data.data"
        ref="skListComponent"
      ></SkList>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import SkList from "./formSkList";

export default {
  components: { SkList },
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
  methods: {
    sureSave() {
      switch (this.data.pageType) {
        case "skList":
          //水库列表
          this.$refs.skListComponent.$refs.formData.validate(valid => {
            if (valid) {
              if (this.data.type == "add") {
                //调用添加接口
                console.log("1---添加验证通过");
              } else if (this.data.type == "update") {
                //调用修改接口
                console.log("2---修改验证通过");
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
      this.$emit("update:dialogVisible", false); //触发 input 事件，并传入新值
    }
  }
};
</script>

<style  lang='scss' scoped>
.dialogCz {
  >>> .el-form {
    padding-top: 0.2rem !important;
  }
  >>> .el-icon-close:before {
    color: white !important;
  }
}
</style>