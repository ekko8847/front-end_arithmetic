## jsBridge 实现原理

 web和native 相当于client/serve,web调用native接口实际上就相当于client像serve发送一个请求，jsBridge就当与http协议的角色，实现jsBridge就基于两点：
 
- 将native方法封装成js接口
- 将js方法封装成native接口
![avatar](/assets/jsbridge.png)

### native调用web
#### android
andorid 4.4之前通过loadUrl执行js代码，但是无法执行回调
```java
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.loadUrl("javascript: " + jsCode);
```
4.4之后通过evaluateJavascript来执行js代码，并且可以执行回调
```java
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.evaluateJavascript(jsCode, new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String value) {
    //这是回调函数
  }
});
```
#### ios
iOS的UIWebView使用stringByEvaluatingJavaScriptFromString：
```swift
NSString *jsStr = @"执行的JS代码";
[webView stringByEvaluatingJavaScriptFromString:jsStr];

```
iOS的WKWebView使用evaluateJavaScript：
```object-c
[webView evaluateJavaScript:@"执行的JS代码" completionHandler:^(id _Nullable response, NSError * _Nullable error) {
  
}];
```
### web调用native
#### 拦截webview请求的URL Schema
URL Schema: `<protocol>://<host>/<path>?<query>#fragment`
自定义jsbridge 请求的schema：：`jsbridge://showToast?text=hello`
Native加载WebView之后，Web发送的所有请求都会经过WebView组件，所以Native可以重写WebView里的方法，从来拦截Web发起的请求，我们对请求的格式进行判断:
![avatar](/assets/jsbridge1.png)
其实在web里面发送Url请求无非就这么几种：
1.a标签 //需要用户操作
2.location.href //页面跳转丢失调用
3.ajax
4.iframe.src
兼容性原因发送ajax安卓设备没有相应的拦截方法，所以iframe.src是一般常用的方案

- 安卓提供了shouldOverrideUrlLoading方法拦截
- UIWebView使用shouldStartLoadWithRequest，WKWebView则使用decidePolicyForNavigationAction
 
`这种方式从早期就存在，兼容性很好，但是由于是基于URL的方式，长度受到限制而且不太直观，数据格式有限制，而且建立请求有时间耗时。`
 
#### 向Webview中注入JS API

Android（4.2+）提供了addJavascriptInterface注入：
```java
// 注入全局JS对象
webView.addJavascriptInterface(new NativeBridge(this), "NativeBridge");

class NativeBridge {
  private Context ctx;
  NativeBridge(Context ctx) {
    this.ctx = ctx;
  }

  // 增加JS调用接口
  @JavascriptInterface
  public void showNativeDialog(String text) {
    new AlertDialog.Builder(ctx).setMessage(text).create().show();
  }
}
```
web端调用：

```javascript
window.NativeBridge.showNativeDialog('hello');
```
iOS的UIWebView提供了JavaSciptCore

iOS的WKWebView提供了WKScriptMessageHandler

### 如何实现双端通信呢
不管是原生调用web`evaluateJavascrip`，还是web调用原生`向webview中注入api`或 `拦截URL请求schema`，都是一个单向通信的过程，那么如何实现双向通信呢，也就是js回调

#### 调用加上callbackId
其实基于之前的单向通信就可以实现，我们在一端调用的时候在参数中加一个`callbackId`标记对应的回调，对端接收到调用请求后，进行实际操作，如果带有`callbackId`，对端再进行一次调用，将结果、`callbackId`回传回来，这端根据`callbackId`匹配相应的回调，将结果传入执行就可以了
 ![jsbridge图](/assets/jsbridge2.png)

eg：web端获取原生输入框的值
```javascript
  let id = 1;
  // 根据id保存callback
  const callbackMap = {};
  // 使用JSSDK封装调用与Native通信的事件，避免过多的污染全局环境
  window.JSSDK = {
    // 获取Native端输入框value，带有回调
    getNativeEditTextValue(callback) {
      const callbackId = id++;
      callbackMap[callbackId] = callback;
      // 调用JSB方法，并将callbackId传入
      window.NativeBridge.getNativeEditTextValue(callbackId);
    },
    // 接收Native端传来的callbackId
    receiveMessage(callbackId, value) {
      if (callbackMap[callbackId]) {
        // 根据ID匹配callback，并执行
        callbackMap[callbackId](value);
      }
    }
  };

	const showBtn = document.querySelector('#showBtn');
  // 绑定按钮事件
  showBtn.addEventListener('click', e => {
    // 通过JSSDK调用，将回调函数传入
    window.JSSDK.getNativeEditTextValue(value => window.alert('Natvie输入值：' + value));
  });
```
```java
webView.addJavascriptInterface(new NativeBridge(this), "NativeBridge");

class NativeBridge {
  private Context ctx;
  NativeBridge(Context ctx) {
    this.ctx = ctx;
  }

  // 获取Native端输入值
  @JavascriptInterface
  public void getNativeEditTextValue(int callbackId) {
    MainActivity mainActivity = (MainActivity)ctx;
    // 获取Native端输入框的value
    String value = mainActivity.editText.getText().toString();
    // 需要注入在Web执行的JS代码
    String jsCode = String.format("window.JSSDK.receiveMessage(%s, '%s')", callbackId, value);
    // 在UI线程中执行
    mainActivity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        mainActivity.webView.evaluateJavascript(jsCode, null);
      }
    });
  }
}

```
#### 双向通信本质
本质上还是事件驱动，web调用原生注入的方法，调用的时候传入一个函数（带上callbackId），原生那边调用web往window中注入的方法（带上id），方法存在web这边，根据id匹配对应的回调并执行完成双端通信。

以下是基于promise异步+同步复杂通信的扩展：
```javascript
// 1. 定义一个事件驱动的通信管理器
class JSBridge {
  constructor() {
    this.eventListeners = {}; // 存储事件监听器
    this.callbacks = {}; // 存储回调函数，用于处理异步响应
    this.callbackId = 0; // 用于生成唯一的回调ID
  }

  // 2. 注册事件监听器
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }

  // 3. 触发事件
  emit(eventName, data) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach(callback => callback(data));
    }
  }

  // 4. 封装桥接调用为Promise
  callNativeMethod(methodName, params) {
    return new Promise((resolve, reject) => {
      const callbackId = this.generateCallbackId(); // 生成唯一ID
      this.callbacks[callbackId] = { resolve, reject }; // 存储resolve和reject

      // 5. 发送消息到原生端
      const message = {
        method: methodName,
        params,
        callbackId,
      };
      this.sendToNative(message); // 假设这是一个发送消息到原生端的方法

      // 6. 设置超时处理
      setTimeout(() => {
        if (this.callbacks[callbackId]) {
          reject(new Error('Timeout: Native method did not respond in time.'));
          delete this.callbacks[callbackId]; // 清理回调
        }
      }, 5000); // 5秒超时
    });
  }

  // 7. 处理原生端的响应
  handleNativeResponse(response) {
    const { callbackId, result, error } = response;
    if (this.callbacks[callbackId]) {
      if (error) {
        this.callbacks[callbackId].reject(error); // 处理错误
      } else {
        this.callbacks[callbackId].resolve(result); // 处理成功
      }
      delete this.callbacks[callbackId]; // 清理回调
    }
  }

  // 8. 生成唯一回调ID
  generateCallbackId() {
    return `callback_${this.callbackId++}`;
  }

  // 9. 模拟发送消息到原生端的方法
  sendToNative(message) {
    // 这里假设原生端会监听某个事件（如 `nativeMessage`）并处理消息
    console.log('Sending message to native:', message);
    // 模拟原生端处理后的响应
    setTimeout(() => {
      this.handleNativeResponse({
        callbackId: message.callbackId,
        result: 'Native method executed successfully!',
      });
    }, 100); // 模拟100ms的响应时间
  }
}

// 10. 使用示例
const jsBridge = new JSBridge();

// 调用原生方法
jsBridge.callNativeMethod('getDeviceInfo', { detail: true })
  .then(result => {
    console.log('Native method response:', result);
  })
  .catch(error => {
    console.error('Native method error:', error);
  });

// 监听原生端触发的事件
jsBridge.on('deviceStatusChanged', data => {
  console.log('Device status changed:', data);
});
```