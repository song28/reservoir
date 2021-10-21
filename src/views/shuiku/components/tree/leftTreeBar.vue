<template>
  <div class="tree">
    <p class="header">{{ data.title }}</p>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable>
    </el-input>
    <!-- check-on-click-node 点击节点的时候选中节点 -->
    <el-tree
      :check-on-click-node="data.ifclickNodeCheck"
      :show-checkbox="data.ifShowCheckBox"
      class="filter-tree"
      node-key="addvcd"
      :data="treedata"
      :props="defaultProps"
      :default-checked-keys="defaultChecked"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
      @node-click="handleNodeClick"
      @check="handleCheckClick"
      @check-change="handleCheckChangeClick"
      highlight-current
    >
    </el-tree>
  </div>
</template>
<script>
import { getAddvcdTreeList, getReservoirInfoByPc ,getAdcdbByAccvd} from "@/api/base.js";
/** props
 *  data ={
 *         type: 2,               //1.行政区，2水库列表的数据
 *         title: "水库列表",      //标题
 *         ifShowCheckBox:false
 *         ifclickNodeCheck:true  点击节点选中复选框
 *
 * }   //是否出现复选框
 * emit
 * backData ={
 *           nodeData:{}, //节点值
 *           backData:{}  //复选框值
 *
 *           }
 * backDataNode =
 * backDataChecked=
 */
export default {
  props: {
    data: {
      type: Object,
      require: true
    }
    // defaultChecked: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   },
    // },
  },
  data() {
    return {
      filterText: "",
      treedata: [],
      defaultChecked: [],
      defaultProps: {
        children: "reservoirModelList",
        label: "addvnm"
      },
      userAddvcd: "",
      userAddvnm: "",
      backData: {}
    };
  },
  created() {
    let userAddvcd = this.$store.state.user.addvcd;
    let addvnm = this.$store.state.user.addvnm;
    this.userAddvcd = userAddvcd;
    this.userAddvnm = addvnm;
    this.getTreeData(this.data.type);
  },
  methods: {
    getTreeData(data) {
      switch (data) {
        case 1:
          this.treedata = [
            {
              addvcd: this.userAddvcd,
              addvnm: this.userAddvnm,
              children: true,
              reservoirModelList: []
            }
          ];
          this.getAddvcd({ accvd: this.userAddvcd });
          break;
        case 2:
          this.treedata = [
            {
              addvcd: this.userAddvcd,
              addvnm: this.userAddvnm,
              children: true,
              reservoirModelList: []
            }
          ];
          this.getSkAddvcd({ addvcd: this.userAddvcd });
          break;
      }
    },
    async getAddvcd(pam) {
      let { msg, status, data } = await getAdcdbByAccvd(pam);
      this.treedata[0].reservoirModelList = data;
    },
    async getSkAddvcd(pam) {
      let { msg, status, data } = await getReservoirInfoByPc({
        accvd: this.userAddvcd
      });
      if (status) {
        this.treedata[0].reservoirModelList = data;
        this.$emit("getTreeData", true);
      }
    },

    handleNodeClick(data) {
      this.backData.nodeData = data;
      this.$emit("backData", this.backData);
      this.$emit("backDataNode", data);
    },
    handleCheckClick(data, checkedKeys) {
      this.backData.checkData = checkedKeys;
      this.$emit("backData", this.backData);
      this.$emit("backDataChecked", checkedKeys.checkedNodes);
    },
    handleCheckChangeClick() {},
    filterNode(value, data) {
      if (!value) return true;
      return data.addvnm.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>
<style scoped lang='scss'>
$themeColor: #29958b;
$inputBgColor: #f4fbf5;
.tree {
  .header {
    margin: 0.05rem 0;
    font-weight: bold;
    color: $themeColor;
    text-align: center;
  }
  >>> .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #cfe5e1;
    color: #29958b !important;
    font-weight: bold !important;
  }
  >>> .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #29958b !important;
    border-color: #29958b !important;
  }
  >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #29958b !important;
    border-color: #29958b !important;
  }
  >>> .el-tree-node__content {
    height: 35px !important;
  }
  >>> .el-input {
    width: 96%;
    margin-left: 2.5%;
  }
  >>> .el-input__inner {
    border: 0 !important;
    background: $inputBgColor !important;
  }
}
</style>