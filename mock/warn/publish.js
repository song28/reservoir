import Mock from 'mockjs'

export default [
  {
    url: '/warn/publish/list',
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

