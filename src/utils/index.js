/**
 * Created by chenli on 22/7/19.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (time == null) {
    return ''
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last webmap precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 获取行政区信息
 * @param {Object}
 * @returns {Object}
 */
export function getRegion(datas) {
  const obj = {
    addvnm: null,
    addvcd: null,
    stlc: ''
  }
  if (datas.province) {
    obj.addvnm = datas.province.value
    obj.addvcd = datas.province.key + '000000'
    obj.stlc += datas.province.value
  }
  if (datas.city) {
    obj.addvnm = datas.city.value
    obj.addvcd = datas.city.key + '000000'
    obj.stlc += datas.city.value
  }
  if (datas.area) {
    obj.addvnm = datas.area.value
    obj.addvcd = datas.area.key + '000000'
    obj.stlc += datas.area.value
  }
  if (datas.town) {
    obj.addvnm = datas.town.value
    obj.addvcd = datas.town.key + '000'
    obj.stlc += datas.town.value
  }
  return obj
}

/**
 * 获取用户行政区信息
 * @param {Object}
 * @returns {Object}
 */
export function getUserRegion(addvcd) {
  const obj = {
    province: null,
    city: null,
    area: null,
    town: null
  }
  if (!addvcd) {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    addvcd = userInfo.addvcd
  }
  if (!addvcd) {
    return obj
  }
  if (addvcd.length == 6) {
    addvcd = addvcd + '000000'
  }
  obj.province = addvcd.substring(0, 2) + '0000'
  obj.city = addvcd.substring(0, 4) + '00'
  obj.area = addvcd.substring(0, 6)
  obj.town = addvcd.substring(0, 9)
  return obj
}

// 深度克隆方法
export const shallowClone = (source) => {
  const targetObj = source.constructor === Array ? [] : {} // 判断复制的目标是数组还是对象
  for (const keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] != null && (source[keys].constructor == Array || source[keys].constructor == Object)) {
        targetObj[keys] = shallowClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export const generateUUID = () => {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
  return uuid
}

// 将树形结构切换成Object
export const treeToObject = (source, targetObj, idField, childField) => {
  if (!targetObj) {
    targetObj = {}
  }
  if (!source) { return targetObj }

  if (!idField) {
    idField = 'name'
  }
  if (!childField) {
    childField = 'children'
  }
  if (source.constructor === Object) {
    targetObj[source[idField]] = source
  } else {
    targetObj[source[idField]] = source
    source.forEach(d => {
      treeToObject(d, targetObj, idField, childField)
      if (d[childField]) {
        d[childField].forEach(c => {
          treeToObject(c, targetObj, idField, childField)
        })
      }
    })
  }
  return targetObj
}

// 根据用户权限获取树形菜单
// menus 用户权限菜单
// srcMenus 用户定义的菜单
export const userPermissonMenus = (menus, srcMenus) => {
  const retMenus = []
  srcMenus.forEach(d => {
    if (menus[d.code]) {
      const newMenu = menus[d.code]
      if (!menus[d.code].meta) {
        newMenu.meta = {}
      }
      if (d.name) {
        newMenu.meta.title = d.name
      }
      if (d.icon) {

        //  newMenu.meta.icon = d.icon;
      }

      newMenu['children'] = []
      if (d.children) {
        d.children.forEach(c => {
          if (menus[c.code]) {
            if (!menus[c.code].meta) {
              menus[c.code].meta = {}
            }
            if (c.name) {
              menus[c.code].meta.title = c.name
            }
            if (c.icon) {

              //  menus[c.code].meta.icon = c.icon;
            }
            newMenu['children'].push(menus[c.code])
          }
        })
      }
      retMenus.push(newMenu)
    }
  })
  return retMenus
}

// 获取url参数
export function getUrlParam(paraName) {
  var url = decodeURI(document.location)
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&')
    var arr
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  }
}

/**
 * 十六进制颜色值转为带透明度的颜色
 * @param _color 十六进制颜色
 * @param _opacity 透明度
 * @returns {string} rgba
 */
export function hexToRGBA(_color, _opacity) {
  var sColor = _color.toLowerCase()
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    var sColorChange = []
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'rgba(' + sColorChange.join(',') + ',' + _opacity + ')'
  }
  return sColor
}

// 根据行政区编码判断省市县乡村级别
export function getLevel(addvcd) {
  let count = null // 行政区从后往前连续0的个数
  let level = null // 属于省市县的哪个级别
  const arr = []
  for (let i = 0; i < 12; i++) {
    arr.push(addvcd.toString().charAt(i))
  }
  arr.reverse()
  if (addvcd) {
    arr.some((e, i, a) => {
      if (e != 0) {
        count = i
        return true
      }
    })
  }
  if (count >= 10) {
    level = 1
  } else if (count < 10 && count >= 8) {
    level = 2
  } else if (count < 8 && count >= 6) {
    level = 3 // 12
  } else {
    level = 4 // 13
  }
  return level
}
