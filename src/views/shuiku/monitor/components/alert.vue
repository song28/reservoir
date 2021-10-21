<!--
 * @Descripttion: 预警
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-08-23 15:06:50
 * @LastEditTime: 2021-10-15 21:31:39
-->
<template>
  <!-- 预警 -->
  <div class="menu-content-yj">
    <div class="search">
      <div class="div-title">
        <div class="title_name">
          <i />
          <div class="pointHiddenTitle">预警总览</div>
        </div>
      </div>
      <p style="margin-left:12px">
        {{ $store.state.user.addvnm }}共产生
        <span
          class="num"
          style="text-decoration: underline;cursor:pointer;text-align:left;      color: red;
 "
          @click="dumpNum('all')"
        >{{ total }}</span>条预警
      </p>
      <el-row>
        <el-col :span="8" @click.native="dumpNum(12)">
          <span class="desc">入侵报警</span>
          <span
            class="num"
            style="color:red;text-decoration: underline;cursor:pointer "
          >{{ mapNum.one || '0' }}</span>
        </el-col>
        <el-col :span="8" @click.native="dumpNum(0)">
          <span class="desc">雨量报警</span>
          <span
            class="num"
            style="color:red;text-decoration: underline;cursor:pointer "
          >{{ mapNum.two || '0' }}</span>
        </el-col>
        <el-col :span="8" @click.native="dumpNum(3)">
          <span class="desc">水位报警</span>
          <span
            class="num"
            style="color:red;text-decoration: underline;cursor:pointer "
          >{{ mapNum.three || '0' }}</span>
        </el-col>
      </el-row>
      <hr style="border:1px solid #edf3f9;margin:0.1rem">
      <el-form ref="form" :model="form" label-width="0.8rem">
        <el-form-item label="预警时间">
          <el-col :span="24">
            <el-date-picker
              v-model="timevalue1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="水库列表">
          <el-row style="line-height: 38px;text-align:left;margin-left:2px">
            <el-col :span="20">
              <el-select
                v-model="value"
                filterable
                remote
                clearable
                size="mini"
                reserve-keyword
                :remote-method="remoteMethod"
                placeholder="请输入水库列表名称"
                :loading="loading"
                @change="changeSearchSkData"
                @focus="focusSkData"
              >
                <el-option v-for="item in options" :key="item.rscd" :label="item.rsnm" :value="item" />
              </el-select>
            </el-col>
            <el-col :span="4" style="text-align:right">
              <el-button
                icon="el-icon-search"
                type="skbtn"
                plain
                size="mini"
                @click="clickSearch"
              />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="fill" />
    <!-- 水库列表 -->
    <ul v-infinite-scroll="load" class="ponit-list">
      <template v-if="list.length">
           <div class="title_name">
          <i />
          <div class="pointHiddenTitle">{{alertType}}</div>
        </div>
       <!-- <span class="yjtyle"> {{ alertType }}</span> -->
        <li
          v-for="(item, index) in list"
          :key="index"
          class="point-list-item"
          @click="positionMap(item)"
        >
          <div class="hearder-title">
            {{ item.rsname==(null || "")?'暂无水库名称':item.rsname }}
            <template v-if="item.warnTypeName!=null">
              -  <span style="color:red">{{ item.warnTypeName[0] }}</span>
            </template>
          </div>
          <div class="ponit-location">
            <div class="lable1">
              <span class="label-title"> 预警时间</span>：{{ item.createtime }}
              <br>
            <!-- <template v-if="item.warnType == 0">
              <span class="label-title">预警描述</span>
              ： {{ item.name }}已预警截止[{{ item.createtime }}]当前库水位
              <span class="number">{{ item.swstatusval == null ? "--" : item.swstatusval }}</span>
              超汛限水位
              <span class="number">{{ item.xcstatus }}</span>m,立刻转移！
            </template>
            <template v-if="item.warnType == 2">
              <span class="label-title">预警描述</span>
              ： {{ item.name }}已预警截止[{{ item.createtime }}]当前库水位
              <span class="number">{{ item.swstatusval == null ? "--" : item.swstatusval }}</span>
              超汛限水位
              <span class="number">{{ item.xcstatus }}</span>m,立刻转移！
            </template>
            <template v-if="item.warnType == 3">
              <span class="label-title">预警描述</span>
              ： {{ item.name }}已预警截止[{{ item.createtime }}]当前库水位
              <span class="number">{{ item.swstatusval == null ? "--" : item.swstatusval }}</span>
              超汛限水位
              <span class="number">{{ item.xcstatus }}</span>m,立刻转移！
            </template> -->
            </div>
          </div>
          <div v-if="item.deviceId!=null">
            <el-image :src="item.deviceId" /></div>
          <div v-else>
            <div style="display:flex;width:100%;justify-content: center;">
              <img
                :src="require('@/assets/images/sk/noNR.png')"
                style="height:200px;text-align:center;margin-top:0.5rem"
              >
            </div>
          </div>
          <div
            style="text-align:right;width:100%;position:relative;height:20px;color:#29958b;font-weight:bold; cursor: pointer;"
          >
            <div style="text-align:right;width:110px;right:0px;position:absolute">
            <!-- <div style="float:left" @click.stop="look(item,1)">查看</div>
            <div @click.stop="look(item,2)">发短信>></div> -->
            </div>
          </div>
          <hr style="border:1px solid #edf3f9">
        </li>
      </template>
      <template v-else>
        <div style="display:flex;width:100%;justify-content: center;">
          <img
            :src="require('@/assets/images/sk/noNR.png')"
            style="height:200px;text-align:center;margin-top:1.5rem"
          >
        </div>
      </template>
    </ul>
    <Dialog
      v-if="dialogVisible"
      :common-data="commonData"
      :tab-name="tabName"
      @closeDialogMap="closeDialog"
    />
  </div>
</template>
<script>
import '@/assets/css/dz-iconfont.css'
import Dialog from '@/views/shuiku/components/Dialog'

import {
  group,
  warnList
} from '../api.js'
import {
  vagueWordFindRsnmList
} from '../api'
import {deviceJsonData} from '@/views/shuiku/warningManagement/apiConfig'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      count: 1,
      warnType: '',
      alertType: '所有报警',
      commonData: {data: null},
      dialogVisible: false,
      tabName: 'third',
      page: 0,
      size: 4,
      loading: false,
      total: 0,
      src: '',
      timevalue1: [this.getTimes(30 * 24), this.getTimes(0)], //
      list: [],
      oldList: [],
      form: {
        name: ''
      },
      options: [],
      value: '', // 水库列表
      mapNum: {}
    }
  },
  computed: {
    countTimer() {
      return this.$store.state.countTimer
    }
  },

  watch: {
    countTimer: {
      handler(newV, oldV) {
        // console.log(newV, '监听到的state值')
      }
    }
  },

  mounted() {
    this.page = 1
    this.getWarnList()
    this.alertNum()
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false
    },
    dumpDetail(data) {
      console.log(data, '详情页面')
    },
    // 分页加载预警列表
    load() {
      this.page++
      this.getWarnList()
    },
    // 预警统计数量
    async alertNum() {
      let num = 0
      const pam = {
        data: {
          addvcd: this.$store.state.user.addvcd
        }
      }
      const {data, status} = await group(pam)
      if (status) {
        // console.log(data, '统计数量')
        this.mapNum = {}
        data.forEach((item, i, a) => {
          num = num + Number(item.count)
          if (item.warn_type == 8) {
            this.mapNum.three = item.count
          } else if (item.warn_type == 1) {
            this.mapNum.two = item.count
          } else if (item.warn_type == 4096) {
            this.mapNum.one = item.count
          }
        })
      } else {
        this.options = []
      }
    },
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
    },
    changeSearchSkData(data) {
      this.skWord = data.rsnm
    },
    focusSkData(data) {
      this.options = []
    },
    // 模糊搜索水库列表值
    async remoteMethod(query) {
      console.log(query, 'query')
      if (query !== '') {
        this.loading = true
        const pam = {
          addvcd: this.$store.state.user.addvcd,
          word: query
        }
        const {obj, status} = await vagueWordFindRsnmList(pam)
        if (status == 200) {
          this.loading = false
          console.log(obj, '模糊查询')
          this.options = obj
        } else {
          this.options = []
        }
      } else {
        this.options = []
      }
    },
    // 点击搜索按钮
    clickSearch() {
      this.page = 1
      this.size = 4
      this.getWarnList()
    },
    // 查询预警列表
    async getWarnList() {
      if (this.page == 1) {
        this.list = []
      }
      const pam = {
        pageNo: this.page, // "int //页数",
        pageSize: this.size, // "int //每页数目",
        // total: "int //总数",
        data: {
          warnType: this.warnType,
          addvcd: this.$store.state.user.addvcd,
          rsname: this.skWord,
          startTime: this.timevalue1[0],
          endTime: this.timevalue1[1]
        }
      }
      const {status, data, total} = await warnList(pam)
      if (status) {
        if (this.count == 1) {
          this.total = total
        }
        this.count++
        data.forEach((item, i, a) => {
          item.equipmentTypes = []
          item.equipmentTypesVals = []
          // item.warnType = '8';
          // item.warnTypeName="000"
          if (item.warnType) {
            item.arr = BigInt(item.warnType).toString(2).split('').reverse()
            item.arr.forEach((ite, i) => {
              if (ite == 1) {
                item.equipmentTypes.push(deviceJsonData[i]) // 设备标识value list
                item.equipmentTypesVals.push(i.toString()) // 设备标识name list
              }
            })
            item.tagarr = item.equipmentTypesVals
            item.warnTypeName = item.equipmentTypes
          }
        })
        this.list = [...this.list, ...data]
      }
    },
    // 查看，发短信
    look(data, type) {
      console.log(data, type, '发短信')
    },
    // 定位水库
    positionMap(item) {
      if (item.rsnm == '' || item.rsnm == null) {
        item.rsnm = '水库详情'
        item.name = '水库详情'
      }
      this.commonData.data = item
      this.dialogVisible = true
    },
    // 跟据点击统计数量来过滤报警
    dumpNum(data) {
      console.log(data, 'dddddddd')
      this.warnType = data
      if (data == 12) {
        this.alertType = '入侵报警'
      } else if (data == 0) {
        this.alertType = '雨量报警'
      } else if (data == 3) {
        this.alertType = '水位报警'
      } else {
        this.warnType = ''
        this.alertType = '所有报警'
      }
      this.page = 1
      this.getWarnList()
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" >
.container .map-right .right-content {
 background: #edf3f9;
}
.el-form {
 .el-date-editor.el-date-editor--datetimerange,
 .el-date-editor.el-range-editor {
  max-width: 300px !important;
 }
}
</style>
<style  lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.el-tooltip__popper.is-light {
 background: #f6f6f6 !important;
 border: 1px solid #5cd1c5;
}
.red .iconguanzhu1 {
 color: rgb(46, 226, 40);
 position: absolute;
 right: 19px;
}
.iconguanzhu1 {
 //   color: red;
 position: absolute;
 right: 19px;
}

$blue: #606266;
.menu-content-yj {
 >>> .el-col-12 {
  height: auto !important;
 }
 background: #ffffff;
 width: 100%;
 height: 100%;
 .num {
  text-align: center;
  color: #29958b;
  font-size: 28px;
  font-weight: bold;
 }
 .desc {
  text-align: center;
  color: #333333;
 }
 // display: flex;
 flex-direction: column;
 .detail {
  position: absolute;
  width: 96%;
  background: #ffffff;
  margin-left: 2%;
  margin-top: 5px;
  height: calc(100% - 3.2rem);
  overflow: auto;
  color: #5f6165;
  .hearder-title {
   color: #2f3133;
   font-size: 16px;
   font-weight: bold;
   margin-bottom: 0.05rem;
   width: calc(100% - 0.6rem);
   // overflow: hidden;
   overflow: auto;

   white-space: nowrap;
   text-overflow: ellipsis;
   font-weight: bold;
  }
  .title {
   margin: 10px 0px;
   font-size: 14px;
   color: #000;
   font-weight: 700;
  }
 }
 .fill {
  height: 6px;
  width: 100%;
  background: #edf3f9;
 }
 ul {
  list-style: none;
 }
 .fill {
  height: 6px;
  width: 100%;
  background: #edf3f9;
 }
 .title_name {
   color: #29958b;
   font-size: 16px;
   display: flex;
   align-items: center;
   font-weight: bold;
  }
  .title_name i {
   width: 3px;
   height: 0.14rem;
   background: #29958b;
   margin-right: 4px;
  }
  .pointHiddenTitle {
   font-size: 16px;
  }
 .search {
  width: 96%;
  margin: 0 auto;
  height: 2.2rem;
  background: #ffffff;
  
  .el-form {
   margin-top: 6px;
  }
  .el-form-item__label {
   //form表单的label
   line-height: 32px !important;
  }
  .el-form-item__content {
   //form表单的contant
   line-height: 32px !important;
  }
  .el-form .el-form-item {
   margin-bottom: 0.02rem !important;
  }
  .el-form .el-form-item:not(.is-required) .el-form-item__label {
   text-indent: 0px !important;
  }
  .el-input--small .el-input__inner {
   //input框的样式
   border: 1px solid #d9e3ef;
   height: 28px !important;
   line-height: 28px !important;
   background: #f6f6f6;
  }

  // 分类样式
  .type-box {
   margin-top: 5px;
   margin-left: 80px;
   height: 30px;
   // padding-left: 10px;
   color: #606266;
   .active {
    color: $blue;
   }
   span {
    margin-right: 10px;
   }
   cursor: pointer;
  }
 }

 // 隐患点类列表
 .ponit-list {
  position: absolute;
  width: 96%;
  background: #ffffff;
  margin-left: 2%;
  margin-top: 5px;
  height: calc(100% - 2.9rem);
  overflow: auto;
  color: #5f6165;
  .yjtyle{
    color:#29958b;
    color: 0.2rem;
    font-weight: bold;;
  }
  .addvnm {
   font-weight: bold;
   color: #2f3133;
  }
  .addvnm-left {
   font-size: 20px;
   font-weight: bold;
   text-align: left;
  }
  .addvnm-right {
   text-align: right;
  }
  .sjtotal {
   text-decoration: underline;
   color: #29958b;
   font-size: 0.18rem;
   font-weight: bold;
  }
  .point-list-item {
    cursor: pointer;
   margin-top: 4px;
   width: 100% span {
    font-size: 16px;
    color: rgb(148, 136, 136);
    font-weight: normal;
   }
   .hearder-title {
    color: #2f3133;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.05rem;
    width: calc(100% - 0.6rem);
    overflow: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
   }
   .ponit-location {
    display: flex;
    font-size: 16px;
    font-weight: normal;
    .number {
     color: rgb(255, 0, 0);
     font-weight: bold;
    }
    .lable1 {
     width: 100%;
     .label-title {
      color: #29958b;
      font-weight: bold;
     }
    }
   }
   .collect {
   }
  }
 }

 .search-btn {
  margin-left: 4.1%;
 }
 .tbChart {
  width: 100%;
  height: 3rem;
 }
}
</style>
