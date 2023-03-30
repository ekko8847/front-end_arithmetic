### 数组和链表的区别
数组：增删首尾元素时往往需要移动元素
链表：增删首尾元素时不需要，只需要移动next指向即可
### 概念
JavaScript中没有链表
但是可以用Object模拟链表
```javascript
const a={value:'a'};
const b={value:'b'};
const c={value:'c'};
const d={value:'d'};
a.next = b;
b.next = c;
c.next = d;
d.next = null
console.log(a)

//遍历链表
let p = a; //模拟一个指针
while(p){
  console.log(p.value);
  p = p.next
}

// 插入(让链表首尾相连)
const e={value:'e'};
b.next = e;
e.next = c;
console.log(a)

//删除
b.next = d;
```