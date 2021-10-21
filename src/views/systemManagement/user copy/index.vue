<template>
  <div class="app-container app-container-noHeader">
    <div class="app-container-search">
      <filter-toggler @query="queryList" @reset="resetList" :hasMore="false">
        <template slot="first-line">
          <el-form-item label="姓名：">
            <el-input
              v-model="query.data.name"
              clearable
              name="name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <!--          <el-form-item label="职务：">-->
          <!--            <el-input v-model="query.dept" name='name' placeholder="请输入职务"></el-input>-->
          <!--          </el-form-item>-->
        </template>
      </filter-toggler>
      <div class="app-container-handle">
        <el-button type="primary" @click="handleCreate" size="mini">添加</el-button>
        <!--<el-button type="primary" @click="handleDelete(0)" size="mini">删除</el-button>-->
      </div>
    </div>
    <div class="app-container-body" ref="tab">
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="tableLoading"
        border
        style="width: 100%"
        :height="tableHeight"
      >
        <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="39">-->
        <!--</el-table-column>-->
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ (query.start - 1) * query.pageSize + (scope.$index + 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" align="center" sortable label="登录账号">
        </el-table-column>
        <el-table-column prop="name" align="center" sortable label="用户姓名">
        </el-table-column>
        <el-table-column align="center" sortable label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话"> </el-table-column>
        <el-table-column align="center" label="账号状态">
          <template slot-scope="scope">
            <span class="font-green" v-if="scope.row.status == 1">正常</span>
            <span class="font-red" v-else>锁定</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="320" label="操作">
          <template slot-scope="scope">
            <span class="font-darkOrange cursor-p" @click.stop="dispatchRight(scope.row)"
              >分配角色</span
            >
            <span>|</span>
            <span
              class="font-blue cursor-p"
              @click.stop="handleEdit(scope.$index, scope.row)"
              >编辑</span
            >
            <span>|</span>
            <span class="font-red cursor-p" @click.stop="handleDelete(1, scope.row)"
              >删除</span
            >
            <span>|</span>
            <span
              class="font-orange cursor-p"
              @click.stop="handleEditPwd(scope.$index, scope.row)"
              >修改密码</span
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.start"
        :limit.sync="query.pageSize"
        @pagination="queryList"
      />
    </div>

    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="adduserinfoform"
        ref="adduserinfoform"
        :rules="rules"
        status-icon
        style="margin-top: 10px"
        size="small"
      >
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="username">
          <el-input
            v-model="adduserinfoform.username"
            placeholder="6~12个字母或数字组合（不允许特殊字符）"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth" prop="password">
          <el-input
            type="password"
            v-model="adduserinfoform.password"
            placeholder="请输入8-30个字符，密码中必须包含大小写字母、数字、特殊字符"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="adduserinfoform.name"
            placeholder="2~10个中文"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别" :label-width="formLabelWidth">
          <el-radio-group v-model="adduserinfoform.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input
            v-model="adduserinfoform.phone"
            placeholder="请输入联系电话"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="系统显示名称"
          :label-width="formLabelWidth"
          prop="portalName"
        >
          <el-input
            v-model="adduserinfoform.portalName"
            placeholder="请输入系统显示名称"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="用户状态"
          v-model="adduserinfoform.status"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="adduserinfoform.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="2">锁定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="行政区："
          :label-width="formLabelWidth"
          class="el-form-item-region"
          prop="addvcd"
        >
          <!--<el-form-item label="行政区 class="el-form-item-region">-->
          <v-region @values="regionChange" type="group" :blank="false"></v-region>
        </el-form-item>
        <!-- <el-form-item label="设备分类:" :label-width="formLabelWidth" class="el-form-item-region" prop="addvcd">

          <el-cascader v-model="adduserinfoform.devCatID" :options="bizTypes"
                       :show-all-levels="false" :props="{ checkStrictly: true , multiple: false , emitPath:false }"
                       clearable></el-cascader>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="resetForm('adduserinfoform')">重置</el-button>
        <el-button @click="cancel('adduserinfoform')">取 消</el-button>
        <el-button type="primary" @click="submitForm('adduserinfoform')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改用户"
      :visible.sync="dialogFormVisible_edit"
      :before-close="handleClose_edit"
      :close-on-click-modal="false"
    >
      <el-form
        :model="edituserinfoform"
        ref="edituserinfoform"
        :rules="rules"
        status-icon
        style="margin-top: 10px"
        size="small"
      >
        <el-input v-model="edituserinfoform.id" type="hidden"></el-input>
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="username">
          <el-input
            v-model="edituserinfoform.username"
            placeholder="6~12个字母或数字组合（不允许特殊字符）"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="edituserinfoform.name"
            placeholder="2~4个中文"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别" :label-width="formLabelWidth">
          <el-radio-group v-model="edituserinfoform.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input
            v-model="edituserinfoform.phone"
            placeholder="请输入联系电话"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="系统显示名称"
          :label-width="formLabelWidth"
          prop="portalName"
        >
          <el-input
            v-model="edituserinfoform.portalName"
            placeholder="请输入系统显示名称"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态" :label-width="formLabelWidth" prop="status">
          <el-radio-group v-model="edituserinfoform.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">锁定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="行政区："
          :label-width="formLabelWidth"
          class="el-form-item-region"
          prop="addvcd"
        >
          <!--<el-form-item label="行政区 class="el-form-item-region">-->
          <!-- {{edituserinfoform.addvnm}} -->
          <v-region
            @values="regionChange"
            type="group"
            :blank="false"
            v-model="selectAddvcd"
          >
            <!-- <el-input
                  v-model="edituserinfoform.addvcd"
                  size="small"
                  placeholder="请选择行政区"
                  :disabled="disabled"
                ></el-input> -->
          </v-region>
        </el-form-item>
        <el-form-item
          label="设备分类:"
          :label-width="formLabelWidth"
          class="el-form-item-region"
          prop="addvcd"
        >
          <el-cascader
            v-model="edituserinfoform.devCatID"
            :options="bizTypes"
            :show-all-levels="false"
            :props="{ checkStrictly: true, multiple: false, emitPath: false }"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_edit('edituserinfoform')">取 消</el-button>
        <el-button type="primary" @click="submitForm_edit('edituserinfoform')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible_editPwd"
      :before-close="handleClose_editPwd"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editPwdinfoform"
        ref="editPwdinfoform"
        :rules="rules"
        status-icon
        style="margin-top: 10px"
        size="small"
      >
        <el-input v-model="editPwdinfoform.id" type="hidden" prop="id"></el-input>
        <el-form-item label="原始密码" :label-width="formLabelWidth" prop="sourcePwd">
          <el-input
            v-model="editPwdinfoform.sourcePwd"
            placeholder="请输入原始密码"
            auto-complete="off"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
          <el-input
            v-model="editPwdinfoform.newPwd"
            placeholder="请输入新密码"
            auto-complete="off"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="newPwd2">
          <el-input
            v-model="editPwdinfoform.newPwd2"
            placeholder="请再次输入新密码"
            auto-complete="off"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_editPwd('editPwdinfoform')">取 消</el-button>
        <el-button type="primary" @click="submitForm_editPwd('editPwdinfoform')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="showDispatchRight"
      :close-on-click-modal="false"
      title="查看/修改角色"
      :closable="true"
      :mask-closable="true"
      @on-ok="confirmModifyRight"
    >
      <el-checkbox-group v-model="selectRoles" @change="handleRoleSelected" class="mt-2">
        <el-checkbox v-for="role in allRoles" :label="role.id" :key="role.id">{{
          role.name
        }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDispatchRight = false">取 消</el-button>
        <el-button type="primary" @click="confirmModifyRight()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  seachByName,
  submitForm,
  doDelete,
  doDeleteMultiple,
  setRole,
  getRoleList,
  submitFormPwd,
  getBizDictList,
} from "./api";
import { getAllRoles } from "../role/api";
import { getRegion, shallowClone, parseTime, getUserRegion } from "@/utils";

export default {
  data() {
    var validateusername = (rule, value, callback) => {
      var re = /^[0-9a-zA-Z]*$/; //判断字符串是否为数字和字母组合
      if (value === "") {
        callback(new Error("请输入登录账号"));
      } else if (!re.test(value)) {
        callback(new Error("仅支持字母或数字组合"));
      } else if (value.toString().length < 4 || value.length > 12) {
        callback(new Error("请输入4~12位字母或数字组合"));
      } else {
        callback();
      }
    };
    var validatepassword = (rule, value, callback) => {
      // var re = /^[0-9a-zA-Z]*$/;  //判断字符串是否为数字和字母组合
      // 密码中必须包含大小写 字母、数字、特称字符，至少8个字符，最多30个字符
      var pwdRegex = new RegExp(
        "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}"
      );
      if (value === "") {
        callback(new Error("请输入登录密码"));
      }  else if (!pwdRegex.test(value)) {
        callback(
          "您的密码复杂度太低,请输入8~30位字符（密码中必须包含大小写字母、数字、特殊字符），请及时修改密码！"
        );
      } else {
        callback();
      }
      // if (value.toString().length < 8 || value.toString().length > 30) {
      //   callback(new Error("请输入8~30位字母或数字组合"));
      // }
    };
    var validatename = (rule, value, callback) => {
      var re = /^.*$/; //判断字符串是否为中文
      if (value === "") {
        callback(new Error("请输入用户姓名"));
      } else if (value.toString().length < 2 || value.toString().length > 10) {
        callback(new Error("请输入2~10位中文"));
      } else {
        callback();
      }
    };
    var validatephone = (rule, value, callback) => {
      var re = /^[1][3,4,5,7,8][0-9]{9}$/;  //判断是否为有效手机号码
      if (value === '') {
          callback(new Error('请输入联系电话'));
      } else if (!re.test(value)) {
          callback(new Error('手机号码不合法'));
      } else if (value.toString().length != 11) {
          callback(new Error('请输入正确的11位手机号码'));
      } else
      {
        callback();
      }
    };
    return {
      showDispatchRight: false,
      selectRoles: [],
      userID: "",
      allRoles: null,
      selectRolePersonInfo: { name: "", id: null },
      //提交数据前台校验
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
        name: [{ validator: validatename, trigger: "blur" }],
        phone: [{ validator: validatephone, trigger: "blur" }],
        newPwd:[{ validator: validatepassword, trigger: "blur" }]
        //,
        //userrole :[
        // { required: true, message: '请选择用户角色', trigger: 'change' }
        //]
      },
      bizTypes: [],
      isIndeterminate: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible_edit: false,
      dialogFormVisible_editPwd: false,
      dialogVisible: false,
      dialogVisible_del: false,
      tableLoading: true,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 0.8 - 150,

      query: {
        data: {
          name: "",
        },
        start: 1,
        pageSize: 20,
      },
      formLabelWidth: "120px",
      adduserinfoform: {
        username: "",
        password: "",
        name: "",
        sex: "1",
        phone: "",
        status: "1",
        addvcd: null,
      },
      edituserinfoform: {
        id: "",
        username: "",
        name: "",
        sex: "1",
        phone: "",
        status: "1",
        addvcd: null,
      },
      editPwdinfoform: {
        id: "",
        sourcePwd: "",
        newPwd: "",
        newPwd2: "",
      },
      tableData: [],
      total: 0,
      delRow: "",
      multipleSelection: [], //多选删除时选中的行
      selectAddvcd: {},
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.tableHeight =
        this.$refs.tab.clientHeight - 38 - (window.innerWidth / 1920) * 100 * 0.54 + "px";
      this.queryList();
      this.getAllRoles();
      this.loadBizDictList();
    });
  },
  methods: {
    //加载业务类型树
    loadBizDictList() {
      let _this = this;
      let params = { blTree: true };
      getBizDictList(params).then((res) => {
        _this.bizTypes = res.data;
      });
    },
    //行政区
    regionChange(val) {
      let obj = getRegion(val);
      this.edituserinfoform.addvcd = obj.addvcd;
      this.edituserinfoform.addvnm = obj.addvnm;
      this.adduserinfoform.addvcd = obj.addvcd;
      this.adduserinfoform.addvnm = obj.addvnm;
    },

    setAddvcd(addvcd) {
      this.selectAddvcd = getUserRegion(addvcd);
    },

    handleRoleSelected(val) {
      this.selectRoles = val;
    },
    confirmModifyRight() {
      let self = this;

      let rights = this.selectRoles;
      let data = { name: "right", value: "", code: this.userID, data: rights };
      setRole(data)
        .then(function (response) {
          if (response.status == true) {
            self.showDispatchRight = false;
            //row.roleList=response.data;
            self.$message.success("操作成功!");
          } else {
            self.$message.error(response.msg || "操作失败");
          }
        })
        .catch(function (error) {
          self.$message.error(error);
        });
    },

    getAllRoles() {
      let self = this;
      getAllRoles({})
        .then(function (response) {
          self.allRoles = response.data;
        })
        .catch(function (error) {});
    },
    dispatchRight(row) {
      var self = this;
      getRoleList({ data: row.id })
        .then(function (response) {
          if (response.data == null) {
            self.selectRoles = [];
          } else {
            self.selectRoles = response.data.map(function (item) {
              return item.id;
            });
          }
          self.userID = row.id;
          self.selectRolePersonInfo.id = row.id;
          self.selectRolePersonInfo.name = row.name;
          self.showDispatchRight = true;
        })
        .catch(function (error) {});
    },
    myNotify(msg) {
      this.$notify({
        title: "提示",
        message: msg,
        type: "success",
        duration: 1500,
      });
    },
    myNotifyError(msg) {
      this.$notify.error({
        title: "提示",
        message: msg,
        duration: 1500,
      });
    },
    //获取表格列表
    queryList() {
      let that = this;
      this.tableLoading = false;
      getList(that.query).then(function (res) {
        that.tableData = res.data.data;
        that.total = res.data.recCount;
      });
    },
    //关闭前重置表单
    handleClose(done) {
      this.$refs["adduserinfoform"].resetFields();
      done();
    },

    handleClose_edit(done) {
      this.$refs["edituserinfoform"].resetFields();
      done();
    },
    //取消修改
    handleClose_editPwd(done) {
      this.$refs["editPwdinfoform"].resetFields();
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
    //取消修改密码
    cancel_editPwd(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible_editPwd = false;
    },
    //重置查询条件
    resetList() {
      // for (let key in this.query) {
      //   this.query[key] = null;
      // }
      this.query.data.name = "";
      this.queryList();
    },
    //根据用户名搜索
    seachByName() {
      let that = this;
      let obj = new Object();
      obj.name = this.query.name;
      obj.username = this.adduserinfoform.username; //用户名
      getList(obj).then(function (res) {
        if (res.status) {
          //0表示成功，1表示失败
          that.setData(res.data, res.data.length);
        } else {
          that.myNotifyError("服务调用错误");
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
      this.adduserinfoform.status = "1";
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //提交数据到后台
          let obj = new Object();
          obj.username = this.adduserinfoform.username; //用户名
          obj.password = this.adduserinfoform.password; //密码
          obj.name = this.adduserinfoform.name; //姓名
          obj.phone = this.adduserinfoform.phone; //手机号
          obj.sex = this.adduserinfoform.sex; //性别
          obj.status = this.adduserinfoform.status; //用户状态
          obj.addvcd = this.adduserinfoform.addvcd; //用户状态
          obj.devCatID = this.adduserinfoform.devCatID; //用户指定的设备分类
          obj.portalName = this.adduserinfoform.portalName; //系统显示名称
          submitForm(obj)
            .then(
              (response) => {
                if (response.status) {
                  //重置表单
                  this.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  this.dialogFormVisible = false;
                  //重新加载页面数据
                  this.queryList(this.setData);
                  this.myNotify("添加成功");
                } else {
                  this.myNotifyError(response.msg);
                }
              },
              (err) => {
                this.myNotifyError(response.msg);
              }
            )
            .catch((error) => {
              //重置表单
              this.$refs[formName].resetFields();
              //提交成功,关闭表单
              this.dialogFormVisible = false;
              //重新加载页面数据
              this.queryList(this.setData);
              this.myNotifyError("添加失败");
            });
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
          let obj = {};
          obj.id = this.edituserinfoform.id; //用户名
          obj.username = this.edituserinfoform.username; //用户名
          obj.name = this.edituserinfoform.name; //姓名
          obj.phone = this.edituserinfoform.phone; //手机号
          obj.sex = this.edituserinfoform.sex; //性别
          obj.status = this.edituserinfoform.status; //用户状态
          obj.addvcd = this.edituserinfoform.addvcd; //用户状态
          obj.devCatID = this.edituserinfoform.devCatID; //用户指定的设备分类
          obj.portalName = this.edituserinfoform.portalName; //系统显示名称
          submitForm(obj)
            .then(
              (response) => {
                if (response.status) {
                  //重新加载数据
                  this.queryList(this.setData);
                  //重置表单
                  this.$refs[formName].resetFields();
                  //提交成功,关闭表单
                  this.dialogFormVisible_edit = false;
                  //重新加载页面数据
                  this.queryList(this.setData);
                  this.myNotify("修改成功");
                } else {
                  this.myNotifyError(response.msg);
                }
              },
              (err) => {
                this.myNotifyError(response.msg);
              }
            )
            .catch((error) => {
              //重新加载数据
              this.queryList(this.setData);
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
    //执行修改密码
    submitForm_editPwd(formName) {
      //提交数据到后台
      let obj = new Object();
      obj.id = this.editPwdinfoform.id; //id
      obj.oldPass = this.editPwdinfoform.sourcePwd; //原始密码
      obj.newPass = this.editPwdinfoform.newPwd; //新密码
      obj.rePass = this.editPwdinfoform.newPwd2; //确认密码
      if (obj.newPsss != obj.rePsss) {
        this.myNotifyError("两次密码输入不一致");
        return false;
      }
      submitFormPwd(obj)
        .then(
          (response) => {
            if (response.status) {
              //重置表单
              this.$refs[formName].resetFields();
              //提交成功,关闭表单
              this.dialogFormVisible_editPwd = false;
              //重新加载页面数据
              this.queryList(this.setData);
              this.myNotify("修改成功");
            } else {
              this.myNotifyError(response.msg);
            }
          },
          (err) => {
            this.myNotifyError(response.msg);
          }
        )
        .catch((error) => {
          //重新加载数据
          this.queryList(this.setData);
          //重置表单
          this.$refs[formName].resetFields();
          //关闭表单
          this.dialogFormVisible_editPwd = false;
          this.myNotifyError("修改失败");
        });
    },
    //修改用户信息
    handleEdit(index, row) {
      this.edituserinfoform = row;
      this.setAddvcd(row.addvcd);
      this.dialogFormVisible_edit = true;
    },

    //删除
    handleDelete(type, row) {
      let self = this;
      if (type != 1) {
        if (this.multipleSelection.length < 1) {
          this.$GXprompt.message.error("至少选择一条数据！");
          return;
        }
      } else {
        this.$confirm("确定删除数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          doDelete(row).then((response) => {
            if (response.status) {
              self.queryList(self.setData);
              self.$GXprompt.notify.success(response.msg ? response.msg : "删除成功");
            } else {
              self.$GXprompt.notify.error(response.msg ? response.msg : "删除失败");
            }
          });
        });
      }
    },

    //修改密码
    handleEditPwd(index, row) {
      this.editPwdinfoform.id = row.id;
      this.dialogFormVisible_editPwd = true;
    },
    setData(data, length) {
      //对数据做一些处理
      this.tableData = data;
      this.total = length;
    },
  },
};
</script>
