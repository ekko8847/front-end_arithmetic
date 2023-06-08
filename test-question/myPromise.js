const PENDDING = "pendding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 函数放入微队列
 */
function runMicroTask(callback) {
  // node 环境
  if (process && process.nextTick) {
    process.nextTick(callback);
  } else if (MutationObserver) {
    // 浏览器环境
    const p = document.createElement("p");
    const ob = new MutationObserver(callback);
    ob.observe(p, {
      childList: true,
    });
    p.innerText = "1";
    // 触发，放入微队列
  } else {
    // 其他环境
    setTimeout(callback, 0);
  }
}

/**
 * isPromise
 */
function isPromise(o) {
  return !!(o && typeof o === "object" && o.then === "function");
}

class MyPromise {
  /**
   * @param {Function} executor 执行函数
   */
  constructor(executor) {
    this.state = PENDDING;
    this.value = undefined;
    this.handlers = [];
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      // 处理promise内部报错的情况
      this._reject(err);
    }
  }

  /**
   * 将后续的thenable放入队列
   * @param {Function} executor
   * @param {string} status
   * @param {Function} resolve
   * @param {Function} reject
   */
  _pushHandler(executor, status, resolve, reject) {
    this.handlers.push({
      executor,
      status,
      resolve,
      reject,
    });
  }

  /**
   * 执行每个thenable和catchable函数
   */
  _runHandler() {
    // 如果该promise 还属于pedding状态则不执行
    if (this.state === PENDDING) {
      return;
    }
    while (this.handlers[0]) {
      const ans = this.handlers[0];
      this._runOneHandler(ans);
      this.handlers.shift();
    }
  }

  _runOneHandler({ executor, status, resolve, reject }) {
    runMicroTask(() => {
      // 必须变为已决状态
      if (this.state !== status) {
        return;
      }
      try {
        // then 传的不是一个函数
        if (typeof executor !== "function") {
          this.state === FULFILLED ? resolve(this.value) : reject(this.value);
          return;
        }
        const result = executor(this.value);
        if (isPromise(result)) {
          // 返回的也是promise
          result.then(resolve, reject);
          return;
        }
        resolve(result);
      } catch (err) {
        reject(err);
        console.err(err);
      }
    });
  }

  /**
   * 注意，这里并不需要立即执行thenable函数
   * 且需要将后续函数放入微队列
   * 且不能立即放入，而是需要等到resolve的时候去执行
   * 此时可以弄一个队列，然后去处理
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // 执行的时候，需要将then返回的promise去resolve
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
      // 此时需要执行，then的时候，就已经resolve了
      this._runHandler();
    });
  }

  /**
   * catch 函数
   * @param {Function} onRejected
   */
  catch(onRejected) {
    this.then(null, onRejected);
  }

  /**
   *
   * @param {any} data
   * @param {string} state 状态
   */
  _changeState(data, state) {
    // 多次执行的情况, 状态一旦变更，无法修改
    if (this.state !== PENDDING) {
      return;
    }
    this.value = data;
    this.state = state;
    // 状态修改，执行后续函数
    this._runHandler();
  }

  /**
   * resolve 函数
   * resolve 后需要将当前promise变为已决状态
   * @param {any} data
   */
  _resolve(data) {
    this._changeState(data, FULFILLED);
  }

  /**
   * reject 函数
   * reject 后需要将当前promise变为已决状态
   * @param {any} reason
   */
  _reject(reason) {
    this._changeState(reason, FULFILLED);
  }

  /**
   * promise A+规范
   * 传进来的数据
   */
  static resolve(data) {
    if (data instanceof MyPromise) {
      return data;
    }
    return new Promise((resolve, reject) => {
      // 如果类似promise，需要调用then方法
      if (isPromise(data)) {
        data.then(resolve, reject);
        return;
      }
      resolve(data);
    });
  }

  /**
   * 直接reject
   * @param {any} reason
   */
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  /**
   * promise 数组对象
   * @param {Array} prom
   */
  static all(prom = []) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      const max = prom.length;
      let count = 0;
      for (const pro of prom) {
        MyPromise.resolve(pro).then((ans) => {
          count ++;
          result.push(ans);
          if (count === max) {
            resolve(result);
          }
        }, reject);
      }
      // 兼容空数组的情况
      if (max === 0) {
        resolve(result);
      }
    });
  }

  /**
   * race 方法，resolve第一个
   * @param {array} prom
   */
  static race(prom) {
    return new MyPromise((resolve, reject) => {
      for (const pro of prom) {
        // 防止pro传递非promise
        MyPromise.resolve(pro).then(resolve, reject);
      }
    });
  }
}


// test
MyPromise.all([
  new MyPromise((res) => {
    setTimeout(() => {
      res(1000);
    }, 1000);
  }),
  new MyPromise(res => {
    setTimeout(() => {
      res(2000)
    }, 2000);
  })
]).then(ans => {
  console.log(ans);
})
