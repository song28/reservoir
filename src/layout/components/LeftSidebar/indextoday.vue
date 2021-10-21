<template>
  <div class="left-sidebar-wrapper" id="left-sidebar-wrapper">
    <div class="sidebar-wrapper-header">
      <i class="iconfont icon-caidan-"></i>
      <span>导航菜单</span>
    </div>
    <div class="sidebar-wrapper-list">
      <sidebar-item 
      v-for="(route, index) in routers" 
      :item="route" 
      :key="index" 
      :base-path="route.path" 
      :parent-path="parentPath"
      @click.native="addTab(route)"
      />
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'permission_routes',
        'routers',
        'parentPath',
        
      ]),
    },
    methods: {
    addTab(item) {
      let setEditableTabs = JSON.parse(
        sessionStorage.getItem("setEditableTabs")
      );
      let setEditableTabsValue = sessionStorage.getItem("setEditableTabsValue");
      let editableTabs = setEditableTabs || [];
      let editableTabsValue = setEditableTabsValue || "";
      let itemInfo = {};
      let hasSame = editableTabs.filter(item1 => item1.title == item.title);
      if (!hasSame.length) {
        //   一定存在一级菜单模块中第一个二级模块  拼接字符串
        editableTabs.map(item1 => {
          item1.titleList.map(item2 => {
            if (item2 == item.title) {
              itemInfo.path = item1.halfPath + "/" + item.path;
              itemInfo.halfPath = item1.halfPath;
              itemInfo.titleList = item1.titleList;
              itemInfo.title = item.title;
              itemInfo.name = item1.name;
              return;
            }
          });
        });
        // 如果此时页签数组没有该项，则将它加入到页签数组中
        editableTabs.push(itemInfo);
      }
      // 改变当前选中的页签值
      editableTabsValue = item.title;
      this.$store.dispatch("tab/setEditableTabs", editableTabs);
      this.$store.dispatch("tab/setEditableTabsValue", editableTabsValue);
      sessionStorage.setItem("setEditableTabs", JSON.stringify(editableTabs));
      sessionStorage.setItem("setEditableTabsValue", editableTabsValue);
    }
  }
  }
</script>
<style lang="scss" type="text/scss">
  @import "~@/styles/variables.scss";

  #left-sidebar-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .sidebar-wrapper-header {
      height: 38px;
      display: flex;
      align-items: center;
      padding-left: 0.1rem;
      i {
        font-size: 0.18rem;
        margin-right: 8px;
        // color: #333333;
        color: #fff;
        font-weight: bold;
      }
      span {
        // color: #333333;
        color: #fff;
      }
    }
    .sidebar-wrapper-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      .menu-item {
        cursor: pointer;
        height: 40px;
        a {
          height: 100%;
          display: flex;
          width: 100%;
          flex-direction: row;
          align-items: center;
          padding: 0 0.1rem;
        }
        i {
          font-size: 0.16rem;
          // color: $pageLayoutMenuText;
          color: #fff;
          margin-right: 5px;
        }
        span {
          font-weight: 500;
          // color: $pageLayoutMenuText;
          color: #fff;
        }
        a.router-link-active {
          // background-color: $pageLayoutMenuActiveBg;
          background-color:#1a5c8d;
          border-right: 1px solid #419DFF;
          i {
            // color: $pageLayoutMenuActiveText;
            color: #fff;
          }
          span {
            // color: $pageLayoutMenuActiveText;
            color: #fff;
            font-weight: bold;
          }
        }
      }
    }

  }
</style>
