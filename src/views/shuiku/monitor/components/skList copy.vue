<template>
  <!-- 水库 -->
  <div class="menu-content-info22">
    <!-- 表单信息 -->
    <div class="search">
      <div class="div-title">
        <div class="title_name">
          <i />
          <div class="pointHiddenTitle">水库总览</div>
        </div>
      </div>
      <p style="margin-left:12px" @click="dumpNum(0)">
        {{ $store.state.user.addvnm }}总共
        <span
          class="num"
          style="text-decoration: underline;cursor:pointer;text-align:left "
        >{{ skTotal }}</span>座水库
      </p>
      <el-row>
        <el-col :span="6" @click.native="dumpNum(1)">
          <p
            class="num"
            style="color:#0e72dd;text-decoration: underline;cursor:pointer "
          >{{ mapNum.zcxswyxnum }}</p>
          <p class="desc">正常水位</p>
        </el-col>
        <el-col :span="6" @click.native="dumpNum(2)">
          <p
            class="num"
            style="color:#d2d21a;text-decoration: underline;cursor:pointer "
          >{{ mapNum.czcxswnum }}</p>
          <p class="desc">超堰顶高程</p>
        </el-col>
        <el-col :span="6" @click.native="dumpNum(3)">
          <p
            class="num"
            style="color:orange;text-decoration: underline;cursor:pointer "
          >{{ mapNum.csjhswnum }}</p>
          <p class="desc">超汛限水位</p>
        </el-col>
        <el-col :span="6" @click.native="dumpNum(4)">
          <p
            class="num"
            style="color:red;text-decoration: underline;cursor:pointer "
          >{{ mapNum.cjhhswnum }}</p>
          <p class="desc">超设计洪水位</p>
        </el-col>
      </el-row>
      <hr style="border:1px solid #edf3f9;margin:0.1rem">
      <el-row style="line-height: 38px;text-align:center">
        <el-col :span="8">
          <el-row>
            <el-col v-if="districtKind==3" :span="8">省</el-col>
            <el-col v-if="districtKind==2" :span="8">自治区</el-col>
            <el-col v-if="districtKind==1" :span="8">市</el-col>
            <el-col :span="16">
              <el-select
                v-model="districtValue1"
                placeholder="请选择"
                size="mini"
                :disabled="ifDis1"
                clearable
                @focus="focus1"
                @change="changeOption1"
              >
                <el-option
                  v-for="item1 in options1"
                  :key="item1.addvcd"
                  size="mini"
                  :label="item1.addvnm"
                  :value="item1.addvcd"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="4">市</el-col>
            <el-col :span="20">
              <el-select
                v-model="districtValue2"
                placeholder="请选择"
                size="mini"
                :disabled="ifDis2"
                clearable
                @focus="focus2"
                @change="changeOption2"
              >
                <el-option
                  v-for="item2 in options2"
                  :key="item2.addvcd"
                  size="mini"
                  :label="item2.addvnm"
                  :value="item2.addvcd"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col v-if="districtKind==3" :span="4">县</el-col>
            <el-col v-if="districtKind==2" :span="4">区</el-col>
            <el-col v-if="districtKind==1" :span="4">区</el-col>
            <el-col :span="20">
              <el-select
                v-model="districtValue3"
                placeholder="请选择"
                size="mini"
                :disabled="ifDis3"
                clearable
                @focus="focus3"
                @change="changeOption3"
              >
                <el-option
                  v-for="item3 in options3"
                  :key="item3.addvcd"
                  size="mini"
                  :label="item3.addvnm"
                  :value="item3.addvcd"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="line-height: 38px;text-align:left;margin-left:2px" class="sz">
        <el-col v-if="districtKind==3" :span="3">乡镇</el-col>
        <el-col v-if="districtKind==2" :span="3">街道</el-col>
        <el-col v-if="districtKind==1" :span="3">街道</el-col>
        <el-col :span="21">
          <el-select
            v-model="districtValue4"
            placeholder="请选择"
            size="mini"
            :disabled="ifDis4"
            clearable
            @focus="focus4"
            @change="changeOption4"
          >
            <el-option
              v-for="item4 in options4"
              :key="item4.addvcd"
              size="mini"
              :label="item4.addvnm"
              :value="item4.addvcd"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row style="line-height: 38px;text-align:left;margin-left:2px">
        <el-col :span="4">
          水库列表
        </el-col>
        <el-col :span="16">
          <el-select
            v-model="value"
            filterable
            remote
            clearable
            size="mini"
            remote-method='remoteMethod'
            placeholder="请输入水库列表名称"
            :loading="loading"
            @change="handlerChange"
          >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
          </el-select>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <el-button
            icon="el-icon-search"
            type="skbtn"
            plain
            size="mini"
          />

        </el-col>
      </el-row>
    </div>
    <div class="fill" />
    <!-- 水库列表 -->
    <ul
      v-infinite-scroll="load"
      class="ponit-list"
    >
      <el-row class="addvnm">
        <el-col
          clss="addvnm-left"
          :span="12"
        >{{ districtValue1Name }}{{ districtValue2Name }}{{ districtValue3Name }}{{ districtValue4Name }}</el-col>
        <el-col class="addvnm-right" :span="11">
          共
          <span class="sjtotal">{{ list.length }}</span>座水库
        </el-col>
      </el-row>
      <li
        v-for="(item, index) in list"
        :key="index"
        class="point-list-item"
        @click="positionMap(item)"
      >
        <div class="hearder-title" @click.stop="dumpDetail(item)">
          {{ item.rsnm }} —
          <span v-if="item.wl_status == 1" style="color:rgb(14, 114, 221)">正常水位</span>
          <span v-if="item.wl_status == 2" style="color:rgb(210, 210, 26)">超汛限水位</span>
          <span v-if="item.wl_status == 3" style="color:orange">超堰顶高程</span>
          <span v-if="item.wl_status == 4" style="color:red">超设计洪水位</span>
          <span v-else style="color:gray">暂无信息</span>
        </div>
        <div>
          <span>所属行政区划：{{ districtValue1 }}{{ districtValue2 }}{{ districtValue3 }}{{ districtValue4 }}</span>
          <br>
          <span @click="dump('xc')">本月巡查</span>
          <span style="color:#29958b">
            {{
              item.patrol4month == null ? "0" : item.patrol4month
            }}
          </span>
          <span>
            次 &nbsp; 巡查员：{{ item.xczrr_name }}&nbsp;-&nbsp;{{
              item.xczrr_phone
            }}
          </span>
        </div>
        <div class="ponit-location">
          <div class="lable1">
            今日水位：
            <span class="number">{{ item.todaywl == null ? "--" : item.todaywl + "m" }}</span>
            <span>
              今日雨量：
              <span class="number">{{ item.todaydrp == null ? "--" : item.todaydrp + "m" }}</span>
            </span>
            <br>
            <span>
              当前渗压：{{ item.current_m_v == null ? "--" : item.current_m_v }}
              <!-- UP1: <span class="number">13.51</span> -->
              <!-- kpa,UP2:
              <span class="number">13.51</span>kpa,UP3:
       <span class="number">13.51</span>kpa-->
            </span>
            <br>
            状态描述： {{ item.wl_status_describe }}
            <span
              v-if="item.wl_status == 1"
              class="number"
              style="color:rgb(14, 114, 221)"
            >正常水位{{ item.swstatusval == null ? "--" : "(" + item.swstatusval-item.todaywl + ")" }}</span>
            <span
              v-if="item.wl_status == 2"
              class="number"
              style="color:rgb(210, 210, 26)"
            >超汛限水位{{ item.mjflsscnwl == null ? "--" : "(" + item.mjflsscnwl-item.todaywl + ")" }}</span>
            <span
              v-if="item.wl_status == 3"
              class="number"
              style="color:orange"
            >超堰顶高程{{ item.dmcrel == null ? "--" : "(" + item.dmcrel-item.todaywl + ")" }}</span>
            <span
              v-if="item.wl_status == 4"
              class="number"
              style="color:red"
            >超设计洪水位{{ item.dsfllv == null ? "--" : "(" + item.dsfllv-item.todaywl + ")" }}</span>
            <span v-else class="number" style="color:gray">暂无信息</span>
          </div>
        </div>
        <hr style="border:1px solid #edf3f9">
      </li>
    </ul>
  </div>
</template>
<script>
import '@/assets/css/dz-iconfont.css'
import District from '../../../../common/district'
import Echarts from '../../components/echarts/index'
import {getAdcdbByAccvd} from '@/api/base.js'
import {
  getReservoirListByPage,
  allMonitor,
  getAllSk4Map,
  getMapTj,
  monitorStatusCount
} from '../api.js'
import {getCapacityCurveByReservoirCode} from '../../reservoirManagement/api'
import {
  addvnmTree,
  postGetDeviceListbyhdp,
  postGetMonitorDataByDevice
} from '../api'

export default {
  components: {
    District,
    Echarts
  },
  data() {
    return {
      skTotal: '',
      page: 1,
      size: 3,
      districtKind: 2, // 1，直辖市，2自治区，3省市县
      userId: '',
      roles: '',
      addvcd: '',
      addvnm: '',
      addvcdList: [], // 行政区列表
      districtValue1: '',
      districtValue2: '',
      districtValue3: '',
      districtValue4: '',
      districtValue1Code: '',
      districtValue2Code: '',
      districtValue3Code: '',
      districtValue4Code: '',
      districtValue1Name: '',
      districtValue2Name: '',
      districtValue3Name: '',
      districtValue4Name: '',
      options1: [], // 省
      options2: [], // 市
      options3: [], // 县
      options4: [], // 乡
      ifDis1: false,
      ifDis2: false,
      ifDis3: false,
      ifDis4: false,

      showEchart: false,
      currentSk: [],
      chartData: {
        data: {},
        height: '300px',
        width: '3.8rem',
        type: 'cap'
      },
      activeNames: ['1'],
      list: [],
      oldList: [],
      attenList: [],
      form: {
        name: ''
      },
      addvcdData: [],
      districtShow: false,
      district_data: {},
      options: [],
      optionsAddvcds: [],
      value: '',
      hpPositionMap: {},
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
        this.numGetMapTj()
        // this.optionsSkList();
        console.log(newV, '监听到的state值')
      }
    }
  },

  mounted() {
    this.userId = this.$store.state.user.userId
    this.roles = this.$store.state.user.roles
    this.addvcd = this.$store.state.user.addvcd
    this.addvnm = this.$store.state.user.addvnm
    this.districtClassification()
    this.monitorStatusCountList()

    // this.getSkList()
    // this.optionsAddvcd()
    // this.optionsSkList()
    // this.numGetMapTj()
  },
  methods: {
  // 行政区归类
    async districtClassification() {
      // 00省12-10  00市 00县 000000
      console.log(this.addvcd, '行政区编码')
      // this.addvcd = 160000000000
      let count = null // 行政区从后往前连续0的个数
      let level = null // 属于省市县的哪个级别
      // 1 省（23）、2自治区（5）、3直辖市（4）、4特别行政区（2）
      // 直辖市--北京、天津、上海、重庆
      // 自治区--内蒙古自治区、广西壮族自治区、西藏自治区、宁夏回族自治区、新疆维吾尔自治区
      let districtKind = null // 判断是否属于特别行政区
      const addvcdTwo = this.addvcd.toString().substring(0, 2)
      if (
        addvcdTwo == '11' ||
    addvcdTwo == '12' ||
    addvcdTwo == '31' ||
    addvcdTwo == '50'
      ) {
        districtKind = 1
      } else if (
        addvcdTwo == '15' ||
    addvcdTwo == '45' ||
    addvcdTwo == '54' ||
    addvcdTwo == '64' ||
    addvcdTwo == '65'
      ) {
        districtKind = 2
      } else {
        districtKind = 3
      }
      this.districtKind = districtKind

      const arr = []
      for (let i = 0; i < 12; i++) {
        arr.push(this.addvcd.toString().charAt(i))
      }
      arr.reverse()
      if (this.addvcd) {
        arr.some((e, i, a) => {
          if (e != 0) {
            count = i
            return true
          }
        })
      }

      if (count >= 10) {
        level = 1
        console.log('省')
      } else if (count < 10 && count >= 8) {
        level = 2
        console.log('市')
      } else if (count < 8 && count >= 6) {
        level = 3
        console.log('县')
      } else {
        level = 4
        console.log('乡')
      }
      console.log(level, '所属级别', districtKind, '种类')
      await this.getAddvcdList(this.addvcd)
      if (districtKind == 1) {
        this.districtValue1 = this.districtValue2
      } else {
        if (level == 1) {
          this.ifDis1 = true
          this.districtValue1 = this.addvcdList[0].addvnm
          this.districtValue1Code = this.addvcdList[0].addvcd
          this.districtValue1Name = this.addvcdList[0].addvnm
          this.options2 = this.addvcdList[0].children
        } else if (level == 2) {
          this.ifDis1 = true
          this.ifDis2 = true
          this.districtValue2 = this.addvcdList[0].addvnm
          this.districtValue2Code = this.addvcdList[0].addvcd
          this.districtValue2Name = this.addvcdList[0].addvnm

          this.options3 = this.addvcdList[0].children
        } else if (level == 3) {
          this.ifDis1 = true
          this.ifDis2 = true
          this.ifDis3 = true
          this.districtValue3 = this.addvcdList[0].addvnm
          this.districtValue3Code = this.addvcdList[0].addvcd
          this.districtValue3Name = this.addvcdList[0].addvnm

          this.options4 = this.addvcdList[0].children
        } else if (level == 4) {
          this.ifDis1 = true
          this.ifDis2 = true
          this.ifDis3 = true
          this.ifDis4 = true
          this.districtValue4 = this.addvcdList[0].addvnm
          this.districtValue4Code = this.addvcdList[0].addvcd
          this.districtValue4Name = this.addvcdList[0].addvnm
        }
      }
    },
    // 水库统计
    async  monitorStatusCountList() {
      const pam = {
        'page': '',
        'size': '',
        'waterlevelstatus': '',
        'systemid': '',
        'roleid': '',
        'userid': '',
        'addvcd': this.addvcd,
        'warningstatus': ''
      }
      const {msg, obj, status} = await monitorStatusCount(pam)
      if (status) {
        console.log(obj, '统计个数')
      }
      console.log('箭头')
    },
    // 查询行政区下的数据
    async getAddvcdList(addvcd) {
      const level = 1
      const pam = {
        addvcd: addvcd,
        level: level
      }
      const {msg, obj, status} = await addvnmTree(pam)
      if (status) {
        this.addvcdList = obj
        console.log(obj, '行政区')
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    // 省
    changeOption1(data) {
      this.districtValue1Code = data
      this.options1.forEach((e) => {
        if (e.addvcd == data) {
          this.districtValue1Name = e.addvnm
        }
      })
    },
    focus1(data) {
      console.log(data, 'data-focus1111')
    },
    // 市
    changeOption2(data) {
      console.log(data, 'data-222')
      this.districtValue2Code = data
      this.districtValue3 = ''
      this.options3 = []
      this.districtValue4 = ''
      this.options4 = []
      this.options2.forEach((e) => {
        if (e.addvcd == data) {
          this.districtValue2Name = e.addvnm
        }
      })
      console.log(this.options2, 'data-districtValue2Name')
    },
    focus2(data) {
      console.log(data, 'data-focus2')
    },
    // 县
    changeOption3(data) {
      this.districtValue3Code = data
      this.districtValue4 = ''
      this.options4 = []
      this.options3.forEach((e) => {
        if (e.addvcd == data) {
          this.districtValue3Name = e.addvnm
        }
      })
      console.log(data, 'data-3333')
    },
    async focus3(data) {
      console.log(this.districtValue2, 'ddddddddddd')
      if (this.districtValue2 == '') {
        this.$notify.info({
          title: '注意',
          message: '请先选择所在【市】'
        })
      } else {
        // 获取this.districtValue2的内容
        await this.getAddvcdList(this.districtValue2Code)
        this.options3 = this.addvcdList[0].children
      }
      console.log(data, 'data-focus33333')
    },
    // 乡镇
    changeOption4(data) {
      this.districtValue4Code = data
      this.options4.forEach((e) => {
        if (e.addvcd == data) {
          this.districtValue4Name = e.addvnm
        }
      })
      console.log(data, 'data-444')
    },
    async focus4(data) {
      console.log(data, 'data-focus24444', this.districtValue3)
      if (this.districtValue3 == '') {
        this.$notify.info({
          title: '注意',
          message: '请先选择所在【县】'
        })
      } else {
        await this.getAddvcdList(this.districtValue3Code)
        this.options4 = this.addvcdList[0].children
      }
    },
    // 数量统计
    async numGetMapTj(gid) {
      const {msg, status, data} = await getMapTj({
        rq: this.$moment(new Date()).format('YYYY-MM-DD')
      })
      if (status) {
        this.mapNum = data
        this.$emit('mapNum', data)
      }
    },
    // 定位水库
    positionMap(item) {
      var obj = new Object()
      obj.lng = item.lng
      obj.lat = item.lat
      this.$emit('hpPositin', obj)
    },
    // 跟据水库名称过滤水库
    handlerChange(val) {
      if (val) {
        this.list = this.oldList.filter(item => item.gid == val)
      } else {
        this.list = JSON.parse(JSON.stringify(this.oldList))
      }
    },
    load() {
      this.page++
      this.getSkList()
    },
    // 查询水库列表
    async getSkList() {
      if (this.page == 1) {
        this.list = []
      }
      const pam = {
        page: this.page,
        size: this.size,
        waterlevelstatus: '', // 水位状态
        systemid: '', // 系统唯一ID'
        roleid: '', // 角色唯一ID'
        userid: '', // 用户唯一ID'
        addvcd: this.addvcd, // 行政区划编码'
        warningstatus: '' // 预警状态'
      }
      this.options = []
      const {msg, data, status, total} = await allMonitor(pam)
      if (status) {
        this.skTotal = total
        this.list = [...this.list, ...data]
        console.log(data, '新水库列表')
        this.oldList = [...this.oldList, ...data]

        this.list.forEach(e => {
          this.options.push({label: e.rsnm, value: Number(e.rscd)})
        })
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },
    async optionsSkList() {
      this.options = []
      const {msg, data, status} = await getAllSk4Map({})
      if (status) {
        this.list = data
        this.oldList = data
        data.forEach(e => {
          this.options.push({label: e.name, value: e.gid})
        })
      }
    },
    // 查询行政区数据
    async optionsAddvcd() {
      const {msg, data, status} = await getAdcdbByAccvd({
        accvd: this.$store.state.user.addvcd
      })
      if (status) {
        data.forEach(e => {
          this.optionsAddvcds.push({label: e.addvnm, value: Number(e.addvcd)})
        })
      }
    },
    fitterSkData(type) {
      console.log(this.oldList, 'oldList')
      let desType = '距正常蓄水位'
      switch (type) {
        case 1:
          desType = '距正常蓄水位'
          break
        case 2:
          desType = '距设计洪水位'
          break
        case 3:
          desType = '距校核洪水位'
          break
        case 4:
          desType = '超校核洪水位'
          break
        case 5:
          desType = 1
          break
        case 6:
          desType = 0
          break
      }
      const arr = this.oldList.filter(e => {
        if (type > 4) {
          if (e.xcstatus == 1) {
            return e.xcstatus == desType
          } else {
            e.xcstatus = 0
            return e.xcstatus == desType
          }
        } else {
          if (e.swstatus == null || e.swstatus == '') {
            e.swstatus = '距正常蓄水位'
            return e.swstatus == desType
          } else {
            return e.swstatus == desType
          }
        }
      })
      return arr
    },
    // 跟据点击统计数量来过滤水库
    dumpNum(data) {
      if (data == 0) {
        this.list = this.oldList
      } else {
        this.list = this.fitterSkData(data)
      }
      this.$emit('fitterSk', this.list)
    },
    // 弹处综合面板的框
    dump(data) {
      const pam = {
        gid: this.currentSk.gid,
        name: this.currentSk.name,
        lng: this.currentSk.lng,
        lat: this.currentSk.lat,
        code: this.currentSk.code,
        roleid: this.currentSk.roleid,
        userid: this.currentSk.userid,
        type: data
      }
      this.$emit('detailNoPositin', pam)
    },

    // 查询库容数据
    async getKR(gid) {
      const {msg, status, data} = await getCapacityCurveByReservoirCode({
        reservoirCode: gid
      })
      if (status) {
        const x = []
        const y = []
        data.forEach(e => {
          x.push(e.waterLevel)
          y.push(e.capacity)
        })
        this.chartData.data.x = x
        this.chartData.data.y = y
        this.$set(this.chartData.data, x, x)
        this.$set(this.chartData.data, y, y)
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" >
.container .map-right .right-content {
 background: #edf3f9;
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
.menu-content-info22 {
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

 >>> .el-select {
  width: 100%;
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
 .search {
  width: 96%;
  margin: 0 auto;
  height: 2.9rem;
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
  height: calc(100% - 3.6rem);
  overflow: auto;
  color: #5f6165;
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
    color: rgb(148, 136, 136);
    font-weight: normal;
    .number {
     color: #000;
     font-weight: bold;
    }
    .lable1 {
     width: 100%;
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
