<template>
  <div class="base-common-image">
    <app-search @on-query="querySearch"></app-search>
    <el-button type="primary" @click="queryImage" size="mini"   class="ml-2 imgBtn">召测图片</el-button>
   
    <div class="common-image-content" v-if="formatterList.length">
      <div class="div-body" v-if="currentImg">
        

        <el-image 
       
            :src="getImageUrl(currentImg)" 
            :preview-src-list="previewList.map(d=>{return getImageUrl(d)})">
        </el-image>

        <p class="p-msg"><span>采集时间：{{currentImg.TIME}}
       
        </span></p>
        <div class="body-fullscreen cursor-p" @click="dialogImageUrl = getImageUrl(currentImg);dialogVisible = true"><i
          class="el-icon-full-screen"></i></div>
      </div>
      <div class="div-carousel">
        <div class="carousel-item" v-for="item in formatterList" @click=" previewList.splice(previewList.indexOf(item),1) ;previewList.splice(0,0,item);currentImg = item">
          <img :src="getImageUrl(item)" alt="">
         
          <p class="p-msg"><span>采集时间：{{item.TIME | formatterSubstr(0,16)}}</span></p>
        </div>
        <div class="carousel-control">
          <div class="tab-page tab-prev" @click="handleChangePage(0)" v-if="page.pageNo > 1"
               :class="{'disabled': page.pageNo == 1}">
            <i class="el-icon-d-arrow-left"></i>
          </div>
          <div class="tab-page tab-next" @click="handleChangePage(1)" v-if="page.pageNo < page.maxPage"
               :class="{'disabled': page.pageNo == page.maxPage}">
            <i class="el-icon-d-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="common-image-content" v-else>
      <img src="@/assets/images/eventNoPic.png" alt="" class="no-img">
    </div>
    <el-dialog :visible.sync="dialogVisible" :modal="false" custom-class="dialog-common-image" title="图片预览">
      <img :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {baseServerUrl} from "@/api/base.js"
  import {getDeviceImageData} from '@/api/deviceBase.js'
  import appSearch from './Search'
  import axios from 'axios'
  import { MessageBox } from 'element-ui'
  import {getIOTSQL, getIOTSQLPage} from '@/utils/sqlAjaxUtil'
  export default {
    props: ['device'],
    components: {
      appSearch
    },
    data() {
      return {
        page: {
          id: null,
          stm: null,
          etm: null,
          pageNo: 1,
          maxPage: 2,
          pageSize: 5,
          total: 10,
        },
        baseServerUrl:baseServerUrl,
        currentImg: null,
        formatterList: [],
        previewList: [],
        dialogVisible: false,
        dialogImageUrl: null,
      }
    },
    mounted() {
      this.page.id = this.device.id
      this.queryData()
    },
    methods: {
      getImageUrl(item){
 
        return baseServerUrl+'/image/getImageUrl?imageUrl='+ encodeURIComponent(item.URL);
      },
      querySearch(query) {
        this.page.stm = query.stm
        this.page.etm = query.etm
        this.queryData()
        this.queryHour()
      },

      queryData() {
       
        
        let self = this
        // self.currentImg ={time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/c65ecd8bdd054660ad699585073b5876"};
        // self.formatterList=[{time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/c65ecd8bdd054660ad699585073b5876"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/e59884a74f5c458ca861bd7f8640bad8"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/1bca09fe6a3a4eb895ea7d7d7fe2cee3"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/727a7d3517d84efbb36270f94029fc59"},
        //          {time:'2020-05-31 17:50:00',url:"http://localhost:18081/image/getImage/04af244a36b3419192f9656f962ff1f3"},

        //   ];
        //   self.previewList=[...self.formatterList];
       

        let params = { 
          
            cusno:this.device.cusno,
            stm:this.page.stm,
            etm:this.page.etm,

        }
       
        self.currentImg=null;
        getIOTSQL("xpljjxm-sdfg531-g54gw4-gbbw-tjbn", params, true, function (data) {
         
            if(data && data.length>0)
            {
               self.currentImg = data[0]
            }
            self.$set(self, 'formatterList',data)
            self.previewList=[...data];
          }
        );


       
      },

      handleChangePage(type) {
        // if (type == 1) {
        //   if (this.page.pageNo < this.page.maxPage) {
        //     this.page.pageNo++
        //   }
        // } else {
        //   if (this.page.pageNo > 1) {
        //     this.page.pageNo--
        //   }
        // }
        // let len = this.page.pageNo * this.page.pageSize - this.page.pageSize
        // let newList = this.list.slice(len, this.page.pageNo * this.page.pageSize)
        // this.$set(this, 'formatterList', newList)
        // this.currentImg = this.formatterList[0]
      },
      queryImage(){
        let self = this;
        let baseUrlw="";
        let currentUrl=window.location.host;
        let NeiUrl="10.36.50.8:9001";
        let WaiUrl="182.106.200.20:9014";
        let localUrl="localhost:18089";
        // let selfUrl="192.168.1.112:18089"

        if (currentUrl== NeiUrl){
          baseUrlw="http://10.36.50.8:9010"
        }else if(currentUrl == WaiUrl){
          baseUrlw="http://182.106.200.20:9010";    
        }
        else if(currentUrl == localUrl){
          baseUrlw="http://182.106.200.20:9010";
        };
        // else if(currentUrl == selfUrl){
        //   baseUrl="http://182.106.200.20:9010";
        // };
        let params = { 
            userId:'xpl',
            type:'3',
            deviceId:'0000000019'
        };
        axios.get(baseUrlw+"/gxhy/agreement/SendCallPicture",{params:{userId:'xpl', type:'3', deviceId:this.device.cusno}}).then((res) => {               
          console.log(res);
          if(res){
            let resData = JSON.parse(res.data.replace("null(","").replace(")",""));
            if(resData.KEY == "Ing"){
                this.$alert('正在召测中，请稍后点击查询按钮！', '召测状态', {
                confirmButtonText: '确定',
              });
            }else if(resData.KEY != 'Ing'){
              if(resData.flag == true){
               this.$alert('召测图片指令下发成功，请在3分钟后点击查询按钮！', '召测状态', {
                confirmButtonText: '确定',
              });
              this.queryData();
              
              // alert("召测成功！请在2分钟后刷新！")
            }else{
              this.$alert('设备不在线，请稍后再试', '召测状态', {
                confirmButtonText: '确定',
              });
            }

            }
          }else{
            this.$alert('由于网络原因，该设备暂不支持召测！', '召测状态', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
          }         
        });        
      },
      queryHour(){
         let self = this;
        self.interval = setInterval(function(){
        if(self.interval){
          clearInterval(self.interval);
          return;
        }
        self.queryImage();
        self.queryData();
        console.log("111");
      },3600000);
      }
      
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss" type="text/scss">
  .base-common-image {
    display: flex;
    padding: 0.2rem 0;
    flex-direction: column;
    height: 100%;
    .imgBtn{
        position: absolute; 
        left: 480px; 
        width:100px;
    }
    .common-image-content {
      display: flex;
      flex: 1;
      margin-top: 0.2rem;
      position: relative;
      .no-img {
        position: absolute;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .p-msg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 28px;
      background: rgba(0, 0, 0, .3);
      box-shadow: 0px 0px 3px 0px rgba(135, 114, 233, 0.3);
      display: flex;
      align-items: center;
      padding: 0 0.15rem;
      span {
        margin-left: auto;
        white-space: nowrap;
        overflow: hidden;
        font-family: Microsoft YaHei;
        color: rgba(255, 255, 255, 1);
      }
    }
    .div-body {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.15rem;
      position: relative;
      .body-fullscreen {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0.15rem;
        top: 0.15rem;
        z-index: 99;
        i {
          color: rgba(255, 255, 255, 1);
          font-size: 0.2rem;
        }
      }
      img {
        position: absolute;
      }
    }

    .div-carousel {
      width: 2.4rem;
      height: 550px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: scroll;
      .carousel-item {
        height: 89px;
        min-height: 89px;
        margin-bottom: 0.1rem;
        position: relative;
        p {
          height: 20px;
          span {
            font-size: 12px;
          }
        }

      }

      .carousel-control {
        .tab-page {
          width: 20px;
          height: 20px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          z-index: 999;
          i {
            color: rgba(255, 255, 255, .6);
            font-size: 0.2rem;
            font-weight: 500;
            font-family: SourceHanSansCN-Regular;
          }
        }
        .tab-prev {
          top: 5px;
          transform: rotateZ(90deg);
        }
        .tab-next {
          bottom: 20px;
          transform: rotateZ(90deg);
        }
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
  .dialog-common-image {
    width: 90% !important;
    height: 90% !important;
    .el-dialog__body {
      margin-top: 20px;
      height: calc(100% - 80px);
    }
  }
</style>
