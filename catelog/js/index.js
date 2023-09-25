/* const a=[];
a[10]=6;
console.log(a); */
// const arr=[1,3]
// arr.push({c:6})
// console.log(arr);
// console.log(arr instanceof Array);
const u={
  binds:[6,7]
}
const t={
  ...u,
  binds:[8,9]
}
console.log(t);
let str = ''
async function fill(){
  return new Promise(resolve => setTimeout(resolve('666'), 10))
};
setTimeout(()=>{
  console.log(fill());
},2000)
