<!--
 * @Author: dang
 * @Date: 2021-04-13 09:59:15
 * @LastEditTime: 2021-09-04 17:23:41
 * @LastEditors: Please set LastEditors
 * @Description: A worm
 * @FilePath: \iot_prewarning_dz\src\views\shuiku\workbench\detail\inspectionDetail.vue
-->
<template>
  <el-dialog :title="data.title"
             :visible.sync="dialogVisible"
             :before-close="handleClose"
             :close-on-click-modal="false"
             width="60%">
    <div class="spection-wrapper">
      <div class="time-wrapper"
           v-if="isMonth">
        <div class="timeline-wrapper">
          <el-timeline>
            <el-timeline-item v-for='(item,index) in spectionData'
                              :key="index"
                              :timestamp="item.tm"
                              placement="top">
              <el-card :style="{background: index == activeIndex ? '#31ccbd':''}">
                <p @click="handlerCar(item,index)">
                  <span v-if="item.patrol >= 1">巡查 {{item.patrol}}</span>
                  <span v-if="item.operational >= 1">操作 {{item.operational}}</span>
                  <span v-if="item.event >= 1">事件 {{item.event}}</span>
                  <span v-if="item.danger >= 1">险情 {{item.danger}}</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="detail-wrapper">
        <div class="detail-content">
          <div class="block"
               v-if="handlerpicFlag">
            <el-image style="width: 60px; height: 35px"
                      :previewSrcList='previewSrcList'
                      :z-index="99999"
                      :src="handlerpic"
                      fit="fit"> </el-image>
            <span class="demonstration">点击查看示意图</span>
          </div>

          <el-tabs v-model="activeName"
                   @tab-click="handleTabClick">
            <el-tab-pane :label="item.label"
                         v-for="(item,index) in tableList"
                         :key="index"
                         :name="item.name">
              <div class="info-wrapper">
                <div class="info-content">
                  <div class="info">
                    <span> 巡查人： {{ item.person}}</span>
                    <span> 联系电话： {{item.phone}}</span>
                  </div>
                  <div class="info">
                    <span v-if="item.stm"> 开始时间： {{ item.stm}}</span>
                    <span v-if="item.createTime"> 结束时间： {{item.createTime}}</span>
                  </div>
                  <div class="info">
                    <span v-if="item.sw"> 水位值： {{ item.sw}}m</span>
                    <span> </span>
                  </div>
                </div>
                <div class="info-btn">
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
                             @click="handlerSaveInfo(item,'1')"
                             size="mini">生成交付单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="handlerSaveInfo(item,'2')"
                             size="mini">生成表扬单</el-button>
                  <el-button type="skbtn"
                             plain
                             round
                             v-if="remarkFlag"
                             @click="remarkFlag = !remarkFlag"
                             size="mini">取消</el-button>
                  <a :href=" outNetUrl+ item.delivery[0]"
                     v-if="item.delivery&&item.delivery.length>0"
                     target="_blank"
                     rel="nofollow">
                    <el-button type="skbtn"
                               plain
                               round
                               size="mini">查看交付单</el-button>
                  </a>
                  <a :href=" outNetUrl+ item.praise[0]"
                     v-if="item.praise&&item.praise.length>0"
                     target="_blank"
                     rel="nofollow">

                    <el-button type="skbtn"
                               plain
                               round
                               size="mini">查看表扬单</el-button>
                  </a>

                </div>
              </div>
              <div class="time-wrapper">
                <div class="timeline-wrapper">
                  <el-timeline>

                    <el-timeline-item v-for='(ite,idx) in item.imgData'
                                      :key="idx"
                                      :timestamp=" (ite.pointName ? ite.pointName:'') + '   '+ '提交时间 ：' + ite.tm"
                                      placement="top">
                      <!-- previewUrl+-->
                      <el-row>
                        <el-col :span="10">
                          <el-image :z-index="99999"
                                    style="width:300px; height:350px"
                                    :preview-src-list="previewSrcLists"
                                    :src="ite.pointPicPath ?  previewUrl+ite.pointPicPath  :NoPicture "
                                    fit="fit"></el-image>
                        </el-col>
                        <el-col :span="10">

                          <el-row v-if="remarkFlag">
                            <el-col :span="3"
                                    style="padding-top:0.05rem">
                              <label for="批注">
                                批注
                              </label>
                            </el-col>
                            <el-col :span="20">
                              <el-input label="批注"
                                        size="small"
                                        clearable
                                        v-model="ite.remark"
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 6}"
                                        placeholder="请填写批注"></el-input>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>

                    </el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </el-tab-pane>

          </el-tabs>
        </div>

      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getRegion } from '@/utils'
import { formatDate } from '@/utils/time.js'
import { previewUrl, outNetUrl } from '@/api/base.js'
import {
  getPatrolDetailById,
  getReservoirImage,
  monthStatisticsList,
  getPatrolListByUid,
  monthStatisticsListDetail,
  generateAssignedOrder,
} from '../api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    data: {
      type: Object,
    },
  },
  computed: {
    previewSrcLists() {
      let arr = []
      this.tableList.forEach((item) => {
        if (item.label === this.labelName) {
          item.imgData.map((ite) => {
            arr.push(previewUrl + ite.pointPicPath)
          })
        }
      })
      return arr
    },
  },
  data() {
    return {
      previewUrl,
      outNetUrl,
      firstEntryFlag: true,
      isMonth: false,
      remarkFlag: false,
      handlerpicFlag: false,
      labelName: '巡查记录一',
      dayOrMonthValue: '',
      tabType: '',
      activeName: '1',
      tableList: [],
      imgData: [],
      handlerpic: '',
      previewSrcList: [],
      timeVal: '',
      activeIndex: '0',
      monthList: [
        { label: '巡查', key: 'patrol', value: '', tm: '' },
        { label: '操作', key: 'operational', value: '', tm: '' },
        { label: '事件', key: 'event', value: '', tm: '' },
        { label: '险情', key: 'danger', value: '', tm: '' },
      ],
      formData: {},
      bodyStyle: { paddingLeft: '50px', fontSize: '40px' },
      spectionData: [],
      NoPicture: require('@/assets/images/NoPicture.png'),
      rules: {},
    }
  },
  methods: {
    async getMonthList() {
      this.spectionData = []
      this.tableList = []
      try {
        let params = {
          gid: this.formData.gid,
          type: this.formData.type, //1、巡查 2、养护 4
          implementType: this.formData.implementType,
          tmType: 2, //1、日 2、月
        }
        let { msg, data, status, total } = await monthStatisticsList(params)
        if (status && data) {
          if (data.length > 0) {
            //   this.handlerpic = [previewUrl + data.imageurl]
            //   this.getPatrollist(data[0].tm) //
            //   if (this.firstEntryFlag) {
            //     this.firstEntryFlag = false

            this.handlerCar(data[0], 0)
            //   }
            this.spectionData = data
          } else {
            this.$GXprompt.notify.warning('暂无数据')
          }
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
      this.getHanderPic(this.formData.gid)
      if (this.isMonth) {
        //月否是月
        this.getMonthList()
      } else {
        //日否是日
        this.handlerCar(this.formData)
      }
    },
    //   保存批注单
    async handlerSaveInfo(item, type) {
      this.remarkFlag = !this.remarkFlag
      console.log(item, type, 'type')

      try {
        let params = {
          type,
          gid: this.formData.gid,
          inspectRecordId: item.inspectRecordId,
          imgs: [],
        }
        item.imgData.forEach((ite) => {
          if (ite.remark != null && ite.remark != '') {
            let obj = {
              imageurl: ite.pointPicPath,
              imagename: ite.pointName,
              remark: ite.remark,
            }
            params.imgs.push(obj)
          }
        })

        let { status, data, msg } = await generateAssignedOrder(params)
        if (status) {
          console.log(data, 'data')
          this.handlerCar(this.formData, this.activeIndex)
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleTabClick(val) {
      console.log(val, 'val')
      this.labelName = val.label
      this.remarkFlag = false
    },
    //关闭弹框
    handleClose() {
      this.data.data = {}
      this.handlerpicFlag = false
      this.$emit('update:dialogVisible', false) //触发 input 事件，并传入新值
      this.$emit('handleCloseAll')
    },
    //   示意图接口
    async getHanderPic(val) {
      try {
        this.previewSrcList = []
        this.handlerpic = ''
        let { msg, data, status, total } = await getReservoirImage({
          reservoirId: val || 'c0658b437d7e499c86c8438ce5e0cda6',
        })
        if (status && data && data.imageurl) {
          this.handlerpicFlag = true
          this.previewSrcList = [previewUrl + data.imageurl]
          this.handlerpic = previewUrl + data.imageurl
        } else {
          //   this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
    // 鸡肋的获取记录id
    async getPatrollist(time) {
      let params = {
        pageNo: 1,
        pageSize: 20,
        gid: this.formData.gid, //水库id
        addvcd: '', //行政区id
        recordType: '1',
        stm: time + ' 00:00:00',
        etm: time + ' 23:59:59',
      }
      try {
        let { msg, data, status, total } = await getPatrolListByUid(params)
        if (status) {
          this.inspectRecordId = data[0].inspectRecordId
          this.handlerCar()
        } else {
          this.$message({
            message: msg,
            type: 'success',
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    //   点击卡片获取详情内容
    async handlerCar(val, index) {
      //   if (this.activeIndex == index) return
      this.remarkFlag = false
      this.tableList = []
      try {
        this.activeName = '1'
        this.activeIndex = index
        let params = {
          gid: this.formData.gid,
          type: this.formData.type, //1、巡查 2、养护
          implementType: this.formData.implementType,
          //   tmType: 1, //1、日 2、月
          tm: val.tm,
        }
        this.formData.tm = val.tm
        let { msg, data, status, total } = await monthStatisticsListDetail(
          params
        )
        if (status) {
          //   data.map((item, index, arr) => {
          //     arr[index] = label
          //   })

          data.map((item) => {
            if (!item.sw) return
            let sw = item.sw
            sw = sw.replace(/^[0]+/, '').replace(/^\./, '0.')
            item.sw = sw
          })
          this.tableList = data
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
        let { msg, data, status, total } = await patrollist(val)
        if (status) {
          let list = data
        } else {
          this.$GXprompt.notify.error(msg)
        }
      } catch (err) {
        console.log(err)
        this.$GXprompt.notify.error('网络连接错误')
      }
    },
  },
  watch: {
    data: {
      handler: function (newV, oldV) {
        if (newV.gid && newV.tabType == 'xc') {
          this.formData = JSON.parse(JSON.stringify(this.data))
          this.transFormData()
        }
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style  lang='scss' scoped>
.spection-wrapper {
  .el_tab_content {
    height: calc(7rem - 55px);
  }
  width: 100%;
  height: calc(7rem - 55px);
  display: flex;
  padding: 0.1rem 0rem;
  .time-wrapper {
    flex: 2;
    .timeline-wrapper {
      padding-top: 0.1rem;
      padding-right: 0.1rem;
      height: 6.1rem;
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
    height: 6.1rem;
    // overflow-y: scroll;
    padding: 0 0.1rem 0;
    .detail-content {
      width: 100%;
      height: calc(7rem - 55px);
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
          height: 5rem;
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
>>> .el-dialog__close {
  color: #fff !important;
}
</style>
