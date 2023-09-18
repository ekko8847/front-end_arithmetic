#### React手写题
1.请用React的自定义hook实现一个可以
从服务器加载任何数据资源的函数
useDataSource，比如可用于加载用户信息
```js
import { useEffect, useState } from 'react';

// 自定义 Hook，用于从服务器加载数据资源
function useDataSource(apiEndpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 在组件挂载时加载数据
    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [apiEndpoint]);

  return { data, loading, error };
}

// 使用示例
function UserProfile() {
  const userId = 1; // 假设用户 ID 为 1
  const apiEndpoint = `https://api.example.com/user/${userId}`;

  const { data, loading, error } = useDataSource(apiEndpoint);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    // 在这里渲染用户数据
    return (
      <div>
        <h1>User Profile</h1>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        {/* 其他用户信息 */}
      </div>
    );
  }

  return null;
}

```
2.请用React hooks+TypeScript将以下表单单写成受控组件和非受控组件两种形式
```js
<form>
<input name="userName" type="text" placeholder="user name"
/>
<input name="password" type="password" autocomplete ="off"
/>
</form>
```
受控组件：
在受控组件中，我们使用 useState 来管理表单数据的状态，并将输入字段的值与状态中的数据进行绑定。handleChange 函数用于处理输入字段的变化，并将新值更新到状态中。
```js
import React, { useState } from 'react';

function ControlledForm() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="userName"
        type="text"
        placeholder="user name"
        value={formData.userName}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        autoComplete="off"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledForm;

```
非受控组件：
在非受控组件中，我们使用 useRef 来引用输入字段，而不是将其值存储在状态中。在提交表单时，我们通过引用访问输入字段的值并创建表单数据对象。
```js
import React, { useRef } from 'react';

function UncontrolledForm() {
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      userName: userNameRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={userNameRef}
        name="userName"
        type="text"
        placeholder="user name"
      />
      <input
        ref={passwordRef}
        name="password"
        type="password"
        autoComplete="off"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;

```
3.请用React hooks+TypeScript编写组件，实现类似Vue的具名插槽和作用域插槽的
效果
```js
import React from 'react';

// 具名插槽组件
function NamedSlot({ children }) {
  return <div className="named-slot">{children}</div>;
}

// 作用域插槽组件
function ScopedSlot({ render }) {
  return <div className="scoped-slot">{render()}</div>;
}

// 父组件
function ParentComponent() {
  return (
    <div>
      <h2>Named Slot</h2>
      <NamedSlot>
        <h3 slot="header">Header Slot</h3>
        <p slot="content">Content Slot</p>
      </NamedSlot>

      <h2>Scoped Slot</h2>
      <ScopedSlot
        render={() => (
          <>
            <h3>Header Slot</h3>
            <p>Content Slot</p>
          </>
        )}
      />
    </div>
  );
}

export default ParentComponent;

```
4.使用Node.js创建一个Http Server，监听端口3000，如果请求的接口是/users旦是
post请求，则返回：{'status'
200,”message”:“Helo World!", 否则
返回：{'status":400.”message”：
"request error!")
```js
const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/users') {
    // 如果请求方法是 POST 且路径是 /users
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 200, message: 'Hello World!' }));
  } else {
    // 其他情况返回 400 错误
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 400, message: 'Request error!' }));
  }
});

// 监听端口 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
