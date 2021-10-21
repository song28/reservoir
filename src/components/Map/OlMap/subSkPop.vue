<template>
  <div class="skPop">
    <div class="content">
      <div class="info">
        <div class="threedays">
          <el-row>
            <el-col :span="24">
              <p>
                <span class="titleTip">测站名称</span>：
                <span v-if="data.stnm == null">暂无</span>
                <span v-else class="num">{{ data.stnm }}</span>
              </p>
            </el-col>
          </el-row>
        </div>
        <hr style="border: 1px solid #edf3f9">
        <div class="sys">
          <span @click="clickDetail(1)" class="skjc" >更多>></span>
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
import {getToken, getVerifyCode} from '@/utils/auth'

export default {
  components: {
    mapDialog
  },
  props: ['pointData', 'point'],
  data() {
    return {
      syList: [1, 2, 3],
      show: false,
      data: {},
      tabName: 'third',
      showdialog: false,
      form: {}
    }
  },
  watch: {
    pointData: {
      handler(newV, oldV) {
        console.log(newV, '水库数据POP')
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
    clickDetail(data, info) {
      console.log(data, '详情', info, 'info')
      if (data == '3') {
        // 获取token值
        const token = encodeURIComponent(window.sessionStorage.getItem('xtoken'))
        const userInfo = encodeURIComponent(window.sessionStorage.getItem('userInfo'))
        const rsInfo = JSON.stringify(info)
        const getVerifyCode1 = getVerifyCode()
        console.log(getVerifyCode(), 'getVerifyCode()')
        window.open(
          // "http://192.168.1.110:18082/#/login/?token=" +
          'http://192.168.1.110:8008/#/login/?token=' +
            token +
            '&userInfo=' +
            userInfo +
            '&rsInfo=' +
            rsInfo +
            '&getVerifyCode=' +
            getVerifyCode1
        )
      } else {
        this.$emit('backskData', data)
      }
      console.log(data, '详情')
    },
    // 点击xc，yh弹出综合面板
    dump(type) {
      this.data.name = this.data.reservoirName
      this.data.roleid = this.data.roleId
      this.data.userid = this.data.userId
      this.commonData = {data: this.data, point: this.point, type: type}
      this.showdialog = true
    }
  }
}
</script>
<style scoped lang="scss">
.skPop {
  width: 100%;
  position: relative;
  overflow: auto;
  .info {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    .titleTip {
      font-weight: bold;
      color: #000;
    }
    p {
      margin: 2px;
      vertical-align: middle;
    }
    .num {
      color: #00b2cd;
      font-weight: bold;
      font-size: 0.2rem;
      cursor: pointer;
    }
    .sy {
      display: flex;
      flex-wrap: wrap;
      .syTips {
        margin-left: 0.1rem;
        text-align: left !important;
        font-size: 0.1rem;
      }
      .syitem {
        width: 33.33%;
      }
    }
    .sys {
      display: flex;
      width: 100%;
      margin: 0.1rem;
      justify-content: flex-end;
      span {
        cursor: pointer;
        padding: 0 0.1rem;
      }
      .skjc {
        color: #00b2cd;
      }
    }
  }
}
</style>
