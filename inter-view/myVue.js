class Vue {
  constructor(options) {
    this.el = options.el;
    this.data = options.data;
    this.methods = options.methods;

    this.observe(this.data);
    this.compile();
  }

  observe(data) {
    Object.keys(data).forEach(key => {
      let value = data[key];
      const dep = new Dep();

      Object.defineProperty(data, key, {
        get() {
          if (Dep.target) {
            dep.addSubscriber(Dep.target);
          }
          return value;
        },
        set(newValue) {
          if (value !== newValue) {
            value = newValue;
            dep.notify();
          }
        }
      });
    });
  }

  compile() {
    const el = document.querySelector(this.el);

    this.compileNode(el);
  }

  compileNode(node) {
    if (node.nodeType === 1) {
      const attrs = node.attributes;

      for (let i = 0; i < attrs.length; i++) {
        if (attrs[i].nodeName === 'v-model') {
          const attrValue = attrs[i].nodeValue;
          node.value = this.data[attrValue];

          node.addEventListener('input', e => {
            this.data[attrValue] = e.target.value;
          });

          new Watcher(this.data, attrValue, value => {
            node.value = value;
          });
        }
      }
    }

    if (node.nodeType === 3) {
      const reg = /\{\{(.*)\}\}/;
      const text = node.nodeValue;

      if (reg.test(text)) {
        const attrValue = RegExp.$1.trim();
        node.nodeValue = this.data[attrValue];

        new Watcher(this.data, attrValue, value => {
          node.nodeValue = value;
        });
      }
    }

    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach(childNode => {
        this.compileNode(childNode);
      });
    }
  }
}

class Watcher {
  constructor(data, attr, callback) {
    Dep.target = this;
    this.callback = callback;
    this.value = data[attr]; // 触发 getter，添加订阅者
    Dep.target = null;
  }

  update() {
    const newValue = this.value;
    this.callback(newValue);
  }
}

class Dep {
  constructor() {
    this.subscribers = [];
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  notify() {
    this.subscribers.forEach(subscriber => {
      subscriber.update();
    });
  }
}

// 示例用法
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello, Vue!'
  },
  methods: {
    changeMessage() {
      this.message = 'Updated message!';
    }
  }
});
