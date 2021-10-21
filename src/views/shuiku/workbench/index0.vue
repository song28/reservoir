<template>
  <div class="workbrench">
    <!-- 台账 -->
    <el-container class="con">
      <el-header>
        <p class="title">浏阳小型水库巡查管护工作台</p>
        <el-row class="btn-group">
          <span>{{ nowTitle }}</span> 巡查：<span>{{ statistics.patrol }}</span
          >次 事件上报：<span>{{ statistics.events }}</span
          >次 险情上报：<span>{{ statistics.danger }}</span
          >次 日常维护：<span>{{ statistics.maintain }}</span
          >座
        </el-row>
        <el-row class="query">
          <el-col :span="1.8">
            <el-button
              type="skbtn"
              plain
              size="mini"
              @click="taizType('xc')"
              :class="tzType == 'xc' ? 'btnactive' : 'btn'"
              >巡查</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              type="skbtn"
              plain
              size="mini"
              @click="taizType('yh')"
              :class="tzType == 'yh' ? 'btnactive' : 'btn'"
              >养护</el-button
            >
          </el-col>
          <el-col :span="1.8">
            <el-button
              type="skbtn"
              plain
              size="mini"
              :class="activeNameBtn == '3' ? 'btnactive' : 'btn'"
              @click.stop="handlerTime(1 * 24, 'todayM')"
              >本月</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              type="skbtn"
              plain
              size="mini"
              :class="activeNameBtn == '4' ? 'btnactive' : 'btn'"
              @click.stop="handlerTime(1 * 24, 'today')"
              >今日</el-button
            >
          </el-col>
          <el-col :span="2.5">
            <el-select
              v-model="select"
              placeholder="请选择"
              size="mini"
              @change="changeTM"
            >
              <el-option label="按日" value="1"></el-option>
              <el-option label="按月" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-if="select == 1"
              size="mini"
              v-model="value1"
              type="date"
              placeholder="选择日期"
              :clearable="false"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              @change="changeT"
            >
            </el-date-picker>
            <el-date-picker
              v-if="select == 2"
              size="mini"
              :clearable="false"
              v-model="value2"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
              @change="changeM"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-button
              type="skbtn"
              plain
              icon="el-icon-download"
              round
              size="mini"
              @click.stop="handlerDownloadBulletin('month')"
              >月报</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              type="skbtn"
              plain
              icon="el-icon-download"
              round
              size="mini"
              @click.stop="handlerDownloadBulletin('week')"
              >周报</el-button
            >
          </el-col>
          <!-- <el-col :span="4.5">
            <el-date-picker v-model="dailyTime"
                            style="width:1.4rem;"
                            value-format="yyyy-MM-dd"
                            type="date"
                            size="mini"
                            :picker-options="pickerOptions"
                            placeholder="选择日报时间">
            </el-date-picker>
          </el-col> -->
          <el-col :span="2">
            <el-button
              type="skbtn"
              plain
              icon="el-icon-download"
              round
              @click.stop="handlerDownloadBulletin('day')"
              size="mini"
              >日报</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              type="skbtn"
              plain
              icon="el-icon-download"
              round
              @click.stop="handlerDownloadWorkbench()"
              size="mini"
              >台账下载</el-button
            >
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="tb">
          <el-table
            stripe
            :data="tableData"
            v-loading="tableLoading"
            border
            id="out-table"
            style="width: 100%"
            highlight-current-row
            :span-method="objectSpanMethod"
            :height="tableHeight"
            show-summary
            :summary-method="getSummaries"
          >
            <el-table-column
              label="序号"
              type="index"
              :index="table_index"
              width="50"
              align="center"
            ></el-table-column>
            <template v-for="(item, index) in tableHeader">
              <!-- item.prop == 'compoundName' -->
              <template
                v-if="item.prop == 'town' || item.prop == 'compoundName'"
              >
                <el-table-column
                  :prop="item.prop"
                  :label="item.label"
                  align="center"
                  :width="item.width"
                  :key="index"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </template>
              <template v-if="item.prop == 'tegr'">
                <el-table-column
                  :prop="item.prop"
                  :label="item.label"
                  align="center"
                  :show-overflow-tooltip="true"
                  :key="index"
                >
                </el-table-column>
              </template>
              <template v-if="item.prop == 'compoundNamePhone'">
                <el-table-column
                  :prop="item.prop"
                  :label="item.label"
                  align="center"
                  :key="index"
                  :width="item.width"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </template>
            </template>

            <el-table-column label="巡查" v-if="tzType == 'xc'">
              <template v-for="(item, index) in tableHeader">
                <template
                  v-if="
                    item.prop == 'xuncha' ||
                      item.prop == 'sw' ||
                      item.prop == 'skbg'
                  "
                >
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                    :width="item.width"
                    :sortable="item.sortable"
                    :show-overflow-tooltip="true"
                    :key="index"
                  >
                    <template scope="scope">
                      <div
                        @click="clickXuncha(scope.row, 'patrol', item.prop)"
                        v-if="item.prop == 'xuncha'"
                        :class="scope.row.xuncha > 0 ? 'maintain' : ''"
                        style="font-weight:bold;cursor: pointer"
                      >
                        {{ scope.row.xuncha }}
                      </div>

                      <div
                        v-if="
                          item.prop == 'sw' &&
                            scope.row.swstatus == '4' &&
                            scope.row.sw != ''
                        "
                        :class="'red'"
                        style="font-weight:bold;cursor: pointer;color: #ffffff;"
                      >
                        {{ scope.row.sw }} 超校核洪水位
                      </div>
                      <div
                        v-if="
                          item.prop == 'sw' &&
                            scope.row.swstatus == '3' &&
                            scope.row.sw != ''
                        "
                        :class="'orange'"
                        style="font-weight:bold;cursor: pointer;color: #ffffff;"
                      >
                        {{ scope.row.sw }}超设计洪水位
                      </div>
                      <div
                        v-if="
                          item.prop == 'sw' &&
                            scope.row.swstatus == '2' &&
                            scope.row.sw != ''
                        "
                        :class="'yellow'"
                        style="font-weight:bold;cursor: pointer;color: #ffffff;"
                      >
                        {{ scope.row.sw }}超正常蓄水位
                      </div>
                      <div
                        v-if="
                          item.prop == 'sw' &&
                            scope.row.swstatus == '1' &&
                            scope.row.sw != ''
                        "
                        :class="'blue'"
                        style="font-weight:bold;cursor: pointer;color: #ffffff;"
                      >
                        {{ scope.row.sw }}正常蓄水位以下
                      </div>
                      <div v-if="item.prop == 'sw' && scope.row.sw == ''"></div>
                      <!--                      <p v-if="item.prop == 'sw'">-->
                      <!--                        {{ scope.row.sw }}-->
                      <!--                      </p>-->
                      <p v-if="item.prop == 'skbg'" style="">
                        {{ scope.row.skbg }}
                      </p>
                    </template>
                  </el-table-column>
                </template>
              </template>
            </el-table-column>

            <el-table-column label="事件上报" v-if="tzType == 'xc'">
              <template v-for="(item, index) in tableHeader">
                <template v-if="item.prop == 'kslj' || item.prop == 'qt'">
                  <el-table-column
                    width="200"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                    :sortable="item.sortable"
                    :show-overflow-tooltip="true"
                    :key="index"
                  >
                    <template scope="scope">
                      <div
                        @click="clickXuncha(scope.row, 'patrol', item.prop)"
                        :class="scope.row[item.prop] > 0 ? 'maintain' : ''"
                        style="font-weight:bold;cursor: pointer"
                      >
                        {{ scope.row[item.prop] }}
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </template>
            </el-table-column>

            <!-- 险情上报 -->
            <template v-if="tzType == 'xc'">
              <template v-for="(item, index) in tableHeader">
                <template v-if="item.prop == 'xqsb'">
                  <el-table-column
                    width="80"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                    :sortable="item.sortable"
                    :show-overflow-tooltip="true"
                    :key="index"
                  >
                    <template scope="scope">
                      <div
                        @click="clickXuncha(scope.row, 'patrol', item.prop)"
                        :class="scope.row[item.prop] > 0 ? 'maintain' : ''"
                        style="font-weight:bold;cursor: pointer"
                      >
                        {{ scope.row[item.prop] }}
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </template>
            </template>

            <el-table-column label="日常养护(大坝)" v-if="tzType == 'yh'">
              <template v-for="(item, index) in tableHeader">
                <template
                  v-if="
                    item.prop == 'bpkq' ||
                      item.prop == 'gdqy' ||
                      item.prop == 'tbsq' ||
                      item.prop == 'scwh'
                  "
                >
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                    :sortable="item.sortable"
                    :show-overflow-tooltip="true"
                    :key="index"
                  >
                    <template scope="scope">
                      <div
                        @click="
                          handlerMaintain(
                            scope.row,
                            'maintain',
                            scope.row[item.prop]
                          )
                        "
                        :class="scope.row[item.prop] > 0 ? 'maintain' : ''"
                        style="font-weight:bold;cursor: pointer"
                      >
                        {{ scope.row[item.prop] }}
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="日常养护（设施设备）" v-if="tzType == 'yh'">
              <template v-for="(item, index) in tableHeader">
                <template
                  v-if="
                    item.prop == 'yhdql' ||
                      item.prop == 'qbjfws' ||
                      item.prop == 'qbjsq'
                  "
                >
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                    :sortable="item.sortable"
                    :show-overflow-tooltip="true"
                    :key="index"
                  >
                    <template scope="scope">
                      <div
                        @click="
                          handlerMaintain(
                            scope.row,
                            'maintain',
                            scope.row[item.prop]
                          )
                        "
                        :class="scope.row[item.prop] > 0 ? 'maintain' : ''"
                        style="font-weight:bold;cursor: pointer"
                      >
                        {{ scope.row[item.prop] }}
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </template>
            </el-table-column>

            <!-- 设备操作 -->
            <template v-for="(item, index) in tableHeader">
              <template v-if="item.prop == 'bz'">
                <el-table-column
                  :prop="item.prop"
                  :label="item.label"
                  align="center"
                  :show-overflow-tooltip="true"
                  :key="index"
                >
                  <template scope="scope">
                    <div
                      @click="
                        handlerOpraction(scope.row, 'operation', item.prop)
                      "
                      :class="scope.row[item.prop] ? 'maintain' : ''"
                      style="font-weight:bold;cursor: pointer"
                    >
                      <div v-if="scope.row[item.prop] == null">
                        点击添加备注
                      </div>
                      <div v-else>{{ scope.row[item.prop] }}</div>
                    </div>
                  </template>
                </el-table-column>
              </template>
            </template>
          </el-table>
        </div>
      </el-main>
    </el-container>

    <!-- 巡查详情 -->
    <FormInspectionDetail
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      @handleCloseAll="handleCloseAll"
      ref="inspectionDetailComponent"
    ></FormInspectionDetail>
    <!-- 养护详情 -->
    <DailyMaintenance
      :dialogDailyVisible.sync="dialogDailyVisible"
      :data="dialogData"
    ></DailyMaintenance>
    <!-- 添加修改备注 -->
    <AddRemark
      :dialogReVisible.sync="dialogReVisible"
      :data="dialogReData"
      @updateWork="updateWork"
    ></AddRemark>
  </div>
</template>
<script>
import { tbskListHeader } from "./apiConfig";
import { skListSizeTypeOptions } from "../reservoirManagement/apiConfig";
import FormInspectionDetail from "./detail/inspectionDetail";
import DailyMaintenance from "./detail/detailDailyMaintenance";
import AddRemark from "./detail/addRemark";
import {
  standing,
  generateAssignedOrder,
  getDocToHtml,
  getStatisticsList
} from "./api";
import { outNetUrl } from "@/api/base.js";
import table2excel from "js-table2excel";
import { Loading } from "element-ui";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: { FormInspectionDetail, DailyMaintenance, AddRemark },
  computed: {
    titleTime() {
      let time = this.$moment(this.value1).format("YYYY-MM-DD");
      let tiemArr = time.split("-");
      tiemArr[0] = tiemArr[0] + "年";
      tiemArr[1] = tiemArr[1] + "月";
      tiemArr[2] = tiemArr[2] + "日";
      return tiemArr.join("");
    },
    titleMonthTime() {
      let time = this.$moment(this.value2).format("YYYY-MM");
      let tiemArr = time.split("-");
      tiemArr[0] = tiemArr[0] + "年";
      tiemArr[1] = tiemArr[1] + "月";
      return tiemArr.join("");
    },
    nowTitle() {
      //type = this.tzType == 'xc' ? '巡查' : '养护'
      let time = this.select == "1" ? this.titleTime : this.titleMonthTime;
      return time;
    }
  },
  data() {
    return {
      activeNameBtn: "4",
      dialogData: {},
      dailyTime: this.getTimes(1 * 24),
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
      dialogVisible: false,
      dialogDailyVisible: false,
      dialogReVisible: false,
      tzType: "xc",
      tableLoading: true,
      input3: "",
      select: "1",
      value1: new Date(),
      value2: new Date(),
      tableHeight:
        window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 35,
      tableHeader: [],
      tableData: [],
      query: {
        data: {},
        start: 1,
        size: 20
      },
      total: 0,
      currentPage: 1,
      patrolTime: "",
      statistics: {
        patrol: "0",
        events: "0",
        danger: "0",
        maintain: "0"
      },
      dialogReData: {},
      loadingInstance: null,
      totalData: {}
    };
  },
  mounted() {
    this.getTb({ date: this.$moment(this.value1).format("YYYY-MM-DD") });
    this.tableHeader = tbskListHeader;
  },
  methods: {
    updateWork() {
      if (this.select == "1") {
        this.getTb({ date: this.$moment(this.value1).format("YYYY-MM-DD") });
      } else {
        this.getTb({ date: this.$moment(this.value2).format("YYYY-MM") });
      }
    },
    //巡查统计
    async getStatisticsList() {
      let params = {};
      try {
        let { data, msg, status } = await getStatisticsList(params);
        if (status) {
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //   时间
    dealDisabledDate(time) {
      let times = Date.now();
      return time.getTime() > times;
    },
    // 台账下载
    handlerDownloadWorkbench() {
      let type;
      type = this.tzType == "xc" ? "巡查" : "养护";
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `${this.nowTitle}浏阳市水库${type}台账.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //   下载巡查简报
    async handlerDownloadBulletin(type) {
      // 区分月报 周报 日报
      let params = {};
      if (type === "month") {
        params.type = "5";
      } else if (type === "week") {
        params.type = "4";
      } else if (type === "day") {
        params.createTm = this.$moment(this.value1).format("YYYY-MM-DD"); // this.dailyTime.split(' ')[0]
        params.type = "3";
      } else {
        this.$GXprompt.notify.warning("请选择一个时间");
        return;
      }
      //   this.loadingInstance = Loading.service({
      //     lock: true,
      //     text: '简报生成中',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)',
      //   })
      let { status, data } = await generateAssignedOrder(params);
      if (status) {
        let url = outNetUrl + data;
        //直接下载
        console.log(url, "url");
        let a = document.createElement("a");
        a.href = url;
        a.style.display = "none";
        // a.setAttribute('target', '_blank')
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // 在线预览的接口
        // this.getDocToHtml(url)
      } else {
        // this.loadingInstance.close()
        this.$GXprompt.notify.error(msg);
      }
    },
    async getDocToHtml(url) {
      let { type, data, message } = await getDocToHtml(url);
      if (type == 1) {
        this.loadingInstance.close();
        window.open(data[0], "_blank");
      } else {
        this.loadingInstance.close();
        this.$GXprompt.notify.error(message);
      }
    },
    //总计
    getSummaries(param) {
      const { columns, data } = param;
      //   console.log(columns, data, 'data')
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        if (index === 1) {
          sums[index] = this.totalData.townNum + "个乡镇";
          return;
        }
        if (index === 2) {
          sums[index] = this.totalData.nameNum + "座水库";
          return;
        }
        if (index === 3) {
          sums[index] = this.totalData.compoundNamePhone + "位巡查员";
          return;
        }
        if (this.tzType == "xc") {
          if (index === 4) {
            sums[index] =
              "巡查水库:" +
              this.totalData.patrolNum +
              "座; 未寻水库:" +
              this.totalData.noPatrolNum +
              "座; 巡查次数:" +
              this.totalData.patrolCount +
              "人次";
            return;
          }
          if (index === 5) {
            sums[index] =
              "有水位值上报:" +
              this.totalData.swCount +
              "座; 无水位值上报:" +
              this.totalData.noSwCount +
              "座";
            return;
          }
          if (index === 6) {
            sums[index] =
              "有坝高值:" +
              this.totalData.damHeight +
              "座; 无坝高值:" +
              this.totalData.noDamHeight +
              "座";
            return;
          }
          if (index === 7) {
            sums[index] = "水面无垃圾:" + this.totalData.rubbishNum + "件";
            return;
          }
          if (index === 8) {
            sums[index] = "其他事件上报:" + this.totalData.otherNum + "件";
            return;
          }
          if (index === 9) {
            sums[index] = "险情上报:" + this.totalData.dangerNum + "件";
            return;
          }
          if (index === 10) {
            sums[index] = "备注" + this.totalData.patroRemarkNum + "条";
            return;
          }
        } else if (this.tzType == "yh") {
          if (index === 4) {
            sums[index] = "溢洪道清理:" + this.totalData.yhdqlNum + "次";
            return;
          }
          if (index === 5) {
            sums[index] = "启闭机房卫生:" + this.totalData.qbjfwsNum + "次";
            return;
          }
          if (index === 6) {
            sums[index] = "启闭机刷漆:" + this.totalData.qbjsqNum + "次";
            return;
          }
          if (index === 7) {
            sums[index] = "坝坡砍青:" + this.totalData.bpkqNum + "次";
            return;
          }
          if (index === 8) {
            sums[index] = "沟道清淤:" + this.totalData.gdqyNum + "次";
            return;
          }
          if (index === 9) {
            sums[index] = "踏步清扫:" + this.totalData.tbsqNum + "次";
            return;
          }
          if (index === 10) {
            sums[index] = "水尺维护:" + this.totalData.scwhNum + "次";
            return;
          }
          if (index === 11) {
            sums[index] = "备注" + this.totalData.patroRemarkNum + "条";
            return;
          }
        }
        // const values = data.map((item) => Number(item[column.property]))
        // if (!values.every((value) => isNaN(value))) {
        //   sums[index] = values.reduce((prev, curr) => {
        //     const value = Number(curr)
        //     if (!isNaN(value)) {
        //       return prev + curr
        //     } else {
        //       return prev
        //     }
        //   }, 0)

        //   sums[index] += ' '
        // } else {
        //   sums[index] = '--'
        // }
      });

      return sums;
    },
    // 添加备注
    handlerOpraction(row, val, filed) {
      this.dialogReData = JSON.parse(JSON.stringify(row));
      this.dialogReData.type = this.dialogReData.bz === null ? "add" : "update";
      this.dialogReData.title = this.tzType == "xc" ? "巡查详情" : "养护详情";
      this.dialogReData.title =
      this.dialogReData.name + this.dialogReData.title;
      this.dialogReData.tabType = this.tzType;
      this.dialogReData.isMonth = this.select == "1" ? false : true;
      this.dialogReData.dayOrMonthValue =
      this.select == "1" ? this.value1 : this.value2;
      this.dialogReVisible = true;
    },
    // 养护跳转
    handlerMaintain(row, type, val) {
      if (val == 0) {
        this.$GXprompt.notify.warning("暂无养护记录");
        return;
      }
      row.title = this.tzType == "xc" ? "巡查详情" : "养护详情";
      row.title = row.name + row.title;
      row.tabType = this.tzType;
      row.isMonth = this.select == "1" ? false : true;
      row.dayOrMonthValue = this.select == "1" ? this.value1 : this.value2;
      this.dialogDailyVisible = true;
      this.dialogData = row;
    },
    //巡查跳转巡查记录
    clickXuncha(row, type, filed) {
      this.dialogData = JSON.parse(JSON.stringify(row));
      if (this.dialogData[filed] == 0) {
        this.$GXprompt.notify.warning("暂无巡查记录");
        return;
      }
      // dialogData 需要添加月或者日的却别字段
      this.tzType; //xc 巡查 yh  养护
      this.select; //1  日  2  月
      this.value1; //当前选择的日
      this.value2; //当前选择的月
      if (filed == "kslj") {
        this.dialogData.type = "4";
        this.dialogData.implementType = "8";
      } else if (filed == "qt") {
        this.dialogData.type = "4";
        this.dialogData.implementType = "18";
      } else if (filed == "xqsb") {
        this.dialogData.type = "5";
      } else {
        this.dialogData.type = "1";
      }
      this.dialogData.title = this.tzType == "xc" ? "巡查详情" : "养护详情";
      this.dialogData.title = this.dialogData.name + this.dialogData.title;
      this.dialogData.tabType = this.tzType;
      this.dialogData.isMonth = this.select == "1" ? false : true;
      this.dialogData.dayOrMonthValue =
        this.select == "1" ? this.value1 : this.value2;
      this.dialogVisible = true;
      return;
      //不跳转了
      //patrol
      let time = "";
      let name =
        type === "patrol" ? "inspectionTour-sk" : "dailyMaintenance-sk";
      if (this.select == 1) {
        time = this.$moment(this.value1).format("YYYY-MM-DD");
      } else {
        time = this.$moment(this.value2).format("YYYY-MM");
      }
      this.$router.push({
        name,
        query: {
          data: {
            select: this.select,
            time: time,
            data: row
          }
        }
      });
    },
    handleCloseAll() {
      this.dialogData = {};
    },
    //时间快捷按钮-本月今日
    handlerTime(time, type) {
      let t = this.getTimes(time);
      if (type == "todayM") {
        this.activeNameBtn = 3;
        this.patrolTime = t.substring(0, 7);
        this.select = "2";
      } else if (type == "today") {
        this.activeNameBtn = 4;
        this.patrolTime = t.substring(0, 10);
        this.select = "1";
      }
      this.getTb({ date: this.patrolTime });
    },
    getTimes(n) {
      const start = new Date();
      let cont = start.setTime(start.getTime() - 3600 * 1000 * n);
      let cont2 = this.formateDate(new Date(cont));
      return cont2;
    },
    //格式化时间
    formateDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let h = time.getHours();
      let min = time.getMinutes();
      let s = time.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return year + "-" + month + "-" + day + " " + h + ":" + min + ":" + s;
    },
    //查询台账数据
    async getTb(pam) {
      this.tableLoading = true;
      let sum = tbskListHeader;
      this.tableData = [];
      this.totalData = {};
      let { msg, data, status, total } = await standing(pam);
      if (status) {
        this.tableLoading = false;
        data.forEach((a, i) => {
          skListSizeTypeOptions.forEach(e => {
            if (a.tegr == e.value) {
              data[i].tegr = e.label;
            }
          });
        });
        let patrol = 0,
          events = 0,
          danger = 0,
          maintain = 0;
        data.map(item => {
          item.compoundName = item.name + "(" + item.tegr + ")";
          item.compoundNamePhone = item.username + "(" + item.phone + ")";
          let sw = item.sw;
          sw = sw.replace(/^[0]+/, "").replace(/^\./, "0.");
          item.sw = sw;
          //   自己统计
          patrol += parseInt(item.xuncha);
          events += item.kslj + item.qt;
          danger += item.xqsb;
          if (
            item.yhdql > 0 ||
            item.qbjfws > 0 ||
            item.qbjsq > 0 ||
            item.bpkq > 0 ||
            item.gdqy > 0 ||
            item.tbsq > 0 ||
            item.scwh > 0
          ) {
            maintain += 1;
          }
        });
        let townArr = [];
        let patrolCount = 0,
          patrolNum = 0,
          swCount = 0,
          damHeight = 0,
          rubbishNum = 0,
          noRubbishNum = 0,
          otherNum = 0,
          noOtherNum = 0,
          dangerNum = 0,
          noDdangerNum = 0,
          patroRemarkNum = 0;

        let bpkqNum = 0,
          gdqyNum = 0,
          tbsqNum = 0,
          scwhNum = 0,
          yhdqlNum = 0,
          qbjfwsNum = 0,
          qbjsqNum = 0,
          dayRemarkNum = 0;
        data.forEach(item => {
          // 合计的数据
          //   巡查
          patrolCount += item.xuncha;
          if (item.xuncha && item.xuncha > 0) {
            patrolNum += 1;
          }
          if (item.sw) {
            swCount += 1;
          }
          if (item.skbg && item.skbg > 0) {
            damHeight += 1;
          }
          if (item.kslj && item.kslj > 0) {
            rubbishNum += 1;
          } else {
            noRubbishNum += 1;
          }
          if (item.qt && item.qt > 0) {
            otherNum += 1;
          } else {
            noOtherNum += 1;
          }
          if (item.xqsb && item.xqsb > 0) {
            dangerNum += 1;
          } else {
            noDdangerNum += 1;
          }
          if (item.bz != null) {
            patroRemarkNum += 1;
          }

          //   养护
          if (item.bpkq && item.bpkq > 0) {
            bpkqNum += item.bpkq;
          }
          if (item.gdqy && item.gdqy > 0) {
            gdqyNum += item.gdqy;
          }
          if (item.tbsq && item.tbsq > 0) {
            tbsqNum += item.tbsq;
          }
          if (item.scwh && item.scwh > 0) {
            scwhNum += item.scwh;
          }
          if (item.yhdql && item.yhdql > 0) {
            yhdqlNum += item.yhdql;
          }
          if (item.qbjfws && item.qbjfws > 0) {
            qbjfwsNum += item.qbjfws;
          }
          if (item.qbjsq && item.qbjsq > 0) {
            qbjsqNum += item.qbjsq;
          }
          //   获取行政区数据
          if (!townArr.includes(item.town)) {
            townArr.push(item.town);
          }
        });
        this.totalData.townNum = townArr.length; //行政区
        this.totalData.nameNum = data.length;
        this.totalData.compoundNamePhone = data.length;
        this.totalData.patrolCount = patrolCount; //巡查次数
        this.totalData.patrolNum = patrolNum; //巡查数量
        this.totalData.noPatrolNum = data.length - patrolNum; //未巡查数量
        this.totalData.swCount = swCount; //水位次数
        this.totalData.noSwCount = data.length - swCount; //无水位次数
        this.totalData.damHeight = damHeight; //水库坝高
        this.totalData.noDamHeight = data.length - damHeight; //无水库坝高
        this.totalData.rubbishNum = rubbishNum; //水面拉架
        this.totalData.noRubbishNum = noRubbishNum; //无水面垃圾
        this.totalData.otherNum = otherNum; //其他
        this.totalData.noOtherNum = noOtherNum; //无水库坝高
        this.totalData.dangerNum = dangerNum; //险情上报
        this.totalData.noDdangerNum = noDdangerNum; //险情上报
        this.totalData.patroRemarkNum = patroRemarkNum; //备注
        // 养护
        this.totalData.bpkqNum = bpkqNum;
        this.totalData.gdqyNum = gdqyNum;
        this.totalData.tbsqNum = tbsqNum;
        this.totalData.scwhNum = scwhNum;
        this.totalData.yhdqlNum = yhdqlNum;
        this.totalData.qbjfwsNum = qbjfwsNum;
        this.totalData.qbjsqNum = qbjsqNum;
        console.log(this.totalData, "totalData");
        this.statistics = {
          patrol,
          events,
          danger,
          maintain
        };
        this.tableData = data;
        this.getSpanArr(this.tableData);
      } else {
        this.tableLoading = false;

        this.$message({
          message: msg,
          type: "success"
        });
      }
    },
    //序号
    table_index(index) {
      return (this.currentPage - 1) * this.query.size + index + 1;
    },
    //合并单元格
    getSpanArr(data) {
      this.spanArr = [];
      this.pos = "";
      this.poss = "";
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;   
          this.poss = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].town === data[i - 1].town) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    //合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    //btn-今日
    changeT(data) {
      this.activeNameBtn = 0;
      this.getTb({ date: data });
    },
    //btn-本月
    changeM(data) {
      this.activeNameBtn = 0;
      this.getTb({ date: data });
    },
    //按日-按月
    changeTM(data) {
      if (data == "1") {
        this.activeNameBtn = 4;
        this.getTb({ date: this.$moment(this.value1).format("YYYY-MM-DD") });
      } else {
        this.activeNameBtn = 3;
        this.getTb({ date: this.$moment(this.value2).format("YYYY-MM") });
      }
    },
    //btn-巡查(xc),养护(yh)
    taizType(type) {
      this.tzType = type;
    }
  },
};
</script>
<style lang='scss' scoped>
.workbrench {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.22rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  .maintain {
    background: skyblue;
    border-radius: 0.05rem 0.3rem;
    border-bottom: 1px solid #18847f;
  }
  .red {
    background: red;
    border-radius: 0.05rem 0.3rem;
    border-bottom: 1px solid #18847f;
  }
  .yellow {
    background: rgb(210, 210, 26);
    border-radius: 0.05rem 0.3rem;
    border-bottom: 1px solid #18847f;
  }
  .orange {
    background: orange;
    border-radius: 0.05rem 0.3rem;
    border-bottom: 1px solid #18847f;
  }
  .blue {
    background: rgb(14, 114, 221);
    border-radius: 0.05rem 0.3rem;
    border-bottom: 1px solid #18847f;
  }
  >>> .el-container {
    // background: red;
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  .btnactive {
    background: #29958b !important;
    color: #fff !important;
  }
  .btn {
    background: #fff;
    color: #29958b;
  }
  .con {
    .btn-group {
      width: 6.5rem;
      margin: 0;
      font-size: 0.14rem;
      color: #000000;
      span {
        color: #18847f;
        font-size: 0.16rem;
        font-weight: bold;
      }
    }
    .title {
      text-align: center;
      color: #25867d;
      font-size: 24px;
      font-weight: bold;
    }
    .query {
      width: 1000px;
      position: absolute;
      right: 60px;
      top: 45px;
    }
    >>> .el-table {
      overflow: visible !important;
    }
    >>> .el-table {
      .el-table__body {
        height: 100%;
      }
    }
    >>> .el-table__header-wrapper,
    .el-table__footer-wrapper {
      border-top: 1px solid #dfe6ec !important;
    }
    >>> .el-table thead.is-group th {
      background: #f4fbf5;
      color: #217870;
    }

    >>> .el-table--border th {
      text-align: center !important;
      border-right: 1px solid #dfe6ec !important;
    }
    >>> .el-table--border td {
      border-right: 1px solid #dfe6ec !important;
    }
    >>> .el-icon-date:before {
      color: #29958b !important;
    }
    >>> .el-table--mini td,
    .el-table--mini th {
      padding: 4px 0;
    }
    >>> .el-table__footer-wrapper tbody td {
      color: rgb(255, 255, 255);
      font-size: 12px;
      font-weight: bolder;
      background-color: #29958b;
    }
    >>> .el-select .el-input {
      width: 80px;
    }
    >>> .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
    >>> .el-header {
      height: 70px !important;
    }
    >>> .el-main {
      padding: 0px 20px 10px 20px;
      background: #fff;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 130px !important;
  }
  >>> .el-table__footer-wrapper {
    div {
      line-height: 1.5 !important;
      border: 1px solid #29958b;
    }
  }
}
</style>
