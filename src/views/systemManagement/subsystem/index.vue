<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-03 17:23:41
 * @LastEditTime: 2021-09-23 09:41:38
-->
<template>
  <div class="maintenanceStandards">
    <!--  组织机构 -->
    <el-container class="con">
      <el-container class="right">
        <el-header>
          <div class="info">
            <el-row :gutter="2" class="search">
              <el-col :span="1.5">
                <p style="line-height:30px">子系统查询：</p>
              </el-col>
              <el-col :span="3">
                <el-input
                  placeholder="请输入查询内容"
                  v-model="input"
                  clearable
                  size="mini"
                ></el-input>
              </el-col>
              <!-- <el-col :span="1.5">
                <p style="line-height:30px">机构名称：</p>
              </el-col>
              <el-col :span="3">
                <el-select v-model="organization" size="mini">
                  <el-option
                    v-for="(item, index) in organizationList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col> -->
              <el-col :span="1">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-search"
                  @click="clickBtn('query')"
                  >查询</el-button
                >
              </el-col>
              <el-col :span="1" :offset="1">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="handleAdd"
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
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              @selection-change="handleSelectionChange"
              :height="tableHeight"
            >
              <el-table-column
                label="序号"
                type="index"
                :index="table_index"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column prop="name" label="系统名称"> </el-table-column>
              <el-table-column prop="title" label="系统标题"> </el-table-column>
              <el-table-column prop="url" label="系统访问地址">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handledelRow(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handleEdit(scope.row)"
                    >修改</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[query.size, 100, 200, 300, 400]"
              :page-size="query.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination> -->
            <pagination
              :total="listQuery.total"
              :page.sync="listQuery.pageNo"
              :limit.sync="listQuery.pageSize"
              @pagination="getSystem"
            ></pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加-修改 -->
    <!-- <add-or-change ref="formData"
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      @backDialogData="backDialogData"
    ></add-or-change> -->
    <!-- 添加  修改  -->
    <add-or-change
      ref="formData"
      @backDialogData="backDialogData"
    ></add-or-change>
  </div>
</template>

<script>
import { systemList4Page, delSystem } from './api'
import AddOrChange from './components/addChange'
import {getUserInfo} from "../../../utils/auth";
export default {
  components: {
    AddOrChange
  },
  data() {
    return {
      dialogVisible: false,
      serarchVal: '',
      searchTitle: '',
      dialogData: {},
      organizationList: [

      ],
      organization: '',
      tableData: [

      ],

      dialogVisible: false,
      tableLoading: false,
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      dialogData: {
        title: null, //弹框标题
        type: null, //操作添加，修改
        data: {}, //数据
        pageType: 'skStandards' //页面类型
      },
      query: {
        data: {},
        start: 1,
        size: 20
      },
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        total: 0
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
  created() {
    this.getSystem()
  },

  methods: {
    handledelRow(row) {
      this.$GXprompt.messageBox.confirm(
        '确定删除数据吗?',
        '提示',
        async flag => {
          if (flag) {
            let { msg, obj, status } = await delSystem({ id: row.id })
            if (status == 200) {
              this.$GXprompt.notify.success(msg)
              this.getSystem()
            } else {
              this.$GXprompt.notify.error(msg)
            }
          } else {
            return false
          }
        }
      )
    },
    async getSystem() {
      let userinfo = getUserInfo();
      let ids = userinfo.systemids;
      let sysids=[];
      //
      for (let i = 0; i < userinfo.orgs.length; i++) {
        if(userinfo.orgs[i].orgcode !='bjgxhy'){
          for (let i = 0; i < ids.length; i++) {
            sysids[i] = ids[i].id
          }
        }else{
          sysids = null;
        }
      }
      let params = {
        page: this.listQuery.pageNo,
        size: this.listQuery.pageSize,
        name: this.serarchVal,
        title: this.searchTitle,
        systemids:sysids
      }
      let { data, status, msg, total } = await systemList4Page(params)
      if (status == 200) {
        this.tableData = data
        this.listQuery.total = Number(total)
      } else {
        this.$GXprompt.notify.error(msg)
      }
    },
    backDialogData(data) {
      this.currentPage = 1
      this.getSystem()
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.getpointlist({
        pageNum: this.currentPage,
        pageSize: this.size
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getpointlist({
        pageNum: this.currentPage,
        pageSize: this.query.size
      })
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      console.log(val, '复选框----')
    },
    // 停用
    async handleRow(row, type) {},
    handleAdd() {
      this.$refs['formData'].showEdit()
    },
    handleEdit(row) {
      this.$refs['formData'].showEdit(row)
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
      width: 100%;
    }
    >>> .el-header {
      height: 30px !important;
    }
  }
}
</style>
