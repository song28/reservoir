<template>
  <el-dropdown trigger="click" class="international" @command="themeChange">
    <div>
      <svg-icon icon-class="theme"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="theme==='#1890FF'" command="#1890FF">
        <i class="theme-icon theme-icon-1"></i> 天空蓝
      </el-dropdown-item>
      <el-dropdown-item :disabled="theme==='#ffc0cb'" command="#ffc0cb">
       <i class="theme-icon theme-icon-2"></i> 梦幻粉
      </el-dropdown-item>
      <el-dropdown-item :disabled="theme==='#808080'" command="#808080">
        <i class="theme-icon theme-icon-3"></i>  雾霾灰
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style scoped>
  .el-dropdown-menu__item{
    display: flex;
    align-items: center;
  }
  .theme-icon{
    width: 14px;
    height: 14px;
  }

  .theme-icon-1{
    background-color: #1890FF;
  }

  .theme-icon-2{
    background-color: #ffc0cb;
  }

  .theme-icon-3{
    background-color: #808080;
  }
</style>
