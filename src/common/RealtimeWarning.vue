<template>
  <div class="realtime-warning">
    <img src="@/assets/images/map/warn_3.png" alt=""> 
  </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss" type="text/scss">
  @import "~@/styles/variables.scss";

  .realtime-warning {
    img {
      width: 22px;
      height: 22px;
      margin-right: 0.1rem;
    }
    color: $warningColor;
    display: flex;
    align-items: center;
    padding: 0 0.1rem;
    font-size: 0.15rem;
  }
</style>
