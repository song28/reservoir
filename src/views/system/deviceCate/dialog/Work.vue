<template>
  <el-dialog
    :title="'设备分类'"
    :modal="false"
    width="70%"
    :visible.sync="dialogVisible"
    custom-class="dialog-work"
    @closed="onClose"
    append-to-body>
    <div class="app-container">
      <div>一个设备可以分属多个分类，便于业务系统统计!</div>
      <el-cascader-panel @change="handleChaneg(scope.$index)" v-model="selTypes"  :options="bizTypes" :props="{ expandTrigger: 'hover', multiple: true , emitPath: false , value: 'nodeKey' , label: 'label' }" filterable
                               :show-all-levels="false"></el-cascader-panel>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {findNodeFun, saveFun, queryDeviceCateInfoByDeviceIdFun,getBizDictList,batchSaveDeviceCate} from './../api'

    export default {
        props: ['item','bizTypes'],
        data() {
            return {
                selTypes:[  ] ,
                deviceId: '',
                bizTypes:[],
                cateIds: [],
                props: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },
                height: window.innerHeight - (window.innerWidth / 1920 * 100 * 4) + 'px',
                dialogVisible: true
            }
        },
        methods: {
           
            queryDeviceCateInfoByDeviceId() {
                let self = this;
                var obj = new Object()
                obj.deviceId = this.deviceId;
                self.selTypes=[];
                queryDeviceCateInfoByDeviceIdFun(obj).then(res => {
                    if (res.status) {
                        if(res.data){
                             self.selTypes=res.data.map(d=>{return d.dictId;});
                        }
                       
                    } else {
                        self.$GXprompt.notify.error("查询出现错误")
                    }
                })
            },
            save() {
                if(this.item.deviceIDs!=null&&this.item.deviceIDs.length>0){
                    this.Batchsave();
                }
                else{
                    this.saveSingle();
                }
            },
             saveSingle() {
                let self = this;
                var obj = new Object()
                obj.deviceId = this.deviceId;
                
                obj.dictIds = self.selTypes;
                saveFun(obj).then(res => {
                    if (res.status) {
                        this.dialogVisible = false
                        self.$GXprompt.notify.success("保存成功")
                    } else {
                        self.$GXprompt.notify.error("保存失败")
                    }
                })
            },
            Batchsave() {
                let self = this;
                var obj = new Object()
                obj.devices = this.item.deviceIDs;
                
                obj.dictIds = self.selTypes;
                batchSaveDeviceCate(obj).then(res => {
                    if (res.status) {
                        this.dialogVisible = false
                        self.$GXprompt.notify.success("保存成功")
                    } else {
                        self.$GXprompt.notify.error("保存失败")
                    }
                })
            },
            loadNode(node, resolve) {
                let self = this;
                if (node.level === 0) {
                    var obj = new Object()
                    self.findNode(obj, resolve)
                    self.queryDeviceCateInfoByDeviceId()
                    return;
                }
                let node_t = node
                if (node.level > 1) return resolve([]);
                setTimeout(() => {
                    var obj = new Object()
                    obj.deviceTypeId = node_t.data.id
                    self.findNode(obj, resolve)
                    self.queryDeviceCateInfoByDeviceId()
                }, 500);
            },

            onClose() {
                this.dialogVisible = false
                this.$emit('on-close', this.item)
            },
            findNode(data, resolve) {
                findNodeFun(data).then(res => {
                    if (res.status) {
                        var arr = []
                        for (var i = 0; i < res.data.length; i++) {
                            let node = new Object()
                            node.id = res.data[i].id;
                            node.pid = res.data[i].pid;
                            node.name = res.data[i].name;
                            arr.push(node)
                        }
                        resolve(arr)
                    }
                })
            }

        },
        created() {
            if(this.item.deviceIDs!=null&&this.item.deviceIDs.length>0){
                this.deviceId = this.item.deviceIDs[0];
            }else{
             this.deviceId = this.item.data.id;
            }
            this.queryDeviceCateInfoByDeviceId();
            this.loadBizDictList();
        }
    }
</script>
