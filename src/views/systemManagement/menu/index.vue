<template>
  <div class="app-container">
    <div class="leftTree">
      <!-- <div class="app-container-handle-tree">
        <el-button @click="addTreeNode" type="primary" size="mini"
          >添加</el-button
        >
      </div> -->
      <el-input
        style="margin-top:20px;"
        placeholder="输入关键字进行过滤1"
        v-model="filterText"
      >
      </el-input>
      <!-- :load="loadNode1"  lazy-->
      <el-tree
        class="filter-tree"
        :data="treeData"
        @node-click="handleNodeClick"
        :props="defaultProps"
        node-key="menuid"
        :filter-node-method="filterNode"
        ref="tree2"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
          @mouseenter="enter(node.id)"
          @mouseleave="leave(node.id)"
          style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;"
        >
          <span>
            <span>{{ node.label }}</span>
          </span>
          <span style="display:none;" :id="node.id">
            <el-button
              style="font-size: 12px;"
              type="text"
              @click="() => add(node, data)"
              >添加</el-button
            >
            <el-button
              style="font-size: 12px;"
              type="text"
              @click="() => handlerChange(node, data)"
              >修改</el-button
            >
            <el-button
              style="font-size: 12px;"
              type="text"
              @click="() => handlerDel(node, data)"
              >删除</el-button
            >
          </span>
        </span>
      </el-tree>
    </div>
    <div class="rigthTable">
      <!-- <div class="app-container-handle mb-2">
        <el-button @click="handleCreate" type="primary" size="mini"
          >添加</el-button
        >
      </div> -->
      <div class="app-container-body" ref="tab">
        <el-table
          :data="tableData"
          height="7rem"
          v-loading="tableLoading"
          border
          style="width: 100%"
        >
          <el-table-column label="序号" align="center" width="60">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="功能编码" prop="code" align="center">
          </el-table-column>
          <el-table-column label="功能名称" prop="name" align="center">
          </el-table-column>
          <el-table-column label="功能图标" prop="icon" align="center">
          </el-table-column>
          <el-table-column label="功能路由" prop="url" align="center">
          </el-table-column>
          <el-table-column
            label="所属页面"
            prop="parentPageName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="sort"
            align="center"
            width="80"
            label="展示顺序"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            width="80"
            align="center"
            label="是否启用"
          >
          </el-table-column>

          <el-table-column align="center" width="200" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handlerBtnChange(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 功能 -->
      <el-dialog
        title="添加功能"
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addfunctionform"
          ref="addfunctionform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <el-form-item label="所属页面" :label-width="formLabelWidth">
            <el-input
              v-model="currDictName"
              :disabled="true"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="功能编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-cascader
              v-model="addfunctionform.code"
              :options="allMenus"
              clearable
              :props="{
                expandTrigger: 'hover',
                label: 'title',
                value: 'name',
                emitPath: false,
                checkStrictly: true
              }"
              @change="handleChange"
            ></el-cascader>
            <el-input
              v-model="addfunctionform.code"
              placeholder="请输入功能名称"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="功能名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="addfunctionform.name"
              placeholder="请输入功能名称"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="功能图标"
            :label-width="formLabelWidth"
            prop="icon"
          >
            <el-input
              v-model="addfunctionform.icon"
              placeholder="请输入功能图标"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="功能路由"
            :label-width="formLabelWidth"
            prop="url"
          >
            <el-input
              v-model="addfunctionform.url"
              placeholder="请输入功能路由"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
            <el-input
              v-model="addfunctionform.sort"
              type="number"
              min="0"
              placeholder="请输入功能排序"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否启用"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="addfunctionform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm('addfunctionform')"
            >重置</el-button
          >
          <el-button @click="cancel('addfunctionform')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addfunctionform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加树菜单 -->
      <el-dialog
        title="添加模块"
        :visible.sync="dialogFormVisible_dict"
        :before-close="handleClose_tree"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addmenuform"
          ref="addmenuform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <!-- <el-form-item
            label="模块编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-cascader
              v-model="addmenuform.code"
              :options="allMenus"
              clearable
              :props="{
                expandTrigger: 'hover',
                label: 'title',
                value: 'name',
                emitPath: false,
                checkStrictly: true
              }"
              @change="handleChange"
            ></el-cascader>
            <el-input
              v-model="addmenuform.code"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item> -->
          <el-form-item
            label="子系统集合"
            :label-width="formLabelWidth"
            prop="systemids"
          >
            <el-select
              size="small"
              v-model="addmenuform.systemids"
              multiple
              class="operation"
              @change="systemidsSelected"
              filterable
              placeholder="子系统集合"
            >
              <el-option
                :disabled="!firstMenu"
                v-for="item in treeData"
                :key="item.systemid"
                :label="item.systemname"
                :value="item.systemid"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="菜单编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input
              v-model="addmenuform.code"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="菜单名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="addmenuform.name"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="菜单图标"
            :label-width="formLabelWidth"
            prop="icon"
          >
            <el-input
              v-model="addmenuform.icon"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模块路由"
            :label-width="formLabelWidth"
            prop="url"
          >
            <el-input
              v-model="addmenuform.url"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="展示顺序"
            :label-width="formLabelWidth"
            prop="sort"
          >
            <el-input
              v-model="addmenuform.sort"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否菜单"
            :label-width="formLabelWidth"
            prop="sort"
          >
            <el-switch
              v-model="addmenuform.ismenu"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <!-- <el-form-item
            label="自定义页面"
            :label-width="formLabelWidth"
            prop="sort"
          >
            <el-input
              v-model="addmenuform.pageID"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item> -->
          <el-form-item
            label="是否启用"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="addmenuform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm_tree('addmenuform')"
            >重置</el-button
          >
          <el-button @click="cancel_tree('addmenuform')">取 消</el-button>
          <el-button type="primary" @click="submitForm_tree('addmenuform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 修改模块 -->
      <el-dialog
        title="修改模块"
        :visible.sync="dialogFormVisible_dict_edit"
        :before-close="handleClose_tree_edit"
        :close-on-click-modal="false"
      >
        <el-form
          :model="editmenuform"
          ref="editmenuform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <el-input
            v-model="editmenuform.id"
            prop="id"
            type="hidden"
            auto-complete="off"
          ></el-input>
          <el-input
            v-model="editmenuform.oldCode"
            prop="oldCode"
            type="hidden"
            auto-complete="off"
          ></el-input>
          <el-form-item
            label="模块编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-cascader
              v-model="editmenuform.code"
              :options="allMenus"
              clearable
              :props="{
                expandTrigger: 'hover',
                label: 'title',
                value: 'name',
                emitPath: false,
                checkStrictly: true
              }"
              @change="handleChange"
            ></el-cascader>

            <el-input
              v-model="editmenuform.code"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模块名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="editmenuform.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模块图标"
            :label-width="formLabelWidth"
            prop="icon"
          >
            <el-input
              v-model="editmenuform.icon"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模块路由"
            :label-width="formLabelWidth"
            prop="url"
          >
            <el-input v-model="editmenuform.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="展示顺序"
            :label-width="formLabelWidth"
            prop="sort"
          >
            <el-input
              v-model="editmenuform.sort"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="自定义页面"
            :label-width="formLabelWidth"
            prop="sort"
          >
            <el-input
              v-model="editmenuform.pageID"
              placeholder=""
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否启用"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="editmenuform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_tree_edit('editmenuform')">取 消</el-button>
          <el-button type="primary" @click="handleEditForm_tree('editmenuform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 没用的字典 -->
      <el-dialog
        title="添加字典"
        :visible.sync="dialogFormVisible_TreeNode"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <el-form
          :model="addfunctionform"
          ref="addfunctionform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <el-form-item label="所属字典项" :label-width="formLabelWidth">
            <el-input
              v-model="currDictName"
              :disabled="true"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="字典编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input
              v-model="addfunctionform.code"
              placeholder="3~12个大写或小写字母（不允许特殊字符）"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="字典名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="addfunctionform.name"
              placeholder="2~12个中文"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否启用"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="addfunctionform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="warning" @click="resetForm('addfunctionform')"
            >重置</el-button
          >
          <el-button @click="cancel('addfunctionform')">取 消</el-button>
          <el-button type="primary" @click="submitForm('addfunctionform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!--修改功能-->
      <el-dialog
        title="修改功能"
        :visible.sync="dialogFormVisible_edit"
        :before-close="handleClose_edit"
        :close-on-click-modal="false"
      >
        <el-form
          :model="editfunctionform"
          ref="editfunctionform"
          :rules="rules"
          status-icon
          style="margin-top:10px;"
          size="small"
        >
          <el-input v-model="editfunctionform.id" type="hidden"></el-input>
          <el-input v-model="editfunctionform.oldCode" type="hidden"></el-input>
          <el-form-item label="所属页面" :label-width="formLabelWidth">
            <el-input
              v-model="editfunctionform.parentPageName"
              :disabled="true"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="功能编码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-cascader
              v-model="editfunctionform.code"
              :options="allMenus"
              clearable
              :props="{
                expandTrigger: 'hover',
                label: 'title',
                value: 'name',
                emitPath: false,
                checkStrictly: true
              }"
              @change="handleChange"
            ></el-cascader>
            <el-input
              v-model="editfunctionform.code"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="功能名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="editfunctionform.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="功能图标"
            :label-width="formLabelWidth"
            prop="icon"
          >
            <el-input
              v-model="editfunctionform.icon"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="功能路由"
            :label-width="formLabelWidth"
            prop="url"
          >
            <el-input
              v-model="editfunctionform.url"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="展示顺序"
            :label-width="formLabelWidth"
            prop="sort"
          >
            <el-input
              v-model="editfunctionform.sort"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="是否启用"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="editfunctionform.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_edit('editfunctionform')">取 消</el-button>
          <el-button type="primary" @click="submitForm_edit('editfunctionform')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!--删除字典值提示-->
      <el-dialog
        title="删除提示"
        :visible.sync="dialogVisible_del"
        width="30%"
        :before-close="handleClose_del"
      >
        <span style="position: relative;line-height: 50px;"
          >确定要删除该功能信息吗？</span
        >
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
        <span style="position: relative;line-height: 50px;"
          >确定要删除该模块及子菜单吗？</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose_del_tree = false">取 消</el-button>
          <el-button type="primary" @click="doDeleteTreeNode()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { login, logout, getInfo, getMenus } from "@/api/user";
import {
  menuTree,
  addMenu,
  getTreeData,
  updateMenu,
  delMenu,
  btnList,
  doDelete,
  changeTableData,
  submitForm_tree,
  submitForm_edit,
  editForm_tree,
  edit,
  doDeleteTreeNode,
  updateTreeNodeDataById
} from "./api";
import {getUserInfo} from "../../../utils/auth";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  created() {
    this.getMenuTree();
  },
  mounted() {
    // this.setTreeH();
    // this.treeData = [];
    // this.getAllMenus();
  },
  methods: {
    //   选中子系统
    systemidsSelected(val) {
      console.log(val);
    },
    handleDelete(index, row) {
      //   this.dialogVisible_del = true
      //   this.delRow = row
      this.$GXprompt.messageBox.confirm(
        "确定删除按钮吗?",
        "提示",
        async flag => {
          if (flag) {
            let { msg, obj, status } = await delMenu({
              menuid: row.id,
              systemid: row.systemid
            });
            if (status == 200) {
              this.$GXprompt.notify.success(msg);
              this.getBtnList({
                systemid: this.currentSystemid,
                menuid: this.currentMenuid
              });
            } else {
              this.$GXprompt.notify.error(msg);
            }
          } else {
            return false;
          }
        }
      );
    },
    handlerDel(node, data) {
      let fatherData = this.handleTreePro(node);
      this.$GXprompt.messageBox.confirm(
        "确定删除菜单吗?",
        "提示",
        async flag => {
          if (flag) {
            let { msg, obj, status } = await delMenu({
              menuid: data.menuid,
              systemid: fatherData.systemid
            });
            if (status == 200) {
              this.$GXprompt.notify.success(msg);
              this.getMenuTree();
            } else {
              this.$GXprompt.notify.error(msg);
            }
          } else {
            return false;
          }
        }
      );
    },
    submitForm_tree() {
      let that = this;
      that.$refs.addmenuform.validate(async valid => {
        if (valid) {
          //提交数据到后台
          this.addmenuform.ismenu = this.addmenuform.ismenu ? 1 : 0;
          this.addmenuform.status = this.addmenuform.status == "1" ? 1 : 0;
          let data;
          if (this.handlerType == "add") {
            data = await addMenu(this.addmenuform);
          } else if (
            this.handlerType == "edit" ||
            this.handlerType == "btnEdit"
          ) {
            data = await updateMenu(this.addmenuform);
          }

          if (data.status == 200) {
            this.$GXprompt.notify.success(data.msg);
            //重置表单
            that.$refs.addmenuform.resetFields();
            //提交成功,关闭表单
            that.dialogFormVisible_dict = false;

            if (this.handlerType == "btnEdit") {
              this.getBtnList({
                systemid: this.currentSystemid,
                menuid: this.currentMenuid
              });
            } else {
              this.getMenuTree();
            }
            this.delTreeNodeId = null;
          } else {
            this.$GXprompt.notify.error(data.msg);
          }
        } else {
          return false;
        }
      });
    },
    async getMenuTree() {
      this.currentSystemid = "";
      this.currentMenuid = "";
      this.tableData = [];
      let userinfo = getUserInfo();
      let ids = userinfo.systemids;
      let sysids=[];
      for (let i = 0; i < userinfo.orgs.length; i++) {
        if(userinfo.orgs[i].orgcode !='bjgxhy'){
          for (let i = 0; i < ids.length; i++) {
            sysids[i] = ids[i].id
          }
        }else{
          sysids = null;
        }
      }
      let { msg, obj, status } = await menuTree({ systemids: sysids });
      if (status == 200) {
        obj.map(item => {
          item["menuname"] = item.systemname;
          item["menuid"] = item.systemid;
        });
        this.treeData = obj;
      } else {
        this.$GXprompt.notify.error(msg);
      }
    },
    getAllMenus() {
      let self = this;
      getMenus()
        .then(res => {
          //这里的getMenus是调用request方法从服务端获得路由菜单数据的Promise，类似getInfo
          if (res.status == true) {
            self.allMenus = res.data;
          }
        })
        .catch(error => {});
    },
    //设置左侧树高度，超出自动滚动条
    setTreeH() {
      var tree = document.getElementsByClassName("filter-tree")[0];
      tree.style.height = document.body.clientHeight - 200 + "px";
      tree.style.overflowY = "auto";
    },
    //删除功能信息
    doDelete() {
      doDelete(this.delRow)
        .then(
          response => {
            if (response.status) {
              this.changeTableData(this.currDictId);
              this.handleClose_del();
              this.myNotify("删除成功");
            } else {
              this.myNotifyError(response.msg);
            }
          },
          err => {
            this.myNotifyError(response.msg);
          }
        )
        .catch(error => {
          this.myNotifyError("服务调用错误" + error);
        });
    },
    myNotify(msg) {
      this.$notify({
        title: "提示",
        message: msg,
        type: "success",
        duration: 1500
      });
    },
    myNotifyError(msg) {
      this.$notify.error({
        title: "提示",
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
      getTreeData(obj).then(function(res) {
        var resData = res;
        if (resData.status) {
          that.treeData = resData.data;
        } else {
          that.myNotifyError("服务调用错误");
        }
      });
    },
    appendTreeData(pid, callback) {
      let that = this;
      let obj = new Object();
      obj.id = pid;
      getTreeData(obj).then(function(res) {
        if (res.status) {
          callback(res.data);
          that.changeTableData(pid);
        } else {
          that.myNotifyError("服务调用错误");
        }
      });
    },
    changeTableData(pid) {
      let that = this;
      let obj = new Object();
      obj.pId = pid;
      changeTableData(obj).then(function(res) {
        if (res.status) {
          that.tableData = res.data;
          that.tableLoading = false;
        } else {
          that.myNotifyError("服务调用错误");
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleEdit(index, row) {
      this.editfunctionform = row;
      this.editfunctionform.oldCode = row.code;
      this.dialogFormVisible_edit = true;
    },

    handleNodeClick(data, node, self) {
      this.currDictName = data.menuname; //当前点击左侧的字典名称
      this.currDictId = data.systemid || data.menuid; //当前点击左侧的字典编码，新增保存后台关联使用pid
      this.tableData = [];
      this.currentSystemid = "";
      this.currentMenuid = "";
      this.tableLoading = false;
      //   this.changeTableData(data.id)

      if (!data.children.length) {
        let params = {};
        this.handleTreePro(node);
        let fatherData = this.handleTreePro(node);
        params.systemid = fatherData.systemid;
        params.menuid = data.menuid;
        this.currentSystemid = fatherData.systemid;
        this.currentMenuid = data.menuid;
        this.tableLoading = true;
        this.getBtnList(params);
      }
    },
    // 获取按钮tab
    async getBtnList(params) {
      let { msg, obj, status } = await btnList(params);
      if (status == 200) {
        this.tableData = obj;
        this.tableLoading = false;
      } else {
        this.$GXprompt.notify.error(msg);
      }
    },
    loadNode1(node, resolve) {
      this.appendTreeData(node.data.id, resolve);
    },
    //新增字典项信息
    handleCreate() {
      if (this.currDictId == "") {
        this.myNotifyError("请点击左侧选择要添加的字典项分类");
        return false;
      }
      this.dialogFormVisible = true;
    },
    //增加树节点
    addTreeNode() {
      this.dialogFormVisible_dict = true;
    },
    submitForm_tree1(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          //提交数据到后台
          this.addmenuform.ismenu = this.addmenuform.ismenu ? 1 : 0;
          this.addmenuform.ismenu = this.addmenuform.status == "1" ? 1 : 0;
          submitForm_tree(obj)
            .then(
              response => {
                if (response.status) {
                  //重置表单
                  that.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  that.dialogFormVisible_dict = false;
                  //重新加载页面数据
                  that.getMenuTree(null);
                  that.myNotify("添加成功");
                  that.delTreeNodeId = null;
                } else {
                  that.myNotifyError(response.msg);
                }
              },
              err => {
                that.myNotifyError(response.msg);
              }
            )
            .catch(error => {
              //重置表单
              that.$refs[formName].resetFields();
              //提交成功,关闭表单
              that.dialogFormVisible = false;
              //重新加载页面数据
              that.getTreeData(that.pId);
              that.myNotifyError("添加失败");
            });
        } else {
          return false;
        }
      });
    },
    //修改模块
    handleEditForm_tree(formName) {
      this.editForm_tree1(formName);
      // this.why();
    },
    editForm_tree1(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          //提交数据到后台
          let obj = new Object();
          obj.id = that.editmenuform.id;
          obj.oldCode = that.editmenuform.oldCode;
          obj.code = that.editmenuform.code;
          obj.name = that.editmenuform.name;
          obj.icon = that.editmenuform.icon;
          obj.url = that.editmenuform.url;
          obj.pageID = that.editmenuform.pageID;
          obj.sort = that.editmenuform.sort;
          obj.status = that.editmenuform.status;
          editForm_tree(obj)
            .then(
              response => {
                if (response.status) {
                  //重置表单
                  that.$refs[formName].resetFields();
                  //修改成功,关闭表单
                  that.dialogFormVisible_dict_edit = false;
                  //重新加载页面数据
                  that.getTreeData(null);
                  that.myNotify("修改成功");
                } else {
                  this.myNotifyError(response.msg);
                }
              },
              err => {
                that.myNotifyError(response.msg);
              }
            )
            .catch(error => {
              //重置表单
              this.$refs[formName].resetFields();
              //修改成功,关闭表单
              this.dialogFormVisible_dict_edit = false;
              //重新加载页面数据
              this.getTreeData(null);
              this.myNotifyError("服务调用错误" + error);
            });
        } else {
          return false;
        }
      });
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交数据到后台
          let obj = new Object();
          obj.pId = this.currDictId; //字典值pid
          obj.code = this.addfunctionform.code;
          obj.name = this.addfunctionform.name;
          obj.icon = this.addfunctionform.icon;
          obj.isMenu = "0";
          obj.url = this.addfunctionform.url;
          obj.sort = this.addfunctionform.sort;
          obj.status = this.addfunctionform.status;
          submitForm_tree(obj)
            .then(
              response => {
                if (response.status) {
                  //重置表单
                  this.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  this.dialogFormVisible = false;
                  //重新加载页面数据
                  this.changeTableData(obj.pId);
                  this.myNotify("添加成功");
                } else {
                  this.myNotifyError(response.msg);
                }
              },
              err => {
                this.myNotifyError(response.msg);
              }
            )
            .catch(error => {
              //重置表单
              this.$refs[formName].resetFields();
              //提交成功,关闭表单
              this.dialogFormVisible = false;
              //重新加载页面数据
              this.changeTableData(obj.pId);
              this.myNotifyError("添加失败");
            });
        } else {
          return false;
        }
      });
    },
    submitForm_edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交数据到后台
          let obj = new Object();
          obj.id = this.editfunctionform.id;
          obj.code = this.editfunctionform.code;
          obj.oldCode = this.editfunctionform.oldCode;
          obj.name = this.editfunctionform.name;
          obj.icon = this.editfunctionform.icon;
          obj.url = this.editfunctionform.url;
          obj.sort = this.editfunctionform.sort;
          obj.status = this.editfunctionform.status;
          submitForm_edit(obj)
            .then(
              response => {
                if (response.status) {
                  //重新加载数据
                  this.changeTableData(this.currDictId);
                  //重置表单
                  this.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  this.dialogFormVisible_edit = false;
                  this.myNotify("修改成功");
                } else {
                  this.myNotifyError(response.msg);
                }
              },
              err => {
                this.myNotifyError(response.msg);
              }
            )
            .catch(error => {
              //重新加载数据
              this.changeTableData(this.currDictId);
              //重置表单
              this.$refs[formName].resetFields();
              //关闭表单
              this.dialogFormVisible_edit = false;
              this.myNotifyError("修改失败");
            });
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
      this.$refs["addfunctionform"].resetFields();
      done();
    },
    //关闭前重置新增左侧树字典分类表单
    handleClose_tree(done) {
      this.$refs["addmenuform"].resetFields();
      done();
      this.dialogVisible_tree = false;
    },
    //关闭前重置修改左侧树字典分类表单
    handleClose_tree_edit(done) {
      this.$refs["editmenuform"].resetFields();
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
      this.addfunctionform.state = "1";
    },
    //重置添加字典分类表单
    resetForm_tree(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose_edit(done) {
      this.$refs["editfunctionform"].resetFields();
      done();
    },

    edit(node, data) {
      this.currDictId = node.data.id;
      //根据当前点击修改id查询该相关信息
      let obj = new Object();
      obj.id = node.data.id;
      edit(obj)
        .then(
          response => {
            if (response.status) {
              this.editmenuform = response.data;
              this.editmenuform.status = response.data.status + "";
              this.editmenuform.oldCode = response.data.code;
              this.dialogFormVisible_dict_edit = true;
            } else {
              this.myNotifyError(response.msg);
            }
          },
          err => {
            this.myNotifyError(response.msg);
          }
        )
        .catch(error => {
          this.myNotifyError("服务调用错误");
        });
    },
    //取消或删除完成时，关闭提示
    handleClose_del_tree() {
      this.dialogVisible_tree = false;
    },
    handleTreePro(node, data) {
      let obj = {};
      let level = node.level - 1;
      let flag = true;
      if (level == 0) {
        obj = node;
      } else {
        while (level) {
          if (flag) {
            flag = false;
            obj = node.parent;
          } else {
            obj = obj.parent;
          }

          level--;
        }
      }
      return obj.data;
    },
    // 修改btn
    handlerBtnChange(index, data) {
      console.log(data, "data");
      this.handlerType = "btnEdit";
      this.addmenuform.systemids = [];
      this.addmenuform.systemids.push(data.systemid);
      this.addmenuform.menuids = [data.id];
      this.addmenuform.pcode = data.pcode;
      this.addmenuform.pid = data.pid;
      this.addmenuform.ismenu = false;
      this.addmenuform.code = data.code;
      this.addmenuform.name = data.name;
      this.addmenuform.url = data.url;
      this.addmenuform.sort = data.sort;
      this.addmenuform.status = data.status.toString();
      this.addmenuform.icon = data.icon;
      this.firstMenu = false;
      this.dialogFormVisible_dict = true;
    },
    handlerChange(node, data) {
      this.handlerType = "edit";
      this.addmenuform.systemids = [];
      let fatherData = this.handleTreePro(node);
      this.addmenuform.systemids.push(fatherData.systemid);
      this.addmenuform.menuids = [data.menuid];
      this.addmenuform.pcode = data.menupcode;
      this.addmenuform.pid = data.menupid == -1 ? null : data.menupid;
      this.addmenuform.ismenu = true;
      this.addmenuform.code = data.menucode;
      this.addmenuform.name = data.menuname;
      this.addmenuform.url = data.menuurl;
      this.addmenuform.sort = data.menusort;
      this.addmenuform.status = data.menustatus.toString();
      this.addmenuform.icon = data.menuicon;
      this.firstMenu = false;
      this.dialogFormVisible_dict = true;
    },
    //添加子模块
    add(node, data, edit) {
      this.handlerType = "add";
      this.delTreeNodeId = node.data.id;
      this.addmenuform = this.$options.data().addmenuform;
      this.addmenuform.systemids = [];
      let fatherData = this.handleTreePro(node);
      this.addmenuform.systemids.push(fatherData.systemid);
      if (node.level == 1) {
        this.firstMenu = true;
        this.addmenuform.pid = "";
        this.addmenuform.pcode = "";
      } else {
        this.firstMenu = false;
        this.addmenuform.pid = node.data.menuid;
        this.addmenuform.pcode = node.data.menucode;
      }
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
        .then(
          response => {
            if (response.status) {
              that.getTreeData(null);
              that.handleClose_del_tree();
              that.myNotify("删除成功");
              that.delTreeNodeId = null;
            } else {
              this.myNotifyError(response.msg);
            }
          },
          err => {
            that.myNotifyError(response.msg);
          }
        )
        .catch(error => {
          that.myNotifyError("服务调用错误");
        });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span style="display:none;" id="forId(node)">
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.add(node, data)}
            >
              添加
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.edit(node, data)}
            >
              修改
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    enter(id) {
      let o = document.getElementById(id);

      o.style.display = "block";
    },
    leave(id) {
      let o = document.getElementById(id);
      o.style.display = "none";
    },
    handleChange() {}
  },

  data() {
    var validatedictval = (rule, value, callback) => {
      var re = /^[a-zA-Z]*$/; //判断字符串是否为字母组合
      if (value === "") {
        callback(new Error("请输入字典编码"));
      } else if (value.toString().length < 2 || value.toString().length > 12) {
        callback(new Error("请输入2~12位大写或小写字母组合"));
      } else {
        callback();
      }
    };
    var validatename = (rule, value, callback) => {
      var re = /^[\u0391-\uFFE5]*$/; //判断字符串是否为中文
      if (value === "") {
        callback(new Error("请输入字典名称"));
      } else if (value.length < 2 || value.length > 4) {
        callback(new Error("请输入2~4位中文"));
      } else {
        callback();
      }
    };
    return {
      firstMenu: false,
      handlerType: "",
      systemid: "",
      currentSystemid: "",
      currentMenuid: "",
      menuValue: {},
      allMenus: [],
      delTreeNodeId: null,
      currDictName: "", //当前点击左侧的字典名称
      currDictId: "", //当前点击左侧的字典编码，新增保存后台关联使用pid
      delRow: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormVisible_dict: false,
      dialogFormVisible_dict_edit: false,
      dialogFormVisible_TreeNode: false,
      dialogVisible_del: false,
      dialogVisible_tree: false,
      tableLoading: false,
      pId: "0",
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "menuname"
      },
      tableData: [],
      addfunctionform: {
        code: "",
        p_code: "",
        p_id: "",
        parentPageName: "",
        name: "",
        url: "",
        sort: "",
        status: "1",
        icon: ""
      },
      addmenuform: {
        systemids: [],
        pcode: "",
        pid: "",
        ismenu: true,
        code: "",
        p_code: "",
        p_id: "",
        parentPageName: "",
        name: "",
        url: "",
        sort: "",
        status: "1",
        icon: "",
        pageID: ""
      },
      editmenuform: {
        id: "",
        oldCode: "",
        code: "",
        name: "",
        icon: "",
        url: "",
        sort: "",
        status: "",
        pageID: ""
      },
      dialogFormVisible_edit: false,
      editfunctionform: {
        id: "",
        code: "",
        oldCode: "",
        name: "",
        icon: "",
        url: "",
        parentPageName: "",
        sort: "",
        status: "1"
      },
      //提交数据前台校验
      rules: {
        // val: [
        //     {validator: validatedictval, trigger: 'blur'}
        // ],
        // name: [
        //     {validator: validatename, trigger: 'blur'}
        // ],
        state: ""
      }
    };
  }
};
</script>

<style scoped>
.app-container {
  flex-direction: row !important;
}
.leftTree {
  width: 20%;
  float: left;
}

.rigthTable {
  width: 75%;
  margin-left: 2.5%;
  float: left;
  margin-top: 50px;
  height: 100%;
}

.app-container-handle {
  margin-right: 2.5%;
}

.app-container-handle-tree {
  float: right;
  margin-right: 2.5%;
}
</style>
