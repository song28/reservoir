<template>
  <div class="tip-container" >
    <realtime-warning/>
    <weater/>
  </div>
</template>

<script>
  import Weater from '@/common/Weater.vue'
  import RealtimeWarning from '@/common/RealtimeWarning.vue'

  export default {
    components: {
      Weater,
      RealtimeWarning
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
.tip-container{
  display: none!important;
}
</style>
