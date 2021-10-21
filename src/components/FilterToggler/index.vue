<template>
  <div class="condition-box">
    <el-form :inline="true" class="demo-form-inline">
      <slot name="first-line">

      </slot>
      <div class="search-btn">
        <el-button type="primary" @click="$emit('query');" size="mini" >查询</el-button>
        <el-button type="primary" @click="$emit('reset');" size="mini" v-if="hasReset">重置</el-button>
        <el-button type="primary" @click="$emit('add');" size="mini" v-if="hasAdd">新增</el-button>
        <el-button type="danger" @click="$emit('del');" size="mini" v-if="hasDel">删除</el-button>
        <!-- <el-button type="primary" @click="$emit('export');" size="mini" v-if="hasExport">导出</el-button> -->

      </div>
      <slot name="btnExt"></slot>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "FilterToggler",
    props: {
      hasMore: {
        default: false
      },
      hasExport: {
        default: true
      },
      hasReset: {
        default: true
      },
      hasAdd:{
        default: true
      },
      hasDel:{
        default: false
      },
    },
    data() {
      return {
        showMore: false
      }
    },
    methods: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  .condition-box {
    // margin-top: 10px;
    /* height: 34px; */
    display: flex;
    align-items: center;
    .el-form {
      display: flex;
      /* align-items: center; */
      .el-form-item {
        margin: 0px 0.2rem 0 0;
        max-width: max-content;
        .el-form-item__label {
          /* line-height: 32px; */
          padding: 0;
          margin-right: 0.1rem;
          font-weight: 400;
          text-indent: 0 !important;
        }
        /* .el-form-item__content {
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
        } */

      }
       .search-btn {
        margin-left: 0.2rem;
        // min-width: 15%;
        line-height: 40px;
      } 
    }

  }
  >>>#app .app-container .app-container-search{
    padding: 0 !important;
    line-height: 40px;
    background: #cfe5e1;
    border: 1px solid #DAE3F0;
    padding: 0 15px;
  }
  >>>.el-form--inline>.el-form-item{
    margin: 0 !important;
  }
</style>