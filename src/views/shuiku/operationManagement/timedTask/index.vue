<!--
 * @Author: dang
 * @Date: 2021-04-09 09:46:45
 * @LastEditTime: 2021-09-30 10:40:05
 * @LastEditors: --
 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\operationManagement\timedTask\index.vue
-->
<template>
  <div class="timed-task">
    <!-- &lt;!&ndash; 定时任务 &ndash;&gt; -->
    <el-container class="con">
      <el-main>
        <el-header>
          <el-row>
            <el-col :span="1" style="width: 80px">
              <p style="line-height: 30px; text-align: right">任务名称&nbsp;&nbsp;</p>
            </el-col>
            <el-col :span="6">
              <el-input
                v-model="searchVal"
                size="mini"
                clearable
                placeholder="请输入内容"
              />
            </el-col>
            <el-col :span="2">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="queryList"
                >查询</el-button
              >
            </el-col>
            <el-col :span="2">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="handlerGoTo"
                >添加</el-button
              >
            </el-col>
            <el-col :span="2">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="handlerDel"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-header>
        <div class="empty">
          <el-empty description="暂无定时任务" v-if="contentList.length < 1"></el-empty>
        </div>
        <div class="content-wrapper" :style="{ height: tableHeight }">
          <el-card v-for="(item, index) in contentList" :key="index" class="box-card">
            <div slot="header" class="clearfix">
              <el-checkbox
                :key="item.id"
                @change="handleSelectionChange($event, item.id)"
              />
              <span>{{ item.taskName }}</span>

              <el-popover placement="bottom" width="161" trigger="click">
                <div style="text-align: center; margin: 0">
                  <el-button size="mini" type="primary" @click="handlerGoTo(item)"
                    >修改</el-button
                  >
                  <el-button type="danger" size="mini" @click="handlerDel(item)"
                    >删除</el-button
                  >
                </div>
                <el-button
                  slot="reference"
                  style="
                    position: absolute;
                    right: 0;
                    z-index: 999;
                    top: -10px;
                    fontsize: 0.18rem;
                  "
                  icon="el-icon-more"
                  type="text"
                  @click="handlerpopover(item)"
                />
              </el-popover>
              <el-switch
                v-model="item.timerSwitchFlag"
                style="float: right; padding-right: 0.3rem"
                active-color="#29958B"
                inactive-color="#D1D5DA"
                @change="handlerSwitch($event, item)"
              />
            </div>

            <div class="text item">
              当前状态 ：
              <el-button
                size="mini"
                :type="item.timerSwitchFlag ? 'primary' : 'danger'"
                >{{ item.timerSwitchFlag ? "已开启" : "已关闭" }}</el-button
              >
            </div>
            <div class="text item">
              任务类型 ： <span class="task-type">{{ item.taskTypeLabel }}</span>
            </div>
            <div class="text item">
              执行时间 ：<span
                v-for="(ite, idx) in item.execTimeList"
                :key="idx"
                class="task-type time"
                >{{ ite.execBeginTime }} - {{ ite.execEndTime }}</span
              >
            </div>
            <div class="text item">
              执行周期 ：
              <span class="task-type cycle"
                >{{ item.loopBeginDate }} - {{ item.loopEndDate }}</span
              >
              <span class="task-type cycle">
                每{{ item.loopPeriodLabel }}执行{{ item.loopFreq }}次</span
              >
            </div>
          </el-card>
        </div>
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[query.size, 100, 200, 300, 400]"
          :page-size="query.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  getOTaskListByPage,
  updateTaskSwitch,
  deleteBatchById,
  getSvgFilePath,
} from "./api.js";
import Vue from "vue/dist/vue.esm.js";

export default {
  data() {
    return {
      svgUrl: "http://221.222.254.93:19001/file/dam.svg", // svg的url
      // svgUrl:"http://221.222.251.177:19001/file/733998ab8ed14ca38000efee2d678b11.svg",
      svgDom: null, // 获取到的svg元素
      /* svg的变量 */
      photoResult: {
        resultVal: 0, // 测试结果 - 值
        resultMsg: "未检测", // 测试结果 - 字段
        resultColor: "#dcdee2", // 测试结果 - 字段背景色
      },
      searchVal: "",
      query: {
        data: {},
        start: 1,
        size: 20,
      },
      total: 0,
      currentPage: 1,
      activeId: 0,
      checked: false,
      popoverVisible: true,
      switchFlag: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 60,
      contentList: [],
      selectiondata: [],
      loopPeriodList: [],
      taskTypeList: [],
    };
  },
  async mounted() {
    // 将takePhoto方法绑定到window下面，提供给外部调用
    window["handleClick"] = (id) => {
      this.test(id);
    };
  },
  created() {
    this.getConstant();
    this.queryList();
    // this.getSvg()
    // this.loadSVG()
  },
  methods: {
    // 常量
    getConstant() {
      const { loopPeriodList, taskTypeList } = JSON.parse(
        sessionStorage.getItem("constant")
      );
      this.loopPeriodList = loopPeriodList;
      this.taskTypeList = taskTypeList;
    },
    //   获取任务包列表
    async queryList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.query.size,
        taskName: this.searchVal,
      };
      try {
        const { status, data, total, msg } = await getOTaskListByPage(params);
        if (status) {
          data.map((item, index, arr) => {
            this.loopPeriodList.forEach((ite) => {
              if (item.loopPeriod == ite.value) {
                item.loopPeriodLabel = ite.label;
              }
            });
            this.taskTypeList.forEach((ite) => {
              if (item.taskType == ite.value) {
                item.taskTypeLabel = ite.label;
              }
            });
            arr[index].loopBeginDate = item.loopBeginDate.split(" ")[0];
            arr[index].loopEndDate = item.loopEndDate.split(" ")[0];
            arr[index].timerSwitchFlag = !!parseInt(item.timerSwitch);
          });
          this.contentList = data;
          this.total = Number(total);
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (err) {
        this.$GXprompt.notify.error("网络连接错误");
      }
    },
    //   修改状态
    async handlerSwitch(flag, val) {
      const params = {
        taskOperId: val.id,
        switchState: flag ? "1" : "0",
      };

      try {
        const { status, msg } = await updateTaskSwitch(params);
        if (status) {
          this.queryList();
          this.$GXprompt.notify.success(msg);
        } else {
          this.$GXprompt.notify.error(msg);
        }
      } catch (err) {
        this.$GXprompt.notify.error("网络连接错误");
      }
    },
    //   修改 跳转
    handlerGoTo(params) {
      this.$router.push({
        path: "taskDistribution",
        query: { id: params.id },
      });
    },
    // 复选框功能
    handleSelectionChange(e, val) {
      if (e) {
        this.selectiondata.push(val);
      } else {
        this.selectiondata = this.selectiondata.filter((item) => item != val);
      }
    },
    // 删除
    handlerDel(val) {
      if (!val.id && this.selectiondata.length == 0) {
        this.$GXprompt.notify.warning("请选择操作项");
        return;
      }
      this.$GXprompt.messageBox.confirm("确定要删除吗？", null, async (flag) => {
        if (flag) {
          try {
            let params = "";
            if (val.id) {
              params = val.id;
            } else {
              params = this.selectiondata.join(",");
            }
            const { status, msg } = await deleteBatchById({ operIds: params });
            if (status) {
              this.$GXprompt.notify.success(msg);
            } else {
              this.$GXprompt.notify.error(msg);
            }
            this.queryList();
          } catch (err) {
            this.$GXprompt.notify.error("网络连接错误");
          }
        }
      });
    },
    handlerpopover(item) {
      this.activeId = item.id;
    },
    clickBtn() {},
    handleSizeChange(val) {
      this.size = val;
      this.queryList({
        page: this.currentPage,
        size: val,
        name: this.searchVal,
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList({
        page: this.currentPage,
        size: this.query.size,
        name: this.searchVal,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.timed-task {
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;

  > .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
    display: block;
  }

  > .el-header {
    height: 30px !important;
  }

  .con {
    // display: flex;
    flex-flow: row;
    width: 98%;
    height: 98%;
    margin: auto;
    align-items: center;
    justify-content: center;

    .content-wrapper {
      //   padding-top: 0.1rem;
      height: 7.5rem;
      overflow-y: scroll;
      // display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      align-self: flex-start;

      > .el-popover {
        right: 0;
      }

      .text {
        font-size: 14px;
      }

      > .el-card__body {
        padding-top: 0.1rem;
      }

      .item {
        margin-bottom: 0.06rem;

        .task-type {
          display: inline-block;
          padding: 0.03rem 0.05rem;
          height: 0.26rem;
          background: #cfe5e1;
          text-align: center;
          border-radius: 0.02rem;
          font-size: 0.14rem;
          color: #000000;

          span {
          }
        }

        .time {
          margin-right: 0.05rem;
          margin-top: 0.05rem;
        }

        .cycle {
          background: #fff;
        }
      }

      > .el-card__header {
        padding: 0.1rem 0.15rem;
        position: relative;
      }

      .clearfix {
        position: relative;
      }

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }

      .clearfix span {
        font-size: 0.16rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #29958b;
      }

      .clearfix:after {
        clear: both;
      }

      .box-card {
        width: 4.1rem;
        height: 2.2rem;
        margin: 0.11rem;
      }
    }

    .tb1 {
      height: 100%;
      margin-right: 0.1rem;
      width: 73%;
      // border: 1px solid #29958b;
      > .el-tabs__item:hover {
        color: #29958b;
        cursor: pointer;
      }

      > .el-tabs__item.is-active {
        color: #29958b;
      }

      > .el-tabs__active-bar {
        background-color: #29958b;
      }

      > .el-table--group::after,
      .el-table--border::after,
      .el-table::before {
        content: "";
        position: absolute;
        background-color: transparent;
        z-index: 1;
      }
    }

    .tb2 {
      height: 100%;
      flex: 1;
      // width: calc(50% - 10px);
      border-left: 1px solid #cfe5e1;

      > .el-button--mini.is-round {
        padding: 2px 10px;
      }

      > .el-card__body {
        padding: 0px;
      }

      .rainchart {
        padding-top: 20px;
        //   border: 1px solid red;
        display: flex;
        width: 88%;
        margin: auto;
        height: 300px;
      }

      .num {
        position: relative;
        top: 20px;
        text-align: center;
        width: 90%;
        margin: auto;
      }
    }
  }
}
</style>
<style type="text/css">
.st0 {
  fill: #c3a365;
}

.st1 {
  fill: #67675c;
}

.st2 {
  fill: #808080;
  stroke: #2b2018;
  stroke-miterlimit: 10;
}

.st3 {
  fill: #888675;
  stroke: #3d342d;
  stroke-miterlimit: 10;
}

.st4 {
  fill: #cba573;
  stroke: #5b4c45;
  stroke-miterlimit: 10;
}

.st5 {
  fill: #b79f78;
}

.st6 {
  fill: #6a593b;
}
</style>
