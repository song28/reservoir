<template>
  <div class="skPoint">
    <!-- 水库列表 -->
    <el-container class="con">
      <el-aside>
        <damLeftTreeBar ref="tree" :data="data" @backData="backData"></damLeftTreeBar>
        <!--   @backDataNode="backDataNode"-->
        <!-- <LeftTreeBar :data="data" @backData="backData"></LeftTreeBar> -->
      </el-aside>
      <el-container class="right">
        <div class="configTb">
          <div class="tb1">
            <el-header> 可配置项（{{ num }}）</el-header>
            <el-main>
              <el-tree
                ref="tree"
                check-on-click-node
                :data="treedata"
                show-checkbox
                node-key="id"
                default-expand-all
                :props="defaultProps"
                @check="handleNodeClick"
              >
              </el-tree>
            </el-main>
          </div>
          <div class="btn">
            <div>
              <el-button size="mini" style="cursor: pointer" type="primary" @click="move">
                ＜移除</el-button
              >
            </div>
            <div>
              <el-button size="mini" style="cursor: pointer" type="primary" @click="add"
                >添加＞</el-button
              >
            </div>
          </div>
          <div class="tb2">
            <el-header> 已配置项（{{ haveNum }}） </el-header>
            <el-main>
              <el-tree
                ref="tree"
                check-on-click-node
                :data="seltreedata"
                show-checkbox
                node-key="id"
                default-expand-all
                :props="defaultProps"
                @check="handleNodeClickSel"
              >
              </el-tree>
            </el-main>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import LeftTreeBar from "../../components/tree/leftTreeBar.vue";
import damLeftTreeBar from "../../components/tree/damLeftTreeBar.vue";

import {
  getAllPointLocationList,
  getReservoirPointByReservoirId,
  reservoirAllotPoint,
  getReservoirNotExistPointByReservoirId,
  removeAllotPointBatch,
} from "../api";
export default {
  components: { LeftTreeBar, damLeftTreeBar },
  data() {
    return {
      haveNum: 0,
      num: 0,
      treedata: [], //可配置项
      seltreedata: [], //已配置项
      seltreedataPointId: [],
      defaultProps: {
        children: "children",
        label: "pointName",
      },
      data: {
        type: 2,
        title: "水库列表",
        ifShowCheckBox: false,
        ifUpdateData: true,
        ifclickNodeCheck: false,
      },
      backTreeData: {},
      canConfigPointArr: {}, //可配置项的点数据
      haveConfigPointArr: {}, //已配置项的点数据
    };
  },
  mounted() {
    // this.getPointConfig();
  },
  methods: {
    //可配置项
    async getPointConfig(pam) {
      this.treedata = [
        //可配置项
        {
          id: "allSelect",
          pointName: "全选",
          children: [],
        },
      ];
      let { msg, obj, status, total } = await getReservoirNotExistPointByReservoirId(pam);
      if (status) {
        this.treedata[0].children = obj;
        this.num = obj.length;
      } else {
        this.$notify.error({
          title: "失败",
          message: msg,
        });
      }
    },
    //已配置项
    async getPointConfigured(pam) {
      this.seltreedata = [
        {
          id: "allSelect",
          pointName: "全选",
          children: [],
        },
      ];
      this.seltreedataPointId = [];
      try {
        let { msg, obj, status, total } = await getReservoirPointByReservoirId(pam);
        if (status) {
          this.seltreedata[0].children = obj;
          this.haveNum = obj.length;
        } else {
          this.$notify.error({
            title: "失败",
            message: msg,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    //分配点位reservoirAllotPoint
    async move() {
      if (this.backTreeData.nodeData) {
        let skidArr = this.getSelSkId([this.backTreeData.nodeData]);
        console.log(this.haveConfigPointArr, "已配置项");

        if (this.haveConfigPointArr.length > 0) {
          let { msg, data, status, total } = await removeAllotPointBatch({
            pointIds: this.haveConfigPointArr.toString(),
            reservoirIds: skidArr,
          });
          if (status) {
            this.haveConfigPointArr = [];
            this.getPointConfig({ reservoirId: skidArr });
            this.getPointConfigured({ reservoirId: skidArr });
          } else {
            this.$notify.error({
              title: "失败",
              message: msg,
            });
          }
        } else {
          this.$notify({
            title: "警告",
            message: "至少选择一个【已配置项】点位进行移除",
            type: "warning",
          });
        }
      } else {
        this.$notify({
          title: "警告",
          message: "至少选择一个水库进行配置",
          type: "warning",
        });
      }
    },
    async add() {
      if (this.backTreeData.nodeData) {
        let skidArr = this.getSelSkId([this.backTreeData.nodeData]);
        console.log(this.canConfigPointArr, "可配置项---");

        if (this.canConfigPointArr.length > 0) {
          let { msg, data, status, total } = await reservoirAllotPoint({
            pointIds: this.canConfigPointArr.toString(),
            reservoirIds: skidArr,
          });
          if (status) {
            this.canConfigPointArr = [];
            this.getPointConfig({ reservoirId: skidArr });
            this.getPointConfigured({ reservoirId: skidArr });
          } else {
            this.$notify.error({
              title: "失败",
              message: msg,
            });
          }
        } else {
          this.$notify({
            title: "警告",
            message: "至少选择一个【可配置项】的点位进行添加",
            type: "warning",
          });
        }
      } else {
        this.$notify({
          title: "警告",
          message: "至少选择一个水库进行配置",
          type: "warning",
        });
      }
    },
    //可配置项--选中点位
    handleNodeClick(data, checkedKeys) {
      this.canConfigPointArr = this.getSelPointId(checkedKeys.checkedNodes);
    },
    //已配置项
    handleNodeClickSel(data, checkedKeys) {
      this.haveConfigPointArr = this.haveGetSelPointId(checkedKeys.checkedNodes);
    },
    //可配置项目---被选中的pointid--本身id
    getSelPointId(arr) {
      let newArr = [];
      arr.forEach((e, i, a) => {
        if (e.id != "allSelect") {
          newArr.push(e.id);
        }
      });
      return newArr;
    },
    //已配置项--被选中的pointid
    haveGetSelPointId(arr) {
      let newArr = [];
      arr.forEach((e, i, a) => {
        if (e.id != "allSelect") {
          newArr.push(e.pointId);
        }
      });
      return newArr;
    },
    //树列表--被选中的水库id
    getSelSkId(arr) {
      let newArr = [];
      arr.forEach((e, i, a) => {
        if (!e.children) {
          newArr.push(e.rscd);
          // newArr.push(e.addvcd);
        }
      });
      return newArr.toString();
      console.log(newArr, "被选中水库列表id");
    },
    //点击高亮返回的值
    backDataNode(data) {
      this.backTreeData = {};
      this.backTreeData = data;
      console.log(data, "树列表返回的值===点击高亮返回的值");
    },
    backData(data) {
      this.backTreeData = {};
      this.backTreeData = data;
      console.log(data, "树列表返回的值");
    },
  },
  watch: {
    "backTreeData.nodeData": {
      handler: function (newV, oldV) {
        if (newV) {
          if (!newV.children) {
            // this.getPointConfig({ reservoirId: newV.addvcd });
            // this.getPointConfigured({ reservoirId: newV.addvcd });
            this.getPointConfig({ reservoirId: newV.rscd });
            this.getPointConfigured({ reservoirId: newV.rscd });
          }
        }
      },
      deep: true,
      immediate: true,
    },
    "backTreeData.checkData": {
      handler: function (newV, oldV) {},
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.skPoint {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  // >>> .el-button--primary {
  //   color: #fff;
  //   background-color: #29958b;
  //   border-color: #ffffff;
  // }
  .right {
    margin: 0rem;
    margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    .configTb {
      display: flex;
      flex-flow: row;
      width: 98%;
      height: 98%;
      margin: auto;
      align-items: center;
      justify-content: center;
      >>> .el-header {
        color: #29958b;
        font-weight: bold;
        height: 0.45rem !important;
        border-bottom: 1px solid #29958b;
        padding: 0.1rem 20px;
      }

      .tb1 {
        height: 100%;
        background: #f4fbf5;
        width: calc(50% - 56px);
        border: 1px solid #29958b;
      }
      .btn {
        text-align: center;
        width: 112px;
        flex: 0 0 auto;
        div {
          margin-top: 10px;
        }
      }
      .tb2 {
        height: 100%;
        background: #f4fbf5;
        flex: 1;
        // width: calc(50% - 10px);
        border: 1px solid #29958b;
      }
    }
  }

  .el-aside {
    width: 2.4rem !important;
    background: #fff;
  }
}
</style>
