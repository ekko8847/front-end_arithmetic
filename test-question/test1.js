function countChars(str){
  const countMap={};
  let maxChar='';
  let maxCount=0;
  for(let i=0; i<str.length;i++) {
    const char=str[i];
    countMap[char] = (countMap[char] || 0) + 1;
    if(countMap[char] > maxCount){
      maxCount = countMap[char];
      maxChar=char
    }
  }
  return {
    character:maxChar,
    count:maxCount
  };
}
const result = countChars('hello world');
console.log(result)