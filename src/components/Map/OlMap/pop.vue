<template>
  <div class="aa">
    <div class="content">
      <div class="info">
        <div class="threedays">
          <el-row style="z-index:20">
            <el-col
              :span="24"
              style="text-align:right;margin:10px 0px -30px 0px;"
            >
              <el-button
                type="skbtn"
                plain
                size="mini"
                icon="el-icon-video-camera"
                @click="openVideo()"
              >视频连线</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <p>
                联系方式：<span class="num">{{ data.userPhone }}</span>
              </p></el-col>
          </el-row>
          <el-row>
            <el-col>
              <p>
                住址：{{ data.address == null ? "--" : data.address }}
              </p></el-col>
          </el-row>
          <el-row>
            <el-col>
              <p>关联水库：{{ data.reservoirName }}</p></el-col>
          </el-row>
          <el-row>
            <el-col>
              <p>
                当前位置：距离水库<span class="num">{{ data.distance4Sk }}</span>m
              </p></el-col>
          </el-row>
          <el-row style="text-align:left;padding-bottom: 10px;">
            <el-col :span="8">
              <p style="margin-top:10px">
                今日巡查情况：
              </p></el-col>
            <el-col :span="8">
              <p @click="dump('yh')">
                养护<span class="num">{{ data.todayMaintainNum }}</span>次，
              </p></el-col>
            <el-col :span="8">
              <p @click="dump('xc')">
                巡查<span class="num">{{ data.todayPatrolNum }}</span>次
              </p></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <map-dialog
      v-if="showdialog"
      :tab-name="tabName"
      :common-data="commonData"
      @updateMarket="point"
      @closeDialogMap="closeDialogMapData"
    />
  </div>
</template>
<script>
import {videoKey} from '@/api/base'
import {generateUUID} from '@/utils'
import mapDialog from '../../../views/shuiku/components/Dialog'
export default {
  components: {
    mapDialog
  },
  props: ['pointData', 'point'],
  data() {
    return {
      show: false,
      data: {},
      tabName: 'five',
      showdialog: false,
      form: {}
    }
  },
  watch: {
    pointData: {
      handler(newV, oldV) {
        this.data = newV
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.form = videoKey
  },
  methods: {

    // 视频连线
    openVideo() {
      this.form.channelId = this.data.userId
      this.form.userName = this.$store.state.user.name
      this.form.userId = JSON.stringify(this.$store.state.user.userId)
      const pam = {
        show: true,
        data: this.form
      }
      this.$emit('showVideoWebApp', pam)
      this.show = true
    },
    // 关闭综合面板
    closeDialogMapData(data) {
      this.showdialog = false
    },
    // 点击xc，yh弹出综合面板
    dump(type) {
      this.data.name = this.data.reservoirName
      this.data.rsnm = this.data.reservoirName
      this.data.rscd = this.data.gid

      this.data.roleid = this.data.roleId
      this.data.userid = this.data.userId
      this.commonData = {data: this.data, point: this.point, type: type}
      this.showdialog = true
    }
  }
}
</script>
<style scoped lang="scss" scoped>
.aa {
  width: 100%;
  position: relative;
  overflow: auto;
  .info {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    p {
      margin: 5px;
      vertical-align: middle;
    }
    span {
      text-decoration: underline;
    }
    .num {
      color: #00b2cd;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
