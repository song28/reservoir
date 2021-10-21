<template>
  <div class="app-container app-container-noHeader" style="flex-direction: column;">
    <div class="app-container-search">
      <filter-toggler @query="seachByName" @reset="resetList" :hasMore="false" :hasAdd="false">
        <template slot="first-line">
          <el-form-item label="角色名称：">
            <el-input v-model="listQuery.name" name='name' placeholder="请输入角色名称"></el-input>
          </el-form-item>
        </template>
      </filter-toggler>
      <div class="app-container-handle">
        <el-button type="primary" @click="handleCreate" size="mini">添加</el-button>
      </div>
    </div>
    <div class="tableCon" ref="tab">

      <el-table ref="tableList" :data="tableData" :height="tableHeight" v-loading="tableLoading" border style="width: 100%; overflow: auto;" highlight-current-row>
        <el-table-column
          label="序号"
          align="center"
          width="60">
          <template slot-scope="scope">
            <span>
              {{
              (listQuery.page - 1) * listQuery.limit + (scope.$index + 1)
            }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="value"
          align='center'
          label="角色编码">
        </el-table-column>
        <el-table-column
          prop="name"
          align='center'
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="status"
          align='center'
          label="是否启用">
        </el-table-column>
        <el-table-column
          align='center'
          width="240"
          label="操作">
          <template slot-scope="scope">
            <span class="font-darkOrange cursor-p" @click='dispatchRight(scope.row)'>分配/查看权限</span>
            <span>|</span>
            <span class="font-blue cursor-p" @click.stop="handleEdit(scope.$index, scope.row)">编辑</span>
            <span>|</span>
            <span class="font-red cursor-p" @click.stop="handleDelete(scope.$index, scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                  @pagination="queryListAll"/>
    </div>

    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="addroleinfoform" ref="addroleinfoform" :rules="rules" status-icon style="margin-top:10px;"
               size="small">
        <el-form-item label="角色编码" :label-width="formLabelWidth" prop="value">
          <el-input v-model="addroleinfoform.value" placeholder="3~12个大写或小写字母（不允许特殊字符）" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addroleinfoform.name" placeholder="2~12个中文" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-radio-group v-model="addroleinfoform.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">锁定</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="resetForm('addroleinfoform')">重置</el-button>
        <el-button @click="cancel('addroleinfoform')">取 消</el-button>
        <el-button type="primary" @click="submitForm('addroleinfoform')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改角色" :visible.sync="dialogFormVisible_edit" :before-close="handleClose_edit">
      <el-form :model="editroleinfoform" ref="editroleinfoform" :rules="rules" status-icon style="margin-top:10px;"
               size="small">
        <el-input v-model="editroleinfoform.id" type='hidden'></el-input>
        <el-form-item label="角色编码" :label-width="formLabelWidth" prop="value">
          <el-input v-model="editroleinfoform.value" placeholder="3~12个大写或小写字母（不允许特殊字符）" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editroleinfoform.name" placeholder="2~12个中文" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
          <el-radio-group v-model="editroleinfoform.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">锁定</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_edit('editroleinfoform')">取 消</el-button>
        <el-button type="primary" @click="submitForm_edit('editroleinfoform')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="删除提示"
      :visible.sync="dialogVisible_del"
      width="30%"
      :before-close="handleClose_del">
      <span style="position: relative;line-height: 50px;">确定要删除该角色信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_del = false">取 消</el-button>
        <el-button type="primary" @click="doDelete()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showDispatchRight"
               title="查看/修改权限" :closable="true" :mask-closable="true">
      <div class="tree">
      <el-tree :data="rightTree" :node-key="rightTreeNodeKey" show-checkbox :expand-on-click-node="true"
               :check-strictly="true" :props="defaultRightTreeProps" ref="rightTree" :highlight-current="true">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span> {{ node.label }}</span>
    </span>

      </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showDispatchRight = false">取 消</el-button>
    <el-button type="primary" @click="confirmModifyRight()">确 定</el-button>
  </span>
  
    </el-dialog>

  </div>
</template>

<script>
  import {getList, seachByName, submitForm, doDelete, getRightTreeList, getRolePermissions, saveRight,queryRole} from './api'

  export default {
    data() {

      var validaterolevalue = (rule, value, callback) => {
        var re = /^[a-zA-Z]*$/;  //判断字符串是否为字母组合
        if (value === '') {
          callback(new Error('请输入角色编码'));
        } else if (value.toString().length < 2 || value.toString().length > 12) {
          callback(new Error('请输入2~12位大写或小写字母组合'));
        } else {
          callback();
        }
      };
      var validatename = (rule, value, callback) => {
        var re = /^.*$/;  //判断字符串是否为中文
        if (value === '') {
          callback(new Error('请输入角色编码'));
        } else if (value.length < 2 || value.length > 12) {
          callback(new Error('请输入2~12位中文'));
        } else {
          callback();
        }
      };
      return {
        currentSelRoleId: null,
        currentRolePermissions: [],
        showDispatchRight: false,
        rightTree: null,
        defaultRightTreeProps: {

          children: 'children',
          label: 'name'
        },
        rightTreeNodeKey: 'menuId',
        //提交数据前台校验
        rules: {
          value: [
            {validator: validaterolevalue, trigger: 'blur'}
          ],
          name: [
            {validator: validatename, trigger: 'blur'}
          ]
        },
        isIndeterminate: true,
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible_edit: false,
        dialogVisible: false,
        dialogVisible_del: false,
        tableLoading: true,
        tableHeight: window.innerHeight - (window.innerWidth / 1920 * 100 * 0.8) - 150,
        listQuery: {
          page: 1,
          limit: 20,
          name: "",
        },
        formLabelWidth: '120px',
        addroleinfoform: {
          value: '',
          name: '',
          status: '1'
        },
        editroleinfoform: {
          id: '',
          value: '',
          name: '',
          status: '1'
        },
        tableData: [],
        total: 0,
        delRow: ''
      }
    },
    watch: {
      rightTree(){
      }
    },
    created() {

    },
    mounted() {
      this.$nextTick(function () {
        this.tableHeight = this.$refs.tab.clientHeight - (window.innerWidth / 1920 * 100 * 0.54) + 'px'
        this.queryList(this.setData)
        this.getRightTreeList();
      
  
      })
    },

    methods: {
      dispatchRight(row) {
        var self = this;
        getRolePermissions(row.id).then(function (response) {
          if (response.status == true) {
            self.currentSelRoleId = row.id;
            self.showDispatchRight = true;
            self.currentRolePermissions = response.data;
            self.$nextTick(() => {
              self.$refs.rightTree.setCheckedKeys(self.currentRolePermissions); // CheckedArr 一个选中的数组element Ui的东西，关键是看$nextTick的用法
            })
            
          } else {
            self.$message.error(response.msg || "操作失败");
          }

        }).catch(
          function (error) {

          })

      },
      confirmModifyRight() {
        let self = this;
        let rights = this.$refs.rightTree.getCheckedKeys();
        let data = {name: 'right', value: '', code: this.currentSelRoleId, data: rights};
        saveRight(data)
          .then(function (response) {

            if (response.status == true) {
              self.$message.success("操作成功！");
              self.showDispatchRight = false;
            } else {
              self.$message.error(response.msg || "操作失败");
            }
          })
          .catch(function (error) {
            self.$message.error(error);
          });

      },
      getRightTreeList() {
        let self = this;
        getRightTreeList({}).then(function (response) {
          self.rightTree = response.data;          
        }).catch(
          function (error) {

          })
      },
      myNotify(msg) {
        this.$notify({
          title: '提示',
          message: msg,
          type: 'success',
          duration: 1500
        });
      },
      myNotifyError(msg) {
        this.$notify.error({
          title: '提示',
          message: msg,
          duration: 1500
        });
      },
      queryListAll(page){
        console.log('Allpage',page)
          this.queryList(this.setData,page);
      },
      //获取表格列表
      queryList(callBack,page) {
        this.tableLoading = false;
        // var pars = {start:1,pageSize:20};
        var pars = {start:this.listQuery.page,pageSize:this.listQuery.limit};
        if(page){
          pars = {start:page.page,pageSize:page.limit};
        }
        queryRole(pars).then(function (res) {

          if (res.status&&res.data) { //0表示成功，1表示失败
            callBack(res.data.data, res.data.recCount);
          } else {
            this.myNotifyError('服务调用错误');
          }
        });
      },
      //关闭前重置表单
      handleClose(done) {
        this.$refs['addroleinfoform'].resetFields();
        done();
      },

      handleClose_edit(done) {
        this.$refs['editroleinfoform'].resetFields();
        done();
      },
      //取消添加
      cancel(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      //取消
      cancel_edit(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible_edit = false;
      },
      //重置查询条件
      resetList() {
        for (let key in this.listQuery) {
          this.listQuery[key] = null;
        }
        this.queryList(this.setData);
      },
      //根据用户名搜索
      seachByName() {
        let that = this;
        let obj = new Object();
        obj.name = this.listQuery.name;
        seachByName(obj).then(function (res) {
          if (res.status) {
            that.setData(res.data, res.data.length);
          } else {
            this.myNotifyError('服务调用错误');
          }
        });
      },
      //新增
      handleCreate() {
        this.dialogFormVisible = true;
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.addroleinfoform.status = '1';
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //提交数据到后台
            let obj = new Object();
            obj.value = this.addroleinfoform.value;//角色编码
            obj.name = this.addroleinfoform.name;//角色名称
            obj.status = this.addroleinfoform.status;//角色状态
            submitForm(obj)
              .then(response => {
                if (response.status) {
                  //重置表单
                  this.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  this.dialogFormVisible = false;
                  //重新加载页面数据
                  this.queryList(this.setData);
                  this.myNotify('添加成功');
                } else {
                  this.myNotifyError(response.msg);
                }
              }, err => {
                this.myNotifyError(response.msg);
              })
              .catch((error) => {
                //重置表单
                this.$refs[formName].resetFields();
                //提交成功,关闭表单
                this.dialogFormVisible = false;
                //重新加载页面数据
                this.queryList(this.setData);
                this.myNotifyError('添加失败');
              })
          } else {
            return false;
          }
        });
      },
      //提交修改用户表单
      submitForm_edit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //提交数据到后台
            let obj = new Object();
            obj.id = this.editroleinfoform.id;//唯一标识
            obj.value = this.editroleinfoform.value;//角色编码
            obj.name = this.editroleinfoform.name;//角色名
            obj.status = this.editroleinfoform.status;//是否启用
            submitForm(obj)
              .then(response => {
                if (response.status) {
                  //重新加载数据
                  this.queryList(this.setData);
                  //重置表单
                  this.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  this.dialogFormVisible_edit = false;
                  //重新加载页面数据
                  this.queryList(this.setData);
                  this.myNotify('修改成功');
                } else {
                  this.myNotifyError(response.msg);
                }
              }, err => {
                this.myNotifyError(response.msg);
              })
              .catch((error) => {
                //重新加载数据
                this.queryList(this.setData);
                //重置表单
                this.$refs[formName].resetFields();
                //关闭表单
                this.dialogFormVisible_edit = false;
                this.myNotifyError('修改失败');
              })
          } else {
            return false;
          }
        });
      },
      //修改用户信息
      handleEdit(index, row) {
        this.editroleinfoform = row;
        this.dialogFormVisible_edit = true;
      },
      //关闭删除弹窗
      handleClose_del() {
        this.dialogVisible_del = false;
      },
      //删除用户信息
      doDelete() {
        doDelete(this.delRow)
          .then(response => {
            if (response.status) {
              this.queryList(this.setData);
              this.handleClose_del();
              this.myNotify('删除成功');
            } else {
              this.myNotifyError(response.msg);
            }
          }, err => {
            this.myNotifyError(err.msg);
          })
          .catch((error) => {
            this.myNotifyError('服务调用错误');
          })
      },
      //删除响应
      handleDelete(index, row) {
        this.dialogVisible_del = true;
        this.delRow = row
      },
      setData(data, length) { //对数据做一些处理

        this.tableData = data;
        this.total = length;
        console.log('datashigesha',data)
      },
      // 滚动事件
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop = this.$refs.tableList.bodyWrapper.scrollTop;
        let scrollHeight = this.$refs.tableList.bodyWrapper.scrollHeight;
        let scrollHeight111 = this.$refs.tableList.scrollHeight;
        let clientHeight = this.$refs.tableList.bodyWrapper.clientHeight;
        if(scrollTop + clientHeight  >= scrollHeight){
          if(this.listQuery.page * this.listQuery.limit > this.total){
          return false
        }else{
          this.listQuery.page = this.listQuery.page + 1 //显示条数新增
          this.queryListAll() //请求列表list 接口方法
          this.$refs.tableList.bodyWrapper.scrollTop = 0;
        }
        }
      });
    },
    //节流函数
    throttle(func, wait) {
      let lastTime = null;
      let timeout;
      return () => {
        let context = this;
        let now = new Date();
        let arg = arguments;
        if (now - lastTime - wait > 0) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          func.apply(context, arg);
          lastTime = now;
        } else if (!timeout) {
          timeout = setTimeout(() => {
            func.apply(context, arg);
          }, wait);
        }
      };
    },
    }
  }
</script>

<style >
.tree{
  height:7rem;
  overflow:auto;
  padding:0 10px;
}
</style>
