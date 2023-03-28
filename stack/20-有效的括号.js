//上午提交
// 扫描字符串，遇左括号入栈，遇到和栈顶括号
// 类型匹配的右括号就出栈，类型不匹配直接判
// 定为不合法
const isValid=function(s){
  if(s.length%2===1) return false;
  const stack=[];
  //遍历这个字符串
  for(let i=0;i<s.length;i++){
    const char=s[i];
    if(char==='{'||char==='('||char==='['){
      stack.push(char);
    }else{
      const stackTop=stack[stack.length-1];
      //实际上当前栈只存了左边括号
      // 如果栈顶的元素和当前元素是一对的话就出栈 暴力枚举一下
      if(
          (stackTop==='('&&char===')')||
          (stackTop==='{'&&char==='}')||
          (stackTop==='['&&char===']')
        ){
          stack.pop();
        }
      else{
        return false;
      }
    }
  }
  //栈必须是空的
  return stack.length===0;
}
console.log(isValid('()'));
console.log(isValid('({)}'));
console.log(isValid('({})'));