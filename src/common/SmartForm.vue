<template>
  <div class="site-basic">
 
            <button @click="jumpToSmartForm(formID)" v-if="currentUser&&currentUser.userId==146">自定义智能表单</button>
                  
                  <fm-generate-form
                  :data="formJSON[formID]"
                  :id="formID"
                  @onvalueChange="handleFormValueChange"
                  v-model="formVar"
                  class="generateForm"
                  ref="generateForm">
                </fm-generate-form>
            
            <div v-if=" detailFormDefine[formID] && detailFormDefine[formID].buttons">
                <el-button  v-for="(btn) in detailFormDefine[formID].buttons"
                           @click="handleBtn(pageInfo.id,btn)" :type="btn.type || primary" :size="btn.size || 'mini'"
                           :class="btn.class || 'mt-2'">保存
                </el-button>
                </div>
  </div>
</template>

<script>
  import {getDeviceBasicInfo} from '@/api/deviceBase.js'
  import {getTableColumns, queryData} from '@/api/templateIndex/index'
  import {getSmartFormById, getSmartDefineInfoFormById, SmartFormPageInfo} from '@/api/smartform'
  export default {
    name: "SmartForm",
    props: ['formID','pagePars','value','formVar'],
    data() {
      return {
        currentUser:{},
        currentLoadFlag:{},
        formJSON: {},
        detailFormDefine: {},//每个详情页面的详细定义信息
        formValue: {}, 
      }
    },
    methods: {
       handleFormValueChange(val) {
        //  alert(1);
       // this.$set(this.formData, val.id, val.data);
       // this.value=val.data
        this.$emit('input',val.data)
      },
      confirmHandleBtn(id, btnConfig) {
        let params = {};
        let self = this;
        if (btnConfig.actionType == "1") { //需要请求后端数据的
          this.tableLoading = true
          if (btnConfig.actionUrl) {
            //只有配置了请求地址才能有用
            params = self.value;

            if (btnConfig.beData == true) {
              params = {data: self.value}
            }
            queryData(btnConfig.actionUrl, btnConfig.method, params).then(res => {
              if (res.status == true) {

                self.$message.success(res.msg || '操作成功!');
              } else {
                self.$message.error(res.msg || '操作失败!');
              }
            })
          }
          self.tableLoading = false;
        }
      },
      handleBtn(id, btnConfig) {
        var self = this;
        if (btnConfig.confirm) {
          self.$confirm(btnConfig.confirmText || '确定要执行此操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.confirmHandleBtn(id, btnConfig);
          })

        } else {
          self.confirmHandleBtn(id, btnConfig);
        }

      },

      //根据智能表单的请求设置，获取数据
      handleLoadFormData(id, data) {

        var self = this;

        var params = {};
        var key = data.key || "id";
        params[key] =  self.pagePars ? self.pagePars.id : null;
        if (data.pars) { //根据页面传递参数的定义，设置参数
          data.pars.forEach(item => {
            if (item.way == "常量") {
              params[item.id] = item.src;

            } else {
              params[item.id] = self.pagePars ? self.pagePars[item.src] : null;
            }
          });

        }

        if (data.beData == true) {
          params = {data: params}
        }

        queryData(data.actionUrl, data.method || 'POST', params).then(res => {
          if (res.status == true) {
            if (res.data.constructor === Array) {
              self.$set(self.formValue, id, res.data[0]);
            } else {
              self.$set(self.formValue, id, res.data);
            }
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

            self.$set(self.detailFormDefine, id, res.data);
            self.handleLoadFormData(id, res.data);
          }
          self.appearJsonPage(rs, id)

        })
      },
      jumpToSmartForm(id) {

        this.$router.push({path: '/system/smartform', query: {id: id}})

      },
    },
    watch: {
        'pagePars': {
          handler: function (newV, oldV) {
          // alert(newV);
          },
          deep: true
        },
        
    },
    mounted() {
         this.currentUser=this.$store.state.user;
        this.loadSmartFormById(this.formID);
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss">
  
</style>
