<template>
  <div class="district_list">
    <div class="dialog-box">
      <span class="bot"></span>
      <span class="top"></span>
    </div>
    <div class="district_item">
      <span
        v-for="item in data"
        :key="item.ADDVCD || item.addvcd"
        :value="item.ADDVCD || item.addvcd"
        @click="clickGet(item)"
      >{{item.ADDVNM || item.addvnm}}</span>
    </div>
    <div class="maskLayer" @click="clickGet({})"></div>
  </div>
</template>

<script>
import {getIOTSQL, getIOTSQLPage} from '@/utils/sqlAjaxUtil'
export default {
  data() {
    return {
      data:[
        // {pid: "511921000000", ADDVNM: "诺江镇", ADDVCD: "511921100000"},
        // {pid: "511921000000", ADDVNM: "诺江镇", ADDVCD: "511921100000"},
        // {pid: "511921000000", ADDVNM: "民胜镇", ADDVCD: "511921101000"},
        // {pid: "511921000000", ADDVNM: "火炬镇", ADDVCD: "511921102000"},
        // {pid: "511921000000", ADDVNM: "广纳镇", ADDVCD: "511921103000"},
        // {pid: "511921000000", ADDVNM: "铁佛镇", ADDVCD: "511921104000"},
        // {pid: "511921000000", ADDVNM: "麻石镇", ADDVCD: "511921105000"},
        // {pid: "511921000000", ADDVNM: "至诚镇", ADDVCD: "511921106000"},
        // {pid: "511921000000", ADDVNM: "洪口镇", ADDVCD: "511921107000"},
        // {pid: "511921000000", ADDVNM: "沙溪镇", ADDVCD: "511921108000"},
        // {pid: "511921000000", ADDVNM: "瓦室镇", ADDVCD: "511921109000"},
        // {pid: "511921000000", ADDVNM: "永安镇", ADDVCD: "511921110000"},
        // {pid: "511921000000", ADDVNM: "铁溪镇", ADDVCD: "511921111000"},
        // {pid: "511921000000", ADDVNM: "涪阳镇", ADDVCD: "511921112000"},
        // {pid: "511921000000", ADDVNM: "诺水河镇", ADDVCD: "511921113000"},
        // {pid: "511921000000", ADDVNM: "毛浴镇", ADDVCD: "511921114000"},
        // {pid: "511921000000", ADDVNM: "泥溪镇", ADDVCD: "511921115000"},
        // {pid: "511921000000", ADDVNM: "板桥口镇", ADDVCD: "511921117000"},
        // {pid: "511921000000", ADDVNM: "新场镇", ADDVCD: "511921118000"},
        // {pid: "511921000000", ADDVNM: "杨柏镇", ADDVCD: "511921119000"},
        // {pid: "511921000000", ADDVNM: "三溪镇", ADDVCD: "511921120000"},
        // {pid: "511921000000", ADDVNM: "春在镇", ADDVCD: "511921121000"},
        // {pid: "511921000000", ADDVNM: "龙凤场镇", ADDVCD: "511921122000"},
        // {pid: "511921000000", ADDVNM: "空山镇", ADDVCD: "511921123000"},
        // {pid: "511921000000", ADDVNM: "杨柏乡", ADDVCD: "511921200000"},
        // {pid: "511921000000", ADDVNM: "大兴乡", ADDVCD: "511921201000"},
        // {pid: "511921000000", ADDVNM: "东山乡", ADDVCD: "511921202000"},
        // {pid: "511921000000", ADDVNM: "三溪乡", ADDVCD: "511921203000"},
        // {pid: "511921000000", ADDVNM: "双泉乡", ADDVCD: "511921204000"},
        // {pid: "511921000000", ADDVNM: "文峰乡", ADDVCD: "511921205000"},
        // {pid: "511921000000", ADDVNM: "春在乡", ADDVCD: "511921206000"},
        // {pid: "511921000000", ADDVNM: "三合乡", ADDVCD: "511921207000"},
        // {pid: "511921000000", ADDVNM: "云昙乡", ADDVCD: "511921208000"},
        // {pid: "511921000000", ADDVNM: "唱歌乡", ADDVCD: "511921209000"},
        // {pid: "511921000000", ADDVNM: "芝苞乡", ADDVCD: "511921210000"},
        // {pid: "511921000000", ADDVNM: "龙凤场乡", ADDVCD: "511921211000"},
        // {pid: "511921000000", ADDVNM: "董溪乡", ADDVCD: "511921212000"},
        // {pid: "511921000000", ADDVNM: "澌波乡", ADDVCD: "511921213000"},
        // {pid: "511921000000", ADDVNM: "松溪乡", ADDVCD: "511921214000"},
        // {pid: "511921000000", ADDVNM: "九层乡", ADDVCD: "511921215000"},
        // {pid: "511921000000", ADDVNM: "胜利乡", ADDVCD: "511921216000"},
        // {pid: "511921000000", ADDVNM: "板凳乡", ADDVCD: "511921217000"},
        // {pid: "511921000000", ADDVNM: "文胜乡", ADDVCD: "511921218000"},
        // {pid: "511921000000", ADDVNM: "兴隆乡", ADDVCD: "511921219000"},
        // {pid: "511921000000", ADDVNM: "毛裕乡", ADDVCD: "511921220000"},
        // {pid: "511921000000", ADDVNM: "泥溪乡", ADDVCD: "511921221000"},
        // {pid: "511921000000", ADDVNM: "烟溪乡", ADDVCD: "511921222000"},
        // {pid: "511921000000", ADDVNM: "沙坪乡", ADDVCD: "511921223000"},
        // {pid: "511921000000", ADDVNM: "朱元乡", ADDVCD: "511921224000"},
        // {pid: "511921000000", ADDVNM: "长坪乡", ADDVCD: "511921225000"},
        // {pid: "511921000000", ADDVNM: "两河口乡", ADDVCD: "511921226000"},
        // {pid: "511921000000", ADDVNM: "空山乡", ADDVCD: "511921227000"},
        // {pid: "511921000000", ADDVNM: "青浴乡", ADDVCD: "511921228000"},
        // {pid: "511921000000", ADDVNM: "板桥口乡", ADDVCD: "511921229000"},
        // {pid: "511921000000", ADDVNM: "铁厂乡", ADDVCD: "511921230000"},
        // {pid: "511921000000", ADDVNM: "新场乡", ADDVCD: "511921231000"},
        // {pid: "511921000000", ADDVNM: "陈河乡", ADDVCD: "511921232000"},
        // {pid: "511921000000", ADDVNM: "草池乡", ADDVCD: "511921233000"},
        // {pid: "511921000000", ADDVNM: "回林乡", ADDVCD: "511921234000"},
      ]
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    clickGet(item) {
      this.$emit("getDistrictDate", item);
    },
    getData(){
        var page = this;
        getIOTSQL("addvcd_list",{addvcd:this.$store.getters.addvcd}, true, function (res) {
          if (res) {
           page.data = res; 
          }
        });
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
  z-index: 2001;
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
    z-index: 2001;
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
