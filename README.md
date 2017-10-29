# 阅读笔记：Node.js in Practice

## 全局变量：Node 环境

### 1 安装与加载模块

如何从 `npm` 加载一个第三方模块？

用 `npm` 安装模块，用 `require` 加载模块。

### 2 创建与管理模块

如何将一个项目解耦至多个文件？

通过 `exports` 对象来解耦。

对象，方法以及变量都可以从一个文件中 `export` 出来用在其它任何地方。

注意，加载一个本地模块需要加上路径名。若没有路径名， `Node` 会现在 `$NODE_PATH` --> `./node_modules` --> `$HOME/.node_modules` --> `$HOME/.node_libraries` 中寻找。

欲判断 `node` 加载了哪个模块，可以使用 `require.resolve(id)`，它将返回文件的绝对路径。

一个模块被加载了之后就会被自动缓存，这在大多数情况下适用，但是，针对少数情况你希望卸载一个模块。

使用 `delete` 关键字，同时获得模块的绝对路径，作用在 `require.cache` 对象上就可以卸载一个模块。

```js
delete require.cache(require.resolve(id));
```

### 3 加载一组相关的模块

将一个目录下的相关文件组合起来，并且通过一个 `require` 来加载这些模块？

`Node` 可以将目录作为模块，创建一个 `index.js` 的文件来加载各个模块，并把他们一起导出。

### 4 使用路径

打开一个不在模块系统中的文件？

通过 `__dirname` 或 `__filename` 来找到文件的位置，它们保存着当前脚本的绝对路径。

还可以使用 path 模块的 path.join 方法：

```js
path.join(__dirname, '../index.js');
```

### 5 标准 I/O 流的读写

从一个 `Node` 程序导出或导入数据？

使用 `process.stdout` 与 `process.stdin`

### 6 打印日志消息

记录不同类型的消息到 `console`?

```js
console.log
console.info
console.error
console.warn
```

`console` 对象的几个方法被用来输出不同类型的消息，它们会被写入相关的输出流中，因此可以 `pipe` 它们。

格式占位符：

|占位符|类型|例子|
|---|---|---|
|%s|String|'%s', 'value'|
|%d|Number|'%d', 3.14|
|%j|JSON|'%j', {name: 'alex'}|

标准流：

- 0 代表输入流
- 1 代表输出流
- 2 代表错误

输出错误到文件可以这么写:

```bash
node ./example/index.js 2> errs-file.log
```

另一个是堆栈追踪： `console.trace()`

### 7 基准测试

对耗时操作进行基准测试？

通过 `console.time` 和 `console.timeEnd`

这些方法基于 `Date.now()` 计算函数执行时间，精确到毫秒。

可以使用第三方模块 [benchmark](https://github.com/bestiejs/benchmark.js) 获取更精确的基准，还可以结合 [microtime](https://github.com/wadey/node-microtime) 模块。

### 8 获取平台信息

基于操作系统或处理器架构运行特性的代码？

使用 `process.arch` 和 `process.platform` 属性。

另外一些来自系统的信息可以通过 `process` 模块搜集，例如 `process.memoryUsage` 描述当前进程内存使用情况。

### 9 传递命令行参数

如何从命令行接受简单参数？

使用 `process.argv`，数组 `process.argv` 可以检查有多少参数传入，如果有，那么头两个参数是 `node` 以及这个脚本的名字。

另外一些来自系统的信息可以通过 `process` 模块搜集，例如 `process.memoryUsage` 描述当前进程内存使用情况。

### 10 退出程序

程序需要在退出的时候指定退出码？

使用 `process.exit()`

`Node` 程序默认返回 0 的退出状态，意味着程序正常终止。任何非 0 的状态码被认为是一个错误。

### 11 响应信号量

需要响应其他进程发出的信号？

使用发给 `process` 对象的信号事件。

`process` 对象是一个 `EventEmitter` 对象，故可以对其添加监听器。

`process.pid` 显示当前进程的 `PID`。

对信号的监听可以满足 `Unix` 程序期待的行为，例如，许多服务器以及进程守护程序在收到 `SIGHUP` 信号时会重新加载配置文件。

信号可以从任意的进程发送给其它进程，你的 `Node` 进程可以通过 `process.kill(pid, [signal])` 向另一个进程发送信号，此处 `kill` 并不意味着杀死，而是指发送了一个信号。

### 12 通过 `setTimerout` 延迟执行函数

想延迟执行一个函数？

使用 `setTimerout`，并在需要的时候使用 `Function.prototype.bind`

在需要的时候使用 `clearTimerout` 阻止定时函数执行。

### 13 通过 `setInterval` 定时调用回调函数

想以一个固定时间间隔运行函数？

使用 `setInterval`，并在需要的时候使用 `Function.prototype.bind`

在需要的时候使用 `clearInterval` 阻止定时函数执行。

### 14 安全地操作异步接口

写一个方法返回一个 `EventEmitter` 实例，或者允许一个回调仅在有些时候调用一个异步接口，而不是所有时候？

使用 `process.nextTick` 来包装一个同步操作。

`process.nextTick` 方法允许将一个毁掉放在下一个事件轮询队列的头上。比 `setTimeout` 更有效率。

例如异步地从磁盘上读取一个文件，读取完成后在内存中缓存这个文件，之后的调用会直接返回缓存的内容。这就需要通过调用 `process.nextTick` 来将之后的调用行为以异步的方式来执行。

#### 可视化事件轮询 `setImmediate` 和 `process.maxTickDepth`

`setImmediate` 以及 `clearImmediate` 会在下一次 I/O 事件后并在 `setTimeout` 和 `setInterval` 之前执行。

多个 `process.nextTick` 语句总是在当前执行栈一次执行完，多个 `setImmediate` 可能则需要多次 loop 才能执行完。由于 `process.nextTick` 指定的回调函数是在本次 "事件循环" 触发，而 `setImmediate` 指定的是在下次 "事件循环" 触发，所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查任务队列）。

传入 `process.nextTick` 的回调通常在当前的事件轮询结束后执行， 可以被安全执行的回调数量被 `process.maxTickDepth` 控制，默认 1000，以允许 I/O 操作可以继续被处理。

一次事件循环迭代中的顺序通常为：I/O事件 -> setImmediate -> setInterval -> process.nextTick

## Buffer：使用比特、字节以及编码

### 15 Buffer 转换成其他格式

如果没有指定编码格式，默认情况返回 `Buffer` 数据，`Buffer` 数据很容易转换成其他格式。

你需要将一个 `Buffer` 转换成文本格式？

使用 `Buffer API`。

`Buffer` 类型提供了 `toString` 方法将数据转换成 `UTF-8` 编码的字符串，默认就是转成 `UTF-8`。

```js
buf.toString(); // 默认转成 utf-8
buf.toString('ascii'); // 指定转成 ascii
```

### 16 使用 `Buffer` 来修改字符串编码

需要将一个字符串的编码格式转换成另一种？

使用 `Buffer API`。

可以通过传入字符串来创建一个 `Buffer`：

```js
let buf = new Buffer(str);
```

当使用字符串创建 `Buffer` 时默认为 `UTF-8` 字符串，也可以指定编码：

```js
let buf = new Buffer(str, 'base64');
```

例如可以用来处理 `Data URIs`，`Data URIs` 允许一个资源以行内编码的形式存在于 web 页面中，`Data URLs` 由四个部分组成：前缀（data:)，指示数据类型的MIME类型，如果非文本则为可选的 base64 令牌，数据本身：格式如下：

```hash
data:[<mediatype>][;base64],<data>
```

可以将一个图片编码成 `Data URIs`。

### 17 使用 `Buffer` 来转换原始数据

将一个二进制文件转换成更有用的数据格式？

使用 `Buffer API`。

例如按照约定的规则来解析一个二进制数据文件为 json 文件。

### 18 创建自己的网络协议

你需要一种在进程或者网络之间高效通信的方法？

使用 `Buffer API` 创建自定义的二进制协议。





