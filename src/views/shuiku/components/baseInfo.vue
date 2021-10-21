<template>
  <div class="skListMap">
    <el-tabs v-model="activeName" class="root" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="one">
        <div class="base">
          <el-row style="text-align:center">
            <BasicData :data="DataSK" :rscd="'00000000061'" @on-back="backBasicData" />

            <!-- <el-col :span="22">
            </el-col>
            <el-col :span="2">
              <div>
                <el-button
                  v-if="!activeNameBtn"
                  type="skbtn"
                  icon="el-icon-edit-outline"
                  plain
                  size="mini"
                  @click.stop="edit('edit')"
                >编辑</el-button>
              </div> -->
            <!-- <div>
        <el-button
         v-if="activeNameBtn"
         type="skbtn"
         plain
         size="mini"
         icon="el-icon-success"
         @click.stop="edit('save')"
        >保存</el-button>
       </div>-->
            <div style="margin-top:20px">
              <el-button
                v-if="activeNameBtn"
                type="skbtn"
                icon="el-icon-error"
                plain
                size="mini"
                @click.stop="edit('cancel')"
              >取消</el-button>
            </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="大坝信息" name="two">
        <DamData />
      </el-tab-pane>
      <el-tab-pane label="大坝信息" name="three">
        <DamData />
      </el-tab-pane>
      <el-tab-pane label="特征数据" name="four">
        <Characteristic />
   </el-tab-pane>-->
      <el-tab-pane label="库容曲线" name="five">
        <div>
          <CapacityCurve v-if="showCap" :data="DataSK" :rscd="'00000000061'" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Echarts from './echarts/index'
import {
  skListBarTypeOptions,
  skListOpenTypeOptions,
  skListSizeTypeOptions
} from '../reservoirManagement/apiConfig'
import SkList from '../reservoirManagement/common/formSkList'

import BasicData from './subComponments/basicData' // 基础信息
import DamData from '../reservoirManagement/common/damData' // 大坝信息
import Characteristic from '../reservoirManagement/common/characteristic' // 特征数据
import CapacityCurve from '../reservoirManagement/common/capacityCurve' // 库容曲线
import SKPersonList from '../reservoirManagement/common/formSKPersonList'
import {
  getBaseInfoById,
  updateReservoirBaseInfo,
  getCapacityCurveByReservoirCode,
  getUserDetailInfoById
} from '../reservoirManagement/api'

export default {
  components: {
    SkList,
    Echarts,
    SKPersonList,
    BasicData,
    DamData,
    Characteristic,
    CapacityCurve
  },
  props: {
    commonData: {
      type: Object
    }
  },
  data() {
    return {
      showCap: false,
      DataSK: {
        title: null, // 弹框标题
        type: 'detail', // 操作add添加，update修改,detail查看
        data: {}, // 数据
        pageType: 'skList' // 页面类型
      },
      DataSkId: '',
      showPeoson: false,
      skPersonData: {},
      showEchart: false,
      chartData: {
        data: {},
        height: '6rem',
        width: '7rem',
        type: 'cap'
      },
      ifdis: true,
      activeNameBtn: false,
      activeName: 'one',
      skData: {},
      btnText: '编辑'
    }
  },
  watch: {},

  mounted() {
    this.getData()
  },
  methods: {
    backBasicData(data) {
      this.DataSK.type = 'detail'
      console.log(data, '返回的保存')
    },
    // 查询水库详情接口
    async getData() {
      const {msg, status, data} = await getBaseInfoById({
        gid: this.commonData.data.gid
      })
      if (status) {
        this.skData = data
      }
    },
    // 查询库容曲线接口
    async getKR(code) {
      const {msg, status, data} = await getCapacityCurveByReservoirCode({
        reservoirCode: code
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
    },
    // 查询人员列表详情
    async getDetail(userid, roleid) {
      const {msg, data, status, total} = await getUserDetailInfoById({
        inscptorId: userid,
        roleId: roleid
      })
      if (status) {
        return data
      }
    },
    // 切换列表
    async handleClick(data) {
      if (data.name == 'five') {
        this.showCap = true
      }
      // if (data.name == 'three') {
      //   this.chartData.width = $('.el-dialog__body').width() - 100 + 'px'
      //   this.chartData.data = new Object()
      //   this.$set(this.chartData.data)
      //   await this.getKR(this.commonData.data.gid)
      //   this.showEchart = true
      // } else if (data.name == 'two') {
      //   const a = await this.getDetail(
      //     this.commonData.data.userid,
      //     this.commonData.data.roleid
      //   )
      //   this.showPeoson = true
      //   this.skPersonData = a
      // }
    },
    // 水库信息编辑
    async edit(data) {
      switch (data) {
        case 'edit':
          console.log('编辑状态---')
          this.DataSK.type = 'update'
          this.activeNameBtn = true
          // this.ifdis = false
          break
        case 'save':
          this.$refs.skListComponent.$refs.formData.validate(async valid => {
            if (valid) {
              skListBarTypeOptions.forEach(d => {
                if (this.skData.matrl == d.label) {
                  this.skData.matrl = d.value
                }
              })
              const {msg, status, data} = await updateReservoirBaseInfo(this.skData)
              if (status) {
                this.activeNameBtn = false
                this.ifdis = true
                // 重新更改绘制market点
                const marker = []
                this.commonData.point.forEach((e, i, a) => {
                  if (e.pointRole == 'skPoint') {
                    if (this.skData.gid == e.gid) {
                      e.lng = this.skData.lng
                      e.lat = this.skData.lat
                      marker.push(e)
                    } else {
                      marker.push(e)
                    }
                  } else {
                    marker.push(e)
                  }
                })
                this.$emit('updateMarket', marker)
                this.btnText = '编辑'
                this.$notify.success({
                  title: '成功',
                  message: msg
                })
              } else {
                this.$notify.error({
                  title: '失败',
                  message: msg
                })
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
        case 'cancel':
          //  this.skData = {};
          //  this.show = false;
          //  await this.getData();
          this.activeNameBtn = false
          //  this.ifdis = true;
          break
      }
    }
  }
}
</script>
<style  lang='scss' scoped>
.skListMap {
 width: 100%;
 height: 7rem;
 overflow: auto;
 .root {
  flex: auto;
  display: flex;
  flex-direction: column;

  >>> .el-tabs__content {
   flex-grow: 1;
   overflow-y: scroll;
  }
 }
 >>> .el-tabs__item {
  height: 40px !important;
  line-height: 40px !important;
 }
 >>> .el-tabs__item.is-active {
  color: #29958b !important;
  background: transparent !important;
 }
 >>> .el-tabs__active-bar.is-top {
  width: 0.92rem !important;
 }
 >>> .el-tabs__nav {
  text-align: center;
 }
 .base {
  .btnactive {
   background: #29958b !important;
   color: #fff !important;
  }
  .btn {
   background: #fff;
   color: #29958b;
  }
 }
}
</style>
