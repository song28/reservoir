<!--
 * @Descripttion: 感知设备信息
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-29 18:36:02
 * @LastEditTime: 2021-10-18 14:56:24
-->
<template>
  <div class="siteMain">
    <div class="siteMain-table">
      <siteTable :data="tablechildData" />
    </div>
    <div class="zngztabmain">
      <tabmain :data="comonData" />
    </div>
  </div>
</template>
<script>
import siteTable from '../../reservoirManagement/siteManagement/components/siteTable' // 表格信息
import tabmain from '../../reservoirManagement/siteManagement/components/tabmain' //
export default {
  components: {siteTable, tabmain},
  props: ['data'],
  data() {
    return {
      siteTreedata: {
        // 树列表配置
        type: 1,
        title: '',
        ifShowCheckBox: false,
        ifUpdateData: false,
        ifclickNodeCheck: false,
        rscd: '',
        isRefresh: '00'
      },
      comonData: {
        type: 'detail', // add添加  update修改  detail 查看
        rscd: '',
        data: {},
        nodeTreeData: {},
        isRefresh: ''
      },
      tablechildData: {
        type: '', // add添加  update修改  detail 查看
        rscd: '',
        data: {},
        nodeTreeData: {}
      },
      multipleSelection: []
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val.nodeTreeData.rscd) {
          this.tablechildData = {
            type: '', // add添加  update修改  detail 查看
            rscd: '',
            data: {},
            nodeTreeData: {}
          }
          this.tablechildData.rscd = val.nodeTreeData.rscd
          this.tablechildData.type = val.type
          this.tablechildData.nodeTreeData = val.nodeTreeData
          this.tablechildData.data = val.nodeTreeData
          // this.$nextTick(() => {
          this.comonData = {
            type: 'detail', // add添加  update修改  detail 查看
            rscd: val.nodeTreeData.rscd,
            data: {},
            nodeTreeData: {},
            isRefresh: new Date().getTime()}
          // tableMain的数据
          this.comonData.rscd = val.nodeTreeData.rscd
          this.comonData.nodeTreeData = val.nodeTreeData
          this.comonData.data = val.nodeTreeData
          this.comonData.type = ''
          this.comonData.isRefresh = new Date().getTime()
          // })
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  mounted() {},
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.siteMain {
 width: 100%;
 display: flex;
 justify-content: space-between;
 height: 100%;
 overflow: hidden;
 .siteMain-table {
     height:6rem !important;
     width: 350px;
  >>>.el-table__body-wrapper{
     height:5.6rem !important
 }
 }
 .zngztabmain {
   height:6rem;
   width:100%;

 }
}
</style>
