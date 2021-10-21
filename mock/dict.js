import Mock from 'mockjs'

const List = []
export default [
  {
    url: '/dict',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: List
      }
    }
  }
]

