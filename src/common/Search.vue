<template>
  <div class="app-search">

     <!-- <el-date-picker
      v-model="query.stm"
      size="mini"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker> 至 
    <el-date-picker
      v-model="query.etm"
      size="mini"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker> -->
    <el-date-picker
      v-model="query.date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      format="yyyy-MM-dd HH:mm:ss"
      size="mini"
      align="right">
    </el-date-picker>
    <el-button type="primary" @click="queryInfo" size="mini" class="ml-2">查询</el-button>
    <el-button v-if="callImg" type="primary" @click="callImage" size="mini" class="ml-2">图片召测</el-button>
  </div>
</template>

<script>
  import {parseTime} from '@/utils'

  let nowTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
  let lastTime = parseTime(new Date().getTime() - 24 * 60 * 60 * 1000, '{y}-{m}-{d} {h}:{i}:{s}') //近24小时
  export default {
    props: ['params','kjData','callImg'],
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '实时',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              // this.stm = start
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
              // this.stm = start
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
              // this.stm = start
            }
          },
            {
              text: '最近半年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit('pick', [start, end]);
                // this.stm = start
              }
            }]
        },
        query: {
          type: 1,
          date: [lastTime, nowTime],
          stm: lastTime,
          etm: nowTime,
          timeUnit: 'hours',// 0:分钟  1:小时 2:日  3：月  4：年
          timeVal: 1,// 大于1 就是分钟
        }
      }
    },
    methods: {
      queryInfo() {
        if (!this.query.date.length || this.query.date == null) {
          this.query.stm = lastTime
          this.query.etm = nowTime
        } else {
          this.query.stm = this.query.date[0]
          this.query.etm = this.query.date[1]
        }

        this.$emit('on-query', this.query)
      },
       callImage() {
       
        this.$emit('on-callImage')
      }
    },
    created(){
      this.queryInfo()
    },
    watch: {
      params(newV) {
        if (newV&& newV.name) {
          this.queryInfo()
        }
      },
      kjData(newTime){
        this.$set(this.query,'date',newTime);
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
  .app-search {
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .el-radio-button--small .el-radio-button__inner {
      padding: 0.1rem 0.26rem;
    }
    .radio-group-time {
      /*margin-left: auto;*/
      .el-radio {
        margin-right: 0.15rem;
      }
    }
  }
</style>
