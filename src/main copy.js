import 'babel-polyfill'
import Vue from 'vue'
import '@/assets/js/rem'
import {BASE_API_6} from "@/api/base.js"

/**
 * 全局css
 */
import 'normalize.css/normalize.css'
// import 'iot_brainform/dist/FormMaking.css'
import './styles/element-variables.scss'
import '@/styles/index.scss'
import '@/icons/font/iconfont.css'

import '@/assets/js/drag'
import moment from 'moment'
import App from './App'
import store from './store'
import router from './router'
import i18n from './lang'
import $Axios from 'axios'
import ElementUI from 'element-ui'
// import FormMaking from 'iot_brainform'
// 可视化图表组件
// import DataV from '@jiaminghi/data-view'
import $ from 'jquery'
import ace from 'ace-builds'
Vue.prototype.$moment = moment
Vue.use(ace)

import VCharts from 'v-charts'
import 'v-charts/lib/style.css'

import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'

Vue.use(VXEUtils, XEUtils)
import Print from 'vue-print-nb'

Vue.use(Print)
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import VueAMap from 'vue-amap'

/* 全局组件 */
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


import consts from '@/utils/common_consts'

import { hasRight } from '@/utils/sqlAjaxUtil'
import "./utils/dialog"
import "./utils/down"

Vue.prototype.$hasRight = hasRight
Vue.prototype.$consts = consts


setTimeout(function () {
  localStorage.clear()
  Vue.use(VueAMap)
}, 0)
Vue.use(VXETable)

// Vue.use(DataV)
Vue.use(VCharts)

XEUtils.mixin({
  // 自定义全局的格式化处理函数
  formatSelect(cellValue, list) {
    const item = list.find(item => item.value === cellValue)
    return item ? item.label : ''
  },
  formatTrueFalse(cellValue, list) {
    return cellValue === false ? '否' : cellValue === true ? '是' : ''
  },
  formatFaltType(cellValue, list) {
    if (cellValue === 0) {
      return '工况异常'
    } else if (cellValue === 1) {
      return '采集信息异常'
    } else if (cellValue === 2) {
      return '网络数据异常（sim卡到期）'
    } else if (cellValue === 3) {
      return '部件损坏故障'
    } else {
      return cellValue
    }
    // return cellValue==false ?"否" : cellValue==true?"是":"";
  },
  formatExamineStatus(cellValue, list) {
    if (cellValue === 0) {
      return '待审核'
    } else if (cellValue === 1) {
      return '审核通过'
    } else if (cellValue === 2) {
      return '审核未通过'
    } else {
      return cellValue
    }
    // return cellValue==false ?"否" : cellValue==true?"是":"";
  }

})
VueAMap.initAMapApiLoader({
  key: '83eba31f57f44a667b8a0a4888ca0693',
  plugin: [
    'DistrictSearch',
    'AMap.Geolocation', // 定位
    'AMap.Weather', // 天气
    'AMap.CitySearch' // 城市
  ],
  v: '1.4.4'
})
import vRegion from 'v-region'

import '@/icons/index'
import '@/permission'
import * as filters from './filters'
import permission from '@/directive/permission/index.js'

import { prompt } from '@/utils/prompt'
import { getRegion, getUserRegion } from '@/utils'

Vue.prototype.$GXprompt = prompt
Vue.prototype.$getRegion = getRegion
Vue.prototype.$getUserRegion = getUserRegion

/**
 * MockJs将在生产环境中使用，
 * 请在上线前删除!!!
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

/**
 * elementui
 * 多语言
 */
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * 行政区
 */

Vue.use(vRegion)

/**
 * 智能表单
 */
// Vue.use(FormMaking)


/**
 * 用户权限/权限判断指令
 */
Vue.use(permission)

/**
 * 全局过滤器
 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/**
 * 现阶段暂用，后期调好前后端交互后移除
 */
Vue.prototype.$http = $Axios

/**
 * 阻止启动生产环境消息
 */
Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
import VueSocketIO from 'vue-socket.io'


// Vue.use(new VueSocketIO({
//   debug: true,
//   connection:'http://192.168.1.130:18088/app/queryUsersLocation'
// }))



