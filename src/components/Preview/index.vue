<template>
  <el-dialog
    title="图片"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose">
    <div class="dialog-container">
      <div class="body-img">
        <img :src="imgSrc" alt="">
      </div>
      <div class="div-list">
        <div class="list-item" v-for="(itemImg,index) in item.data" :key="index" @click="changeImg(itemImg)">
          <img :src="itemImg" alt="">
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        dialogVisible: true,
        imgSrc: null
      }
    },
    methods: {
      handleClose() {
        this.dialogVisible = false
        this.$emit('on-close', this.item)
      },

      changeImg(img) {
        this.$set(this, 'imgSrc', img)
      }
    },
    created() {
      this.imgSrc = this.item.data[0]
    }
  }
</script>

<style scoped type="text/scss" lang="scss">
  .dialog-container {
    width: 100%;
    height: 6.8rem;
    overflow: hidden;
    .body-img {
      width: calc(80% - 0.2rem);
      float: left;
      height: 100%;
    }
    .div-list {
      width: 20%;
      height: 100%;
      overflow: auto;
      float: right;
      .list-item {
        height: 1.62rem;
        width: 100%;
        margin-bottom: 0.1rem;
        cursor: pointer;
      }
    }
    img {
      margin: auto;
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
    }
  }
</style>
