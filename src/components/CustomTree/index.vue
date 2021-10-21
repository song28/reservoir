<template>
  <div class="custom-tree">
    <div class="tree-header">
      <div class="header-btn" @click="handleAddNode">
        <span> +</span>
        添加
      </div>
      <!--<div class="header-btn" @click="handleAddNode(1)" v-if="isAddChild">-->
        <!--<span> +</span>-->
        <!--添加子集-->
      <!--</div>-->
    </div>
    <div class="tree-body">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true"
               :highlight-current="true" :indent="24" icon-class="el-icon-remove-outline"></el-tree>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CustomTree",
    props: {
      data: {
        required: true,
        type: Array
      },
      defaultProps: {
        type: Object,
        default() {
          return {
            children: 'children',
            label: 'label'
          }
        }
      },
      isAddChild: {
        default: false
      },
    },
    methods: {
      handleNodeClick(data) {
        this.$emit('clickNode', data)
      },

      handleAddNode(val) {
        this.$emit('clickAddNode', val)
      }
    },

  }
</script>

<style scoped type="text/scss" lang="scss">
  .custom-tree {
    height: 100%;
    border: 1px solid rgba(229, 229, 229, 1);
    display: flex;
    flex-direction: column;
    .tree-header {
      height: 0.44rem;
      background: rgba(240, 246, 253, .8);
      padding: 0 0.15rem;
      display: flex;
      align-items: center;
      .header-btn {
        display: flex;
        align-items: center;
        line-height: normal;
        font-size: 12px;
        cursor: pointer;
        margin-right: 0.15rem;
      }
      span {
        border: 1px solid rgba(51, 127, 229, 1);
        margin-right: 5px;
        color: #1493FF;
        border-radius: 2px;
        font-size: 0.12rem;
        width: 0.12rem;
        height: 0.12rem;
        text-align: center;
        line-height: 0.12rem;
      }

    }
    .tree-body {
      flex: 1;
      padding: 0.1rem 0.15rem;
      overflow: auto;
    }

  }
</style>
<style type="text/scss" lang="scss">
  .custom-tree {
    .el-tree {
      .el-tree-node__expand-icon {
        color: #1493FF;
        transform: rotate(0deg) !important;
      }
      .el-tree-node__expand-icon.el-icon-remove-outline:before {
        content: "\e723" !important;
      }
      .el-tree-node__expand-icon.expanded.el-icon-remove-outline:before {
        content: "\e722" !important;
      }
      .is-leaf.el-tree-node__expand-icon.el-icon-remove-outline:before {
        content: '' !important;
      }
    }

  }
</style>
