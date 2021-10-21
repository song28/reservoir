import request from '@/utils/request'
const prod = process.env.VUE_APP_BASE_API_2

export function doDelete(query) {
  return request({
    url: '/pro/deletePro',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function getTreeData(query) {
  return request({
    url: '/pro/listTree',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function changeTableData(query) {
  return request({
    url: '/pro/getTableDataByPId',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function submitForm(query) {
  return request({
    url: '/baseInfo/saveColumn',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
