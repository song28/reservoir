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
