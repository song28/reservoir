// Just a mock data

export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/Dialog',
    component: 'views/dz/components/Dialog',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '/tv',
    component: 'views/tv/index',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'map',
    children: [
      {
        path: '/addvcd',
        component: 'views/addvcd/index',
        name: 'Map',
        meta: {title: 'map', icon: 'map', affix: true}
      }
    ]
  },
]

export const asyncRoutes = [
  {
    path: '/warn',
    component: 'layout/Layout',
    redirect: '/warn',
    name: 'Warn',
    alwaysShow: true,
    meta: {
      title: 'warn',
      icon: 'setting',
    },
    children: [
      {
        path: 'publish',
        component: 'views/warn/publish/index',
        name: 'Publish',
        meta: {title: 'warnPublish'}
      },
      {
        path: 'log',
        component: 'views/warn/log/index',
        name: 'Log',
        meta: {title: 'warnLog'}

      },
      {
        path: 'rule',
        component: 'views/warn/rule/index',
        name: 'Rule',
        meta: {title: 'warnRule'}
      },
      {
        path: 'benefit',
        component: 'views/warn/benefit/index',
        name: 'Benefit',
        meta: {title: 'warnBenefit'}
      }
    ]
  },
 
  {
    path: '/patrol',
    component: 'layout/Layout',
    redirect: '/patrol',
    name: 'Patrol',
    alwaysShow: true,
    meta: {
      title: 'patrol',
      icon: 'setting'
    },
    children: [
      {
        path: 'task',
        component: 'views/patrol/taskManager/index',
        name: 'Task',
        meta: {title: 'patrolTask'}
      },
      {
        path: 'log',
        component: 'views/patrol/log/index',
        name: 'Log',
        meta: {title: 'patrolLog'}
      },
      {
        path: 'stat',
        component: 'views/patrol/stat/index',
        name: 'Stat',
        meta: {title: 'patrolStat'}
      }
    ]
  },
  {
    path: '/system',
    component: 'layout/Layout',
    redirect: '/system',
    name: 'System',
    alwaysShow: true,
    meta: {
      title: 'system',
      icon: 'setting',
      roles: ['admin', 'ywadmin']
    },
    children: [
      {
        path: 'user',
        component: 'views/system/user/index',
        name: 'User',
        meta: {title: 'systemUser'}
      },
      {
        path: 'role',
        component: 'views/system/role/index',
        name: 'Role',
        meta: {title: 'systemRole'}
      },
      {
        path: 'menu',
        component: 'views/system/menu/index',
        name: 'Menu',
        meta: {title: 'systemMenu'}
      },
      {
        path: 'dict',
        component: 'views/system/dict/index',
        name: 'Dict',
        meta: {title: 'systemDict'}
      },
      {
        path: 'dept',
        component: 'views/system/dept/index',
        name: 'Dept',
        meta: {title: 'systemDept'}
      }

    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
