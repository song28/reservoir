<template>
  <div class="nbbg">
    <div class="xuncha" v-show="Xunc">
      <div>
        <div class="query">
          <!-- @query="queryGetPatrollist"
            @reset="resetList"
            @export="handleExport"
            :hasMore="false" -->
          <filter-toggler
            @query="queryList"
            @reset="resetList"
            @export="handleExport"
            :hasMore="false"
            :hasAdd="false"
          >
            <template slot="first-line">
              <!-- <el-form-item label="发送人">
                <el-input
                  v-model="query.data.send_user"
                  placeholder="请输入发送人姓名查询"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="发送内容">
                <el-input
                  v-model="query.data.sendContext"
                  placeholder="请输入发送内容"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>

              <el-form-item label="设备类型">
                <el-select
                  v-model="query.data.receiverApply"
                  placeholder="请选择"
                  size="small"
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
              <!-- <el-form-item label="入户报警器">
                <el-input
                  v-model="query.data.content"
                  placeholder="请输入入户报警器"
                ></el-input>
              </el-form-item>
              <el-form-item label="无线预警广播站">
                <el-input
                  v-model="query.data.content"
                  placeholder="请输入无线预警广播站"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="时间">
                <el-date-picker
                  v-model="query.data.timeLong"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  size="small"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  align="right"
                ></el-date-picker>
              </el-form-item>
            </template>
          </filter-toggler>
        </div>
      </div>
      <div class="tb">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          border
          style="width: 100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
          @cell-click="handleCellClick"
          @row-click="handleRowClick"
          :height="tableHeight"
        >
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{ (query.pageNo - 1) * query.pageSize + (scope.$index + 1) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发送时间"
            align="center"
            show-overflow-tooltip
            prop="createtime"
            sortable
            width="200"
          ></el-table-column>
          <el-table-column
            label="发送状态"
            align="center"
            width="110"
            :show-overflow-tooltip="true"
            sortable
            prop="status"
          >
            <!-- <template slot-scope="scope">
               <div @click="openDialog(scope.row)">
                <span>{{ scope.row.status }}</span>
              </div> 
              {{ scope.row.status == 1 ? "成功" : "失败" }}
            </template> -->
          </el-table-column>
          <el-table-column
            label="类型"
            align="center"
            width="110"
            :show-overflow-tooltip="true"
            sortable
          >
            <template slot-scope="scope">
              <div>
                <!-- @click="openDialog(scope.row)" -->
                <span v-if="scope.row.receiverApply == 1">短信</span>
                <span v-if="scope.row.receiverApply == 2">设备(LED/广播/入户)</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="短信内容"
            align="center"
            show-overflow-tooltip
            prop="sendContext"
            sortable
          ></el-table-column>
          <el-table-column
            label="接收人"
            align="center"
            sortable
            prop="receiverName"
            width="100"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            label="接收人电话"
            align="center"
            sortable
            prop="receiverPhone"
            :show-overflow-tooltip="true"
            width="180"
          ></el-table-column>
          <!-- <el-table-column
            align="center"
            :show-overflow-tooltip="true"
            label="消息类型"
            sortable
            width="110"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">自动发布</span>
              <span v-if="scope.row.type == 2">人工发布</span>
              <span v-if="scope.row.type == 0">普通短信</span>

             
            </template> 
          </el-table-column>-->

          <!-- <el-table-column
            label="发送人"
            width="100"
            align="center"
            sortable
            prop="send_user"
            :show-overflow-tooltip="true"
          >
          </el-table-column> -->
          <!-- <el-table-column
            label="补发"
            align="center"
            prop="success"
            :show-overflow-tooltip="true"
            width="100"
          >
            <template slot-scope="scope">
              <span @click="openDialog(scope.row)"
                ><img :src="require('@/assets/images/msg.png')"
              /></span>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          background
          @size-change="getList"
          @current-change="handleCurrentChange"
          :current-page="query.pageNo"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <dialog-maintenance-form
          :item="repairsDialog"
          v-if="repairsDialog.isShow"
          @on-close="closeDialog"
        ></dialog-maintenance-form>
        <!-- <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.start"
          :limit.sync="query.pageSize"
          @pagination="getList"
        />-->
        <el-dialog
          title="数据列表"
          :visible.sync="dialogVisible"
          width="80%"
          height="80%"
          :modal="false"
          :modal-append-to-body="false"
        >
          <div style="padding: 20px">
            <div style="text-align: right">
              <el-button type="primary" size="small" @click="sendFailMsg()"
                >补发所有失败短信</el-button
              >
            </div>
            <span>
              <el-table
                :data="selectSmsList"
                ref=""
                :height="total < 1 ? tableHeight1 + 45 : tableHeight1"
                :header-cell-style="{ background: '#D6E7F4', color: '#999999' }"
                highlight-current-row
              >
                <!-- <el-table-column label="序号" align="center" width="50">
            <template slot-scope="scope">
              <span>{{
                (listQuery.pageNo - 1) * listQuery.pageSize + (scope.$index + 1)
              }}</span>
            </template>
          </el-table-column> -->

                <el-table-column
                  label="接收人"
                  align="center"
                  prop="receiverName"
                  :show-overflow-tooltip="true"
                />
                <el-table-column
                  label="电话号码"
                  align="center"
                  prop="receiverPhone"
                  :show-overflow-tooltip="true"
                />
                <el-table-column
                  label="发送状态"
                  align="center"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <div>
                      <span v-if="scope.row.status == 0">失败</span>
                      <span v-if="scope.row.status == 1">成功</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="失败原因"
                  align="center"
                  prop="failInfo"
                  :show-overflow-tooltip="true"
                />
                <el-table-column
                  label="发送时间"
                  align="center"
                  prop="sendTime"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <!-- <el-table-column
                  label="补发"
                  align="center"
                  prop="success"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span @click="sendMsg(scope.row)"
                      ><img :src="require('@/assets/images/msg.png')"
                    /></span>
                  </template>
                </el-table-column> -->
              </el-table>
              <pagination
                v-show="totalchild > 0"
                :total="totalchild"
                :page.sync="listQuery1.pageNo"
                :limit.sync="listQuery1.pageSize"
                @pagination="querySmsRecordById()"
              />
            </span>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
              <!-- <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        > -->
            </span>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  basicInfo,
  alllist,
  selectSmsRecordById,
  resendSmsByHandlerId,
  resendSmsByRecordList,
  getSendList,
} from "../../api";
export default {
  props: ["data"],

  components: {},
  data() {
    return {
      tableLoading: false,
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "短信",
        },
        {
          value: "2",
          label: "设备(LED/广播/入户)",
        },
      ],
      value: "",
      Xunc: true,
      repairsDialog: {
        isShow: false,
        data: null,
      },
      ifshowTime: true,

      detail: false,
      warnInfo: [
        {
          insPerson: "",
          title: "",
          times: "",
          timee: "",
          insPlace: "",
          con: "",
          insDate: "",
          insDesc: "",
          picUrl: [],
        },
      ],
      activeName: "first", //ghn-切换tab
      tableData: [],
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 150,
      tableHeight1: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 150,
      query: {
        data: {
          // send_user: "",
          // content: "",
          // timeLong: "",
          sendContext: "",
          timeLong: ["", ""],
          startTime: null,
          endTime: null,
        },
        pageNo: 1,
        pageSize: 20,
      },
      listQuery1: {
        pageNo: 1,
        pageSize: 20,
      },
      total: 0,
      currentPage: 1,
      type: 0,
      dialogVisible: false,
      msgData: {},
      selectSmsList: [],
      idList: [], //未发送成功id
      totalchild: 0,
    };
  },
  mounted() {
    // let that = this;
    // that.getPatrollist({
    //   page: this.currentPage,
    //   size: this.query.size,
    // });
    this.queryList();
  },
  methods: {
    queryList() {
      this.query.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val, "val");
      this.query.pageNo = val;
      this.getList();
    },
    getList() {
      // let params = {
      //   pageNo: 1,
      //   pageSize: 20, //"int //每页数目",

      //   data: {
      //     id: "",
      //     rscd: this.data.rscd,
      //     warnId: "",
      //     receiverApply: "",
      //     receiverName: "",
      //     receiverPhone: "",
      //     status: "",
      //     sendContext: "",
      //     sendType: "",
      //     sendUser: "",
      //     sendUsername: "",
      //   },
      // };
      let params = this.query;
      params.data.rscd = this.data.rscd;
      params.data.addvcd = this.data.addvcd;
      this.tableData = [];
      if (this.query.data.timeLong) {
        params.data.startTime = this.query.data.timeLong[0];
        params.data.endTime = this.query.data.timeLong[1];
      } else {
        params.data.startTime = "";
        params.data.endTime = "";
      }

      getSendList(params).then((res) => {
        if (res.status) {
          this.tableData = res.data ? res.data : [];
          this.total = res.total ? res.total : 0;
        }
      });
    },
    // 滚动事件
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop = this.$refs.tableList.bodyWrapper.scrollTop;
        let scrollHeight = this.$refs.tableList.bodyWrapper.scrollHeight;
        let scrollHeight111 = this.$refs.tableList.scrollHeight;
        let clientHeight = this.$refs.tableList.bodyWrapper.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight) {
          if (this.listQuery.pageSize * this.listQuery.pageNo > this.total) {
            return false;
          } else {
            this.listQuery.pageNo = this.listQuery.pageNo + 1; //显示条数新增

            this.getPatrollist({
              page: this.currentPage,
              size: this.query.size,
            });
            this.queryList(); //请求列表list 接口方法
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
    // //打开弹框
    openDialog(item) {
      this.dialogVisible = true;
      debugger;
      this.msgData = item;
      this.querySmsRecordById();
    }, // 补发短信列表
    querySmsRecordById() {
      let that = this;
      let params = {
        handlerId: this.msgData.id,
        start: this.currentPage,
        size: this.query.size,
      };
      selectSmsRecordById(params).then((res) => {
        that.selectSmsList = res.data;
        res.data.forEach((d) => {
          if (d.status == 0) {
            that.idList.push(d.id);
          }
        });
        that.totalchild = res.total ? res.total : 0;
      });
    },
    //补发所有失败短信
    sendFailMsg() {
      let params = {
        handlerId: this.msgData.jcca20a_send_id,
      };
      let that = this;
      resendSmsByHandlerId(params).then((res) => {
        if (res.status) {
          that.$GXprompt.notify.success(res.data);
        } else {
          that.$GXprompt.notify.error("补发失败");
        }
      });
    },
    //补发短息
    sendMsg(data) {
      debugger;
      let that = this;
      let params = {
        recordIds: [data.id],
      };
      resendSmsByRecordList(params).then((res) => {
        if (res.status) {
          that.$GXprompt.notify.success(res.data);
        } else {
          that.$GXprompt.notify.error("补发失败");
        }
      });
    },
    queryRecode() {
      debugger;
      this.query.data.startTime = this.query.data.timeLong[0];
      this.query.data.endTime = this.query.data.timeLong[1];
      this.getPatrollist({
        page: this.currentPage,
        size: this.query.size,
        data: this.query.data,
      });
    },
    notice() {
      this.detail = false;
      this.Xunc = true;
    },
    queryGetPatrollist() {
      if (this.query.data.timeLong != null) {
        this.query.data.startTime = this.query.data.timeLong[0];
        this.query.data.endTime = this.query.data.timeLong[1];
      }

      console.log("444", this.value);
      this.getPatrollist({
        page: this.currentPage,
        size: this.query.size,
        type: this.value,
        content: this.query.data.content,
        startTime: this.query.data.startTime,
        endTime: this.query.data.endTime,
      });
    },
    //重置查询条件
    resetList() {
      this.value1 = [];
      this.value = "";
      for (let key in this.query.data) {
        this.query.data[key] = null;
      }

      this.getPatrollist({
        type: this.value,
        page: this.currentPage,
        size: this.query.size,
        data: this.query.data,
      });
    },

    //导出
    handleExport() {},

    //行政区
    regionChange(val) {
      let obj = getRegion(val);
      this.query.data.addvcd = obj.addvcd;
      this.query.data.addvnm = obj.addvnm;
    },

    handleSelectionChange(val) {
      this.multipleTable = val;
    },
    //点击表格行
    handleRowClick(row, column, cell, event) {
      console.log(row, "eeeeeeee");
    },
    //点击表格列
    handleCellClick(row, column, cell, event) {
      if (column.property == "name") {
        row["deviceName"] = row.name;
        row["deviceId"] = row.deviceID;
        this.deviceInfo.data = row;
        this.deviceInfo.isShow = true;
      }
    },

    //详情页面
    handleRepairs(row) {
      this.repairsDialog.data = row;
      this.detail = true;
      this.Xunc = false;
      basicInfo({ id: row.id }).then((res) => {
        if (res.status) {
          this.warnInfo[0].insPerson = res.data.insPerson;
          this.warnInfo[0].insDate = res.data.insDate;
          this.warnInfo[0].title = res.data.insTitle;
          this.warnInfo[0].times = res.data.insStartDate;
          this.warnInfo[0].timee = res.data.insEndDate;
          this.warnInfo[0].timee = res.data.insEndDate;
          this.warnInfo[0].insPlace = res.data.insPlace;
          this.warnInfo[0].insDesc = res.data.insDesc;
          this.warnInfo[0].picUrl = res.data.picUrl;
          console.log(this.warnInfo[0].picUrl, "dddddddddddd");
          if (this.title == "事件上报") {
            this.ifshowTime = false;
          }
        } else {
          this.$message.error("查询详情失败");
        }
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.size = val;
      // this.getPatrollist({ page: this.currentPage, size: val, type: this.value });
    },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   console.log(this.query.timeLong, "dddd");
    //   this.getPatrollist({
    //     page: this.currentPage,
    //     size: this.query.size,
    //     type: this.value,
    //     content: this.query.data.content,
    //     startTime: this.query.data.startTime,
    //     endTime: this.query.data.endTime,
    //   });
    //   console.log(`当前页: ${val}`);
    // },

    getPatrollist(pam2) {
      let that = this;
      alllist(pam2)
        .then(function (response) {
          that.tableData = [];
          if (response.status) {
            let list = response.data;
            that.tableData = response.data;
            that.total = response.total;
            console.log(response, "短信历史", "type", that.type);
          } else {
            //暂无数据
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getBasicInfo(pam) {
      let that = this;
      basicInfo(pam)
        .then(function (response) {
          if (response.status) {
            let list = response.data;
            console.log(list, "基本详情");
          } else {
            //暂无数据
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  watch: {
    data: {
      handler(val) {
        this.getList();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.nbbg .el-dialog__body span {
  width: 100%;
}
.nbbg {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .xuncha {
    position: relative;
    height: 96%;
    width: 96%;
    left: 2%;
    top: 2%;
    .query {
      height: 60px;
      padding-top: 10px;
      vertical-align: middle;
      background: #f7fff8;
      border: 1px solid #dae3f0;
    }
    .search-btn {
      padding-top: 0px;
    }
    .tb {
      width: 100%;
      height: calc(100% - 60px);
      // border: 1px solid red;
      padding-top: 10px;
      .el-table th,
      .el-table td {
        padding: 2px 0px !important;
      }
    }
  }
}
</style>
