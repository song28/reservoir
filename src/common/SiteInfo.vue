<template>
  <el-dialog
    :title="dialogTitle + '- 站点详情'"
    :modal="false"
    :visible.sync="dialogVisible"
    custom-class="base-siteInfo"
    @close="$emit('on-close')"
    width="76%">
    
    <div class="dialog-tab-title">
      <span :class="{'active': clickType == item.type}" v-for="(item,index) in tabList"
            :key="index" @click="clickType = item.type">{{item.name}}</span>
    </div>
     
    <div class="dialog-tab-content">
      
      <component v-if="clickType" :is="'site-' + clickType" :device="data"></component>
    </div>
    
  </el-dialog>
</template>

<script>
  export default {
    props: ['data'],
    data() {
      return {
        dialogVisible: true,
        dialogTitle: null,
        tabList: [
          {
            type: 'monitoring',
            name: '监测信息'
          },
          {
            type: 'basic',
            name: '基本信息'
          },
          {
            type: 'warning',
            name: '预警信息'
          },
          {
            type: 'image',
            name: '历史图像'
          }

        ],
        clickType: 'monitoring'
      }
    },
    created() {
      // id:站点ID  name:站点名称
      this.dialogTitle = this.data.name
    },
  }
</script>

<style scope lang="scss" rel="stylesheet/scss" type="text/scss">
  @import "~@/styles/variables.scss";

  .base-siteInfo {
    .dialog-tab-title {
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        border: 1px solid $defaultColor;
        color: $defaultColor;
        flex: 1;
        height: 36px;
        line-height: 36px;
        text-align: center;
        margin-right: 4px;
        cursor: pointer;
      }
      span.active {
        color: #fff;
        background-color: $defaultColor;
      }
      span:last-child {
        margin-right: 0;
      }
    }
    .dialog-tab-content {
      height: 7rem;
      max-height: 7rem;
      min-height: 500px;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .base-siteInfo {
  }
</style>
