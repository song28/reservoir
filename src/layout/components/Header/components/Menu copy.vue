<template>
  <div class="header-menu">
    <sidebar-item
      v-for="(route, index) in permission_routes"
      :item="route"
      :key="index"
      :class="{ active: parentPath == route.path }"
      :base-path="route.path"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  data() {
    return {
      activeRouter: null
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "parentPath"])
  },
  watch: {
    $route(router) {
      if (router && router.matched) {
        let parents = router.matched.find(item => {
          return !item.parent;
        });
        let child = this.permission_routes.find(item => {
          return item.name == parents.name;
        });
        this.$store.dispatch("app/setRouters", child.children);
        this.$store.dispatch("app/setParentPath", parents.path);
      }
    }
  }
};
</script>

<style lang="scss" type="text/scss">
@import "~@/styles/variables.scss";

.header-menu {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-right: 1.64rem;
  height: 100%;
  justify-content: flex-end;
  .menu-item {
    margin-left: 0.2rem;
    height: 100%;
    line-height: 0.58rem;
    cursor: pointer;
    // a {
    //   height: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: center;
    //   justify-content: center;
    //   padding: 0 0.1rem;
    // }
    // .svg-icon {
    //   width: 0.4rem;
    //   height: 0.4rem;
    //   vertical-align: unset;
    // } 通江
    //东川
    a {
      height: 100%;
      padding: 0 0.1rem;
    }
    .svg-icon {
      // position: relative;
      // top: 0.19rem;
      width: 0.2rem;
      height: 0.3rem;
      vertical-align: unset;
      vertical-align: middle;
      
    }
    span {
      // position: relative;
      // top: 0.19rem;
      vertical-align: middle;
      
      font-size: 18px;
      font-weight: 500;
      color: $pageLayoutHeaderText;
    }
    a.router-link-active {
      background-color: $pageLayoutHeaderActiveBg;
    }
  }
  .menu-item.active {
    background-color: $pageLayoutHeaderActiveBg;
  }
}
</style>
