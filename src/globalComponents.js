/*
* 全局公共图表
* */
import baseCommon from '@/common/chart/Common'
import baseRain from '@/common/chart/Rain'
import baseWater from '@/common/chart/Water'
import baseRainwater from '@/common/chart/RainWater'
import baseWaterdown from '@/common/chart/Waterdown'
import baseWork from '@/common/chart/Work'
import baseCrack from '@/common/chart/Crack'
import baseOffset from '@/common/chart/Offset'
import baseGnss from '@/common/chart/Gnss'
import baseImage from '@/common/Image'
import baseVideo from '@/common/Video'
import baseBroadCast from '@/common/chart/BroadCast'
import baseClayWater from '@/common/chart/ClayWater'
import baseVideortu from '@/common/chart/Videortu'
/*
* 全局站点详情组件
* */
import baseSiteInfo from '@/common/SiteInfo'
import siteMonitoring from '@/common/Monitoring'
// import siteMonitoringDz from '@/common/MonitoringDz'
import siteMonitoringWorkELE from '@/common/MonitoringWorkELE'
import siteImage from '@/common/Image'
import siteVideo from '@/common/Video'
import siteWarning from '@/common/Warning'
import siteWork from '@/common/Work'
import siteBasic from '@/common/Basic'
import siteInstall from '@/common/Install'

/*
* 全部表格组件
* */
import FilterToggler from '@/components/FilterToggler'
import FilterTogglerUp from '@/components/FilterTogglerUp'
import Pagination from '@/components/Pagination'
import CRUD from '@/components/CRUD'

import VideoPlay from '@/components/VideoPlay'

/** 
 * 自定义表单控件
*/
import SmartForm from '@/common/SmartForm.vue'


/**
 *
 * @param {*} Vue
 */
function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  Vue.component('baseCommon', baseCommon)
  Vue.component('baseRain', baseRain)
  Vue.component('baseWater', baseWater)
  Vue.component('baseRainwater', baseRainwater)
  Vue.component('baseWaterdown', baseWaterdown)
  Vue.component('baseClaywater', baseClayWater)
  Vue.component('baseVideortu', baseVideortu)
  Vue.component('baseWork', baseWork)
  Vue.component('baseCrack', baseCrack)
  Vue.component('baseOffset', baseOffset)
  Vue.component('baseGnss', baseGnss)
  Vue.component('baseImage', baseImage)
  Vue.component('baseVideo', baseVideo)
Vue.component('baseBroadcast', baseBroadCast)
  
  Vue.component('baseSiteInfo', baseSiteInfo)
  Vue.component('siteMonitoring', siteMonitoring)
  // Vue.component('siteMonitoringDz', siteMonitoringDz)
  
    Vue.component('siteMonitoringWork', siteMonitoringWorkELE)

  Vue.component('siteImage', siteImage)
  Vue.component('siteVideo', siteVideo)
  Vue.component('siteWarning', siteWarning)
  Vue.component('siteBasic', siteBasic)
  Vue.component('siteWork', siteWork)
  Vue.component('siteInstall', siteInstall)

  Vue.component('FilterToggler', FilterToggler)
  Vue.component('FilterTogglerUp', FilterTogglerUp)
  Vue.component('Pagination', Pagination)
  Vue.component('SmartForm', SmartForm)
  Vue.component('VideoPlay', VideoPlay)
  Vue.component('CRUD', CRUD)
}

export default plugin
