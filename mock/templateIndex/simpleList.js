const tableColumns1 = [
    {
    label:"管护人1",
    align:"center",
    sortable:true,
    prop:"username",
    width:"100"
    },
    {
        label:"管护人2",
        align:"center",
        sortable:false,
        prop:"username",
        width:"100",
        columns:[  {
            label:"管护人",
            align:"center",
            sortable:true,
            prop:"username",
            width:"100"
            },
            {
                label:"性别",
                align:"left",
                sortable:false,
                prop:"sex",
                filter:'sex',
                width:"100",
               
            },
            {
                label:"管护人3",
                align:"center",
                sortable:true,
                prop:"username",
                width:"200"
            }]
    },
    {
        label:"管护人3",
        align:"center",
        sortable:true,
        prop:"username",
        width:"200"
    }

]
const tableColumns2 = [
  {
  label:"管护人2",
  align:"center",
  sortable:true,
  prop:"username",
  width:"100"
  },
  {
      label:"管护人2",
      align:"center",
      sortable:false,
      prop:"username",
      width:"100",
      columns:[  {
          label:"管护人",
          align:"center",
          sortable:true,
          prop:"username",
          width:"100"
          },
          {
              label:"性别",
              align:"left",
              sortable:false,
              prop:"sex",
              filter:'sex',
              width:"100",
             
          },
          {
              label:"管护人3",
              align:"center",
              sortable:true,
              prop:"username",
              width:"200"
          }]
  },
  {
      label:"管护人3",
      align:"center",
      sortable:true,
      prop:"username",
      width:"200"
  }

]

const bpmnColumns = [
  {
  label:"名称",
  align:"center",
  sortable:true,
  prop:"name",
  width:"150"
  },
  {
      label:"流程标识",
      align:"center",
      sortable:false,
      prop:"key",
      width:"150",
      
  }, 
   {
      label:"版本号",
      align:"center",
      sortable:true,
      prop:"version",
      
      width:"100"
  },
  {
      label:"描述",
      align:"center",
      sortable:true,
      prop:"description",
      width:"200"
  }

];
const allTasksListColumns = [
  {
  label:"名称",
  align:"center",
  sortable:true,
  prop:"name",
  width:"150"
  },
  {
      label:"处理人",
      align:"center",
      sortable:false,
      prop:"assignee",
      width:"150",
      
  }, 
 
     {
      label:"是否已取消",
      align:"center",
      sortable:true,
      prop:"isCanceled",
      formatter:'trueFalse',
      width:"100"
  },
  
  {
      label:"创建时间",
      align:"center",
      sortable:true,
      prop:"createTime",
      formatter:'date',
      width:"200"
  }

];
/**
 * 自定义简单列表页面的数据定义包括
 * 1.表格字段定义
 * 2.搜索条件的自定义页面
 * 3.查询的数据后台
 * 4.按钮列表定义，每个按钮定义它的详情页面，常规操作定义（后台接口，多选表格，单选表格等）
 * 
 */
const simpleListDef = {
      mainPage1:{
       id:"mainPage1",
        tableColumns:tableColumns1,
        opStyle:{
            label:"操作",
          fixed:"right",
          align:"center",
          width:"275",
        },
        dataUrl :"/user/getAllUserList",
        showOrder:true,
        showCheckbox:true,
        showSummary:true,
        dataMethod:"get",
        buttons:[{
            name:"btnAddNew",
            label:"详情"
        }]
},
mainPage2:{
  id:"mainPage2",
  tableColumns:tableColumns2,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/user/getAllUserList",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"get",
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
},
 
allTasksList:{
  id:"allTasksList",
  tableColumns:allTasksListColumns,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/bpmn/allTasks",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"get",
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
},
bpmList:{
  id:"bpmList",
  tableColumns:bpmnColumns,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/bpmn/allDefs",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"get",
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
}, 
repairOrderList:{
  id:"repairOrderList",
  tableColumns:allTasksListColumns,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/repair/findRepairOrderList",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"post",
  detailforms:[{
    id:"repairOrder_detail",
    name:"工单详情",
    buttons:[
      {
        label:"保存详情",
        actionType:"1",
        confirm:false,
        confirmText:"是否需要保存?",
        actionUrl:"/SmartFormPage/save",
        method:"POST",
        type:"primary",
        needData:false,
        size:"small",
        class:"mt-2",


      },
      {
        label:"取消",
        actionType:"1",
        confirm:false,
        confirmText:"是否需要保存?",
        actionUrl:"/SmartFormPage/save",
        method:"POST",
        type:"primary",
        needData:false,
        size:"small",
        class:"mt-2",


      },
    ]

}],
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
},
bpmList:{
  id:"bpmList",
  tableColumns:bpmnColumns,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/bpmn/allDefs",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"get",
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
},
customPageList:{
  id:"customPageList",
  name:"自定义页面列表",
  tableColumns:allTasksListColumns,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/SmartFormPage/list",
  //dataUrl :"/repair/findRepairOrderList",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"POST",

//   detailform:{
//     id:"customPage_detail",
//     title:"基本信息",
//     buttons:[
//       {
//         label:"保存",
//         actionType:"1",
//         confirm:false,
//         confirmText:"是否需要保存?",
//         actionUrl:"/SmartFormPage/save",
//         method:"POST",
//         type:"primary",
//         needData:false,
//         size:"small",
//         class:"mt-2",


//       },
    
//     ]

// },

  detailforms:[{
      id:"customPage_detail",
      name:"基本信息",
      actionUrl:"/SmartFormPage/info",
      method:"POST",
      beData:false,
      
      buttons:[
        {
          label:"保存详情",
          actionType:"1",
          confirm:false,
          confirmText:"是否需要保存?",
          actionUrl:"/SmartFormPage/save",
          method:"POST",
          type:"primary",
          needData:false,
          size:"small",
          css:"mt-2",


        },
      
      ]

  }],
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
},
smartFormList:{
  id:"smartFormList",
  name:"自定义表单列表",
  tableColumns:allTasksListColumns,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/SmartFormModel/list",
  //dataUrl :"/repair/findRepairOrderList",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"POST",
 

  detailforms:[{
      id:"smartFormList_detail",
      name:"基本信息",
      buttons:[
        {
          label:"保存详情",
          actionType:"1",
          confirm:false,
          confirmText:"是否需要保存?",
          actionUrl:"/SmartFormModel/save",
          method:"POST",
          type:"primary",
          needData:false,
          size:"small",
          css:"mt-2",


        },
      
      ]

  }],
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
},
userTaskList:{
  id:"userTaskList",
  name:"用户任务列表",
  tableColumns:allTasksListColumns,
  opStyle:{
      label:"操作",
    fixed:"right",
    align:"center",
    width:"275",
  },
  dataUrl :"/iotTaskInfo/getTaskInfoByUserId",
  //dataUrl :"/repair/findRepairOrderList",
  showOrder:true,
  showCheckbox:true,
  showSummary:true,
  dataMethod:"POST",
 

  detailforms:[{
      id:"smartFormList_detail",
      name:"基本信息",
      buttons:[
        {
          label:"保存详情",
          actionType:"1",
          confirm:false,
          confirmText:"是否需要保存?",
          actionUrl:"/SmartFormModel/save",
          method:"POST",
          type:"primary",
          needData:false,
          size:"small",
          css:"mt-2",


        },
      
      ]

  }],
  buttons:[{
      name:"btnAddNew",
      label:"详情"
  }]
},
};
export default [
    {
      url: '/templateIndex/simpleList/getTableColumns',
      type: 'get',
      response: config => {
        
        return {
          code: 20000,
          status:true,
          data: simpleListDef[config.query.id]
        }
      }
    }
  ]