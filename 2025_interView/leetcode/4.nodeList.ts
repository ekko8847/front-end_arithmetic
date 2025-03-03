
class listNode{
  public val:number = 0;
  public next:listNode|null = null;
  constructor(val, next = null) {
    this.val = val;   // 节点存储的值
    this.next = next; // 指向下一个节点的指针
  }
}
// 合并两个有序链表
const mergeTwoLists = (l1: listNode, l2: listNode):listNode => {
  if(l1.val===null) return l2; //l1为空时直接返回l2
  if(l2.val===null) return l1; //l2为空时直接返回l1
  if(l1.val<l2.val){
    l1.next = mergeTwoLists(l1.next,l2);
    return l1;
  }else{
    l2.next = mergeTwoLists(l1,l2.next);
    return l2;
  }
}
// 判断对称二叉树
const isSymmetric=(root)=>{
  if(!root) return true;
  return isMirror(root,root);
  function isMirror(left,right){
    if(left===null&&right===null) return true;
    if(left===null||right===null) return false;
    return left.value===right.value&&isMirror(left.left,right.right)&&isMirror(left.right,right.left);
  }
}
// 二叉树最大长度
const maxLength = (root) => {
  if(!root) return 0;
  return Math.max(maxLength(root.left),maxLength(root.right))+1;
}
//打家劫舍 (经典DP问题)
const rob=(nums)=>{
  let n=nums.length;
  let f=new Array(n);
  f[0] = new Array(2).fill(0);
  for(let i=1;i<=n;i++){
    f[i] = new Array(2).fill(0);
    f[i][0]=Math.max(f[i-1][0],f[i-1][1]);
    f[i][1]=f[i-1][0]+ nums[i];
  }
  return Math.max(f[n][0],f[n][1])
}
// 爬楼梯
const climbStairs=(n)=>{
  let f = new Array(n+1).fill(0);
  f[0]=1; 
  f[1]=1;
  //第三项是前两项的和
  for(let i=2;i<=n;i++){
    f[i]=f[i-1]+f[i-2];
  }
  return f[n];
}