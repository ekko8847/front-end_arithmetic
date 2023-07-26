Array.prototype.myReduce=function(callback,initialValue){
let accumulator=initialValue===undefined?undefined:initialValue;
  for(let i=0;i<this.length;i++){
    if(accumulator===undefined){
      accumulator=this[i];
    }else{
      accumulator=callback(accumulator,this[i],i,this)
    }
  }
  return accumulator
}
const temp=[1,3,5,7,8].myReduce((a,b)=>a+b,0)
console.log(temp);