//1 实现一个 Promise.all
function PromiseAll(promises){
  return new Promise((resolve, reject)=>{
    let result=[];
    let count=0;
    for(let i=0; i<promises.length; i++){
        promises[i].then((res)=>{
        result[i]=res;
        count++;
        if(count===promises.length){
          resolve(result);
        }
      }).catch((err)=>{
        reject(err);
      })
    }
    if(promises.length===0){
      resolve(result);
    }
  })
}
const pro1=Promise.resolve(1);
const pro2=Promise.resolve(2);
const temp=PromiseAll([pro1,pro2]);
setTimeout(()=>{
  console.log(temp);
},0)
console.log(temp);

/* promise输出题 */
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');


//3.深拷贝
function deepClone(data){
  let newData;
  if(Object.prototype.toString.call(data).slice(8,-1)==='Object'){
    newData={};
  }
  if(Object.prototype.toString.call(data).slice(8,-1)==='Array'){
    newData=[]
  }
  else{
    return data;
  }
  for(const key in data){
    newData[key]=deepClone(data[key]);
  }
  return newData
}
const a={
  age:1,
  name:'jack',
  say:function(){
    console.log('helllo');
  },
  score:{
    average:66,
    max:90
  }
}
console.log('-------------',deepClone(a))

//debounce 防抖 应用场景获取支付状态（轮询操作） 实时搜索
function debounce(fn,time){
 let timer=null;
 return function(...args){
  clearTimeout(timer);
  timer=setTimeout(()=>{ 
    fn.apply(this,args)
  },time)
 }
}
function handle(){
  console.log('handleChange');
}
//节流 每隔一段时间执行，应用场景 鼠标移动事件 按钮点击（防止频繁点击）
function throttle(fn,time){
  let lastTime=0;
  return function(...args){
    let currentTime=Date.now()
    if(currentTime-lastTime>=time)
    fn.apply(this,args)
    lastTime=currentTime;
  }

}
debounce(handle,0)

//冒泡排序
function bubbleSorted(arr){
  for(let i= 0;i<arr.length-1;i++){
    for (let j= 0; j < arr.length-1-i; j++) {
      const temp = arr[j];
      arr[j]=arr[j+1];
      arr[j+1]=temp;    
    }
  }
}
//快排
function quickSort(arr){
  if(arr.length<=1){
    return arr
  }
  let left=[];
  let right=[];
  const center=arr.pop();
  arr.forEach(item=>{ 
    if(item<center){
      left.push(item);
    }
    else{
      right.push(item)
    }
  })
  return quickSort(left).concat(center,quickSort(right))
}
console.log('kuaipai',quickSort([16,7,9,20,3,81,33]));