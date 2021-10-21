<template>
  <div :class="classObj"
       class="app-wrapper">
    <template v-if="pageLayout">
      <app-header />
      <app-tip></app-tip>
      <div class="main-container">
        <left-sidebar class="sidebar-container"
                      :class="{'no-sidebar-container': noSidebar}" />
        <app-main />
      </div>
    </template>
    <template v-else>
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}"
           class="main-container">
        <div :class="[{'fixed-header':fixedHeader},{'hidden-header': header.opened}]"
             @mouseenter="mouseenter"
             @mouseleave="mouseleave">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
      </div>
    </template>
  </div>
</template>

<script>
import {
  AppMain,
  Navbar,
  Settings,
  Sidebar,
  TagsView,
  AppHeader,
  AppTip,
  LeftSidebar,
} from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Settings,
    Sidebar,
    TagsView,
    AppHeader,
    AppTip,
    LeftSidebar,
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      header: (state) => state.app.header,
      pageLayout: (state) => state.settings.pageLayout,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
      permission_routes: (state) => state.permission.routes,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        openPageLayout: this.pageLayout,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    },
  },
  data() {
    return {
      path: null,
      noSidebar: true,
    }
  },
  watch: {
    sidebar: {
      handler: function (newV, oldV) {
        if (this.path == '/map' || this.path == '/homePage') {
          if (!newV.opened) {
            this.$store.dispatch('app/toggleHeader', 1)
          } else {
            this.$store.dispatch('app/toggleHeader', 0)
          }
        }
      },
      deep: true,
    },
    $route(router) {
      this.handleRoute(router)
      //   if (router && router.matched) {
      //     let parents = router.matched.find((item) => {
      //       return !item.parent
      //     })
      //     let child = this.permission_routes.find((item) => {
      //       return item.name == parents.name
      //     })
      //     if (child.children.length < 2) {
      //       this.noSidebar = true
      //     } else {
      //       this.noSidebar = false
      //     }
      //   }
    },
  },
  created() {
    this.path = this.$route.path
    this.handleRoute(this.$route)
    if (this.sidebar.opened == false) {
      this.$store.dispatch('app/toggleHeader', 1)
    }
  },

  methods: {
    handleRoute(router) {
      if (router && router.matched) {
        let parents = router.matched.find((item) => {
          return !item.parent
        })
        let child = this.permission_routes.find((item) => {
          return item.name == parents.name
        })
        if (child.children.length < 2) {
          this.noSidebar = true //true   会隐藏菜单
        } else {
          this.noSidebar = false //yinggai
        }
      }
    },
    // 鼠标移入
    mouseenter(e) {
      this.path = this.$route.path
      if (this.path == '/map' || this.path == '/homePage') {
        if (this.sidebar.opened == false) {
          this.$store.dispatch('app/toggleHeader', 0)
        }
      }
    },

    //鼠标移出
    mouseleave(e) {
      if (e.clientX < document.documentElement.clientWidth - 360) {
        this.path = this.$route.path
        if (this.path == '/map' || this.path == '/homePage') {
          if (this.sidebar.opened == false) {
            this.$store.dispatch('app/toggleHeader', 1)
          }
        }
      }
    },

    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          return true
        }
      })

      // 当只有一个子路由器时，默认情况下显示子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped type="text/scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .fixed-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.6);
    padding: 5px 15px;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.hidden-header {
  opacity: 0;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  /*width: calc(100% - 54px)*/
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>

