/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-09-07 09:12:37
 * @LastEditTime: 2021-09-17 14:22:07
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  state: {
    countTimer: 1,
    districtLng: [], // 气象经纬度，地图中心点
    geoJSON: [], // 地图标注的区域数据
    mapZoom: 6,
    zoomLevel: 6
  },
  // 只有mutations中定义的函数，才有权利修改state中的数据
  mutations: {
    changeCount(state, n) {
      state.countTimer = n
    },
    getDistrictLng(state, n) {
      state.districtLng = n
    },
    getGeoJSON(state, n) {
      state.geoJSON = n
    },
    // 省市县乡
    getShengShiXXLevel(state, n) {
      state.mapZoom = n
    },
    changeMapLevel(state, n) {
      state.zoomLevel = n
    }
  },
  modules,
  getters

})

export default store
