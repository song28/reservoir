
import request from '@/utils/request'

const prod = process.env.VUE_APP_BASE_API_2


// 新增
export function saveInfo(data) {
  return request({
    url: '/unit/saveUnit',
    method: 'post',
    baseURL: prod,
    data: data
  })
}

// 删除
export function deleteInfo(data) {
  return request({
    url: '/unit/delBatch',
    method: 'post',
    baseURL: prod,
    data: data
  })
}
