<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container" />  
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import breadcrumb from "@/components/Breadcrumb"
  export default {
    name: 'AppMain',
    components:{
      breadcrumb
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss" scoped>
  @import "~@/styles/variables.scss";

  .app-main {
    min-height: calc(100vh - #{$navHeight});
    width: 100%;
    position: relative;
    overflow: hidden !important;
    overflow-y: scroll;
    /* background: #EDF0FF; */
  }

  .fixed-header + .app-main {
    padding-top: $navHeight;
    height: 100vh;
  }

  .hidden-header + .app-main {
    padding-top: 0;
    height: 100vh;
    min-height: 100vh;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
      padding-top: 84px;
    }

    .hidden-header + .app-main {
      padding-top: 0;
      height: 100vh;
      min-height: 100vh;
    }
  }
</style>

<style lang="scss" type="text/scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
