### vue相关
#### computed和watch区别
1.computed计算属性具有缓存，watch没有缓存。
2.计算属性用于依赖现有数据动态计算衍生数据，适合对现有数据进行转化，过滤或格式化等操作
3.watch用于侦听数据变化并执行自定义逻辑，适合异步操作，触发其他方法等响应式行为

##### 什么是mvc模型，什么是mvvm模型
1.mvc就是model-view-controller
model 负责保存应用数据，
view负责视图展示，将model中的数据可视化展示出来，在前端中难以实现，因为浏览器端用户操作是十分复杂可变的，且每一个操作都要经过这样的步骤
controller控制器 负责业务逻辑的处理，根据用户的行为对model数据进行修改
2.mvvm就是model-view-viewModel
viewModel 通过实现一套数据响应式自动更新model中的数据，同时实现一套自动更新策略自动将数据变化为视图更新

总结：mvc 模式出现比较早，主要应用于后端，在前端领域的早期也有应用，优点是分层清晰，缺点是数据混乱，难以处理用户的灵活操作
mvvm 模式在前端领域有广泛的应用，它不仅解决了 mvc 的问题，而且还解决了 view 和 model 之间映射需要大量 dom 操作的问题，提高了开发效率

##### new一个Vue做了什么
1.创建vue实例（和创建组件的流程基本一致）
  首先做一些初始化的操作，主要是设置一些私有属性到实例中
  运行生命周期钩子函数beforeCreated
  处理属性computed，methods，data，provide，inject，最后使用代理模式将他挂载到实例中去
  运行生命周期钩子函数created
  生成render函数，如果有配置，则直接使用配置的render，没有则将模板编译成render函数
  运行生命周期钩子函数 beforeMount
  创建一个 Watcher(new Watcher)，传入一个函数 updateComponent，该函数会运行 render 函数，把 vnode 再传入_update 函数执行
  运行 mounted 函数，可以看到界面 如果在 beforeMount 时，内部有组件，则创建 vue 实例，传入 optionComponent，递归去创建内部的 vnode
2.重渲染
  数据变化后，所有依赖该数据的 Watcher 均会重新运行。
  Watcher 会被调度器放到 nextTick 中运行，避免多个依赖数据同时改变后被多次执行。
  运行生命周期钩子函数 beforeUpdate。
  updateComponent 函数重新执行 在执行 render 函数的过程中，会去掉之前的依赖，重新收集所有依赖，将来依赖变化时重新运行 updateComponent 函数 在执行_update 函数的过程中，触发 patch 函数,新旧两棵树的对比 当新组件需要创建时，进入实例化流程 当旧组件需要删除时，调用旧组件的destroy方法，触发beforeDestroy方法，然后递归调用子组件的destroy 方法，然后触发生命周期 destroy 当组件属性更新时，相当于组件的 updateComponent 函数被重新触发执行，进行重渲染流程。
  运行生命周期钩子函数 updated。
#### vue源码中patch函数具体是怎么做的
新旧VNode 对比：
  1.新的VNode有，旧的没有，则在旧的上面创建（创建）
  2.新的VNode没有，旧的有，则删除旧的（删除）
  3.新的旧的都有，则以新的为基准更新旧的VNode（更新）
  总之就是以新的为基准，去创建更新或者删除旧的VNode
diff比较采用双指针比较：
  在对比其子节点数组时，vue 对每个子节点数组使用两个指针，分别指向头尾，然后向中间靠拢来进行对比，
  这样做的目的是尽量复用真实 dom，尽量少的销毁和创建真实 dom，
  如果发现相同，则进行属性对比，如果不相同则移动真实 dom 到合适的位置

伪代码如下：（以更新节点为例）
```javascript
  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    for (let j = 0; j < oldChildren.length; j++) {
      const oldChild = oldChildren[j];
      if (newChild === oldChild) {
        // ...
      }
    }
  }
```

