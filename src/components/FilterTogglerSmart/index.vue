<template>
  <div class="condition-box">
    <el-form :inline="true" class="demo-form-inline">
      <div :class="{'in-line' : !showMore}" class="line-container">
        <slot name="first-line">

        </slot>
        <slot name="more"></slot>
    
      </div>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "FilterToggler",
    props: {
      hasMore: {
        default: false
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
  .condition-box {
    height: 34px;
    .el-form--inline {
      width: max-content;
      height: 34px;
    }

    .line-container {
      
      flex-direction: row;
      align-items: center;
    }

    .el-form-item {
      margin: 0px 0.2rem 0 0;
      float: left;
      width: max-content;
      display: flex;
      .el-input__inner {
        height: 32px;
        width: 1.6rem;
        min-width: 128px;
      }
      .el-input__inner.el-date-editor--datetimerange{
        width: 4.6rem;
        padding: 3px 5px;

      }
      .el-date-editor .el-range-separator{
        width: 24px;
      }
      .el-form-item__label {
        line-height: 32px;
        padding: 0;
        margin-right: 0.1rem;
        font-weight: 400;
      }
      .el-form-item__content {
        line-height: 32px;
      }
    }

    .pull {
      transform: rotate(90deg);
      margin: 0 0px;
      padding: 10px;
      cursor: pointer;
    }
    .pull-up {
      transform: rotate(270deg);
    }
    .el-form-item__content {
      position: static;
    }
    .el-input {
      position: static;
    }
    .el-select {
      position: static;
    }

    ::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
      height: 0;
    }
  }
</style>
