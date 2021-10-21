<template>
  <div class="Diacon">
    <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="basic"
        ><basic :data="data" :subData="subData" :rscd="rscd" @on-back="backFun" />
      </el-tab-pane>
      <el-tab-pane label="参数信息" name="parameter">
        <parameter :data="data" :subData="subData" :rscd="rscd" @on-back="backFun" />
      </el-tab-pane>
      <el-tab-pane label="附件信息" name="accessory">
        <accessory :data="data" :subData="subData" :rscd="rscd" @on-back="backFun"
      /></el-tab-pane>
    </el-tabs>
    <!-- <div class="tab_content">
      <components
        :is="activeName"
        :data="data"
        :subData="subData"
        :rscd="rscd"
        @on-back="backFun"
      ></components>
    </div> -->
  </div>
</template>
<script>
import { generateUUID } from "@/utils";
import basic from "./siteBasic"; //基础信息
import parameter from "./siteParameter"; //基础信息
import accessory from "./siteAccessory"; //基础信息
export default {
  props: ["data"],
  components: {
    basic,
    parameter,
    accessory,
  },
  data() {
    return {
      activeName: "basic",
      rscd: "",
      subData: {},
    };
  },
  methods: {
    //切换
    handleClick(tab) {
      debugger;
      console.log(tab, "tab", this.rscd, "this.rscd");

      if (!this.subData.id && this.data.type == "add") {
        this.$notify.warning({
          title: "温馨提示",
          message: "请先填写基础信息！！！",
        });
        this.activeName = "basic";
      }
    },
    //关闭弹框的事件
    //关闭弹框
    handleClose() {
      this.$emit("update:dialogVisible", false); //触发 input 事件，并传入新值
    },
    backFun(val) {
      this.subData = val;
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
  width: 100%;
}
>>> .el-tabs__content {
  height: 100%;
  overflow: auto;
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
