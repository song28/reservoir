/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-09-07 09:12:37
 * @LastEditTime: 2021-09-13 16:44:37
 */
module.exports = {
  title: '水库安全监测预警系统',
  //title: '通江县地质灾害监测预警系统',
  // title: '九江城市内涝监测预警系统',
   //title: '九江市湖泊内涝监测预警平台',
  // title: '国信物联综合防灾监测预警',
  // title: '通江县地质灾害监测预警系统',

  /**
   * @type {boolean} true | false
   * @description 是否显示设置右侧面板
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description 开启 Tags-View
   */
  tagsView: false,  

  /**
   * @type {boolean} true | false
   * @description 固定 Header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 侧边栏 Logo
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description 界面布局 上下（true） 左右(false)
   */
  pageLayout: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
