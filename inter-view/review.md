### 移动端适配
#### vw适配（Viewport Width）
 vw是CSS3中引入的一个相对单位，表示相对于视口宽度的百分比。通过使用vw单位，可以根据设备的视口宽度进行适配，实现响应式布局。
 一般情况下，将页面的布局尺寸、元素的宽度、字体大小等设置为相对于视口宽度的vw单位，可以实现页面在不同屏幕宽度下的自适应效果。
 例如，设置某个元素的宽度为50vw表示该元素的宽度为视口宽度的50%。
#### rem适配（Root Em）
 rem也是CSS中的相对单位，表示相对于根元素（html元素）的字体大小的倍数。
 通过设置根元素的字体大小，再在页面中使用rem单位进行布局，可以实现根据根元素字体大小的变化而自适应调整其他元素的大小。
 一般情况下，将页面的布局尺寸、元素的宽度、字体大小等设置为相对于根元素字体大小的rem单位。
 通常会将根元素的字体大小设置为一个相对较小的值，如10px或16px，并在样式中使用rem单位进行布局。

 #### 总结
 两者的联系在于它们都可以实现移动端页面的适配，使页面在不同设备上显示合适的大小。
 一种常见的做法是，使用rem单位进行整体布局的适配，同时结合vw单位对某些具体尺寸进行微调。
 例如，可以将根元素的字体大小设置为一个合适的rem值，然后使用vw单位设置一些特定元素的宽度或边距，以实现更精确的布局控制。

 ### 多页面应用（MPA）和单页面应用（SPA）的区别
 #### 页面加载方式
 MPA：每个页面都是独立的 HTML 文件，通过浏览器发送请求获取每个页面的内容，每次页面切换都会重新加载整个页面。
 SPA：整个应用只有一个 HTML 文件，在初始加载时获取，之后的页面切换通过 JavaScript 动态加载和渲染页面内容，无需重新加载整个页面。
 #### 页面切换和导航
 MPA：页面切换通过超链接或表单提交进行，导航是基于页面的完整刷新。
 SPA：页面切换通过前端路由进行，导航是基于 URL 的变化，不需要后端参与，无需完整页面刷新。
 #### 用户体验
 MPA：页面切换时会有短暂的白屏或加载过程，用户体验相对较差。
 SPA：页面切换是无刷新的，用户体验更流畅，页面加载速度快
 #### 数据交互和通信
 MPA：每次页面切换都需要向服务器发送请求获取数据，服务器返回新的页面内容。
 SPA：通过 AJAX 或 WebSocket 进行异步数据交互，局部刷新页面内容，减少服务器请求次数。
 #### 开发和维护
 MPA：每个页面都是独立的，开发和维护相对简单，但会导致重复的代码和样式。
 SPA：整个应用只有一个代码库，开发和维护相对复杂，但可以共享代码和组件，提高开发效率。
 #### SEO（搜索引擎优化）
 MPA：每个页面都有独立的 URL，利于搜索引擎索引和排名。
 SPA：由于页面切换是通过 JavaScript 动态加载，初始加载时搜索引擎可能无法获取完整内容，对 SEO 需要进行额外处理。
 #### 总结
 综上所述，MPA适用于对 SEO 要求较高、页面独立性较强的应用，而SPA适用于对用户体验要求较高、交互频繁的应用。
 选择哪种架构模式取决于具体项目需求和考虑因素。
 在实际应用中，也可以综合使用两种模式，如将一些核心功能设计为 SPA，而其他页面仍使用 MPA 的方式。
 ### 使用json.stringify和json.parse 拷贝对象，可能会造成什么问题
#### 循环引用问题：
如果对象中存在循环引用，即对象中某个属性引用了对象本身或者它的祖先对象，那么使用 JSON.stringify() 和 JSON.parse() 方法进行拷贝时会出现问题。因为 JSON 格式不支持循环引用，所以会抛出“TypeError: Converting circular structure to JSON”的异常。

##### 函数和 undefined 值的丢失：
在 JSON 中，函数和 undefined 值都被视为无效的值，因此在使用 JSON.stringify() 方法将对象转换为 JSON 字符串时，会将函数和 undefined 值都转换为 null 值。而在使用 JSON.parse() 方法将 JSON 字符串转换为对象时，会将 null 值转换为 undefined 值，函数则被忽略掉了。

##### 对象属性丢失：
如果对象中存在 Date、RegExp、Map、Set 等特殊类型的属性，或者某个属性的值为 NaN、Infinity 或 -Infinity，那么使用 JSON.stringify() 方法将对象转换为 JSON 字符串时，这些属性值会被转换为 null 值或者字符串，而在使用 JSON.parse() 方法将 JSON 字符串转换为对象时，这些属性值可能会被丢失或者转换为不正确的类型。
 ### node扩容
 #### 垂直扩容
 垂直扩容是通过提升单个服务器的性能来扩展应用程序的能力。例如，通过增加服务器的内存、CPU、磁盘和带宽等硬件资源，来提高服务器的处理能力。垂直扩容的优点是易于管理和部署，但成本较高，因为需要购买更高规格的硬件。
 #### 水平扩容
 水平扩容是通过增加应用程序服务器的数量来提高应用程序的能力。例如，使用负载均衡器将请求分发到多个服务器上，并将数据存储在分布式数据库中。水平扩容的优点是成本相对较低，能够提高应用程序的可伸缩性和可用性。
 #### 总结
 在Node.js中实现水平扩容的方式有很多种，比如：
使用Node.js内置的cluster模块，通过创建多个worker进程来处理客户端请求，从而提高应用程序的吞吐量。
使用第三方的负载均衡器，如Nginx、HAProxy等，通过将请求分发到多个Node.js服务器上来提高应用程序的性能和可伸缩性。
使用分布式数据库，如MongoDB、Redis等，将数据存储在多个节点上，从而提高应用程序的可用性和可伸缩性。