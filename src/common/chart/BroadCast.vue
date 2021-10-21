<template>
  <!-- 裂缝 -->
 
<div>
 
<el-tabs tab-position="left" style="height: 100%;" @tab-click="onTabClick">
    <el-tab-pane v-if="showBroadCast" label="下发播报">
                    <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="播报次数">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                
                <el-form-item label="播报内容">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                <el-alert
                    title=""
                    type="warning"
                    description="请慎重执行此操作，音量大小跟广播功率相关！"
                    show-icon>
                </el-alert>
                    <el-button type="primary" @click="onSubmit">立即发布</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                </el-form>

    </el-tab-pane>
    <el-tab-pane label="设置白名单">

<el-form ref="form" :model="form" label-width="145px">
<el-alert
      title=""
      type="success"
      description="只有勾选的号码才可以设置,设置完成以后，请稍等片刻，再执行下查询下白名单操作，确保操作成功!"
      show-icon>
  </el-alert>
<el-form-item label="请选择需要设置的号码">
    <el-checkbox-group v-model="settingWhiteForm.qxhmysbs">
      <el-checkbox v-for="item in settingCode" :label="item.val" :key="item.val" name="type">{{item.name}}</el-checkbox>
     
    </el-checkbox-group>
  </el-form-item>
  
   <el-row>
<el-col :span="8"> 
<el-form-item label="管理号码">
<el-input v-model="settingWhiteForm.glhmzcode"></el-input>
</el-form-item></el-col>
<el-col :span="8"><el-form-item label="平台号码">
<el-input v-model="settingWhiteForm.pthmzcode"></el-input>
</el-form-item></el-col>
<el-col :span="8"> <el-form-item label="白名单号码1">
<el-input v-model="settingWhiteForm.sqhm1code"></el-input>
</el-form-item></el-col>
</el-row>

  
<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码2">
<el-input v-model="settingWhiteForm.sqhm2code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码3">
<el-input v-model="settingWhiteForm.sqhm3code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码4">
<el-input v-model="settingWhiteForm.sqhm4code"></el-input>
</el-form-item>
</el-col>
</el-row>      

<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码5">
<el-input v-model="settingWhiteForm.sqhm5code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码6">
<el-input v-model="settingWhiteForm.sqhm6code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码7">
<el-input v-model="settingWhiteForm.sqhm7code"></el-input>
</el-form-item>
</el-col>
</el-row>   

<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码8">
<el-input v-model="settingWhiteForm.sqhm8code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码9">
<el-input v-model="settingWhiteForm.sqhm9code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码10">
<el-input v-model="settingWhiteForm.sqhm10code"></el-input>
</el-form-item>
</el-col>
</el-row>   

<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码11">
<el-input v-model="settingWhiteForm.sqhm11code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码12">
<el-input v-model="settingWhiteForm.sqhm12code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码13">
<el-input v-model="settingWhiteForm.sqhm13code"></el-input>
</el-form-item>
</el-col>
</el-row>   

<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码14">
<el-input v-model="settingWhiteForm.sqhm14code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码15">
<el-input v-model="settingWhiteForm.sqhm15code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码16">
<el-input v-model="settingWhiteForm.sqhm16code"></el-input>
</el-form-item>
</el-col>
</el-row>   



<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码17">
<el-input v-model="settingWhiteForm.sqhm17code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码18">
<el-input v-model="settingWhiteForm.sqhm18code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码19">
<el-input v-model="settingWhiteForm.sqhm19code"></el-input>
</el-form-item>
</el-col>
</el-row>   

<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码20">
<el-input v-model="settingWhiteForm.sqhm20code"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">

</el-col>
<el-col :span="8">

</el-col>
</el-row>   









<el-form-item>
  <el-alert
      title=""
      type="success"
      description="只有勾选的号码才可以设置!"
      show-icon>
  </el-alert>
      <el-button type="primary" @click="sendSettingWhitePhone">立即设置</el-button>
      <el-button>取消</el-button>
   </el-form-item>



</el-form>
    </el-tab-pane>
    <el-tab-pane label="查询白名单">
 <el-form ref="form" :model="form" label-width="145px">
  
            <el-form-item>
            <el-alert
                title=""
                type="success"
                description="从设备实时查询管理号码、平台号码和白名单号码!"
                show-icon>
            </el-alert>
                <el-button type="primary" @click="sendSearchWhitePhone">立即查询</el-button>
                <el-button>取消</el-button>
             </el-form-item>
             <el-row>
  <el-col :span="8"> 
  <el-form-item label="管理号码">
  <el-input v-model="whiteForm.管理号码"></el-input>
</el-form-item></el-col>
  <el-col :span="8"><el-form-item label="平台号码">
    <el-input v-model="whiteForm.平台号码"></el-input>
  </el-form-item></el-col>
  <el-col :span="8"> <el-form-item label="白名单号码1">
    <el-input v-model="whiteForm.授权号码1"></el-input>
  </el-form-item></el-col>
</el-row>

            
<el-row>
  <el-col :span="8"> 
<el-form-item label="白名单号码2">
    <el-input v-model="whiteForm.授权号码2"></el-input>
  </el-form-item>
  </el-col>
  <el-col :span="8">
  <el-form-item label="白名单号码3">
  <el-input v-model="whiteForm.授权号码3"></el-input>
</el-form-item>
  </el-col>
  <el-col :span="8">
   <el-form-item label="白名单号码4">
   <el-input v-model="whiteForm.授权号码4"></el-input>
 </el-form-item>
  </el-col>
</el-row>      
 
<el-row>
  <el-col :span="8"> 
<el-form-item label="白名单号码5">
<el-input v-model="whiteForm.授权号码5"></el-input>
</el-form-item>
  </el-col>
  <el-col :span="8">
  <el-form-item label="白名单号码6">
  <el-input v-model="whiteForm.授权号码6"></el-input>
</el-form-item>
  </el-col>
  <el-col :span="8">
  <el-form-item label="白名单号码7">
  <el-input v-model="whiteForm.授权号码7"></el-input>
</el-form-item>
  </el-col>
</el-row>   

<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码8">
<el-input v-model="whiteForm.授权号码8"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码9">
<el-input v-model="whiteForm.授权号码9"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码10">
<el-input v-model="whiteForm.授权号码10"></el-input>
</el-form-item>
</el-col>
</el-row>   
  
<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码11">
<el-input v-model="whiteForm.授权号码11"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
 <el-form-item label="白名单号码12">
 <el-input v-model="whiteForm.授权号码12"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码13">
<el-input v-model="whiteForm.授权号码13"></el-input>
</el-form-item>
</el-col>
</el-row>   
  
<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码14">
<el-input v-model="whiteForm.授权号码14"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码15">
<el-input v-model="whiteForm.授权号码15"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码16">
<el-input v-model="whiteForm.授权号码16"></el-input>
</el-form-item>
</el-col>
</el-row>   
  
  
  
<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码17">
<el-input v-model="whiteForm.授权号码17"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码18">
<el-input v-model="whiteForm.授权号码18"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">
<el-form-item label="白名单号码19">
<el-input v-model="whiteForm.授权号码19"></el-input>
</el-form-item>
</el-col>
</el-row>   
  
<el-row>
<el-col :span="8"> 
<el-form-item label="白名单号码20">
<el-input v-model="whiteForm.授权号码20"></el-input>
</el-form-item>
</el-col>
<el-col :span="8">

</el-col>
<el-col :span="8">

</el-col>
</el-row>   
  
 
  
  
  
  
  
  
  
  
 

  
        </el-form>


    </el-tab-pane>
   
  </el-tabs>

</div>
 
</template>

<script>
  import echarts from 'echarts'
  import {shallowClone, hexToRGBA} from "@/utils/index"
  import {deviceBase,getVueThingGatherDeviceInfoSingle,SendCallCmd} from "@/api/deviceBase"
  import {chartSetting} from './setting'

  // sessionStorage.setItem('chartUnit', 'mm')
  export default {
    props: ['data', 'device'],
    data() {
        return {
            showBroadCast :false,
            settingCode:[
              {name:"管理号码",val:"glhm"} ,
              {name:"平台号码",val:"pthm"} ,
              {name:"白名单号码1",val:"sqhm1"} ,
              {name:"白名单号码2",val:"sqhm2"} ,
              {name:"白名单号码3",val:"sqhm3"} ,
              {name:"白名单号码4",val:"sqhm4"} ,
              {name:"白名单号码5",val:"sqhm5"} ,
              {name:"白名单号码6",val:"sqhm6"} ,
              {name:"白名单号码7",val:"sqhm7"} ,
              {name:"白名单号码8",val:"sqhm8"} ,
              {name:"白名单号码9",val:"sqhm9"} ,
              {name:"白名单号码10",val:"sqhm10"} ,
              {name:"白名单号码11",val:"sqhm11"} ,
              {name:"白名单号码12",val:"sqhm12"} ,
              {name:"白名单号码13",val:"sqhm13"} ,
              {name:"白名单号码14",val:"sqhm14"} ,
              {name:"白名单号码15",val:"sqhm15"} ,
              {name:"白名单号码16",val:"sqhm16"} ,
              {name:"白名单号码17",val:"sqhm17"} ,
              {name:"白名单号码18",val:"sqhm18"} ,
              {name:"白名单号码19",val:"sqhm19"} ,
              {name:"白名单号码20",val:"sqhm20"} ,

            ],
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          settingWhiteForm:{
            qxhmysbs:[],
            glhmzcode:"",
            pthmzcode:"",
            hqsm1code:"",
            hqsm2code:"",
            hqsm3code:"",
            hqsm4code:"",
            hqsm5code:"",
            hqsm6code:"",
            hqsm7code:"",
            hqsm8code:"",
            hqsm9code:"",
            hqsm10code:"",
            hqsm11code:"",
            hqsm12code:"",
            hqsm13code:"",
            hqsm14code:"",
            hqsm15code:"",
            hqsm16code:"",
            hqsm17code:"",
            hqsm18code:"",
            hqsm19code:"",
            hqsm20:""
          },
          whiteForm:{
                管理号码:"",
                平台号码:"",
                授权号码1:"",
                授权号码2:"",
                授权号码3:"",
                授权号码4:"",
                授权号码5:"",
                授权号码6:"",
                授权号码7:"",
                授权号码8:"",
                授权号码9:"",
                授权号码10:"",
                授权号码11:"",
                授权号码12:"",
                授权号码13:"",
                授权号码14:"",
                授权号码15:"",
                授权号码16:"",
                授权号码17:"",
                授权号码18:"",
                授权号码19:"",
                授权号码20:""
          }
        }
      },
    methods: {
        sendBroadCast(){
              //下发广播播报
           var self = this;
             this.$confirm('确定要执行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.sendDeviceCmd(this.device.id||this.device.ID,
                'ade2d883-1444-4bf8-bc7d-bc1ec9383ab1',
                {
                    b_num:1, 
                    b_content:""
                }
              
                
                );
          });
        },
       sendSettingWhitePhone(){
           //设置白名单
           var self = this;
             this.$confirm('确定要执行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.sendDeviceCmd(this.device.id||this.device.ID,
                '18f5f731-ad66-477f-91b7-0c70a3705231',
                self.settingWhiteForm
              
                
                );
          });
       },
       sendSearchWhitePhone(){
                var self = this;
                this.$confirm('确定要执行此操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            self.sendDeviceCmd(this.device.id||this.device.ID,
                '14a607f1-9a91-4197-821e-4bffac38d4ae',
                {
                    czhmbsys:[ "sqhm1",
                    "pthm",
                    "glhm",
                    "sqhm3",
                    "sqhm6",
                    "sqhm9",
                    "sqhm12",
                    "sqhm15",
                    "sqhm18",
                    "sqhm19",
                    "sqhm16",
                    "sqhm13",
                    "sqhm10",
                    "sqhm7",
                    "sqhm4",
                    "sqhm5",
                    "sqhm8",
                    "sqhm11",
                    "sqhm17",
                    "sqhm14",
                    "sqhm20",
                    "sqhm2"
                ]
                }
                );
            });
       },
       getDeviceProperties(){
        var self = this;
        getVueThingGatherDeviceInfoSingle({id:this.device.id||this.device.ID}).then(res => {
                    if(res.status){
                        if(res.data && res.data.propVals){

                            Object.keys(res.data.propVals).forEach(d=>{
                                self.$set(self.whiteForm,d,res.data.propVals[d]['attributeVal']);
                               
                            })
                        }
                       
                    }
          })
          self.tableLoading = false;
       },
      sendDeviceCmd(devID,protocolID,data){
          
          //发起设备控制命令
          this.tableLoading = true
        
          let params = {
            id:devID,
            msg:protocolID,
            data: data
          };
          let self = this;
         
  
          SendCallCmd(params).then(res => {
             if(res.status)
             {
                self.$message.success("命令已发送!");
             }else{
                self.$message.error("命令发送失败:"+res.msg);
             }
            
          })
          self.tableLoading = false;
      },
      onTabClick(item){
          if(item.label=='查询白名单'){
              this.getDeviceProperties();
          }
      },

    },
    mounted() {
     
     
    },
  }
</script>
