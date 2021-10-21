<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-03 17:17:17
 * @LastEditTime: 2021-09-23 09:43:12
-->
<template>
  <div class="maintenanceStandards">
    <!-- 水库列表 -->
    <el-container class="con">
      <el-container class="right">
        <el-header>
          <div class="info">
            <el-row :gutter="2" class="search">
              <el-col :span="4">
                <p style="line-height:30px">机构名称：</p>
              </el-col>
              <el-col :span="10">
                <el-input
                  placeholder="请输入查询内容"
                  v-model="input"
                  clearable
                  size="mini"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-search"
                  @click="clickBtn('query')"
                  >查询</el-button
                >
              </el-col>
              <el-col :span="4" :offset="1">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="handlerAdd"
                  >添加</el-button
                >
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-main>
          <div class="tb">
            <el-table
              stripe
              :data="tableData"
              v-loading="tableLoading"
              border
              row-key="id"
              style="width: 100%"
              highlight-current-row
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              @selection-change="handleSelectionChange"
              :height="tableHeight"
            >
              <el-table-column
                label="序号"
                type="index"
                :index="table_index"
                width="150"
                align="center"
              ></el-table-column>

              <el-table-column prop="orgname" label="机构名称">
              </el-table-column>
              <el-table-column prop="orgcode" label="组织编码">
              </el-table-column>
              <el-table-column prop="abbreviation" label="机构简称">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleDel(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleRow(scope.row, 'update')"
                    >停用</el-button
                  >
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handlerAddNext(scope.row, 'change')"
                    >修改</el-button
                  >
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handlerAddNext(scope.row, 'addNext')"
                    >添加下级机构</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加-修改 -->
    <add-or-change
      :dialogVisible.sync="dialogVisible"
      :title="title"
      :type="type"
      :dataPar="dialogData"
      @backDialogData="backDialogData"
    ></add-or-change>
  </div>
</template>
<script>
// import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
// import Btns from "../../components/tree/btns.vue";
// import Dialog from "../common/dialog";

import { orgTree, delOrg } from './api'
import AddOrChange from './components/addChange'
import {getUserInfo} from "../../../utils/auth";
export default {
  components: {
    AddOrChange
  },
  data() {
    return {
      tableData: [
      ],

      dialogVisible: false,
      tableLoading: false,
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      dialogData: {},
      title: '', //
      type: '',
      query: {
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1,
      input: '',
      dataBtn: {
        model: 1,
        titleInput: '维护点位',
        add: true,
        query: true,
        import: false,
        importExcel: false,
        importExcelDemo: false
      }
    }
  },
  mounted() {
    let userinfo = getUserInfo();
    let orgid = -1 ;
    for (let i = 0; i < userinfo.orgs.length; i++) {
      if(userinfo.orgs[i].orgcode !='bjgxhy'){
        orgid = userinfo.orgs.length == 0 ? null : userinfo.orgs[0].orgid;
      }
    }
    this.getOrgTree({ pid: orgid })
  },
  methods: {
    //获得表格数据
    async getOrgTree(pam) {
      this.tableLoading = true
      this.tableData = []
      try {
        let { msg, obj, status } = await orgTree(pam)
        if (status == 200) {
          this.tableData = obj
          this.tableLoading = false
        } else {
          this.tableLoading = false
          this.$notify.error({
            title: '失败',
            message: msg
          })
        }
      } catch (error) {
        this.tableLoading = false
        console.log(error)
      }
    },
    handleDel(row) {
      this.$GXprompt.messageBox.confirm(
        '确定删除当前机构及下级机构数据吗?',
        '提示',
        async flag => {
          if (flag) {
            let params = {
              orgname: row.orgname,
              orgcode: row.orgcode,
              pid: row.pid,
              abbreviation: row.abbreviation,
              id:row.id
            }
            let { msg, obj, status } = await delOrg(params)
            if (status == 200) {
              this.$GXprompt.notify.success(msg)
              this.getOrgTree({ pid: -1 })
            } else {
              this.$GXprompt.notify.error(msg)
            }
          } else {
            return false
          }
        }
      )
    },
    // 停用
    async handleRow(row, type) {},
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1
    },
    handleSelectionChange(val) {
      console.log(val, '复选框----')
    },

    //对话框返回数据
    backDialogData(type) {
      //除了添加 修改 都需要刷新页面
      console.log(type, 'type')
      if (type == 'sure') {
        this.getOrgTree({ pid: -1 })
      }
      this.dialogData = {}
    },
    handlerAddNext(row, type) {
      this.type = type
      if (type == 'addNext') {
        this.title = '添加组织机构'
        this.dialogData = {}
        this.dialogData.pid = row.id
      } else {
        this.title = '修改组织机构'
        row.pid = row.pid
        this.dialogData = JSON.parse(JSON.stringify(row))
      }
      this.dialogVisible = true
    },
    handlerAdd() {
      this.dialogVisible = true
      this.title = '添加组织机构'
      this.type = 'add'
    }
  }
}
</script>
<style lang="scss" scoped>
.maintenanceStandards {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  // >>> .el-button--primary {
  //   color: #fff;
  //   background-color: #0ca1d6;
  //   border-color: #ffffff;
  // }
  .right {
    margin: 0rem;
    // margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    .info {
      margin-top: 10px;
      width: 500px;
    }
    >>> .el-header {
      height: 30px !important;
    }
  }
}
</style>
