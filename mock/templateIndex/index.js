const tableColumns = [
    {
    label:"管护人",
    align:"center",
    sortable:true,
    prop:"username",
    width:"100"
    },
    {
        label:"性别",
        align:"center",
        sortable:true,
        prop:"sex",
        width:"100"
    },
    {
        label:"管护人3",
        align:"center",
        sortable:true,
        prop:"username",
        width:"100"
    }

]
export default [
    {
      url: '/templateIndex/getTableColumns',
      type: 'get',
      response: config => {
        
        return {
          code: 20000,
          data: tableColumns
        }
      }
    }
  ]