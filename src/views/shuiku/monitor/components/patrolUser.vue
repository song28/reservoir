<template>
  <div class="hp">
    <div class="search">
      <div class="div-title">
        <div class="title_name">
          <i />
          <div class="pointHiddenTitle">今日总览</div>
        </div>
      </div>
    </div>
    <div
      class="tag-group"
      style="margin: 15px 15px; font-size: 20px;color: #606266;"
    >
      <span class="totalTitle">共</span><span
        style="font-size: 26px;color:#303133;cursor: pointer;text-decoration:underline;"
        @click="patrolUsers(0, '')"
      >{{ total }}</span> <span class="totalTitle">人</span><br>
      <span class="totalTitle">已巡查：</span><span
        style="font-size: 26px;color:#1afa29; cursor: pointer;text-decoration:underline"
        @click="patrolUsers(1, '')"
      >{{ yxNum }}</span>人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="totalTitle">未巡查：</span><span
        style="font-size: 26px;color:#f4ea2a;cursor: pointer;text-decoration:underline"
        @click="patrolUsers(2, '')"
      >{{ wxNum }}</span>人<br>
      <span class="totalTitle">未上线：</span><span
        style="font-size: 26px;color:#cacaca;cursor: pointer;text-decoration:underline"
        @click="patrolUsers(3, '')"
      >{{ wsxNum }}</span>人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="totalTitle">多日未巡查：</span><span
        style="font-size: 26px;color:#ff0000;cursor: pointer;text-decoration:underline"
        @click="patrolUsers(4, '')"
      >{{ drwxNum }}</span>人<br>
      <span class="totalTitle"> 未在本市范围内巡查：</span>
      <span
        style="font-size: 26px;color:orange;cursor: pointer;text-decoration:underline"
        @click="patrolUsers(5, '')"
      >
        {{ wzbsfwnNum }}</span>人
    </div>
    <div class="search">
      <div class="div-title">
        <div class="title_name">
          <i />
          <div class="pointHiddenTitle">人员列表</div>
        </div>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="70px" >
      <el-form-item label="姓名">
        <el-col :span="19">
          <el-select
            v-model="value"
            filterable
            clearable
            size="small"
            placeholder="请输入姓名"
            @clear="patrolUsers(0, '')"
          >
            <el-option
              v-for="(item1,index) in options"
              :key="index"
              :label="item1.label"
              :value="item1.value"
            />
          </el-select>
        </el-col>
        <!--        <el-col class="search-btn" :span="4">-->
        <!--          <el-button-->
        <!--            type="primary"-->
        <!--            icon="el-icon-search"-->
        <!--            size="mini"-->
        <!--            @click="queryHp()"-->
        <!--          ></el-button>-->
        <!--        </el-col>-->
      </el-form-item>
    </el-form>
    <div class="fill" />

    <div
      v-if="tableData.length"
      style="height: calc(100% - 3.5rem);width: calc(100% - 10px);padding: 5px; position: absolute;overflow: auto;"
    >
      <div
        v-for="(item2, index2) in tableData"
        :key="index2"
        style="border-bottom: 1px solid #e3e3e3;padding: 15px;color: #606266;font-size: 22px;"
      >
        <span
          style="width: 50%; line-height: 22px;"
        >姓名：<el-link type="success" @click="positionMap(item2, 'user')">{{
          item2.userName
        }}</el-link></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          style="width: 50%; line-height: 22px; "
        >电话：{{ item2.userPhone }}</span><br>
        <span
          style="width: 50%; line-height: 22px; "
        >关联水库：<el-link
          type="success"
          @click="positionMap(item2, 'sk')"
        >{{ item2.reservoirName }}</el-link></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          style="width: 100%; line-height: 22px; "
        >当前距离水库：{{ item2.distance4Sk }}m</span><br>
        <span
          style="width: 70%; line-height: 22px; "
        >今日是否巡查：{{
          item2.todayStatus == "1"
            ? "已巡查"
            : item2.todayStatus == "2"
              ? "" + "未巡查"
              : item2.todayStatus == "3"
                ? "今日未在线"
                : item2.todayStatus == "4" && item2.bz == null
                  ? "多日未巡查"
                  : item2.todayStatus == "4" && item2.bz != null
                    ? "未在本市范围内"
                    : "--"
        }}</span><el-tag
          v-if="item2.ispush == '1'"
          size="mini"
          effect="dark"
          type="danger"
        >已提醒</el-tag><br>
        <span
          style="width: 100%; line-height: 22px; "
        >人员星级：
          <template v-if="item2.mark == null">
            <el-rate
              :v-model="0"
              disabled
              text-color="#ff9900"
              style="display: inline;"
              @change="changeRage"
            />
          </template>
          <template v-else>
            <el-rate
              v-model="item2.mark"
              disabled
              text-color="#ff9900"
              style="display: inline;"
              @change="changeRage"
            />
          </template> </span><br>
        <span
          style="width: 50%; line-height: 24px; "
          class="patrolNum"
        >今日巡查：<el-link
          v-if="item2.todayPatrolNum != '0'"
          type="primary"
          @click="showDetail(JSON.stringify(item2))"
        >{{ item2.todayPatrolNum }}</el-link><span v-if="item2.todayPatrolNum == '0'">{{
          item2.todayPatrolNum
        }}</span>次</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <!--        <span style="width: 50%; line-height: 24px; "  class="patrolNum">今日保洁：<el-link type="primary" @click="showDetail(JSON.stringify(item))"  v-if="item.todayCleanNum !='0'">{{ item.todayCleanNum }}</el-link><span v-if="item.todayCleanNum =='0'">{{ item.todayCleanNum }}</span>次</span><br/>-->
        <!--        <span style="width: 50%; line-height: 22px; ">今日上报险情：{{ item.todayDangerNum }}次</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
        <!--        <span style="width: 50%; line-height: 22px; ">今日上报险情：{{ item.todayEventNum }}次</span><br/>-->
        <!--        <span><i class="el-icon-location-outline"></i><el-link type="primary" @click="positionMap(item)">查看位置</el-link></span>-->
        <el-button
          v-if="!item2.ispush && item2.todayStatus != '1'"
          type="warning"
          size="mini"
          @click="acmpush(item2.userId)"
        >提醒巡查</el-button>
        <!--        <el-button type="warning" size="mini">视频连线</el-button>-->
        <el-button
          v-if="item2.ispush == '1'"
          type="warning"
          size="mini"
          @click="acmpush(item2.userId)"
        >再次提醒</el-button>
        <el-button
          type="skbtn"
          plain
          size="mini"
          icon="el-icon-video-camera"
          @click="openVideo(item2)"
        >视频连线</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {getPerson, pushInfo} from '../api.js'
import {
  videoCall,
  videoKey,
  openVideoWin,
  generatePanoToken
} from '@/api/base'
export default {
  data() {
    return {
      options: [],
      tableData: [],
      form: {
        name: ''
      },
      list: '',
      value: null,
      items: [
        {type: 'success', label: '已巡', color: '#1afa29'},
        {type: 'info', label: '未巡', color: '#f4ea2a'},
        {type: 'danger', label: '离线', color: '#cacaca'},
        {type: 'warning', label: '多日未巡', color: '#ff0000'}
      ],
      total: 0,
      yxNum: 0, // 已巡
      wxNum: 0, // 未巡
      wsxNum: 0, // 未上线
      drwxNum: 0, // 多日未巡,
      wzbsfwnNum: 0, // 未在本市范围内
      patroleUser: [],
      tag: false,
      videoForm: {}
    }
  },
  computed: {
    countTimer() {
      return this.$store.state.countTimer
    }
  },
  watch: {
    value: {
      handler(newV, oldV) {
        this.optionsPatrolUserList('all', newV)
      }
    },
    countTimer: {
      handler(newV, oldV) {
        // this.optionsPatrolUserList(0, '')
      }
    }
  },
  mounted() {
    this.videoForm = videoKey
    this.optionsPatrolUserList(0, '')
  },
  created() {
    // this.patrolUsers(0, '')
  },
  methods: {
    async getToken(userid) {
      const pam = {userid: userid}
      const {status, msg, data} = await generatePanoToken(pam)
      if (status) {
        return data
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    async openVideo(item) {
      this.videoForm.channelId = item.userId
      this.videoForm.userName = this.$store.state.user.name
      this.videoForm.userId = JSON.stringify(this.$store.state.user.userId)
      this.videoForm.token = await this.getToken(this.videoForm.userId)
      window.open(
        openVideoWin + encodeURIComponent(JSON.stringify(this.videoForm))
      )
      const pam = {
        uids: [this.videoForm.channelId], // 邀请对方视频人编码
        title: '视频通话', // 固定
        body: this.videoForm.userName + '邀请您视频通话，点击进入', // 固定
        channelid: this.videoForm.channelId, // 房间号
        username: this.videoForm.userName, // 当前发起视频人姓名
        userid: this.videoForm.userId // 放当前发起视频人编码
      }
      const {status, msg, data} = await videoCall(pam)
      if (status) {
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    acmpush(userId) {
      var obj = new Object()
      obj.uids = [userId]
      obj.title = '巡查提醒'
      obj.body = '您今天还未巡查水库，按时巡查'
      const {msg, data, status} = pushInfo(obj)
    },
    patrolUsers(type) {
      this.value = ''
      this.optionsPatrolUserList(type, '')
    },
    positionMap(item, type) {
      item.type = type
      item.rscd = item.gid

      if (type == 'sk') {
        item.eslg = Number(item.lngSk)
        item.nrlt = Number(item.latSk)
      } else {
        item.eslg = item.lng
        item.nrlt = item.lat
      }
      console.log(item, '定位人员', type)
      // item.rscd = item.gid
      this.$emit('userHpPositin', item)
    },
    changeRage() {
      this.$forceUpdate()
    },
    showDetail(item) {
      item = JSON.parse(item)
      var obj = new Object()
      obj.gid = item.gid
      obj.name = item.reservoirName
      obj.lng = item.lngSk
      obj.lat = item.latSk
      obj.type = 'xc'
      this.$emit('detailNoPositin', obj)
    },
    async optionsPatrolUserList(type, userId) {
      this.options = []
      this.tableData = []
      this.patroleUser = []
      const {msg, data, status} = await getPerson({addvcd: this.$store.state.user.addvcd})
      if (status) {
        this.list = data
        data.forEach(e => {
          this.options.push({
            label: e.userName,
            key: e.userId,
            value: e.userId
          })
          if (type == 5) {
            // 请假未在本市范围内
            if (e.todayStatus == 4 && e.bz != null) {
              e.mark = parseInt(e.mark)
              this.tableData.push(e)
              e.pointRole = 'user'
              this.patroleUser.push(e)
            }
          } else if (type == 4) {
            if (e.todayStatus == 4 && e.bz == null) {
              e.mark = parseInt(e.mark)
              this.tableData.push(e)
              e.pointRole = 'user'
              this.patroleUser.push(e)
            }
          } else if (type == 1 || type == 2 || type == 3) {
            if (e.todayStatus == type) {
              e.mark = parseInt(e.mark)
              this.tableData.push(e)
              e.pointRole = 'user'
              this.patroleUser.push(e)
            }
          } else if (type == 0) {
            if (userId == '' && !this.tag) {
              this.total++
              if (e.todayStatus == 1) {
                this.yxNum++
              } else if (e.todayStatus == 2) {
                this.wxNum++
              } else if (e.todayStatus == 3) {
                this.wsxNum++
              } else if (e.todayStatus == 4 && e.bz != null) {
                this.wzbsfwnNum++
              } else if (e.todayStatus == 4 && e.bz == null) {
                this.drwxNum++
              }
              e.mark = parseInt(e.mark)
              this.tableData.push(e)
              e.pointRole = 'user'
              this.patroleUser.push(e)
            } else if (e.userId == userId) {
              e.mark = parseInt(e.mark)
              this.tableData.push(e)
              e.pointRole = 'user'
              this.patroleUser.push(e)
            } else {
              e.mark = parseInt(e.mark)
              this.tableData.push(e)
              e.pointRole = 'user'
              this.patroleUser.push(e)
            }
          } else if (userId == '') {
            if (e.todayStatus == type) {
              e.mark = parseInt(e.mark)
              this.tableData.push(e)
              e.pointRole = 'user'
              this.patroleUser.push(e)
            }
          } else if (e.userId == userId) {
            e.mark = parseInt(e.mark)
            this.tableData.push(e)
            e.pointRole = 'user'
            this.patroleUser.push(e)
          }
        })
        // if (type != 'all') {
        this.showUsers()
        // }
      }
    },
    async showUsers() {
      console.log(this.patroleUser, 'dffasfghn郭慧娜')
      this.$emit('PatrolUsers', this.patroleUser)
      this.tag = true
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.container .map-right .right-content {
  background: #edf3f9;
}
</style>

<style scoped lang='scss'>
.hp {
  /*.patrolNum{*/
  /*  >>>.el-link--inner{*/
  /*    font-size: 24px;*/
  /*  }*/
  /*}*/
  >>>.el-form .el-form-item{
    margin-bottom: 0.05rem !important;
  }
  >>> .el-button--mini {
    padding: 2px 4px;
  }
  background: #ffffff;
  width: 100%;
  height: 100%;

  .fill {
    height: 6px;
    width: 100%;
    background: #edf3f9;
  }

  p {
    color: #666666;
    padding: 10px 20px;
  }

  $blue: #606266;

  >>> .el-input--small .el-input__inner {
    //input框的样式
    border: 1px solid #d9e3ef;
    height: 28px !important;
    line-height: 28px !important;
    background: #f6f6f6;
  }
  .totalTitle{
    font-size: 0.16rem;
  }
  .search {
    width: 96%;
    margin: 0 auto;
    background: #ffffff;

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

    .el-form .el-form-item:not(.is-required) .el-form-item__label {
      text-indent: 0px !important;
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

  .search-btn {
    margin-left: 4.1%;
  }
}
</style>
