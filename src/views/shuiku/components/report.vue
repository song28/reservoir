<!--
 * @Descripttion: 上报数据
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-24 18:24:12
 * @LastEditTime: 2021-09-24 17:01:03
-->
<template>
  <div class="report">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="上报事件记录" name="first" />
      <el-tab-pane label="上报险情记录" name="second" />
    </el-tabs>
    <div class="query">
      <el-row style="width:600px">
        <el-col :span="4">
          <p style="line-height:30px;text-align:right">上报时间&nbsp;&nbsp;</p>
        </el-col>
        <el-col :span="18">
          <el-date-picker
            v-model="patrolTime"
            size="mini"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-col>
        <el-col :span="2">
          <el-button
            type="skbtn"
            icon="el-icon-edit-outline"
            plain
            size="mini"
            @click.stop="query('edit')"
          >查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="con">
      <div
        v-infinite-scroll="load"
        class="Vcon"
      >
        <template v-if="reportList.length">
          <div v-for="(item,index) in reportList" :key="index" class="Lcon">
            <div class="time">{{ item.createTime }}</div>
            <div class="timeCon">
              <el-row style="width:800px">
                <el-col :span="8">
                  <p style="line-height:20px;text-align:left">
                    <span style="font-weight:bold">上报人</span>：{{ item.name }}&nbsp;&nbsp;
                  </p>
                </el-col>
                <el-col :span="8">
                  <p style="line-height:20px;text-align:left">
                    <span v-if="item.implementType==9" style="font-weight:bold">险情类型：污染</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==10" style="font-weight:bold">险情类型：裂缝</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==11" style="font-weight:bold">险情类型：坡面损坏</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==12" style="font-weight:bold">险情类型：植物滋生</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==13" style="font-weight:bold">险情类型：渗漏水</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==14" style="font-weight:bold">险情类型：兽洞、蚁穴</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==15" style="font-weight:bold">险情类型：闸门变形锈蚀</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==16" style="font-weight:bold">险情类型：牌匾破坏</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==17" style="font-weight:bold">险情类型：水面无垃圾</span>&nbsp;&nbsp;
                    <span v-if="item.implementType==18" style="font-weight:bold">险情类型：其他</span>&nbsp;&nbsp;
                  </p>
                </el-col>
                <el-col :span="8">
                  <p style="line-height:20px;text-align:left">
                    <span style="font-weight:bold">上报时间</span>：{{ item.createTime }}&nbsp;&nbsp;
                  </p>
                </el-col>
              </el-row>
              <br>
              <el-row>
                <el-col :span="24">
                  <p style="line-height:20px;text-align:left">
                    <span style="font-weight:bold">险情描述</span>：{{ item.desc }}&nbsp;&nbsp;
                  </p>
                </el-col>
              </el-row>
              <div class="imags">
                <div v-for="(item,index) in item.imgs " :key="index" class="img">
                  <el-image
                    style="width: 100%; height: 100%"
                    fit="cover"
                    :src="item.url"
                    :preview-src-list="[item.url]"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div style="display:flex;width:100%;justify-content: center;">
            <img
              :src="require('@/assets/images/sk/noNR.png')"
              style="height:200px;text-align:center;margin-top:1.5rem"
            >          
          </div>
        </template>
      </div>

    </div>

  </div>
</template>
<script>
import {
  getPatrolListByRscd
} from './api'

import {
  previewUrl
} from '@/api/base'
export default {
  components: {},
  props: ['commonData'],
  data() {
    return {
      page: 1,
      size: 2,
      recordtype: 4,
      activeName: 'first',
      rscd: '',
      reportList: [1, 2, 3, 4],
      videoList: [1, 2, 3, 4, 5, 6, 7],
      patrolTime: [this.getTimes(10 * 24), this.getTimes(0)]
    }
  },
  watch: {
    commonData: {
      handler: async function(newV, oldV) {
        console.log('智能感知', newV)
        this.rscd = newV.data.rscd
        this.getList()
      },
      immediate: true
    },
    editorType: {
      handler(newV, oldV) {},
      immediate: true
    }
  },
  mounted() {
  // this.getData()
  },
  methods: {
    load() {
      this.page++
      this.getList()
    },
    handleClick(data) {
      this.page = 1
      if (data.name == 'first') {
        this.recordtype = 4
      } else {
        this.recordtype = 5
      }
      this.getList()
      console.log(data, '上报数据===')
    },
    query() {
      this.page = 1
      this.getList()
    },
    // 工情项目编码 01=表面垂直位移，02=表面水平位移，05=渗流压力，11=环境量
    async getList() {
      if (this.page == 1) {
        this.reportList = []
      }
      const pam = {
        addvcd: this.$store.state.user.addvcd,
        etm: this.patrolTime[1],
        page: this.page,
        recordtype: this.recordtype,
        rscd: this.rscd,
        size: this.size,
        stm: this.patrolTime[0]
      }
      const {msg, data, status} = await getPatrolListByRscd(pam)
      if (status == 200) {
        data.forEach((e) => {
          if (e.imgs.length) {
            e.imgs.forEach(e1 => {
              e1.url = previewUrl + e1.imageurl
            })
          }
        })
        this.reportList = [...this.reportList, ...data]

        // this.reportList = data
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 查询水库详情接口
    async getData() {},
    // 格式化时间
    getTimes(n) {
      const start = new Date()
      const cont = start.setTime(start.getTime() - 3600 * 1000 * n)
      const cont2 = this.formateDate(new Date(cont))
      return cont2
    },
    // 格式化时间
    formateDate(time) {
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let h = time.getHours()
      let min = time.getMinutes()
      let s = time.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (h < 10) {
        h = '0' + h
      }
      if (min < 10) {
        min = '0' + min
      }
      if (s < 10) {
        s = '0' + s
      }
      return year + '-' + month + '-' + day + ' ' + h + ':' + min + ':' + s
    }
  }
}
</script>
<style  lang='scss' scoped>
.report {
 display: flex;
 width: 100%;
 height: 100%;
 flex-wrap: wrap;
  >>> .el-tabs__item {
  padding: 0 0px;
  text-align: center;
  height: 0.35rem;
  line-height: 0.35rem;
 }
 .query {
  width: 100%;
  height: 0.4rem;
  color: #000;
  font-weight: bold;
  margin: 0.1rem;
  font-size: 0.2rem;
 }
 .con {
  height: calc(100% - 1.2rem);
  width: 100%;
  overflow: hidden;
  .Vcon{
    position: relative;
  overflow: auto;
  height: 5.6rem;
  width: 100%;
    .Lcon {
   width: 90%;
   margin: 0 auto;
   .time {
    height: 0.2rem;
    margin: 0.1rem 0;
    color: #000;
    font-weight: bold;
   }
   .timeCon {
    margin: 0.1rem 0;
    background: #f5f9fc;
    width: 100%;
    .imags {
     display: flex;
     flex-wrap: wrap;
     .img {
      padding: 0.1rem;
      width: 25%;
     }
    }
   }
  }
  }

 }
}
</style>
