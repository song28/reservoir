<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-09-07 09:12:37
 * @LastEditTime: 2021-09-27 15:20:47
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">

      <router-link key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo/logo_dz.png">
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo from '@/assets/images/logo/logo_dz.png'
const defaultSettings = require('@/settings.js')
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    title() {
      console.log(this.$store.state.app.title, 'title111')

      return this.$store.getters.title
    }
  }

}
</script>

<style lang="scss" scoped type="text/scss">
  @import "~@/styles/variables.scss";

  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    width: 100%;
    height: $logoHeight;
    background: $menuBg;
    border-bottom: 3px solid #0D1116;
    display: flex;
    .sidebar-logo-link {
      flex: 1;
      display: flex !important;
      align-items: center;
      padding-left: 10px;
      .sidebar-logo {
        width: 40px;
        height: 42px;
        margin-right: 6px;
      }
      img{
        width: .54rem;
        height: .54rem;
        margin-right: .1rem;
      }
      .sidebar-title {
        color: $menuText;
        font-size: 13px;
        font-family: "Microsoft YaHei";
        padding-right: 0.1rem;
      }
    }

    .collapse {
      .sidebar-logo {
        margin-right: 0px;
      }
    }
  }
</style>
