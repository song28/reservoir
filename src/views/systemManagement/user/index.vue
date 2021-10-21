<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-03 17:17:17
 * @LastEditTime: 2021-09-30 15:40:41
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
                <p style="line-height:30px">用户名称：</p>
              </el-col>
              <el-col :span="3">
                <el-input
                  placeholder="请输入用户名称"
                  v-model="name"
                  clearable
                  size="mini"
                ></el-input>
              </el-col>
              <el-col :span="1.5">
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
              </el-col>
              <el-col :span="1">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-search"
                  @click="searchUser"
                  >查询</el-button
                >
              </el-col>
              <el-col :span="1" :offset="1">
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
              <el-table-column prop="username" label="账号"> </el-table-column>
              <el-table-column prop="name" label="用户名称"> </el-table-column>
              <el-table-column prop="phone" label="手机号"> </el-table-column>
              <el-table-column prop="addvnm" label="行政区划"> </el-table-column>
              <el-table-column prop="orgname" label="所属机构"> </el-table-column>
              <el-table-column prop="systemname" label="系统权限"> </el-table-column>
              <el-table-column prop="rolename" label="用户角色"> </el-table-column>
              <el-table-column prop="createtime" label="创建时间">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.status === '0'"
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handlerUserAccount(scope.row, true)"
                    >锁定</el-button
                  >
                  <el-button
                    v-else
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handlerUserAccount(scope.row, false)"
                    >解锁</el-button
                  >
                  <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handledelRow(scope.row, 'update')"
                    >删除</el-button
                  > -->
                  <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handlerChange(scope.row)"
                    >修改</el-button
                  >

                  <!-- <el-button
                    size="mini"
                    class="btn-table-border blue"
                    style="cursor: pointer"
                    type="primary"
                    @click.stop="handlerAdd"
                    >查看</el-button
                  > -->
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total="listQuery.total"
              :page.sync="listQuery.pageNo"
              :limit.sync="listQuery.pageSize"
              @pagination="getUserList"
            ></pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加-修改 -->
    <!-- <Dialog :dialogVisible.sync="dialogVisible" :data="dialogData" @backDialogData="backDialogData"></Dialog> -->
    <!-- 添加  修改  -->
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
import {
  getPointLocationListByPage,
  userList,
  lockAccount,
  unlockAccount,
  orgListByCurrentUserOrgId,
} from "./api";
import AddOrChange from "./components/addChange";
import {getUserInfo} from "../../../utils/auth";

export default {
  components: {
    AddOrChange
  },
  data() {
    return {
      name:'',
      organizationList: [
      ],
      organization: "",
      tableData: [
      ],
      dialogVisible: false,
      tableLoading: false,
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 20,
      tableHeader: [],

      title: "",
      dialogData: {},
      type: "",
      query: {
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1,
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        total: 0
      },
      input: "",
      dataBtn: {
        model: 1,
        titleInput: "维护点位",
        add: true,
        query: true,
        import: false,
        importExcel: false,
        importExcelDemo: false
      }
    };
  },
  mounted() {
    this.loadOrgListByCurrentUserOrgId();
    this.getUserList();
    // this.getpointlist({
    //   pageNum: this.query.start,
    //   pageSize: this.query.size
    // })
  },
  methods: {
    //   锁定
    handlerUserAccount(row, type) {
      this.$GXprompt.messageBox.confirm(
        `确定${type ? "锁定" : "解锁"}当前用户吗?`,
        "提示",
        async flag => {
          if (flag) {
            let res;
            let params = {
              id: row.id,
              username: row.username
            };
            if (type) {
              res = await lockAccount(params);
            } else {
              res = await unlockAccount(params);
            }
            if (res.status == 200) {
              this.$GXprompt.notify.success(res.msg);
              this.getUserList();
            } else {
              this.$GXprompt.notify.error(res.msg);
            }
          } else {
            return false;
          }
        }
      );
    },
    async getUserList() {
      let userinfo = getUserInfo();
      let addvcd_p = null;
      for (let i = 0; i < userinfo.orgs.length; i++) {
        if(userinfo.orgs[i].orgcode !='bjgxhy'){
          addvcd_p = userinfo.addvcd;
        }
      }
      let params = {
        page: this.listQuery.pageNo,
        size: this.listQuery.pageSize,
        id: null,
        username: null,
        name: this.name == ''?null:this.name,
        phone: null,
        status: null,
        addvcd: addvcd_p,
        systemid: null,
        roleid: null,
        orgid: null,
        registermethod: null,
        experiencer: null
      };
      try {
        let { msg, data, status, total } = await userList(params);
        if (status) {
          this.tableData = data;
          this.listQuery.total = Number(total);
          this.tableLoading = false;
        } else {
          this.$notify.error({
            title: "失败",
            message: msg
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    //获得表格数据
    async getpointlist(pam) {
      this.tableLoading = true;
      //   this.tableData = []
      try {
        let { msg, data, status, total } = await getPointLocationListByPage(
          pam
        );
        if (status) {
          //   this.tableData = data
          this.total = total;
          this.tableLoading = false;
        } else {
          this.$notify.error({
            title: "失败",
            message: msg
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 删除
    handledelRow(row) {
      this.$GXprompt.messageBox.confirm(
        "确定删除数据吗?",
        "提示",
        async flag => {
          if (flag) {
            let { msg, obj, status } = await delSystem({ id: row.id });
            if (status == 200) {
              this.$GXprompt.notify.success(msg);
              this.getUserList();
            } else {
              this.$GXprompt.notify.error(msg);
            }
          } else {
            return false;
          }
        }
      );
    },
    // 停用
    async handleRow(row, type) {},
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getpointlist({
        pageNum: this.currentPage,
        pageSize: this.size
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getpointlist({
        pageNum: this.currentPage,
        pageSize: this.query.size
      });
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      console.log(val, "复选框----");
    },
    backData(data) {
      console.log(data, "树列表返回的值");
    },
    //对话框返回数据
    backDialogData(data) {
      this.currentPage = 1;
      this.getUserList();
    },
    searchUser(){
      this.currentPage = 1;
      this.getUserList();
    },
    async loadOrgListByCurrentUserOrgId(){
      let userinfo = getUserInfo();
      console.log(userinfo,"xxxxx")
      let params = {
        orgid: userinfo.orgs[0].orgid,
      };
      try {
        let { msg, data, status, total } = await orgListByCurrentUserOrgId(params);
        if (status) {
          this.tableData = data;
          this.listQuery.total = Number(total);
          this.tableLoading = false;
        } else {
          this.$notify.error({
            title: "失败",
            message: msg
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    handlerAdd() {
      this.dialogVisible = true;
      this.title = "添加用户";
      this.dialogData = {};
      this.type = "add";
    },
    handlerChange(row) {
      this.dialogVisible = true;
      this.dialogData = JSON.parse(JSON.stringify(row));
      this.title = "修改用户";
      this.type = "update";
    }
  }
};
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
