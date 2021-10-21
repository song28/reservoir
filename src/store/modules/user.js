import {getInfo, getMenus, getUserMenus, login, loginOAM, logout} from '@/api/user'
// import {getUserInfo, removeSessionStorage, setBrainFormUrl, setToken,setUserPower} from '@/utils/auth'
import {getUserInfo, removeSessionStorage, setBrainFormUrl, setToken, setUserPower, getUserPower, getVerifyCode} from '@/utils/auth'
import {brainFormIp, brainFormPort} from '@/api/base'
import {treeToObject, userPermissonMenus} from '@/utils'
import router, {resetRouter} from '@/router'
import {Message} from 'element-ui'

const userInfo = getUserInfo()
debugger
console.log(2222, 'ghn===', userInfo)
const userPowers = getUserPower()
const state = {
  token: userInfo.token,
  name: userInfo.name,
  userId: userInfo.id,
  addvcd: userInfo.addvcd,
  addvnm: userInfo.addvnm,
  avatar: '',
  introduction: '',
  roles: [],
  menus: [],
  powers: userPowers
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_POWER: (state, powers) => {
    setUserPower(powers)
    state.powers = powers
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_ADDVCD: (state, addvcd) => {
    state.addvcd = addvcd
  },
  SET_ADDVNM: (state, addvnm) => {
    state.addvnm = addvnm
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
// ###### ghn更改重要--》设置menu加载跳转的路由==》SET_MENUS==menu 示例
//   const uu = [{
//     'path': '/skMap',
//     'component': 'Layout',
//     'name': 'skMap',
//     'title': '综合调度',
//     'redirect': '/skMap/skMap',
//     'meta': {
//       'title': '综合调度',
//       'icon': 'dc-zhjs'
//     },
//     'children': [
//       {
//         'path': 'skMap',
//         'component': 'shuiku/monitor/index',
//         'name': 'skMapChild',
//         'title': '水库一张图',
//         'meta': {
//           'title': '一张图',
//           'icon': 'tp-zhjs'
//         }
//       }
//     ]
//   }, {
//     'path': '/videoSurveillance',
//     'component': 'Layout',
//     'redirect': '/videoSurveillance/videoWatch',
//     'name': 'videoSurveillance',
//     'alwaysShow': true,
//     'title': '视频监控',
//     'meta': {
//       'title': '视频监控',
//       'icon': 'dc-bg'
//     },
//     'children': [{
//       'path': 'videoWatch',
//       'component': 'shuiku/videoSurveillance/videoWatch/index',
//       'name': 'videoWatch-sk',
//       'title': '视频监视',
//       'meta': {
//         'title': '视频监测',
//         'icon': 'dc-tzgg'
//       }
//     }, {
//       'path': 'partformConfig',
//       'component': 'shuiku/videoSurveillance/partformConfig/index',
//       'name': 'partformConfig-sk',
//       'title': '平台配置',
//       'meta': {
//         'title': '平台配置',
//         'icon': 'dc-tzgg'
//       }
//     }]
//   }]
const actions = {
  getMenus({commit}, menusINfo) { // 这个是新增的action
    const menus = menusINfo
    console.log(menusINfo, 'menusINfo---99977')
    commit('SET_MENUS', menus)
    return menus
  },
  setMenus({commit}, menusINfo) { // 这个是新增的action
    const menus = menusINfo
    console.log(menusINfo, 'set')
    commit('SET_MENUS', menus)
    return menus
  },
  // user login
  login({commit}, userInfo) {
    const {username, password, code} = userInfo
    if (username && password) {
      return new Promise((resolve, reject) => {
        login({username: username.trim(), password: password, code: code}).then(response => {
          if (response.status == 200) {
            const pp = [
              'UtilSystem',
              'timedTask-sk',
              'siteManagement-sk',
              'SystemManagement',
              'taskList-sk',
              'engineeringParts-sk',
              'monitorProject-sk',
              'maintenanceStandards-sk',
              'warningManagement-sk',
              'SystemRole',
              'maintenancePoint-sk',
              'SystemMenu',
              'reservoirManagement',
              'threshold-sk',
              'operationManagement',
              'reservoirPersonnel-sk',
              'partformConfig-sk',
              'listReservoirs-sk',
              'workbench',
              'sk-workbench',
              'reportRecords-sk',
              'taskDistribution-sk',
              'dailyMaintenance-sk',
              'inspectionTour-sk',
              'videoSurveillance',
              'videoWatch-sk',
              'SystemUser',
              'skMapChild',
              'menuM',
              'Organization',
              'Userm',
              'Rolem',
              'Subsystem',
              'maintenanceInspectionsDC',
              'warnInfo-sk',
              'skMap'
            ]
            if (response.obj) {
              commit('SET_POWER', pp)
            } else {
              commit('SET_POWER', [])
            }
            // if (!response.obj.id) {
            //   reject('无菜单权限')
            //   return
            // }
            commit('SET_TOKEN', response.obj.token)
            commit('SET_ADDVCD', response.obj.addvcd)
            commit('SET_ADDVNM', response.obj.addvnm)
            commit('SET_NAME', response.obj.name)
            commit('SET_USERID', response.obj.id)
            setToken(response.obj.token)
            setBrainFormUrl(brainFormIp, brainFormPort)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },

  // user login
  loginOAM({commit}, username) {
    if (username) {
      return new Promise((resolve, reject) => {
        loginOAM(username).then(response => {
          if (response.status) {
            if (response.data && response.data.permissionValues) {
              commit('SET_POWER', [...response.data.permissionValues])
            } else {
              commit('SET_POWER', [])
            }
            commit('SET_TOKEN', response.msg)
            setToken(response.msg)
            resolve()
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo({'data': state.token}).then(response => {
        const {data} = response
        if (!data) {
          reject('验证失败，请重新登录...')
        }
        const {roles, name, id, addvcd, addvnm} = data
        // 角色必须是非空数组
        // if (!roles || roles.length <= 0) {
        //   reject('角色必须是非空数组!')
        // }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_USERID', id)
        commit('SET_ADDVCD', addvcd)
        commit('SET_ADDVNM', addvnm)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit}) {
    return new Promise((resolve, reject) => {
      logout({token: getVerifyCode()}).then(res => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeSessionStorage()
        resetRouter()
        Message.success(res.msg)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeSessionStorage()
      resolve()
    })
  },

  // 动态地修改权限
  changeRoles({commit, dispatch}, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {roles} = await dispatch('getInfo')
      resetRouter()

      // ：根据角色生成可访问路由映射
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})

      // 动态添加可访问路由
      router.addRoutes(accessRoutes)
      // 重置已访问视图和缓存视图
      dispatch('tagsView/delAllViews', null, {root: true})

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
