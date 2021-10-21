/**
 * 表格滚动到最后一行分页
 */
export function scrollBotPagination(dom,events,pageSize,pageNo,total,Callback,wait) {
  //dom代表表格高度this.$refs.tableList.bodyWrapper,   events代表监听事件如scroll,
  //pageSize代表一页几条,  pageNo代表页码,  total代表数据总条数,  Callback代表查询表格列表的函数,wait代表延迟多长时间
  dom.addEventListener(events, throttle(handleScroll(dom,pageSize,pageNo,total,Callback), wait), true);
};
// 滚动事件
export function handleScroll(dom,pageSize,pageNo,total,Callback) {
  
  alert('why')
    var scrollTop = dom.scrollTop;
    var scrollHeight = dom.scrollHeight;
    var clientHeight = dom.clientHeight;
    console.log(scrollTop,scrollHeight,clientHeight)
    if(scrollTop + clientHeight  >= scrollHeight){
      if(pageSize * pageNo > total){
        return false
      }else{
        pageNo = pageNo + 1 //显示条数新增
        // Callback //请求列表list 接口方法
        dom.scrollTop = 0;
      }
    }
  
};
//节流函数
export function throttle(func, wait) {
  var lastTime = null;
  var timeout;
  return () => {
    var context = this;
    var now = new Date();
    var arg = arguments;
    if (now - lastTime - wait > 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func.apply(context, arg);
      lastTime = now;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, arg);
      }, wait);
    }
  };
};


// 获得本周的结束日期
export function getWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
  return formatDate(weekEndDate);
}

// 获得上周的开始日期
export function getLastWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
  return formatDate(weekStartDate);
}

// 获得上周的结束日期
export function getLastWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
  return formatDate(weekEndDate);
}

// 获得本月的开始日期
export function getMonthStartDate() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}

// 获得本月的结束日期
export function getMonthEndDate() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return formatDate(monthEndDate);
}

// 获得上月开始时间
export function getLastMonthStartDate() {
  var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  return formatDate(lastMonthStartDate);
}

// 获得上月结束时间
export function getLastMonthEndDate() {
  var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
  return formatDate(lastMonthEndDate);
}

// 获得本季度的开始日期
export function getQuarterStartDate() {
  var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
  return formatDate(quarterStartDate);
}

// 获得本季度的结束日期
export function getQuarterEndDate() {
  var quarterEndMonth = getQuarterStartMonth() + 2;
  var quarterStartDate = new Date(nowYear, quarterEndMonth,
    getMonthDays(quarterEndMonth));
  return formatDate(quarterStartDate);
}


export function DateAdd(interval,number,date){
  switch(interval.toLowerCase()){
  case "y": return new Date(date.setFullYear(date.getFullYear()+number));
  case "m": return new Date(date.setMonth(date.getMonth()+number));
  case "d": return new Date(date.setDate(date.getDate()+number));
  case "w": return new Date(date.setDate(date.getDate()+7*number));
  case "h": return new Date(date.setHours(date.getHours()+number));
  case "n": return new Date(date.setMinutes(date.getMinutes()+number));
  case "s": return new Date(date.setSeconds(date.getSeconds()+number));
  case "l": return new Date(date.setMilliseconds(date.getMilliseconds()+number));
  }
  }
  
   
  
 
  
  export function DateDiff(interval,date1,date2){
  var long = date2.getTime() - date1.getTime(); //相差毫秒
  switch(interval.toLowerCase()){
  case "y": return parseInt(date2.getFullYear() - date1.getFullYear());
  case "m": return parseInt((date2.getFullYear() - date1.getFullYear())*12 + (date2.getMonth()-date1.getMonth()));
  case "d": return parseInt(long/1000/60/60/24);
  case "w": return parseInt(long/1000/60/60/24/7);
  case "h": return parseInt(long/1000/60/60);
  case "n": return parseInt(long/1000/60);
  case "s": return parseInt(long/1000);
  case "l": return parseInt(long);
  }
  }
