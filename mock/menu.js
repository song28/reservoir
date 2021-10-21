import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    menuId: i + 1,
    menuNm: i + 1,
    attr: i + 1,
    sort: i + 1,
    date: new Date()
  }))
}

export default [
  {
    url: '/menu/list',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20 } = config.query

      var mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/menu/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/menu/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

