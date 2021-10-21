// 截取前边的非0数据，
export function getPrefixAdcd(addvcd) {
  if(addvcd){
    return addvcd.replace(/(0+)$/g,"");
  }else{
    return '';
  }
}

// 获取行政区编码的有效长度
export function getAdcdLen(addvcd){
  if(addvcd){
    addvcd = addvcd.replace(/(0+)$/g,"");
    let len = addvcd.length;
    let resLen;
    if(len <= 2){
      resLen = 2;
    }else if(len <= 4){
      resLen = 4;
    }else if(len <= 6){
      resLen = 6;
    }else if(len <= 9){
      resLen = 9;
    }
    return resLen;
  }else{
    return null;
  }
}
// 获取下级行政区编码的有效长度
export function getChildAdcdLen(addvcd){
  if(addvcd){
    addvcd = addvcd.replace(/(0+)$/g,"");
    let len = addvcd.length;
    let resLen;
    if(len <= 2){
      resLen = 4;
    }else if(len <= 4){
      resLen = 6;
    }else if(len <= 6){
      resLen = 9;
    }else if(len <= 9){
      resLen = 12;
    }
    return resLen;
  }else{
    return null;
  }
}
