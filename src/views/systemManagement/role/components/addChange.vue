<!--
 * @Author: dang
 * @Date: 2021-08-10 11:32:10
 * @LastEditTime: 2021-09-09 21:13:55
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_gxcloud\src\views\systemManagement\role\components\addChange.vue
-->
<template>
  <el-dialog
    :title="title"
    :modal="false"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="75%"
  >
    <div class="steps-wrapper">
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="基本信息" />
        <el-step title="菜单功能权限" />
      </el-steps>
    </div>
    <!-- 基本信息 -->
    <div v-if="isActive" class="stepOne">
      <el-form
        ref="taskForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
        label-position="left"
        style="display: inline-block;"
      >
        <el-col :span="20">
          <el-form-item label="机构名称" prop="orgname">
            <el-cascader
              ref="cascader"
              v-model="formData.orgcodepath"
              size="mini"
              :options="tableData"
              :emit-path="false"
              :disabled="disabledFlag"
              :props="defaultPropsOrg"
              :show-all-levels="false"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="角色名称" prop="rolename">
            <el-input
              v-model="formData.rolename"
              placeholder="请输入名字"
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="角色编码" prop="rolecode">
            <el-input
              v-model="formData.rolecode"
              placeholder="请输入角色编码"
              size="mini"
            />
          </el-form-item>
        </el-col>

      </el-form>
    </div>
    <!-- 菜单授权 -->
    <div v-if="!isActive" class="stepTwo">
      <div class="tree-wrapper">
        <h4>关联的子系统：</h4>
        <el-tree
          highlight-current
          :data="subData"
          :props="defaultSubProps"
          @node-click="handleNodeClick"
        />
      </div>
      <div class="content-wrapper">
        <h4>所属菜单权限</h4>
        <el-tree
          ref="treeMenu"
          :data="menuData"
          show-checkbox
          check-strictly
          default-expand-all
          node-key="menuid"
          highlight-current
          :default-checked-keys="defaultCheckKeys"
          :props="defaultProps"
          @check="handleNodeClick2"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        v-if="isActive"
        style="margin-top: 12px;"
        @click="next"
      >下一步</el-button>
      <el-button
        v-if="!isActive"
        style="margin-top: 12px;"
        @click="pre"
      >上一步</el-button>
      <el-button
        v-if="!isActive"
        type="primary"
        @click="handleSave"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  orgTree,
  systemList4Page,
  addRole,
  menuAndBtnTree,
  bindRoleMenu,
  updateRole
} from '../api.js'

export default {
  props: {
    dialogVisible: {type: Boolean, default: () => false},
    title: {type: String, default: () => '添加角色'},
    type: {type: String, required: true},
    dataPar: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      menuID: null, // 关联的子系统菜单id
      tableData: [],
      active: 0,
      roleid: null,
      data: [
        {
          label: '一级 1'
        },
        {
          label: '一级 2'
        },
        {
          label: '一级 3'
        }
      ],
      disabledFlag: false,
      defaultPropsOrg: {
        value: 'orgcode',
        label: 'orgname',
        checkStrictly: true,
        emitPath: false
      },
      subData: [],
      subDataSys: [],
      menuData: [],
      defaultCheckKeys: [],
      defaultSubProps: {
        children: 'children',
        label: 'name'
      },
      defaultProps: {
        children: 'children',
        label: 'menuname'
      },
      rules: {
        name: [{required: true, message: '请输入机构名称', trigger: 'blur'}]
      },
      formData: {
        rolecode: '',
        rolename: '',
        orgcode: [],
        orgcodepath: [],
        orgname: '',
      }
    }
  },
  computed: {
    isActive() {
      return !this.active
    }
  },
  watch: {
    menuID: {
      handler(newV, oldV) {
      },
      deep: true,
      immediate: true

    },
    dataPar: {
      handler(newV, oldV) {
        this.active = 0
        this.disabledFlag = false
        this.roleid = null
        this.defaultCheckKeys = []
        if (this.type == 'update') {
          this.roleid = newV.roleid
          this.disabledFlag = true
          this.formData = JSON.parse(JSON.stringify(newV))
          this.formData.orgcodepath = newV.orgcodepath.split(',')
          // 构造每个不同的子系统

          if (newV.menuids) {
            this.defaultCheckKeys = newV.menuids.split(',')
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getOrgTree({pid: -1})
    this.getSystem()
  },
  methods: {

    handleNodeClick2(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      const kes = checkedKeys.checkedKeys
      this.subDataSys.forEach((e) => {
        if (e.id == this.menuID.id) {
          e.menuIDs = kes
        }
      })
    },
    async getSystem() {
      const params = {
        page: 1,
        size: 10000
      }
      const {data, status, msg, total} = await systemList4Page(params)
      if (status == 200) {
        this.subData = data
        this.subDataSys = data
      } else {
        this.$GXprompt.notify.error(msg)
      }
    },
    // 获得组织机构
    async getOrgTree(pam) {
      this.tableData = []
      try {
        const {msg, obj, status} = await orgTree(pam)
        if (status == 200) {
          this.tableData = obj
        } else {
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
    handleChange(value) {
      console.log(value)
    },
    // 查询菜单及按钮权限
    async handleNodeClick(data) {
      const {id} = data
      this.menuID = data
      const {msg, obj, status} = await menuAndBtnTree({systemid: id})
      if (status == 200) {
        this.menuData = obj[0].children
      } else {
        this.$GXprompt.notify.error(msg)
      }
    },
    pre() {
      --this.active
    },
    next() {
      this.formData.orgcode = this.$refs.cascader.getCheckedNodes()[0].value
      this.formData.orgname = this.$refs.cascader.getCheckedNodes()[0].label
      ++this.active
    },
    // 更新updateRole
    // async updateRole() {
    //   let params = {
    //     roleid: '', //'int //角色唯一id',
    //     rolecode: '', //'string //角色编码',
    //     rolename: '', //'string //角色名称',
    //     orgid: '', //'int //组织机构唯一id',
    //     orgcode: '', //'string //组织机构编码',
    //     orgname: '', //'string //组织机构名称',
    //     rcroleorgid: '' //'int //角色和组织机构关联唯一id'
    //   }
    //   let { data, status, msg } = await updateRole(params)
    //   if (status == 200) {
    //     this.$GXprompt.notify.success(msg)
    //     let roleid = obj.roleid
    //     this.bindRoleMenu(roleid)
    //   } else {
    //     this.$GXprompt.notify.error(msg)
    //   }
    // },
    async handleSave() {
      let res
      if (this.type == 'update') {
        const params = {
          roleid: '', // 'int //角色唯一id',
          rolecode: '', // 'string //角色编码',
          rolename: '', // 'string //角色名称',
          orgid: '', // 'int //组织机构唯一id',
          orgcode: '', // 'string //组织机构编码',
          orgname: '', // 'string //组织机构名称',
          rcroleorgid: '' // 'int //角色和组织机构关联唯一id'
        }
        res = await updateRole(this.formData)
      } else {
        res = await addRole(this.formData)
      }

      if (res.status == 200) {
        this.$GXprompt.notify.success(res.msg)
        let roleid
        if (this.type == 'update') {
          roleid = this.roleid
        } else {
          roleid = res.obj.roleid
        }
        this.bindRoleMenu(roleid)
      } else {
        this.$GXprompt.notify.error(res.msg)
      }
    },

    // bindRoleMenu
    async bindRoleMenu(roleid) {
      let menuids = []
      this.subDataSys.forEach((e) => {
        if (e.menuIDs) {
          menuids = [...e.menuIDs, ...menuids]
        }
      })
      // const menuids = this.$refs.treeMenu.getCheckedKeys()
      const {status, obj, msg} = await bindRoleMenu({roleid, menuids})
      if (status == 200) {
        this.$GXprompt.notify.success(msg)
        this.handleClose()
        this.handlerEmit()
      } else {
        this.$GXprompt.notify.error(msg)
      }
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.formData = this.$options.data().formData
    },
    handlerEmit() {
      this.$emit('backDialogData')
    }
  }
}
</script>

<style scoped lang="scss">
.steps-wrapper {
  width: 80%;
  margin: 0.3rem auto;
}
.stepOne {
  margin: 0 auto;
  width: 80%;
}
.stepTwo {
  margin: 0 auto;
  width: 80%;

  display: flex;
  justify-content: space-around;
  .tree-wrapper {
    overflow-y: auto;
    max-height: 5.6rem;
    flex: 3;
    margin-right: 0.15rem;
    background-color: #fff;
  }
  .content-wrapper {
    overflow-y: auto;
    max-height: 5.6rem;
    flex: 7;
  }
}
>>> .el-step:first-child {
  flex-basis: 9rem !important;
}
>>> .el-tree-node__expand-icon::before {
  content: '' !important;
}
>>> .el-tree-node__content {
  height: 0.35rem !important;
}
</style>
