<template>
  <div class="tree">
    <p class="header">{{ data.title }}</p>
    <!-- <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable /> -->
    <!-- check-on-click-node 点击节点的时候选中节点 -->
    <el-tree
      ref="tree"
      :check-on-click-node="data.ifclickNodeCheck"
      :show-checkbox="data.ifShowCheckBox"
      class="filter-tree"
      node-key="id"
      :data="treedata"
      :props="defaultProps"
      :default-checked-keys="defaultChecked"
      default-expand-all
      :filter-node-method="filterNode"
      highlight-current
      @node-click="handleNodeClick"
      @check="handleCheckClick"
      @check-change="handleCheckChangeClick"
    />
  </div>
</template>
<script>
import {
  getAddvcdTreeList,
  addvnmAndRsvrTree,
  getAdcdbByAccvd,
  addvnmTree,
} from "@/api/base.js";
import { Handler } from "leaflet";
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
      require: true,
    },
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
      flag: false,
      defaultChecked: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      userAddvcd: "",
      userAddvnm: "",
      backData: {},
      rowData: {},
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    data: {
      handler(val) {
        if (val) {
          this.treedata = val.data;
          console.log(
            this.treedata,
            "this.treedata ",
            val,
            "val111",
            val.setCurrentKey,
            "val.setCurrentKey"
          );
          if (!val.setCurrentKey) {
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(null);
            });
          }
        }
        console.log(this.treedata, "this.treedata ", val, "val222");
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    const userAddvcd = this.$store.state.user.addvcd;
    const addvnm = this.$store.state.user.addvnm;
    this.userAddvcd = userAddvcd;
    this.userAddvnm = addvnm;
    this.treedata = this.data.data;
    console.log(this.data, "this.data");
    // this.getTreeData(this.data.type);
  },
  methods: {
    getTreeData(data) {
      switch (data) {
        case 1:
          this.treedata = [];
          this.getAddvcd({ addvcd: this.userAddvcd, level: 1 });
          break;
        case 2:
          this.treedata = [];
          this.getSkAddvcd({ addvcd: this.userAddvcd, level: 1 });
          break;
      }
    },
    // 递归
    digui(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].rscd) {
          this.rowData = arr[i];
          this.flag = true;
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(arr[i].id);
          });
          return;
        } else {
          if (this.flag) {
            return;
          } else {
            this.rowData = arr[i];
            // this.$emit("backDataNode", arr[i]);
            if (arr[i].children && !this.flag) {
              this.digui(arr[i].children);
            }
          }
        }
      }
    },
    async getAddvcd(pam) {
      const { msg, status, obj } = await addvnmTree(pam);
      this.treedata = obj;
      // this.$nextTick(() => {
      //   this.$refs.tree.setCurrentKey(0);
      // });
    },
    async getSkAddvcd(pam) {
      const { msg, status, obj } = await addvnmAndRsvrTree(pam);
      if (status) {
        this.treedata = obj;
        this.$emit("getTreeData", true);
        if (obj) {
          let children = obj[0].children;
          this.flag = false;
          if (this.data.ifSetCurrent && children) {
            this.digui(children);
            this.$emit("backDataNode", this.rowData);
          }
        }
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
    },
  },
};
</script>
<style scoped lang="scss">
$themeColor: #29958b;
$inputBgColor: #f4fbf5;
.tree {
  .header {
    margin: 0.05rem 0;
    font-weight: bold;
    color: $themeColor;
    text-align: center;
  }
  >>> .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #edfbf9;
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
    // background-color: #eef9fa !important;
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
>>> .tree .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #eef9fa !important;
}
>>> .tree .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #edfbf9;
}
</style>
