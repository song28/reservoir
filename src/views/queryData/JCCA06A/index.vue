<template>
  <div class="app-container app-container-noHeader">
    <div class="app-container-search">
      <filter-toggler
        @query="getList"
        @reset="resetList"
        @export="handleExport(0)"
        @add="add"
        :hasAdd="true"
        :hasMore="false"
        :hasExport="false"
      >
        <template slot="first-line">
          <el-form-item label="单位名称">
            <el-input
              v-model="queryData.unitName"
              placeholder="请输入名称"
              size="mini"
            ></el-input>
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
      <el-table
        ref="tableList"
        :data="tableData"
        v-loading="loading"
        border
        highlight-current-row
        :height="tableHeight"
        @selection-change="getRow"
      >
        <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ (pageNo - 1) * pageSize + (scope.$index + 1) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="单位编号" align="center" width="160" prop="JCCA06A010"></el-table-column> -->
        <el-table-column
          label="单位名称"
          align="center"
          prop="jcca06a020"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="上级主管单位"
          align="center"
          width="160"
          prop="jcca06a030"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="单位通讯地址"
          align="center"
          prop="jcca06a040"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="单位负责人"
          align="center"
          prop="jcca06a050"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="联系人"
          align="center"
          prop="jcca06a060"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="电话" align="center" prop="jcca06a070"></el-table-column>
        <el-table-column label="传真" align="center" prop="jcca06a080"></el-table-column>
        <el-table-column
          label="手机"
          align="center"
          prop="jcca06a090"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          align="center"
          prop="jcca06a100"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="备注"
          align="center"
          prop="jcca06a110"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="mini" @click="modification(scope.row)"
                >修改</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page.sync="pageNo"
        :limit.sync="pageSize"
        @pagination="getList"
      />
    </div>

    <el-dialog
      :title="dialogData.title"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div style="padding: 0 20px" v-if="dialogVisible">
        <el-form
          ref="form"
          :model="formData"
          label-position="right"
          :rules="rules"
          label-width="80px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位名称" label-width="140px" prop="Djcca06a020">
                <el-input v-model="formData.Djcca06a020" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级主管单位" label-width="140px" prop="Djcca06a030">
                <el-input v-model="formData.Djcca06a030" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位通讯地址" label-width="140px" prop="Djcca06a040">
                <el-input v-model="formData.Djcca06a040" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位负责人" label-width="140px" prop="Djcca06a050">
                <el-input v-model="formData.Djcca06a050" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人" label-width="140px" prop="Djcca06a060">
                <el-input v-model="formData.Djcca06a060" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" label-width="140px" prop="Djcca06a070">
                <el-input v-model="formData.Djcca06a070" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="传真" label-width="140px" prop="Djcca06a080">
                <el-input v-model="formData.Djcca06a080" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机" label-width="140px" prop="Djcca06a090">
                <el-input v-model="formData.Djcca06a090" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" label-width="140px" prop="Djcca06a100">
                <el-input v-model="formData.Djcca06a100" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" label-width="140px" prop="Djcca06a110">
                <el-input v-model="formData.Djcca06a110" size="mini"></el-input>
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
//buildunit建设
import {
  getInstallList,
  buildunit,
  buildunitAdd,
  buildunitUpdate,
  buildunitDelete,
} from "../api";
import siteDialog from "../components/dialog";
export default {
  components: {
    siteDialog,
  },
  data() {
    return {
      type: 0, //1增加，2修改
      loading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 50,
      dialogVisible: false,
      pageNo: 1,
      pageSize: 20,
      total: 0,
      queryData: { unitName: null },
      tableLoading: false,
      total: 0,
      tableData: [],
      showData: {
        add: true,
        modification: true,
        del: false,
        export: false,
        importData: false,
      },
      dialogData: {
        name: "install",
        device: null,
        title: null,
        dialogVisible: false,
      },
      formData: {
        Did: "",
        Djcca06a010: "",
        Djcca06a020: "",
        Djcca06a030: "",
        Djcca06a040: "",
        Djcca06a050: "",
        Djcca06a060: "",
        Djcca06a070: "",
        Djcca06a080: "",
        Djcca06a090: "",
        Djcca06a100: "",
        Djcca06a110: "",
      },

      // jcca06a010	string 单位编号
      // jcca06a020	string单位名称
      // jcca06a030	string上级主管单位
      // jcca06a040	string单位通讯地址
      // jcca06a050	string单位负责人
      // jcca06a060	string 联系人
      // jcca06a070	string 电话
      // jcca06a080	string传真
      // jcca06a090	string 手机
      // jcca06a100	string 邮箱
      // jcca06a110	string 备注
      rules: {
        Djcca06a010: [{ required: false, message: "请输入单位编号", trigger: "blur" }],
        Djcca06a020: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
        Djcca06a030: [
          { required: false, message: "请输入上级主管单位", trigger: "blur" },
        ],
        Djcca06a040: [
          { required: false, message: "请输入单位通讯地址", trigger: "blur" },
        ],
        Djcca06a050: [{ required: false, message: "请输入单位负责人", trigger: "blur" }],

        Djcca06a060: [{ required: false, message: "请输入联系人", trigger: "blur" }],
        Djcca06a070: [{ required: false, message: "请输入电话", trigger: "blur" }],
        Djcca06a080: [{ required: false, message: "请输入传真", trigger: "blur" }],
        Djcca06a090: [{ required: false, message: "请输入手机", trigger: "blur" }],
        Djcca06a100: [{ required: false, message: "请输入邮箱", trigger: "blur" }],
        Djcca06a110: [{ required: false, message: "请输入备注", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getList();
      let self = this;

      self.$refs.tableList.bodyWrapper.addEventListener(
        "scroll",
        self.throttle(self.handleScroll, 3000),
        true
      );
    });
  },
  methods: {
    add() {
      this.dialogData.title = "新增数据";
      this.dialogVisible = true;
      this.type = 1;
    },
    del() {
      if (this.tbid == "") {
        this.$confirm("请选择要删除的数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        buildunitDelete({ id: this.tbid }).then((res) => {
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
      this.formData.Djcca06a010 = row.jcca06a010;
      this.formData.Djcca06a020 = row.jcca06a020;
      this.formData.Djcca06a030 = row.jcca06a030;
      this.formData.Djcca06a040 = row.jcca06a040;
      this.formData.Djcca06a050 = row.jcca06a050;
      this.formData.Djcca06a060 = row.jcca06a060;
      this.formData.Djcca06a070 = row.jcca06a070;
      this.formData.Djcca06a080 = row.jcca06a080;
      this.formData.Djcca06a090 = row.jcca06a090;
      this.formData.Djcca06a100 = row.jcca06a100;
      this.formData.Djcca06a110 = row.jcca06a110;
      // }
    },
    Export() {
      alert("导出");
    },
    // 编辑确定
    confirm() {
      let that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //获取新增值
          let pam = {
            jcca06a010: that.formData.Djcca06a010,
            jcca06a020: that.formData.Djcca06a020,
            jcca06a030: that.formData.Djcca06a030,
            jcca06a040: that.formData.Djcca06a040,
            jcca06a050: that.formData.Djcca06a050,
            jcca06a060: that.formData.Djcca06a060,
            jcca06a070: that.formData.Djcca06a070,
            jcca06a080: that.formData.Djcca06a080,
            jcca06a090: that.formData.Djcca06a090,
            jcca06a100: that.formData.Djcca06a100,
            jcca06a110: that.formData.Djcca06a110,
          };
          if (this.type == 1) {
            //新增加
            buildunitAdd(pam)
              .then((res) => {
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
            buildunitUpdate(pam)
              .then((res) => {
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
      buildunit(pam).then((res) => {
        if (res.status) {
          self.tableData = [];
          res.data.forEach((val, index, arr) => {
            self.tableData.push({
              id: val.id,
              jcca06a010: val.jcca06a010,
              jcca06a020: val.jcca06a020,
              jcca06a030: val.jcca06a030,
              jcca06a040: val.jcca06a040,
              jcca06a050: val.jcca06a050,
              jcca06a060: val.jcca06a060,
              jcca06a070: val.jcca06a070,
              jcca06a080: val.jcca06a080,
              jcca06a090: val.jcca06a090,
              jcca06a100: val.jcca06a100,
              jcca06a110: val.jcca06a110,
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
        this.tbid = row[0].id;
        this.dialogData.dialogVisible = true;

        this.formData.Did = row[0].id; //隐患点编号 need
        this.formData.Djcca06a010 = row[0].jcca06a010;
        this.formData.Djcca06a020 = row[0].jcca06a020;
        this.formData.Djcca06a030 = row[0].jcca06a030;
        this.formData.Djcca06a040 = row[0].jcca06a040;
        this.formData.Djcca06a050 = row[0].jcca06a050;
        this.formData.Djcca06a060 = row[0].jcca06a060;
        this.formData.Djcca06a070 = row[0].jcca06a070;
        this.formData.Djcca06a080 = row[0].jcca06a080;
        this.formData.Djcca06a090 = row[0].jcca06a090;
        this.formData.Djcca06a100 = row[0].jcca06a100;
        this.formData.Djcca06a110 = row[0].jcca06a110;
      }
      if (row.length == 0) {
        this.tbid = "";
        this.formData = {
          Did: "",
          Djcca06a010: "",
          Djcca06a020: "",
          Djcca06a030: "",
          Djcca06a040: "",
          Djcca06a050: "",
          Djcca06a060: "",
          Djcca06a070: "",
          Djcca06a080: "",
          Djcca06a090: "",
          Djcca06a100: "",
          Djcca06a110: "",
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
