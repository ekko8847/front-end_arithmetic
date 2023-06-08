//两数之和
//题目： 给定一个数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个数
//nums: [8, 2, 6, 5, 4, 1, 3] ； target:7
// 时间复杂度O(n)、 空间复杂度O(n)
function twoNumAdd(arr, target) {
  if (Array.isArray(arr)) {
    // 使用map将遍历过的数字存起来，空间换时间
    let map = {}
    for (let i = 0; i < arr.length; i++) {
      // 从map中查找是否有key 等于 target-nums[i]，如果有，则条件成立，返回结果
      if (map[target - arr[i]] !== undefined) {
        return [target - arr[i], arr[i]]
      } else {
        // 条件不成立，将该值存起来
        map[arr[i]] = i
      }
    }
  }
  return []
}
console.log('1---------------------------', twoNumAdd([8, 2, 6, 5, 4, 1, 3], 7))

//三数之和
// 题目： 给定一个数组nums，判断 nums 中是否存在三个元素a，b，c，
// 使得 a + b + c = target，找出所有满足条件且不重复的三元组合
// nums: [5, 2, 1, 1, 3, 4, 6] ；target:8
// 用`双端指针`的方式，将三数之和转化为两数之和
function findThree(arr, target) {
  // 先将数组从小到大排序
  arr.sort((a, b) => a - b)
  let result = []
  for (let i = 0; i < arr.length; i++) {
    // 跳过重复的arr[i]值, 比如[2, 1, 1],跳过第二个1
    if (i && arr[i] === arr[i - 1]) continue
    let left = i + 1
    let right = arr.length - 1

    // 双端指针left、right
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right]
      if (sum > target) {
        right--
      } else if (sum < target) {
        left++
      } else {
        // 先取arr[left]，然后left++, 两步合成一步；arr[right--]同样的逻辑
        result.push([arr[i], arr[left++], arr[right--]])
        while (arr[left] === arr[left - 1]) {
          // 跳过重复的arr[left]值,
          left++
        }
        while (arr[right] === arr[right + 1]) {
          // 跳过重复的arr[right]值
          right--
        }
      }
    }
  }
  return result
}
console.log('2---------------------------', findThree([5, 2, 1, 1, 3, 4, 6], 8))

//版本排序
//题目：输入一组版本号，输出从大到小的排序
//输入:['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5']
//输出： ['10.2.1', '5.1.2', '2.1.0.1', '1.0.4.5', '0.402.1']
function versionSorted(arr) {
  return arr.sort((a, b) => {
    let i = 0
    const arr1 = a.split('.')
    const arr2 = b.split('.')
    while (true) {
      //取出相同位置的数字
      const s1 = arr1[i]
      const s2 = arr2[i]
      i++
      //若s1 或者s2 不存在 说明相同位置已经比较完成 接下来比较长度 长的版本号大
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length
      }
      if (s1 === s2) continue
      //比较相同位置数字的大小
      return s2 - s1
    }
  })
}
console.log(
  '3---------------------------',
  versionSorted(['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5'])
)

//第一个不重复的字符
//题目：输入一个字符串，找到第一个不重复字符的下标
//输入 'abcabcde'
//输出 6
function findOneRepeat(str) {
  if (!str) return -1
  //使用map 存贮每个字符出现的次数
  let map = {}
  let arr = str.split('')
  arr.forEach((item) => {
    let val = map[item]
    // 当val为undefined,表示在map中未存储
    if (val === undefined) {
      map[item] = 1
    } else {
      map[item] = val + 1
    }
  })
  //再遍历一遍 找出出现一次的下标
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]] === 1) {
      return i
    }
  }
  return -1
}
console.log('4---------------------------', findOneRepeat('abcabcde'))

//字符串所有排列组合
// 题目：  输入一个字符串，打印出该字符串中，所有字符的排列组合，
// 输入：'abc'
// 输出：['abc', 'acb', 'bca', 'bac', 'cab', 'cba']
function anagrams(str) {
  //如果只有两位调换顺序 
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]
  return str
    .split('')
    .reduce(
      (prev, item, index) =>
      prev.concat( 
          anagrams(str.slice(0, index) + str.slice(index + 1)).map(
            (val) => item + val
          )
        ),
      []
    )
}
console.log('5---------------------------', anagrams('abc'))


//冒泡排序
function bubbleSort(arr){
  for (let i= 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length-1-i; j++) {
        if(arr[j]>arr[j+1]){  
          let temp=arr[j];
          arr[j]=arr[j+1];
          arr[j+1]=temp;
        }
    }   
  }
  return arr
}
console.log('6---------------------------',bubbleSort([3,6,13,9,2,10]));

//选择排序
function selectSort(arr){
  let index;
  for (let i= 0; i < arr.length-1;i++){
    index=i;
    for (let j = i+1; j < arr.length; j++) {
      if(arr[j]<arr[index]){
        index=j;
      }
    }
    if(index!==i){
      [arr[i],arr[index]]=[arr[index],arr[i]]
    }
  }
  return arr
}
console.log('7---------------------------',selectSort([3,6,13,9,2,10]));

//快速排序（2分查找）
function quickSort(arr){
  //递归结束的条件
  if(arr.length<=1) return arr ;

  let mid=Math.floor(arr.length/2);
  let base=arr.splice(mid,1)[0];
  let left=[];
  let right=[];
  arr.forEach(i=>{
    if(i<base){
      left.push(i)
    }
    if(i>base){
      right.push(i);
    }
  })
  return quickSort(left).concat(base,quickSort(right))
}
console.log('7---------------------------',quickSort([3,6,13,9,2,10]));

//归并排序
function mergeSort(arr){
  //递归结束的条件
  if(arr.length<=1){
    return arr
  }
  let mid=Math.floor(arr.length/2);
  let left= mergeSort(arr.slice(0,mid)) ;
  let right= mergeSort(arr.slice(mid,arr.length)) ;
  return merge(left,right);

  function merge(left,right){
    let [l,r]=[0,0];
    let result=[];
    while(l<left.length&&r<right.length){
      if(left[l]<right[r]){
        result.push(left[l])
        l++
      }
      else{
        result.push(right[r])
        r++
      }
    }
    result=result.concat(left.slice(l,left.length))
    result=result.concat(right.slice(r,right.length))
    return result
  }
}
console.log('8---------------------------',mergeSort([3,6,13,9,2,10]));