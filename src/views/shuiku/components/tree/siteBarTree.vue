<template>
  <div class="tree">
    <!-- <p class="header">{{ data.title }}</p>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable> </el-input> -->
    <!-- check-on-click-node 点击节点的时候选中节点 -->
    <el-tree
      :check-on-click-node="data.ifclickNodeCheck"
      :show-checkbox="data.ifShowCheckBox"
      class="filter-tree"
      node-key="id"
      :data="treedata"
      :props="defaultProps"
      :default-checked-keys="defaultChecked"
      default-expand-all
      :filter-node-method="filterNode"
      ref="siteTree"
      @node-click="handleNodeClick"
      @check="handleCheckClick"
      @check-change="handleCheckChangeClick"
      highlight-current
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <span class="img">
            <i>
              <img v-if="!data.enmnitid" src="@/assets/images/icon/wenjianjia.png" alt />
              <img v-else :src="require('@/assets/images/icon/wenjian.png')" alt />
            </i>
          </span>
          {{ data.label }}
          <!-- <el-popover placement="top-start" width="200" trigger="hover" :content="data">
            <span slot="reference">
              <span class="name">{{ data.label }}</span></span
            >
          </el-popover> -->
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import {
  getAddvcdTreeList,
  addvnmAndRsvrTree,
  getAdcdbByAccvd,
  addvnmTree,
} from "@/api/base.js";
import { getRsrEnmnitTree } from "../api";
/** props
 *  data ={
 *         type: 2,               //1.行政区，2水库列表的数据
 *         title: "水库列表",      //标题
 *         ifShowCheckBox:false
 *         ifclickNodeCheck:true  点击节点选中复选框
 *         rscd:'' // 水库编码
 *         ifSetCurrent:true, //是否默认高亮
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
      flag: false,
      treedata: [],
      defaultChecked: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      userAddvcd: "",
      userAddvnm: "",
      backData: {},
      rowData: {},
    };
  },
  created() {
    let userAddvcd = this.$store.state.user.addvcd;
    let addvnm = this.$store.state.user.addvnm;
    this.userAddvcd = userAddvcd;
    this.userAddvnm = addvnm;

    // this.getTreeData(this.data.type);
  },
  methods: {
    getTreeData(data) {
      switch (data) {
        case 1:
          this.treedata = [];
          this.getAddvcd({ rscd: this.data.rscd }); //this.data.rscd
          break;
        case 2:
          this.treedata = [];
          this.getAddvcd({ rscd: this.data.rscd }); //this.data.rscd
          break;
      }
    },
    async getAddvcd(pam) {
      let { msg, status, obj } = await getRsrEnmnitTree(pam);
      this.treedata = obj;
      if (obj) {
        let children = obj[0].children;
        this.flag = false;
        if (this.data.ifSetCurrent && children) {
          this.digui(children);
          this.$emit("backDataNode", this.rowData);
        }
      }
    },
    // 递归
    digui(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].enmnit) {
          // this.$emit("backDataNode", arr[i]);
          this.rowData = arr[i];
          this.flag = true;
          this.$nextTick(() => {
            this.$refs.siteTree.setCurrentKey(arr[i].id);
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
    // 现召递归-------
    abc(jsn, level) {
      if (level == null || level == undefined) {
        level = 1;
      } else {
        level += 1;
      }
      for (var i = 0; i < jsn.length; i++) {
        console.log(jsn[i].label + "第" + level + "级");
        if (jsn[i].children != [] && jsn[i].children != null) {
          abc(jsn[i].children, level);
        }
      }
    },
    async getSkAddvcd(pam) {
      let { msg, status, obj } = await addvnmAndRsvrTree(pam);
      if (status) {
        this.treedata = obj;
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
    },
  },
  watch: {
    filterText(val) {
      this.$refs.siteTree.filter(val);
    },
    data: {
      handler(val) {
        if (val.rscd) {
          this.getTreeData(this.data.type);
        }
      },
      immediate: true,
      deep: true,
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
  img {
    vertical-align: middle;
  }
}
</style>
