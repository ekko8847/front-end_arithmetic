### 问题
1.React setState 怎么获取到更新后的值?
2.异步函数中为什么 setState 会立即更新?
3.做过离线包吗? H5 离线包的原理?
4.客户端根据什么拦截静态资源请求?
5.JS Bridge的原理?你们这套方案的s优缺
点?
6.怎么判断 webview 是否加载完成?
7.怎么实现 App 头部和页面的背景渐变? PC端做过比较有意义的项目?
8.微前端子应用之间怎么通信? 有没有了解过业界的一些方案?
9.你们部署的 Jenkins 是怎么做的?
10.JS Bridge 原理? 有没有安全漏洞?
11:有没有做过和安全相关的? waf 主要做了什
么?
12:有没有做过埋点和性能上报相关?如果你们用一个第三方的上报库，但页面加载这个JS失败了，还想上报该怎么办?
### 答案（简单了解）
```js
1.setState({count:state.count + 1},()=>{
  console.log('count',this.state.count)
})
```
setState 是异步的，意味着不能立即获取到更新之后的值，但是setState 第二个参数可以接收一个函数，它在状态更新完成并且组件重新渲染后调用。