### useReducer概念
useReducer是react16.8之后的一个hooks ,其中reducer一个接收当前应用的state和触发的动作action，计算并返回最新的state。
```javascript
  // 官方 useReducer Demo
  // 第一个参数：应用的初始化
  const initialState = {count: 0};

  // 第二个参数：state的reducer处理函数
  function reducer(state, action) {
      switch (action.type) {
          case 'increment':
            return {count: state.count + 1};
          case 'decrement':
              return {count: state.count - 1};
          default:
              throw new Error();
      }
  }

  function Counter() {
      // 返回值：最新的state和dispatch函数
      const [state, dispatch] = useReducer(reducer, initialState);
      return (
          <>
              // useReducer会根据dispatch的action，返回最终的state，并触发rerender
              Count: {state.count}
              // dispatch 用来接收一个 action参数「reducer中的action」，用来触发reducer函数，更新最新的状态
              <button onClick={() => dispatch({type: 'increment'})}>+</button>
              <button onClick={() => dispatch({type: 'decrement'})}>-</button>
          </>
      );
  }
```
reducer具有幂等性，是一个纯函数（不改变UI和副作用），useReducer适用于场景：
1.如果你的state是一个数组或者对象
2.如果你的state变化很复杂，经常一个操作需要修改很多state
3.如果你希望构建自动化测试用例来保证程序的稳定性
4.如果你需要在深层子组件里面去修改一些状态
5.如果你用应用程序比较大，希望UI和业务能够分开维护
### 缓存
#### useMemo
#### useCallback
相同点：
<ul>
  <li>
  useCallback 和 useMemo 参数相同，第一个参数是函数，第二个参数是依赖项的数组。
  </li>
  <li>
  useMemo、useCallback 都是使参数（函数）不会因为其他不相关的参数变化而重新渲染。
  </li>
  <li>
  与 useEffect 类似，[] 内可以放入你改变数值就重新渲染参数（函数）的对象。如果 [] 为空就是只渲染一次，之后都不会渲染。
  </li>
</ul>
区别：主要区别是 React.useMemo 将调用 fn 函数并返回其结果，而 React.useCallback 将返回 fn 函数而不调用它。



