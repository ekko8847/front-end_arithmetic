//1.将js对象转化为树形结构
const source = [
  {
    "id": 1,
    "pid": 0,
    "name": "body"
  },
  {
    "id": 2,
    "pid": 1,
    "name": "title"
  },
  {
    "id": 3,
    "pid": 2,
    "name": "div"
  }
]

/* tree = [{
  id: 1,
  pid: 0,
  name: "body",
  children: [{
    id: 2, 
    pid: 1,
    name: "title",
    children: [{
      id: 3,
      pid: 2,
      name: "div"
    }]
  }]
}] */
// 递归
/* function convertToTreeData(data) {
  const tree = [];
  function buildTree(node, data) {
    data.forEach(item => {
      if (item.pid === node.id) {
        const newNode = { ...item, children: [] };
        node.children.push(newNode);
        buildTree(newNode, data);
      }
    });
  }
 data.forEach(item => {
    if (item.pid === 0 || !data.find(x => x.id === item.pid)) {
      const newNode = { ...item, children: [] };
      tree.push(newNode);
      buildTree(newNode, data);
    }
  });
  return tree;
} */
//迭代
function convertToTreeData(source) {
  const tree = {};
  const rootNode = { id: 0, children: [] };
  tree[0] = rootNode;
  source.forEach(item => {
    const newNode = { ...item, children: [] };
    tree[item.id] = newNode;
    const parentNode = tree[item.pid];
    if (parentNode) {
      parentNode.children.push(newNode);
    }
  });
  return rootNode.children;
}
console.log(convertToTreeData(source));


// 2. 如何实现无限累加的 sum 函数sum(1, 2, 3).valueOf() //6
/* sum(2, 3)(2).valueOf() //7
sum(1)(2)(3)(4).valueOf() //10
sum(2)(4, 1)(2).valueOf() //9
sum(1)(2)(3)(4)(5)(6).valueOf() // 21 */
function sum(...args) {
  const total = args.reduce((acc, val) => acc + val, 0);

  function add(...moreArgs) {
    return sum(total, ...moreArgs);
  }

  add.valueOf = function() {
    return total;
  };

  return add;
}

// 示例用法
console.log(sum(1, 2, 3).valueOf()); // 6
console.log(sum(2, 3)(2).valueOf()); // 7
console.log(sum(1)(2)(3)(4).valueOf()); // 10
console.log(sum(2)(4, 1)(2).valueOf()); // 9
console.log(sum(1)(2)(3)(4)(5)(6).valueOf()); // 21


// 3. // 假设本地机器无法做加减乘除法，需要通过远程请求让服务端来实现。 (即不允许使用 + 号) 
// 以加法为例，现有远程API的模拟实现 ——  
// const addRemote = async (a, b) => new Promise((resolve) => { 
//   setTimeout(() => resolve(a + b), 1000) 
// })。 
// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法func 。
// 请用示例验证运行结果 —— add(1, 2) = 3; add(1, 3, 5, 2) = 11

//addRemote 方法 不能做任何修改
const addRemote = async (a, b) => new Promise((resolve) => { 
  setTimeout(() => resolve(a + b), 1000) 
})
async function add(...args) {
  if (args.length === 1) {
    return args[0];
  }

  const [a, b, ...rest] = args;
  const result = await addRemote(a, b);
  return add(result, ...rest);
}

// 示例用法
(async () => {
  console.log(await add(1, 2)); // 输出：3
  console.log(await add(1, 3, 5, 2)); // 输出：11
})();

