<template>
  <el-dialog
    title="关联水库"
    :visible.sync="dialogVisible"
    :modal="false"
    append-to-body
    @close="$emit('on-close')"
    width="640px">
    <div class="app-transfer">
      <div class="list-addvcd">
        <v-region @values="regionChange" type="group" :blank="false">
          <el-input v-model="addvnm" placeholder="请选择行政区" suffix-icon="el-icon-arrow-down" size="small"></el-input>
        </v-region>
      </div>
      <div class="list-body">
      <span v-for="(item,index) in allList" :key="index" @click="selectlist = item"
            :class="{'active': selectlist.code == item.code}">{{item.name}}</span>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('on-close')" size="small">取 消</el-button>
      <el-button type="primary" @click="$emit('on-select',selectlist)" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getReservoirList } from '../api'

  export default {
    props:['list'],
    data() {
      return {
        dialogVisible: true,
        addvcd: null,
        addvnm: null,
        allList: [],
        selectlist: {
          code: null
        }
      }
    },
    created(){
      // 已选择的水库回显
      if(this.list.length){
        let obj = this.list[0]
        if(obj.reservoirId){
          this.selectlist.code = obj.reservoirId
        }
      }
    },
    methods: {
      //获取表格列表
      queryList() {
        let _this = this
        var params = { data: {} }
        getReservoirList(params).then(res => {
          _this.allList = res.data
        })
      },

      //行政区选择
      regionChange(data) {
        let obj = this.$getRegion(data)
        if (obj.addvcd) {
          this.addvnm = obj.addvnm
          this.addvcd = obj.addvcd
        } else {
          this.addvcd = this.$store.state.user.addvcd
          this.addvnm = this.$store.state.user.addvnm
        }
        this.queryList()
      }

    }
  }
</script>

<style scoped type="text/scss" lang="scss">
  @import "~@/styles/variables";

  .app-transfer {
    padding: 0.15rem;

    .list-body {
      margin-top: 0.15rem;
      display: flex;
      flex-direction: column;
      max-height: 5rem;
      overflow: auto;

      span {
        height: 0.28rem;
        line-height: 0.28rem;
        margin-bottom: 2px;
        padding-left: 5px;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      span:hover, span.active {
        color: #fff;
        background-color: $defaultColor;
      }
    }

  }
</style>
