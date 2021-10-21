import Mock from 'mockjs'

export default [
  {
    url: '/warn/rule/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: 0,
          items: []
        }
      }
    }
  }
]

