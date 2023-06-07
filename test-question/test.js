function threeNum(nums){
  const result=[];
  const n=nums.length;
  nums.sort((a,b)=>a-b);
  for(let i=0; i<n-2; i++) {
    if(i>0&&nums[i]===nums[i-1]){
      continue;
    }
    let left=i+1;
    let right=n-1;
    while(left<right){
      const sum=nums[i]+nums[right]+nums[left];
      if(sum===0){
        result.push([nums[i],nums[left],nums[right]]);
        while(left<right&&nums[left]===nums[left+1]){
          left--;
        }
        while(left<right&&nums[right]===nums[right-1]){
          right--;
        }
        left++;
        right--;
      }
      else if(sum<0){
        left++;
      }
      else{
        right--;
      }
    }
  }
  return result
}
console.log(threeNum([-1,0,1,2,-1,-4]));
//给你一个整数数组 
// 判断是否存在三元组[nums[i],nums[j],nums [k]]满足i !=j,i!=k,且j!=k,同时满足相加之和为0 
// 请你返回所有和为0且不重复的三元数组