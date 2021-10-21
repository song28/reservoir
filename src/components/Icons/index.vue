<template>
  <div class="app-icons">
     <div v-for="(item,index) of svgIcons" :key="item.val" @click="handleClick(item,index)"
         :class="{'active': index == clickIndex}">
      <img :src="getIconUrl(item.val)" :alt="item.name">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import {getIcons} from '@/utils/getIcons'
  export default {
    data() {
      return {
        svgIcons:getIcons(),
        clickIndex: null,
      }
    },
    methods: {
      handleClick(item, index) {
        this.$emit('handle-click', item)
        this.clickIndex = index
      },
      getIconUrl(val) {
        return require('@/assets/images/map/layer/' + val + '.png');
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss" scope>
  .app-icons {
    max-height: 6rem;
    overflow: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > div {
      padding: 0.05rem;
      margin: 0.05rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      img {
        width: auto;
        height: 29px;
        margin-bottom: 5px;
      }
    }
    div.active {
      span {
        color: #409EFF;
      }
    }
  }
</style>
