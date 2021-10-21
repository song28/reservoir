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
        {{ titleAddvnm }}总共
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
          >{{ mapNum.normalwl }}</p>
          <p class="desc">正常水位</p>
        </el-col>
        <el-col :span="6" @click.native="dumpNum(2)">
          <p
            class="num"
            style="color:#d2d21a;text-decoration: underline;cursor:pointer "
          >{{ mapNum.oflwl }}</p>
          <p class="desc">超堰顶高程</p>
        </el-col>
        <el-col :span="6" @click.native="dumpNum(3)">
          <p
            class="num"
            style="color:orange;text-decoration: underline;cursor:pointer "
          >{{ mapNum.swtlwl }}</p>
          <p class="desc">超汛限水位</p>
        </el-col>
        <el-col :span="6" @click.native="dumpNum(4)">
          <p
            class="num"
            style="color:red;text-decoration: underline;cursor:pointer "
          >{{ mapNum.ovdflwl }}</p>
          <p class="desc">超设计洪水位</p>
        </el-col>
      </el-row>
      <hr style="border:1px solid #edf3f9;margin:0.1rem">
      <el-row style="line-height: 38px;text-align:center">
        <el-col :span="8">
          <el-row>
            <template v-if="role=='all'">
              <el-col :span="8">全国</el-col>
            </template>
            <template v-else>
              <el-col v-if="districtKind==3" :span="8">省</el-col>
              <el-col v-if="districtKind==2" :span="8">自治区</el-col>
              <el-col v-if="districtKind==1" :span="8">市</el-col>
            </template>

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
      <!-- 隐患点类型 -->
      <div class="type-box">
        <span
          :class="activeIndex == 0 ? 'active' : ''"
          @click.stop="changePintByTye(0)"
        ><u>全部</u></span>
        <span
          :class="activeIndex == 1 ? 'active' : ''"
          @click.stop="changePintByTye(1)"
        ><u>关注</u></span>
      </div>
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
        ><span>{{ addvnm }}</span>
        </el-col>
        <el-col class="addvnm-right" :span="11">
          共
          <span class="sjtotal">{{ skTotalNum }}</span>座水库
        </el-col>
      </el-row>
      <!-- {{ districtValue1Name }}{{ districtValue2Name }}{{ districtValue3Name }}{{ districtValue4Name }} -->
      <li
        v-for="(item, index) in list"
        :key="index"
        class="point-list-item"
        @click="positionMap(item)"
      >

        <div class="hearder-title">
          {{ item.rsnm }} —
          <span v-if="item.wl_status == 1" style="color:rgb(14, 114, 221)">正常水位</span>
          <span v-if="item.wl_status == 2" style="color:rgb(210, 210, 26)">超堰顶高程</span>
          <span v-if="item.wl_status == 3" style="color:orange">超汛限水位</span>
          <span v-if="item.wl_status == 4" style="color:red">超设计洪水位</span>
          <span v-else style="color:gray">暂无信息</span>
          <template v-if="item.is_focus == '0'">
            <i
              class="iconfont iconguanzhu1"
              @click.stop="collect(item, index)"
            />
          </template>
          <template v-else>
            <span class="red">
              <i
                class="iconfont iconguanzhu1"
                @click.stop="collect(item, index)"
              />
            </span>
          </template>
        </div>
        <div>
          <span>所属行政区划：{{ item.addvnm }}</span>
          <br>
          <template>
            <span class="mouthxc" @click.stop="dump('xc',item)">本月巡查</span>
            <span style="color:#29958b" class="mouthxc" @click.stop="dump('xc',item)">
              {{
                item.patrol4month == null ? "0" : item.patrol4month
              }}
            </span>
            <span class="mouthxc" @click.stop="dump('xc',item)">
              次 &nbsp; 巡查员：{{ item.xczrr_name }}&nbsp;-&nbsp;{{
                item.xczrr_phone
              }}
            </span>
          </template>
        </div>

        <div class="ponit-location">
          <div class="lable1">
            今日水位：
            <span class="number">{{ item.todaywl == null ? "--" : item.todaywl== 'null' ? '--':item.todaywl + "m" }}</span>
            <span>
              今日雨量：
              <span class="number">{{ item.todaydrp == null ? "--" : item.todaydrp== 'null' ? '--': item.todaydrp + "mm" }}</span>
            </span>
            <br>
            <span>
              当前渗压：
              <template v-if="item.shenyaL!= null">
                <template v-if="item.shenyaL.length!=0">
                  <template v-for="item2 in item.shenyaL">
                    {{ item2.stnm == null ? "--" : item2.stnm == 'null' ? '--':item2.stnm }}:<span class="number">{{ item2.stval == null ? "--" : item2.stval == 'null' ? '--':item2.stval }}</span> kpa,
                  </template>
                </template>
                <template v-else>
                  --
                </template>
              </template>
              <template v-else>
                --
              </template>
              <!--
              {{ item.shenyaname_two == null ? "--" : item.shenyaname_two }}: <span class="number">{{ item.shenya_two == null ? "--" : item.shenya_two }}</span>kpa,
              {{ item.shenyaname_three == null ? "--" : item.shenyaname_three }}: <span class="number">{{ item.shenyaname_three == null ? "--" : item.shenyaname_three }}</span>kpa -->
            </span>
            <br>
            状态描述： {{ item.wl_status_describe== null ? "--" : item.wl_status_describe== 'null' ? '--':item.wl_status_describe }}
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
  vagueWordFindRsnmList,
  allMonitor,
  getAllSk4Map,
  getMapTj,
  monitorStatusCount,
  focusRsvr,
  unfocusRsvr
} from '../api.js'
import {getCapacityCurveByReservoirCode} from '../../reservoirManagement/api'
import {
  addvnmTree
} from '../api'

export default {
  components: {
    District,
    Echarts

  },
  data() {
    return {
      titleAddvnm: '',
      role: 'some',
      activeIndex: 0,
      isfocus: '',
      waterlevelstatus: '', // 水位状态
      skTotal: '', // 总数
      skTotalNum: '', // 可搜索的数量
      countSk: 0,
      page: 0,
      size: 4,
      districtKind: 1, // 1，直辖市，2自治区，3省市县
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
      currentSk: [],
      list: [],
      options: [],
      value: '',
      mapNum: {
        normalwl: '--',
        oflwl: '--',
        swtlwl: '--',
        ovdflwl: '--'

      },
      loading: false,
      skWord: '',
      pastTime: '',
      currentTime: ''
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
        // this.numGetMapTj()
        // this.optionsSkList();
        console.log(newV, '监听到的state值')
      }
    }
  },

  mounted() {
    this.getRole()
    if (this.role == 'some') {
      this.titleAddvnm = this.$store.state.user.addvnm
    } else {
      this.titleAddvnm = '全国'
    }
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
    // 账号权限
    getRole() {
      const {roles} = JSON.parse(sessionStorage.getItem('userInfo'))
      const some = roles.some((e) => {
        return e.rolename == '超级管理员'
      })
      if (some) {
        this.role = 'all'
      } else {
        this.role = 'some'
      }
    },
    // 收藏，取消收藏
    async collect(item) {
      if (item.is_focus == '0') {
        const {obj, status} = await focusRsvr({rscd: item.rscd, id: this.userId})
        if (status == 200) {
          item.is_focus = '1'
        }
      } else if (item.is_focus == '1') {
        const {obj, status} = await unfocusRsvr({rscd: item.rscd, id: this.userId})
        if (status == 200) {
          item.is_focus = '0'
        }
      }
    },
    // 根据隐患点类型进行切换
    changePintByTye(index) {
      this.activeIndex = index
      if (index) {
        this.isfocus = 1
      } else {
        this.isfocus = ''
      }
      this.page = 1
      this.getSkList()
    },
    // 搜索水库列表值
    changeSearchSkData(data) {
      this.skWord = data.rsnm
    },
    // 选中焦点的时候数据置为空
    focusSkData(data) {
      this.options = []
    },
    // 模糊搜索水库列表值
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        const pam = {
          addvcd: this.addvcd,
          word: query
        }
        const {obj, status} = await vagueWordFindRsnmList(pam)
        if (status == 200) {
          this.loading = false
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
      if (this.districtValue4 == '') {
        if (this.districtValue3 == '') {
          if (this.districtValue2 == '') {
            this.addvcd = this.districtValue1Code
          } else {
            this.addvcd = this.districtValue2Code
          }
        } else {
          this.addvcd = this.districtValue3Code
        }
      } else {
        this.addvcd = this.districtValue4Code
      }
      this.page = 1
      this.size = 4
      this.getSkList()
    },
    // 行政区归类
    async districtClassification() {
      if (this.role == 'some') {
        // 1 省（23）、2自治区（5）、3直辖市（4）、4特别行政区（2）
      // 直辖市--北京、天津、上海、重庆
      // 自治区--内蒙古自治区、广西壮族自治区、西藏自治区、宁夏回族自治区、新疆维吾尔自治区
        let count = null // 行政区从后往前连续0的个数
        let level = null // 属于省市县的哪个级别
        let districtKind = null // 判断是否属于特别行政区
        const addvcdTwo = this.$store.state.user.addvcd.toString().substring(0, 2)
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
          arr.push(this.$store.state.user.addvcd.toString().charAt(i))
        }
        arr.reverse()
        if (this.$store.state.user.addvcd) {
          arr.some((e, i, a) => {
            if (e != 0) {
              count = i
              return true
            }
          })
        }

        if (count >= 10) {
          level = 1
        // console.log('省')
        } else if (count < 10 && count >= 8) {
          level = 2
        // console.log('市')
        } else if (count < 8 && count >= 6) {
          level = 3
        // console.log('县')
        } else {
          level = 4
        // console.log('乡')
        }
        console.log(level, 'level')

        await this.getAddvcdList(this.addvcd)
        if (districtKind == 1) {
        // this.ifDis1 = true
        // this.ifDis2 = true
        // this.districtValue1 = this.districtValue2 = this.addvcdList[0].addvnm
          if (level == 1) {
            this.ifDis1 = true
            this.ifDis2 = true
            this.districtValue2 = this.addvcdList[0].addvnm
            this.districtValue2Code = this.addvcdList[0].addvcd
            this.districtValue2Name = this.addvcdList[0].addvnm
            this.options3 = this.addvcdList[0].children
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
      } else {
        await this.getAddvcdList(this.addvcd)
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
      const {obj, status} = await monitorStatusCount(pam)
      if (status == 200) {
        this.mapNum.normalwl = obj.normalwl
        this.mapNum.oflwl = obj.oflwl
        this.mapNum.ovdflwl = obj.ovdflwl
        this.mapNum.swtlwl = obj.swtlwl
      }
    },
    // 根据行政区编码查询行政区下的数据
    async getAddvcdList(addvcd) {
      const level = 1
      const pam = {
        addvcd: addvcd,
        level: level
      }
      const {msg, obj, status} = await addvnmTree(pam)
      if (status == 200) {
        this.addvcdList = obj
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
      // console.log(this.options2, 'data-districtValue2Name')
    },
    focus2(data) {
      // console.log(data, 'data-focus2')
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
      // console.log(data, 'data-3333')
    },
    async focus3(data) {
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
      // console.log(data, 'data-focus33333')
    },
    // 乡镇
    changeOption4(data) {
      this.districtValue4Code = data
      this.options4.forEach((e) => {
        if (e.addvcd == data) {
          this.districtValue4Name = e.addvnm
        }
      })
      // console.log(data, 'data-444')
    },
    async focus4(data) {
      // console.log(data, 'data-focus24444', this.districtValue3)
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
    // old--可删除数量统计
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
      this.$emit('hpPositin', item)
    },
    // 水库往下分页加一
    load() {
      this.page++
      this.getSkList()
    },
    // 水库列表
    async getSkList() {
      this.countSk++
      if (this.page == 1) {
        this.list = []
      }
      const pam = {
        rsnm: this.skWord,
        page: this.page,
        size: this.size,
        isfocus: this.isfocus,
        waterlevelstatus: this.waterlevelstatus, // 水位状态
        systemid: '', // 系统唯一ID'
        roleid: '', // 角色唯一ID'
        userid: this.userId, // 用户唯一ID'
        addvcd: this.addvcd, // 行政区划编码'
        warningstatus: '' // 预警状态'
      }
      // this.options = []
      const {msg, data, status, total} = await allMonitor(pam)
      if (status == 200) {
        if (this.countSk == 1) {
          this.skTotal = total
        }
        this.skTotalNum = total
        this.list = [...this.list, ...data]
      } else {
        this.$notify.error({
          title: '失败',
          message: msg
        })
      }
    },

    // 跟据点击统计数量来过滤水库
    dumpNum(data) {
      this.addvcd = this.$store.state.user.addvcd
      this.page = 1
      this.size = 4
      this.skWord = ''
      if (data == 0) {
        this.getSkList()
        this.waterlevelstatus = ''
      } else {
        this.waterlevelstatus = data
        this.getSkList()
      }
      this.$emit('fitterSk', this.waterlevelstatus)
    },
    // 巡查弹处综合面板的框
    dump(type, data) {
      const pam = data
      pam.type = type
      this.$emit('detailNoPositin', pam)
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

.iconguanzhu1 {
 //   color: red;
 position: absolute;
 right: 19px;
}
.red .iconguanzhu1 {
  color: rgb(46, 226, 40);
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
  height: 3rem;
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
  .el-input--mini .el-input__inner {
   //input框的样式
   border: 1px solid #d9e3ef;
   height: 28px !important;
   line-height: 28px !important;
   background: #f6f6f6;
  }
 >>>.el-input--mini .el-input__inner {
    color: #000 ;
    font-weight: bold ;
}
>>> .el-select .el-input.is-disabled .el-input__inner {
    cursor: not-allowed ;
    color: #807d7d;
}
  // 分类样式
  .type-box {
   margin-top: 5px;
       text-align: right;
   height: 30px;
   // padding-left: 10px;
   color: #606266;
   .active {
    color: #29958b;
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
  height: calc(100% - 3.7rem);
  overflow: auto;
  color: #5f6165;
  .addvnm {
    // border:1px solid red;
    // width:3.8rem;
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
   .mouthxc{
     cursor: pointer;
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
