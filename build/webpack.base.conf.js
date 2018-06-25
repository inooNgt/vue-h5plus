"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const webpack = require("webpack");
const HappyPack = require("happypack");
const vueLoaderConfig = require("./vue-loader.conf");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  enforce: "pre",
  include: [resolve("src"), resolve("test")],
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

const testpath = path.resolve(__dirname, "../src/pages/login_register");

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: utils.entries(),
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      // mui: resolve("src/assets/js/mui.js"),
      utils: resolve("src/utils"),
      components: resolve("src/components"),
      assets: resolve("src/assets")
    }
  },
  externals: {
    mui: "window.mui",
    mtool: "window.MTOOL"
  },
  plugins: [
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的HappyPack 是用来处理一类特定的文件
      id: "babel",
      // 如何处理 .js 文件，用法和 Loader配置中一样
      loaders: ["babel-loader"]
    })
  ],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // loader: "babel-loader",
        use: ["happypack/loader?id=babel"],
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client"),
          resolve("node_modules/pinyin") // 此库未打包😭
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[ext]")
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
