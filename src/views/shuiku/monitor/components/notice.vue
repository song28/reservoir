<template>
  <div class="notice">
    <div class="history">
      <div class="query">
        <div class="div-title">
          <div class="title_name">
            <i></i>
            <div class="pointHiddenTitle">发布通知</div>
          </div>
        </div>
        <el-row
          class="btn-group"
          style="width:100%;text-align:left;padding:2px 10px 0px 15px"
        >
          <el-col :span="24">
            <el-button
              type="skbtn"
              plain
              size="mini"
              icon="el-icon-thumb"
              @click="clickPublick()"
              >发布通知</el-button
            >
          </el-col>
        </el-row>
        <div class="themeN">
          <span class="pubtitle">发布主题：</span>
          <el-input
            size="mini"
            placeholder="请输入发布主题"
            v-model="inputTheme"
            clearable
          ></el-input>
          <div class="chax">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="ConditionQueryInfo()"
              >查询</el-button
            >
          </div>
        </div>
      </div>
      <div class="title">
        <div class="histitle">历史发布内容</div>
      </div>
      <div class="con" v-if="show">
        <div class="Cnotice" v-for="(item, index) in historyInfo" :key="index">
          <div class="Ctype">
            <div class="Cfour">[通知]</div>
            {{ item.title }}
          </div>
          <div class="Cconcon">
            <div class="desc">发布日期：{{ item.createtm }}</div>
            <div class="btn">
              <div :to="{ path: '/' }" class="del" @click="dele(item)">
                删除
              </div>
              <div :to="{ path: '/' }" class="more" @click="detail(item)">
                详情
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div class="detail" v-if="!show">
        <div @click="back">＜返回 消息详情</div>
        <div
          @click="down"
          v-if="curentData.filepath != null"
          style="text-align:right;margin-right:20px;color:orange"
        >
          下载附件
        </div>
        <div style="font-size:16px;font-weight:bold;margin:20px 0px 10px 20px">
          {{ curentData.title }}
          <span v-if="curentData.isopen == 1">(已公开)</span>
          <span v-if="curentData.isopen == 0">(未公开)</span>
        </div>
        <el-row style="margin:0px 0px 10px 20px">
          <el-col :span="24"> 发布时间：{{ curentData.createtm }} </el-col>
        </el-row>
        <div style="margin:0px 0px 10px 20px">{{ curentData.content }}</div>
      </div>
    </div>
    <Dialog
      :dialogVisible.sync="dialogVisible"
      :data="dialogData"
      @backDialogData="backDialogData"
    ></Dialog>
  </div>
</template>
<script>
import Dialog from "./common/dialog";
import { queryMessage, delMessage } from "../api";

export default {
  components: {
    Dialog
  },
  data() {
    return {
      curentData: {},
      show: true,
      dialogData: {
        title: "发布通知",
        type: "add",
        data: {}, //数据
        pageType: "notice" //页面类型
      },
      dialogVisible: false,
      inputTheme: "", //查询主题
      name: "",
      historyInfo: [],
      textarea: "",
      activeName: "first", //ghn-切换tab
      value1: [] //ghn-时间选择器
    };
  },
  mounted() {
    this.getNotice();
  },
  methods: {
    //发布通知
    clickPublick() {
      this.dialogVisible = true;
    },
    //查询按钮
    ConditionQueryInfo() {
      this.getNotice();
    },
    //下载附件
    down() {
      window.open(this.curentData.filepath);
    },
    //详情返回
    back() {
      this.show = true;
    },
    //跳转详情
    detail(item) {
      this.curentData = item;
      this.show = !this.show;
    },
    //删除通知数据
    async dele(item) {
      let { status, msg, data } = await delMessage({ id: item.id });
      if (status) {
        this.getNotice();
      } else {
        this.$notify.error({
          title: "失败",
          message: msg
        });
      }
    },
    //查询通知数据
    async getNotice() {
      this.historyInfo = [];
      let { status, msg, data } = await queryMessage({
        title: this.inputTheme
      });
      if (status) {
        this.historyInfo = data;
      } else {
        this.$notify.error({
          title: "失败",
          message: msg
        });
      }
    },
    //关闭发布弹框
    backDialogData(data) {
      this.dialogData.data = {};
      this.getNotice();
    }
  }
};
</script>
<style scoped lang='scss'>
.notice {
  background: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title_name {
    color: #29958b;
    font-size: 16px;
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .title_name i {
    width: 3px;
    height: 0.14rem;
    background: #29958b;
    margin-right: 4px;
  }
  .pointHiddenTitle {
    font-size: 16px;
  }
  .history {
    height: 100%;
    overflow-y: scroll;
    background: #ffffff;
    border: 1px solid rgba(205, 230, 255, 1);
    margin-left: 0.5%;
    width: 100%;
    color: #333333;
    .pubtitle {
      width: 100px;
      float: left;
      padding-left: 15px;
    }
    .el-input {
      color: #000000;
      width: calc(100% - 220px);
      float: left;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: calc(100% - 120px);
    }
    .query {
      width: 100%;
      height: 100px;
      border: 1px solid rgba(205, 230, 255, 1);
      .time {
        height: 40px;
        line-height: 40px;
      }
      .themeN {
        height: 40px;
        line-height: 40px;
      }
      .chax {
        float: left;
        padding-left: 13px;
        border-radius: 2px;
      }
    }
    .title {
      .histitle {
        height: 30px;
        width: 100%;
        background: rgba(238, 244, 250, 1);
        color: #29958b;
        font-weight: bold;
        padding-left: 15px;
        line-height: 30px;
      }
    }
    .con {
      height: calc(100% - 280px);
      margin: 15px;
      background: #ffffff;
      overflow: auto;
      .Cnotice {
        margin-bottom: 0.1rem;
        margin-top: 0rem;
        width: 100%;
        height: 70px;
        position: relative;
        .Ctype {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.14rem;
          font-family: PingFang SC;
          width: 100%;
          font-weight: bold;

          .Cfour {
            margin-top: 0.12rem;
            height: 0.16rem;
            line-height: 0.16rem;
            width: 40px;
            text-align: center;
            border-radius: 2px;
            float: left;
            color: #000000;
            margin-right: 0.1rem;
          }
          .Ctime {
            position: absolute;
            right: 0.12rem;
            top: 0px;
            float: left;
            color: #909399;
            height: 0.4rem;
            line-height: 0.4rem;
            font-weight: normal;
          }
        }

        .Cconcon {
          width: 100%;
          clear: both;
          font-size: 0.14rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: #4c4c4c;
          height: 30px;
          line-height: 30px;
          .desc {
            float: left;
            width: 60%;
          }
          .btn {
            position: absolute;
            right: 15px;
            height: 30px;
            line-height: 30px;

            .del {
              width: 30px;
              border-bottom: 1px solid #ff4747;
              color: #ff4747;
              float: left;
              line-height: 20px;
            }
            .more {
              margin-left: 10px;
              float: left;
              width: 30px;
              color: #20b2aa;
              border-bottom: 1px solid #20b2aa;
              line-height: 20px;
            }
          }
        }
      }
      hr {
        clear: both;
        width: 100%;
        margin: 0 auto;
        height: 1px;
        background-color: #eeeeee;
        border: none;
      }
    }
    .fenye {
      position: absolute;
      right: 15px;
    }
  }
}
</style>