//前序遍历
var preorderTraversal = function(root, res = []) {
  if (!root) return res;
  res.push(root.val);
  preorderTraversal(root.left, res)
  preorderTraversal(root.right, res)
  return res;
};

//中序遍历:
var inorderTraversal = function(root, res = []) {
  if (!root) return res;
  inorderTraversal(root.left, res);
  res.push(root.val);
  inorderTraversal(root.right, res);
  return res;
};

//后序遍历:
var postorderTraversal = function(root, res = []) {
  if (!root) return res;
  postorderTraversal(root.left, res);
  postorderTraversal(root.right, res);
  res.push(root.val);
  return res;
};
