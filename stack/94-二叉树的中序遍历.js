/* *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function buildTree(preorder) {
  const len = preorder.length;
  let i = 0;
  return build();

  function build() {
    if (i >= len) {
      return null;
    }
    const val = preorder[i++];
    if (val === null) {
      return null;
    }
    const node = new TreeNode(val);
    node.left = build();
    node.right = build();
    return node;
  }
}

// const preorder = [1, null, 2, 3];
// const root = buildTree(preorder);

// warning！！
//核心思想：
// 分别定义一个栈和一个数组，先将左子树压入到栈中，直到左子树为null,然后开始弹栈，
// 将值push到数组中，再反过来将右子树压入到栈中，
// 再开始弹栈，将结果push到数组中。


const norderTraversal=function(root){
  const res = [];
  const stack=[];
  while (stack.length||root) {
    while(root){
      stack.push(root);
      root = root.left;
    }
    root=stack.pop();
    res.push(root.val);
    root=root.right; 
  }
  return res;
}
console.log(norderTraversal(buildTree([1,null,2,3])));