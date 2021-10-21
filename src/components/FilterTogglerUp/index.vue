<template>
  <div class="filter-toggler-up">
    <el-form :inline="true" class="form-serch">
      <slot name="first-line">

      </slot>
    </el-form>
    <div class="search-btn">
      <el-button type="primary" @click="$emit('reset');" size="mini" v-if="hasReset" icon="el-icon-refresh" plain>重置
      </el-button>
      <el-button type="primary" @click="$emit('query');" size="mini" icon="el-icon-search">查询</el-button>
      <!-- <el-button type="primary" @click="$emit('export');" size="mini" v-if="hasExport" icon="el-icon-download">导出 -->
      </el-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: "FilterTogglerUp",
    props: {
      hasMore: {
        default: false
      },
      hasExport: {
        default: true
      },
      hasReset: {
        default: true
      }
    },
    data() {
      return {
        showMore: false
      }
    },
    methods: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .filter-toggler-up {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.14rem 0 0;
    .el-form {
      display: flex;
      align-items: center;
      margin-bottom: 0.14rem;
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
              max-width: 300px;
            }
          }
          .el-date-editor.el-input, .el-date-editor.el-input__inner {
            max-width: 300px;
          }
        }

      }
      .search-btn {
        margin-left: 0.2rem;
      }
    }
    .search-btn {
      width: 100%;
      padding-top: 0.14rem;
      border-top: 1px solid #E5E5E5;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
