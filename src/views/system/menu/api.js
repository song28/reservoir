import request from '@/utils/request'


const prod = (process.env.VUE_APP_BASE_API_2)
export function doDelete(query) {
  return request({
    url: 'menu/deleteMenu',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function getTreeData(query) {
  return request({
    url: 'menu/listTreeById',
    method: 'post',
    data: query,
    baseURL: prod
  })
}

export function changeTableData(query) {
  return request({
    url: 'menu/getTableDataByPId',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function submitForm_tree(query) {
  return request({
    url: 'menu/saveFunction',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function submitForm_edit(query) {
  return request({
    url: 'menu/updateFunction',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
export function editForm_tree(query) {
  return request({
    url: 'menu/updateTreeNodeDataById',
    method: 'post',
    data: query,
    baseURL: prod
  })
}

export function edit(query) {
  return request({
    url: 'menu/getTreeNodeDataById',
    method: 'post',
    data: query,
    baseURL: prod
  })
}
