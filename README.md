# vue-h5plus

基于 vue-cli3 搭建的 vue 多页面 H5Plus 项目,同时结合了 vant、mui 进行开发。

## vue-h5plus 的特点

- 基于 webpack4 和 vue-cli3 多页面模式开发，体验极致的打包速度
- 自动构建 pags 目录下的页面，快速新建页面
- Hbuilder 项目目录和 vue 工程目录分离，Hbuilder 不打包多余的配置文件

## 项目说明

- pages 目录下每个子目录作为一个页面，pagename.js 为 webpack 打包入口，pagename.html 为页面模板（若子目录下无 pagename.html ，则使用 default.html 作为模板）
- 项目包含了 webview 模式的 tabbar，对应页面为 index
- 项目引入了 mui 和 vant 组件库，开发者可以灵活选择

## 目录结构

```
+-- app // Hbuild 项目目录
| +-- dist // src 目录打包资源
| +-- static // 静态资源，不使用 webpack 打包，直接使用
| --- *.html // src 目录打包资源
+-- appicon // 应用图标
+-- src // 应用图标
| +-- assets // 资源库
| | +-- img
| | +-- scss
| +-- components // 公共 vue 组件目录
| +-- pages // 页面
| | +--somepage // 页面
| |  | ---pagename.html // html模板
| |  | ---pagename.js // 入口文件
| | --- default.html // 默认 html 模板
| +-- utils // 公用 js
```

## 如何运行？

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8099
yarn dev

# build for production with minification
yarn build
```

## 快速体验

![安卓版](http://inoongt.oss-cn-shenzhen.aliyuncs.com/images/1544062594.png)

## Licence

MIT
