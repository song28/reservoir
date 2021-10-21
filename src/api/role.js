import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/mockrole',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/mockrole/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/mockrole/${id}`,
    method: 'delete'
  })
}
