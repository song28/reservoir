
const logData = [
  {
    stcd: '施家堡乡丰坪村大岩山滑坡',
    addvnm: '雁江区',
    warnType: '自动雨量站',
    people: '25',
    time: '2019/3/21',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '下八寨乡纳洛村后山滑坡',
    addvnm: '雁江区',
    people: '105',
    warnType: '自动雨量站',
    time: '2019/6/28',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '十里回族乡高屯子村窑湾湾滑坡',
    addvnm: '雁江区',
    people: '22',
    warnType: '自动雨量站',
    time: '2019/6/21',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '十里回族乡佑所屯村上水沟泥石流',
    addvnm: '雁江区',
    people: '56',
    warnType: '自动雨量站',
    time: '2019/6/21',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '镇坪乡大坪坝村老村委会后山危岩',
    addvnm: '雁江区',
    people: '24',
    warnType: '自动雨量站',
    time: '2019/6/10',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '小姓乡卡卡新村后山危岩',
    addvnm: '雁江区',
    people: '130',
    warnType: '自动雨量站',
    time: '2019/6/8',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '镇坪乡金瓶岩村水塘子崩塌',
    addvnm: '雁江区',
    people: '13',
    warnType: '自动雨量站',
    time: '2019/6/9',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '青云乡雄山村雄山登崩塌',
    addvnm: '雁江区',
    people: '288',
    warnType: '自动雨量站',
    time: '2019/5/25',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }, {
    stcd: '小河乡榨房村墩梁沟泥石流',
    addvnm: '雁江区',
    people: '53',
    warnType: '自动雨量站',
    time: '2019/5/19',
    status: '小规模，无人员伤亡',
    triggeringTime: '2019/5/18',
    triggeringType: '雨量站'
  }, {
    stcd: '小河乡榨房村柴堂子沟泥石流',
    addvnm: '雁江区',
    people: '39',
    warnType: '自动雨量站',
    time: '2019/5/19',
    status: '小规模，无人员伤亡',
    triggeringTime: '2019/5/18',
    triggeringType: '雨量站'
  }, {
    stcd: '青云乡雄山村雄山登崩塌',
    addvnm: '雁江区',
    people: '288',
    warnType: '自动雨量站',
    time: '2019/6/29',
    status: '小规模，无人员伤亡',
    triggeringTime: '',
    triggeringType: '雨量站'
  }
]

export default [
  {
    url: '/warn/log',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: logData
      }
    }
  }
]

