<template>
  <div class="app-container">

  <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

   
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
<!--            <el-button style="font-size: 12px;" type="text" @click="() => add(node,data)">添加</el-button>-->
            <el-button style="font-size: 12px;" type="text" @click="() =>edit(node,data)">修改</el-button>
            <el-button style="font-size: 12px;" type="text" @click="() =>remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </el-aside>
   <el-main>
      <div class="app-container-handle mb-2">
        <el-button @click="handleCreate" type="primary" size="mini">添加</el-button>
      </div>
      <div class="app-container-body app-container-body-column" ref="tab">
          <el-table
        :data="tableData" highlight-current-row
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
          label="字典编码"
          prop="val"
          align="center">
        </el-table-column>
        <el-table-column
          label="字典名称"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          align='center'
          label="是否启用">
        </el-table-column>
        <el-table-column align="center" label="操作">
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
      </el-main>
      </el-container>
      <el-dialog title="添加字典分类" :visible.sync="dialogFormVisible_dict" :before-close="handleClose_tree">
        <el-form :model="adddictform" ref="adddictform" :rules="rules" status-icon style="margin-top:10px;"
                 size="small">
          <el-form-item label="所属字典分类" :label-width="formLabelWidth">
            <el-input v-model="currDictName" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="adddictform.name" placeholder="2~12个中文" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm_tree('adddictform')">重置</el-button>
          <el-button @click="cancel_tree('adddictform')">取 消</el-button>
          <el-button type="primary" @click="submitForm_tree('adddictform')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改字典分类" :visible.sync="dialogFormVisible_dict_edit" :before-close="handleClose_tree_edit">
        <el-form :model="editdictform" ref="editdictform" :rules="rules" status-icon style="margin-top:10px;"
                 size="small">
          <el-form-item label="字典名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editdictform.name" placeholder="2~12个中文" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm_tree('editdictform')">重置</el-button>
          <el-button @click="cancel_tree_edit('editdictform')">取 消</el-button>
          <el-button type="primary" @click="editForm_tree('editdictform')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加字典" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="adddictvalform" ref="adddictvalform" :rules="rules" status-icon style="margin-top:10px;"
                 size="small">
          <el-form-item label="所属字典项" :label-width="formLabelWidth">
            <el-input v-model="currDictName" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典编码" :label-width="formLabelWidth" prop="val">
            <el-input v-model="adddictvalform.val" placeholder="请输入字典编码" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="adddictvalform.name" placeholder="2~12个中文" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="num">
            <el-input v-model="adddictvalform.num" placeholder="请输入排序" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-radio-group v-model="adddictvalform.state">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm('adddictvalform')">重置</el-button>
          <el-button @click="cancel('adddictvalform')">取 消</el-button>
          <el-button type="primary" @click="submitForm('adddictvalform')">确 定</el-button>
        </div>
      </el-dialog>
      <!--//修改字典值-->
      <el-dialog title="修改字典" :visible.sync="dialogFormVisible_edit" :before-close="handleClose_edit">
        <el-form :model="editdictvalform" ref="editdictvalform" :rules="rules" status-icon style="margin-top:10px;"
                 size="small">
          <el-input v-model="editdictvalform.id" type='hidden'></el-input>
          <el-form-item label="字典编码" :label-width="formLabelWidth" prop="val">
            <el-input v-model="editdictvalform.val" placeholder="3~12个大写或小写字母（不允许特殊字符）" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editdictvalform.name" placeholder="2~12个中文" auto-complete="off"></el-input>
          </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth" prop="num">
            <el-input v-model="editdictvalform.num" placeholder="排序" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="state">
            <el-radio-group v-model="editdictvalform.state">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_edit('editdictvalform')">取 消</el-button>
          <el-button type="primary" @click="submitForm_edit('editdictvalform')">确 定</el-button>
        </div>
      </el-dialog>
      <!--删除字典值提示-->
      <el-dialog
        title="删除提示"
        :visible.sync="dialogVisible_del"
        width="30%"
        :before-close="handleClose_del">
        <span style="position: relative;line-height: 50px;">确定要删除该字典信息吗？</span>
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
        <span style="position: relative;line-height: 50px;">确定要删除该字典分类信息吗？</span>
        <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose_del_tree = false">取 消</el-button>
              <el-button type="primary" @click="doDeleteTreeNode()">确 定</el-button>
            </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

    import {doDelete, getTreeData, changeTableData,submitForm_tree,submitForm_edit,submitForm,doDeleteTreeNode} from './api'

    export default {
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        mounted() {
            this.setTreeH();
            this.treeData = [];
        },
        methods: {
            //设置左侧树高度，超出自动滚动条
            setTreeH(){
                var tree=document.getElementsByClassName("filter-tree")[0];
                tree.style.height = document.body.clientHeight - 200+"px";
                tree.style.overflowY = "auto";
            },
            //删除字典值信息
            doDelete() {
                let that = this;
                doDelete(that.delRow)
                    .then(response => {
                        if (response.status) {
                            that.changeTableData(that.currDictId);
                            that.handleClose_del();
                            that.myNotify('删除成功');
                        } else {
                            that.myNotifyError(response.msg);
                        }
                    }, err => {
                        that.myNotifyError(response.msg);
                    })
                    .catch((error) => {
                        that.myNotifyError('服务调用错误');
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
                getTreeData( obj).then(function (res) {
                    var resData = res;
                    if (resData.status) {
                        callback(resData.data);
                        that.changeTableData(obj.id);
                    } else {
                        that.myNotifyError('服务调用错误');
                    }
                });
            },
            changeTableData(pid) {
                let that = this;
                let obj = new Object();
                obj.id = pid;
                changeTableData(obj).then(function (res) {
                    var resData = res;
                    if (resData.status) {
                        that.tableData = resData.data;
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
                this.editdictvalform = row;
                this.dialogFormVisible_edit = true;
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.dialogVisible_del = true;
                this.delRow = row
            },
            handleNodeClick(data) {
                this.currDictName = data.label;//当前点击左侧的字典名称
                this.currDictId = data.id;//当前点击左侧的字典编码，新增保存后台关联使用pid
                this.changeTableData(data.id);
            },
            loadNode1(node, resolve) {
                //this.appendTreeData(node.data.id, resolve);
              let that = this;
              if(node.data.id == null || node.data.id == ""){
                node.data.id = that.shenmuDictID
              }
              this.appendTreeData(node.data.id, resolve);
            },
            //新增字典项信息
            handleCreate() {
                if (this.currDictId == '') {
                    this.myNotifyError('请点击左侧选择要添加的字典项分类');
                    return false;
                }
                this.dialogFormVisible = true;
            },
            //增加树节点
            addTreeNode() {
                /*if (this.currDictId == '') {
                    this.myNotifyError('请点击左侧选择要添加的字典项分类');
                    return false;
                }*/
                this.dialogFormVisible_dict = true;
            },
            //提交新增字典分类
            submitForm_tree(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交数据到后台
                        let obj = new Object();
                        obj.pid = that.currDictId;//字典值pid
                        obj.name = that.adddictform.name;//字典分类名称
                        submitForm_tree(obj)
                            .then(response => {
                                if (response.status) {
                                    //重置表单
                                    that.$refs[formName].resetFields();
                                    //提交成功,关闭表单
                                    that.dialogFormVisible_dict = false;
                                    //重新加载页面数据
                                   // that.getTreeData(null);
                                    that.getTreeData(this.shenmuDictID);
                                    that.myNotify('添加成功');
                                } else {
                                    this.myNotifyError(response.msg);
                                }
                            }, err => {
                                that.myNotifyError(response.msg);
                            })
                            .catch((error) => {
                                //重置表单
                                this.$refs[formName].resetFields();
                                //提交成功,关闭表单
                                this.dialogFormVisible = false;
                                //重新加载页面数据
                                //that.getTreeData(null);
                                that.getTreeData(this.shenmuDictID);
                                this.myNotifyError('添加失败');
                            })
                    } else {
                        return false;
                    }
                });
            },
            //修改字典分类
            editForm_tree(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交数据到后台
                        let obj = new Object();
                        obj.id = that.currDictId;//字典值pid
                        obj.name = that.editdictform.name;//字典分类名称
                        submitForm_tree(obj)
                            .then(response => {
                                if (response.status) {
                                    //重置表单
                                    that.$refs[formName].resetFields();
                                    //修改成功,关闭表单
                                    that.dialogFormVisible_dict_edit = false;
                                    //重新加载页面数据
                                   // that.getTreeData(null);
                                    that.getTreeData(this.shenmuDictID);
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
                               // that.getTreeData(null);
                                that.getTreeData(this.shenmuDictID);
                                this.myNotifyError('修改失败');
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
                        obj.pid = this.currDictId;//字典值pid
                        obj.val = this.adddictvalform.val;//字典编码
                        obj.name = this.adddictvalform.name;//字典名称
                        obj.state = this.adddictvalform.state;//是否启用
                        submitForm(obj)
                            .then(response => {
                                if (response.status) {
                                    //重置表单
                                    this.$refs[formName].resetFields();
                                    //提交成功,关闭表单
                                    this.dialogFormVisible = false;
                                    //重新加载页面数据
                                    this.changeTableData(obj.pid);
                                    this.myNotify('添加成功');
                                } else {
                                    this.myNotifyError(response.msg)
                                }
                            })
                            .catch((error) => {
                                //重置表单
                                this.$refs[formName].resetFields();
                                //提交成功,关闭表单
                                this.dialogFormVisible = false;
                                //重新加载页面数据
                                this.changeTableData(obj.pid);
                                this.myNotifyError(response.data.msg);
                            })
                    } else {
                        return false;
                    }
                });
            },
            //提交修改字典表单
            submitForm_edit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交数据到后台
                        let obj = new Object();
                        obj.id = this.editdictvalform.id;//唯一标识
                        obj.val = this.editdictvalform.val;//字典编码
                        obj.name = this.editdictvalform.name;//字典名称
                        obj.num = Number(this.editdictvalform.num);//字典名称
                        obj.state = this.editdictvalform.state;//是否启用
                        submitForm_edit( obj)
                            .then(response => {
                                
                                if (response.status) {
                                    //重新加载数据
                                    this.changeTableData(this.currDictId);
                                    //重置表单
                                  //  this.$refs[formName].resetFields();
                                    //提交成功,关闭表单
                                    this.dialogFormVisible_edit = false;
                                    this.myNotify('修改成功');
                                } else {
                                    this.myNotifyError(response.msg);
                                }
                            }, err => {
                                this.myNotifyError(response.msg);
                            })
                            .catch((error) => {
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
            //关闭删除弹窗
            handleClose_del() {
                this.dialogVisible_del = false;
            },
            //关闭前重置表单
            handleClose(done) {
                this.$refs['adddictvalform'].resetFields();
                done();
            },
            //关闭前重置新增左侧树字典分类表单
            handleClose_tree(done) {
                this.$refs['adddictform'].resetFields();
                done();
                this.dialogVisible_tree = false;
            },
            //关闭前重置修改左侧树字典分类表单
            handleClose_tree_edit(done) {
                this.$refs['editdictform'].resetFields();
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
                this.adddictvalform.state = '1';
            },
            //重置添加字典分类表单
            resetForm_tree(formName) {
                this.$refs[formName].resetFields();
            },
            handleClose_edit(done) {
               // alert(1);
               // this.$refs['editdictvalform'].resetFields();
                done();
            },
            //修改字典分类
            edit(data) {
                console.log(data)
                this.currDictId = data.id;//字典分类id
                this.editdictform.name = data.label;//字典分类名称
                this.dialogFormVisible_dict_edit = true;
            },
            //取消或删除完成时，关闭提示
            handleClose_del_tree(){
                this.dialogVisible_tree=false;
            },
            //删除提示
            remove(node, data) {
                this.delTreeNodeId = node.data.id;
                this.dialogVisible_tree = true;
            },
            //调用删除api删除字典分类
            doDeleteTreeNode(){
                let that = this;
                let obj = new Object();
                obj.id = that.delTreeNodeId;
                doDeleteTreeNode(obj)
                    .then(response => {
                        if (response.status) {
                            //that.getTreeData(null);
                            that.getTreeData(this.shenmuDictID);
                            that.handleClose_del_tree();
                            that.myNotify('删除成功');
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
            renderContent(h, { node, data, store }) {
                return (
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                    <span>
                    <span>{node.label}</span>
                    </span>
                    <span>
                    <el-button style="font-size: 12px;" type="text" on-click={ () => this.edit(data) }>修改</el-button>
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
            }
        },
        data() {
            var validatedictval = (rule, value, callback) => {

                    callback();

            };
            var validatename = (rule, value, callback) => {

                    callback();

            };
            return {
                shenmuDictID:'',
                delTreeNodeId:'',
                currDictName: '',//当前点击左侧的字典名称
                currDictId: '',//当前点击左侧的字典编码，新增保存后台关联使用pid
                delRow: '',
                formLabelWidth: '120px',
                dialogFormVisible: false,
                dialogFormVisible_dict: false,
                dialogFormVisible_dict_edit :false,
                dialogVisible_del: false,
                dialogVisible_tree: false,
                tableLoading: true,
                pid: null,
                filterText: '',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [],
                adddictvalform: {
                    val: '',
                    name: '',
                    state: '1',
                    num:0
                },
                adddictform: {
                    val: '',
                    name: '',
                    state: '1'
                },
                editdictform: {
                    val: '',
                    name: '',
                    state: '1',
                    num:0
                },
                dialogFormVisible_edit: false,
                editdictvalform: {
                    id: '',
                    val: '',
                    name: '',
                    state: '1',
                    num:0
                },
                //提交数据前台校验
                rules: {
                    // val: [
                    //     {validator: validatedictval, trigger: 'blur'}
                    // ],
                    name: [
                        {validator: validatename, trigger: 'blur'}
                    ],
                    state: ''
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
