<template>
  <div class="left-sidebar-wrapper"
       id="left-sidebar-wrapper">
    <div class="left-sidebar-container">
      <div class="sidebar-wrapper-list">
        <sidebar-item v-for="(route, index) in routers"
                      :item="route"
                      :key="index"
                      :base-path="route.path"
                      :parent-path="parentPath"
                      @click.native="addTab(route)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routes', 'routers', 'parentPath']),
  },

  methods: {
    // 追加一个标签 没有首页之后
    firstAddTag() {
      console.log(this.permission_routes, this.$route)
      this.permission_routes.forEach((child) => {
        if (child.path == this.$route.matched[0].path) {
          this.addTab1(child)
        }
      })
    },
    addTab1(item) {
      let setEditableTabs = JSON.parse(
        sessionStorage.getItem('setEditableTabs')
      )
      let setEditableTabsValue = sessionStorage.getItem('setEditableTabsValue')
      let editableTabs = setEditableTabs || []
      let editableTabsValue = setEditableTabsValue || ''
      let hasSame = editableTabs.filter(
        (item1) => item1.title == item.children[0].title
      )
      let title = ''

      if (!hasSame.length) {
        //   获取当前二级路由下的title标识  和二级路由对比获取path
        let titleList = []

        item.children.forEach((ite) => {
          titleList.push(ite.title)
        })
        item.children.forEach((ite) => {
          if (ite.name == this.$route.name) {
            title = ite.meta.title
            return
          }
        })
        console.log(this.$route)
        // 如果此时页签数组没有该项，则将它加入到页签数组中
        editableTabs.push({
          titleList,
          title: title,
          path: this.$route.path,
          name: item.title,
          halfPath: item.path,
        })
      }
      // 改变当前选中的页签值
      editableTabsValue = title
      this.$store.dispatch('tab/setEditableTabs', editableTabs)
      this.$store.dispatch('tab/setEditableTabsValue', editableTabsValue)
      sessionStorage.setItem('setEditableTabs', JSON.stringify(editableTabs))
      sessionStorage.setItem('setEditableTabsValue', editableTabsValue)
    },
    addTab(item) {
      let setEditableTabs = JSON.parse(
        sessionStorage.getItem('setEditableTabs')
      )
      let setEditableTabsValue = sessionStorage.getItem('setEditableTabsValue')

      //   关闭所有点击侧边栏 添加操作
      if (!setEditableTabs.length) {
        this.firstAddTag()
      } else {
        let editableTabs = setEditableTabs || []
        let editableTabsValue = setEditableTabsValue || ''
        let itemInfo = {}
        let hasSame = editableTabs.filter((item1) => item1.title == item.title)
        if (!hasSame.length) {
          //   一定存在一级菜单模块中第一个二级模块  拼接字符串
          editableTabs.map((item1) => {
            item1.titleList.map((item2) => {
              if (item2 == item.title) {
                itemInfo.path = item1.halfPath + '/' + item.path
                itemInfo.halfPath = item1.halfPath
                itemInfo.titleList = item1.titleList
                itemInfo.title = item.title
                itemInfo.name = item1.name
                return
              }
            })
          })
          // 如果此时页签数组没有该项，则将它加入到页签数组中
          editableTabs.push(itemInfo)
        }
        // 改变当前选中的页签值
        editableTabsValue = item.title
        this.$store.dispatch('tab/setEditableTabs', editableTabs)
        this.$store.dispatch('tab/setEditableTabsValue', editableTabsValue)
        sessionStorage.setItem('setEditableTabs', JSON.stringify(editableTabs))
        sessionStorage.setItem('setEditableTabsValue', editableTabsValue)
      }
    },
  },
}
</script>
<style lang="scss" type="text/scss">
@import '~@/styles/variables.scss';

#left-sidebar-wrapper {
  display: flex;
  flex-direction: column;
  background: $leftsidebarwrapperBGColor;
  height: 100%;
  .sidebar-wrapper-header {
    height: 38px;
    display: flex;
    align-items: center;
    padding-left: 0.1rem;
    i {
      font-size: 0.18rem;
      margin-right: 8px;
      color: #333333;
      font-weight: bold;
    }
    span {
      color: #333333;
    }
  }
  .left-sidebar-container {
    background: $pageLayoutMenuBgColor;
    height: 100%;
  }
  .sidebar-wrapper-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    height: 100%;
    background-color: $pageLayoutMenuBlockBgColor;
    margin-left: $menuitemMarginLeft;
    flex-direction: column;
    .menu-item {
      // border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      line-height: 18px;
      background: $pageLayoutMenuBlockBgColor;

      font-size: 0.12rem;
      height: 0.6rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      text-align: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-family: Microsoft YaHei;
      color: $pageLayoutLeftMenuText;
      cursor: pointer;
      a {
        height: 100%;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 0.08rem 0;
      }
      i {
        font-size: 0.12rem;
        color: $pageLayoutLeftMenuText;
        margin-right: 5px;
      }
      span {
        font-size: 0.12rem;
        line-height: 20px;
        font-weight: 500;
        margin-left: -6px;
        color: $pageLayoutLeftMenuText;
      }
      a.router-link-active {
        background-color: $pageLayoutLeftMenuActiveBg;
        i {
          color: $pageLayoutLeftMenuActiveText;
        }
        span {
          color: $pageLayoutLeftMenuActiveText;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
