import request from '@/utils/request'
const prod = process.env.VUE_APP_BASE_API_2

export function doDelete(query) {
  return request({
    url: '/dv/deleteDictValById',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function getTreeData(query) {
  return request({
    url: '/dict/listTreeById',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function changeTableData(query) {
  return request({
    url: '/dv/listTreeDictValById',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function submitForm_tree(query) {
  return request({
    url: '/dict/save',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function submitForm_edit(query) {
  return request({
    url: '/dv/updateDictValById',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function submitForm(query) {
  return request({
    url: '/dv/save',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function loadDicts(query) {
  return request({
    url: '/dv/getitemsbydict',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function doDeleteTreeNode(query) {
  return request({
    url: '/dict/deleteDict',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
