import request from '@/utils/request'

const baseAPI = process.env.VUE_APP_BASE_API_2

// 维修知识库-列表
export function getKnowledgeList(params) {
  return request({
    url: '',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 维修知识库-新增
export function addKnowledge(params) {
  return request({
    url: '',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}

// 维修知识库-删除
export function delectKnowledge(params) {
  return request({
    url: '',
    method: 'POST',
    data: params,
    baseURL: baseAPI
  })
}
