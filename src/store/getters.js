/*
 * @Descripttion: screen
 * @version: 1.0
 * @Author: ghn
 * @Date: 2021-09-07 09:12:37
 * @LastEditTime: 2021-09-24 14:43:06
 */
const getters = {
  title: state => state.app.title,
  sidebar: state => state.app.sidebar,
  // setEditableTabs: state => state.tab.setEditableTabs,
  // setEditableTabsValue: state => state.tab.setEditableTabsValue,
  header: state => state.app.header,
  language: state => state.app.language,
  pageLayout: state => state.app.pageLayout,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  addvcd: state => state.user.addvcd,
  addvnm: state => state.user.addvnm,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  powers: state => state.user.powers,
  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes,
  routers: state => state.app.routers,
  parentPath: state => state.app.parentPath
}

export default getters
