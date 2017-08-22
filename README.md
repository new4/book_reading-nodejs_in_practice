# 阅读笔记：Node.js in Practice

## 1 安装与加载模块

如何从 `npm` 加载一个第三方模块？

用 `npm` 安装模块，用 `require` 加载模块。

## 2 创建与管理模块

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

## 3 加载一组相关的模块

将一个目录下的相关文件组合起来，并且通过一个 `require` 来加载这些模块？

`Node` 可以将目录作为模块，创建一个 `index.js` 的文件来加载各个模块，并把他们一起导出。

## 4 使用路径

打开一个不在模块系统中的文件？

通过 `__dirname` 或 `__filename` 来找到文件的位置，它们保存着当前脚本的绝对路径。

还可以使用 path 模块的 path.join 方法：

```js
path.join(__dirname, '../index.js');
```

## 5 标准 I/O 流的读写

从一个 `Node` 程序导出或导入数据？

使用 `process.stdout` 与 `process.stdin`

## 6 打印日志消息

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

