// 原数据
const obj = {
  a: 1,
  b: {
    f: '2',
    g: '3'
  },
  c: {
    d: [1, 2, {
      e: true
    }]
  }
}

// 转化为
const obj1 = {
  a: 1,
  'b.f': '2',
  'b.g': '3',
  'c.d[0]': 1,
  'c.d[1]': 2,
  'c.d[2].e': true
}
function flattenObj(obj,prefix="",result={}){   
  for(const key in obj){
    if (obj.hasOwnProperty(key)){
      const newKey=prefix?(isNaN(key)?`${prefix}.${key}`:`${prefix}[${key}]`):key;
      if (typeof obj[key] === 'object'&&obj[key] !== null){
        flattenObj(obj[key],newKey,result)
      }else{
        result[newKey]=obj[key]
      }
    }
  } 
  return result
}
console.log(flattenObj(obj))