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

