<!--
 * @Author: song
 * @LastEditors: --
 * @Date: 2021-08-28 20:03:36
 * @LastEditTime: 2021-09-04 17:11:46
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\warningManagement\warnInfo\components\warnMain.vue
 * @Description: 暂无
-->
<template>
  <div class="warnInfowhy">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="预警列表" name="warnList"></el-tab-pane>
      <el-tab-pane label="发布记录" name="record"></el-tab-pane>
      <el-tab-pane label="信息发布" name="publish"></el-tab-pane>
    </el-tabs>
    <components :is="activeName" :data="data"></components>
  </div>
</template>
<script>
import warnList from "./warnList"; // 预警列表
import record from "./record"; //发布记录

import publish from "./publish"; //短信发布
export default {
  props: ["data"],
  components: {
    warnList,
    record,
    publish,
  },
  data() {
    return {
      commonData: {},
      activeName: "warnList",
    };
  },
  methods: {
    handleClick(val) {
      if (val.name == "publish") {
        console.log(this.data, "this.data");
        if (!this.data.rscd) {
          this.$notify.warning({
            title: "温馨提示",
            message: "请选择水库",
          });
        }
      }
    },
  },
  created() {},
};
</script>
<style scoped lang="scss">
.warnInfowhy {
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #fff;
  font-size: 0.14rem;
  padding: 0.2rem;
}
</style>
