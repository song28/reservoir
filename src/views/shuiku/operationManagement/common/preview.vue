<!--
 * @Author: song
 * @LastEditors: --
 * @Date: 2021-09-03 20:18:11
 * @LastEditTime: 2021-09-03 21:11:30
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\operationManagement\common\preview.vue
 * @Description: 暂无
-->
<template>
  <div class="skList" id="right">
    <viewFile v-bind:wpsUrl="jwpsUrl" v-bind:token="jtoken"></viewFile>
  </div>
</template>
<script>
import { getRegion } from "@/utils";
import { getViewUrlWebPath } from "../../reservoirManagement/api";
import viewFile from "../../reservoirManagement/common/viewFile";

export default {
  components: {
    viewFile,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      jwpsUrl: "",
      jtoken: "",
    };
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.data));
  },
  methods: {
    //行政区
    regionChange(val) {
      let obj = getRegion(val);
      this.$set(this.formData, "patroladdvnm", obj.addvnm);
      this.$set(this.formData, "patroladdvcd", obj.addvcd);
    },
    openWps(url, token) {
      let _this = this;
      const wps = _this.wps.config({
        mode: _this.simpleMode ? "simple" : "normal",
        mount: document.querySelector("#right"),
        wpsUrl: url,
      });
      wps.setToken({ token });
      let app = wps.Application;
      // this.console.log(JSON.stringify(app));
    },
    getViewUrlWebPath() {
      console.log(this.data, "this.data----9999");
      let params = {
        fileUrl: this.data.patrolWordPath,
      };
      getViewUrlWebPath(params).then((res) => {
        if (res.status) {
          sessionStorage.wpsUrl = res.data.wpsUrl;
          sessionStorage.token = res.data.token;
          this.wpsUrl = res.data.wpsUrl;
          this.jwpsUrl = res.data.wpsUrl;
          this.jtoken = res.data.token;
          this.openWps(this.wpsUrl, this.jtoken);
        }
      });
    },
  },
  watch: {
    data: {
      handler: function (newV, oldV) {
        this.getViewUrlWebPath();

        // console.log(newV, "tb----------");
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.skList {
  height: 5rem;
}
</style>
