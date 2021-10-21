import request from '@/utils/request'

const prod = process.env.VUE_APP_BASE_API_2

export function queryData(url, method, data) {

  if (method == 'post' || method == "POST") {
    return request({
      url: url,
      baseURL: prod,
      method: 'post',
      data: data
    })
  }
  else {
    return request({
      url: url,
      baseURL: prod,
      method: 'get',
      params: {data}
    })
  }
}

export function getTableColumns(data) {
  return request({
    url: '/templateIndex/simpleList/getTableColumns',
    // baseURL: prod,
    method: 'get',
    params: data
  })
}
