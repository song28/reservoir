<template>
  <el-tree :data="data" :highlight-current="true" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true"></el-tree>
</template>

<script>
  export default {
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
            label: 'addvnm'
          }
        }
      },
    },
    methods: {
      handleNodeClick(data) {
        this.$emit('click', data)
      }
    }
  }
</script>
