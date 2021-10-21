<!--
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-29 16:52:53
 * @LastEditTime: 2021-10-14 17:12:53
-->
<template>
  <div v-if="show" class="basic">
    <div class="main">
      <el-row class="basicHeader">
        <el-col :span="24">基础信息</el-col>
      </el-row>
      <div class="baseInfo">
        <template v-for="(item,index) in list">
          <template v-if="index==5 ||index==13 ||index==2 ||index==8">
            <el-row>
              <el-col :span="8">
                <div class="basicCon">
                  <div class="title">{{ item[0].name }}</div>
                  <div class="con">{{ item[0].value }}</div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="basicCon">
                  <div class="titleXZQ">{{ item[1].name }}</div>
                  <div class="conXZQ">{{ item[1].value }}</div>
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row>
              <el-col :span="8">
                <div class="basicCon">
                  <div class="title">{{ item[0].name }}</div>
                  <div class="con">{{ item[0].value }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="basicCon">
                  <div class="title">{{ item[1].name }}</div>
                  <div class="con">{{ item[1].value }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="basicCon">
                  <div class="title">{{ item[2].name }}</div>
                  <div class="con">{{ item[2].value }}</div>
                </div>
              </el-col>
            </el-row>
          </template>
        </template>
      </div>
      <el-row class="basicHeaderCap">
        <el-col :span="24">库容曲线</el-col>
      </el-row>
      <div v-if="chartData.data.x.length">
        <Echarts :chart-data="chartData" />
      </div>
      <div v-else class="cap" style="justify-content: center;">
        <img
          :src="require('@/assets/images/sk/noNR.png')"
          style="height:200px;text-align:center;margin-top:0.6rem"
        >
      </div>
    </div>
  </div>
</template>
<script>
import Echarts from '@/views/shuiku/components/echarts/index'

import {skListSizeTypeOptions, engineeringScaleOptions, skListOpenTypeOptions, skListBarTypeOptions} from '@/views/shuiku/reservoirManagement/apiConfig'

import {rsvrBaseInfoBy} from '@/views/shuiku/components/api'

export default {
  components: {
    Echarts
  },
  props: ['commonData'],
  data() {
    return {
      show: false,
      chartData: {
        specialData: {

        },
        data: {
        },
        height: '4rem',
        width: '100%',
        type: 'cap'
      },
      list: [
      ]
    }
  },
  watch: {
    commonData: {
      handler(newV, oldV) {
        console.log('库容曲线')
        this.getskDetail()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async getskDetail() {
      const {msg, obj, status} = await rsvrBaseInfoBy({
        rscd: this.commonData.data.rscd
      })
      if (status == 200) {
        // 水库规模
        engineeringScaleOptions.forEach((e) => {
          if (e.value == obj.prsc) {
            obj.prscNNN = e.label
          }
        })
        // 坝型
        skListBarTypeOptions.forEach((e) => {
          if (e.value == obj.dmtp) {
            obj.dmtpNNN = e.label
          }
        })
        // 溢洪道
        skListOpenTypeOptions.forEach((e) => {
          if (e.value == obj.crmt) {
            obj.crmtNNN = e.label
          }
        })
        this.list = [
          [
            {name: '水库编码', value: obj.rscd},
            {name: '水库名称', value: obj.rsnm},
            {name: '坝型', value: obj.dmtpNNN}
          ],
          [
            {name: '最大坝高(m)', value: obj.maxdmhg},
            {name: '经度', value: obj.eslg},
            {name: '纬度', value: obj.nrlt}
          ],
          [
            {name: '水库规模', value: obj.prscNNN},
            {name: '管理单位', value: obj.mnun}
          ],
          [
            {name: '控制集雨面积(km²)', value: obj.cnctar},
            {name: '坝顶宽(m)', value: obj.dmcrwd},
            {name: '坝顶轴长(m)', value: obj.dmcrlen}
          ],
          [
            {name: '坝顶高程(m)', value: obj.dmcrel},
            {name: '溢洪道型式', value: obj.crmtNNN},
            {name: '保护耕地(万亩)', value: obj.flcnprfl}
          ],
          [
            {name: '保护人口(人)', value: obj.flcnprpp},
            {name: '行政区', value: obj.vltw}
          ],
          [
            {name: '正常蓄水位(m)', value: obj.nrstlv},
            {name: '设计洪水位(m)', value: obj.dsfllv},
            {name: '校核洪水位(m)', value: obj.chfllv}
          ], [

            {name: '总库容(万m³)', value: obj.ttstcp},
            {name: '死库容(万m³)', value: obj.ddstcp},
            {name: '正常库容(万m³)', value: obj.acstcp}
          ],
          [
            {name: '设计库容(万m³)', value: obj.dsflcp},
            {name: '死水位(m)', value: obj.ddwl}
          ],
          [
            {name: '管理单位责任人', value: obj.gldwzrrname},
            {name: '管理单位责任人电话', value: obj.gldwzrrphone},
            {name: '管理单位责任人职务', value: obj.gldwzrrduty}
          ], [

            {name: '管理单位责任人单位', value: obj.gldwzrrunit},
            {name: '技术责任人', value: obj.jszrrname},
            {name: '技术责任人电话', value: obj.jszrrphone}
          ],
          [
            {name: '技术责任人职务', value: obj.jszrrduty},
            {name: '技术责任人单位', value: obj.jszrrunit},
            {name: '行政责任人', value: obj.xzzrrname}
          ],
          [
            {name: '行政责任人电话', value: obj.xzzrrphone},
            {name: '行政责任人职务', value: obj.jszrrduty},
            {name: '行政责任人单位', value: obj.xzzrrunit}
          ],
          [
            {name: '巡查责任人', value: obj.xczrrname},
            {name: '巡查责任人电话', value: obj.xczrrphone}
          ]
        ]
        const x = []
        const y = []
        let [one, two, three, four] = [null, null, null, null]
        let [oneX, twoX, threeX, fourX] = [null, null, null, null]

        obj.wlcp.forEach((e, i, a) => {
          x.push(e.wl)
          y.push(e.stcp)
          if (e.wl == obj.nrstlv) {
            one = e.stcp
            oneX = e.wl
          } else if (e.wl <= obj.nrstlv) {
            one = e.stcp
            oneX = e.wl
          }
          if (e.wl == obj.dsfllv) {
            two = e.stcp
            twoX = e.wl
          } else if (obj.dsfllv >= e.wl) {
            two = e.stcp
            twoX = e.wl
          }
          if (e.wl == obj.chfllv) {
            three = e.stcp
            threeX = e.wl
          } else if (obj.chfllv >= e.wl) {
            three = e.stcp
            threeX = e.wl
          }
          if (e.wl == obj.mjflsscnwl) {
            four = e.stcp
            fourX = e.wl
          } else if (obj.mjflsscnwl >= e.wl) {
            four = e.stcp
            fourX = e.wl
          }
        })

        this.chartData.data.x = x
        this.chartData.data.y = y
        this.chartData.specialData.zcxsw = oneX == null ? null : oneX.toString()
        this.chartData.specialData.zcxswV = one

        this.chartData.specialData.sjhsw = twoX == null ? null : twoX.toString()
        this.chartData.specialData.sjhswV = two

        this.chartData.specialData.jhhsw = threeX == null ? null : threeX.toString()
        this.chartData.specialData.jhhswV = three

        this.chartData.specialData.xxsw = fourX == null ? null : fourX.toString()
        this.chartData.specialData.xxswV = four

        console.log(this.chartData, '库容曲线')
        this.show = true

        console.log('水库详情', obj)
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.basic {
 width: 95%;
 height: 6.2rem;
 margin-top: 2.5%;
 margin-left: 2.5%;
 overflow: hidden;
 .main {
  width: 100%;
  height: 100%;
  overflow: auto;
  .basicHeader,
  .basicHeaderCap {
   padding-left: 0.1rem;
   width: 100%;
   height: 0.36rem;
   background: #ffffff;
   border-top: 1px solid #dae3f0;
   border-right: 1px solid #dae3f0;
   border-left: 1px solid #dae3f0;
   font-size: 0.16rem;
   font-family: Microsoft YaHei;
   font-weight: bold;
   color: #25867d;
   line-height: 0.36rem;
  }
  .basicHeaderCap {
   border-top: 0px solid #dae3f0;
   border-bottom: 1px solid #dae3f0;
      margin-bottom: 0.3rem;

  }
  .baseInfo {
   border-right: 1px solid #dae3f0;
   border-bottom: 1px solid #dae3f0;
   .basicCon {
    display: flex;
    font-weight: 400;
    color: #303133;
    height: 0.36rem;
    line-height: 0.36rem;
    .titleXZQ {
     padding-left: 0.1rem;
     width: 20%;
     background: #f4fbf5;
     border-top: 1px solid #dae3f0;
     border-left: 0.5px solid #dae3f0;
    }
    .conXZQ {
     padding-left: 0.1rem;
     width: 80%;
     background: #ffffff;
     border-top: 1px solid #dae3f0;
     //  border-right: 0.5px solid #dae3f0;
     border-left: 0.5px solid #dae3f0;
    }
    .title {
     padding-left: 0.1rem;
     width: 40%;
     background: #f4fbf5;
     border-top: 1px solid #dae3f0;
     border-left: 0.5px solid #dae3f0;
    }
    .con {
     padding-left: 0.1rem;
     width: 60%;
     background: #ffffff;
     border-top: 1px solid #dae3f0;
     //  border-right: 0.5px solid #dae3f0;
     border-left: 0.5px solid #dae3f0;
    }
   }
  }
  .cap {
   border-left: 1px solid #dae3f0;
   border-right: 1px solid #dae3f0;
   border-bottom: 1px solid #dae3f0;
   display: flex;
   width: 100%;
   height: 4rem;
  }
 }
}
</style>
