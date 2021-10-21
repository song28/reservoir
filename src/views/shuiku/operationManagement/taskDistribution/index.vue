<template>
  <div class="taskDistribution">
    <!-- 任务下发 -->
    <el-container class="con">
      <el-aside>
        <!-- :defaultChecked='defaultChecked' -->
        <!-- <LeftTreeBar :data="data"
                     @backData="backData"
                     ref="treeBar"
                     @getTreeData="getTreeData"></LeftTreeBar> -->
        <damLeftTreeBar
          :data="data"
          @backData="backData"
          ref="treeBar"
          @getTreeData="getTreeData"
        ></damLeftTreeBar>
      </el-aside>
      <el-container class="right">
        <el-main>
          <el-form label-position="top" :model="formData" ref="ruleForm" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="任务名称" prop="taskName">
                  <el-input
                    v-model="formData.taskName"
                    placeholder="输入任务名称"
                    size="mini"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务类型" prop="taskType">
                  <el-select
                    v-model="formData.taskType"
                    size="mini"
                    filterable
                    placeholder="请选择任务类型"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="任务执行水库" prop="reservoir">
                  <el-input
                    type="textarea"
                    autosize
                    readonly
                    placeholder="请在水库列表中选择水库"
                    v-model="formData.reservoir"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="任务执行人"> </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-checkbox-group v-model="checkList" @change="getReservoirUser">
                  <el-checkbox :label="item.id" v-for="item in allRoles" :key="item.id">{{
                    item.name
                  }}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <div class="tb">
              <el-table
                stripe
                :data="tableData"
                v-loading="tableLoading"
                border
                ref="multipleTable"
                style="width: 100%; height: 200px; overflow-y: auto"
                highlight-current-row
                @selection-change="handleSelectionChange"
                @cell-click="handleCellClick"
                @row-click="handleRowClick"
              >
                <!-- <el-table-column type="selection"
                                 width="55"> </el-table-column> -->
                <el-table-column
                  label="序号"
                  type="index"
                  :index="table_index"
                  width="50"
                  align="center"
                  sortable
                ></el-table-column>
                <el-table-column
                  v-for="(item, index) in tableHeader"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  align="center"
                  sortable
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
              <!-- <el-pagination background
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="currentPage"
                             :page-sizes="[query.size, 100, 200, 300, 400]"
                             :page-size="query.size"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total">
              </el-pagination> -->
            </div>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="任务内容" prop="taskContent">
                  <el-input
                    type="textarea1"
                    autosize
                    placeholder="请编辑任务内容"
                    v-model="formData.taskContent"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <div>任务执行时间</div>
              </el-col>
              <el-col :span="6">
                <el-checkbox v-model="formData.isLoop">循环</el-checkbox>
              </el-col>
              <el-col :span="8">
                <el-button
                  size="mini"
                  class="btn-table-border blue"
                  style="cursor: pointer"
                  type="primary"
                  @click.stop="handlerAddOperattionTime"
                  >添加执行时间</el-button
                >
                <el-button
                  size="mini"
                  class="btn-table-border red"
                  style="cursor: pointer"
                  type="danger"
                  @click.stop="handlerDelOperattionTime"
                  >删除执行时间</el-button
                >
              </el-col>
              <el-col
                :span="6"
                v-for="(item, index) in formData.taskExecTimeList"
                :key="index"
              >
                <el-form-item>
                  <el-time-picker
                    size="mini"
                    is-range
                    v-model="formData.taskExecTimeList[index]"
                    value-format="HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="循环周期">
              <el-row :gutter="6">
                <el-col :span="1" style="text-align: right; width: 80px">
                  开始日期
                </el-col>
                <el-col :span="4" class="short-picker">
                  <el-date-picker
                    size="mini"
                    v-model="formData.loopBeginDate"
                    type="date"
                    placeholder="开始日期"
                  >
                  </el-date-picker>
                </el-col>
                <el-col :span="1" style="text-align: right"> 周期 </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="formData.loopPeriod"
                    size="mini"
                    filterable
                    placeholder="请选择任务类型"
                    clearable
                  >
                    <el-option
                      v-for="item in cycleOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1" style="text-align: right"> 每 </el-col>
                <el-col :span="2">
                  <el-input
                    autosize
                    placeholder=""
                    type="number"
                    :min="1"
                    v-model="formData.loopFreq"
                    size="mini"
                  ></el-input>
                </el-col>
                <el-col :span="2"> 天，执行一次 </el-col>
                <el-col :span="1" style="text-align: right; width: 80px">
                  结束日期
                </el-col>
                <el-col :span="4">
                  <el-date-picker
                    size="mini"
                    v-model="formData.loopEndDate"
                    type="date"
                    placeholder="结束日期"
                  >
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="定时发送">
              <el-row :gutter="6">
                <el-col :span="1" style="text-align: right; width: 80px">
                  发送时间
                </el-col>
                <el-col :span="2" style="text-align: right; width: 120px">
                  任务执行时间前
                </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="formData.remindHour"
                    size="mini"
                    filterable
                    placeholder="请选择任务类型"
                    clearable
                  >
                    <el-option
                      v-for="item in departureTimeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" style="text-align: right"> 发送次数 </el-col>
                <el-col :span="2">
                  <el-select
                    v-model="formData.remindCount"
                    size="mini"
                    filterable
                    placeholder="请选择任务类型"
                    clearable
                  >
                    <el-option
                      v-for="item in departureCount"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div class="save">
            <el-button
              size="mini"
              class="btn-table-border blue"
              style="cursor: pointer"
              type="primary"
              @click.stop="handleSave"
              >保存</el-button
            >

            <el-button
              size="mini"
              class="btn-table-border blue"
              style="cursor: pointer"
              type="primary"
              @click.stop="handleRow(scope.row, 'detail')"
              >取消</el-button
            >
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 添加-修改 -->
    <Dialog
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      backDialogData="backDialogData"
    ></Dialog>
  </div>
</template>
<script>
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";

import Btns from "../../components/tree/btns.vue";
import Dialog from "../common/dialog";
import { formatDate } from "@/utils/time.js";
import {
  addTaskOperation,
  updateTaskOper,
  getAllRoles,
  getReservoirIdAndRoleId,
  getTaskOperDetailById,
} from "./api";
import { tbsTaskDistributionHeader } from "../apiConfig";

export default {
  components: { LeftTreeBar, Btns, Dialog, damLeftTreeBar },
  data() {
    return {
      checkList: [],
      textarea: "",
      textarea1: "",
      value: "巡查任务",
      rules: {
        taskName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        taskType: [{ required: true, message: "请选择任务类型", trigger: "blur" }],
        reservoir: [{ required: true, message: "请选择水库", trigger: "blur" }],
        taskContent: [{ required: true, message: "请输入任务内容", trigger: "blur" }],
      },
      options: [
        {
          label: "巡查任务",
          value: "1",
        },
        {
          label: "养护任务",
          value: "2",
        },
        {
          label: "操作任务",
          value: "3",
        },
      ],
      cycleOptions: [
        {
          value: 1,
          label: "年",
        },
        {
          value: 2,
          label: "周",
        },
        {
          value: 3,
          label: "季",
        },
        {
          value: 4,
          label: "日",
        },
      ],
      departureTimeOptions: [
        {
          label: "1小时",
          value: 1,
        },
        {
          label: "2小时",
          value: 2,
        },
        {
          label: "3小时",
          value: 3,
        },
      ],
      departureCount: [
        {
          label: "1次",
          value: 1,
        },
        {
          label: "2次",
          value: 2,
        },
        {
          label: "3次",
          value: 3,
        },
      ],
      formData: {
        taskName: "",
        taskType: "",
        reservoir: "",
        reservoirIds: "",
        inscptorIds: "",
        isLoop: true,
        taskContent: "",
        taskExecTimeList: [
          [formatDate(new Date(), "{h}:{i}:{s}"), formatDate(new Date(), "{h}:{i}:{s}")],
        ],
        loopBeginDate: new Date(),
        loopEndDate: new Date(),
        loopPeriod: 4,
        loopFreq: 1,
        remindHour: 1,
        remindCount: 1,
        timerSwitch: "1",
      },
      TaskId: null,
      dialogVisible: false,
      tableLoading: false,
      // tableHeight:
      //   window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 10,
      tableHeader: [],
      tableData: [],
      dialogData: {
        title: null, //弹框标题
        type: null, //操作添加，修改
        data: {}, //数据
        pageType: "taskDistribution", //页面类型
      },
      query: {
        data: {},
        start: 1,
        size: 20,
      },
      total: 0,
      currentPage: 1,
      input: "",
      data: {
        type: 2,
        title: "水库列表",
        ifShowCheckBox: true,
      },
      dataBtn: {
        model: 1,
        titleInput: "水库名称",
        add: true,
        query: [true, true],
        import: true,
        importExcel: true,
        importExcelDemo: true,
      },
      filterTreeData: [],
      defaultChecked: [],
      filterIds: [],
      allRoles: [],
    };
  },
  created() {
    this.TaskId = this.$route.query.id;
    this.getAllRole();
  },
  mounted() {
    // console.log(this.largestAltitude([1, 4, 2, 5, 3]))
    // 如果id存在获取到水库id 进行默认回显回传

    this.tableHeader = tbsTaskDistributionHeader;
  },
  methods: {
    getTreeData(val) {
      if (this.TaskId) {
        console.log(this.$refs.treeBar, "this.$refs.treeBar");
        this.getReservoirDetail(this.TaskId);
      }
    },

    largestAltitude(arr) {},
    //   获取所有执行角色
    async getAllRole() {
      try {
        let  data = await getAllRoles({});
        if (data.status) {
          let idArr = [];
          this.allRoles = data.obj; //.slice(0, 5)
          this.checkList = ['巡查责任人'];
          //   this.checkList = this.allRoles.reduce(
          //     (pre, cur) => pre.concat(cur.id),
          //     []
          //   );
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (err) {
        console.log(err);
        this.$GXprompt.notify.error("网络连接错误");
      }
    },
    //   添加执行时间
    handlerAddOperattionTime() {
      this.formData.taskExecTimeList.push([
        formatDate(new Date(), "{h}:{i}:{s}"),
        formatDate(new Date(), "{h}:{i}:{s}"),
      ]);
    },
    // 删除执行时间
    handlerDelOperattionTime() {
      if (this.formData.taskExecTimeList.length === 1) {
        this.$GXprompt.notify.warning("至少保留一个执行时间");
      } else {
        this.formData.taskExecTimeList.pop();
      }
    },
    // 获取单个水库详情
    async getReservoirDetail(id) {
      try {
        // 获取到已选择的水库 然后this.filterIds
        // this.filterIds = [15, 16]
        // this.getReservoirUser()
        let { status, msg, data } = await getTaskOperDetailById({
          taskOperId: id,
        });
        if (status) {
          let list = data;
          this.formData = list;
          this.$set(this.formData, "taskExecTimeList", []);
          this.formData.execTimeList.forEach((item) => {
            let timeArr = [];
            timeArr.push(item.execBeginTime);
            timeArr.push(item.execEndTime);
            this.formData.taskExecTimeList.push(timeArr);
          });
          //   取出水库id和name
          let idArr = [];
          let nameArr = [];
          this.formData.reservoirList.forEach((item) => {
            idArr.push(item.gid);
            nameArr.push(item.addvnm);
          });
          this.$refs.treeBar.defaultChecked = idArr;
          //   this.defaultChecked = this.formData.reservoirIdList
          this.filterIds = idArr;
          this.formData.reservoir = nameArr.join(",");
          this.formData.reservoirIds = this.filterIds.join(",");
          this.checkList = this.formData.inspectorRoleIds.split(",");
          this.checkList.map((item, index, arr) => {
            arr[index] = parseInt(item);
          });

          this.getReservoirUser();
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (error) {
        console.log(error);
        this.$GXprompt.notify.error("网络连接错误");
      }
    },
    //获得水库数据
    async getPatrollist() {
      try {
        let params = {
          id: "", //水库id
        };
        console.log(params);
        return;
        let { msg, data, status, total } = await patrollist(params);
        if (status) {
          let list = data;
          this.total = total;
        } else {
          this.$GXprompt.notify.error("网络连接错误");
        }
      } catch (error) {
        console.log(error);
        this.$GXprompt.notify.error("网络连接错误");
      }
    },
    // 获取水库关联人员列表
    async getReservoirUser(ids) {
      if (this.filterIds.length == 0) return;
      this.tableLoading = false;
      this.tableData = [];
      try {
        let params = {
          //   page: this.currentPage,
          //   size: this.query.size,
          reservoirIds: this.formData.reservoirIds, //水库id
          roleIds: this.checkList.join(","),
        };
        // this.toggleDev(this.tableData)
        let data= await getReservoirIdAndRoleId(params);
        if (data.status) {
          this.tableData = data.obj;
          this.tableLoading = false;
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (error) {
        console.log(error);
        this.$GXprompt.notify.error("网络连接错误");
      }
    },
    // 已关联水库人员回显  取消回显功能  之前想的是数组  现在返回时字符串  如果启用 转下字符串
    toggleDev(data) {
      if (data.length) {
        let inscptorIds = this.formData.inscptorIds;
        this.$nextTick(() => {
          data.forEach((item, index) => {
            //multipleTable 是这个表格的ref属性 true为选中状态
            if (inscptorIds.includes(item.id)) {
              this.$refs.multipleTable.toggleRowSelection(data[index], true);
            }
          });
        });
      }
    },
    handleRow() {
      console.log(this.formData, "操作");
    },
    // 保存 修改
    handleSave() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          try {
            let params = {};
            let inscptorIdsStr = "";
            params = JSON.parse(JSON.stringify(this.formData));
            let loopBeginDateTime = new Date(params.loopBeginDate).getTime();
            let loopEndDateTime = new Date(params.loopEndDate).getTime();
            console.log(loopBeginDateTime, loopBeginDateTime);
            if (loopBeginDateTime > loopEndDateTime) {
              this.$GXprompt.notify.warning("结束时间不能早于结束时间");
              return;
            }
            if (params.loopFreq <= 0) {
              this.$GXprompt.notify.warning("循环周期要不能为负数");
              return;
            }
            params.isLoop = params.isLoop ? "1" : "0";
            this.tableData.forEach((item) => {
              inscptorIdsStr = inscptorIdsStr + item.inscptorId + ",";
            });
            params.inspectorRoleIds = this.checkList.join(",");
            params.inscptorIds = inscptorIdsStr;

            params.loopBeginDate = formatDate(params.loopBeginDate);
            params.loopEndDate = formatDate(params.loopEndDate);

            let taskExecTimeListArr = [];
            params.taskExecTimeList.forEach((item) => {
              let obj = {
                execBeginTime: item[0],
                execEndTime: item[1],
              };
              taskExecTimeListArr.push(obj);
            });
            params.taskExecTimeList = taskExecTimeListArr;
            console.log(params, "f");
            //修改

            let res;
            if (this.TaskId) {
              res = await updateTaskOper(params);
            } else {
              res = await addTaskOperation(params);
            }
            if (res.status) {
              this.$GXprompt.notify.success(res.msg);
              this.$router.push({
                path: "timedTask",
              });
            } else {
              this.$GXprompt.notify.error(res.msg);
            }
          } catch (err) {
            console.log(err);
            this.$GXprompt.notify.error("网络连接错误");
          }
        } else {
          this.$GXprompt.notify.warning("缺少必选项");
        }
      });
    },
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getPatrollist({ page: this.currentPage, size: val });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPatrollist({
        page: this.currentPage,
        size: this.query.size,
        type: this.type,
      });
      console.log(`当前页: ${val}`);
    },
    //点击表格行
    handleRowClick(row, column, cell, event) {},
    //点击表格列
    handleCellClick(row, column, cell, event) {},
    handleSelectionChange(val) {
      //   console.log(val, '复选框----')
    },
    backData(data) {
      console.log(data, "树列表返回的值");
      this.tableData = [];
      if (!data.checkData) return;
      this.filterTreeData = data.checkData.checkedNodes.filter((item) => !item.children);
      this.filterIds = [];
      this.filterTreeData.forEach((item) => {
        this.filterIds.push(item.id);
      });
      if (this.filterTreeData.length > 0) {
        let reservoir = this.filterTreeData.reduce(
          (pre, cur) => (pre += cur.addvnm + ";"),
          ""
        );
        this.$set(this.formData, "reservoir", reservoir);
        this.formData.reservoirIds = this.filterTreeData.reduce(
          (pre, cur) => (pre += cur.rscd + ","),
          ""
        );
      } else {
        this.$set(this.formData, "reservoir", "");
        this.formData.reservoirIds = "";
      }
      if (this.filterIds.length > 0) this.getReservoirUser();
    },
    // 循环出结果
    deepFn(obj, treeObj) {
      obj.forEach((item) => {
        if (item.children) {
          Object.assign(treeObj, this.deepFn(item.children, treeObj));
        } else {
          treeObj = {
            id: item.id,
            label: item.label,
          };
        }
      });
      return treeObj;
    },
  },
};
</script>
<style lang="scss" scoped>
.taskDistribution {
  >>> .el-form .el-form-item {
    margin-bottom: 0.22rem !important;
  }
  position: absolute;
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  >>> .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 3.36rem !important;
  }
  >>> .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 3.36rem !important;
  }
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  .right {
    margin: 0rem;
    margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    >>> .el-main {
      padding: 0px 20px;
    }

    >>> .el-form--label-top .el-form-item__label {
      padding: 0 0 0 0;
    }

    >>> .el-form-item__label {
      line-height: 20px;
    }

    .tb {
      border: 1px solid #dcdfe6;
      >>> .el-pagination {
        text-align: right;
      }
      >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #ffffff;
      }
      margin-bottom: 10px;
    }
    .short-picker {
      >>> .el-input__inner {
        width: 2.6rem !important;
      }
    }
    .save {
      text-align: right;
    }
  }
  .el-aside {
    width: 2.4rem !important;
    background: #fff;
  }
}
</style>
