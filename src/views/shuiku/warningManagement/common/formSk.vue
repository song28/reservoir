<template>
  <div class="Diacon">
    <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="basicData"> </el-tab-pane>
      <el-tab-pane label="大坝信息" name="damData"> </el-tab-pane>
      <el-tab-pane label="溢洪道信息" name="spillWay"> </el-tab-pane>
      <el-tab-pane label="工程效益信息" name="benefit"> </el-tab-pane>

      <el-tab-pane label="特征数据" name="characteristic"> </el-tab-pane>
      <el-tab-pane label="库容曲线" name="capacityCurve"> </el-tab-pane>
      <el-tab-pane label="档案资料" name="archivalData"> </el-tab-pane>
    </el-tabs>
    <div class="tab_content">
      <components
        :is="activeName"
        :data="data"
        :rscd="rscd"
        @on-back="backFun"
      ></components>
    </div>
  </div>
</template>
<script>
import { generateUUID } from "@/utils";
import basicData from "./basicData"; //基础信息
import damData from "./damData"; //大坝信息
import spillWay from "./spillWay"; //溢洪道信息
import benefit from "./benefit"; //工程效益信息

import characteristic from "./characteristic"; //特征数据
import capacityCurve from "./capacityCurve"; //库容曲线
import archivalData from "./archivalData"; //档案资料
export default {
  props: ["data"],
  components: {
    basicData,
    damData,
    spillWay,
    benefit,
    characteristic,
    capacityCurve,
    archivalData,
  },
  data() {
    return {
      activeName: "basicData",
      rscd: "",
    };
  },
  methods: {
    //切换
    handleClick(tab) {
      debugger;
      console.log(tab, "tab", this.rscd, "this.rscd");

      if (!this.rscd && this.data.type == "add") {
        this.$notify.warning({
          title: "温馨提示",
          message: "请先填写基础信息！！！",
        });
        this.activeName = "basicData";
      }
    },
    //关闭弹框的事件
    //关闭弹框
    handleClose() {
      this.$emit("update:dialogVisible", false); //触发 input 事件，并传入新值
    },
    backFun(val) {
      this.rscd = val;
      this.$emit(":update:data.data", { rscd: val });
      alert(this.rscd);
    },
  },
  created() {},
};
</script>

<style lang="scss" type="text/scss" scoped>
.Diacon {
  width: 100%;
  height: 100%;
  // height: 7rem;
  display: flex;
  overflow: hidden;

  .tab_content {
    width: calc(100% - 120px);
    padding: 0.2rem;
  }
  .right-btns {
    width: 50px;
    padding: 0.2rem 0;
  }
  >>> .el-form-item__label {
    background: #f4fbf5;
    border-right: 1px solid #dedede;
  }

  >>> .el-form-item {
    margin-bottom: 22px;
    border: 1px solid #dedede;
  }
  >>> .el-input__inner {
    border: 1px solid #fff;
  }
}

>>> .el-dialog {
  width: 100%;
  height: 7.6rem;
}
>>> .el-tabs {
  height: 100%;
  width: 120px;
}
//背景颜色
>>> .el-tabs--left .el-tabs__header.is-left {
  background: #f4fbf5 !important;
}
//左边距离
>>> .el-tabs__nav-scroll {
  padding-left: 0px !important;
}
>>> .el-tabs--left,
.el-tabs--right {
  height: auto;
}
>>> .el-tabs__item {
  width: 120px;
  height: 80px;
  line-height: 80px;
}
>>> .el-dialog .el-dialog__body {
  padding: 0 0.4rem 0.15rem 0 !important;
}
>>> .el-tabs__item.is-active {
  color: #29958b !important;
  background: #c8faf5;
}
>>> .el-tabs__active-bar {
  background: #29958b !important;
}
>>> .el-tabs__item:hover {
  color: #29958b;
  cursor: pointer;
}
>>> .el-icon-close:before {
  content: "\E6DB";
  color: #fff;
}
</style>
