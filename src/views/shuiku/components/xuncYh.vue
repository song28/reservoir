<template>
  <div class="skListMap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="巡查信息" name="one">
        <!-- 巡查详情 -->
        <FormInspectionDetail
          :data="dialogData"
          ref="inspectionDetailComponent"
        ></FormInspectionDetail>
      </el-tab-pane>
      <el-tab-pane label="养护信息" name="two">
        <!-- 养护详情 -->
        <DailyMaintenance :data="dialogData"></DailyMaintenance
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DailyMaintenance from "../workbench/detail/detailDailyMaintenanceNODia";
import FormInspectionDetail from "../workbench/detail/inspectionDetailNoDia";

export default {
  components: { DailyMaintenance, FormInspectionDetail },
  props: {
    commonData: {
      type: Object
    }
  },
  data() {
    return {
      dialogData: {},
      activeName: "one"
    };
  },
  mounted() {
    this.activeName = "one";
    //调用查看详情接口
    // this.commonData.type=
    // if (this.commonData.type == "xc") {
    //   this.activeName = "one";
    // } else {
    //   this.activeName = "two";
    // }
    let row = {};
    row.rscd = this.commonData.data.rscd;
    console.log(row.rscd,'巡查养护====')
    if (this.activeName == "one") {
      row.tabType = "xc";
      row.isMonth = true;
      row.dayOrMonthValue = new Date();
      this.dialogData = row;
    } else {
      row.tabType = "yh";
      row.isMonth = true;
      row.dayOrMonthValue = new Date();
      this.dialogData = row;
    }
  },
  methods: {
    handleClick(data) {
      let row = {};
      row.rscd = this.commonData.data.rscd;
      if (data.name == "one") {
        row.tabType = "xc";
        row.isMonth = true;
        row.dayOrMonthValue = new Date();
        this.dialogData = row;
        return;
      } else {
        row.tabType = "yh";
        row.isMonth = true;
        row.dayOrMonthValue = new Date();
        this.dialogData = row;
      }
    }
  },
  watch: {}
};
</script>

<style  lang='scss' scoped>
.skListMap {
  width: 100%;
  height: 7rem;
  overflow: hidden;
  >>> .el-tabs__item {
    height: 0.35rem !important;
    line-height:  0.35rem !important;
  }
  >>> .el-tabs__item.is-active {
    color: #29958b !important;
    background: transparent !important;
  }
  >>> .el-tabs__active-bar.is-top {
    width: 0.92rem !important;
  }
  >>> .el-tabs__nav {
    text-align: center;
  }
  .base {
    .btnactive {
      background: #29958b !important;
      color: #fff !important;
    }
    .btn {
      background: #fff;
      color: #29958b;
    }
  }
}
</style>
