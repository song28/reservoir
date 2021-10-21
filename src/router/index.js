import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
console.log(Layout,'布局------');
/* Router Modules */
// import systemRouter from './modules/system

/**
 //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 hidden: true // (默认 false)

 //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noRedirect'

 //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 //若你想不管路由下面的 children 声明的个数都显示你的根路由
 //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true

 name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
    roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
    title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name' //设置该路由的图标
    noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

/**
 * constantRoutes
 * 所有权限通用路由表
 * 如首页和登录页和一些不用权限的公用页面
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/reservoirManagement/listReservoirs',
  //   component: () => import('@/views/shuiku/reservoirManagement/listReservoirs/index'),
  //   hidden: true
  // },
  
  {
    path: '/subSys',
    component: () => import('@/views/shuiku/subSys/index'),
    hidden: true
  },
  // {
  //   path: '/subskMap',
  //   component: () => import('@/views/subShuiku/monitor/index'),
  //   hidden: true
  // },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // {
  //   path: '/Dialog',
  //   component: () => import('@/views/dz/components/Dialog'),
  //   hidden: true
  // },
  // {
  //   path: '/testDialog',
  //   component: () => import('@/views/dz/components/testDialog'),
  //   hidden: true
  // },
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },
  // {
  //   path: '/jjnlTv',
  //   component: () => import('@/views/CSNL/tv'),
  //   hidden: true
  // }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = []

// 实例化vue的时候只挂载constantRouter
const createRouter = () => new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// 异步挂载的路由，动态需要根据权限加载的路由表
export function resetRouter() {
  const newRouter = createRouter()
  if (!newRouter.matcher.length) {
    location.reload()
  }
  router.matcher = newRouter.matcher // 重置路由
}

export default router
