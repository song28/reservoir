<!--
 * @Author: song
 * @LastEditors: --
 * @Date: 2021-08-26 15:44:01
 * @LastEditTime: 2021-09-05 17:54:32
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\reservoirManagement\siteManagement\components\tabmain.vue
 * @Description: 暂无
-->
<template>
  <div class="main">
    <el-tabs v-model="activeName" tab-position="top" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="basic"> </el-tab-pane>
      <el-tab-pane label="参数信息" name="parameter"> </el-tab-pane>
      <el-tab-pane label="附件信息" name="accessory"> </el-tab-pane>
    </el-tabs>
    <div class="tab_content">
      <components
        :is="activeName"
        :data.sync="childData"
        @on-back="backFun"
      ></components>
    </div>
  </div>
</template>
<script>
import bus from "@/utils/bus";
import basic from "./basic"; //基础信息
import parameter from "./parameter"; //参数信息
import accessory from "./accessory"; //附件信息
import { getMonitPointDetail } from "../../api";

export default {
  props: ["data"],
  components: { basic, parameter, accessory },
  data() {
    return {
      activeName: "basic",
      childData: {
        type: "",
        data: {},
        nodeTreeData: {},
      },
    };
  },

  methods: {
    handleClick() {},
    backFun(val) {
      this.childData.isRefresh = new Date().getTime();
      this.childData.subData = val;
    },
  },
  created() {},
  mounted() {
    bus.$on("rowData", (e) => {
      this.$set(this.childData, "data", e);
      // this.childData.data = e;
      // this.childData.type = "detail";
    });
  },
  watch: {
    data: {
      handler(val) {
        console.log(val, "tabMian---");
        this.childData.type = val.type;
        this.childData.isRefresh = val.isRefresh;
        this.childData.nodeTreeData = val.nodeTreeData;
      },
      immediate: true,
      deep: true,
    },
    childData: {
      handler(val) {
        this.$emit("update:data", val);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;

  .tab_content {
    height: calc(100% - 40px);
    overflow: auto;
  }
}
</style>
