<template>
  <el-dialog
    title="关联站点"
    :visible.sync="dialogVisible"
    :modal="false"
    append-to-body
    @close="$emit('on-close')"
    width="640px">
    <div class="app-transfer">
      <el-transfer
        style="text-align: left; display: inline-block"
        v-model="selectlist"
        :data="allList"
        filterable
        filter-placeholder="请输入编码或名称"
        :titles="['未选择站点', '已选择站点']"
        :button-texts="['到左边', '到右边']"
      >
      </el-transfer>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('on-close')" size="small">取 消</el-button>
      <el-button type="primary" @click="$emit('on-select',selectlist)" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getSiteList, queryAssociation} from '../api'

  export default {
    props: ['data'],
    data() {
      return {
        dialogVisible: true,
        allList: [],
        selectlist: [],
      }
    },
    methods: {
      //获取表格列表
      queryList() {
        var params = {data: {addvcd: '430181000000'}}
        this.allList = []
        let self = this
        getSiteList(params).then(res => {
          var rs = res.data
          if (rs.length > 0) {
            for (var i in rs) {
              var temp = {}
              temp['key'] = rs[i].cusno
              temp['label'] = rs[i].name
              self.allList.push(temp)
            }
          }
          self.loadReleList()
        })
      },
      loadReleList() {
        // this.data 表格当前点击行的数据
        var params = {data: {}}
        let _this = this
        queryAssociation(params).then(res => {
          if (res.data.length > 0) {
            var rs = res.data
            rs.forEach(item => {
              _this.selectlist.push(item.cusno)
            })
          }
        })
      }
    },
    mounted() {
      this.queryList()
    }
  }
</script>
<style type="text/scss" lang="scss">
  .app-transfer {
    padding: 0.2rem 0;
    .el-transfer-panel {
      flex: 1;
    }
    .el-transfer__buttons {
      display: flex;
      flex-direction: column;
      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }
</style>
