<template>
  <div class="mainContainer">
  <fm-making-form ref="makingForm" upload preview generate-code generate-json clearable :query="query" @requireSave="handleSaveFrm">
    <template slot="action">
    </template>
  </fm-making-form>

<el-dialog :visible.sync="dialogVisible" title="新增/修改智能表单">
<button v-if="userInfo.name=='管理员'" @click="jumpToSmartForm(formID)">自定义智能表单</button>

<fm-generate-form
                        :data="formJSON[formID]"
                        :id="formID"
                        @onvalueChange="handleFormValueChange"
                        :value="pageDefs"
                        class="generateForm"
                        ref="generateForm">
    </fm-generate-form>
<div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onConfirm" size="mini">确 定</el-button>
    </div>
</el-dialog>
</div>
</template>

<script>
import {getSmartFormById,editSmartForm,saveSmartFormModel,getSmartDefineInfoFormById} from '@/api/smartform'
  export default {
    name: 'SmartForm',
    data() {
      return{
        userInfo:this.$store.getters,
        dialogVisible:false,
        currentLoadFlag:{},
        formID:"smartFormList_detail",
        formJSON: {},
        pageDefs:{},
        pageData:{},
        formData:{},//保存编辑的智能表单数据
        formValue:{},
        query: {
          'id': null
        },
        mainFrm:null,
        mainID:null,
      }
    },
    created(){


       this.mainID = this.$route.query.id
       this.$set(this.pageDefs,"id",this.mainID);
      this.loadSmartFormById(this.formID);
    },
    methods:{
       handleFormValueChange(val){
        this.$set(this,"pageData",val.data);
      },

      onConfirm(){
        var self = this;

        this.dialogVisible=true;

        this.$set(this.pageData,"data", this.formData);
        this.$set(this.pageData,"id", self.mainID);


        saveSmartFormModel(this.pageData).then(res => {

            if (res.status == true) {

                self.$message.success(res.msg);
            }else{
                self.$message.error(res.msg);
            }

        })
      },
      appearJsonPage(rs, id) {
        this.$set(this.formJSON, id, rs);

      },
      //查看已存在的表单
      loadSmartFormById(id) {
        var self = this;
        if (self.currentLoadFlag["currentModel" + id] == true) {
          return;//已经加载过的不加载
        }
        self.$set(self.currentLoadFlag, "currentModel" + id, true); //标记已经加载了智能表单数据
        var params = {'id': id} //根据ID查询
        getSmartDefineInfoFormById(params).then(res => {
          var rs = {}
          if (res.data != null) {
            rs = res.data.data

          }
          self.appearJsonPage(rs, id)

        })
      },
      jumpToSmartForm(id) {

        this.$router.push({path: '/system/smartform', query: {id: id}})

      },
      handleSaveFrm(srcData){
          var self = this;

          var data = srcData.data;

          data.id = self.mainID;
          this.formData=data;
          this.$set(this.pageData,"data", this.formData);
          this.$set(this.pageData,"id", self.mainID);
          this.dialogVisible=true;

          // var params = {data: data}
          // editSmartForm(params).then(res => {

          //     if (res.status == true) {

          //         self.$message.success(res.msg);
          //     }else{
          //         self.$message.error(res.msg);
          //     }

          // })
      },
        loadPage(){
          var self = this;
          var params = {'id': self.mainID} //根据ID查询
          getSmartDefineInfoFormById(params).then(res => {
              if(res.status == true){

                  if(res.data != null){
                    self.pageDefs=res.data;
                      self.mainFrm.loadPage(self.mainID,res.data.data.list)

                  }else{
                    self.mainFrm.loadPage(self.mainID,[])
                  }
              }
          })
        },
    },
    mounted(){
      var self = this;
      this.$nextTick(() => {
        self.mainFrm = self.$refs.makingForm;
        if(self.mainFrm){
          self.loadPage();
        }
      })
    },
  }
</script>

<style scoped>
.mainContainer{ width:100%;height:100%;}
</style>
