```typescript
async function async1 () {
  console.log('async1 start') //2
  await async2();
  console.log('async1 end') //6
}

async function async2 () {
  console.log('async2')  //3
}

console.log('script start') // 1

setTimeout(function () {
  console.log('setTimeout') //8
}, 0)

async1(); 

new Promise(function (resolve) {
  console.log('promise1') //4
  resolve();
}).then(function () {
  console.log('promise2') //7
})

console.log('script end') //5
// async await 只是 Generator 的语法糖，是对 Promise 的封装，所以遇到 await 会先执行后面的代码，然后再回来执行 await 的代码
Promise.resolve().then(() => {
  console.log('promise1'); //2
  const timer2 = setTimeout(() => {
    console.log('timer2') //5
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1') //3
  Promise.resolve().then(() => {
    console.log('promise2') //4
  })
}, 0)
console.log('start');//1
/* 时间循环中 同步代码=>异步代码 （微任务=>宏任务）其实微任务执行完会执行渲染任务
当前“微任务的嵌套执行”指的是在 同一个事件循环周期中，
微任务（Microtask）的执行过程中又产生了新的微任务，
这些新产生的微任务会 立即加入当前微任务队列，并在本轮循环中被继续执行，直到队列清空。
 */
```