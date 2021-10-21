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
    count: 8888
  },
  //只有mutations中定义的函数，才有权利修改state中的数据
  mutations: {
    add(state) {
      state.count++
    },
    //加法
    addTest(state, n) {
      state.count += n
    },
    //减法
    subTest(state, n) {
      state.count -= n

    },
  },
  actions: {
    //在actions中,不能直接修改state中的数据
    //必须通过context.commit()中触发mutations修改才可以
    addAsync(context, n) {
      setTimeout(() => {
        context.commit('addTest', n)
      }, 1000)
    },
    subAsync(context, n) {
      setTimeout(() => {
        context.commit('subTest', n)
      }, 1000)
    },
  },
  getters: {
    showNum(state) {
      return 'getter-当前最新数量' + state.count
    }
  },
  // modules,
  // getters,
})

export default store
