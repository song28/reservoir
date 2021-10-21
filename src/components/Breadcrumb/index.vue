<template>
  <div
    v-if="editableTabs.length"
    id="breadWidth"
    class="breadcrumb-wrapper"
  >
    <!-- <div class="breadcrumb-title">
      <img src="@/assets/images/icon/breadicon.png" alt="" />
      <p>{{ this.levelList[0].meta.title }}</p>
    </div> -->
    <!-- <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <a
            v-if="
              item.redirect === 'noRedirect' || index == levelList.length - 1
            "
            @click.prevent="handleLink(item)"
            class="no-redirect-a"
          >
            {{ generateTitle(item.meta.title) }}
          </a>
          <span v-else class="no-redirect">{{
            generateTitle(item.meta.title)
          }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb> -->
    <!-- <div class="rt-content">
      <div class="el-tab-list">
        <el-tabs v-model="editableTabsValue" type="card" closable>
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in editableTabs"
            :label="item.title"
            :name="item.title"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </div> -->
    <el-row :gutter="20">
      <el-col :span="21">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="chooseTab"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.title"
            :label="item.title"
            :name="item.title"
          >
            {{ item.content }}
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="value"
          size="small"
          class="operation"
          placeholder="操作页签"
          @change="selected"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div
          class="bai"
          style="width: 100%; height: 2px; background: none"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {generateTitle} from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'
// import tab from '@/store/modules/tab.js'

export default {
  data() {
    return {
      levelList: null,
      editableTabsValue: '',
      editableTabs: [],
      options: [
        {
          value: '1',
          label: '刷新当前'
        },
        {
          value: '2',
          label: '关闭当前'
        },
        {
          value: '3',
          label: '关闭其他'
        },
        {
          value: '4',
          label: '全部关闭'
        }
      ],
      value: ''
    }
  },
  watch: {
    '$store.state.tab.editableTabsValue': {
      handler: function(newV, oldV) {
        if (newV != '') {
          this.editableTabsValue = newV
        }
      },
      deep: true,
      immediate: true
    },
    '$store.state.tab.editableTabs': {
      handler: function(newV, oldV) {
        if (newV != '') {
          this.editableTabs = newV
        }
      },
      deep: true,
      immediate: true
    },
    $route(route) {
      if (route.name == 'DzMapChild') {
        // this.delAll1();
        document.getElementById('breadWidth').style.width =
          'calc(100% - 4.4rem)'
        document.getElementById('breadWidth').style.display = 'none'
      } else {
        document.getElementById('breadWidth').style.width = '100%'
        document.getElementById('breadWidth').style.display = 'block'
      }
      // 如果转到重定向页面，不要更新breadcrumb
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    if (sessionStorage.getItem('SystemID') == 163) {
      this.publicFn([], (this.editableTabsValue = ''))
    }
    this.getBreadcrumb()
    this.getSessions()
  },

  methods: {
    selected(val) {
      switch (val) {
        case '1':
          this.refresh()
          break
        case '2':
          this.removeTab()
          break
        case '3':
          this.delOther()
          break
        case '4':
          this.delAll()
          break
      }
    },
    delAll() {
      this.editableTabsValue = ''
      this.editableTabs = []
      this.publicFn(this.editableTabs, (this.editableTabsValue = ''))
      //   this.$router.push('/dzMap/dzMap')
      this.$router.push({
        path: '/'
      })
    },
    delAll1() {
      this.editableTabsValue = ''
      this.editableTabs = []
      this.publicFn(this.editableTabs, (this.editableTabsValue = ''))
    },
    // delOther
    delOther() {
      const tabs = this.editableTabs
      const activeName = this.editableTabsValue
      this.editableTabs = tabs.filter((tab) => {
        if (tab.title == activeName) {
          return tab
        }
      })
      this.publicFn(this.editableTabs, activeName)
    },
    // 刷新
    refresh() {
      this.editableTabs.map((item) => {
        if (item.title == this.editableTabsValue) {
          history.go(0)
          this.value = ''
          return
        }
      })
    },
    getSessions() {
      // 本地存储页签 防止vux刷新丢失

      const setEditableTabs = JSON.parse(
        sessionStorage.getItem('setEditableTabs')
      )
      const setEditableTabsValue = sessionStorage.getItem('setEditableTabsValue')
      this.editableTabs = setEditableTabs || []
      this.editableTabsValue = setEditableTabsValue || ''
    },
    chooseTab(tab) {
      // 跳转到切换的页签的路由上
      this.$router.push(this.editableTabs[tab.index].path)
    },
    removeTab(targetName = this.editableTabsValue) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue

      if (targetName == activeName) {
        // 删除当前页签
        tabs.forEach((tab, index) => {
          if (tab.title === targetName) {
            // 关闭当前页签后，如果有下一个页签则显示下一个，否则显示前一个
            const nextTab = tabs[index + 1] || tabs[index - 1]

            if (nextTab) {
              activeName = nextTab.title
              this.$router.push(nextTab.path)
            } else {
              activeName = ''
              //   this.$router.push('/dzMap/dzMap')
              this.$router.push({
                path: '/'
              })
            }
          }
        })
      }
      this.editableTabs = tabs.filter((tab) => {
        if (tab.title != targetName) {
          return tab
        }
      })
      this.publicFn(this.editableTabs, activeName)
    },
    // 提取公共函数
    publicFn(params, val) {
      this.$store.dispatch('tab/setEditableTabs', params)
      this.$store.dispatch('tab/setEditableTabsValue', val)
      sessionStorage.setItem('setEditableTabs', JSON.stringify(params))
      sessionStorage.setItem('setEditableTabsValue', val)
      this.value = ''
    },
    generateTitle,
    getBreadcrumb() {
      const setEditableTabs = JSON.parse(
        sessionStorage.getItem('setEditableTabs')
      )
      const setEditableTabsValue = sessionStorage.getItem('setEditableTabsValue')
      this.editableTabs = setEditableTabs || []
      this.editableTabsValue = setEditableTabsValue || ''
      if (this.$route.name == 'DzMapChild') {
        editableTabs = []
        this.levelList = []
        return
      } else {
        const matched = this.$route.matched.filter(
          (item) => item.meta && item.meta.title
        )
        this.levelList = matched.filter(
          (item) =>
            item.meta && item.meta.title && item.meta.breadcrumb !== false
        )
        this.levelList.reverse()
      }
    },
    pathCompile(path) {
      const {params} = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const {redirect, path} = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss" scoped>
@import '~@/styles/variables.scss';
.breadcrumb-wrapper {
  width: 100%;
  //   line-height: $navHeight;
  // background-color: #eee;
  background-color: #cfe5e1;
  //   display: flex;
  margin-top: 0px;
  padding: 0 10px;
  //   justify-content: space-between;
  //   position: relative;
  border: 1px solid rgba(65, 157, 255, 0.1);
  height: 30px;
  .operation {
    margin-top: 0.02rem;
  }
  .el-tabs--card {
    .el-tabs__header {
      //   height: 0.35rem;
      margin-bottom: 0px;
      border: 1px solid transparent;
    }
    .el-tabs__content {
      display: none;
    }
  }
  .breadcrumb-title {
    font-size: 0.14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(11, 99, 158, 1);
    display: flex;
    align-items: center;
    img {
      width: 0.12rem;
      height: 0.12rem;
      margin-right: 5px;
    }
  }
}
.el-tabs__nav .el-tabs__item:hover {
  background: #cfe5e1;
}
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  line-height: $navHeight;
  margin-left: 2px;
  // background-color:#BAE2E3;
  // background-color:#f5f5f5;
  // width:20%;
  margin-top: 2px;
  padding-left: 10px;

  .no-redirect-a {
    color: #000;
    cursor: pointer;
  }
  .no-redirect {
    color: $menuActiveBg;
    cursor: text;
    // color: #fff;
    // background: #19aa6b;
    color: #0f8adc;
    border-radius: 10px;
    padding: 2px 8px;
  }
}
</style>

<style lang="scss" scoped>
>>> .el-tabs--card {
  .el-tabs__header {
    // height: 0.35rem;
    margin-bottom: 0px;
    border: 1px solid transparent;
    .el-tabs__nav {
      border: none;
      // line-height: 0.31rem;
      // height: 0.31rem;
      line-height: 28px;
      height: 28px;
      .el-tabs__item {
        border-left: none;
        margin-left: 0.02rem;
        height: 100%;
        line-height: 28px;
        text-align: center;
        background: #cfe5e1;
        color: #606266;
      }
      .el-tabs__item:hover {
        background: #29958ab4;
        color: #fff !important;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .is-active {
        background: #29958b;
        color: #fff !important;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
  .el-tabs__content {
    display: none;
  }
}
>>> .el-tabs__nav-scroll {
  height: 28px;
  padding-left: 0 !important;
}
>>> .el-input--small .el-input__inner {
  height: 27px;
  line-height: 28px;
}
>>> .el-tabs__nav-next,
.el-tabs__nav-prev {
  line-height: 34px !important;
}
</style>
<style lang="scss" type="text/scss">
.el-tabs__nav-next,
.el-tabs__nav-prev {
  line-height: 32px !important;
}
</style>
