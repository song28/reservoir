<template>
  <div class="dialogMap">
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :append-to-body="true"
      @close="closeDialog"
    >
      <div slot="title" class="horn">
        <div class="lefts">
          <div class="titleBig" style="color: #fff; font-size: 16px">
            {{ commonData.data.rsnm ==null ? "水库详情" :commonData.data.rsnm==''?'水库详情':commonData.data.rsnm }}
          </div>
        </div>
      </div>
      <div class="dialog-body">
        <div class="Diacon">
          <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="first">
              <div v-if="activeName == 'first'" class="el_tab_content">
                <BasicData :common-data="commonData" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="智能感知" name="second">
              <div v-if="activeName == 'second'" class="el_tab_content">
                <IntelligentPerception
                  :common-data="commonData"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="视频监控" name="third">
              <div v-if="activeName == 'third'" class="el_tab_content">
                <VideoImage :video-data="videoData"/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="预警信息" name="four">
              <div v-if="activeName == 'four'" class="el_tab_content">
                <Warning :common-data="commonData" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="巡查养护" name="five">
              <div v-if="activeName == 'five'" class="el_tab_content">
                <XuncYh :common-data="commonData" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="上报数据" name="six">
              <div v-if="activeName == 'six'" class="el_tab_content">
                <Report :common-data="commonData" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="档案资料" name="senven">
              <div v-if="activeName == 'senven'" class="el_tab_content">
                <ArchivalData :data="DataSK" :rscd="rscd" />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import XuncYh from './xuncYh' // 巡查养护
import VideoImage from './videoImage'// 视频监控
import BasicData from './subComponments/basicData' // 基础信息
import Warning from './warning'// 预警信息
import Report from './report' // 上报数据
import IntelligentPerception from './IntelligentPerception'// 智能感知
import ArchivalData from '../reservoirManagement/common/archivalData' // 档案资料
import {list4Page} from './api'

export default {
  components: {
    BasicData,
    XuncYh,
    VideoImage,
    Warning,
    ArchivalData,
    Report,
    IntelligentPerception
  },
  /**
   * commonData {
   *       data:  {rscd:'',rsnm:''}, 水库id,水库名称，水库名称name
   *       type:'xc'               xc/yh 巡查养护
   * }
   */
  props: ['tabName', 'commonData'],
  data() {
    return {
      DataSK: {
        // 弹框配置
        title: null, // 弹框标题
        type: null, // 操作add添加，update修改,detail查看
        data: {}, // 数据
        pageType: 'skList' // 页面类型
      },
      rscd: null,
      videoData: {data: []},
      activeName: 'second',
      dialogVisible: true
    }
  },
  watch: {
    activeName: {
      handler(newV, oldV) {
        if (newV == 'third') {
          this.getpointlist(
            {
              addvcd: this.$store.state.user.addvcd,
              rscd: this.rscd,
              page: 1,
              size: 20
            },
            2
          )
        } else if (newV == 'senven') {
          this.DataSK.data.rscd = this.rscd
        }
      },
      deep: true,
      immediate: true
    },
    tabName: {
      handler(newV, oldV) {
        this.activeName = newV
      },
      deep: true,
      immediate: true
    },
    commonData: {
      handler(newV, oldV) {
        this.rscd = newV.data.rscd
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // 获得表格数据
    async getpointlist(pam, ifInit) {
      this.tableLoading = true
      this.tableData = []
      try {
        const {msg, data, status, total} = await list4Page(pam)
        if (status == 200) {
          this.tableData = data
          this.videoData.data = []
          if (ifInit === 1) {
          } else {
            this.videoData.data = data
            console.log(this.videoData.data, '表格数据')
          }
          this.total = total
          this.tableLoading = false
        } else {
          this.$notify.error({
            title: '失败',
            message: msg
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 切换
    handleClick(tab) {
      this.activeName = tab.name
    },
    // 关闭弹框的事件
    closeDialog() {
      this.$emit('closeDialogMap', false)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.dialogMap {
  .Diacon {
    width: 100%;
    height: 100%;
  }
}
>>> .el-dialog {
  width: 100%;
  height: 7.6rem;
}
>>> .el-tabs {
  width: 100%;
  .el_tab_content {
    width: 100%;
    height: 7rem;
  }
}
//背景颜色
>>> .el-tabs--left .el-tabs__header.is-left {
  background: #f4fbf5 !important;
}
//左边距离
>>> .el-tabs__nav-scroll {
  padding-left: 0px !important;
}
>>> .el-tabs--left,
.el-tabs--right {
  height: 7rem;
}
>>> .el-tabs__item {
  width: 120px;
  height: 80px;
  line-height: 80px;
}
>>> .el-dialog .el-dialog__body {
  padding: 0 0.4rem 0.15rem 0 !important;
}
>>> .el-tabs__item.is-active {
  color: #29958b !important;
  background: #c8faf5;
}
>>> .el-tabs__active-bar {
  background: #29958b !important;
}
>>> .el-tabs__item:hover {
  color: #29958b;
  cursor: pointer;
}
>>> .el-icon-close:before {
  content: "\E6DB";
  color: #fff;
}
.centers {
  position: absolute;
  right: 39px;
  top: 15px !important;
  width: 18px !important;
  height: 15px !important;
  /* top: 14px; */
  img {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
