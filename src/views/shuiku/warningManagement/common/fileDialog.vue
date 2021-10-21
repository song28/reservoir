<template>
  <div class="dialogMap">
    <el-dialog
      :visible.sync="filedialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="50%"
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
        <components
          :is="data.activeName"
          :data="data"
          :rscd="rscd"
          @on-back="backFun"
        ></components>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { generateUUID } from "@/utils";
import addFile from "./addFile"; //添加文档
export default {
  // data: {
  //       //弹框配置
  //       activeName: "formSk", //添加、修改、详情表单页面名称
  //       title: null, //弹框标题
  //       type: null, //操作add添加，update修改,detail查看
  //       data: {}, //数据
  //       pageType: "skList", //页面类型
  //     },
  props: ["data", "filedialogVisible", "rscd"],
  components: {
    addFile, //添加文档
  },
  data() {
    return {
      activeName: "addFile",
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
      this.$emit("update:filedialogVisible", false); //触发 input 事件，并传入新值
    },
    backFun() {
      this.$emit("update:filedialogVisible", false); //触发 input 事件，并传入新值
    },
  },
  created() {},
  watch: {},
};
</script>

<style lang="scss" type="text/scss" scoped>
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
