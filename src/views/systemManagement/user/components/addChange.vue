<!--
 * @Author: dang
 * @Date: 2021-08-10 11:32:10
 * @LastEditTime: 2021-09-13 09:37:42
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_gxcloud\src\views\systemManagement\user\components\addChange.vue
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
        <el-step title="组织机构，角色分配"/>
        <!-- <el-step title="数据权限分配"></el-step> -->
        <el-step title="用户基本信息"/>
      </el-steps>
    </div>
    <!-- 基本信息 -->
    <div v-if="active == 1" class="stepOne">
      <el-form
        ref="taskForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
        label-position="left"
        style="display: inline-block;"
      >
        <el-col :span="20">
          <el-form-item label="登录账号" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="必须是4-20位字母、数字、下划线任意组合"
              size="mini"
              clearable
            />
          </el-form-item>
        </el-col>

        <!-- <el-col :span="20">
          <el-form-item label="机构名称" prop="name">
            <el-select v-model="formData.organization" size="mini">
              <el-option
                v-for="(item, index) in organizationList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="20">
          <el-form-item label="登录密码" prop="password">
            <el-input
              v-model="formData.password"
              type="password"
              show-password
              auto-complete="off"
              clearable
              placeholder="请输入登录密码"
              size="mini"
              :disabled="shouPwd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="仅支持字母、数字和汉字任意组合，长度2~18位"
              size="mini"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="formData.phone"
              clearable
              placeholder="请输入手机号"
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="行政区"
            class="el-form-item-region"
            prop="addvcd"
          >
            <v-region type="group" :blank="false" :town="true" @values="regionChange">
              <el-input
                v-model="formData.addvnm"
                size="small"
                placeholder="请选择行政区"
              />
            </v-region>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="图形验证码" prop="code">
            <el-input
              v-model="formData.code"
              placeholder="请输入图形验证码"
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="图形验证码" prop="code">
            <el-image
              style="width: 180px; height: 100px"
              :src="imgCode"
              fit="contain"
              @click="verifyCode"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 数据权限 -->
    <!-- <div v-if="active == 1" class="data-authority">
      <div class="addvcd-wrapper">
        <h4>行政区域:</h4>
        <v-region @values="regionChange" :town="true"> </v-region>
      </div>
      <div class="authority">
        <h4>分配权限</h4>
        <div class="checkout">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="(item, index) in checkboxList"
              :key="index"
              :label="item.value"
              >{{ item.key }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>
    </div> -->

    <!-- 组织机构 -->
    <div v-if="active == 0" class="stepTwo">
      <div class="tree-wrapper">
        <h4>选择组织机构：</h4>
        <!-- show-checkbox -->
        <el-tree
          :data="orgData"
          node-key="id"
          highlight-current
          :default-expanded-keys="[]"
          :default-checked-keys="[]"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </div>
      <div class="content-wrapper">
        <h4>选择角色</h4>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item in roleList"
            :key="item.id"
            :label="item.id"
          >{{ item.rolename }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        v-if="!isActive"
        style="margin-top: 12px;"
        @click="pre"
      >上一步</el-button>
      <el-button
        v-if="isActive"
        style="margin-top: 12px;"
        @click="next"
      >下一步</el-button>

      <el-button
        v-if="!isActive"
        type="primary"
        @click="handlerSave"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import Base64 from 'base-64'
  import {getRegion} from '@/utils'
  import {roleSet, orgTree, register, bindUserRole, verifyCode, updateUser} from '../api.js'

  export default {
    props: {
      dialogVisible: {type: Boolean, default: () => false},
      title: {type: String, default: () => '添加用户'},
      type: {type: String, required: true},
      dataPar: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      const validatename = (rule, value, callback) => {
        var reg = /^\w{4,20}$/ // 判断字符串是否为中文
        if (value === '') {
          callback(new Error('请输入用户姓名'))
        } else if (!reg.test(value)) {
          callback(new Error('4-20位字母、数字、下划线任意组合'))
        } else {
          callback()
        }
      }
      const validatepassword = (rule, value, callback) => {
        const pwdRegex = new RegExp(
          '(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}'
        )
        if (this.type === 'add' && value === '') {
          callback(new Error('请输入密码'))
        } else if (this.type === 'add' && !pwdRegex.test(value)) {
          callback(
            '您的密码复杂度太低,请输入8~12位字符（密码中必须包含大小写字母、数字、特殊字符）！'
          )
        } else {
          callback()
        }
      }
      return {
        shouPwd: false,
        isAdd: true,
        imgCode: '',
        active: 0,
        checkList: [],
        defaultCheckKeys: [],
        checkboxList: [
          {key: '行政责任人', value: 'xz'},
          {key: '技术责任人', value: 'js'},
          {key: '巡查责任人', value: 'xc'}
        ],
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
        data1: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                children: [
                  {
                    id: 9,
                    isQuan: true,
                    label: '三级 1-1-1'
                  },
                  {
                    isQuan: true,
                    id: 10,
                    label: '三级 1-1-2'
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              {
                id: 5,
                label: '二级 2-1'
              },
              {
                id: 6,
                label: '二级 2-2'
              }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              {
                id: 7,
                label: '二级 3-1'
              },
              {
                id: 8,
                label: '二级 3-2'
              }
            ]
          }
        ],
        orgData: [],
        roleList: [],
        defaultProps: {
          children: 'children',
          label: 'orgname'
        },
        organizationList: [
          {label: '国信', value: '1'},
          {label: '刘洋', value: '2'}
        ],
        rules: {
          username: [
            {
              validator: validatename,
              required: true,
              trigger: 'blur'
            }
          ],
          password: [
            {required: true, validator: validatepassword, trigger: 'blur'}
          ]
        },
        id: '',
        formData: {
          username: '',
          password: '',
          name: '',
          registermethod: 3,
          phone: '',
          email: null,
          code: null,
          key: null,
          addvnm: ''

        }
      }
    },
    computed: {
      isActive() {
        return !this.active
      }
    },
    watch: {
      type: {
        handler(newV, oldV) {
          if(newV == "add"){
            this.shouPwd = false
          }else{
            this.shouPwd = true
          }
        },
      },
      dataPar: {
        handler(newV, oldV) {
          console.log(newV, 'formData')
          this.active = 0
          this.id = null
          this.checkList = []
          if (this.type == 'update') {
            this.id = newV.id
            this.formData = JSON.parse(JSON.stringify(newV))
            if (newV.roleids) {
              this.checkList = newV.roleids.split(',')
              this.checkList.map((item, index, arr) => {
                arr[index] = parseInt(item)
              })
            }
            console.log(this.checkList, 'this.checkList ')
          }
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      this.getOrgTree({pid: -1})
    },
    methods: {
      // 行政区
      regionChange(val) {
        const obj = getRegion(val)
        // this.$set(this.formData, "patroladdvnm", obj.addvnm);
        // this.$set(this.formData, "patroladdvcd", obj.addvcd);
        console.log('--------', val)
        this.$set(this.formData, 'city', val.city == null ? '' : val.city.value)
        this.$set(this.formData, 'county', val.province == null ? '' : val.province.value)
        this.$set(this.formData, 'addvnm', obj.addvnm)
        this.$set(this.formData, 'addvcd', obj.addvcd)
      },
      async verifyCode() {
        const blob = await verifyCode()
        this.formData.key = blob.key
        this.imgCode = window.URL.createObjectURL(blob)
      },
      //   确定保存
      handlerSave() {
        this.$refs['taskForm'].validate(async valid => {
          if (valid) {
            let data = {status}
            let status
            let msg
            const encodePassword = Base64.encode(this.formData.password)
            const parmas = JSON.parse(JSON.stringify(this.formData))
            parmas.password = encodePassword
            if (this.type == 'add') {
              data = await register(parmas)
            } else if (this.type == 'update') {
              // data = await updateSystem(parmas)
              let {birthday, ...newdata} = parmas;
              await updateUser(newdata)
              data['status'] = 200
            }
            if (data.status == 200) {
              this.$GXprompt.notify.success(data.msg)
              this.$refs['taskForm'].resetFields()

              let id
              if (this.type == 'update') {
                id = this.id
              } else {
                id = data.obj.id
              }
              this.bindUserRole(id)
            } else {
              this.$GXprompt.notify.error(data.msg)
            }
          } else {
            return false
          }
        })
      },
      //   bindUserRole
      async bindUserRole(id) {
        const roleids = this.checkList
        const params = {
          id,
          roleids,
          createuserid: id || this.$store.state.user.userId
        }
        try {
          const {msg, obj, status} = await bindUserRole(params)
          if (status == 200) {
            this.$GXprompt.notify.success(msg)
            this.handleClose()
            this.handlerEmit()
          } else {
            this.$notify.error({
              title: '失败',
              message: msg
            })
          }
        } catch (error) {
          console.log(error)
        }
      },
      //   角色集合
      async handleNodeClick(node) {
        try {
          const {msg, obj, status} = await roleSet({orgid: node.id})
          if (status == 200) {
            //   this.orgData = obj
            this.roleList = obj
          } else {
            this.$notify.error({
              title: '失败',
              message: msg
            })
          }
        } catch (error) {
          console.log(error)
        }
      },

      // 获得组织机构数据
      async getOrgTree(pam) {
        try {
          const {msg, obj, status} = await orgTree(pam)
          if (status == 200) {
            this.orgData = obj
          } else {
            this.$notify.error({
              title: '失败',
              message: msg
            })
          }
        } catch (error) {
          console.log(error)
        }
      },
      // 行政区
      // regionChange(val) {
      //   let obj = getRegion(val)
      //   this.edituserinfoform.addvcd = obj.addvcd
      //   this.edituserinfoform.addvnm = obj.addvnm
      //   this.adduserinfoform.addvcd = obj.addvcd
      //   this.adduserinfoform.addvnm = obj.addvnm
      // },

      pre() {
        --this.active
      },
      next() {
        this.verifyCode()
        ++this.active
      },
      handleClose() {
        this.$emit('update:dialogVisible', false)
        this.formData = this.$options.data().formData
        this.roleList = this.$options.data().roleList
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
    width: 80%;
    margin: 0 auto;
  }

  .data-authority {
    width: 80%;
    margin: 0 auto;

    .addvcd-wrapper {
      width: 100%;
      display: flex;

      h4 {
        flex: 1;
      }

      .v-region {
        flex: 8;
        justify-content: center;
        display: flex;
        align-items: center;
      }
    }

    .authorityr {
      width: 100%;

      .checkout {
        min-height: 0.5rem;
        background-color: rgba(243, 243, 243, 1);
      }
    }
  }

  .stepTwo {
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: space-around;

    .tree-wrapper {
      flex: 3;
      overflow-y: auto;
      max-height: 5.6rem;

      margin-right: 0.15rem;
      background-color: #fff;
    }

    .content-wrapper {
      overflow-y: auto;
      max-height: 5.6rem;
      flex: 7;
    }
  }

  > > > .el-step:first-child {
    flex-basis: 12rem !important;
  }

  > > > .el-step:nth-child(2) {
    flex-basis: 6rem !important;
  }

  // >>> .el-tree-node__expand-icon::before {
  //   content: '' !important;
  // }
  > > > .el-tree-node__content {
    height: 0.35rem !important;
  }
</style>
