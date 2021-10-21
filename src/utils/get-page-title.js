/**
 * Created by chenli on 22/7/19.
 */

import defaultSettings from '@/settings'
import i18n from '@/lang'
import store from '@/store'

const title = store.getters.title || defaultSettings.title

export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    // const pageName = i18n.t(`route.${key}`)
    // return `${title} - ${pageName}`
    return `${title}`
  }
  return `${title}`
}
