<template>
  <div class="tab-total" :style="{'color': color}">
    <div class="tab-total-title">{{data.title}}</div>
    <div class="tab-total-count">{{data.total.toLocaleString()}}</div>
    <div class="tab-total-bar" ref="bar">
      <span :style="[{'background':color},{'width': width}]"></span>
    </div>
    <div class="tab-total-describe">
      <span>
        <i>{{data.describe}}</i>
        {{data.count}}
      </span>
      <span>
       <i> {{data.proportionName}}</i>{{data.proportion * 100}} %
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabTotal",
    props: ['data', 'color'],
    data() {
      return {
        width: null
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.width = this.$refs.bar.clientWidth * (this.data.proportion / 100) + 'px'
      })
    },

  }
</script>

<style scoped type="text/scss" lang="scss">
  .tab-total {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tab-total-title {
      font-size: 0.18rem;
      color: #666666;
    }
    .tab-total-count {
      font-size: 0.34rem;
    }
    .tab-total-bar {
      width: 100%;
      height: 0.08rem;
      margin-top: 0.2rem;
      border-radius: 3px;
      background: #EBEDED;
      position: relative;
      span {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 3px;
      }
    }
    .tab-total-describe {
      font-size: 0.14rem;
      display: flex;
      justify-content: space-between;
      span {
        i {
          color: #999999;
          font-style: normal;
        }
      }
    }
  }
</style>
