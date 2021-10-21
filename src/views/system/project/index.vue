<template>
  <div class="app-container">
    <div class="leftTree">
      <div class="app-container-handle-tree">
        <el-button @click="addTreeNode" type="primary" size="mini">添加</el-button>
      </div>
      <el-input style="margin-top:20px;"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="treeData"
        :load="loadNode1"
        lazy
        @node-click="handleNodeClick"
        :props="defaultProps"
        :filter-node-method="filterNode"

        ref="tree2">
        <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(node.id)"  @mouseleave="leave(node.id)" style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{{node.label}}</span>
          </span>
          <span style="display:none;" :id="node.id" >
           <!-- <el-button style="font-size: 12px;" type="text" @click="() => add(node,data)">添加</el-button>-->
            <el-button style="font-size: 12px;" type="text" @click="() =>edit(node,data)">修改</el-button>
            <el-button style="font-size: 12px;" type="text" @click="() =>remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="rigthTable">
      <div class="app-container-handle mb-2">
        <el-button @click="handleCreate" type="primary" size="mini">添加</el-button>
      </div>
      <div class="app-container-body app-container-body-column" ref="tab">
        <el-table
          :data="tableData"
          height="100%"
          v-loading="tableLoading" border
          style="width: 100%">
          <el-table-column
            label="序号"
            align="center"
            width="60">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="属性编码"
            prop="ennmcd"
            align="center">
          </el-table-column>
          <el-table-column
            label="属性名称"
            prop="name"
            align="center">
          </el-table-column>
          <el-table-column
            label="所属项目"
            prop="parentPageName"
            align="center">
          </el-table-column>
          <el-table-column
            label="属性表名"
            prop="other"
            align="center">
          </el-table-column>
          <el-table-column
            label="属性顺序"
            prop="enSort"
            align="center">
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="stm"
            align="center">
          </el-table-column>

          <el-table-column align="center" width="200" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="添加属性" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="addfunctionform" ref="addfunctionform" :rules="rules" status-icon style="margin-top:10px;"  size="small">
          <el-form-item label="所属项目" :label-width="formLabelWidth"  >
            <el-input v-model="currDictName" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性编码" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addfunctionform.ennmcd" placeholder="请输入属性编码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addfunctionform.ennm" placeholder="请输入属性名称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性表名" :label-width="formLabelWidth">
            <el-input v-model="addfunctionform.other" placeholder="请输入属性表名" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性顺序" :label-width="formLabelWidth" prop="enSort">
            <el-input v-model="addfunctionform.enSort"  type="number" auto-complete="off" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm('addfunctionform')">重置</el-button>
          <el-button @click="cancel('addfunctionform')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addfunctionform')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加项目" :visible.sync="dialogFormVisible_dict" :before-close="handleClose_tree">
        <el-form :model="addmenuform" ref="addmenuform" :rules="rules" status-icon style="margin-top:10px;"
                 size="small">
          <el-form-item label="项目编码" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addmenuform.ennmcd" placeholder="请输入名称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addmenuform.ennm" placeholder="" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目顺序" :label-width="formLabelWidth" prop="enSort">
            <el-input v-model="addmenuform.enSort"  type="number" auto-complete="off" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm_tree('addmenuform')">重置</el-button>
          <el-button @click="cancel_tree('addmenuform')">取 消</el-button>
          <el-button type="primary" @click="submitForm_tree('addmenuform')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改项目" :visible.sync="dialogFormVisible_dict_edit" :before-close="handleClose_tree_edit">
        <el-form :model="editmenuform" ref="editmenuform" :rules="rules" status-icon style="margin-top:10px;" size="small">
          <el-input v-model="editmenuform.id" prop="id" type='hidden' auto-complete="off"></el-input>
          <el-form-item label="项目编码" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editmenuform.ennmcd" placeholder="请输入名称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editmenuform.ennm" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目顺序" :label-width="formLabelWidth" prop="enSort">
            <el-input v-model="editmenuform.enSort"  type="number" auto-complete="off" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_tree_edit('editmenuform')">取 消</el-button>
          <el-button type="primary" @click="editForm_tree('editmenuform')">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改属性-->
      <el-dialog title="修改属性" :visible.sync="dialogFormVisible_edit" :before-close="handleClose_edit">
        <el-form :model="editfunctionform" ref="editfunctionform" :rules="rules" status-icon style="margin-top:10px;"
                 size="small">
          <el-input v-model="editfunctionform.ennmcd" type='hidden'></el-input>
          <el-input v-model="editfunctionform.procode" type='hidden'></el-input>
          <el-form-item label="所属项目" :label-width="formLabelWidth" >
            <el-input v-model="editfunctionform.parentPageName" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性编码" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editfunctionform.ennmcd"  auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="属性名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editfunctionform.ennm"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性表名" :label-width="formLabelWidth">
            <el-input v-model="editfunctionform.other"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="展示顺序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="editfunctionform.enSort"  auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_edit('editfunctionform')">取 消</el-button>
          <el-button type="primary" @click="submitForm_edit('editfunctionform')">确 定</el-button>
        </div>
      </el-dialog>
      <!--删除字典值提示-->
      <el-dialog
        title="删除提示"
        :visible.sync="dialogVisible_del"
        width="30%"
        :before-close="handleClose_del">
        <span style="position: relative;line-height: 50px;">确定要删除该属性信息吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_del = false">取 消</el-button>
          <el-button type="primary" @click="doDelete()">确 定</el-button>
        </span>
      </el-dialog>
      <!--删除字典分类提示-->
      <el-dialog
        title="删除提示"
        :visible.sync="dialogVisible_tree"
        width="30%"
        :before-close="handleClose_del_tree">
        <span style="position: relative;line-height: 50px;">确定要删除该模块及子菜单吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose_del_tree = false">取 消</el-button>
          <el-button type="primary" @click="doDeleteTreeNode()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {generateUUID} from '@/utils'
  import {login, logout, getInfo, getMenus} from '@/api/user'
  import {getTreeData,doDelete,changeTableData,submitForm_tree} from './api'
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted() {
      this.setTreeH();
      this.treeData = [];
      this.getAllMenus();
    },
    methods: {
      getAllMenus(){
        let self = this;
        getMenus( ).then(res => {  //这里的getMenus是调用request方法从服务端获得路由菜单数据的Promise，类似getInfo
          if(res.status == true){
            self.allMenus = res.data;
          }

        }).catch(error => {

        })
      },
      //设置左侧树高度，超出自动滚动条
      setTreeH() {
        var tree = document.getElementsByClassName("filter-tree")[0];
        tree.style.height = document.body.clientHeight - 200 + "px";
        tree.style.overflowY = "auto";
      },
      //删除属性信息
      doDelete() {
        let obj = new Object();
        obj.id = this.delRow.id;
        doDelete(obj)
          .then(response => {
            if (response.status) {
              this.changeTableData(this.currDictId);
              this.handleClose_del();
              this.myNotify('删除成功');
            } else {
              this.myNotifyError(response.msg);
            }
          }, err => {
            this.myNotifyError(response.msg);
          })
          .catch((error) => {
            this.myNotifyError('服务调用错误' + error);
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
      //获取表格列表
      getTreeData(pid) {
        let that = this;
        that.treeData = [];
        let obj = new Object();
        obj.id = pid;
        getTreeData(obj).then(function (res) {
          var resData = res;
          if (resData.status) {
            that.treeData = resData.data;
            that.tableLoading = false;
          } else {
            that.myNotifyError('服务调用错误');
          }
        });
      },
      appendTreeData(pid, callback) {
        let that = this;
        let obj = new Object();
        obj.id = pid;
        getTreeData(obj).then(function (res) {
          if (res.status) {
            callback(res.data);
            that.changeTableData(pid);
          } else {
            that.myNotifyError('服务调用错误');
          }
        });
      },
      changeTableData(pid) {
        let that = this;
        let obj = new Object();
        obj.pId = pid;
        changeTableData(obj).then(function (res) {
          if (res.status) {
            that.tableData = res.data;
            that.tableLoading = false;
          } else {
            that.myNotifyError('服务调用错误');
          }
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleEdit(index, row) {
        this.editfunctionform = row;
        this.editfunctionform.ennm = row.name
       // this.editfunctionform.id =row.id
        this.dialogFormVisible_edit = true;
      },
      handleDelete(index, row) {
        this.dialogVisible_del = true;
        this.delRow = row
      },
      handleNodeClick(data) {

        this.currDictName = data.label;//当前点击左侧的字典名称
        this.currDictId = data.id;//当前点击左侧的字典编码，新增保存后台关联使用pid
        this.changeTableData(data.id);
      },
      loadNode1(node, resolve) {
        this.appendTreeData(node.data.id, resolve);
      },
      //新增字典项信息
      handleCreate() {
       // this.addfunctionform= [];
        if (this.currDictId == '') {
          this.myNotifyError('请点击左侧选择要添加的字典项分类');
          return false;
        }
        this.dialogFormVisible = true;
      },
      //增加树节点
      addTreeNode() {
        this.dialogFormVisible_dict = true;
      },
      //添加项目树
      submitForm_tree(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            //提交数据到后台
            let obj = new Object();
            obj.id = generateUUID();
            obj.ennmcd = that.addmenuform.ennmcd;
            obj.ennm = that.addmenuform.ennm;
            obj.entype = that.addmenuform.entype;
            obj.enSort = that.addmenuform.enSort;
            submitForm_tree(obj)
              .then(response => {
                if (response.status) {
                  //重置表单
                  that.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  that.dialogFormVisible_dict = false;
                  //重新加载页面数据
                  that.getTreeData(null);
                  that.myNotify('添加成功');
                  that.delTreeNodeId= null;
                } else {
                  that.myNotifyError(response.msg);
                }
              }, err => {
                that.myNotifyError(response.msg);
              })
              .catch((error) => {
                //重置表单
                that.$refs[formName].resetFields();
                //提交成功,关闭表单
                that.dialogFormVisible = false;
                //重新加载页面数据
                that.getTreeData(that.pId);
                that.myNotifyError('添加失败');
              })
          } else {
            return false;
          }
        });
      },
      //修改项目树
      editForm_tree(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            //提交数据到后台
            let obj = new Object();
            obj.ennmcd = this.editmenuform.ennmcd;
            obj.id = this.editmenuform.id;
            obj.ennm = this.editmenuform.ennm;
            obj.entype = this.editmenuform.entype;//项目
            submitForm_tree(obj)
              .then(response => {
                if (response.status) {
                  //重置表单
                  that.$refs[formName].resetFields();
                  //修改成功,关闭表单
                  that.dialogFormVisible_dict_edit = false;
                  //重新加载页面数据
                  that.getTreeData(null);
                  that.myNotify('修改成功');
                } else {
                  this.myNotifyError(response.msg);
                }
              }, err => {
                that.myNotifyError(response.msg);
              })
              .catch((error) => {
                //重置表单
                this.$refs[formName].resetFields();
                //修改成功,关闭表单
                this.dialogFormVisible_dict_edit = false;
                //重新加载页面数据
                this.getTreeData(null);
                this.myNotifyError('服务调用错误'+error);
              })
          } else {
            return false;
          }
        });
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //提交数据到后台
            let obj = new Object();
            obj.procode = this.currDictId;//字典值pid
            obj.id = generateUUID();
            obj.ennmcd = this.addfunctionform.ennmcd
            obj.ennm = this.addfunctionform.ennm;
            obj.entype = this.addfunctionform.entype;
            obj.enSort = this.addfunctionform.enSort;
            obj.other = this.addfunctionform.other;
            submitForm_tree(obj)
              .then(response => {
                if (response.status) {
                  //重置表单
                  this.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  this.dialogFormVisible = false;
                  //重新加载页面数据
                  this.changeTableData(obj.pId);
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
                this.changeTableData(obj.pId);
                this.myNotifyError('添加失败');
              })
          } else {
            return false;
          }
        });
      },
      submitForm_edit(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            //提交数据到后台
            let obj = new Object();
            obj.id = that.editfunctionform.id;
            obj.ennmcd = that.editfunctionform.ennmcd;
            obj.ennm = that.editfunctionform.ennm;
            obj.ennm = that.editfunctionform.ennm;
            obj.entype = '2';
            obj.procode = that.editfunctionform.procode;
            obj.enSort = that.editfunctionform.enSort;
            obj.other = that.editfunctionform.other;
            submitForm_tree(obj)
              .then(response => {
                if (response.status) {
                  //重新加载数据
                  that.changeTableData(that.currDictId);
                  //重置表单
                  that.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  that.dialogFormVisible_edit = false;
                  that.myNotify('修改成功');
                } else {
                  that.myNotifyError(response.msg);
                }
              }, err => {
                that.myNotifyError(response.msg);
              })
              .catch((error) => {
                //重新加载数据
                that.changeTableData(that.currDictId);
                //重置表单
                that.$refs[formName].resetFields();
                //关闭表单
                that.dialogFormVisible_edit = false;
                that.myNotifyError('修改失败');
              })
          } else {
            return false;
          }
        });
      },
      //关闭删除弹窗
      handleClose_del() {
        this.dialogVisible_del = false;
      },
      //关闭前重置表单
      handleClose(done) {
        this.$refs['addfunctionform'].resetFields();
        done();
      },
      //关闭前重置新增左侧树字典分类表单
      handleClose_tree(done) {
        this.$refs['addmenuform'].resetFields();
        done();
        this.dialogVisible_tree = false;
      },
      //关闭前重置修改左侧树字典分类表单
      handleClose_tree_edit(done) {
        this.$refs['editmenuform'].resetFields();
        done();
        this.dialogFormVisible_dict_edit = false;
      },
      //取消添加
      cancel(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      //取消添加字典分类
      cancel_tree(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible_dict = false;
      },
      //取消修改字典分类
      cancel_tree_edit(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible_dict_edit = false;
      },
      //取消修改
      cancel_edit(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible_edit = false;
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.addfunctionform.state = '1';
      },
      //重置添加字典分类表单
      resetForm_tree(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose_edit(done) {
        this.$refs['editfunctionform'].resetFields();
        done();
      },
    //打开修改项目页面
      edit(node,data) {
        this.currDictId = node.data.id;
        this.editmenuform.ennmcd = node.data.ennmcd;
        this.editmenuform.ennm= node.data.label;
        this.editmenuform.enSort= node.data.sort;
        this.editmenuform.id= node.data.id;
        this.dialogFormVisible_dict_edit = true;
      },
      //取消或删除完成时，关闭提示
      handleClose_del_tree() {
        this.dialogVisible_tree = false;
      },
      //添加子模块
      add(node, data) {
        this.delTreeNodeId = node.data.id;
        this.dialogFormVisible_dict = true;
      },
      //删除提示
      remove(node, data) {
        this.delTreeNodeId = node.data.id;
        this.dialogVisible_tree = true;
      },
      //调用删除api删除字典分类
      doDeleteTreeNode() {
        let that = this;
        let obj = new Object();
        obj.id = that.delTreeNodeId;
        doDelete(obj)
          .then(response => {
            if (response.status) {
              that.getTreeData(null);
              that.handleClose_del_tree();
              that.myNotify('删除成功');
              that.delTreeNodeId = null;
            } else {
              this.myNotifyError(response.msg);
            }
          }, err => {
            that.myNotifyError(response.msg);
          })
          .catch((error) => {
            that.myNotifyError('服务调用错误');
          })
      },
      renderContent(h, {node, data, store}) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
          </span>
          <span style="display:none;"  id="forId(node)">
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.add(node,data) }>添加</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.edit(node,data) }>修改</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
        </span>
        </span>);
      },
      enter(id){

        let o =document.getElementById(id);
        o.style.display = "block";
      },
      leave(id){
        let o =document.getElementById(id);
        o.style.display = "none";
      },
      handleChange(){

      }
    },

    data() {
      var validatedictval = (rule, value, callback) => {
        var re = /^[a-zA-Z]*$/;  //判断字符串是否为字母组合
        if (value === '') {
          callback(new Error('请输入字典编码'));
        }  else if (value.toString().length < 2 || value.toString().length > 12) {
          callback(new Error('请输入2~12位大写或小写字母组合'));
        } else {
          callback();
        }
      };
      var validatename = (rule, value, callback) => {
        var re = /^[\u0391-\uFFE5]*$/;  //判断字符串是否为中文
        if (value === '') {
          callback(new Error('请输入名称'));
        } else if (value.length < 2 || value.length > 20) {
          callback(new Error('请输入2~20位中文'));
        } else {
          callback();
        }
      };
      return {
        menuValue:{},
        allMenus:[],
        delTreeNodeId: null,
        currDictName: '',//当前点击左侧的字典名称
        currDictId: '',//当前点击左侧的字典编码，新增保存后台关联使用pid
        delRow: '',
        formLabelWidth: '120px',
        dialogFormVisible: false,
        dialogFormVisible_dict: false,
        dialogFormVisible_dict_edit: false,
        dialogFormVisible_TreeNode: false,
        dialogVisible_del: false,
        dialogVisible_tree: false,
        tableLoading: true,
        pId: '0',
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [],
        addfunctionform: {
          ennmcd:'',
          procode:'',
          ennm:'',
          other:'',
          entype:'2',
          enSort:0,
        },
        addmenuform: {
          ennmcd:'',
          ennm:'',
          entype:'1',
          enSort:0,
        },
        editmenuform: {
          ennmcd:'',
          id:'',
          ennm:'',
          entype:'1',
          enSort:0,
        },
        dialogFormVisible_edit: false,
        editfunctionform: {
          ennmcd:'',
          id:'',
          procode:'',
          ennm:'',
          other:'',
          entype:'2',
          enSort:0,
        },
        //提交数据前台校验
        rules: {
          // val: [
          //     {validator: validatedictval, trigger: 'blur'}
          // ],
           /*name: [
               {validator: validatename, trigger: 'blur'}
           ],*/
        },

      };
    }
  };
</script>

<style scoped>
  .leftTree {
    width: 20%;
    float: left;
  }

  .rigthTable {
    width: 75%;
    margin-left: 2.5%;
    float: left;
    margin-top: 20px;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
  }

  .app-container-handle {
    margin-right: 2.5%;
  }

  .app-container-handle-tree {
    float: right;
    margin-right: 2.5%;
  }
</style>
