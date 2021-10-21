<template>
  <div class="weather">
    <div class="title">
      <i class="iconfont icondingwei" />
      {{ address }}
      <a
        style="font-size:12px;color:#666666"
        href="http://tianqi.moji.com/weather/china/hunan/liuyang"
        target="_blank"
      >（数据来源：墨迹天气）</a>
    </div>
    <div class="fill" />
    <div class="feature24">
      <div class="title">最新更新时间&nbsp;&nbsp;{{ updatetime }}</div>
      <div class="current">
        <p class="p2">
          {{ temp }}°
        </p>
        <p class="p3">{{ condition }}</p>
        <p class="p4">
          <span>{{ airtitle }}{{ air }}&nbsp;&nbsp;&nbsp;</span>
          风向：{{ windDir }}&nbsp;&nbsp;&nbsp;
          <span>等级：{{ windLevel }}级</span>
        </p>

        <div class="alerttips" />
      </div>
      <div class="title">
        未来24小时降雨量
      </div>
      <div class="charts">
        <div id="chartRain" style="width:100%;height:150px" autoresize />
      </div>
    </div>
    <div class="threeday">
      <div class="title">
        近三天的天气
      </div>
      <div class="threedays">
        <div class="one">
          <p>今天</p>
          <p class="temp">{{ todaytem }}</p>
          <p>{{ todayDaycon }}/{{ todaycon }}</p>
        </div>
        <div class="one">
          <div class="Lone">
            <p>明天</p>
            <p class="temp">{{ tomorrowtem }}</p>
            <p>{{ tomorrowDaycon }}/{{ tomorrowcon }}</p>
          </div>
        </div>
        <div class="one">
          <p>后天</p>
          <p class="temp">{{ aftertomorrowtem }}</p>
          <p>{{ aftertomorrowDaycon }}/{{ aftertomorrowcon }}</p>
        </div>
      </div>
    </div>
    <div class="senvenday">
      <div class="title">
        近七天的天气
      </div>
      <div class="senvenBar">
        <div class="senvendays">
          <div v-for="(item, index) in senvendays" :key="index" class="one">
            <p>{{ item.date }}</p>
            <p>
              <img :src="item.icon" alt>
            </p>
            <p>{{ item.condition }}</p>
          </div>
        </div>
        <div class="tempdayNight">
          <div ref="temchart2" class="temcontainer2" />
        </div>
        <div class="senvennights">
          <div v-for="(item, index2) in senvennights" :key="index2" class="one">
            <p>
              <img :src="item.icon" alt>
            </p>
            <p>{{ item.condition }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {cloudList, getWeatherinfo} from '../api' // 地图设备列表的点，云图雷达
export default {
  components: {},
  props: [],
  data() {
    return {
      updatetime: '',
      airtitle: '空气质量：',
      windDir: '',
      windLevel: '',
      air: '',
      temp: '',
      address: '',
      condition: '',
      pastTime: '',
      currentTime: '',
      todaytem: '',
      tomorrowcon: '',
      todaycon: '',
      todayDaycon: '',
      tomorrowDaycon: '',
      aftertomorrowDaycon: '',
      aftertomorrowcon: '',
      weatherRadar: [],
      weatherCloud: [],
      tomorrowtem: '',
      aftertomorrowtem: '',
      newlineAreaData: {
        lineX: ['00-00', '00-00', '00-00', '00-00', '00-00', '00-00', '00-00'],
        lineY: ['23', '32', '20', '23', '34', '34', '24'],
        lineYNight: ['13', '12', '12', '10', '13', '14', '14']
      },
      senvendays: [
        // {
        //   date: "05.09",
        //   condition: "晴",
        //   icon: require("../../../../assets/weather/W0.png")
        // }
      ], // 七天夜间温度小图标
      senvennights: [
        // {
        //   condition: "多云",
        //   icon: require("../../../../../assets/weather/W20.png")
        // }
      ]
    }
  },
  computed: {
    DistrictLng() {
      return this.$store.state.districtLng
    }
  },
  watch: {
    // 监听穿过来的经纬度
    DistrictLng: {
      handler(newv, oldv) {
        this.getWeather()
      }
    }
  },
  mounted() {
    this.getWeather()
  },
  methods: {
    getWeather() {
      const LngLat = this.DistrictLng
      const that = this
      getWeatherinfo({
        lat: LngLat[1],
        lon: LngLat[0]
      }).then(function(res) {
        const data = res.data
        // that.weatherData = res.data;
        // 24小时天气预报
        const dataInfo = data.forecast24hours.data.hourly
        const time = []
        const rainmm = []
        dataInfo.forEach(function(val) {
          time.push(val.hour + ':00')
          rainmm.push(val.qpf)
        })

        // 降雨雨量
        const info = {
          Ykind: 'single', // Y轴单坐标
          idname: 'chartRain',
          type: ['line'],
          lineColor: ['#29958B'],
          lineLegend: ['降雨量'], // 图例
          Yname: ['降雨量(mm)'], // Y轴纵坐标单位
          dataX: time,
          dataY0: rainmm
        }
        that.draw(info)
        // 注释1 短时预报  对应原来getMJweatherFun接口
        const aqi = data.aqi.data.aqi.value
        // let aqi = response.data.aqi.value;
        if (aqi >= 0 && aqi <= 50) {
          that.air = '优'
        } else if (aqi >= 51 && aqi <= 100) {
          that.air = '良'
        } else if (aqi >= 100) {
          that.air = '污染'
        }
        const citydata = data.condition.data.city

        that.address = citydata.secondaryname + citydata.name
        // let condata = response.data.condition;
        const condata = data.condition.data.condition
        that.temp = condata.temp
        that.condition = condata.condition
        that.windDir = condata.windDir
        that.windLevel = condata.windLevel
        that.updatetime = condata.updatetime
        // console.log("墨迹天气-天气预报15天");
        const data15days = data.forecast15days.data.forecast
        that.todaycon = data15days[1].conditionNight
        that.tomorrowcon = data15days[2].conditionNight
        that.aftertomorrowcon = data15days[3].conditionNight
        that.todayDaycon = data15days[1].conditionDay
        that.tomorrowDaycon = data15days[2].conditionDay
        that.aftertomorrowDaycon = data15days[3].conditionDay
        //       todayDaycon:'',
        // tomorrowDaycon:'',
        // aftertomorrowDaycon:'',
        that.todaytem =
          data15days[1].tempDay + '°/' + data15days[1].tempNight + '°'
        that.tomorrowtem =
          data15days[2].tempDay + '°/' + data15days[2].tempNight + '°'
        that.aftertomorrowtem =
          data15days[3].tempDay + '°/' + data15days[3].tempNight + '°'
        const senvenday = []
        that.senvendays = [] // 七天小图标
        that.senvenTempNights = []
        const senvennight = [] // 七天夜间温度小图标
        const senvenTempDay = [] // 七天白天温度
        const senvenTempNight = [] // 七天夜间温度
        const senvenTempTime = [] // 七天温度时间坐标
        data15days.forEach(function(val, index) {
          if (index > 0 && index < 8) {
            const date = new Date(val.predictDate)
            let day = date.getDay()
            switch (day) {
              case 0:
                day = '周日'
                break
              case 1:
                day = '周一'
                break
              case 2:
                day = '周二'
                break
              case 3:
                day = '周三'
                break
              case 4:
                day = '周四'
                break
              case 5:
                day = '周五'
                break
              case 6:
                day = '周六'
            }
            if (index == 1) {
              day = '今天'
            }
            senvenday.push({
              date: day,
              // date: val.predictDate.substring(5, val.predictDate.length)+"("+day+")",
              condition: val.conditionDay,
              icon: require('../../../../assets/weather/W' +
                val.conditionIdDay +
                '.png')
            })
            senvennight.push({
              condition: val.conditionNight,
              icon: require('../../../../assets/weather/W' +
                val.conditionIdNight +
                '.png')
            })
            // 02-夜间温度
            senvenTempDay.push(val.tempDay)
            senvenTempNight.push(val.tempNight)
            senvenTempTime.push(
              val.predictDate.substring(5, val.predictDate.length)
            )
          }
        })
        that.senvendays = senvenday
        that.senvennights = senvennight
        that.newlineAreaData.lineY = senvenTempDay
        that.newlineAreaData.lineYNight = senvenTempNight
        that.newlineAreaData.lineX = senvenTempTime
        that.drawarea()
      })
    },
    draw(infoConfig) {
      const myChart = this.$echarts.init(
        document.getElementById(infoConfig.idname)
      )
      const this_ = this
      let option = {}
      if (infoConfig.Ykind == 'double') {
        option = {
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0.1,
                lineStyle: {
                  type: 'solid',
                  color: '#E9ECEE' // 网格颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#666666', // xy字体颜色
                  width: 0
                }
              },
              data: infoConfig.dataX
            }
          ],
          yAxis: [
            {
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0,
                lineStyle: {
                  type: 'solid',
                  color: '#E9ECEE' // 网格颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#666666', // y 0 刻度样式
                  width: 0
                }
              },
              type: 'value',
              name: '降雨量(mm)',
              min: 0,
              max: 50,
              interval: 10
            },
            {
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                width: 0,
                lineStyle: {
                  type: 'solid',
                  color: '#E9ECEE'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#666666',
                  width: 0
                }
              },
              type: 'value',
              name: '累计雨量(mm)',
              min: 0,
              max: 500,
              interval: 100
            }
          ],
          series: [
            // {
            //   name: "时段降水量",
            //   type: "bar",
            //   barWidth: 16,
            //   color: "#2486FF",
            //   data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2]
            // },
            {
              name: infoConfig.lineLegend[0], // 与图例必须保持一致
              type: infoConfig.type[0],
              barWidth: 3,
              color: infoConfig.lineColor[0],
              data: infoConfig.dataY0
            },
            {
              symbol: 'circle', // 不添加空心点,添加后为实心点，拐点样式
              name: infoConfig.lineLegend[1],
              type: infoConfig.type[1],
              yAxisIndex: 1, // //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              color: infoConfig.lineColor[1],
              data: infoConfig.dataY1
            }
          ]
        }
      } else if (infoConfig.Ykind == 'single') {
        option = {
          xAxis: {
            type: 'category',
            data: infoConfig.dataX,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: 'solid',
                color: 'rgba(255,255,255,0.2)'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#666666',
                width: 0
              }
            }
          },
          yAxis: {
            type: 'value',
            name: infoConfig.Yname[0],
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              width: 0.5,
              lineStyle: {
                type: 'solid',
                color: '#EEEEEE'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#666666',
                width: 0
              }
            }
          }
        }
        option.series = []
        if (infoConfig.type.length > 0) {
          infoConfig.type.forEach((val, index, arr) => {
            option.series.push({
              name: infoConfig.lineLegend[index], // 与图例必须保持一致
              type: infoConfig.type[index],
              barWidth: 16,
              color: infoConfig.lineColor[index],
              data: infoConfig['dataY' + index],

              symbol: 'circle' // 不添加空心点,添加后为实心点，拐点样式
            })
          })
        }
        // option.series = [
        //   {
        //     name: infoConfig.lineLegend[0], //与图例必须保持一致
        //     type: infoConfig.type[0],
        //     barWidth: 16,
        //     color: infoConfig.lineColor[0],
        //     data: infoConfig.dataY0
        //   },
        //   {
        //     name: infoConfig.lineLegend[1],
        //     type: infoConfig.type[1],
        //     // yAxisIndex: 1, // //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
        //     color: infoConfig.lineColor[1],
        //     data: infoConfig.dataY1
        //   },
        //   {
        //     name: infoConfig.lineLegend[2],
        //     type: infoConfig.type[2],
        //     color: infoConfig.lineColor[2],
        //     data: infoConfig.dataY2
        //   }
        // ];
      }
      // 共有样式
      option.tooltip = {
      }
      option.grid = {
        show: true,
        top: '22%',
        left: '3%', // 图表距边框的距离
        right: '3%',
        bottom: '10%',
        containLabel: true,
        backgroundColor: '#F5F9FC'
      }

      option.legend = {
        data: infoConfig.lineLegend,
        orient: 'horizontal',
        x: 'center',
        y: 'top',
        textStyle: {
          // 图例文字的样式
          color: '#666666',
          fontSize: 10
        },
        itemWidth: 15,
        itemHeight: 10,
        selected: {
          XΔ: true,
          YΔ: true,
          HΔ: true,
          '2D': false,
          '3D': true,
          位移值: true,
          监测值: true,
          初始值: true
        }
      }
      myChart.setOption(option, true)
      myChart.resize()
    },

    drawarea: function() {
      this.myChart2 = this.$echarts.init(this.$refs.temchart2)
      var this_ = this
      var option = {
        grid: {
          top: '20%',
          left: '-2.5%', // 图表距边框的距离
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        // x轴信息样式
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function() {
              return ''
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e9f7ff',
              width: 0
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          // inverse: true,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function() {
              return ''
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e9f7ff',
              width: 0
            }
          }
        },
        series: [
          {
            type: 'bar',
            stack: '总量',
            color: 'rgba(67, 191, 238, 0.7)',
            smooth: true,
            barWidth: 12,

            // symbol: "square",
            symbolSize: 8,
            areaStyle: {normal: {}},
            // data: [100, 80, 70, 65, 50, 25, 10],
            data: this_.newlineAreaData.lineYNight,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10],

                color: 'rgba(67, 191, 238, 0.4)',
                // color:'#28afda',
                borderColor: 'rgba(67, 191, 238, 0.1)'
              }
            },
            // label:"°",
            label: {
              normal: {
                show: true,
                position: 'insideTop',
                formatter: '{c}℃'
              }
            }
          },
          {
            type: 'bar',
            barWidth: 12,
            stack: '总量',
            smooth: true,
            symbolSize: 8,
            areaStyle: {normal: {}},
            // color: ["#52d2dd"], //对应上面data的背景色
            // data: [100, 80, 70, 65, 50, 25, 10],
            data: this_.newlineAreaData.lineY,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10],

                color: '#fff',
                // color:'#28afda',
                borderColor: '#fff'
              }
            },
            label: {
              // 显示转折点数据
              normal: {
                show: true,
                position: 'top',
                formatter: '{c}℃'
              }
            }
          }
        ]
      }
      this.myChart2.setOption(option)
    },
    queryTime(day) {
      // 过去-今天
      const pastTime = this.$moment()
        .subtract(day, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      const currentTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      this.pastTime = pastTime
      this.currentTime = currentTime
      return [pastTime, currentTime]
    },

    getCloudList() {
      const that = this
      // 1：雷达图 2：水汽云图
      cloudList({
        stm: this.pastTime,
        end: this.currentTime,
        cid: 1
      }).then(function(res) {
        res.data.forEach(element => {
          that.weatherRadar.push({
            time: element.tm,
            imgbase:
              'http://116.52.166.246:9920/weather/cloud/image/' + element.id
          })
        })
        that.$emit('weatherRadar', that.weatherRadar)
      })
      cloudList({
        stm: this.pastTime,
        end: this.currentTime,
        cid: 2
      }).then(function(res) {
        res.data.forEach(element => {
          that.weatherCloud.push({
            time: element.tm,
            imgbase:
              'http://116.52.166.246:9920/weather/cloud/image/' + element.id
          })
          //  cloudListImg("", element.id).then(function(response) {
          // });
        })
        that.$emit('weatherCloud', that.weatherCloud)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.weather {
  background: #ffffff;
  width: 100%;
  height: 100%;
  .title {
    height: 47px;
    line-height: 47px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #414447;
    .icondingwei {
      font-size: 18px;
      color: #4d4c49;
      padding-left: 10px;
    }
  }
  .fill {
    height: 6px;
    width: 100%;
    background: #edf3f9;
  }
  .feature24 {
    padding-left: 10px;
    .p1 {
      text-align: center;
      display: block;
      margin: 0;
      padding: 0.1rem;
    }
    .p2 {
      text-align: center;
      display: block;
      margin: 0;
      padding: 0;
      font-size: 0.4rem;
    }
    .p3 {
      text-align: center;
    }
    .p4 {
      text-align: center;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #29958b;
    }
    .charts {
      height: 150px;
      width: 100%;
    }
  }
  .threeday {
    padding-left: 10px;

    .title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #29958b;
    }
    .threedays {
      border-radius: 8px;
      position: relative;
      width: 100%;
      height: 80px;
      background-image: url("../../../../assets/weather/bg/staic/bg0.png");
      background-repeat: no-repeat;
      background-size: cover;
      .one {
        position: relative;
        top: 0.08rem;
        height: 80px;
        width: 33.33333%;
        float: left;
        text-align: center;
        color: #fff;
        .Lone {
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        p {
          font-size: 0.1rem;
        }
        .temp {
          font-size: 0.18rem;
        }
      }
    }
  }

  .senvenday {
    margin-left: 10px;
    color: #fff;
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #29958b;
    }
    .senvenBar {
      height: 3rem;
      background: #29958b;
      text-align: center;
      border-radius: 8px;
      .senvendays {
        top: 0.1rem;
        float: left;
        position: relative;
        width: 100%;
        height: 0.8rem;
        // background: red;
        font-size: 0.1rem;
        .one {
          float: left;
          width: 14.27%;
          height: 100%;
          img {
            width: 0.22rem;
          }
        }
      }
      .tempdayNight {
        clear: both;
        position: relative;
        top: 0.05rem;
        width: 100%;
        margin: 0 auto;
        height: 1.5rem;
        .temcontainer2 {
          width: 100%;
          height: 1.5rem;
        }
      }
      .senvennights {
        float: left;
        position: relative;
        width: 100%;
        top: 0.1rem;
        height: 0.6rem;
        // background: red;
        font-size: 0.1rem;
        .one {
          float: left;
          width: 14.27%;
          height: 100%;
          img {
            width: 0.22rem;
          }
        }
      }
    }
  }
}
</style>
