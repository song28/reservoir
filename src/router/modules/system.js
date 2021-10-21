import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system',
  name: 'System',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'xtgl'
  },
  children: [

    {
      path: 'templateIndex_simpleList2',
      component: () => import('@/views/bpmn/index'),
      name: 'templateIndex_simpleList2',
      meta: { title: '新建工作流' ,query:"mainPage2"}
    },
    {
      path: 'bpmList',
      component: () => import('@/views/TemplateIndex/simpleList/index'),
      name: 'bpmList',
      meta: { title: '流程列表' ,query:"bpmList"}
    },
    {
      path: 'allTasksList',
      component: () => import('@/views/TemplateIndex/simpleList/index'),
      name: 'allTasksList',
      meta: { title: '代办任务列表' ,query:"allTasksList"}
    },
    {
      path: 'customPageList',
      component: () => import('@/views/TemplateIndex/simpleList/index'),
      name: 'customPageList',
      meta: { title: '自定义页面列表' ,query:"customPageList"},

    },
       {
      path: 'smartFormList',
      component: () => import('@/views/TemplateIndex/simpleList/index'),
      name: 'smartFormList',
      meta: { title: '智能表单列表' ,query:"smartFormList"},

    },

    {
      path: 'SysDataTableList',
      component: () => import('@/views/TemplateIndex/simpleList/index'),
      name: 'SysDataTableList',
      meta: { title: '元数据列表' ,query:"SysDataTableList"},

    },


    {
      path: 'user',
      component: () => import('@/views/system/user/index'),
      name: 'User',
      meta: { title: '用户管理'}
    },
    {
      path: 'role',
      component: () => import('@/views/system/role/index'),
      name: 'Role',
      meta: { title: '角色管理'}
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu/index'),
      name: 'Menu',
      meta: { title: '菜单管理' }
    },

    {
      path: 'dict',
      component: () => import('@/views/system/dict/index'),
      name: 'Dict',
      meta: { title: '字典管理' }
    },
    {
      path: 'deviceCate',
      component: () => import('@/views/system/deviceCate/index'),
      name: 'DeviceCate',
      meta: { title: '设备分类管理' }
    },
    {
      path: 'dept',
      component: () => import('@/views/system/dept/index'),
      name: 'Dept',
      meta: { title: '部门管理' }
    },
    {
      path: 'smartform',
      component: () => import('@/views/system/smartform/index'),
      name: 'SmartForm',
      meta: { title: '智能表单' }
    }
  ]
}

export default systemRouter
