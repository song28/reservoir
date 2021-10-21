import Mock from 'mockjs'
import {deepClone} from '../../src/utils/index.js'
import {asyncRoutes, constantRoutes} from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: '超级管理员，所有页面权限',
    routes: routes.filter(i => i.path !== '/system')
  },
  {
    key: 'gxhy',
    name: 'gxhy',
    description: '演示账号，除系统管理以外的所有菜单权限',
    routes: routes.filter(i => i.path !== '/system')// just a mock
  },
  {
    key: 'ywadmin',
    name: 'ywadmin',
    description: '超级管理员，运维权限',
    routes: routes
  }
]

export default [
  // mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/mockrole',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/mockrole/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/mockrole/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
