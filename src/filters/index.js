export { parseTime, formatTime } from '@/utils'

/**
 * 等级
 */
export function getWarnLev(val) {
  switch (val) {
    case '01':
      return '蓝色'
      break
    case '02':
      return '黄色'
      break
    case '03':
      return '橙色'
      break
    case '04':
      return '红色'
      break
    case 'FF':
      return '一键报警'
      break
    case '0':
      return '解除预警'
      break
    default:
      return '- -'
  }
}

/**
 * 任务状态
 */
export function getTaskStatus(val) {
  switch (Number(val)) {
    case 0:
      return '未分配'
      break
    case 1:
      return '未开工'
      break
    case 2:
      return '实施中'
      break
    case 3:
      return '待审核'
      break
    case 4:
      return '未通过'
      break
    case 5:
      return '已完成'
      break
    default:
      return '- -'
  }
}

/**
 * 巡检
 * 任务状态
 */
export function getPatrolStatus(val) {
  switch (Number(val)) {
    case 0:
      return '未分配'
      break
    case 1:
      return '待巡检'
      break
    case 2:
      return '巡检中'
      break
    case 3:
      return '巡检完成'
      break
    default:
      return '- -'
  }
}

/**
 * 巡检
 * 设备状态
 */
export function getPatrolDeviceStatus(val) {
  switch (Number(val)) {
    case 0:
      return '正常'
      break
    case 1:
      return '报修'
      break
    case 2:
      return '遗失'
      break
    case 3:
      return '修复'
      break
    case 4:
      return '报废'
      break
    default:
      return '- -'
  }
}

/**
 * 报修管理
 * 报修类型
 */
export function getRepairtype(val) {
  switch (Number(val)) {
    case 0:
      return '系统'
      break
    case 1:
      return '人工点检'
      break
    case 2:
      return '人工巡查'
      break
    default:
      return '- -'
  }
}

/**
 * 报修管理
 * 故障类型
 */
export function getFaulttype(val) {
  switch (Number(val)) {
    case 0:
      return '工况异常'
      break
    case 1:
      return '采集信息异常'
      break
    case 2:
      return '网络数据异常（sim卡到期）'
      break
    case 3:
      return '部件损坏故障'
      break
    default:
      return '- -'
  }
}

/**
 * 报修管理
 * 报修进度/报修单状态
 */
export function getRepairstatus(val) {
  switch (Number(val)) {
    case 0:
      return '报修 '
      break
    case 1:
      return '维修中'
      break
    case 2:
      return '结单'
      break
    default:
      return '- -'
  }
}

/**
 * 维修管理
 * 工单状态
 * 0：填报工单（待维修）、1：维修中、2：待审核（维修完）、3：审核不通过、4：结单
 */
export function getMendtatus(val) {
  switch (Number(val)) {
    case 0:
      return '待维修'
      // eslint-disable-next-line no-unreachable
      break
    case 1:
      return '维修中'
      // eslint-disable-next-line no-unreachable
      break
    case 2:
      return '待审核'
      // eslint-disable-next-line no-unreachable
      break
    case 3:
      return '审核不通过'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return '结单'
      // eslint-disable-next-line no-unreachable
      break
    default:
      return '- -'
  }
}

/**
 *
 * 维修管理->维修工单->编辑
 * 故障类型 0:工况异常 1:采集信息异常 2:网络数据异常（sim卡到期） 3:部件损坏故障   4：报废
 * @param val
 * @returns {string}
 */
export function getFaultType(val) {
  switch (Number(val)) {
    case 0:
      return '工况异常'
      // eslint-disable-next-line no-unreachable
      break
    case 1:
      return '采集信息异常'
      // eslint-disable-next-line no-unreachable
      break
    case 2:
      return '网络数据异常（sim卡到期）'
      // eslint-disable-next-line no-unreachable
      break
    case 3:
      return '部件损坏故障'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return '报废'
      // eslint-disable-next-line no-unreachable
      break
    default:
      return '- -'
  }
}

export function fromatNum(val) {
  return Number(val)
}

/**
 * 维修类型
 * @param val
 * @returns {string}
 */
export function fromatMendType(val) {
  switch (Number(val)) {
    case 0:
      return '自修 '
      break
    case 1:
      return '他修'
      break
    case 2:
      return '返厂'
      break
    default:
      return '- -'
  }
}

/**
 * 审核状态
 * @param val
 * @returns {string}
 */
export function examineStatus(val) {
  if (val == null) {
    return '- -'
  }
  switch (Number(val)) {
    case 0:
      return '待审核 '
      break
    case 1:
      return '审核通过'
      break
    case 2:
      return '审核未通过'
      break
    default:
      return '- -'
  }
}

/**
 * 格式化空值
 * @param val
 * @returns {string}
 */
export function fromatNull(val) {
  if (val == null || val == 'null') {
    return '- -'
  } else {
    return val
  }
}

/**
 * 格式化小数点
 * @param val
 * @returns {string}
 */
export function formatterNum(val, num) {
  if (val == null || val == 'null') {
    return '- -'
  } else {
    return Number(val).toFixed(num)
  }
}

/**
 * 截取字符串
 * @param val
 * @returns {string}
 */
export function formatterSubstr(val, start, end) {
  if (val === null) {
    return '- -'
  } else {
    return val.substring(start, end)
  }
}

