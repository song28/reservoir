import request from '@/utils/request'
const prod = (process.env.VUE_APP_BASE_API_2)
export function getList() {
  return request({
    url: 'role/getAllRoles',
    baseURL: prod,
    method: 'get'
  })
}
export function seachByName(query) {
  return request({
    url: 'role/getAllRolesByName',
    baseURL: prod,
    method: 'post',
    data: query
  })
}

export function submitForm(query) {
  return request({
    url: 'role/save',
    baseURL: prod,
    method: 'post',
    data: query
  })
}


export function doDelete(query){
  return request({
    url: 'role/delete',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function doDeleteMultiple(query) {
  return request({
    url: 'role/doDeleteMultiple',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function getRightTreeList(query){
  return request({
    url: 'menu/getRightTree',
    baseURL: prod,
    method: 'get',
    params: query
  })
}
export function saveRight(query){
  return request({
    url: 'role/saveRight',
    baseURL: prod,
    method: 'post',
    data: query
  })
}
export function getRolePermissions(id){
  return request({
    url: 'role/getRolePermissions/'+id,
    baseURL: prod,
    method: 'get'

  })
}
export function getAllRoles(query){
  return request({
    url: 'role/getAllRoles',
    baseURL: prod,
    method: 'get'

  })
}

