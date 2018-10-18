# Vue-H5Plus

基于 vue-cli3 搭建的 vue 多页面 H5Plus 项目,同时结合了 vant、mui 进行开发。

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
| | --- default.html // 默认 html 模板
| +-- utils // 公用 js
```

````
## 如何运行？

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8099
yarn dev

# build for production with minification
yarn build
````
