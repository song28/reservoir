import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const {showSettings, tagsView, fixedHeader, sidebarLogo} = defaultSettings
import {getPageLayout} from '@/utils/auth'

const page = getPageLayout()

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  pageLayout: page
}

const mutations = {
  CHANGE_SETTING: (state, {key, value}) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({commit}, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

