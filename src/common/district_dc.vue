<template>
  <div class="district_list">
    <div class="dialog-box">
      <span class="bot"></span>
      <span class="top"></span>
    </div>
    <div class="district_item">
      <span
        v-for="item in data"
        :key="item.value"
        :value="item.value"
        @click="clickGet(item)"
      >{{item.name}}</span>
    </div>
    <div class="maskLayer" @click="clickGet"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { name: "诺江镇", value: 1 },
        { name: "民胜镇", value: 2 },
        { name: "火炬镇", value: 3 },
        { name: "杨柏镇", value: 4 },
        { name: "涪阳镇", value: 5 },
        { name: "新场镇", value: 6 },
        { name: "板桥口镇", value: 7 },
        { name: "诺水河镇", value: 8 },
        { name: "铁佛镇", value: 9 },
        { name: "麻石镇", value: 10 },
        { name: "春在镇", value: 11 },
        { name: "广纳镇", value: 12 },
        { name: "三溪镇", value: 13 },
        { name: "至诚镇", value: 14 },
        { name: "洪口镇", value: 15 },
        { name: "沙溪镇", value: 16 },
        { name: "龙凤场镇", value: 17 },
        { name: "瓦室镇", value: 18 },
        { name: "永安镇", value: 19 },
        { name: "毛浴镇", value: 20 },
        { name: "泥溪镇", value: 21 },
        { name: "空山镇", value: 22 },
        { name: "铁溪镇", value: 23 },
        { name: "两河口镇", value: 24 },
        { name: "大兴乡", value: 25 },
        { name: "东山乡", value: 26 },
        { name: "双泉乡", value: 27 },
        { name: "文峰乡", value: 28 },
        { name: "云昙乡", value: 29 },
        { name: "芝苞乡", value: 30 },
        { name: "长坪乡", value: 31 },
        { name: "董溪乡", value: 32 },
        { name: "澌波乡", value: 33 },
        { name: "陈河乡", value: 34 },
        { name: "草池乡", value: 35 },
        { name: "文胜乡", value: 36 },
        { name: "兴隆乡", value: 37 },
        { name: "烟溪乡", value: 38 },
        { name: "朱元乡", value: 39 },
        { name: "回林乡", value: 40 },
        { name: "铁厂乡", value: 41 },
        { name: "青浴乡", value: 42 },
        { name: "板凳乡", value: 43 },
        { name: "唱歌乡", value: 44 },
        { name: "三合乡", value: 45 },
        { name: "沙坪乡", value: 46 },
        { name: "松溪乡", value: 47 },
        { name: "九层乡", value: 48 },
        { name: "胜利乡", value: 49 },
        { name: "全部", value: 50 }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    clickGet(item) {
      this.$emit("getDistrictDate", item);
    }
  },
  watch: {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scope>
.district_list {
  width: 3rem;
  position: absolute;
  top: 37px;
  z-index: 100;
  display: block;
  font-size: 12px;
  line-height: 24px;
  color: #333;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  .dialog-box {
    position: absolute;
    top: 11px;
    z-index: 1000;
    span {
      width: 0;
      height: 0;
      font-size: 0;
      overflow: hidden;
      position: absolute;
      &.bot {
        border-width: 9px;
        border-style: solid dashed dashed;
        border-color: transparent transparent #dcdfe6 transparent;
        left: 15px;
        top: -29px;
      }
      &.top {
        border-width: 7px;
        border-style: solid dashed dashed;
        border-color: transparent transparent #fff transparent;
        left: 17px;
        top: -25px;
      }
    }
  }
  .district_item {
    width: 100%;
    height: 100%;
    padding: 5px 15px;
    position: relative;
    z-index: 1000;
    &::after {
      display: block;
      clear: both;
      content: "";
    }
    span {
      float: left;
      margin: 0 5px;
      cursor: pointer;
      &:hover {
        color: #007cfa;
      }
    }
  }
  .maskLayer{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    background: rbga(0,0,0,0);
    z-index: 999;
  }
}
</style>
