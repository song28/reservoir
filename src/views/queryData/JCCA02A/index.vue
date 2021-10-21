<template>
  <div class="app-container app-container-noHeader">
    <!--<div class="app-container-header">-->
    <!--站点总数：<span class="font-blue">{{query.total}}</span>&nbsp; 个-->
    <!--</div>-->
    <div class="app-container-search">
      <filter-toggler @query="getList" @reset="resetList" @export="handleExport(0)" @add="add" :hasMore="false" :hasExport="false" :hasAdd="true">
        <template slot="first-line">
          <!-- <el-form-item label="行政区">
            <div class="district_cont">
              <div class="district_input" @click="clickDistrictShow()">{{queryData.area}}</div>
              <District @getDistrictDate="getDistrictDate" v-if="districtShow"></District>
            </div>
          </el-form-item> -->
          <el-form-item label="隐患点名称">
            <el-input v-model="queryData.name" size="mini" placeholder="请输入名称或编码"></el-input>
          </el-form-item>
          <el-form-item label="监测阶段">
            <el-radio-group v-model="queryData.jieduan" size="mini">
              <el-radio-button :label="null">全部</el-radio-button>
              <el-radio-button v-for="item in monitorSteps" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监测级别">
            <el-radio-group v-model="queryData.jibie" size="mini">
              <el-radio-button :label="null">全部</el-radio-button>
              <el-radio-button v-for="item in warnLevels" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
            </el-radio-group>
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
      <el-table :data="tableData" v-loading="loading" border highlight-current-row :height="tableHeight" @selection-change="getRow" ref="Table">
        <!--<el-table-column type="selection" align="center" width="55"></el-table-column>-->
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{ (pageNo - 1) * pageSize + (scope.$index + 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行政区" align="center" prop="township" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="地址" align="center" prop="address" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="隐患点名称" :show-overflow-tooltip="true" align="center" prop="hiddenPointName"></el-table-column>
        <el-table-column label="隐患点编号" width="180" align="center" prop="hiddenPointId"></el-table-column>
        <el-table-column label="经度" :show-overflow-tooltip="true" align="center" prop="lat"></el-table-column>
        <el-table-column label="纬度" :show-overflow-tooltip="true" align="center" prop="lng"></el-table-column>
        <el-table-column label="群测群防监测点数" :show-overflow-tooltip="true" align="center" prop="jcca02a020"></el-table-column>
        <el-table-column label="专业监测点数" :show-overflow-tooltip="true" align="center" prop="jcca02a030"></el-table-column>
        <el-table-column label="监测阶段" :show-overflow-tooltip="true" align="center" prop="jcca02a040"></el-table-column>
        <el-table-column label="防灾预案编制情况" :show-overflow-tooltip="true" align="center" prop="jcca02a050"></el-table-column>
        <el-table-column label="监测级别" align="center" prop="jcca02a060" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="责任人姓名" align="center" prop="jcca05a020" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="职务" align="center" prop="jcca05a050" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="备注" :show-overflow-tooltip="true" align="center" prop="jcca02a080"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div><el-button type="primary" size="mini" @click="modification(scope.row)">修改</el-button></div>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="pageNo" :limit.sync="pageSize" @pagination="getList" />
    </div>
    <el-dialog :title="dialogData.title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" :close-on-click-modal="false">
      <div style="padding: 0 20px">
        <el-form ref="form" label-position="right" :model="formData" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="行政区" label-width="140px" prop="Dtownship">
                <el-input v-model="formData.Dtownship" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址" label-width="140px" prop="Daddress">
                <el-input v-model="formData.Daddress" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="经度" label-width="140px" prop="Dlat">
                <el-input v-model="formData.Dlat" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纬度" label-width="140px" prop="Dlng">
                <el-input v-model="formData.Dlng" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="隐患点名称" label-width="140px" prop="DhiddenPointName">
                <el-input v-model="formData.DhiddenPointName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="type == '2'" label="隐患点编号" label-width="140px" prop="DhiddenPointId">
                <el-input disabled v-model="formData.DhiddenPointId" size="mini"></el-input>
              </el-form-item>
              <el-form-item v-if="type == '1'" label="隐患点编号" label-width="140px" prop="DhiddenPointId">
                <el-input v-model="formData.DhiddenPointId" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="群测群防监测点数" label-width="140px" prop="Djcca02a020">
                <el-input v-model="formData.Djcca02a020" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业检测点数" label-width="140px" prop="Djcca02a030">
                <el-input v-model="formData.Djcca02a030" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监测阶段" label-width="140px">
                <el-radio-group v-model="formData.Djcca02a040" size="mini">
                  <el-radio-button v-for="item in monitorSteps" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="防灾预案编制情况" label-width="140px">
                <el-input v-model="formData.Djcca02a050" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监测等级" label-width="140px">
                <el-radio-group v-model="formData.Djcca02a060" size="mini">
                  <el-radio-button v-for="item in warnLevels" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" label-width="140px">
                <el-input v-model="formData.Djcca02a080" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-form-item label="责任人姓名" label-width="140px" prop="jcca05a020">
              <el-input v-model="formData.jcca05a020" size="mini"></el-input>
            </el-form-item>
          </el-col>-->
          </el-row>
          <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="职务" label-width="140px" prop="jcca05a050">
              <el-input v-model="formData.jcca05a050" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" label-width="140px">
              <el-input v-model="formData.jcca02a080" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
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
    <!-- <site-dialog :data="dialogData" v-if="dialogData.dialogVisible" @on-close="dialogData.dialogVisible = false" ></site-dialog> -->
  </div>
</template>

<script>
import { getIOTSQL, getIOTSQLPage } from "@/utils/sqlAjaxUtil";
import { getitemsbydict } from "@/api/deviceBase";
//新增隐患点信息hiddendangers,add
import { getInstallList, jcca02aUpdate, hiddendangers, add, update, delInfo, getTjHdpList } from "../api";
import siteDialog from "../components/dialog";
import District from "@/common/district";

export default {
  components: {
    siteDialog,
    District,
  },
  data() {
    return {
      tbid: "", //表格id用来判断是否选中行
      tbhiddenPointId: "",
      rowOld: [], //未修改的行的数据
      type: 0, //1增加，2修改
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      loading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 50,
      monitorSteps: [
        { name: "前期", value: "前期" },
        { name: "中期", value: "中期" },
        { name: "后期", value: "后期" },
      ],
      warnLevels: [
        { name: "小型", value: "小型" },
        { name: "中型", value: "中型" },
        { name: "大型", value: "大型" },
      ],
      pageNo: 1,
      pageNN: 1,
      pageSize: 20,
      total: 0,
      queryData: {
        area: null,
        addvcd: null,
        name: null,
        jieduan: null,
        jibie: null,
      },

      listQuery: {},
      list: [],
      tableLoading: false,

      tableData: [],
      dialogData: {
        name: "install",
        device: null,
        title: null,
        dialogVisible: false,
      },

      districtShow: false,
      district_data: {},
      showData: {
        add: true,
        modification: true,
        del: false,
        export: false,
        importData: false,
      },
      dialogVisible: false,
      formData: {
        Dlat: "",
        Dlng: "",
        Did: "",
        DhiddenPointId: "", //隐患点编号 need
        DhiddenPointName: "", //隐患点名称  need
        Djcca02a020: "", //群测
        Djcca02a030: "", //专业
        Djcca02a040: "", //监测
        Djcca02a050: "", //防灾
        Djcca02a060: "", //监测级别
        Djcca02a080: "", //备注
        Djcca05a020: "", //责任人
        Djcca05a050: "", //职责
        Dtownship: "", //行政区
        Daddress: "", //地址 need
      },
      rules: {
        Dlat: [{ required: true, message: "请输入该地址的经度", trigger: "blur" }],
        Dlng: [{ required: true, message: "请输入该地址的纬度", trigger: "blur" }],
        DhiddenPointName: [{ required: true, message: "请输入隐患点名称", trigger: "blur" }],
        Daddress: [{ required: false, message: "请输入详细地址", trigger: "blur" }],
        Dtownship: [{ required: false, message: "请输入行政区", trigger: "blur" }],
        DhiddenPointId: [{ required: true, message: "请输入隐患点id", trigger: "blur" }],
        Djcca05a020: [{ required: false, message: "请输入责任人", trigger: "blur" }],
        Djcca05a050: [{ required: false, message: "请输入职责", trigger: "blur" }],
        Djcca02a020: [
          {
            type: "number",
            trigger: "blur",
            required: false,
            message: "请输入数字",
            transform(value) {
              return _.toNumber(value);
            },
          },
        ],
        Djcca02a030: [
          {
            type: "number",
            trigger: "blur",
            required: false,
            message: "请输入数字",
            transform(value) {
              return _.toNumber(value);
            },
          },
        ],
      },
      rowData: {},
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getList();
      let self = this;
          self.$refs.Table.bodyWrapper
      .addEventListener("scroll", self.throttle(self.handleScroll, 3000), true);

    });
  },
  methods: {
    // 新增
    add() {
      this.dialogData.title = "新增数据";
      this.dialogVisible = true;
      this.type = 1;
      this.tbid = "";
        this.formData = {
          Did: "",
          DhiddenPointId: "", //隐患点编号 need
          DhiddenPointName: "", //隐患点名称  need
          Djcca02a020: "", //群测
          Djcca02a030: "", //专业
          Djcca02a040: "", //监测
          Djcca02a050: "", //防灾
          Djcca02a060: "", //监测级别
          Djcca02a080: "", //备注
          Djcca05a020: "", //责任人
          Djcca05a050: "", //职责
          Dtownship: "", //行政区
          Daddress: "", //地址 need
        };
    },
    // 删除
    del() {
      if (this.tbid == "") {
        this.$confirm("请选择要删除的数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        delInfo({ hiddenPointId: this.tbhiddenPointId }).then((res) => {
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
    // 修改
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
      this.tbhiddenPointId = row.hiddenPointId; //隐患点id 删除用的
      this.dialogData.dialogVisible = true;
      this.tbid = row.id;
      this.formData.DhiddenPointId = row.hiddenPointId; //隐患点编号 need
      this.formData.DhiddenPointName = row.hiddenPointName; //隐患点编号 need
      this.formData.Did = row.id; //隐患点编号 need
      this.formData.Dlat = row.lat; //隐患点编号 need
      this.formData.Dlng = row.lng; //隐患点编号 need
      this.formData.Djcca02a020 = row.jcca02a020; //隐患点编号 need
      this.formData.Djcca02a030 = row.jcca02a030; //隐患点编号 need
      this.formData.Djcca02a040 = row.jcca02a040; //隐患点编号 need
      this.formData.Djcca02a050 = row.jcca02a050; //隐患点编号 need
      this.formData.Djcca02a060 = row.jcca02a060; //隐患点编号 need
      this.formData.Djcca02a080 = row.jcca02a080; //隐患点编号 need
      this.formData.Djcca05a020 = row.jcca05a020; //隐患点编号 need
      this.formData.Djcca05a050 = row.jcca05a050; //隐患点编号 need
      this.formData.Dtownship = row.township; //隐患点编号 need
      this.formData.Daddress = row.address; //隐患点编号 need
      // }
    },
    Export() {
      this.$message("导出！");
    },
    // 编辑确定
    confirm() {
      let that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //获取新增值
          let pam = {
            lat: that.formData.Dlat, //need
            lng: that.formData.Dlng, //need
            address: that.formData.Daddress,
            hiddenPointId: that.formData.DhiddenPointId, //隐患点编号
            hiddenPointName: that.formData.DhiddenPointName, //隐患点名称
            jcca02a020: that.formData.Djcca02a020, //群测
            jcca02a030: that.formData.Djcca02a030, //专业
            jcca02a040: that.formData.Djcca02a040, //监测
            jcca02a050: that.formData.Djcca02a050, //防灾
            jcca02a060: that.formData.Djcca02a060, //监测级别
            jcca02a080: that.formData.Djcca02a080, //备注
            jcca05a020: that.formData.Djcca05a020, //责任人
            jcca05a050: that.formData.Djcca05a050, //职责
            township: that.formData.Dtownship, //行政区
          };
          if (this.type == 1) {
            //新增加
            add(pam)
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
              });
          } else if (this.type == 2) {
            pam.id = that.formData.Did;
            update(pam)
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
        this.tbhiddenPointId = row[0].hiddenPointId; //隐患点id 删除用的
        this.dialogData.dialogVisible = true;
        this.tbid = row.id;
        this.formData.DhiddenPointId = row[0].hiddenPointId; //隐患点编号 need
        this.formData.DhiddenPointName = row[0].hiddenPointName; //隐患点编号 need
        this.formData.Did = row[0].id; //隐患点编号 need
        this.formData.Dlat = row[0].lat; //隐患点编号 need
        this.formData.Dlng = row[0].lng; //隐患点编号 need
        this.formData.Djcca02a020 = row[0].jcca02a020; //隐患点编号 need
        this.formData.Djcca02a030 = row[0].jcca02a030; //隐患点编号 need
        this.formData.Djcca02a040 = row[0].jcca02a040; //隐患点编号 need
        this.formData.Djcca02a050 = row[0].jcca02a050; //隐患点编号 need
        this.formData.Djcca02a060 = row[0].jcca02a060; //隐患点编号 need
        this.formData.Djcca02a080 = row[0].jcca02a080; //隐患点编号 need
        this.formData.Djcca05a020 = row[0].jcca05a020; //隐患点编号 need
        this.formData.Djcca05a050 = row[0].jcca05a050; //隐患点编号 need
        this.formData.Dtownship = row[0].township; //隐患点编号 need
        this.formData.Daddress = row[0].address; //隐患点编号 need
      }
      if (row.length == 0) {
        this.tbid = "";
        this.formData = {
          Did: "",
          DhiddenPointId: "", //隐患点编号 need
          DhiddenPointName: "", //隐患点名称  need
          Djcca02a020: "", //群测
          Djcca02a030: "", //专业
          Djcca02a040: "", //监测
          Djcca02a050: "", //防灾
          Djcca02a060: "", //监测级别
          Djcca02a080: "", //备注
          Djcca05a020: "", //责任人
          Djcca05a050: "", //职责
          Dtownship: "", //行政区
          Daddress: "", //地址 need
        };
      }
    },
    clickDistrictShow() {
      this.districtShow = true;
    },
    getDistrictDate(data) {
      if (data) {
        this.district_data = data;
      }
      this.districtShow = false;
      this.queryData.addvcd = data.addvnm;
      this.queryData.area = data.addvnm;
    },
    // 获取列表
    getList(val) {
      let self = this;
      this.tableLoading = true;
      self.tableData = [];
      let getlimit = 20;
      let getpage = this.pageNN;
      if (val) {
        getlimit = val.limit;
        getpage = val.page;
        this.pageNN = val.page;
      }
      let pam = {
        area: this.queryData.area,
        pointName: this.queryData.name,
        monitorStag: this.queryData.jieduan,
        monitorLevel: this.queryData.jibie,

        size: getlimit,
        page: getpage,
      };
      hiddendangers(pam).then((res) => {
        if (res.status) {
          self.tableData = [];
          res.data.forEach((val, index, arr) => {
            let responsiblePerson = val.jcca05a020;
            let responsibility = val.jcca05a050;
            if (responsiblePerson == null) {
              responsiblePerson = "--";
            }
            if (responsibility == null) {
              responsibility = "--";
            }
            self.tableData.push({
              hiddenPointId: val.hiddenPointId, //隐患点编号
              hiddenPointName: val.hiddenPointName, //隐患点名称
              lat: val.lat,
              lng: val.lng,
              id: val.id,
              jcca02a020: val.jcca02a020, //群测
              jcca02a030: val.jcca02a030, //专业
              jcca02a040: val.jcca02a040, //监测
              jcca02a050: val.jcca02a050, //防灾
              jcca02a060: val.jcca02a060, //监测级别
              jcca02a080: val.jcca02a080, //备注
              jcca05a020: responsiblePerson, //责任人
              jcca05a050: responsibility, //职责
              township: val.township, //行政区
              address: val.address,
            });
          });
        } else {
          // this.pageNN = 1;
          // this.getList();
        }
        self.total = res.total;
        self.tableLoading = false;
      });
    },
    // getDicts(id, key) {
    //   //efacb5e2-0f64-4152-a0b8-f108c21596f8 隐患点级别
    //   let params = { pid: id };
    //   let self = this;
    //   self.tableLoading = true;
    //   getitemsbydict(params).then(res => {
    //     self.$set(self.queryConstData, key, res.data);
    //   });
    // },
    //重置查询条件
    resetList() {
      for (let key in this.queryData) {
        this.queryData[key] = null;
      }
      this.pageNo = 1;
      this.pageSize = 20;
      this.pageNN = 1;
      this.getList();
    },

    //导出
    handleExport(id) {
      if (id) {
        //id 为真导出单个站点
      }
    },
    //切到下一页
    nextPage(){
      if(this.$refs.Table.bodyWrapper.scrollTop == this.$refs.Table.bodyWrapper.scrollHeight){
    }
    },
    // 滚动事件
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop = this.$refs.Table.bodyWrapper.scrollTop;
        let scrollHeight = this.$refs.Table.bodyWrapper.scrollHeight;
        let scrollHeight111 = this.$refs.Table.scrollHeight;
        let clientHeight = this.$refs.Table.bodyWrapper.clientHeight;
        if(scrollTop + clientHeight  >= scrollHeight){
          if(this.pageSize * this.pageNo > this.total){
          return false
        }else{
          this.pageNo = this.pageNo + 1 //显示条数新增
          this.getList() //请求列表list 接口方法
          this.$refs.Table.bodyWrapper.scrollTop = 0;
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
  // watch: {
  //   district_data(val) {
  //     if (val) {
  //       this.queryData.addvcd = val.addvnm;
  //       // this.getList();
  //     }
  //   },
  // },
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
.district_cont {
  position: relative;
  width: 160px;
  margin: 0 10px;
  .district_input {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: inherit;
    padding: 0 10px;
    // outline: none;
    // pointer-events:none;
  }
}
.el-col-12 {
  height: 60px;
}
// .el-dialog {
//   .el-form {
//     padding-top: 10px;
//     .el-form-item {
//       margin: 5px 0;
//     }
//   }
// }
.btn_cont {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
.app-container-body {
  .el-table {
    .cell {
      line-height: normal;
      white-space: normal;
    }
  }
}
</style>
