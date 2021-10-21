<!--
 * @Author: song
 * @LastEditors: --
 * @Date: 2021-08-25 19:23:38
 * @LastEditTime: 2021-08-25 19:54:47
 * @FilePath: \iot_gxhy_reservoirdam_web\src\views\shuiku\reservoirManagement\common\viewFile.vue
 * @Description: 暂无
-->
<template>
  <div id="viewFile"></div>
</template>
<script>
export default {
  props: ["wpsUrl", "token"],
  data() {
    return {
      // 是否开启简易模式
      simpleMode: false,
    };
  },
  mounted() {
    this.openWps(this.wpsUrl, this.token);
  },
  methods: {
    openWps(url, token) {
      let _this = this;
      const wps = _this.wps.config({
        mode: _this.simpleMode ? "simple" : "normal",
        mount: document.querySelector("#layoutBox"),
        wpsUrl: url,

        commonOptions: {
          isShowTopArea: true, // 隐藏顶部区域(头部和工具栏)
          isShowHeader: false, // 隐藏头部区域,
        },

        //  commandBars: [
        //     // 可以配置多个组件
        //     {
        //     cmbId: "Print",
        //     attributes: [{
        //         name: "visible",
        //         value: false
        //     }]
        //     },
        //     {
        //     cmbId: "HeaderRight",
        //     attributes: [{
        //         name: "visible",
        //         value: false
        //     }]
        //     }
        // ]
      });
      wps.setToken({ token: token });
    },
  },
};
</script>
<style lang="scss">
.viewFile {
  height: 1500px;
}
#wps-iframe {
  height: 500px !important;
}
</style>
