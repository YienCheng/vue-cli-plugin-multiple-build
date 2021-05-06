# Vue Cli Plugin Multiple Build

<a href="https://www.npmjs.com/package/vue-cli-plugin-multiple-build">
  <img alt="downloads" src="https://img.shields.io/npm/dw/vue-cli-plugin-multiple-build.svg?sanitize=true">
</a>

<a href="https://www.npmjs.com/package/vue-cli-plugin-multiple-build">
  <img alt="version" src="https://img.shields.io/npm/v/vue-cli-plugin-multiple-build.svg?sanitize=true">
</a>

<a href="https://www.npmjs.com/package/vue-cli-plugin-multiple-build">
  <img alt="license" src="https://img.shields.io/npm/l/vue-cli-plugin-multiple-build?sanitize=true">
</a>


🌞 基于 vue-cli@3 的多页面打包插件，支持打包和运行指定的页面，无侵入的更改了 vue-cli 原有的 build 和 serve 命令。

如果您在使用过程中如果有什么问题或者需求可以通过[点击此处](https://github.com/YienCheng/vue-cli-plugin-multiple-build/issues)来提一个ISSUE。

如果觉的这个插件还可以，欢迎各位大佬能给个Star，感谢～

## Getting Started

### 安装插件

```bash
vue add multiple-build
```

安装过程中会提示您是否选择安装示例，建议选择安装来了解目录结构。

使用此插件时你需要建立一个目录来放置多页面的文件夹，文件夹中应该至少有一个入口文件和一个html页面

建议在src目录下新建一个pages目录来专门放置多页面文件，相应的目录结构可能看起来像下面这样：

```
.
├── src
│   └── pages
│       ├── _about
│       │   ├── App.vue
│       │   ├── index.html
│       │   └── main.js
│       └── _home
│           ├── App.vue
│           ├── index.html
│           └── main.js
├── vue.config.js

```

### 更改 vue.config.js 配置文件

```javascript
const getEntries = require("vue-cli-plugin-multiple-build/getEntries");
const path = require("path");

module.exports = {
  // getEntries's args is your multiple page directory
  pages: getEntries(
    path.resolve(__dirname, "./src/pages/*/main.js"),
    (entry, entryName) => ({
      title: entryName,
    })
  ),
  // ...your other configuration
};
```

getEntries 函数接收两个参数：

第一个参数：页面的入口文件，内部使用`glob`来查找所有的入口文件

第二个参数：接收一个 callback ，这个回调会在每次遍历入口文件时调用，callback 中的entry参数是当前遍历到的入口文件路径，entryName参数是当前入口文件所在的目录名称，默认会把entryName当作当前入口的入口名称，该函数需要返回一个像下面这样的对象

```

{
  // 当前遍历入口的文件路径
  entry: 'src/pages/xx/main.js',
  // 默认为当前遍历入口的文件目录下的index.html
  template: 'public/index.html',
  // 在 dist/index.html 的输出
  filename: 'index.html',
  // 当使用 title 选项时，
  // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  title: 'Index Page',
  // 在这个页面中包含的块，默认情况下会包含
  // 提取出来的通用 chunk 和 vendor chunk。
  chunks: ['chunk-vendors', 'chunk-common', 'index']
}

```
实际这个对象就是``vue.config.js`中pages的每个入口的值，可以通过返回这样一个值来重写当前入口的配置，其中entry默认为当前入口文件路径和template为入口文件所在目录下的index.html，其余的值如果需要可自行配置。

### 编译所有入口

```bash
vue-cli-service build
```

会以vuecli@3多页面的形式build所有的入口

### 编译指定入口

```bash
vue-cli-service build --page xxx
```
--page 参数为自定义参数，会build指定页面的入口，xxx 为当前口入文件所在目录名称。

### 运行所有入口

```bash
vue-cli-service serve
```

会以vuecli@3多页面的形式运行所有的入口

### 运行指定入口

```bash
vue-cli-service build --page xxx
```
--page 参数为自定义参数，会运行指定页面的入口，xxx 为当前口入文件所在目录名称。

---

以上所有的 `--page` 参数可以传递一个值或者多个值：

一个值示例：`vue-cli-service build --page home`
 
多个值示例：`vue-cli-service build --page home,about` 

## 实现原理

此插件实际还是通过`vue.config.js`配置`pages`参数的方式来实现的，还是使用的vue-cli@3提供的编译和运行，只是提供了一个获取page入口的helper函数数`getEntries`，和给`vue-cli-server build` `vue-cli-server serve`新增了一个`--page`参数，安装此插件基本对现有项目没有什么影响。

## License

[MIT](https://github.com/YienCheng/vue-cli-plugin-multiple-build/blob/master/LICENSE)

