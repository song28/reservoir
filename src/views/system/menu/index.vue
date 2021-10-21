<template>
  <div class="app-container">
    <div class="leftTree">
      <div class="app-container-handle-tree">
        <el-button type="primary" size="mini" @click="addTreeNode">添加</el-button>
      </div>
      <el-input
        v-model="filterText"
        style="margin-top:20px;"
        placeholder="输入关键字进行过滤"
      />
      <el-tree
        ref="tree2"
        class="filter-tree"
        :data="treeData"
        :load="loadNode1"
        lazy
        :props="defaultProps"
        :filter-node-method="filterNode"

        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node" style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;" @mouseenter="enter(node.id)" @mouseleave="leave(node.id)">
          <span>
            <span>{{ node.label }}</span>
          </span>
          <span :id="node.id" style="display:none;">
            <el-button style="font-size: 12px;" type="text" @click="() => add(node,data)">添加</el-button>
            <el-button style="font-size: 12px;" type="text" @click="() =>edit(node,data)">修改</el-button>
            <el-button style="font-size: 12px;" type="text" @click="() =>remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="rigthTable">
      <!-- <div class="app-container-handle mb-2">
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
            label="功能编码"
            prop="code"
            align="center">
          </el-table-column>
          <el-table-column
            label="功能名称"
            prop="name"
            align="center">
          </el-table-column>
          <el-table-column
            label="功能图标"
            prop="icon"
            align="center">
          </el-table-column>
          <el-table-column
            label="功能路由"
            prop="url"
            align="center">
          </el-table-column>
          <el-table-column
            label="所属页面"
            prop="parentPageName"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sort"
            align='center'
            width="80"
            label="展示顺序">
          </el-table-column>
          <el-table-column
            prop="status"
            width="80"
            align='center'
            label="是否启用">
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
      </div> -->
      <el-dialog title="添加功能" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form ref="addfunctionform" :model="addfunctionform" :rules="rules" status-icon style="margin-top:10px;" size="small">
          <el-form-item label="所属页面" :label-width="formLabelWidth">
            <el-input v-model="currDictName" :disabled="true" auto-complete="off" />
          </el-form-item>
          <el-form-item label="功能编码" :label-width="formLabelWidth" prop="code">
            <el-cascader
              v-model="addfunctionform.code"
              :options="allMenus"
              clearable
              :props="{ expandTrigger: 'hover',label:'title',value:'name',emitPath:false , checkStrictly: true}"
              @change="handleChange"
            />
            <el-input v-model="addfunctionform.code" placeholder="请输入功能名称" auto-complete="off" />

          </el-form-item>
          <el-form-item label="功能名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addfunctionform.name" placeholder="请输入功能名称" auto-complete="off" />
          </el-form-item>
          <el-form-item label="功能图标" :label-width="formLabelWidth" prop="icon">
            <el-input v-model="addfunctionform.icon" placeholder="请输入功能图标" auto-complete="off" />
          </el-form-item>
          <el-form-item label="功能路由" :label-width="formLabelWidth" prop="url">
            <el-input v-model="addfunctionform.url" placeholder="请输入功能路由" auto-complete="off" />
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="addfunctionform.sort" type="number" min="0" placeholder="请输入功能排序" auto-complete="off" />
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
            <el-radio-group v-model="addfunctionform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm('addfunctionform')">重置</el-button>
          <el-button @click="cancel('addfunctionform')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addfunctionform')">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加模块" :visible.sync="dialogFormVisible_dict" :before-close="handleClose_tree">
        <el-form
          ref="addmenuform"
          :model="addmenuform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <el-form-item label="模块编码" :label-width="formLabelWidth" prop="code">

            <el-cascader
              v-model="addmenuform.code"
              :options="allMenus"
              clearable
              :props="{ expandTrigger: 'hover',label:'title',value:'name',emitPath:false , checkStrictly: true}"
              @change="handleChange"
            />
            <el-input v-model="addmenuform.code" placeholder="" auto-complete="off" />
          </el-form-item>
          <el-form-item label="模块名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addmenuform.name" placeholder="" auto-complete="off" />
          </el-form-item>
          <el-form-item label="模块图标" :label-width="formLabelWidth" prop="icon">
            <el-input v-model="addmenuform.icon" placeholder="" auto-complete="off" />
          </el-form-item>
          <el-form-item label="模块路由" :label-width="formLabelWidth" prop="url">
            <el-input v-model="addmenuform.url" placeholder="" auto-complete="off" />
          </el-form-item>
          <el-form-item label="展示顺序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="addmenuform.sort" placeholder="" auto-complete="off" />
          </el-form-item>
          <el-form-item label="自定义页面" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="addmenuform.pageID" placeholder="" auto-complete="off" />
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
            <el-radio-group v-model="addmenuform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm_tree('addmenuform')">重置</el-button>
          <el-button @click="cancel_tree('addmenuform')">取 消</el-button>
          <el-button type="primary" @click="submitForm_tree('addmenuform')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改模块" :visible.sync="dialogFormVisible_dict_edit" :before-close="handleClose_tree_edit">
        <el-form ref="editmenuform" :model="editmenuform" :rules="rules" status-icon style="margin-top:10px;" size="small">
          <el-input v-model="editmenuform.id" prop="id" type="hidden" auto-complete="off" />
          <el-input v-model="editmenuform.oldCode" prop="oldCode" type="hidden" auto-complete="off" />
          <el-form-item label="模块编码" :label-width="formLabelWidth" prop="code">
            <el-cascader
              v-model="editmenuform.code"
              :options="allMenus"
              clearable
              :props="{ expandTrigger: 'hover',label:'title',value:'name',emitPath:false , checkStrictly: true}"
              @change="handleChange"
            />

            <el-input v-model="editmenuform.code" auto-complete="off" />
          </el-form-item>
          <el-form-item label="模块名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editmenuform.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="模块图标" :label-width="formLabelWidth" prop="icon">
            <el-input v-model="editmenuform.icon" auto-complete="off" />
          </el-form-item>
          <el-form-item label="模块路由" :label-width="formLabelWidth" prop="url">
            <el-input v-model="editmenuform.url" auto-complete="off" />
          </el-form-item>
          <el-form-item label="展示顺序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="editmenuform.sort" auto-complete="off" />
          </el-form-item>
          <el-form-item label="自定义页面" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="editmenuform.pageID" placeholder="" auto-complete="off" />
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
            <el-radio-group v-model="editmenuform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_tree_edit('editmenuform')">取 消</el-button>
          <el-button type="primary" @click="editForm_tree('editmenuform')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加字典" :visible.sync="dialogFormVisible_TreeNode" :before-close="handleClose">
        <el-form
          ref="addfunctionform"
          :model="addfunctionform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <el-form-item label="所属字典项" :label-width="formLabelWidth">
            <el-input v-model="currDictName" :disabled="true" auto-complete="off" />
          </el-form-item>
          <el-form-item label="字典编码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="addfunctionform.code" placeholder="3~12个大写或小写字母（不允许特殊字符）" auto-complete="off" />
          </el-form-item>
          <el-form-item label="字典名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addfunctionform.name" placeholder="2~12个中文" auto-complete="off" />
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
            <el-radio-group v-model="addfunctionform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm('addfunctionform')">重置</el-button>
          <el-button @click="cancel('addfunctionform')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addfunctionform')">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改功能-->
      <el-dialog title="修改功能" :visible.sync="dialogFormVisible_edit" :before-close="handleClose_edit">
        <el-form
          ref="editfunctionform"
          :model="editfunctionform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <el-input v-model="editfunctionform.id" type="hidden" />
          <el-input v-model="editfunctionform.oldCode" type="hidden" />
          <el-form-item label="所属页面" :label-width="formLabelWidth">
            <el-input v-model="editfunctionform.parentPageName" :disabled="true" auto-complete="off" />
          </el-form-item>

          <el-form-item label="功能编码" :label-width="formLabelWidth" prop="code">
            <el-cascader
              v-model="editfunctionform.code"
              :options="allMenus"
              clearable
              :props="{ expandTrigger: 'hover',label:'title',value:'name',emitPath:false , checkStrictly: true}"
              @change="handleChange"
            />
            <el-input v-model="editfunctionform.code" auto-complete="off" />
          </el-form-item>
          <el-form-item label="功能名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editfunctionform.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="功能图标" :label-width="formLabelWidth" prop="icon">
            <el-input v-model="editfunctionform.icon" auto-complete="off" />
          </el-form-item>
          <el-form-item label="功能路由" :label-width="formLabelWidth" prop="url">
            <el-input v-model="editfunctionform.url" auto-complete="off" />
          </el-form-item>
          <el-form-item label="展示顺序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="editfunctionform.sort" auto-complete="off" />
          </el-form-item>

          <el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
            <el-radio-group v-model="editfunctionform.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">锁定</el-radio>
            </el-radio-group>
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
        :before-close="handleClose_del"
      >
        <span style="position: relative;line-height: 50px;">确定要删除该功能信息吗？</span>
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
        :before-close="handleClose_del_tree"
      >
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
import {login, logout, getInfo, getMenus} from '@/api/user'
import {getTreeData, doDelete, changeTableData, submitForm_tree, submitForm_edit, editForm_tree, edit, doDeleteTreeNode} from './api'
export default {

  data() {
    var validatedictval = (rule, value, callback) => {
      var re = /^[a-zA-Z]*$/ // 判断字符串是否为字母组合
      if (value === '') {
        callback(new Error('请输入字典编码'))
      } else if (value.toString().length < 2 || value.toString().length > 12) {
        callback(new Error('请输入2~12位大写或小写字母组合'))
      } else {
        callback()
      }
    }
    var validatename = (rule, value, callback) => {
      var re = /^[\u0391-\uFFE5]*$/ // 判断字符串是否为中文
      if (value === '') {
        callback(new Error('请输入字典名称'))
      } else if (value.length < 2 || value.length > 4) {
        callback(new Error('请输入2~4位中文'))
      } else {
        callback()
      }
    }
    return {
      menuValue: {},
      allMenus: [],
      delTreeNodeId: null,
      currDictName: '', // 当前点击左侧的字典名称
      currDictId: '', // 当前点击左侧的字典编码，新增保存后台关联使用pid
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
        code: '',
        p_code: '',
        p_id: '',
        parentPageName: '',
        name: '',
        url: '',
        sort: '',
        status: '1',
        icon: ''
      },
      addmenuform: {
        code: '',
        p_code: '',
        p_id: '',
        parentPageName: '',
        name: '',
        url: '',
        sort: '',
        status: '1',
        icon: '',
        pageID: ''
      },
      editmenuform: {
        id: '',
        oldCode: '',
        code: '',
        name: '',
        icon: '',
        url: '',
        sort: '',
        status: '',
        pageID: ''
      },
      dialogFormVisible_edit: false,
      editfunctionform: {
        id: '',
        code: '',
        oldCode: '',
        name: '',
        icon: '',
        url: '',
        parentPageName: '',
        sort: '',
        status: '1'
      },
      // 提交数据前台校验
      rules: {
        // val: [
        //     {validator: validatedictval, trigger: 'blur'}
        // ],
        // name: [
        //     {validator: validatename, trigger: 'blur'}
        // ],
        state: ''
      }

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted() {
    this.setTreeH()
    this.treeData = []
    this.getAllMenus()
  },
  methods: {
    getAllMenus() {
      const self = this
      getMenus().then(res => { // 这里的getMenus是调用request方法从服务端获得路由菜单数据的Promise，类似getInfo
        if (res.status == true) {
          self.allMenus = res.data
        }
      }).catch(error => {

      })
    },
    // 设置左侧树高度，超出自动滚动条
    setTreeH() {
      var tree = document.getElementsByClassName('filter-tree')[0]
      tree.style.height = document.body.clientHeight - 200 + 'px'
      tree.style.overflowY = 'auto'
    },
    // 删除功能信息
    doDelete() {
      doDelete(this.delRow)
        .then(response => {
          if (response.status) {
            this.changeTableData(this.currDictId)
            this.handleClose_del()
            this.myNotify('删除成功')
          } else {
            this.myNotifyError(response.msg)
          }
        }, err => {
          this.myNotifyError(response.msg)
        })
        .catch((error) => {
          this.myNotifyError('服务调用错误' + error)
        })
    },
    myNotify(msg) {
      this.$notify({
        title: '提示',
        message: msg,
        type: 'success',
        duration: 1500
      })
    },
    myNotifyError(msg) {
      this.$notify.error({
        title: '提示',
        message: msg,
        duration: 1500
      })
    },
    // 获取表格列表
    getTreeData(pid) {
      const that = this
      that.treeData = []
      const obj = new Object()
      obj.id = pid
      getTreeData(obj).then(function(res) {
        var resData = res
        if (resData.status) {
          that.treeData = resData.data
          that.tableLoading = false
        } else {
          that.myNotifyError('服务调用错误')
        }
      })
    },
    appendTreeData(pid, callback) {
      const that = this
      const obj = new Object()
      obj.id = pid
      getTreeData(obj).then(function(res) {
        if (res.status) {
          callback(res.data)
          that.changeTableData(pid)
        } else {
          that.myNotifyError('服务调用错误')
        }
      })
    },
    changeTableData(pid) {
      const that = this
      const obj = new Object()
      obj.pId = pid
      changeTableData(obj).then(function(res) {
        if (res.status) {
          that.tableData = res.data
          that.tableLoading = false
        } else {
          that.myNotifyError('服务调用错误')
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleEdit(index, row) {
      this.editfunctionform = row
      this.editfunctionform.oldCode = row.code
      this.dialogFormVisible_edit = true
    },
    handleDelete(index, row) {
      this.dialogVisible_del = true
      this.delRow = row
    },
    handleNodeClick(data) {
      this.currDictName = data.label// 当前点击左侧的字典名称
      this.currDictId = data.id// 当前点击左侧的字典编码，新增保存后台关联使用pid
      this.changeTableData(data.id)
    },
    loadNode1(node, resolve) {
      this.appendTreeData(node.data.id, resolve)
    },
    // 新增字典项信息
    handleCreate() {
      if (this.currDictId == '') {
        this.myNotifyError('请点击左侧选择要添加的字典项分类')
        return false
      }
      this.dialogFormVisible = true
    },
    // 增加树节点
    addTreeNode() {
      this.dialogFormVisible_dict = true
    },
    submitForm_tree(formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交数据到后台
          const obj = new Object()
          obj.pId = that.delTreeNodeId
          obj.code = that.addmenuform.code
          obj.name = that.addmenuform.name
          obj.icon = that.addmenuform.icon
          obj.isMenu = '1'
          obj.url = that.addmenuform.url
          obj.sort = that.addmenuform.sort
          obj.status = that.addmenuform.status
          submitForm_tree(obj)
            .then(response => {
              if (response.status) {
                // 重置表单
                that.$refs[formName].resetFields()
                // 提交成功,关闭表单
                that.dialogFormVisible_dict = false
                // 重新加载页面数据
                that.getTreeData(null)
                that.myNotify('添加成功')
                that.delTreeNodeId = null
              } else {
                that.myNotifyError(response.msg)
              }
            }, err => {
              that.myNotifyError(response.msg)
            })
            .catch((error) => {
              // 重置表单
              that.$refs[formName].resetFields()
              // 提交成功,关闭表单
              that.dialogFormVisible = false
              // 重新加载页面数据
              that.getTreeData(that.pId)
              that.myNotifyError('添加失败')
            })
        } else {
          return false
        }
      })
    },
    // 修改模块
    editForm_tree(formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交数据到后台
          const obj = new Object()
          obj.id = this.editmenuform.id
          obj.oldCode = this.editmenuform.oldCode
          obj.code = this.editmenuform.code
          obj.name = this.editmenuform.name
          obj.icon = this.editmenuform.icon
          obj.url = this.editmenuform.url
          obj.pageID = this.editmenuform.pageID
          obj.sort = this.editmenuform.sort
          obj.status = this.editmenuform.status
          editForm_tree(obj)
            .then(response => {
              if (response.status) {
                // 重置表单
                that.$refs[formName].resetFields()
                // 修改成功,关闭表单
                that.dialogFormVisible_dict_edit = false
                // 重新加载页面数据
                that.getTreeData(null)
                that.myNotify('修改成功')
              } else {
                this.myNotifyError(response.msg)
              }
            }, err => {
              that.myNotifyError(response.msg)
            })
            .catch((error) => {
              // 重置表单
              this.$refs[formName].resetFields()
              // 修改成功,关闭表单
              this.dialogFormVisible_dict_edit = false
              // 重新加载页面数据
              this.getTreeData(null)
              this.myNotifyError('服务调用错误' + error)
            })
        } else {
          return false
        }
      })
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交数据到后台
          const obj = new Object()
          obj.pId = this.currDictId// 字典值pid
          obj.code = this.addfunctionform.code
          obj.name = this.addfunctionform.name
          obj.icon = this.addfunctionform.icon
          obj.isMenu = '0'
          obj.url = this.addfunctionform.url
          obj.sort = this.addfunctionform.sort
          obj.status = this.addfunctionform.status
          submitForm_tree(obj)
            .then(response => {
              if (response.status) {
                // 重置表单
                this.$refs[formName].resetFields()
                // 提交成功,关闭表单
                this.dialogFormVisible = false
                // 重新加载页面数据
                this.changeTableData(obj.pId)
                this.myNotify('添加成功')
              } else {
                this.myNotifyError(response.msg)
              }
            }, err => {
              this.myNotifyError(response.msg)
            })
            .catch((error) => {
              // 重置表单
              this.$refs[formName].resetFields()
              // 提交成功,关闭表单
              this.dialogFormVisible = false
              // 重新加载页面数据
              this.changeTableData(obj.pId)
              this.myNotifyError('添加失败')
            })
        } else {
          return false
        }
      })
    },
    submitForm_edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交数据到后台
          const obj = new Object()
          obj.id = this.editfunctionform.id
          obj.code = this.editfunctionform.code
          obj.oldCode = this.editfunctionform.oldCode
          obj.name = this.editfunctionform.name
          obj.icon = this.editfunctionform.icon
          obj.url = this.editfunctionform.url
          obj.sort = this.editfunctionform.sort
          obj.status = this.editfunctionform.status
          submitForm_edit(obj)
            .then(response => {
              if (response.status) {
                // 重新加载数据
                this.changeTableData(this.currDictId)
                // 重置表单
                this.$refs[formName].resetFields()
                // 提交成功,关闭表单
                this.dialogFormVisible_edit = false
                this.myNotify('修改成功')
              } else {
                this.myNotifyError(response.msg)
              }
            }, err => {
              this.myNotifyError(response.msg)
            })
            .catch((error) => {
              // 重新加载数据
              this.changeTableData(this.currDictId)
              // 重置表单
              this.$refs[formName].resetFields()
              // 关闭表单
              this.dialogFormVisible_edit = false
              this.myNotifyError('修改失败')
            })
        } else {
          return false
        }
      })
    },
    // 关闭删除弹窗
    handleClose_del() {
      this.dialogVisible_del = false
    },
    // 关闭前重置表单
    handleClose(done) {
      this.$refs['addfunctionform'].resetFields()
      done()
    },
    // 关闭前重置新增左侧树字典分类表单
    handleClose_tree(done) {
      this.$refs['addmenuform'].resetFields()
      done()
      this.dialogVisible_tree = false
    },
    // 关闭前重置修改左侧树字典分类表单
    handleClose_tree_edit(done) {
      this.$refs['editmenuform'].resetFields()
      done()
      this.dialogFormVisible_dict_edit = false
    },
    // 取消添加
    cancel(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    // 取消添加字典分类
    cancel_tree(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible_dict = false
    },
    // 取消修改字典分类
    cancel_tree_edit(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible_dict_edit = false
    },
    // 取消修改
    cancel_edit(formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible_edit = false
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.addfunctionform.state = '1'
    },
    // 重置添加字典分类表单
    resetForm_tree(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose_edit(done) {
      this.$refs['editfunctionform'].resetFields()
      done()
    },

    edit(node, data) {
      this.currDictId = node.data.id
      // 根据当前点击修改id查询该相关信息
      const obj = new Object()
      obj.id = node.data.id
      edit(obj)
        .then(response => {
          if (response.status) {
            this.editmenuform = response.data
            this.editmenuform.status = response.data.status + ''
            this.editmenuform.oldCode = response.data.code
            this.dialogFormVisible_dict_edit = true
          } else {
            this.myNotifyError(response.msg)
          }
        }, err => {
          this.myNotifyError(response.msg)
        })
        .catch((error) => {
          this.myNotifyError('服务调用错误')
        })
    },
    // 取消或删除完成时，关闭提示
    handleClose_del_tree() {
      this.dialogVisible_tree = false
    },
    // 添加子模块
    add(node, data) {
      this.delTreeNodeId = node.data.id
      this.dialogFormVisible_dict = true
    },
    // 删除提示
    remove(node, data) {
      this.delTreeNodeId = node.data.id
      this.dialogVisible_tree = true
    },
    // 调用删除api删除字典分类
    doDeleteTreeNode() {
      const that = this
      const obj = new Object()
      obj.id = that.delTreeNodeId
      doDelete(obj)
        .then(response => {
          if (response.status) {
            that.getTreeData(null)
            that.handleClose_del_tree()
            that.myNotify('删除成功')
            that.delTreeNodeId = null
          } else {
            this.myNotifyError(response.msg)
          }
        }, err => {
          that.myNotifyError(response.msg)
        })
        .catch((error) => {
          that.myNotifyError('服务调用错误')
        })
    },
    renderContent(h, {node, data, store}) {
      return (
        <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
          <span>
            <span>{node.label}</span>
          </span>
          <span style='display:none;' id='forId(node)'>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.add(node, data) }>添加</el-button>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.edit(node, data) }>修改</el-button>
            <el-button style='font-size: 12px;' type='text' on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>)
    },
    enter(id) {
      const o = document.getElementById(id)
      o.style.display = 'block'
    },
    leave(id) {
      const o = document.getElementById(id)
      o.style.display = 'none'
    },
    handleChange() {

    }
  }
}
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
