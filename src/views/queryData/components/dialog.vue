<template>
<div class="dialogStyle">
  <el-dialog
    :title="data.title"
    :visible.sync="data.dialogVisible"
    :modal="false"
    append-to-body
    custom-class="query-custom-dialog"
    @close="$emit('on-close')"
    width="60%">
    <component :device="data.device" 
    :ms="ms"  :is="'site-' + data.name">
      
    </component>
  </el-dialog>
</div>
</template>

<script>
  export default {
    props: ['data','ms'],
  }
</script>
<style type="text/scss" lang="scss" >
  .query-custom-dialog {
    

  }
  .dialogStyle{}
  .site-monitoring{
      box-shadow: none !important;
      -webkit-box-shadow: none !important
    }
    .el-dialog .el-dialog__header {
    background: #29958b;
    color: #fff;
}
.el-dialog .el-dialog__title, .el-dialog .dialog-title {
    color: #fff;
    font-size: 16px;
}
.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
.el-dialog__headerbtn .el-dialog__close:hover {
    color: #999;
}

</style>
