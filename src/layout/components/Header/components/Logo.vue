<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-09-07 09:12:37
 * @LastEditTime: 2021-09-27 15:37:29
-->
<template>
  <div class="header-logo-container">
    <img src="@/assets/images/logo/logo_sk.png">
    <span class="sidebar-title">{{ this.$store.state.app.title }}</span>
  </div>
</template>

<script>
import logo from '@/assets/images/logo/logo_sk.png'

export default {
  computed: {
    title() {
      console.log(this.$store.state.app.title, 'title2222')

      return this.$store.getters.title
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
  @import "~@/styles/variables.scss";

  .header-logo-container {
    padding: 0 0.1rem;
    display: flex;
    align-items: center;
    img {
      width: 0.45rem;
      height: 0.45rem;
    }
    .sidebar-title {
      color: #fff;
      font-size: 0.24rem;
      margin-left: 0.1rem;
      letter-spacing: 3px;
      padding-right: 0.1rem;
    }
  }
</style>
