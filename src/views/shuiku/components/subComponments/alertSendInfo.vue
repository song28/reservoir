<template>
  <div class="warn" style="width: 100%">
    <!--  -->
    <span v-if="showBack" style="color:#29958b;font-weight: bold;" @click="back">＞＞返回</span>
    <div>
      <el-button
        type="skbtn"
        icon="el-icon-edit-outline"
        plain
        size="mini"
        style="position:absolute;right:3.2rem;top:0.9rem"
        @click.stop="edit('edit')"
      >选择模板</el-button>
    </div>
    <el-form ref="form" :model="form" size="small" style>
      <el-form-item label="预警发布等级：" class>
        <el-radio-group v-model="form.warnLevel">
          <el-radio id="blueWarn" label="C1">蓝色预警</el-radio>
          <el-radio id="yellowWarn" label="C2">黄色预警</el-radio>
          <el-radio id="orangeWarn" label="C3">橙色预警</el-radio>
          <el-radio id="redWarn" label="C4">红色预警</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预警发布内容：">
        <el-input
          v-model="form.warnPublishContent"
          type="textarea"
          style="border: none; border-radius: 2px; background: #eef4fa"
          rows="4"
        />
      </el-form-item>
      <el-form-item label="预警发布通道：">
        <el-checkbox-group v-model="release">
          <el-checkbox label="短信预警" />
          <el-checkbox label="本地喇叭预警" />
          <el-checkbox label="LED预警" />
          <el-checkbox label="入户报警器预警" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addDiy()">添加自定义对象</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addtem()">添加临时接收对象</el-button>
      </el-form-item>
      <el-form-item>
        <div class="table-list mt-18">
          <el-tabs type="card" style="width: 100%">
            <el-tab-pane v-if="msgwarn" label="接收人">
              <el-table
                ref="tableList"
                :data="tableDataOfPerson"
                border
                style="width: 100%; margin-left: 0px"
                :header-cell-style="{ background: '#D6E7F4', color: '#999999' }"
                :height="tableHeight"
                @selection-change="handleSelectionPerson"
              >
                <el-table-column type="selection" width="40" />
                <el-table-column label="姓名" align="center" prop="jcca05a020" />
                <el-table-column label="电话" align="center" prop="jcca05a070" />
                <el-table-column label="职责" align="center" prop="jcca05a050" />
                <el-table-column label="职务" align="center" prop="jcca05a090" />
                <el-table-column
                  label="单位名称"
                  :show-overflow-tooltip="true"
                  align="center"
                  prop="organization"
                />
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="broadcast" label="本地喇叭">
              <el-table
                ref="tableList1"
                :data="radioList"
                border
                style="width: 100%; margin-left: 0px"
                :height="tableHeight"
                :header-cell-style="{ background: '#D6E7F4', color: '#999999' }"
                @selection-change="handleSelectionRadio"
              >
                <el-table-column type="selection" width="40" />
                <el-table-column label="设备编号" align="center" prop="cusno" />
                <el-table-column label="设备名称" align="center" prop="name" :show-overflow-tooltip="true" />
                <el-table-column label="设备类型" align="center" prop="typeName" />
                <el-table-column label="在线状态" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.online == 't'" style="color: green">在线</div>
                    <div v-else>离线</div>
                  </template>
                </el-table-column>
                <el-table-column label="安装地址" align="center" prop="address" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="LED" label="LED">
              <el-table
                ref="tableList2"
                :data="ledList"
                border
                style="width: 100%; margin-left: 0px"
                :height="tableHeight"
                :header-cell-style="{ background: '#D6E7F4', color: '#999999' }"
                @selection-change="handleSelectionLed"
              >
                >
                <el-table-column type="selection" width="40" />
                <el-table-column label="设备编号" align="center" prop="cusno" />
                <el-table-column label="设备名称" align="center" prop="name" :show-overflow-tooltip="true" />
                <el-table-column label="设备类型" align="center" prop="typeName" />
                <el-table-column label="在线状态" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.online == 't'" style="color: green">在线</div>
                    <div v-else>离线</div>
                  </template>
                </el-table-column>
                <el-table-column label="安装地址" align="center" prop="address" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="rhbjq" label="入户报警器">
              <el-table
                ref="tableList3"
                :data="gbList"
                border
                style="width: 100%; margin-left: 0px"
                :height="tableHeight"
                :header-cell-style="{ background: '#D6E7F4', color: '#999999' }"
                @selection-change="handleSelectionRhbjq"
              >
                >
                <el-table-column type="selection" width="40" />
                <el-table-column label="设备编号" align="center" prop="cusno" />
                <el-table-column label="设备名称" align="center" prop="name" :show-overflow-tooltip="true" />
                <el-table-column label="设备类型" align="center" prop="typeName" />
                <el-table-column label="在线状态" align="center">
                  <template slot-scope="scope">
                    <div v-if="scope.row.online == 't'" style="color: green">在线</div>
                    <div v-else>离线</div>
                  </template>
                </el-table-column>
                <el-table-column label="安装地址" align="center" prop="address" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="fr"
          style="margin-top: 0px"
          type="primary"
          size="mini"
          @click="postSaveHandle()"
        >发送</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加自定义对象弹窗 -->
    <el-dialog
      v-dialogDrag
      title="添加自定义对象"
      :visible.sync="diyDilog"
      :modal="false"
      :modal-append-to-body="false"
      width="50%"
      :close-on-click-modal="false"
    >
      <div v-if="diyDilog" class="table-list diyDialog">
        <el-form ref="formDiy" :model="formDiy" label-width="100px" class="demo-form-inline mt-18">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓　　名：">
                <el-input v-model="formDiy.jcca05a020" class="0" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电　　话：">
                <el-input v-model="formDiy.jcca05a070" class size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="职　　责：">
                <el-input v-model="formDiy.jcca05a050" class size="mini" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职　　务：">
                <el-input v-model="formDiy.jcca05a090" class size="mini" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="单位名称：">
                <el-input v-model="formDiy.organization" class size="mini" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="diyDilog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addRow()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加自定义对象弹窗 -->
    <el-dialog
      v-dialogDrag
      title="添加临时接收对象"
      :visible.sync="temporaryDialog"
      :modal="false"
      :modal-append-to-body="false"
      width="60%"
      :close-on-click-modal="false"
    >
      <div v-if="temporaryDialog" class="table-list mt-18 pl-20 diyDialog">
        <!-- :height="total < 1 ? tableHeight + 45 : tableHeight" -->
        <el-table
          :data="userInfoData"
          style="width: calc(100% - 3px); border: 1px solid rgba(234, 231, 237, 1)"
          height="400px"
          :header-cell-style="{
            background: 'rgba(238,244,250,1)',
            color: '#999999',
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" align="center" width="50">
            <template slot-scope="scope">
              <span>
                {{
                  (listQuery.pageNo - 1) * listQuery.pageSize + (scope.$index + 1)
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="center" prop="jcca05a020" :show-overflow-tooltip="true" />
          <el-table-column
            label="电话"
            width="120"
            align="center"
            prop="jcca05a070"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="职责" align="center" prop="jcca05a050" :show-overflow-tooltip="true" />
          <el-table-column label="职务" align="center" prop="jcca05a060" :show-overflow-tooltip="true" />
          <el-table-column
            label="单位名称"
            :show-overflow-tooltip="true"
            align="center"
            prop="organization"
          />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="temporaryDialog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addtemporaryRow()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getReceiver,
  getWarnPublishDeviceList,
  getAdreesBook,
  saveHandleInfo,
  previewMsg
} from '../api'
export default {
  components: {},
  props: ['data', 'commonData', 'warnListRowData', 'isfullscreen', 'dataMethod'],
  data() {
    return {
      showBack: false,
      diyDilog: false,
      temporaryDialog: false,
      activeName: 'first',
      listQuery: {
        pageNo: 1,
        pageSize: 20
      },
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 450,
      release: ['短信预警'],
      form: {
        deviceList: [], // 设备列表
        jcca20a10: '', // 预警信息的ID
        led: false,
        radio: false,
        rhbj: false,
        sms: false,
        smsRecords: [], // 预警接收人集合
        warnDesc: '', // 预警描述
        warnLevel: 'C1', // 预警等级
        warnPublishContent: '', // 预警发布内容
        rhbjq: false // 入户报警器
      },
      total: 4,
      tableData: [
        {
          hidden_point_name: '诺江镇赵村5组刘家岩滑坡',
          content:
      '东川区铜广箐发生预警，(铜广箐雨量站1)截至[2020-08-26 08:10]累计1小时降雨71.5毫米，超过预警指标（66.0毫米），立即转移',
          jcca20a030: '1',
          alarmtype: '2',
          warnsource: '1',
          jcca20a040: '2020-09-01 10:00:00',
          warn_handle_user: '',
          warn_status: '1'
        },
        {
          hidden_point_name: '诺江镇赵村5组刘家岩滑坡',
          content:
      '东川区铜广箐发生预警，(铜广箐雨量站1)截至[2020-08-26 08:10]累计1小时降雨71.5毫米，超过预警指标（66.0毫米），立即转移',
          jcca20a030: '2',
          alarmtype: '2',
          warnsource: '1',
          jcca20a040: '2020-08-31 10:00:00',
          warn_handle_user: '王明',
          warn_status: '2'
        },
        {
          hidden_point_name: '诺江镇赵村5组刘家岩滑坡',
          content:
      '东川区铜广箐发生预警，(铜广箐雨量站1)截至[2020-08-26 08:10]累计1小时降雨71.5毫米，超过预警指标（66.0毫米），立即转移',
          jcca20a030: '3',
          alarmtype: '1',
          warnsource: '1',
          jcca20a040: '2020-08-31 10:00:00',
          warn_handle_user: '王明',
          warn_status: '2'
        },
        {
          hidden_point_name: '诺江镇赵村5组刘家岩滑坡',
          content:
      '东川区铜广箐发生预警，(铜广箐雨量站1)截至[2020-08-26 08:10]累计1小时降雨71.5毫米，超过预警指标（66.0毫米），立即转移',
          jcca20a030: '4',
          alarmtype: '1',
          warnsource: '1',
          jcca20a040: '2020-08-31 10:00:00',
          warn_handle_user: '王明',
          warn_status: '2'
        }
      ],
      tableDataOfPerson: [
        // { jcca05a030: '刘以达', jcca05a080: '13054621555', jcca05a050: '监测员', jcca05a060: '村长', jcca05a016: '诺江镇' },
        // { jcca05a030: '刘以达', jcca05a080: '13054621555', jcca05a050: '监测员', jcca05a060: '村长', jcca05a016: '诺江镇' },
        // { jcca05a030: '刘以达', jcca05a080: '13054621555', jcca05a050: '监测员', jcca05a060: '村长', jcca05a016: '诺江镇' }
      ],
      tableDataOfDevice: [],
      radio: '1',
      horn: true,
      LED: '',
      gb: '',
      rhbjq: '',
      msgwarn: '',
      broadcast: '',
      formDiy: {
        jcca05a020: '', // 姓名
        jcca05a080: '', // 电话
        jcca05a070: '', // 电话
        jcca05a050: '', // 职责
        jcca05a090: '', // 职务
        organization: '' // 行政区域
      },
      formTemporary: {
        jcca05a020: '', // 姓名
        jcca05a080: '', // 电话
        jcca05a070: '', // 电话
        jcca05a050: '', // 职责
        jcca05a090: '', // 职务
        organization: '' // 行政区域
      },
      userInfoData: [],
      temselectList: [],
      radioList: [],
      ledList: [],
      radioIdList: [],
      ledIdList: [],
      gbList: [],
      rhbjqList: []
    }
  },
  watch: {
    dataMethod: {
      handler(val) {
                          console.log(val, '传过去的值')

        if (val.method === 'clickdetail') {
          this.showBack = true

        } else {
          this.showBack = false
        }
      },
      immediate: true,
      deep: true
    },
    release: {
      handler(val) {
        debugger
        this.msgwarn = ''
        this.broadcast = ''
        this.LED = ''
        this.rhbjq = ''
        this.showdevices(val)
      },
      deep: true
    },
    isfullscreen: {
      handler(val) {
        if (val == true) {
          this.tableHeight =
      window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 300
        } else if (val == false) {
          this.tableHeight =
      window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 400
        }
      }
    },
    'form.warnLevel': {
      handler(val) {
        if (this.warnListRowData) {
          if (this.warnListRowData.warn_source == 3) {
            this.form.warnPublishContent = this.warnListRowData.warn_content
          } else {
            this.getPreviewMsg(this.warnListRowData, val)
          }

          // this.getPreviewMsg(this.warnListRowData, val);
          this.queryReceiver(this.warnListRowData.jcca20a055, val)
          this.queryWarnPublishDeviceList(this.warnListRowData.jcca20a055, val)
        } else {
          if (this.data.warn_source == 3) {
            this.form.warnPublishContent = this.data.warn_content
          } else {
            this.getPreviewMsg(this.data, val)
          }
          // this.getPreviewMsg(this.data, val);
          this.queryReceiver(this.data.jcca20a055, val)
          this.queryWarnPublishDeviceList(this.data.jcca20a055, val)
        }
      }
    },
    msgwarn: {
      handler(val) {
        if (val != '短信预警') {
          this.smsRecords = []
          this.form.smsRecords = []
        }
      }
    },
    broadcast: {
      handler(val) {
        if (val != '本地喇叭预警') {
          this.radioIdList = []
        }
      }
    },
    LED: {
      handler(val) {
        if (val != 'LED预警') {
          this.ledIdList = []
        }
      }
    },
    rhbjq: {
      handler(val) {
        if (val != '入户报警器预警') {
          this.rhbjqList = []
        }
      }
    }
  },
  created() {
    if (this.warnListRowData) {
      if (this.warnListRowData.warn_source == 3) {
        this.form.warnPublishContent = this.warnListRowData.warn_content
      } else {
        this.getPreviewMsg(this.warnListRowData, this.form.warnLevel)
      }
      this.form.jcca20a10 = this.warnListRowData.jcca20a010 // 预警id
      this.form.warnLevel = this.warnListRowData.jcca20a020

      this.queryReceiver(
        this.warnListRowData.jcca20a055,
        this.warnListRowData.jcca20a020
      )
      this.queryWarnPublishDeviceList(
        this.warnListRowData.jcca20a055,
        this.warnListRowData.jcca20a020
      )
    } else {
      if (this.data.warn_source == 3) {
        this.form.warnPublishContent = this.data.warn_content
      } else {
        this.getPreviewMsg(this.data, this.form.warnLevel)
      }
      this.form.jcca20a10 = this.data.jcca20a010 // 预警id
      this.form.warnLevel = this.data.jcca20a020

      this.queryReceiver(this.data.jcca20a055, this.data.jcca20a020)
      this.queryWarnPublishDeviceList(this.data.jcca20a055, this.data.jcca20a020)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.showdevices(this.release)
    })
    this.handleFull(this.isfullscreen)
  },
  methods: {
    handleClick() {
      // 切换tab
    },
    getList() {
      // 获取预警信息列表
    },
    add() {},
    addDiy() {
      this.diyDilog = true
      this.formDiy = {
        jcca05a020: '', // 姓名
        jcca05a080: '', // 电话
        jcca05a070: '', // 电话
        jcca05a050: '', // 职责
        jcca05a090: '', // 职务
        organization: '' // 行政区域
      }
    },
    // 发送
    postSaveHandle() {
      debugger
      const params = this.form
      switch (true) {
        case params.warnLevel == 'C1':
          params.warnLevel = 1
          break
        case params.warnLevel == 'C2':
          params.warnLevel = 2
          break
        case params.warnLevel == 'C3':
          params.warnLevel = 3
          break
        case params.warnLevel == 'C4':
          params.warnLevel = 4
          break
      }
      // a.push.apply(a,b);
      params.deviceList = []
      if (this.ledIdList.length == 0) {
        params.led = false
      }
      if (this.rhbjqList.length == 0) {
      }
      if (this.radioIdList.length == 0) {
        params.radio = false
      }
      this.radioIdList.forEach(d => {
        this.ledIdList.push(d)
      })
      this.rhbjqList.forEach(d => {
        this.ledIdList.push(d)
      })
      params.deviceList = this.ledIdList
      if (this.form.deviceList.length <= 0 && this.form.smsRecords.length <= 0) {
        this.$GXprompt.notify.error('请选择短信接收人或设备')
        return
      }
      saveHandleInfo(params).then(res => {
        if (res) {
          if (res.data) {
            this.$GXprompt.notify.success('发送成功')
            this.$emit('funcStatus', '发送成功')
          } else {
            this.$GXprompt.notify.error('发送失败')
          }
        }
      })
    },
    handelWarn(data) {
      this.$emit('handelWarn', data)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 隐患点下的预警接收人查询接口
    queryReceiver(hdpCode, level) {
      const params = {
        hdpCode: hdpCode,
        level: level
      }
      // if (this.warnListRowData) {
      //   debugger;
      //   params.hdpCode = this.warnListRowData.jcca20a055;
      //   params.level = this.warnListRowData.jcca20a020;
      // } else {
      //   params.hdpCode = this.warnListRowData.jcca20a055;
      //   params.level = this.warnListRowData.jcca20a020;
      // }
      const self = this
      getReceiver(params).then(res => {
        if (res) {
          if (res.data.length > 0) {
            self.$nextTick(function() {
              res.data.forEach(row => {
                if (row.level) {
                  // 根据回显数据选中选择框
                  self.$refs.tableList.toggleRowSelection(row)
                }
              })
              self.pageshow = true
            })
          }
          self.tableDataOfPerson = res.data ? res.data : []
        }
      })
    },
    // 添加临时接收对象
    addtem() {
      this.temporaryDialog = true
      this.queryAdreesBook()
    },
    // 添加临时接收对象接查询通讯录
    queryAdreesBook() {
      const params = {}
      if (this.warnListRowData) {
        params.hdpId = this.warnListRowData.jcca20a055
      } else {
        params.hdpId = this.commonData.hpId
      }
      const self = this
      getAdreesBook(params).then(res => {
        if (res) {
          self.userInfoData = res.data ? res.data : []
        }
      })
    },
    // 选中的发送人员
    handleSelectionPerson(val) {
      this.form.smsRecords = []
      val.forEach(d => {
        d.duty = d.jcca05a050 //	string职责
        // d.jcca20aSendId = d ;//预警发送记录ID
        d.organ = d.organization // 单位名称
        d.post = d.jcca05a060 // 职务
        d.receiverName = d.jcca05a020 // 预警接收人名字
        d.receiverPhone = d.jcca05a070 // 预警接收人电话
        this.form.smsRecords.push({
          duty: d.duty,
          organ: d.organ,
          post: d.post,
          receiverName: d.receiverName,
          receiverPhone: d.receiverPhone
        })
      })
      // this.form.smsRecords = val;
    },
    // 选中的设备列表
    handleSelectionRadio(val) {
      this.radioIdList = []
      val.forEach(d => {
        this.radioIdList.push(d.id)
      })
    },
    // 选中的led列表

    // handleSelectionChange
    handleSelectionChange(val) {
      this.temselectList = val
    },
    handleSelectionLed(val) {
      this.ledIdList = []
      val.forEach(d => {
        this.ledIdList.push(d.id)
      })
    },
    handleSelectionRhbjq(val) {
      this.rhbjqList = []
      val.forEach(d => {
        this.rhbjqList.push(d.id)
      })
    },
    // 隐患点下的预警接收设备查询接口
    queryWarnPublishDeviceList(hdpCode, level) {
      const params = {
        hdpCode: hdpCode,
        level: level
        // hdpCode: this.commonData.hpId
      }
      // if (this.warnListRowData) {
      //   params.hdpCode = this.warnListRowData.jcca20a055;
      // } else {
      //   params.hdpCode = this.commonData.hpId;
      // }
      getWarnPublishDeviceList(params).then(res => {
        if (res) {
          this.radioList = []
          this.ledList = []
          this.gbList = []
          if (res.data) {
            this.tableDataOfDevice = res.data
            res.data.forEach(d => {
              if (d.icon == 'gb') {
                this.radioList.push(d)
              } else if (d.icon == 'led') {
                this.ledList.push(d)
              } else if (d.icon == 'dc-gb') {
                this.gbList.push(d)
              }
            })
          }
        }
      })
    },
    // 显示短信预警、本地喇叭、led预警
    showdevices(val) {
      debugger
      val.forEach(d => {
        if (d == '短信预警') {
          this.msgwarn = '短信预警'
          this.form.sms = true
        } else if (d == '本地喇叭预警') {
          this.broadcast = '本地喇叭预警'
          this.form.radio = true
        } else if (d == 'LED预警') {
          this.LED = 'LED预警'
          this.form.led = true
        } else if (d == '入户报警器预警') {
          this.rhbjq = '入户报警器预警'
          this.form.rhbj = true
        }
      })
    },
    // 添加自定义接收对象到接收人
    addRow() {
      var index = this.tableDataOfPerson.slice(-1).index + 1
      var list = {
        id: '',
        jcca05a020: this.formDiy.jcca05a020,
        jcca05a080: this.formDiy.jcca05a080,
        jcca05a070: this.formDiy.jcca05a070,
        jcca05a050: this.formDiy.jcca05a050,
        jcca05a090: this.formDiy.jcca05a090,
        organization: this.formDiy.organization,
        index: index
      }
      let isAdd = true
      if (this.tableDataOfPerson.length > 0) {
        this.tableDataOfPerson.forEach(d => {
          if (
            d.jcca05a020 == this.formDiy.jcca05a020 &&
      d.jcca05a070 == this.formDiy.jcca05a070
          ) {
            this.$GXprompt.notify.error('此用户已存在')
            isAdd = false
            return false
          }
        })
      }
      if (isAdd) {
        this.tableDataOfPerson.push(list)
      }
      this.diyDilog = false
    },
    // 添加临时接收对象到接收人
    addtemporaryRow() {
      this.temporaryDialog = false
      if (this.temselectList.length > 0) {
        this.temselectList.forEach(d => {
          this.tableDataOfPerson.push(d)
        })
      }
    },
    formatWarnLevel(level) {
      if (!level) {
        return '--'
      }
      if (level == 'C1') {
        return '注意级'
      } else if (level == 'C2') {
        return '警示级'
      } else if (level == 'C3') {
        return '警戒级'
      } else if (level == 'C4') {
        return '警报级'
      } else if (level == '1') {
        return '蓝色预警'
      } else if (level == '2') {
        return '黄色预警'
      } else if (level == '3') {
        return '橙色预警'
      } else if (level == '4') {
        return '红色预警'
      }
    },
    formatWarnLevel1(level) {
      if (!level) {
        return '--'
      }
      if (level == 'C1') {
        return '注意级'
      } else if (level == 'C2') {
        return '警示级'
      } else if (level == 'C3') {
        return '警戒级'
      } else if (level == 'C4') {
        return '警报级'
      } else if (level == '1') {
        return '注意级'
      } else if (level == '2') {
        return '警示级'
      } else if (level == '3') {
        return '警戒级'
      } else if (level == '4') {
        return '警报级'
      }
    },
    handleFull(val) {
      let h = '7.38rem'
      if (val == true) {
        h = $('.monitoring-custom-dialog .dialog-body .el-tabs').height()
        $('.monitoring-custom-dialog .dialog-body .el-tabs .el_tab_content').css({
          height: h + 'px'
        })
        this.tableHeight =
     window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 280
      } else if (val == false) {
        $('.monitoring-custom-dialog .dialog-body .el-tabs .el_tab_content').css({
          height: h
        })
        this.tableHeight =
     window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 450
      }
    },
    getPreviewMsg(item, level) {
      const params = {
        cratetime: '',
        crateuser: 'string',
        id: item.id,
        level: level,
        templecontenxt: '',
        templename: '',
        warnId: item.jcca20a010
        // def:1,
      }

      previewMsg(params).then(res => {
        if (res.status) {
          this.form.warnPublishContent = res.data ? res.data : '--'
        } else {
          // this.$GXprompt.notify.error("预览失败");
        }
      })
    },
    back() {
      this.$emit('backAlertData', true)
    }
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
// @import "~@/assets/css/base.css";
.mt-30 {
 margin-top: 30px;
}
.warn {
 width: 100%;
 height: 100%;
 padding: 0;
 .el-dialog__footer {
  border: 1px solid #dcdfe6;
  padding-top: 20px;
 }
}
$primary-color: #0072c0;
$white: #fff;
$tabBgColor: #5e94d2;
$tabColor: #606266;
$tabActiveBgColor: #5e94d2;
$tabColor: #606266;
.qq {
 width: 89px;
 height: 14px;
 font-size: 14px;
 font-family: Microsoft YaHei;
 font-weight: bold;
 color: $primary-color;
}
.el-form .el-form-item .el-form-item__label {
 color: $primary-color;
 font-weight: bold;
}
.el-radio__input.is-checked + .el-radio__label {
 color: $primary-color;
}
.el-radio__input.is-checked .el-radio__inner {
 border-color: $primary-color;
 background: $primary-color;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
 background-color: $primary-color;
 border-color: $primary-color;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
 color: $primary-color;
}
.el-button--primary {
 color: #fff;
 background-color: $primary-color;
 border-color: $primary-color;
}
.el-tabs--card > .el-tabs__header {
 border-bottom: 0px solid #dfe4ed;
}

.table-list {
 .el-tabs--card > .el-tabs__header .el-tabs__nav .el-tabs__item.is-active {
  /* width: 157px; */
  height: 32px;
  background: $primary-color;
  color: $primary-color;
  /* border: 1px solid #f00; */
 }

 .el-tabs--card > .el-tabs__header .el-tabs__nav .el-tabs__item {
  -webkit-box-flex: 0%;
  -ms-flex: 0% 0 0px;
  flex: 0% 0 0 !important;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #f0f7ff;
  border: 1px solid #80befd;
  border-radius: 2px 0px 0px 2px;
  color: $primary-color;
  margin-left: -1px;
 }

 .el-tabs--card
  > .el-tabs__header
  .el-tabs__nav
  .el-tabs__item.is-active::before {
  content: "";
  // height: 2px;
  height: 0 !important;
  width: 100%;
  // background-color:$primary-color;
  background-color: none !important;
  position: absolute;
  bottom: 0;
  left: 0;
 }
 .el-tabs--card
  > .el-tabs__header
  .el-tabs__nav
  .el-tabs__item.is-active::after {
  content: "";
  width: 0;
  height: 0;
  // border: 4px solid;
  border: 0 !important;
  position: absolute;
  bottom: -8px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  // border-color:$primary-color transparent transparent;
  border-color: none !important;
 }
 .el-tabs--card > .el-tabs__header .el-tabs__nav {
  margin-bottom: 0 !important;
 }
 .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 0px;
 }
 .el-tabs__nav-scroll {
  padding-left: 0;
 }
 .temTable {
  height: 90%;
  overflow: auto;
 }
}
.monitoring-custom-dialog
 .dialog-body
 .el-tabs--card
 > .el-tabs__header
 .el-tabs__nav
 .el-tabs__item.is-active {
 /* width: 157px; */
 height: 32px;
 background: $tabActiveBgColor !important;
 color: $white !important;
 /* border: 1px solid #f00; */
}
.monitoring-custom-dialog
 .dialog-body
 .el-tabs--card
 > .el-tabs__header
 .el-tabs__nav
 .el-tabs__item {
 -webkit-box-flex: 0;
 -ms-flex: 0 0 0px;
 flex: 0 0 0;
 height: 32px;
 line-height: 32px;
 text-align: center;
 background: #f0f7ff !important;
 border: 1px solid #80befd;
 border-radius: 2px 0px 0px 2px;
 color: $primary-color;
 margin-left: -1px;
 color: $tabColor !important;
 border: 1px solid #dae3f0 !important;
}
.el-form .el-form-item:not(.is-required) .el-form-item__label {
 text-indent: 0;
}
.el-textarea__inner {
 border: none;
 background: #eef4fa;
}
.el-form-item--small.el-form-item {
 margin-bottom: 0px;
}
.mt-18 {
 margin-top: 18px;
}
.mt-10 {
 margin-top: 10px;
}
.pl-20 {
 padding-left: 20px;
}
.el-tabs__nav-wrap::after {
 content: "";
 position: absolute;
 left: 0;
 bottom: 0;
 width: 100%;
 height: 2px;
 background-color: #dfe4ed;
 z-index: 1;
}
.el-tabs--left .el-tabs__header.is-left {
 float: left;
 margin-bottom: 0;
 margin-right: 0;
}
.width-200 {
 width: 200px;
}
.el-form .el-form-item {
 margin-bottom: 0;
}
.diyDialog {
 min-height: 3rem;
 overflow: hidden;
 padding: 0 20px;
}
>>> .table-list .el-tabs__item {
 height: 40px !important;
 line-height: 40px !important;
}
.table-list > .is-active {
 height: 30px !important;
 line-height: 30px !important;
}
.table-list > .el-tabs__item {
 height: 30px !important;
 line-height: 30px !important;
}
</style>
<style lang="scss" type="text/scss" scoped>
.table-list
 > .el-tabs
 > .el-tabs__header
 > .el-tabs__nav-wrap
 > .el-tabs__nav-scroll
 > .el-tabs__nav
 > .is-active {
 height: 30px !important;
 line-height: 30px !important;
}
>>> .monitoring-custom-dialog
 .dialog-body
 .el-tabs--card
 > .el-tabs__header
 .el-tabs__nav
 .el-tabs__item.is-active {
 height: 30px !important;
 line-height: 30px !important;
}

>>> .monitoring-custom-dialog
 .dialog-body
 .el-tabs--card
 > .el-tabs__header
 .el-tabs__nav
 .el-tabs__item {
 height: 30px !important;
 line-height: 30px !important;
}
.el-dialog .el-form .el-form-item .el-form-item__content {
 text-align: left !important;
}
>>> .el-dialog .el-form .el-form-item .el-form-item__content {
 text-align: left !important;
}
.el-form-item > .el-form-item__content {
 text-align: left !important;
}
>>> .el-form-item > .el-form-item__content {
 text-align: left !important;
}
.diyDialog {
 .el-form .el-form-item .el-form-item__label {
  color: #000;
 }
}
#blueWarn {
 .el-radio__inner {
  border-color: #06bdf2 !important;
 }
 .el-radio__input.is-checked .el-radio__inner {
  border-color: #06bdf2 !important;
  background: #06bdf2 !important;
 }
 .el-radio__input.is-checked + .el-radio__label,
 .el-radio__label {
  color: #06bdf2 !important;
 }
}
#yellowWarn {
 .el-radio__inner {
  border-color: #e8db09 !important;
 }
 .el-radio__input.is-checked .el-radio__inner {
  border-color: #e8db09 !important;
  background: #e8db09 !important;
 }
 .el-radio__input.is-checked + .el-radio__label,
 .el-radio__label {
  color: #e8db09 !important;
 }
}
#orangeWarn {
 .el-radio__inner {
  border-color: #fbac01 !important;
 }
 .el-radio__input.is-checked .el-radio__inner {
  border-color: #fbac01 !important;
  background: #fbac01 !important;
 }
 .el-radio__input.is-checked + .el-radio__label,
 .el-radio__label {
  color: #fbac01 !important;
 }
}
#redWarn {
 .el-radio__inner {
  border-color: #ff0303 !important;
 }
 .el-radio__input.is-checked .el-radio__inner {
  border-color: #ff0303 !important;
  background: #ff0303 !important;
 }
 .el-radio__input.is-checked + .el-radio__label,
 .el-radio__label {
  color: #ff0303 !important;
 }
}
</style>
