### 1.什么是bfc
bfc(块级格式化上下文)可以看作是隔离了的独立容器，内部元素的布局，不会影响外部元素。
#### 触发bfc的条件
定位、浮动、overflow: hidden、display 不为 none 的各种。
（1）position:absolute或fixed；
（2）float:left/right;
（3）overflow:hidden; 不为visible， 常用方式;
（4）display:inline-block; flow-root, table-cell, table-caption, flex, inline-flex等。
#### bfc的应用
阻止 margin 重叠
阻止元素被浮动元素覆盖（以前常用于自适应两栏布局）
清除内部浮动（父级元素高度塌陷问题）
### 2.回流和重绘
记住引起元素 大小 或 位置 改变的情况，均会触发回流（Reflow）。反之，大小位置不变的情况（如颜色样式color、background-color、outline-style改变），就发生重绘 (Repaint)。
#### 哪些情况会导致回流：
页面首次渲染
浏览器窗口变化
元素尺寸或位置变化（宽高、边距、边框等）
元素内容发生变化（文字数量、图片大小、字体大小变化）
添加删除可见的 DOM 节点
激活 css 伪类（hover、active等）
查询某些属性或调用某些方法（浏览器会必须回流来保证数据的准确性）
```js
注意：outline-width、box-shadow、border-radius 这些属性并不会引起元素大小的改变，而是样式形状的改变，所以属于重绘。
```
#### 总结
回流必将引起重绘，重绘不一定引起回流。所以回流的性能开销更大。
参考文章：<https://juejin.cn/post/7216174863447146552#heading-35>
