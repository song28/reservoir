<template>
  <div class="app-container app-container-noHeader">
    <div class="app-container-search">
      <filter-toggler @query="getList" @reset="resetList" @export="handleExport(0)" @add="add" :hasMore="false" :hasExport="false" :hasAdd="true">
        <template slot="first-line">
          <el-form-item label="单位名称">
            <el-input v-model="queryData.unitName" placeholder="请输入名称" size="mini"></el-input>
          </el-form-item>
        </template>
      </filter-toggler>
    </div>
    <!--<div class="app-container-search">
      <CRUD
        :showData="showData"
        @add="add"
        @del="del"
        @modification="modification"
        @exports="Export"
      ></CRUD>
    </div>-->
    <div class="tableCon" ref="tab">
      <el-table ref="tableList" :data="tableData" v-loading="loading" border highlight-current-row :height="tableHeight" @selection-change="getRow">
        <!--<el-table-column type="selection" align="center" width="55"></el-table-column>-->
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ (pageNo - 1) * pageSize + (scope.$index + 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位编号" align="center" width="120" prop="jcca07a010"></el-table-column>
        <el-table-column label="单位名称" align="center" prop="jcca07a020"></el-table-column>
        <el-table-column label="单位通讯地址" align="center" prop="jcca07a030"></el-table-column>
        <el-table-column label="单位负责人" align="center" width="100" prop="jcca07a040"></el-table-column>
        <el-table-column label="联系人" align="center" width="100" prop="jcca07a050"></el-table-column>
        <el-table-column label="电话" align="center" width="120" prop="jcca07a060"></el-table-column>
        <el-table-column label="传真" align="center" width="120" prop="jcca07a070"></el-table-column>
        <el-table-column label="手机" align="center" width="120" prop="jcca07a080"></el-table-column>
        <el-table-column label="邮箱" align="center" width="150" prop="jcca07a090"></el-table-column>
        <el-table-column label="备注" align="center" width="100" prop="jcca07a100"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div><el-button type="primary" size="mini" @click="modification(scope.row)">修改</el-button></div>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="pageNo" :limit.sync="pageSize" @pagination="getList" />
    </div>

    <el-dialog :close-on-click-modal="false" :title="dialogData.title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div style="padding: 0 20px">
        <el-form ref="form" label-position="right" :model="formData" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="type == '2'" label="单位编号" label-width="140px" prop="Djcca07a010">
                <el-input disabled v-model="formData.Djcca07a010" size="mini"></el-input>
              </el-form-item>
              <el-form-item v-if="type == '1'" label="单位编号" label-width="140px" prop="Djcca07a010">
                <el-input v-model="formData.Djcca07a010" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位名称" label-width="140px" prop="Djcca07a020">
                <el-input v-model="formData.Djcca07a020" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位通讯地址" label-width="140px" prop="Djcca07a030">
                <el-input v-model="formData.Djcca07a030" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位负责人" label-width="140px" prop="Djcca07a040">
                <el-input v-model="formData.Djcca07a040" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人" label-width="140px" prop="Djcca07a050">
                <el-input v-model="formData.Djcca07a050" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" label-width="140px" prop="Djcca07a060">
                <el-input v-model="formData.Djcca07a060" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="传真" label-width="140px" prop="Djcca07a070">
                <el-input v-model="formData.Djcca07a070" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机" label-width="140px" prop="Djcca07a080">
                <el-input v-model="formData.Djcca07a080" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" label-width="140px" prop="Djcca07a090">
                <el-input v-model="formData.Djcca07a090" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" label-width="140px" prop="Djcca07a100">
                <el-input v-model="formData.Djcca07a100" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="btn_cont">
                <el-button type="primary" size="small" @click="confirm">确 定</el-button>
                <el-button size="small" @click="handleClose">取 消</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getIOTSQL, getIOTSQLPage } from "@/utils/sqlAjaxUtil";
import { getitemsbydict } from "@/api/deviceBase";
//contractunitAdd
import { getInstallList, contractunitAdd, contractunit, contractunitUpdate, contractunitDelete } from "../api";
import siteDialog from "../components/dialog";

export default {
  components: {
    siteDialog,
  },
  data() {
    return {
      tbid: "",
      dialogVisible: false,
      loading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 50,
      queryData: { unitName: null },
      pageNo: 1,
      pageSize: 20,
      total: 0,
      tableLoading: false,
      tableData: [],
      dialogData: {
        name: "install",
        device: null,
        title: null,
        dialogVisible: false,
      },
      showData: {
        add: true,
        modification: true,
        del: false,
        export: false,
        importData: false,
      },
      formData: {
        Did: "",
        Djcca07a010: "",
        Djcca07a020: "",
        Djcca07a030: "",
        Djcca07a040: "",
        Djcca07a050: "",
        Djcca07a060: "",
        Djcca07a070: "",
        Djcca07a080: "",
        Djcca07a090: "",
        Djcca07a100: "",
      },

      // jcca07a010	string 单位编号
      // jcca07a020	string单位名称
      // jcca07a030	string上级主管单位
      // jcca07a040	string单位通讯地址
      // jcca07a050	string单位负责人
      // jcca07a060	string 联系人
      // jcca07a070	string 电话
      // jcca07a080	string传真
      // jcca07a090	string 手机
      // jcca07a100	string 邮箱
      // jcca07a110	string 备注
      rules: {
        Djcca07a010: [{ required: true, message: "请输入单位编号", trigger: "blur" }],
        Djcca07a020: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
        Djcca07a030: [{ required: false, message: "请输入上级主管单位", trigger: "blur" }],
        Djcca07a040: [{ required: false, message: "请输入单位通讯地址", trigger: "blur" }],
        Djcca07a050: [{ required: false, message: "请输入单位负责人", trigger: "blur" }],

        Djcca07a060: [{ required: false, message: "请输入联系人", trigger: "blur" }],
        Djcca07a070: [{ required: false, message: "请输入电话", trigger: "blur" }],
        Djcca07a080: [{ required: false, message: "请输入传真", trigger: "blur" }],
        Djcca07a090: [{ required: false, message: "请输入手机", trigger: "blur" }],
        Djcca07a100: [{ required: false, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getList();
          let self = this;
    self.$refs.tableList.bodyWrapper
      .addEventListener("scroll", self.throttle(self.handleScroll, 3000), true);

    });
  },
  methods: {
    add() {
      this.dialogData.title = "新增数据";
      this.dialogVisible = true;
      this.type = 1;
      this.tbid = "";
        this.formData = {
          Did: "",
          Djcca07a010: "",
          Djcca07a020: "",
          Djcca07a030: "",
          Djcca07a040: "",
          Djcca07a050: "",
          Djcca07a060: "",
          Djcca07a070: "",
          Djcca07a080: "",
          Djcca07a090: "",
          Djcca07a100: "",
        };
    },
    del() {
      if (this.tbid == "") {
        this.$confirm("请选择要删除的数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        contractunitDelete({ id: this.tbid }).then((res) => {
          // console.log(res, "删除");
          if (res.status) {
            this.$message({ message: "已删除！", type: "success" });
            this.tableData = [];
            this.getList();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    modification(row) {
      // if (this.tbid == "") {
      //   this.$confirm("请选择要修改的数据", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   });
      // } else {
      this.dialogData.title = "修改数据";
      this.dialogVisible = true;
      this.type = 2;
      this.tbid = row.id;
      this.dialogData.dialogVisible = true;

      this.formData.Did = row.id; //隐患点编号 need
      this.formData.Djcca07a010 = row.jcca07a010;
      this.formData.Djcca07a020 = row.jcca07a020;
      this.formData.Djcca07a030 = row.jcca07a030;
      this.formData.Djcca07a040 = row.jcca07a040;
      this.formData.Djcca07a050 = row.jcca07a050;
      this.formData.Djcca07a060 = row.jcca07a060;
      this.formData.Djcca07a070 = row.jcca07a070;
      this.formData.Djcca07a080 = row.jcca07a080;
      this.formData.Djcca07a090 = row.jcca07a090;
      this.formData.Djcca07a100 = row.jcca07a100;
      // }
    },
    Export() {
      alert("导出");
    },
    getList(val) {
      let self = this;
      this.tableLoading = true;
      self.tableData = [];
      let getlimit = 20;
      let getpage = 1;
      if (val) {
        getlimit = val.limit;
        getpage = val.page;
      }
      let pam = {
        unitName: this.queryData.unitName,
        size: getlimit,
        page: getpage,
      };
      // console.log(pam, "提交数据");
      contractunit(pam).then((res) => {
        if (res.status) {
          self.tableData = [];
          console.log(res, "查询数据");
          //单位编号
          // jcca07a010	string
          // 单位编号

          // jcca07a020	string
          // 单位名称

          // jcca07a030	string
          // 单位通讯地址

          // jcca07a040	string
          // 单位负责人

          // jcca07a050	string
          // 联系人

          // jcca07a060	string
          // 电话

          // jcca07a070	string
          // 传真

          // jcca07a080	string
          // 手机

          // jcca07a090	string
          // 邮箱

          // jcca07a100	string
          // 备注
          res.data.forEach((val, index, arr) => {
            self.tableData.push({
              id: val.id,
              jcca07a010: val.jcca07a010,
              jcca07a020: val.jcca07a020,
              jcca07a030: val.jcca07a030,
              jcca07a040: val.jcca07a040,
              jcca07a050: val.jcca07a050,
              jcca07a060: val.jcca07a060,
              jcca07a070: val.jcca07a070,
              jcca07a080: val.jcca07a080,
              jcca07a090: val.jcca07a090,
              jcca07a100: val.jcca07a100,
            });
          });
        }
        self.total = res.total;
        self.tableLoading = false;
      });
    },

    //重置查询条件
    resetList() {
      for (let key in this.queryData) {
        this.queryData[key] = null;
      }
      this.pageNo = 1;
      this.pageSize = 20;
      this.getList();
    },

    //导出
    handleExport(id) {
      if (id) {
        //id 为真导出单个站点
      }
    },
    // 编辑确定
    confirm() {
      let that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //获取新增值
          let pam = {
            jcca07a010: that.formData.Djcca07a010,
            jcca07a020: that.formData.Djcca07a020,
            jcca07a030: that.formData.Djcca07a030,
            jcca07a040: that.formData.Djcca07a040,
            jcca07a050: that.formData.Djcca07a050,
            jcca07a060: that.formData.Djcca07a060,
            jcca07a070: that.formData.Djcca07a070,
            jcca07a080: that.formData.Djcca07a080,
            jcca07a090: that.formData.Djcca07a090,
            jcca07a100: that.formData.Djcca07a100,
          };
          if (this.type == 1) {
            //新增加
            contractunitAdd(pam)
              .then((res) => {
                // console.log(res, "新增返回值");
                if (res.status) {
                  that.$message({ message: "新增成功！", type: "success" });
                  that.dialogVisible = false;
                  that.tableData = [];
                  that.getList();
                  for (let key in that.formData) {
                    that.formData[key] = "";
                  }
                } else {
                  that.$message.error(res.msg);
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          } else if (this.type == 2) {
            pam.id = that.formData.Did;
            contractunitUpdate(pam)
              .then((res) => {
                // console.log(res, "修改返回值");
                if (res.status) {
                  that.$message({ message: "修改成功！", type: "success" });
                  that.dialogVisible = false;
                  that.tableData = [];
                  that.getList();
                  for (let key in that.formData) {
                    that.formData[key] = "";
                  }
                } else {
                  that.$message.error(res.msg);
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // let page = this;
      // page.dialogVisible = false;
      // jcca02aUpdate(page.formData).then((res) => {
      //   page.$message({ message: "修改成功！", type: "success" });
      //   page.getList();
      // });
    },
    // 关闭
    handleClose(done) {
      this.dialogVisible = false;
      this.$refs["form"].resetFields();
    },
    // 点击选项获取行数据
    getRow(row) {
      if (row.length > 1) {
        this.$message("暂时只能选中一条！");
        this.$refs.Table.toggleRowSelection(row[1], false);
      }
      if (row.length == 1) {
        // console.log(row, "表格行", row.length);
        this.tbid = row[0].id;
        this.dialogData.dialogVisible = true;

        this.formData.Did = row[0].id; //隐患点编号 need
        this.formData.Djcca07a010 = row[0].jcca07a010;
        this.formData.Djcca07a020 = row[0].jcca07a020;
        this.formData.Djcca07a030 = row[0].jcca07a030;
        this.formData.Djcca07a040 = row[0].jcca07a040;
        this.formData.Djcca07a050 = row[0].jcca07a050;
        this.formData.Djcca07a060 = row[0].jcca07a060;
        this.formData.Djcca07a070 = row[0].jcca07a070;
        this.formData.Djcca07a080 = row[0].jcca07a080;
        this.formData.Djcca07a090 = row[0].jcca07a090;
        this.formData.Djcca07a100 = row[0].jcca07a100;
      }
      if (row.length == 0) {
        this.tbid = "";
        this.formData = {
          Did: "",
          Djcca07a010: "",
          Djcca07a020: "",
          Djcca07a030: "",
          Djcca07a040: "",
          Djcca07a050: "",
          Djcca07a060: "",
          Djcca07a070: "",
          Djcca07a080: "",
          Djcca07a090: "",
          Djcca07a100: "",
        };
      }
    },
    clickDistrictShow() {
      this.districtShow = true;
    },
     // 滚动事件
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop = this.$refs.tableList.bodyWrapper.scrollTop;
        let scrollHeight = this.$refs.tableList.bodyWrapper.scrollHeight;
        let scrollHeight111 = this.$refs.tableList.scrollHeight;
        let clientHeight = this.$refs.tableList.bodyWrapper.clientHeight;
        if(scrollTop + clientHeight  >= scrollHeight){
          if(this.pageSize * this.pageNo > this.total){
          return false
        }else{
          this.pageNo = this.pageNo + 1 //显示条数新增
          this.getList() //请求列表list 接口方法
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
  },
};
</script>
<style type="text/scss" lang="scss" scoped>
.tableCon {
  padding: 0 10px;
}
td{
  line-height: 38px;
}
</style>
<style type="text/scss" lang="scss">
.app-container-body {
  .el-table {
    .cell {
      line-height: normal;
      white-space: normal;
    }
  }
}
.btn_cont {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
</style>
