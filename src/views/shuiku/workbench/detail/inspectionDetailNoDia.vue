<!--
 * @Author: dang
 * @Date: 2021-04-13 09:59:15
 * @LastEditTime: 2021-09-10 22:51:39
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\workbench\detail\inspectionDetailNoDia.vue
-->
<template>
  <!-- <el-dialog :title="data.title"
             :visible.sync="dialogVisible"
             :before-close="handleClose"
             :close-on-click-modal="false"
             width="60%"> -->
  <div class="spection-wrapperNoDia">
    <template v-if="NullData">
      <div
        v-if="isMonth"
        class="time-wrapper"
      >
        <div class="timeline-wrapper">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in spectionData"
              :key="index"
              :timestamp="item.tm"
              placement="top"
            >
              <el-card :style="{background: index == activeIndex ? '#31ccbd':''}">
                <p @click="handlerCar(item,index)">
                  <span v-if="item.patrol >= 1">巡查 {{ item.patrol }}</span>
                  <span v-if="item.operational >= 1">操作 {{ item.operational }}</span>
                  <span v-if="item.event >= 1">事件 {{ item.event }}</span>
                  <span v-if="item.danger >= 1">险情 {{ item.danger }}</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="detail-wrapper">
        <div class="detail-content">
          <div class="block">
            <!-- <el-image style="width: 60px; height: 35px"
                      :previewSrcList='handlerpic'
                      :z-index="99999"
                      :src="previewSrcList"
                      fit="fit"> </el-image>
            <span class="demonstration">点击查看示意图</span> -->
          </div>
          <template v-if="tableList.length">
            <el-tabs
              v-model="activeName"
              @tab-click="handleTabClick"
            >
              <el-tab-pane
                v-for="(item, index) in tableList"
                :key="index"
                :label="item.label"
                :name="item.name"
              >
                <el-row
                  v-if="show"
                  style="text-align:right;width:100%"
                >
                  <el-col :span="24">
                    <el-button
                      type="skbtn"
                      plain
                      size="mini"
                      @click="dumpGJ(item)"
                    >查看轨迹</el-button>
                  </el-col>
                </el-row>
                <el-row
                  v-if="!show"
                  style="text-align:right;width:100%"
                >
                  <el-col :span="24">
                    <el-button
                      type="skbtn"
                      plain
                      size="mini"
                      @click="dumpGJ(item)"
                    >收起轨迹</el-button>
                  </el-col>
                </el-row>
                <template v-if="show">
                  <div class="info-wrapper">
                    <div class="info-content">
                      <div class="info">
                        <span> 巡查人： {{ item.person }}</span>
                        <span> 联系电话： {{ item.phone }}</span>
                      </div>
                      <div class="info">
                        <span> 开始时间： {{ item.stm }}</span>
                        <span> 结束时间： {{ item.createTime }}</span>
                      </div>
                      <div class="info">
                        <span> 水位值： {{ item.sw }}m</span>
                        <span />
                      </div>
                    </div>
                  <!-- <div class="info-btn">
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="!remarkFlag"
                             @click="remarkFlag = !remarkFlag"
                             size="mini">批注</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="handlerSaveInfo(item)"
                             size="mini">生成交付单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="handlerSaveInfo"
                             size="mini">生成表扬单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="remarkFlag = !remarkFlag"
                             size="mini">取消</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="item.delivery"
                             size="mini">查看交付单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="item.praise"
                             size="mini">查看表扬单</el-button>
                </div> -->
                  </div>
                  <div class="time-wrapper">
                    <div class="timeline-wrapper">
                      <el-timeline>
                        <el-timeline-item
                          v-for="(ite, idx) in item.imgData"
                          :key="idx"
                          :timestamp="
                            ite.pointName + '   ' + '提交时间 ：' + ite.tm
                          "
                          placement="top"
                        >
                          <!-- previewUrl+-->
                          <el-image
                            :z-index="99999"
                            :src="
                              ite.pointPicPath
                                ? previewUrl + ite.pointPicPath
                                : NoPicture
                            "
                            fit="fit"
                          />
                          <el-row v-if="remarkFlag">
                            <el-col
                              :span="1"
                              style="padding-top:0.05rem"
                            >
                              <label for="批注">
                                批注
                              </label>
                            </el-col>
                            <el-col :span="18">
                              <el-input
                                v-model="ite.remark"
                                label="批注"
                                size="small"
                                clearable
                                placeholder="请填写批注"
                              />
                            </el-col>
                          </el-row>
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-else>
            <el-image src="" />
          </template>
          <div
            v-if="!show"
            style="height: 400px;width: 100%; position: absolute; top: 1rem;"
          >
            <ditu
              :gj-data="gj"
              :marketlist-data="marketlistData"
              :user-list="userList"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-if="!NullData">
      <div style="width: 100%;text-align: center;vertical-align: middle;padding-top:2rem;position: absolute;">
        <img
          :src="require('@/assets/images/sk/noNR.png')"
          style="height:200px;text-align:center"
        >
      </div>
    </template>
  </div>

  <!-- </el-dialog> -->
</template>
<script>
import {getRegion} from '@/utils'
import {formatDate} from '@/utils/time.js'
import {previewUrl} from '@/api/base.js'
import {
  getPatrolDetailById,
  getReservoirImage,
  monthStatisticsList,
  getPatrolListByUid,
  monthStatisticsListDetail,
  queryUserPatrolByTmAndUserId
} from '../api'
import ditu from '../../../../components/Map/OlMap/LatLngmap'

export default {
  components: {
    ditu
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      gj: [],
      marketlistData: [],
      userList: [{lng: '36.333', lat: '106.333', pointRole: 'user'}],
      show: true,
      NullData: true,
      previewUrl,
      firstEntryFlag: true,
      isMonth: false,
      remarkFlag: false,
      dayOrMonthValue: '',
      tabType: '',
      activeName: '1',
      activeIndex: '0',
      tableList: [
        // {
        //   label: '巡查记录一',
        //   name: '1',
        //   person: '党党1',
        //   phone: '15935268521',
        //   stm: '20201865',
        //   createTime: '2035785',
        //   sw: 152,
        //   delivery: '123',
        //   praise: '56',
        //   imgData: [
        //     {
        //       pointName: '党党',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '12',
        //     },
        //     {
        //       pointName: '党党11',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '',
        //     },
        //   ],
        // },
        // {
        //   label: '巡查记录二',
        //   name: '2',
        //   person: '党党2',
        //   phone: '15935268521',
        //   stm: '20201865',
        //   createTime: '2035785',
        //   sw: 152,
        //   imgData: [
        //     {
        //       pointName: '党党2',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '',
        //     },
        //   ],
        // },
        // {
        //   label: '巡查记录三',
        //   name: '3',
        //   person: '党党3',
        //   phone: '15935268521',
        //   stm: '20201865',
        //   createTime: '2035785',
        //   sw: 152,
        //   imgData: [
        //     {
        //       pointName: '党党3',
        //       tm: '2020-12-45',
        //       pointPicPath:
        //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //       remark: '',
        //     },
        //   ],
        // },
      ],
      imgData: [],
      handlerpic: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      previewSrcList:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //    [
      //     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //   ],
      timeVal: '',
      formData: {},
      spectionData: [
        // { time: '2018 / 4 / 3', spection: 12, operation: 4, eve: 5, danger: 6 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 14, eve: 5, danger: 6 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 4, eve: 5, danger: 6 },
        // {
        //   time: '2018 / 4 / 3',
        //   spection: 22,
        //   operation: 4,
        //   eve: 5,
        //   danger: 666,
        // },
        // { time: '2018 / 4 / 3', spection: 12, operation: 4, eve: 5, danger: 6 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 14, eve: 5, danger: 6 },
        // { time: '2018 / 4 / 3', spection: 2, operation: 4, eve: 5, danger: 6 },
        // {
        //   time: '2018 / 4 / 3',
        //   spection: 22,
        //   operation: 4,
        //   eve: 5,
        //   danger: 666,
        // },
      ],
      NoPicture: require('@/assets/images/NoPicture.png'),
      rules: {}
    }
  },
  computed: {
    previewSrcLists() {
      const arr = []
      this.imgData.forEach((item) => {
        arr.push(previewUrl + item.pointPicPath)
      })
      return arr
    }
  },
  watch: {
    data: {
      handler: function(newV, oldV) {
        if (newV.rscd && newV.tabType == 'xc') {
          this.formData = JSON.parse(JSON.stringify(this.data))
          this.transFormData()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async dumpGJ(item) {
      const params = {id: item.personid, stm: item.stm, etm: item.createTime}
      const {msg, obj, status} = await queryUserPatrolByTmAndUserId(params)
      const that = this
      if (status) {
        const arr = []
        // for (let index = 0; index < data.length; index++) {
        //   let arr1 = [data[index].longitude,data[index].latitude];
        //   that.gj.push(arr1);
        // }
        //  let arrx = []
        obj.forEach((e) => {
          // arrx = []
          // let longitude =  Number(e.longitude)
          // arrx.push(longitude)
          // let latitude = Number(e.latitude);
          // arrx.push(latitude)
          arr.push([Number(e.longitude), Number(e.latitude)])
        })
        this.gj = arr
      } else {
      }
      this.show = !this.show

      this.marketlistData = [{lng: '36.333', lat: '106.333'}]
      console.log(obj, '---巡查轨迹')
    },
    async getMonthList() {
      try {
        const params = {
          gid: this.formData.rscd,
          type: 1, // 1、巡查 2、养护
          tmType: 2 // 1、日 2、月
        }
        const {msg, obj, status, total} = await monthStatisticsList(params)
        if (status) {
          //   this.handlerpic = [previewUrl + data.imageurl]
          //   this.getPatrollist(data[0].tm) //
          //   if (this.firstEntryFlag) {
          //     this.firstEntryFlag = false
          if (obj.length > 0) {
            this.handlerCar(obj[0], 0)
          } else {
            this.NullData = false
          }
          //   }
          this.spectionData = obj
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    transFormData() {
      console.log(this.formData, 'this.formData')
      this.isMonth = this.formData.isMonth
      this.tabType = this.formData.tabType
      this.dayOrMonthValue = this.formData.dayOrMonthValue
      this.formData.tm = formatDate(
        this.formData.dayOrMonthValue,
        '{y}-{m}-{d}'
      )
      // todo 需要放开   this.getHanderPic(this.formData.rscd)
      if (this.isMonth) {
        // 月否是月
        this.getMonthList()
      } else {
        // 日否是日
        this.handlerCar(this.formData)
      }
    },
    //   保存批注单
    handlerSaveInfo(item) {
      this.remarkFlag = !this.remarkFlag
      console.log(item)
    },
    handleTabClick(val) {
      this.remarkFlag = false
      this.show = true
    },
    // 关闭弹框
    handleClose() {
      this.data.data = {}
      this.$emit('update:dialogVisible', false) // 触发 input 事件，并传入新值
    },
    //   示意图接口
    async getHanderPic(val) {
      try {
        const {msg, obj, status, total} = await getReservoirImage({
          reservoirId: val || 'c0658b437d7e499c86c8438ce5e0cda6'
        })
        if (status) {
          this.handlerpic = [previewUrl + obj.imageurl]
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    // 鸡肋的获取记录id
    async getPatrollist(time) {
      const params = {
        pageNo: 1,
        pageSize: 20,
        rscd: this.formData.rscd, // 水库id
        addvcd: '', // 行政区id
        recordType: '1',
        stm: time + ' 00:00:00',
        etm: time + ' 23:59:59'
      }
      try {
        const {msg, obj, status, total} = await getPatrolListByUid(params)
        if (status == 200) {
          this.inspectRecordId = obj[0].inspectRecordId
          this.handlerCar()
        } else {
          this.$message({
            message: msg,
            type: 'success'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    //   点击卡片获取详情内容
    async handlerCar(val, index) {
      //   if (this.activeIndex == index) return
      this.show = true
      this.tableList = []
      try {
        this.activeName = '1'
        this.activeIndex = index
        const params = {
          gid: this.formData.rscd,
          type: 1, // 1、巡查 2、养护
          //   tmType: 1, //1、日 2、月
          tm: val.tm
        }
        const {msg, obj, status, total} = await monthStatisticsListDetail(
          params
        )
        if (status == 200) {
          //   data.map((item, index, arr) => {
          //     arr[index] = label
          //   })
          obj.map((item) => {
            let sw = item.sw
            sw = sw.replace(/^[0]+/, '').replace(/^\./, '0.')
            item.sw = sw
          })
          this.tableList = obj
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    //   修改时间查询时间列表
    async handlerChangeTime(val) {
      console.log(val)
      try {
        return
        const {msg, obj, status, total} = await patrollist(val)
        if (status == 200) {
          const list = obj
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    }
  }
}
</script>

<style  lang='scss' scoped>
.spection-wrapperNoDia {
  width: 100%;
  height: 7.4rem;
  display: flex;
  padding: 0.1rem 0rem;
  >>> .el-tabs__content {
    height: 6.2rem !important;
  }
  .time-wrapper {
    flex: 2;
    .timeline-wrapper {
      padding-top: 0.1rem;
      padding-right: 0.1rem;
      height: 6rem;
      overflow-y: scroll;
      >>> .el-timeline {
        margin-left: 0.05rem !important;
      }
      >>> .el-card__body {
        padding: 0.02rem !important;
      }
      p {
        padding: 0.18rem;
      }
      span {
        display: inline-block;
        // width: 0.45rem;
        margin: 0 0.05rem;
        text-decoration: underline;
      }
    }
  }
  .detail-wrapper {
    flex: 9;
    height: 6.2rem;
    overflow: hidden;
    padding: 0 0.1rem 0;
    .detail-content {
      width: 100%;
      position: relative;
      .block {
        position: absolute;
        right: 0;
        z-index: 99998;
      }
      .title {
        font-size: 0.16rem;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        line-height: 0.3rem;
      }
      >>> .el-tabs__nav-wrap {
        width: 77%;
      }
      .info-wrapper {
        width: 100%;
        display: flex;
        .info-content {
          width: 60%;
          .info {
            width: 90%;
            height: 0.25rem;
            display: flex;
            justify-content: space-between;
            color: #000000;
            font-size: 0.16rem;
          }
        }
        .info-btn {
          width: 35%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: flex-start;
        }
      }
      .time-wrapper {
        .timeline-wrapper {
          height: 5.8rem;
        }
      }
      .content {
        height: 0.25rem;
        span {
          font-size: 0.12rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000000;
          line-height: 0.23rem;
        }
      }

      .card-wrapper {
        display: flex;
        flex-wrap: wrap;
        >>> .el-card__body {
          padding: 0px !important;
        }
        .card-for {
          margin: 0.02rem;
        }
        .card-title {
          width: 100%;
          height: 0.38rem;
          text-align: center;
          line-height: 0.38rem;
          background: #f4fbf5;
          font-size: 0.16rem;
          color: #000000;
          border-bottom: 1px solid #999999;
        }
        .img-wrapper {
          padding: 0.1rem;
          img {
            width: 100%;
            height: 95%;
          }
        }
      }
    }
  }
}
.dialogCz {
  >>> .el-dialog__header {
    background: #29958b;
    padding: 0.1rem 0.4rem;
  }
  >>> .el-dialog .el-dialog__title,
  .el-dialog .dialog-title {
    color: #ffffff !important;
  }
  >>> .el-form {
    padding-top: 0.2rem;
  }
  >>> .el-icon-close:before {
    color: white;
  }
}
</style>
