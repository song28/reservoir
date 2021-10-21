<template>
  <div class="app-container app-container-noHeader">
    <!--<div class="app-container-header">-->
    <!--站点总数：<span class="font-blue">{{query.total}}</span>&nbsp; 个-->
    <!--</div>-->
    <div class="app-container-search">
      <filter-toggler @query="getList" @reset="resetList" @export="handleExport(0)" @add="add" :hasAdd="true" :hasMore="false" :hasExport="false">
        <template slot="first-line">
          <!-- <el-form-item label="行政区">
            <div class="district_cont">
              <div class="district_input" @click="clickDistrictShow()">{{queryData.xingzhengqu}}</div>
              <District @getDistrictDate="getDistrictDate" v-if="districtShow"></District>
            </div>
          </el-form-item> -->
          <el-form-item label="隐患点名称">
            <el-input v-model="queryData.pointName" size="mini" placeholder="请输入名称或编码"></el-input>
          </el-form-item>
          <!-- <el-form-item label="监测类型">
            <el-radio-group v-model="queryData.monitorType" size="mini">
              <el-radio-button :label="null">全部</el-radio-button>
              <el-radio-button v-for="item in queryConstData.warnLevels" :key="item.val" :label="item.val">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="监测级别">
            <el-radio-group v-model="queryData.monitorLevel" size="mini">
              <el-radio-button :label="null">全部</el-radio-button>
              <el-radio-button v-for="item in queryConstData.monitorSteps" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </template>
      </filter-toggler>
    </div>
    <!-- <div class="app-container-search">
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
            <span>
              {{ (page - 1) * size + (scope.$index + 1) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="隐患点名称" align="center" prop="pointName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="隐患点编号" align="center" width="100" prop="jcca03a020" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="监测点名称" align="center" prop="jcca03a011" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="监测点编号" width="180" align="center" prop="jcca03a010" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="监测仪器编号" align="center" width="200" prop="jcca03a030" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column label="监测方法" width="60" align="center" prop="cca03a040"></el-table-column>-->
        <el-table-column label="监测部位" align="center" prop="jcca03a050" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="监测内容" :show-overflow-tooltip="true" align="center" prop="jcca03a060"></el-table-column>
        <el-table-column label="建设单位" :show-overflow-tooltip="true" align="center" prop="jcca03a140"></el-table-column>
        <el-table-column label="承建单位" :show-overflow-tooltip="true" align="center" prop="jcca03a150"></el-table-column>
        <el-table-column label="运行维护单位" :show-overflow-tooltip="true" align="center" prop="jcca03a151"></el-table-column>
        <!-- <el-table-column label="责任人" width="80" align="center" prop="dutyPerson"></el-table-column> -->
        <el-table-column label="监测级别" :show-overflow-tooltip="true" align="center" prop="jcca03a041"></el-table-column>
        <el-table-column label="备注"  :show-overflow-tooltip="true" align="center" prop="jcca03a170"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div><el-button type="primary" size="mini" @click="modification(scope.row)">修改</el-button></div>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="page" :limit.sync="size" @pagination="getList" />
    </div>
    <el-dialog :title="dialogData.title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" :close-on-click-modal="false">
      <div style="padding: 0 20px">
        <el-form ref="form" :model="formData" label-position="right" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="隐患点名称" label-width="140px" prop="DpointName">
                <!--<el-input v-model="formData.DpointName" size="mini"></el-input>-->
                <el-select v-model="formData.Djcca03a020" filterable placeholder="请选择" style="height: 28px; line-height: 28px">
                  <el-option v-for="item in hdpOptions" :key="item.label" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="隐患点编号" label-width="140px" prop="Djcca03a020">
                <!--<el-input v-model="formData.Djcca03a020" size="mini"></el-input>-->
                <el-select v-model="formData.Djcca03a020" filterable placeholder="请选择" disabled>
                  <el-option v-for="item in hdpOptions" :key="item.value" :label="item.value" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监测点名称" label-width="140px" prop="Djcca03a011">
                <el-input v-model="formData.Djcca03a011" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="type == '2'" label="监测点编号" label-width="140px" prop="Djcca03a010">
                <el-input disabled v-model="formData.Djcca03a010" size="mini"></el-input>
              </el-form-item>
              <el-form-item v-if="type == '1'" label="监测点编号" label-width="140px" prop="Djcca03a010">
                <el-input v-model="formData.Djcca03a010" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="type == '2'" label="监测仪器编号" label-width="140px" prop="Djcca03a030">
                <el-input disabled v-model="formData.Djcca03a030" size="mini"></el-input>
              </el-form-item>
              <el-form-item v-if="type == '1'" label="监测仪器编号" label-width="140px" prop="Djcca03a030">
                <el-input v-model="formData.Djcca03a030" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监测方法" label-width="140px" prop="Djcca03a040">
                <el-input v-model="formData.Djcca03a040" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监测部位" label-width="140px" prop="Djcca03a050">
                <el-input v-model="formData.Djcca03a050" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监测内容" label-width="140px" prop="Djcca03a060">
                <el-input v-model="formData.Djcca03a060" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监测级别" label-width="140px" prop="Djcca03a041">
                <el-radio-group v-model="formData.Djcca03a041" size="mini">
                  <el-radio-button v-for="item in queryConstData.monitorSteps" :key="item.value" :label="item.value">{{ item.name }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建设单位" label-width="140px" prop="Djcca03a140">
                <!--<el-input v-model="formData.Djcca03a140" size="mini"></el-input>-->
                <el-select v-model="formData.Djcca03a140" filterable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="承建单位" label-width="140px" prop="Djcca03a150">
                <!--<el-input v-model="formData.Djcca03a150" size="mini"></el-input>-->
                <el-select v-model="formData.Djcca03a150" filterable placeholder="请选择">
                  <el-option v-for="item in cjOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="维护单位" label-width="140px" prop="Djcca03a151">
                <!--<el-input v-model="formData.Djcca03a151" size="mini"></el-input>-->
                <el-select v-model="formData.Djcca03a151" filterable placeholder="请选择">
                  <el-option v-for="item in ywOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="责任人" label-width="140px" prop="DdutyPerson">
                <el-input v-model="formData.DdutyPerson" size="mini"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="备注" label-width="140px" prop="Djcca03a170">
                <el-input v-model="formData.Djcca03a170" size="mini"></el-input>
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
//monitorstation查询接口
import { getInstallList, monitorstation, monitorstationAdd, monitorstationUpdate, monitorstationDel, buildunit, contractunit, operationunit, hiddendangers } from "../api";
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
      dialogVisible: false,
      type: 0,
      loading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 50,
      queryConstData: {
        warnLevels: [
          { name: "雨量", val: "YL" },
          { name: "地表位移", val: "GP" },
          { name: "地表裂缝", val: "LF" },
        ],
        monitorSteps: [
          { name: "小型", value: "小型" },
          { name: "中型", value: "中型" },
          { name: "大型", value: "大型" },
        ],
      },
      page: 1,
      pageNN: 1,
      size: 20,
      total: 0,
      queryData: {
        //area 行政区 monitorLevel 监测等级 monitorType 监测类型 pointName 隐患点
        xingzhengqu: null,
        monitorLevel: null,
        monitorType: null,
        pointName: null,
      },
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
      formData: {
        DdutyPerson: "", //责任人
        Did: "",
        Djcca03a010: "", //监测编号
        Djcca03a011: "", //监测名称
        Djcca03a020: "", //隐患点编号
        Djcca03a030: "", //检测仪器编号
        Djcca03a040: "", //方法
        Djcca03a041: "", //级别
        Djcca03a050: "", //部位
        Djcca03a060: "", //内容
        Djcca03a140: "", //建设单位
        Djcca03a150: "", //承建单位
        Djcca03a151: "", //维护单位
        Djcca03a170: "", //备注
        DpointName: "", //隐患点名称
      },
      rules: {
        DdutyPerson: [{ required: false, message: "请输入责任人", trigger: "blur" }],
        DpointName: [{ required: false, message: "请输入隐患点名称", trigger: "blur" }],
        Djcca03a010: [{ required: true, message: "请输入监测编号", trigger: "blur" }],
        Djcca03a011: [{ required: true, message: "请输入监测名称", trigger: "blur" }],
        Djcca03a020: [{ required: true, message: "请输入隐患点编号", trigger: "blur" }],
        Djcca03a030: [{ required: false, message: "请输入监测仪器编号", trigger: "blur" }],
        Djcca03a040: [{ required: false, message: "请输入方法", trigger: "blur" }],
        Djcca03a041: [{ required: false, message: "请输入级别", trigger: "blur" }],
        Djcca03a050: [{ required: false, message: "请输入部位", trigger: "blur" }],
        Djcca03a060: [{ required: false, message: "请输入内容", trigger: "blur" }],

        Djcca03a140: [{ required: false, message: "请输入建设单位", trigger: "blur" }],
        Djcca03a150: [{ required: false, message: "请输入承建单位", trigger: "blur" }],
        Djcca03a151: [{ required: false, message: "请输入维护单位", trigger: "blur" }],
        Djcca03a170: [{ required: false, message: "请输入备注", trigger: "blur" }],
      },
      options: [],
      cjOptions: [],
      ywOptions: [],
      hdpOptions: [],
    };
  },
  mounted() {
    this.$nextTick(function () {
      // this.tableHeight =
      //   this.$refs.tab.clientHeight -
      //   38 -
      //   (window.innerWidth / 1920) * 100 * 0.54 +
      //   "px";

      // this.getDicts("d8e15c08-60c8-44e5-89f9-fa2049e3e24b", "warnLevels");
      // this.getDicts("cf1fcefb-ffa0-4cd8-86f0-501308afea20", "monitorSteps");
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
          DdutyPerson: "", //责任人
          Did: "",
          Djcca03a010: "", //监测编号
          Djcca03a011: "", //监测名称
          Djcca03a020: "", //隐患点编号
          Djcca03a030: "", //检测仪器编号
          Djcca03a040: "", //方法
          Djcca03a041: "", //级别
          Djcca03a050: "", //部位
          Djcca03a060: "", //内容
          Djcca03a140: "", //建设单位
          Djcca03a150: "", //承建单位
          Djcca03a151: "", //维护单位
          Djcca03a170: "", //备注
          DpointName: "", //隐患点名称
        };
      this.queryHiddendangers();
      this.queryBuild();
      this.queryContractunit();
      this.queryOperationunit();
    },
    del() {
      let that = this;
      if (this.tbid == "") {
        this.$confirm("请选择要删除的数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        monitorstationDel({ id: this.tbid }).then((res) => {
          if (res.status) {
            this.$message({ message: "已删除！", type: "success" });
            this.tableData = [];
            setTimeout(function () {
              that.getList();
            }, 1000);
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
      //     type: "warning"
      //   });
      // } else {
      let that = this;
      that.dialogData.title = "修改数据";
      that.dialogVisible = true;
      that.type = 2;
      that.tbid = row.id;
      that.formData.Did = row.id; //责任人
      that.formData.DdutyPerson = row.dutyPerson; //责任人
      that.formData.Djcca03a010 = row.jcca03a010; //监测编号
      that.formData.Djcca03a011 = row.jcca03a011; //监测名称
      that.formData.Djcca03a020 = row.jcca03a020; //隐患点编号
      that.formData.Djcca03a030 = row.jcca03a030; //检测仪器编号
      that.formData.Djcca03a040 = row.jcca03a040; //方法
      that.formData.Djcca03a041 = row.jcca03a041; //级别
      that.formData.Djcca03a050 = row.jcca03a050; //部位
      that.formData.Djcca03a060 = row.jcca03a060; //内容
      that.formData.Djcca03a140 = row.jcca03a140; //建设单位
      that.formData.Djcca03a150 = row.jcca03a150; //承建单位
      that.formData.Djcca03a151 = row.jcca03a151; //维护单位
      that.formData.Djcca03a170 = row.jcca03a170; //备注
      that.formData.DpointName = row[0].pointName; //隐患点名称
      this.queryHiddendangers();
      this.queryBuild();
      this.queryContractunit();
      this.queryOperationunit();
      // }
    },
    Export() {
      alert("导出");
    },
    getList(val) {
      
      let self = this;
      this.tableLoading = true;
      let getlimit = 20;
      self.tableData = [];
      let pam = {
        area: self.queryData.xingzhengqu,
        pointName: self.queryData.pointName,
        monitorType: self.queryData.monitorType,
        monitorLevel: self.queryData.monitorLevel,
        size: self.size,
        page: self.page,
      };
      monitorstation(pam).then((res) => {
        if (res.status) {
          self.tableData = [];
          res.data.forEach((val, index, arr) => {
            self.tableData.push({
              dutyPerson: val.dutyPerson, //责任人
              id: val.id,
              jcca03a010: val.jcca03a010, //监测编号
              jcca03a011: val.jcca03a011, //监测名称
              jcca03a020: val.jcca03a020, //隐患点编号
              jcca03a030: val.jcca03a030, //检测仪器编号
              jcca03a040: val.cca03a040, //方法
              jcca03a041: val.jcca03a041, //级别
              jcca03a050: val.jcca03a050, //部位
              jcca03a060: val.jcca03a060, //内容
              jcca03a140: val.jcca03a140, //建设单位
              jcca03a150: val.jcca03a150, //承建单位
              jcca03a151: val.jcca03a151, //维护单位
              jcca03a170: val.jcca03a170, //备注
              pointName: val.pointName, //隐患点名称
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

    // 点击选项获取行数据
    getRow(row) {
      let that = this;
      if (row.length > 1) {
        this.$message("暂时只能选中一条！");
        this.$refs.tableList.toggleRowSelection(row[1], false);
      }
      if (row.length == 1) {
        that.tbid = row[0].id;
        that.formData.Did = row[0].id; //责任人
        that.formData.DdutyPerson = row[0].dutyPerson; //责任人
        that.formData.Djcca03a010 = row[0].jcca03a010; //监测编号
        that.formData.Djcca03a011 = row[0].jcca03a011; //监测名称
        that.formData.Djcca03a020 = row[0].jcca03a020; //隐患点编号
        that.formData.Djcca03a030 = row[0].jcca03a030; //检测仪器编号
        that.formData.Djcca03a040 = row[0].jcca03a040; //方法
        that.formData.Djcca03a041 = row[0].jcca03a041; //级别
        that.formData.Djcca03a050 = row[0].jcca03a050; //部位
        that.formData.Djcca03a060 = row[0].jcca03a060; //内容
        that.formData.Djcca03a140 = row[0].jcca03a140; //建设单位
        that.formData.Djcca03a150 = row[0].jcca03a150; //承建单位
        that.formData.Djcca03a151 = row[0].jcca03a151; //维护单位
        that.formData.Djcca03a170 = row[0].jcca03a170; //备注
        that.formData.DpointName = row[0].pointName; //隐患点名称
      }
      if (row.length == 0) {
        this.tbid = "";
        this.formData = {
          DdutyPerson: "", //责任人
          Did: "",
          Djcca03a010: "", //监测编号
          Djcca03a011: "", //监测名称
          Djcca03a020: "", //隐患点编号
          Djcca03a030: "", //检测仪器编号
          Djcca03a040: "", //方法
          Djcca03a041: "", //级别
          Djcca03a050: "", //部位
          Djcca03a060: "", //内容
          Djcca03a140: "", //建设单位
          Djcca03a150: "", //承建单位
          Djcca03a151: "", //维护单位
          Djcca03a170: "", //备注
          DpointName: "", //隐患点名称
        };
      }
    },
    //重置查询条件
    resetList() {
      for (let key in this.queryData) {
        this.queryData[key] = null;
      }
      this.page = 1;
      this.size = 20;
      this.getList();
    },

    //导出
    handleExport(id) {
      if (id) {
        //id 为真导出单个站点
      }
    },
    clickDistrictShow() {
      this.districtShow = true;
    },
    // 关闭
    handleClose(done) {
      this.dialogVisible = false;
      this.$refs["form"].resetFields();
    },
    getDistrictDate(data) {
      if (data) {
        this.district_data = data;
      }
      this.districtShow = false;
      this.queryData.addvcd = data.addvnm;
      this.queryData.xingzhengqu = data.addvnm;
    },
    // 编辑确定
    confirm() {
      let that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //获取新增值
          let pam = {
            dutyPerson: that.formData.DdutyPerson, //责任人
            jcca03a010: that.formData.Djcca03a010, //监测编号
            jcca03a011: that.formData.Djcca03a011, //监测名称
            jcca03a020: that.formData.Djcca03a020, //隐患点编号
            jcca03a030: that.formData.Djcca03a030, //检测仪器编号
            jcca03a040: that.formData.Djcca03a040, //方法
            jcca03a041: that.formData.Djcca03a041, //级别
            jcca03a050: that.formData.Djcca03a050, //部位
            jcca03a060: that.formData.Djcca03a060, //内容
            jcca03a140: that.formData.Djcca03a140, //建设单位
            jcca03a150: that.formData.Djcca03a150, //承建单位
            jcca03a151: that.formData.Djcca03a151, //维护单位
            jcca03a170: that.formData.Djcca03a170, //备注
            pointName: that.formData.DpointName, //隐患点名称
            focusOnFlag: 0,
          };
          if (this.type == 1) {
            //新增加
            monitorstationAdd(pam)
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
            monitorstationUpdate(pam)
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
    //获取建设单位列表
    queryBuild() {
      let pam = {};
      let self = this;
      buildunit(pam).then((res) => {
        if (res.status) {
          if (res.data) {
            self.options = [];
            if (res.data.length > 0) {
              // self.formData.Djcca03a140 = ""
              res.data.forEach((d) => {
                self.options.push({ label: d.jcca06a020, value: d.jcca06a010 });
                if (self.formData.Djcca03a140 == d.jcca06a020) {
                  self.formData.Djcca03a140 = d.jcca06a010;
                }
              });
            }
          }
        }
      });
    },
    //获取承建单位列表
    queryContractunit() {
      let pam = {};
      let self = this;
      contractunit(pam).then((res) => {
        if (res.status) {
          if (res.data) {
            self.cjOptions = [];
            if (res.data.length > 0) {
              res.data.forEach((d) => {
                self.cjOptions.push({ label: d.jcca07a020, value: d.jcca07a010 });
                if (self.formData.Djcca03a150 == d.jcca07a020) {
                  self.formData.Djcca03a150 = d.jcca07a010;
                }
              });
            }
          }
        }
      });
    },
    queryOperationunit() {
      let pam = {};
      let self = this;
      operationunit(pam).then((res) => {
        if (res.status) {
          if (res.data) {
            self.ywOptions = [];
            if (res.data.length > 0) {
              res.data.forEach((d) => {
                self.ywOptions.push({ label: d.jcca25a020, value: d.jcca25a010 });
                if (self.formData.jcca03a151 == d.jcca25a020) {
                  self.formData.jcca03a151 = d.jcca25a010;
                }
              });
            }
          }
        }
      });
    },
    queryHiddendangers() {
      let pam = {};
      let self = this;
      hiddendangers(pam).then((res) => {
        if (res.status) {
          if (res.data) {
            self.hdpOptions = [];
            if (res.data.length > 0) {
              res.data.forEach((d) => {
                self.hdpOptions.push({ label: d.hiddenPointName, value: d.hiddenPointId });
              });
            }
          }
        }
      });
    },
    // 滚动事件
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop = this.$refs.tableList.bodyWrapper.scrollTop;
        let scrollHeight = this.$refs.tableList.bodyWrapper.scrollHeight;
        let clientHeight = this.$refs.tableList.bodyWrapper.clientHeight;
        if(scrollTop + clientHeight  >= scrollHeight){
          if(this.size * this.page > this.total){
            return false
          }else{
            this.page = this.page + 1 //显示条数新增
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

  // watch:{
  //   district_data(val){
  //     if(val){
  //       this.queryData.addvcd = val.ADDVCD;
  //       this.getList();
  //     }
  //   }
  // }
};
</script>
<style type="text/scss" lang="scss" scoped>
.el-select .el-input__inner {
  height: 28px;
  line-height: 28px;
}
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
.reprint-remark-form .el-form-item__error {
  transition: none !important;
}
.el-checkbox ::after {
  transition: none !important;
}
.el-radio ::after {
  transition: none !important;
}
.el-icon-caret-right {
  transition: none !important;
}
.el-input__icon {
  transition: none !important;
}
.el-tabs__active-bar {
  transition: none !important;
}
</style>
