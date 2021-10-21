<template>
  <div class="app-container app-container-noHeader">
    <!--<div class="app-container-header">-->
    <!--站点总数：<span class="font-blue">{{query.total}}</span>&nbsp; 个-->
    <!--</div>-->
    <div class="app-container-search">
      <filter-toggler
        @query="queryList"
        @reset="resetList"
        @export="handleExport(0)"
        :hasAdd="false"
        :hasMore="false"
      >
        <template slot="first-line">
          <div class="map-query">
            <el-form-item label="姓名、电话">
              <el-input v-model="queryData.keyword" size="mini" placeholder="请输入姓名或电话"></el-input>
            </el-form-item>
          </div>
        </template>
      </filter-toggler>
    </div>

    <div class="tableCon" ref="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        highlight-current-row
        :height="tableHeight"
        ref="table"
      >
        <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{((query.pageNo - 1) * query.pageSize) + (scope.$index + 1)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="责任人编号" align="center" width="160" prop="dutyId" :show-overflow-tooltip="true"></el-table-column>
        <!--<el-table-column label="区县" align="center" width="160" prop="area"></el-table-column>-->
        <el-table-column label="姓名" align="center" width="160" prop="name" :show-overflow-tooltip="true"></el-table-column>
        <!--<el-table-column label="性别" align="center" prop="gender"></el-table-column>-->
        <el-table-column label="职务" align="center" prop="post" :show-overflow-tooltip="true"></el-table-column>
        <!--<el-table-column label="出生日期" align="center" prop="birthday"></el-table-column>-->
        <el-table-column label="职称" align="center" prop="title" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="电话" align="center" prop="phone" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="手机" align="center" prop="phone" :show-overflow-tooltip="true"></el-table-column>
        <!--<el-table-column label="手机" align="center" width="160" prop="tel"></el-table-column>-->
      </el-table>
      <pagination
        :total="total"
        :page.sync="query.pageNo"
        :limit.sync="query.pageSize"
        @pagination="queryList"
      />
    </div>

    <site-dialog
      :data="dialogData"
      v-if="dialogData.dialogVisible"
      @on-close="dialogData.dialogVisible = false"
    ></site-dialog>
  </div>
</template>

<script>
import { getIOTSQL, getIOTSQLPage } from "@/utils/sqlAjaxUtil";
import { getitemsbydict } from "@/api/deviceBase";
//dutyperson监测责任人
import { getInstallList, dutyperson } from "../api";
import siteDialog from "../components/dialog";

export default {
  components: {
    siteDialog,
  },
  data() {
    return {
      loading: false,
      tableHeight: window.innerHeight - (window.innerWidth / 1920) * 100 * 2 - 50,
      query: {
        name: null,
        deviceType: null,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        addvnm: null,
        addvcd: null,
      },
      queryConstData: { warnLevels: [], monitorSteps: [] },
      queryData: { keyword: null },
      listQuery: {},
      list: [],
      tableLoading: false,
      total: 0,
      tableData: [],
      dialogData: {
        name: "install",
        device: null,
        title: null,
        dialogVisible: false,
      },
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getList();
          let self = this;
    
    self.$refs.table.bodyWrapper
      .addEventListener("scroll", self.throttle(self.handleScroll, 3000), true);

    });
  },
  methods: {
    handleQuery() {
      this.getList();
    },
    getList(val) {
      let self = this;
      this.tableLoading = true;
      self.tableData = [];
      // let getlimit = 20;
      // let getpage = 1;
      // if (val) {
      //   getlimit = val.limit;
      //   getpage = val.page;
      // }
      let pam = {
        keyword: this.queryData.keyword,

        size: this.query.pageSize,
        page: this.query.pageNo,
      };
      dutyperson(pam).then((res) => {
        if (res.status) {
          self.tableData = [];
          self.total = res.total;
          // area: "通江县"
          // birthday: null
          // desc: null
          // dutyId: "51192101445001"
          // email: null
          // gender: null  性别
          // id: 296
          // name: "赵怀荣"
          // phone: "18398232558"
          // post: "隐患责任人" 职务
          // postCode: null
          // tel: "18398232558"
          // title: null     职称

          res.data.forEach((val, index, arr) => {
            self.tableData.push({
              area: val.area,
              birthday: val.birthday,
              desc: val.desc,
              dutyId: val.dutyId,
              email: val.email,
              gender: val.gender,
              id: val.id,
              name: val.name,
              phone: val.phone,
              post: val.post,
              postCode: val.postCode,
              tel: val.tel,
              title: val.title,
            });
          });
        }
        
        self.tableLoading = false;
      });
    },
   
    // 查询列表
    queryList() {
      this.getList();
    },

    //重置查询条件
    resetList() {
      for (let key in this.queryData) {
        this.queryData[key] = null;
      }
      this.queryData.pageNo = 1;
      this.queryData.pageSize = 20;
      this.queryList();
    },
     // 滚动事件
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop = this.$refs.table.bodyWrapper.scrollTop;
        let scrollHeight = this.$refs.table.bodyWrapper.scrollHeight;
        let scrollHeight111 = this.$refs.table.scrollHeight;
        let clientHeight = this.$refs.table.bodyWrapper.clientHeight;
        if(scrollTop + clientHeight  >= scrollHeight){
          if(this.query.pageSize * this.query.pageNo > this.total){
          return false
        }else{
          this.query.pageNo = this.query.pageNo + 1 //显示条数新增
          this.queryList() //请求列表list 接口方法
          this.$refs.table.bodyWrapper.scrollTop = 0;
        }
        }
      });
    },
    //节流函数
    throttle(func, wait) {
      let lastTime = null;
      let timeout;
      return () => {
        let context = this;
        let now = new Date();
        let arg = arguments;
        if (now - lastTime - wait > 0) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          func.apply(context, arg);
          lastTime = now;
        } else if (!timeout) {
          timeout = setTimeout(() => {
            func.apply(context, arg);
          }, wait);
        }
      };
    },

  },
};
</script>
<style type="text/scss" lang="scss" scoped>
.tableCon{
  padding:0 10px;
}
td{
  line-height: 38px;
}
</style>
<style type="text/scss" lang="scss">
.btn_cont {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
</style>
