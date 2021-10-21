<template>
  <div class="header-right">
    <!-- <div class="right-item" @click="comeScreen()">
      <span>进入大屏</span>
    </div> -->
    <div class="user">
      <i class="el-icon-user"></i>
      {{addvnm}}-{{username}}
    </div>
    <div style="background-color: #DEDEDE;width: 2px;height: 0.12rem;margin: 0 0.15rem"></div>
    <div class="logout" @click="logout">
      退出登录
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breadcrumb: false,
      }
    },
    computed: {
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
      comeScreen(){
       let token=window.localStorage.getItem("vtoken");
        window.location.href = "http://116.52.166.246:9924/DongChuanFront/home/index?token="+token;
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  @import "~@/styles/variables.scss";

  .header-right {
    display: flex;
    height: 100%;
    margin-left: auto;
    align-items: center;
    padding: 0 0.15rem;
    background-color: $pageLayoutHeaderActiveBg;
    .el-icon-user {
      font-size: 0.16rem;
    }
    .logout {
      cursor: pointer;
    }
    & > div {
      color: #FFF;
    }

    .right-item {
      cursor: pointer;
      padding: 2px 10px;
      margin-right: 20px;
      border: 1px solid #ddd;
    }

  }
</style>
