<template>
  <div class="site-monitoring">
 
   <!-- 工况数据查看 -->
    <div class="tab-search mt-2 mb-2">
      <!-- {{paramsList}} -->
      <app-search @on-query="queryChartInfo" :params="currentParams" :kjData="rapid_time_value"></app-search>
      <el-radio-group size="mini" v-model="rapid_time_value">
        <el-radio-button
          v-for="item in rapid_time_list"
          :key="item.name"
          :label="item.value"
        >{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
 
 
 

    <template  > 
    
      <div class="tab-chart">
   
        <!-- 图表组件 -->
        <base-work
        
         
          :radio="chart.rainRadio"
          :data="chart.data"
          :contData="contData"
         
          style="flex:1;"
          :key="chart.key"
        ></base-work>
      </div>
    </template>
  </div>
</template>

<script>
import { generateUUID } from "@/utils";
import {
  getDeviceElement,
  getDeviceChartData,
  getChartGNSSStandardData,
  getChartLFStandardData
} from "@/api/deviceBase";
import appSearch from "@/common/Search.vue";

export default {
  props: ["device",'menuData', "selMontiorData"],
  components: {
    appSearch
  },
  data() {
    return {
      paramsList: [],
      contData: {},
      currentParams: {
        name: null,
        type: null,
        icon: null,
        config: []
      },
      chart: {
        rainRadio: 0,
        data: [],
        config: null,
        key: generateUUID()
      },
      query: {},
      rapid_time_value: [],
      rapid_time_list: [
        {
          name: "最近一周",
          value: [this.getTimes(7), this.getTimes(0)]
        },
        {
          name: "最近一个月",
          value: [this.getTimes(30), this.getTimes(0)]
        },
        {
          name: "最近三个月",
          value: [this.getTimes(90), this.getTimes(0)]
        }
      ]
    };
  },
  methods: {
    queryDeviceElement() {
     
      let self = this;
      this.paramsList = [];
      let params = {
        deviceid: this.device.id || this.device.devid || this.device.substionId,
        cusno: this.device.cusno,
        eleType: "0"
      };
      getDeviceElement(params).then(res => {
        var rs2 = res.data;
        if (rs2) {
          var typeArr = [];
          var rs = [];
          if(self.menuData && self.menuData.val=='rain'){
              var rainItemIndex = -1;
              //雨量的话先看雨量
              rs2.forEach((item, index) => {
                if(item.vueType=='rain'){
                  rs.push(item);
                  rainItemIndex=index;
                }
              });
              if(rainItemIndex>=0){
                rs2.splice(rainItemIndex,1);
              }
              rs.push(...rs2);
             
          }
           else  if(self.menuData && self.menuData.val=='water'){
              var rainItemIndex = -1;
              //雨量的话先看雨量
              rs2.forEach((item, index) => {
                if(item.vueType=='water'){
                  rs.push(item);
                  rainItemIndex=index;
                }
              });
              if(rainItemIndex>=0){
                rs2.splice(rainItemIndex,1);
              }
              rs.push(...rs2);
             
          }
          else{
            rs = rs2;
          }
          rs.forEach((item, index) => {
           
          
                if( item.vueType=='video' || item.vueType=='image'){

                }else{
                  var temp = {};
                  var subTemp = [];
                  var flag = false;
                  if (item.config && item.config != "{}") {
                    item.config = JSON.parse(item.config);
                  } else {
                    item.config = null;
                  }
                  if (index == 0) {
                    temp["name"] = item.vueTypeName;
                    temp["type"] = item.vueType;
                    temp["icon"] = item.icon;
                    subTemp.push(item);
                    temp["config"] = subTemp;
                    typeArr.push(temp);
                  } else {
                    typeArr.forEach(d => {
                      if (d.type == item.vueType) {
                        flag = true;
                        d.config.push(item);
                      }
                    });
                    if (!flag) {
                      temp["name"] = item.vueTypeName;
                      temp["type"] = item.vueType;
                      temp["icon"] = item.icon;
                      subTemp.push(item);
                      temp["config"] = subTemp;
                      typeArr.push(temp);
                    }
                  }
            }
          });
          self.paramsList = typeArr;
          self.currentParams = typeArr[0];
        
          self.queryChartInfo();
        }
      });
    },
    /**
     * 获取设备基值
     */
    queryConst() {
      // if (this.device && this.device.cusno) {
      //   if (this.device.icon == "wy") {
      //     this.getChartLFStandardData();
      //   } else {
      //     this.getChartGNSSStandardData();
      //   }
      // }
    },
    // 获取GNSS基准值
    getChartGNSSStandardData(data) {
      let self = this;
      self.contData = {};

      if (!this.device.cusno) {
        return;
      }

      getChartGNSSStandardData({ cusno: this.device.cusno }).then(res => {
        if (res.status == true) {
          let cont = res.data[0];
          if (cont) {
            self.contData = cont;
          }
        }
      });
    },

    // 获取拉线基准值
    getChartLFStandardData() {
      let self = this;
      self.contData = {};

      if (!this.device.cusno) {
        return;
      }
      getChartLFStandardData({ cusno: this.device.cusno }).then(res => {
        if (res.status == true) {
          let cont = res.data[0];
          if (cont) {
            self.contData = cont;
          }
        }
      });
    },
    //查询图表
    queryChartInfo(query) {
      
      Object.assign(this.query, query);
      this.queryChartData();
    },
    // 获取图表数据
    queryChartData() {
      let params = Object.assign({}, this.query);

      params.cusno = this.device.cusno;
      params.displayColumns = ["位移值"];
      params.timeUnit = "hours";
      params.timeVal = '1';
      params.type = '1';
      params.displayColumns=['电池电压','供电电压','信号强度'];
      getDeviceChartData(params).then(res => {
        this.chart.data = res.data ? res.data : [];
        this.chart.key = generateUUID();
      });
     
    },
    getTimes(n) {
      const start = new Date();
      let cont = start.setTime(start.getTime() - 3600 * 1000 * 24 * n);
      let cont2 = this.formateDate(new Date(cont));
      return cont2;
    },
    // 获取n小时后的时间
    getNTime(n) {
      if (n) {
        var newsDate = this.getEightDays();
        var cont, cont2;
        cont = new Date(newsDate).getTime() + n * 60 * 1000 * 60;
        cont2 = new Date(cont);
        return this.formateDate(cont2);
      }
    },
    getEightDays() {
      var time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    // 格式化时间
    formateDate(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let h = time.getHours();
      let min = time.getMinutes();
      let s = time.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return year + "-" + month + "-" + day + " " + h + ":" + min + ":" + s;
    }
  },

  created() {
    
     this.queryConst();
     this.queryDeviceElement();
    
  },
  watch: {
    device: {
      handler(val,oldVal) {
      
        this.device = val;
        if(oldVal  && val && oldVal.cusno==val.cusno){
          
            return
        }
       
        this.queryDeviceElement();
        this.queryConst();
      },
      deep: true
    },
    "chart.rainRadio": function(newV) {
      this.queryChartData();
    },
    rapid_time_value(val) {
      this.query.etm = val[1];
      this.query.stm = val[0];
      this.queryChartData();
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
@import "~@/styles/variables.scss";

.site-monitoring {
  display: flex;
  width:100%;
  height: 100%;
  flex-direction: column;
  box-shadow: 0px 0px 3px 0px rgba(135, 114, 233, 0.16);
  .tab-search {
    padding: 0 0.3rem;
  }
  .tab-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
    padding: 0rem 0.24rem 0;
    margin-bottom: 0.15rem;
    .header-i {
      color: #303133;
      margin-right: 0.4rem;
      height: 30px;
      padding: 0 4px;
      font-family: SourceHanSansCN-Regular;
      cursor: pointer;
      position: relative;
    }
    .header-i.active {
      color: $defaultColor;
    }
    .header-i.active::before {
      content: "";
      height: 2px;
      width: 100%;
      background-color: $defaultColor;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .header-i.active::after {
      content: "";
      width: 0;
      height: 0;
      border: 4px solid;
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      border-color: transparent transparent $defaultColor;
    }
  }
  .tab-chart {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    //min-height: 460px;
    max-height: 520px;
    height: 5.2rem;
    padding-bottom: 20px;
    .tab-chart-switch {
      position: absolute;
      left: 0.24rem;
      top: -50px;
      z-index: 999;
     
    }
    h4 {
      opacity: 0;
    }
  }
  .el-radio-group {
    .el-radio-button__inner {
      background: #fff;
      border: none;
      color: #000;
      box-shadow: none;
    }
    .is-active {
      .el-radio-button__inner {
        background: #fff;
        border: none;
        color: #007cfa;
        box-shadow: none;
      }
    }
  }
}
</style>
