<template>
  <div @click="toggleClick" class="app-hamburger">
    <i class="iconfont icon-iconfonticon-shousu" :class="{'is-active':!isActive}"></i>
  </div>
</template>

<script>
  export default {
    name: 'Hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleClick() {
        this.$emit('toggleClick')
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  @import "~@/styles/variables.scss";

  .app-hamburger {
    display: inline-flex;
    align-items: center;
    height: 100%;
    i {
      font-size: 24px;
      color: $menuText;
    }
    i.is-active {
      transform: rotate(180deg);
    }
  }

</style>
