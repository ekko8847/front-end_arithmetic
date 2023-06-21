function deepClone(obj, cache = new WeakMap()) {
  // 检查是否存在循环引用
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  
  // 处理非对象类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 创建新的对象
  let clone = Array.isArray(obj) ? [] : {};
  
  // 缓存当前对象和对应的克隆对象
  cache.set(obj, clone);
  
  // 遍历对象的属性
  for (let key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // 递归拷贝属性值
      clone[key] = deepClone(obj[key], cache);
    }
  }
  
  return clone;
}

// 示例
const obj = {
  name: 'John',
  age: 25,
};

obj.self = obj; // 创建循环引用

const clonedObj = deepClone(obj);
console.log(clonedObj); // 输出: { name: 'John', age: 25, self: [Circular] }
