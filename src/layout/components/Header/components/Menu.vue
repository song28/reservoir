<template>
  <div class="header-menu">
    <sidebar-item v-for="(route, index) in permission_routes"
                  :item="route"
                  :key="index"
                  :class="{ active: parentPath == route.path }"
                  :base-path="route.path"
                  @click.native="addTab(route)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      activeRouter: null,
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'parentPath']),
  },
  created() {
    this.handleRouter(this.$route)
    let setEditableTabsValue = sessionStorage.getItem('setEditableTabsValue')
    if (!setEditableTabsValue) {
      this.firstAddTag()
    }
  },
  methods: {
    addTab(item) {
      let setEditableTabs = JSON.parse(
        sessionStorage.getItem('setEditableTabs')
      )
      let setEditableTabsValue = sessionStorage.getItem('setEditableTabsValue')
      let editableTabs = setEditableTabs || []
      let editableTabsValue = setEditableTabsValue || ''
      let hasSame = editableTabs.filter(
        (item1) => item1.title == item.children[0].title
      )

      if (!hasSame.length) {
        //   获取当前二级路由下的title标识  和二级路由对比获取path
        let titleList = []
        item.children.forEach((ite) => {
          titleList.push(ite.title)
        })
        // 如果此时页签数组没有该项，则将它加入到页签数组中
        editableTabs.push({
          titleList,
          title: item.children[0].title,
          path: item.redirect || item.path,
          name: item.title,
          halfPath: item.path,
        })
      }
      // 改变当前选中的页签值
      editableTabsValue = item.children[0].title
      this.$store.dispatch('tab/setEditableTabs', editableTabs)
      this.$store.dispatch('tab/setEditableTabsValue', editableTabsValue)
      sessionStorage.setItem('setEditableTabs', JSON.stringify(editableTabs))
      sessionStorage.setItem('setEditableTabsValue', editableTabsValue)
    },
    handleRouter(router) {
      if (router && router.matched) {
        let parents = router.matched.find((item) => {
          return !item.parent
        })
        let child = this.permission_routes.find((item) => {
          return item.name == parents.name
        })
        this.$store.dispatch('app/setRouters', child.children)
        this.$store.dispatch('app/setParentPath', parents.path)
      }
    },
    firstAddTag() {
      this.permission_routes.forEach((child) => {
        if (child.redirect == this.$route.path) {
          this.addTab(child)
        }
      })
    },
  },
  watch: {
    $route(router) {
      if (router && router.matched) {
        let parents = router.matched.find((item) => {
          return !item.parent
        })
        let child = this.permission_routes.find((item) => {
          return item.name == parents.name
        })
        this.$store.dispatch('app/setRouters', child.children)
        this.$store.dispatch('app/setParentPath', parents.path)
      }
    },
  },
}
</script>

<style lang="scss" type="text/scss">
@import '~@/styles/variables.scss';

.header-menu {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-right: 1.64rem;
  height: 100%;
  justify-content: flex-end;
  .menu-item {
    margin-left: 0.02rem;
    height: 100%;
    line-height: 0.52rem;
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
      display: inline-block;
      // height: 52px;
      // line-height: 52px;
    }
  }
  .menu-item.active {
    background-color: $pageLayoutHeaderActiveBg;
  }
}
</style>
