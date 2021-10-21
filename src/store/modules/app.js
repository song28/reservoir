import Cookies from 'js-cookie'
import {getLanguage} from '@/lang/index'
import {
  getUserInfo
} from '@/utils/auth'

const userInfo = getUserInfo()

console.log(userInfo, '用户的信息')
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  header: {
    opened: Cookies.get('headerStatus') ? !!+Cookies.get('headerStatus') : false
  },
  language: getLanguage(),
  pageLayout: {
    opened: Cookies.get('pageLayoutStatus') ? !!+Cookies.get('pageLayoutStatus') : true
  },
  title: userInfo.title,
  routers: [],
  parentPath: ''
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  TOGGLE_PAGELAYOUT: state => {
    state.pageLayout.opened = !state.pageLayout.opened
    if (state.pageLayout.opened) {
      Cookies.set('pageLayoutStatus', 1)
    } else {
      Cookies.set('pageLayoutStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_HEADER: (state, hidden) => {
    state.header.opened = hidden
    Cookies.set('headerStatus', hidden)
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_TITLE: (state, title) => {
    state.title = title
  },
  SET_ROUTERS: (state, routers) => {
    state.routers = routers
  },
  SET_PARENTPATH: (state, path) => {
    state.parentPath = path
  }
}

const actions = {
  toggleSideBar({commit}) {
    commit('TOGGLE_SIDEBAR')
  },
  togglePageLayout({commit}) {
    commit('TOGGLE_PAGELAYOUT')
  },
  closeSideBar({commit}, {withoutAnimation}) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleHeader({commit}, status) {
    commit('TOGGLE_HEADER', status)
  },
  setLanguage({commit}, language) {
    commit('SET_LANGUAGE', language)
  },
  setTitle({commit}, title) {
    commit('SET_TITLE', title)
  },
  setRouters({commit}, routers) {
    commit('SET_ROUTERS', routers)
  },
  setParentPath({commit}, path) {
    commit('SET_PARENTPATH', path)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
