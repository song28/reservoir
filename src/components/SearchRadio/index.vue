<template>
  <el-radio-group v-model="radio" size="small" :class="{'radio-radius': radius}">
    <el-radio-button :label="0">实时</el-radio-button>
    <el-radio-button :label="1">本周</el-radio-button>
    <el-radio-button :label="2">本月</el-radio-button>
  </el-radio-group>
</template>

<script>
  export default {
    name: "SearchRadio",
    props: {
      radius: {
        default: false
      },
    },
    data() {
      return {
        radio: 0
      }
    },
    watch: {
      radio(val) {
        this.$emit('change', val)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .radio-radius {
    border: 1px solid #DCDCDC;
    border-radius: 16px;
    .el-radio-button__inner {
      font-family: "Microsoft YaHei";
      border-radius: 16px!important;
      padding: 0 22px;
      height: 32px;
      line-height: 32px;
      border-top: 0;
      border-bottom: 0;
      border-left: 1px solid #DCDFE6;
    }
    .el-radio-button:first-child .el-radio-button__inner {
      border: 0;
    }
    .el-radio-button:last-child .el-radio-button__inner {
      border: 0;
    }

  }
</style>
