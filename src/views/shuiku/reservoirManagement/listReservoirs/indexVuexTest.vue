<template>
  <div class="skList">
    <!-- 测试 -->
    <div>count值：{{ $store.state.count }}</div>
    <div @click="addClick">【点击事件】+3：{{ count }}</div>
    <div @click="addClick2">【点击事件】-1：{{ count }}</div>
    <div @click="addClick3">【点击事件延时1s】+2：{{ count }}</div>
    <div @click="subAsync(2)">
      直接定义click事件为subAsync，【点击事件延时1s】-2：{{ count }}
    </div>
    <!-- <h3>
      getter
      {{ $store.getter.showNum }}
    </h3>
    <h3>
      getter映射之后直接渲染
      {{showNum }}
    </h3> -->
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["count"]), //映射定义的值，可以直接在页面中调用
    ...mapState(["mapGetters"]) //映射定义的值，可以直接在页面中调用
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapMutations(["subTest"]), //映射方法，在自定义方法中调用；不映射的话，使用【commit】，调用
    ...mapActions(["subAsync"]), //映射异步方法，在自定义方法中使用【dispatch】调用 【mapActions】本身就是一个函数，映射到mapActions
    addClick() {
      this.$store.commit("addTest", 3);
    },
    addClick2() {
      this.subTest(1);
    },
    addClick3() {
      this.$store.dispatch("addAsync", 2);
    },
    addClick4() {
      this.subAsync(2);
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.skList {
  position: absolute;
  width: 100%;
  height: calc(100% - 0.32rem);
  background: #f4fbf5;
  font-size: 0.14rem;
  >>> .el-container {
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
  }
  .right {
    margin: 0rem;
    margin-left: 0.1rem;
    height: 100%;
    background: #fff;
    >>> .el-header {
      height: 30px !important;
    }
  }
  .el-aside {
    width: 2.4rem !important;
    background: rgb(255, 255, 255);
  }
  >>> .el-dialog__body {
    padding-top: 0.15rem !important;
  }
}
</style>