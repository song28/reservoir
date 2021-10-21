<template>
  <div class="skPop">
    <div class="content">
      <div class="info">
        <div class="threedays">
          <el-row style="line-height: 0.25rem; height: 0.25rem">
            <el-col :span="12">
              <p>
                <span class="titleTip">雨量</span>：
                <span v-if="data.todaydrp == null || data.todaywl == 'null'"
                  >暂无实时监测数据</span
                >
                <span v-else class="num"
                  >{{ Number(data.todaydrp).toFixed(2) }}mm</span
                >
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                <span class="titleTip">水位</span>：
                <span v-if="data.todaywl == null || data.todaywl == 'null'"
                  >暂无实时监测数据</span
                >
                <span v-else class="num"
                  >{{ Number(data.todaywl).toFixed(2) }}m</span
                >
              </p>
            </el-col>
          </el-row>
          <el-row style="clear: both">
            <el-col :span="3" style="text-align: left; width: 0.5rem">
              <p style="margin-top: 0.1rem">
                <span class="titleTip">渗流</span>：
              </p>
            </el-col>
            <el-col :span="19" style="text-align: left">
              <div v-if="shenliu.length" class="sl">
                <div
                  v-for="(item, index) in shenliu"
                  :key="index"
                  class="syitem"
                >
                  <p>
                    <span class="syTips">{{
                      item.stnm == null ? "--" : item.stnm
                    }}</span
                    >：
                    <span class="num">{{
                      item.stval == null
                        ? "--"
                        : Math.floor(item.stval * 100) / 100
                    }}</span
                    >cm³/s
                  </p>
                </div>
              </div>
              <div v-else>
                <p style="margin-top: 0.1rem">暂无实时监测数据</p>
              </div>
              <!-- {{ data.address == null ? "--" : data.address }} -->
            </el-col>
          </el-row>
          <el-row style="clear: both">
            <el-col :span="3" style="text-align: left; width: 0.5rem">
              <p><span class="titleTip">渗压</span>：</p>
            </el-col>
            <el-col :span="19" style="text-align: left">
              <div v-if="syList.length" class="sy">
                <div
                  v-for="(item, index) in syList"
                  :key="index"
                  class="syitem"
                >
                  <p class="syTips">
                    {{ item.stnm == null ? "--" : item.stnm }}
                  </p>
                  <p>
                    <span class="num">{{
                      item.stval == null
                        ? "--"
                        : Math.floor(item.stval * 100) / 100
                    }}</span
                    >kpa
                  </p>
                </div>
              </div>
              <div v-else class="sy">
                <p style="margin-top: 0.02rem">暂无实时监测数据</p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <div>
                <p>
                  行政责任人：{{
                    data.xzzrr_name == null ? "暂无信息" : data.xzzrr_name
                  }}{{
                    data.xzzrr_phone == null
                      ? "--"
                      : "(" + data.xzzrr_phone + ")"
                  }}
                </p>
                <p>
                  技术责任人：{{
                    data.jszrr_name == null ? "暂无信息" : data.jszrr_name
                  }}{{
                    data.jszrr_phone == null
                      ? "--"
                      : "(" + data.jszrr_phone + ")"
                  }}
                </p>
                <p>
                  巡查责任人：{{
                    data.xczrr_name == null ? "暂无信息" : data.xczrr_name
                  }}{{
                    data.xczrr_phone == null
                      ? "--"
                      : "(" + data.xczrr_phone + ")"
                  }}
                </p>
              </div>
            </el-col>
            <el-col :span="4">
              <el-popover
                v-model="visible"
                trigger="hover"
                placement="top"
                width="200"
                @after-enter="loadQrCode"
              >
                <div style="text-align: right; margin: 0">
                  <img :src="qrcode" width="100%;" />
                </div>
                <!---->
                <img
                  slot="reference"
                  :src="require('../../../assets/images/sk/map/qrcode.jpg')"
                  width="100%;"
                  style="cursor: pointer"
                />
              </el-popover>
            </el-col>
          </el-row>
        </div>
        <hr style="border: 1px solid #edf3f9" />
        <div class="sys">
          <span @click="clickDetail(1)">水雨情</span>
          <span @click="clickDetail(2)">大坝安全</span>
          <span class="skjc" @click="clickDetail(3, data)">水库监测</span>
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
import { generateUUID } from "@/utils";
import mapDialog from "../../../views/shuiku/components/Dialog";
import { getToken, getVerifyCode } from "@/utils/auth";
import { videoKey } from "@/api/base";
import { locationUrl } from "@/api/base";
import { getQrCodeByRscd } from "../../../views/shuiku/monitor/api.js";

export default {
  components: {
    mapDialog,
  },
  props: ["pointData", "point"],
  data() {
    return {
      showQrCode: false,
      qrcode: null,
      syList: [],
      shenliu: [],
      show: false,
      data: {},
      tabName: "third",
      showdialog: false,
      form: {},
    };
  },
  watch: {
    pointData: {
      handler: async function (newV, oldV) {
        this.data = newV;
        this.syList = newV.shenyaL == null ? [] : newV.shenyaL;
        this.shenliu = newV.shenliuL == null ? [] : newV.shenliuL;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.form = videoKey;
    this.loadQrCode();
  },
  methods: {
    // 加载二维码
    async loadQrCode() {
      const params = {
        rscd: this.pointData.rscd,
      };
      const { status, obj, msg } = await getQrCodeByRscd(params);
      if (status == 200) {
        this.qrcode = obj;
      } else {
        this.$GXprompt.notify.error(msg);
      }
    },
    // 视频连线
    openVideo() {
      this.form.channelId = this.data.userId;
      this.form.userName = this.$store.state.user.name;
      this.form.userId = JSON.stringify(this.$store.state.user.userId);
      const pam = {
        show: true,
        data: this.form,
      };
      this.$emit("showVideoWebApp", pam);
      this.show = true;
    },
    // 关闭综合面板
    closeDialogMapData(data) {
      this.showdialog = false;
    },
    clickDetail(data, info) {
      if (data == "3") {
        // 获取token值
        const token = encodeURIComponent(
          window.sessionStorage.getItem("xtoken")
        );
        const userInfo = encodeURIComponent(
          window.sessionStorage.getItem("userInfo")
        );
        const rsInfo = JSON.stringify(info);
        const getVerifyCode1 = getVerifyCode();
        window.open(
          locationUrl +
            "/#/login/?token=" +
            // "http://192.168.1.110:8008/#/login/?token=" +
            token +
            "&userInfo=" +
            userInfo +
            "&rsInfo=" +
            rsInfo +
            "&getVerifyCode=" +
            getVerifyCode1
        );
      } else {
        this.$emit("backskData", data);
      }
    },
    // 点击xc，yh弹出综合面板
    dump(type) {
      this.data.name = this.data.reservoirName;
      this.data.roleid = this.data.roleId;
      this.data.userid = this.data.userId;
      this.commonData = { data: this.data, point: this.point, type: type };
      this.showdialog = true;
    },
  },
};
</script>
<style scoped lang="scss">
.skPop {
  width: 100%;
  position: relative;
  overflow: auto;
  .content {
    padding: 0.1rem 0 0 0;
  }
  //  >>>.el-row{
  //    line-height: 0.25rem;
  //    height: 0.25rem;
  //  }
  .el-col-12 {
    height: auto;
  }
  .threedays {
    // height: 100%;
    // width: 100%%;
    // clear: both;
  }
  .info {
    height: 100%;
    width: 90%;
    margin: 0 auto;

    .titleTip {
      padding-top: 0.2rem;
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
    .sl {
      display: flex;
      flex-wrap: wrap;
      .syTips {
        margin-left: 0.1rem;
        text-align: left !important;
        font-size: 0.1rem;
      }
      .syitem {
        width: 50%;
      }
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
