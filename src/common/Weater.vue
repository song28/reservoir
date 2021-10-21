<template>
  <div class="app-weater-container">
    <span>{{currentCity}}</span>
    <span>{{currentWeater[0].dayWeather}} </span>
    <span>{{currentWeater[0].dayTemp}}-{{currentWeater[0].nightTemp}}°  </span>
    <span> {{currentWeater[0].dayWindDir}}风{{currentWeater[0].dayWindPower}}级   </span>
    <span> {{nowDate.replace(/-/g,'/')}} </span>
    <!--<span> {{nowWeek}}  </span>-->
    <!--<span> {{nowTime}}</span>-->
  </div>
</template>

<script>
  import {formatDate} from '@/utils/time'
  import {lazyAMapApiLoaderInstance} from "vue-amap";

  export default {
    props: ['addvnm'],
    data() {
      return {
        currentWeater: [
          {
            dayWeather: "晴",
            nightTemp: "0",
            dayTemp: "0",
            dayWindDir: '东',
            dayWindPower: '0'
          }
        ],
        currentCity: null,
        nowDate: '2020-02-02',
        nowTime: '02:02:02',
        nowWeek: '周一',
      }
    },
    methods: {
      queryWeater(addvnm) {
        let self = this;
        setTimeout(function () {
          if (typeof AMap != "undefined") {
            lazyAMapApiLoaderInstance.load().then(() => {
              var weather = new AMap.Weather();
              weather.getForecast(addvnm, function (err, data) {
                self.currentWeater = data.forecasts;
                self.currentCity = data.city
              });
            });
          } else {
            self.queryWeater()
          }
        }, 500);
      },
      getTime() {
        let self = this
        this.nowWeek = "周" + "日一二三四五六".charAt(new Date().getDay());
        setInterval(() => {
          const date = new Date()
          self.nowDate = formatDate(date, '{y}-{m}-{d}')
          self.nowTime = formatDate(date, '{h}:{i}:{s}')
        }, 1000)
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getTime()
        //this.queryWeater("九江市")
      })
    },
    watch: {
      addvnm(newV, oldV) {
        if (newV != oldV) {
          this.queryWeater(newV)
        }
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss" type="text/scss">
  @import "~@/styles/variables.scss";

  .app-weater-container {
    padding: 8px 22px;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #fff;
      font-weight: bold;
      margin-right: 10px;
    }
    span:last-child {
      margin-right: 0;
    }

  }
</style>
