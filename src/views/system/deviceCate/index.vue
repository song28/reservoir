<template>
  <div class="content-item">
    <div class="app-container-search">
      <filter-toggler @query="getList" @reset="resetList" :hasMore="false" :hasExport="false">
        <template slot="first-line">
          <el-form-item label="行政区：" class="">
            <v-region @values="regionChange" type="group" :blank="false">
              <el-input v-model="query.data.addvnm" placeholder="请选择行政区"></el-input>
            </v-region>
          </el-form-item>
          <el-form-item label="站点信息：">
            <el-input v-model="query.data.keyWord" placeholder="请输入编码或名称"></el-input>
          </el-form-item>
          <el-form-item label="所属项目：">
            <el-select v-model="query.data.comprojectId" placeholder="请选择所属项目" filterable clearable>
              <el-option label="全部" value=""></el-option>
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in comprojects"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属物模型：">
            <el-select v-model="query.data.product" placeholder="请选择所属物模型" filterable clearable>
              <el-option label="全部" value=""></el-option>
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in products"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <div slot="btnExt" class="search-btn">
            
              <el-button size="mini" class="btn-table-border blue" v-if="query.data.product && query.data.comprojectId"
                       style="cursor: pointer" type="primary" @click="handleBatchDetails( )">批量设置设备分类
            </el-button>
          </div>
        </template>
      </filter-toggler>
     
    </div>

    <div class="app-container-body app-container-body-column" ref="tab">
      <el-table :data="tableData" v-loading="tableLoading" border style="width: 100%" highlight-current-row
                @selection-change="handleSelectionChange"
                @cell-click="handleCellClick" :height="tableHeight">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          align="center"
          width="80">
          <template slot-scope="scope">
            <span>{{((query.pageNo - 1) * query.pageSize) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="站点名称"
          align="center"
          prop="name"
          sortable>
        </el-table-column>
        <el-table-column
          label="站点编码"
          show-overflow-tooltip
          align="center"
          prop="cusno"
          sortable width="140">
        </el-table-column>
           <el-table-column
          label="产品类型"
          show-overflow-tooltip
          align="center"
          prop="productname"
          sortable>
        </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          align="center"
          prop="comprojectname"
          sortable>
        </el-table-column>
        <el-table-column
          label="行政区"
          align="center"
          show-overflow-tooltip
          prop="addvcdname"
          sortable>
        </el-table-column>
        <el-table-column
          label="所在地"
          show-overflow-tooltip
          align="center"
          prop="address">
        </el-table-column>
        <el-table-column
          label="聚物榜"
          show-overflow-tooltip
          align="center"
          prop="thinglistname">
        </el-table-column>
        <el-table-column
          label="经度"
          show-overflow-tooltip
          align="center"
          prop="lng">
        </el-table-column>
        <el-table-column
          label="纬度"
          show-overflow-tooltip
          align="center"
          prop="lat">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          sortable
          prop="status"
          width="80">
          <template slot-scope="scope">
            <span v-if="(new Date().getTime() - new Date(scope.row.moditime).getTime()) > scope.row.intervalue * 60 * 1000" style="color: red">
              离线
            </span>
            <span v-else style="color: green">在线
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          sortable
          width="180"
          prop="moditime">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center">
          <template slot-scope="scope">
            <el-button size="mini" class="btn-table-border blue"
                       style="cursor: pointer" type="primary" @click="handleDetails(scope.row)">设备分类
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="query.pageNo" :limit.sync="query.pageSize"
                  @pagination="getList"/>
    </div>

    <dialog-maintenance-form :item="repairsDialog" v-if="repairsDialog.isShow"
                             @on-close="closeDialog"></dialog-maintenance-form>

    <dialog-work v-if="workDialog.isShow" :item="workDialog" @on-close="closeDialog" :bizTypes="bizTypes"></dialog-work>
    <!--查看站点详情-->
    <base-device-info :data="deviceInfo.data" v-if="deviceInfo.isShow"
                      @on-close="deviceInfo.isShow = false"></base-device-info>
  </div>
</template>

<script>
    import DialogMaintenanceForm from '@/components/Common/Form/MaintenanceForm'
    import DialogWork from './dialog/Work'
    import {findDeviceInfoListByKeyWord4Pagination, querySttps,queryComprojects,queryProducts,getBizDictList} from './api'
    import {parseTime, getRegion} from '@/utils'
    import {getIOTSQLPage} from '@/utils/sqlAjaxUtil'
    import {getPrefixAdcd} from '@/utils/adcdUtil'

    export default {
        data() {
            return {
              aa:{},
              bb:{},
              bizTypes:[],
                allDeviceDat: {
                    allNum: 0,
                    onlineNum: 0
                },
                tableHeight: window.innerHeight - 180,
                tableData: [],
                tableLoading: false,
                query: {
                    pageNo: 1,
                    pageSize: 20,
                    data: {
                        addvnm: '',
                        addvcd: '',
                        userId: '',
                        preAdcd: '',
                        keyWord: '',
                        realDatas: '',
                        sttp: null,
                        comprojectId:null,
                        product:null
                    }
                },
                total: 0,
                repairsDialog: {
                    isShow: false,
                    data: null
                },
                workDialog: {
                    isShow: false,
                    data: null,
                    deviceIDs:[],
                },
                multipleTable: [],

                sttps: [],
                comprojects: [],
                products:[],
                deviceInfo: {
                    isShow: false,
                    data: null
                }
            }
        },
        methods: {
               //加载业务类型树
               loadBizDictList() {
                let _this = this
                let params = {'blTree': true}
                getBizDictList(params).then(res => {
                _this.bizTypes = res.data
                })
            },
            // 获取总的设备数量统计，总数、在线、离线、
            queryAllDeviceData() {
                let self = this;
                let params = {};
                params.preAdcd = getPrefixAdcd(self.query.data.addvcd);
                // 下边是新增的逻辑，如果没有行政区，则认为是项目人员，根据用户ID查询该用户所有项目的设备
                if (self.query.data.addvcd == null || self.query.data.addvcd == '') {
                    params.preAdcd = null;
                    params.__userId = self.query.data.userId;
                }
                params.stm = parseTime(new Date().getTime() - 6 * 60 * 1000, '{y}-{m}-{d} {h}:{i}:{s}'); // 6分钟之前的时间，确定在线;

                getIOTSQLPage("a7gsfa61-a197-4584-bb14-94a3a44ad713", params, false, function (res) {
                    if (res.status) {
                        self.allDeviceDat = res.data;
                    }
                });
            },

            // 获取所有的设备类型
            initSttps() {
                let self = this;
                self.sttps = [];
                querySttps().then(res => {
                    if (res.status) {
                        if (res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                self.sttps.push({'sttpName': res.data[i].name, 'sttpVal': res.data[i].val});
                            }
                        }
                    }
                })
            },
          // 获取所有项目
            initComprojects() {
                let self = this;
                self.comprojects = [];
                let obj = new Object()
                obj.data={

                }
                queryComprojects(obj).then(res => {
                    if (res.status) {
                        if (res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                self.comprojects.push({'id': res.data[i].id, 'name': res.data[i].name});
                            }
                        }
                    }
                })
            },
            // 获取所有物模型
            initProducts() {
                let self = this;
                self.products = [];
                let obj = new Object()
                obj.data={
                }
                queryProducts(obj).then(res => {
                    if (res.status) {
                        if (res.data.length > 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                self.products.push({'id': res.data[i].id, 'name': res.data[i].name});
                            }
                        }
                    }
                })
            },
            //获取表格列表
            getList() {
                let self = this;
                let obj = new Object();
                obj.pageNo = self.query.pageNo;
                obj.pageSize = self.query.pageSize;
                obj.data = {
                    addvcd: self.query.data.addvcd,
                    keyWord: self.query.data.keyWord,
                    comprojectId: (self.query.data.comprojectId==""?null:self.query.data.comprojectId),
                    productID: (self.query.data.product==""?null:self.query.data.product)
                }
                findDeviceInfoListByKeyWord4Pagination(obj).then(res => {
                    if (res.status) {
                        self.tableData = res.data
                        self.total = res.total
                        self.tableLoading = false
                    }
                })
            },

            //重置查询条件
            resetList() {
                for (let key in this.query.data) {
                    this.query.data[key] = null
                }
                this.query.pageNo = 1
                this.query.pageSize = 20
                this.getList();
            },

            //行政区
            regionChange(val) {
                let obj = getRegion(val)
                this.query.data.addvcd = obj.addvcd
                this.query.data.addvnm = obj.addvnm
            },

            handleSelectionChange(val) {
                this.multipleTable = val;
            },
            //点击表格列
            handleCellClick(row, column, cell, event) {
                if (column.property == 'name') {
                    row['deviceName'] = row.name
                    row['deviceId'] = row.deviceID
                    this.deviceInfo.data = row
                    this.deviceInfo.isShow = true
                }
            },
            //关注
            handleFollow(row, index) {
                let params = {}
                let self = this
                let rowArr = [];
                if (!row) {
                    //批量
                    if (!this.multipleTable.length) {
                        this.$GXprompt.message.error('请至少选择一条数据！')
                        return
                    }
                    params = {
                        "ids": this.multipleTable.map(d => {
                            if (d.focusTime) {
                                return '';
                            } else {
                                rowArr.push(d);
                                return d.ID
                            }
                        }).join(',')
                    }
                } else {
                    if (row.focusTime) {
                        this.$GXprompt.message.error('已关注设备不能重复关注！')
                        return
                    }
                    params = {"ids": row.ID}
                }
                this.$GXprompt.messageBox.confirm('确认关注吗？', null, function (res) {
                    if (res) {
                        addFocusByIds(params).then(res => {
                            if (res.status) {
                                self.$GXprompt.notify.success('关注成功!')
                                if (rowArr.length > 0) {
                                    for (let i = 0; i < rowArr.length; i++) {
                                        for (let j = 0; j < self.tableData.length; j++) {
                                            if (rowArr[i].ID == self.tableData[j].ID) {
                                                self.tableData[j].focusTime = true
                                                self.$set(self.tableData, j, self.tableData[j]);
                                            }
                                        }
                                    }
                                } else {
                                    row.focusTime = true
                                    self.$set(self.tableData, index, row);
                                }
                            } else {
                                self.$GXprompt.notify.error(res.msg)
                            }
                        })
                    }
                })
            },

            //详情
            handleDetails(row) {
                this.workDialog.data = row;
                this.workDialog.isShow = true;
                // 加载历史工况信息
                // this.loadHisWork(row); // 这个不在这里做，在打开的vue里
            },

             //批量设置设备分类
             handleBatchDetails( ) {
                
                this.workDialog.data = null;
                this.workDialog.isShow = true;
                this.workDialog.deviceIDs  = this.multipleTable.map(d=>{return d.id;});
                // 加载历史工况信息
                // this.loadHisWork(row); // 这个不在这里做，在打开的vue里
            },

            // 加载历史工况信息
            loadHisWork(row) {
                let self = this;
                getRealTimeDataByDeviceID().then(res => {
                    if (res.status) {

                    }
                });
            },

            //报修
            handleRepairs(row) {
                this.repairsDialog.data = row
                this.repairsDialog.isShow = true
            },

            //关闭弹出框
            closeDialog(item) {
                item.isShow = false
                item.data = null
            }
        },
        created() {
            this.tableLoading = true
            // this.queryAllDeviceData();
            this.initSttps();
            this.initComprojects()
            this.initProducts()
            this.getList();
            this.loadBizDictList();
        },
        components: {
            DialogMaintenanceForm,
            DialogWork
        },

    }
</script>


<style scoped type="text/scss" lang="scss">
  .content-item {
    height: 100%;
    width: 100%;
    padding: 15px;
    position: relative;
    display: flex;
    flex-direction: column;

    .app-container-search {
      margin: 5px 0px 15px 0px;
    }

    .div-card-tip {
      height: 0.36rem;
      display: flex;
      align-items: center;

      span {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        background: #EFF0F5;
        padding-left: 0.15rem;

        i {
          font-style: normal;
          color: #FF2C2C;
          font-weight: 500;
          font-size: 0.15rem;
          font-family: "Microsoft YaHei";
          margin: 0 4px;
        }
      }
    }
  }

  .app-container.app-container-monitor {
    .el-menu--horizontal > .el-menu-item {
      height: 0.45rem;
      line-height: 0.45rem;
    }
  }
</style>
