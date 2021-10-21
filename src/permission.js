/*
 * @Author: dang
 * @Date: 2021-04-08 16:16:03

 * @LastEditTime: 2021-09-28 20:27:52
 * @LastEditors: Please set LastEditors

 * @LastEditTime: 2021-09-16 19:12:46

 * @Description: A worm
 * @FilePath: \iot_gxhy_reservoirdam_web\src\permission.js
 */
import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条 style
import {getToken, setToken, getUserInfo} from '@/utils/auth' // get token from cookie
import {getUrlParam} from '@/utils' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress配置

const whiteList = ['/login', '/auth-redirect', '/Dialog', '/testDialog', '/inspectionTour', 'organization', 'DamMonitoring', 'subskMap',] // 白名单 '/reservoirManagement/listReservoirs'

router.beforeEach(async(to, from, next) => {
  console.log(to, from, next, '路由跳转之前的值')
  console.log(store.getters.menus, '现在的菜单页面')
  // 进度条 start
  NProgress.start()
  // 设置页面title
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  var hasToken = getToken()
  console.log(hasToken, 'hasToken')
  const menusList = store.getters.menus
  let toPath = null
  if (menusList.length) {
    toPath = menusList[0].path
    if (menusList[0].children) {
      if (menusList[0].children.length) {
        toPath = toPath + '/' + menusList[0].children[0].path
      }
    }
  }
  console.log(hasToken, 'hasToken1')
  const subdsysID = sessionStorage.getItem('SystemID')
  const userInfo = getUserInfo()

  console.log(subdsysID, 'subdsysID====888999郭慧娜', userInfo)
  if (!hasToken) {
    console.log(hasToken, '!hasToken')
    var token = getUrlParam('token')
    if (token && token.length >= 32) {
      token = token.substr(0, 32)
      setToken(token)
      hasToken = token
    }
  }
  if (hasToken) {
    console.log(hasToken, 'hasToken666')
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({path: toPath || '/'})
      NProgress.done()
    } else {
      // const rsInfo = this.getUrlParam("rsInfo");
      const hasMenus = store.getters.menus && store.getters.menus.length > 0
      console.log('hasMenus===', hasMenus, store.getters.menus)
      if (hasMenus) {
        if (to.path === '/') {
          next({path: toPath})
        } else {
          next()
        }
      } else {
        console.log('第二次===')
        try {
          const sysmenus = []
          if (subdsysID == 162) {
            if (userInfo.menus) {
              userInfo.menus.forEach((e, i, a) => {
                if (e.systemid == subdsysID) {
                  // 动态改变路径
                  e.children.forEach((e1) => {
                    const children1 = []
                    if (e1.children.length) {
                      e1.children.forEach(e2 => {
                        children1.push({
                          path: e2.menucode,
                          component: e2.menuurl,
                          name: e2.menuname,
                          title: e2.menuname,
                          meta: {title: e2.menuname, icon: e2.menuicon}
                        })
                      })
                    }
                    sysmenus.push({path: e1.menucode,
                      component: 'Layout',
                      name: e1.menuname,
                      title: e1.menuname,
                      redirect: e1.menuurl,
                      meta: {title: e1.menuname, icon: e1.menuicon},
                      children: children1
                    })
                  })
                }
              })
            }
            console.log('菜单', sysmenus)
            // const aa = [{
            //   path: '/skMap',
            //   component: 'Layout',
            //   name: 'skMap',
            //   title: '综合调度',
            //   redirect: '/skMap/skMap',
            //   meta: {title: '综合调度', icon: 'zhjc'},
            //   children: [
            //     {
            //       path: 'skMap',
            //       component: 'shuiku/monitor/index',
            //       name: 'skMapChild',
            //       title: '一张图',
            //       meta: {title: '一张图', icon: 'tp-zhjs'}
            //     }
            //   ]
            // },
            // // 运行管理
            // {
            //   path: '/operationManagement',
            //   component: 'Layout',
            //   redirect: '/operationManagement/inspectionTour',
            //   name: 'operationManagement',
            //   alwaysShow: true,
            //   title: '运行管理',
            //   meta: {
            //     title: '运行管理',
            //     icon: 'yxgl'
            //   },
            //   children: [
            //     {
            //       path: 'inspectionTour',
            //       component: 'shuiku/operationManagement/inspectionTour/index',
            //       name: 'inspectionTour-sk',
            //       title: '巡视检查',
            //       meta: {title: '巡视检查', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'dailyMaintenance',
            //       component: 'shuiku/operationManagement/dailyMaintenance/index',
            //       name: 'dailyMaintenance-sk',
            //       title: '日常养护',
            //       meta: {title: '日常养护', icon: 'dc-tzgg'}
            //     },
            //     // {
            //     //   path: 'equipmentOperation',
            //     //   component: 'shuiku/operationManagement/equipmentOperation/index',
            //     //   name: 'equipmentOperation-sk',
            //     //   title: '设备操作',
            //     //   meta: { title: '设备操作', icon: 'dc-tzgg' }
            //     // },
            //     // {
            //     //   path: 'dailyInspection',
            //     //   component: 'shuiku/operationManagement/dailyInspection/index',
            //     //   name: 'dailyInspection-sk',
            //     //   title: '日常检测',
            //     //   meta: { title: '日常检测', icon: 'dc-tzgg' }
            //     // },
            //     {
            //       path: 'reportRecords',
            //       component: 'shuiku/operationManagement/reportRecords/index',
            //       name: 'reportRecords-sk',
            //       title: '上报记录',
            //       meta: {title: '上报记录', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'taskDistribution',
            //       component: 'shuiku/operationManagement/taskDistribution/index',
            //       name: 'taskDistribution-sk',
            //       title: '任务下发',
            //       meta: {title: '任务下发', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'taskList',
            //       component: 'shuiku/operationManagement/taskList/index',
            //       name: 'taskList-sk',
            //       title: '任务列表',
            //       meta: {title: '任务列表', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'timedTask',
            //       component: 'shuiku/operationManagement/timedTask/index',
            //       name: 'timedTask-sk',
            //       title: '定时任务',
            //       meta: {title: '定时任务', icon: 'dc-tzgg'}
            //     }
            //   ]
            // },

            // // 视频监控
            // {
            //   path: '/videoSurveillance',
            //   component: 'Layout',
            //   redirect: '/videoSurveillance/videoWatch',
            //   name: 'videoSurveillance',
            //   alwaysShow: true,
            //   title: '视频监控',
            //   meta: {
            //     title: '视频监控',
            //     icon: 'spjk'
            //   },
            //   children: [
            //     {
            //       path: 'videoWatch',
            //       component: 'shuiku/videoSurveillance/videoWatch/index',
            //       name: 'videoWatch-sk',
            //       title: '视频监视',
            //       meta: {title: '视频监视', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'partformConfig',
            //       component: 'shuiku/videoSurveillance/partformConfig/index',
            //       name: 'partformConfig-sk',
            //       title: '平台配置',
            //       meta: {title: '平台配置', icon: 'dc-tzgg'}
            //     }
            //   ]
            // },
            // // 预警管理
            // {
            //   path: '/warningManagement',
            //   component: 'Layout',
            //   redirect: '/warningManagement/warnInfo',
            //   name: 'warningManagement-sk',
            //   alwaysShow: true,
            //   title: '预警管理-sk',
            //   meta: {
            //     title: '预警管理',
            //     icon: 'yjgl'
            //   },
            //   children: [
            //     {
            //       path: 'warnInfo',
            //       component: 'shuiku/warningManagement/warnInfo/index',
            //       name: 'warnInfo-sk',
            //       title: '预警信息',
            //       meta: {title: '预警信息', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'threshold',
            //       component: 'shuiku/warningManagement/threshold/index',
            //       name: 'threshold-sk',
            //       title: '预警阈值',
            //       meta: {title: '预警阈值', icon: 'dc-tzgg'}
            //     }
            //   ]
            // },
            // // 水库管理
            // {
            //   path: '/reservoirManagement',
            //   component: 'Layout',
            //   redirect: '/reservoirManagement/listReservoirs',
            //   name: 'reservoirManagement',
            //   alwaysShow: true,
            //   title: '水库管理',
            //   meta: {
            //     title: '水库管理',
            //     icon: 'skgl'
            //   },
            //   children: [
            //     {
            //       path: 'listReservoirs',
            //       component: 'shuiku/reservoirManagement/listReservoirs/index',
            //       name: 'listReservoirs-sk',
            //       title: '水库列表',
            //       meta: {title: '水库列表', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'reservoirPersonnel',
            //       component: 'shuiku/reservoirManagement/reservoirPersonnel/index',
            //       name: 'reservoirPersonnel-sk',
            //       title: '水库人员',
            //       meta: {title: '水库人员', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'maintenancePoint',
            //       component: 'shuiku/reservoirManagement/maintenancePoint/index',
            //       name: 'maintenancePoint-sk',
            //       title: '维护点位',
            //       meta: {title: '维护点位', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'maintenanceStandards',
            //       component: 'shuiku/reservoirManagement/maintenanceStandards/index',
            //       name: 'maintenanceStandards-sk',
            //       title: '维护标准',
            //       meta: {title: '维护标准', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'monitorProject',
            //       component: 'shuiku/reservoirManagement/monitorProject/index',
            //       name: 'monitorProject-sk',
            //       title: '监测项目',
            //       meta: {title: '监测项目', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'engineeringParts',
            //       component: 'shuiku/reservoirManagement/engineeringParts/index',
            //       name: 'engineeringParts-sk',
            //       title: '工程部位',
            //       meta: {title: '工程部位', icon: 'dc-tzgg'}
            //     },
            //     {
            //       path: 'siteManagement',
            //       component: 'shuiku/reservoirManagement/siteManagement/index',
            //       name: 'siteManagement-sk',
            //       title: '站点管理',
            //       meta: {title: '站点管理', icon: 'dc-tzgg'}
            //     }
            //   ]
            // },
            // // 新增-组织机构-系统管理
            // {
            //   path: '/systemManagement',
            //   component: 'Layout',
            //   redirect: '/systemManagement',
            //   name: 'SystemManagement',
            //   alwaysShow: true,
            //   title: '系统管理new',
            //   meta: {
            //     title: '系统管理',
            //     icon: 'xtgl'
            //   },
            //   children: [
            //     {
            //       path: 'organization',
            //       component: 'systemManagement/organization/index',
            //       name: 'Organization',
            //       title: '组织机构',
            //       meta: {title: '组织机构'}
            //     },
            //     {
            //       path: 'userM',
            //       component: 'systemManagement/user/index',
            //       name: 'Userm',
            //       title: '用户管理new',
            //       meta: {title: '用户管理'}
            //     },
            //     {
            //       path: 'roleM',
            //       component: 'systemManagement/role/index',
            //       name: 'Rolem',
            //       title: '角色管理new',
            //       meta: {title: '角色管理'}
            //     },
            //     {
            //       path: 'subsystem',
            //       component: 'systemManagement/subsystem/index',
            //       name: 'Subsystem',
            //       title: '子系统管理',
            //       meta: {title: '子系统管理'}
            //     },
            //     {
            //       path: 'menuM',
            //       component: '/systemManagement/menu/index',
            //       name: 'menuM',
            //       title: '菜单管理new',
            //       meta: {title: '菜单管理'}
            //     }

            //     // {
            //     //   path: "dictM",
            //     //   component: "systemManagement/dict/index",
            //     //   name: "dictM",
            //     //   title: "字典管理",
            //     //   meta: { title: "字典管理" }
            //     // },
            //   ]
            // }
            // ]
            // console.log(aa, '原始菜单')
          } else {
            if (userInfo.menus) {
              userInfo.menus.forEach((e, i, a) => {
                if (e.systemid == subdsysID) {
                  // // 动态改变路径
                  e.children.forEach((e1) => {
                    const children1 = []
                    if (e1.children.length) {
                      e1.children.forEach(e2 => {
                        children1.push(
                          {
                            path: e2.menucode,
                            component: e2.menuurl,
                            name: e2.menucode,
                            title: e2.menuname,
                            meta: {title: e2.menuname, icon: e2.menuicon}
                          })
                      })
                    }
                    sysmenus.push({path: e1.menucode,
                      component: 'Layout',
                      name: e1.menucode,
                      title: e1.menuname,
                      redirect: e1.menuurl,
                      meta: {title: e1.menuname, icon: e1.menuicon},
                      children: children1
                    })
                  })
                }
              })
            }
            // 子系统菜单
            // sysmenus = [
            //   // 水库子系统
            //   {
            //     path: '/subskMap',
            //     component: 'Layout',
            //     name: 'subskMap',
            //     title: '实时监控',
            //     redirect: '/subskMap/subskMap',
            //     meta: {title: '实时监控', icon: 'ssjk'},
            //     children: [
            //       {
            //         path: 'subskMap',
            //         component: 'subShuiku/monitor/index',
            //         name: 'subskMapChild',
            //         title: '一张图',
            //         meta: {title: '一张图', icon: 'tp-zhjs'}
            //       }
            //     ]
            //   },
            //   {
            //     path: '/damSafety',
            //     component: 'Layout',
            //     name: 'damSafety',
            //     title: '大坝',
            //     redirect: '/damSafety/DamMonitoring',
            //     meta: {title: '大坝安全', icon: 'dbaq'},
            //     children: [
            //       {
            //         path: 'DamMonitoring',
            //         component: 'subShuiku/damSafety/DamMonitoring/index',
            //         name: 'DamMonitoring',
            //         title: '大坝监测',
            //         meta: {title: '大坝监测', icon: 'dc-tzgg'}
            //       },
            //       {
            //         path: 'MeasuringPointManagement',
            //         // component: 'subShuiku/damSafety/MeasuringPointManagement/index',
            //         component: 'subShuiku/damSafety/siteManagement/index',

            //         name: 'MeasuringPointManagement',
            //         title: '测点管理',
            //         meta: {title: '测点管理', icon: 'dc-tzgg'}
            //       },

            //       // {
            //       //   path: 'imgAnalysis-sub',
            //       //   component: 'subShuiku/damSafety/imgAnalysis/index',
            //       //   name: 'imgAnalysis-sub',
            //       //   title: '图形分析',
            //       //   meta: { title: '图形分析', icon: 'dc-tzgg' }
            //       // },
            //       {
            //         path: 'hydrograph-sub',
            //         component: 'subShuiku/damSafety/hydrograph/index',
            //         name: 'hydrograph-sub',
            //         title: '过程线分析',
            //         meta: {title: '过程线分析', icon: 'dc-tzgg'}
            //       },
            //       // {
            //       //   path: 'distribute-sub',
            //       //   component: 'subShuiku/damSafety/distribute/index',
            //       //   name: 'distribute-sub',
            //       //   title: '分布图分析',
            //       //   meta: { title: '分布图分析', icon: 'dc-tzgg' }
            //       // },
            //       // meta: { title: '过程线分析', icon: 'dc-tzgg' }
            //       // },
            //       {
            //         path: 'distribute-sub',
            //         component: 'subShuiku/damSafety/distribute/index',
            //         name: 'distribute-sub',
            //         title: '分布图分析',
            //         meta: {title: '分布图分析', icon: 'dc-tzgg'}
            //       },
            //       {
            //         path: 'correlogram-sub',
            //         component: 'subShuiku/damSafety/correlogram/index',
            //         name: 'correlogram-sub',
            //         title: '相关图分析',
            //         meta: {title: '相关图分析', icon: 'dc-tzgg'}
            //       },

            //       {
            //         path: 'siteReport-sub',
            //         component: 'subShuiku/damSafety/siteReport/index',
            //         name: 'siteReport-sub',
            //         title: '测点报表',
            //         meta: {title: '测点报表', icon: 'dc-tzgg'}
            //       }
            //     ]
            //   },
            //   {
            //     path: '/subvideoSurveillance',
            //     component: 'Layout',
            //     redirect: '/subShuiku/subvideoSurveillance',
            //     name: 'subvideoSurveillance',
            //     alwaysShow: true,
            //     title: '视频监测',
            //     meta: {
            //       title: '视频监测',
            //       icon: 'spjk'
            //     },
            //     children: [

            //       {
            //         path: 'video',
            //         component: 'subShuiku/subvideoSurveillance/video/index',
            //         name: 'subvideo',
            //         title: '视频监控',
            //         meta: {title: '视频监控', icon: 'dc-tzgg'}
            //       },

            //       {
            //         path: 'platform',
            //         component: 'subShuiku/subvideoSurveillance/platform/index',
            //         name: 'subplatform',
            //         title: '平台配置',
            //         meta: {title: '平台配置', icon: 'dc-tzgg'}
            //       }
            //     ]
            //   },
            //   // 预警管理-----子系统
            //   {
            //     path: '/warningManagement-sub',
            //     component: 'Layout',
            //     redirect: '/warningManagement-sub/warnInfo',
            //     name: 'warningManagement-sub-sk',
            //     alwaysShow: true,
            //     title: '预警管理',
            //     meta: {
            //       title: '预警管理',
            //       icon: 'yjgl'
            //     },
            //     children: [
            //       {
            //         path: 'warnInfo',
            //         component: 'subShuiku/warningManagement/warnInfo/index',
            //         name: 'warnInfo-sub-sk',
            //         title: '预警信息',
            //         meta: {title: '预警信息', icon: 'dc-tzgg'}
            //       },
            //       {
            //         path: 'threshold',
            //         component: 'subShuiku/warningManagement/threshold/index',
            //         name: 'threshold-sub-sk',
            //         title: '预警阈值',
            //         meta: {title: '预警阈值', icon: 'dc-tzgg'}
            //       }
            //     ]
            //   },
            //   // 运行管理-子系统
            //   {
            //     path: '/operationManagement-sub',
            //     component: 'Layout',
            //     redirect: '/operationManagement-sub/inspectionTour-sub',
            //     name: 'operationManagement-sub',
            //     alwaysShow: true,
            //     title: '运行管理',
            //     meta: {
            //       title: '运行管理',
            //       icon: 'yxgl'
            //     },
            //     children: [
            //       {
            //         path: 'inspectionTour-sub',
            //         component: 'subShuiku/operationManagement/inspectionTour/index',
            //         name: 'inspectionTour-sub-sk',
            //         title: '巡视检查',
            //         meta: {title: '巡视检查', icon: 'dc-tzgg'}
            //       },
            //       {
            //         path: 'dailyMaintenance',
            //         component: 'subShuiku/operationManagement/dailyMaintenance/index',
            //         name: 'dailyMaintenance-sub-sk',
            //         title: '日常养护',
            //         meta: {title: '日常养护', icon: 'dc-tzgg'}
            //       },
            //       // {
            //       //   path: "equipmentOperation",
            //       //   component: "subShuiku/operationManagement/equipmentOperation/index",
            //       //   name: "equipmentOperation-sub-sk",
            //       //   title: "设备操作",
            //       //   meta: { title: "设备操作", icon: "dc-tzgg" }
            //       // },
            //       // {
            //       //   path: "dailyInspection",
            //       //   component: "subShuiku/operationManagement/dailyInspection/index",
            //       //   name: "dailyInspection-sub-sk",
            //       //   title: "日常检测",
            //       //   meta: { title: "日常检测", icon: "dc-tzgg" }
            //       // },
            //       {
            //         path: 'reportRecords',
            //         component: 'subShuiku/operationManagement/reportRecords/index',
            //         name: 'reportRecords-sub-sk',
            //         title: '上报记录',
            //         meta: {title: '上报记录', icon: 'dc-tzgg'}
            //       },
            //       {
            //         path: 'maintenancePoint',
            //         component: 'subShuiku/operationManagement/maintenancePoint/index',
            //         // component: "subShuiku/operationManagement/maintenancePoint/index",
            //         name: 'maintenancePoint-sub-sk',
            //         title: '维护点位',
            //         meta: {title: '维护点位', icon: 'dc-tzgg'}
            //       }

            //       // {
            //       //   path: "taskDistribution",
            //       //   component: "subShuiku/operationManagement/taskDistribution/index",
            //       //   name: "taskDistribution-sub-sk",
            //       //   title: "任务下发",
            //       //   meta: { title: "任务下发", icon: "dc-tzgg" }
            //       // },
            //       // {
            //       //   path: "taskList",
            //       //   component: "subShuiku/operationManagement/taskList/index",
            //       //   name: "taskList-sub-sk",
            //       //   title: "任务列表",
            //       //   meta: { title: "任务列表", icon: "dc-tzgg" }
            //       // },
            //       // {
            //       //   path: "timedTask-sub",
            //       //   component: "subShuiku/operationManagement/timedTask/index",
            //       //   name: "timedTask-sub-sk",
            //       //   title: "定时任务",
            //       //   meta: { title: "定时任务", icon: "dc-tzgg" }
            //       // },
            //       // 预警管理-----子系统
            //     ]
            //   }
            // ]
          }
          // if (subdsysID != null) {
          const menus = await store.dispatch('user/getMenus', JSON.parse(JSON.stringify(sysmenus)))
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            {menus}
          )
          router.addRoutes(accessRoutes)
          next({...to, replace: true})
          // } else {
          //   removeToken()
          //   router.push({
          //     path: '/'
          //   })
          //   return
          // }
        } catch (error) {
          console.log('粉粉粉===')
          // 删除Token，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      //   debugger
      // 免登录白名单,直接进入

      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
