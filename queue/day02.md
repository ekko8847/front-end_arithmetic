### 概念
队列是一个先进先出的数据结构，不同于栈（后进先出）<br>
javascript 同样也没有队列 也同样可以用Array模拟队列 <br>
```javascript
const queue=[];
queue.push(1);//入队
queue.push(2);
const item1=queue.shift(); // 出对 1
const item2=queue.shift(); // 2
```
### 要点
队列常用操作：push(),shift(),queue[0]  
栈常用操作：push(),pop(),stack[length-1]

### 场景
js异步中的任务队列
计算最近的请求次数......<br>
![avatar](../assets/async-queue.png)

