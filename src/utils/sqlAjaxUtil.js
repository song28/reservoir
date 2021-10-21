import {queryData} from '@/api/templateIndex/index'
import store from '@/store'

export   function hasRight(right) {
  
  const roles = store.getters && store.getters.powers
 
  
  if( roles){
    return roles.findIndex(d=>{return d==right})>=0
  }else{
    return false;
  }
}



// 自定义SQL数据源请求方式
export function getIOTSQL(id, params, resultIsArrayOrObj, callback) {
  if (params.pageSize) {
    let oneOrAll = "list";
    if (callback) {
      callback(resultIsArrayOrObj == false ? {} : []);
    }
    queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
      if (res.status == true) {
        if (callback) {
          callback(res.data);
        }
      }
    })
  } else {
    let oneOrAll = resultIsArrayOrObj == false ? "listOne" : "listAll";
    if (callback) {
      callback(resultIsArrayOrObj == false ? {} : []);
    }
    queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
      if (res.status == true) {
        if (callback) {
          callback(res.data);
        }
      }
    })
  }
}
export function getIOTSQL2(id, params, resultIsArrayOrObj, callback) {
  if (params.pageSize) {
    let oneOrAll = "list";
    if (callback) {
      callback(resultIsArrayOrObj == false ? {} : []);
    }
    queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
      if (res.status == true) {
        if (callback) {
          callback(res.data);
        }
      }
    })
  } else {
    let oneOrAll = resultIsArrayOrObj == false ? "listOne" : "list";
    if (callback) {
      callback(resultIsArrayOrObj == false ? {} : []);
    }
    queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
      if (res.status == true) {
        if (callback) {
          callback(res.data);
        }
      }
    })
  }
}
// 自定义SQL数据源请求方式
// export function getIOTSQL(id, params, resultIsArrayOrObj, callback) {
//   if (params.pageSize) {
//     let oneOrAll = "list";
//     if (callback) {
//       callback(resultIsArrayOrObj == false ? {} : []);
//     }
//     queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
//       if (res.status == true) {
//         if (callback) {
//           callback(res.data);
//         }
//       }
//     })
//   } else {
//     let oneOrAll = resultIsArrayOrObj == false ? "listOne" : "listAll";
//     if (callback) {
//       callback(resultIsArrayOrObj == false ? {} : []);
//     }
//     queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
//       if (res.status == true) {
//         if (callback) {
//           callback(res.data);
//         }
//       }
//     })
//   }
// }

// 自定义SQL数据源请求方式
export function getIOTSQLPage(id, params, resultIsArrayOrObj, callback) {
  if (params.pageSize) {
    let oneOrAll = "list";
    if (callback) {
      callback(resultIsArrayOrObj == false ? {} : []);
    }
    queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
      if (res.status == true) {
        if (callback) {
          callback(res);
        }
      }
    })
  } else {
    let oneOrAll = resultIsArrayOrObj == false ? "listOne" : "list";
    if (callback) {
      callback(resultIsArrayOrObj == false ? {} : []);
    }
    queryData("/IotDsSql/" + oneOrAll + "/" + id, 'POST', params).then(res => {
      if (res.status == true) {
        if (callback) {
          callback(res);
        }
      }
    })
  }
}
// 自定义SQL数据源请求方式
export function deleteByIOTSQL(tableName, params, callback) {
  queryData("/smartformData/delete/" + tableName, 'POST', params).then(res => {
    if (res.status == true) {
      if (callback) {
        callback(res);
      }
    }
  })
}
// 自定义SQL数据源请求方式
export function saveByFormData(tableName, params, callback) {
  queryData("/baseInfo/saveAllData/" + tableName, 'POST', params).then(res => {
    if (res.status == true) {
      if (callback) {
        callback(res);
      }
    }
  })
}
// 自定义SQL数据源请求方式
export function getIOTSQLForCheck(id, params, resultIsArrayOrObj, callback) {
  let oneOrAll = resultIsArrayOrObj == false ? "listOne" : "listAll";
  if (callback) {
    callback(resultIsArrayOrObj == false ? {} : []);
  }
  queryData("/baseInfo/" + oneOrAll + "/" + id, 'POST', params).then(res => {
    if (res.status == true) {
      if (callback) {
        callback(res.data);
      }
    }
  })
}
// 自定义SQL数据源请求方式
export function saveData(tableName, params, callback) {
  queryData("/smartformData/save/" + tableName, 'POST', params).then(res => {
    if (res.status == true) {
      if (callback) {
        callback(res);
      }
    }
  })
}
