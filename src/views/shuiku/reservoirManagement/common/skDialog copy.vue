<template>
  <div class="dialogMap">
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="80%"
      :append-to-body="true"
    >
      <div slot="title" class="horn">
        <div class="lefts">
          <div class="titleBig" style="color: #fff; font-size: 16px">
            {{ data ? data.title : "水库详情" }}
          </div>
        </div>
      </div>
      <div class="dialog-body">
        <div class="Diacon">
          <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="basicData"> </el-tab-pane>
            <el-tab-pane label="大坝信息" name="damData"> </el-tab-pane>
            <el-tab-pane label="特征数据" name="characteristic"> </el-tab-pane>
            <el-tab-pane label="库容曲线" name="capacityCurve"> </el-tab-pane>
            <el-tab-pane label="档案资料" name="archivalData"> </el-tab-pane>
          </el-tabs>
          <div class="tab_content">
            <components :is="activeName" :data="data"></components>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { generateUUID } from "@/utils";
import basicData from "./basicData"; //基础信息
import damData from "./damData"; //大坝信息
import characteristic from "./characteristic"; //特征数据
import capacityCurve from "./capacityCurve"; //库容曲线
import archivalData from "./archivalData"; //档案资料
export default {
  /**
   * commonData {
   *       data:  {gid:'',name:'',userid:'',roleid:'',code:''}, 水库id,水库编码(库容曲线)，水库名称name,人员角色rid，人员uid，
   *       point:[{},{},{}]      水库数据,
   *       type:'xc'               xc/yh 巡查养护
   * }
   */
  props: ["data", "dialogVisible"],
  components: {
    basicData,
    damData,
    characteristic,
    capacityCurve,
    archivalData,
  },
  data() {
    return {
      activeName: "basicData",
    };
  },
  methods: {
    //接收修改水库信息
    updateMarket(data) {
      this.$emit("updateMarket", data);
    },
    //切换
    handleClick(tab) {
      // this.activeName = tab.name;
    },
    //关闭弹框的事件
    //关闭弹框
    handleClose() {
      this.$emit("update:dialogVisible", false); //触发 input 事件，并传入新值
    },
  },
  created() {
    console.log(this.activeName, "activeName");
  },
  watch: {
    commonData: {
      handler(newV, oldV) {
        console.log("dialog--commonData", newV);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
.Diacon {
  width: 100%;
  height: 100%;
  display: flex;
  .tab_content {
    width: calc(100% - 120px);
    padding: 0.2rem;
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
  height: 7rem;
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
