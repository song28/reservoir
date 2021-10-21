<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>
    <span v-if="breadcrumb" class="nav-title">您好，欢迎来到{{title}}！</span>
    <breadcrumb v-else class="breadcrumb-container"/>
    <div class="right-menu-info">
      <div class="info-item" v-if="title && title.indexOf('内涝') != -1">
        <router-link tag="a" target="_blank" :to="{path:'/jjnlTv'}">大屏</router-link>
      </div>
      <div class="info-item" @click="pageLayout = !pageLayout">
        <span>切换布局</span>
      </div>
      <div class="user">
        <i class="el-icon-user"></i>
        {{addvnm}}-{{username}}
      </div>
      <div style="background-color: #DEDEDE;width: 2px;height: 0.15rem;margin: 0 0.15rem"></div>
      <div class="logout" @click="logout">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Screenfull from '@/components/Screenfull'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import LangSelect from '@/components/LangSelect'
  import ThemeSelect from '@/components/ThemeSelect'
  import ThemePicker from '@/components/ThemePicker'
  const defaultSettings = require('@/settings.js')
  export default {
    components: {
      Breadcrumb,
      Screenfull,
      Hamburger,
      LangSelect,
      ThemeSelect,
      ThemePicker
    },
    data() {
      return {
        breadcrumb: false
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ]),
      title() {
        return defaultSettings.title
      },
      username() {
        return this.$store.getters.name
      },
      addvnm() {
        return this.$store.getters.addvnm
      },
      pageLayout: {
        
        get() {
          return this.$store.state.settings.pageLayout
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'pageLayout',
            value: val
          })
        }
      }
    },

    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      getBreadcrumb() {
        let breadcrumb = this.$route.meta.breadcrumb
        document.title = this.title
        if (breadcrumb == false) {
          this.breadcrumb = true
        } else {
          this.breadcrumb = false
        }

      },
    },
    watch: {
      $route(route) {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
  }
</script>

<style lang="scss" scoped type="text/scss">
  @import "~@/styles/variables.scss";

  .navbar {
    height: $navHeight;
    background: $menuBg;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    display: flex;
    align-items: center;
    padding: 0 0 0 0.22rem;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    .nav-title {
      color: $menuText;
      padding-left: 0.15rem;
      height: 100%;
      display: inline-flex;
      align-items: center;
    }
    .hamburger-container {
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;
      color: $menuText;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu-info {
      display: flex;
      margin-left: auto;
      align-items: center;
      padding-right: 0.15rem;
      .el-icon-user {
        font-size: 0.16rem;
      }
      .logout {
        cursor: pointer;
      }
      & > div {
        color: $menuText;
      }

      .info-item {
        cursor: pointer;
        padding: 2px 10px;
        margin-right: 20px;
        border: 1px solid #ddd;
      }
    }
  }

</style>
