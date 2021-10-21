<template>
  <div  >
   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total: 1204
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  @import "~@/styles/variables.scss";

  .header-online {
    display: flex;
    flex-direction: column;
    background-color: $pageLayoutHeaderActiveBg;
    padding: 0 0.1rem;
    border: 1px solid $tipBg;
    border-radius: 4px;
    max-height: 0.6rem;
    margin-right: 0.32rem;
    span {
      font-size: 0.14rem;
      color: #fff;
    }
    span:last-child {
      font-size: 0.22rem;
      font-weight: bold;
    }
  }
</style>
