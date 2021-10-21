<template>
  <div class="crud">
    <el-form :inline="true" class="form-serch">
      <div class="search-btn">
        <el-button type="success" icon="el-icon-plus" @click="$emit('add');" size="mini" v-if="showData.add">新建</el-button>
        <el-button type="warning" icon="el-icon-edit-outline" @click="$emit('modification');" size="mini" v-if="showData.modification">修改</el-button>
        <el-button type="danger" icon="el-icon-close" @click="$emit('del');" size="mini" v-if="showData.del">删除</el-button>
        <el-button type="primary" icon="el-icon-folder-opened" @click="$emit('exports');" size="mini" v-if="showData.export">导入</el-button>
        <el-button type="info" icon="el-icon-document" @click="$emit('exports');" size="mini" v-if="showData.importData">导出隐患点基础信息</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "crud",
    props:['showData'],
    data() {
      return {
      }
    },
    methods: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .crud {
    height: 34px;
    display: flex;
    align-items: center;
    .el-form {
      display: flex;
      align-items: center;
      .el-form-item {
        margin: 0px 0.2rem 0 0;
        max-width: max-content;
        .el-form-item__label {
          line-height: 32px;
          padding: 0;
          margin-right: 0.1rem;
          font-weight: 400;
          text-indent: 0 !important;
        }
        .el-form-item__content {
          line-height: 32px;
          .el-input__inner {
            height: 32px;
            max-width: 180px;
          }
          .el-input__icon {
            line-height: 32px;
          }
          .el-date-editor--datetime {
            .el-input__inner {
              max-width: 200px;
            }
          }
          .el-date-editor.el-input, .el-date-editor.el-input__inner {
            max-width: 200px;
          }
        }

      }
      .search-btn {
        margin-right: 0.2rem;
      }
    }

  }
</style>
